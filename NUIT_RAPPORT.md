# Rapport de nuit, 27 octobre 2026

Branche **`refonte/nuit-2026-10-27`**, créée depuis `refonte/accueil` (a4ccf9a).

- Rien n'a été fusionné dans `main` et rien n'a été déployé.
- Rien n'a été poussé : tous les commits sont locaux.
- Aucun service payant ni aucune clé d'API n'a été utilisé.

## Voir le site en local

```bash
cd ~/projets/patricklaperriere-site
git switch refonte/nuit-2026-10-27
npm run dev        # http://localhost:4321 (affiche aussi les rappels [À FOURNIR : …])
# ou, pour voir exactement ce qui serait publié :
npm run build && npm run preview
```

Les rappels `[À FOURNIR : …]` (en jaune, en pointillé) n'apparaissent qu'avec `npm run dev`. Un build n'en contient aucun : `scripts/checks/sitecheck.py` le vérifie.

## Phases et commits

| Phase | Commit | En bref |
|---|---|---|
| A. Audit complet | `efb71d3` | Trois audits en parallèle (technique, contenu, schema) sur les 60 fichiers HTML. Synthèse dans `docs/AUDIT_NUIT.md`, détail dans `docs/audit-nuit/` |
| B. Réécriture FR puis EN | `6308583` | Thème de l'accueil appliqué à toutes les pages ; copie réécrite (services, À propos, contact, confidentialité et mentions légales, 404, régions, concepts, blogue) ; photo retirée ; une seule liste d'outils |
| C. Portfolio | `6d28c0c` | Fiches au format « point de départ, ce que j'ai fait, ce qu'on peut vérifier » ; Habita, BeauRegard et Bâti-Conseil publiés ; anciens scores d'août retirés |
| D. SEO technique | `69b74da` | JSON-LD consolidé, titres d'au plus 60 caractères, descriptions de 110 à 160, une image Open Graph par page, `/signature/` en noindex |
| Ajout de nuit (photo) | `5bbc5bc` | Portrait tiré de la photo originale, sans retouche (voir Décisions) |
| E. Performance et accessibilité | `44708c3` | LCP des réalisations, variantes 640 px, portrait chargé tout de suite, anneau de focus des champs |
| F. Vérification | `dbbf142` | 62 pages × 4 largeurs, liens, clavier ; scripts gardés dans `scripts/checks/` |
| G. Deuxième passe | `43d8e00` | Nouvel audit contenu et technique, puis corrections. F refait après G : voir plus bas |
| Rapport | (dernier commit) | Ce fichier et les mesures des sites clients |

## Scores

### Audits SEO (agents)

| | Avant (A) | Après (G) |
|---|---|---|
| Technique | ≈ 93/100 | 92/100 : aucun problème critique ni élevé ; les points moyens relevés ont été corrigés |
| Contenu (E-E-A-T) | 58/100 | 74/100 avant les corrections de G |
| Schema | valide, à consolider | consolidé, sans FAQPage ni nœud en double, références résolues |

Le contenu ne montera plus beaucoup sans les informations de la section « À fournir » : le parcours, des résultats chiffrés et les accords des clients.

### Lighthouse mobile, build local

Ces mesures ont été prises sur le build local, servi par `astro preview` : un essai valide par page, profil mobile. Elles ne sont pas affichées sur le site. La fiche de l'accueil garde sa propre mesure, scellée (99 en FR et 99 en EN, prise le 26 octobre sur un build local).

| Page | Avant (a4ccf9a) : perf / a11y / BP / SEO | Après : perf / a11y / BP / SEO |
|---|---|---|
| `/` | 79* / **96** / 100 / 100 (contraste) | 100 / 100 / 100 / 100 |
| `/en` | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/services` | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/services/creation-site-web` | 90 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/realisations` | 98 / **98** / 100 / 100 (ordre des titres) | 98 / 100 / 100 / 100 |
| `/realisations/habita` | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/a-propos` | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 (avec la photo) |
| `/contact` | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/en/about` | 90 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/en/work` | 98 / **98** / 100 / 100 | 98 / 100 / 100 / 100 |
| `/blogue/vitesse-site-web-pme` | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/creation-site-web/montreal` | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/concepts` | 100 / **98** / 100 / 100 | 99 / 100 / 100 / 100 |

\* Un seul essai par page, sur une machine partagée : la performance varie de quelques points d'un essai à l'autre (79 sur `/` est un essai lent). Les écarts d'accessibilité, eux, sont réels et corrigés.

**CLS : 0 partout.** Le LCP de `/realisations` reste à environ 2,4 s en simulation : c'est la grande capture de Habita en premier écran sur mobile. Elle est maintenant chargée tout de suite, en priorité et en 640 px.

### Sites clients (études de cas)

Mesure réelle avec `scripts/measure-clients.mjs` : Lighthouse 12.8.2, profil mobile, médiane de 3 essais valides, jusqu'à 12 essais par site. Lancée le 27 octobre 2026 sur une machine au repos. Chrome sans interface rejette beaucoup d'essais sur cette machine (NO_FCP), donc la plupart des sites n'ont pas eu trois essais valides.

| Site | Essais valides | Résultat retenu |
|---|---|---|
| Inspection Habitation Outaouais (inspectionhab.ca) | 81, 63, 59 | **Retenu** : perf 63, accessibilité 100, SEO 100, LCP 5,2 s, CLS 0 |
| Habita (habita.expert) | 81, 76 | Écarté (2 essais sur 3) |
| Inspection BeauRegard | 100, 100 | Écarté (2 essais sur 3) |
| HP Addik | aucun | Écarté |
| Envita Wellness | aucun | Écarté |

Un site sans mesure n'affiche aucun score sur le site : rien n'est tapé à la main. Seule la fiche Inspection Habitation Outaouais affiche maintenant des scores, avec la date, l'URL et la méthode.

**Décision pour toi :** l'écart entre les essais d'IHO (59 à 81) montre que la machine fausse la performance. Avant de publier, relance `npm run measure` sur une machine calme, ou retire IHO de `src/data/client-metrics.json` si tu ne veux pas afficher un 63.

## [À FOURNIR] : ce qui manque

Chaque ligne apparaît aussi sur le site en mode dev, à l'endroit concerné.

| Où | Ce qu'il faut |
|---|---|
| À propos (`fr.ts` / `en.ts`, `about.bioTodo`) | Ton parcours, ta formation et tes années d'expérience, en deux ou trois phrases. C'est le plus gros manque E-E-A-T du site |
| Habita (`habita.md`) | Le statut public : production ou bêta sur invitation |
| Habita (`habita.md`) | Un résultat mesurable : nombre d'inspecteurs, de rapports produits ou temps gagné par rapport |
| Habita (`habita.md`) | Les vrais outils de Habita, si tu veux les afficher. Pour l'instant, « En bref » liste des caractéristiques |
| Habita (`config.ts`, `company.neq`) | Le NEQ de Technologies Habita inc., si tu veux qu'il paraisse |
| Habita, accueil (`home.ts`) | Une capture à plat d'un rapport web, avec des données de démo (`src/assets/work/habita-rapport-web.png`) |
| Bâti-Conseil (`bati-conseil.md`) | L'accord de Gabriel Patenaude pour figurer au portfolio et être nommé |
| Bâti-Conseil (`bati-conseil.md`) | La date de mise en ligne et l'adresse définitive : **URL introuvable**, `lien` est laissé vide et la fiche dit « Pas encore en ligne » |
| Bâti-Conseil (`bati-conseil.md`) | Une capture 1280 × 800, plus sa variante `-640`, une fois le site en ligne |
| BeauRegard (`inspection-beauregard.md`) | L'accord écrit d'Éric Beauregard pour être nommé au portfolio |
| BeauRegard (`inspection-beauregard.md`) | Les pages livrées, le formulaire et les redirections des anciennes adresses Wix |
| BeauRegard (`inspection-beauregard.md`) | Les captures avant (Wix) et après (Astro), une fois l'accord d'Éric obtenu |
| BeauRegard (`inspection-beauregard.md`) | L'année de mise en ligne (2026 est inscrit, à confirmer) |
| BeauRegard | La citation d'Éric et le texte « Utilisé sur le terrain » sur la fiche Habita. Ils restent en dev seulement |
| Accueil, « Qui je suis » (`home.ts`) | Une vraie citation de client, avec son accord |
| TurboFix (`turbofix-mecanique.md`, brouillon) | L'accord du client, le domaine (**URL introuvable** : le domaine n'est pas encore acheté) et la relecture |
| Prix (`src/data/prix.ts`) | Les prix de départ : tous valent `null`, donc rien n'est affiché. L'article « Combien coûte un site web au Québec ? » n'a pas de fourchettes chiffrées pour cette raison |
| Courriel | Le routage de courriel du domaine pour info@ et pl@, avant la mise en ligne (voir README) |

## Décisions à faire valider par Patrick

1. **Photo.** J'ai retenu `C:\Users\nexus\Downloads\20250402_105602.jpg`, la photo originale prise au téléphone (selfie, veston bleu).
   - Le portrait retiré était une version retouchée de cette même photo, ce qui lui donnait l'air généré. J'ai utilisé l'original, sans retouche, recadré en 4:5 (`src/assets/photo/patrick-portrait.jpg`) et en carré (`patrick-square.jpg`), sans métadonnées EXIF ni GPS.
   - La photo est affichée sur l'accueil (« Qui je suis »), la page À propos et l'encadré d'auteur du blogue. Elle sert aussi aux favicônes et au JSON-LD.
   - C'est un selfie, pas un portrait professionnel. Pour la remplacer, dépose un autre fichier sous le même nom et lance `npm run photo`. Pour la retirer, supprime les deux fichiers : le site revient au monogramme, sans aucune autre modification.
2. **Thème.** Le thème « rapport d'inspection » de l'accueil est maintenant celui de toutes les pages. Les anciennes sections « papier » (fond beige) deviennent aubergine pâle.
3. **Bâti-Conseil et Inspection BeauRegard sont publiés au portfolio**, comme le demande la mission.
   - Avant, l'accueil ne montrait pas Bâti-Conseil, et ses notes demandaient l'accord de Gabriel ; BeauRegard attend aussi l'accord écrit d'Éric.
   - Si les accords ne sont pas confirmés, repasse `publié: false` dans les deux fiches. Rien ne casse : les liens et le sitemap suivent.
   - L'accueil nomme déjà BeauRegard (« Sherbrooke », « rédige ses rapports dans Habita »), comme tu l'avais approuvé.
4. **Les autres projets sont gardés :** Inspection Habitation Outaouais, HP Addik et Envita Wellness.
   - Ce sont de vrais projets, corrigés à partir des sites en ligne en juin.
   - Leurs résultats sont réduits à des faits vérifiables : site en ligne, pages bilingues, avis Google public de Chrissy pour Envita.
5. **Question IHO / BeauRegard (consigne de l'ajout de nuit).** Je n'ai rien fusionné ni rien ajouté.
   - Les deux restent des fiches distinctes : IHO est classé « Site sur mesure », BeauRegard « Refonte et SEO ».
   - La question reste ouverte pour toi. Par exemple : faut-il présenter IHO comme un projet à part entière ? Quel lien a-t-il avec `inspectionhab.ca` et l'adresse inspectionhab@ ?
6. **Ajout de nuit incomplet.** Le message d'ajout annonçait des « tâches 1 à 6 ci-dessous », mais la liste n'y figurait pas : seules les trois consignes (photo, IHO/BeauRegard, URL introuvable) étaient présentes. J'ai appliqué ces trois consignes. Les tâches 1 à 6 restent à me renvoyer.
7. **Scores Lighthouse des clients.**
   - Les anciens scores ordinateur du 15 août 2026, affichés sans date, sont retirés.
   - Les études de cas affichent maintenant une mesure mobile datée, avec l'URL et la méthode. Elle vient de `scripts/measure-clients.mjs` (médiane de trois essais), ou rien si le site n'a pas été mesuré.
   - Certaines notes ne sont pas flatteuses : habita.expert faisait 79 et 80 en performance cette nuit. C'est honnête, mais c'est à toi de choisir si tu veux les montrer. Pour les masquer, vide `sites` dans `src/data/client-metrics.json`.
8. **Données structurées.**
   - FAQPage est retiré : Google a abandonné ce résultat enrichi en mai 2026. Les FAQ restent visibles sur les pages.
   - Ton `jobTitle` devient « Développeur web et concepteur de produits » / « Web developer and product builder ».
   - `worksFor` vers Technologies Habita est retiré : tu en restes le fondateur, mais le site présente ton entreprise de services, distincte.
9. **Outils affichés :** Astro, React, TypeScript, Supabase, Shopify, Liquid et Vercel. Next.js et Tailwind sont retirés, parce qu'aucun projet montré ne les utilise. Ajoute-les si c'est faux.
10. **Pages régionales.** Les phrases « juste à côté », « à quelques minutes » et « dans le Grand Montréal » se contredisaient. Elles disent maintenant que tu travailles à distance, par appel vidéo et par courriel. Dis-moi si tu te déplaces.
11. **« Soumission gratuite ».**
    - Je l'ai retirée de la bannière de contact et de la méta de Montréal.
    - Elle reste dans quelques métas régionales (Terrebonne, etc.) et dans `og` : à confirmer comme engagement.
    - « 2 à 4 semaines » est retiré partout, faute de source.
12. **Blogue.**
    - Le chiffre « 53 % des visites mobiles abandonnées après 3 secondes » est sourcé (Think with Google, 2016).
    - « La moitié de vos clients » est retiré.
    - Les titres « en 2026 » sont retirés.
    - Les articles ne sont pas réécrits en profondeur : il leur manque tes anecdotes réelles.
13. **Avis Google** (`src/data/temoignages.ts`). Les trois avis de la page Contact et l'avis de Chrissy sur la fiche Envita sont décrits comme publics et cités mot pour mot. Je n'ai pas pu le vérifier hors ligne : confirme qu'ils sont toujours en ligne.
14. **Courriel pl@ sur la page À propos.** Je l'ai gardé, comme décidé plus tôt. Un audit suggérait info@.

## Vérifications finales (F refait après G)

Refait le 27 octobre 2026 sur le build final, après la phase G et la mesure des clients.

| Vérification | Résultat |
|---|---|
| `npm run build` | OK, 63 pages, aucune erreur |
| `sitecheck.py dist` | 63 pages, 0 problème, aucune page orpheline, 0 lien interne cassé |
| `responsive.py` (375, 768, 1280, 1920 px) | 62 pages × 4 largeurs : aucun défilement horizontal, menu accessible, un seul H1. Seul signalement : la maquette CRM de `/concepts` et `/en/concepts` à 375 px (rognée dans son cadre, voulu) |
| `keyboard.py` (`/`, `/contact`, `/en`, une étude de cas, à 375 et 1280 px) | Premier Tab sur « Aller au contenu », focus visible partout |
| Lighthouse local (13 pages) | Accessibilité, bonnes pratiques et SEO à 100 partout ; performance 98 à 100 ; CLS 0 |

## Ce qui n'a pas été fait, et pourquoi

- **Push de la branche :** non demandé cette nuit, et un push déclenche les préversions Vercel et Cloudflare. Les commits sont locaux.
- **Réécriture complète des 14 articles de blogue :** seuls les chiffres non sourcés, les dates et la typographie ont été corrigés. Une vraie réécriture demande tes exemples de projets.
- **Lighthouse en production (`npm run measure -- --prod`) :** il ne s'applique qu'une fois le site publié.
- **Maquette CRM de la page Concepts à 375 px :** sa troisième colonne est rognée à l'intérieur du cadre de navigateur simulé. C'est voulu (aperçu d'écran) et il n'y a aucun défilement horizontal de page.
