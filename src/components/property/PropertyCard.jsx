import { Link } from 'react-router-dom'
import Photo from '../ui/Photo.jsx'
import FavouriteButton from './FavouriteButton.jsx'
import { Area, Bath, Bed, MapPin } from '../ui/Icons.jsx'
import { cx, formatLocation, formatNumber, formatPrice } from '../../lib/utils.js'

const CARD_SIZES = '(min-width: 1280px) 34vw, (min-width: 1024px) 40vw, (min-width: 640px) 60vw, 86vw'

/**
 * The single reusable property card used by the carousel, the results grid and
 * the "similar properties" rail.
 */
export default function PropertyCard({ property, className = '', sizes = CARD_SIZES, priority = false }) {
  const { slug, name, location, price, type, beds, baths, sqft, images } = property

  return (
    <article className={cx('group relative', className)}>
      <Link
        to={`/properties/${slug}`}
        className="block rounded-card focus-visible:ring-2 focus-visible:ring-champagne-500 focus-visible:ring-offset-4"
        aria-label={`View ${name}, ${formatLocation(location)}`}
      >
        <div className="relative overflow-hidden rounded-card bg-navy-100">
          <div className="aspect-[4/3]">
            <Photo
              id={images[0]}
              alt={`${name} — ${type} in ${formatLocation(location)}`}
              sizes={sizes}
              priority={priority}
              className="transition-transform duration-[1100ms] ease-premium group-hover:scale-[1.05]"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/45 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-pill bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-label text-navy-800 backdrop-blur">
            {type}
          </span>
        </div>

        <div className="mt-5 flex items-start justify-between gap-5">
          <div className="min-w-0">
            <h3 className="truncate text-[17px] font-semibold text-navy-950 transition-colors duration-300 group-hover:text-champagne-700">
              {name}
            </h3>
            <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-navy-400">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{formatLocation(location)}</span>
            </p>
          </div>
          <p className="shrink-0 text-[17px] font-semibold text-navy-950">{formatPrice(price)}</p>
        </div>

        <dl className="mt-4 flex items-center gap-5 border-t border-navy-100 pt-4 text-[13px] text-navy-500">
          <div className="flex items-center gap-2">
            <Bed className="h-4 w-4 text-champagne-500" />
            <dt className="sr-only">Bedrooms</dt>
            <dd>{beds} bd</dd>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="h-4 w-4 text-champagne-500" />
            <dt className="sr-only">Bathrooms</dt>
            <dd>{baths} ba</dd>
          </div>
          <div className="flex items-center gap-2">
            <Area className="h-4 w-4 text-champagne-500" />
            <dt className="sr-only">Interior area</dt>
            <dd>{formatNumber(sqft)} sqft</dd>
          </div>
        </dl>
      </Link>

      <FavouriteButton
        propertyId={property.id}
        propertyName={name}
        className="absolute right-4 top-4 z-10"
      />
    </article>
  )
}
