import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { faqJsonLd, organizationJsonLd } from './src/content.js'

const DEFAULT_SITE_URL = 'https://tasleeh.net/planned-maintenance/'

// Escape "<" so JSON-LD can never close its <script> tag early.
const jsonLd = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`

function pageMeta(env) {
  const siteUrl = (env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/?$/, '/')
  const values = {
    __SITE_URL__: siteUrl,
    __OG_IMAGE__: new URL('og.webp', siteUrl).href,
    __GA4_ID__: env.VITE_GA4_ID || '',
    __META_PIXEL_ID__: env.VITE_META_PIXEL_ID || '',
    __LINKEDIN_PARTNER_ID__: env.VITE_LINKEDIN_PARTNER_ID || '',
  }
  return {
    name: 'tasleeh-page-meta',
    transformIndexHtml(html) {
      let out = html
      for (const [key, value] of Object.entries(values)) out = out.replaceAll(key, value)
      return out.replace(
        '<!-- structured-data -->',
        `${jsonLd(organizationJsonLd(siteUrl))}\n    ${jsonLd(faqJsonLd())}`,
      )
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    plugins: [react(), tailwindcss(), pageMeta(env)],
  }
})
