# Static checks on dist/: titles, descriptions, H1, links, alt, JSON-LD, OG files.
import glob, re, html, json, os, sys, collections
D = sys.argv[1]
pages = [f for f in glob.glob(D + '/**/*.html', recursive=True) if '/signature/' not in f]
def url(f):
    u = f[len(D):].replace('/index.html', '') or '/'
    return u.replace('.html', '') if u.endswith('.html') else u
exists = {url(f) for f in pages} | {'/'}
assets = set()
for f in glob.glob(D + '/**/*', recursive=True):
    if os.path.isfile(f) and not f.endswith('.html'): assets.add(f[len(D):])
titles = collections.Counter(); descs = collections.Counter(); problems = []
inbound = collections.Counter()
for f in pages:
    u = url(f); s = open(f).read()
    t = html.unescape((re.search(r'<title>(.*?)</title>', s) or [None, ''])[1])
    d = html.unescape((re.search(r'<meta name="description" content="(.*?)"', s) or [None, ''])[1])
    noindex = 'noindex' in (re.search(r'<meta name="robots" content="(.*?)"', s) or [None, ''])[1]
    if not noindex:
        titles[t] += 1; descs[d] += 1
        if len(t) > 60: problems.append(f'title>60 ({len(t)}) {u}')
        if not 110 <= len(d) <= 160: problems.append(f'desc {len(d)} {u}')
    h1 = len(re.findall(r'<h1[\s>]', s))
    if h1 != 1: problems.append(f'h1={h1} {u}')
    levels = [int(x) for x in re.findall(r'<h([1-6])[\s>]', s)]
    for a, b in zip(levels, levels[1:]):
        if b > a + 1: problems.append(f'heading skip h{a}->h{b} {u}'); break
    for img in re.findall(r'<img\b[^>]*>', s):
        if 'alt=' not in img: problems.append(f'img no alt {u}')
        if 'width=' not in img or 'height=' not in img: problems.append(f'img no size {u}')
    for h in re.findall(r'href="(/[^"#?]*)', s):
        h = h.rstrip('/') or '/'
        if h in exists: inbound[h] += 1 if h != u else 0; continue
        if h in assets or h.endswith(('.xml', '.txt', '.css', '.js', '.png', '.webp', '.jpg', '.woff2')): 
            if h not in assets: problems.append(f'missing asset {h} on {u}')
            continue
        problems.append(f'broken link {h} on {u}')
    for m in re.findall(r'<meta property="og:image" content="https://www.patricklaperriere.com([^"]+)"', s):
        if m not in assets: problems.append(f'og image missing {m} on {u}')
    for blk in re.findall(r'<script type="application/ld\+json">(.*?)</script>', s, re.S):
        try:
            g = json.loads(blk)
            types = [n.get('@type') for n in g.get('@graph', [])]
            if 'FAQPage' in types: problems.append(f'FAQPage {u}')
        except Exception as e: problems.append(f'json-ld invalid {u}: {e}')
    if '[À FOURNIR' in s or 'À CONFIRMER' in s: problems.append(f'placeholder leaked {u}')
    txt = re.sub(r'<(script|style)\b.*?</\1>', '', s, flags=re.S)
    if u == '/' or not u.startswith('/en'):
        if '—' in re.sub(r'<[^>]+>', '', txt): problems.append(f'em dash in FR page {u}')
for t, n in titles.items():
    if n > 1: problems.append(f'dup title x{n}: {t}')
for d, n in descs.items():
    if n > 1: problems.append(f'dup desc x{n}: {d[:60]}')
orph = [u for u in exists if inbound[u] == 0 and u not in ('/', '/404')]
print(f'{len(pages)} pages, {len(problems)} problems, orphans: {orph}')
for p in problems: print(' ', p)
