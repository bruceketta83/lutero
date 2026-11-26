# Video di fine capitolo: 30 secondi di storia (Gemini + Seedance + Gemini TTS)

Alla fine di ogni capitolo, un video di **30 secondi** riassume i fatti storici del capitolo.
Una voce narrante generata con **Gemini 2.5 Flash TTS** spiega i fatti. Le immagini, realistiche come un film ma con i contrasti forti di un fumetto noir, li accompagnano.
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
3. Non allegare i disegni del gioco: le immagini sono realistiche e si generano da zero. Solo per l'inquadratura 6 allega l'immagine 3 (stesso volto di Lutero).
4. Incolla il **blocco di stile per le immagini**, poi il prompt dell'inquadratura.
5. Controlla l'immagine con la lista in fondo. Se non va, rifalla: costa meno che rifare il video.
6. **Video con Seedance,** da immagine a video: carica l'immagine come primo fotogramma.
7. Incolla il **blocco di stile per il movimento**, poi il prompt del movimento (sezione «I movimenti»).
8. Formato 16:9, 1280 × 720, durata come nella tabella dei tempi (10 s per le inquadrature 1 e 3, 5 s per le altre).
9. Salva i file in `originali/video/` con i nomi e i formati della tabella «Formati dei file».
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

## Formati dei file

| File | Formato | Dimensioni | Nome |
| :--- | :--- | :--- | :--- |
| Immagine iniziale (Gemini) | JPG o PNG, come lo scarichi da Gemini | **16:9**, circa **2000 × 1116** (quella che dà Gemini; va bene da 1920 × 1080 in su) | `cap1-1.jpg` … `cap1-6.jpg` |
| Video (Seedance) | MP4 | **16:9, 1280 × 720** (720p); durata 10 s o 5 s (vedi la tabella dei tempi) | `cap1-1.mp4` … `cap1-6.mp4` |
| Voce (Gemini TTS) | **WAV** (non PCM grezzo) | 24 000 Hz, mono, 16 bit, 28–32 s | `narrazione-cap1.wav` |
| Video finale nel gioco (lo faccio io) | MP4 (H.264 + AAC) | 1280 × 720, circa 31 s, meno di 10 MB | `video/cap1.mp4` |
| Sottotitoli (li faccio io) | WebVTT | tempi sulla voce | `video/cap1.vtt` |

1. Se Gemini (o AI Studio) ha la scelta delle proporzioni, scegli **16:9** prima di generare. Il prompt lo chiede già, ma la scelta nelle impostazioni è più sicura.
2. Controlla le dimensioni del file scaricato. Se non è 16:9 (per esempio quadrato o verticale), rigenera: non tagliarla e non allargarla. 2000 × 1116 è 16:9 (la differenza è di pochi pixel, la correggo io).
3. Se Gemini ti dà il PNG, usa il PNG: i neri sono più puliti. Il JPG che scarichi da Gemini va bene lo stesso.
4. Carica in Seedance la stessa immagine, senza modifiche. Scegli **16:9** a **720p (1280 × 720)**: così il video non deforma la figura ed è già della misura del gioco.
5. Tieni le cose importanti (volti, sigillo, moneta) lontano dai bordi: nel gioco il video può essere tagliato un poco sui lati, su telefoni con schermi diversi.
6. Salva tutto in `originali/video/`.

## Blocco di stile per le immagini (Gemini)

Stile: **foto realistica di un film**, con attori veri e luoghi veri. L'effetto "fumetto" viene solo dalla luce e dal contrasto: neri pieni, bianchi bruciati, un solo colore rosso. Non allegare i disegni del gioco: le immagini si generano da zero.

```
Photorealistic cinematic film still, live action, real actors in real
historical locations. Extreme high-contrast black and white, like a graphic
novel turned into a film: crushed pure blacks, blown-out pure whites, almost no
mid-grey. One hard light source and a strong white rim light that cut the
silhouettes out of the darkness. Deep black shadows swallow half of every face
and most of the background. Rain falls as bright white streaks; wet surfaces
shine white. Realistic skin, wool, wood and stone textures, light film grain.
35mm anamorphic lens, shallow depth of field, dramatic low or high camera
angle, strong graphic composition like a single comic book panel.
Selective colour: the whole image is black and white EXCEPT the one red detail
named below, a deep saturated red (#8b1e1e). No other colour anywhere: no gold,
no skin tones, no yellow light.
Historical setting: Saxony, Germany, 1517-1518. Historically accurate clothes,
buildings and objects. No modern objects.
No text, no letters, no numbers, no watermark, no frame, no comic panel
borders, no speech bubbles, no drawing or illustration look.
Landscape 16:9, at least 1920 x 1080 pixels. Keep faces and key objects away
from the left and right edges.
```

Esempio riuscito: `originali/video/cap1-1.jpg` (Tetzel, 2000 × 1116). Usalo per confrontare le altre immagini: stessa luce, stessi neri, stesso rosso.

## Blocco di stile per il movimento (Seedance)

```
Keep the exact look of the first frame: photorealistic live-action film,
extreme high-contrast black and white, crushed blacks, blown-out whites,
the only colour is the deep red detail. Do not turn it into colour, a drawing
or a cartoon.
The camera moves slowly (a slow push-in or a slow pan), but the people move
clearly and naturally, like actors in a film: they breathe, turn their heads,
move their arms and hands. Nobody stands still like a statue.
Do not change faces, clothes or the place. No new people. No text.
No voices are heard: if a person talks, his lips move but there is no sound
of his voice.
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

### Tempi della voce del capitolo 1 (file `originali/video/narrazione-cap1.wav`, 31,0 secondi)

Misurati sulla voce generata. Ogni inquadratura dura quanto la sua frase.

| Inquadratura | Da | A | Durata | Video da generare |
| :--- | :--- | :--- | :--- | :--- |
| 1 — Tetzel e la moneta | 0,0 s | 7,5 s | 7,5 s | **10 s** |
| 2 — Dove vanno i soldi | 7,5 s | 11,7 s | 4,2 s | 5 s |
| 3 — Lutero scrive le tesi | 11,7 s | 17,7 s | 6,0 s | **10 s** |
| 4 — La porta della chiesa | 17,7 s | 23,0 s | 5,3 s | 5 s (allungo io l'ultimo fotogramma di 0,3 s) |
| 5 — La stampa | 23,0 s | 26,4 s | 3,4 s | 5 s |
| 6 — La lettera da Roma | 26,4 s | 31,0 s | 4,6 s | 5 s |

I sottotitoli sono in `video/cap1.vtt`.

### Le inquadrature

I personaggi storici sono descritti a parole, uguali in ogni prompt. Per avere lo **stesso volto di Lutero** nelle inquadrature 3 e 6, genera prima la 3 e allegala come riferimento quando generi la 6.

**1 — `cap1-1` — Tetzel e la moneta**

Allega: nessuna immagine.

Immagine (Gemini):
```
Night, heavy rain, the market square of a small German town in 1517:
half-timbered houses, a Gothic church in the background. On a rough wooden
platform stands Johann Tetzel, a Dominican friar of about 52: heavy build,
fleshy jowly face, sharp confident eyes, tonsured head, white Dominican habit
with a black cloak and black hood, a wooden rosary at the belt. He preaches with
one hand raised high, mouth closed, lit hard from the side.
Next to him, a tall wooden cross with a hanging banner of the papal coat of
arms (two crossed keys and a tiara): the banner is deep red (#8b1e1e), the keys
and the tiara are white and grey, not gold. In front of the platform, a heavy
iron-bound wooden chest for the offerings, with the lid OPEN and tilted back:
inside, a few silver coins shine white in the dark. In the foreground, the black
silhouettes of the crowd, seen from behind, looking up at him.
Low camera from inside the crowd.
Red detail: the banner of the coat of arms only.
```

**2 — `cap1-2` — Dove vanno i soldi**

Allega: nessuna immagine.

Immagine (Gemini):
```
Night, a dark room of a rich banker's house in 1517. On a heavy wooden table:
piles of silver coins, an open account book with unreadable handwritten lines,
a goose quill, one candle. A man's hand in a dark velvet sleeve pushes a pile of
coins; his face is not visible. Behind the table, through a tall window, the
building site of a huge Renaissance basilica in 1517: four gigantic stone
pillars joined by high arches, wrapped in wooden scaffolding and cranes, with
NO dome yet (the dome does not exist yet), in black silhouette against a white
sky. On the table, a folded letter closed
with a red wax seal.
Red detail: the wax seal only.
```

**Se nell'immagine 2 c'è una cupola finita,** in Gemini allega l'immagine e chiedi questa modifica:
```
Edit the attached image. Keep everything exactly the same: the table, the
coins, the hand, the candle, the red seal, the light and the black and white
style. Change one thing only: outside the window there is no dome. Replace it
with the building site of the basilica in 1517: four gigantic stone pillars
joined by high arches, wrapped in wooden scaffolding, with wooden cranes,
open to the white sky.
```

**3 — `cap1-3` — Lutero scrive le tesi**

Allega: nessuna immagine.

Immagine (Gemini):
```
Night, a small bare stone cell in an Augustinian monastery in 1517.
Martin Luther, an Augustinian friar of 33: thin gaunt face, high cheekbones,
deep-set dark intense eyes, strong eyebrows, a monk's tonsure (shaved crown
with a ring of short dark hair), plain black Augustinian habit with a black
leather belt. He sits at a rough wooden desk and writes fast with a goose quill
on a long sheet with numbered unreadable lines. One candle lights half of his
face hard and white; the other half is in pure black shadow. Mouth closed,
focused, determined. Close medium shot, camera at the height of the desk.
Red detail: none.
```

**4 — `cap1-4` — La porta della Chiesa del Castello**

Allega: nessuna immagine.

Immagine (Gemini):
```
Night, autumn wind, the tall Gothic wooden door of a castle church in a German
town in 1517. Many old paper notices are nailed on the dark wood; in the
middle, one new large white sheet with unreadable lines. A single lantern
lights the door from above; dry leaves fly across wet stones. At the edge of
the frame, a hand holding a hammer; the man is in total black shadow and not
visible. Low camera, the door looks huge.
Red detail: none.
```

**5 — `cap1-5` — La stampa porta le tesi in tutta la Germania**

Allega: nessuna immagine.

Immagine (Gemini):
```
Night, a 16th-century print shop. A wooden hand press in the foreground: the
strong hands and forearms of an unseen printer pull the big wooden bar; no
faces. Above the press, printed white sheets hang on strings to dry. At the
right, through an open window, many white sheets fly out into the night sky
over the dark roofs of a German town. Hard white light on the paper, deep
black everywhere else.
Red detail: none.
```

**6 — `cap1-6` — La lettera da Roma**

Allega: l'immagine `cap1-3.jpg` (per avere lo stesso volto di Lutero).

Immagine (Gemini):
```
The same man as in the attached image: Martin Luther, Augustinian friar, thin
gaunt face, deep-set dark eyes, tonsure, black habit. Night, rain on the small
window of his stone cell, summer 1518. He sits at the desk and looks down at a
folded letter closed with a large wax seal with two crossed keys: the seal is
the only colour, deep red (#8b1e1e). One candle lights half of his face from
below; the other half is in pure black shadow. Serious, worried expression,
mouth closed. Close-up.
Red detail: the wax seal only.
```

**Se nell'immagine 1 la cassa è chiusa,** non rigenerare tutto: in Gemini allega l'immagine e chiedi questa modifica.
```
Edit the attached image. Keep everything exactly the same: the same man, the
same light, the same black and white style and the same red banner. Change one
thing only: the lid of the wooden chest on the platform is open, tilted back,
and the inside of the chest is dark, with a few silver coins shining white.
```

### I movimenti (Seedance)

Prima il **blocco di stile per il movimento**, poi il prompt dell'inquadratura.

**1 — `cap1-1`** (10 s)
```
The friar preaches with energy, like a real preacher: he sweeps his raised
arm over the crowd, leans forward, turns his head from one side of the crowd
to the other, then points down at the open chest with his other hand. His lips
move as he speaks, but his voice is not heard.
A man from the crowd steps forward and drops a silver coin into the open
chest: the coin flashes white in the light and falls inside.
Rain falls hard, the crowd moves and murmurs. Slow push-in towards the chest.
Sound: heavy rain, murmur of a crowd, one coin falling into a wooden chest.
```

**2 — `cap1-2`** (5 s)
```
The hand slowly slides a pile of coins across the table. The candle flame
moves. Slow pan from the coins up to the window and the unfinished dome.
Sound: coins, a candle.
```

**3 — `cap1-3`** (10 s)
```
The friar writes, stops, lifts his eyes and looks into the dark, then writes
again with force. The candle flame moves. Slow push-in on his face.
Sound: quill scratching on paper, a candle.
```

**4 — `cap1-4`** (5 s)
```
The wind moves the papers on the door and the dry leaves on the ground.
The hand with the hammer slowly goes out of the frame. The lantern flame moves.
Slow push-in on the new white sheet.
Sound: wind, dry leaves, one last knock of a hammer at the start.
```

**5 — `cap1-5`** (5 s)
```
The bar of the press is pulled down and goes back up. The sheets on the strings
move in the wind; some fly out of the window into the night sky.
Slow pan from the press to the window.
Sound: the wooden press, paper, wind.
```

**6 — `cap1-6`** (5 s)
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
4. L'inquadratura 2 mostra un'idea, non un luogo preciso: i soldi verso la basilica di San Pietro, in costruzione dal 1506. Nel 1517 c'erano solo i 4 grandi pilastri e gli archi: la cupola fu finita nel 1590. Per questo il prompt chiede il cantiere senza cupola.

## Lista di controllo

**Voce (Gemini TTS)**
1. Durata tra 28 e 32 secondi.
2. Tono calmo e serio, senza enfasi teatrale.
3. Nomi tedeschi chiari: Tetzel, Wittenberg.
4. Numeri letti bene: «millecinquecentodiciassette», «trentuno ottobre».

**Immagine (Gemini)**
1. Sembra una foto di un film, con persone vere: non un disegno.
2. Bianco e nero con neri pieni e bianchi bruciati. Il rosso solo dove il prompt lo chiede: niente oro, niente pelle colorata.
3. Niente scritte leggibili, niente cornici.
4. Proporzioni 16:9 (circa 2000 × 1116).
5. Lutero ha lo stesso volto nelle inquadrature 3 e 6.
6. Tetzel: frate domenicano, abito bianco e mantello nero.
7. Niente cose moderne: lampioni, vetri grandi, orologi.

**Video (Seedance)**
1. Lo stile resta quello dell'immagine: realistico, in bianco e nero; non diventa a colori, un disegno o un cartone animato.
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
