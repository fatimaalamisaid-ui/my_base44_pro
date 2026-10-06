/**
 * Property data. This is the single source of truth for listings — replacing
 * these arrays with API/database calls (keeping the same shape) is all that is
 * needed to connect a real backend.
 */
import { getAgent } from './agents.js'

export const PROPERTY_TYPES = ['Villa', 'Estate', 'Residence', 'Penthouse', 'House']

/** @typedef {{ city: string, state: string, country: string }} PropertyLocation */

const rawProperties = [
  {
    id: 'lakeside-modern-villa',
    name: 'Lakeside Modern Villa',
    location: { city: 'Austin', state: 'Texas', country: 'USA' },
    price: 2350000,
    type: 'Villa',
    beds: 5,
    baths: 6,
    sqft: 5420,
    lotAcres: 1.2,
    yearBuilt: 2022,
    garage: 3,
    featured: true,
    agentSlug: 'daniel-morgan',
    images: [
      '1570129477492-45c003edd2be',
      '1600607687939-ce8a6c25118c',
      '1502672260266-1c1ef2d93688',
      '1600566753086-00f18fb6b3ea',
      '1600585154526-990dced4db0d',
    ],
    summary:
      'A serene lakefront villa where floor-to-ceiling glass dissolves the line between living space and water.',
    description: [
      'Set on a quiet stretch of shoreline, Lakeside Modern Villa pairs a restrained architectural shell with warm interior finishes. The main living volume opens entirely to the terrace, where an infinity-edge pool appears to merge with the lake beyond.',
      'Five suites are arranged for privacy, with the primary wing occupying its own floor and a guest pavilion positioned across a planted courtyard. Materials are limited to limestone, oak and bronze — calm, tactile and built to age well.',
    ],
    features: [
      'Full-height glazing to the lake',
      'Infinity-edge pool and sun terrace',
      'Primary suite with private terrace',
      'Chef’s kitchen with butler’s pantry',
      'Climate-controlled wine room',
      'Guest pavilion with separate entry',
    ],
    amenities: [
      'Home cinema',
      'Wellness suite with sauna',
      'Smart home automation',
      'Three-car garage',
      'Landscaped courtyard',
      'Lake access and private dock',
      'Outdoor kitchen',
      'Staff quarters',
    ],
  },
  {
    id: 'pacific-glass-house',
    name: 'Pacific Glass House',
    location: { city: 'Malibu', state: 'California', country: 'USA' },
    price: 4800000,
    type: 'Villa',
    beds: 4,
    baths: 5,
    sqft: 4180,
    lotAcres: 0.8,
    yearBuilt: 2021,
    garage: 2,
    featured: true,
    agentSlug: 'olivia-carter',
    images: [
      '1600596542815-ffad4c1539a9',
      '1600607687920-4e2a09cf159d',
      '1522708323590-d24dbb6b0267',
      '1600607688969-a5bfcd646154',
      '1615529182904-14819c35db37',
    ],
    summary:
      'A cliffside glass pavilion with uninterrupted Pacific views from every principal room.',
    description: [
      'Pacific Glass House is an exercise in restraint: a slim structural frame, expansive glass and a cantilevered terrace that floats above the coastline. Sunsets are the principal artwork here.',
      'The open plan living, dining and kitchen sequence flows to an outdoor lounge and heated pool, while a lower level holds a media room, gym and guest accommodation.',
    ],
    features: [
      'Cantilevered ocean-view terrace',
      'Heated infinity pool',
      'Open plan living and dining',
      'Lower-level media room and gym',
      'Motorised shading throughout',
      'Direct beach access path',
    ],
    amenities: [
      'Ocean views from all principal rooms',
      'Solar and battery storage',
      'Two-car garage plus driveway',
      'Outdoor shower and changing room',
      'Fire pit lounge',
      'Wine storage',
      'Security system',
      'Guest suite with private bath',
    ],
  },
  {
    id: 'desert-horizon-estate',
    name: 'Desert Horizon Estate',
    location: { city: 'Scottsdale', state: 'Arizona', country: 'USA' },
    price: 3150000,
    type: 'Estate',
    beds: 6,
    baths: 7,
    sqft: 6850,
    lotAcres: 2.4,
    yearBuilt: 2020,
    garage: 4,
    featured: true,
    agentSlug: 'james-wilson',
    images: [
      '1600607688066-890987f18a86',
      '1600585152220-90363fe7e115',
      '1600121848594-d8644e57abab',
      '1600607688969-a5bfcd646154',
      '1600573472550-8090b5e0745e',
    ],
    summary:
      'Low-slung desert modernism with mountain views, a shaded courtyard and a resort-grade pool deck.',
    description: [
      'Desert Horizon Estate is organised around a planted central courtyard that cools the plan and frames the mountains beyond. Deep overhangs and board-formed concrete keep the interiors comfortable through the season.',
      'The estate includes a detached casita, an outdoor kitchen and a pool deck designed for entertaining at scale.',
    ],
    features: [
      'Central planted courtyard',
      'Detached guest casita',
      'Resort-grade pool and spa',
      'Deep shaded overhangs',
      'Mountain views from the great room',
      'Board-formed concrete detailing',
    ],
    amenities: [
      'Four-car garage',
      'Outdoor kitchen and bar',
      'Home gym',
      'Office with separate entrance',
      'Fireplace lounge',
      'Desert-adapted landscaping',
      'Water treatment system',
      'Gated motor court',
    ],
  },
  {
    id: 'oceanfront-residence',
    name: 'Oceanfront Residence',
    location: { city: 'Miami', state: 'Florida', country: 'USA' },
    price: 5200000,
    type: 'Residence',
    beds: 4,
    baths: 6,
    sqft: 5120,
    lotAcres: 0.6,
    yearBuilt: 2023,
    garage: 3,
    featured: true,
    agentSlug: 'sophia-bennett',
    images: [
      '1613977257363-707ba9348227',
      '1600210492486-724fe5c67fb0',
      '1567767292278-a4f21aa2d36e',
      '1600585154084-4e5fe7c39198',
      '1600566753151-384129cf4e3e',
    ],
    summary:
      'Waterfront living with a private dock, rooftop terrace and interiors finished in pale stone and oak.',
    description: [
      'Positioned on a protected bay, Oceanfront Residence is built for indoor-outdoor living. Sliding walls open the living room to a covered loggia, pool and private dock.',
      'A rooftop terrace with an outdoor kitchen captures the evening breeze, while the primary suite occupies the full water-facing elevation.',
    ],
    features: [
      'Private dock with boat lift',
      'Rooftop terrace and outdoor kitchen',
      'Covered loggia and summer kitchen',
      'Primary suite on the water elevation',
      'Pale stone and oak interiors',
      'Full-home generator',
    ],
    amenities: [
      'Heated pool and spa',
      'Boat lift and dockage',
      'Elevator to all levels',
      'Three-car garage',
      'Impact-rated glazing',
      'Smart climate control',
      'Outdoor shower',
      'Landscaped tropical garden',
    ],
  },
  {
    id: 'modern-hillside-retreat',
    name: 'Modern Hillside Retreat',
    location: { city: 'Los Angeles', state: 'California', country: 'USA' },
    price: 3750000,
    type: 'Villa',
    beds: 5,
    baths: 4,
    sqft: 4460,
    lotAcres: 0.5,
    yearBuilt: 2019,
    garage: 2,
    featured: true,
    agentSlug: 'daniel-morgan',
    images: [
      '1512917774080-9991f1c4c750',
      '1600566753190-17f0baa2a6c3',
      '1600566752355-35792bedcfea',
      '1600047509358-9dc75507daeb',
      '1600585154363-67eb9e2e2099',
    ],
    summary:
      'A stepped hillside home with canyon views, a lap pool and a studio wing for creative work.',
    description: [
      'Terraced across a canyon ridge, Modern Hillside Retreat steps down the slope so every level borrows light and a view. Living spaces are open and quiet, detailed in white oak and limestone.',
      'A separate studio wing with its own entrance suits a home office or creative practice, and the lap pool runs the length of the garden.',
    ],
    features: [
      'Stepped terraces with canyon views',
      'Lap pool along the garden',
      'Detached studio with private entrance',
      'White oak and limestone detailing',
      'Rooftop deck',
      'Floor-to-ceiling sliding walls',
    ],
    amenities: [
      'Two-car garage',
      'Home office studio',
      'Outdoor dining terrace',
      'Drought-tolerant planting',
      'Solar array',
      'Media room',
      'Guest suite',
      'Secure gated entry',
    ],
  },
  {
    id: 'palm-garden-residence',
    name: 'Palm Garden Residence',
    location: { city: 'Beverly Hills', state: 'California', country: 'USA' },
    price: 6400000,
    type: 'Estate',
    beds: 7,
    baths: 9,
    sqft: 8200,
    lotAcres: 1.6,
    yearBuilt: 2018,
    garage: 4,
    featured: true,
    agentSlug: 'olivia-carter',
    images: [
      '1580587771525-78b9dba3b914',
      '1600607687939-ce8a6c25118c',
      '1502672260266-1c1ef2d93688',
      '1615529182904-14819c35db37',
      '1600121848594-d8644e57abab',
    ],
    summary:
      'A landmark estate behind private gates, with formal gardens, a pool pavilion and staff accommodation.',
    description: [
      'Palm Garden Residence is a rare full-block estate. Behind the gate, a motor court leads to a symmetrical limestone façade softened by mature palms and hedged gardens.',
      'Principal rooms are generous and formal, balanced by informal family spaces that open to the pool pavilion and lawn.',
    ],
    features: [
      'Full-block gated grounds',
      'Pool pavilion with guest suite',
      'Formal gardens and lawn',
      'Panelled library',
      'Chef’s and catering kitchens',
      'Staff accommodation',
    ],
    amenities: [
      'Four-car garage and motor court',
      'Home cinema',
      'Gym and spa with sauna',
      'Wine cellar',
      'Elevator',
      'Tennis-ready lawn',
      'Security house',
      'Generator and smart systems',
    ],
  },
  {
    id: 'contemporary-lake-house',
    name: 'Contemporary Lake House',
    location: { city: 'Lake Tahoe', state: 'Nevada', country: 'USA' },
    price: 2950000,
    type: 'House',
    beds: 4,
    baths: 4,
    sqft: 3780,
    lotAcres: 0.9,
    yearBuilt: 2021,
    garage: 2,
    featured: true,
    agentSlug: 'james-wilson',
    images: [
      '1568605114967-8130f3a36994',
      '1600585154526-990dced4db0d',
      '1600121848594-d8644e57abab',
      '1600607688969-a5bfcd646154',
      '1600566752355-35792bedcfea',
    ],
    summary:
      'Timber and glass among the pines — a four-season retreat minutes from the water.',
    description: [
      'Contemporary Lake House sits among mature pines with a glazed gable that brings the forest right into the living room. Warm timber ceilings and a stone hearth keep it comfortable in winter.',
      'A wraparound deck and outdoor spa make the most of the quieter shoulder seasons.',
    ],
    features: [
      'Glazed gable framing the pines',
      'Wraparound timber deck',
      'Stone hearth in the great room',
      'Outdoor spa',
      'Heated mudroom and boot room',
      'Bunk room for guests',
    ],
    amenities: [
      'Two-car garage plus gear storage',
      'Radiant heated floors',
      'Outdoor spa and firepit',
      'Ski and board storage',
      'Home office loft',
      'Generator backup',
      'Laundry and drying room',
      'Trail access from the garden',
    ],
  },
  {
    id: 'architectural-downtown-penthouse',
    name: 'Architectural Downtown Penthouse',
    location: { city: 'Austin', state: 'Texas', country: 'USA' },
    price: 1850000,
    type: 'Penthouse',
    beds: 3,
    baths: 3,
    sqft: 2940,
    lotAcres: null,
    yearBuilt: 2023,
    garage: 2,
    featured: true,
    agentSlug: 'sophia-bennett',
    images: [
      '1600047509807-ba8f99d2cdde',
      '1600607687920-4e2a09cf159d',
      '1600566753086-00f18fb6b3ea',
      '1502672260266-1c1ef2d93688',
      '1600585154084-4e5fe7c39198',
    ],
    summary:
      'A full-floor penthouse with a wraparound terrace above the city skyline.',
    description: [
      'Occupying the upper floor of a boutique tower, this penthouse is wrapped in glass on three sides with a terrace that follows the skyline.',
      'Interiors are calm and precise — pale stone, dark oak and a linear kitchen that disappears behind full-height joinery.',
    ],
    features: [
      'Full-floor penthouse footprint',
      'Wraparound terrace',
      'Private lift access',
      'Linear kitchen with full-height joinery',
      'Two parking spaces plus storage',
      'Concierge and residents’ amenities',
    ],
    amenities: [
      'Skyline and river views',
      'Residents’ pool and gym',
      'Concierge service',
      'Private lift lobby',
      'Secure parking for two cars',
      'Climate-controlled storage',
      'Guest suite',
      'Smart shading and lighting',
    ],
  },
]

/** Attach the resolved agent object to each property. */
export const properties = rawProperties.map((property) => ({
  ...property,
  slug: property.id,
  agent: getAgent(property.agentSlug),
}))

export function getProperty(slug) {
  return properties.find((property) => property.slug === slug)
}

export function getFeaturedProperties() {
  return properties.filter((property) => property.featured)
}

/** Properties sharing a type or a city, with the current one excluded. */
export function getSimilarProperties(property, limit = 3) {
  if (!property) return []
  const scored = properties
    .filter((item) => item.slug !== property.slug)
    .map((item) => ({
      item,
      score: (item.type === property.type ? 1 : 0) + (item.location.city === property.location.city ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
  return scored.slice(0, limit).map((entry) => entry.item)
}

export function getLocations() {
  return [...new Set(properties.map((property) => property.location.city))].sort()
}

export function getPriceBounds() {
  const values = properties.map((property) => property.price)
  return { min: Math.min(...values), max: Math.max(...values) }
}
