import { Link } from 'react-router-dom'
import Container from '../ui/Container.jsx'
import Photo from '../ui/Photo.jsx'
import { ChevronForward } from '../ui/Icons.jsx'

/**
 * Dark banner used at the top of every inner page, so the transparent header
 * always sits over something intentional.
 */
export default function PageHero({ eyebrow, title, text, image, breadcrumb = [] }) {
  return (
    <section className="relative isolate overflow-hidden bg-coffee-950 pb-16 pt-32 lg:pb-20 lg:pt-40">
      {image && (
        <>
          <div className="absolute inset-0 -z-10">
            <Photo id={image} alt="" priority sizes="100vw" widths={[768, 1200, 1600]} quality={68} />
          </div>
          <div className="absolute inset-0 -z-10 bg-coffee-950/80" />
        </>
      )}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_70%_at_82%_10%,rgba(216,180,122,0.14),transparent_62%)]" />

      <Container>
        {breadcrumb.length > 0 && (
          <nav aria-label="مسیر صفحه" className="mb-7">
            <ol className="flex flex-wrap items-center gap-2 text-[12px] text-sand/50">
              <li>
                <Link to="/" className="transition-colors hover:text-gold">
                  خانه
                </Link>
              </li>
              {breadcrumb.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  <ChevronForward className="h-3.5 w-3.5 text-gold/50" aria-hidden="true" />
                  {crumb.to ? (
                    <Link to={crumb.to} className="transition-colors hover:text-gold">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-cream">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="max-w-2xl">
          {eyebrow && <p className="label animate-fade-in">{eyebrow}</p>}
          <h1 className="mt-5 animate-fade-up text-[clamp(2rem,5vw,3.6rem)] font-bold leading-[1.35]">
            {title}
          </h1>
          {text && (
            <p
              className="mt-5 max-w-prose animate-fade-up leading-relaxed text-sand/70"
              style={{ animationDelay: '160ms' }}
            >
              {text}
            </p>
          )}
        </div>
      </Container>
    </section>
  )
}
