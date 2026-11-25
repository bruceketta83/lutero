"""Prepara l'immagine di un personaggio per il generatore di video, senza deformarla.

Uso: python3 tools/formato_video.py personaggio.png uscita.png [3:4]

Aggiunge fondo magenta (#FF00FF) ai lati (o sopra e sotto) finché l'immagine ha
le proporzioni chieste (di default 3:4, cioè il formato 834 × 1112 del generatore).
La figura non cambia: cambia solo lo spazio intorno.
"""
import sys
from PIL import Image


def main(src, dst, rapporto='3:4'):
    a, b = (int(x) for x in rapporto.split(':'))
    im = Image.open(src).convert('RGB')
    w, h = im.size
    if w / h < a / b:                      # troppo stretta: allarga ai lati
        W, H = round(h * a / b), h
    else:                                  # troppo larga: allunga sopra e sotto
        W, H = w, round(w * b / a)
    out = Image.new('RGB', (W, H), (255, 0, 255))
    # In basso: i piedi restano vicino al bordo, lo spazio in più va in alto.
    out.paste(im, ((W - w) // 2, H - h))
    out.save(dst)
    print(dst, out.size)


if __name__ == '__main__':
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    main(*sys.argv[1:4])
