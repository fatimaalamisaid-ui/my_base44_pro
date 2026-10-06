import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Container from '../components/ui/Container.jsx'
import PageHeader from '../components/layout/PageHeader.jsx'
import PropertyFilters from '../components/property/PropertyFilters.jsx'
import PropertyCard from '../components/property/PropertyCard.jsx'
import Button from '../components/ui/Button.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import { Search } from '../components/ui/Icons.jsx'
import { useFavouriteState } from '../context/FavouritesContext.jsx'
import { getLocations, properties } from '../data/properties.js'
import { useDocumentTitle } from '../lib/hooks.js'

const SORTERS = {
  featured: (a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name),
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  'size-desc': (a, b) => b.sqft - a.sqft,
  newest: (a, b) => b.yearBuilt - a.yearBuilt,
}

const DEFAULTS = {
  query: '',
  location: '',
  type: '',
  minPrice: '',
  maxPrice: '',
  beds: '',
  baths: '',
  sort: 'featured',
  savedOnly: false,
}

/** Filter state lives in the URL so results are shareable and back/forward works. */
function readFilters(params) {
  return {
    query: params.get('q') ?? '',
    location: params.get('location') ?? '',
    type: params.get('type') ?? '',
    minPrice: params.get('minPrice') ?? '',
    maxPrice: params.get('maxPrice') ?? '',
    beds: params.get('beds') ?? '',
    baths: params.get('baths') ?? '',
    sort: params.get('sort') ?? 'featured',
    savedOnly: params.get('saved') === '1',
  }
}

function writeFilters(filters) {
  const params = new URLSearchParams()
  if (filters.query) params.set('q', filters.query)
  if (filters.location) params.set('location', filters.location)
  if (filters.type) params.set('type', filters.type)
  if (filters.minPrice) params.set('minPrice', String(filters.minPrice))
  if (filters.maxPrice) params.set('maxPrice', String(filters.maxPrice))
  if (filters.beds) params.set('beds', String(filters.beds))
  if (filters.baths) params.set('baths', String(filters.baths))
  if (filters.sort && filters.sort !== DEFAULTS.sort) params.set('sort', filters.sort)
  if (filters.savedOnly) params.set('saved', '1')
  return params
}

export default function Properties() {
  useDocumentTitle('Properties — Horizon Properties')

  const [params, setParams] = useSearchParams()
  const { ids: favouriteIds, count: favouriteCount } = useFavouriteState()

  const filters = useMemo(() => readFilters(params), [params])
  const locations = useMemo(() => getLocations(), [])

  const results = useMemo(() => {
    const query = filters.query.trim().toLowerCase()

    const filtered = properties.filter((property) => {
      if (filters.location && property.location.city !== filters.location) return false
      if (filters.type && property.type !== filters.type) return false
      if (filters.minPrice && property.price < Number(filters.minPrice)) return false
      if (filters.maxPrice && property.price > Number(filters.maxPrice)) return false
      if (filters.beds && property.beds < Number(filters.beds)) return false
      if (filters.baths && property.baths < Number(filters.baths)) return false
      if (filters.savedOnly && !favouriteIds.includes(property.id)) return false

      if (query) {
        const haystack = `${property.name} ${property.location.city} ${property.location.state} ${property.type}`.toLowerCase()
        if (!haystack.includes(query)) return false
      }
      return true
    })

    return [...filtered].sort(SORTERS[filters.sort] ?? SORTERS.featured)
  }, [filters, favouriteIds])

  const update = (next) => setParams(writeFilters(next), { replace: true })
  const clear = () => setParams(new URLSearchParams(), { replace: true })

  return (
    <>
      <PageHeader
        label="PORTFOLIO"
        title="Properties"
        description="Search the homes we currently represent. Filter by location, type and budget, or ask us about off-market opportunities."
      />

      <section className="bg-cream-100 py-12 lg:py-16">
        <Container>
          <PropertyFilters
            filters={filters}
            onChange={update}
            onClear={clear}
            locations={locations}
            resultCount={results.length}
            savedCount={favouriteCount}
          />

          {results.length > 0 ? (
            <ul className="mt-12 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((property, index) => (
                <Reveal as="li" key={property.id} delay={Math.min(index, 5) * 60}>
                  <PropertyCard
                    property={property}
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 92vw"
                    priority={index < 3}
                  />
                </Reveal>
              ))}
            </ul>
          ) : (
            <div className="mt-12 rounded-card border border-navy-100 bg-white px-8 py-16 text-center">
              <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-cream-100 text-navy-400">
                <Search className="h-6 w-6" />
              </span>
              <h2 className="mt-6 text-xl font-semibold text-navy-950">No properties match those filters</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-navy-500">
                Try widening your budget or clearing a filter — or tell us what you are looking for and we
                will search off-market on your behalf.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button variant="primary" size="md" onClick={clear}>
                  Clear filters
                </Button>
                <Button to="/contact" variant="outline" size="md">
                  Talk to an advisor
                </Button>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
