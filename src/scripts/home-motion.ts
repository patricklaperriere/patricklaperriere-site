// Loader for the home page's scroll moments. Under prefers-reduced-motion it
// does nothing at all: GSAP is never downloaded and the page stays as written.
// Otherwise the engine (GSAP, ScrollTrigger, SplitText, DrawSVG, Lenis) is
// fetched on the visitor's first interaction, or once the page has settled and
// the main thread is idle. Everything it animates sits below the hero.
if (matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  const events = ['scroll', 'wheel', 'touchstart', 'pointerdown', 'keydown'] as const;
  let started = false;
  const go = () => {
    if (started) return;
    started = true;
    events.forEach((e) => removeEventListener(e, go));
    import('./home-engine').then((m) => m.start());
  };
  events.forEach((e) => addEventListener(e, go, { passive: true, once: true }));
  addEventListener(
    'load',
    () =>
      setTimeout(() => {
        if ('requestIdleCallback' in window) requestIdleCallback(go, { timeout: 2000 });
        else go();
      }, 2500),
    { once: true },
  );
}
