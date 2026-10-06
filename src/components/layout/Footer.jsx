import { Link } from 'react-router-dom'
import Container from '../ui/Container.jsx'
import { LogoMark, Clock, Mail, MapPin, Phone, socialIcons } from '../ui/Icons.jsx'
import { contactInfo, menuCategories, navLinks, siteSettings } from '../../data/site.js'

const menuColumnLinks = menuCategories.filter((category) => category.id !== 'all')

export default function Footer() {
  return (
    <footer className="border-t border-line bg-coffee-950">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3" aria-label={`${siteSettings.brandName} — خانه`}>
              <LogoMark className="h-9 w-9 shrink-0 text-gold" />
              <span className="flex flex-col leading-none">
                <span className="text-[17px] font-bold text-cream">{siteSettings.brandName}</span>
                <span className="mt-1 text-[10px] font-medium text-gold/80">قهوه تخصصی</span>
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-sand/65">
              {siteSettings.description}
            </p>
            <p className="mt-5 flex items-start gap-3 text-sm text-sand/65">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              {siteSettings.openingHours}
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="دسترسی سریع">
            <h2 className="text-[11px] font-semibold text-gold">دسترسی سریع</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sand/70 transition-colors duration-300 hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Menu */}
          <nav aria-label="منوی کافه">
            <h2 className="text-[11px] font-semibold text-gold">منوی کافه</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {menuColumnLinks.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/menu?cat=${category.id}`}
                    className="text-sand/70 transition-colors duration-300 hover:text-gold"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/menu" className="text-sand/70 transition-colors duration-300 hover:text-gold">
                  منوی کامل
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact + social */}
          <div>
            <h2 className="text-[11px] font-semibold text-gold">تماس با ما</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={siteSettings.phoneHref}
                  className="flex items-center gap-3 text-sand/70 transition-colors hover:text-gold"
                >
                  <Phone className="h-4 w-4 shrink-0 text-gold" />
                  {siteSettings.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="flex items-center gap-3 text-sand/70 transition-colors hover:text-gold"
                >
                  <Mail className="h-4 w-4 shrink-0 text-gold" />
                  {siteSettings.email}
                </a>
              </li>
              <li className="flex gap-3 text-sand/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{siteSettings.address}</span>
              </li>
            </ul>

            <h2 className="mt-8 text-[11px] font-semibold text-gold">شبکه‌های اجتماعی</h2>
            <ul className="mt-4 flex flex-wrap items-center gap-3">
              {Object.entries(siteSettings.socials).map(([key, href]) => {
                const Icon = socialIcons[key]
                const labels = { instagram: 'اینستاگرام', telegram: 'تلگرام', whatsapp: 'واتساپ' }
                if (!Icon) return null
                return (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 rounded-pill border border-line px-3.5 py-2 text-xs text-sand/70 transition-colors duration-300 hover:border-gold hover:text-gold"
                    >
                      <Icon className="h-4 w-4" />
                      {labels[key]}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="divider-gold mt-14" />

        <div className="flex flex-col gap-3 pt-6 text-xs text-sand/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {siteSettings.copyrightYear} {siteSettings.brandName} — تمامی حقوق محفوظ است.
          </p>
          <p>قهوه تخصصی، برشته‌شده در تهران</p>
        </div>
      </Container>
    </footer>
  )
}
