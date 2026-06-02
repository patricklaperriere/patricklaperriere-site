// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
// Tailwind v4 is wired through PostCSS (postcss.config.mjs) rather than the
// @tailwindcss/vite plugin, which is currently incompatible with Astro 6's
// bundled rolldown-vite resolver.

// https://astro.build/config
export default defineConfig({
  site: 'https://patricklaperriere.com',
  output: 'static',
  // Canonical URLs have no trailing slash; keep sitemap + hreflang + <link
  // rel=canonical> all in agreement (Cloudflare Pages serves /foo/index.html
  // at /foo either way).
  trailingSlash: 'never',

  // Bilingual routing: French at the root (/), English under /en/.
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: false, // fr lives at "/", not "/fr/"
    },
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'fr',
        locales: {
          fr: 'fr-CA',
          en: 'en-CA',
        },
      },
    }),
  ],
});
