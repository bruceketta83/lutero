"""Prepara la camminata di un personaggio dalle immagini di Gemini.

Uso:
  python3 tools/camminata.py NOME ferma.jpg foglio1.jpg foglio2.jpg ... [--sfondo sfondo.jpg]

- ferma.jpg: il personaggio fermo, su fondo magenta.
- fogli: immagini con 2 pose ciascuna, una accanto all'altra, su fondo magenta.
  L'ordine dei fogli e delle pose (da sinistra a destra) è l'ordine del ciclo.

Risultato in img/chars/:
- NOME.webp: la posa ferma;
- NOME-cammina-1.webp ... NOME-cammina-N.webp: le pose del ciclo.
Tutte le immagini hanno la stessa tela: la testa allo stesso punto in orizzontale,
i piedi sulla stessa riga in basso, tutte le figure alte ALTEZZA pixel.

Con --sfondo crea anche un'anteprima animata in originali/anteprime/NOME-camminata.gif.
"""
import os
import sys

import numpy as np
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from scontorna_bn import maschera  # noqa: E402

ALTEZZA = 700           # altezza della figura, in pixel
TELA = (560, 720)       # larghezza e altezza della tela comune
TESTA_X = 280           # posizione orizzontale della testa nella tela
MARGINE_BASSO = 4       # pixel tra i piedi e il bordo in basso
DURATA_POSA = 240       # millisecondi per posa nell'anteprima


def figura(rgba):
    """Ritaglia la figura: restituisce l'immagine, la x della testa e l'altezza."""
    a = np.asarray(rgba)[..., 3]
    righe = np.where((a > 200).sum(axis=1) > 2)[0]
    colonne = np.where((a > 120).sum(axis=0) > 2)[0]
    alto, basso = righe[0], righe[-1]
    testa_x = np.where(a[alto:alto + 40] > 200)[1].mean()
    crop = rgba.crop((colonne[0], alto, colonne[-1] + 1, basso + 1))
    return crop, testa_x - colonne[0], basso - alto


def due_pose(src):
    """Separa le 2 pose di un foglio nella colonna più vuota tra il 30% e il 70% della larghezza."""
    m = maschera(src)
    a = np.asarray(m)
    occ = (a[..., 3] > 40).sum(axis=0)
    w = a.shape[1]
    lo, hi = int(w * 0.3), int(w * 0.7)
    taglio = lo + int(np.argmin(occ[lo:hi]))
    if occ[taglio] > 0:
        print(f'ATTENZIONE {src}: le due pose si toccano, taglio sulla colonna {taglio}')
    pose = []
    for x0, x1 in ((0, taglio), (taglio, w)):
        p = np.zeros_like(a)
        p[:, x0:x1] = a[:, x0:x1]
        pose.append(Image.fromarray(p, 'RGBA'))
    return pose


def su_tela(rgba):
    crop, testa_x, h = figura(rgba)
    s = ALTEZZA / h
    fig = crop.resize((round(crop.width * s), ALTEZZA), Image.LANCZOS)
    tela = Image.new('RGBA', TELA, (0, 0, 0, 0))
    tela.alpha_composite(fig, (int(TESTA_X - testa_x * s), TELA[1] - ALTEZZA - MARGINE_BASSO))
    return tela


def anteprima(nome, pose, sfondo, uscita):
    bg = Image.open(sfondo).convert('RGBA')
    bh = bg.height
    s = bh * 0.62 / ALTEZZA
    fr = [p.resize((int(TELA[0] * s), int(TELA[1] * s)), Image.LANCZOS) for p in pose]
    a = np.asarray(pose[0])[..., 3]
    piedi = np.where(a[TELA[1] - 60:] > 150)[1]
    passo = (piedi.max() - piedi.min()) * 0.85 / 4 * s
    sali = [0, -6, -8, -4] * (len(pose) // 4 + 1)
    out, x = [], -40.0
    for k in range(len(pose) * 4):
        i = k % len(pose)
        f = bg.copy()
        f.alpha_composite(fr[i], (int(x), int(bh * 0.97 - TELA[1] * s + sali[i] * s)))
        out.append(f.convert('P', palette=Image.ADAPTIVE))
        x += passo
    out[0].save(uscita, save_all=True, append_images=out[1:], duration=DURATA_POSA, loop=0)
    print(uscita)


def main(args):
    sfondo = None
    if '--sfondo' in args:
        i = args.index('--sfondo')
        sfondo = args[i + 1]
        del args[i:i + 2]
    if len(args) < 3:
        sys.exit(__doc__)
    nome, ferma, fogli = args[0], args[1], args[2:]
    radice = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    cartella = os.path.join(radice, 'img', 'chars')
    os.makedirs(cartella, exist_ok=True)
    su_tela(maschera(ferma)).save(os.path.join(cartella, f'{nome}.webp'), quality=90)
    pose = [su_tela(p) for f in fogli for p in due_pose(f)]
    for i, p in enumerate(pose, 1):
        p.save(os.path.join(cartella, f'{nome}-cammina-{i}.webp'), quality=90)
    print(f'{nome}: posa ferma e {len(pose)} pose della camminata in img/chars/')
    if sfondo:
        cart = os.path.join(radice, 'originali', 'anteprime')
        os.makedirs(cart, exist_ok=True)
        anteprima(nome, pose, sfondo, os.path.join(cart, f'{nome}-camminata.gif'))


if __name__ == '__main__':
    main(sys.argv[1:])
