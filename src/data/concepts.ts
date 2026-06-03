// "Concepts" showcase — fictional brand concepts across industries, each
// rendered as a fully CSS-built device mockup in ConceptsContent.astro.
// 4 mobile apps + 4 desktop sites. These are demos of look & feel, not
// real products. Photos are from Unsplash (free commercial license).

import type { Locale } from '../i18n/routes';

export type Device = 'phone' | 'browser';

export interface Concept {
  id: string;
  brand: string;
  device: Device;
  accent: string;
  industry: { fr: string; en: string };
  tagline: { fr: string; en: string };
  /** Short feature tags shown under the mockup. */
  tags: { fr: string[]; en: string[] };
}

export const concepts: Concept[] = [
  // ---------- Mobile apps ----------
  {
    id: 'barber',
    brand: 'FADE',
    device: 'phone',
    accent: '#e8b04a',
    industry: { fr: 'Barbier', en: 'Barbershop' },
    tagline: {
      fr: 'Réservation en trois taps, choix du barbier et rappels automatiques. La file d’attente, c’est fini.',
      en: 'Booking in three taps, barber selection and automatic reminders. No more waiting line.',
    },
    tags: { fr: ['Réservation', 'Rappels SMS', 'Fidélité'], en: ['Booking', 'SMS reminders', 'Loyalty'] },
  },
  {
    id: 'fitness',
    brand: 'PULSE',
    device: 'phone',
    accent: '#b8ff3c',
    industry: { fr: 'Gym et coaching', en: 'Gym & coaching' },
    tagline: {
      fr: 'Suivi des entraînements, séries de progrès et réservation de cours en direct, pour garder les membres motivés.',
      en: 'Workout tracking, progress streaks and live class booking that keeps members coming back.',
    },
    tags: { fr: ['Suivi', 'Cours en direct', 'Objectifs'], en: ['Tracking', 'Live classes', 'Goals'] },
  },
  {
    id: 'cafe',
    brand: 'Grain',
    device: 'phone',
    accent: '#c98a4b',
    industry: { fr: 'Café', en: 'Coffee shop' },
    tagline: {
      fr: 'Carte de fidélité numérique et commande à l’avance pour sauter la file du matin.',
      en: 'Digital loyalty card and order-ahead to skip the morning line.',
    },
    tags: { fr: ['Fidélité', 'Commande', 'Paiement'], en: ['Loyalty', 'Order-ahead', 'Payments'] },
  },
  {
    id: 'tattoo',
    brand: 'Encre',
    device: 'phone',
    accent: '#ff4d5e',
    industry: { fr: 'Studio de tatouage', en: 'Tattoo studio' },
    tagline: {
      fr: 'Portfolio par artiste, dépôt de référence et prise de rendez-vous, du premier flash au cover-up.',
      en: 'Portfolio by artist, reference upload and booking, from first flash to cover-up.',
    },
    tags: { fr: ['Portfolio', 'Devis', 'Rendez-vous'], en: ['Portfolio', 'Quotes', 'Booking'] },
  },

  // ---------- Desktop sites ----------
  {
    id: 'resto',
    brand: 'Brassé',
    device: 'browser',
    accent: '#e07a5f',
    industry: { fr: 'Restaurant', en: 'Restaurant' },
    tagline: {
      fr: 'Un menu qui donne faim, des photos appétissantes et la réservation de table sans friction.',
      en: 'A menu that makes you hungry, mouthwatering photos and frictionless table booking.',
    },
    tags: { fr: ['Menu', 'Réservation', 'Local SEO'], en: ['Menu', 'Reservations', 'Local SEO'] },
  },
  {
    id: 'immobilier',
    brand: 'Domaine',
    device: 'browser',
    accent: '#5b8def',
    industry: { fr: 'Immobilier', en: 'Real estate' },
    tagline: {
      fr: 'Fiches de propriété élégantes, recherche rapide, galerie photo et visites guidées en ligne.',
      en: 'Elegant property listings, fast search, photo galleries and guided online tours.',
    },
    tags: { fr: ['Fiches', 'Recherche', 'Galerie'], en: ['Listings', 'Search', 'Gallery'] },
  },
  {
    id: 'clinique',
    brand: 'Émail',
    device: 'browser',
    accent: '#2bc4b4',
    industry: { fr: 'Clinique dentaire', en: 'Dental clinic' },
    tagline: {
      fr: 'Rassurant, clair et professionnel, avec prise de rendez-vous en ligne en quelques secondes.',
      en: 'Reassuring, clear and professional, with online booking done in seconds.',
    },
    tags: { fr: ['Rendez-vous', 'Équipe', 'Confiance'], en: ['Booking', 'Team', 'Trust'] },
  },
  {
    id: 'ecom',
    brand: 'Maille',
    device: 'browser',
    accent: '#cf8aa0',
    industry: { fr: 'Boutique en ligne', en: 'Online store' },
    tagline: {
      fr: 'Boutique Shopify sur mesure : fiches produits soignées, panier rapide et tunnel d’achat optimisé.',
      en: 'Custom Shopify store: polished product pages, a fast cart and an optimized checkout.',
    },
    tags: { fr: ['Shopify', 'Panier', 'Conversion'], en: ['Shopify', 'Cart', 'Conversion'] },
  },
];

export const phoneConcepts = concepts.filter((c) => c.device === 'phone');
export const browserConcepts = concepts.filter((c) => c.device === 'browser');

export function loc(field: { fr: string; en: string }, locale: Locale): string {
  return field[locale];
}
