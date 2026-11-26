/* ==========================================================================
   IL TACCUINO DELLO STORICO
   - Fonti: quelle trovate si rileggono, con le domande sulla fonte
     (chi l'ha scritta, quando, per chi, perché). Le altre restano coperte.
   - Linea del tempo: i fatti si aggiungono mentre la storia va avanti.
   Il premio del gioco è completare il Taccuino (vedi PROGETTO.md).
   ========================================================================== */

const PREDICA = `<div class="foglio">
  <p class="titolo-foglio">La predica di Tetzel</p>
  <p>«Non sentite le voci dei vostri genitori morti? Gridano: Abbiate pietà di noi! Siamo nelle pene del purgatorio. Con una piccola offerta potete liberarci, e non volete farlo!»</p>
  <p>«Il Santo Padre apre per voi il tesoro della Chiesa. Chi è pentito e si confessa, con la sua offerta riceve il perdono della pena.»</p>
  <p>«E per le anime dei vostri cari non serve nemmeno la confessione. Basta l'offerta!»</p>
  <p class="nota-foglio">Riassunto da un sermone attribuito a Tetzel (1517), come Lena lo ha scritto nel suo taccuino.</p>
</div>`;

const MONETA = `<div class="foglio">
  <p class="titolo-foglio">«Appena la moneta tintinna…»</p>
  <p>«Appena la moneta tintinna nella cassa, l'anima salta fuori dal purgatorio.»</p>
  <p>La frase circolava nel 1517 ed è attribuita a Tetzel. Non abbiamo un suo scritto che la contenga.</p>
  <p>Lutero la cita nella tesi 27, per criticarla. È un buon esempio di come una frase diventa famosa: fatto o leggenda?</p>
</div>`;

const SALMI = `<div class="foglio">
  <p class="titolo-foglio">I sette salmi penitenziali</p>
  <p>Il primo libro scritto da Lutero e stampato: i sette salmi della penitenza, con una spiegazione in tedesco.</p>
  <p>Il salmo 51 comincia così: «Pietà di me, o Dio».</p>
  <p class="nota-foglio">Stampato a Wittenberg nel 1517 nella bottega di Johann Rhau-Grunenberg.</p>
</div>`;

const MELANTONE = `<div class="foglio">
  <p class="titolo-foglio">Le tesi sulla porta</p>
  <p>Secondo la tradizione, il 31 ottobre 1517 Lutero affisse le sue tesi alla porta della Chiesa del Castello di Wittenberg.</p>
  <p>Il racconto viene da Filippo Melantone, amico di Lutero. Lo scrisse nel 1546, dopo la morte di Lutero. Melantone arrivò a Wittenberg solo nel 1518.</p>
  <p>È certo, invece, che il 31 ottobre 1517 Lutero mandò le tesi all'arcivescovo Alberto, con una lettera.</p>
</div>`;

/* Le fonti del capitolo 1. trovata(): se Lena l'ha già trovata. */
const FONTI = [
  { id: 'avviso', titolo: 'Avviso dell\'indulgenza', tipo: 'Fonte primaria, ricostruita per il gioco',
    chi: 'Gli uomini dell\'arcivescovo Alberto di Magonza', quando: '1517', perChi: 'Tutti i fedeli, anche chi non sa leggere',
    perche: 'Convincere la gente a dare un\'offerta per San Pietro', html: () => AVVISO },
  { id: 'libro-reliquie', titolo: 'Il libro delle reliquie di Wittenberg', tipo: 'Fonte primaria (pagina ricostruita)',
    chi: 'Il principe Federico; le figure sono di Lucas Cranach', quando: '1509', perChi: 'I pellegrini e i fedeli',
    perche: 'Mostrare le reliquie del principe e le indulgenze che danno', html: () => LIBRO_RELIQUIE },
  { id: 'predica', titolo: 'La predica di Tetzel', tipo: 'Fonte primaria: sermone attribuito, riassunto',
    chi: 'Johann Tetzel, frate domenicano (attribuito)', quando: 'Primavera 1517', perChi: 'La folla di Jüterbog',
    perche: 'Convincere la gente a comprare le indulgenze', html: () => PREDICA },
  { id: 'moneta', titolo: '«Appena la moneta tintinna…»', tipo: 'Frase attribuita',
    chi: 'Attribuita a Tetzel; Lutero la cita nella tesi 27', quando: '1517', perChi: 'Chi ascoltava le prediche',
    perche: 'Una frase facile da ricordare. Fatto o leggenda?', html: () => MONETA },
  { id: 'lettera', titolo: 'La lettera d\'indulgenza di Hans', tipo: 'Fonte primaria, ricostruita per il gioco',
    chi: 'Frate Tetzel, commissario per l\'indulgenza (lettera stampata)', quando: '1517', perChi: 'Chi pagava l\'offerta',
    perche: 'Dimostrare che quella persona aveva ricevuto la grazia', html: () => LETTERA },
  { id: 'salmi', titolo: 'I sette salmi penitenziali', tipo: 'Fonte primaria',
    chi: 'Martin Lutero; stampato da Rhau-Grunenberg', quando: '1517', perChi: 'Chi non sapeva il latino',
    perche: 'Spiegare i salmi della penitenza in tedesco', html: () => SALMI },
  { id: 'tesi', titolo: 'Le 95 tesi', tipo: 'Fonte primaria',
    chi: 'Martin Lutero', quando: '31 ottobre 1517', perChi: 'Professori e studenti; l\'arcivescovo Alberto',
    perche: 'Aprire una discussione pubblica sulle indulgenze', html: () => TESI },
  { id: 'melantone', titolo: 'Il racconto delle tesi sulla porta', tipo: 'Fonte primaria, ma scritta molto dopo',
    chi: 'Filippo Melantone, amico di Lutero', quando: '1546', perChi: 'I lettori delle opere di Lutero',
    perche: 'Ricordare Lutero dopo la sua morte', html: () => MELANTONE, trovata: () => flag('porta') },
];

/* La linea del tempo: [anno per l'ordine, data, fatto, si vede se…] */
const LINEA = [
  [1505, '2 luglio 1505', 'Durante una tempesta, Martin promette di diventare monaco.', () => flag('lutero-1')],
  [1509, '1509', 'A Wittenberg si stampa il libro delle reliquie del principe Federico.', () => trovata('libro-reliquie')],
  [1517.3, 'Primavera 1517', 'Frate Tetzel predica l\'indulgenza a Jüterbog, appena fuori dalla Sassonia.', () => flag('parole')],
  [1517.4, '1517', 'Grunenberg stampa «I sette salmi penitenziali» di Lutero.', () => flag('riga')],
  [1517.8, '31 ottobre 1517', 'Lutero manda le 95 tesi all\'arcivescovo Alberto, con una lettera.', () => flag('tesi')],
  [1517.9, 'Fine del 1517', 'Le tesi sono stampate a Lipsia, Norimberga e Basilea. A Norimberga escono in tedesco.', () => flag('mappa')],
  [1518.6, 'Agosto 1518', 'Una lettera da Roma chiama Lutero a rispondere delle sue tesi.', () => flag('finale')],
  [1546, '1546', 'Melantone racconta che le tesi furono affisse alla porta della Chiesa del Castello.', () => flag('porta')],
];

const trovata = (id) => {
  const f = FONTI.find(x => x.id === id);
  return stato.fonti.includes(id) || !!(f && f.trovata && f.trovata());
};

let schedaTaccuino = 'fonti';

function disegnaTaccuino() {
  const n = FONTI.filter(f => trovata(f.id)).length;
  const corpo = document.getElementById('taccuino-corpo');
  document.querySelectorAll('.tac-scheda').forEach(b => {
    const on = b.dataset.scheda === schedaTaccuino;
    b.classList.toggle('on', on);
    b.setAttribute('aria-selected', on);
  });
  if (schedaTaccuino === 'fonti') {
    corpo.innerHTML = `<p class="tac-conto">Fonti trovate: <strong>${n}</strong> di ${FONTI.length}</p>` + FONTI.map((f) => trovata(f.id)
      ? `<div class="tac-fonte" data-fonte="${f.id}">
          <div class="tac-titolo">${f.titolo}</div>
          <div class="tac-tipo">${f.tipo}</div>
          <dl class="tac-domande">
            <dt>Chi l'ha scritta?</dt><dd>${f.chi}</dd>
            <dt>Quando?</dt><dd>${f.quando}</dd>
            <dt>Per chi?</dt><dd>${f.perChi}</dd>
            <dt>Perché?</dt><dd>${f.perche}</dd>
          </dl>
          <button type="button" class="tac-rileggi" data-fonte="${f.id}">Rileggi</button>
        </div>`
      : `<div class="tac-fonte chiusa" data-fonte="${f.id}"><div class="tac-titolo">? ? ?</div><div class="tac-tipo">Fonte ancora da trovare</div></div>`).join('');
  } else {
    const fatti = [...LINEA].sort((a, b) => a[0] - b[0]);
    corpo.innerHTML = `<ol class="tac-linea">${fatti.map(([, data, fatto, si]) => si()
      ? `<li class="visto"><span class="tac-data">${data}</span><span>${fatto}</span></li>`
      : '<li class="chiuso"><span class="tac-data">? ? ?</span><span>Ancora da scoprire</span></li>').join('')}</ol>`;
  }
}

function apriTaccuino(e) {
  if (e) e.stopPropagation();
  disegnaTaccuino();
  document.getElementById('taccuino').hidden = false;
  document.getElementById('taccuino-corpo').scrollTop = 0;
  document.getElementById('taccuino-chiudi').focus({ preventScroll: true });
}

/* Avviso breve quando una fonte nuova entra nel Taccuino. */
function avvisoFonte(id) {
  const f = FONTI.find(x => x.id === id);
  if (!f) return;
  const a = document.getElementById('avviso-borsa');
  a.textContent = `Nuova fonte nel Taccuino: ${f.titolo}`;
  a.hidden = false;
  clearTimeout(avvisoFonte.t);
  avvisoFonte.t = setTimeout(() => { a.hidden = true; }, 2600);
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('apri-taccuino').addEventListener('click', apriTaccuino);
  document.getElementById('taccuino-chiudi').addEventListener('click', () => { document.getElementById('taccuino').hidden = true; });
  document.querySelectorAll('.tac-scheda').forEach(b => b.addEventListener('click', () => { schedaTaccuino = b.dataset.scheda; disegnaTaccuino(); document.getElementById('taccuino-corpo').scrollTop = 0; }));
  document.getElementById('taccuino-corpo').addEventListener('click', (e) => {
    const b = e.target.closest('.tac-rileggi');
    if (!b) return;
    const f = FONTI.find(x => x.id === b.dataset.fonte);
    leggi(f.titolo, f.html());
  });
});
