import Container from '../components/ui/Container.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import { featureIcons } from '../components/ui/Icons.jsx'
import { features } from '../data/site.js'
import { featuresSection } from '../data/content.js'

export default function FeatureSection() {
  return (
    <section className="bg-coffee-900 py-20 lg:py-28">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel align="center">{featuresSection.eyebrow}</SectionLabel>
          <h2 className="mt-5 text-[clamp(1.8rem,3.6vw,2.8rem)] font-bold">
            {featuresSection.title}
          </h2>
          <p className="mt-4 text-sand/65">{featuresSection.text}</p>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {features.map((feature, index) => {
            const Icon = featureIcons[feature.icon]
            return (
              <Reveal key={feature.id} delay={index * 130} className="text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-line text-gold transition-colors duration-500 hover:border-gold/50">
                  {Icon ? <Icon className="h-7 w-7" /> : null}
                </span>
                <h3 className="mt-6 text-xl font-bold">{feature.title}</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-sand/65">
                  {feature.description}
                </p>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
