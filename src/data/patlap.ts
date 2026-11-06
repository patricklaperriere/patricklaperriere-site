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

export function textes(locale: Locale) {
  const t = (quoi: string) => tbc(locale, quoi);
  const fr = locale === 'fr';
  return {
    titrePage: fr ? 'La technologie pour tous' : 'Tech for everyone',
    seoDescription: t(fr ? 'description pour Google (155 caractères)' : 'Google description (155 characters)'),
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
      // Accroche PROPOSÉE dans la passation (section 4), pas approuvée.
      accroche: fr ? 'Ton téléphone sait faire plus que tu penses. Je te montre, 5 minutes par jour.' : t('accroche'),
      accrocheAConfirmer: t(fr ? 'accroche proposée, ou « Non, maman »' : 'hero headline'),
      texte: t(fr ? 'texte sous l\'accroche (2 phrases)' : 'text under the headline (2 sentences)'),
    },
    formulaire: {
      prenom: fr ? 'Prénom' : 'First name',
      courriel: fr ? 'Courriel' : 'Email',
      consentement: t(fr ? 'texte de consentement LCAP (ex. recevoir les courriels du programme, désabonnement en tout temps)' : 'CASL consent text'),
      lienConfidentialite: fr ? 'Politique de confidentialité' : 'Privacy policy',
      bouton: fr ? "Je m'inscris" : 'Sign me up',
      envoi: fr ? 'Envoi…' : 'Sending…',
      merci: t(fr ? 'message après inscription' : 'thank-you message'),
      erreur: fr ? "L'inscription n'a pas pu être envoyée. Réessaie dans un instant." : 'Sign-up could not be sent. Please try again in a moment.',
      fermee: fr ? 'Les inscriptions ouvrent bientôt.' : 'Sign-ups open soon.',
      champsRequis: fr ? 'Prénom, courriel valide et consentement requis.' : 'First name, valid email and consent required.',
    },
    commentCaMarche: {
      titre: t(fr ? 'titre de la section « comment ça marche »' : 'how-it-works title'),
      points: [1, 2, 3].map((n) => t(fr ? `point ${n} de « comment ça marche »` : `how-it-works point ${n}`)),
    },
    jours: {
      titre: fr ? 'Les 5 jours' : 'The 5 days',
      // Gestes : brouillon de la passation (section 5), PAS approuvés. Jours 3 à 5 ouverts.
      liste: [
        t(fr ? 'jour 1, brouillon : ouvrir l\'app d\'IA, poser une vraie question de sa vie' : 'day 1 gesture'),
        t(fr ? 'jour 2, brouillon : le courriel qu\'on repousse, écrit et envoyé en 5 minutes' : 'day 2 gesture'),
        t(fr ? 'jour 3' : 'day 3 gesture'),
        t(fr ? 'jour 4' : 'day 4 gesture'),
        t(fr ? 'jour 5, puis l\'invitation à la Soirée' : 'day 5 gesture, then the Evening invite'),
      ],
      libelleJour: (n: number) => (fr ? `Jour ${n}` : `Day ${n}`),
    },
    pat: {
      titre: fr ? "C'est qui, Pat ?" : 'Who is Pat?',
      texte: t(fr ? 'texte « C\'est qui, Pat ? » (parti de rien, pas d\'université, jamais lâché)' : '"Who is Pat?" text'),
      photo: t(fr ? 'photo de Patrick (quai, lac Simon)' : 'photo of Patrick'),
      lienPro: fr ? 'Mon travail de développeur web' : 'My web developer work',
    },
    soiree: {
      titre: fr ? 'Soirée avec Patrick' : 'Evening with Patrick',
      format: fr ? 'En direct sur Zoom, 90 minutes' : 'Live on Zoom, 90 minutes',
      prix: fr ? '49 $' : '$49',
      date: t(fr ? 'date de la première Soirée' : 'date of the first Evening'),
      texte: t(fr ? 'texte du bloc Soirée' : 'Evening block text'),
      bouton: fr ? 'Réserver ma place' : 'Save my seat',
      boutonPaiement: fr ? 'Payer 49 $' : 'Pay $49',
      paiementAVenir: t(fr ? 'lien de paiement Stripe (compte à son nom)' : 'Stripe payment link'),
    },
    pied: {
      instagram: '@pat.achell',
      site: 'patricklaperriere.com',
      confidentialite: fr ? 'Confidentialité' : 'Privacy',
    },
    pageJour: {
      titre: (n: number) => (fr ? `Jour ${n}` : `Day ${n}`),
      video: t(fr ? 'vidéo YouTube non répertoriée du jour' : 'unlisted YouTube video of the day'),
      geste: (n: number) => t(fr ? `le geste du jour ${n}` : `day ${n} gesture`),
      retour: fr ? 'La technologie pour tous' : 'Tech for everyone',
    },
  };
}
