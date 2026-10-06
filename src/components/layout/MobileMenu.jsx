import { NavLink } from 'react-router-dom'
import { cx } from '../../lib/utils.js'
import { ArrowForward, Instagram, Mail, Phone, Telegram, WhatsApp } from '../ui/Icons.jsx'

const socialIcons = { instagram: Instagram, telegram: Telegram, whatsapp: WhatsApp }
const socialLabels = { instagram: 'اینستاگرام', telegram: 'تلگرام', whatsapp: 'واتساپ' }

/** Full-screen RTL navigation for small screens. */
export default function MobileMenu({ open, onClose, links, settings, activePath }) {
  return (
    <div
      id="mobile-menu"
      hidden={!open}
      className={cx(
        'fixed inset-0 z-40 overflow-y-auto bg-coffee-950/95 backdrop-blur-md transition-opacity duration-500 ease-premium md:hidden',
        open ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <div className="flex min-h-full flex-col px-6 pb-12 pt-[96px]">
        <nav aria-label="ناوبری موبایل">
          <ul className="border-y border-line">
            {links.map((link, index) => {
              const isActive = activePath === link.to
              return (
                <li key={link.to} className="border-b border-line last:border-b-0">
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={onClose}
                    className={cx(
                      'flex w-full items-center justify-between py-4 text-start text-2xl font-bold transition-all duration-500 ease-premium',
                      isActive ? 'text-gold' : 'text-cream',
                      open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
                    )}
                    style={{ transitionDelay: open ? `${70 + index * 45}ms` : '0ms' }}
                  >
                    {link.label}
                    <ArrowForward className="h-5 w-5 text-gold/70" />
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>

        <div
          className={cx(
            'mt-10 space-y-4 text-sm text-sand/70 transition-opacity duration-500',
            open ? 'opacity-100' : 'opacity-0',
          )}
          style={{ transitionDelay: open ? '360ms' : '0ms' }}
        >
          <a href={settings.phoneHref} className="flex items-center gap-3 hover:text-cream">
            <Phone className="h-4 w-4 text-gold" />
            {settings.phone}
          </a>
          <a href={`mailto:${settings.email}`} className="flex items-center gap-3 hover:text-cream">
            <Mail className="h-4 w-4 text-gold" />
            {settings.email}
          </a>
          <p>{settings.openingHours}</p>

          <ul className="flex flex-wrap items-center gap-3 pt-2">
            {Object.entries(settings.socials).map(([key, href]) => {
              const Icon = socialIcons[key]
              if (!Icon) return null
              return (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={socialLabels[key]}
                    className="inline-flex items-center gap-2 rounded-pill border border-line px-3.5 py-2 text-xs text-sand/70 transition-colors duration-300 hover:border-gold hover:text-gold"
                  >
                    <Icon className="h-4 w-4" />
                    {socialLabels[key]}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
