/**
 * Inline SVG icon set — no icon library, so the bundle stays small.
 * All icons inherit `currentColor` and are hidden from assistive tech by default.
 */

function Svg({ children, className = 'h-5 w-5', strokeWidth = 1.5, viewBox = '0 0 24 24', ...rest }) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {children}
    </svg>
  )
}

export function LogoMark({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false" className={className}>
      <circle cx="20" cy="20" r="19" stroke="currentColor" strokeOpacity="0.45" />
      <path
        d="M11 25.5 20 12l9 13.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M20 25.5v-6.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function Phone(props) {
  return (
    <Svg {...props}>
      <path d="M6.5 3.5h3l1.5 4-2 1.3a11.5 11.5 0 0 0 5.2 5.2l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />
    </Svg>
  )
}

export function Mail(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </Svg>
  )
}

export function MapPin(props) {
  return (
    <Svg {...props}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </Svg>
  )
}

export function Clock(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </Svg>
  )
}

export function Calendar(props) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
    </Svg>
  )
}

export function ArrowRight(props) {
  return (
    <Svg {...props}>
      <path d="M4.5 12h14M13 6.5l5.5 5.5L13 17.5" />
    </Svg>
  )
}

export function ArrowUpRight(props) {
  return (
    <Svg {...props}>
      <path d="M7 17 17 7M9 7h8v8" />
    </Svg>
  )
}

export function ArrowLeft(props) {
  return (
    <Svg {...props}>
      <path d="M19.5 12h-14M11 6.5 5.5 12l5.5 5.5" />
    </Svg>
  )
}

export function ChevronLeft(props) {
  return (
    <Svg {...props}>
      <path d="M14.5 5.5 8 12l6.5 6.5" />
    </Svg>
  )
}

export function ChevronRight(props) {
  return (
    <Svg {...props}>
      <path d="M9.5 5.5 16 12l-6.5 6.5" />
    </Svg>
  )
}

export function ChevronDown(props) {
  return (
    <Svg {...props}>
      <path d="M5.5 9.5 12 16l6.5-6.5" />
    </Svg>
  )
}

export function Bed(props) {
  return (
    <Svg {...props}>
      <path d="M3.5 18v-6.5h17V18M3.5 18h17M3.5 11.5V7M20.5 11.5V9" />
      <path d="M6.5 11.5V9.5h4v2" />
    </Svg>
  )
}

export function Bath(props) {
  return (
    <Svg {...props}>
      <path d="M3.5 12.5h17v2a4 4 0 0 1-4 4h-9a4 4 0 0 1-4-4v-2Z" />
      <path d="M7 12.5V6.8A2.3 2.3 0 0 1 11.5 6M6.5 18.5 6 21M17.5 18.5l.5 2.5" />
    </Svg>
  )
}

export function Area(props) {
  return (
    <Svg {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 9.5h4.5V4M20 14.5h-4.5V20" />
    </Svg>
  )
}

export function Heart({ filled = false, className = 'h-5 w-5', ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      <path d="M12 20s-7.5-4.4-7.5-9.5A4.5 4.5 0 0 1 12 7.4a4.5 4.5 0 0 1 7.5 3.1C19.5 15.6 12 20 12 20Z" />
    </svg>
  )
}

export function Search(props) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </Svg>
  )
}

export function Sliders(props) {
  return (
    <Svg {...props}>
      <path d="M4 8h10M18 8h2M4 16h4M12 16h8" />
      <circle cx="16" cy="8" r="2" />
      <circle cx="10" cy="16" r="2" />
    </Svg>
  )
}

export function Close(props) {
  return (
    <Svg {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Svg>
  )
}

export function Menu(props) {
  return (
    <Svg {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Svg>
  )
}

export function Check(props) {
  return (
    <Svg {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Svg>
  )
}

/** Architectural key mark used in the CTA band. */
export function KeyMark({ className = 'h-16 w-16' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false" className={className}>
      <circle cx="32" cy="32" r="31" stroke="currentColor" strokeOpacity="0.28" />
      <circle cx="25" cy="25" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M30.5 30.5 45 45M39 39l3.5-3.5M42.5 42.5 46 39"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Quote(props) {
  return (
    <Svg {...props}>
      <path d="M9.5 6.5C7 7.8 5.5 10.2 5.5 13v4.5h5V12H8.2c0-1.6.6-2.8 1.9-3.6ZM18.5 6.5c-2.5 1.3-4 3.7-4 6.5v4.5h5V12h-2.3c0-1.6.6-2.8 1.9-3.6Z" />
    </Svg>
  )
}

export function Instagram(props) {
  return (
    <Svg {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="16.8" cy="7.2" r="0.9" fill="currentColor" stroke="none" />
    </Svg>
  )
}

export function LinkedIn(props) {
  return (
    <Svg {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2.5" />
      <path d="M8 10.5V16M8 8.2v.1M11.5 16v-3.2a2 2 0 0 1 4 0V16" />
    </Svg>
  )
}

export function Facebook(props) {
  return (
    <Svg {...props}>
      <path d="M14.5 8.5h2M14.5 8.5c0-2 1-3 3-3M14.5 8.5V20M10.5 12.5h5" />
      <rect x="4" y="4" width="16" height="16" rx="3" />
    </Svg>
  )
}

export const socialIcons = {
  Instagram,
  LinkedIn,
  Facebook,
}
