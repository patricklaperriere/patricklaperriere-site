// Timeline of the Habita showcase (components/work/HabitaShowcase.astro).
// Counters use data-hs-count, not data-count: ux.ts animates every [data-count].
//
// One clock, one render: `render(t)` sets every element from the time alone,
// so jumping to a beat, pausing or replaying is just a matter of moving `t`.
// The HTML ships in the finished state of beat b, which is also what
// prefers-reduced-motion and no-JS visitors see; the script only animates.
//
// Plays only while at least 35 % on screen, and pauses when the tab is
// hidden, on hover and while focus is inside the figure. Below 640 px only
// beat a plays, as a 6 s loop.

type Beat = 'a' | 'b' | 'c';

const BEATS: Record<Beat, { start: number; end: number }> = {
  a: { start: 0, end: 6 },
  b: { start: 6, end: 13 },
  c: { start: 13, end: 18 },
};
// Beat a: photo i slides in at PHOTO_AT + i * PHOTO_STEP seconds.
const PHOTO_AT = 0.4;
const PHOTO_STEP = 0.6;
// Beat b (local seconds): the three fields type in turn, then the badge flips.
const TYPE = [
  [0.6, 2.4],
  [2.6, 4.0],
  [4.2, 5.6],
] as const;
const BADGE_AT = 6.0;
// Beat c (local seconds): the three portal steps, then the end screen.
const STEP_AT = [0.8, 1.6, 2.4];
const END_AT = 3.2;

export function initHabitaShowcase(root: HTMLElement): void {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const phone = window.matchMedia('(max-width: 639px)');

  const photos = [...root.querySelectorAll<HTMLElement>('[data-photo]')];
  const counts = new Map([...root.querySelectorAll<HTMLElement>('[data-hs-count]')].map((el) => [el.dataset.hsCount!, el]));
  const typed = [...root.querySelectorAll<HTMLElement>('[data-type]')];
  const badge = root.querySelector<HTMLElement>('[data-badge]');
  const steps = [...root.querySelectorAll<HTMLElement>('[data-step]')];
  const end = root.querySelector<HTMLElement>('[data-end]');
  const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-go]')];
  const replay = root.querySelector<HTMLButtonElement>('[data-replay]');

  const total = () => (phone.matches ? BEATS.a.end : BEATS.c.end);
  const beatAt = (t: number): Beat => (t < BEATS.a.end ? 'a' : t < BEATS.b.end ? 'b' : 'c');

  function render(t: number): void {
    const beat = beatAt(t);
    root.dataset.scene = beat;
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.go === beat)));

    // a. Photos and per-column counters.
    const shown = beat === 'a' ? Math.max(0, Math.floor((t - PHOTO_AT) / PHOTO_STEP) + 1) : photos.length;
    const perCol = new Map<string, number>();
    for (const p of photos) {
      const on = Number(p.dataset.photo) < shown;
      p.classList.toggle('is-in', on);
      if (on) perCol.set(p.dataset.col!, (perCol.get(p.dataset.col!) ?? 0) + 1);
    }
    counts.forEach((el, key) => (el.textContent = String(perCol.get(key) ?? 0)));

    // b. Typing, then the badge.
    const lb = beat === 'a' ? 0 : t - BEATS.b.start;
    typed.forEach((el, i) => {
      const full = el.dataset.type!;
      const [from, to] = TYPE[i];
      const k = beat === 'b' ? Math.min(1, Math.max(0, (lb - from) / (to - from))) : 1;
      el.textContent = full.slice(0, Math.round(full.length * k));
      el.classList.toggle('hs__typing', beat === 'b' && k > 0 && k < 1);
    });
    if (badge) {
      const ok = beat !== 'b' || lb >= BADGE_AT;
      badge.classList.toggle('is-ok', ok);
      badge.textContent = ok ? badge.dataset.ok! : badge.dataset.review!;
    }

    // c. Portal steps, then the end screen.
    const lc = beat === 'c' ? t - BEATS.c.start : -1;
    steps.forEach((s, i) => s.classList.toggle('is-done', beat !== 'c' || lc >= STEP_AT[i]));
    end?.classList.toggle('is-on', beat === 'c' && lc >= END_AT);
  }

  // Reduced motion: beat b, finished and still; the step buttons switch
  // between finished beats without animating.
  let t = BEATS.b.end - 0.01;
  if (reduce.matches) {
    render(t);
    buttons.forEach((b) =>
      b.addEventListener('click', () => {
        const beat = b.dataset.go as Beat;
        render(beat === 'c' ? BEATS.c.start + END_AT - 0.01 : BEATS[beat].end - 0.01);
      }),
    );
    return;
  }

  let visible = false;
  let hovered = false;
  let focused = false;
  // Set by an explicit step or Replay click: plays despite hover and focus
  // (the click itself hovers and focuses), until the pointer and focus leave.
  let asked = false;
  let last = 0;
  let raf = 0;

  const playing = () =>
    visible && document.visibilityState === 'visible' && (asked || (!hovered && !focused));

  function frame(now: number): void {
    if (last) t = (t + (now - last) / 1000) % total();
    last = now;
    render(t);
    raf = playing() ? requestAnimationFrame(frame) : 0;
    if (!raf) last = 0;
  }
  function update(): void {
    if (playing() && !raf) raf = requestAnimationFrame(frame);
  }

  t = 0;
  render(t);

  new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      update();
    },
    { threshold: 0.35 },
  ).observe(root);
  document.addEventListener('visibilitychange', update);
  // On the lead card the stretched link covers the frame, so the pointer is
  // tracked on the whole card ([data-showcase-host]), not on the figure.
  const hoverZone = root.closest<HTMLElement>('[data-showcase-host]') ?? root;
  hoverZone.addEventListener('mouseenter', () => { hovered = true; });
  hoverZone.addEventListener('mouseleave', () => { hovered = false; if (!focused) asked = false; update(); });
  root.addEventListener('focusin', () => { focused = true; });
  root.addEventListener('focusout', (e) => {
    if (!root.contains(e.relatedTarget as Node)) { focused = false; if (!hovered) asked = false; update(); }
  });

  // A step or Replay plays from that point even while hovered or focused.
  const jump = (to: number) => {
    t = to;
    asked = true;
    render(t);
    update();
  };
  buttons.forEach((b) => b.addEventListener('click', () => jump(BEATS[b.dataset.go as Beat].start)));
  replay?.addEventListener('click', () => jump(0));
  phone.addEventListener('change', () => {
    t = 0;
    render(t);
  });
}
