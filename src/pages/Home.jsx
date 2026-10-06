import Hero from '../sections/Hero.jsx'
import FeatureSection from '../sections/FeatureSection.jsx'
import MenuSection from '../sections/MenuSection.jsx'
import StorySection from '../sections/StorySection.jsx'
import GallerySection from '../sections/GallerySection.jsx'
import TestimonialsSection from '../sections/TestimonialsSection.jsx'
import CtaSection from '../sections/CtaSection.jsx'
import ContactSection from '../sections/ContactSection.jsx'
import { pageSeo } from '../data/content.js'
import { usePageMeta } from '../lib/seo.js'

export default function Home() {
  usePageMeta(pageSeo.home)

  return (
    <>
      <Hero />
      <FeatureSection />
      <MenuSection />
      <StorySection />
      <GallerySection preview />
      <TestimonialsSection />
      <CtaSection />
      <ContactSection />
    </>
  )
}
