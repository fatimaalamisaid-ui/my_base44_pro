import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Container from '../components/ui/Container.jsx'
import Photo from '../components/ui/Photo.jsx'
import Button from '../components/ui/Button.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import PropertyGallery from '../components/property/PropertyGallery.jsx'
import PropertyCard from '../components/property/PropertyCard.jsx'
import FavouriteButton from '../components/property/FavouriteButton.jsx'
import InquiryModal from '../components/property/InquiryModal.jsx'
import {
  Area,
  ArrowLeft,
  ArrowRight,
  Bath,
  Bed,
  Calendar,
  Check,
  Mail,
  MapPin,
  Phone,
} from '../components/ui/Icons.jsx'
import { getProperty, getSimilarProperties } from '../data/properties.js'
import { company } from '../data/site.js'
import { formatLocation, formatNumber, formatPrice } from '../lib/utils.js'
import { useDocumentTitle } from '../lib/hooks.js'

function SpecItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-4 w-4 shrink-0 text-champagne-500" />
      <div>
        <dt className="text-[10px] font-medium tracking-label text-navy-400">{label}</dt>
        <dd className="text-[14px] text-navy-900">{value}</dd>
      </div>
    </div>
  )
}

export default function PropertyDetail() {
  const { slug } = useParams()
  const property = getProperty(slug)
  const [modalMode, setModalMode] = useState(null)

  useDocumentTitle(property ? `${property.name} — Horizon Properties` : 'Property not found')

  if (!property) {
    return (
      <section className="bg-white pb-24 pt-[152px]">
        <Container className="text-center">
          <p className="label">NOT FOUND</p>
          <h1 className="mt-5 text-3xl font-semibold text-navy-950">This property is no longer listed</h1>
          <p className="mx-auto mt-4 max-w-md text-[15px] text-navy-500">
            It may have been sold or withdrawn. Browse the current portfolio, or ask us about off-market
            homes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/properties" variant="primary" size="lg">
              Browse properties
            </Button>
            <Button to="/contact" variant="outline" size="lg">
              Contact us
            </Button>
          </div>
        </Container>
      </section>
    )
  }

  const similar = getSimilarProperties(property)
  const { agent } = property

  return (
    <>
      <article className="bg-white pb-20 pt-[112px] lg:pb-28 lg:pt-[132px]">
        <Container>
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-[12px] font-medium tracking-wide2 text-navy-500 transition-colors duration-300 hover:text-navy-900"
          >
            <ArrowLeft className="h-4 w-4" />
            All properties
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            {/* Gallery */}
            <div>
              <PropertyGallery images={property.images} name={property.name} />
            </div>

            {/* Summary */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="label">{property.type.toUpperCase()}</p>
                  <h1 className="mt-4 text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-tight text-navy-950">
                    {property.name}
                  </h1>
                  <p className="mt-3 flex items-center gap-2 text-[14px] text-navy-500">
                    <MapPin className="h-4 w-4 text-champagne-500" />
                    {formatLocation(property.location)}
                  </p>
                </div>
                <FavouriteButton
                  propertyId={property.id}
                  propertyName={property.name}
                  tone="dark"
                  className="shrink-0"
                />
              </div>

              <p className="mt-7 text-[clamp(1.5rem,2.2vw,2rem)] font-semibold text-navy-950">
                {formatPrice(property.price)}
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-navy-100 py-7">
                <SpecItem icon={Bed} label="BEDROOMS" value={property.beds} />
                <SpecItem icon={Bath} label="BATHROOMS" value={property.baths} />
                <SpecItem icon={Area} label="INTERIOR" value={`${formatNumber(property.sqft)} sqft`} />
                <SpecItem
                  icon={Check}
                  label="LOT"
                  value={property.lotAcres ? `${property.lotAcres} acres` : '—'}
                />
                <SpecItem icon={Calendar} label="BUILT" value={property.yearBuilt} />
                <SpecItem icon={Check} label="GARAGE" value={`${property.garage} cars`} />
              </dl>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button variant="primary" size="lg" className="flex-1" onClick={() => setModalMode('contact')}>
                  Contact agent
                </Button>
                <Button variant="outline" size="lg" className="flex-1" onClick={() => setModalMode('viewing')}>
                  <Calendar className="h-4 w-4" />
                  Schedule a viewing
                </Button>
              </div>

              {/* Advisor */}
              <div className="mt-8 flex items-center gap-5 rounded-card border border-navy-100 bg-cream-50 p-5">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-navy-100">
                  <Photo id={agent.portrait} alt={`Portrait of ${agent.name}`} sizes="64px" widths={[96, 160, 240]} />
                </div>
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-navy-950">{agent.name}</p>
                  <p className="text-[12px] text-champagne-700">{agent.role}</p>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-navy-500">
                    <a href={`tel:${agent.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-1.5 hover:text-navy-900">
                      <Phone className="h-3.5 w-3.5" />
                      {agent.phone}
                    </a>
                    <a href={`mailto:${agent.email}`} className="flex items-center gap-1.5 hover:text-navy-900">
                      <Mail className="h-3.5 w-3.5" />
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description, features, amenities */}
          <div className="mt-20 grid gap-14 border-t border-navy-100 pt-14 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div>
              <h2 className="text-xl font-semibold text-navy-950">About this property</h2>
              <p className="mt-5 max-w-prose2 text-[15px] leading-[1.8] text-navy-500">{property.summary}</p>
              {property.description.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="mt-4 max-w-prose2 text-[15px] leading-[1.8] text-navy-500">
                  {paragraph}
                </p>
              ))}

              <h3 className="mt-12 text-base font-semibold text-navy-950">Key features</h3>
              <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {property.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-[14px] leading-relaxed text-navy-600">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-champagne-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold text-navy-950">Amenities</h3>
              <ul className="mt-6 grid gap-x-8 gap-y-3.5 sm:grid-cols-2 lg:grid-cols-1">
                {property.amenities.map((amenity) => (
                  <li key={amenity} className="flex items-center gap-3 text-[14px] text-navy-600">
                    <Check className="h-4 w-4 shrink-0 text-champagne-500" />
                    {amenity}
                  </li>
                ))}
              </ul>

              <div className="mt-10 rounded-card bg-cream-100 p-6">
                <p className="text-[13px] leading-relaxed text-navy-500">
                  Want to see it in person? Viewings can usually be arranged within 48 hours.
                </p>
                <Button variant="primary" size="md" className="mt-5 w-full" onClick={() => setModalMode('viewing')}>
                  Schedule a viewing
                </Button>
                <a
                  href={company.phoneHref}
                  className="mt-3 flex items-center justify-center gap-2 text-[13px] font-medium text-navy-700 transition-colors hover:text-navy-950"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {company.phone}
                </a>
              </div>
            </div>
          </div>
        </Container>

        {/* Similar properties */}
        <section className="mt-20 bg-cream-100 py-16 lg:py-20">
          <Container>
            <div className="flex items-end justify-between gap-8">
              <div>
                <p className="text-[11px] font-semibold uppercase text-champagne-600" style={{ letterSpacing: '0.18em' }}>
                  YOU MAY ALSO LIKE
                </p>
                <h2 className="mt-4 text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold tracking-tight text-navy-950">
                  Similar properties
                </h2>
              </div>
              <Link
                to="/properties"
                className="hidden shrink-0 items-center gap-2 text-[13px] font-medium tracking-wide2 text-navy-700 transition-colors hover:text-navy-950 sm:flex"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <ul className="mt-12 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((item, index) => (
                <Reveal as="li" key={item.id} delay={index * 70}>
                  <PropertyCard
                    property={item}
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 92vw"
                  />
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      </article>

      {/* Mobile sticky contact bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-navy-100 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <a
          href={company.phoneHref}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-navy-200 text-navy-800"
          aria-label={`Call ${company.name}`}
        >
          <Phone className="h-4 w-4" />
        </a>
        <Button variant="primary" size="md" className="flex-1" onClick={() => setModalMode('viewing')}>
          Schedule a viewing
        </Button>
        <FavouriteButton propertyId={property.id} propertyName={property.name} tone="dark" className="shrink-0" />
      </div>

      {/* Spacer so the mobile bar never covers content */}
      <div className="h-20 lg:hidden" aria-hidden="true" />

      <InquiryModal
        open={Boolean(modalMode)}
        mode={modalMode ?? 'contact'}
        property={property}
        onClose={() => setModalMode(null)}
      />
    </>
  )
}
