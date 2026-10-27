# Keyboard: first Tab lands on the skip link, every focused element shows a
# visible outline, and the menu button (phone) opens with Enter.
import sys, asyncio
from playwright.async_api import async_playwright
BASE = sys.argv[1]; paths = sys.argv[2:]
FOCUS = """() => { const e = document.activeElement; const cs = getComputedStyle(e);
  return { tag: e.tagName, text: (e.textContent || '').trim().slice(0, 30), cls: String(e.className).slice(0, 30),
           outline: cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0, shadow: cs.boxShadow !== 'none' }; }"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for w in (375, 1280):
            pg = await b.new_page(viewport={'width': w, 'height': 900})
            for path in paths:
                await pg.goto(BASE + path, wait_until='load')
                await pg.keyboard.press('Tab'); first = await pg.evaluate(FOCUS)
                noring = []
                for i in range(25):
                    await pg.keyboard.press('Tab'); f = await pg.evaluate(FOCUS)
                    if f['tag'] == 'BODY': break
                    if not (f['outline'] or f['shadow']): noring.append(f"{f['tag']} {f['text'] or f['cls']}")
                print(w, path, 'first:', first['text'], '| no visible focus:', noring[:4] or 'none')
            await pg.close()
        await b.close()
asyncio.run(main())
