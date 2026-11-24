# Prompt per gli oggetti (Gemini)

Gli oggetti si preparano a **fogli**: una immagine con 9 oggetti in una griglia 3 × 3.
Lo script `tools/foglio.py` taglia ogni cella e toglie il fondo magenta.

Decisioni:
- Gli oggetti vanno **senza scritte**. I testi (tesi, avvisi, lettere) li scrivo io nel codice.
- Il contorno oro degli oggetti da toccare lo aggiungo io nel codice.

## Come usare i prompt

1. Apri una chat nuova per ogni foglio.
2. Allega come riferimento di stile uno sfondo riuscito (es. `tipografia.png`).
3. Incolla il **blocco di stile comune**, poi la lista del foglio.
4. Scarica in PNG alla massima risoluzione.

## Blocco di stile comune

```
Create a sprite sheet of items for a 2D point-and-click adventure game, in the
same style as the reference image: black and white seinen manga ink style,
dense cross-hatching, heavy black shadows, realistic detailed objects from
Germany in the early 16th century.
NO colour, only black, white and grey, unless a colour is listed.
Layout: a 3 x 3 grid of 9 separate items, one item centred in each cell, all
items about the same size and well separated (big empty space between them).
Each item seen from the front, slightly from above, alone, complete, not cut.
Solid flat pure magenta background (#FF00FF) everywhere: no shadows on the
floor, no grid lines, no frames, no text, no letters, no numbers.
Do not use magenta or pink on the items. Square image, high resolution.
Items, from top-left to bottom-right, row by row:
```

## Foglio 1 — Prologo e capitolo 1

```
1. a thick old law book with a leather cover, muddy and wet
2. a folded letter closed with a dark red wax seal (the seal is the only colour, #8b1e1e)
3. two small old books tied together with a string
4. a ream of blank paper tied with a string
5. a blank paper notice with a nail hole at the top, slightly torn
6. a small printed paper document with a dark red wax seal hanging on a ribbon (the seal is the only colour, #8b1e1e)
7. a small silver coin (an old German groschen), plain, no readable letters
8. a printer's composing stick: a small wooden and metal tray to hold metal type
9. a printer's ink ball: a round leather pad on a wooden handle, black with ink
```
Nomi per lo script: `libro-legge lettera-padre libri-poeti risma avviso lettera-indulgenza moneta compositoio mazzo-inchiostro`

## Foglio 2 — Capitolo 1

```
1. a large printed sheet of paper with columns of blank text lines (no readable letters)
2. a burning tallow candle in a simple iron holder
3. a heavy iron-bound wooden money chest with a slot in the lid
4. a folded delivery note with a string (no readable letters)
5. a small ornate reliquary box with a little glass window
6. a rolled letter closed with a large dark red wax seal with a ribbon (the seal is the only colour, #8b1e1e)
7. a small worn notebook with a leather cover and a pencil tied to it
8. a goose quill pen and a small inkwell
9. a single piece of metal printing type (a small metal block with a raised letter on top)
```
Nomi per lo script: `tesi candela cassa-monete bolla-consegna reliquiario lettera-roma taccuino penna carattere`

## Controllo del risultato

1. Fondo magenta pieno, senza ombre e senza righe della griglia.
2. Un oggetto per cella, intero, ben staccato dagli altri.
3. Nessuna scritta e nessun numero.
4. Unici colori: i sigilli rossi.
5. Ordine giusto: da sinistra a destra, dall'alto in basso.
6. Nomi dei file: `oggetti-1.png`, `oggetti-2.png`.
