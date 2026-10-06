import { agents } from './agents.js'

export const company = {
  name: 'Horizon Properties',
  shortName: 'Horizon',
  tagline: 'Exceptional homes & investments',
  phone: '(555) 246-7890',
  phoneHref: 'tel:+15552467890',
  email: 'hello@horizonproperties.com',
  address: ['1800 Ridgeline Avenue, Suite 900', 'Austin, Texas 78701'],
  hours: 'Mon – Fri, 9:00 – 18:00 CT',
  description:
    'Horizon Properties represents architecturally significant homes and considered investments in prime locations. We advise a small number of clients at a time, with discretion and clear thinking.',
  socials: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Facebook', href: 'https://facebook.com' },
  ],
}

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Properties', to: '/properties' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Team', to: '/team' },
  { label: 'Contact', to: '/contact' },
]

export const services = [
  {
    id: 'luxury-home-sales',
    title: 'Luxury Home Sales',
    description:
      'Representation for architecturally significant homes, from first valuation through to a closed sale.',
  },
  {
    id: 'property-investment',
    title: 'Property Investment',
    description:
      'Income-focused acquisitions and portfolio advice, supported by transparent yield and market analysis.',
  },
  {
    id: 'property-marketing',
    title: 'Property Marketing',
    description:
      'Photography, film and editorial campaigns that present a property the way it deserves to be seen.',
  },
  {
    id: 'real-estate-advisory',
    title: 'Real Estate Advisory',
    description:
      'Independent guidance on timing, structuring and negotiation for owners and buyers alike.',
  },
  {
    id: 'property-valuation',
    title: 'Property Valuation',
    description:
      'Accurate, evidence-based valuations for sale, refinancing, probate and portfolio reporting.',
  },
  {
    id: 'relocation-services',
    title: 'Relocation Services',
    description:
      'Neighbourhood guidance, school introductions and settling-in support for moves into the region.',
  },
]

export const whyChoose = [
  {
    title: 'Architectural expertise',
    description:
      'We represent homes designed by people who cared about them, and we understand what makes them valuable.',
  },
  {
    title: 'Quietly effective',
    description:
      'Discretion is standard. Most of what we sell is never publicly listed.',
  },
  {
    title: 'Evidence over opinion',
    description:
      'Every recommendation is supported by comparable sales, absorption data and honest judgement.',
  },
  {
    title: 'One advisor, start to finish',
    description:
      'The person who shows you the property is the person who negotiates and closes it.',
  },
]

export const stats = [
  { value: '$1.4B', label: 'Property transacted' },
  { value: '18', label: 'Years advising clients' },
  { value: '96%', label: 'Of asking price achieved' },
  { value: '24', label: 'Advisors and specialists' },
]

export const testimonials = [
  {
    quote:
      'They understood the house immediately and found the right buyer without ever putting it on the open market.',
    name: 'M. Ellsworth',
    detail: 'Seller, Austin',
  },
  {
    quote:
      'Patient, precise and completely straight with us. We bought somewhere better than we thought we could afford.',
    name: 'R. & A. Kapoor',
    detail: 'Buyers, Malibu',
  },
]

export const team = agents
