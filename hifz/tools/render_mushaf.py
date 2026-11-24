"""Convertit les 604 pages officielles (AI/PDF du Complexe du Roi Fahd) en WebP pour le web."""
import os, subprocess, sys, tempfile, zipfile
from concurrent.futures import ThreadPoolExecutor
from PIL import Image
ZIP, OUT = sys.argv[1], sys.argv[2]
z = zipfile.ZipFile(ZIP)
names = sorted(n for n in z.namelist() if n.endswith('.ai'))
assert len(names) == 604
tmp = tempfile.mkdtemp()
def one(n):
    p = int(os.path.basename(n)[:3])
    dest = os.path.join(OUT, f'{p:03d}.webp')
    if os.path.exists(dest):
        return 0
    src = os.path.join(tmp, f'{p:03d}.pdf')
    with z.open(n) as f, open(src, 'wb') as g:
        g.write(f.read())
    png = os.path.join(tmp, f'{p:03d}')
    subprocess.run(['pdftocairo', '-png', '-singlefile', '-scale-to-x', '960', '-scale-to-y', '-1', src, png], check=True)
    Image.open(png + '.png').convert('RGB').save(dest, 'WEBP', quality=66, method=6)
    os.remove(src); os.remove(png + '.png')
    return os.path.getsize(dest)
import threading
lock = threading.Lock()
def safe(n):
    with lock:
        data = None
    return one(n)
# zipfile n'est pas sûr en parallèle : on extrait séquentiellement, on convertit en parallèle
def extract_all():
    for n in names:
        p = int(os.path.basename(n)[:3])
        if os.path.exists(os.path.join(OUT, f'{p:03d}.webp')):
            continue
        with z.open(n) as f, open(os.path.join(tmp, f'{p:03d}.pdf'), 'wb') as g:
            g.write(f.read())
extract_all()
def conv(p):
    dest = os.path.join(OUT, f'{p:03d}.webp')
    if os.path.exists(dest):
        return os.path.getsize(dest)
    src = os.path.join(tmp, f'{p:03d}.pdf'); png = os.path.join(tmp, f'{p:03d}')
    subprocess.run(['pdftocairo', '-png', '-singlefile', '-scale-to-x', '960', '-scale-to-y', '-1', src, png], check=True)
    Image.open(png + '.png').convert('RGB').save(dest, 'WEBP', quality=66, method=6)
    os.remove(src); os.remove(png + '.png')
    return os.path.getsize(dest)
with ThreadPoolExecutor(4) as ex:
    sizes = list(ex.map(conv, range(1, 605)))
print(len(sizes), 'pages,', sum(sizes) // 2**20, 'MB, max', max(sizes) // 1024, 'KB')
