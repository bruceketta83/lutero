# Prompt per i video di fine capitolo (Gemini + Seedance)

Un video breve alla fine di ogni capitolo: circa 15 secondi, fatto di 3 inquadrature da 5 secondi.
Stile: fumetto noir in bianco e nero, neri pieni, un solo colore. Leggi prima [GRAFICA.md](../GRAFICA.md).

## Come si lavora

1. **Immagine iniziale con Gemini.** Una per ogni inquadratura. Apri una chat nuova per ogni immagine.
2. Allega le immagini di riferimento indicate (sfondi e personaggi del gioco, cartella `img/`).
3. Incolla il **blocco di stile per le immagini**, poi il prompt dell'inquadratura.
4. Controlla l'immagine con la lista in fondo. Se non va, rifalla: costa meno che rifare il video.
5. **Video con Seedance**, in modalità da immagine a video: carica l'immagine come primo fotogramma.
6. Incolla il **blocco di stile per il movimento**, poi il prompt del movimento.
7. Formato 16:9, 5 secondi, alla risoluzione più alta.
8. Salva i video in `originali/video/` con i nomi indicati (es. `cap1-1.mp4`). Le unisco io, aggiungo le scritte e comprimo per il telefono.

**Non scrivere nomi di fumetti o di film** (Sin City, Berserk): i generatori a volte rifiutano, e il risultato copia invece di ispirarsi. I blocchi di stile descrivono lo stile a parole.

## Blocco di stile per le immagini (Gemini)

```
High-contrast black and white graphic novel art, noir comic style: large areas
of solid pure black, stark white highlights, hard rim light, deep shadows that
swallow the shapes, bold silhouettes, almost no grey. Fine white lines for rain.
Strong cinematic framing, like a single panel of a dark comic book.
Historical setting: Saxony, Germany, 1518. Realistic people and places,
normal proportions, no fantasy elements.
NO colour at all, only black and white, EXCEPT the one red detail listed below,
which is a deep dark red (#8b1e1e).
No text, no letters, no numbers, no watermark, no frame, no panel borders,
no speech bubbles.
Landscape 16:9, 2576 x 1438 pixels.
```

## Blocco di stile per il movimento (Seedance)

```
Keep the exact look of the first frame: high-contrast black and white noir comic
art, solid blacks, white highlights, the only colour is the dark red detail.
Slow, calm movement. The camera is almost still: only a slow push-in or a slow
pan. Do not change faces, clothes or the place. No new people. No text.
Nobody speaks: mouths stay closed.
Sound: only ambient sounds (rain, wind, footsteps, fire). No music with voices,
no speech, no narration.
```

## Capitolo 1 — La lettera da Roma (agosto 1518)

Nel gioco il capitolo 1 finisce così: «Agosto 1518. Al Convento Nero arriva una lettera con un sigillo rosso. Viene da Roma: il papa chiama Lutero a rispondere delle sue tesi.»

### Inquadratura 1 — `cap1-1` — Il messaggero al convento

**Allega:** `img/bg/convento-cortile.webp` (luogo).

Immagine (Gemini):
```
Night, heavy summer rain. A rider in a long dark cloak and a wide hat stops his
horse in front of the gate of a Gothic monastery courtyard in a small German
town (the attached image is the same courtyard, by day). The rider is a black
silhouette against one lantern above the gate. Rain is drawn as long white
lines. Puddles reflect the lantern light. Wide shot, low camera.
Red detail: none in this image.
```

Movimento (Seedance):
```
The rain falls steadily. The horse moves its head and breathes; steam comes out
of its nose. The rider gets down from the horse, slowly. The lantern flame
moves a little in the wind. Very slow push-in towards the gate.
Sound: heavy rain, a horse snorting, hooves on wet stones.
```

### Inquadratura 2 — `cap1-2` — La lettera sul tavolo

**Allega:** `img/bg/cella.webp` (la cella, per il tavolo e la candela).

Immagine (Gemini):
```
Close-up of a rough wooden desk in a dark monastery cell, lit only by one
candle. A gloved hand lays down a folded letter. The letter is closed with a
large wax seal: the seal is the only colour in the image, deep dark red
(#8b1e1e), with two crossed keys pressed into it. Everything else is black and
white: the candle flame and the paper are pure white, the rest is deep black.
Red detail: the wax seal only.
```

Movimento (Seedance):
```
The gloved hand slowly pulls back out of the frame and leaves the letter on the
desk. The candle flame moves a little. A drop of rain water falls from the
glove onto the desk. Very slow push-in towards the red seal.
Sound: rain outside, a candle flame, the soft sound of paper.
```

### Inquadratura 3 — `cap1-3` — Lutero guarda il sigillo

**Allega:** `img/chars/lutero.webp` (il volto e l'abito di Lutero) e `img/bg/cella.webp`.

Immagine (Gemini):
```
Close-up of the face of the man in the attached character image: a 34-year-old
Augustinian friar with a monk's tonsure, thin tense face, deep-set intense
eyes, black habit. He sits at the desk at night and looks down at a letter
(out of frame). Half of his face is in total black shadow, the other half is
lit hard and white by a candle from below. Serious, worried, determined
expression. Mouth closed.
Red detail: none in this image.
```

Movimento (Seedance):
```
The friar does not speak. He breathes slowly and lifts his eyes from the letter
to look into the dark, in front of him. The candle light moves a little on his
face. Very slow push-in on his eyes. At the end, the candle flame goes out and
the screen becomes black.
Sound: rain, then silence when the candle goes out.
```

**Nota storica per la scena:** la lettera che chiamava Lutero a Roma arrivò a Wittenberg nell'agosto 1518. Il colore del sigillo è una scelta del gioco: il rosso indica il potere (vedi GRAFICA.md).

## Il suono

1. Il video parte quando tocchi «Continua» dopo «Fine del capitolo». È un tuo tocco, quindi anche su iPhone il browser lascia partire il suono.
2. Solo suoni d'ambiente: pioggia, vento, passi, fuoco. Niente voci: il labiale viene male e la lingua non sarebbe l'italiano. Le parole le metto io come scritte.
3. Nel gioco c'è un tasto per togliere il suono e un tasto «Salta».
4. Se Seedance fa una musica che non ti piace, dimmelo: posso tenere solo il video, senza suono.

## Lista di controllo

**Immagine (Gemini)**
1. Bianco e nero, con neri pieni. Il rosso solo dove il prompt lo chiede.
2. Niente scritte, niente lettere sulla carta della lettera, niente cornici.
3. Proporzioni 16:9.
4. Il volto di Lutero somiglia all'immagine del personaggio: tonsura, abito nero.
5. Niente cose moderne: lampioni, vetri grandi, orologi.

**Video (Seedance)**
1. Lo stile resta quello dell'immagine: non diventa a colori e non diventa un cartone animato.
2. I volti non cambiano durante il video.
3. Nessuno parla. Niente scritte comparse nel video.
4. Movimento lento, senza scatti.
5. Durata 5 secondi, 16:9.

## Capitoli dopo (da preparare)

| Capitolo | Idea per il video |
| :--- | :--- |
| 2 — Lipsia, 1519 | La sala della disputa che si svuota; Eck e Lutero si guardano da lontano. |
| 3 — Wittenberg, 1520 | Il fuoco davanti alla porta dell'Elster: la bolla del papa brucia (il rosso del sigillo nel fuoco). |
| 4 — Worms, 1521 | Lutero davanti all'imperatore: una sola fila di torce, la folla in silhouette. |
| 5 — Wartburg, 1521–22 | Una penna che scrive di notte; le pagine del Nuovo Testamento in tedesco. |
| 6 — Turingia, 1525 | Campi in fumo dopo la battaglia; Lena guarda da lontano. |
