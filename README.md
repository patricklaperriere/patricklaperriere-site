# patricklaperriere.com

Bilingual (FR-CA / EN-CA) marketing site for **Patrick Laperrière**, freelance web
developer serving Québec, Canada and the United States.

> **Positioning rule — do not undo this.** The site names no home town: the
> scope is **Québec / Canada / United States** everywhere, structured data
> included (no `addressLocality`). The former Laval city pages are removed and
> 308-redirected to the regions hub (`vercel.json`). A client's own territory
> in a case study is fine (Bâti-Conseil serves Laval). No city page may name a
> city other than its own (regional designations such as "Rive-Sud de
> Montréal" are fine). When generating copy from this README, carry that rule
> forward.
>
> **Email.** Public address: `info@patricklaperriere.com` (contact page,
> footer, JSON-LD). The About page alone shows `pl@patricklaperriere.com`. The
> contact form posts to Web3Forms, which forwards to the inbox configured in
> that account; no personal address is printed anywhere. **Before launch,
> configure mail routing for the domain** so both addresses actually receive
> mail.

Built SEO-first: static HTML at first paint, animations layered on top as
progressive enhancement. Targets Lighthouse 100 across the board.

---

## Stack

| Concern | Choice |
| --- | --- |
| Framework | [Astro 7](https://astro.build) — `output: 'static'` |
| Styling | Hand-written CSS — design tokens + surface system in `src/styles/global.css`, component styles scoped in `.astro` files |
| i18n | Astro native i18n — FR at `/`, EN under `/en/` |
| Fonts | Self-hosted (Bricolage Grotesque, Instrument Serif, JetBrains Mono) in `public/fonts/` |
| Animation | CSS only; one IntersectionObserver for scroll reveals. No animation library |
| Sitemap | `@astrojs/sitemap` with i18n alternates |
| Hosting | **Vercel** (static `dist/`), DNS proxied by Cloudflare |

> **Note on styling:** Tailwind was removed during the 2026 redesign. It was
> shipping Preflight plus ~180 unused custom properties on the universal
> selector for *zero* utility classes — the site had always been hand-written
> CSS. `src/styles/global.css` now carries the reset, the tokens and the shared
> page system; everything else is scoped per component.

> **Note on the surface system:** the page is INK (near-black) and any section
> can flip to PAPER (warm bone) with `data-surface="paper"`. Components style
> themselves against `--fg` / `--bg` / `--line` / `--accent-fg` rather than
> fixed colours, so a section changes world by changing one attribute. That is
> what produces the light/dark rhythm on the home, services and about pages.

> **Note on CSS targets:** Vite 8 minifies CSS with Lightning CSS, which
> transpiles to whatever the browser target allows. `vite.build.cssTarget` in
> `astro.config.mjs` is pinned so the output keeps classic `max-width` media
> queries instead of range syntax (`@media (width<=820px)`), which Safari below
> 16.4 ignores outright. Widen the target to shave a few kB of CSS.

---

## Commands

```bash
npm install        # install dependencies
npm run dev        # local dev server (http://localhost:4321)
npm run build      # production build → dist/
npm run preview    # preview the built site locally
```

---

## Project structure

```
public/
  fonts/                 self-hosted woff2
  og/default.png         default Open Graph image
  signature/             standalone "Design by" snippet for client sites
  robots.txt
vercel.json              security + cache headers, trailing-slash redirect
src/
  config.ts              site identity, email, socials, Web3Forms key
  i18n/
    routes.ts            bilingual route registry (FR ↔ EN paths)
    fr.ts  en.ts         ALL copy lives here (no hard-coded strings in components)
    index.ts             useTranslations() helper
  lib/schema.ts          JSON-LD builders (Person, WebSite, ProfessionalService,
                         BreadcrumbList, FAQPage, CreativeWork)
  content/projets/*.md   portfolio, one Markdown file per project
  data/projets.ts        loads the projets collection for components
  components/            SEO, Nav, Footer, Hero, cards, SignaturePL, …
    pages/               per-page content components (kept DRY across FR/EN)
  layouts/Layout.astro   <html>, <head>, SEO, atmosphere, nav, footer
  pages/                 FR routes at root, EN routes under en/
  scripts/ux.ts          progressive-enhancement layer (cursor, reveals, …)
  styles/global.css      design tokens + base styles
```

---

## Editing content

**All text is in `src/i18n/fr.ts` and `src/i18n/en.ts`.** Components never hold
copy. Edit those two files and both languages stay in sync structurally.

> **French style:** no em-dashes/tirets in FR copy (Québécois convention) —
> use commas, colons, or « à » for ranges. English keeps normal dashes.

### Adding a portfolio project

Add one Markdown file to `src/content/projets/` (see the README in that folder
for every field). The file name is the slug: a case-study page is generated at
`/realisations/<slug>` and `/en/work/<slug>`. Drop a screenshot at the path given
in `image` (1280×800 WebP) and run `npm run og` for its share image.

`publié: false` keeps a project as a draft: it shows (flagged) under `npm run dev`
and is absent from every build. The build fails if a published project still
contains an `À CONFIRMER` placeholder.

### Adding a blog article

Blog posts are a content collection in `src/content/blog/*.md`. Each post needs
frontmatter: `title`, `description`, `lang` (`fr`|`en`), `slug`, `translationKey`
(shared between a FR post and its EN counterpart so hreflang can pair them),
`pubDate`, `tags`, optional `draft`. FR posts route to `/blogue/<slug>`, EN to
`/en/blog/<slug>`. Index pages and `BlogPosting` schema are generated automatically.

### Generating images

- **OG images:** `npm run og` regenerates `public/og/*` (default + per service +
  per project) from `scripts/og.mjs`.
- **Project screenshots:** captured from the live sites with headless Chrome and
  optimized to WebP. Re-capture by screenshotting at 1366×854 and resizing to a
  1280×800 WebP into `public/work/<slug>.webp`.

---

## Adding a new language

1. In `src/i18n/routes.ts`, add the locale to `locales` and add its paths to
   every entry in `routes` (and `workBase`).
2. Create `src/i18n/<locale>.ts` mirroring the shape of `fr.ts`. Register it in
   `src/i18n/index.ts`.
3. Add the locale to `astro.config.mjs` (`i18n.locales` + sitemap `i18n.locales`).
4. Duplicate the `src/pages/en/**` tree under the new locale prefix.
5. Pass the new path in each page's `alternates` prop so hreflang stays complete.

---

## SEO

- One `<SEO>` component (`src/components/SEO.astro`) renders title, description,
  canonical, hreflang (FR/EN/x-default), Open Graph, Twitter cards, and JSON-LD.
- Each page passes `alternates={{ fr, en }}` so language links + hreflang always
  point at the *equivalent* page, never the home.
- JSON-LD: `Person`, `WebSite` and `Organization` (Technologies Habita inc.) on every
  page, injected by `<SEO>`; `ProfessionalService` on home/services/contact (no
  self-serving `aggregateRating`); `BreadcrumbList` on inner pages; `FAQPage` on
  service pages; `CreativeWork` per case study (+ `SoftwareApplication` for Habita).
- `robots.txt` → `sitemap-index.xml` (generated by `@astrojs/sitemap`; hreflang pairs and
  `lastmod` are read from each built page's own `<head>`, see `astro.config.mjs`).
- `/llms.txt` is generated at build time from the projects, services and posts (`src/pages/llms.txt.js`).
- RSS feeds per language (`/rss.xml`, `/en/rss.xml`) via `@astrojs/rss`, linked in `<head>` + footer.
- Per-page OG images (default, per service, per project, per article) via `npm run og`.
- Structured data also includes `OfferCatalog`, `Service`, `ItemList`, `Blog`, `BlogPosting`, and `GeoCoordinates`.
- Google Search Console verification token lives in `src/config.ts`.

---

## Contact form (Web3Forms)

The contact form posts to [Web3Forms](https://web3forms.com) (no backend needed).

1. Create a free access key at web3forms.com (it emails submissions to you).
2. Put it in `src/config.ts` → `SITE.web3formsKey`.

Until a real key is set, the form falls back to a normal POST. With a key, it
submits via `fetch` and shows the animated success state. A honeypot field
(`botcheck`) is included for spam protection.

---

## The "Design by Patrick Laperrière" signature

A dofollow backlink dropped into client-site footers — every client site feeds
authority back to this domain.

- **Astro component:** `src/components/SignaturePL.astro` (used in this site's footer).
- **Standalone snippet:** `public/signature/design-by-patrick.html` — a fully
  self-contained HTML+CSS block to copy-paste into **Shopify Liquid, WordPress,
  Webflow, or plain HTML**. Scoped `.pl-sig` classes + system fonts, no external
  dependencies.

The wordmark text is fixed — **"Design by Patrick Laperrière"**, identical in
every language, never translated. The link is intentionally **dofollow**.

---

## Deployment — Vercel

The Vercel project builds `main` on every push (production) and every other
branch as a preview deployment. Build command `npm run build`, output `dist`.

`vercel.json` carries the security headers, the cache rules (`/_astro` and
`/fonts` immutable, images one week) and `trailingSlash: false`, which 308s
`/foo/` to the canonical `/foo`.

Two settings live in the dashboards, not in the repo:

- **Vercel → Domains:** the apex `patricklaperriere.com` should redirect to
  `www` with a **308** (permanent), not the default 307.
- **Cloudflare:** "Block AI bots" returns 403 to ClaudeBot, CCBot and others
  even though `robots.txt` allows them; Email Address Obfuscation rewrites
  every `mailto:` link and injects a script. Turn either off if unwanted.

`wrangler.jsonc` is left from an earlier Cloudflare setup and is not used by Vercel.

## Accessibility & performance notes

- All motion respects `prefers-reduced-motion` (animations freeze cleanly).
- Custom cursor / spotlight / smooth scroll disabled on touch + reduced motion.
- Fonts preloaded (`woff2`, `font-display: swap`), images sized to avoid CLS.
- LCP content (hero name + headline) is static HTML/CSS, painted before any JS.
