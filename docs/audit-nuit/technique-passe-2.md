# Technical + schema audit, pass 2 (dist, 62 pages). Score 92/100

PASS: 62 pages = 62 sitemap URLs, no orphans either way (bati-conseil, inspection-beauregard FR+EN included). hreflang fr-CA/en-CA/x-default(FR) present and reciprocal on all pairs; self-canonical everywhere; og:locale fr_CA/en_CA + one alternate, correct per language; own OG image, og/twitter title/desc/alt/size present, files exist; no address on Person, plain email, jobTitle OK; ProfessionalService full only on / , /en, contact; no ratings/prices/reviews; 404 noindex; llms.txt lists new case studies; FR+EN RSS exist; no @id duplicates; robots.txt valid, sitemap-index -> sitemap-0 OK; vercel signature X-Robots-Tag OK.

## Critical: none
## High: none
## Medium
1. Service pages (/services/*, /creation-site-web/<ville>, /en/services/*, /en/web-design/<city>; 14 pages): Service.provider -> /#service (ProfessionalService) which is NOT on the page; reference unresolvable in-page. Fix: provider -> /#person (or #technologies-habita). src/lib/schema.ts.
2. Blog posts (14): BlogPosting has no @id; mainEntityOfPage is an inline WebPage with @id = bare URL, duplicating the existing #webpage node (two WebPage nodes per page). Fix: BlogPosting @id "<url>#article", mainEntityOfPage {"@id":"<url>#webpage"}, isPartOf/ author as {"@id":"/#person"} reference (author is inline duplicate of Person). schema.ts ~l.304.
3. Case studies (12): same duplicate WebPage via CreativeWork.mainEntityOfPage; same fix (-> #webpage). dateCreated is "2026" (year only).
4. BlogPosting has no dateModified (schema.ts supports it, posts do not pass it); datePublished only, date-only without timezone. Add dateModified (frontmatter) or accept.
5. RSS item links (rss.xml, en/rss.xml) end with trailing slash (/blogue/slug/) while canonical, sitemap and vercel trailingSlash:false use no slash. Fix links in src/pages/rss.xml.js and en/rss.xml.js.
## Low
6. sitemap-0.xml has no <lastmod> (astro sitemap `lastmod`/serialize).
7. /signature/design-by-patrick.html: noindex only via header; add <meta name=robots noindex> in file as fallback for non-Vercel hosts.
8. Blog author avatar (56px) srcset uses 1x/2x without sizes: valid (density descriptor), no issue; lazy appropriate.
9. WebPage on blog posts/cases lacks datePublished/primaryImageOfPage/breadcrumb link (optional).
10. Home hero has no image (LCP text); portrait lazy below the fold is correct. /a-propos portrait eager without fetchpriority=high (optional).
11. Person includes telephone (public); fine if intentional. x-default on EN->FR only is consistent.
## Regressions vs first pass: none found.
