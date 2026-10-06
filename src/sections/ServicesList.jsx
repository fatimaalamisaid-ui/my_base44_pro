import Photo from '../components/ui/Photo.jsx'
import { services } from '../data/site.js'

/**
 * Editorial services list — numbered rows rather than icon boxes, so it reads
 * like the rest of the site. Reused on the homepage and the services page.
 */
export default function ServicesList() {
  return (
    <ul className="border-t border-navy-100">
      {services.map((service, index) => (
        <li key={service.id} id={service.id} className="scroll-mt-32 border-b border-navy-100">
          <div className="group flex items-start gap-5 py-7 transition-colors duration-500 lg:gap-8">
            <span className="mt-1 w-8 shrink-0 text-[12px] font-medium tracking-label text-champagne-500">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0 flex-1 lg:flex lg:items-baseline lg:gap-10">
              <h3 className="text-lg font-semibold text-navy-950 transition-transform duration-500 ease-premium lg:w-64 lg:shrink-0 lg:group-hover:translate-x-1.5">
                {service.title}
              </h3>
              <p className="mt-2 max-w-prose2 text-[14px] leading-relaxed text-navy-500 lg:mt-0">
                {service.description}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

/** Tall supporting image used beside the services list. */
export function ServicesImage() {
  return (
    <div className="overflow-hidden rounded-card bg-navy-100">
      <div className="aspect-[4/5]">
        <Photo
          id="1600607687939-ce8a6c25118c"
          alt="Interior of a contemporary home with a fireplace and open living space"
          sizes="(min-width: 1024px) 34vw, 100vw"
          className="transition-transform duration-[1200ms] ease-premium hover:scale-[1.04]"
        />
      </div>
    </div>
  )
}
