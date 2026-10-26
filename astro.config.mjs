// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { existsSync, readFileSync } from 'node:fs';
import { metricsDigest } from './scripts/metrics-digest.mjs';

// The sitemap mirrors each page's own <head> instead of guessing: hreflang
// pairs come from the page's <link rel="alternate" hreflang> tags (FR and EN
// slugs differ, e.g. /realisations ↔ /en/work, which @astrojs/sitemap's i18n
// option cannot pair), and <lastmod> from the page's dateModified when it
// declares one (blog posts). Pages without a reliable date get no lastmod
// rather than the build time, which search engines learn to ignore.
const distDir = new URL('./dist/', import.meta.url);

/** @param {string} url */
function pageHead(url) {
  const { pathname } = new URL(url);
  const rel = pathname.replace(/^\/|\/$/g, '');
  const file = new URL(rel ? `${rel}/index.html` : 'index.html', distDir);
  if (!existsSync(file)) return null;
  const html = readFileSync(file, 'utf8');
  return html.slice(0, html.indexOf('</head>'));
}

/** @param {import('@astrojs/sitemap').SitemapItem} item */
function serialize(item) {
  const head = pageHead(item.url);
  if (!head) return item;
  const links = [...head.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)]
    .map(([, lang, url]) => ({ lang, url }));
  const modified = head.match(/"dateModified":"([^"]+)"/);
  return {
    ...item,
    ...(links.length ? { links } : {}),
    ...(modified ? { lastmod: modified[1] } : {}),
  };
}

// The home page's inspection sheet prints real numbers from
// src/data/site-metrics.json, written by `npm run measure`. After each build,
// compare the built pages with the sizes recorded at measurement time: if one
// has moved by more than 10%, the numbers on the sheet describe a page that no
// longer exists, so say so loudly (the build itself still succeeds).
// Before the build, the file's fingerprint is checked: numbers edited by hand
// stop the build (scripts/metrics-digest.mjs).
/** @returns {import('astro').AstroIntegration} */
function metricsFreshness() {
  return {
    name: 'site-metrics-freshness',
    hooks: {
      'astro:build:start': () => {
        const file = new URL('./src/data/site-metrics.json', import.meta.url);
        if (!existsSync(file)) return;
        const m = JSON.parse(readFileSync(file, 'utf8'));
        if (!process.env.MEASURING && m.measuredAt && m.digest !== metricsDigest(m)) {
          throw new Error(
            'src/data/site-metrics.json does not match its fingerprint: it was edited by hand. ' +
              'Run `npm run measure` to write real numbers.',
          );
        }
      },
      'astro:build:done': ({ dir, logger }) => {
        const file = new URL('./src/data/site-metrics.json', import.meta.url);
        if (!existsSync(file)) return;
        const m = JSON.parse(readFileSync(file, 'utf8'));
        if (!m.measuredAt) {
          logger.warn('site-metrics.json has no measurement yet: run `npm run measure`.');
          return;
        }
        for (const [path, recorded] of Object.entries(m.htmlBytes ?? {})) {
          const rel = path === '/' ? 'index.html' : `${path.replace(/^\//, '')}/index.html`;
          const built = new URL(rel, dir);
          if (!existsSync(built)) continue;
          const now = readFileSync(built).length;
          const drift = Math.abs(now - recorded) / recorded;
          if (drift > 0.1) {
            logger.warn(
              `${path} is ${Math.round(drift * 100)}% off the size measured on ${m.measuredAt.slice(0, 10)}: ` +
                'the inspection sheet is stale, run `npm run measure`.',
            );
          }
        }
      },
    },
  };
}

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

  build: {
    // Inline every stylesheet: three render-blocking requests on the home page
    // cost more on a first visit than the few kB of CSS repeated per page.
    inlineStylesheets: 'always',
  },

  vite: {
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
    metricsFreshness(),
    sitemap({
      serialize,
      // The 404 is noindex; drafts never reach a build in the first place.
      filter: (page) => !page.endsWith('/404'),
    }),
  ],
});
