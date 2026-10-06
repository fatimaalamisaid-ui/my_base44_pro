import { cx } from '../../lib/utils.js'

/**
 * Horizontal category filter. Scrolls as a rail on mobile, wraps and centres
 * on larger screens. Uses aria-pressed so the state is announced correctly.
 */
export default function CategoryTabs({ categories, activeId, onChange, className = '' }) {
  return (
    <div
      role="group"
      aria-label="دسته‌بندی منو"
      className={cx(
        'no-scrollbar snap-rail -mx-5 flex gap-2.5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0',
        className,
      )}
    >
      {categories.map((category) => {
        const isActive = category.id === activeId
        return (
          <button
            key={category.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(category.id)}
            className={cx(
              'shrink-0 rounded-pill border px-5 py-2.5 text-[13px] font-medium transition-all duration-300 ease-premium',
              isActive
                ? 'border-gold bg-gold text-coffee-950'
                : 'border-line text-sand/75 hover:border-gold/50 hover:text-cream',
            )}
          >
            {category.label}
          </button>
        )
      })}
    </div>
  )
}
