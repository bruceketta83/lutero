# Prompt per i personaggi (Gemini)

Leggi prima [GRAFICA.md](../GRAFICA.md).

Decisioni:
- **Personaggi non giocanti:** 1 immagine per personaggio. Bocca che parla e palpebre le disegno io nel codice.
- **Lena e Martin giovane** (si giocano): 1 immagine ferma + 8 pose della camminata, in 4 immagini da 2 pose (vedi sotto).

## Come usare i prompt

1. Apri una chat nuova per ogni personaggio.
2. Allega come riferimento di stile uno sfondo riuscito (es. `tipografia.png`).
3. Incolla il **blocco di stile comune**, poi il prompt del personaggio.
4. Per la camminata segui la sezione "Camminata": 4 immagini da 2 pose.
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

## Camminata (Lena e Martin)

**Cosa abbiamo imparato con Lena**
1. Gemini **non** riesce a modificare una posa ("sposta la gamba avanti"): ridisegna sempre la stessa.
2. Gemini **non** riesce a disegnare 8 pose ordinate in un foglio unico: le figure si toccano o cambiano grandezza.
3. Funziona chiedere **2 pose per immagine**, ben separate, descrivendo la fase del passo come in un manuale di animazione.

**Come fare**
1. Apri una chat nuova. Allega l'immagine del personaggio fermo.
2. Incolla il blocco "Camminata — immagine 1". Scarica.
3. Nella stessa chat incolla i blocchi 2, 3 e 4, uno alla volta. Scarica ogni immagine.
4. Nomi dei file: `NOME-camminata-1.jpg` … `NOME-camminata-4.jpg` nella cartella `originali/personaggi/`.
5. Io monto il ciclo con `tools/camminata.py` (vedi [GRAFICA.md](../GRAFICA.md)).

Blocco comune da mettere all'inizio di ogni immagine:
```
Walk cycle of the character in the attached image, 2 poses side by side in ONE landscape image.
Both poses: same character, same clothes, same ink style, same size, full body, the head at the same height, the feet on the same line. Both face and walk to the RIGHT, three-quarter view.
A wide empty magenta gap between the two poses: they must NEVER touch or overlap.
Solid flat pure magenta background (#FF00FF), no text, no numbers, no frames.
```

**Camminata — immagine 1** (pose 1 e 2)
```
Pose 1 (left), CONTACT: the front heel touches the ground with the toes up, the back foot pushes on its toes. The near arm is back, the far arm is forward.
Pose 2 (right), DOWN: the weight goes down on the front leg, the front sole is flat on the ground and the knee bends. The back foot leaves the ground. The arms swing at their widest.
```

**Camminata — immagine 2** (pose 3 e 4)
```
Pose 3 (left), PASSING: the body rises on the straight supporting leg under the hips. The NEAR leg bends and lifts its shoe to ankle height while it passes. The arms come down along the sides.
Pose 4 (right), UP: the body reaches its highest point, pushing on the toes of the back foot. The near leg moves forward in the air. The near arm starts to swing forward in front of the apron.
```

**Camminata — immagine 3** (pose 5 e 6)
```
Pose 5 (left), OPPOSITE CONTACT: the opposite of pose 1. The NEAR leg is in front, heel on the ground; the FAR leg stays behind on its toes. The near arm is forward, the far arm is back.
Pose 6 (right), OPPOSITE DOWN: the weight goes on the near front leg, the foot flat on the ground. The far back shoe lifts, the knee bends. The arms swing at their widest, the other way.
```

**Camminata — immagine 4** (pose 7 e 8)
```
Pose 7 (left), OPPOSITE PASSING: the near leg holds the body upright. The FAR foot bends and slides behind the supporting ankle, half hidden. The arms come back near the sides.
Pose 8 (right), OPPOSITE UP: the near foot pushes on its toes to close the step, the far leg moves forward, ready for the next heel contact.
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
5. Per la camminata: in ogni immagine le 2 pose non si toccano. La grandezza può cambiare da un'immagine all'altra: la sistemo io.
6. Nomi dei file come indicato.
