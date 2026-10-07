import { useCallback, useRef, useState } from 'react'
import Photo from '../components/ui/Photo.jsx'
import Button from '../components/ui/Button.jsx'
import { ArrowForward } from '../components/ui/Icons.jsx'
import { hero } from '../data/content.js'
import { cx } from '../lib/utils.js'
import { useMediaQuery } from '../lib/hooks.js'
import { useScrollVideoScrub } from '../lib/useScrollVideoScrub.js'

/**
 * Length of the pinned hero, in viewport heights. This is the single number that
 * sets the pacing of the whole sequence — enough travel to move through the clip
 * comfortably without an endless scroll.
 */
const HERO_SCROLL_VH = 300

/**
 * The clip is served from /public, so Vite answers byte-range requests for it —
 * random-access seeking needs ranges. Keep the encode seek-friendly (see
 * src/lib/useScrollVideoScrub.js for the preferred settings).
 */
const HERO_VIDEO = '/hero-scroll.mp4'

/**
 * The previous hero photograph. It is the poster while the video loads and the
 * fallback if the clip cannot be decoded, so the hero is never a blank rectangle.
 */
const FALLBACK_IMAGE = 'photo-1559496417-e7f25cb247f3'

/** Scroll progress at which the copy has fully left the stage. */
const COPY_FADE_END = 0.24

export default function Hero() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const videoRef = useRef(null)
  const copyRef = useRef(null)
  const [videoState, setVideoState] = useState('loading') // loading | ready | error
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  // The scroll-scrub only engages once the clip is ready. Until then — and for
  // reduced motion or a failed load — the hero is the original static section.
  const scrubbing = !reduceMotion && videoState === 'ready'

  // Runs every animation frame from the scrub loop. Written straight to the DOM
  // (no React state) so scrolling never re-renders the tree.
  const handleProgress = useCallback((progress) => {
    const node = copyRef.current
    if (!node) return
    const fade = Math.min(1, progress / COPY_FADE_END)
    node.style.opacity = String(1 - fade)
    node.style.transform = `translate3d(0, ${(-fade * 36).toFixed(1)}px, 0)`
    node.style.pointerEvents = fade > 0.95 ? 'none' : ''
  }, [])

  useScrollVideoScrub({
    sectionRef,
    pinRef,
    videoRef,
    enabled: scrubbing,
    onProgress: handleProgress,
  })

  // Fires for loadedmetadata / loadeddata / canplay; the first one with a decoded
  // frame wins.
  function handleLoadState(event) {
    if (event.currentTarget.readyState >= 2) setVideoState('ready')
  }

  return (
    <section
      ref={sectionRef}
      className="relative isolate bg-coffee-950"
      // The tall scroll track only exists when the clip can actually be scrubbed,
      // so a failed load collapses back to a normal single-viewport hero.
      style={scrubbing ? { height: `${HERO_SCROLL_VH}vh` } : undefined}
    >
      <div ref={pinRef} className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Poster / fallback photograph */}
        <div className="absolute inset-0">
          <Photo
            id={FALLBACK_IMAGE}
            alt="بریستای کافه و دانه در حال دم‌آوری قهوه"
            priority
            sizes="100vw"
            widths={[640, 1024, 1440, 1920]}
            quality={80}
          />
        </div>

        {/* Scroll-scrubbed clip: paused, never played, never looped, no controls. */}
        <video
          ref={videoRef}
          className={cx(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-premium',
            videoState === 'ready' ? 'opacity-100' : 'opacity-0',
          )}
          src={HERO_VIDEO}
          preload={reduceMotion ? 'metadata' : 'auto'}
          muted
          playsInline
          controls={false}
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
          onLoadedMetadata={handleLoadState}
          onLoadedData={handleLoadState}
          onCanPlay={handleLoadState}
          onError={() => setVideoState('error')}
        />

        {/* Overlays: just enough to keep the copy legible — the footage stays dominant. */}
        <div className="absolute inset-0 bg-gradient-to-b from-coffee-950/70 via-coffee-950/20 to-coffee-950/75" />
        <div className="absolute inset-0 bg-[radial-gradient(110%_80%_at_78%_18%,rgba(216,180,122,0.12),transparent_62%)]" />
        <div className="absolute inset-0 bg-gradient-to-l from-coffee-950/70 via-coffee-950/10 to-transparent" />

        {/* Copy — fades away as the scene starts moving. */}
        <div
          ref={copyRef}
          className="relative z-20 mx-auto flex h-full w-full max-w-shell flex-col justify-center px-5 pb-32 pt-32 sm:px-8 lg:px-10 lg:pt-40"
        >
          <div className="max-w-2xl">
            <p className="label animate-fade-in">{hero.eyebrow}</p>

            <h1 className="hero-text-shadow mt-6 animate-fade-up text-[clamp(2.2rem,6.2vw,4.5rem)] font-bold leading-[1.32] text-cream">
              {hero.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p
              className="mt-7 max-w-xl animate-fade-up text-base leading-relaxed text-sand/85 sm:text-lg"
              style={{ animationDelay: '220ms' }}
            >
              {hero.text}
            </p>

            <div
              className="mt-10 flex flex-wrap items-center gap-3 animate-fade-up"
              style={{ animationDelay: '340ms' }}
            >
              <Button to={hero.primaryCta.to} variant="primary" size="lg">
                {hero.primaryCta.label}
                <ArrowForward className="h-4 w-4 transition-transform duration-300 ease-premium group-hover/btn:-translate-x-0.5" />
              </Button>
              <Button to={hero.secondaryCta.to} variant="outline" size="lg">
                {hero.secondaryCta.label}
              </Button>
            </div>

            <ul
              className="mt-12 hidden items-center gap-4 text-[12px] text-sand/60 animate-fade-up sm:flex"
              style={{ animationDelay: '460ms' }}
            >
              {hero.highlights.map((item, index) => (
                <li key={item} className="flex items-center gap-4">
                  {index > 0 && (
                    <span className="h-1 w-1 rounded-full bg-gold/60" aria-hidden="true" />
                  )}
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {scrubbing && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
            >
              <span className="flex items-center gap-2.5 rounded-pill border border-line bg-coffee-950/40 px-4 py-2 text-[10.5px] text-sand/60 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                برای حرکت در صحنه، اسکرول کنید
              </span>
            </span>
          )}
        </div>

        {/* Minimal loading treatment — shown only while the clip is preparing. */}
        <div
          aria-hidden="true"
          className={cx(
            'pointer-events-none absolute inset-x-0 bottom-8 z-30 flex justify-center transition-opacity duration-700',
            videoState === 'loading' ? 'opacity-100' : 'opacity-0',
          )}
        >
          <span className="flex items-center gap-2.5 rounded-pill border border-line bg-coffee-950/50 px-4 py-2 text-[10.5px] text-sand/65 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
            در حال آماده‌سازی تجربه…
          </span>
        </div>

        {/* Curved, organic transition into the next section */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
          <svg
            viewBox="0 0 1440 140"
            preserveAspectRatio="none"
            className="block h-[64px] w-full sm:h-[104px] lg:h-[140px]"
          >
            <path
              d="M0,74 C220,132 400,24 700,46 C1000,68 1180,126 1440,58 L1440,140 L0,140 Z"
              className="fill-coffee-900"
            />
            <path
              d="M0,74 C220,132 400,24 700,46 C1000,68 1180,126 1440,58"
              fill="none"
              stroke="rgba(216,180,122,0.28)"
              strokeWidth="1.2"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
