import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navigation from './Navigation'
import Footer from './Footer'
import BackToTop from './BackToTop'

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'NailSalon',
  name: 'The Nail Bar UG',
  url: 'https://thenailbarug.com',
  logo: 'https://thenailbarug.com/images/logo.png',
  image: 'https://thenailbarug.com/images/7.jpg',
  description:
    "Kampala's premier nail salon offering luxury manicures, pedicures, acrylic nails, gel nails, lash extensions, and eyebrow shaping at The Cube, First Floor.",
  telephone: '+256772054361',
  email: 'info@thenailbarug.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'The Cube, First Floor',
    addressLocality: 'Kampala',
    addressCountry: 'UG',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 0.3384357,
    longitude: 32.5850633,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday',
        'Friday', 'Saturday', 'Sunday',
      ],
      opens: '09:00',
      closes: '20:00',
    },
  ],
  priceRange: '$$',
  currenciesAccepted: 'UGX',
  paymentAccepted: 'Cash, Mobile Money',
  sameAs: [
    'https://www.instagram.com/the_nail_bar_ug',
    'https://www.tiktok.com/@thenailbarug1',
  ],
}

export default function Layout() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) return saved === 'true'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  return (
    <>
      <Helmet>
        {/* Site-wide defaults */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="The Nail Bar UG" />
        <meta name="geo.region" content="UG-C" />
        <meta name="geo.placename" content="Kampala" />
        <meta name="geo.position" content="0.3384357;32.5850633" />
        <meta name="ICBM" content="0.3384357, 32.5850633" />
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
        <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  )
}
