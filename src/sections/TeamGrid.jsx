import Photo from '../components/ui/Photo.jsx'
import { ArrowUpRight, Mail, LinkedIn } from '../components/ui/Icons.jsx'
import { team } from '../data/site.js'

/** Reusable advisor grid — used on the homepage and the team page. */
export default function TeamGrid() {
  return (
    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
      {team.map((member) => (
        <li key={member.slug} className="group">
          <div className="relative overflow-hidden rounded-card bg-navy-100">
            <div className="aspect-[3/4]">
              <Photo
                id={member.portrait}
                alt={`Portrait of ${member.name}, ${member.role}`}
                sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 100vw"
                className="transition-transform duration-[1100ms] ease-premium group-hover:scale-[1.04]"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute bottom-4 left-4 flex gap-2 opacity-0 transition-all duration-500 ease-premium group-hover:opacity-100 group-focus-within:opacity-100">
              <a
                href={`mailto:${member.email}`}
                aria-label={`Email ${member.name}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-navy-900 backdrop-blur transition-colors hover:bg-white"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${member.name} on LinkedIn`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-navy-900 backdrop-blur transition-colors hover:bg-white"
              >
                <LinkedIn className="h-4 w-4" />
              </a>
              <a
                href={`tel:${member.phone.replace(/[^0-9+]/g, '')}`}
                aria-label={`Call ${member.name}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-navy-900 backdrop-blur transition-colors hover:bg-white"
              >
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <h3 className="mt-5 text-base font-semibold text-navy-950">{member.name}</h3>
          <p className="mt-1 text-[13px] text-champagne-700">{member.role}</p>
          <p className="mt-3 text-[13px] leading-relaxed text-navy-500">{member.bio}</p>
        </li>
      ))}
    </ul>
  )
}
