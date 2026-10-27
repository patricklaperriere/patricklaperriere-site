# Technical SEO audit, local build (dist, 60 HTML files: 58 indexable + 404 + signature snippet)
Crawler: crawl.py (scratchpad) (raw output ./crawl.out). Score ~93/100.

## Critical
None. 0 broken internal links, 0 duplicate titles, 0 duplicate descriptions, 0 http:// links, 1 H1 on every real page, canonical absolute/self-referencing/www on all 58, hreflang fr-CA/en-CA/x-default present and reciprocal on all 58 (the "/" reciprocity hit in the raw script is a trailing-slash artefact; verified by hand), sitemap = 58 URLs, all built, none noindex, all with hreflang alternates, no lastmod on non-blog pages (intentional), all og:image files exist.

## High
None.

## Medium
1. /signature/design-by-patrick.html is a crawlable, indexable HTML file with no title, H1, canonical, robots meta or lang; it is not in the sitemap and has 0 inbound links. It is a copy-paste snippet. Source: public/signature/design-by-patrick.html. Fix: add `<meta name="robots" content="noindex">` and/or an X-Robots-Tag header in vercel.json, or Disallow /signature/ in public/robots.txt.
2. Titles over 60 chars (likely truncated in SERP; all end in "| Patrick Laperrière", suffix could be shortened):
   - /en/services/shopify-ecommerce 65; /concepts 64; /creation-site-web/gatineau 64; /en/blog/wordpress-vs-custom-website 64; /en/work/inspection-habitation-outaouais 64; /realisations/inspection-habitation-outaouais 64; /services/site-ecommerce-shopify 62; /creation-site-web 61; /en/work/envita-wellness 61; /realisations 61. (/en/concepts is within range.)
   Sources: src/i18n/fr.ts, src/i18n/en.ts, src/content (blog), src/pages/creation-site-web/*, src/components/SEO.astro (suffix).
3. /concepts and /en/concepts: 13 <img> each with alt="" (barber, latte, tattoo1-4, resto, house x2, room1, room3, smile, fashion). Fine if purely decorative, but each sits in a link/card, so check an accessible name exists; otherwise give real alt. Source: src/pages/concepts.astro, src/pages/en/concepts.astro.

## Low
4. Heading skips: /concepts and /en/concepts h2->h4; /realisations and /en/work h1->h3. Source: src/pages/concepts.astro, src/pages/en/concepts.astro, src/pages/realisations/index.astro, src/pages/en/work/index.astro (or ProjectFeature.astro).
5. Descriptions below ~120 chars: /en/work/envita-wellness 118, /en/blog/wordpress-vs-custom-website 129. Others are 130-160. 404 description is 42 chars (noindex, ignore).
6. OG images: 9 pages share /og/default.png: /, /en, /404, /confidentialite, /en/privacy, /services, /en/services, /creation-site-web, /en/web-design; everything else has its own image (about, blog, concepts, contact, work, services x4, ville x5, project x4, post x14). Acceptable; a dedicated home card would help social CTR.
7. Thin internal linking: FR/EN blog posts why-website-not-converting, bilingual-website-seo, site-bilingue-seo-quebec, pourquoi-site-web-ne-convertit-pas have only 2 inbound links. Regional pages (/creation-site-web/{gatineau,montreal,quebec,longueuil,terrebonne} and /en/web-design/*) have 3 each. Add links from relevant service pages and related-posts blocks. No orphans among indexable pages; 404 and signature snippet have 0.
8. Sitewide link graph: footer/nav gives ~29-31 inbound links to main pages; this is healthy.
9. vercel.json redirects /creation-site-web/laval and /en/web-design/laval: no built page links to them (verified), no sitemap entry. Good. vercel.json trailingSlash:false matches Astro trailingSlash:'never'; no internal link has a trailing slash. Note: the local server returns 404 for /a-propos/ (Vercel will redirect to non-slash).
10. Images: all <img> in pages carry width/height and loading attr; no missing files. (Check LCP image on each page is not lazy: home portrait is loading=lazy, fine if below fold, verify at 320 px where it may be above fold.)
11. Missing /en/llms.txt (only /llms.txt exists); optional.

## Passed
lang: fr-CA on 30 pages, en-CA on 29; og:locale fr_CA/en_CA with reciprocal alternate; og:url equals canonical; twitter:card summary_large_image with image/title on all; robots.txt allows all and declares the www sitemap-index; sitemap-index -> sitemap-0 only; 404 has noindex,nofollow and is excluded from the sitemap; external links only to instagram, linkedin, github, habita.expert, inspectionbeauregard.com, envita-wellness.com, hpaddik.com, inspectionhab.ca; RSS fr/en exist and are linked in head.
