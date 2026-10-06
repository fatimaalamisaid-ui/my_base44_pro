import { ArrowUpRight, MapPin } from '../ui/Icons.jsx'
import { contactInfo, siteSettings } from '../../data/site.js'

/** Decorative map placeholder — ready to be swapped for Google Maps / Mapbox. */
export default function MapPlaceholder({ className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-modal border border-line bg-coffee-900 ${className}`}>
      <div className="map-grid absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,rgba(216,180,122,0.12),transparent_70%)]" />

      <div className="relative flex min-h-[240px] flex-col items-center justify-center px-6 py-10 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-coffee-950/70 text-gold">
          <MapPin className="h-5 w-5" />
        </span>
        <p className="mt-5 text-sm font-semibold text-cream">{siteSettings.address}</p>
        <p className="mt-2 max-w-xs text-[12px] leading-relaxed text-sand/50">{contactInfo.mapNote}</p>

        <a
          href={contactInfo.directionsHref}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-6 inline-flex items-center gap-2 rounded-pill border border-line px-4 py-2 text-[12px] text-cream transition-colors duration-300 hover:border-gold hover:text-gold"
        >
          مسیریابی
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  )
}
