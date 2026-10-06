import Container from '../components/ui/Container.jsx'
import Photo from '../components/ui/Photo.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import Testimonials from '../components/testimonials/Testimonials.jsx'
import { activeTestimonials } from '../data/testimonials.js'
import { testimonialsSection } from '../data/content.js'

const BACKGROUND = 'photo-1501339847302-ac426a4a7cbb'

export default function TestimonialsSection() {
  return (
    <section className="relative isolate overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 -z-10">
        <Photo
          id={BACKGROUND}
          alt="فضای گرم کافه و دانه"
          sizes="100vw"
          widths={[768, 1200, 1600]}
          quality={70}
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-coffee-950/85" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_50%_0%,rgba(216,180,122,0.1),transparent_65%)]" />

      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel align="center">{testimonialsSection.eyebrow}</SectionLabel>
          <h2 className="mt-5 text-[clamp(1.8rem,3.6vw,2.8rem)] font-bold">
            {testimonialsSection.title}
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-12">
          <Testimonials items={activeTestimonials} />
        </Reveal>
      </Container>
    </section>
  )
}
