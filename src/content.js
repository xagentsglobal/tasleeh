// Page copy that is shared between the rendered page and build-time
// structured data. Keep FAQ text here so the visible answers and the
// FAQPage JSON-LD can never drift apart.

export const PHONE_DISPLAY = '800 222 333'
export const PHONE_TEL = 'tel:800222333'
export const PHONE_INTL = '+971800222333'
export const EMAIL = 'info@tasleeh.net'
export const ADDRESS_LINE = 'Marina Pinnacle, Floor 28, Office 2801, Dubai Marina.'

export const faqs = [
  {
    q: 'Is the survey free?',
    a: 'Yes. The post-summer survey and the maintenance plan proposal carry no charge and no obligation.',
  },
  {
    q: 'What types of property do you maintain?',
    a: 'Residential, commercial and hospitality buildings, from individual villas and apartments to towers, offices and hotels.',
  },
  {
    q: 'Which areas do you cover?',
    a: "We cover two emirates. Tell us your location in the form and we'll confirm coverage straight away.",
  },
  {
    q: 'Do you subcontract the work?',
    a: 'Our services network covers in-house trades, all managed through a single point of contact.',
  },
  {
    q: 'What happens in an emergency?',
    a: 'Call 800 222 333. Our team is available to respond to maintenance and retrofit requirements at any time.',
  },
  {
    q: 'Can you take over from our current contractor?',
    a: "Yes. The survey gives us a clear picture of your building's condition, so we can plan a handover and start with what matters most.",
  },
]

export const roles = [
  'Property manager',
  'Facility manager',
  'Owner or landlord',
  'Owners association',
  'Hotel or hospitality',
  'Office or retail',
  'Other',
]

export const propertyTypes = [
  'Residential building',
  'Villa or apartment',
  'Office or commercial',
  'Hotel',
  'Retail',
  'Mixed-use',
]

export const maintenanceSetups = [
  'In-house team',
  'Several contractors',
  'Annual contract with another provider',
  'No regular maintenance',
]

export function organizationJsonLd(siteUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TASLEEH Facilities Management',
    parentOrganization: { '@type': 'Organization', name: 'Tiger Group' },
    url: siteUrl,
    logo: new URL('logo-tasleeh.svg', siteUrl).href,
    telephone: PHONE_INTL,
    email: EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Marina Pinnacle, Floor 28, Office 2801',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
  }
}

export function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}
