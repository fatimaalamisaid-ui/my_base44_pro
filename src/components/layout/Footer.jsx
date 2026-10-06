import { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '../ui/Container.jsx'
import Button from '../ui/Button.jsx'
import { LogoMark, ArrowRight, Check, Mail, MapPin, Phone, socialIcons } from '../ui/Icons.jsx'
import { company, navLinks, services } from '../../data/site.js'
import { saveInquiry } from '../../lib/storage.js'

function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    saveInquiry({ kind: 'newsletter', email })
    setDone(true)
    setEmail('')
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5" noValidate>
      <label htmlFor="newsletter-email" className="mb-2 block text-[11px] tracking-label text-white/50">
        NEW LISTINGS, ONCE A MONTH
      </label>
      <div className="flex items-center gap-2">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@email.com"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'newsletter-error' : undefined}
          className="w-full rounded-pill border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-champagne-400 focus:outline-none"
        />
        <Button type="submit" variant="accent" size="sm" className="shrink-0" aria-label="Subscribe to the newsletter">
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      {error && (
        <p id="newsletter-error" className="mt-2 text-xs text-champagne-300">
          {error}
        </p>
      )}
      {done && (
        <p className="mt-2 flex items-center gap-2 text-xs text-champagne-300">
          <Check className="h-4 w-4" /> Thank you — you are on the list.
        </p>
      )}
    </form>
  )
}

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white/70">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 text-white" aria-label={`${company.name} — home`}>
              <LogoMark className="h-9 w-9 shrink-0 text-champagne-400" />
              <span className="flex flex-col leading-none">
                <span className="text-[15px] font-semibold tracking-[0.2em]">HORIZON</span>
                <span className="mt-1 text-[9px] font-medium tracking-[0.34em] opacity-70">PROPERTIES</span>
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">{company.description}</p>
            <ul className="mt-6 flex items-center gap-3">
              {company.socials.map((social) => {
                const Icon = socialIcons[social.label]
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={social.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-300 hover:border-champagne-400 hover:text-champagne-400"
                    >
                      {Icon ? <Icon className="h-4 w-4" /> : null}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h2 className="text-[11px] tracking-label text-white/45">EXPLORE</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition-colors duration-300 hover:text-champagne-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h2 className="text-[11px] tracking-label text-white/45">SERVICES</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services#${service.id}`}
                    className="transition-colors duration-300 hover:text-champagne-400"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + newsletter */}
          <div>
            <h2 className="text-[11px] tracking-label text-white/45">CONTACT</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href={company.phoneHref} className="flex items-center gap-3 transition-colors hover:text-champagne-400">
                  <Phone className="h-4 w-4 text-champagne-400" />
                  {company.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-center gap-3 transition-colors hover:text-champagne-400"
                >
                  <Mail className="h-4 w-4 text-champagne-400" />
                  {company.email}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-champagne-400" />
                <span>
                  {company.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
            <Newsletter />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p className="flex gap-5">
            <span>Privacy</span>
            <span>Terms</span>
            <span>{company.hours}</span>
          </p>
        </div>
      </Container>
    </footer>
  )
}
