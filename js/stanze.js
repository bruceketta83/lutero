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
        id: 'convento', etichetta: '⟵ Convento Nero', x: 8, y: 214, vaiA: 30, verso: null,
        chiusa: [
          'La strada per il Convento Nero passa di qua. (Il convento arriva nella prossima parte del gioco.)',
        ],
      },
    ],
  },
};
