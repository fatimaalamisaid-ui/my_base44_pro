import Container from '../components/ui/Container.jsx'
import PageHero from '../components/layout/PageHero.jsx'
import Photo from '../components/ui/Photo.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import CtaSection from '../sections/CtaSection.jsx'
import { featureIcons } from '../components/ui/Icons.jsx'
import { aboutPage, pageSeo } from '../data/content.js'
import { siteSettings } from '../data/site.js'
import { usePageMeta } from '../lib/seo.js'

export default function About() {
  usePageMeta(pageSeo.about)

  return (
    <>
      <PageHero
        eyebrow={aboutPage.eyebrow}
        title={aboutPage.title}
        text={aboutPage.text}
        image="photo-1554118811-1e0d58224f24"
        breadcrumb={[{ label: 'درباره ما' }]}
      />

      {/* Philosophy */}
      <section className="bg-coffee-950 py-20 lg:py-28">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal className="overflow-hidden rounded-modal border border-line">
              <div className="aspect-[4/3]">
                <Photo
                  id="photo-1445116572660-236099ec97a0"
                  alt="فضای کافه و دانه در تهران"
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  widths={[520, 760, 1040]}
                />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <SectionLabel>فلسفه‌ی ما</SectionLabel>
              <h2 className="mt-6 text-[clamp(1.7rem,3.4vw,2.6rem)] font-bold leading-[1.4]">
                قهوه‌ای که ارزش وقت گذاشتن داشته باشد
              </h2>
              <p className="mt-6 max-w-prose leading-relaxed text-sand/70">
                کافه و دانه از یک پیشخوان کوچک شروع شد؛ با این باور که قهوه‌ی خوب نتیجه‌ی توجه به
                جزئیات است. دانه‌ها را خودمان انتخاب می‌کنیم، در batch‌های کوچک برشته می‌کنیم و هر
                فنجان را با همان دقتی می‌سازیم که روز اول.
              </p>
              <p className="mt-4 max-w-prose leading-relaxed text-sand/70">
                {siteSettings.description}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-coffee-900 py-20 lg:py-28">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionLabel align="center">ارزش‌های ما</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.7rem,3.4vw,2.6rem)] font-bold">
              {aboutPage.valuesTitle}
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aboutPage.values.map((value, index) => {
              const Icon = featureIcons[value.icon]
              return (
                <Reveal key={value.id} delay={index * 110} className="h-full">
                  <div className="flex h-full flex-col rounded-card border border-line bg-coffee-800/50 p-6 transition-colors duration-500 hover:border-gold/40">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-gold">
                      {Icon ? <Icon className="h-5 w-5" /> : null}
                    </span>
                    <h3 className="mt-5 text-base font-bold">{value.title}</h3>
                    <p className="mt-2.5 text-[13px] leading-relaxed text-sand/65">{value.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Numbers */}
      <section className="bg-coffee-850 py-16 lg:py-20">
        <Container>
          <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {aboutPage.stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 90} className="text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-[clamp(1.8rem,3.4vw,2.5rem)] font-bold text-gold">
                    {stat.value}
                  </span>
                  <span className="mt-2 block text-[12px] text-sand/60">{stat.label}</span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      <CtaSection />
    </>
  )
}
