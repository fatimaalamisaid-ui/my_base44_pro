import { useEffect, useRef, useState } from 'react'
import Photo from '../ui/Photo.jsx'
import { ChevronLeft, ChevronRight, Close } from '../ui/Icons.jsx'
import { useEscape, useLockBodyScroll } from '../../lib/hooks.js'
import { cx } from '../../lib/utils.js'

/**
 * Property gallery: large hero frame, thumbnail rail and a fullscreen viewer
 * with keyboard support (arrows + escape).
 */
export default function PropertyGallery({ images, name }) {
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const closeRef = useRef(null)
  const lastFocused = useRef(null)

  useLockBodyScroll(open)
  useEscape(open, () => setOpen(false))

  useEffect(() => {
    if (!open) {
      lastFocused.current?.focus?.()
      return undefined
    }
    lastFocused.current = document.activeElement
    closeRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'ArrowRight') setIndex((current) => (current + 1) % images.length)
      if (event.key === 'ArrowLeft') setIndex((current) => (current - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, images.length])

  const go = (direction) => setIndex((current) => (current + direction + images.length) % images.length)

  return (
    <div>
      {/* Hero frame */}
      <div className="relative overflow-hidden rounded-card bg-navy-100">
        <div className="aspect-[16/10] sm:aspect-[16/9]">
          <Photo
            id={images[index]}
            alt={`${name} — image ${index + 1} of ${images.length}`}
            sizes="(min-width: 1024px) 62vw, 100vw"
            widths={[768, 1200, 1600, 2000]}
            priority
          />
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute bottom-4 right-4 rounded-pill bg-white/95 px-5 py-2.5 text-[12px] font-medium tracking-wide2 text-navy-900 backdrop-blur transition-colors duration-300 hover:bg-white"
        >
          View full gallery
        </button>

        <span className="absolute bottom-4 left-4 rounded-pill bg-navy-950/70 px-4 py-2 text-[11px] tracking-wide2 text-white backdrop-blur">
          {index + 1} / {images.length}
        </span>
      </div>

      {/* Thumbnails */}
      <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto pb-1">
        {images.map((image, imageIndex) => (
          <button
            key={image}
            type="button"
            onClick={() => setIndex(imageIndex)}
            aria-label={`Show image ${imageIndex + 1}`}
            aria-current={imageIndex === index}
            className={cx(
              'relative h-20 w-28 shrink-0 overflow-hidden rounded-lg transition-all duration-300 ease-premium sm:h-24 sm:w-36',
              imageIndex === index
                ? 'ring-2 ring-champagne-500 ring-offset-2 ring-offset-white'
                : 'opacity-65 hover:opacity-100',
            )}
          >
            <Photo
              id={image}
              alt=""
              sizes="150px"
              widths={[200, 320, 480]}
              className="transition-transform duration-700 ease-premium hover:scale-105"
            />
          </button>
        ))}
      </div>

      {/* Fullscreen viewer */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${name} gallery`}
          className="fixed inset-0 z-[70] flex flex-col bg-navy-950/95 animate-overlay-in"
          onClick={() => setOpen(false)}
        >
          <div className="flex items-center justify-between px-5 py-5 sm:px-8">
            <p className="text-xs tracking-wide2 text-white/60">
              {name} — {index + 1} / {images.length}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close gallery"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-navy-950"
            >
              <Close className="h-5 w-5" />
            </button>
          </div>

          <div
            className="flex flex-1 items-center justify-center gap-4 px-4 pb-6 sm:px-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-navy-950"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <img
              key={images[index]}
              src={`https://images.unsplash.com/photo-${images[index]}?auto=format&fit=crop&w=1800&q=82`}
              alt={`${name} — image ${index + 1} of ${images.length}`}
              className="max-h-[72vh] w-auto max-w-full rounded-card object-contain animate-overlay-in"
            />

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-navy-950"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
