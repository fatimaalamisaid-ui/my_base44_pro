import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Container from '../ui/Container.jsx'
import { LogoMark, Menu, Phone, Close, ArrowRight } from '../ui/Icons.jsx'
import { company, navLinks } from '../../data/site.js'
import { useEscape, useLockBodyScroll, useScrolled } from '../../lib/hooks.js'
import { cx } from '../../lib/utils.js'

function Wordmark({ compact = false }) {
  return (
    <span className="flex flex-col leading-none">
      <span className={cx('font-semibold tracking-[0.2em]', compact ? 'text-[13px]' : 'text-[15px]')}>
        HORIZON
      </span>
      <span className="mt-1 text-[9px] font-medium tracking-[0.34em] opacity-70">PROPERTIES</span>
    </span>
  )
}

export default function Header() {
  const location = useLocation()
  const scrolled = useScrolled(24)
  const [menuOpen, setMenuOpen] = useState(false)

  const isHome = location.pathname === '/'
  // Transparent over the hero, solid everywhere else and once scrolled.
  const solid = scrolled || !isHome || menuOpen

  useLockBodyScroll(menuOpen)
  useEscape(menuOpen, () => setMenuOpen(false))

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      <header
        className={cx(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-premium',
          solid
            ? 'border-b border-navy-100/80 bg-white/95 shadow-header backdrop-blur-md'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <Container>
          <div
            className={cx(
              'flex items-center justify-between transition-all duration-500 ease-premium',
              scrolled ? 'h-[68px]' : 'h-[84px]',
            )}
          >
            {/* Brand */}
            <Link
              to="/"
              aria-label={`${company.name} — home`}
              className={cx(
                'flex items-center gap-3 transition-colors duration-500',
                solid ? 'text-navy-950' : 'text-white',
              )}
            >
              <LogoMark className={cx('shrink-0 text-champagne-400', scrolled ? 'h-8 w-8' : 'h-9 w-9')} />
              <Wordmark />
            </Link>

            {/* Desktop navigation */}
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-9">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) =>
                        cx(
                          'group relative block py-2 text-[13px] font-medium tracking-wide2 transition-colors duration-300',
                          solid ? 'text-navy-700 hover:text-navy-950' : 'text-white/85 hover:text-white',
                          isActive && (solid ? 'text-navy-950' : 'text-white'),
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {link.label}
                          <span
                            className={cx(
                              'absolute -bottom-0.5 left-0 h-px w-full origin-left bg-champagne-500 transition-transform duration-500 ease-premium group-hover:scale-x-100',
                              isActive ? 'scale-x-100' : 'scale-x-0',
                            )}
                          />
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact + mobile trigger */}
            <div className="flex items-center gap-3">
              <a
                href={company.phoneHref}
                className={cx(
                  'hidden items-center gap-2 rounded-pill border px-5 py-2.5 text-[12px] font-medium tracking-wide2 transition-colors duration-300 ease-premium md:inline-flex',
                  solid
                    ? 'border-navy-200 text-navy-800 hover:border-navy-900 hover:bg-navy-950 hover:text-white'
                    : 'border-white/40 text-white hover:bg-white hover:text-navy-950',
                )}
              >
                <Phone className="h-4 w-4" />
                {company.phone}
              </a>

              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                className={cx(
                  'inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden',
                  solid
                    ? 'border-navy-200 text-navy-900 hover:border-navy-900'
                    : 'border-white/40 text-white hover:bg-white/10',
                )}
              >
                {menuOpen ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className={cx(
          'fixed inset-0 z-40 bg-navy-950/95 backdrop-blur-sm transition-opacity duration-500 ease-premium lg:hidden',
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <div className="flex h-full flex-col overflow-y-auto px-6 pb-10 pt-[104px]">
          <nav aria-label="Mobile">
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {navLinks.map((link, index) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      cx(
                        'flex items-center justify-between py-5 text-2xl font-semibold tracking-tight transition-all duration-500 ease-premium',
                        isActive ? 'text-champagne-400' : 'text-white',
                        menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
                      )
                    }
                    style={{ transitionDelay: menuOpen ? `${80 + index * 45}ms` : '0ms' }}
                  >
                    {link.label}
                    <ArrowRight className="h-5 w-5 text-champagne-500" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-10 space-y-3 text-sm text-white/70">
            <a href={company.phoneHref} className="flex items-center gap-3 hover:text-white">
              <Phone className="h-4 w-4 text-champagne-400" />
              {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="flex items-center gap-3 hover:text-white">
              <ArrowRight className="h-4 w-4 text-champagne-400" />
              {company.email}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
