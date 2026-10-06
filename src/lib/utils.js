/** Join conditional class names. */
export function cx(...parts) {
  return parts.filter(Boolean).join(' ')
}

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

/** 1404 -> "۱۴۰۴" */
export function toPersianDigits(value) {
  return String(value ?? '').replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[Number(digit)])
}

/** 185000 -> "۱۸۵٬۰۰۰" */
export function formatToman(value) {
  const amount = Number(value)
  if (!Number.isFinite(amount)) return ''
  return toPersianDigits(amount.toLocaleString('en-US')).replace(/,/g, '٬')
}

/** 185000 -> "۱۸۵٬۰۰۰ تومان" */
export function priceLabel(value) {
  const formatted = formatToman(value)
  return formatted ? `${formatted} تومان` : ''
}

/** Persian ordinal-ish count label: "۳ آیتم" */
export function countLabel(count, singular, plural) {
  return `${toPersianDigits(count)} ${count === 1 ? singular : plural}`
}

export function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
