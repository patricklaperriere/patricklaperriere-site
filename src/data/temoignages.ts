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

/** Number of reviews on the Google Business Profile (checked by Patrick, 2026-11-07). */
export const GOOGLE_REVIEW_COUNT = 4;

/** Aggregate over the displayed reviews (kept honest: matches what's shown). */
export const reviewAggregate = {
  ratingValue: (
    temoignages.reduce((s, t) => s + t.rating, 0) / temoignages.length
  ).toFixed(1),
  // Total on the Google Business Profile, not the number quoted above
  // (only 2 texts are on file). Source: Patrick, 2026-11-07: 4 reviews.
  reviewCount: GOOGLE_REVIEW_COUNT,
  bestRating: 5,
  worstRating: 1,
};
