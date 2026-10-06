import Container from '../components/ui/Container.jsx'
import Photo from '../components/ui/Photo.jsx'
import Button from '../components/ui/Button.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import { ArrowRight, ArrowUpRight } from '../components/ui/Icons.jsx'

export default function WhoWeAre() {
  return (
    <section id="about" className="bg-white py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Copy */}
          <Reveal>
            <SectionLabel>ABOUT US</SectionLabel>
            <h2 className="mt-6 text-[clamp(2rem,3.4vw,3rem)] font-semibold leading-[1.08] tracking-tight text-navy-950">
              Who We Are
            </h2>
            <p className="mt-6 max-w-prose2 text-[15px] leading-[1.75] text-navy-500">
              At Horizon Properties, we connect people with extraordinary homes and smart investments.
              Integrity, transparency, and client satisfaction are at the heart of everything we do.
            </p>
            <p className="mt-4 max-w-prose2 text-[15px] leading-[1.75] text-navy-500">
              From architect-designed houses to considered investment portfolios, we advise a small number
              of clients at a time — so every decision gets the attention it deserves.
            </p>
            <Button to="/about" variant="outline" size="lg" className="mt-9">
              Learn more
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Button>
          </Reveal>

          {/* Asymmetric image composition */}
          <Reveal delay={120} className="relative">
            <div className="grid grid-cols-12 gap-4 sm:gap-5">
              <div className="col-span-8 overflow-hidden rounded-card bg-navy-100">
                <div className="aspect-[4/5]">
                  <Photo
                    id="1600585154340-be6161a56a0c"
                    alt="A contemporary home with a pool and clean architectural lines"
                    sizes="(min-width: 1024px) 32vw, 60vw"
                    className="transition-transform duration-[1200ms] ease-premium hover:scale-[1.04]"
                  />
                </div>
              </div>
              <div className="col-span-4 self-end overflow-hidden rounded-card bg-navy-100">
                <div className="aspect-[3/5]">
                  <Photo
                    id="1615529182904-14819c35db37"
                    alt="A calm, light-filled living room with warm timber detailing"
                    sizes="(min-width: 1024px) 16vw, 30vw"
                    className="transition-transform duration-[1200ms] ease-premium hover:scale-[1.04]"
                  />
                </div>
              </div>
            </div>

            {/* Overlapping arrow control */}
            <Button
              to="/properties"
              variant="primary"
              aria-label="Explore our properties"
              className="!h-16 !w-16 !p-0 absolute -bottom-4 left-6 shadow-lift sm:left-10"
            >
              <ArrowUpRight className="h-5 w-5" />
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
