/**
 * Inline SVG icon set — thin, uniform line art, no icon library.
 *
 * Direction note: the site is RTL, so the "continue" arrow points left.
 * `ArrowForward` / `ChevronForward` are the shapes used for forward
 * navigation; `ArrowBack` / `ChevronBack` point right.
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

/** Circular line-art cup with rising steam — the brand mark placeholder. */
export function LogoMark({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true" focusable="false" className={className}>
      <circle cx="22" cy="22" r="21" stroke="currentColor" strokeOpacity="0.4" />
      <path
        d="M13.5 19h15v6.4a7.5 7.5 0 0 1-15 0z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M28.5 20.6h2.6a3.2 3.2 0 0 1 0 6.4h-2.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M19.4 15.4c1.5-1.5 1.5-3 0-4.5M24.6 15.4c1.5-1.5 1.5-3 0-4.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Menu(props) {
  return (
    <Svg {...props}>
      <path d="M4 7h16M4 12h16M4 17h10" />
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

export function Check(props) {
  return (
    <Svg {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Svg>
  )
}

export function Plus(props) {
  return (
    <Svg {...props}>
      <path d="M12 5.5v13M5.5 12h13" />
    </Svg>
  )
}

export function Minus(props) {
  return (
    <Svg {...props}>
      <path d="M5.5 12h13" />
    </Svg>
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

/** Forward arrow (points left, in reading direction for RTL). */
export function ArrowForward(props) {
  return (
    <Svg {...props}>
      <path d="M19.5 12h-14M11 6.5 5.5 12l5.5 5.5" />
    </Svg>
  )
}

/** Back arrow (points right). */
export function ArrowBack(props) {
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

export function ChevronForward(props) {
  return (
    <Svg {...props}>
      <path d="M14.5 5.5 8 12l6.5 6.5" />
    </Svg>
  )
}

export function ChevronBack(props) {
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

export function ChevronUp(props) {
  return (
    <Svg {...props}>
      <path d="M5.5 14.5 12 8l6.5 6.5" />
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

export function Send(props) {
  return (
    <Svg {...props}>
      <path d="M20.4 4.6 3.9 11.1a.7.7 0 0 0 .1 1.3l4 1.2 1.5 4.6a.7.7 0 0 0 1.2.2l2.1-2.7 4 2.9a.7.7 0 0 0 1.1-.4l2.3-12.7a.7.7 0 0 0-.9-.8Z" />
      <path d="m8 13.6 9.4-7.2" />
    </Svg>
  )
}

export function Bag(props) {
  return (
    <Svg {...props}>
      <path d="M6.4 8h11.2l1 11.5H5.4z" />
      <path d="M9.2 8V6.9a2.8 2.8 0 0 1 5.6 0V8" />
    </Svg>
  )
}

export function Expand(props) {
  return (
    <Svg {...props}>
      <path d="M9.5 4.5H5.6a1.1 1.1 0 0 0-1.1 1.1v3.9M14.5 4.5h3.9a1.1 1.1 0 0 1 1.1 1.1v3.9M14.5 19.5h3.9a1.1 1.1 0 0 0 1.1-1.1v-3.9M9.5 19.5H5.6a1.1 1.1 0 0 1-1.1-1.1v-3.9" />
    </Svg>
  )
}

export function Coffee(props) {
  return (
    <Svg {...props}>
      <path d="M5.5 8.6h10v4.6a5 5 0 0 1-10 0z" />
      <path d="M15.5 9.7h1.7a2.6 2.6 0 0 1 0 5.2h-1.7" />
      <path d="M8.4 5.8c.9-.9.9-1.9 0-2.8M11.6 5.8c.9-.9.9-1.9 0-2.8" />
      <path d="M5.5 20h10.2" />
    </Svg>
  )
}

export function Bean(props) {
  return (
    <Svg {...props}>
      <path d="M6.4 17.6c-2.4-2.4-2-6.6.9-9.5s7.1-3.3 9.5-.9 2 6.6-.9 9.5-7.1 3.3-9.5.9Z" />
      <path d="M8.2 15.8c1.6-3.1 4.7-6.2 7.7-7.7" />
    </Svg>
  )
}

/** Feature icon: magnifying glass with a heart (signature blends). */
export function Blend(props) {
  return (
    <Svg {...props}>
      <circle cx="10.6" cy="10.6" r="6.6" />
      <path d="m15.6 15.6 4.4 4.4" />
      <path d="M10.6 13.4S8 11.9 8 10.2a1.6 1.6 0 0 1 2.6-1.2 1.6 1.6 0 0 1 2.6 1.2c0 1.7-2.6 3.2-2.6 3.2Z" />
    </Svg>
  )
}

/** Feature icon: armchair by the fire (warm atmosphere). */
export function Armchair(props) {
  return (
    <Svg {...props}>
      <path d="M6.4 10.6V8.7A2.7 2.7 0 0 1 9.1 6h5.8a2.7 2.7 0 0 1 2.7 2.7v1.9" />
      <path d="M4.4 12.4h15.2v3.8a1.2 1.2 0 0 1-1.2 1.2H5.6a1.2 1.2 0 0 1-1.2-1.2z" />
      <path d="M6.6 17.4V19.4M17.4 17.4V19.4" />
      <path d="M9.6 12.4v-1.6M14.4 12.4v-1.6" />
    </Svg>
  )
}

/** Feature icon: hand grinder (fresh roast). */
export function Grinder(props) {
  return (
    <Svg {...props}>
      <rect x="7.6" y="9.6" width="8.8" height="8.2" rx="1.3" />
      <path d="M8.8 4.6h6.4l-1 3.1H9.8z" />
      <path d="M10.2 7.7v1.9M13.8 7.7v1.9" />
      <path d="M10.8 13.6h2.4" />
      <path d="M9.9 17.8v1.6M14.1 17.8v1.6" />
    </Svg>
  )
}

export function Quote(props) {
  return (
    <Svg {...props} strokeWidth={1.2}>
      <path d="M10.4 7.4c-2.7 1.2-4.3 3.3-4.3 6v3.2h4.7v-5.3H8.4c0-1.3.7-2.3 2-3zM19.4 7.4c-2.7 1.2-4.3 3.3-4.3 6v3.2h4.7v-5.3h-2.4c0-1.3.7-2.3 2-3z" />
    </Svg>
  )
}

export function Star({ filled = true, className = 'h-4 w-4', ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      <path d="m12 4.4 2.4 4.9 5.4.8-3.9 3.8 1 5.4-4.9-2.6-4.9 2.6 1-5.4L4.2 10l5.4-.8z" />
    </svg>
  )
}

export function Sparkle(props) {
  return (
    <Svg {...props}>
      <path d="M12 4.4 13.3 9l4.6 1.3-4.6 1.3L12 16.2l-1.3-4.6L6.1 10.3 10.7 9z" />
      <path d="M18.6 15.4l.5 1.7 1.7.5-1.7.5-.5 1.7-.5-1.7-1.7-.5 1.7-.5z" />
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

export function Telegram(props) {
  return (
    <Svg {...props}>
      <path d="M20.4 4.6 3.9 11.1a.7.7 0 0 0 .1 1.3l4 1.2 1.5 4.6a.7.7 0 0 0 1.2.2l2.1-2.7 4 2.9a.7.7 0 0 0 1.1-.4l2.3-12.7a.7.7 0 0 0-.9-.8Z" />
      <path d="m8 13.6 9.4-7.2" />
    </Svg>
  )
}

export function WhatsApp(props) {
  return (
    <Svg {...props}>
      <path d="M3.9 20.1l1.3-3.9A8.2 8.2 0 1 1 12 20.4a8.2 8.2 0 0 1-4.1-1.1z" />
      <path d="M9.4 8.7h1l.8 2-1 .9a6.2 6.2 0 0 0 2.2 2.2l.9-1 2 .8v1c0 .7-.6 1.3-1.3 1.2-2.8-.4-5.1-2.7-5.5-5.5-.1-.7.5-1.3 1.2-1.3z" />
    </Svg>
  )
}

export const socialIcons = {
  instagram: Instagram,
  telegram: Telegram,
  whatsapp: WhatsApp,
}

export const featureIcons = {
  blend: Blend,
  armchair: Armchair,
  grinder: Grinder,
  bean: Bean,
  cup: Coffee,
}
