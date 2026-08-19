// Post-build step: writes a static index.html per route into dist/, each with
// its own <title>, description, canonical, OG/Twitter tags baked in.
//
// This is a plain Vite SPA (no SSR) hosted on Netlify with a catch-all SPA
// redirect (public/_redirects). Netlify serves an exact-matching static file
// or directory before falling back to that redirect, so a request for
// /gallery (from a browser or a link-preview crawler that doesn't run JS —
// WhatsApp, Facebook, iMessage, Slack) will be served dist/gallery/index.html
// directly, with the correct meta for that page, instead of always falling
// back to the homepage's tags. Real users still get the full interactive SPA:
// React mounts over this HTML exactly as it would over the plain shell.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { pageSeo, SITE_URL, DEFAULT_IMAGE, getFullTitle, getBreadcrumbSchema } from '../src/data/seo.js'

const distDir = fileURLToPath(new URL('../dist/', import.meta.url))
const baseHtml = readFileSync(`${distDir}index.html`, 'utf-8')

const escapeAttr = (str) =>
  String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function replaceTag(html, regex, replacement, label) {
  if (!regex.test(html)) throw new Error(`prerender: could not find tag to replace (${label})`)
  return html.replace(regex, replacement)
}

function buildHtml(path, meta) {
  const fullTitle = getFullTitle(meta.title)
  const url = `${SITE_URL}${path === '/' ? '' : path}`
  const image = meta.image || DEFAULT_IMAGE
  const imageAlt = escapeAttr(meta.imageAlt || fullTitle)
  const description = escapeAttr(meta.description)
  const breadcrumbTag = `<script type="application/ld+json">${JSON.stringify(getBreadcrumbSchema(path, meta.title))}</script>`

  let html = baseHtml
  html = replaceTag(html, /<title>.*?<\/title>/s, `<title>${escapeAttr(fullTitle)}</title>`, 'title')
  html = replaceTag(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${description}" />`, 'description')
  html = replaceTag(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`, 'canonical')
  html = replaceTag(html, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`, 'og:url')
  html = replaceTag(html, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escapeAttr(fullTitle)}" />`, 'og:title')
  html = replaceTag(html, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${description}" />`, 'og:description')
  html = replaceTag(html, /<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${image}" />`, 'og:image')
  html = replaceTag(html, /<meta property="og:image:alt" content="[^"]*"\s*\/?>/, `<meta property="og:image:alt" content="${imageAlt}" />`, 'og:image:alt')
  html = replaceTag(html, /<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${escapeAttr(fullTitle)}" />`, 'twitter:title')
  html = replaceTag(html, /<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${description}" />`, 'twitter:description')
  html = replaceTag(html, /<meta name="twitter:image" content="[^"]*"\s*\/?>/, `<meta name="twitter:image" content="${image}" />`, 'twitter:image')
  html = replaceTag(html, /<meta name="twitter:image:alt" content="[^"]*"\s*\/?>/, `<meta name="twitter:image:alt" content="${imageAlt}" />`, 'twitter:image:alt')
  html = html.replace('</head>', `    ${breadcrumbTag}\n  </head>`)
  return html
}

for (const [path, meta] of Object.entries(pageSeo)) {
  const html = buildHtml(path, meta)
  if (path === '/') {
    writeFileSync(`${distDir}index.html`, html)
  } else {
    const dir = `${distDir}${path.replace(/^\//, '')}/`
    mkdirSync(dir, { recursive: true })
    writeFileSync(`${dir}index.html`, html)
  }
}

console.log(`prerender: wrote per-route SEO meta for ${Object.keys(pageSeo).length} routes`)
