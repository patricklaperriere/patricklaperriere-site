// The home page's three scroll moments, loaded on demand by home-motion.ts.
//
//   1. The inspection: the house plan is pinned and drawn layer by layer while
//      a pencil rule moves down it; each layer brings in its chapter.
//   2. The desk: two panels part to uncover the workstation photo.
//   3. Contact: the address gets circled by hand.
//
// Nothing else moves. Setup runs in steps, each with its own gsap.matchMedia()
// handler and a yield in between, so there is no long task and every step
// reverts by itself if the visitor switches to reduced motion.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

const MOTION = '(prefers-reduced-motion: no-preference)';
const yieldToMain = () => new Promise((resolve) => setTimeout(resolve, 0));
const words = (el: Element) =>
  SplitText.create(el, { type: 'words', mask: 'words', aria: 'none' }).words as HTMLElement[];

// Plan y-ranges (viewBox units) that the pencil rule sweeps for each layer.
const SWEEP: [number, number][] = [
  [80, 214],
  [214, 382],
  [382, 462],
];

function smoothScroll() {
  // Wheel only: touch keeps native scrolling, which is what keeps phones fluid.
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

// ---- 1. The inspection ------------------------------------------------------
let stage: ReturnType<typeof prepareInspection> | null = null;

function prepareInspection() {
  const section = document.querySelector<HTMLElement>('[data-scan-section]');
  const el = section?.querySelector<HTMLElement>('[data-scan-stage]');
  if (!section || !el) return null;
  el.classList.add('is-pinned');

  const layers = [...el.querySelectorAll<SVGGElement>('.plan__layer')];
  const lines = layers.map((l) => [...l.querySelectorAll<SVGPathElement>('.plan__lines path')]);
  const notes = layers.map((l) => l.querySelector<SVGGElement>('[data-note]')!);
  const rule = el.querySelector<SVGGElement>('[data-scan]')!;
  const chapters = [...el.querySelectorAll<HTMLElement>('.chapter')];
  const titles = chapters.map((c) => words(c.querySelector('.chapter__title')!));
  const rest = chapters.map((c) => [...c.querySelectorAll<HTMLElement>('.chapter__body, .chapter__links')]);

  gsap.set(lines.flat(), { drawSVG: '0%' });
  gsap.set(notes, { autoAlpha: 0 });
  gsap.set(rule, { autoAlpha: 0, y: SWEEP[0][0] });
  gsap.set(chapters.slice(1), { autoAlpha: 0 });
  gsap.set(titles.flat(), { yPercent: 110 });
  gsap.set(rest.flat(), { autoAlpha: 0, y: 14 });

  return { el, lines, notes, rule, chapters, titles, rest };
}

function inspection() {
  stage = prepareInspection();
  return () => {
    stage?.el.classList.remove('is-pinned');
    stage = null;
  };
}

function inspectionTimeline() {
  if (!stage) return;
  const { el, lines, notes, rule, chapters, titles, rest } = stage;

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: el,
      start: 'top top',
      end: () => `+=${window.innerHeight * 3}`,
      pin: true,
      scrub: 0.6,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });

  tl.set(rule, { autoAlpha: 1 }, 0);
  SWEEP.forEach(([from, to], i) => {
    const at = i * 2;
    const textIn = i === 0 ? 0 : at + 0.6;
    if (i > 0) {
      tl.to(titles[i - 1], { yPercent: -110, duration: 0.3, stagger: { amount: 0.15 }, ease: 'power2.in' }, at);
      tl.to(rest[i - 1], { autoAlpha: 0, y: -14, duration: 0.3 }, at);
      tl.set(chapters[i - 1], { autoAlpha: 0 }, at + 0.55);
      tl.set(chapters[i], { autoAlpha: 1 }, at + 0.55);
    }
    tl.to(titles[i], { yPercent: 0, duration: 0.5, stagger: { amount: 0.3 }, ease: 'power3.out' }, textIn);
    tl.to(rest[i], { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }, textIn + 0.3);
    tl.fromTo(rule, { y: from }, { y: to, duration: 1.5, immediateRender: false }, at);
    tl.to(lines[i], { drawSVG: '100%', duration: 1.2, stagger: { amount: 0.5 } }, at + 0.1);
    tl.to(notes[i], { autoAlpha: 1, duration: 0.4 }, at + 0.9);
  });
  tl.to(rule, { autoAlpha: 0, duration: 0.3 });
  tl.to({}, { duration: 0.4 });
}

// ---- 2. The desk ----------------------------------------------------------------
function desk() {
  const frame = document.querySelector<HTMLElement>('[data-desk] .desk__frame');
  if (!frame) return;
  const curtains = frame.querySelectorAll<HTMLElement>('.desk__curtain');
  const img = frame.querySelector('img');
  gsap.set(curtains, { display: 'block' });
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: frame, start: 'top 85%', end: 'center 45%', scrub: 0.5 },
  });
  tl.fromTo(curtains[0], { xPercent: 0 }, { xPercent: -101 }, 0)
    .fromTo(curtains[1], { xPercent: 0 }, { xPercent: 101 }, 0)
    .fromTo(img, { scale: 1.12 }, { scale: 1 }, 0);
}

// ---- 3. Contact -------------------------------------------------------------------
function contact() {
  const section = document.querySelector<HTMLElement>('[data-contact]');
  if (!section) return;
  const circle = section.querySelector<SVGPathElement>('[data-circle]');
  const title = section.querySelector('.contact__title');
  const tl = gsap.timeline({
    scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none reverse' },
  });
  if (title) tl.from(words(title), { yPercent: 110, duration: 0.8, ease: 'power4.out', stagger: 0.07 });
  if (circle) tl.fromTo(circle, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.1, ease: 'power2.inOut' }, '-=0.3');
}

export async function start() {
  // Split text only once the fonts are in, or line breaks shift under the
  // split. Capped, so a slow font never holds the page hostage.
  await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]);
  const mm = gsap.matchMedia();
  // Page order, so ScrollTriggers are created and refreshed top to bottom.
  for (const step of [smoothScroll, inspection, inspectionTimeline, desk, contact]) {
    mm.add(MOTION, step);
    await yieldToMain();
  }
}
