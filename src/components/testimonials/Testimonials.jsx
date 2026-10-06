import { useCallback, useEffect, useState } from 'react'
import Photo from '../ui/Photo.jsx'
import { ChevronBack, ChevronForward, Quote, Star } from '../ui/Icons.jsx'
import { cx, toPersianDigits } from '../../lib/utils.js'

/** Calm quote slider: one large card, subtle arrows and dots, gentle autoplay. */
export default function Testimonials({ items, interval = 7000 }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const go = useCallback(
    (step) => setIndex((current) => (current + step + items.length) % items.length),
    [items.length],
  )

  useEffect(() => {
    if (paused || items.length <= 1) return undefined
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined

    const timer = setInterval(() => setIndex((current) => (current + 1) % items.length), interval)
    return () => clearInterval(timer)
  }, [paused, items.length, interval])

  if (!items.length) return null
  const active = items[index]

  return (
    <div
      className="relative mx-auto max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        aria-live="polite"
        aria-atomic="true"
        className="relative overflow-hidden rounded-modal border border-line bg-coffee-800/70 p-8 shadow-modal backdrop-blur-sm sm:p-12"
      >
        <Quote className="h-8 w-8 text-gold/50" />

        <blockquote key={active.id} className="animate-slide-in">
          <p className="mt-6 text-xl font-medium leading-relaxed text-cream sm:text-2xl">
            «{active.text}»
          </p>

          <footer className="mt-8 flex items-center gap-3">
            <span className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-line">
              <Photo
                id={active.image}
                alt={active.name}
                sizes="44px"
                widths={[88, 160]}
                quality={70}
              />
            </span>
            <div>
              <cite className="block text-sm font-semibold not-italic text-cream">
                {active.name} — {active.city}
              </cite>
              <span className="mt-1 flex items-center gap-1 text-gold">
                {Array.from({ length: active.rating }).map((_, starIndex) => (
                  <Star key={starIndex} className="h-3.5 w-3.5" />
                ))}
                <span className="ms-1 text-[11px] text-sand/50">امتیاز مهمان</span>
              </span>
            </div>
          </footer>
        </blockquote>
      </div>

      {/* Controls */}
      <div className="mt-7 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="نظر بعدی"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-cream transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            <ChevronForward className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="نظر قبلی"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-cream transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            <ChevronBack className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          {items.map((item, dotIndex) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setIndex(dotIndex)}
              aria-label={`نمایش نظر ${toPersianDigits(dotIndex + 1)}`}
              aria-current={dotIndex === index}
              className={cx(
                'h-1.5 rounded-pill transition-all duration-500 ease-premium',
                dotIndex === index ? 'w-8 bg-gold' : 'w-4 bg-cream/25 hover:bg-cream/40',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
