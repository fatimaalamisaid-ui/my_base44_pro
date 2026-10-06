import Container from '../components/ui/Container.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import PageHeader from '../components/layout/PageHeader.jsx'
import CtaBand from '../sections/CtaBand.jsx'
import TeamGrid from '../sections/TeamGrid.jsx'
import { company } from '../data/site.js'
import { useDocumentTitle } from '../lib/hooks.js'

export default function Team() {
  useDocumentTitle('Team — Horizon Properties')

  return (
    <>
      <PageHeader
        label="OUR TEAM"
        title="Senior advisors, small portfolios"
        description="Every client works directly with a senior advisor. The person who shows you the property is the person who negotiates it and closes it."
      />

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <Reveal className="max-w-2xl">
            <SectionLabel>THE ADVISORS</SectionLabel>
            <h2 className="mt-6 text-[clamp(1.75rem,3vw,2.6rem)] font-semibold leading-[1.1] tracking-tight text-navy-950">
              Meet the team
            </h2>
            <p className="mt-6 text-[15px] leading-[1.8] text-navy-500">
              Between them they cover estates and waterfront property, architect-designed homes, investment
              strategy and first purchases.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-14">
            <TeamGrid />
          </Reveal>

          <Reveal delay={160} className="mt-20 rounded-card bg-cream-100 p-8 sm:p-10 lg:p-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <h2 className="text-xl font-semibold text-navy-950">Working with us</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-navy-500">
                  Not sure who to speak to? Call the office and we will put you with the right advisor for
                  your situation — no obligation, no sales script.
                </p>
              </div>
              <a
                href={company.phoneHref}
                className="shrink-0 text-[clamp(1.25rem,2.2vw,1.75rem)] font-semibold tracking-tight text-navy-950 transition-colors hover:text-champagne-700"
              >
                {company.phone}
              </a>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
