import Container from '../components/ui/Container.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import Button from '../components/ui/Button.jsx'
import ServicesList, { ServicesImage } from './ServicesList.jsx'
import { ArrowRight } from '../components/ui/Icons.jsx'

export default function ServicesSection() {
  return (
    <section id="services" className="bg-white py-20 lg:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
          {/* Sticky intro + supporting image */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <SectionLabel>SERVICES</SectionLabel>
              <h2 className="mt-6 text-[clamp(2rem,3.4vw,3rem)] font-semibold leading-[1.08] tracking-tight text-navy-950">
                How We Help
              </h2>
              <p className="mt-6 max-w-prose2 text-[15px] leading-[1.75] text-navy-500">
                Six disciplines, one standard. Whether you are selling a significant home or building a
                portfolio, the work starts with an honest view of what you own.
              </p>
              <Button to="/services" variant="outline" size="lg" className="mt-8">
                Explore services
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>
            </Reveal>

            <Reveal delay={140} className="mt-12 hidden lg:block">
              <ServicesImage />
            </Reveal>
          </div>

          <Reveal delay={80}>
            <ServicesList />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
