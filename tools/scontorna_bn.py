"""Toglie il fondo magenta (#FF00FF) dai personaggi in bianco e nero.

Uso: python3 tools/scontorna_bn.py ingresso.png uscita.webp [ingresso2.png uscita2.webp ...]
(più coppie = stesso personaggio, stesso ritaglio: per la camminata)

Il personaggio è grigio: ogni pixel del bordo è un misto di grigio e magenta.
Il canale verde non contiene magenta, quindi si ricava quanto magenta c'è e lo si toglie.
I pixel colorati che non sono magenta (il nastro azzurro, i sigilli rossi) restano uguali.
"""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage


def maschera(src):
    im = np.asarray(Image.open(src).convert('RGB')).astype(np.float32)
    r, g, b = im[..., 0], im[..., 1], im[..., 2]
    ref = np.median(im[:8, :8].reshape(-1, 3), axis=0)          # colore del fondo
    m = np.minimum(r, b) - g                                      # quanto è "magenta"
    k = np.clip(m / max(1.0, min(ref[0], ref[2]) - ref[1]), 0, 1)  # 1 = solo fondo
    alpha = 1 - k
    # Il fondo vero è collegato al bordo: i pixel quasi trasparenti dentro la figura restano opachi.
    bg = k > 0.9
    lab, _ = ndimage.label(bg)
    edge = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))
    outside = np.isin(lab, edge[edge > 0])
    alpha = np.where(outside, 0, np.where(k > 0.9, 1, alpha))
    # Colore senza magenta: grigio = verde / alpha. Solo dove c'era magenta.
    a = np.maximum(alpha, 1e-3)
    gray = np.clip(g / a, 0, 255)
    mixed = (m > 12) & ~outside
    out = im.copy()
    for c in range(3):
        out[..., c] = np.where(mixed, gray, im[..., c])
    alpha = ndimage.binary_opening(alpha > 0.02, iterations=1) * alpha   # via i puntini isolati
    rgba = np.dstack([out, alpha * 255]).clip(0, 255).astype(np.uint8)
    return Image.fromarray(rgba, 'RGBA')


def riquadro(img, pad=6):
    a = np.asarray(img)[..., 3]
    rows = np.where((a > 200).sum(axis=1) > 3)[0]
    cols = np.where((a > 120).sum(axis=0) > 3)[0]
    return (max(0, cols[0] - pad), max(0, rows[0] - pad), min(img.width, cols[-1] + pad), rows[-1] + 1)


def scontorna(srcs, dsts, height=640):
    imgs = [maschera(s) for s in srcs]
    boxes = [riquadro(i) for i in imgs]
    box = (min(b[0] for b in boxes), min(b[1] for b in boxes), max(b[2] for b in boxes), max(b[3] for b in boxes))
    for img, dst in zip(imgs, dsts):
        c = img.crop(box)
        c = c.resize((round(c.width * height / c.height), height), Image.LANCZOS)
        c.save(dst, quality=90)
        print(dst, c.size)


if __name__ == '__main__':
    args = sys.argv[1:]
    if len(args) < 2 or len(args) % 2:
        sys.exit(__doc__)
    scontorna(args[0::2], args[1::2])
