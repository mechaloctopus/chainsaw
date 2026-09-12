// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

const SITE = process.env.SITE_URL ?? 'https://kauaisawschool.org';

export default defineConfig({
  site: SITE,
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
  build: { inlineStylesheets: 'never', format: 'directory' },
  prefetch: false,
  devToolbar: { enabled: false },
  // Self-hosted, build-time-downloaded fonts. No third-party requests at runtime (T-5),
  // and the files land in the precache manifest so they work offline (T-2).
  // Fonts are vendored into src/fonts (OFL 1.1, logged in ASSET_LICENSES.csv).
  // Local files, not a provider fetch: the build needs no network, and nothing
  // is requested from a third party at runtime (T-5). Astro hashes them,
  // generates @font-face, and they land in the offline precache (T-2).
  fonts: [
    {
      // Archivo variable, width axis dialled to Expanded in tokens.css.
      name: 'Archivo Expanded',
      cssVariable: '--font-display',
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            src: ['./src/fonts/archivo-latin-wdth-normal.woff2'],
            weight: '100 900',
            style: 'normal',
            stretch: '62% 125%',
          },
        ],
      },
      fallbacks: ['Archivo', 'Arial Narrow', 'system-ui', 'sans-serif'],
      display: 'swap',
    },
    {
      // Atkinson Hyperlegible Next — built by the Braille Institute for low
      // vision. A functional choice first: this site is read in glare.
      name: 'Atkinson Hyperlegible Next',
      cssVariable: '--font-body',
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            src: ['./src/fonts/atkinson-hyperlegible-next-latin-normal.woff2'],
            weight: '200 800',
            style: 'normal',
          },
          {
            src: ['./src/fonts/atkinson-hyperlegible-next-latin-italic.woff2'],
            weight: '200 800',
            style: 'italic',
          },
        ],
      },
      fallbacks: ['Atkinson Hyperlegible', 'system-ui', 'sans-serif'],
      display: 'swap',
    },
  ],
});
