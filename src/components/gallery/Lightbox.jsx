import { useEffect, useRef } from 'react'
import Photo from '../ui/Photo.jsx'
import { ChevronBack, ChevronForward, Close } from '../ui/Icons.jsx'
import { useEscape, useLockBodyScroll } from '../../lib/hooks.js'
import { toPersianDigits } from '../../lib/utils.js'

/**
 * Fullscreen image viewer.
 * Keyboard: Esc closes, ArrowLeft goes forward, ArrowRight goes back — matching
 * the right-to-left reading direction.
 */
export default function Lightbox({ items, index, onClose, onNavigate }) {
  const open = index >= 0 && index < items.length
  const dialogRef = useRef(null)

  useLockBodyScroll(open)
  useEscape(open, onClose)

  useEffect(() => {
    if (!open) return undefined
    dialogRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'ArrowLeft') onNavigate((index + 1) % items.length)
      if (event.key === 'ArrowRight') onNavigate((index - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, index, items.length, onNavigate])

  if (!open) return null

  const item = items[index]

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`گالری تصاویر — ${item.title}`}
      tabIndex={-1}
      className="fixed inset-0 z-[90] flex flex-col animate-overlay-in bg-coffee-950/95 backdrop-blur-sm outline-none"
    >
      <div className="flex items-center justify-between px-5 py-4 sm:px-8">
        <p className="text-sm text-cream">
          <span className="text-gold">{item.category}</span>
          <span className="mx-2 text-sand/40">|</span>
          {item.title}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="بستن گالری"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-cream transition-colors duration-300 hover:border-gold hover:text-gold"
        >
          <Close className="h-5 w-5" />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-16">
        <button
          type="button"
          onClick={() => onNavigate((index + 1) % items.length)}
          aria-label="تصویر بعدی"
          className="absolute end-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-coffee-900/70 text-cream transition-colors duration-300 hover:border-gold hover:text-gold sm:end-6"
        >
          <ChevronForward className="h-5 w-5" />
        </button>

        <figure className="max-h-full w-full max-w-5xl">
          <div className="overflow-hidden rounded-modal border border-line">
            <Photo
              key={item.id}
              id={item.image}
              alt={item.title}
              priority
              sizes="100vw"
              widths={[960, 1440, 1920]}
              className="max-h-[70vh] w-full object-contain animate-image-in"
            />
          </div>
          <figcaption className="mt-4 flex items-center justify-between text-xs text-sand/60">
            <span>{item.title}</span>
            <span>
              {toPersianDigits(index + 1)} / {toPersianDigits(items.length)}
            </span>
          </figcaption>
        </figure>

        <button
          type="button"
          onClick={() => onNavigate((index - 1 + items.length) % items.length)}
          aria-label="تصویر قبلی"
          className="absolute start-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-coffee-900/70 text-cream transition-colors duration-300 hover:border-gold hover:text-gold sm:start-6"
        >
          <ChevronBack className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
