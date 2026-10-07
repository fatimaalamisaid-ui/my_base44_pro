import { useEffect, useRef } from 'react'

/**
 * Scroll-driven video scrubbing — the "camera through a scene" hero.
 *
 * The clip is never played. It stays paused and we move `currentTime`, so the
 * user's scroll position *is* the timeline: down scrubs forward, up scrubs back,
 * stopping freezes on that exact frame.
 *
 * How it stays smooth:
 * - Raw scroll is never read inside an event handler that also seeks. The target
 *   progress is measured once per frame from the pinned section's rect, and the
 *   actual `currentTime` write happens inside requestAnimationFrame — the same
 *   tick the browser is about to paint, so a seek never lands mid-frame.
 * - The rendered time eases toward the target (`SMOOTHING`) so fast flicks do not
 *   produce harsh jumps, while staying tight enough to feel attached to the scroll.
 * - Writes are skipped unless the time moved by more than `MIN_STEP`, which keeps
 *   the seek queue from flooding.
 * - The loop only runs while the hero is on screen (IntersectionObserver), so
 *   there is no idle work once the section is scrolled past.
 *
 * Seeking cost is a property of the encode, not of this loop. Prefer an
 * MP4/H.264 (or WebM/VP9) file with frequent keyframes — a short GOP, roughly one
 * keyframe every 0.5–1s — at a modest bitrate and ~720–1080p. A long-GOP 4K
 * master will stutter no matter how careful the JavaScript is. A good re-encode:
 *   ffmpeg -i in.mp4 -c:v libx264 -crf 23 -g 12 -keyint_min 12 -sc_threshold 0 \
 *          -movflags +faststart -an out.mp4
 */
export function useScrollVideoScrub({ sectionRef, pinRef, videoRef, enabled, onProgress }) {
  const onProgressRef = useRef(onProgress)
  onProgressRef.current = onProgress

  useEffect(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    const video = videoRef.current
    if (!enabled || !section || !pin || !video) return undefined

    const SMOOTHING = 0.16 // easing toward the target; higher = snappier
    const MIN_STEP = 0.006 // seconds; ignore writes smaller than ~half a frame
    const SETTLE = 0.0004 // progress epsilon at which we snap to the target

    let raf = 0
    let running = false
    let target = 0
    let rendered = 0
    let lastWritten = -1
    let lastFade = -1

    const clamp01 = (value) => (value < 0 ? 0 : value > 1 ? 1 : value)

    // 0 when the section top meets the viewport top, 1 when its bottom meets the
    // bottom of the pinned viewport — i.e. the whole clip is traversed exactly
    // across the scroll distance, never finishing early.
    function readTarget() {
      const distance = section.offsetHeight - pin.offsetHeight
      if (distance <= 0) return 0
      return clamp01(-section.getBoundingClientRect().top / distance)
    }

    function frame() {
      if (!running) return
      raf = requestAnimationFrame(frame)

      // Read before any style write in the same frame, so we never thrash layout.
      target = readTarget()
      rendered += (target - rendered) * SMOOTHING
      if (Math.abs(target - rendered) < SETTLE) rendered = target

      const { duration } = video
      if (Number.isFinite(duration) && duration > 0) {
        const time = rendered * duration
        if (Math.abs(time - lastWritten) > MIN_STEP) {
          lastWritten = time
          video.currentTime = time
        }
      }

      if (rendered !== lastFade) {
        lastFade = rendered
        onProgressRef.current?.(rendered)
      }
    }

    function start() {
      if (running) return
      running = true
      raf = requestAnimationFrame(frame)
    }

    function stop() {
      running = false
      cancelAnimationFrame(raf)
    }

    // Start from wherever the page already is (e.g. a reload mid-hero) instead of
    // sweeping in from zero.
    target = readTarget()
    rendered = target
    onProgressRef.current?.(rendered)

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: '10% 0px' },
    )
    observer.observe(section)

    return () => {
      observer.disconnect()
      stop()
    }
  }, [enabled, sectionRef, pinRef, videoRef])
}
