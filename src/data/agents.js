import { slugify } from '../lib/utils.js'

/**
 * Advisors. Properties reference these by slug, so a real backend would expose
 * the same structure via an agents endpoint.
 */
const rawAgents = [
  {
    name: 'Daniel Morgan',
    role: 'Managing Director',
    portrait: '1560250097-0b93528c311a',
    phone: '(555) 246-7890',
    email: 'daniel@horizonproperties.com',
    bio: 'Two decades advising owners and investors on landmark residential property.',
    focus: 'Estates & waterfront',
  },
  {
    name: 'Olivia Carter',
    role: 'Luxury Property Advisor',
    portrait: '1573496359142-b8d87734a5a2',
    phone: '(555) 246-7912',
    email: 'olivia@horizonproperties.com',
    bio: 'Specialises in architect-designed homes and discreet private sales.',
    focus: 'Architectural homes',
  },
  {
    name: 'James Wilson',
    role: 'Investment Consultant',
    portrait: '1519085360753-af0119f7cbe7',
    phone: '(555) 246-7934',
    email: 'james@horizonproperties.com',
    bio: 'Advises on income-producing residential assets and portfolio structuring.',
    focus: 'Investment & yield',
  },
  {
    name: 'Sophia Bennett',
    role: 'Senior Property Specialist',
    portrait: '1580489944761-15a19d654956',
    phone: '(555) 246-7956',
    email: 'sophia@horizonproperties.com',
    bio: 'Guides first-time buyers and relocating families through every step.',
    focus: 'City & new build',
  },
]

export const agents = rawAgents.map((agent) => ({ ...agent, slug: slugify(agent.name) }))

export function getAgent(slug) {
  return agents.find((agent) => agent.slug === slug) ?? agents[0]
}
