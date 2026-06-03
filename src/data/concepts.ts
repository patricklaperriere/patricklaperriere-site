// "Concepts" showcase — fictional brand concepts across industries, each
// rendered as a fully CSS-built device mockup in ConceptsContent.astro.
// These are demos of look & feel, not real products.

import type { Locale } from '../i18n/routes';

export type Device = 'phone' | 'browser';

export interface Concept {
  id: string;
  /** Fictional brand name shown on the mockup. */
  brand: string;
  device: Device;
  /** Accent hex driving the mockup palette. */
  accent: string;
  industry: { fr: string; en: string };
  tagline: { fr: string; en: string };
}

export const concepts: Concept[] = [
  {
    id: 'barber',
    brand: 'FADE',
    device: 'phone',
    accent: '#e8b04a',
    industry: { fr: 'Barbier', en: 'Barbershop' },
    tagline: {
      fr: 'Réservation en trois taps. Choisis ton barbier, ton heure, c’est réglé.',
      en: 'Booking in three taps. Pick your barber, your time, done.',
    },
  },
  {
    id: 'fitness',
    brand: 'PULSE',
    device: 'phone',
    accent: '#b8ff3c',
    industry: { fr: 'Gym et coaching', en: 'Gym & coaching' },
    tagline: {
      fr: 'Suivi des entraînements, séries de progrès et réservation de cours.',
      en: 'Workout tracking, progress streaks and class booking.',
    },
  },
  {
    id: 'resto',
    brand: 'Brassé',
    device: 'browser',
    accent: '#e07a5f',
    industry: { fr: 'Restaurant', en: 'Restaurant' },
    tagline: {
      fr: 'Menu qui donne faim et réservation de table sans friction.',
      en: 'A menu that makes you hungry and frictionless table booking.',
    },
  },
  {
    id: 'immobilier',
    brand: 'Domaine',
    device: 'browser',
    accent: '#5b8def',
    industry: { fr: 'Immobilier', en: 'Real estate' },
    tagline: {
      fr: 'Fiches de propriété élégantes, recherche rapide et visites guidées.',
      en: 'Elegant property listings, fast search and guided tours.',
    },
  },
  {
    id: 'clinique',
    brand: 'Émail',
    device: 'browser',
    accent: '#2bc4b4',
    industry: { fr: 'Clinique dentaire', en: 'Dental clinic' },
    tagline: {
      fr: 'Rassurant, clair et prise de rendez-vous en ligne en quelques secondes.',
      en: 'Reassuring, clear, with online booking in seconds.',
    },
  },
  {
    id: 'cafe',
    brand: 'Grain',
    device: 'phone',
    accent: '#c98a4b',
    industry: { fr: 'Café', en: 'Coffee shop' },
    tagline: {
      fr: 'Carte de fidélité numérique et commande à l’avance pour sauter la file.',
      en: 'Digital loyalty card and order-ahead to skip the line.',
    },
  },
];

export function loc(field: { fr: string; en: string }, locale: Locale): string {
  return field[locale];
}
