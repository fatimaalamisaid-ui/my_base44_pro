import Container from '../components/ui/Container.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import Button from '../components/ui/Button.jsx'
import TeamGrid from './TeamGrid.jsx'
import { ArrowRight } from '../components/ui/Icons.jsx'

export default function TeamSection() {
  return (
    <section id="team" className="bg-cream-100 py-20 lg:py-28">
      <Container>
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <SectionLabel>OUR TEAM</SectionLabel>
            <h2 className="mt-6 text-[clamp(2rem,3.4vw,3rem)] font-semibold leading-[1.08] tracking-tight text-navy-950">
              The People You Will Work With
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-navy-500">
              Four senior advisors, each responsible for a small portfolio of clients from first meeting
              through to completion.
            </p>
          </div>
          <Button to="/team" variant="outline" size="lg" className="shrink-0">
            Meet the team
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Button>
        </Reveal>

        <Reveal delay={120} className="mt-14">
          <TeamGrid />
        </Reveal>
      </Container>
    </section>
  )
}
