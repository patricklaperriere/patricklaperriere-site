// Loop video of the real Habita UI, used by the home-page spotlight and by the
// Habita case study. One source of truth so the two can never drift apart.
//
// While any of the three paths is null, both call sites fall back to the static
// mockup — nothing to remove, just fill the paths in and the <video> takes over.
//
//   webm   → VP9 or AV1, no audio track
//   mp4    → H.264 High, yuv420p, faststart
//   poster → first frame, same dimensions
//
// Budget: 3 MB for the pair. 10-20 s loop, no burned-in text (the copy beside
// it is the message, and it has to stay translatable).
export const HABITA_LOOP = {
  webm: '/work/habita-loop.webm' as string | null,
  mp4: '/work/habita-loop.mp4' as string | null,
  poster: '/work/habita-loop.webp' as string | null,
  /** Intrinsic size — drives width/height so the box reserves space (CLS 0). */
  width: 1280,
  height: 800,
} as const;
