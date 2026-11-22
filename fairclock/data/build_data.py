#!/usr/bin/env python3
"""Génère les données de Fairclock : villes (fuseau horaire) et jours fériés par pays.

Dépendances (PyPI) : holidays (MIT), geonamescache (MIT, données GeoNames CC BY 4.0).
  pip install holidays geonamescache
Usage : python3 build_data.py ../src/data
Sorties :
  tzmap.json         {fuseau: [ville principale, pays]}
  cities.json        [[nom, pays, fuseau, population_en_milliers, "autres noms|..."], ...]
  h/<PAYS>.json      {"w": [jours de week-end ISO 1=lundi..7=dimanche], "h": [[date, {langue: nom}], ...]}
"""
import json
import re
import sys
import warnings
from pathlib import Path

import geonamescache
import holidays

warnings.filterwarnings("ignore")
YEARS = (2026, 2027, 2028)
UI_LANGS = ("en", "es", "fr", "de", "pt", "ar")
ARABIC = re.compile(r"^[؀-ۿ\s\-']+$")
LATIN = re.compile(r"^[A-Za-zÀ-ÖØ-öø-ÿĀ-žȘ-ț\s\-'.]+$")
NOT_ARABIC = re.compile(r"[پچژگکیۀٹڈڑںھےۃ]")  # lettres propres au persan / ourdou


def pick_lang(supported, ui):
    """Trouve la variante de langue de la bibliothèque correspondant à une langue d'interface."""
    if ui == "en":
        for cand in ("en_US", "en_GB", "en"):
            if cand in supported:
                return cand
    for cand in supported:
        if cand == ui or cand.startswith(ui + "_"):
            return cand
    return None


def build_holidays(out: Path):
    (out / "h").mkdir(parents=True, exist_ok=True)
    count = 0
    for cc in sorted(c for c in holidays.list_supported_countries() if len(c) == 2):
        try:
            base = holidays.country_holidays(cc, years=YEARS)
        except Exception:
            continue
        supported = base.supported_languages or ()
        names = {}
        for ui in UI_LANGS:
            lib_lang = pick_lang(supported, ui)
            if ui == "en" and not lib_lang:
                lib_lang = None  # langue par défaut
            if ui != "en" and not lib_lang:
                continue
            h = holidays.country_holidays(cc, years=YEARS, language=lib_lang)
            for d, n in h.items():
                names.setdefault(d.isoformat(), {})[ui] = n
        weekend = sorted(w + 1 for w in base.weekend)  # Python lundi=0 → ISO lundi=1
        rows = []
        for d in sorted(names):
            n = names[d]
            en = n.get("en")
            # Ne garder les traductions que si elles diffèrent de l'anglais
            rows.append([d, {k: v for k, v in n.items() if k == "en" or v != en}])
        (out / "h" / f"{cc}.json").write_text(json.dumps({"w": weekend, "h": rows}, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
        count += 1
    return count


def build_cities(out: Path):
    gc = geonamescache.GeonamesCache()
    cities = gc.get_cities()
    capitals = {(c["iso"], c["capital"]) for c in gc.get_countries().values()}
    best_per_tz = {}
    for c in cities.values():
        tz = c["timezone"]
        if tz and (tz not in best_per_tz or c["population"] > best_per_tz[tz]["population"]):
            best_per_tz[tz] = c
    keep = []
    for c in cities.values():
        if not c["timezone"]:
            continue
        if c["population"] >= 100_000 or (c["countrycode"], c["name"]) in capitals or best_per_tz.get(c["timezone"]) is c:
            alts = []
            for a in c.get("alternatenames", []):
                a = a.strip()
                if not a or a == c["name"] or a in alts:
                    continue
                if ARABIC.match(a) and not NOT_ARABIC.search(a) and not any(ARABIC.match(x) for x in alts):
                    alts.append(a)
                elif LATIN.match(a) and len(a) <= 40 and a.lower() != c["name"].lower() and sum(1 for x in alts if LATIN.match(x)) < 5:
                    alts.append(a)
            keep.append([c["name"], c["countrycode"], c["timezone"], round(c["population"] / 1000), "|".join(alts)])
    keep.sort(key=lambda r: -r[3])
    tzmap = {}
    for name, cc, tz, _pop, _alts in keep:  # trié par population : la première ville gagne
        tzmap.setdefault(tz, [name, cc])
    # Anciens noms encore renvoyés par certains navigateurs (ICU)
    aliases = {"Asia/Calcutta": "Asia/Kolkata", "Europe/Kiev": "Europe/Kyiv", "Asia/Saigon": "Asia/Ho_Chi_Minh",
               "Asia/Katmandu": "Asia/Kathmandu", "Asia/Rangoon": "Asia/Yangon", "America/Buenos_Aires": "America/Argentina/Buenos_Aires",
               "Asia/Dacca": "Asia/Dhaka", "Atlantic/Faeroe": "Atlantic/Faroe", "America/Godthab": "America/Nuuk",
               "Pacific/Truk": "Pacific/Chuuk", "Asia/Ulan_Bator": "Asia/Ulaanbaatar", "Europe/Uzhgorod": "Europe/Kyiv"}
    for old, new in aliases.items():
        if new in tzmap:
            tzmap.setdefault(old, tzmap[new])
    (out / "tzmap.json").write_text(json.dumps(tzmap, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    (out / "cities.json").write_text(json.dumps(keep, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    return len(keep)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    out = Path(sys.argv[1])
    print("pays :", build_holidays(out))
    print("villes :", build_cities(out))
