# Every built page at 375/768/1280/1920: horizontal overflow, header overlap,
# menu reachable (nav links visible or a menu button visible), one H1,
# elements wider than the viewport, and broken images.
import sys, glob, asyncio
from playwright.async_api import async_playwright
BASE, DIST = sys.argv[1], sys.argv[2]
WIDTHS = [375, 768, 1280, 1920]
pages = sorted({(f[len(DIST):].replace('/index.html', '') or '/').replace('.html', '') for f in glob.glob(DIST + '/**/index.html', recursive=True)} | {'/'})
JS = """() => {
  const W = innerWidth, out = {};
  out.overflow = document.documentElement.scrollWidth - W;
  out.wide = [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e);
     return r.width > 0 && (r.right > W + 1 || r.left < -1) && cs.position !== 'fixed' && !e.closest('[aria-hidden=true],.sr-only,.skip-link') && cs.visibility !== 'hidden'; })
     .slice(0, 3).map(e => e.tagName + '.' + (e.className && e.className.baseVal === undefined ? e.className : '').toString().split(' ')[0]);
  const hdr = document.querySelector('header, .nav'); out.h1 = document.querySelectorAll('h1').length;
  const vis = e => { if (!e) return false; const r = e.getBoundingClientRect(), cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
  const navLinks = [...document.querySelectorAll('nav a')].filter(vis).length;
  const burger = [...document.querySelectorAll('button')].filter(b => /menu/i.test(b.getAttribute('aria-label') || b.textContent || '') && vis(b)).length;
  out.menu = navLinks > 2 || burger > 0;
  out.brokenImg = [...document.images].filter(i => i.complete && i.naturalWidth === 0 && !i.loading).length;
  return out; }"""
async def main():
    bad = 0
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for w in WIDTHS:
            pg = await b.new_page(viewport={'width': w, 'height': 900}, reduced_motion='reduce')
            for path in pages:
                await pg.goto(BASE + path, wait_until='load')
                r = await pg.evaluate(JS)
                issues = []
                if r['overflow'] > 0: issues.append(f"overflow {r['overflow']}px")
                if r['wide']: issues.append(f"wide {r['wide']}")
                if r['h1'] != 1 and path != '/404': issues.append(f"h1={r['h1']}")
                if not r['menu']: issues.append('menu not reachable')
                if r['brokenImg']: issues.append(f"broken img {r['brokenImg']}")
                if issues: bad += 1; print(w, path, '; '.join(issues))
            await pg.close()
        await b.close()
    print(f'{len(pages)} pages x {len(WIDTHS)} widths, {bad} with issues')
asyncio.run(main())
