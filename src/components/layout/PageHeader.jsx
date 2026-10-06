import Container from '../ui/Container.jsx'
import Reveal from '../ui/Reveal.jsx'

/** Navy band that opens every inner page. Sits below the fixed header. */
export default function PageHeader({ label, title, description, children }) {
  return (
    <section className="bg-navy-950 pb-16 pt-[124px] text-white lg:pb-20 lg:pt-[152px]">
      <Container>
        <Reveal>
          <p className="text-[11px] font-semibold uppercase text-champagne-300" style={{ letterSpacing: '0.18em' }}>
            {label}
          </p>
          <h1 className="mt-5 max-w-3xl text-balance text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-[1.06] tracking-tight text-white">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-prose2 text-[15px] leading-relaxed text-white/60">{description}</p>
          )}
          {children}
        </Reveal>
      </Container>
    </section>
  )
}
