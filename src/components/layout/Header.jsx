import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Container from '../ui/Container.jsx'
import Button from '../ui/Button.jsx'
import MobileMenu from './MobileMenu.jsx'
import { LogoMark, Menu, Close } from '../ui/Icons.jsx'
import { navLinks, siteSettings } from '../../data/site.js'
import { useEscape, useLockBodyScroll, useScrolled } from '../../lib/hooks.js'
import { cx } from '../../lib/utils.js'

function Wordmark({ compact = false }) {
  return (
    <span className="flex flex-col leading-none">
      <span
        className={cx(
          'font-bold text-cream transition-all duration-500',
          compact ? 'text-[15px]' : 'text-[17px]',
        )}
      >
        {siteSettings.brandName}
      </span>
      <span className="mt-1 text-[10px] font-medium text-gold/80">قهوه تخصصی</span>
    </span>
  )
}

export default function Header() {
  const location = useLocation()
  const scrolled = useScrolled(28)
  const [menuOpen, setMenuOpen] = useState(false)

  // Transparent over the hero, translucent + blurred once the page moves.
  const solid = scrolled || menuOpen

  useLockBodyScroll(menuOpen)
  useEscape(menuOpen, () => setMenuOpen(false))

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      <header
        className={cx(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium',
          solid
            ? 'border-b border-line bg-coffee-950/80 shadow-header backdrop-blur-md'
            : 'border-b border-transparent bg-gradient-to-b from-coffee-950/70 to-transparent',
        )}
      >
        <Container>
          <div
            className={cx(
              'flex items-center justify-between gap-6 transition-all duration-500 ease-premium',
              scrolled ? 'h-[72px]' : 'h-[84px]',
            )}
          >
            {/* Brand — start (right) in RTL */}
            <Link
              to="/"
              aria-label={`${siteSettings.brandName} — خانه`}
              className="flex shrink-0 items-center gap-3"
            >
              <LogoMark
                className={cx('shrink-0 text-gold transition-all duration-500', scrolled ? 'h-8 w-8' : 'h-9 w-9')}
              />
              <Wordmark compact={scrolled} />
            </Link>

            {/* Desktop navigation */}
            <nav aria-label="ناوبری اصلی" className="hidden md:block">
              <ul className="flex items-center gap-5 lg:gap-8 xl:gap-10">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) =>
                        cx(
                          'group relative block py-2 text-[12.5px] font-medium transition-colors duration-300 lg:text-[13px]',
                          isActive ? 'text-gold' : 'text-sand/80 hover:text-cream',
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {link.label}
                          <span
                            className={cx(
                              'absolute -bottom-0.5 start-0 h-px w-full origin-right bg-gold transition-transform duration-500 ease-premium group-hover:scale-x-100',
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

            <div className="flex items-center gap-3">
              <Button to="/menu" variant="primary" size="sm" className="hidden md:inline-flex">
                مشاهده منو
              </Button>

              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? 'بستن منو' : 'باز کردن منو'}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-cream transition-colors duration-300 hover:border-gold hover:text-gold md:hidden"
              >
                {menuOpen ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={navLinks}
        settings={siteSettings}
        activePath={location.pathname}
      />
    </>
  )
}
