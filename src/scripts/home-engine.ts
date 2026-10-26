// Home-page motion, loaded on demand by home-motion.ts (never under reduced
// motion). Two things only:
//
//   · soft fade-ins for content still below the fold when this runs, from 0.6
//     opacity over 12px: nothing a visitor already sees ever disappears;
//   · the inspection scene (HouseScene.astro), pinned for one extra screen on
//     a desktop (heading included) and three quarters of one below 1024px
//     (drawing and text only, just under the header): the
//     house comes apart, then each layer is swept by the scan rule, traced
//     stroke by stroke, washed in plum, marked "Conforme" and tied to its
//     text by a leader line; the house closes and the "Inspecté" stamp lands.
//
// Setup runs in steps, each in its own gsap.matchMedia() handler with a yield
// in between: no long task, and every step reverts on its own if the visitor
// switches to reduced motion.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const MOTION = '(prefers-reduced-motion: no-preference)';
const DESKTOP = '(min-width: 1024px)';
const yieldToMain = () => new Promise((resolve) => setTimeout(resolve, 0));
// Resolved from the theme at run time: GSAP interpolates colours, not var().
const token = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

function smoothScroll() {
  // Wheel only: touch keeps native scrolling.
  const lenis = new Lenis({ autoRaf: false, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  const raf = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(raf);
    lenis.destroy();
  };
}

// Measured before the pin exists (its spacer would push everything down), and
// wired after it, so the batch triggers are created below the pin in page
// order and see the final layout.
let below: HTMLElement[] = [];

function hideBelowFold() {
  below = [...document.querySelectorAll<HTMLElement>('[data-reveal]')].filter(
    (el) => el.getBoundingClientRect().top > window.innerHeight,
  );
  // Opacity only (not visibility): a faded heading stays in the accessibility
  // tree, so the outline is the same before and after it fades in.
  if (below.length) gsap.set(below, { opacity: 0.6, y: 12 });
}

function fades() {
  if (!below.length) return;
  ScrollTrigger.batch(below, {
    start: 'top 90%',
    once: true,
    onEnter: (els) =>
      gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', stagger: 0.08, overwrite: true }),
  });
}

// ---- The scene ------------------------------------------------------------------
// Travel of the exploded view, in viewBox units.
const EXPLODE = 50;

let scene: ReturnType<typeof prepareScene> = null;

function prepareScene() {
  const el = document.querySelector<HTMLElement>('[data-scene]');
  if (!el) return null;
  el.classList.add('is-live');
  const svg = el.querySelector<SVGSVGElement>('[data-house]')!;
  const body = el.querySelector<SVGGElement>('[data-house-body]')!;
  const layers = [...el.querySelectorAll<SVGGElement>('.house__layer')];
  const traces = layers.map((l) => [...l.querySelectorAll<SVGPathElement>('[data-trace] path')]);
  const fills = layers.map((l) => l.querySelector<SVGPathElement>('[data-fill]')!);
  const tags = layers.map((l) => l.querySelector<SVGGElement>('[data-tag]')!);
  const leaders = layers.map((l) => l.querySelector<SVGPathElement>('[data-leader]')!);
  const anchors = layers.map((l) => l.querySelector<SVGCircleElement>('[data-anchor]')!);
  const spans = layers.map((l) => l.dataset.span!.split(' ').map(Number) as [number, number]);
  const scan = el.querySelector<SVGGElement>('[data-scan]')!;
  const stamp = el.querySelector<SVGGElement>('[data-stamp]')!;
  const notes = [...el.querySelectorAll<HTMLElement>('[data-note]')];
  const notesBox = el.querySelector<HTMLElement>('.scene__notes')!;
  const head = el.firstElementChild as HTMLElement;

  const ends = anchors.map((a) => [Number(a.getAttribute('cx')), Number(a.getAttribute('cy'))]);
  // Each layer's offset in the exploded view, when its note is shown.
  const shift = layers.map((_, i) => (i === 0 ? -EXPLODE : i === layers.length - 1 ? EXPLODE : 0));

  // Re-measured on every refresh. The heading's height caps the drawing, so
  // both fit one screen; the notes box keeps the tallest note's height, since
  // the notes are stacked. On a desktop each note's label sits on its leader
  // line; a note that would run past the bottom of the scene (the bottom of
  // the screen, once pinned) moves up, and its leader bends to meet it.
  const place = () => {
    el.style.setProperty('--head-h', `${head.offsetHeight}px`);
    el.style.setProperty('--notes-h', `${Math.max(...notes.map((n) => n.offsetHeight))}px`);
    const d = svg.getBoundingClientRect();
    const n = notesBox.getBoundingClientRect();
    const drawTop = d.top - n.top;
    const floor = el.getBoundingClientRect().bottom - parseFloat(getComputedStyle(el).paddingBottom) - n.top;
    const scale = d.height / 560;
    el.style.setProperty('--draw-h', `${d.height}px`);
    el.style.setProperty('--draw-top', `${drawTop}px`);
    const desktop = window.matchMedia(DESKTOP).matches;
    notes.forEach((note, i) => {
      const [x, y] = ends[i];
      if (!desktop) {
        note.style.removeProperty('top');
        leaders[i].setAttribute('d', `M${x} ${y} H1000`);
        return;
      }
      const name = note.querySelector<HTMLElement>('.note__name')!;
      const mid = name.offsetTop + name.offsetHeight / 2;
      const line = drawTop + (y + shift[i]) * scale;
      const top = Math.max(0, Math.min(line - mid, floor - note.offsetHeight));
      note.style.top = `${top}px`;
      const meet = Math.round(((top + mid - drawTop) / scale - shift[i]) * 10) / 10;
      leaders[i].setAttribute('d', Math.abs(meet - y) < 1 ? `M${x} ${y} H1000` : `M${x} ${y} H950 V${meet} H1000`);
    });
  };
  // Placed before the triggers re-measure, so the leader tweens pick up
  // the new path lengths, and again once the layout has settled.
  ScrollTrigger.addEventListener('refreshInit', place);
  ScrollTrigger.addEventListener('refresh', place);
  place();

  gsap.set(traces.flat(), { drawSVG: '0%', stroke: token('--signal') });
  gsap.set(fills, { opacity: 0.12 });
  gsap.set([...tags, ...anchors], { autoAlpha: 0 });
  gsap.set(leaders, { drawSVG: '0%' });
  gsap.set(scan, { autoAlpha: 0, y: spans[0][0] });
  gsap.set(stamp, { autoAlpha: 0, scale: 1.6, transformOrigin: '50% 50%' });
  gsap.set(notes, { autoAlpha: 0, y: 12 });
  return { el, svg, body, layers, traces, fills, tags, leaders, anchors, spans, scan, stamp, notes };
}

function sceneSetup() {
  scene = prepareScene();
  return () => {
    scene?.el.classList.remove('is-live');
    scene = null;
  };
}

function sceneTimeline() {
  if (!scene) return;
  const { el, body, layers, traces, fills, tags, leaders, anchors, spans, scan, stamp, notes } = scene;
  const done = token('--bone');
  const last = layers.length - 1;
  const desktop = window.matchMedia(DESKTOP).matches;

  // Desktop: the whole scene, heading included, pinned at the top (its own
  // padding clears the header). Below 1024px: only the drawing and its text,
  // pinned just under the header, so the heading never slides beneath it; if
  // they are taller than the room left, they pin by their bottom instead.
  const stage = el.querySelector<HTMLElement>('.scene__stage')!;
  const target = desktop ? el : stage;
  const below = () => (document.getElementById('site-nav')?.offsetHeight ?? 72) + 16;
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: target,
      start: () =>
        desktop
          ? `top+=${Math.max(0, el.offsetHeight - window.innerHeight)} top`
          : stage.offsetHeight > window.innerHeight - below()
            ? 'bottom bottom-=16'
            : `top ${below()}px`,
      // The scene is one screen; the pin adds 1 more on a desktop, 0.75 on a
      // phone: about a third of a screen per layer.
      end: () => `+=${window.innerHeight * (desktop ? 1 : 0.75)}`,
      pin: true,
      scrub: 0.6,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });

  // Open: the house grows a little and comes apart.
  // An absolute SVG origin, in both states: a transformOrigin set on the "to"
  // side alone makes GSAP compensate with a translate that outlives the scale.
  tl.fromTo(body, { scale: 0.94, svgOrigin: '500 300' }, { scale: 1, svgOrigin: '500 300', duration: 0.5, ease: 'power2.out' }, 0);
  tl.to(layers[0], { y: -EXPLODE, duration: 0.5, ease: 'power3.inOut' }, 0);
  tl.to(layers[last], { y: EXPLODE, duration: 0.5, ease: 'power3.inOut' }, 0);
  tl.set(scan, { autoAlpha: 1 }, 0.5);

  traces.forEach((paths, i) => {
    const at = 0.5 + i * 1.2;
    const [top, bottom] = spans[i];
    // The scan rule rides with its layer, so add that layer's explode offset.
    const off = i === 0 ? -EXPLODE : i === last ? EXPLODE : 0;
    if (i > 0) {
      tl.to(notes[i - 1], { autoAlpha: 0, y: -12, duration: 0.25 }, at);
      tl.to(traces[i - 1], { stroke: done, duration: 0.3 }, at);
      tl.to(fills[i - 1], { opacity: 0.4, duration: 0.3 }, at);
      tl.to([leaders[i - 1], anchors[i - 1]], { autoAlpha: 0, duration: 0.2 }, at);
    }
    tl.fromTo(scan, { y: top + off }, { y: bottom + off, duration: 0.9, ease: 'power1.inOut' }, at);
    tl.to(paths, { drawSVG: '100%', duration: 0.9, stagger: { each: 0.9 / (paths.length + 1) } }, at);
    tl.to(fills[i], { opacity: 1, duration: 0.4 }, at + 0.3);
    tl.to(anchors[i], { autoAlpha: 1, duration: 0.1 }, at + 0.25);
    tl.fromTo(leaders[i], { drawSVG: '0%' }, { drawSVG: '100%', autoAlpha: 1, duration: 0.3, immediateRender: false }, at + 0.25);
    tl.to(notes[i], { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' }, at + 0.35);
    tl.to(tags[i], { autoAlpha: 1, duration: 0.2 }, at + 0.85);
  });

  // Close: the last layer settles, the house comes back together, the stamp.
  const end = 0.5 + layers.length * 1.2;
  tl.set(scan, { autoAlpha: 0 }, end);
  tl.to(traces[last], { stroke: done, duration: 0.3 }, end);
  tl.to(fills, { opacity: 0.4, duration: 0.3 }, end);
  tl.to([leaders[last], anchors[last]], { autoAlpha: 0, duration: 0.2 }, end);
  tl.to([layers[0], layers[last]], { y: 0, duration: 0.5, ease: 'power3.inOut' }, end);
  tl.to(stamp, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, end + 0.4);
  tl.to({}, { duration: 0.2 });
}

export async function start() {
  await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]);
  const mm = gsap.matchMedia();
  for (const step of [smoothScroll, hideBelowFold, sceneSetup, sceneTimeline, fades]) {
    mm.add(MOTION, step);
    await yieldToMain();
  }
}
