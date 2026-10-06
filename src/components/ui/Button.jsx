import { Link } from 'react-router-dom'
import { cx } from '../../lib/utils.js'

const VARIANTS = {
  /* Cream pill — the primary action, straight from the reference */
  primary: 'bg-cream text-coffee-900 hover:bg-cream-200',
  /* Subtle gold — used sparingly for emphasis */
  gold: 'bg-gold text-coffee-950 hover:bg-gold-300',
  /* Outlined on dark surfaces */
  outline: 'border border-line text-cream hover:border-gold hover:text-gold',
  /* Quieter still */
  ghost: 'text-gold hover:text-gold-300',
}

const SIZES = {
  sm: 'px-4 py-2 text-[12px]',
  md: 'px-6 py-3 text-[13px]',
  lg: 'px-8 py-4 text-sm',
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
    'group/btn inline-flex items-center justify-center gap-2 rounded-pill font-medium transition-all duration-300 ease-premium disabled:cursor-not-allowed disabled:opacity-60',
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
