# Video di fine capitolo: riassunto con voce narrante (Gemini + Seedance)

Alla fine di ogni capitolo, un video di circa **1 minuto** riassume le cose importanti da sapere.
Una voce narrante (registrata da Matteo) spiega i fatti. Le immagini, in stile fumetto noir, li accompagnano.
Leggi prima [GRAFICA.md](../GRAFICA.md).

**Regole del video**
1. **Didattico:** ogni frase della narrazione dice un fatto del capitolo. Niente fatti nuovi che il gioco non spiega.
2. **Accattivante:** un'inquadratura forte per ogni frase, movimenti lenti, contrasto forte, un solo colore (il rosso).
3. **Fatti e leggende separati,** come nel gioco: quando un fatto è incerto, la narrazione lo dice.
4. **Nessuno parla nelle immagini:** parla solo la voce narrante. Il labiale dei generatori viene male.
5. **Sottotitoli:** il testo della narrazione compare anche scritto, per chi non sente o legge meglio.
6. **Alla fine, il riquadro «Da sapere»:** 3 fatti da ricordare, scritti. Lo faccio io nel gioco, non serve generarlo.

## Come si lavora

1. **Registra la narrazione** (vedi «La voce narrante»). La durata della voce decide la durata di ogni inquadratura.
2. **Immagini con Gemini:** una per ogni inquadratura. Apri una chat nuova per ogni immagine.
3. Allega le immagini di riferimento indicate (sfondi e personaggi del gioco, cartella `img/`).
4. Incolla il **blocco di stile per le immagini**, poi il prompt dell'inquadratura.
5. Controlla l'immagine con la lista in fondo. Se non va, rifalla: costa meno che rifare il video.
6. **Video con Seedance,** da immagine a video: carica l'immagine come primo fotogramma.
7. Incolla il **blocco di stile per il movimento**, poi il prompt del movimento.
8. Formato 16:9, alla risoluzione più alta. Durata: quella indicata per l'inquadratura (5 o 10 secondi). Se il video è più lungo della frase, lo taglio io.
9. Salva i file in `originali/video/` con i nomi indicati (es. `cap1-1.mp4`), insieme alla narrazione (`narrazione-cap1.m4a`).
10. Io unisco i pezzi sulla voce, aggiungo i sottotitoli e il riquadro «Da sapere», e comprimo per il telefono (sotto i 10 MB).

**Non scrivere nomi di fumetti o di film** (Sin City, Berserk): i generatori a volte rifiutano, e il risultato copia invece di ispirarsi. I blocchi di stile descrivono lo stile a parole.

## La voce narrante

1. Registra in una stanza silenziosa, senza eco (una stanza con tende e divano va bene).
2. Tieni il telefono a 20 cm dalla bocca, un po' di lato, per non soffiare sul microfono.
3. Leggi piano, con il tono di chi racconta una storia vera. Per ragazzi delle medie: circa 2 parole al secondo.
4. Fai una pausa di 1 secondo tra una frase e la successiva: mi serve per tagliare.
5. Se sbagli, ripeti tutta la frase dopo una pausa. Tolgo io la frase sbagliata.
6. Un solo file per capitolo, in m4a o wav (il registratore vocale del telefono va bene).

## Blocco di stile per le immagini (Gemini)

```
High-contrast black and white graphic novel art, noir comic style: large areas
of solid pure black, stark white highlights, hard rim light, deep shadows that
swallow the shapes, bold silhouettes, almost no grey. Fine white lines for rain.
Strong cinematic framing, like a single panel of a dark comic book.
Historical setting: Saxony, Germany, 1517-1518. Realistic people and places,
normal proportions, no fantasy elements.
NO colour at all, only black and white, EXCEPT the one red detail listed below,
which is a deep dark red (#8b1e1e).
No text, no letters, no numbers, no watermark, no frame, no panel borders,
no speech bubbles. Papers and books show only unreadable lines, never words.
Landscape 16:9, 2576 x 1438 pixels.
```

## Blocco di stile per il movimento (Seedance)

```
Keep the exact look of the first frame: high-contrast black and white noir comic
art, solid blacks, white highlights, the only colour is the dark red detail.
Slow, dramatic movement. The camera is almost still: only a slow push-in or a
slow pan. Do not change faces, clothes or the place. No new people. No text.
Nobody speaks: mouths stay closed.
Sound: very quiet ambient sounds only (rain, wind, fire, paper). No music,
no speech, no narration.
```

## Capitolo 1 — «Inchiostro e indulgenze» (1517–1518)

### Il testo della narrazione

Circa 150 parole, circa 65 secondi. Ogni numero è un'inquadratura.

| N. | Narrazione (da leggere) | Durata |
| :--- | :--- | :--- |
| 1 | «Wittenberg, primavera 1517. Lena ha tredici anni e lavora nella tipografia di Mastro Grunenberg.» | ~7 s |
| 2 | «A Jüterbog, appena fuori dalla Sassonia, il frate Johann Tetzel predica l'indulgenza. Chi dà un'offerta, dice, libera dal purgatorio le anime dei suoi cari.» | ~10 s |
| 3 | «Metà dei soldi va a Roma, per la nuova basilica di San Pietro. L'altra metà serve all'arcivescovo Alberto, per pagare un debito con i banchieri Fugger.» | ~10 s |
| 4 | «Il frate Martin Lutero, professore a Wittenberg, non è d'accordo. Per lui il perdono di Dio non si compra.» | ~7 s |
| 5 | «Il 31 ottobre 1517 manda le sue 95 tesi all'arcivescovo Alberto. Secondo la tradizione, le affigge anche alla porta della Chiesa del Castello. Ma gli storici ne discutono.» | ~10 s |
| 6 | «Le tesi sono in latino, per una disputa all'università. Ma la stampa le copia in migliaia di fogli, e presto anche in tedesco.» | ~8 s |
| 7 | «In poche settimane, le leggono in tutta la Germania.» | ~4 s |
| 8 | «Agosto 1518. Da Roma arriva una lettera. Il papa chiama Lutero a rispondere delle sue tesi.» | ~8 s |

**Riquadro «Da sapere»** (scritto, alla fine, lo faccio io):
1. L'**indulgenza** toglieva la pena dei peccati già perdonati. Tetzel la offriva in cambio di un'offerta in denaro.
2. Il **31 ottobre 1517** Lutero manda le **95 tesi** all'arcivescovo Alberto.
3. La **stampa** porta le idee di Lutero in tutta la Germania in poche settimane.

### Le inquadrature

**1 — `cap1-1` — Wittenberg, la tipografia** (5 s)

Allega: `img/bg/tipografia.webp`, `img/chars/lena.webp`.

Immagine (Gemini):
```
Inside a dark 16th-century print shop (the attached background). A 13-year-old
girl (the attached character: apron, simple dress, a pale blue ribbon in her
hair) stands next to the wooden printing press and looks at a freshly printed
white sheet in her hands. Lit by one window: hard white light on the sheet and
on her face, everything else deep black. Medium shot.
Red detail: none. (Keep her ribbon grey: no colour in this image.)
```
Movimento (Seedance):
```
The girl slowly lifts the printed sheet towards the light and looks at it.
Dust moves in the beam of light from the window. Slow push-in.
Sound: quiet creak of the wooden press, a sheet of paper.
```

**2 — `cap1-2` — Tetzel e la moneta** (10 s)

Allega: `img/bg/jueterbog.webp`, `img/chars/tetzel.webp`.

Immagine (Gemini):
```
A town square at dusk (the attached background). A heavy Dominican friar (the
attached character: white habit, black cloak) preaches from a wooden platform,
one hand raised high. Next to him, a tall wooden cross with a coat of arms with
two crossed keys: the coat of arms is the only colour, deep dark red (#8b1e1e).
In front, an iron-bound wooden chest. A crowd of black silhouettes looks up at
him. Low camera, from behind the crowd.
Red detail: the coat of arms on the cross only.
```
Movimento (Seedance):
```
The friar moves his raised hand slowly, as when he preaches, mouth closed.
A hand from the crowd drops a coin into the chest: the coin flashes white.
The crowd moves a little. Slow push-in towards the chest.
Sound: murmur of a crowd, one coin falling into a wooden chest.
```

**3 — `cap1-3` — Dove vanno i soldi** (10 s)

Allega: nessuna immagine.

Immagine (Gemini):
```
A dark banker's table at night, seen from above. Piles of silver and gold coins,
an open account book with unreadable lines, a goose quill, a candle. Behind the
table, through a big window, the huge unfinished dome and scaffolding of a
Renaissance basilica under construction, in silhouette against a white sky.
A letter on the table is closed with a red wax seal.
Red detail: the wax seal only.
```
Movimento (Seedance):
```
Coins slide slowly from one pile to another, pushed by a hand in a dark sleeve.
The candle flame moves. Slow pan from the coins up to the window and the
unfinished dome.
Sound: coins, a quill on paper, a candle.
```

**4 — `cap1-4` — Lutero non è d'accordo** (5 s)

Allega: `img/bg/cella.webp`, `img/chars/lutero.webp`.

Immagine (Gemini):
```
A small dark monastery cell at night (the attached background). The friar of
the attached character (monk's tonsure, black Augustinian habit, thin tense
face) sits at his desk and writes fast with a goose quill. One candle lights
half of his face hard and white; the other half is in black shadow.
Mouth closed. Close medium shot.
Red detail: none.
```
Movimento (Seedance):
```
The friar writes, stops, lifts his eyes and looks into the dark, then writes
again with force. The candle flame moves. Slow push-in on his face.
Sound: quill scratching on paper, a candle.
```

**5 — `cap1-5` — La porta della Chiesa del Castello** (10 s)

Allega: `img/bg/chiesa-castello.webp`.

Immagine (Gemini):
```
The tall Gothic wooden door of a castle church (the attached background), at
night, autumn wind with dry leaves. Many old paper notices are nailed on the
wood; one new large white sheet with unreadable lines is nailed in the middle.
A single lantern lights the door; the square is black. A hammer hangs from a
hand at the edge of the frame, the man is in shadow and not visible.
Red detail: none.
```
Movimento (Seedance):
```
The wind moves the papers on the door and the dry leaves on the ground.
The hand with the hammer slowly goes out of the frame. The lantern flame moves.
Slow push-in on the new white sheet.
Sound: wind, dry leaves, one last knock of a hammer at the start.
```

**6 — `cap1-6` — La stampa copia le tesi** (5 s)

Allega: `img/bg/tipografia.webp`, `img/chars/lena.webp`.

Immagine (Gemini):
```
Close-up of a wooden printing press in action in a dark print shop (the
attached background). Hands pull the big wooden bar. On the right, many
printed white sheets hang on strings to dry, in a long row that disappears
into the dark. Hard white light on the sheets.
Red detail: none.
```
Movimento (Seedance):
```
The bar of the press is pulled down and goes back up. A new white sheet is
lifted and hung on the string. The row of sheets moves a little.
Slow pan along the row of sheets.
Sound: the wooden press, paper.
```

**7 — `cap1-7` — Le tesi in tutta la Germania** (5 s)

Allega: nessuna immagine.

Immagine (Gemini):
```
A night sky over a dark German landscape seen from a hill: fields, a river and
the black silhouettes of small walled towns. Hundreds of white paper sheets fly
in the wind across the sky, from left to right, towards the towns, like birds.
Red detail: none.
```
Movimento (Seedance):
```
The white sheets fly across the sky in the wind and spread towards the towns.
Slow pan from left to right.
Sound: strong wind, paper flapping.
```

**8 — `cap1-8` — La lettera da Roma** (10 s)

Allega: `img/bg/cella.webp`, `img/chars/lutero.webp`.

Immagine (Gemini):
```
Night, rain on the window of a dark monastery cell (the attached background).
The friar of the attached character sits at the desk and looks down at a
folded letter closed with a large wax seal with two crossed keys: the seal is
the only colour, deep dark red (#8b1e1e). Half of his face is in black shadow,
the other half is lit by one candle. Serious, worried expression, mouth closed.
Red detail: the wax seal only.
```
Movimento (Seedance):
```
The friar slowly lifts his eyes from the letter and looks into the dark.
Rain runs down the window. Slow push-in on the red seal, then on his eyes.
At the end, the candle goes out and the screen becomes black.
Sound: rain, then silence.
```

**Note storiche per le scene**
1. La lettera che chiamava Lutero a Roma arrivò a Wittenberg nell'agosto 1518. Il colore del sigillo è una scelta del gioco: il rosso indica il potere.
2. L'inquadratura 5 mostra la tradizione: la narrazione dice che gli storici ne discutono, e l'uomo con il martello resta nell'ombra.
3. L'inquadratura 3 mostra un'idea, non un luogo preciso: i soldi verso la basilica di San Pietro, in costruzione dal 1506.

## Lista di controllo

**Immagine (Gemini)**
1. Bianco e nero, con neri pieni. Il rosso solo dove il prompt lo chiede.
2. Niente scritte leggibili, niente cornici.
3. Proporzioni 16:9.
4. I personaggi somigliano alle immagini del gioco (Lena, Tetzel, Lutero).
5. Niente cose moderne: lampioni, vetri grandi, orologi.

**Video (Seedance)**
1. Lo stile resta quello dell'immagine: non diventa a colori e non diventa un cartone animato.
2. I volti non cambiano durante il video.
3. Nessuno parla. Niente scritte comparse nel video.
4. Movimento lento, senza scatti.
5. Suoni d'ambiente bassi, senza musica e senza voci (sotto c'è la narrazione).

## Capitoli dopo (da preparare)

| Capitolo | Idea per il video |
| :--- | :--- |
| 2 — Lipsia, 1519 | La sala della disputa: Eck e Lutero uno contro l'altro; la domanda sull'autorità del papa. |
| 3 — Wittenberg, 1520 | Il fuoco davanti alla porta dell'Elster: la bolla del papa brucia (il rosso del sigillo nel fuoco). |
| 4 — Worms, 1521 | Lutero davanti all'imperatore Carlo V: una fila di torce, la folla in silhouette. |
| 5 — Wartburg, 1521–22 | Una penna che scrive di notte: il Nuovo Testamento in tedesco. |
| 6 — Turingia, 1525 | Campi in fumo dopo la guerra dei contadini; Lena guarda da lontano. |
