import PageHero from '../components/layout/PageHero.jsx'
import GallerySection from '../sections/GallerySection.jsx'
import CtaSection from '../sections/CtaSection.jsx'
import { pageSeo } from '../data/content.js'
import { usePageMeta } from '../lib/seo.js'

export default function Gallery() {
  usePageMeta(pageSeo.gallery)

  return (
    <>
      <PageHero
        eyebrow="گالری"
        title="قاب‌هایی از کافه و دانه"
        text="فضای کافه، دانه‌ها، برشته‌کاری و لحظه‌هایی که هر روز در کافه و دانه شکل می‌گیرند."
        image="photo-1521017432531-fbd92d768814"
        breadcrumb={[{ label: 'گالری' }]}
      />

      <GallerySection />
      <CtaSection />
    </>
  )
}
