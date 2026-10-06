import { DEFAULT_WIDTHS, photoSrcSet, photoUrl } from '../../lib/images.js'
import { cx } from '../../lib/utils.js'

/**
 * Responsive, lazy-loaded photograph. Always render it inside a sized wrapper
 * (aspect-ratio class) so images never cause layout shift.
 */
export default function Photo({
  id,
  alt,
  className = '',
  sizes = '100vw',
  widths = DEFAULT_WIDTHS,
  quality = 78,
  priority = false,
}) {
  return (
    <img
      src={photoUrl(id, widths[Math.min(2, widths.length - 1)], quality)}
      srcSet={photoSrcSet(id, widths, quality)}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={cx('h-full w-full object-cover', className)}
    />
  )
}
