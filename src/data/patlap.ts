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

/** « Thursday, December 3, 7 p.m. ET », depuis la même constante SOIREE.debut. */
export function dateSoireeEn(iso = SOIREE.debut) {
  const d = new Date(iso);
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Toronto', weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit', hourCycle: 'h12' })
      .formatToParts(d).map((x) => [x.type, x.value]),
  );
  const h = Number(parts.hour);
  const pm = Number(new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Toronto', hour: 'numeric', hourCycle: 'h23' }).format(d)) >= 12;
  const heure = parts.minute === '00' ? `${h}` : `${h}:${parts.minute}`;
  return `${parts.weekday}, ${parts.month} ${parts.day}, ${heure} ${pm ? 'p.m.' : 'a.m.'} ET`;
}

/** Photos de Patrick (fournies dans NEXUS-Bridge/assets/pat-lap/photos/).
 *  `pret: false` tant que le fichier n'est pas dans public/pat-lap/ :
 *  la page garde alors le placeholder visible. */
export const PHOTOS = {
  // Règle de Patrick (6 nov. 16 h 54) : aucune mention de lieu, nulle part.
  portrait: { src: '/pat-lap/pat.jpg', largeur: 1200, hauteur: 1500, pret: false, alt: 'Patrick, téléphone à la main', altEn: 'Patrick, phone in hand' },
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

/* LES 5 GESTES V2 (Patrick, 6 nov. 16 h 56), PROPOSITION pas encore approuvée :
   NEXUS-Bridge/assets/pat-lap/5-JOURS-5-GESTES-V2-2026-11-06.md. EN : traduction
   à relire par Patrick. `geste` : les paragraphes de la page du jour. */
const GESTES: Record<Locale, { titre: string; resume: string; geste: string[] }[]> = {
  fr: [
    {
      titre: 'Ton courriel, écrit pour toi',
      resume: "Tu dictes à l'IA ce que tu veux dire, elle écrit ton courriel, tu l'envoies de Gmail.",
      geste: [
        'Le geste : tu ouvres ChatGPT ou Claude, sur ton téléphone ou ton ordi, comme tu veux (les deux sont gratuits), tu pèses sur le petit micro pis tu parles, tout croche, pas grave.',
        'Mon exemple : « Écris un courriel à mon garagiste. Je veux savoir si mon char est prêt pis combien ça va coûter. Poli, court. »',
        'Tu lis ce qu\'il te propose, tu changes un mot si tu veux. Après, tu le copies, tu ouvres Gmail, tu colles pis tu envoies.',
      ],
    },
    {
      titre: 'Ta semaine, rentrée dans ton agenda',
      resume: "Tu dictes ta semaine à l'IA, elle sort tes rendez-vous propres, tu les rentres dans Google Agenda.",
      geste: [
        'Le geste : tu ouvres ChatGPT ou Claude, sur ton téléphone ou ton ordi, comme tu veux, tu pèses sur le micro pis tu dictes ta semaine comme elle te vient.',
        'Mon exemple : « Mardi, dentiste à 10 h. Jeudi, souper chez ma sœur à 18 h. Vendredi, appeler l\'assurance. Fais-moi une liste propre avec le jour, l\'heure pis quoi. »',
        'Tu ouvres Google Agenda, tu pèses sur le « + », pis tu rentres chaque rendez-vous. Google Agenda va te le rappeler tout seul. Sur iPhone, l\'app Calendrier marche pareil.',
      ],
    },
    {
      titre: 'Le ménage de ta boîte pleine',
      resume: 'Tu te désabonnes, tu archives en masse, pis une règle classe tes factures toute seule.',
      geste: [
        'Sur ton téléphone ou ton ordi, comme tu veux. Un : tu ouvres une pub que tu lis jamais, tu pèses sur « Se désabonner ». Fais-en cinq.',
        'Deux : dans la recherche de Gmail, tu écris le nom d\'un magasin qui t\'envoie trop de pubs, tu les sélectionnes toutes pis tu archives. Archiver, c\'est pas effacer.',
        'Trois : un filtre qui met tes factures dans un dossier « Factures », tout seul. Sur l\'ordi, c\'est plus facile. Si tu bloques, demande à Claude ou ChatGPT : « Comment je fais un filtre dans Gmail pour mes factures ? »',
      ],
    },
    {
      titre: 'Ton téléphone qui lit pour toi',
      resume: "Une lettre, une facture, une étiquette en photo : l'IA t'explique en mots simples quoi faire.",
      geste: [
        'Le geste : tu ouvres ChatGPT ou Claude, tu pèses sur le petit « + » ou le trombone, tu prends la feuille en photo, pis tu écris : « Explique-moi ça en mots simples. Qu\'est-ce que je dois faire, pis avant quand ? »',
        'Sur l\'ordi, tu prends la photo avec ton téléphone, tu te l\'envoies, pis tu téléverses l\'image avec le même « + ».',
        'Si c\'est dans une autre langue, ajoute : « Traduis en français. »',
        'Cache ton numéro d\'assurance sociale ou de compte avec ton pouce avant la photo. Pour les pilules, ça remplace pas ton pharmacien.',
      ],
    },
    {
      titre: 'La discussion',
      resume: "Tu parles à l'IA à voix haute, comme à un ami patient, sur n'importe quoi.",
      geste: [
        'Le geste : tu ouvres ChatGPT ou Claude, sur ton téléphone ou ton ordi, comme tu veux, pis tu pèses sur le bouton du mode vocal, à droite de la barre où tu écris (des petites barres ou un micro). Pis tu jases.',
        'N\'importe quoi : une question de santé, une recette de ta mère, une nouvelle que t\'as pas comprise, un souvenir. Tu la coupes quand tu veux, elle te juge pas.',
      ],
    },
  ],
  en: [
    {
      titre: 'Your email, written for you',
      resume: 'Tell the AI what you want to say, it writes your email, you send it from Gmail.',
      geste: [
        "The move: open ChatGPT or Claude, on your phone or your computer, your choice (both are free), tap the little microphone and talk. Messy is fine.",
        'My example: "Write an email to my mechanic. I want to know if my car is ready and how much it will cost. Polite, short."',
        'Read what it suggests and change a word if you like. Then copy it, open Gmail, paste and send.',
      ],
    },
    {
      titre: 'Your week, in your calendar',
      resume: 'Tell the AI your week, it gives you a clean list, you add it to Google Calendar.',
      geste: [
        'The move: open ChatGPT or Claude, on your phone or your computer, your choice, tap the microphone and say your week the way it comes to you.',
        'My example: "Tuesday, dentist at 10. Thursday, supper at my sister\'s at 6. Friday, call the insurance. Make me a clean list with the day, the time and what."',
        'Open Google Calendar, tap the "+", and add each appointment. Google Calendar will remind you on its own. On iPhone, the built-in Calendar app works the same way.',
      ],
    },
    {
      titre: 'Clean up your overflowing inbox',
      resume: 'Unsubscribe, archive in bulk, and let a rule file your bills on its own.',
      geste: [
        'On your phone or your computer, your choice. One: open an ad you never read and tap "Unsubscribe". Do five.',
        "Two: in Gmail's search bar, type the name of a store that sends you too many ads, select them all and archive. Archiving isn't deleting.",
        'Three: a filter that puts your bills in a "Bills" folder, on its own. It\'s easier on a computer. If you get stuck, ask Claude or ChatGPT: "How do I make a Gmail filter for my bills?"',
      ],
    },
    {
      titre: 'Your phone reads for you',
      resume: 'Snap a letter, a bill or a label: the AI explains in plain words what to do.',
      geste: [
        'The move: open ChatGPT or Claude, tap the little "+" or the paper clip, take a photo of the page, and type: "Explain this in plain words. What do I need to do, and by when?"',
        'On a computer, take the photo with your phone, send it to yourself, and upload the image with the same "+".',
        'If it\'s in another language, add: "Translate it into English."',
        'Cover your social insurance or account number with your thumb before the photo. For pills, it doesn\'t replace your pharmacist.',
      ],
    },
    {
      titre: 'The conversation',
      resume: 'Talk to the AI out loud, like a patient friend, about anything.',
      geste: [
        'The move: open ChatGPT or Claude, on your phone or your computer, your choice, and tap the voice mode button, to the right of where you type (little bars or a microphone). Then just talk.',
        'Anything: a health question, your mom\'s recipe, a news story you didn\'t get, a memory. Interrupt it whenever you want, it won\'t judge you.',
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
      : '5 days, 5 simple moves to get comfortable with AI on your phone. One email a morning, a 60-second clip, zero jargon. Free.',
    nav: {
      marque: 'Pat Lap',
      sousTitre: fr ? 'La technologie pour tous' : 'Tech for everyone',
      jours: fr ? 'Les 5 jours' : 'The 5 days',
      soiree: fr ? 'La Soirée' : 'The Evening',
      quiPat: fr ? "C'est qui Pat ?" : "Who's Pat?",
      inscription: fr ? "Je m'inscris" : 'Sign me up',
      autreLangue: fr ? 'EN' : 'FR',
      autreLangueLabel: fr ? 'English' : 'Français',
    },
    hero: {
      badge: fr ? 'Gratuit, pas de carte' : 'Free, no credit card',
      // Accroche finale de Patrick (6 nov. 17 h 11).
      accroche: fr ? "La techno, c'est pas si compliqué. Je te montre, 5 minutes par jour." : "Tech isn't that complicated. I'll show you, 5 minutes a day.",
      accrocheAConfirmer: '',
      texte: fr
        ? 'Pas de jargon, pas de cours de trois heures. Chaque matin pendant 5 jours, un courriel, une capsule de 60 secondes et un petit geste à faire.'
        : 'No jargon, no three-hour class. Every morning for 5 days: one email, one 60-second clip and one small thing to try, on your phone or your computer, whichever you prefer.',
      // Règle de Patrick (6 nov. 17 h 05) : on n'impose jamais un appareil.
      appareil: fr ? 'Sur ton téléphone ou ton ordi, comme tu veux.' : 'On your phone or your computer, your choice.',
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
      // Les 5 gestes V2 (PROPOSITION du 6 nov. 2026) :
      // NEXUS-Bridge/assets/pat-lap/5-JOURS-5-GESTES-V2-2026-11-06.md.
      liste: GESTES[locale].map(({ titre, resume }) => ({ titre, resume })),
      libelleJour: (n: number) => (fr ? `Jour ${n}` : `Day ${n}`),
    },
    pat: {
      titre: fr ? "C'est qui, Pat ?" : "Who's Pat?",
      texte: fr
        ? "Je m'appelle Patrick. Je bâtis des sites web et des logiciels pour des entreprises d'ici, et je passe mes journées avec des outils d'intelligence artificielle. Le soir, c'est ma mère ou un oncle qui m'appelle parce que « le téléphone fait quelque chose de bizarre ». J'ai fini par comprendre une affaire : ce n'est pas que c'est compliqué, c'est que personne ne prend 5 minutes pour montrer. La technologie pour tous, c'est ces 5 minutes-là, sans jugement, en français, de mon téléphone au tien."
        : 'My name is Patrick. I build websites and software for local businesses, and I spend my days working with artificial intelligence tools. In the evening, it\'s my mom or an uncle calling because "the phone is doing something weird." I finally figured something out: it\'s not that it\'s complicated, it\'s that nobody takes 5 minutes to show you. Tech for everyone is those 5 minutes, no judgment, from my phone to yours.',
      photo: t(fr ? 'photo de Patrick' : 'photo of Patrick'),
      lienPro: fr ? 'Mon travail de développeur web' : 'My web developer work',
    },
    soiree: {
      titre: fr ? 'Soirée avec Patrick' : 'An evening with Patrick',
      format: fr ? 'En direct sur Zoom, 90 minutes' : 'Live on Zoom, 90 minutes',
      prix: fr ? '49 $' : '$49',
      date: fr ? dateSoireeFr() : dateSoireeEn(),
      // Aucune mention de rareté (interdit par la passation, section « Interdit
      // dans tout contenu »). Voir le rendu PAT-LAP-4.
      texte: fr
        ? "La Soirée avec Patrick, c'est 90 minutes en direct sur Zoom, en petit groupe. Tu arrives avec ton téléphone ou ton ordi, et tes vraies questions, tu repars avec des choses qui marchent : tes photos rangées, tes courriels écrits en deux minutes, l'IA qui te répond comme un ami patient. 49 $, enregistrement envoyé après."
        : 'An evening with Patrick is 90 minutes live on Zoom, in a small group. Bring your phone or your computer and your real questions, and leave with things that work: your photos sorted, your emails written in two minutes, an AI that answers you like a patient friend. $49, recording sent afterwards.',
      bouton: fr ? 'Réserver ma place' : 'Save my seat',
      boutonPaiement: fr ? 'Payer 49 $' : 'Pay $49',
      paiementAVenir: t(fr ? 'lien de paiement Stripe (compte à son nom)' : 'Stripe payment link'),
    },
    pied: {
      instagram: '@pat.achell',
      site: 'patricklaperriere.com',
      projet: fr ? 'Un projet de Patrick Laperrière' : 'A Patrick Laperrière project',
      confidentialite: fr ? 'Confidentialité' : 'Privacy',
      marques: fr
        ? 'ChatGPT, Claude, Gmail et Google Agenda sont des marques de leurs propriétaires respectifs. Pat Lap n\'est affilié à aucun d\'eux.'
        : 'ChatGPT, Claude, Gmail and Google Calendar are trademarks of their respective owners. Pat Lap is not affiliated with any of them.',
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
