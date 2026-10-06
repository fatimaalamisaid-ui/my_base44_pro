import Container from '../components/ui/Container.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import PropertyCarousel from '../components/property/PropertyCarousel.jsx'
import Button from '../components/ui/Button.jsx'
import { ArrowRight } from '../components/ui/Icons.jsx'
import { getFeaturedProperties } from '../data/properties.js'

export default function FeaturedProperties() {
  const featured = getFeaturedProperties()

  return (
    <section id="featured" className="bg-cream-100 py-20 lg:py-28">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel align="center">FEATURED</SectionLabel>
          <h2 className="mt-6 text-[clamp(2rem,3.4vw,3rem)] font-semibold leading-[1.08] tracking-tight text-navy-950">
            Featured Properties
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-navy-500">
            A selection of homes currently represented by Horizon — each one chosen for its architecture,
            its setting and the quality of its construction.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-14">
          <PropertyCarousel properties={featured} label="Featured properties" />
        </Reveal>

        <Reveal delay={150} className="mt-10 flex justify-center">
          <Button to="/properties" variant="outline" size="lg">
            View all properties
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}
