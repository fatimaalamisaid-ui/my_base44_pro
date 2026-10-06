import Container from '../components/ui/Container.jsx'
import PageHero from '../components/layout/PageHero.jsx'
import Photo from '../components/ui/Photo.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import CtaSection from '../sections/CtaSection.jsx'
import { Quote } from '../components/ui/Icons.jsx'
import { pageSeo, storyPage } from '../data/content.js'
import { usePageMeta } from '../lib/seo.js'

export default function Story() {
  usePageMeta(pageSeo.story)

  return (
    <>
      <PageHero
        eyebrow={storyPage.eyebrow}
        title={storyPage.title}
        text={storyPage.text}
        image="photo-1447933601403-0c6688de566e"
        breadcrumb={[{ label: 'داستان ما' }]}
      />

      {/* Timeline */}
      <section className="bg-coffee-950 py-20 lg:py-28">
        <Container>
          <Reveal className="max-w-2xl">
            <SectionLabel>مسیر ما</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.7rem,3.4vw,2.6rem)] font-bold">
              {storyPage.timelineTitle}
            </h2>
          </Reveal>

          <ol className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {storyPage.timeline.map((item, index) => (
              <Reveal key={item.id} delay={index * 110} className="h-full">
                <li className="flex h-full flex-col rounded-card border border-line bg-coffee-900/50 p-6">
                  <span className="text-sm font-bold text-gold">{item.year}</span>
                  <span className="mt-4 h-px w-10 bg-gold/40" />
                  <h3 className="mt-4 text-base font-bold">{item.title}</h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-sand/65">{item.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Editorial spread + quote */}
      <section className="bg-coffee-850 py-20 lg:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal className="overflow-hidden rounded-modal border border-line">
              <div className="aspect-[4/3]">
                <Photo
                  id="photo-1453614512568-c4024d13c247"
                  alt="برشته‌کاری دانه‌های قهوه"
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  widths={[520, 760, 1040]}
                />
              </div>
            </Reveal>

            <Reveal delay={120} className="flex flex-col justify-center">
              <Quote className="h-8 w-8 text-gold/50" />
              <blockquote className="mt-6 text-xl font-medium leading-relaxed text-cream sm:text-2xl">
                «{storyPage.quote}»
              </blockquote>
              <p className="mt-6 text-sm text-gold">{storyPage.quoteAuthor}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  )
}
