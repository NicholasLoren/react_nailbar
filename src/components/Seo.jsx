import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://thenailbarug.com'
const DEFAULT_IMAGE = `${SITE_URL}/images/7.jpg`

export default function Seo({
  title,
  description,
  path = '',
  image = DEFAULT_IMAGE,
}) {
  const fullTitle = title
    ? `${title} | The Nail Bar UG`
    : 'The Nail Bar UG — Luxury Nail Salon in Kampala'
  const url = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="The Nail Bar UG" />
      <meta property="og:locale" content="en_UG" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
