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

const STANZE = {
  /* ======================= TIPOGRAFIA ======================= */
  tipografia: {
    luogo: 'Tipografia di Mastro Grunenberg',
    data: 'Wittenberg, primavera 1517',
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
    data: 'Wittenberg, primavera 1517',
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
    data: 'Wittenberg, primavera 1517',
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
    data: 'Wittenberg, primavera 1517',
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
              dialogo('Lena', 'Le parole esatte del predicatore e una lettera d\'indulgenza. Ma prima il biglietto per Spalatino, alla Chiesa del Castello.');
            });
          } else {
            if (!flag('spalatino-1')) {
              dialogo('Il dottor Martin', 'Prima il biglietto a Spalatino. La Chiesa del Castello è in fondo alla strada grande, dopo il mercato.');
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
    data: 'Wittenberg, primavera 1517',
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
        testo: [
          'Foglie secche dell\'anno passato. Nessuno le ha ancora spazzate via.',
        ],
      },
    ],
    uscite: [
      { id: 'mercato-da-chiesa', etichetta: '⟵ Mercato', x: 8, y: 214, vaiA: 30, verso: 'mercato', arrivo: 290 },
    ],
  },

  /* ======================= CHIESA DEL CASTELLO: LA SALA DELLE RELIQUIE ======================= */
  reliquie: {
    luogo: 'La sala delle reliquie',
    data: 'Wittenberg, primavera 1517',
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
        dialogo('Lena', 'Le parole esatte del predicatore e una lettera d\'indulgenza. Domani all\'alba parto con la gente del mercato.<br><br><em>Qui finisce la parte del capitolo 1 che si può giocare. Il viaggio a Jüterbog arriva presto.</em>');
      });
    } },
    { testo: 'Perché frate Tetzel è un ladro.', fai: sbagliata('Attenzione alle parole. Tetzel predica con il permesso dell\'arcivescovo Alberto e del papa. Per le leggi del tempo non ruba niente. Il problema è un altro: dove vanno i soldi.') },
  ]);
}
