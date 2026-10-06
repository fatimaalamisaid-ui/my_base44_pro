/** Join conditional class names. */
export function cx(...parts) {
  return parts.filter(Boolean).join(' ')
}

/** 2350000 -> "$2.35 Million" */
export function formatPrice(value) {
  if (!Number.isFinite(value)) return 'Price on request'
  if (value >= 1_000_000) {
    const millions = Math.round((value / 1_000_000) * 100) / 100
    return `$${millions} Million`
  }
  if (value >= 1_000) return `$${Math.round(value / 1_000)}K`
  return `$${value}`
}

/** Compact price used inside filter controls: 2350000 -> "$2.35M" */
export function formatPriceShort(value) {
  return formatPrice(value).replace(' Million', 'M')
}

export function formatNumber(value) {
  return Number(value).toLocaleString('en-US')
}

export function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/** "Austin, Texas, USA" for cards and meta rows. */
export function formatLocation(location) {
  if (!location) return ''
  return [location.city, location.state, location.country].filter(Boolean).join(', ')
}

export function pluralize(count, singular, plural) {
  return `${count} ${count === 1 ? singular : plural}`
}
