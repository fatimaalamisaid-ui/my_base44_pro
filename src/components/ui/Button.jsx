import { Link } from 'react-router-dom'
import { cx } from '../../lib/utils.js'

const VARIANTS = {
  /* Deep navy — the primary action */
  primary: 'bg-navy-900 text-white hover:bg-navy-800',
  /* Dark outline — secondary action on light sections */
  outline: 'border border-navy-200 text-navy-900 hover:border-navy-900 hover:bg-navy-950 hover:text-white',
  /* Light outline — for use over photography */
  light: 'border border-white/40 text-white hover:bg-white hover:text-navy-950',
  solidLight: 'bg-white text-navy-950 hover:bg-cream-100',
  /* Champagne — used sparingly, for emphasis */
  accent: 'bg-champagne-400 text-navy-950 hover:bg-champagne-300',
  /* Text-only */
  ghost: 'text-navy-900 hover:text-champagne-600',
}

const SIZES = {
  sm: 'px-4 py-2 text-[12px]',
  md: 'px-6 py-3 text-[13px]',
  lg: 'px-7 py-3.5 text-sm',
}

/**
 * One button for the whole site. Renders a router Link, an anchor or a real
 * <button> depending on the props it is given.
 */
export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  type = 'button',
  ...rest
}) {
  const classes = cx(
    'group/btn inline-flex items-center justify-center gap-2 rounded-pill font-medium tracking-wide2 transition-colors duration-300 ease-premium',
    VARIANTS[variant],
    SIZES[size],
    className,
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}
