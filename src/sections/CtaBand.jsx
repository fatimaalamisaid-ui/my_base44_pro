import Container from '../components/ui/Container.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Button from '../components/ui/Button.jsx'
import { ArrowRight, KeyMark } from '../components/ui/Icons.jsx'

/** Closing call to action — light band with the architectural key mark. */
export default function CtaBand({
  title = 'Ready to Find Your Perfect Property?',
  description = 'Let our experts guide you to the right home or investment.',
}) {
  return (
    <section className="bg-mist py-16 lg:py-20">
      <Container>
        <Reveal className="flex flex-col gap-10 rounded-card border border-navy-100/70 bg-white/60 p-8 backdrop-blur-sm sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
          <div className="flex items-start gap-7">
            <KeyMark className="hidden h-20 w-20 shrink-0 text-navy-300 sm:block" />
            <div>
              <h2 className="max-w-xl text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-[1.12] tracking-tight text-navy-950">
                {title}
              </h2>
              <p className="mt-4 max-w-prose2 text-[15px] leading-relaxed text-navy-500">{description}</p>
            </div>
          </div>

          <Button to="/contact" variant="primary" size="lg" className="shrink-0 self-start lg:self-auto">
            Get in touch
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}
