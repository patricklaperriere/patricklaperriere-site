// « La technologie pour tous » (marque Pat Lap) : tout le texte des pages.
//
// Source qui fait foi : NEXUS-Bridge/docs/PASSATION-TECHNO-POUR-TOUS-2026-11-06.md
// et AI-FOR-DUMMIES-MVP.md. RÈGLE : aucun texte marketing inventé. Ce qui est
// DÉCIDÉ (nom, paliers, prix, libellés de navigation, « Gratuit, pas de
// carte », Instagram) est écrit ; tout le reste est un placeholder VISIBLE,
// `tbc(...)`, que Patrick remplace un par un. La liste numérotée de ces
// placeholders est dans le rendu SITEPERSO-2026-11-06-PAT-LAP.
//
// BROUILLON = true : toutes les pages Pat Lap sont en noindex et hors du
// sitemap (astro.config.mjs). On le passe à false seulement quand Patrick a
// remplacé chaque placeholder et donné son OK de mise en ligne.

import type { Locale } from '../i18n/routes';

export const BROUILLON = true;

/** Un texte absent, visible comme tel à l'écran. */
export const tbc = (locale: Locale, quoi: string) =>
  locale === 'fr' ? `[À CONFIRMER PATRICK : ${quoi}]` : `[TO CONFIRM PATRICK: ${quoi}]`;

export const estPlaceholder = (s: string) => /^\[(À CONFIRMER|TO CONFIRM) PATRICK/.test(s);

/** La prochaine Soirée : LA seule valeur à changer pour une nouvelle date.
 *  Heure de l'Est (-05:00 en décembre), sur Zoom. */
export const SOIREE = {
  debut: '2026-12-03T19:00:00-05:00',
  minutes: 90,
  lieu: 'Zoom',
};

/** « Jeudi 3 décembre, 19 h », calculé depuis SOIREE.debut, à l'heure de l'Est. */
export function dateSoireeFr(iso = SOIREE.debut) {
  const d = new Date(iso);
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('fr-CA', { timeZone: 'America/Toronto', weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(d).map((x) => [x.type, x.value]),
  );
  const jour = parts.weekday.charAt(0).toUpperCase() + parts.weekday.slice(1);
  const heure = parts.minute === '00' ? `${Number(parts.hour)} h` : `${Number(parts.hour)} h ${parts.minute}`;
  return `${jour} ${parts.day} ${parts.month}, ${heure}`;
}

/** Photos de Patrick (fournies dans NEXUS-Bridge/assets/pat-lap/photos/).
 *  `pret: false` tant que le fichier n'est pas dans public/pat-lap/ :
 *  la page garde alors le placeholder visible. */
export const PHOTOS = {
  portrait: { src: '/pat-lap/pat.jpg', largeur: 1200, hauteur: 1500, pret: false },
  // Optionnelle : ambiance derrière le bloc « C'est qui, Pat ? ».
  lac: { src: '/pat-lap/lac-simon.jpg', largeur: 1920, hauteur: 1080, pret: false, alt: 'Le lac Simon, en Outaouais' },
};

export const PATLAP_ROUTES = {
  fr: { page: '/la-technologie-pour-tous', jour: (n: number) => `/la-technologie-pour-tous/jour-${n}`, soiree: '/la-technologie-pour-tous/soiree', confidentialite: '/confidentialite' },
  en: { page: '/en/tech-for-everyone', jour: (n: number) => `/en/tech-for-everyone/day-${n}`, soiree: '/en/tech-for-everyone/evening', confidentialite: '/en/privacy' },
} as const;

/** Le lien Stripe et la vidéo de chaque jour : vides tant que Patrick ne les a pas. */
export const LIENS = {
  stripeSoiree: '', // lien de paiement Stripe (compte à son nom, décision ouverte n° 6)
  youtube: { 1: '', 2: '', 3: '', 4: '', 5: '' } as Record<number, string>, // ID YouTube non répertorié
  instagram: 'https://www.instagram.com/pat.achell/',
};

/* LES 5 GESTES, textes approuvés (FR) et leur traduction (EN, à relire par
   Patrick). `geste` : les paragraphes de la page du jour. */
const GESTES: Record<Locale, { titre: string; resume: string; geste: string[] }[]> = {
  fr: [
    {
      titre: 'Poser une vraie question à une IA',
      resume: 'Tu ouvres ChatGPT ou Claude pis tu lui poses une question de ta vraie vie, comme à un chum.',
      geste: [
        "Aujourd'hui, tu ouvres ChatGPT ou Claude sur ton téléphone (les deux sont gratuits, choisis celui que tu veux) pis tu lui poses une question de ta vraie vie. Pas une question de robot, une question que tu poserais à un chum.",
        'Mon exemple : « J\'ai du poulet, du riz pis un brocoli. Qu\'est-ce que je fais pour souper ? »',
      ],
    },
    {
      titre: 'Faire lire tes courriels par ton téléphone',
      resume: 'Tu colles un courriel long dans ChatGPT ou Claude pis tu demandes de te le résumer en 3 lignes.',
      geste: [
        'Le geste : tu copies le texte du courriel au complet, tu le colles dans ChatGPT ou Claude, pis t\'écris en haut : « Résume-moi ça en 3 lignes. Qu\'est-ce que je dois faire ? »',
      ],
    },
    {
      titre: "Prendre une photo d'un problème et demander c'est quoi",
      resume: "Tu prends la patente en photo pis tu demandes : « C'est quoi ça, pis qu'est-ce que je fais avec ? »",
      geste: [
        'Le geste : tu prends une photo de la patente. Tu ouvres ChatGPT ou Claude, tu pèses sur le petit « + » ou le trombone, tu ajoutes la photo, pis t\'écris : « C\'est quoi ça, pis qu\'est-ce que je fais avec ? »',
      ],
    },
    {
      titre: "Réécrire un message que t'as peur d'envoyer",
      resume: 'Tu fais réécrire ton brouillon « poli mais direct », tu changes un mot ou deux, pis tu l\'envoies.',
      geste: [
        'Le geste : t\'écris ton brouillon comme ça te vient, tout croche, pas grave. Tu le colles dans ChatGPT ou Claude pis t\'écris en haut : « Rends ça poli mais direct, en français du Québec, pas trop long. »',
      ],
    },
    {
      titre: 'Activer la sauvegarde automatique des photos',
      resume: 'Tu actives la sauvegarde automatique de tes photos, une fois, pour toujours.',
      geste: [
        'Le geste : tu actives la sauvegarde automatique de tes photos.',
        'Sur iPhone : Réglages, ton nom en haut, iCloud, Photos, tu allumes « Synchroniser ce iPhone ».',
        'Sur Android : tu ouvres l\'app Google Photos, ta photo de profil en haut à droite, « Sauvegarde », tu l\'allumes.',
      ],
    },
  ],
  en: [
    {
      titre: 'Ask an AI a real question',
      resume: 'Open ChatGPT or Claude and ask it a question from your real life, like you would ask a friend.',
      geste: [
        "Today, open ChatGPT or Claude on your phone (both are free, pick whichever you like) and ask it a question from your real life. Not a robot question: a question you'd ask a friend.",
        'My example: "I have chicken, rice and a head of broccoli. What should I make for supper?"',
      ],
    },
    {
      titre: 'Have your phone read your emails',
      resume: 'Paste a long email into ChatGPT or Claude and ask for a 3-line summary.',
      geste: [
        'The move: copy the whole email, paste it into ChatGPT or Claude, and type at the top: "Sum this up in 3 lines. What do I need to do?"',
      ],
    },
    {
      titre: 'Snap a photo of a problem and ask what it is',
      resume: 'Take a photo of the thing and ask: "What is this, and what do I do with it?"',
      geste: [
        'The move: take a photo of the thing. Open ChatGPT or Claude, tap the little "+" or the paper clip, add the photo, and type: "What is this, and what do I do with it?"',
      ],
    },
    {
      titre: "Rewrite a message you're scared to send",
      resume: 'Have your draft rewritten "polite but direct", change a word or two, and send it.',
      geste: [
        'The move: write your draft however it comes out, messy is fine. Paste it into ChatGPT or Claude and type at the top: "Make this polite but direct, not too long."',
      ],
    },
    {
      titre: 'Turn on automatic photo backup',
      resume: 'Turn on automatic backup for your photos, once, for good.',
      geste: [
        'The move: turn on automatic backup for your photos.',
        'On iPhone: Settings, your name at the top, iCloud, Photos, turn on "Sync this iPhone".',
        'On Android: open the Google Photos app, your profile picture at the top right, "Backup", turn it on.',
      ],
    },
  ],
};

export function textes(locale: Locale) {
  const t = (quoi: string) => tbc(locale, quoi);
  const fr = locale === 'fr';
  return {
    titrePage: fr ? 'La technologie pour tous' : 'Tech for everyone',
    // Décidée par le chat NEXUS (délégation de Patrick, 6 nov. 16 h 28), 139 caractères.
    seoDescription: fr
      ? "5 jours, 5 gestes simples pour apprivoiser l'IA sur ton téléphone. Un courriel par matin, une capsule de 60 secondes, zéro jargon. Gratuit."
      : t('Google description (155 characters)'),
    nav: {
      marque: 'Pat Lap',
      sousTitre: fr ? 'La technologie pour tous' : 'Tech for everyone',
      jours: fr ? 'Les 5 jours' : 'The 5 days',
      soiree: fr ? 'La Soirée' : 'The Evening',
      quiPat: fr ? "C'est qui Pat ?" : 'Who is Pat?',
      inscription: fr ? "Je m'inscris" : 'Sign me up',
      autreLangue: fr ? 'EN' : 'FR',
      autreLangueLabel: fr ? 'English' : 'Français',
    },
    hero: {
      badge: fr ? 'Gratuit, pas de carte' : t('badge « Gratuit, pas de carte » en anglais'),
      // Accroche de la passation (section 4), gardée le 6 nov. (PAT-LAP-4).
      accroche: fr ? 'Ton téléphone sait faire plus que tu penses. Je te montre, 5 minutes par jour.' : t('accroche'),
      accrocheAConfirmer: fr ? '' : t('hero headline'),
      texte: fr
        ? 'Pas de jargon, pas de cours de trois heures. Chaque matin pendant 5 jours, un courriel, une capsule de 60 secondes et un petit geste à faire sur ton propre téléphone.'
        : t('text under the headline (2 sentences)'),
    },
    formulaire: {
      prenom: fr ? 'Prénom' : 'First name',
      courriel: fr ? 'Courriel' : 'Email',
      // Approuvé par Patrick, 6 nov. (chat NEXUS, prompt PAT-LAP-2).
      consentement: fr
        ? "J'accepte de recevoir les 5 courriels de La technologie pour tous et, après, les nouvelles de Pat Lap. Je peux me désabonner en un clic, n'importe quand."
        : 'I agree to receive the 5 emails from Tech for everyone and, after that, news from Pat Lap. I can unsubscribe in one click, anytime.',
      lienConfidentialite: fr ? 'Politique de confidentialité' : 'Privacy policy',
      bouton: fr ? "Je m'inscris" : 'Sign me up',
      envoi: fr ? 'Envoi…' : 'Sending…',
      // {prenom} est remplacé par le prénom saisi, au moment d'afficher.
      merci: fr
        ? "C'est parti, {prenom}. Regarde tes courriels demain matin (vérifie les indésirables la première fois)."
        : "You're in, {prenom}. Check your email tomorrow morning (look in your spam folder the first time).",
      erreur: fr ? "L'inscription n'a pas pu être envoyée. Réessaie dans un instant." : 'Sign-up could not be sent. Please try again in a moment.',
      fermee: fr ? 'Les inscriptions ouvrent bientôt.' : 'Sign-ups open soon.',
      champsRequis: fr ? 'Prénom, courriel valide et consentement requis.' : 'First name, valid email and consent required.',
    },
    commentCaMarche: {
      titre: fr ? 'Comment ça marche' : 'How it works',
      points: fr
        ? ['Un courriel chaque matin, 5 jours', 'Une capsule de 60 secondes, moi qui te montre sur mon téléphone', 'Un geste à faire, 10 minutes, pas plus']
        : ['One email every morning, for 5 days', 'A 60-second clip: me, showing you on my phone', 'One thing to do, 10 minutes, no more'],
    },
    jours: {
      titre: fr ? 'Les 5 jours' : 'The 5 days',
      // Les 5 gestes APPROUVÉS par Patrick le 6 nov. 2026 :
      // NEXUS-Bridge/assets/pat-lap/5-JOURS-5-GESTES-APPROUVES-2026-11-06.md.
      // Titre = le « ## Jour N : … » du fichier ; résumé tiré du geste.
      liste: GESTES[locale].map(({ titre, resume }) => ({ titre, resume })),
      libelleJour: (n: number) => (fr ? `Jour ${n}` : `Day ${n}`),
    },
    pat: {
      titre: fr ? "C'est qui, Pat ?" : 'Who is Pat?',
      texte: fr
        ? "Je m'appelle Patrick, je vis au lac Simon, en Outaouais. Je bâtis des sites web et des logiciels pour des entreprises d'ici, et je passe mes journées avec des outils d'intelligence artificielle. Le soir, c'est ma mère ou un oncle qui m'appelle parce que « le téléphone fait quelque chose de bizarre ». J'ai fini par comprendre une affaire : ce n'est pas que c'est compliqué, c'est que personne ne prend 5 minutes pour montrer. La technologie pour tous, c'est ces 5 minutes-là, sans jugement, en français, de mon téléphone au tien."
        : t('"Who is Pat?" text'),
      photo: t(fr ? 'photo de Patrick (quai, lac Simon)' : 'photo of Patrick'),
      photoAlt: fr ? 'Patrick, au lac Simon' : 'Patrick, at Lac Simon',
      lienPro: fr ? 'Mon travail de développeur web' : 'My web developer work',
    },
    soiree: {
      titre: fr ? 'Soirée avec Patrick' : 'Evening with Patrick',
      format: fr ? 'En direct sur Zoom, 90 minutes' : 'Live on Zoom, 90 minutes',
      prix: fr ? '49 $' : '$49',
      date: fr ? dateSoireeFr() : t('date of the first Evening'),
      // « places limitées » retiré : interdit par la passation (section « Interdit
      // dans tout contenu »). Voir le rendu PAT-LAP-4.
      texte: fr
        ? "La Soirée avec Patrick, c'est 90 minutes en direct sur Zoom, en petit groupe. Tu arrives avec ton téléphone et tes vraies questions, tu repars avec des choses qui marchent : tes photos rangées, tes courriels écrits en deux minutes, l'IA qui te répond comme un ami patient. 49 $, enregistrement envoyé après."
        : t('Evening block text'),
      bouton: fr ? 'Réserver ma place' : 'Save my seat',
      boutonPaiement: fr ? 'Payer 49 $' : 'Pay $49',
      paiementAVenir: t(fr ? 'lien de paiement Stripe (compte à son nom)' : 'Stripe payment link'),
    },
    pied: {
      instagram: '@pat.achell',
      site: 'patricklaperriere.com',
      projet: fr ? 'Un projet de Patrick Laperrière' : 'A Patrick Laperrière project',
      confidentialite: fr ? 'Confidentialité' : 'Privacy',
    },
    pageJour: {
      titre: (n: number) => (fr ? `Jour ${n}` : `Day ${n}`),
      video: t(fr ? 'vidéo YouTube non répertoriée du jour' : 'unlisted YouTube video of the day'),
      // Le paragraphe « Le geste : … » du courriel du jour, tel quel, puis
      // l'exemple de Patrick quand le courriel en donne un.
      geste: (n: number) => GESTES[locale][n - 1]?.geste ?? [t(fr ? `le geste du jour ${n}` : `day ${n} gesture`)],
      retour: fr ? 'La technologie pour tous' : 'Tech for everyone',
    },
  };
}
