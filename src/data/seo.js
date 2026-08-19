export const SITE_URL = 'https://thenailbarug.com'
export const DEFAULT_IMAGE = `${SITE_URL}/images/gold-charm-nude-nails-01.jpg`

export const pageLabels = {
  '/': 'Home',
  '/about': 'About',
  '/services': 'Services',
  '/gallery': 'Gallery',
  '/contact': 'Contact',
}

export const pageSeo = {
  '/': {
    title: 'Luxury Nail Salon in Kampala',
    description:
      'Experience luxury nail care at The Nail Bar UG. Professional manicures, pedicures, acrylic nails, gel nails, and beauty treatments in Kampala, Uganda.',
    imageAlt: 'Luxury nail art at The Nail Bar UG, Kampala',
  },
  '/about': {
    title: 'About Us',
    description:
      "Learn about The Nail Bar UG, our story, values, and why we're Kampala's favourite nail salon for luxury manicures, pedicures, and nail art.",
    image: `${SITE_URL}/images/5.jpg`,
    imageAlt: 'The Nail Bar UG team at work in Kampala',
  },
  '/services': {
    title: 'Nail Services: Manicures, Pedicures, Acrylics & More',
    description:
      'Discover our full range of luxury nail services in Kampala: manicures, pedicures, acrylic nails, gel builder nails, ombre nails, eyelash extensions, and eyebrow shaping.',
    image: `${SITE_URL}/images/french-white-gold-floral-02.jpg`,
    imageAlt: 'Manicure service at The Nail Bar UG, Kampala',
  },
  '/gallery': {
    title: 'Gallery: Nail Art Portfolio',
    description:
      'Browse our portfolio of stunning nail art, gel manicures, acrylic extensions, pedicures, lash extensions, and beauty work at The Nail Bar UG in Kampala.',
    image: `${SITE_URL}/images/burgundy-pink-floral-nails.jpg`,
    imageAlt: 'Nail art portfolio at The Nail Bar UG, Kampala',
  },
  '/contact': {
    title: 'Book an Appointment',
    description:
      'Book your nail appointment at The Nail Bar UG in Kampala. Call +256 772 054 361 or fill out our online form. Open 7 days a week, 9 AM – 8 PM.',
    imageAlt: 'Book an appointment at The Nail Bar UG, Kampala',
  },
}

export function getFullTitle(title) {
  return title ? `${title} | The Nail Bar UG` : 'The Nail Bar UG | Luxury Nail Salon in Kampala'
}

export function getBreadcrumbSchema(path, title) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      ...(path && path !== '/'
        ? [{ '@type': 'ListItem', position: 2, name: pageLabels[path] || title, item: `${SITE_URL}${path}` }]
        : []),
    ],
  }
}
