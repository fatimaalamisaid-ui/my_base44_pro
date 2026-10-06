import { useState } from 'react'
import Container from '../components/ui/Container.jsx'
import Button from '../components/ui/Button.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import Gallery from '../components/gallery/Gallery.jsx'
import Lightbox from '../components/gallery/Lightbox.jsx'
import { ArrowForward } from '../components/ui/Icons.jsx'
import { gallery, galleryPreview } from '../data/gallery.js'
import { gallerySection } from '../data/content.js'

/** Editorial gallery with a fullscreen lightbox. `preview` trims it for home. */
export default function GallerySection({ preview = false }) {
  const items = preview ? galleryPreview : gallery
  const [index, setIndex] = useState(-1)

  return (
    <section className="bg-coffee-900 py-20 lg:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <SectionLabel>{gallerySection.eyebrow}</SectionLabel>
          <h2 className="mt-5 text-[clamp(1.8rem,3.6vw,2.8rem)] font-bold">{gallerySection.title}</h2>
          <p className="mt-4 text-sand/65">{gallerySection.subtitle}</p>
        </Reveal>

        <Reveal delay={120} className="mt-12">
          <Gallery items={items} onOpen={setIndex} />
        </Reveal>

        {preview && (
          <Reveal className="mt-14 flex justify-center">
            <Button to={gallerySection.cta.to} variant="outline" size="lg">
              {gallerySection.cta.label}
              <ArrowForward className="h-4 w-4 transition-transform duration-300 ease-premium group-hover/btn:-translate-x-0.5" />
            </Button>
          </Reveal>
        )}
      </Container>

      <Lightbox items={items} index={index} onClose={() => setIndex(-1)} onNavigate={setIndex} />
    </section>
  )
}
