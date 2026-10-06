import { useCallback, useEffect, useRef, useState } from 'react'
import PropertyCard from './PropertyCard.jsx'
import { ChevronLeft, ChevronRight } from '../ui/Icons.jsx'
import { cx } from '../../lib/utils.js'

const CARD_WIDTHS = 'w-[86%] sm:w-[62%] md:w-[52%] lg:w-[41%] xl:w-[36%]'

/**
 * Horizontal, snapping property carousel with arrow controls, mouse-drag and
 * native touch swipe. Cards stay partially visible so the rail reads as scrollable.
 */
export default function PropertyCarousel({ properties, label = 'Featured properties' }) {
  const trackRef = useRef(null)
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 })
  const [dragging, setDragging] = useState(false)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const sync = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [sync])

  const step = (direction) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('[data-carousel-item]')
    const amount = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8
    el.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  function onPointerDown(event) {
    if (event.pointerType !== 'mouse') return
    const el = trackRef.current
    drag.current = { active: true, startX: event.clientX, startScroll: el.scrollLeft, moved: 0 }
    setDragging(true)
  }

  function onPointerMove(event) {
    if (!drag.current.active) return
    const el = trackRef.current
    const delta = event.clientX - drag.current.startX
    drag.current.moved = Math.max(drag.current.moved, Math.abs(delta))
    el.scrollLeft = drag.current.startScroll - delta
  }

  function endDrag() {
    if (!drag.current.active) return
    drag.current.active = false
    setDragging(false)
  }

  // Swallow the click that follows a drag so it does not open a property.
  function onClickCapture(event) {
    if (drag.current.moved > 6) {
      event.preventDefault()
      event.stopPropagation()
    }
    drag.current.moved = 0
  }

  function onKeyDown(event) {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      step(1)
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      step(-1)
    }
  }

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      className="relative"
    >
      <div
        ref={trackRef}
        onScroll={sync}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        onKeyDown={onKeyDown}
        tabIndex={0}
        className={cx(
          'no-scrollbar carousel-track flex gap-6 overflow-x-auto pb-2 focus-visible:outline-none',
          dragging ? 'cursor-grabbing select-none [scroll-snap-type:none]' : 'cursor-grab',
        )}
      >
        {properties.map((property, index) => (
          <div key={property.id} data-carousel-item className={cx('shrink-0', CARD_WIDTHS)}>
            <PropertyCard
              property={property}
              sizes="(min-width: 1280px) 36vw, (min-width: 1024px) 41vw, (min-width: 640px) 62vw, 86vw"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center gap-3">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={atStart}
          aria-label="Previous properties"
          className={cx(
            'inline-flex h-12 w-12 items-center justify-center rounded-full border transition-colors duration-300 ease-premium',
            atStart
              ? 'cursor-not-allowed border-navy-100 text-navy-200'
              : 'border-navy-200 text-navy-800 hover:border-navy-900 hover:bg-navy-950 hover:text-white',
          )}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={atEnd}
          aria-label="Next properties"
          className={cx(
            'inline-flex h-12 w-12 items-center justify-center rounded-full border transition-colors duration-300 ease-premium',
            atEnd
              ? 'cursor-not-allowed border-navy-100 text-navy-200'
              : 'border-navy-200 text-navy-800 hover:border-navy-900 hover:bg-navy-950 hover:text-white',
          )}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <p className="ml-2 text-xs tracking-wide2 text-navy-400">Drag, swipe or use the arrows</p>
      </div>
    </div>
  )
}
