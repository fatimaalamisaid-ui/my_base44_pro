import { useEffect, useRef, useState } from 'react'
import Button from '../ui/Button.jsx'
import { Field, Input, Textarea } from '../ui/FormField.jsx'
import { Calendar, Check, Close } from '../ui/Icons.jsx'
import { useEscape, useLockBodyScroll } from '../../lib/hooks.js'
import { saveInquiry } from '../../lib/storage.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Lead-capture modal used by "Contact agent" and "Schedule a viewing".
 * Submissions are stored locally for now — point `saveInquiry` at an API call
 * to send them to a backend.
 */
export default function InquiryModal({ open, onClose, mode = 'contact', property }) {
  const [values, setValues] = useState({ name: '', email: '', phone: '', date: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const firstFieldRef = useRef(null)

  useLockBodyScroll(open)
  useEscape(open, onClose)

  useEffect(() => {
    if (!open) {
      setSent(false)
      setErrors({})
      setValues({ name: '', email: '', phone: '', date: '', message: '' })
      return
    }
    const timer = window.setTimeout(() => firstFieldRef.current?.focus(), 80)
    return () => window.clearTimeout(timer)
  }, [open])

  if (!open) return null

  const isViewing = mode === 'viewing'
  const title = isViewing ? 'Schedule a viewing' : 'Contact the advisor'

  function update(key) {
    return (event) => setValues((current) => ({ ...current, [key]: event.target.value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!values.name.trim()) nextErrors.name = 'Please tell us your name.'
    if (!EMAIL_RE.test(values.email)) nextErrors.email = 'Please enter a valid email address.'
    if (isViewing && !values.date) nextErrors.date = 'Please choose a preferred date.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    saveInquiry({
      kind: isViewing ? 'viewing' : 'contact',
      propertyId: property?.id ?? null,
      propertyName: property?.name ?? null,
      ...values,
    })
    setSent(true)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-title"
      className="fixed inset-0 z-[80] flex items-end justify-center overflow-y-auto bg-navy-950/70 p-0 backdrop-blur-sm animate-overlay-in sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-t-2xl bg-white p-6 shadow-lift animate-fade-up sm:rounded-card sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="label">{isViewing ? 'PRIVATE VIEWING' : 'ENQUIRY'}</p>
            <h2 id="inquiry-title" className="mt-3 text-2xl font-semibold text-navy-950">
              {title}
            </h2>
            {property && (
              <p className="mt-2 text-sm text-navy-500">
                {property.name} · {property.location.city}, {property.location.state}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-navy-200 text-navy-700 transition-colors duration-300 hover:border-navy-900"
          >
            <Close className="h-4 w-4" />
          </button>
        </div>

        {sent ? (
          <div className="mt-8 flex items-start gap-4 rounded-card bg-cream-100 p-5">
            <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 text-white">
              <Check className="h-4 w-4" />
            </span>
            <div>
              <p className="font-medium text-navy-950">Thank you — your request is with us.</p>
              <p className="mt-1 text-sm text-navy-500">
                {isViewing
                  ? 'An advisor will confirm your viewing time within one working day.'
                  : 'An advisor will be in touch within one working day.'}
              </p>
              <Button variant="outline" size="sm" className="mt-4" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="NAME" htmlFor="inquiry-name" error={errors.name}>
                <Input
                  id="inquiry-name"
                  ref={firstFieldRef}
                  value={values.name}
                  onChange={update('name')}
                  error={errors.name}
                  aria-describedby={errors.name ? 'inquiry-name-error' : undefined}
                  autoComplete="name"
                  placeholder="Your name"
                />
              </Field>
              <Field label="EMAIL" htmlFor="inquiry-email" error={errors.email}>
                <Input
                  id="inquiry-email"
                  type="email"
                  value={values.email}
                  onChange={update('email')}
                  error={errors.email}
                  autoComplete="email"
                  placeholder="you@email.com"
                />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="PHONE" htmlFor="inquiry-phone">
                <Input
                  id="inquiry-phone"
                  type="tel"
                  value={values.phone}
                  onChange={update('phone')}
                  autoComplete="tel"
                  placeholder="Optional"
                />
              </Field>
              {isViewing && (
                <Field label="PREFERRED DATE" htmlFor="inquiry-date" error={errors.date}>
                  <Input
                    id="inquiry-date"
                    type="date"
                    value={values.date}
                    onChange={update('date')}
                    error={errors.date}
                    min={new Date().toISOString().slice(0, 10)}
                  />
                </Field>
              )}
            </div>

            <Field
              label="MESSAGE"
              htmlFor="inquiry-message"
              hint={isViewing ? 'Anything we should know before the viewing?' : undefined}
            >
              <Textarea
                id="inquiry-message"
                value={values.message}
                onChange={update('message')}
                placeholder={
                  isViewing
                    ? 'We would like to see the house at the weekend.'
                    : 'I would like more information about this property.'
                }
              />
            </Field>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button type="submit" size="lg" variant="primary">
                {isViewing ? (
                  <>
                    <Calendar className="h-4 w-4" /> Request viewing
                  </>
                ) : (
                  'Send enquiry'
                )}
              </Button>
              <Button type="button" variant="ghost" size="lg" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
