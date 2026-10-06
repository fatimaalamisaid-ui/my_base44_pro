import Photo from '../ui/Photo.jsx'
import { Expand } from '../ui/Icons.jsx'
import { cx } from '../../lib/utils.js'

const SPAN_CLASS = {
  tall: 'row-span-2',
  wide: 'col-span-2',
}

/**
 * Asymmetric editorial grid. Each tile is a button that opens the lightbox at
 * that index; `span` in the data decides how much room a tile takes.
 */
export default function Gallery({ items, onOpen, className = '' }) {
  return (
    <div
      className={cx(
        'grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:gap-4 md:grid-cols-4 lg:auto-rows-[220px]',
        className,
      )}
    >
      {items.map((item, index) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onOpen(index)}
          aria-label={`بزرگ‌نمایی تصویر: ${item.title}`}
          className={cx(
            'group relative overflow-hidden rounded-card border border-line transition-colors duration-500 hover:border-gold/40',
            SPAN_CLASS[item.span] ?? '',
          )}
        >
          <Photo
            id={item.image}
            alt={item.title}
            sizes="(max-width: 640px) 50vw, 33vw"
            widths={[420, 640, 900, 1200]}
            className="transition-transform duration-[1600ms] ease-premium group-hover:scale-105"
          />

          <span className="absolute inset-0 bg-coffee-950/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-coffee-950/55 text-gold backdrop-blur-sm">
              <Expand className="h-4 w-4" />
            </span>
          </span>

          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-coffee-950/90 via-coffee-950/40 to-transparent px-4 pb-3.5 pt-10 text-start">
            <span className="block text-[11px] text-gold/80">{item.category}</span>
            <span className="mt-0.5 block text-sm font-medium text-cream">{item.title}</span>
          </span>
        </button>
      ))}
    </div>
  )
}
