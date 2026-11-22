#!/usr/bin/env python3
"""Fairclock — static site generator (Python 3.9+, no dependency).

    python3 build.py

Reads config.json, src/i18n/*.json, src/corridors.json, src/templates/*, src/pages/<lang>/*.html
and writes the full multilingual site to dist/ (ready for any static host).
"""
import datetime as dt
import hashlib
import html
import json
import re
import shutil
import sys
from collections import Counter
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parent
SRC, DIST = ROOT / "src", ROOT / "dist"
LANGS = ["en", "es", "fr", "de", "pt", "ar"]          # first = default language, served at /
TOKEN = re.compile(r"\{\{(t:|c:)?(\w+)\}\}")
META = re.compile(r"\A<!--meta\s+(\{.*?\})\s*-->\s*", re.S)
UTC = dt.timezone.utc
YEAR = 2027

cfg = json.loads((ROOT / "config.json").read_text(encoding="utf-8"))
DOMAIN = cfg["domain"].rstrip("/")
I18N = {l: json.loads((SRC / "i18n" / f"{l}.json").read_text(encoding="utf-8")) for l in LANGS}


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


# ---------------------------------------------------------------- assets
def fingerprint(src: Path) -> str:
    digest = hashlib.sha256(src.read_bytes()).hexdigest()[:10]
    name = f"{src.stem}.{digest}{src.suffix}"
    shutil.copyfile(src, DIST / "assets" / name)
    return f"/assets/{name}"


# ---------------------------------------------------------------- time maths (mirror of app.js)
CITIES = json.loads((SRC / "data" / "cities.json").read_text(encoding="utf-8"))
HOLI = {}


def country(cc):
    if cc not in HOLI:
        p = SRC / "data" / "h" / f"{cc}.json"
        j = json.loads(p.read_text(encoding="utf-8")) if p.exists() else {"w": [6, 7], "h": []}
        HOLI[cc] = {"w": j["w"], "h": dict((d, n) for d, n in j["h"])}
    return HOLI[cc]


def city(name):
    for c in CITIES:
        if c[0] == name:
            return {"n": c[0], "cc": c[1], "tz": c[2], "s": 9, "e": 17}
    sys.exit(f"city not found: {name}")


def status(p, utc_dt, holidays=True, weekends=True):
    loc = utc_dt.astimezone(ZoneInfo(p["tz"]))
    t = loc.hour + loc.minute / 60
    c = country(p["cc"])
    hol = holidays and c["h"].get(loc.date().isoformat())
    off = "holiday" if hol else ("weekend" if weekends and loc.isoweekday() in c["w"] else None)
    if p["s"] <= t < p["e"]:
        k, dist = "work", 0
    elif t >= 23 or t < 7:
        k, dist = "sleep", 0
    elif t < p["s"]:
        k, dist = "early", p["s"] - t
    else:
        k, dist = "late", t - p["e"]
    return k, off, dist, loc


def pain(st):
    k, off, dist, _ = st
    if k == "sleep":
        return 10
    x = 0 if k == "work" else (2 if dist <= 2 else 4)
    return max(x, 6) if off else x


def local_midnight_utc(tz, date):
    return dt.datetime(date.year, date.month, date.day, tzinfo=ZoneInfo(tz)).astimezone(UTC)


def offset_h(tz, date):
    return dt.datetime(date.year, date.month, date.day, 12, tzinfo=UTC).astimezone(ZoneInfo(tz)).utcoffset().total_seconds() / 3600


def overlap_windows(A, B, date):
    """Working-hour overlap on a given local date of A (weekends counted, holidays ignored)."""
    start = local_midnight_utc(A["tz"], date)
    step = dt.timedelta(minutes=15)
    runs, cur = [], None
    for i in range(96):
        u = start + i * step
        sa, sb = status(A, u, holidays=False), status(B, u, holidays=False)
        ok = sa[0] == "work" and sb[0] == "work" and not sa[1] and not sb[1]
        if ok and cur is None:
            cur = [u, u + step]
        elif ok:
            cur[1] = u + step
        elif cur:
            runs.append(cur)
            cur = None
    if cur:
        runs.append(cur)
    return runs


def best_compromise(A, B, date):
    start = local_midnight_utc(A["tz"], date)
    best = None
    for i in range(48):
        u = start + dt.timedelta(minutes=30 * i)
        pa = max(pain(status(A, u, holidays=False)), pain(status(A, u + dt.timedelta(minutes=30), holidays=False)))
        pb = max(pain(status(B, u, holidays=False)), pain(status(B, u + dt.timedelta(minutes=30), holidays=False)))
        key = (max(pa, pb), pa + pb)
        if best is None or key < best[0]:
            best = (key, u)
    return best[1]


def dst_changes(tz, year):
    out, prev = [], None
    d = dt.date(year, 1, 1)
    while d.year == year:
        o = offset_h(tz, d)
        if prev is not None and o != prev:
            out.append(d)
        prev = o
        d += dt.timedelta(days=1)
    return out


def first_weekday(year, month, iso):
    d = dt.date(year, month, 1)
    while d.isoweekday() != iso:
        d += dt.timedelta(days=1)
    return d


# ---------------------------------------------------------------- formatting per language
def fmt_date(lang, d, weekday=False):
    m = I18N[lang]["meta"]
    s = m["date_fmt"].format(d=d.day, month=m["months"][d.month - 1], y=d.year)
    if weekday:
        s = m["weekday_fmt"].format(wd=m["weekdays"][d.isoweekday() - 1], date=s)
    return s


def fmt_time(lang, local_dt):
    if lang == "en":
        h = local_dt.hour % 12 or 12
        return f"{h}:{local_dt.minute:02d} {'AM' if local_dt.hour < 12 else 'PM'}"
    return f"{local_dt.hour:02d}:{local_dt.minute:02d}"


def fmt_num(lang, x):
    s = f"{x:g}" if x != int(x) else str(int(x))
    return s.replace(".", ",") if lang in ("fr", "de", "es", "pt") else s


def hours_phrase(lang, h):
    n = fmt_num(lang, h)
    if lang == "ar":
        if h == 1:
            return "ساعة واحدة"
        if h == 2:
            return "ساعتين"
        return f"{n} ساعات" if h == int(h) and 3 <= h <= 10 else f"{n} ساعة"
    one, many = I18N[lang]["meta"]["hour_words"]
    return f"{n} {one if h < 2 else many}"


def fmt_days(lang, isos):
    wd = I18N[lang]["meta"]["weekdays"]
    return I18N[lang]["meta"]["list_sep"].join(wd[i - 1] for i in sorted(isos)) if isos else "—"


def cname(lang, n):
    return I18N[lang].get("cities", {}).get(n, n)


def country_name(lang, cc):
    return I18N[lang]["countries"].get(cc, cc)


# ---------------------------------------------------------------- corridor pages
def slugify(s):
    import unicodedata
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


def pair(cor, lang):
    return (cor["b"], cor["a"]) if lang in cor.get("swap", []) else (cor["a"], cor["b"])


def corridor_values(lang, cor):
    pa, pb = pair(cor, lang)
    A, B = city(pa), city(pb)
    a, b = cname(lang, A["n"]), cname(lang, B["n"])
    ca, cb = country(A["cc"]), country(B["cc"])
    jan, jul = first_weekday(YEAR, 1, 3) + dt.timedelta(days=7), first_weekday(YEAR, 7, 3) + dt.timedelta(days=7)
    c = {"a": esc(a), "b": esc(b), "year": YEAR,
         "flag_a": "".join(chr(0x1F1A5 + ord(x)) for x in A["cc"]), "flag_b": "".join(chr(0x1F1A5 + ord(x)) for x in B["cc"])}

    # Time difference
    d_jan = offset_h(B["tz"], jan) - offset_h(A["tz"], jan)
    d_jul = offset_h(B["tz"], jul) - offset_h(A["tz"], jul)
    ui = I18N[lang]["corridor"]

    def diff_sentence(d):
        if d == 0:
            return ui["same_time"].format(a=a, b=b)
        key = "ahead" if d > 0 else "behind"
        return ui[key].format(a=a, b=b, hh=hours_phrase(lang, abs(d)))
    c["diff_jan"] = esc(diff_sentence(d_jan))
    c["diff_main"] = esc(diff_sentence(d_jan) if d_jan == d_jul else ui["diff_seasonal"].format(
        jan=diff_sentence(d_jan), jul=diff_sentence(d_jul)))
    c["diff_short"] = fmt_num(lang, abs(d_jan)) if d_jan == d_jul else f"{fmt_num(lang, abs(d_jan))}–{fmt_num(lang, abs(d_jul))}"

    # Daily differences across the year → temporary DST mismatch periods
    day, diffs = dt.date(YEAR, 1, 1), []
    while day.year == YEAR:
        diffs.append((day, offset_h(B["tz"], day) - offset_h(A["tz"], day)))
        day += dt.timedelta(days=1)
    common = Counter(x for _, x in diffs).most_common(1)[0][0]
    periods, cur = [], None
    for d_, x in diffs:
        if x != common:
            cur = [d_, d_, x] if cur is None else [cur[0], d_, x]
        elif cur:
            periods.append(cur)
            cur = None
    if cur:
        periods.append(cur)
    short = [p for p in periods if (p[1] - p[0]).days < 60]
    c["dst_note"] = esc(" ".join(ui["dst_gap"].format(start=fmt_date(lang, p[0]), end=fmt_date(lang, p[1]), hh=hours_phrase(lang, abs(p[2])))
                                 for p in short)) if short else ""

    def dst_text(P, name):
        ch = dst_changes(P["tz"], YEAR)
        if not ch:
            return ui["no_dst"].format(city=name, year=YEAR)
        return ui["dst"].format(city=name, dates="; ".join(fmt_date(lang, x) for x in ch))
    c["dst_a"], c["dst_b"] = esc(dst_text(A, a)), esc(dst_text(B, b))

    # Working-hour overlap (typical Wednesday in January)
    runs = overlap_windows(A, B, jan)
    if runs:
        r = max(runs, key=lambda x: x[1] - x[0])
        hrs = (r[1] - r[0]).total_seconds() / 3600
        la, lb = r[0].astimezone(ZoneInfo(A["tz"])), r[0].astimezone(ZoneInfo(B["tz"]))
        ea, eb = r[1].astimezone(ZoneInfo(A["tz"])), r[1].astimezone(ZoneInfo(B["tz"]))
        c["overlap_h"] = fmt_num(lang, hrs)
        c["overlap_sentence"] = esc(ui["overlap"].format(hh=hours_phrase(lang, hrs), a=a, b=b, a1=fmt_time(lang, la), a2=fmt_time(lang, ea), b1=fmt_time(lang, lb), b2=fmt_time(lang, eb)))
        best = r[0] if hrs < 2 else r[0] + (r[1] - r[0]) / 2 - dt.timedelta(minutes=30)
        best = best.replace(minute=0 if best.minute < 30 else 30)
    else:
        c["overlap_h"] = "0"
        c["overlap_sentence"] = esc(ui["no_overlap"].format(a=a, b=b))
        best = best_compromise(A, B, jan)
    ba, bb = best.astimezone(ZoneInfo(A["tz"])), best.astimezone(ZoneInfo(B["tz"]))
    c["best_sentence"] = esc(ui["best_slot"].format(a=a, b=b, ta=fmt_time(lang, ba), tb=fmt_time(lang, bb)))

    # Weekends and shared working days (sample week in February, holidays ignored)
    c["weekend_a"], c["weekend_b"] = esc(fmt_days(lang, ca["w"])), esc(fmt_days(lang, cb["w"]))
    monday = first_weekday(YEAR, 2, 1) + dt.timedelta(days=7)
    shared = [d.isoweekday() for d in (monday + dt.timedelta(days=i) for i in range(7))
              if sum((r[1] - r[0]).total_seconds() for r in overlap_windows(A, B, d)) >= 3600]
    c["shared_days"] = len(shared)
    c["shared_list"] = esc(fmt_days(lang, shared))
    c["weekend_note"] = esc(ui["weekend_diff"].format(a=a, b=b, wa=fmt_days(lang, ca["w"]), wb=fmt_days(lang, cb["w"]))) if ca["w"] != cb["w"] else esc(ui["weekend_same"].format(w=fmt_days(lang, ca["w"])))

    # Conversion table
    rows = []
    for h in (8, 9, 10, 12, 14, 16, 18):
        u = dt.datetime(jan.year, jan.month, jan.day, h, tzinfo=ZoneInfo(A["tz"])).astimezone(UTC)
        la, lb = u.astimezone(ZoneInfo(A["tz"])), u.astimezone(ZoneInfo(B["tz"]))
        day_note = "" if lb.date() == la.date() else (" " + ui["next_day"] if lb.date() > la.date() else " " + ui["prev_day"])
        rows.append(f"<tr><td>{esc(fmt_time(lang, la))}</td><td>{esc(fmt_time(lang, lb))}{esc(day_note)}</td></tr>")
    c["conv_rows"] = "".join(rows)

    # Public holidays of the year
    def hol_rows(cc_self, cc_other, other_name):
        cs, co = country(cc_self), country(cc_other)
        out, clash = [], 0
        for d_str, names in sorted(cs["h"].items()):
            d_ = dt.date.fromisoformat(d_str)
            if d_.year != YEAR:
                continue
            works_other = d_.isoweekday() not in co["w"] and d_str not in co["h"]
            if works_other and d_.isoweekday() not in cs["w"]:
                clash += 1
            name = names.get(lang) or names.get("en")
            out.append(f"<tr><td>{esc(fmt_date(lang, d_, weekday=True))}</td><td>{esc(name)}</td><td>{'✔' if works_other else ''}</td></tr>")
        return "".join(out), clash
    c["hol_a_rows"], clash_a = hol_rows(A["cc"], B["cc"], b)
    c["hol_b_rows"], clash_b = hol_rows(B["cc"], A["cc"], a)
    c["country_a"], c["country_b"] = esc(country_name(lang, A["cc"])), esc(country_name(lang, B["cc"]))
    c["clash_sentence"] = esc(ui["clash"].format(year=YEAR, n=clash_a + clash_b, a=a, b=b, na=clash_a, nb=clash_b))
    c["team_json"] = esc(json.dumps([["", A["n"], A["cc"], A["tz"], 9, 17, ""], ["", B["n"], B["cc"], B["tz"], 9, 17, ""]], ensure_ascii=False))
    return c


# ---------------------------------------------------------------- pages
def page_shell(lang, title, description, path, content, alternates, robots="index, follow", jsonld=None, with_app=False):
    m, ui = I18N[lang]["meta"], I18N[lang]["ui"]
    hreflang = ""
    if alternates:
        hreflang = "\n".join(f'<link rel="alternate" hreflang="{l}" href="{DOMAIN}{p}">' for l, p in alternates.items())
        if LANGS[0] in alternates:
            hreflang += f'\n<link rel="alternate" hreflang="x-default" href="{DOMAIN}{alternates[LANGS[0]]}">'
    lang_links = []
    for l in LANGS:
        target = (alternates or {}).get(l, home_url(l))
        cur = ' aria-current="true"' if l == lang else ""
        lang_links.append(f'<a href="{target}" hreflang="{l}" lang="{l}"{cur}>{esc(I18N[l]["meta"]["lang_name"])}</a>')
    legal_lang = lang if (SRC / "pages" / lang).exists() else LANGS[0]
    prefix = "" if legal_lang == LANGS[0] else f"/{legal_lang}"
    footer = [f'<a href="{home_url(lang)}">{esc(ui["nav_home"])}</a>',
              f'<a href="{prefix}/about/">{esc(ui["nav_about"])}</a>',
              f'<a href="{prefix}/privacy/">{esc(ui["nav_privacy"])}</a>',
              f'<a href="{prefix}/legal/">{esc(ui["nav_legal"])}</a>']
    scripts = ""
    if with_app:
        app_strings = dict(I18N[lang]["app"])
        app_strings["cities"] = I18N[lang].get("cities", {})
        blob = json.dumps(app_strings, ensure_ascii=False).replace("</", "<\\/")
        scripts = f'<script id="i18n" type="application/json">{blob}</script>\n<script src="{ASSETS["js"]}" defer></script>'
    values = {
        "lang": lang, "dir": m["dir"], "title": esc(title), "description": esc(description),
        "canonical": DOMAIN + path, "hreflang": hreflang, "robots": robots, "site_name": esc(cfg["site_name"]),
        "og_locale": m["og_locale"], "css": ASSETS["css"], "jsonld": json.dumps(jsonld or {}, ensure_ascii=False).replace("</", "<\\/"),
        "head_extra": HEAD_EXTRA, "t_skip": esc(ui["skip"]), "home_url": home_url(lang), "t_language": esc(ui["language"]),
        "lang_links": "".join(lang_links), "content": content, "t_footer": esc(ui["footer"]), "footer_links": " ".join(footer),
        "year": dt.date.today().year, "t_footer_note": esc(ui["footer_note"]), "scripts": scripts,
    }
    return render(LAYOUT, values, lang, "layout.html")


def write(path, text):
    dest = DIST / (path.strip("/") + "/index.html" if path.endswith("/") else path.lstrip("/"))
    if path == "/":
        dest = DIST / "index.html"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(text, encoding="utf-8")


def main():
    global LAYOUT, ASSETS, HEAD_EXTRA
    if DIST.exists():
        shutil.rmtree(DIST)
    (DIST / "assets").mkdir(parents=True)
    ASSETS = {"css": fingerprint(SRC / "assets" / "style.css"), "js": fingerprint(SRC / "assets" / "app.js")}
    shutil.copytree(SRC / "data", DIST / "data")
    shutil.copyfile(SRC / "assets" / "favicon.svg", DIST / "favicon.svg")
    LAYOUT = (SRC / "templates" / "layout.html").read_text(encoding="utf-8")
    APP = (SRC / "templates" / "app.html").read_text(encoding="utf-8")
    CORR = (SRC / "templates" / "corridor.html").read_text(encoding="utf-8")
    HEAD_EXTRA = ""
    if cfg.get("google_site_verification"):
        HEAD_EXTRA += f'<meta name="google-site-verification" content="{esc(cfg["google_site_verification"])}">\n'
    if cfg.get("adsense_client"):
        cl = esc(cfg["adsense_client"])
        HEAD_EXTRA += f'<meta name="google-adsense-account" content="{cl}">\n<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={cl}" crossorigin="anonymous"></script>\n'
    if cfg.get("cloudflare_analytics_token"):
        HEAD_EXTRA += f"<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{json.dumps({'token': cfg['cloudflare_analytics_token']})}'></script>\n"

    corridors = json.loads((SRC / "corridors.json").read_text(encoding="utf-8"))
    sitemap = []
    home_alts = {l: home_url(l) for l in LANGS}

    # Corridor paths per language
    cor_paths = {}
    for cor in corridors:
        cor["id"] = slugify(cname("en", cor["a"])) + "-" + slugify(cname("en", cor["b"]))
        for l in cor["langs"]:
            a, b = pair(cor, l)
            names = "en" if l == "ar" else l
            slug = slugify(cname(names, a)) + "-" + slugify(cname(names, b))
            cor_paths.setdefault(cor["id"], {})[l] = home_url(l) + f'{I18N[l]["meta"]["corridor_dir"]}/{slug}/'

    for lang in LANGS:
        h = I18N[lang]["home"]
        app_html = render(APP, {"team_attr": ""}, lang, "app.html")
        links = "".join(f'<li><a href="{cor_paths[c["id"]][lang]}">{esc(cname(lang, pair(c, lang)[0]))} ↔ {esc(cname(lang, pair(c, lang)[1]))}</a></li>'
                        for c in corridors if lang in c["langs"])
        pills = "".join(f"<li>{esc(p)}</li>" for p in h["pills"])
        content = (f'<section class="hero"><h1>{esc(h["h1"])}</h1><p>{esc(h["lead"])}</p><ul class="pills">{pills}</ul></section>\n'
                   f'{app_html}\n<article class="prose">{h["content"]}'
                   f'<h2>{esc(h["corridors_title"])}</h2><ul class="links">{links}</ul></article>')
        jsonld = {"@context": "https://schema.org", "@type": "WebApplication", "name": cfg["site_name"], "url": DOMAIN + home_url(lang),
                  "description": h["description"], "inLanguage": lang, "applicationCategory": "BusinessApplication",
                  "operatingSystem": "Any (web browser)", "isAccessibleForFree": True,
                  "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}}
        write(home_url(lang), page_shell(lang, h["title"], h["description"], home_url(lang), content, home_alts, jsonld=jsonld, with_app=True))
        sitemap.append(home_url(lang))

        for cor in corridors:
            if lang not in cor["langs"]:
                continue
            c = corridor_values(lang, cor)
            ui = I18N[lang]["corridor"]
            na, nb = (cname(lang, x) for x in pair(cor, lang))
            title = ui["title"].format(a=na, b=nb, year=YEAR)
            desc = ui["description"].format(a=na, b=nb, year=YEAR, h=c["diff_short"])
            app_html = render(APP, {"team_attr": f' data-team="{c["team_json"]}"'}, lang, "app.html")
            c["app"] = app_html
            c["h1"] = esc(ui["h1"].format(a=na, b=nb))
            others = "".join(f'<li><a href="{cor_paths[o["id"]][lang]}">{esc(cname(lang, pair(o, lang)[0]))} ↔ {esc(cname(lang, pair(o, lang)[1]))}</a></li>'
                             for o in corridors if lang in o["langs"] and o["id"] != cor["id"])
            c["others"] = others
            c["home"] = home_url(lang)
            body = render(CORR, {}, lang, "corridor.html", c)
            path = cor_paths[cor["id"]][lang]
            jsonld = {"@context": "https://schema.org", "@type": "WebPage", "name": title, "url": DOMAIN + path, "inLanguage": lang,
                      "isPartOf": {"@type": "WebSite", "name": cfg["site_name"], "url": DOMAIN + "/"}}
            write(path, page_shell(lang, title, desc, path, body, cor_paths[cor["id"]], jsonld=jsonld, with_app=True))
            sitemap.append(path)

    # Static pages (about, privacy, legal) in the languages that have them
    todo = [k for k, v in cfg.items() if isinstance(v, str) and "TO COMPLETE" in v]
    cfg_vals = {k: (f'<mark class="todo">{esc(v)}</mark>' if "TO COMPLETE" in v else esc(v)) for k, v in cfg.items() if isinstance(v, str)}
    for lang_dir in sorted((SRC / "pages").iterdir()):
        lang = lang_dir.name
        for f in sorted(lang_dir.glob("*.html")):
            text = f.read_text(encoding="utf-8")
            mm = META.match(text)
            meta = json.loads(mm.group(1))
            body = TOKEN.sub(lambda m: cfg_vals.get(m.group(2), m.group(0)), text[mm.end():])
            path = (home_url(lang) + meta["slug"] + "/") if meta.get("slug") else "/404.html"
            alts = {l: (home_url(l) + meta["slug"] + "/") for l in LANGS if (SRC / "pages" / l / f.name).exists()} if meta.get("slug") else None
            out = page_shell(lang, meta["title"].replace("{{site_name}}", cfg["site_name"]), meta["description"].replace("{{site_name}}", cfg["site_name"]),
                             path, body, alts, robots="noindex, follow" if not meta.get("slug") else "index, follow")
            if meta.get("slug"):
                write(path, out)
                sitemap.append(path)
            else:
                (DIST / "404.html").write_text(out, encoding="utf-8")

    today = dt.date.today().isoformat()
    (DIST / "sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
                                      + "".join(f"<url><loc>{DOMAIN}{p}</loc><lastmod>{today}</lastmod></url>" for p in sitemap)
                                      + "</urlset>\n", encoding="utf-8")
    (DIST / "robots.txt").write_text(f"User-agent: *\nAllow: /\n\nSitemap: {DOMAIN}/sitemap.xml\n", encoding="utf-8")
    if cfg.get("adsense_client"):
        (DIST / "ads.txt").write_text(f"google.com, {cfg['adsense_client'].replace('ca-', '')}, DIRECT, f08c47fec0942fa0\n", encoding="utf-8")
    (DIST / "_headers").write_text("/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n\n/data/*\n  Cache-Control: public, max-age=86400\n\n"
                                   "/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n", encoding="utf-8")
    if todo:
        print("⚠️  Fields to complete in config.json before going live:", ", ".join(todo))
    print(f"✅ {len(sitemap)} indexable pages in {len(LANGS)} languages → dist/")


if __name__ == "__main__":
    main()
