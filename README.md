# ✒️ Inchiostro e Tempesta

Gioco di storia su Martin Lutero e la Riforma protestante, per la scuola media.
Avventura punta-e-clicca in stile fumetto in bianco e nero.

Indirizzo (quando sarà pubblicato): https://bruceketta83.github.io/lutero/

Stato: **prima stanza giocabile**, la tipografia con Lena che cammina. Il resto del prologo e del capitolo 1 è in progettazione.

## Documenti

- [PROGETTO.md](PROGETTO.md): decisioni, obiettivi didattici, personaggi, storia del prologo e del capitolo 1, bozza dei capitoli successivi.
- [GRAFICA.md](GRAFICA.md): stile, colori, formati delle immagini, uso di Gemini.
- [DIALOGHI.md](DIALOGHI.md): tono, forma e voce dei personaggi.
- [docs/PROMPT-SFONDI.md](docs/PROMPT-SFONDI.md), [docs/PROMPT-PERSONAGGI.md](docs/PROMPT-PERSONAGGI.md), [docs/PROMPT-OGGETTI.md](docs/PROMPT-OGGETTI.md): i prompt per preparare le immagini.

## Cartelle

- `index.html`, `style.css`, `js/`: il gioco. `js/stanze.js` contiene le stanze (sfondo, luci, oggetti, testi), `js/gioco.js` il motore.
- `tests/`: test automatici (Playwright). Avvio: `npm test`.

- `img/`: immagini pronte per il gioco (sfondi in `img/bg/`, personaggi in `img/chars/`).
- `originali/`: immagini originali di Gemini, per rifare i ritagli.
- `tools/`: strumenti per preparare le immagini (vedi [GRAFICA.md](GRAFICA.md)).

## Prossimi passi

1. Preparare con Gemini gli sfondi, i personaggi e gli oggetti del prologo e del capitolo 1.
2. Portare il motore di gioco da Espo-Nentia (stanze, dialoghi, Taccuino, opzioni di lettura, gioco offline, test).
3. Scrivere i dialoghi del prologo e del capitolo 1, dopo il controllo dei fatti (PROGETTO.md, sezione 9).
