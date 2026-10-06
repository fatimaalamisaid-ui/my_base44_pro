import { useState } from 'react'
import { Select } from '../ui/FormField.jsx'
import { ChevronDown, Close, Heart, Search, Sliders } from '../ui/Icons.jsx'
import { PROPERTY_TYPES } from '../../data/properties.js'
import { cx, formatPriceShort } from '../../lib/utils.js'

const MIN_PRICES = [1500000, 2000000, 2500000, 3000000, 4000000, 5000000]
const MAX_PRICES = [2000000, 2500000, 3000000, 4000000, 5000000, 7000000]

const BED_OPTIONS = [2, 3, 4, 5]
const BATH_OPTIONS = [2, 3, 4, 5]

const SORTS = [
  { value: 'featured', label: 'Featured first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'size-desc', label: 'Largest first' },
  { value: 'newest', label: 'Newest first' },
]

/** Small labelled control used inside the filter panel. */
function FilterField({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-medium tracking-label text-navy-400">{label}</span>
      {children}
    </label>
  )
}

const compactSelect = 'py-2.5 text-[13px]'

/**
 * Controlled filter bar. The parent owns state (URL-backed) and receives the
 * full filter object on every change.
 */
export default function PropertyFilters({
  filters,
  onChange,
  locations,
  resultCount,
  savedCount = 0,
  onClear,
  className = '',
}) {
  const [openOnMobile, setOpenOnMobile] = useState(false)

  const set = (key) => (event) => onChange({ ...filters, [key]: event.target.value })

  const activeCount = [
    filters.query,
    filters.location,
    filters.type,
    filters.minPrice,
    filters.maxPrice,
    filters.beds,
    filters.baths,
    filters.savedOnly ? 'saved' : '',
  ].filter(Boolean).length

  return (
    <div className={cx('rounded-card border border-navy-100 bg-white p-5 shadow-soft lg:p-6', className)}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
          <input
            type="search"
            value={filters.query}
            onChange={set('query')}
            placeholder="Search by name, city or state"
            aria-label="Search properties"
            className="w-full rounded-lg border border-navy-200 bg-white py-3 pl-11 pr-4 text-sm text-navy-900 placeholder:text-navy-300 transition-colors duration-300 focus:border-navy-900 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpenOnMobile((open) => !open)}
            aria-expanded={openOnMobile}
            aria-controls="filter-panel"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-pill border border-navy-200 px-5 py-3 text-[13px] font-medium tracking-wide2 text-navy-800 transition-colors duration-300 hover:border-navy-900 lg:hidden"
          >
            <Sliders className="h-4 w-4" />
            Filters
            {activeCount > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-navy-900 px-1.5 text-[10px] text-white">
                {activeCount}
              </span>
            )}
          </button>

          <FilterField label="SORT BY">
            <Select
              value={filters.sort}
              onChange={set('sort')}
              aria-label="Sort properties"
              className={cx(compactSelect, 'min-w-[190px]')}
            >
              {SORTS.map((sort) => (
                <option key={sort.value} value={sort.value}>
                  {sort.label}
                </option>
              ))}
            </Select>
          </FilterField>
        </div>
      </div>

      {/* Filter panel */}
      <div
        id="filter-panel"
        className={cx(
          'grid transition-all duration-500 ease-premium lg:mt-5 lg:grid lg:opacity-100',
          openOnMobile ? 'mt-5 grid-cols-2 gap-4 opacity-100 lg:grid-cols-3 xl:grid-cols-6' : 'hidden opacity-0 lg:grid-cols-3 xl:grid-cols-6 lg:gap-4',
        )}
      >
        <FilterField label="LOCATION">
          <Select value={filters.location} onChange={set('location')} className={compactSelect} aria-label="Filter by location">
            <option value="">All locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </Select>
        </FilterField>

        <FilterField label="PROPERTY TYPE">
          <Select value={filters.type} onChange={set('type')} className={compactSelect} aria-label="Filter by property type">
            <option value="">All types</option>
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </FilterField>

        <FilterField label="MIN PRICE">
          <Select value={filters.minPrice} onChange={set('minPrice')} className={compactSelect} aria-label="Minimum price">
            <option value="">No minimum</option>
            {MIN_PRICES.map((price) => (
              <option key={price} value={price}>
                {formatPriceShort(price)}
              </option>
            ))}
          </Select>
        </FilterField>

        <FilterField label="MAX PRICE">
          <Select value={filters.maxPrice} onChange={set('maxPrice')} className={compactSelect} aria-label="Maximum price">
            <option value="">No maximum</option>
            {MAX_PRICES.map((price) => (
              <option key={price} value={price}>
                {formatPriceShort(price)}
              </option>
            ))}
          </Select>
        </FilterField>

        <FilterField label="BEDROOMS">
          <Select value={filters.beds} onChange={set('beds')} className={compactSelect} aria-label="Minimum bedrooms">
            <option value="">Any</option>
            {BED_OPTIONS.map((count) => (
              <option key={count} value={count}>
                {count}+ bedrooms
              </option>
            ))}
          </Select>
        </FilterField>

        <FilterField label="BATHROOMS">
          <Select value={filters.baths} onChange={set('baths')} className={compactSelect} aria-label="Minimum bathrooms">
            <option value="">Any</option>
            {BATH_OPTIONS.map((count) => (
              <option key={count} value={count}>
                {count}+ bathrooms
              </option>
            ))}
          </Select>
        </FilterField>
      </div>

      {/* Footer row */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-navy-100 pt-4">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-[13px] text-navy-500" aria-live="polite">
            {resultCount} {resultCount === 1 ? 'property' : 'properties'}
          </p>
          {savedCount > 0 && (
            <button
              type="button"
              onClick={() => onChange({ ...filters, savedOnly: !filters.savedOnly })}
              aria-pressed={filters.savedOnly}
              className={cx(
                'inline-flex items-center gap-2 rounded-pill border px-3.5 py-1.5 text-[12px] font-medium transition-colors duration-300',
                filters.savedOnly
                  ? 'border-champagne-500 bg-champagne-400/15 text-champagne-700'
                  : 'border-navy-200 text-navy-600 hover:border-navy-900',
              )}
            >
              <Heart filled={filters.savedOnly} className="h-3.5 w-3.5" />
              Saved only ({savedCount})
            </button>
          )}
        </div>

        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-2 text-[12px] font-medium tracking-wide2 text-navy-500 transition-colors duration-300 hover:text-navy-900"
          >
            <Close className="h-3.5 w-3.5" />
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}

export { SORTS }
