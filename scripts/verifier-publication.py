# -*- coding: utf-8 -*-
import json, re, sys
P=json.load(open('src/data/pages.json',encoding='utf-8'))
by={p['url']:p for p in P}
def when(u):
    p=by.get(u)
    return p.get('publishedAt') if p else None

problems=[]
for p in P:
    src=p.get('publishedAt')
    for m in re.finditer(r'href="(/[^"#]*)"',p['content']):
        t=m.group(1)
        if t.startswith('/wp-content'): continue
        if t not in by:
            problems.append(f"LIEN MORT   {p['url']} -> {t}"); continue
        tgt=when(t)
        if tgt and (not src or tgt > src):
            problems.append(f"LIEN PRÉMATURÉ  {p['url']} ({src or 'déjà publié'})\n                -> {t} (publié le {tgt})")

print("=== calendrier de publication ===")
for p in sorted([x for x in P if x.get('publishedAt')], key=lambda x:x['publishedAt']):
    import html
    w=len(re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>',' ',p['content']))).split())
    print(f"  {p['publishedAt'][:10]}  {w:>4} mots  T{len(p['title']):>3} D{len(p['description']):>3}  {p['url']}")
print()
print("=== cohérence des liens ===")
print('\n'.join(problems) if problems else "  aucun problème ✓")
sys.exit(1 if problems else 0)
