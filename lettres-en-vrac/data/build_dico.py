#!/usr/bin/env python3
"""Génère src/assets/dico.txt : la liste de mots français utilisée par les outils.

Sources (à télécharger avant de lancer le script) :
  - an-array-of-french-words 2.0.0 (npm, licence MIT) : `npm pack an-array-of-french-words`
    → fichier package/index.json (~336 000 mots, formes fléchies incluses)
  - wordfreq 3.1.1 (PyPI, données CC BY-SA 4.0, Robyn Speer) : `pip download wordfreq --no-deps`
    → fichier wordfreq/data/large_fr.msgpack.gz (fréquences d'usage, sert au classement)
  - msgpack (PyPI) pour lire le fichier de fréquences.

Usage :
  python3 build_dico.py chemin/index.json chemin/large_fr.msgpack.gz ../src/assets/dico.txt

Format de sortie : texte brut, un mot par ligne, en 5 blocs de fréquence
(#0 = très courant … #4 = rare / sans fréquence connue), triés alphabétiquement
dans chaque bloc pour une meilleure compression gzip/brotli.
"""
import gzip
import json
import re
import sys

import msgpack

VALID = re.compile(r"[a-zàâäçéèêëîïôöùûüÿœæ]+")
# Tailles cumulées des blocs de fréquence (en nombre de mots les plus fréquents)
CUTS = [3000, 15000, 55000]


def main(words_path, freq_path, out_path):
    words = json.load(open(words_path, encoding="utf-8"))
    words = sorted({w for w in words if VALID.fullmatch(w)})

    data = msgpack.unpackb(gzip.open(freq_path).read(), raw=False)
    rank = {}
    for i, bucket in enumerate(data[1:]):  # data[0] = en-tête de format
        for w in bucket:
            rank.setdefault(w, i)

    known = sorted((w for w in words if w in rank), key=lambda w: (rank[w], w))
    blocks = [[] for _ in range(5)]
    for pos, w in enumerate(known):
        b = next((k for k, cut in enumerate(CUTS) if pos < cut), 3)
        blocks[b].append(w)
    known_set = set(known)
    blocks[4] = [w for w in words if w not in known_set]

    with open(out_path, "w", encoding="utf-8") as f:
        for k, block in enumerate(blocks):
            f.write(f"#{k}\n")
            f.write("\n".join(sorted(block)))
            f.write("\n")
    print(f"{len(words)} mots écrits dans {out_path} :", [len(b) for b in blocks])


if __name__ == "__main__":
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    main(*sys.argv[1:])
