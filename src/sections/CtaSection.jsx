import Container from '../components/ui/Container.jsx'
import Button from '../components/ui/Button.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import { LogoMark } from '../components/ui/Icons.jsx'
import { ctaSection } from '../data/content.js'

export default function CtaSection() {
  return (
    <section className="relative isolate overflow-hidden bg-coffee-850 py-24 lg:py-32">
      {/* Quiet decorative mark behind the copy */}
      <LogoMark
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 start-1/2 h-[420px] w-[420px] -translate-x-1/2 text-gold/[0.07] lg:h-[560px] lg:w-[560px]"
      />

      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-[clamp(2rem,4.4vw,3.2rem)] font-bold leading-[1.4]">
            {ctaSection.title}
          </h2>
          <p className="mt-5 text-base text-sand/70 sm:text-lg">{ctaSection.text}</p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button to={ctaSection.primaryCta.to} variant="primary" size="lg">
              {ctaSection.primaryCta.label}
            </Button>
            <Button to={ctaSection.secondaryCta.to} variant="outline" size="lg">
              {ctaSection.secondaryCta.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
