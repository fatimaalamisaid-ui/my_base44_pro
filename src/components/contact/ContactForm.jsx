import { useState } from 'react'
import Button from '../ui/Button.jsx'
import { Check, Send } from '../ui/Icons.jsx'
import { saveMessage } from '../../lib/storage.js'
import { cx } from '../../lib/utils.js'

const SUBJECTS = ['رزرو میز', 'سفارش گروهی', 'پیشنهاد یا انتقاد', 'همکاری', 'سایر']

const EMPTY = { name: '', email: '', phone: '', subject: SUBJECTS[0], message: '' }

function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'نام خود را وارد کنید (حداقل ۲ حرف).'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'یک ایمیل معتبر وارد کنید.'
  if (values.phone.trim() && !/^[0-9۰-۹+\-\s()]{7,}$/.test(values.phone.trim()))
    errors.phone = 'شماره تماس معتبر وارد کنید.'
  if (values.message.trim().length < 10) errors.message = 'متن پیام باید حداقل ۱۰ حرف باشد.'
  return errors
}

function Field({ id, label, error, children, hint }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[12px] font-medium text-sand/75">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-[11px] text-sand/40">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[11px] text-gold">
          {error}
        </p>
      )}
    </div>
  )
}

const inputClass = (hasError) =>
  cx(
    'w-full rounded-card border bg-coffee-900/60 px-4 py-3 text-sm text-cream placeholder:text-sand/35 transition-colors duration-300 focus:outline-none',
    hasError ? 'border-gold/70' : 'border-line focus:border-gold/60',
  )

/** Contact / table-reservation form with Persian validation and states. */
export default function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }))
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setStatus('loading')
    window.setTimeout(() => {
      saveMessage(values)
      setStatus('done')
    }, 700)
  }

  if (status === 'done') {
    return (
      <div className="flex flex-col items-center rounded-modal border border-line bg-coffee-800/50 px-8 py-14 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-gold">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="mt-6 text-xl font-bold">پیام شما ثبت شد</h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-sand/65">
          سپاس از پیام شما. تیم کافه و دانه در اولین فرصت با شما تماس می‌گیرد.
        </p>
        <Button
          variant="outline"
          size="md"
          className="mt-8"
          onClick={() => {
            setValues(EMPTY)
            setStatus('idle')
          }}
        >
          ارسال پیام دیگر
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-modal border border-line bg-coffee-800/40 p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="نام و نام خانوادگی" error={errors.name}>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update('name', event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            placeholder="مثلاً سارا محمدی"
            className={inputClass(Boolean(errors.name))}
          />
        </Field>

        <Field id="contact-email" label="ایمیل" error={errors.email}>
          <input
            id="contact-email"
            name="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update('email', event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            placeholder="ایمیل شما"
            className={cx(inputClass(Boolean(errors.email)), 'text-start')}
          />
        </Field>

        <Field id="contact-phone" label="شماره تماس (اختیاری)" error={errors.phone}>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            dir="ltr"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update('phone', event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
            className={cx(inputClass(Boolean(errors.phone)), 'text-start')}
          />
        </Field>

        <Field id="contact-subject" label="موضوع">
          <select
            id="contact-subject"
            name="subject"
            value={values.subject}
            onChange={(event) => update('subject', event.target.value)}
            className={cx(inputClass(false), 'appearance-none')}
          >
            {SUBJECTS.map((subject) => (
              <option key={subject} value={subject} className="bg-coffee-900 text-cream">
                {subject}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field id="contact-message" label="پیام شما" error={errors.message}>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={values.message}
            onChange={(event) => update('message', event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            placeholder="برای رزرو میز، تعداد نفرات و ساعت مورد نظرتان را بنویسید."
            className={cx(inputClass(Boolean(errors.message)), 'resize-none leading-relaxed')}
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] leading-relaxed text-sand/45">
          اطلاعات شما فقط برای پاسخ‌گویی استفاده می‌شود.
        </p>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === 'loading'}
          className={cx('w-full sm:w-auto', status === 'loading' && 'cursor-wait')}
        >
          {status === 'loading' ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-coffee-900/30 border-t-coffee-900" />
              در حال ارسال…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              ارسال پیام
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
