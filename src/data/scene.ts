// La scène 3D de la home WOW : les vrais projets publiés, en profondeur.
// Une seule source pour le HTML (Scene.astro), le moteur WebGL et le repli
// CSS (scripts/scene.ts). Unités du monde : un écran principal fait 1,6 de
// large ; la caméra regarde vers -z et avance d'un projet à l'autre.
//
// Seulement des projets présents sur le site (src/content/projets, statut
// publié ou en_cours), plus un projet client montré sans nom. Ordre voulu par
// Patrick le 2026-11-11 : Batixpert, projet sans nom, BeauRegard, IHO, Envita (nouvelle plateforme), HP Addik (nouveau site).
// Captures : accueils réels (aperçu pour Envita, pas encore en ligne).
import type { Locale } from '../i18n/routes';

export interface Ecran {
  /** Fichier dans public/scene/, sans extension. */
  src: string;
  /** Variante anglaise, si l'écran contient du texte en français. */
  srcEn?: string;
  x: number; y: number; z: number;
  /** Rotation autour de l'axe vertical, en radians. */
  ry: number;
  /** Largeur, et hauteur / largeur. */
  w: number; ar: number;
}
export interface ProjetScene {
  id: 'batixpert' | 'sansnom' | 'beauregard' | 'iho' | 'envita' | 'hpaddik';
  /** Étude de cas liée. Absente pour un projet montré sans nom (aucun lien). */
  slug?: string;
  ecrans: [Ecran, ...Ecran[]]; // le premier est l'écran principal
}

const L = 0.625; // 1024 x 640
export const PROJETS_SCENE: ProjetScene[] = [
  { id: 'batixpert', slug: 'inspection-batixpert', ecrans: [
    { src: 'batixpert', x: 0.55, y: 0.05, z: 0, ry: -0.26, w: 1.6, ar: L },
  ] },
  // Projet client montré SANS NOM (consigne de Patrick, 2026-11-11) : aucune
  // étude de cas, aucun lien, rien dans l'image ni dans le texte qui permette
  // de deviner le client.
  { id: 'sansnom', ecrans: [
    { src: 'projet-inspection', x: -0.55, y: 0, z: -4, ry: 0.26, w: 1.6, ar: L },
  ] },
  { id: 'beauregard', slug: 'inspection-beauregard', ecrans: [
    { src: 'beauregard', x: 0.55, y: -0.04, z: -8, ry: -0.26, w: 1.6, ar: L },
    { src: 'beauregard-mobile', x: -1.25, y: 0.3, z: -9.1, ry: 0.36, w: 0.44, ar: 1109 / 512 },
    { src: 'beauregard-thermo', x: 1.55, y: -0.78, z: -9.7, ry: -0.42, w: 1.05, ar: L },
  ] },
  { id: 'iho', slug: 'inspection-habitation-outaouais', ecrans: [
    { src: 'iho', x: -0.6, y: 0.08, z: -12, ry: 0.26, w: 1.6, ar: L },
    { src: 'iho-preachat', x: 1.4, y: 0.66, z: -13.4, ry: -0.4, w: 1.1, ar: L },
  ] },
  { id: 'envita', slug: 'envita-wellness', ecrans: [
    { src: 'envita', x: 0.5, y: 0, z: -16, ry: -0.22, w: 1.6, ar: L },
  ] },
  { id: 'hpaddik', slug: 'hp-addik', ecrans: [
    { src: 'hpaddik', x: -0.55, y: 0.04, z: -20, ry: 0.24, w: 1.6, ar: L },
  ] },
];

export const urlEcran = (e: Ecran, locale: Locale) => `/scene/${locale === 'en' && e.srcEn ? e.srcEn : e.src}.webp`;
