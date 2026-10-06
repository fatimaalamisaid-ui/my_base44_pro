import Photo from '../components/ui/Photo.jsx'
import Button from '../components/ui/Button.jsx'
import { ArrowForward } from '../components/ui/Icons.jsx'
import { hero } from '../data/content.js'

const HERO_IMAGE = 'photo-1559496417-e7f25cb247f3'

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-coffee-950">
      {/* Cinematic photograph */}
      <div className="absolute inset-0">
        <Photo
          id={HERO_IMAGE}
          alt="بریستای کافه و دانه در حال دم‌آوری قهوه"
          priority
          sizes="100vw"
          widths={[640, 1024, 1440, 1920]}
          quality={80}
        />
      </div>

      {/* Overlays: dark for the header, warm gold light, deep base */}
      <div className="absolute inset-0 bg-gradient-to-b from-coffee-950/85 via-coffee-950/35 to-coffee-950/80" />
      <div className="absolute inset-0 bg-[radial-gradient(110%_80%_at_78%_18%,rgba(216,180,122,0.16),transparent_62%)]" />
      <div className="absolute inset-0 bg-gradient-to-l from-coffee-950/80 via-coffee-950/20 to-transparent" />

      <div className="relative z-20 mx-auto flex min-h-[86svh] w-full max-w-shell flex-col justify-center px-5 pb-36 pt-32 sm:px-8 lg:px-10 lg:pt-40">
        <div className="max-w-2xl">
          <p className="label animate-fade-in">{hero.eyebrow}</p>

          <h1 className="hero-text-shadow mt-6 animate-fade-up text-[clamp(2.2rem,6.2vw,4.5rem)] font-bold leading-[1.32] text-cream">
            {hero.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p
            className="mt-7 max-w-xl animate-fade-up text-base leading-relaxed text-sand/85 sm:text-lg"
            style={{ animationDelay: '220ms' }}
          >
            {hero.text}
          </p>

          <div
            className="mt-10 flex flex-wrap items-center gap-3 animate-fade-up"
            style={{ animationDelay: '340ms' }}
          >
            <Button to={hero.primaryCta.to} variant="primary" size="lg">
              {hero.primaryCta.label}
              <ArrowForward className="h-4 w-4 transition-transform duration-300 ease-premium group-hover/btn:-translate-x-0.5" />
            </Button>
            <Button to={hero.secondaryCta.to} variant="outline" size="lg">
              {hero.secondaryCta.label}
            </Button>
          </div>

          <ul
            className="mt-12 hidden items-center gap-4 text-[12px] text-sand/60 animate-fade-up sm:flex"
            style={{ animationDelay: '460ms' }}
          >
            {hero.highlights.map((item, index) => (
              <li key={item} className="flex items-center gap-4">
                {index > 0 && <span className="h-1 w-1 rounded-full bg-gold/60" aria-hidden="true" />}
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Curved, organic transition into the next section */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
        <svg
          viewBox="0 0 1440 140"
          preserveAspectRatio="none"
          className="block h-[64px] w-full sm:h-[104px] lg:h-[140px]"
        >
          <path
            d="M0,74 C220,132 400,24 700,46 C1000,68 1180,126 1440,58 L1440,140 L0,140 Z"
            className="fill-coffee-900"
          />
          <path
            d="M0,74 C220,132 400,24 700,46 C1000,68 1180,126 1440,58"
            fill="none"
            stroke="rgba(216,180,122,0.28)"
            strokeWidth="1.2"
          />
        </svg>
      </div>
    </section>
  )
}
