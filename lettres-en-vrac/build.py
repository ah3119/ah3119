#!/usr/bin/env python3
"""Génère le site statique dans dist/ à partir de src/ et config.json.

Usage :  python3 build.py
Aucune dépendance (Python 3.8+). Le dossier dist/ est prêt à être envoyé
tel quel chez n'importe quel hébergeur statique (Cloudflare Pages, Netlify,
GitHub Pages, Hostinger…).

Chaque page de src/pages/ commence par un commentaire de métadonnées :
  <!--meta {"path": "/anagramme/", "title": "...", "description": "...", ...} -->
"""
import datetime
import hashlib
import html
import json
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC, DIST = ROOT / "src", ROOT / "dist"
META_RE = re.compile(r"\A<!--meta\s+(\{.*?\})\s*-->\s*", re.S)
TOKEN_RE = re.compile(r"\{\{(\w+)\}\}")


def load_pages():
    pages = []
    for f in sorted((SRC / "pages").glob("*.html")):
        text = f.read_text(encoding="utf-8")
        m = META_RE.match(text)
        if not m:
            sys.exit(f"Métadonnées manquantes dans {f.name}")
        meta = json.loads(m.group(1))
        meta["body"] = text[m.end():]
        meta["file"] = f.name
        pages.append(meta)
    return pages


def fingerprint(src: Path, dest_dir: Path) -> str:
    digest = hashlib.sha256(src.read_bytes()).hexdigest()[:10]
    name = f"{src.stem}.{digest}{src.suffix}"
    shutil.copyfile(src, dest_dir / name)
    return f"/assets/{name}"


def render(template: str, values: dict, where: str) -> str:
    def sub(m):
        key = m.group(1)
        if key not in values:
            sys.exit(f"Variable inconnue {{{{{key}}}}} dans {where}")
        return str(values[key])
    return TOKEN_RE.sub(sub, template)


def main():
    cfg = json.loads((ROOT / "config.json").read_text(encoding="utf-8"))
    domain = cfg["domain"].rstrip("/")
    if DIST.exists():
        shutil.rmtree(DIST)
    (DIST / "assets").mkdir(parents=True)

    # Ressources avec empreinte (cache longue durée possible)
    assets = SRC / "assets"
    css = fingerprint(assets / "style.css", DIST / "assets")
    js = fingerprint(assets / "app.js", DIST / "assets")
    dico = fingerprint(assets / "dico.txt", DIST / "assets")
    worker = fingerprint(assets / "worker.js", DIST / "assets") + "?" + dico
    for static in ("favicon.svg",):
        shutil.copyfile(assets / static, DIST / static)

    pages = load_pages()
    tools = sorted([p for p in pages if p.get("group") == "tools"], key=lambda p: p.get("order", 99))
    site = sorted([p for p in pages if p.get("group") == "site"], key=lambda p: p.get("order", 99))

    # Avertissements : champs légaux non remplis
    todo = [k for k, v in cfg.items() if isinstance(v, str) and "À COMPLÉTER" in v]
    if todo:
        print("⚠️  Champs à compléter dans config.json avant la mise en ligne :", ", ".join(todo))

    head_extra = []
    if cfg.get("google_site_verification"):
        head_extra.append(f'<meta name="google-site-verification" content="{html.escape(cfg["google_site_verification"])}">')
    if cfg.get("adsense_client"):
        client = html.escape(cfg["adsense_client"])
        head_extra.append(f'<meta name="google-adsense-account" content="{client}">')
        head_extra.append(f'<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={client}" crossorigin="anonymous"></script>')
    if cfg.get("cloudflare_analytics_token"):
        token = json.dumps({"token": cfg["cloudflare_analytics_token"]})
        head_extra.append(f"<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{token}'></script>")

    layout = (SRC / "layout.html").read_text(encoding="utf-8")
    year = datetime.date.today().year
    def cfg_value(v):
        if not isinstance(v, str):
            return v
        v = html.escape(v)
        return f'<mark class="todo">{v}</mark>' if "À COMPLÉTER" in v else v
    base_values = {k: cfg_value(v) for k, v in cfg.items()}

    def link_list(items, current=None):
        out = []
        for p in items:
            cur = ' aria-current="page"' if current and p["path"] == current else ""
            out.append(f'<li><a href="{p["path"]}"{cur}>{html.escape(p.get("nav", p["title"]))}</a></li>')
        return "".join(out)

    def tool_cards(current):
        cards = [f'<li><a href="{p["path"]}"><strong>{html.escape(p["nav"])}</strong><span>{html.escape(p["card"])}</span></a></li>'
                 for p in tools if p["path"] != current]
        return '<ul class="cards">' + "".join(cards) + "</ul>"

    sitemap = []
    for p in pages:
        canonical = domain + p["path"]
        if p.get("tool"):
            jsonld = {"@context": "https://schema.org", "@type": "WebApplication", "name": p.get("h1", p["title"]),
                      "url": canonical, "description": p["description"], "inLanguage": "fr",
                      "applicationCategory": "UtilitiesApplication", "operatingSystem": "Tous (navigateur web)",
                      "isAccessibleForFree": True, "offers": {"@type": "Offer", "price": "0", "priceCurrency": "EUR"},
                      "publisher": {"@type": "Organization", "name": cfg["site_name"], "url": domain + "/"}}
        else:
            jsonld = {"@context": "https://schema.org", "@type": "WebPage", "name": p["title"].replace("{{site_name}}", cfg["site_name"]), "url": canonical,
                      "inLanguage": "fr", "isPartOf": {"@type": "WebSite", "name": cfg["site_name"], "url": domain + "/"}}
        if p["path"] == "/":
            jsonld = [{"@context": "https://schema.org", "@type": "WebSite", "name": cfg["site_name"], "url": domain + "/",
                       "inLanguage": "fr"}, jsonld]

        values = dict(base_values)
        values.update({"tool_cards": tool_cards(p["path"]), "year": year})
        body = render(p["body"], values, p["file"])
        plain = {k: v for k, v in cfg.items() if isinstance(v, str)}
        title = TOKEN_RE.sub(lambda m: plain.get(m.group(1), m.group(0)), p["title"])
        description = TOKEN_RE.sub(lambda m: plain.get(m.group(1), m.group(0)), p["description"])
        values.update({
            "title": html.escape(title),
            "description": html.escape(description),
            "canonical": canonical,
            "robots": "noindex, follow" if p.get("noindex") else "index, follow, max-image-preview:large",
            "css": css, "js": js, "worker": worker,
            "jsonld": json.dumps(jsonld, ensure_ascii=False).replace("</", "<\\/"),
            "head_extra": "\n".join(head_extra),
            "nav": link_list(tools, p["path"]),
            "footer_tools": link_list(tools),
            "footer_site": link_list(site),
            "content": body,
        })
        out = render(layout, values, "layout.html")

        if p.get("output"):
            dest = DIST / p["output"]
        else:
            dest = DIST / p["path"].strip("/") / "index.html" if p["path"] != "/" else DIST / "index.html"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(out, encoding="utf-8")
        if not p.get("noindex"):
            sitemap.append((canonical, p.get("priority", 0.5)))

    today = datetime.date.today().isoformat()
    urls = "".join(f"<url><loc>{u}</loc><lastmod>{today}</lastmod><priority>{pr}</priority></url>" for u, pr in sitemap)
    (DIST / "sitemap.xml").write_text(
        f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{urls}</urlset>\n',
        encoding="utf-8")
    (DIST / "robots.txt").write_text(f"User-agent: *\nAllow: /\n\nSitemap: {domain}/sitemap.xml\n", encoding="utf-8")
    if cfg.get("adsense_client"):
        pub = cfg["adsense_client"].replace("ca-", "")
        (DIST / "ads.txt").write_text(f"google.com, {pub}, DIRECT, f08c47fec0942fa0\n", encoding="utf-8")
    # En-têtes de cache (Cloudflare Pages / Netlify)
    (DIST / "_headers").write_text(
        "/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n\n"
        "/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n",
        encoding="utf-8")

    print(f"✅ {len(pages)} pages générées dans {DIST.relative_to(ROOT)}/ ({len(sitemap)} dans le sitemap)")


if __name__ == "__main__":
    main()
