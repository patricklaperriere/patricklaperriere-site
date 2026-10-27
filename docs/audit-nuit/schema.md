# Schema.org audit, patricklaperriere.com (dist, 60 HTML files)
Script: docs/audit-nuit/extract.py (run with `python3 -I`).

## Results
- 58 pages with one @graph block each, all valid JSON, @context https://schema.org. 404.html and signature/design-by-patrick.html have none (fine).
- Host: all own URLs use https://www.patricklaperriere.com (only github.com sameAs differs, expected). habita.expert is the company/product URL.
- Person / WebSite / Organization(Habita) @ids are identical on all 58 pages, FR and EN. Separate nodes, never merged (OK).
- No aggregateRating, review, offers prices, priceRange: nothing invented. HowTo absent.

## Problems
1. Must-fix / high
   - FAQPage on 18 pages (5 FR + 5 EN city pages, 4 FR + 4 EN service pages; faqSchema in schema.ts). Rich results retired 7 May 2026: no SERP value, only Info priority. Recommend removing (keep the visible FAQ text) or accept unconfirmed AI benefit.
   - Address: Person and ProfessionalService carry PostalAddress {addressRegion QC, country CA}. No locality, so compliant, but a region-only address on a service-area business is low value; drop it from Person, keep areaServed.
   - City pages (Montreal, Quebec, Longueuil, Gatineau, Terrebonne): Service with GeoCoordinates and City areaServed, plus visible copy "Je suis dans le Grand Montréal" (src/data/villes.ts:67) which contradicts "site names no home town". Review copy and the geo claim; consider dropping geo.
2. @id conflicts (same @id, different content)
   - #person: jobTitle differs FR/EN ("Développeur web" / "Web Developer"). Acceptable per language, but a crawler merging graphs sees two values. Use one stable jobTitle ("Web developer and product builder" as owner states, currently missing "product builder") or array of language-tagged values.
   - #service (ProfessionalService): description and offer catalog differ by language, same trait.
   - #habita SoftwareApplication: description FR/EN differs; also first person ("Mon logiciel"), rewrite neutral.
   - ProfessionalService appears on 26 pages (every service, city, contact, home) and duplicates the Person data (same name, email, phone). Fine as @id reference, but emit the full node only on home/EN home and contact; elsewhere reference `{"@id": ".../#service"}`.
3. Missing / weak
   - Person jobTitle lacks "product builder"; no `description`; ProfessionalService has no `provider`/`employee` link back to Person and no `@id` on Service nodes (city/service pages), so they cannot be referenced.
   - No WebPage-level nodes: add AboutPage (a-propos, en/about), ContactPage (contact, en/contact), CollectionPage (blogue, realisations, services lists), each with @id, isPartOf #website, inLanguage, breadcrumb, about/mainEntity.
   - Home FR/EN: no WebPage node; no BreadcrumbList (correct for home).
   - WebSite.inLanguage is an array on one entity; fine. Consider name "Patrick Laperrière" plus alternateName, no SearchAction (no site search: correct).
   - Home url "https://www.patricklaperriere.com" (no slash) while canonical is ".../" ; normalise to trailing slash for WebSite/Person/ProfessionalService url.
   - email is "mailto:info@..." in Person and ProfessionalService; use plain "info@patricklaperriere.com". Telephone present: confirm it is meant to be public.
   - Dates: BlogPosting datePublished "2026-06-01T00:00:00.000Z" (Date serialisation); emit "2026-06-01" or with real time zone. dateModified always equals datePublished: only keep if true. BlogPosting lacks @id, author name (reference only; fine but Google prefers author name+url, add inline name/url), image OK.
   - CreativeWork case studies: acceptable (no Google rich result for them). `sameAs` used for the client's live site; better `url`-type link via `workExample`/`about` ... keep but note sameAs asserts identity with the client site. Better type: WebSite/WebPage for the delivered site, or keep CreativeWork with `mainEntityOfPage`. dateCreated "2025"/"2026" valid. sourceOrganization is a bare org with no url.
   - Blog node on index pages: blogPost items lack @id (not a problem), publisher Person OK.
   - Habita Organization: no sameAs, no logo, identifier absent (NEQ null: correct, do not guess). Brand "Habita" duplicates #habita SoftwareApplication; link `brand: {"@id": ".../#habita"}` instead of anonymous Brand.
   - Offer in OfferCatalog has no price: fine (no invented price).

## Recommended structure
Global (every page, all FR/EN, same ids): Person #person, WebSite #website, Organization #technologies-habita (separate), ProfessionalService #service (full on home and contact only).

```json
{"@context":"https://schema.org","@graph":[
 {"@type":"Person","@id":"https://www.patricklaperriere.com/#person","name":"Patrick Laperrière",
  "jobTitle":"Web developer and product builder","url":"https://www.patricklaperriere.com/",
  "email":"info@patricklaperriere.com","image":"https://www.patricklaperriere.com/photo/patrick-square.jpg",
  "worksFor":{"@id":"https://www.patricklaperriere.com/#technologies-habita"},
  "knowsLanguage":["fr-CA","en-CA"],"knowsAbout":["Astro","React","TypeScript","Next.js","Supabase","Shopify","Liquid","Tailwind CSS"],
  "sameAs":["https://www.instagram.com/pat.achell/","https://www.linkedin.com/in/patrick-laperriere-145690181/","https://github.com/patricklaperriere"]},
 {"@type":"WebSite","@id":"https://www.patricklaperriere.com/#website","url":"https://www.patricklaperriere.com/","name":"Patrick Laperrière","inLanguage":["fr-CA","en-CA"],"publisher":{"@id":"https://www.patricklaperriere.com/#person"}},
 {"@type":"Organization","@id":"https://www.patricklaperriere.com/#technologies-habita","name":"Technologies Habita inc.","url":"https://habita.expert","founder":{"@id":"https://www.patricklaperriere.com/#person"},"brand":{"@id":"https://www.patricklaperriere.com/#habita"}},
 {"@type":"ProfessionalService","@id":"https://www.patricklaperriere.com/#service","name":"Patrick Laperrière, web development","url":"https://www.patricklaperriere.com/","email":"info@patricklaperriere.com","founder":{"@id":"https://www.patricklaperriere.com/#person"},"provider":{"@id":"https://www.patricklaperriere.com/#person"},"areaServed":[{"@type":"AdministrativeArea","name":"Quebec"},{"@type":"Country","name":"Canada"},{"@type":"Country","name":"United States"}],"knowsLanguage":["fr-CA","en-CA"]}
]}
```
Per page: WebPage subtype node (@id = canonical#webpage, isPartOf #website, inLanguage, breadcrumb), BreadcrumbList on all inner pages (already present), BlogPosting with inline author {@type Person,name,url,@id}, Service nodes with @id and provider #service, CreativeWork case studies as now, no FAQPage.
