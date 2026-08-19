import { Helmet } from 'react-helmet-async'
import { SITE_URL, DEFAULT_IMAGE, getFullTitle, getBreadcrumbSchema } from '../data/seo'

export default function Seo({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  imageAlt,
}) {
  const fullTitle = getFullTitle(title)
  const url = `${SITE_URL}${path === '/' ? '' : path}` || SITE_URL
  const breadcrumbSchema = getBreadcrumbSchema(path, title)

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
      <meta property="og:image:alt" content={imageAlt || fullTitle} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:site_name" content="The Nail Bar UG" />
      <meta property="og:locale" content="en_UG" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt || fullTitle} />

      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    </Helmet>
  )
}
