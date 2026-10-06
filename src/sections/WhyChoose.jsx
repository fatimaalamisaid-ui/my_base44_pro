import Container from '../components/ui/Container.jsx'
import Photo from '../components/ui/Photo.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import { Quote } from '../components/ui/Icons.jsx'
import { stats, testimonials, whyChoose } from '../data/site.js'

export default function WhyChoose() {
  return (
    <section id="why-horizon" className="bg-navy-950 py-20 text-white lg:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <Reveal className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-card">
              <div className="aspect-[4/5]">
                <Photo
                  id="1600210492486-724fe5c67fb0"
                  alt="An evening view across a modern home and its terrace"
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="transition-transform duration-[1200ms] ease-premium hover:scale-[1.03]"
                />
              </div>
            </div>
          </Reveal>

          {/* Reasons */}
          <Reveal delay={100} className="order-1 lg:order-2">
            <span className="rule" />
            <p className="mt-3 text-[11px] font-semibold uppercase text-champagne-300" style={{ letterSpacing: '0.18em' }}>
              WHY HORIZON
            </p>
            <h2 className="mt-6 text-[clamp(2rem,3.4vw,3rem)] font-semibold leading-[1.08] tracking-tight text-white">
              Why Choose Horizon
            </h2>
            <p className="mt-6 max-w-prose2 text-[15px] leading-[1.75] text-white/60">
              We are deliberately small. That means fewer clients, deeper knowledge of every street we
              work on, and advice that is not shaped by a sales target.
            </p>

            <ul className="mt-10 space-y-7">
              {whyChoose.map((reason, index) => (
                <li key={reason.title} className="flex gap-5 border-t border-white/10 pt-7">
                  <span className="mt-0.5 text-[12px] font-medium tracking-label text-champagne-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-white">{reason.title}</h3>
                    <p className="mt-2 max-w-prose2 text-[14px] leading-relaxed text-white/55">
                      {reason.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Stats */}
        <Reveal delay={80} className="mt-20 grid grid-cols-2 gap-8 border-t border-white/10 pt-12 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-white">
                {stat.value}
              </p>
              <p className="mt-2 text-[12px] tracking-wide2 text-white/50">{stat.label}</p>
            </div>
          ))}
        </Reveal>

        {/* Client voices */}
        <div className="mt-20 grid gap-6 border-t border-white/10 pt-14 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 100}>
              <figure className="h-full rounded-card border border-white/10 bg-white/[0.03] p-8">
                <Quote className="h-6 w-6 text-champagne-400" />
                <blockquote className="mt-5 text-[15px] leading-relaxed text-white/80">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-6 text-[12px] tracking-wide2 text-white/45">
                  {testimonial.name} · {testimonial.detail}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
