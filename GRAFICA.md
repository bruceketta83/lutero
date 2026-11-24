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
4. Restano da portare le opzioni di lettura di Espo-Nentia (testo grande, OpenDyslexic, spaziatura, lettura ad alta voce): chi le sceglie vede i testi in un carattere moderno.
5. **Pulsanti:** contorno a inchiostro, come in una xilografia.
6. **Oggetti da toccare:** leggero alone oro e lieve oscillazione, come in Espo-Nentia.

## 4. Formati tecnici (uguali a Espo-Nentia)

| Cosa | Formato | Note |
| :--- | :--- | :--- |
| Sfondi | 16:9, alla massima risoluzione di Gemini (di solito 1376 × 768), poi WebP | Pavimento libero e piano nel terzo in basso. Niente di importante nel 10% a destra e a sinistra. |
| Schermata del titolo | 9:16, 1440 × 2560 px | Alto 20% e basso 25% calmi, per il titolo e i pulsanti. |
| Personaggi | Verticale 2:3, fondo **magenta pieno** (`#FF00FF`) | Il programma `tools/scontorna_bn.py` toglie il fondo. Bocca chiusa e occhi aperti: bocca e palpebre le disegno io. |
| Oggetti | Fogli 3 × 3 su fondo magenta | Il programma `tools/foglio.py` (da portare da Espo-Nentia) taglia gli oggetti. |

**Camminata dei personaggi giocabili:** 1 immagine ferma + 8 pose in 4 immagini da 2 pose (prompt in [docs/PROMPT-PERSONAGGI.md](docs/PROMPT-PERSONAGGI.md)). Il ciclo dura 8 pose da 240 millisecondi. Il personaggio sale un poco nelle pose di spinta e di passaggio.

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

## 7. Buio e luce nel codice

Gemini fatica a fare neri molto pieni. Il buio si aggiunge nel gioco, sopra lo sfondo:
1. angoli e soffitto quasi neri;
2. luce solo dove serve: finestre, lampade, candele, il centro del pavimento dove cammina il personaggio;
3. le fonti di luce tremolano leggermente.

Così ogni stanza può cambiare luce durante la storia (per esempio di notte resta solo la candela).
