import { useState } from 'react'
import Container from '../components/ui/Container.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import PageHeader from '../components/layout/PageHeader.jsx'
import Button from '../components/ui/Button.jsx'
import { Field, Input, Select, Textarea } from '../components/ui/FormField.jsx'
import { Check, Clock, Mail, MapPin, Phone } from '../components/ui/Icons.jsx'
import { company } from '../data/site.js'
import { saveInquiry } from '../lib/storage.js'
import { useDocumentTitle } from '../lib/hooks.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const INTERESTS = [
  'Buying a home',
  'Selling a home',
  'Investment property',
  'Valuation',
  'Relocation',
  'Something else',
]

const EMPTY = { name: '', email: '', phone: '', interest: '', message: '' }

export default function Contact() {
  useDocumentTitle('Contact — Horizon Properties')

  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const update = (key) => (event) => setValues((current) => ({ ...current, [key]: event.target.value }))

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!values.name.trim()) nextErrors.name = 'Please tell us your name.'
    if (!EMAIL_RE.test(values.email)) nextErrors.email = 'Please enter a valid email address.'
    if (!values.message.trim()) nextErrors.message = 'Please add a short message.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    saveInquiry({ kind: 'contact-page', ...values })
    setSent(true)
    setValues(EMPTY)
  }

  return (
    <>
      <PageHeader
        label="CONTACT"
        title="Let's talk about property"
        description="Tell us what you are looking for, or what you own. We reply within one working day — and there is never any pressure to proceed."
      />

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
            {/* Form */}
            <Reveal>
              <SectionLabel>ENQUIRY</SectionLabel>
              <h2 className="mt-6 text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-[1.12] tracking-tight text-navy-950">
                Send us a message
              </h2>

              {sent ? (
                <div className="mt-10 flex items-start gap-4 rounded-card bg-cream-100 p-6">
                  <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-900 text-white">
                    <Check className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-medium text-navy-950">Thank you — your message is with us.</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-navy-500">
                      An advisor will reply within one working day. If it is urgent, call{' '}
                      <a href={company.phoneHref} className="text-navy-900 underline underline-offset-4">
                        {company.phone}
                      </a>
                      .
                    </p>
                    <Button variant="outline" size="sm" className="mt-5" onClick={() => setSent(false)}>
                      Send another message
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-9 space-y-6" noValidate>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="NAME" htmlFor="contact-name" error={errors.name}>
                      <Input
                        id="contact-name"
                        value={values.name}
                        onChange={update('name')}
                        error={errors.name}
                        autoComplete="name"
                        placeholder="Your name"
                      />
                    </Field>
                    <Field label="EMAIL" htmlFor="contact-email" error={errors.email}>
                      <Input
                        id="contact-email"
                        type="email"
                        value={values.email}
                        onChange={update('email')}
                        error={errors.email}
                        autoComplete="email"
                        placeholder="you@email.com"
                      />
                    </Field>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="PHONE" htmlFor="contact-phone">
                      <Input
                        id="contact-phone"
                        type="tel"
                        value={values.phone}
                        onChange={update('phone')}
                        autoComplete="tel"
                        placeholder="Optional"
                      />
                    </Field>
                    <Field label="I AM INTERESTED IN" htmlFor="contact-interest">
                      <Select id="contact-interest" value={values.interest} onChange={update('interest')}>
                        <option value="">Please choose</option>
                        {INTERESTS.map((interest) => (
                          <option key={interest} value={interest}>
                            {interest}
                          </option>
                        ))}
                      </Select>
                    </Field>
                  </div>

                  <Field label="MESSAGE" htmlFor="contact-message" error={errors.message}>
                    <Textarea
                      id="contact-message"
                      rows={5}
                      value={values.message}
                      onChange={update('message')}
                      error={errors.message}
                      placeholder="Tell us a little about what you are looking for."
                    />
                  </Field>

                  <Button type="submit" variant="primary" size="lg">
                    Send message
                  </Button>
                </form>
              )}
            </Reveal>

            {/* Details */}
            <Reveal delay={120}>
              <div className="rounded-card border border-navy-100 bg-cream-50 p-8 lg:sticky lg:top-28">
                <h2 className="text-base font-semibold text-navy-950">Office</h2>

                <ul className="mt-7 space-y-6 text-[14px] text-navy-600">
                  <li className="flex gap-4">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-champagne-500" />
                    <div>
                      <p className="text-[10px] font-medium tracking-label text-navy-400">PHONE</p>
                      <a href={company.phoneHref} className="mt-1 block transition-colors hover:text-navy-950">
                        {company.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-champagne-500" />
                    <div>
                      <p className="text-[10px] font-medium tracking-label text-navy-400">EMAIL</p>
                      <a
                        href={`mailto:${company.email}`}
                        className="mt-1 block transition-colors hover:text-navy-950"
                      >
                        {company.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-champagne-500" />
                    <div>
                      <p className="text-[10px] font-medium tracking-label text-navy-400">ADDRESS</p>
                      {company.address.map((line) => (
                        <p key={line} className="mt-1">
                          {line}
                        </p>
                      ))}
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-champagne-500" />
                    <div>
                      <p className="text-[10px] font-medium tracking-label text-navy-400">OFFICE HOURS</p>
                      <p className="mt-1">{company.hours}</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-9 border-t border-navy-100 pt-7">
                  <p className="text-[13px] leading-relaxed text-navy-500">
                    Prefer to view a property first? Every listing page has a direct request form, and our
                    advisors can usually arrange a viewing within 48 hours.
                  </p>
                  <Button to="/properties" variant="outline" size="md" className="mt-6 w-full">
                    Browse properties
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}
