import Container from '../components/ui/Container.jsx'
import Photo from '../components/ui/Photo.jsx'
import Button from '../components/ui/Button.jsx'
import { ArrowRight } from '../components/ui/Icons.jsx'

const HERO_IMAGE = '1613490493576-7fde63acd811'

export default function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-navy-950 lg:min-h-[92vh]">
      {/* Photography */}
      <div className="absolute inset-0">
        <Photo
          id={HERO_IMAGE}
          alt="A modern villa with floor-to-ceiling glass and an infinity pool at dusk"
          sizes="100vw"
          widths={[960, 1440, 1920, 2400]}
          quality={82}
          priority
          className="animate-image-in"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/45 to-navy-950/85" />
        {/* Transition into the white content below */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white/95 to-transparent" />
      </div>

      <Container className="relative z-10 pb-24 pt-36 text-center sm:pb-28 lg:pt-40">
        <p
          className="label animate-fade-up text-champagne-300"
          style={{ animationDelay: '80ms' }}
        >
          HORIZON PROPERTIES
        </p>

        <h1
          className="mx-auto mt-6 max-w-4xl text-balance text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[1.04] tracking-tight text-white hero-text-shadow animate-fade-up"
          style={{ animationDelay: '160ms' }}
        >
          Discover Exceptional
          <br className="hidden sm:block" /> Homes &amp; Investments
        </h1>

        <p
          className="mx-auto mt-7 max-w-xl text-[15px] leading-relaxed text-white/75 animate-fade-up sm:text-base"
          style={{ animationDelay: '300ms' }}
        >
          Premium properties in prime locations. Find your dream home or the perfect investment with
          confidence.
        </p>

        <div
          className="mt-10 flex flex-col items-center justify-center gap-3 animate-fade-up sm:flex-row"
          style={{ animationDelay: '440ms' }}
        >
          <Button to="/properties" variant="solidLight" size="lg" className="w-full sm:w-auto">
            Browse properties
          </Button>
          <Button to="/contact" variant="light" size="lg" className="w-full sm:w-auto">
            Speak to an advisor
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </Container>
    </section>
  )
}
