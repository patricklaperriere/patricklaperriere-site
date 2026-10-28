---
titre:
  fr: "Inspection BeauRegard"
  en: "Inspection BeauRegard"
titreH1:
  fr: "Refonte du site d’Inspection BeauRegard, de Wix à Astro"
  en: "Inspection BeauRegard website redesign, from Wix to Astro"
titreSeo:
  fr: "Inspection BeauRegard, de Wix à Astro"
  en: "Inspection BeauRegard, Wix to Astro"
accroche:
  fr: "Un inspecteur en bâtiment de Sherbrooke, qui rédige ses rapports dans Habita. J’ai fait passer son site de Wix à un site Astro sur mesure."
  en: "A building inspector in Sherbrooke who writes his reports in Habita. I moved his site from Wix to a custom Astro site."
description:
  fr: "Étude de cas : le site d’Inspection BeauRegard, inspecteur en bâtiment à Sherbrooke, passé de Wix à un site Astro sur mesure, structuré pour Google."
  en: "Case study: Inspection BeauRegard, a building inspector in Sherbrooke, moved from Wix to a custom Astro site, with a structure designed for Google."
client: "Inspection BeauRegard"
rôle:
  fr: "Migration, conception et développement"
  en: "Migration, design and development"
stack: ["Astro", { fr: "Migration depuis Wix", en: "Migration from Wix" }, "Schema.org"]
défi:
  fr: "Le site d’Inspection BeauRegard était construit sur Wix, une plateforme pratique pour démarrer, mais qui laisse peu de contrôle sur la vitesse, la structure des pages et le référencement."
  en: "Inspection BeauRegard’s site was built on Wix, a convenient platform to start with, but one that leaves little control over speed, page structure and search."
réalisation:
  fr: "J’ai remplacé le site Wix par un site Astro sur mesure : des pages légères rendues d’avance, une structure pensée pour Google et des données structurées qui décrivent l’entreprise et ses services."
  en: "I replaced the Wix site with a custom Astro site: light, pre-rendered pages, a structure designed for Google and structured data describing the business and its services."
résultat:
  fr: "Le nouveau site est en ligne à inspectionbeauregard.com : 22 pages, dont une par service d’inspection (préachat, prévente, préventive, thermographie, inspection par drone, chauffage au bois), cinq pages de villes et trois guides, et un formulaire de soumission protégé contre le spam qui envoie la demande à Éric et un accusé de réception au client. Les cinq anciennes adresses Wix redirigent en 301 vers leurs nouvelles pages, pour garder ce que Google avait déjà indexé."
  en: "The new site is live at inspectionbeauregard.com: 22 pages, including one per inspection service (pre-purchase, pre-sale, preventive, thermography, drone inspection, wood heating), five city pages and three guides, and a spam-protected quote form that sends the request to Éric and a confirmation to the client. The five old Wix addresses redirect with a 301 to their new pages, so what Google had already indexed is kept."
lien: "https://www.inspectionbeauregard.com"
logo: "/work/logos/inspection-beauregard.svg"
image: "/work/inspection-beauregard.webp"
délai:
  fr: "Livré en 5 semaines"
  en: "Delivered in 5 weeks"
captures:
  - src: "/work/inspection-beauregard-thermographie.webp"
    alt:
      fr: "Page Thermographie du site d’Inspection BeauRegard, en haut de page, sur ordinateur"
      en: "Thermography page of the Inspection BeauRegard website, top of page, on desktop"
    largeur: 1280
    hauteur: 800
  - src: "/work/inspection-beauregard-contact.webp"
    alt:
      fr: "Formulaire de demande de soumission d’Inspection BeauRegard, avec les coordonnées d’Éric à côté"
      en: "Inspection BeauRegard quote request form, with Éric’s contact details beside it"
    largeur: 1280
    hauteur: 800
  - src: "/work/inspection-beauregard-mobile.webp"
    alt:
      fr: "Accueil du site d’Inspection BeauRegard sur téléphone"
      en: "Inspection BeauRegard website home page on a phone"
    largeur: 750
    hauteur: 1624
aFournir:
  - "scores Lighthouse mobile du site en ligne, avec la date (API PageSpeed refusée le 28 octobre 2026 : quota quotidien dépassé ; la mesure locale échoue : NO_FCP sous WSL)"
ordre: 2
statut: publié
preuve:
  - fr: "Migré de Wix vers Astro"
    en: "Moved from Wix to Astro"
  - fr: "5 anciennes adresses en 301"
    en: "5 old URLs redirected (301)"
  - fr: "Formulaire anti-spam"
    en: "Spam-protected form"
grille:
  colonnes: 6
année: "2026"
catégorie: seo
vedette: true
accent: "#8fb3a0"
cadrage: cover
---

Notes internes (jamais publiées).

Faits fournis par Patrick : site Astro réalisé par Patrick, migration depuis Wix, inspecteur de Sherbrooke,
Éric Beauregard rédige ses rapports dans Habita. Accord d'Éric reçu (Patrick, 27 octobre 2026).

Vérifié le 27 octobre 2026 sur le site en ligne et dans ~/projets/inspection-beauregard (lecture seule) :
- 9 pages dans le sitemap en ligne : accueil, à propos, contact, inspection en bâtiment, préachat, prévente,
  préventive, nos services, politique de confidentialité. Les pages villes, guides, FAQ, drone, thermographie
  et chauffage au bois existent dans le dépôt mais ne sont pas en ligne : ne pas les compter avant.
- 5 anciennes adresses Wix en 301 (netlify.toml), toutes testées : /page-vierge, /page-vierge-1,
  /page-vierge-2, /l-inspection, /nous-joindre, plus /à-propos sous ses deux formes.
- Formulaire : fonction Netlify + Resend, Turnstile, limite de 3 envois/min par IP ; notification à Éric
  et accusé de réception au client.
- Mise en ligne en 2026 : encore sur Wix dans la Wayback Machine en mai 2026, dépôt commencé en septembre 2026.
- Capture : public/work/inspection-beauregard.webp, tirée de src/assets/work/beauregard-apres.png.

Témoignage : Éric n'a écrit aucune citation sur le site Web (sa citation approuvée porte sur Habita et figure
sur la fiche Habita). Pas de bloc témoignage ici; en ajouter un seulement avec une citation qu'il a approuvée.

28 octobre 2026 (prompt SITEPERSO-2026-10-28-4) :
- Délai : premier commit 093a1b9 le 22 septembre 2026 (fondation du site, déjà propre au projet : 45 fichiers, pages BeauRegard), mise en ligne ac60dc4 poussée sur main le 27 octobre 2026. 35 jours, soit 5 semaines.
- Résultat : le site en ligne compte 22 pages (sitemap du 28 octobre), plus 9 ; les 5 redirections Wix répondent toujours 301.
- Captures prises sur le site en ligne le 28 octobre (Playwright) : /thermographie et /contact à 1440 px, accueil à 375 px.
- Résultats depuis la mise en ligne : retirés (ni chiffres ni accord d'Éric). Le champ `résultatsMesurés` reste disponible.
