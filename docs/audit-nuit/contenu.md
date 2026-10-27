# Content quality audit: patricklaperriere.com (local build)

Date: 2026-10-27. Source: `dist/` (built 2026-10-27 00:30, after HEAD a4ccf9a) + `src/`. Read-only audit.
Extracted page text (main content, nav/footer stripped) is in `scratchpad/audit/text/*.txt`.

## Scores

| Area | Score |
|---|---|
| Overall content quality | **58/100** (home 80, interior pages ~50) |
| Experience (20%) | 55: real projects and a real product, but few first-hand details or results |
| Expertise (25%) | 65: the stack and process are clear; no background, years or training stated anywhere |
| Authoritativeness (25%) | 45: 3 short Google reviews, no client results, the about page has no "parcours" |
| Trustworthiness (30%) | 55: contact info is present, but several contradictions (location, hosting, email, Habita status, Lighthouse) |
| AI citation readiness | 50: clear H1/H2 and FAQs, but few quotable facts; the price article has no numbers |
| Templated metadata (`metadata_template.py`, 60 pages) | site_risk **low**, templated_ratio 0.0, no shared CTA. Only `/signature/design-by-patrick.html` has no metadata |

Word counts (main content): home 411, about 345, contact 152, services index 329, service pages 411–496, work index 215, case studies 211–307, regional pages 415–469 (hub 228), blog index 331, articles 485–639, privacy 304, 404 = 27.

---

## 0. Critical cross-site issues (fix first)

1. **Invented or contradictory location claims (regional pages)**, `src/data/villes.ts`:
   - Montréal, FR l.67: `'Je suis dans le Grand Montréal, donc tout près.'`
   - Longueuil, l.120: `'Établi tout près, je suis joignable rapidement et dans votre fuseau.'` and l.127: `'Je suis tout près, dans la région.'`
   - Terrebonne, l.304: `'Étant établi juste à côté, je connais bien ce marché en expansion.'`, l.308: `'Établi tout près de Terrebonne et de la Couronne Nord.'`, l.316: `'Je suis à quelques minutes seulement.'`
   - EN mirrors these at l.153, 330, 342 ("I'm close by", "Based right next door", "just minutes away").
   - These claims can't all be true at once. The phone number is 819 (Outaouais/Estrie), and the site says "Base : Québec". Keep one true base and rewrite the other cities as "à distance, déplacement possible sur demande" (only if that's true).
2. **Fake-looking deal data with real client names**, `src/components/pages/ConceptsContent.astro` (Pipe CRM concept). The "Gagnés" column shows `HP Addik 32 k$ ✓`, `Envita Wellness 14 k$ ✓`, `Inspection Outaouais 8 k$ ✓`. The page itself says the concepts are fictional, yet these read as real contract amounts for real clients. That's invented content and possibly confidential. Replace them with fictional names like the rest of the column (Boréal Construction, etc.).
3. **Lighthouse: three different stories.**
   - Home sheet (approved): **99** mobile, measured 2026-10-26 on a *local build* (`src/data/site-metrics.json`).
   - `fr.ts` l.63 / `en.ts` l.62, `proof.items[0]`: `{ k: '100', l: 'Lighthouse', n: 'Performance, accessibilité et SEO, mesurés sur ce site même.' }`. This is false (99) and is now unused dead copy. Delete it so nobody reuses it.
   - `fr.ts` l.117 `lighthouse.lead`: `'Voici les vrais scores de la page que vous lisez…'`. Unused, stale, delete.
   - Case studies use desktop scores dated **2026-08-15** (`src/data/lighthouse.ts`) and show no date (`LighthouseScores.astro` l.5 hides it on purpose). The label `Mesuré avec Lighthouse, préréglage ordinateur` sits next to a home sheet that says "profil mobile". Either show the date and the URL measured (for Habita it's the marketing site habita.expert, not the app), or re-measure everything on mobile so it matches the home page.
   - `fr.ts` l.152 `'Code performant, score Lighthouse visé à 100'` and about l.355 `'je vise un score Lighthouse parfait'` are fine as aims. Don't turn them into claims.
4. **Hosting contradiction.** Privacy `fr.ts` l.433 / `en.ts` l.430 say `'Le site est hébergé sur Cloudflare Pages.'`, but the README (l.37, 216) says Vercel, and the home page shows `Astro, React, Supabase, Vercel`. `wrangler.jsonc` is a leftover. Fix the privacy policy: Vercel (US), DNS through Cloudflare.
5. **Habita status is unverified.** The home spotlight copy (`fr.ts` l.88, unused now) says `'Il est en production, et des inspecteurs s'en servent chaque jour…'`, `hero.meta.product: 'Habita · SaaS en production'` (l.54, check whether it still renders), and the home page says `En ligne`. The internal note in `src/content/projets/habita.md` says the Habita README describes an **invitation-only beta**. Confirm with Patrick before saying "en production / chaque jour".
6. **Inspection BeauRegard is on the home page without consent.** `src/i18n/home.ts` names Éric Beauregard's business with a "Sherbrooke" location while its own comment says `À CONFIRMER PATRICK : accord d'Éric Beauregard pour être nommé à l'accueil`, and `inspection-beauregard.md` is `publié: false`. So the home page shows a project the work index doesn't have. "Sherbrooke" is also not stated in any project file. Get consent, or hide the item until then.
7. **Two emails.** The about page CTA band shows `pl@patricklaperriere.com` (`SITE.emailPersonal`); every other page shows `info@`. Fine if intended, but the README says both need mail routing set up before launch. Confirm both inboxes work.

## 1. Habita / Patrick confusion

The approved home page uses the correct framing: `'Habita, le logiciel de l'entreprise que j'ai fondée, Technologies Habita inc.'`. Older copy still treats Habita as Patrick's personal product, or Patrick as an inspector:
- `content/projets/habita.md` accroche: `'Mon logiciel SaaS d'inspection en bâtiment pour les inspecteurs du Québec.'` (shown on the work index and the case study). Suggested: `'Le logiciel d'inspection en bâtiment de Technologies Habita inc., que j'ai fondée et dont je conçois le produit.'`
- `habita.md` défi: `'Je voulais bâtir l'outil que j'aurais voulu avoir'`. This implies Patrick is a building inspector. Remove it unless that's true.
- `habita.md` défi: `'face à des joueurs établis comme Vesta, Lumos, UData et Enzo Solution'`. Competitor names belong on Habita's site, not on Patrick's portfolio. Remove.
- `habita.md` réalisation and défi: `'conforme à la norme BNQ 3009-500'`, `'IA de rédaction de constats incluse sans plafond'`, `'tarif'`. These are product and commercial claims for Technologies Habita, unverifiable from this site and likely to go stale (pricing, limits). Keep them technical (offline mode, web reports, bilingual).
- `habita.md` résultat: `'C'est ma plus grande fierté.'` and `'soutenu par une vraie stratégie de contenu'`. Self-congratulatory, with no result. Replace with a fact, or drop the section until there is one.
- `fr.ts` l.101 `habitaSpotlight.shotAlt` (used as the case study image alt): `'Aperçu de Habita, mon logiciel SaaS d'inspection en bâtiment'`. Suggested: `'Aperçu du site de Habita, logiciel d'inspection en bâtiment'`. The image shows the site, not the app.
- `fr.ts` l.264 (tools service): `'C'est ce que je fais déjà avec Habita, mon propre logiciel d'inspection en bâtiment.'` Change to `'…avec Habita, le logiciel d'inspection de Technologies Habita inc., que je développe.'`
- `fr.ts` l.495 concepts: `'C'est mon terrain, comme avec Habita.'` Same issue.
- Home meta description (`dist/index.html`): `'… et Habita, mon logiciel d'inspection.'`; EN: `'and Habita, my inspection software.'` Minor, but it conflicts with the home body copy.
- Work index meta: `'Habita, mon logiciel SaaS d'inspection'`.
- Case study "Client" is `Technologies Habita inc.`, which is correct. "Rôle : Produit, design et développement de A à Z" is OK if accurate.
- `home.ts` comment: "Habita has one strong mention". The site has many. Once fixed, the about page should be the one place that explains the relationship.

## 2. Page by page

### Home (`/`, `/en/`): approved, light notes only
- Sheet: `Mesuré le 26 octobre 2026 sur un build local`. Honest, but it'll age. Re-run `npm run measure` against the live URL after launch so it reads "sur patricklaperriere.com".
- `Réf. PL-2026-01` is fine as decoration.
- Proofs `Outils : Astro, React, Supabase, Vercel` duplicate and contradict the about page list (see the about section).
- Meta description: see section 1.

### Services index (`/services`)
- H1 `Des sites pensés pour convertir` and lead `Quatre façons de transformer votre présence en ligne en source de clients.` are generic marketing lines, and one of the 4 services (custom tools) isn't a "site". Suggested: `Sites, refontes, boutiques et outils sur mesure`.
- **Wrong CTA label**: each card links to ONE service but says `Voir les services →` (`fr.cta.seeServices`, used in `ServiceIndexContent.astro` l.65, `ServiceDetailContent.astro` l.113, `LocalSeoContent.astro` l.92). Add a `cta.seeService: 'Voir le service'` / `'See the service'`.
- Card text duplicates each detail page's lead and first 4 "inclus" bullets word for word (light duplication, acceptable, but a 1-line unique summary per card would be better).
- No proof (links to case studies), no prices (`src/data/prix.ts` all `null`), no "who": weak E-E-A-T for a money page.
- The CTA band `Prêt à être trouvé partout ?` / `Réponse rapide, soumission gratuite.` repeats on ~50 pages, sometimes after another CTA on the same page. "Réponse rapide" is vague: state a real delay (e.g. "sous un jour ouvrable") only if Patrick commits to it.

### Création de site web (`/services/creation-site-web`)
- `'Beaucoup de sites sont lents, génériques et invisibles sur Google. Ils coûtent cher à entretenir et ne génèrent aucun client. Un template WordPress surchargé de plugins finit toujours par vous ralentir.'` Absolute claims ("aucun", "toujours") and a negative tone. Anglicism "template" → "gabarit"; "plugins" → "extensions".
- `'(Astro, React, Shopify)'`: Shopify belongs to the Shopify service. The home page says this service is built in Astro.
- `'Design sur mesure, dark ou clair'` → `'sombre ou clair'`. `'Responsive impeccable'` → `'Adapté au mobile, à la tablette et à l'ordinateur'`.
- FAQ `'livrés en 2 à 4 semaines'` (also homeFaq, unused): confirm with Patrick that this is a real average.
- No case study link (IHO is the obvious one). No starting price.

### Refonte et SEO (`/services/refonte-seo`)
- H1 `Refonte de site web + optimisation SEO`: replace "+" with "et".
- Lead `'… charge en un éclair'`; problem `'Chaque seconde de chargement de trop, c'est des clients perdus.'` → `ce sont`. Cliché.
- Solution `'Résultat : un site rapide qui remonte dans les résultats.'` Promise vs FAQ `'Personne de sérieux ne garantit la position #1'` → `'la première position'` (no "#1" in French).
- `'Suivi des positions et recommandations'` and process step `'croissance dans le temps'` imply ongoing paid work. Is that offered? Clarify.
- No before/after proof. There's no published refonte case study (BeauRegard, Wix → Astro, is a draft): weak intent match.

### Boutique Shopify (`/services/site-ecommerce-shopify`)
- H1 `Boutique e-commerce sur mesure avec Shopify` → `Boutique en ligne sur mesure avec Shopify` (OQLF: commerce électronique / en ligne).
- `'Les thèmes Shopify prêts-à-l'emploi sont lents, rigides et se ressemblent tous … une copie de mille autres.'` Disparaging generalisation. Also `prêts à l'emploi` takes no hyphens.
- `'Performance et vitesse de chargement maximales'`: unmeasurable superlative.
- FAQ `'paiement, livraison, inventaire, marketing : j'intègre…'`: double colon in one sentence.
- **HP Addik and Envita are real Shopify projects but aren't linked from this page.** Add both. That's the best proof on the site for this service.

### Outils sur mesure (`/services/outils-sur-mesure`)
- The best-written service page (concrete, honest FAQ). The only proof is Habita (see the confusion fix in section 1). TurboFix is a draft and is the ideal case study once the client consents.
- The contact form `projectTypeOptions` (`fr.ts` l.379) lacks this service: `['Nouveau site web', 'Refonte et SEO', 'Boutique Shopify', 'Autre']`. Add `'Outil sur mesure'` / `'Custom tool'`.
- Regional pages list only 3 services under "Comment je peux vous aider" (no tools). Add it, or confirm that's intentional.

### Work index (`/realisations`)
- H1 `La preuve par les projets` and lead `'Des sites réels, construits sur mesure, qui chargent vite et qui convertissent.'` "Qui convertissent" is unproven: no conversion data exists for any project.
- **Tech tags that aren't technologies**: Habita `SaaS, Infonuagique (Canada), IA, Hors ligne, Bilingue FR/EN`; HP Addik `E-commerce, Multirégion`; Envita `Custom theme, Conversion` (English on the FR page). Use real tools (Shopify, Liquid, Astro, React, Supabase…) or rename the label to "Points clés".
- Mismatch with the home page: home shows Habita + BeauRegard; the index shows Habita, IHO, HP Addik, Envita.

### Case studies (`/realisations/*`)
- **Habita**: see section 1. 307 words.
- **Inspection Habitation Outaouais**: résultat `'… qui positionne Jean-Michel comme l'inspecteur de référence de l'Outaouais'` is boastful and unverifiable, so rewrite it as a fact. `'rapports livrés en 24 à 48 heures'` / `'réponse le jour ouvrable même'` are the *client's* promises and read like Patrick's. Attribute them ("le site met de l'avant…"). Confirm the client approved being named and the credential list (APCHQ, CEI, Snell Group).
- **HP Addik**: résultat `'… qui vend des produits techniques aussi bien au Canada qu'aux États-Unis'` is an unverified commercial result. `'haut de gamme'`, `'à la hauteur de cette précision'` are client marketing adjectives.
- **Envita Wellness**: résultat `'Une expérience sereine et professionnelle qui donne envie de s'inscrire et qui soutient la croissance des offres…'` is generic, with no fact. Chrissy's Google review exists (`temoignages.ts`, linked to `envita-wellness`) but **isn't shown on the case study**. Show it here (it's verbatim and public).
- All 4: no dates shown for scores, no "what changed / measurable outcome", no client quote. Every "Résultat" section is adjectives. Better to drop a section than ship filler: per the owner rule, it should show a verifiable fact or nothing.
- `année` 2026 for Habita and Envita: confirm.

### About (`/a-propos`)
- **Intent mismatch**: the home page links here with `Mon parcours`, but the page has no background (no years, previous work, training, how he started, location/city). That's the biggest E-E-A-T gap on the site.
- Body p1 is word-for-word identical to the unused `fr.personal.body` and very close to the meta and blog `authorBio`: `'… pour les PME et les entrepreneurs qui en ont assez des sites lents, génériques et invisibles sur Google.'` (the "lents, génériques et invisibles" triad appears in 4+ places).
- p3 `'Mon approche tient en quatre mots : performance, SEO, design soigné et communication claire.'` That's 4 items, 6 words, so "quatre mots" is wrong. Use `'quatre principes'`.
- p4 `'un site dont vous êtes fier et qui travaille pour vous, 24 h sur 24.'` Cliché.
- "Pourquoi me choisir" `'Core Web Vitals au vert'`, `'des échéances respectées'`: unverifiable. Fine as commitments, but this block duplicates the unused `reassurance` and the services bullets.
- **Tech list conflict**: about shows `SITE.stack` = `Astro, React, TypeScript, Next.js, Supabase, Shopify, Liquid, Tailwind CSS`; home shows `Astro, React, Supabase, Vercel`. Next.js and Tailwind appear in no project. Keep one list, `SITE.stack`, limited to tools used in shown work, and have the home proofs read it.
- Photo: present (see section 4), but `loading="lazy"` on an above-the-fold image (`AboutContent.astro` l.50) hurts LCP. Minor, not content.
- Missing: the link to Technologies Habita inc. (habita.expert), NEQ (`config.ts` `neq: null`), LinkedIn link in the body, and a real client quote.

### Contact (`/contact`)
- Thin (152 words), which is OK for a contact page, but there's no photo, no city/region, no availability/response delay and no next-steps description ("je vous réponds sous X, puis appel de 20 min…").
- Rating line renders `★★★★★ 5.0 · 5,0 sur 5 sur Google`: duplicated and mixes decimal formats. Keep `5,0 sur 5 · 3 avis Google` (state the count; 3 reviews make a thin aggregate, so be explicit).
- FR page shows English curly quotes `“…”` around the reviews. Use `« … »` for the FR reviews. Keep the English ones in English.
- `'Message envoyé !'`, `'Oups, une erreur est survenue.'`: "Oups" is a bit casual, but fine.
- Budget ranges are fine (they aren't prices).
- The project type list lacks custom tools (see above).

### Privacy (`/confidentialite`)
- `'Dernière mise à jour : juin 2026'`: the hosting changed since, so update it.
- **Cloudflare Pages → Vercel** (section 0.4). Mention that Vercel and Web3Forms may process data outside Québec (Law 25 requires disclosing communication outside Québec).
- Law 25: name the **responsable de la protection des renseignements personnels** (Patrick, title and email). This is currently missing.
- Meta `'Conforme à la Loi 25 du Québec.'`: a compliance claim. Soften it to "Rédigée selon la Loi 25" or make sure the policy is complete first.
- `'Le site utilise uniquement le stockage local … préférences d'affichage'`: true (lofi player, `pl-lofi` key), OK.

### 404
- 27 words. Add links to Services, Réalisations, Contact, plus the bilingual line. `Back to home (EN)` is fine.

### Concepts (`/concepts`)
- Section 0.2: real client names with dollar amounts.
- `'Une démonstration de look and feel.'` → `'Une démonstration d'ambiance et d'interaction.'` `'Imaginez-le. Je le construis.'` is OK.
- `'Réservation en trois taps'` → `'en trois touches'`; `'Demander un devis'` / `'Devis envoyé'` → Québec `'soumission'` (the rest of the site uses soumission).
- Dental concept `'✓ Sans douleur ✓ Résultats en 1 séance'`: health claims, even though fictional. Soften them.
- Concept boutique `★★★★★ 4,9` is a fake rating in a mock-up. OK under the "concepts fictifs" disclaimer, but keep it visibly fictional.
- Meta description lists `barbier, resto, gym, immobilier, clinique et café`, but the page also has tattoo, boutique and 4 SaaS dashboards. Update it.
- `'Studio · Concepts'`: "Studio" implies an agency, which contradicts "un seul interlocuteur".

### Regional pages (`/creation-site-web/*`)
- Section 0.1, location claims.
- **Straight apostrophes throughout `villes.ts`** (`l'Outaouais`, `n'est`, `J'optimise`…). The rest of the FR site uses `’`. 19 on Gatineau, 9 on Longueuil.
- Overpromises that contradict the SEO FAQ ("no guarantee"): Longueuil l.114 `'Résultat : quand un résident cherche votre service, c'est vous qui apparaissez.'`; Terrebonne FAQ `'… vous trouvent en premier.'`; Gatineau `'laissent des clients sur la table'` (anglicism, "leave money on the table").
- Unverifiable market claims: `'Montréal est le marché le plus compétitif au Québec.'`, `'Terrebonne et la Couronne Nord sont en pleine croissance…'`, `'Beaucoup d'entreprises … y ont une présence en ligne dépassée ou inexistante'`.
- `'sites au français impeccable'` (Québec page) reads as self-praise.
- EN: Couronne Nord → `North Shore` (`villes.ts` l.290). "North Shore" usually means Rive-Nord or Côte-Nord. Use "Montreal's North Shore" or "northern suburbs (Couronne Nord)". The EN FAQ titles use `—` (`'Frequently asked questions — Montreal'`, l.89/149/214/279/339), while FR uses `·`. Make them consistent.
- Pages are reasonably differentiated (415–469 words, unique FAQs), with only one real local proof (IHO → Gatineau). The other 4 cities have no local evidence, so they're doorway-ish. Keep them only if the location claims become true or neutral.
- Hub: `'Choisissez votre région pour voir comment je peux vous aider…'`. OK.

### Blog index + articles (brief)
- 7 FR + 7 EN, all dated **2026-05-06 → 2026-06-02**, nothing since. No `updated` dates.
- `'Combien coûte un site web au Québec en 2026 ?'` (`prix-site-web-quebec.md`): **intent mismatch**. Section "Les fourchettes réalistes" gives **no numbers at all**, and the description promises "fourchettes réalistes". Add real ranges once `prix.ts` is filled, or retitle the article. "en 2026" will be stale in 2 months. The EN title `'How much does a website cost in 2026?'` dropped "in Quebec" (slug `website-cost-quebec`).
- Unsourced stats: `vitesse-site-web-pme.md` l.15 `'Les études sont constantes depuis des années … Au delà de 3 secondes…'` (no source; `Au-delà` needs a hyphen). `pourquoi-site-web-ne-convertit-pas.md` l.31 `'vous perdez la moitié de vos clients potentiels'`; `signes-refonte-site-web.md` l.39 `'laisser la moitié de vos clients potentiels'`. Invented-sounding figures.
- `signes-refonte-site-web.md` l.27 `'qu'en est il'` → `qu'en est-il`.
- Straight apostrophes in FR frontmatter titles and descriptions (blog index shows 6, e.g. `7 signes qu'il est temps…`).
- Generic, AI-sounding structure ("Voici 7 signaux clairs…", "Voici les 5 raisons…", "sans détour", "comparaison honnête/franche") with no first-hand example from Patrick's own projects. Add one real anecdote per article (e.g. the BeauRegard Wix→Astro move, IHO bilingual SEO).
- The blog index has no dates and no author. Articles have a byline with photo (good).

## 3. Repetition inventory
- `'lents, génériques et invisibles sur Google'`: about p1, `personal.body` (unused), `services.web.problem`, prix article.
- `'un beau site que personne ne trouve ne sert à rien'`: about p3, `homeFaq` (unused).
- `'dès la première ligne'`: services.web.solution, about, homeFaq, home inspection layer, wordpress article.
- `'charge(r) en un éclair'` / `'quasi instantané'`: 6+ places.
- `'Réponse rapide, soumission gratuite'`: CTA band on every interior page plus the contact lead and meta.
- `'Absolument'` opens 2 FAQ answers.
- **Unused dictionary blocks that still hold stale claims** (`fr.ts`/`en.ts`): `proof` (Lighthouse 100), `personal`, `habitaSpotlight` (except `shotAlt`), `lighthouse.title/lead/kicker`, `servicesSection` reuse, `reassurance`, `testimonials.title/lead` (`'Des projets réels, des clients satisfaits.'`), `homeFaq`, `hero.punch/sub/meta`, `signature`. Delete them so they can't be revived by mistake.

## 4. Profile photo (`src/assets/photo/`)
At HEAD/dist, `patrick-portrait.jpg` (4:5) and `patrick-square.jpg` are used:
- visibly: **home** "Qui je suis" (`HomePage.astro` l.116, PortraitFrame), **about** masthead (`AboutContent.astro` l.41–60, with the availability badge), **every blog article** author box (`PostArticle.astro` l.51, square);
- invisibly: favicons `/photo/icon-32.png` etc. and Person JSON-LD `image: /photo/patrick-square.jpg` on every page (`Layout.astro`).
- Not used on: contact, services, case studies, regional pages. The contact page is where a face helps trust most.
- Alt `'Patrick Laperrière, souriant, en veston bleu et t-shirt noir'`: OK.
- Withdrawn during phase B (see NUIT_RAPPORT.md).

## 5. French typography
- No em dashes in FR rendered text (good). EN regional FAQ titles use `—`.
- Spacing before `: ; ? !` is present in FR i18n copy (good). Straight `'` in `villes.ts` FR and in blog frontmatter.
- `'100%'` in G. James's review is a verbatim quote, so leave it.
- Anglicisms: dark, template, plugins, responsive, look and feel, taps, e-commerce, Custom theme, "#1", "sur la table".
- `'c'est des clients perdus'` → `ce sont des clients perdus`.
