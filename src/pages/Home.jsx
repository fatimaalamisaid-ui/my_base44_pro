import Hero from '../sections/Hero.jsx'
import WhoWeAre from '../sections/WhoWeAre.jsx'
import FeaturedProperties from '../sections/FeaturedProperties.jsx'
import ServicesSection from '../sections/ServicesSection.jsx'
import WhyChoose from '../sections/WhyChoose.jsx'
import TeamSection from '../sections/TeamSection.jsx'
import CtaBand from '../sections/CtaBand.jsx'
import { useDocumentTitle } from '../lib/hooks.js'

export default function Home() {
  useDocumentTitle('Horizon Properties — Exceptional Homes & Investments')

  return (
    <>
      <Hero />
      <WhoWeAre />
      <FeaturedProperties />
      <ServicesSection />
      <WhyChoose />
      <TeamSection />
      <CtaBand />
    </>
  )
}
