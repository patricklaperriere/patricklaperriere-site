// Refonte 2026-11 : les seuls textes nouveaux de la home (étiquettes,
// annotations, consignes d'accessibilité). Tout le contenu factuel reste dans
// home.ts, fr.ts et en.ts. Les chiffres de BeauRegard viennent de l'étude de
// cas publiée (src/content/projets/inspection-beauregard.md).
import type { Locale } from './routes';

const fr = {
  eyebrow: 'Développeur web · Québec',
  // Le mot d'accent de chaque titre (serif italique), tel qu'il est écrit.
  accent: { hero: 'rapides.', inspection: 'inspecte', work: 'Réalisations', about: 'suis', contact: 'bâtir' },
  // Le mot en citron du hero (un seul).
  citron: 'rapides.',
  sheet: { score: 'Performance mobile', seuil: 'Seuil de Google : 2,5 s', sur: 'sur 100' },
  method: 'La méthode',
  couche: 'Couche',
  work: { eyebrow: 'Dossiers', chiffres: [
    { n: 22, label: 'pages en ligne' },
    { n: 5, label: 'semaines, du premier commit à la mise en ligne' },
    { n: 5, label: 'anciennes adresses Wix redirigées en 301' },
  ] },
  slider: { label: 'Comparer l’ancien site et le nouveau', avant: 'Avant', apres: 'Après', consigne: 'Glisser pour comparer' },
  about: 'À propos',
  contact: 'Contact',
};

const en: typeof fr = {
  eyebrow: 'Web developer · Quebec',
  accent: { hero: 'Fast', inspection: 'inspected', work: 'Work', about: 'am', contact: 'build' },
  citron: 'Fast',
  sheet: { score: 'Mobile performance', seuil: 'Google’s threshold: 2.5 s', sur: 'out of 100' },
  method: 'The method',
  couche: 'Layer',
  work: { eyebrow: 'Case files', chiffres: [
    { n: 22, label: 'pages live' },
    { n: 5, label: 'weeks, from first commit to launch' },
    { n: 5, label: 'old Wix addresses redirected (301)' },
  ] },
  slider: { label: 'Compare the old site and the new one', avant: 'Before', apres: 'After', consigne: 'Drag to compare' },
  about: 'About',
  contact: 'Contact',
};

export const refonteCopy: Record<Locale, typeof fr> = { fr, en };

/** Entoure, dans un titre, le mot d'accent d'un <em> (serif italique). */
export function accentue(titre: string, mot: string): { avant: string; mot: string; apres: string } {
  const i = titre.indexOf(mot);
  if (i < 0) return { avant: titre, mot: '', apres: '' };
  return { avant: titre.slice(0, i), mot, apres: titre.slice(i + mot.length) };
}
