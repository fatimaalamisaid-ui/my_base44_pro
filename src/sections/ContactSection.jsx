import Container from '../components/ui/Container.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import ContactForm from '../components/contact/ContactForm.jsx'
import MapPlaceholder from '../components/contact/MapPlaceholder.jsx'
import { Clock, Mail, MapPin, Phone } from '../components/ui/Icons.jsx'
import { contactSection } from '../data/content.js'
import { contactInfo, siteSettings } from '../data/site.js'

export default function ContactSection() {
  return (
    <section id="contact" className="bg-coffee-950 py-20 lg:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <SectionLabel>{contactSection.eyebrow}</SectionLabel>
          <h2 className="mt-5 text-[clamp(1.8rem,3.6vw,2.8rem)] font-bold">{contactSection.title}</h2>
          <p className="mt-4 text-sand/65">{contactSection.text}</p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Details + map */}
          <Reveal className="space-y-6">
            <ul className="space-y-4">
              <li className="flex items-start gap-4 rounded-card border border-line bg-coffee-900/50 p-5">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-[11px] font-semibold text-gold">نشانی</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-sand/75">
                    {contactInfo.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4 rounded-card border border-line bg-coffee-900/50 p-5">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-[11px] font-semibold text-gold">تماس</p>
                  <a
                    href={siteSettings.phoneHref}
                    className="mt-1.5 block text-sm text-sand/75 transition-colors hover:text-gold"
                    dir="ltr"
                  >
                    {siteSettings.phone}
                  </a>
                  <a
                    href={`mailto:${siteSettings.email}`}
                    className="mt-1 block text-sm text-sand/75 transition-colors hover:text-gold"
                    dir="ltr"
                  >
                    {siteSettings.email}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4 rounded-card border border-line bg-coffee-900/50 p-5">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-[11px] font-semibold text-gold">ساعات کاری</p>
                  <ul className="mt-1.5 space-y-1 text-sm text-sand/75">
                    {contactInfo.hoursLines.map((line) => (
                      <li key={line.days} className="flex flex-wrap gap-x-2">
                        <span>{line.days}</span>
                        <span className="text-sand/40">—</span>
                        <span>{line.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>

            <MapPlaceholder />
          </Reveal>

          {/* Form */}
          <Reveal delay={120} id="reserve">
            <h3 className="text-xl font-bold">{contactSection.formTitle}</h3>
            <p className="mb-6 mt-2 text-sm text-sand/60">{contactSection.formText}</p>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
