// Progressive-enhancement UX layer, loaded as a module <script> from Layout.
//
// Everything here is non-essential: the page is fully readable and the LCP has
// already painted before any of this runs. Every effect bails out under
// prefers-reduced-motion.
//
// Deliberately NOT here any more, and why:
//   · card tilt / magnetic buttons / text scramble — 2023 portfolio tics that
//     fight the pointer and add nothing to comprehension;
//   · cursor-following spotlight — decorative repaint on every pointermove;
//   · Lenis smooth scroll — it hijacked the wheel, which is an accessibility
//     liability, and native `scroll-behavior: smooth` already covers anchors.
// Removing them dropped the client bundle and the main-thread work with it.

const reduceMotion =
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

/* ---- Scroll reveals --------------------------------------------------------
   One observer drives all three reveal flavours (.reveal, .reveal-mask,
   .reveal-clip) — they differ only in CSS. Elements unobserve after firing,
   so nothing stays subscribed for the life of the page. */
function initReveals() {
  const els = document.querySelectorAll<HTMLElement>('.reveal, .reveal-mask, .reveal-clip');
  if (!els.length) return;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }

  // A .reveal-clip starts at `clip-path: inset(0 0 100% 0)`. Chromium measures
  // intersection AFTER the element's own clip-path, so a fully clipped target
  // never reports as visible and never reveals (and the Habita video inside it
  // never starts). We therefore watch its parent, which is not clipped, and
  // reveal the clip element when the parent enters the viewport.
  // One watched element can stand for several reveals (a parent with two clip
  // children, or a parent that is itself a .reveal), hence a list.
  const targetsOf = new Map<Element, HTMLElement[]>();

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        for (const el of targetsOf.get(e.target) ?? []) {
          const delay = el.dataset.delay;
          if (delay) el.style.transitionDelay = delay;
          el.classList.add('is-in');
        }
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );

  els.forEach((el) => {
    const watched =
      el.classList.contains('reveal-clip') && el.parentElement ? el.parentElement : el;
    const list = targetsOf.get(watched);
    if (list) list.push(el);
    else targetsOf.set(watched, [el]);
    io.observe(watched);
  });
}

/* ---- Count-up numbers ------------------------------------------------------
   Used by the performance benchmark. The final value is always written to the
   DOM, so a bailout renders the real number rather than a zero. */
function initCounters() {
  const els = document.querySelectorAll<HTMLElement>('[data-count]');
  if (!els.length) return;

  const settle = (el: HTMLElement) => {
    el.textContent = (el.dataset.count ?? '') + (el.dataset.suffix ?? '');
  };

  if (reduceMotion || !('IntersectionObserver' in window)) {
    els.forEach(settle);
    return;
  }

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const el = e.target as HTMLElement;
      io.unobserve(el);
      const target = Number(el.dataset.count ?? 0);
      const suffix = el.dataset.suffix ?? '';
      const dur = 900;
      let start = 0;
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        // easeOutExpo — lands softly instead of stopping dead.
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        el.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else settle(el);
      };
      requestAnimationFrame(step);
    }
  });

  els.forEach((el) => io.observe(el));
}

/* ---- Habita loop video -----------------------------------------------------
   The video never starts on load: it waits until the frame is nearly in view,
   so it cannot compete with the hero for bandwidth or become the LCP. It then
   plays while visible and pauses off screen, which also spares the CPU.

   It plays even under prefers-reduced-motion. That setting is what stopped it
   for real visitors: Windows turns it on for everyone who disables "Animation
   effects", so Chrome on Windows often reports `reduce` without the visitor
   ever asking for it. The loop is a muted, slow product demo, not a parallax
   effect, and the pause button stays reachable while it plays (WCAG 2.2.2),
   so a visitor who wants it still can stop it. Once they do, it stays paused.
   `autoplay` is still absent from the markup so that playback starts from
   here, in view, rather than on load. */
function initHabitaVideo() {
  const wrap = document.querySelector<HTMLElement>('[data-habita-video]');
  if (!wrap) return;
  const video = wrap.querySelector('video');
  if (!video) return;
  const btn = wrap.querySelector<HTMLButtonElement>('[data-habita-play]');

  // Belt and braces for autoplay policies: the attribute alone sets
  // defaultMuted, and some builds only honour the property at play() time.
  video.muted = true;

  let userPaused = false;

  const sync = () => {
    wrap.classList.toggle('is-playing', !video.paused);
    if (!btn) return;
    const label = video.paused ? btn.dataset.labelPlay : btn.dataset.labelPause;
    if (label) btn.setAttribute('aria-label', label);
  };

  // play() rejects when the browser blocks it (data saver, battery saver) or
  // when no source can be decoded. Swallow it: the poster and the button are
  // still there, so we degrade to click-to-play instead of throwing.
  const play = () => video.play().then(sync).catch(() => sync());

  video.addEventListener('play', sync);
  video.addEventListener('pause', sync);

  btn?.addEventListener('click', () => {
    if (video.paused) {
      userPaused = false;
      play();
    } else {
      userPaused = true;
      video.pause();
    }
  });

  if (!('IntersectionObserver' in window)) {
    play();
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          if (!userPaused) play();
        } else if (!video.paused) {
          video.pause();
        }
      }
    },
    // threshold 0: the frame sits inside a .reveal-clip whose clip-path is
    // still opening when it scrolls in, so a higher ratio could be reached
    // late or, on a short viewport, not at all.
    { rootMargin: '100px 0px', threshold: 0 },
  );
  io.observe(wrap);
}

/* ---- Boot ---------------------------------------------------------------- */
initReveals();
initCounters();
initHabitaVideo();
