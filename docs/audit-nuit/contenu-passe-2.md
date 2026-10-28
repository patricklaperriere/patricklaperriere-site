# Content audit, second pass: patricklaperriere.com (local build)

Date: 2026-10-27. Source: `dist/` (built 08:11, no `src/` file newer) + `src/`. Read-only.
Extracted text per page: `scratchpad/audit2/text/*.txt`. Metadata pairs: `scratchpad/audit2/metadata.json`.

## Scores

| Area | Pass 1 | Pass 2 |
|---|---|---|
| Overall content quality | 58 | **74/100** |
| Experience (20%) | 55 | 62: six real projects, each with starting point and work done; no outcome on any of them |
| Expertise (25%) | 65 | 68: honest, specific service copy; still no background, training or years (about `bioTodo`) |
| Authoritativeness (25%) | 45 | 52: Envita review now on its case study; 3 Google reviews; no client quote elsewhere |
| Trustworthiness (30%) | 55 | 76: hosting, privacy officer, Lighthouse 100, location claims fixed; but 5 case studies claim a Lighthouse score that isn't on the page, and 2 clients are named without recorded consent |
| AI citation readiness | 50 | 60: clear H1/H2, FAQs, quotable facts per project; few numbers, price article still has none |
| Templated metadata (`metadata_template.py`, 64 pages) | low | site_risk **low**, templated_ratio 0.0, no shared CTA. Secondary: `en/` description echoes title; FR and EN contact descriptions repeat the brand; `/signature/design-by-patrick.html` has no metadata |

What was fixed since pass 1 (verified in `dist/`): Lighthouse 100 and dead dictionary blocks gone; privacy says Vercel and names the person in charge; regional "je suis tout près" claims gone; Pipe CRM uses fictional names; service names identical across nav, footer, home, service pages, regional pages and the contact form (FR and EN); "Voir le service" CTA; Shopify page links HP Addik and Envita; Habita case study framed as the product of Technologies Habita inc.; FR straight apostrophes gone outside the blog; no em dash anywhere in rendered text; Envita shows Chrissy's review.

---

## 1. Critical (false or unconsented on the page)

### 1.1 Five case studies promise a Lighthouse score that isn't there
`src/data/client-metrics.json` is `{ "sites": {} }`, so `LighthouseScores` renders nothing, yet the "Ce qu'on peut vérifier" text says it does:
- `src/content/projets/habita.md` résultat: `La mesure Lighthouse de ce site, prise sur mobile, figure sur cette page.` / EN `The Lighthouse measurement of that site, taken on mobile, is shown on this page.`
- `inspection-beauregard.md`: `Sa mesure Lighthouse, prise sur mobile, figure sur cette page.` / `Its Lighthouse measurement, taken on mobile, is shown on this page.`
- `inspection-habitation-outaouais.md`: same sentence (FR and EN).
- `hp-addik.md`: same sentence (FR and EN).
- `envita-wellness.md`: `La mesure Lighthouse du site, prise sur mobile, y figure aussi.` / `The site’s Lighthouse measurement, taken on mobile, is shown here too.`

Fix: run `scripts/measure-clients.mjs` before shipping, or delete those sentences. Don't ship text that points at an empty block.

### 1.2 Clients named without recorded consent (published: true)
- `inspection-beauregard.md` `publié: true`, plus `src/i18n/home.ts` l.104–118 (home item 2), with `aFournir: accord écrit d’Éric Beauregard`.
- Inconsistency: `habita.md` `terrain` (Éric uses Habita) is withheld from the build pending Éric's consent, but the same fact ships in the BeauRegard `accroche` and in `home.ts` l.108/218: `Un inspecteur en bâtiment de Sherbrooke, qui rédige ses rapports dans Habita.` / `…who writes his reports in Habita.` "Sherbrooke" also has no source besides Patrick's say-so.

Fix: set both files to `publié: false` and remove home item 2 until consent is in writing, or get the consent tonight. At minimum, drop `, qui rédige ses rapports dans Habita` / ` who writes his reports in Habita` until Éric agrees.

### 1.3 Habita usage stated as fact while its status is unconfirmed
`habita.md` `aFournir`: `statut public de Habita (en production ou bêta sur invitation) avant de l’écrire sur le site`. But:
- `src/i18n/fr.ts` `about.body[1]`: `Faire évoluer un logiciel dont des inspecteurs se servent pour leur travail…` / en.ts: `Growing software that inspectors rely on for their work…`
- `home.ts` l.96/207 `status: 'En ligne'` / `'Live'` on the Habita item. It reads as the product's status, not the marketing site's.

Fix: `Faire évoluer un logiciel destiné aux inspecteurs en bâtiment m’oblige…` / `Growing software built for building inspectors makes me…`. Change the status to `Site en ligne` / `Site live` or drop it.

## 2. High

### 2.1 Patrick vs Technologies Habita inc. (residual)
- `home.ts` l.87: `Mon propre logiciel et un site pour un inspecteur en bâtiment.` → `Le logiciel de Technologies Habita inc. et un site pour un inspecteur en bâtiment.`; l.198: `My own software and…` → `Technologies Habita’s software and…`
- `home.ts` l.126: `Faire évoluer mon propre logiciel me garde exigeant…` → `Faire évoluer ce logiciel me garde exigeant…`; l.235: `Growing my own software keeps me…` → `Growing that software keeps me…`
- `home.ts` l.95: `Le logiciel d’inspection en bâtiment que je conçois et développe : …` is acceptable, but align it with the case study: `Le logiciel d’inspection en bâtiment de Technologies Habita inc., que je conçois et développe : …` (EN l.206 the same).
- `src/lib/schema.ts` l.62 `worksFor: { '@id': COMPANY_ID }` on the Person node makes Patrick an employee of Technologies Habita in the JSON-LD on every page, while the ProfessionalService (his freelance business) is separate. Replace it with `founder` on the Organization only (already present), and drop `worksFor`.
- `src/config.ts` `serviceDescription`: `…de boutiques Shopify et de logiciels SaaS` / `SaaS software` → `et d’outils web sur mesure` / `and custom web tools` (matches the service name; SaaS is Habita's business).

### 2.2 "Verifiable results" meta vs pages with no result
- `src/pages/realisations/index.astro` l.13: `…sur mesure, avec des résultats vérifiables.` and EN `…each with results you can check.`: no case study has a measured result (1.1). → `…avec, pour chacun, le point de départ et le travail fait.`
- `inspection-beauregard.md` description: `…passé de Wix à un site Astro sur mesure, rapide et bien structuré.` "rapide" is unmeasured → drop `, rapide et bien structuré`. EN `…fast and well structured.` too.

### 2.3 Wrong category on two case studies
`src/components/ProjectFeature.astro` maps `seo` → `Refonte et SEO`. IHO (`catégorie: seo`) describes a new site, not a redesign, and appears as proof on the "Refonte et SEO" service page. Set `inspection-habitation-outaouais.md` `catégorie: web`, or describe its starting site in `défi`. (BeauRegard, Wix → Astro, is a legitimate redesign.)

### 2.4 Services index metadata omits a service and makes a claim
`src/pages/services/index.astro` l.9 `'Services · sites web, SEO et Shopify | Patrick Laperrière'` and l.11 `'Création de site web sur mesure, refonte et SEO, boutiques Shopify. Des services pensés pour la performance et la conversion. …'`. Custom tools are missing and "conversion" is unproven. Suggested title `Services : sites, refontes, Shopify, outils`, desc `Création de site web, refonte et SEO, boutique Shopify et outils sur mesure pour PME, en français et en anglais. Québec, Canada et États-Unis.` EN `src/pages/en/services/index.astro` l.11 the same.

### 2.5 Regional pages: unverifiable promises and FR/EN drift (`src/data/villes.ts`)
- l.54 `Ajoutez à ça une vitesse de chargement quasi instantanée et un design soigné, et vous avez un site qui convertit les visiteurs montréalais en clients.` → `…et un design soigné, pour donner aux visiteurs montréalais une bonne raison de vous écrire.` EN l.80 `…a site that turns Montreal visitors into customers.` the same.
- l.59 `Performance maximale : …` → `Des pages rapides : …`; EN l.85 `Top performance:` → `Fast pages:`.
- l.60 `À distance ou en personne, je m’adapte…` contradicts the FAQ l.67 (remote only). → `À distance, par appel vidéo et par courriel, à votre rythme.` EN l.86 the same.
- l.110 `…avant vos concurrents.` → drop. l.113 `fait toute la différence` → `aide à être trouvé`.
- l.120 `Joignable facilement, dans votre fuseau horaire, …` (all of Quebec shares one time zone; it's a leftover of the location claim) → `Joignable par appel ou par courriel.` EN l.146.
- EN l.140 `The result: when a resident searches for your service, you’re the one who shows up.` (FR was fixed) → `The goal: residents who search for your service find you easily.`
- EN l.329 `local demand is rising quickly. Many … have an outdated or non-existent online presence, leaving real room…` (FR was fixed) → translate FR l.303: `Between Terrebonne, Mascouche, Repentigny and the Lanaudière area, service, construction and local retail businesses gain from a well-kept online presence: that is often where first contact happens.`
- EN l.282 `Flawless French is the baseline.` → `Yes, that’s the baseline.`
- EN Terrebonne still says `the North Shore` (metaDesc, lead, localTitle, whyTitle, FAQ) while the region label is `Montreal’s North Shore`. Use `Montreal’s North Shore` everywhere, or `the Couronne Nord`.

## 3. Medium

### 3.1 About page vs home link
- `home.ts` l.135 `more: 'Mon parcours'`: the about page still has no background (`fr.ts` `bioTodo` hidden in the build). → `En savoir plus` (EN already says `More about me`). Fill `bioTodo` (training, years, how he started), which is the biggest remaining E-E-A-T gap.
- About "Mesurer, pas promettre … avant et après" (`fr.ts` `about.why[1]`) while no before/after measurement is published anywhere. Keep it as a commitment, but publish one before/after (BeauRegard Wix → Astro is the obvious one) to back it up.
- The about CTA band shows `pl@patricklaperriere.com`, while every other page shows `info@`. Confirm that's intended and that both inboxes receive mail.

### 3.2 Concepts page
- `src/data/concepts.ts` l.106: `Un sourire plus blanc dès la première séance. Réservation en ligne, résultats visibles et sans douleur.` / EN `…visible results and pain-free.` These are health claims, even in a mock-up. → `Blanchiment dentaire : réservation en ligne, consultation et suivi.`
- `concepts.ts` l.85 FR tags `'Local SEO'` (English on the FR page) → `'SEO local'`. l.121 tag `'Conversion'` → `'Paiement'`. l.118 `tunnel d’achat optimisé` → `parcours d’achat simple` (matches the Shopify service copy).
- `fr.ts` `concepts.seoDesc` lists 6 industries; the page shows 12 concepts (tattoo, store and 4 dashboards are missing), and "resto" is casual. → `Concepts d’interfaces fictifs, codés et animés : applications mobiles, sites web et tableaux de bord pour une dizaine d’industries.` EN the same.
- `ConceptsContent.astro` l.267 `Prospects · 4` and l.277 `Gagnés · 5` show 3 cards each. The column total `142 k$` (l.265) doesn't match the cards (129 k$). l.247 `12,4k` → `12,4 k`, `▲ 8,2%` → `▲ 8,2 %`.

### 3.3 Blog (skim for unsourced figures)
- `agence-web-ou-developpeur-freelance.md` l.29 `La plupart des sites vitrines que je livre sont en ligne en 2 à 4 semaines.` / `web-agency-vs-freelance-developer.md` l.29: this is the figure deliberately removed from the service FAQ. Remove it, or confirm it with Patrick.
- `why-website-not-converting.md` l.31 `you lose half your potential customers`; `signs-you-need-website-redesign.md` l.39 `leaving half your potential customers`: invented (the FR versions were fixed).
- `signes-refonte-site-web.md` l.15 / `signs-…` l.15 `plus de 3 secondes … vous perdez des visiteurs`: cite the same Think with Google source as `vitesse-site-web-pme.md`.
- `web-agency-vs-freelance-developer.md` l.17 `an equivalent-quality site for a fraction of the price`: unsourced.
- `vitesse-site-web-pme.md` l.15: after `53 % des visites sur mobile…`, the line `Sur mobile, … c'est encore pire.` is redundant, because the stat is already mobile. The study is from 2016, so say so in the sentence.
- `prix-site-web-quebec.md` / `website-cost-quebec.md`: "Les fourchettes réalistes" still has **no amounts**, and the description promises `fourchettes réalistes` / `realistic ranges`. Add amounts or retitle. The title says `en 2026` / `in 2026`, which will be stale in 2 months.
- FR straight apostrophes in the blog frontmatter: `signes-refonte-site-web.md` title `7 signes qu'il est temps…`, plus the descriptions of `vitesse-site-web-pme.md`, `site-bilingue-seo-quebec.md` and `signes-refonte-site-web.md` (rendered on `/blogue` and the article heads).
- Blog index: all dated May–June 2026, with no `updated` dates.

## 4. Low (French and English quality, consistency)

- `inspection-habitation-outaouais.md` réalisation: `normes RBQ` listed among "accréditations". The RBQ is a regulator, not an accreditation, so → `(APCHQ, CEI, Snell Group)`. EN `RBQ standards` the same.
- `hp-addik.md` défi: `côte-à-côte` → `côte à côte` (OQLF: véhicule côte à côte).
- `envita-wellness.md` réalisation: `classes à la carte` → `cours à la carte`; `capture de liste d’attente` → `inscription à une liste d’attente`. accroche/titreSeo `Plateforme Shopify` vs stack `Thème sur mesure`: pick "boutique Shopify" as on the other pages, or keep it consistently.
- `villes.ts` l.53 `startups` → `jeunes pousses`; l.46/66 `restos` → `restaurants`; l.173 `votre site doit performer` → `doit bien fonctionner`; `fiche Google Business` (l.114, 125, 248, 260, 316, 323) vs `fiche d’entreprise Google` in `fr.ts`. Use Google's FR name, `Profil d’entreprise Google`, everywhere. EN `Google Business profile` → `Google Business Profile`.
- `home.ts` l.34 `des outils qui servent pour vrai`: colloquial Quebec French, fine for the voice; `qui servent vraiment` if a neutral register is wanted.
- `home.ts` `kind: 'Logiciel SaaS'` / `'Site sur mesure'` vs `ProjectFeature.astro` categories `Logiciel` / `Site sur mesure`: OK. The service is called "Création de site web", so consider `web: { fr: 'Création de site web', en: 'Web design and development' }` for one vocabulary.
- EN regional H1s `Web Design & Development in Montreal` and the hub crumb `Web design` vs the service name `Web design and development`. Use `Web design and development in Montreal`.
- Blog `agence-web-ou-developpeur-freelance`: "freelance" is an anglicism (pigiste / travailleur autonome). It's probably kept for search volume, so leave it if that's intentional.
- Metadata: `src/pages/en/index.astro` l.10 description starts with `Patrick Laperrière, web developer in Quebec`, which echoes the title. → `Fast, well-ranked websites, redesigns, Shopify stores and custom tools for small businesses in Quebec, in English and French.` Contact FR/EN descriptions repeat the brand (`Écrivez à Patrick Laperrière…`), which is minor. `/signature/design-by-patrick.html` has no title or description; add `noindex` if it's an asset.
- Home sheet `Mesuré le 26 octobre 2026 sur un build local`: honest. Re-run `npm run measure` on the live URL after launch.
- `HP Addik` `année: 2025`, `Envita` and `Habita` `2026`: confirm.

## 5. Case-study checklist (starting point / work done / verifiable result)

| Project | Starting point | Work done | Result shown | Blocking issue |
|---|---|---|---|---|
| Habita | Yes (problem, not prior state; fine for a product) | Yes | Only "marketing site is live" + phantom Lighthouse | 1.1, 1.3; no usage figure |
| Inspection BeauRegard | Generic (Wix in general, no specific problem of this site) | Thin, 1 sentence | "Live" + phantom Lighthouse | 1.1, 1.2; no capture; no pages/redirect detail |
| IHO | Client need, no prior state | Yes, detailed | "Live" + phantom Lighthouse | 1.1, 2.3 category |
| HP Addik | Yes | Yes | "Live, sells CA/US" (checkable via the selector) + phantom Lighthouse | 1.1 |
| Envita | Yes | Yes | "Live" + real Google review + phantom Lighthouse | 1.1 |

None makes an invented claim beyond 1.1–1.3. All results are "it is online". Measured scores (1.1) are the cheapest real result to add.

## 6. Readability / structure
Service pages 600–700 words, with problem/solution/included/steps/FAQ and short sentences (FR averages about 18 words). Readable for a PME owner. Case studies are 340–420 words, thin for E-E-A-T without outcomes. Homepage 556 words, above the 500 floor. The about page (434) lacks a narrative.
