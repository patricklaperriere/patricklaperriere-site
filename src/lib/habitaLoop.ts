// Loop video of the real Habita UI, used by the home page and by the Habita
// case study (see components/HabitaLoop.astro). One source of truth so the two
// can never drift apart.
//
//   webm   → VP9 or AV1, no audio track
//   mp4    → H.264 High, yuv420p, faststart
//
// Budget: 3 MB for the pair. 10-20 s loop, no burned-in text.
export const HABITA_LOOP = {
  webm: '/work/habita-loop.webm',
  mp4: '/work/habita-loop.mp4',
  /** First frame of the loop, same dimensions. */
  poster: '/work/habita-loop.webp',
  /** Intrinsic size — drives width/height so the box reserves space (CLS 0). */
  width: 1280,
  height: 800,
} as const;
