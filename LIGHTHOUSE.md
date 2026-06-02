# Lighthouse report

Run locally against the production build (`npm run build` → `npm run preview`),
Lighthouse desktop preset, headless Chrome.

## Scores — 100 across the board

| Page | Performance | Accessibility | Best Practices | SEO |
| --- | :---: | :---: | :---: | :---: |
| Home (`/`) | **100** | **100** | **100** | **100** |
| Service (`/services/creation-site-web`) | **100** | **100** | **100** | **100** |
| Contact (`/contact`) | **100** | **100** | **100** | **100** |

## Core Web Vitals (home, desktop)

| Metric | Value |
| --- | --- |
| First Contentful Paint | 0.3 s |
| Largest Contentful Paint | 0.3 s |
| Total Blocking Time | 0 ms |
| Cumulative Layout Shift | 0 |
| Speed Index | 0.5 s |

## How to reproduce

```bash
npm run build
npm run preview            # serves dist/ (note the port it prints)
npx lighthouse http://localhost:4321/ \
  --only-categories=performance,accessibility,best-practices,seo \
  --preset=desktop --view
```

> Notes: LCP is the static hero name/headline (HTML+CSS, painted before any JS).
> All JS (cursor, reveals, smooth scroll) is progressive enhancement loaded at
> idle, so Total Blocking Time stays at 0 and CLS at 0 (fonts preloaded, images
> and layout sized up front).
