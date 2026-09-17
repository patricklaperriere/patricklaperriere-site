// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.patricklaperriere.com',
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

  // Tailwind v4 runs as a Vite plugin. Astro 7 ships Vite 8, whose own
  // @import resolver no longer defers to the PostCSS plugin's node-module
  // lookup, so `@import "tailwindcss"` only resolves through this plugin.
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Vite 8 minifies CSS with Lightning CSS, which transpiles to whatever
      // the target allows. Left unset it emits media-query range syntax
      // (`@media (width<=820px)`), which Safari below 16.4 ignores outright --
      // every mobile breakpoint would drop on those devices. Pin the target so
      // the output keeps the classic `max-width` form.
      cssTarget: ['chrome90', 'edge90', 'firefox90', 'safari15'],
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
