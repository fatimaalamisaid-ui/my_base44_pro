import Photo from '../ui/Photo.jsx'
import { Bag } from '../ui/Icons.jsx'
import { cx, priceLabel } from '../../lib/utils.js'

/**
 * One menu item. The whole card is a single button that opens the product
 * modal, so there is never a nested interactive element inside a card.
 */
export default function ProductCard({ product, onSelect, className = '' }) {
  const unavailable = !product.available

  return (
    <article className={cx('h-full', className)}>
      <button
        type="button"
        onClick={() => onSelect(product)}
        disabled={unavailable}
        aria-label={`${product.name} — مشاهده جزئیات و افزودن به سفارش`}
        className={cx(
          'group flex h-full w-full flex-col overflow-hidden rounded-card border border-line bg-coffee-800 text-start transition-all duration-500 ease-premium',
          unavailable
            ? 'cursor-not-allowed opacity-60'
            : 'hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-lift',
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Photo
            id={product.image}
            alt={product.name}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
            widths={[420, 640, 900]}
            className={cx(
              'transition-transform duration-[1400ms] ease-premium',
              !unavailable && 'group-hover:scale-105',
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/75 via-coffee-950/10 to-transparent" />

          {product.badge && (
            <span className="absolute end-3 top-3 rounded-pill border border-gold/40 bg-coffee-950/70 px-3 py-1 text-[10px] font-semibold text-gold backdrop-blur-sm">
              {product.badge}
            </span>
          )}

          {unavailable && (
            <span className="absolute inset-x-0 bottom-0 bg-coffee-950/85 py-2 text-center text-[11px] text-sand">
              فعلاً ناموجود است
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-bold text-cream">{product.name}</h3>
          <p className="mt-2 flex-1 text-[13px] leading-relaxed text-sand/65">{product.description}</p>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
            <span className="text-sm font-semibold text-gold">{priceLabel(product.price)}</span>
            <span className="inline-flex items-center gap-1.5 rounded-pill border border-line px-3.5 py-1.5 text-[11px] font-medium text-cream transition-colors duration-300 group-hover:border-gold group-hover:text-gold">
              <Bag className="h-3.5 w-3.5" />
              سفارش
            </span>
          </div>
        </div>
      </button>
    </article>
  )
}
