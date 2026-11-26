# Grafica — Inchiostro e Tempesta

## 1. Stile

1. **Fumetto dark fantasy in stile seinen:** inchiostro nero, tratteggio incrociato fitto, ombre pesanti, luce drammatica (chiaroscuro).
2. Lo stile richiama i grandi fumetti dark fantasy giapponesi, come Berserk. **Personaggi, luoghi e inquadrature sono originali:** non copiamo personaggi, armature o tavole di nessun fumetto.
3. **Luoghi storici realistici:** Germania del 1505–1517. Case a graticcio, tetti spioventi, chiese gotiche, strade di fango, campi aperti, cieli pesanti.
4. **Persone realistiche:** proporzioni normali (non chibi), volti segnati, mani da lavoratori, vestiti poveri e consumati. Lena ha 13 anni e lo si vede.
5. **Atmosfera:** freddo, fumo, nebbia, candele, poca luce. I momenti di speranza hanno più bianco.
6. **Niente sangue e niente ferite.** Il pericolo si mostra con ombre, sguardi, folle, sigilli e soldati.

## 2. Bianco, nero e pochi colori

Le immagini sono **in bianco e nero, con i grigi del tratteggio**. Il colore serve solo per giocare meglio. Ogni colore ha **un solo significato**:

| Colore | Codice | Significato | Dove |
| :--- | :--- | :--- | :--- |
| Oro / ocra | `#c9a227` | Si può toccare: oggetti e personaggi con cui interagire. Anche monete e indulgenze. | Aggiunto nel codice: alone leggero e contorno. |
| Rosso cupo | `#8b1e1e` | Pericolo e potere: sigilli, bolle papali, stemmi, guardie, scelte rischiose. | Nelle immagini, solo su pochi dettagli (sigillo, stemma). |
| Azzurro tenue | `#7fa7c9` | Aiuto: interfaccia, mappa, Taccuino, glossario, suggerimenti. | Solo nell'interfaccia, mai nelle scene. |

1. Non usare mai il colore da solo: aggiungi sempre un'icona o una forma. Così il gioco funziona anche con il daltonismo.
2. Gli **sfondi** sono in bianco e nero puro. Il colore oro degli oggetti da toccare lo aggiungo io nel codice.
3. Il **rosso** compare nelle immagini solo dove lo chiede il prompt (sigillo, stemma, croce con lo stemma del papa).
4. **Lena ha un solo dettaglio colorato:** un nastro azzurro tenue nei capelli. Così la trovi subito nelle scene scure.

## 3. Interfaccia

1. **Dialoghi, Taccuino, glossario:** carta chiara (`#ece6d8`) con inchiostro nero, per leggere bene.
2. **Caratteri da stampa antica**, nella cartella `fonts/` (licenza OFL):
   - **IM Fell DW Pica** per tutti i testi: tipi fusi a Oxford nel Seicento, leggibili e con l'aspetto della stampa a mano;
   - **UnifrakturMaguntia** (gotico tedesco, Fraktur) solo per il nome del luogo e del personaggio che parla. Mai per testi lunghi: è difficile da leggere.
3. **Effetto stampa:** il testo compare lettera per lettera, con un po' d'inchiostro in più che si asciuga. Un tocco sul riquadro mostra subito tutto. Con "riduci movimento" il testo compare tutto insieme.
4. **Opzioni di lettura** (pulsante «Aa Lettura», azzurro, in alto a sinistra nella scena), come in Espo-Nentia: grandezza del testo, carattere (Stampa antica, Leggibile = Atkinson Hyperlegible, OpenDyslexic), più spazio tra lettere e righe, testo subito, lettura ad alta voce con il pulsante «Ascolta». Chi sceglie un carattere moderno lo vede in dialoghi, fogli, glossario e minigioco; le lettere di piombo del minigioco restano in carattere da stampa. Le opzioni sono salvate a parte dalla partita (`js/lettura.js`).
5. **Pulsanti:** contorno a inchiostro, come in una xilografia.
6. **Oggetti da toccare:** leggero alone oro e lieve oscillazione, come in Espo-Nentia.

## 4. Formati tecnici (uguali a Espo-Nentia)

| Cosa | Formato | Note |
| :--- | :--- | :--- |
| Sfondi | 16:9, alla massima risoluzione di Gemini (di solito 1376 × 768), poi WebP | Pavimento libero e piano nel terzo in basso. Niente di importante nel 10% a destra e a sinistra. |
| Schermata del titolo | 9:16, 1440 × 2560 px | Alto 20% e basso 25% calmi, per il titolo e i pulsanti. |
| Personaggi | Verticale 2:3, fondo **magenta pieno** (`#FF00FF`) | Il programma `tools/scontorna_bn.py` toglie il fondo. Bocca chiusa e occhi aperti: bocca e palpebre le disegno io. |
| Oggetti | Fogli 3 × 3 su fondo magenta | Il programma `tools/foglio.py` (da portare da Espo-Nentia) taglia gli oggetti. |
| Immagini dei video di fine capitolo | Foto realistica in bianco e nero ad alto contrasto, solo il rosso; 16:9, circa 2000 × 1116, JPG o PNG di Gemini | Prompt in [docs/PROMPT-VIDEO.md](docs/PROMPT-VIDEO.md). |
| Video di fine capitolo | Seedance, 16:9, 1280 × 720, MP4; voce WAV 24 000 Hz mono | Video finale nel gioco: 1280 × 720, circa 30 s, meno di 10 MB, con sottotitoli WebVTT. |

**Camminata dei personaggi giocabili:** 1 immagine ferma + 8 pose, prese da un video (metodo migliore, vedi "Camminata da un video") oppure da 4 immagini da 2 pose (prompt in [docs/PROMPT-PERSONAGGI.md](docs/PROMPT-PERSONAGGI.md)). Il ciclo dura 8 pose da 240 millisecondi. Il personaggio sale un poco nelle pose di spinta e di passaggio.

**Altezza dei personaggi nella scena:** tutte le immagini hanno la figura alta 700 px. Nel gioco ogni personaggio ha un fattore di altezza rispetto a Lena (1,00): Agnes e il frate portinaio 1,08; Grunenberg, Tetzel e Spalatino 1,15; Lutero, Hans e Martin giovane 1,17; il Cercatore 1,20 (alto e magro).

**Attenzione al magenta:** con il bianco e nero il magenta si stacca bene. Chiedi a Gemini di **non** usare il magenta nel personaggio.

## 5. Come lavorare con Gemini

1. Apri una chat nuova per ogni immagine o foglio.
2. Per la prima immagine non allegare niente. Dalla seconda in poi, allega come riferimento di stile la prima immagine riuscita.
3. Incolla il blocco di stile comune, poi il prompt della scena (vedi la cartella `docs/`).
4. Non scrivere nomi di fumetti o di autori nel prompt: Gemini a volte rifiuta. Descrivi lo stile.
5. Scarica in PNG alla massima risoluzione.
6. Controlla il risultato con la lista in fondo a ogni file di prompt.

File dei prompt:
- [docs/PROMPT-SFONDI.md](docs/PROMPT-SFONDI.md)
- [docs/PROMPT-PERSONAGGI.md](docs/PROMPT-PERSONAGGI.md)
- [docs/PROMPT-OGGETTI.md](docs/PROMPT-OGGETTI.md)
- [docs/PROMPT-VIDEO.md](docs/PROMPT-VIDEO.md): video di 30 secondi a fine capitolo, solo fatti storici (immagini con Gemini, animazione con Seedance, voce con Gemini 2.5 Flash TTS)

## 6. Strumenti

| Strumento | Cosa fa |
| :--- | :--- |
| `tools/scontorna_bn.py` | Toglie il fondo magenta dai personaggi in bianco e nero. Calcola il magenta pixel per pixel, quindi non resta alone viola. Lascia intatti i colori voluti (nastro azzurro, sigilli rossi). |
| `tools/camminata.py` | Prepara posa ferma e camminata: separa le 2 pose di ogni immagine, porta tutte le figure alla stessa altezza (700 px), allinea testa e piedi. Con `--sfondo` crea un'anteprima animata. |

Esempio (Lena):
```
python3 tools/camminata.py lena originali/personaggi/lena.jpg originali/personaggi/lena-camminata-1.jpg originali/personaggi/lena-camminata-2.jpg originali/personaggi/lena-camminata-3.jpg originali/personaggi/lena-camminata-4.jpg --sfondo originali/sfondi/tipografia.jpg
```

Le immagini originali di Gemini restano in `originali/`: servono per rifare i ritagli. Le anteprime animate non vanno nel repo.

### Camminata da un video

**Formato del video:** usa le stesse proporzioni dell'immagine di partenza. Le immagini dei personaggi sono 2:3; il formato più vicino tra quelli del generatore è **834 × 1112** (3:4). Prima di caricare l'immagine, allargala a 3:4 aggiungendo magenta ai lati (`tools/formato_video.py`), così il video non deforma la figura.

I primi due video (Lena e Martin) sono stati fatti a 960 × 960: la figura era allargata di 1,5 volte. Le pose sono state corrette stringendo ogni fotogramma a 2/3 della larghezza prima del ritaglio.

Un generatore di video (es. Seedance) fa una camminata sul posto più regolare delle pose di Gemini. Come si usa:
1. Video del personaggio fermo che cammina sul posto, su fondo magenta, inquadratura fissa.
2. Cerco il ciclo completo (due passi): il tratto in cui l'ultimo fotogramma è più simile al primo.
3. Prendo 8 fotogrammi a distanza uguale nel ciclo e li ritaglio come le altre pose.

Martin giovane: video `originali/personaggi/martin-giovane-camminata.mp4`, ciclo di 50 fotogrammi (24 al secondo) dal fotogramma 33, pose dai fotogrammi 33, 39, 45, 52, 58, 64, 71, 77.

Lena: video `originali/personaggi/lena-camminata.mp4`, ciclo di 27 fotogrammi dal fotogramma 61, pose dai fotogrammi 61, 64, 68, 71, 75, 78, 81, 85. Tutte le pose hanno la **stessa scala**: il su e giù del corpo resta quello del video, e nel codice non si aggiunge. Lena avanza di 14 unità della scena per posa (240 ms).

## 7. Buio e luce nel codice

Gemini fatica a fare neri molto pieni. Il buio si aggiunge nel gioco, sopra lo sfondo:
1. angoli e soffitto quasi neri;
2. luce solo dove serve: finestre, lampade, candele, il centro del pavimento dove cammina il personaggio;
3. le fonti di luce tremolano leggermente.

Così ogni stanza può cambiare luce durante la storia (per esempio di notte resta solo la candela).
