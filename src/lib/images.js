const PHOTO_BASE = 'https://images.unsplash.com/photo-'

const DEFAULT_WIDTHS = [640, 960, 1440, 1920]

/** Build a single optimized URL for an Unsplash photo id. */
export function photoUrl(id, width = 1440, quality = 78) {
  return `${PHOTO_BASE}${id}?auto=format&fit=crop&w=${width}&q=${quality}`
}

/** Build a responsive srcset so browsers fetch an appropriately sized file. */
export function photoSrcSet(id, widths = DEFAULT_WIDTHS, quality = 78) {
  return widths.map((width) => `${photoUrl(id, width, quality)} ${width}w`).join(', ')
}

export { DEFAULT_WIDTHS }
