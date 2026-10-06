import Container from '../components/ui/Container.jsx'
import Button from '../components/ui/Button.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import MenuExplorer from '../components/menu/MenuExplorer.jsx'
import { ArrowForward } from '../components/ui/Icons.jsx'
import { menuSection } from '../data/content.js'

export default function MenuSection() {
  return (
    <section id="menu" className="bg-coffee-950 py-20 lg:py-28">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel align="center">{menuSection.eyebrow}</SectionLabel>
          <h2 className="mt-5 text-[clamp(1.8rem,3.6vw,2.8rem)] font-bold">{menuSection.title}</h2>
          <p className="mt-4 text-sand/65">{menuSection.subtitle}</p>
        </Reveal>

        <MenuExplorer limit={8} />

        <Reveal className="mt-14 flex justify-center">
          <Button to="/menu" variant="outline" size="lg">
            مشاهده منوی کامل
            <ArrowForward className="h-4 w-4 transition-transform duration-300 ease-premium group-hover/btn:-translate-x-0.5" />
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}
