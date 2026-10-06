import Container from '../components/ui/Container.jsx'
import Button from '../components/ui/Button.jsx'
import Photo from '../components/ui/Photo.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import { ArrowForward } from '../components/ui/Icons.jsx'
import { storySection } from '../data/content.js'

const MAIN_IMAGE = 'photo-1447933601403-0c6688de566e'
const INSET_IMAGE = 'photo-1497636577773-f1231844b336'

export default function StorySection() {
  return (
    <section className="relative overflow-hidden bg-coffee-850 py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Imagery */}
          <Reveal className="relative">
            <div className="overflow-hidden rounded-modal border border-line">
              <div className="aspect-[4/5]">
                <Photo
                  id={MAIN_IMAGE}
                  alt="دانه‌های قهوه تازه‌برشت در کافه و دانه"
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  widths={[520, 760, 1040]}
                />
              </div>
            </div>

            <div className="absolute -bottom-6 start-4 hidden w-40 overflow-hidden rounded-card border border-gold/30 shadow-lift sm:block lg:-start-8 lg:w-48">
              <div className="aspect-square">
                <Photo
                  id={INSET_IMAGE}
                  alt="برشته‌کاری دانه‌ها در کافه و دانه"
                  sizes="200px"
                  widths={[260, 400]}
                />
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <Reveal delay={120}>
            <SectionLabel>{storySection.eyebrow}</SectionLabel>

            <h2 className="mt-6 text-[clamp(2rem,4.4vw,3.4rem)] font-bold leading-[1.4]">
              {storySection.title.map((word, index) => (
                <span key={word} className="inline-flex items-baseline">
                  {word}
                  {index < storySection.title.length - 1 && (
                    <span className="mx-3 text-gold/60" aria-hidden="true">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </h2>

            <p className="mt-6 max-w-prose leading-relaxed text-sand/70">{storySection.description}</p>

            <ol className="mt-10 space-y-6 border-t border-line pt-8">
              {storySection.steps.map((step) => (
                <li key={step.id} className="flex gap-5">
                  <span className="mt-0.5 text-sm font-bold text-gold/70">{step.number}</span>
                  <div>
                    <h3 className="text-base font-bold text-cream">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-sand/65">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <Button to={storySection.cta.to} variant="outline" size="lg" className="mt-10">
              {storySection.cta.label}
              <ArrowForward className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
