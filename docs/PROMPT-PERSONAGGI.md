# Prompt per i personaggi (Gemini)

Leggi prima [GRAFICA.md](../GRAFICA.md).

Decisioni:
- **Personaggi non giocanti:** 1 immagine per personaggio. Bocca che parla e palpebre le disegno io nel codice.
- **Lena e Martin giovane** (si giocano): 3 immagini ciascuno, ferma + 2 passi della camminata.

## Come usare i prompt

1. Apri una chat nuova per ogni personaggio.
2. Allega come riferimento di stile uno sfondo riuscito (es. `tipografia.png`).
3. Incolla il **blocco di stile comune**, poi il prompt del personaggio.
4. Per la camminata resta nella stessa chat e chiedi la modifica dell'ultima immagine.
5. Scarica in PNG alla massima risoluzione.

## Blocco di stile comune

```
Create a single full-body character for a 2D point-and-click adventure game, in
the same style as the reference image: black and white seinen manga, dark
fantasy ink style, dense cross-hatching, heavy black shadows, realistic
proportions (about 7 heads tall for adults), detailed realistic face.
Historical clothes of Saxony, Germany, early 16th century.
NO colour on the character, only black, white and grey, unless a colour is listed.
Standing, three-quarter view, the character looks and faces to the RIGHT.
Mouth closed, eyes open (I animate mouth and eyes later).
Solid flat pure magenta background (#FF00FF) everywhere: no floor, no shadow,
no text, no frame. Do not use magenta or pink on the character.
The character is centred, the feet touch the bottom edge with a small margin.
Vertical image, 2:3, high resolution.
```

## Personaggi giocabili

**Lena Hartmann** — `lena.png`
```
A thin 13-year-old girl, apprentice in a printing shop. Long dark hair tied back
in a low braid, a few loose strands. A small pale blue ribbon in her hair: the
ONLY coloured element (#7fa7c9). Serious, alert eyes. Simple long wool dress,
a worn leather apron stained with ink, rolled-up sleeves, ink on her fingers,
a dark wool shawl on her shoulders, worn leather shoes. A small leather bag on
a strap across her chest. Standing relaxed, arms down.
```

**Martin giovane (1505)** — `martin-giovane.png`
```
A 21-year-old law student in 1505. Short dark hair, clean-shaven, strong jaw,
intense dark eyes. A long dark travelling cloak with a hood down, a simple
student gown under it, a belt with a small pouch, boots splashed with mud.
Wet from the rain: hair and cloak dripping. Standing, arms down.
```

**Camminata (per Lena e per Martin)** — `lena-passoA.png`, `lena-passoB.png`, `martin-passoA.png`, `martin-passoB.png`

Passo A (nella stessa chat):
```
Edit the standing image. CHANGE THE POSE CLEARLY: walking to the right with a
long step. The leg closer to the viewer is stretched FORWARD (to the right),
the heel touches the ground. The leg farther from the viewer is stretched BACK
(to the left), only the toes touch the ground. The arms swing: the arm closer
to the viewer goes back, the other arm goes forward. Keep everything else
identical: same person, same clothes, same size, same head position, same
magenta background.
```

Passo B (riparti sempre dall'immagine ferma):
```
Edit the standing image. CHANGE THE POSE CLEARLY: walking to the right with a
long step. The leg farther from the viewer is stretched FORWARD (to the right),
the heel touches the ground. The leg closer to the viewer is stretched BACK
(to the left), only the toes touch the ground. The arms swing: the arm closer
to the viewer goes forward, the other arm goes back. Keep everything else
identical: same person, same clothes, same size, same head position, same
magenta background.
```

## Personaggi non giocanti

**Martin Lutero (1517)** — `lutero.png`
```
A 33-year-old Augustinian friar and university professor. Thin, tense face,
deep-set intense eyes, strong eyebrows, a monk's tonsure (shaved crown with a
ring of short dark hair). Plain black Augustinian habit with a black leather
belt and a hood on the shoulders. He holds a few sheets of paper in one hand.
Serious, determined expression.
```

**Mastro Johann Grunenberg** — `grunenberg.png`
```
A broad, heavy man of about 50, master printer. Bald top, grey hair on the
sides, short grey beard, bushy eyebrows, tired eyes. Rolled-up linen shirt
sleeves, strong forearms stained with ink, a big leather apron, a cap of felt.
He holds an ink ball (a leather pad on a wooden handle).
```

**Frau Agnes** — `agnes.png`
```
A poor widow of about 45. Tired face with deep lines, kind eyes. A white linen
headscarf tied under the chin, a dark patched wool dress, a black shawl.
She holds a few thin candles tied with a string in one hand, and clutches a
small coin against her chest with the other.
```

**Johann Tetzel** — `tetzel.png`
```
A Dominican friar and preacher of about 50. Heavy build, fleshy face, sharp
confident eyes, a theatrical open gesture with one raised hand. White Dominican
habit with a long black cloak and black hood on the shoulders. A rosary at the
belt. Charismatic and convincing, not a clown.
```

**Georg Spalatino** — `spalatino.png`
```
A slim man of about 35, secretary and chaplain at a prince's court. Neat short
hair, clean-shaven, calm careful eyes. Dark scholar's robe with a fur collar,
a flat black scholar's cap. He holds a leather-bound book against his chest.
```

**Hans il carrettiere** — `hans.png`
```
A rough carter of about 40. Big shoulders, weathered face, short untidy beard,
a broken nose. Old felt hat, rough wool tunic, leather vest, wide belt, a whip
rolled at the belt, muddy boots. Arms crossed, suspicious look.
```

**Il Cercatore di libri** — `cercatore.png`
```
A tall, thin man of uncertain age in a long dark hooded cloak. The hood throws
a deep shadow on the upper face: only the jaw and thin lips are visible.
Black gloves. A small closed book chained to his belt. Still, silent,
menacing posture. A small dark red seal pendant on his chest is the ONLY
coloured element (#8b1e1e).
```

**Frate portinaio (Erfurt)** — `portinaio.png`
```
An old Augustinian monk, gatekeeper. Thin, slightly bent, white tonsure, kind
wrinkled face. Plain black habit, a ring of large iron keys at the belt.
```

## Controllo del risultato

1. Fondo magenta pieno, senza ombra e senza pavimento. Nessun magenta sul personaggio.
2. Bianco e nero. Unici colori: il nastro azzurro di Lena, il sigillo rosso del Cercatore.
3. Il personaggio guarda a destra, intero, con i piedi in basso.
4. Bocca chiusa e occhi aperti.
5. Per la camminata: stessa grandezza e stessa posizione della testa nelle 3 immagini.
6. Nomi dei file come indicato.
