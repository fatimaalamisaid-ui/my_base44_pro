import { Heart } from '../ui/Icons.jsx'
import { useFavouriteState } from '../../context/FavouritesContext.jsx'
import { cx } from '../../lib/utils.js'

/** Save / unsave toggle. Works on cards and on the detail page. */
export default function FavouriteButton({ propertyId, propertyName, className = '', tone = 'light' }) {
  const { isFavourite, toggle } = useFavouriteState()
  const active = isFavourite(propertyId)

  return (
    <button
      type="button"
      onClick={() => toggle(propertyId)}
      aria-pressed={active}
      aria-label={active ? `Remove ${propertyName} from saved properties` : `Save ${propertyName}`}
      className={cx(
        'inline-flex h-10 w-10 items-center justify-center rounded-full backdrop-blur transition-colors duration-300 ease-premium',
        tone === 'light'
          ? active
            ? 'bg-champagne-400 text-navy-950'
            : 'bg-white/85 text-navy-800 hover:bg-white'
          : active
            ? 'bg-champagne-400 text-navy-950'
            : 'border border-navy-200 bg-white text-navy-700 hover:border-navy-900',
        className,
      )}
    >
      <Heart filled={active} className="h-[18px] w-[18px]" />
    </button>
  )
}
