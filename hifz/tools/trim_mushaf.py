"""Recadre les marges blanches des pages du mushaf (garde 2 % de marge), en place."""
import sys, os
from concurrent.futures import ThreadPoolExecutor
from PIL import Image, ImageChops
D = sys.argv[1]
def trim(f):
    im = Image.open(f).convert('RGB')
    bg = Image.new('RGB', im.size, (255, 255, 255))
    diff = ImageChops.difference(im, bg).convert('L').point(lambda v: 255 if v > 24 else 0)
    box = diff.getbbox()
    if not box:
        return f, im.size, im.size
    pad = round(0.02 * im.size[0])
    l, t, r, b = max(0, box[0] - pad), max(0, box[1] - pad), min(im.size[0], box[2] + pad), min(im.size[1], box[3] + pad)
    out = im.crop((l, t, r, b))
    if out.size[0] < 900:  # pages décorées (1 et 2) : on les ramène à la largeur des autres
        out = out.resize((900, round(out.size[1] * 900 / out.size[0])), Image.LANCZOS)
    out.save(f, 'WEBP', quality=66, method=6)
    return f, im.size, out.size
files = sorted(os.path.join(D, x) for x in os.listdir(D) if x.endswith('.webp'))
with ThreadPoolExecutor(4) as ex:
    res = list(ex.map(trim, files))
for f, a, b in res[:3] + res[-2:]:
    print(os.path.basename(f), a, '→', b)
print(len(res), 'pages,', sum(os.path.getsize(f) for f in files) // 2**20, 'MB')
