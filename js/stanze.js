/* ==========================================================================
   STANZE E STORIA
   Coordinate nella scena: 400 × 224 (come l'immagine 16:9 dello sfondo).
   - pavimento: riga dei piedi; min/max: dove può camminare Lena.
   - buio: quanto è scura la stanza (0 = niente, 1 = nero) fuori dalle luci.
   - luci: cerchi di luce nel buio [x, y, raggio, tremola?].
   - personaggi: immagine, posizione x, verso (1 = guarda a destra), altezza rispetto a Lena.
   - oggetti: zona da toccare [x, y, larghezza, altezza], punto dove Lena si ferma (vaiA),
     testo (frasi a turno) oppure azione (funzione).
   - uscite: dove portano (verso) e, se servono, la condizione per uscire (aperta).
   I testi seguono DIALOGHI.md: tono serio, frasi brevi, niente parole moderne.
   ========================================================================== */

/* ---------- Glossario: parole sottolineate nei testi ---------- */
const GLOSSARIO = {
  indulgenza: 'Per la Chiesa del tempo: la cancellazione, davanti a Dio, della pena per i peccati già perdonati con la confessione. Si otteneva con preghiere, pellegrinaggi, opere buone o offerte in denaro.',
  purgatorio: 'Per la dottrina cattolica: lo stato in cui le anime dei morti si purificano dai peccati, prima di entrare in paradiso.',
  risma: 'Un pacco di fogli di carta, di solito 500. La carta era fatta di stracci di lino ed era molto cara.',
  confessione: 'Il sacramento in cui il fedele dice i suoi peccati al sacerdote, si pente e riceve il perdono. Il sacerdote gli dà anche una penitenza: preghiere o opere buone da fare.',
  agostiniani: 'Frati che seguono la regola di sant\'Agostino. A Wittenberg vivevano nel Convento Nero, chiamato così per il colore del loro abito.',
  reliquia: 'Il resto del corpo di un santo (un osso, un capello) o un oggetto che gli è appartenuto. I fedeli le veneravano: credevano che aiutassero a ottenere grazie da Dio.',
  Sassonia: 'Una regione della Germania. Nel 1517 la governa il principe elettore Federico il Saggio. Wittenberg è una delle sue città, con il castello e l\'università.',
  'principe elettore': 'Uno dei sette principi tedeschi che scelgono l\'imperatore. Federico di Sassonia è uno di loro: per questo è molto potente.',
  domenicani: 'Frati dell\'Ordine dei Predicatori, fondato da san Domenico. Erano famosi per le loro prediche. Frate Tetzel era domenicano.',
  grosso: 'Una moneta d\'argento usata in Sassonia. Un fiorino d\'oro valeva circa venti grossi.',
  compositoio: 'Un piccolo vassoio di metallo. Il compositore ci mette le lettere di piombo una dopo l\'altra, per formare una riga.',
  'caratteri mobili': 'Lettere di metallo (piombo, stagno e antimonio) fuse una per una. Si mettono in fila per comporre il testo. Dopo la stampa tornano nella cassa e si usano di nuovo.',
  tesi: 'Una frase breve che si vuole dimostrare in una disputa. Lutero scrisse 95 tesi sulle indulgenze, in latino.',
  disputa: 'Una discussione pubblica all\'università. Chi propone le tesi le difende, gli altri provano a dimostrare che sono sbagliate.',
  torchio: 'La pressa della tipografia. Una grande vite spinge un piano di legno che preme il foglio sui caratteri inchiostrati.',
};
const gl = (parola, testo) => `<a class="gl" data-gl="${parola}" href="#">${testo || parola}</a>`;

/* ---------- Avviso dell'indulgenza (fonte ricostruita per il gioco) ---------- */
const AVVISO = `<div class="foglio">
  <p class="titolo-foglio">Grazia e indulgenza</p>
  <p>Per ordine del Santo Padre, papa Leone X, e del reverendissimo arcivescovo Alberto di Magonza,
  si annuncia a tutti i fedeli: a Jüterbog predica il venerabile frate Johann Tetzel, dell'Ordine dei Predicatori.</p>
  <p>Chi è pentito, si confessa e dà un'offerta per la costruzione della nuova basilica di San Pietro in Roma
  riceve l'${gl('indulgenza')} piena per i suoi peccati.</p>
  <p>La stessa grazia si può ottenere per le anime dei propri cari defunti, che soffrono nel ${gl('purgatorio')}.</p>
  <p class="nota-foglio">Avviso ricostruito per il gioco, sulla base dell'Istruzione dell'arcivescovo Alberto di Magonza ai predicatori (1515).</p>
</div>`;

/* ---------- Pagina del libro delle reliquie (fonte ricostruita per il gioco) ---------- */
const LIBRO_RELIQUIE = `<div class="foglio">
  <p class="titolo-foglio">Le sante reliquie di Wittenberg</p>
  <p>Questo libro mostra le sante ${gl('reliquia', 'reliquie')} che l'illustrissimo principe Federico, duca e ${gl('principe elettore')} di ${gl('Sassonia')},
  ha raccolto nella chiesa di Ognissanti, nel castello di Wittenberg.</p>
  <p>Le reliquie si mostrano ai fedeli ogni anno, in primavera dopo la Pasqua e nel giorno di Ognissanti.</p>
  <p>Chi le visita con devozione, si confessa e dà un'offerta per questa chiesa riceve, per ogni reliquia, giorni e anni di ${gl('indulgenza')}.</p>
  <p class="nota-foglio">Pagina ricostruita per il gioco. Il vero libro (il "Libro delle reliquie di Wittenberg") fu stampato a Wittenberg nel 1509, con le xilografie di Lucas Cranach.</p>
</div>`;

/* ---------- Foglio di consegna di Hans (inventato per il gioco) ---------- */
const FOGLIO_CONSEGNA = `<div class="foglio">
  <p class="titolo-foglio">Foglio di consegna</p>
  <p>Hans, carrettiere di Wittenberg, va a Jüterbog, alla locanda del Cervo.</p>
  <p>Là carica 4 botti di birra e 2 balle di lana, e le porta a Wittenberg, alla bottega di Mastro Lukas.</p>
  <p>L'oste del Cervo paga al carrettiere 6 ${gl('grosso', 'grossi')} quando il carro è carico.</p>
  <p>Scritto a Wittenberg, il giorno di san Marco, nell'anno del Signore 1517.</p>
  <p class="nota-foglio">Foglio inventato per il gioco.</p>
</div>`;

/* ---------- Lettera d'indulgenza copiata a Jüterbog (fonte ricostruita per il gioco) ---------- */
const LETTERA = `<div class="foglio">
  <p class="titolo-foglio">Lettera d'indulgenza</p>
  <p>Frate Johann Tetzel, dell'Ordine dei Predicatori, commissario per l'${gl('indulgenza')} della basilica di San Pietro, a tutti quelli che leggeranno questa lettera: salute nel Signore.</p>
  <p><em>Hans, carrettiere di Wittenberg</em> ha dato il suo contributo per la costruzione della nuova basilica di San Pietro in Roma.</p>
  <p>Per questo può scegliere un sacerdote per la ${gl('confessione')}. Il sacerdote può perdonargli tutti i peccati, anche quelli che di solito perdona solo il papa, e dargli l'indulgenza piena: una volta nella vita e in punto di morte.</p>
  <p>Dato a <em>Jüterbog</em>, nell'anno del Signore <em>1517</em>.</p>
  <p class="nota-foglio">Lettera ricostruita per il gioco. Le vere lettere d'indulgenza erano stampate in molte copie, con spazi vuoti: il nome, il luogo e la data si scrivevano a mano. Molte sono conservate negli archivi.</p>
</div>`;

/* La data in alto cambia con la storia. */
function dataWittenberg() {
  if (flag('mappa')) return 'Wittenberg, dicembre 1517';
  if (flag('autunno')) return 'Wittenberg, 31 ottobre 1517';
  return 'Wittenberg, primavera 1517';
}

const STANZE = {
  /* ======================= TIPOGRAFIA ======================= */
  tipografia: {
    luogo: 'Tipografia di Mastro Grunenberg',
    data: () => dataWittenberg(),
    sfondo: 'img/bg/tipografia.webp',
    pavimento: 216,
    min: 40, max: 360,
    inizio: 200,
    buio: 0.82,
    luci: [
      [160, 95, 95, false],   // finestra
      [341, 128, 60, true],   // lampada a olio
      [210, 205, 150, false], // centro del pavimento
    ],
    ingresso() {
      if (flag('autunno') && !flag('vista-tipografia-autunno')) {
        setFlag('vista-tipografia-autunno');
        return 'La bottega, in autunno. Fuori piove. Il Mastro ha acceso la lampada già a metà pomeriggio.';
      }
      if (flag('ritorno') && !flag('vista-ritorno')) {
        setFlag('vista-ritorno');
        return 'Due giorni dopo, di nuovo in bottega. Ho ancora la polvere della strada sulle scarpe. Mastro Grunenberg mi guarda e non dice niente.';
      }
      if (!flag('vista-tipografia')) {
        setFlag('vista-tipografia');
        return 'La bottega odora di inchiostro e olio. Mastro Grunenberg conta i fogli e borbotta. <br>Tocca il pavimento per camminare, tocca le cose e le persone per guardarle o parlare.';
      }
      return flag('risma') ? 'La bottega. Ho la risma nella borsa: devo portarla al Convento Nero.' : 'Sono di nuovo in bottega.';
    },
    personaggi: [
      {
        id: 'grunenberg', nome: 'Mastro Grunenberg', img: 'img/chars/grunenberg.webp',
        x: 300, verso: -1, alto: 1.15,
        parla() {
          if (flag('ritorno')) { grunenbergRitorno(); return; }
          if (flag('missione')) {
            dialogo('Mastro Grunenberg', 'Il dottor Martin mi ha mandato un ragazzo con un biglietto: per qualche giorno lavori per lui. Vai, ma torna presto.');
            return;
          }
          if (!flag('compito')) {
            conversa([
              ['Mastro Grunenberg', 'Lena. Finalmente. Hai finito di sciacquare i mazzi? Bene.'],
              ['Mastro Grunenberg', 'Il dottor Martin, all\'università, vuole carta buona per i suoi appunti. E paga. Ogni tanto.'],
              ['Lena', 'Il frate del Convento Nero? Quello che predica in città?'],
              ['Mastro Grunenberg', 'Lui. Prendi una ' + gl('risma') + ' da laggiù, vicino alla lampada, e portagliela. Non bagnarla, che costa più di te.'],
              ['Mastro Grunenberg', 'E non fermarti al mercato a chiacchierare. Oggi mezza Wittenberg ha la testa altrove.'],
            ], () => { setFlag('compito'); dialogo('Lena', 'Una risma di carta per il dottor Martin. Le risme sono vicino alla lampada.'); });
          } else if (!flag('risma')) {
            dialogo('Mastro Grunenberg', variante('gr-attesa', [
              'Le risme sono vicino alla lampada. Ne basta una.',
              'Cosa aspetti? La carta non cammina da sola.',
            ]));
          } else {
            dialogo('Mastro Grunenberg', variante('gr-vai', [
              'Al Convento Nero, dal dottor Martin. Esci dalla porta e passa dal mercato.',
              'Vai, e torna prima che faccia buio. Ho bisogno di te al ' + gl('torchio') + '.',
            ]));
          }
        },
      },
    ],
    oggetti: [
      {
        id: 'casse', nome: 'Casse dei caratteri', zona: [14, 88, 106, 52], vaiA: 95,
        azione() {
          if (flag('salmi') && !flag('riga')) { minigiocoSalmi(); return; }
          if (flag('lavoro-tesi') && !flag('tesi-composta')) { minigiocoTesi(); return; }
          dialogo('Lena', variante('casse', this.testo));
        },
        testo: [
          'Migliaia di lettere di piombo, ognuna nel suo scomparto. Mastro Grunenberg sa dov\'è ogni <em>a</em> anche al buio.',
          'Le lettere sono al contrario, come in uno specchio. All\'inizio mi facevano girare la testa.',
        ],
      },
      {
        id: 'tavolo', nome: 'Tavolo dei mazzi', zona: [132, 106, 66, 26], vaiA: 165,
        testo: [
          'I mazzi per l\'inchiostro: cuoio imbottito di crine. Si battono sulle lettere prima di stampare.',
          'L\'inchiostro è nerofumo e olio di lino cotto. Puzza, e non va via dalle mani per giorni.',
        ],
      },
      {
        id: 'torchio', nome: 'Il torchio', zona: [190, 40, 70, 140], vaiA: 230,
        testo: [
          'Il ' + gl('torchio') + '. Si gira la leva, la vite scende, il piano preme il foglio sulle lettere. Un colpo, una pagina.',
          'Prima del torchio, un libro si copiava a mano. Mesi di lavoro. Qui in un giorno facciamo centinaia di fogli.',
        ],
      },
      {
        id: 'finestra', nome: 'La finestra', zona: [138, 66, 44, 43], vaiA: 160,
        testo: [
          'Fuori il cielo è grigio. La luce entra poca: per comporre le righe serve la lampada anche di giorno.',
        ],
      },
      {
        id: 'fogli', nome: 'Fogli ad asciugare', zona: [70, 8, 290, 42], vaiA: 220,
        testo: [
          'I fogli stampati appesi ad asciugare. Se li tocchi troppo presto, l\'inchiostro si sbava e il lavoro è perso.',
        ],
      },
      {
        id: 'lampada', nome: 'La lampada a olio', zona: [330, 108, 24, 30], vaiA: 320,
        testo: [
          'La lampada a olio. Fa più fumo che luce. Mastro Grunenberg dice che l\'olio costa quanto la carta.',
        ],
      },
      {
        id: 'risme', nome: 'Le risme di carta', zona: [364, 113, 34, 30], vaiA: 350,
        azione() {
          if (!flag('compito')) {
            dialogo('Lena', variante('risme-prima', [
              'Risme di carta di stracci, arrivate da lontano. La carta è la cosa più cara della bottega.',
              'Non tocco la carta senza il permesso del Mastro.',
            ]));
          } else if (!flag('risma')) {
            setFlag('risma');
            prendi('risma', 'una risma di carta');
            dialogo('Lena', 'Prendo una risma e la avvolgo nel panno, nella borsa. Pesa più di quanto sembra.');
          } else {
            dialogo('Lena', 'Ne ho già presa una. Il Mastro conta le risme ogni sera.');
          }
        },
      },
    ],
    uscite: [
      {
        id: 'mercato', etichetta: '⟵ Mercato', x: 8, y: 214, vaiA: 40, verso: 'mercato', arrivo: 345,
        aperta: () => flag('risma'),
        chiusa: [
          'Prima devo sentire cosa vuole il Mastro. Sta borbottando da un\'ora.',
          'Non posso uscire senza il permesso di Mastro Grunenberg.',
        ],
      },
    ],
  },

  /* ======================= MERCATO ======================= */
  mercato: {
    luogo: 'Piazza del mercato',
    data: () => dataWittenberg(),
    sfondo: 'img/bg/mercato.webp',
    pavimento: 214,
    min: 30, max: 370,
    inizio: 345,
    buio: 0.45,
    luci: [
      [200, 60, 170, false],  // cielo grigio
      [200, 200, 170, false], // la piazza
    ],
    ingresso() {
      if (flag('mappa') && !flag('vista-mercato-inverno')) {
        setFlag('vista-mercato-inverno');
        return 'Dicembre. Il mercato è coperto di neve sporca. Frau Agnes vende candele vicino al pozzo, con le mani avvolte negli stracci.';
      }
      if (!flag('vista-mercato')) {
        setFlag('vista-mercato');
        return 'Il mercato è quasi vuoto. Le bancarelle sono chiuse. Un gruppo di persone si incammina verso la porta della città, con fagotti e bastoni.';
      }
      return 'La piazza del mercato.';
    },
    personaggi: [
      {
        id: 'agnes', nome: 'Frau Agnes', img: 'img/chars/agnes.webp',
        x: 240, verso: 1, alto: 1.08,
        parla() {
          if (flag('mappa')) { agnesFinale(); return; }
          if (!flag('agnes-1')) {
            conversa([
              ['Frau Agnes', 'Lena! Sei la ragazza della tipografia, vero? Tu sai leggere.'],
              ['Lena', 'Sì, Frau Agnes. Il Mastro mi ha insegnato.'],
              ['Frau Agnes', 'Sulla bacheca hanno appeso un foglio. Tutti ne parlano, ma io… io non so leggere le lettere.'],
              ['Frau Agnes', 'Me lo leggi? Per favore. Dicono che riguarda i morti.'],
            ], () => { setFlag('agnes-1'); dialogo('Lena', 'La bacheca è a destra, vicino alle case. Vado a leggere il foglio.'); });
          } else if (!flag('avviso-letto')) {
            dialogo('Frau Agnes', variante('agnes-attesa', [
              'Il foglio è sulla bacheca, là a destra.',
              'Fai presto, cara. La gente parte già.',
            ]));
          } else if (!flag('agnes-2')) {
            conversa([
              ['Lena', 'Dice che a Jüterbog predica frate Tetzel. Chi dà un\'offerta riceve l\'' + gl('indulgenza') + '. Anche per i morti.'],
              ['Frau Agnes', 'Anche per i morti… Allora è vero.'],
              ['Frau Agnes', 'Mio marito, Jakob. È morto quest\'inverno, di febbre. Non ha fatto in tempo a confessarsi.'],
              ['Frau Agnes', 'Il prete dice che le anime soffrono nel ' + gl('purgatorio') + ' per anni. Forse per secoli.'],
              ['Frau Agnes', 'Ho messo da parte un fiorino vendendo candele. Domani vado a Jüterbog, con gli altri.'],
              ['Lena', 'Jüterbog è lontana. Una giornata intera di cammino.'],
              ['Frau Agnes', 'Per Jakob camminerei fino a Roma.'],
            ], () => {
              setFlag('agnes-2');
              dialogo('Lena', 'Frau Agnes stringe la moneta fino a farsi male. Un fiorino è il lavoro di settimane.');
            });
          } else if (flag('ritorno')) {
            dialogo('Frau Agnes', variante('agnes-ritorno', [
              'Sono tornata da Jüterbog con i piedi rotti. Ma il frate ha detto che Jakob ora è in pace.',
              'Ho ricominciato a fare candele. Un fiorino è tanto, Lena. Tanto.',
            ]));
          } else {
            dialogo('Frau Agnes', variante('agnes-dopo', [
              'Dio ti benedica, cara. Senza di te non avrei saputo niente.',
              'Domani all\'alba parto. Prega per me, e per Jakob.',
            ]));
          }
        },
      },
    ],
    oggetti: [
      {
        id: 'bacheca', nome: 'La bacheca', zona: [312, 96, 54, 50], vaiA: 300,
        azione() {
          setFlag('avviso-letto');
          fonte('avviso');
          leggi('Avviso sulla bacheca', AVVISO, () => {
            dialogo('Lena', flag('agnes-1') && !flag('agnes-2')
              ? 'Una grazia che si paga. Devo dirlo a Frau Agnes.'
              : 'L\'avviso dell\'indulgenza. Il Mastro dice che oggi mezza Wittenberg ha la testa altrove: ora capisco perché.');
          });
        },
      },
      {
        id: 'pozzo', nome: 'Il pozzo', zona: [112, 108, 56, 72], vaiA: 140,
        testo: [
          'Il pozzo della piazza. La mattina c\'è la fila per l\'acqua. Oggi no: tutti parlano di Jüterbog.',
          'L\'acqua è fredda e sa di ferro. Meglio non sporcare la carta.',
        ],
      },
      {
        id: 'bancarelle', nome: 'Le bancarelle', zona: [60, 112, 50, 56], vaiA: 90,
        testo: [
          'Bancarelle chiuse. Chi vende uova e formaggio è partito con gli altri.',
          'Un mercante ha lasciato un cesto vuoto. Forse tornerà domani, forse no.',
        ],
      },
      {
        id: 'municipio', nome: 'Il municipio', zona: [196, 24, 70, 36], vaiA: 200,
        testo: [
          'Il municipio di Wittenberg. Qui si decidono le tasse e le multe. E si appendono le notizie importanti.',
        ],
      },
    ],
    uscite: [
      { id: 'tipografia', etichetta: 'Tipografia ⟶', x: 300, y: 214, vaiA: 370, verso: 'tipografia', arrivo: 60 },
      {
        id: 'chiesa', etichetta: '↑ Chiesa del Castello', x: 262, y: 170, vaiA: 290, verso: 'chiesa', arrivo: 50,
        aperta: () => flag('missione'),
        chiusa: [
          'La strada per la Chiesa del Castello. Prima devo portare la carta al dottor Martin.',
          'Il Mastro ha detto di non perdere tempo. Prima il Convento Nero.',
        ],
      },
      {
        id: 'convento', etichetta: '⟵ Convento Nero', x: 8, y: 214, vaiA: 30, verso: 'cortile', arrivo: 340,
        aperta: () => flag('agnes-2'),
        chiusa: [
          'Frau Agnes mi fa segno di avvicinarmi. Prima sento cosa vuole.',
          'Frau Agnes mi aspetta ancora. Il convento è vicino, ci vado dopo.',
        ],
      },
    ],
  },

  /* ======================= CONVENTO NERO: CORTILE ======================= */
  cortile: {
    luogo: 'Convento Nero',
    data: () => dataWittenberg(),
    sfondo: 'img/bg/convento-cortile.webp',
    pavimento: 212,
    min: 30, max: 350,
    inizio: 340,
    buio: 0.55,
    luci: [
      [200, 30, 150, false],  // cielo
      [230, 190, 150, false], // il cortile
    ],
    ingresso() {
      if (!flag('visto-cortile')) {
        setFlag('visto-cortile');
        return 'Il cortile del Convento Nero, la casa dei frati ' + gl('agostiniani') + '. È silenzioso. Si sente solo una campana lontana.';
      }
      return 'Il cortile del Convento Nero.';
    },
    personaggi: [
      {
        id: 'portinaio', nome: 'Il frate portinaio', img: 'img/chars/portinaio.webp',
        x: 225, verso: 1, alto: 1.08,
        parla() {
          if (!flag('portinaio-1')) {
            setFlag('portinaio-1');
            conversa([
              ['Il frate portinaio', 'Pace a te, figliola. Cosa porti in quella borsa?'],
              ['Lena', 'Carta per il dottor Martin, dalla tipografia di Mastro Grunenberg.'],
              ['Il frate portinaio', 'Il dottor Martin è nella sua cella. La porta ad arco, là a destra.'],
              ['Il frate portinaio', 'Bussa forte. Quando scrive non sente nemmeno le campane.'],
            ]);
          } else {
            dialogo('Il frate portinaio', variante('portinaio', [
              'La porta ad arco, figliola. E bussa forte.',
              'Il dottor Martin insegna all\'università, predica in città e scrive di notte. Non so quando dorma.',
            ]));
          }
        },
      },
    ],
    oggetti: [
      {
        id: 'porta-cella', nome: 'La porta della cella', zona: [318, 80, 50, 98], vaiA: 330,
        azione() {
          if (flag('missione')) { cambiaStanza('cella', 50); return; }
          dialogo('Lena', 'Busso forte, tre volte. Da dentro, una voce: «Avanti!»');
          setTimeout(() => cambiaStanza('cella', 50), 1400);
        },
      },
      {
        id: 'albero', nome: 'L\'albero', zona: [125, 40, 75, 100], vaiA: 165,
        testo: [
          'Un albero spoglio. I frati dicono che a primavera fa ancora qualche foglia. Quest\'anno, per ora, niente.',
        ],
      },
      {
        id: 'pozzo', nome: 'Il pozzo', zona: [238, 125, 36, 30], vaiA: 260,
        testo: [
          'Il pozzo del convento. Accanto ci sono due secchi di legno, ben puliti.',
        ],
      },
      {
        id: 'legna', nome: 'La legna', zona: [0, 150, 40, 30], vaiA: 40,
        testo: [
          'Legna tagliata per l\'inverno. I frati la spaccano da soli.',
        ],
      },
    ],
    uscite: [
      { id: 'mercato-da-cortile', etichetta: '⟵ Mercato', x: 8, y: 214, vaiA: 30, verso: 'mercato', arrivo: 60 },
    ],
  },

  /* ======================= CONVENTO NERO: CELLA DI LUTERO ======================= */
  cella: {
    luogo: 'La cella del dottor Martin',
    data: () => dataWittenberg(),
    sfondo: 'img/bg/cella.webp',
    pavimento: 214,
    min: 30, max: 360,
    inizio: 50,
    buio: 0.86,
    luci: [
      [226, 112, 70, true],   // candela
      [258, 75, 55, false],   // finestra
      [200, 200, 120, false], // pavimento
    ],
    ingresso() {
      if (flag('autunno') && !flag('vista-cella-autunno')) {
        setFlag('vista-cella-autunno');
        return '31 ottobre 1517, vigilia di Ognissanti. È passata l\'estate. Il dottor Martin mi ha fatto chiamare. Sul tavolo ci sono fogli pieni di righe numerate.';
      }
      if (!flag('vista-cella')) {
        setFlag('vista-cella');
        return 'Una stanza piccola e fredda. Libri dappertutto. Il dottor Martin scrive alla luce di una candela e non alza la testa.';
      }
      return 'La cella del dottor Martin.';
    },
    personaggi: [
      {
        id: 'lutero', nome: 'Il dottor Martin', img: 'img/chars/lutero.webp',
        x: 290, verso: -1, alto: 1.17,
        parla() {
          if (flag('ritorno')) { luteroRitorno(); return; }
          if (!flag('lutero-1')) {
            conversa([
              ['Lena', 'Dottor Martin? Vi porto la carta di Mastro Grunenberg.'],
              ['Il dottor Martin', 'Ah, la carta. Posala sul tavolo. Grazie, ragazza.'],
              ['Il dottor Martin', 'Sei passata dal mercato? Tutta la città parla di Jüterbog.'],
              ['Lena', 'Frau Agnes vuole comprare un\'' + gl('indulgenza') + ' per il marito morto. Ha messo da parte un fiorino.'],
              ['Il dottor Martin', 'Un fiorino. Per una vedova sono settimane di pane.'],
              ['Il dottor Martin', 'Ogni settimana, in ' + gl('confessione') + ', la gente mi mostra quei fogli con il sigillo. Dicono: «Ho già pagato, sono a posto».'],
              ['Il dottor Martin', 'E non sono pentiti di niente. Non vogliono cambiare vita. Vogliono solo un foglio.'],
              ['Lena', 'Ma l\'avviso dice che la grazia la manda il papa.'],
              ['Il dottor Martin', 'Lo so. Per questo devo essere sicuro di quello che dico. Mi servono prove, non voci.'],
              ['Il dottor Martin', 'Tu sai leggere e scrivi svelta. Vai a Jüterbog con la gente del mercato. Ascolta il predicatore e scrivi le sue parole esatte.'],
              ['Il dottor Martin', 'E se puoi, copia una lettera d\'indulgenza. Parola per parola.'],
              ['Lena', 'E Mastro Grunenberg?'],
              ['Il dottor Martin', 'Con Grunenberg parlo io. Il tempo che perdi te lo pago.'],
              ['Il dottor Martin', 'Prima di partire, passa dalla Chiesa del Castello. Porta questo biglietto a Spalatino, il segretario del principe.'],
              ['Il dottor Martin', 'Lui conosce le strade e la corte. Ti dirà come arrivare a Jüterbog.'],
            ], () => {
              setFlag('lutero-1');
              setFlag('missione');
              lascia('risma');
              prendi('biglietto', 'un biglietto per Spalatino');
              dialogo('Lena', 'Le parole esatte del predicatore e una lettera d\'indulgenza. Ma prima il biglietto per Spalatino, alla Chiesa del Castello.<br>Dal mercato si va in chiesa per la strada in fondo, a destra della bacheca: <em>↑ Chiesa del Castello</em>.');
            });
          } else {
            if (!flag('spalatino-1')) {
              dialogo('Il dottor Martin', 'Prima il biglietto a Spalatino. Dal mercato prendi la strada in fondo, a destra della bacheca: porta alla Chiesa del Castello.');
              return;
            }
            dialogo('Il dottor Martin', variante('lutero-dopo', [
              'Le parole esatte, Lena. Non quello che la gente racconta.',
              'Vai con Dio. E tieni gli occhi aperti.',
            ]));
          }
        },
      },
    ],
    oggetti: [
      {
        id: 'bibbia', nome: 'La Bibbia sul leggio', zona: [296, 84, 70, 40], vaiA: 330,
        testo: [
          'Una Bibbia in latino, aperta. Il dottor Martin la spiega agli studenti dell\'università.',
          'In chiesa le letture sono in latino. Quasi nessuno a Wittenberg le capisce davvero.',
        ],
      },
      {
        id: 'candela', nome: 'La candela', zona: [217, 100, 18, 24], vaiA: 220,
        testo: [
          'Una candela di sego, quasi finita. Puzza come quelle che vende Frau Agnes.',
        ],
      },
      {
        id: 'scrittoio', nome: 'Lo scrittoio', zona: [190, 128, 74, 62], vaiA: 200,
        testo: [
          'Fogli pieni di scrittura fitta, in latino. Molte righe sono cancellate e riscritte.',
          'Una penna d\'oca e il calamaio. Le dita del dottor Martin sono nere d\'inchiostro, come le mie.',
        ],
      },
      {
        id: 'libri', nome: 'Gli scaffali dei libri', zona: [120, 52, 60, 100], vaiA: 150,
        testo: [
          'Libri grossi, rilegati in cuoio. Alcuni sono stampati, altri scritti a mano.',
        ],
      },
      {
        id: 'crocifisso', nome: 'Il crocifisso', zona: [55, 30, 30, 85], vaiA: 70,
        testo: [
          'Un crocifisso di legno, semplice. È l\'unica cosa appesa al muro.',
        ],
      },
      {
        id: 'finestra-cella', nome: 'La finestra', zona: [240, 40, 36, 54], vaiA: 250,
        testo: [
          'Dalla finestra si vede il cortile e l\'albero spoglio. Il vetro è a piccoli rombi, piombati.',
        ],
      },
    ],
    uscite: [
      { id: 'cortile-da-cella', etichetta: '⟵ Cortile', x: 8, y: 214, vaiA: 30, verso: 'cortile', arrivo: 330 },
    ],
  },
  /* ======================= CHIESA DEL CASTELLO: IL PORTONE ======================= */
  chiesa: {
    luogo: 'Chiesa del Castello',
    data: () => dataWittenberg(),
    sfondo: 'img/bg/chiesa-castello.webp',
    pavimento: 214,
    min: 30, max: 330,
    inizio: 50,
    buio: 0.5,
    luci: [
      [60, 50, 120, false],   // cielo
      [200, 190, 160, false], // la piazza
      [230, 130, 50, false],  // il portone
    ],
    ingresso() {
      if (flag('tesi') && !flag('vista-chiesa-autunno')) {
        setFlag('vista-chiesa-autunno');
        return 'La vigilia di Ognissanti. Domani il principe mostra le sue reliquie: in piazza ci sono già i primi pellegrini.';
      }
      if (!flag('vista-chiesa')) {
        setFlag('vista-chiesa');
        return 'La Chiesa del Castello, la chiesa del principe. Accanto c\'è la torre del castello. Le pietre sono scure di pioggia.';
      }
      return 'La Chiesa del Castello.';
    },
    personaggi: [],
    oggetti: [
      {
        id: 'portone', nome: 'Il portone della chiesa', zona: [212, 104, 40, 52], vaiA: 232,
        azione() {
          if (flag('tesi') && !flag('porta')) { scenaPorta(); return; }
          dialogo('Lena', variante('portone', [
            'Il portone è socchiuso. Sul legno ci sono tanti buchi di chiodi: l\'università ci appende i suoi avvisi. Entro.',
            'Entro in chiesa, piano.',
          ]));
          setTimeout(() => cambiaStanza('reliquie', 70), 1500);
        },
      },
      {
        id: 'vetrate', nome: 'Le vetrate', zona: [306, 10, 40, 80], vaiA: 310,
        testo: [
          'Vetrate alte e strette. Dicono che dentro il principe tiene migliaia di ' + gl('reliquia', 'reliquie') + '.',
        ],
      },
      {
        id: 'torre', nome: 'La torre', zona: [356, 20, 40, 150], vaiA: 330,
        testo: [
          'La torre rotonda del castello. Qui abita il principe Federico, quando è a Wittenberg.',
        ],
      },
      {
        id: 'mura', nome: 'Le mura', zona: [20, 100, 70, 40], vaiA: 60,
        testo: [
          'Le mura e una porta. Oltre c\'è la campagna. Di là passa la strada che va verso sud.',
        ],
      },
      {
        id: 'foglie', nome: 'Le foglie secche', zona: [120, 176, 60, 22], vaiA: 150,
        get testo() {
          return flag('autunno')
            ? ['Foglie secche, appena cadute. Domani è Ognissanti, e nessuno ha tempo di spazzarle.']
            : ['Foglie secche dell\'anno passato. Nessuno le ha ancora spazzate via.'];
        },
      },
    ],
    uscite: [
      {
        id: 'strada', etichetta: '↑ Strada per Jüterbog', x: 30, y: 160, vaiA: 60, verso: 'confine', arrivo: 40,
        aperta: () => flag('divieto') && !flag('ritorno'),
        get chiusa() {
          return flag('ritorno')
            ? ['Jüterbog è lontana, e il mio lavoro ora è qui a Wittenberg.']
            : ['La porta della città. Prima devo portare il biglietto a Spalatino.', 'Spalatino mi aspetta in chiesa. Poi partirò.'];
        },
      },
      { id: 'mercato-da-chiesa', etichetta: '⟵ Mercato', x: 8, y: 214, vaiA: 30, verso: 'mercato', arrivo: 290 },
    ],
  },

  /* ======================= CHIESA DEL CASTELLO: LA SALA DELLE RELIQUIE ======================= */
  reliquie: {
    luogo: 'La sala delle reliquie',
    data: () => dataWittenberg(),
    sfondo: 'img/bg/reliquie.webp',
    pavimento: 212,
    min: 60, max: 340,
    inizio: 70,
    buio: 0.62,
    luci: [
      [280, 75, 70, false],   // finestre
      [30, 130, 45, true],    // candele a sinistra
      [150, 150, 50, true],   // candele sul tavolo
      [370, 165, 45, true],   // candele a destra
      [210, 195, 110, false], // pavimento
    ],
    ingresso() {
      if (!flag('vista-reliquie')) {
        setFlag('vista-reliquie');
        return 'Una sala piena di candele accese. Su tavoli e scaffali ci sono cassette d\'argento, croci e teche di vetro. L\'aria sa di cera e di polvere.';
      }
      return 'La sala delle reliquie.';
    },
    personaggi: [
      {
        id: 'spalatino', nome: 'Spalatino', img: 'img/chars/spalatino.webp',
        x: 275, verso: -1, alto: 1.15,
        parla() {
          if (!flag('spalatino-1')) {
            conversa([
              ['Lena', 'Signor Spalatino? Il dottor Martin vi manda questo biglietto.'],
              ['Spalatino', 'Grazie, ragazza. Parla piano: qui dentro si parla piano.'],
              ['Spalatino', 'Martin vuole sapere cosa penso di Jüterbog. Come sempre, vuole tutto e subito.'],
              ['Spalatino', 'Guardati intorno. Queste sono le ' + gl('reliquia', 'reliquie') + ' del principe Federico. Ossa di santi, pezzi di stoffa, schegge di legno. Migliaia di pezzi.'],
              ['Lena', 'Migliaia? Da dove vengono?'],
              ['Spalatino', 'Da tutta la cristianità. Da giovane il principe è andato in pellegrinaggio fino a Gerusalemme. Altre le ha comprate, altre le ha ricevute in dono.'],
              ['Spalatino', 'Due volte all\'anno le mostriamo ai fedeli. Chi le guarda con devozione e lascia un\'offerta riceve un\'' + gl('indulgenza') + '.'],
              ['Lena', 'Un\'indulgenza? Come quella di frate Tetzel?'],
              ['Spalatino', 'Il principe crede che le reliquie aiutino le anime. E le offerte mantengono questa chiesa e l\'università dove insegna Martin.'],
              ['Lena', 'Allora perché la gente di Wittenberg va fino a Jüterbog?'],
              ['Spalatino', 'Perché in ' + gl('Sassonia') + ' frate Tetzel non può predicare. Il principe glielo ha vietato.'],
              ['Spalatino', 'Così predica a Jüterbog. È appena oltre il confine, nelle terre dell\'arcivescovo Alberto. Una giornata di cammino.'],
            ], () => {
              setFlag('spalatino-1');
              lascia('biglietto');
              domandaDivieto();
            });
          } else if (!flag('divieto')) {
            domandaDivieto();
          } else {
            dialogo('Spalatino', variante('spalatino-dopo', [
              'A Jüterbog ascolta e non parlare. E non dire a nessuno che ti manda un frate di Wittenberg.',
              'Saluta Martin da parte mia. E digli di dormire, ogni tanto.',
            ]));
          }
        },
      },
    ],
    oggetti: [
      {
        id: 'libro-reliquie', nome: 'Il libro delle reliquie', zona: [198, 136, 40, 20], vaiA: 205,
        azione() {
          fonte('libro-reliquie');
          leggi('Il libro delle reliquie', LIBRO_RELIQUIE, () => {
            dialogo('Lena', 'Un libro stampato, con le figure di ogni reliquia. Anche il principe usa la stampa per far sapere le cose.');
          });
        },
      },
      {
        id: 'cassette', nome: 'Le cassette sullo scaffale', zona: [25, 88, 85, 40], vaiA: 75,
        testo: [
          'Cassette d\'argento e di legno dipinto. Su alcune sono disegnate due ossa incrociate.',
          'Ogni cassetta ha un cartellino scritto a mano. Il nome di un santo, e un numero.',
        ],
      },
      {
        id: 'teca', nome: 'La teca di vetro', zona: [55, 130, 30, 45], vaiA: 80,
        testo: [
          'Una teca di vetro. Dentro c\'è un piccolo osso avvolto nella seta. Il cartellino dice: un santo martire.',
        ],
      },
      {
        id: 'scrigno', nome: 'Lo scrigno', zona: [100, 148, 60, 26], vaiA: 130,
        testo: [
          'Uno scrigno con figure di santi scolpite. Il coperchio è chiuso con un lucchetto.',
        ],
      },
      {
        id: 'croce-scaffale', nome: 'La croce d\'argento', zona: [160, 76, 26, 32], vaiA: 170,
        testo: [
          'Una croce d\'argento. Dentro, dicono, c\'è una scheggia della croce di Cristo.',
        ],
      },
      {
        id: 'candele', nome: 'Le candele', zona: [0, 110, 28, 55], vaiA: 60,
        testo: [
          'Candele di cera d\'api, non di sego come quelle di Frau Agnes. Una sola costa più di una giornata di lavoro.',
        ],
      },
      {
        id: 'libro-grande', nome: 'Il grande libro', zona: [316, 174, 44, 26], vaiA: 320,
        testo: [
          'Un grande libro chiuso, con gli angoli di metallo. Sopra c\'è una croce di legno.',
        ],
      },
      {
        id: 'croce-destra', nome: 'La croce sul tavolo', zona: [358, 112, 34, 50], vaiA: 340,
        testo: [
          'Una croce alta, accanto a un vaso di metallo. Sulla cera colata ci sono le impronte delle dita di chi l\'ha accesa.',
        ],
      },
    ],
    uscite: [
      { id: 'chiesa-da-reliquie', etichetta: '⟵ Portone', x: 8, y: 214, vaiA: 60, verso: 'chiesa', arrivo: 232 },
    ],
  },
  /* ======================= LA STRADA PER JÜTERBOG: IL CONFINE ======================= */
  confine: {
    luogo: 'Il confine della Sassonia',
    data: 'Strada per Jüterbog, primavera 1517',
    sfondo: 'img/bg/confine.webp',
    pavimento: 214,
    min: 30, max: 365,
    inizio: 40,
    buio: 0.4,
    luci: [
      [200, 60, 180, false],  // cielo
      [200, 190, 170, false], // la strada
    ],
    ingresso() {
      if (!flag('visto-confine')) {
        setFlag('visto-confine');
        return 'Il giorno dopo. Sono partita all\'alba con la gente del mercato, ma camminano più veloci di me. Ora sono sola sulla strada. Più avanti c\'è la sbarra del confine.';
      }
      return 'La strada per Jüterbog, al confine della ' + gl('Sassonia') + '.';
    },
    personaggi: [
      {
        id: 'hans', nome: 'Hans il carrettiere', img: 'img/chars/hans.webp',
        x: 180, verso: -1, alto: 1.17,
        parla() {
          if (!flag('hans-1')) {
            conversa([
              ['Hans il carrettiere', 'Ehi, ragazzina. Dove vai da sola, con quelle scarpe?'],
              ['Lena', 'A Jüterbog. La gente del mercato è andata avanti. Io sono rimasta indietro.'],
              ['Hans il carrettiere', 'Io sono Hans. Porto merci con questo carro da vent\'anni. Vado a Jüterbog anch\'io, a caricare birra.'],
              ['Hans il carrettiere', 'Il cavallo beve al fosso, poi ripartiamo. Ti porto, se mi fai un favore.'],
              ['Hans il carrettiere', 'Questo foglio me l\'ha dato il mercante. Ho lasciato gli occhiali a casa. Leggimelo.'],
              ['Lena', '<em>Hans tiene il foglio al contrario. Non sa leggere, ma non lo vuole dire.</em>'],
            ], () => { setFlag('hans-1'); leggiFoglioHans(); });
          } else if (!flag('passaggio')) {
            leggiFoglioHans();
          } else {
            dialogo('Hans il carrettiere', variante('hans-dopo', [
              'Sali sul carro. Jüterbog è oltre la sbarra.',
              'Il cavallo ha bevuto. Andiamo, prima che faccia buio.',
            ]));
          }
        },
      },
    ],
    oggetti: [
      {
        id: 'carro', nome: 'Il carro', zona: [60, 118, 90, 46], vaiA: 110,
        testo: [
          'Un carro a due ruote, vuoto. Le ruote sono piene di fango fino ai raggi.',
          'Sul fondo del carro c\'è un po\' di paglia, e una coperta arrotolata.',
        ],
      },
      {
        id: 'sbarra', nome: 'La sbarra', zona: [214, 128, 92, 26], vaiA: 260,
        testo: [
          'La sbarra del confine. Di qua c\'è la Sassonia del principe Federico. Di là, le terre dell\'arcivescovo Alberto.',
          'Qui i mercanti pagano il dazio sulle merci. I pellegrini passano senza pagare.',
        ],
      },
      {
        id: 'casotto', nome: 'Il casotto della guardia', zona: [314, 76, 64, 78], vaiA: 340,
        testo: [
          'Il casotto della guardia. La porta è aperta. Dentro, una guardia dorme seduta sullo sgabello.',
        ],
      },
      {
        id: 'corvi', nome: 'I corvi', zona: [140, 24, 150, 44], vaiA: 210,
        testo: [
          'Uno stormo di corvi gira sopra i campi. Mia madre diceva che portano notizie.',
        ],
      },
      {
        id: 'neve', nome: 'La neve', zona: [20, 158, 40, 20], vaiA: 45,
        testo: [
          'Ultime macchie di neve sporca. La primavera, quest\'anno, arriva tardi.',
        ],
      },
    ],
    uscite: [
      { id: 'wittenberg', etichetta: '⟵ Wittenberg', x: 8, y: 214, vaiA: 30, verso: 'chiesa', arrivo: 60 },
      {
        id: 'jueterbog', etichetta: 'Jüterbog ⟶', x: 300, y: 214, vaiA: 365, verso: 'jueterbog', arrivo: 40,
        aperta: () => flag('passaggio'),
        chiusa: [
          'Jüterbog è ancora lontana. A piedi arrivo a notte.',
          'Quel carrettiere va a Jüterbog. Forse mi porta.',
        ],
      },
    ],
  },

  /* ======================= JÜTERBOG: LA PIAZZA ======================= */
  jueterbog: {
    luogo: 'La piazza di Jüterbog',
    data: 'Jüterbog, primavera 1517',
    sfondo: 'img/bg/jueterbog.webp',
    pavimento: 214,
    min: 30, max: 365,
    inizio: 40,
    buio: 0.5,
    luci: [
      [200, 40, 160, false],  // cielo
      [150, 120, 90, false],  // il palco
      [220, 195, 160, false], // la piazza
    ],
    ingresso() {
      if (!flag('vista-jueterbog')) {
        setFlag('vista-jueterbog');
        return 'Jüterbog, dopo ore di carro. La piazza è piena di gente. Su un palco, accanto a una grande croce con lo stemma del papa, parla un frate ' + gl('domenicani', 'domenicano') + '.';
      }
      return 'La piazza di Jüterbog.';
    },
    personaggi: [
      {
        id: 'tetzel', nome: 'Frate Tetzel', img: 'img/chars/tetzel.webp',
        x: 160, verso: 1, alto: 0.95, piedi: 140,
        parla() {
          if (!flag('parole')) {
            conversa([
              ['Frate Tetzel', 'Sono Johann Tetzel, frate predicatore. Ascoltate! Non sentite le voci dei vostri genitori morti?'],
              ['Frate Tetzel', 'Gridano: «Abbiate pietà di noi! Siamo nelle pene del ' + gl('purgatorio') + '. Con una piccola offerta potete liberarci, e non volete farlo!»'],
              ['Frate Tetzel', 'Il Santo Padre apre per voi il tesoro della Chiesa. Chi è pentito e si confessa, con la sua offerta riceve il perdono della pena.'],
              ['Frate Tetzel', 'E per le anime dei vostri cari non serve nemmeno la confessione. Basta l\'offerta!'],
              ['Frate Tetzel', 'Appena la moneta tintinna nella cassa, l\'anima salta fuori dal purgatorio!'],
              ['Lena', '<em>Scrivo tutto nel taccuino, parola per parola. La mano mi trema.</em>'],
              ['Taccuino dello storico', 'Le parole del predicatore sono riassunte da un sermone attribuito a Tetzel (1517). Anche le istruzioni dell\'arcivescovo Alberto dicevano che, per le anime dei morti, non serviva la confessione.'],
              ['Taccuino dello storico', 'La frase della moneta circolava all\'epoca ed è attribuita a Tetzel. Non abbiamo un suo scritto che la contenga. Lutero la cita nella tesi 27, per criticarla.'],
            ], () => {
              setFlag('parole');
              fonte('predica');
              fonte('moneta');
              dialogo('Lena', 'Ho le parole esatte del predicatore. Ora mi serve una lettera d\'indulgenza.');
            });
          } else {
            dialogo('Frate Tetzel', variante('tetzel-dopo', [
              'Anche tu, ragazza! Pensa a chi hai perduto. Un\'offerta, e lo liberi.',
              'Dio vede chi dà con il cuore. E vede anche chi non dà.',
            ]));
          }
        },
      },
      {
        id: 'agnes-j', nome: 'Frau Agnes', img: 'img/chars/agnes.webp',
        x: 270, verso: -1, alto: 1.08,
        parla() {
          if (!flag('parole')) {
            dialogo('Frau Agnes', 'Lena! Sei venuta anche tu? Zitta, ascolta il frate. Poi faccio la mia offerta.');
          } else if (!flag('agnes-j')) {
            setFlag('agnes-j');
            conversa([
              ['Frau Agnes', 'Ho dato il mio fiorino, Lena. Per Jakob. L\'ho sentito cadere nella cassa.'],
              ['Frau Agnes', 'Il frate dice che ora Jakob è libero. Che è già in paradiso.'],
              ['Lena', 'Siete contenta, Frau Agnes?'],
              ['Frau Agnes', 'Dovrei. Mi sento più leggera. Ma ora non ho più niente, e la strada di casa è lunga.'],
            ]);
          } else {
            dialogo('Frau Agnes', variante('agnes-j-dopo', [
              'Torno a Wittenberg con gli altri. Prega per Jakob, se puoi.',
              'Il frate parla bene. Io non so le cose che sa lui.',
            ]));
          }
        },
      },
      {
        id: 'hans-j', nome: 'Hans il carrettiere', img: 'img/chars/hans.webp',
        x: 345, verso: -1, alto: 1.17,
        parla() {
          if (!flag('parole')) {
            dialogo('Hans il carrettiere', 'Vado a caricare la birra. Prima, però, voglio sentire questo frate.');
          } else if (!flag('lettera')) {
            conversa([
              ['Hans il carrettiere', 'Ho comprato anch\'io il foglio del frate. Per i miei peccati, che sono tanti. Ma è scritto in piccolo.'],
              ['Hans il carrettiere', 'Leggimelo tu, che leggi. E non ridere.'],
            ], () => {
              fonte('lettera');
              leggi('Lettera d\'indulgenza', LETTERA, () => {
                setFlag('lettera');
                disegnaPersonaggi();
                conversa([
                  ['Lena', 'È stampata! Solo il nome e il luogo sono scritti a mano. Chissà quante copie hanno stampato.'],
                  ['Lena', '<em>La copio nel taccuino, parola per parola. Hans aspetta in silenzio.</em>'],
                  ['Hans il carrettiere', 'Allora sono a posto. Con Dio e con il frate.'],
                  ['Lena', '<em>Alzo gli occhi. Tra la folla, un uomo alto con un mantello scuro mi guarda scrivere.</em>'],
                ]);
              });
            });
          } else {
            dialogo('Hans il carrettiere', 'La birra è sul carro. Torniamo a Wittenberg?', [
              { testo: 'Sì, torniamo a Wittenberg', fai: (e) => {
                e.stopPropagation();
                setFlag('ritorno');
                cambiaStanza('tipografia', 200);
              } },
              { testo: 'Non ancora', fai: (e) => {
                e.stopPropagation();
                dialogo('Hans il carrettiere', 'Va bene. Ma la birra non aspetta.');
              } },
            ]);
          }
        },
      },
      {
        id: 'cercatore', nome: 'L\'uomo con il mantello scuro', img: 'img/chars/cercatore.webp',
        x: 228, verso: -1, alto: 0.6, piedi: 165,
        se: () => flag('lettera') && !flag('cercatore-visto'),
        parla() {
          setFlag('cercatore-visto');
          dialogo('Lena', 'Faccio un passo verso di lui. La folla si muove. Quando guardo di nuovo, l\'uomo non c\'è più.', [
            { testo: 'Continua', fai: (e) => {
              e.stopPropagation();
              disegnaPersonaggi();
              dialogo('Lena', 'Ho le parole del predicatore e la copia della lettera. Hans mi riporta a Wittenberg con il carro.');
            } },
          ]);
        },
      },
    ],
    oggetti: [
      {
        id: 'stemma', nome: 'Lo stemma del papa', zona: [101, 52, 24, 34], vaiA: 110,
        testo: [
          'Lo stemma del papa, rosso: due chiavi incrociate e la tiara. Sono le chiavi di san Pietro.',
          'Lo stemma dice a tutti: questa grazia la manda il papa da Roma.',
        ],
      },
      {
        id: 'croce', nome: 'La croce', zona: [100, 12, 34, 36], vaiA: 115,
        testo: [
          'Una grande croce di legno, piantata accanto al palco. Più alta delle case.',
        ],
      },
      {
        id: 'cassa', nome: 'La cassa delle offerte', zona: [170, 132, 50, 28], vaiA: 195,
        testo: [
          'La cassa delle offerte, chiusa con bande di ferro. Ogni volta che una moneta cade dentro, si sente il suono.',
          'Accanto alla cassa c\'è un uomo che conta le monete e scrive su un registro. Non alza mai la testa.',
        ],
      },
      {
        id: 'folla', nome: 'La folla', zona: [186, 104, 30, 24], vaiA: 210,
        testo: [
          'Contadini, artigiani, vedove. Molti sono venuti da Wittenberg a piedi, come Frau Agnes.',
        ],
      },
      {
        id: 'chiesa-j', nome: 'La chiesa', zona: [262, 14, 70, 40], vaiA: 300,
        testo: [
          'La chiesa di Jüterbog. Le campane suonano ogni volta che il frate finisce di predicare.',
        ],
      },
    ],
    uscite: [
      { id: 'strada-da-jueterbog', etichetta: '⟵ Strada', x: 8, y: 214, vaiA: 30, verso: 'confine', arrivo: 340 },
    ],
  },
};

/* Domanda del Taccuino dopo il dialogo con Spalatino.
   Le risposte sbagliate spiegano l'errore e la domanda torna. */
function domandaDivieto() {
  const ripeti = { testo: 'Rispondi di nuovo', fai: (e) => { e.stopPropagation(); domandaDivieto(); } };
  const sbagliata = (spiegazione) => (e) => { e.stopPropagation(); dialogo('Taccuino dello storico', spiegazione, [ripeti]); };
  dialogo('Taccuino dello storico', 'Domanda: perché il principe Federico vieta a frate Tetzel di predicare in Sassonia?', [
    { testo: 'Perché Federico è protestante.', fai: sbagliata('No. Nel 1517 i protestanti non esistono ancora: la parola nasce nel 1529. Federico è cattolico e raccoglie reliquie. Crede nelle indulgenze.') },
    { testo: 'Perché i soldi delle offerte andrebbero fuori dalla Sassonia.', fai: (e) => {
      e.stopPropagation();
      setFlag('divieto');
      conversa([
        ['Taccuino dello storico', 'Giusto. I soldi delle indulgenze di Tetzel vanno all\'arcivescovo Alberto e a Roma, per la basilica di San Pietro. Federico non vuole che il denaro dei suoi sudditi esca dalla Sassonia.'],
        ['Taccuino dello storico', 'E Federico ha già le sue indulgenze: quelle delle reliquie di questa chiesa. Le offerte restano a Wittenberg.'],
        ['Spalatino', 'A Jüterbog ascolta e non parlare. E non dire a nessuno che ti manda un frate di Wittenberg.'],
      ], () => {
        dialogo('Lena', 'Le parole esatte del predicatore e una lettera d\'indulgenza. La strada per Jüterbog parte dalla porta vicino a questa chiesa.');
      });
    } },
    { testo: 'Perché frate Tetzel è un ladro.', fai: sbagliata('Attenzione alle parole. Tetzel predica con il permesso dell\'arcivescovo Alberto e del papa. Per le leggi del tempo non ruba niente. Il problema è un altro: dove vanno i soldi.') },
  ]);
}

/* Hans chiede a Lena di leggere il foglio, poi le fa una domanda.
   Le risposte sbagliate spiegano l'errore e Lena rilegge. */
function leggiFoglioHans() {
  leggi('Il foglio di Hans', FOGLIO_CONSEGNA, () => {
    const rileggi = { testo: 'Rileggi il foglio', fai: (e) => { e.stopPropagation(); leggiFoglioHans(); } };
    const sbagliata = (testo) => (e) => { e.stopPropagation(); dialogo('Hans il carrettiere', testo, [rileggi]); };
    dialogo('Hans il carrettiere', 'Allora? Quanti ' + gl('grosso', 'grossi') + ' mi deve dare l\'oste del Cervo?', [
      { testo: '4 grossi.', fai: sbagliata('Quattro? È quello che mi ha detto il mercante, a voce. Ma tu devi leggere il foglio, non ripetere le mie parole.') },
      { testo: '2 grossi.', fai: sbagliata('Due? Due sono le balle di lana. Io ti chiedo i soldi.') },
      { testo: '6 grossi.', fai: (e) => {
        e.stopPropagation();
        setFlag('passaggio');
        conversa([
          ['Hans il carrettiere', 'Sei! Quel furfante del mercante mi aveva detto quattro.'],
          ['Hans il carrettiere', 'Sali sul carro, ragazzina. E di quello che hai visto non dici niente a nessuno.'],
          ['Lena', 'Non dico niente. Tanta gente non sa leggere. Anche mio padre non sapeva.'],
          ['Hans il carrettiere', 'Hm. Sali, prima che cambi idea.'],
        ], () => dialogo('Lena', 'Hans mi porta a Jüterbog. La strada passa oltre la sbarra, a destra.'));
      } },
    ]);
  });
}

/* Al ritorno da Jüterbog: Grunenberg dà il lavoro della prima riga. */
function grunenbergRitorno() {
  if (flag('autunno')) { grunenbergAutunno(); return; }
  if (!flag('salmi')) {
    conversa([
      ['Mastro Grunenberg', 'Eccola. Due giorni a Jüterbog. Il dottor Martin mi ha detto tutto, e mi ha pagato il tuo tempo. Per una volta.'],
      ['Mastro Grunenberg', 'E ha portato lavoro. Un suo libretto sui sette salmi della penitenza. In tedesco, per chi non sa il latino.'],
      ['Lena', 'Un libro del dottor Martin? Stampato qui?'],
      ['Mastro Grunenberg', 'Qui. Componi tu la prima riga del salmo: «pietà di me». Sono undici pezzi di piombo, spazi compresi.'],
      ['Mastro Grunenberg', 'Le lettere nella cassa sono allo specchio. Guarda bene la «p» e la «d». Poi al ' + gl('torchio') + '.'],
    ], () => {
      setFlag('salmi');
      dialogo('Lena', 'La cassa dei caratteri è a sinistra. Prendo il ' + gl('compositoio') + '.');
    });
  } else if (!flag('riga')) {
    dialogo('Mastro Grunenberg', variante('gr-riga', [
      'La cassa è a sinistra. «Pietà di me». E guarda bene le lettere.',
      'Una riga sola, Lena. Non un libro intero.',
    ]));
  } else {
    dialogo('Mastro Grunenberg', variante('gr-dopo', [
      'Domani porti al dottor Martin quello che hai scritto a Jüterbog. Oggi si stampa.',
      'La carta costa. Il piombo costa. Ma una pagina stampata va più lontano di un uomo a cavallo.',
    ]));
  }
}

/* Il minigioco: comporre «pietà di me» e stamparlo. */
function minigiocoSalmi() {
  componiRiga({
    titolo: 'Comporre una riga',
    testo: 'pietà di me',
    cassa: ['p', 'q', 'i', 'e', 't', 'à', 'd', 'b', 'm', 'n'],
    poi: () => {
      setFlag('riga');
      fonte('salmi');
      conversa([
        ['Mastro Grunenberg', 'Fammi vedere. Diritta, pulita. Non male, per una che due giorni fa era a Jüterbog.'],
        ['Lena', 'Nel piombo era tutta al contrario, e io la leggevo a testa in giù. Sulla carta si legge diritta.'],
        ['Mastro Grunenberg', 'È il nostro mestiere. Un amanuense copia un libro in mesi. Noi in un giorno facciamo centinaia di fogli uguali.'],
        ['Taccuino dello storico', 'Nel 1517 la bottega di Johann Rhau-Grunenberg stampò a Wittenberg «I sette salmi penitenziali» di Lutero, con una spiegazione in tedesco. È il primo libro scritto da Lutero e stampato.'],
        ['Taccuino dello storico', 'Il salmo 51 comincia così: «Pietà di me, o Dio». Lutero scriveva in tedesco per chi non sapeva il latino.'],
      ], () => {
        dialogo('Lena', 'Ora porto al dottor Martin le prove di Jüterbog. Il Convento Nero è oltre il mercato.');
      });
    },
  });
}

/* ---------- La prova del capitolo: Lutero fa domande sulle prove di Jüterbog ---------- */
const DOMANDE_LUTERO = [
  {
    testo: 'Prima domanda. Che cos\'è un\'' + gl('indulgenza') + ', secondo la Chiesa?',
    risposte: [
      { testo: 'Il perdono di tutti i peccati, comprato con i soldi.',
        spiega: 'No. Per la Chiesa il perdono dei peccati viene da Dio, con il pentimento e la ' + gl('confessione') + '. L\'indulgenza toglie solo la pena che resta. Ma molta gente la capisce come te. Ed è questo che mi preoccupa.' },
      { testo: 'La pena tolta per i peccati già perdonati.', giusta: true,
        spiega: 'Giusto. Questo insegna la Chiesa. Ma a Jüterbog Tetzel parla come se bastasse pagare.' },
      { testo: 'Un permesso scritto per fare peccati in futuro.',
        spiega: 'No. Nessuna lettera dà il permesso di peccare. Questa è una leggenda, nata dopo. Attenta a separare i fatti dalle voci.' },
    ],
  },
  {
    testo: 'Seconda domanda. Dove vanno i soldi della cassa di Tetzel?',
    risposte: [
      { testo: 'Al principe Federico, per le reliquie della Chiesa del Castello.',
        spiega: 'No. Federico ha vietato Tetzel in ' + gl('Sassonia') + ' proprio perché quei soldi non vanno a lui. Ricordi quello che ti ha detto Spalatino?' },
      { testo: 'Tutti al papa, che li dà ai poveri e ai malati di Roma.',
        spiega: 'No. I soldi servono per la nuova basilica di San Pietro, non per i poveri. E non vanno tutti a Roma.' },
      { testo: 'Metà a San Pietro, metà all\'arcivescovo Alberto per un debito.', giusta: true,
        spiega: 'Giusto. Alberto voleva essere arcivescovo di Magdeburgo e di Magonza insieme. Per avere due cariche ha pagato al papa una grossa somma, prestata dai banchieri Fugger di Augusta. Con la sua metà delle indulgenze restituisce il prestito.' },
    ],
  },
  {
    testo: 'Terza domanda. Secondo Tetzel, che cosa serve per liberare un\'anima dal ' + gl('purgatorio') + '?',
    risposte: [
      { testo: 'Un lungo pellegrinaggio a piedi fino a Roma.',
        spiega: 'No. Quella è una strada più antica, e più lunga. Tetzel offre una strada veloce: la cassa.' },
      { testo: 'Pregare e pentirsi davvero per tutta la vita.',
        spiega: 'Questo è quello che penso io, Lena. Ma non è quello che hai scritto. Rileggi il tuo taccuino.' },
      { testo: 'Solo l\'offerta, anche senza confessione.', giusta: true,
        spiega: 'Sì. Le istruzioni dell\'arcivescovo lo dicono: per le anime dei morti basta l\'offerta. Io non credo che la grazia di Dio si possa comprare.' },
    ],
  },
  {
    testo: 'Ultima domanda. Perché la lettera di Hans era stampata, e non scritta a mano?',
    risposte: [
      { testo: 'Per venderne migliaia, tutte uguali.', giusta: true,
        spiega: 'Giusto. Migliaia di copie, e solo il nome da scrivere a mano. La stampa lavora anche per loro.' },
      { testo: 'Perché Hans non sa leggere la scrittura a mano.',
        spiega: 'No. Hans non sa leggere né la penna né la stampa. La stampa serve a fare tante copie in poco tempo.' },
      { testo: 'Perché il papa la stampa a Roma e la manda.',
        spiega: 'No. Il papa non scrive le lettere una per una. Si stampano qui in Germania, in molte copie.' },
    ],
  },
];

/* Domande una dopo l'altra. Risposta sbagliata: spiegazione e si riprova. */
function prova(chi, domande, poi) {
  let n = 0;
  const chiedi = () => {
    const d = domande[n];
    dialogo(chi, d.testo, d.risposte.map(r => ({ testo: r.testo, fai: (e) => {
      e.stopPropagation();
      if (!r.giusta) {
        dialogo(chi, r.spiega, [{ testo: 'Riprova', fai: (e2) => { e2.stopPropagation(); chiedi(); } }]);
        return;
      }
      n++;
      dialogo(chi, r.spiega, [{ testo: n < domande.length ? 'Continua ⟶' : 'Continua', fai: (e2) => {
        e2.stopPropagation();
        if (n < domande.length) chiedi(); else { $('scelte').innerHTML = ''; if (poi) poi(); }
      } }]);
    } })));
  };
  chiedi();
}

function luteroRitorno() {
  if (!flag('riga')) {
    dialogo('Il dottor Martin', 'Lena! Sei tornata. Grunenberg ti cerca per il mio libretto dei salmi. Prima aiuta lui, poi vieni da me con le tue carte.');
    return;
  }
  if (!flag('prova')) {
    conversa([
      ['Lena', 'Dottor Martin, sono tornata da Jüterbog. Ho scritto tutto, parola per parola.'],
      ['Il dottor Martin', 'Fammi vedere.'],
      ['Il dottor Martin', '«Appena la moneta tintinna nella cassa, l\'anima salta fuori dal purgatorio.» Ha detto proprio così?'],
      ['Lena', 'Così l\'ho sentito. E ha detto che per i morti non serve nemmeno la confessione.'],
      ['Il dottor Martin', 'E questa è la lettera. Stampata. Solo il nome scritto a mano.'],
      ['Il dottor Martin', 'Ora voglio sapere se hai capito quello che hai visto. Ti faccio quattro domande. Se sbagli, ti spiego.'],
    ], () => prova('Il dottor Martin', DOMANDE_LUTERO, () => {
      setFlag('prova');
      conversa([
        ['Il dottor Martin', 'Hai occhi buoni, Lena. E una mano svelta.'],
        ['Il dottor Martin', 'Se la stampa serve a vendere lettere d\'indulgenza, può servire anche a far pensare la gente.'],
        ['Il dottor Martin', 'Ora tocca a me. Non scriverò una predica. Scriverò delle tesi: domande per una disputa all\'università, in latino.'],
        ['Taccuino dello storico', 'Il 31 ottobre 1517 Lutero mandò all\'arcivescovo Alberto di Magonza una lettera e le sue 95 tesi sulle indulgenze.'],
      ], () => {
        dialogo('Lena', 'Il dottor Martin prende una penna nuova e non alza più la testa.', [SALTO_AUTUNNO]);
      });
    }));
    return;
  }
  if (!flag('autunno')) {
    dialogo('Il dottor Martin', 'Una tesi alla volta, Lena. Ogni parola deve reggere.', [SALTO_AUTUNNO]);
    return;
  }
  luteroAutunno();
}

/* Salto di tempo: dalla primavera al 31 ottobre 1517. */
const SALTO_AUTUNNO = { testo: 'Passano i mesi…', fai: (e) => {
  e.stopPropagation();
  setFlag('autunno');
  cambiaStanza('cella', 130);
} };

/* ======================= 31 OTTOBRE 1517 ======================= */

/* Quattro delle 95 tesi, tradotte dal latino. */
const TESI = `<div class="foglio">
  <p class="titolo-foglio">Disputa per chiarire il valore delle indulgenze</p>
  <p><em>Per amore della verità e per il desiderio di chiarirla, queste ${gl('tesi')} saranno discusse a Wittenberg. Presiede il reverendo padre Martin Lutero.</em></p>
  <p><strong>1.</strong> Il nostro Signore e Maestro Gesù Cristo, quando dice «Fate penitenza», vuole che tutta la vita dei fedeli sia una penitenza.</p>
  <p><strong>27.</strong> Predicano cose inventate dagli uomini quelli che dicono: appena la moneta tintinna nella cassa, l'anima vola via dal ${gl('purgatorio')}.</p>
  <p><strong>43.</strong> Bisogna insegnare ai cristiani che chi dà al povero o presta a chi ha bisogno fa meglio di chi compra ${gl('indulgenza', 'indulgenze')}.</p>
  <p><strong>86.</strong> E ancora: perché il papa, che oggi è più ricco dei più ricchi, non costruisce la basilica di San Pietro con i suoi soldi, invece che con quelli dei fedeli poveri?</p>
  <p class="nota-foglio">Quattro delle 95 tesi, tradotte dal latino. Titolo originale: «Disputatio pro declaratione virtutis indulgentiarum», 1517. La tesi 86 è una delle domande che, scrive Lutero, fa la gente semplice.</p>
</div>`;

function luteroAutunno() {
  if (!flag('tesi')) {
    conversa([
      ['Il dottor Martin', 'Lena. Eccole. Novantacinque ' + gl('tesi') + ', in latino. Domande per una ' + gl('disputa') + ' all\'università.'],
      ['Lena', 'Novantacinque? Tutte sulle indulgenze?'],
      ['Il dottor Martin', 'Tutte. Leggi queste quattro. Alcune le hai scritte tu, in un certo senso, a Jüterbog.'],
    ], () => {
      fonte('tesi');
      leggi('Le tesi del dottor Martin', TESI, () => {
        setFlag('tesi');
        conversa([
          ['Lena', 'La ventisettesima… è la frase della moneta. La frase che ho scritto nel taccuino.'],
          ['Il dottor Martin', 'Oggi mando le tesi all\'arcivescovo Alberto, con una lettera. È lui che ha mandato Tetzel. Deve sapere.'],
          ['Il dottor Martin', 'E le voglio discutere qui, con chi vuole. Domani è Ognissanti: alla Chiesa del Castello verrà mezza Sassonia per le reliquie.'],
          ['Il dottor Martin', 'Passa dalla chiesa. Poi porta questa copia a Grunenberg.'],
        ], () => {
          prendi('copia-tesi', 'una copia delle tesi');
          dialogo('Lena', 'Prima la Chiesa del Castello, poi la bottega. Dal mercato, la strada in fondo a destra.');
        });
      });
    });
    return;
  }
  dialogo('Il dottor Martin', variante('lutero-autunno', [
    'La lettera per l\'arcivescovo è partita stamattina. Ora aspettiamo.',
    'Una tesi non è una sentenza, Lena. È una domanda da discutere.',
  ]));
}

/* Alla porta della Chiesa del Castello: il racconto e la fonte. */
const DOMANDA_PORTA = [{
  testo: 'Domanda: possiamo essere sicuri che Lutero abbia affisso le tesi a questa porta?',
  risposte: [
    { testo: 'Sì: lo racconta Melantone, che era lì.',
      spiega: 'No. Melantone arrivò a Wittenberg solo nel 1518, un anno dopo. Non vide la scena.' },
    { testo: 'No: lo racconta solo Melantone, quasi trent\'anni dopo.', giusta: true,
      spiega: 'Giusto. Melantone lo scrisse nel 1546, dopo la morte di Lutero, e nel 1517 non era a Wittenberg. Per questo gli storici ne discutono. È certo, invece, che il 31 ottobre Lutero mandò le tesi all\'arcivescovo Alberto.' },
    { testo: 'No: è una storia inventata dai film.',
      spiega: 'No. Il racconto è antico: lo scrisse Melantone, un amico di Lutero, nel 1546. Il problema è che lo scrisse molto dopo, e non era presente.' },
  ],
}];

function scenaPorta() {
  conversa([
    ['Lena', '<em>Il portone della chiesa. Sul legno sono inchiodati avvisi dell\'università, vecchi e nuovi.</em>'],
    ['Taccuino dello storico', 'Secondo la tradizione, il 31 ottobre 1517 Lutero affisse qui le sue tesi. Gli storici ne discutono.'],
    ['Taccuino dello storico', 'Il portone era la bacheca dell\'università: chi voleva una disputa ci appendeva le sue tesi. Ma per quel giorno abbiamo un solo racconto.'],
  ], () => prova('Taccuino dello storico', DOMANDA_PORTA, () => {
    setFlag('porta');
    fonte('melantone');
    dialogo('Lena', 'Che le tesi siano state appese qui o no, domani tutti ne parleranno. Ora porto la copia a Mastro Grunenberg.');
  }));
}

function grunenbergAutunno() {
  if (!flag('tesi')) {
    dialogo('Mastro Grunenberg', 'Il dottor Martin ti ha fatto chiamare. Vai al convento, svelta.');
  } else if (!flag('porta')) {
    dialogo('Mastro Grunenberg', 'Il dottor Martin ha detto di passare prima dalla Chiesa del Castello. Vai, la carta aspetta.');
  } else if (!flag('lavoro-tesi')) {
    conversa([
      ['Lena', 'Mastro, il dottor Martin manda questa copia. Sono le sue tesi.'],
      ['Mastro Grunenberg', 'Latino, latino, latino. Fammi vedere.'],
      ['Mastro Grunenberg', 'Per una disputa servono copie per i professori e per gli studenti. Componi la prima tesi, comincia così: «fate penitenza».'],
    ], () => {
      setFlag('lavoro-tesi');
      lascia('copia-tesi');
      dialogo('Lena', 'Alla cassa dei caratteri. Attenta alla «p» e alla «q».');
    });
  } else if (!flag('tesi-composta')) {
    dialogo('Mastro Grunenberg', '«Fate penitenza». La cassa è a sinistra.');
  } else {
    dialogo('Mastro Grunenberg', variante('gr-inverno', [
      'Hai sentito? A Norimberga le hanno tradotte in tedesco. Ormai le leggono anche i calzolai.',
      'Mai visto un foglio correre così. E pensare che era solo latino per i professori.',
    ]));
  }
}

function minigiocoTesi() {
  componiRiga({
    titolo: 'Comporre una tesi',
    testo: 'fate penitenza',
    cassa: ['f', 'a', 't', 'e', 'p', 'q', 'n', 'u', 'i', 'z', 'd', 'b'],
    poi: () => {
      setFlag('tesi-composta');
      conversa([
        ['Mastro Grunenberg', 'Bene. Il resto lo compongo io stanotte.'],
        ['Taccuino dello storico', 'Attenzione: non sappiamo se a Wittenberg le tesi furono stampate nel 1517. Nessuna copia stampata qui è arrivata fino a noi.'],
        ['Taccuino dello storico', 'Sappiamo invece che alla fine del 1517 furono stampate a Lipsia, a Norimberga e a Basilea.'],
      ], () => mostraMappa(() => {
        setFlag('mappa');
        dialogo('Lena', 'Dicembre. Le tesi sono arrivate dappertutto. Devo leggerne una a Frau Agnes: la quarantatreesima. È al mercato.');
      }));
    },
  });
}

/* Il finale del capitolo: Lena legge la tesi 43 a Frau Agnes. */
function agnesFinale() {
  if (flag('finale')) {
    dialogo('Frau Agnes', variante('agnes-fine', [
      'La vicina sta meglio, sai? I bambini hanno mangiato tutto l\'inverno.',
      'Io continuo a pregare per Jakob. Questo nessuno me lo toglie.',
    ]));
    return;
  }
  conversa([
    ['Lena', 'Frau Agnes, il dottor Martin ha scritto delle tesi. Ce n\'è una che vorrei leggervi.'],
    ['Frau Agnes', 'A me? Io non so niente di latino, cara.'],
    ['Lena', 'Ve la dico in tedesco. Tesi quarantatré: <em>«Bisogna insegnare ai cristiani che chi dà al povero o presta a chi ha bisogno fa meglio di chi compra indulgenze.»</em>'],
    ['Frau Agnes', '…'],
    ['Frau Agnes', 'E Jakob? Il frate aveva detto che il mio fiorino lo liberava.'],
    ['Lena', 'Il dottor Martin dice che la misericordia di Dio non si compra. Altri frati dicono il contrario. Ora se ne discute in tutta la Germania.'],
    ['Frau Agnes', 'Io non so chi ha ragione. Ma la vicina ha tre bambini e la febbre in casa. E ha freddo adesso.'],
    ['Frau Agnes', 'Allora i soldi delle candele, quest\'inverno, li do a lei.'],
    ['Lena', '<em>Un foglio stampato arriva dove una persona non arriva. Il dottor Martin non conosce Frau Agnes. Ma le sue parole sì.</em>'],
    ['Taccuino dello storico', 'Agosto 1518. Al Convento Nero arriva una lettera con un sigillo rosso. Viene da Roma: il papa chiama Lutero a rispondere delle sue tesi.'],
  ], () => {
    setFlag('finale');
    dialogo('', '<em>Fine del capitolo 1. Il capitolo 2, la disputa di Lipsia, arriva presto.</em>');
  });
}
