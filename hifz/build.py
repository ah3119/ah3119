#!/usr/bin/env python3
"""Hifzly — static site generator (Python 3.9+, no dependency).

    python3 build.py              → dist/ (full multilingual site)
    python3 build.py --standalone → dist-standalone/index.html (one self-contained page, for previews)
"""
import datetime as dt
import hashlib
import html
import json
import math
import re
import shutil
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC, DIST = ROOT / "src", ROOT / "dist"
LANGS = ["en", "ar", "fr", "ur", "id", "tr"]   # first = default, served at /
TOKEN = re.compile(r"\{\{(t:|c:)?(\w+)\}\}")
META = re.compile(r"\A<!--meta\s+(\{.*?\})\s*-->\s*", re.S)
POPULAR = [1, 18, 36, 55, 56, 67, 32, 73, 76, 78, 87, 93, 94, 97, 99, 100, 101, 102, 103, 105, 108, 109, 110, 112, 113, 114, 19, 12, 2, 62]

cfg = json.loads((ROOT / "config.json").read_text(encoding="utf-8"))
DOMAIN = cfg["domain"].rstrip("/")
I18N = {l: json.loads((SRC / "i18n" / f"{l}.json").read_text(encoding="utf-8")) for l in LANGS}
QURAN = json.loads((SRC / "data" / "quran.json").read_text(encoding="utf-8"))


def esc(s):
    return html.escape(str(s), quote=True)


def render(tpl, values, lang, where, c=None):
    t = I18N[lang]["ui"]

    def sub(m):
        kind, key = m.group(1), m.group(2)
        if kind == "t:":
            if key not in t:
                sys.exit(f"[{lang}] missing ui string '{key}' ({where})")
            return t[key]
        if kind == "c:":
            if c is None or key not in c:
                sys.exit(f"[{lang}] missing computed value '{key}' ({where})")
            return str(c[key])
        if key not in values:
            sys.exit(f"unknown token {{{{{key}}}}} in {where}")
        return str(values[key])
    return TOKEN.sub(sub, tpl)


def home_url(lang):
    return "/" if lang == LANGS[0] else f"/{lang}/"


def slugify(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", s.replace("'", "")).strip("-")


def fmt_num(lang, x):
    s = f"{x:.1f}".rstrip("0").rstrip(".")
    return s.replace(".", ",") if lang in ("fr", "id", "tr") else s


def juz_of_page(p):
    j = 1
    for k, start in enumerate(QURAN["juz"]):
        if start[0] <= p:
            j = k + 1
    return j


def fingerprint(src: Path) -> str:
    digest = hashlib.sha256(src.read_bytes()).hexdigest()[:10]
    name = f"{src.stem}.{digest}{src.suffix}"
    shutil.copyfile(src, DIST / "assets" / name)
    return f"/assets/{name}"


# ---------------------------------------------------------------- computed content
def duration_table(lang):
    h = I18N[lang]["home"]
    rows = []
    for label, lines in zip(h["dur_rows"], (5, 7, 10, 15, 30)):
        days = math.ceil(604 * 15 / lines)
        years = days / 6 / 52.18
        rows.append(f"<tr><td>{esc(label)}</td><td>{days}</td><td>{esc(h['dur_years'].format(y=fmt_num(lang, years)))}</td></tr>")
    head = "".join(f"<th>{esc(x)}</th>" for x in h["dur_head"])
    return f"<table><thead><tr>{head}</tr></thead><tbody>{''.join(rows)}</tbody></table>"


def surah_values(n):
    s = QURAN["surahs"][n - 1]
    pages = s["p2"] - s["p1"] + 1
    j1, j2 = juz_of_page(s["p1"]), juz_of_page(s["p2"])
    paces = []
    for pace in (1, 2, 3, 5, 10):
        if pace > s["n"] and pace != 1:
            continue
        d = math.ceil(s["n"] / pace)
        weeks = d / 6
        paces.append(f"<tr><td>{pace} {'ayah' if pace == 1 else 'ayahs'} / day</td><td>{d}</td><td>{'≈ ' + fmt_num('en', weeks) + ' weeks' if d > 6 else 'less than a week'}</td></tr>")
    in30 = math.ceil(s["n"] / 30)
    in7 = math.ceil(s["n"] / 7)
    preset = {"scope": "surah", "sfrom": n, "sto": n, "unit": "ayah" if pages <= 20 else "line", "order": "start",
              "mode": "date" if s["n"] > 15 else "amount", "target": "+30d" if pages <= 3 else ("+90d" if pages <= 20 else "+1y"),
              "amount": 3 if s["n"] <= 15 else 5, "days": "nnnnnnn" if pages <= 3 else "nnnnrnn", "sabqi": 7, "manzil": 20 if pages <= 20 else 5}
    return {
        "name": esc(s["tr_en"]), "ar": esc(s["ar"]), "meaning": esc(s.get("en", "")), "n": n, "ayahs": s["n"],
        "pages": pages, "p1": s["p1"], "p2": s["p2"], "juz": f"{j1}" if j1 == j2 else f"{j1}–{j2}",
        "pace_rows": "".join(paces), "in30": in30, "in7": in7, "preset": esc(json.dumps(preset)),
        "quran_link": f"https://quran.com/{n}",
    }


# ---------------------------------------------------------------- page shell
def page_shell(lang, title, description, path, content, alternates, robots="index, follow", jsonld=None, with_app=False, standalone=False):
    m = I18N[lang]["meta"]
    hreflang = ""
    if alternates and not standalone:
        hreflang = "\n".join(f'<link rel="alternate" hreflang="{l}" href="{DOMAIN}{p}">' for l, p in alternates.items())
        if LANGS[0] in alternates:
            hreflang += f'\n<link rel="alternate" hreflang="x-default" href="{DOMAIN}{alternates[LANGS[0]]}">'
    lang_links = []
    for l in ([] if standalone else LANGS):
        target = (alternates or {}).get(l, home_url(l))
        cur = ' aria-current="true"' if l == lang else ""
        lang_links.append(f'<a href="{target}" hreflang="{l}" lang="{l}"{cur}>{esc(I18N[l]["meta"]["lang_name"])}</a>')
    ui = I18N[lang]["ui"]
    legal_lang = lang if (SRC / "pages" / lang).exists() else LANGS[0]
    prefix = "" if legal_lang == LANGS[0] else f"/{legal_lang}"
    footer = [f'<a href="{home_url(lang)}">{esc(ui["nav_home"])}</a>', f'<a href="/surah/">{esc(ui["nav_surahs"])}</a>',
              f'<a href="{prefix}/about/">{esc(ui["nav_about"])}</a>', f'<a href="{prefix}/privacy/">{esc(ui["nav_privacy"])}</a>',
              f'<a href="{prefix}/legal/">{esc(ui["nav_legal"])}</a>']
    if standalone:
        footer = []
    if cfg.get("sister_name") and cfg.get("sister_url"):
        footer.append(f'<a href="{esc(cfg["sister_url"])}" rel="noopener">{esc(cfg["sister_name"])}</a>')
    if cfg.get("support_url"):
        footer.append(f'<a href="{esc(cfg["support_url"])}" rel="noopener">{esc(ui["support"])}</a>')
    scripts = ""
    if with_app:
        blob = json.dumps(I18N[lang]["app"], ensure_ascii=False).replace("</", "<\\/")
        scripts = f'<script id="i18n" type="application/json">{blob}</script>\n'
        if standalone:
            scripts += f'<script id="quran-data" type="application/json">{json.dumps(QURAN, ensure_ascii=False)}</script>\n'
            scripts += "<script>" + (SRC / "assets" / "app.js").read_text(encoding="utf-8") + "</script>"
        else:
            scripts += f'<script src="{ASSETS["js"]}" defer></script>'
    css_tag = (f"<style>{(SRC / 'assets' / 'style.css').read_text(encoding='utf-8')}</style>" if standalone
               else f'<link rel="stylesheet" href="{ASSETS["css"]}">')
    favicon = ("data:image/svg+xml," + (SRC / "assets" / "favicon.svg").read_text(encoding="utf-8").replace("#", "%23").replace('"', "'")
               if standalone else "/favicon.svg")
    values = {
        "lang": lang, "dir": m["dir"], "title": esc(title), "description": esc(description), "canonical": DOMAIN + path,
        "hreflang": hreflang, "robots": robots, "site_name": esc(cfg["site_name"]), "og_locale": m["og_locale"],
        "favicon": favicon, "css_tag": css_tag, "jsonld": json.dumps(jsonld or {}, ensure_ascii=False).replace("</", "<\\/"),
        "head_extra": "" if standalone else HEAD_EXTRA, "home_url": home_url(lang), "lang_links": "".join(lang_links),
        "content": content, "footer_links": " ".join(footer), "year": dt.date.today().year, "scripts": scripts,
    }
    return render(LAYOUT, values, lang, "layout.html")


def write(path, text):
    dest = DIST / "index.html" if path == "/" else DIST / (path.strip("/") + "/index.html")
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(text, encoding="utf-8")


def home_content(lang, standalone=False):
    h = I18N[lang]["home"]
    planner = render(PLANNER, {"quran_url": "" if standalone else ASSETS["quran"], "preset_attr": ""}, lang, "planner.html")
    body = h["content"].replace("{{duration_table}}", duration_table(lang))
    links = ""
    if lang == "en" and not standalone:
        links = "<h2>" + esc(h["popular_title"]) + '</h2><ul class="links">' + "".join(
            f'<li><a href="/surah/{slugify(QURAN["surahs"][n - 1]["tr_en"])}/">Surah {esc(QURAN["surahs"][n - 1]["tr_en"])}</a></li>' for n in POPULAR) + "</ul>"
    return (f'<section class="hero"><p class="bism" lang="ar">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p><h1>{esc(h["h1"])}</h1><p>{esc(h["lead"])}</p></section>\n'
            f'{planner}\n<article class="prose">{body}{links}</article>')


def main():
    global LAYOUT, PLANNER, ASSETS, HEAD_EXTRA
    LAYOUT = (SRC / "templates" / "layout.html").read_text(encoding="utf-8")
    PLANNER = (SRC / "templates" / "planner.html").read_text(encoding="utf-8")
    HEAD_EXTRA = ""
    if cfg.get("google_site_verification"):
        HEAD_EXTRA += f'<meta name="google-site-verification" content="{esc(cfg["google_site_verification"])}">\n'
    if cfg.get("adsense_client"):
        cl = esc(cfg["adsense_client"])
        HEAD_EXTRA += f'<meta name="google-adsense-account" content="{cl}">\n<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={cl}" crossorigin="anonymous"></script>\n'
    if cfg.get("cloudflare_analytics_token"):
        HEAD_EXTRA += f"<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{json.dumps({'token': cfg['cloudflare_analytics_token']})}'></script>\n"

    if "--standalone" in sys.argv:
        out = ROOT / "dist-standalone"
        out.mkdir(exist_ok=True)
        h = I18N["en"]["home"]
        ASSETS = {}
        page = page_shell("en", cfg["site_name"] + " Quran Planner", h["description"], "/", home_content("en", standalone=True), None, with_app=True, standalone=True)
        page = page.replace('href="/"', 'href="#"')
        (out / "index.html").write_text(page, encoding="utf-8")
        # Artifact preview: the host adds doctype/html/head/body itself
        head = re.search(r"<head>(.*?)</head>", page, re.S).group(1)
        body = re.search(r"<body>(.*?)</body>", page, re.S).group(1)
        head = re.sub(r'<meta charset="utf-8">\s*<meta name="viewport"[^>]*>\s*', "", head)
        boot = "<script>document.documentElement.lang='en';document.documentElement.dir='ltr';document.documentElement.dataset.site=" + json.dumps(cfg["site_name"]) + ";</script>"
        body = body.replace('id="planner" class="hz is-loading"', 'id="planner" class="hz is-loading" data-preview="1"')
        (out / "preview.html").write_text(head.strip() + "\n" + boot + "\n" + body.strip() + "\n", encoding="utf-8")
        print(f"✅ standalone page → dist-standalone/index.html ({len(page) // 1024} KB)")
        return

    if DIST.exists():
        shutil.rmtree(DIST)
    (DIST / "assets").mkdir(parents=True)
    ASSETS = {"css": fingerprint(SRC / "assets" / "style.css"), "js": fingerprint(SRC / "assets" / "app.js"),
              "quran": fingerprint(SRC / "data" / "quran.json")}
    shutil.copyfile(SRC / "assets" / "favicon.svg", DIST / "favicon.svg")
    sitemap = []
    home_alts = {l: home_url(l) for l in LANGS}

    for lang in LANGS:
        h = I18N[lang]["home"]
        jsonld = {"@context": "https://schema.org", "@type": "WebApplication", "name": cfg["site_name"], "url": DOMAIN + home_url(lang),
                  "description": h["description"], "inLanguage": lang, "applicationCategory": "EducationalApplication",
                  "operatingSystem": "Any (web browser)", "isAccessibleForFree": True, "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}}
        write(home_url(lang), page_shell(lang, h["title"], h["description"], home_url(lang), home_content(lang), home_alts, jsonld=jsonld, with_app=True))
        sitemap.append(home_url(lang))

    # Surah plans (English)
    tpl = (SRC / "templates" / "surah.html").read_text(encoding="utf-8")
    for n in POPULAR:
        c = surah_values(n)
        c["planner"] = render(PLANNER, {"quran_url": ASSETS["quran"], "preset_attr": f" data-preset=\"{c['preset']}\""}, "en", "planner.html")
        c["others"] = "".join(f'<li><a href="/surah/{slugify(QURAN["surahs"][o - 1]["tr_en"])}/">Surah {esc(QURAN["surahs"][o - 1]["tr_en"])}</a></li>' for o in POPULAR if o != n)
        path = f"/surah/{slugify(QURAN['surahs'][n - 1]['tr_en'])}/"
        title = f"How to memorize Surah {QURAN['surahs'][n - 1]['tr_en']}: free daily plan ({c['ayahs']} ayahs)"
        desc = (f"Memorize Surah {QURAN['surahs'][n - 1]['tr_en']} ({c['ayahs']} ayahs, {c['pages']} page{'s' if c['pages'] > 1 else ''}) "
                f"with a personal day-by-day plan: new lesson, recent revision and old revision. Free, no sign-up.")
        jsonld = {"@context": "https://schema.org", "@type": "WebPage", "name": title, "url": DOMAIN + path, "inLanguage": "en"}
        write(path, page_shell("en", title, desc, path, render(tpl, {}, "en", "surah.html", c), {"en": path}, jsonld=jsonld, with_app=True))
        sitemap.append(path)

    # Index of all surahs
    rows = []
    for i, s in enumerate(QURAN["surahs"], start=1):
        slug = slugify(s["tr_en"])
        link = f'/surah/{slug}/' if i in POPULAR else "/#p=" + esc(json.dumps({"scope": "surah", "sfrom": i, "sto": i, "unit": "ayah", "order": "start"}).replace(" ", ""))
        rows.append(f'<tr><td>{i}</td><td><a href="{link}">{esc(s["tr_en"])}</a></td><td lang="ar" dir="rtl">{esc(s["ar"])}</td><td>{s["n"]}</td><td>{s["p1"]}</td><td>{juz_of_page(s["p1"])}</td></tr>')
    idx = (f'<section class="hero"><h1>Memorization plans for all 114 surahs</h1><p>Pick a surah to get a ready-made, day-by-day memorization plan with revision built in.</p></section>'
           f'<article class="prose"><table><thead><tr><th>#</th><th>Surah</th><th>Arabic</th><th>Ayahs</th><th>Page</th><th>Juz</th></tr></thead><tbody>{"".join(rows)}</tbody></table></article>')
    write("/surah/", page_shell("en", "Quran memorization plans for every surah — " + cfg["site_name"],
                                "List of the 114 surahs with ayah count, page and juz, each with a free personal memorization plan.", "/surah/", idx, {"en": "/surah/"}))
    sitemap.append("/surah/")

    # Static pages
    todo = [k for k, v in cfg.items() if isinstance(v, str) and "TO COMPLETE" in v]
    cfg_vals = {k: (f'<mark class="todo">{esc(v)}</mark>' if "TO COMPLETE" in v else esc(v)) for k, v in cfg.items() if isinstance(v, str)}
    for lang_dir in sorted((SRC / "pages").iterdir()):
        lang = lang_dir.name
        for f in sorted(lang_dir.glob("*.html")):
            text = f.read_text(encoding="utf-8")
            mm = META.match(text)
            meta = json.loads(mm.group(1))
            body = TOKEN.sub(lambda m: cfg_vals.get(m.group(2), m.group(0)), text[mm.end():])
            slug = meta.get("slug")
            path = (home_url(lang) + slug + "/") if slug else "/404.html"
            alts = {l: home_url(l) + slug + "/" for l in LANGS if (SRC / "pages" / l / f.name).exists()} if slug else None
            out = page_shell(lang, meta["title"].replace("{{site_name}}", cfg["site_name"]), meta["description"].replace("{{site_name}}", cfg["site_name"]),
                             path, body, alts, robots="index, follow" if slug else "noindex, follow")
            if slug:
                write(path, out)
                sitemap.append(path)
            else:
                (DIST / "404.html").write_text(out, encoding="utf-8")

    today = dt.date.today().isoformat()
    (DIST / "sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
                                      + "".join(f"<url><loc>{DOMAIN}{p}</loc><lastmod>{today}</lastmod></url>" for p in sitemap) + "</urlset>\n", encoding="utf-8")
    (DIST / "robots.txt").write_text(f"User-agent: *\nAllow: /\n\nSitemap: {DOMAIN}/sitemap.xml\n", encoding="utf-8")
    if cfg.get("adsense_client"):
        (DIST / "ads.txt").write_text(f"google.com, {cfg['adsense_client'].replace('ca-', '')}, DIRECT, f08c47fec0942fa0\n", encoding="utf-8")
    (DIST / "_headers").write_text("/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n\n/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n", encoding="utf-8")
    if todo:
        print("⚠️  Fields to complete in config.json before going live:", ", ".join(todo))
    print(f"✅ {len(sitemap)} indexable pages in {len(LANGS)} languages → dist/")


if __name__ == "__main__":
    main()
