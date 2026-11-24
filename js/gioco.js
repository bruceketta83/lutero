/* ==========================================================================
   MOTORE DI GIOCO — scena, buio, oggetti, camminata di Lena, dialoghi.
   ========================================================================== */
const SVGNS = 'http://www.w3.org/2000/svg';
const $ = (id) => document.getElementById(id);

/* Lena: tela comune 560 × 720 (vedi tools/camminata.py), figura alta 700. */
const LENA = {
  ferma: 'img/chars/lena.webp',
  pose: [1, 2, 3, 4, 5, 6, 7, 8].map(i => `img/chars/lena-cammina-${i}.webp`),
  w: 112, h: 144,          // grandezza nella scena
  piedi: 0.8,              // spazio tra i piedi e il bordo in basso della tela
  durataPosa: 240,         // millisecondi per posa
  sali: [0, -1.2, -1.6, -0.8, 0, -1.2, -1.6, -0.8], // su e giù del corpo nelle 8 pose
};
// Velocità legata al passo: un quarto di passo per posa, così i piedi non scivolano.
LENA.velocita = 16 / (LENA.durataPosa / 1000);   // unità della scena al secondo

const stato = { stanza: null, x: 0, verso: 1, cammina: null, visti: {} };

function el(tag, attrs = {}, parent) {
  const e = document.createElementNS(SVGNS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  if (parent) parent.appendChild(e);
  return e;
}

/* ---------- Dialogo ----------
   Il testo compare lettera per lettera, come se fosse stampato.
   Un tocco sul riquadro mostra subito tutto il testo. */
const STAMPA_MS = 22;   // millisecondi per lettera
let stampa = null;

function finisciStampa() {
  if (!stampa) return;
  clearTimeout(stampa.timer);
  for (const n of stampa.lettere) n.style.visibility = '';
  stampa = null;
}

function dialogo(chi, testo, scelte = []) {
  finisciStampa();
  $('chi').textContent = chi || '';
  const box = $('testo');
  box.innerHTML = testo;
  // Avvolge ogni lettera in uno <span class="l">, lasciando intatti <em>, <br>, ecc.
  const lettere = [];
  const walker = document.createTreeWalker(box, NodeFilter.SHOW_TEXT);
  const nodi = [];
  while (walker.nextNode()) nodi.push(walker.currentNode);
  for (const t of nodi) {
    const frag = document.createDocumentFragment();
    for (const ch of t.textContent) {
      const sp = document.createElement('span');
      sp.className = 'l';
      sp.textContent = ch;
      sp.style.visibility = 'hidden';
      frag.appendChild(sp);
      lettere.push(sp);
    }
    t.replaceWith(frag);
  }
  const ridotto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sc = $('scelte');
  sc.innerHTML = '';
  const mostraScelte = () => {
    for (const s of scelte) {
      const b = document.createElement('button');
      b.textContent = s.testo;
      b.addEventListener('click', s.fai);
      sc.appendChild(b);
    }
  };
  if (ridotto) { for (const n of lettere) n.style.visibility = ''; mostraScelte(); return; }
  let i = 0;
  stampa = { lettere, timer: 0 };
  const avanti = () => {
    if (!stampa) return;
    // Due lettere per volta: i testi lunghi non diventano lenti.
    for (let k = 0; k < 2 && i < lettere.length; k++) lettere[i++].style.visibility = '';
    if (i < lettere.length) stampa.timer = setTimeout(avanti, STAMPA_MS * 2);
    else { stampa = null; mostraScelte(); }
  };
  stampa.fine = mostraScelte;
  avanti();
}

/* Variante di un testo: alla prima volta la prima frase, poi le altre a turno. */
function variante(id, lista) {
  const n = stato.visti[id] || 0;
  stato.visti[id] = n + 1;
  return lista[n % lista.length];
}

/* ---------- Stanza ---------- */
function entra(idStanza, x) {
  const s = STANZE[idStanza];
  stato.stanza = s;
  $('luogo').textContent = s.luogo;
  $('data').textContent = s.data;
  $('sfondo').setAttribute('href', s.sfondo);

  const luci = $('luci');
  luci.innerHTML = '';
  for (const [cx, cy, r, tremola] of s.luci) {
    el('circle', { cx, cy, r, fill: 'url(#luce-grad)', class: tremola ? 'luce-tremola' : '' }, luci);
  }

  const ogg = $('oggetti');
  ogg.innerHTML = '';
  for (const o of s.oggetti) {
    const [x0, y0, w, h] = o.zona;
    const g = el('g', { class: 'oggetto', 'data-id': o.id, role: 'button', 'aria-label': o.nome }, ogg);
    el('rect', { class: 'alone', x: x0, y: y0, width: w, height: h, rx: 3 }, g);
    el('rect', { class: 'bordo', x: x0, y: y0, width: w, height: h, rx: 3 }, g);
    el('rect', { class: 'area', x: x0, y: y0, width: w, height: h }, g);
    g.addEventListener('click', (e) => { e.stopPropagation(); tocca(o, g); });
  }

  const usc = $('uscite');
  usc.innerHTML = '';
  for (const u of s.uscite) {
    const g = el('g', { class: 'uscita', 'data-id': u.id, role: 'button', 'aria-label': u.etichetta }, usc);
    const t = el('text', { x: u.x, y: u.y }, g);
    t.textContent = u.etichetta;
    el('rect', { class: 'area', x: u.x - 6, y: u.y - 16, width: 86, height: 22 }, g);
    g.addEventListener('click', (e) => { e.stopPropagation(); esci(u); });
  }

  stato.x = x ?? s.inizio;
  disegnaLena(LENA.ferma, 0);
  dialogo('Lena', 'La bottega è silenziosa. Mastro Grunenberg è uscito a cercare carta. <br>Tocca il pavimento per camminare, tocca le cose per guardarle.');
}

/* ---------- Lena ---------- */
function disegnaLena(href, sali) {
  const s = stato.stanza;
  const img = $('lena-img');
  if (img.getAttribute('href') !== href) img.setAttribute('href', href);
  const y = s.pavimento - LENA.h + LENA.piedi + sali;
  img.setAttribute('x', -LENA.w / 2);
  img.setAttribute('y', y);
  $('lena').setAttribute('transform', `translate(${stato.x} 0) scale(${stato.verso} 1)`);
}

function vai(xArrivo, poi) {
  const s = stato.stanza;
  xArrivo = Math.max(s.min, Math.min(s.max, xArrivo));
  if (stato.cammina) cancelAnimationFrame(stato.cammina.raf);
  const partenza = stato.x;
  const distanza = xArrivo - partenza;
  if (Math.abs(distanza) < 2) { disegnaLena(LENA.ferma, 0); if (poi) poi(); return; }
  stato.verso = distanza > 0 ? 1 : -1;
  const durata = Math.abs(distanza) / LENA.velocita * 1000;
  const t0 = performance.now();
  const passo = (t) => {
    // Il primo fotogramma può avere un tempo di poco precedente a t0: mai valori negativi.
    const dt = Math.max(0, t - t0);
    const k = Math.min(1, dt / durata);
    stato.x = partenza + distanza * k;
    if (k >= 1) {
      stato.cammina = null;
      disegnaLena(LENA.ferma, 0);
      if (poi) poi();
      return;
    }
    const i = Math.floor(dt / LENA.durataPosa) % LENA.pose.length;
    disegnaLena(LENA.pose[i], LENA.sali[i]);
    stato.cammina.raf = requestAnimationFrame(passo);
  };
  stato.cammina = { raf: requestAnimationFrame(passo) };
}

/* ---------- Interazioni ---------- */
function tocca(o, g) {
  g.classList.add('attivo');
  vai(o.vaiA, () => {
    stato.verso = (o.zona[0] + o.zona[2] / 2) >= stato.x ? 1 : -1;
    disegnaLena(LENA.ferma, 0);
    dialogo('Lena', variante(o.id, o.testo));
    setTimeout(() => g.classList.remove('attivo'), 900);
  });
}

function esci(u) {
  vai(u.vaiA, () => {
    if (u.verso) { entra(u.verso); return; }
    dialogo('Lena', variante('uscita-' + u.id, [
      'Il mercato può aspettare. Prima devo finire di sistemare la bottega.',
      'Mastro Grunenberg ha detto di non uscire finché non torna.',
    ]));
  });
}

function toccaScena(e) {
  const svg = $('scena');
  const p = svg.createSVGPoint();
  p.x = e.clientX; p.y = e.clientY;
  const q = p.matrixTransform(svg.getScreenCTM().inverse());
  vai(q.x);
}

function mostraOggetti() {
  const svg = $('scena');
  svg.classList.add('mostra');
  setTimeout(() => svg.classList.remove('mostra'), 2200);
}

/* Carica in anticipo le pose, così la prima camminata non lampeggia. */
function precarica() {
  for (const src of [LENA.ferma, ...LENA.pose]) { const i = new Image(); i.src = src; }
}

window.addEventListener('DOMContentLoaded', () => {
  precarica();
  $('scena').addEventListener('click', toccaScena);
  $('mostra-oggetti').addEventListener('click', mostraOggetti);
  $('dialogo').addEventListener('click', () => { if (stampa) { const f = stampa.fine; finisciStampa(); if (f) f(); } });
  entra('tipografia');
});
