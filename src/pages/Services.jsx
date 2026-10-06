import Container from '../components/ui/Container.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import PageHeader from '../components/layout/PageHeader.jsx'
import CtaBand from '../sections/CtaBand.jsx'
import ServicesList, { ServicesImage } from '../sections/ServicesList.jsx'
import { useDocumentTitle } from '../lib/hooks.js'

const PROCESS = [
  {
    title: 'Conversation',
    description:
      'We start by understanding what you own or what you need — and what a good outcome would look like.',
  },
  {
    title: 'Valuation',
    description:
      'A written, evidence-based view of value, supported by comparable sales rather than optimism.',
  },
  {
    title: 'Strategy',
    description:
      'Whether that is a discreet private sale, a full marketing campaign or a patient acquisition search.',
  },
  {
    title: 'Execution',
    description:
      'One advisor handles inspections, negotiation and the paperwork through to completion.',
  },
]

export default function Services() {
  useDocumentTitle('Services — Horizon Properties')

  return (
    <>
      <PageHeader
        label="SERVICES"
        title="Advice across the whole life of a property"
        description="Six disciplines that cover the moments when judgement matters most — buying, selling, valuing and holding residential property."
      />

      {/* Services list */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Reveal>
                <SectionLabel>WHAT WE DO</SectionLabel>
                <h2 className="mt-6 text-[clamp(1.75rem,3vw,2.6rem)] font-semibold leading-[1.1] tracking-tight text-navy-950">
                  Six disciplines, one standard
                </h2>
                <p className="mt-6 max-w-prose2 text-[15px] leading-[1.8] text-navy-500">
                  You can instruct us for a single piece of advice or across an entire portfolio. Either way
                  you work with one senior advisor, not a team of juniors.
                </p>
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

      {/* Process */}
      <section className="bg-navy-950 py-20 text-white lg:py-28">
        <Container>
          <Reveal className="max-w-2xl">
            <span className="rule" />
            <p className="mt-3 text-[11px] font-semibold uppercase text-champagne-300" style={{ letterSpacing: '0.18em' }}>
              THE PROCESS
            </p>
            <h2 className="mt-6 text-[clamp(1.75rem,3vw,2.6rem)] font-semibold leading-[1.1] tracking-tight text-white">
              From first conversation to completion
            </h2>
          </Reveal>

          <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 80} className="border-t border-white/10 pt-7">
                <span className="text-[12px] font-medium tracking-label text-champagne-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/55">{step.description}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand
        title="Not sure which service you need?"
        description="Tell us what you are trying to achieve and we will point you in the right direction — even if that is away from us."
      />
    </>
  )
}
