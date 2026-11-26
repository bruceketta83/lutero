# Video di fine capitolo: 30 secondi di storia (Gemini + Seedance + Gemini TTS)

Alla fine di ogni capitolo, un video di **30 secondi** riassume i fatti storici del capitolo.
Una voce narrante generata con **Gemini 2.5 Flash TTS** spiega i fatti. Le immagini, in stile fumetto noir, li accompagnano.
Leggi prima [GRAFICA.md](../GRAFICA.md).

**Regole del video**
1. **Solo fatti e personaggi storici.** Niente Lena, niente Frau Agnes, Hans o altri personaggi inventati.
2. **30 secondi:** 6 inquadrature da 5 secondi, una per ogni frase della narrazione.
3. **Fatti e leggende separati,** come nel gioco: quando un fatto è incerto, la narrazione lo dice.
4. **Nessuno parla nelle immagini:** parla solo la voce narrante. Il labiale dei generatori viene male.
5. **Sottotitoli:** il testo della narrazione compare anche scritto.
6. **Dopo il video, il riquadro «Da sapere»:** 4 fatti da ricordare, scritti. Lo faccio io nel gioco.

## Come si lavora

1. **Voce con Gemini 2.5 Flash TTS** (vedi «La voce narrante»). Controlla che duri circa 30 secondi.
2. **Immagini con Gemini:** una per ogni inquadratura. Apri una chat nuova per ogni immagine.
3. Allega le immagini di riferimento indicate (sfondi e personaggi del gioco, cartella `img/`).
4. Incolla il **blocco di stile per le immagini**, poi il prompt dell'inquadratura.
5. Controlla l'immagine con la lista in fondo. Se non va, rifalla: costa meno che rifare il video.
6. **Video con Seedance,** da immagine a video: carica l'immagine come primo fotogramma.
7. Incolla il **blocco di stile per il movimento**, poi il prompt del movimento.
8. Formato 16:9, 5 secondi, alla risoluzione più alta.
9. Salva i file in `originali/video/`: `cap1-1.mp4` … `cap1-6.mp4` e `narrazione-cap1.wav`.
10. Io unisco i pezzi sulla voce, aggiungo i sottotitoli e il riquadro «Da sapere», e comprimo per il telefono.

**Non scrivere nomi di fumetti o di film** (Sin City, Berserk): i generatori a volte rifiutano, e il risultato copia invece di ispirarsi. I blocchi di stile descrivono lo stile a parole.

## La voce narrante (Gemini 2.5 Flash TTS)

1. Apri Google AI Studio, generazione del parlato (*Generate speech*), modello **Gemini 2.5 Flash TTS**, un solo narratore.
2. **Voce:** **Charon** (voce maschile, calma, da documentario). Alternative: **Gacrux** (più matura), **Algenib** (più roca, più «noir»).
3. Se c'è il campo delle istruzioni di stile (*Style instructions*), incolla lì le **istruzioni**. Nel campo del testo incolla solo il **testo** del capitolo.
4. Se c'è un solo campo, incolla le istruzioni, poi una riga vuota, poi il testo.
5. Ascolta e controlla la durata: deve essere tra 28 e 32 secondi.
   - Troppo lunga: aggiungi alle istruzioni «Ritmo più veloce, quasi senza pause».
   - Troppo corta: aggiungi «Ritmo un po' più lento».
   - Fino a 35 secondi la correggo io: accorcio le pause e accelero al massimo del 10%, senza cambiare il tono della voce.
   - Oltre 35 secondi rigenera: accelerare di più rende la voce innaturale.
6. Controlla i nomi tedeschi. Se un nome è detto male, nel testo scrivilo come si legge (le forme sono indicate sotto il testo) e rigenera.
7. Scarica il file in **WAV**.

### Istruzioni di stile (uguali per tutti i capitoli)

```
Leggi in italiano, come la voce di un trailer di un documentario storico per
ragazzi della scuola media. Voce maschile, profonda e seria, con tensione, come
in un racconto noir. Ritmo sostenuto e scorrevole, chiaro ma non lento, senza
enfasi teatrale e senza musica. Pause brevi tra le frasi, al massimo mezzo
secondo. L'ultima frase va detta più piano, come un avvertimento.
Pronuncia i nomi tedeschi in modo chiaro.
La lettura deve durare al massimo 30 secondi.
```

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

## Capitolo 1 — «Le 95 tesi» (1517–1518)

### Il testo della narrazione

Circa 63 parole, circa 30 secondi con il ritmo sostenuto delle istruzioni. Ogni numero è un'inquadratura da 5 secondi.

```
1517. Il frate Tetzel vende indulgenze: promette di salvare le anime dal purgatorio.

I soldi vanno alla basilica di San Pietro e all'arcivescovo Alberto.

A Wittenberg, il frate Martin Lutero scrive novantacinque tesi contro questi abusi.

Il 31 ottobre le manda all'arcivescovo. Forse le affigge alla porta della chiesa.

La stampa le diffonde in tutta la Germania.

Nel 1518, il papa lo chiama a Roma.
```

**Se un nome è detto male,** sostituiscilo nel testo con la forma che si legge:
- Tetzel → «Tèzzel»
- Wittenberg → «Vìttenberg»

Il debito di Alberto con i banchieri Fugger non è nella narrazione, per stare nei 30 secondi: resta nel gioco (domanda di Lutero) e nel riquadro «Da sapere».

**Riquadro «Da sapere»** (scritto, dopo il video, lo faccio io):
1. L'**indulgenza** toglieva la pena dei peccati già perdonati. Tetzel la offriva in cambio di un'offerta in denaro.
2. Il **31 ottobre 1517** Lutero manda le **95 tesi** all'arcivescovo Alberto di Magonza.
3. La **stampa** porta le idee di Lutero in tutta la Germania in poche settimane.
4. Metà dei soldi delle indulgenze serviva all'arcivescovo Alberto per pagare un debito con i banchieri **Fugger**.

### Le inquadrature (6 × 5 secondi)

**1 — `cap1-1` — Tetzel e la moneta**

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

**2 — `cap1-2` — Dove vanno i soldi**

Allega: nessuna immagine.

Immagine (Gemini):
```
A dark banker's table at night. Piles of silver and gold coins, an open account
book with unreadable lines, a goose quill, a candle. Behind the table, through
a big window, the huge unfinished dome and scaffolding of a Renaissance
basilica under construction, in silhouette against a white sky. A letter on
the table is closed with a red wax seal.
Red detail: the wax seal only.
```
Movimento (Seedance):
```
Coins slide slowly from one pile to another, pushed by a hand in a dark sleeve.
The candle flame moves. Slow pan from the coins up to the window and the
unfinished dome.
Sound: coins, a quill on paper, a candle.
```

**3 — `cap1-3` — Lutero scrive le tesi**

Allega: `img/bg/cella.webp`, `img/chars/lutero.webp`.

Immagine (Gemini):
```
A small dark monastery cell at night (the attached background). The friar of
the attached character (monk's tonsure, black Augustinian habit, thin tense
face) sits at his desk and writes fast with a goose quill on a long sheet with
numbered unreadable lines. One candle lights half of his face hard and white;
the other half is in black shadow. Mouth closed. Close medium shot.
Red detail: none.
```
Movimento (Seedance):
```
The friar writes, stops, lifts his eyes and looks into the dark, then writes
again with force. The candle flame moves. Slow push-in on his face.
Sound: quill scratching on paper, a candle.
```

**4 — `cap1-4` — La porta della Chiesa del Castello**

Allega: `img/bg/chiesa-castello.webp`.

Immagine (Gemini):
```
The tall Gothic wooden door of a castle church (the attached background), at
night, autumn wind with dry leaves. Many old paper notices are nailed on the
wood; one new large white sheet with unreadable lines is nailed in the middle.
A single lantern lights the door; the square is black. A hammer hangs from a
hand at the edge of the frame; the man is in shadow and not visible.
Red detail: none.
```
Movimento (Seedance):
```
The wind moves the papers on the door and the dry leaves on the ground.
The hand with the hammer slowly goes out of the frame. The lantern flame moves.
Slow push-in on the new white sheet.
Sound: wind, dry leaves, one last knock of a hammer at the start.
```

**5 — `cap1-5` — La stampa porta le tesi in tutta la Germania**

Allega: `img/bg/tipografia.webp`.

Immagine (Gemini):
```
A wooden printing press in a dark print shop (the attached background). Hands
of an unseen printer pull the big wooden bar. Above the press, many printed
white sheets hang on strings to dry; at the right, through an open window,
some white sheets fly out into the night sky over the roofs of a German town.
Hard white light on the sheets. No faces.
Red detail: none.
```
Movimento (Seedance):
```
The bar of the press is pulled down and goes back up. The sheets on the strings
move in the wind; some fly out of the window into the night sky.
Slow pan from the press to the window.
Sound: the wooden press, paper, wind.
```

**6 — `cap1-6` — La lettera da Roma**

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
1. Le tesi criticano gli abusi nella predicazione delle indulgenze, non le indulgenze in sé: per questo la narrazione dice «contro questi abusi».
2. La lettera che chiamava Lutero a Roma arrivò a Wittenberg nell'agosto 1518. Il colore del sigillo è una scelta del gioco: il rosso indica il potere.
3. L'inquadratura 4 mostra la tradizione: la narrazione dice «forse», perché l'affissione la racconta solo Melantone, nel 1546. L'uomo con il martello resta nell'ombra.
4. L'inquadratura 2 mostra un'idea, non un luogo preciso: i soldi verso la basilica di San Pietro, in costruzione dal 1506.

## Lista di controllo

**Voce (Gemini TTS)**
1. Durata tra 28 e 32 secondi.
2. Tono calmo e serio, senza enfasi teatrale.
3. Nomi tedeschi chiari: Tetzel, Wittenberg.
4. Numeri letti bene: «millecinquecentodiciassette», «trentuno ottobre».

**Immagine (Gemini)**
1. Bianco e nero, con neri pieni. Il rosso solo dove il prompt lo chiede.
2. Niente scritte leggibili, niente cornici.
3. Proporzioni 16:9.
4. I personaggi somigliano alle immagini del gioco (Tetzel, Lutero).
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
| 6 — Turingia, 1525 | Campi in fumo dopo la guerra dei contadini. |
