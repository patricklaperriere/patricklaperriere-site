// Progressive-enhancement UX layer. Loaded as a module <script> in the Layout.
// Everything here is non-essential: the page is fully usable (and LCP paints)
// before any of this runs. All effects bail out under prefers-reduced-motion.

const reduceMotion =
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
const isTouch = window.matchMedia?.('(pointer: coarse)').matches ?? false;

/* ---- Scroll reveals (IntersectionObserver) ---------------- */
function initReveals() {
  const els = document.querySelectorAll<HTMLElement>('.reveal');
  if (!els.length) return;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.transitionDelay =
            (e.target as HTMLElement).dataset.delay ?? '0ms';
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
  );
  els.forEach((el) => io.observe(el));
}

/* ---- Gold spotlight follows the cursor -------------------- */
function initSpotlight() {
  if (reduceMotion || isTouch) return;
  const spot = document.getElementById('spotlight');
  if (!spot) return;
  let raf = 0;
  window.addEventListener('pointermove', (e) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      spot.style.setProperty('--mx', e.clientX + 'px');
      spot.style.setProperty('--my', e.clientY + 'px');
      raf = 0;
    });
  });
}

/* ---- Magnetic elements ------------------------------------ */
function initMagnetic() {
  if (reduceMotion || isTouch) return;
  document.querySelectorAll<HTMLElement>('.magnetic').forEach((el) => {
    const strength = Number(el.dataset.magnetic ?? 0.3);
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${mx * strength}px, ${my * strength}px)`;
    });
    el.addEventListener('pointerleave', () => {
      el.style.transform = '';
    });
  });
}

/* ---- Card tilt / parallax --------------------------------- */
function initTilt() {
  if (reduceMotion || isTouch) return;
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    // On enter: snappy transition with NO delay. This overrides the inline
    // transition-delay the scroll-reveal left behind (per-card stagger),
    // which otherwise makes later cards lag and feel unresponsive.
    el.addEventListener('pointerenter', () => {
      el.style.transition = 'transform 0.12s ease-out';
      el.style.transitionDelay = '0ms';
    });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg) translateY(-6px)`;
    });
    el.addEventListener('pointerleave', () => {
      // Smooth ease back to flat.
      el.style.transition = 'transform 0.5s cubic-bezier(.2,.8,.2,1)';
      el.style.transform = '';
    });
  });
}

/* ---- Text scramble on hover ------------------------------- */
// Scrambles the text of each [data-scramble-word] inside a [data-scramble]
// trigger WITHOUT destroying the elements — so per-word styling (the gold last
// word) and the spacing between words are preserved across the animation.
function initScramble() {
  if (reduceMotion) return;
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&/<>*';
  document.querySelectorAll<HTMLElement>('[data-scramble]').forEach((root) => {
    const found = root.querySelectorAll<HTMLElement>('[data-scramble-word]');
    const items = found.length ? Array.from(found) : [root];
    let running = false;

    const run = () => {
      if (running) return;
      running = true;
      const states = items.map((el) => ({ el, text: el.textContent ?? '' }));
      const total = 26; // higher = letters lock in more gradually
      const speed = 0.45; // frames advanced per tick (lower = slower decode)
      let frame = 0;

      const tick = () => {
        for (const { el, text } of states) {
          let out = '';
          for (let i = 0; i < text.length; i++) {
            const c = text[i];
            if (c === ' ') {
              out += ' ';
              continue;
            }
            const reveal = (i / text.length) * total;
            out += frame > reveal ? c : chars[Math.floor(frame * 7 + i * 13) % chars.length];
          }
          el.textContent = out;
        }
        frame += speed;
        if (frame <= total + 3) {
          requestAnimationFrame(tick);
        } else {
          for (const { el, text } of states) el.textContent = text;
          running = false;
        }
      };
      requestAnimationFrame(tick);
    };

    root.addEventListener('pointerenter', run);
  });
}

/* ---- Count-up numbers ------------------------------------- */
function initCounters() {
  const els = document.querySelectorAll<HTMLElement>('[data-count]');
  if (!els.length) return;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    els.forEach((el) => (el.textContent = el.dataset.count ?? ''));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const el = e.target as HTMLElement;
      const target = Number(el.dataset.count ?? 0);
      const suffix = el.dataset.suffix ?? '';
      const dur = 1200;
      let start = 0;
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        el.textContent = Math.floor(p * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      io.unobserve(el);
    }
  });
  els.forEach((el) => io.observe(el));
}

/* ---- Habita loop video (below the fold) ------------------- */
// The video never starts on load: it waits until the section is nearly in
// view, so it can't compete with the hero for bandwidth or become the LCP.
// Under prefers-reduced-motion nothing autoplays at all — the poster stays up
// and the play button is the only way in. That is also why `autoplay` is not
// in the markup: an attribute would start playing before this code could
// decide otherwise.
function initHabitaVideo() {
  const wrap = document.querySelector<HTMLElement>('[data-habita-video]');
  if (!wrap) return;
  const video = wrap.querySelector('video');
  if (!video) return;
  const btn = wrap.querySelector<HTMLButtonElement>('[data-habita-play]');

  const sync = () => {
    wrap.classList.toggle('is-playing', !video.paused);
    if (!btn) return;
    const label = video.paused ? btn.dataset.labelPlay : btn.dataset.labelPause;
    if (label) btn.setAttribute('aria-label', label);
  };

  // play() rejects when the browser blocks it (low power mode, data saver).
  // Swallow it: the poster and the button are still there, so we degrade to
  // click-to-play instead of throwing.
  const play = () => video.play().then(sync).catch(() => sync());

  video.addEventListener('play', sync);
  video.addEventListener('pause', sync);

  btn?.addEventListener('click', () => {
    if (video.paused) play();
    else video.pause();
  });

  if (reduceMotion || !('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        play();
        io.unobserve(e.target);
      }
    },
    { rootMargin: '200px 0px', threshold: 0.25 },
  );
  io.observe(wrap);
}

/* ---- Lenis smooth scroll (lazy-loaded) -------------------- */
async function initLenis() {
  if (reduceMotion || isTouch) return;
  try {
    const { default: Lenis } = await import('lenis');
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  } catch {
    /* smooth scroll is optional */
  }
}

/* ---- Boot ------------------------------------------------- */
function boot() {
  initReveals();
  initSpotlight();
  initMagnetic();
  initTilt();
  initScramble();
  initCounters();
  initHabitaVideo();
}

// Reveals/counters should run ASAP; defer the heavier cosmetic bits to idle.
boot();
if ('requestIdleCallback' in window) {
  (window as any).requestIdleCallback(initLenis);
} else {
  setTimeout(initLenis, 600);
}
