import { forwardRef } from 'react'
import { cx } from '../../lib/utils.js'

export const inputClasses =
  'w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-navy-300 transition-colors duration-300 focus:border-navy-900 focus:outline-none focus:ring-0'

export function Field({ label, htmlFor, error, hint, children, className = '' }) {
  return (
    <div className={cx('space-y-2', className)}>
      {label && (
        <label htmlFor={htmlFor} className="block text-[11px] font-medium tracking-label text-navy-400">
          {label}
        </label>
      )}
      {children}
      {hint && !error && <p className="text-xs text-navy-400">{hint}</p>}
      {error && (
        <p id={`${htmlFor}-error`} className="text-xs text-champagne-700">
          {error}
        </p>
      )}
    </div>
  )
}

export const Input = forwardRef(function Input({ id, error, className = '', ...rest }, ref) {
  return (
    <input
      id={id}
      ref={ref}
      aria-invalid={Boolean(error)}
      className={cx(inputClasses, error && 'border-champagne-600', className)}
      {...rest}
    />
  )
})

export const Textarea = forwardRef(function Textarea({ id, error, className = '', rows = 4, ...rest }, ref) {
  return (
    <textarea
      id={id}
      ref={ref}
      rows={rows}
      aria-invalid={Boolean(error)}
      className={cx(inputClasses, 'resize-none', error && 'border-champagne-600', className)}
      {...rest}
    />
  )
})

export const Select = forwardRef(function Select({ id, error, className = '', children, ...rest }, ref) {
  return (
    <select
      id={id}
      ref={ref}
      aria-invalid={Boolean(error)}
      className={cx(inputClasses, 'cursor-pointer appearance-none pr-10', error && 'border-champagne-600', className)}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2365809A' stroke-width='1.5' stroke-linecap='round'%3E%3Cpath d='M5.5 9.5 12 16l6.5-6.5'/%3E%3C/svg%3E\")",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 14px center',
        backgroundSize: '16px',
      }}
      {...rest}
    >
      {children}
    </select>
  )
})
