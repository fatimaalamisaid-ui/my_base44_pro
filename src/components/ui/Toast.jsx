import { useEffect } from 'react'
import { Check } from './Icons.jsx'

/** Small confirmation toast anchored to the bottom of the viewport. */
export default function Toast({ message, onClose, duration = 3200 }) {
  useEffect(() => {
    if (!message) return undefined
    const timer = setTimeout(() => onClose?.(), duration)
    return () => clearTimeout(timer)
  }, [message, onClose, duration])

  if (!message) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex justify-center px-4"
    >
      <div className="animate-toast-in flex items-center gap-3 rounded-pill border border-gold/40 bg-coffee-800/95 px-5 py-3 text-sm text-cream shadow-modal backdrop-blur-md">
        <Check className="h-4 w-4 shrink-0 text-gold" />
        <span>{message}</span>
      </div>
    </div>
  )
}
