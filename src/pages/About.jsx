import Container from '../components/ui/Container.jsx'
import Photo from '../components/ui/Photo.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import PageHeader from '../components/layout/PageHeader.jsx'
import CtaBand from '../sections/CtaBand.jsx'
import TeamGrid from '../sections/TeamGrid.jsx'
import Button from '../components/ui/Button.jsx'
import { ArrowRight } from '../components/ui/Icons.jsx'
import { stats, testimonials, whyChoose } from '../data/site.js'
import { useDocumentTitle } from '../lib/hooks.js'

export default function About() {
  useDocumentTitle('About Us — Horizon Properties')

  return (
    <>
      <PageHeader
        label="ABOUT US"
        title="A studio built on judgement, not volume"
        description="Horizon Properties advises a small number of clients on significant residential property. We are known for the accuracy of our advice and the discretion with which we work."
      />

      {/* Editorial intro */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionLabel>WHO WE ARE</SectionLabel>
              <h2 className="mt-6 text-[clamp(1.75rem,3vw,2.6rem)] font-semibold leading-[1.1] tracking-tight text-navy-950">
                Extraordinary homes, considered advice
              </h2>
              <p className="mt-6 max-w-prose2 text-[15px] leading-[1.8] text-navy-500">
                The company was founded on a simple observation: the best properties are rarely sold by the
                loudest agency. They are sold by people who understand the architecture, the street and the
                buyer — and who can hold a confidence.
              </p>
              <p className="mt-4 max-w-prose2 text-[15px] leading-[1.8] text-navy-500">
                Today we represent architect-designed houses, waterfront estates and a small number of
                investment portfolios across Texas, California, Arizona, Florida and Nevada. Most of what we
                transact never appears on a public portal.
              </p>
              <Button to="/properties" variant="outline" size="lg" className="mt-9">
                See what we represent
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>
            </Reveal>

            <Reveal delay={120} className="grid grid-cols-12 gap-4 sm:gap-5">
              <div className="col-span-7 overflow-hidden rounded-card bg-navy-100">
                <div className="aspect-[4/5]">
                  <Photo
                    id="1600573472550-8090b5e0745e"
                    alt="A modern home lit warmly at dusk with reflective glass and stone"
                    sizes="(min-width: 1024px) 28vw, 56vw"
                    className="transition-transform duration-[1200ms] ease-premium hover:scale-[1.04]"
                  />
                </div>
              </div>
              <div className="col-span-5 grid gap-4 self-start sm:gap-5">
                <div className="overflow-hidden rounded-card bg-navy-100">
                  <div className="aspect-square">
                    <Photo
                      id="1600585154526-990dced4db0d"
                      alt="Detail of a contemporary staircase and double-height living space"
                      sizes="(min-width: 1024px) 18vw, 40vw"
                      className="transition-transform duration-[1200ms] ease-premium hover:scale-[1.04]"
                    />
                  </div>
                </div>
                <div className="overflow-hidden rounded-card bg-navy-100">
                  <div className="aspect-[4/3]">
                    <Photo
                      id="1600047509358-9dc75507daeb"
                      alt="A garden terrace adjoining a minimalist contemporary house"
                      sizes="(min-width: 1024px) 18vw, 40vw"
                      className="transition-transform duration-[1200ms] ease-premium hover:scale-[1.04]"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Numbers */}
      <section className="bg-navy-950 py-16 text-white lg:py-20">
        <Container className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {stats.map((stat) => (
            <Reveal key={stat.label}>
              <p className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-white">
                {stat.value}
              </p>
              <p className="mt-2 text-[12px] tracking-wide2 text-white/50">{stat.label}</p>
            </Reveal>
          ))}
        </Container>
      </section>

      {/* Principles */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <Reveal className="max-w-2xl">
            <SectionLabel>HOW WE WORK</SectionLabel>
            <h2 className="mt-6 text-[clamp(1.75rem,3vw,2.6rem)] font-semibold leading-[1.1] tracking-tight text-navy-950">
              Four principles, applied to every instruction
            </h2>
          </Reveal>

          <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {whyChoose.map((principle, index) => (
              <Reveal as="li" key={principle.title} delay={index * 80}>
                <span className="text-[12px] font-medium tracking-label text-champagne-500">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 text-base font-semibold text-navy-950">{principle.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-navy-500">{principle.description}</p>
              </Reveal>
            ))}
          </ul>

          {/* Client voices */}
          <div className="mt-20 grid gap-6 border-t border-navy-100 pt-14 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 100}>
                <figure className="h-full rounded-card bg-cream-100 p-8">
                  <blockquote className="text-[15px] leading-relaxed text-navy-700">
                    “{testimonial.quote}”
                  </blockquote>
                  <figcaption className="mt-6 text-[12px] tracking-wide2 text-navy-400">
                    {testimonial.name} · {testimonial.detail}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="bg-cream-100 py-20 lg:py-28">
        <Container>
          <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <SectionLabel>OUR TEAM</SectionLabel>
              <h2 className="mt-6 text-[clamp(1.75rem,3vw,2.6rem)] font-semibold leading-[1.1] tracking-tight text-navy-950">
                Who you will be working with
              </h2>
            </div>
            <Button to="/team" variant="outline" size="lg" className="shrink-0">
              Full team
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Button>
          </Reveal>
          <Reveal delay={120} className="mt-14">
            <TeamGrid />
          </Reveal>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
