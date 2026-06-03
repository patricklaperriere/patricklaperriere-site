// Real client reviews from the Google Business Profile
// (Patrick Laperriere Web Design & Development). Only the publicly
// visible review text is quoted — never invented or extended.

export interface Temoignage {
  author: string;
  rating: number;
  lang: 'fr' | 'en';
  /** Visible review text, verbatim. */
  text: string;
  /** Optional related case study slug, for context. */
  project?: string;
}

export const temoignages: Temoignage[] = [
  {
    author: 'Chrissy Papageorgopoulos',
    rating: 5,
    lang: 'en',
    text: 'Patrick is awesome! He\'s quick, efficient, detail-oriented, and seems to know what you need before you do.',
    project: 'envita-wellness',
  },
  {
    author: 'Alexia Angiolillo',
    rating: 5,
    lang: 'en',
    text: 'I had a great experience. The service was very professional and efficient, and everything was handled smoothly.',
  },
  {
    author: 'G. James',
    rating: 5,
    lang: 'fr',
    text: 'Je recommande à 100%.',
  },
];

/** Aggregate over the displayed reviews (kept honest: matches what's shown). */
export const reviewAggregate = {
  ratingValue: (
    temoignages.reduce((s, t) => s + t.rating, 0) / temoignages.length
  ).toFixed(1),
  reviewCount: temoignages.length,
  bestRating: 5,
  worstRating: 1,
};
