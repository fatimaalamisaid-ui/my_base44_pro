import PageHero from '../components/layout/PageHero.jsx'
import ContactSection from '../sections/ContactSection.jsx'
import { pageSeo } from '../data/content.js'
import { usePageMeta } from '../lib/seo.js'

export default function Contact() {
  usePageMeta(pageSeo.contact)

  return (
    <>
      <PageHero
        eyebrow="تماس با ما"
        title="به ما سر بزنید"
        text="برای رزرو میز، سفارش‌های گروهی یا هر پرسشی، از راه‌های زیر با ما در تماس باشید."
        image="photo-1517433670267-08bbd4be890f"
        breadcrumb={[{ label: 'تماس با ما' }]}
      />
      <ContactSection />
    </>
  )
}
