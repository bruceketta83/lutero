/* ==========================================================================
   STANZE
   Coordinate nella scena: 400 × 224 (come l'immagine 16:9 dello sfondo).
   - pavimento: riga dei piedi; min/max: dove può camminare Lena.
   - luci: cerchi di luce nel buio [x, y, raggio, tremola?].
   - oggetti: zona da toccare [x, y, larghezza, altezza], punto dove Lena si ferma (vaiA), testo.
   I testi seguono DIALOGHI.md: tono serio, frasi brevi, niente parole moderne.
   ========================================================================== */
const STANZE = {
  tipografia: {
    luogo: 'Tipografia di Mastro Grunenberg',
    data: 'Wittenberg, primavera 1517',
    sfondo: 'img/bg/tipografia.webp',
    pavimento: 216,
    min: 40, max: 360,
    inizio: 250,
    luci: [
      [160, 95, 95, false],   // finestra
      [341, 128, 60, true],   // lampada a olio
      [210, 205, 150, false], // centro del pavimento
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
        id: 'torchio', nome: 'Il torchio', zona: [190, 40, 124, 140], vaiA: 250,
        testo: [
          'Il torchio. Si gira la leva, la vite scende, il piano preme il foglio sulle lettere. Un colpo, una pagina.',
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
        id: 'fogli', nome: 'Fogli ad asciugare', zona: [70, 8, 290, 52], vaiA: 220,
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
        id: 'risme', nome: 'Le risme di carta', zona: [364, 113, 34, 30], vaiA: 345,
        testo: [
          'Risme di carta di stracci, arrivate da lontano. La carta è la cosa più cara della bottega.',
        ],
      },
    ],
    uscite: [
      { id: 'mercato', etichetta: '⟵ Mercato', x: 8, y: 214, vaiA: 40, verso: null },
    ],
  },
};
