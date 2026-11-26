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
  sali: [0, 0, 0, 0, 0, 0, 0, 0], // il su e giù è già nelle pose (prese dal video)
};
// Velocità legata al passo: Lena avanza di 14 unità per posa, così i piedi non scivolano.
LENA.velocita = 14 / (LENA.durataPosa / 1000);   // unità della scena al secondo

const stato = { stanza: null, idStanza: null, x: 0, verso: 1, cammina: null, visti: {}, flag: {}, borsa: [], fonti: [] };

/* ---------- Salvataggio ----------
   Il gioco si salva da solo nel browser (localStorage) a ogni passo della storia.
   Se il browser non lo permette (finestra privata, dati bloccati), il gioco funziona lo stesso. */
const SALVA_KEY = 'lutero-salvataggio-v1';
function salva() {
  if (!stato.idStanza) return;
  try {
    localStorage.setItem(SALVA_KEY, JSON.stringify({
      stanza: stato.idStanza, x: Math.round(stato.x),
      flag: stato.flag, visti: stato.visti, borsa: stato.borsa, fonti: stato.fonti,
    }));
  } catch (e) { /* niente salvataggio: si gioca lo stesso */ }
}
function caricaSalvataggio() {
  try {
    const d = JSON.parse(localStorage.getItem(SALVA_KEY) || 'null');
    return d && STANZE[d.stanza] ? d : null;
  } catch (e) { return null; }
}
function cancellaSalvataggio() {
  try { localStorage.removeItem(SALVA_KEY); } catch (e) { /* niente */ }
}

/* ---------- Stato della storia ---------- */
const flag = (k) => !!stato.flag[k];
const setFlag = (k) => { stato.flag[k] = true; salva(); };

/* Mette un oggetto nella borsa e lo dice per un momento. */
function prendi(id, nome) {
  if (!stato.borsa.includes(id)) stato.borsa.push(id);
  salva();
  const a = $('avviso-borsa');
  a.textContent = `Nella borsa: ${nome}`;
  a.hidden = false;
  clearTimeout(prendi.t);
  prendi.t = setTimeout(() => { a.hidden = true; }, 2200);
}

/* Toglie un oggetto dalla borsa. */
function lascia(id) { stato.borsa = stato.borsa.filter(x => x !== id); salva(); }

/* Segna una fonte trovata (andrà nel Taccuino dello storico). */
function fonte(id) { if (!stato.fonti.includes(id)) stato.fonti.push(id); salva(); }

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

/* Conversazione a più battute: [chi, testo] una dopo l'altra, con "Continua". */
function conversa(battute, poi) {
  let i = 0;
  const mostra = () => {
    const [chi, testo] = battute[i];
    const ultima = i === battute.length - 1;
    dialogo(chi, testo, [{ testo: ultima ? 'Continua' : 'Continua ⟶', fai: (e) => { e.stopPropagation(); if (ultima) { $('scelte').innerHTML = ''; if (poi) poi(); } else { i++; mostra(); } } }]);
  };
  mostra();
}

/* Foglio da leggere a tutto schermo (avvisi, lettere, tesi). */
function leggi(titolo, html, poi) {
  $('foglio-titolo').textContent = titolo;
  $('foglio-testo').innerHTML = html;
  $('foglio-box').hidden = false;
  leggi.poi = poi;
  $('foglio-chiudi').focus();
}
function chiudiFoglio() {
  $('foglio-box').hidden = true;
  const poi = leggi.poi; leggi.poi = null;
  if (poi) poi();
}

/* Glossario: si apre toccando una parola sottolineata. */
function apriGlossario(parola) {
  $('glossario-parola').textContent = parola[0].toUpperCase() + parola.slice(1);
  $('glossario-testo').textContent = GLOSSARIO[parola] || '';
  $('glossario').hidden = false;
  $('glossario-chiudi').focus();
}

/* ---------- Stanza ---------- */
function entra(idStanza, x) {
  const s = STANZE[idStanza];
  stato.stanza = s;
  stato.idStanza = idStanza;
  $('luogo').textContent = s.luogo;
  $('data').textContent = s.data;
  $('sfondo').setAttribute('href', s.sfondo);
  $('buio').style.opacity = s.buio ?? 0.82;

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

  disegnaPersonaggi();

  const usc = $('uscite');
  usc.innerHTML = '';
  for (const u of s.uscite) {
    const g = el('g', { class: 'uscita', 'data-id': u.id, role: 'button', 'aria-label': u.etichetta }, usc);
    const t = el('text', { x: u.x, y: u.y }, g);
    t.textContent = u.etichetta;
    el('rect', { class: 'area', x: u.x - 6, y: u.y - 16, width: 96, height: 22 }, g);
    g.addEventListener('click', (e) => { e.stopPropagation(); esci(u); });
  }

  stato.x = x ?? s.inizio;
  stato.verso = stato.x > 200 ? -1 : 1;
  disegnaLena(LENA.ferma, 0);
  dialogo('Lena', s.ingresso ? s.ingresso() : '');
  salva();
}

/* All'apertura: se c'è un salvataggio, si può continuare o ricominciare da capo. */
function avvio() {
  const d = caricaSalvataggio();
  if (!d) { entra('tipografia'); return; }
  Object.assign(stato, { flag: d.flag || {}, visti: d.visti || {}, borsa: d.borsa || [], fonti: d.fonti || [] });
  entra(d.stanza, d.x);
  const continua = { testo: 'Continua la storia', fai: (e) => { e.stopPropagation(); dialogo('Lena', `${STANZE[d.stanza].luogo}. Riprendo da qui.`); } };
  const ricomincia = { testo: 'Ricomincia da capo', fai: (e) => {
    e.stopPropagation();
    dialogo('', 'Vuoi davvero ricominciare? La storia riparte dalla tipografia e perdi gli avanzamenti.', [
      { testo: 'Sì, ricomincia da capo', fai: (e2) => {
        e2.stopPropagation();
        cancellaSalvataggio();
        Object.assign(stato, { flag: {}, visti: {}, borsa: [], fonti: [] });
        entra('tipografia');
      } },
      { testo: 'No, continua la storia', fai: continua.fai },
    ]);
  } };
  dialogo('', `Bentornato. La storia riprende da: <em>${STANZE[d.stanza].luogo}</em>.`, [continua, ricomincia]);
}

/* Personaggi della stanza. Opzioni: se() = compare solo se vera;
   piedi = riga dei piedi diversa dal pavimento (per chi sta su un palco o lontano). */
function disegnaPersonaggi() {
  const s = stato.stanza;
  const pers = $('personaggi');
  pers.innerHTML = '';
  for (const p of s.personaggi || []) {
    if (p.se && !p.se()) continue;
    const k = p.alto || 1;
    const w = LENA.w * k, h = LENA.h * k;
    const base = p.piedi ?? s.pavimento;
    const g = el('g', { class: 'png', 'data-id': p.id, role: 'button', 'aria-label': p.nome }, pers);
    el('image', { href: p.img, x: p.x - w / 2, y: base - h + LENA.piedi * k, width: w, height: h,
      transform: p.verso < 0 ? `translate(${2 * p.x} 0) scale(-1 1)` : '' }, g);
    // Zona da toccare: il corpo, non tutta la tela.
    const zw = 40 * k, top = base - h * 0.97;
    el('rect', { class: 'alone', x: p.x - zw / 2, y: top, width: zw, height: base - top, rx: 4 }, g);
    el('rect', { class: 'area', x: p.x - zw / 2, y: top, width: zw, height: base - top }, g);
    g.addEventListener('click', (e) => { e.stopPropagation(); parlaCon(p, g); });
  }
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
    if (o.azione) o.azione(); else dialogo('Lena', variante(o.id, o.testo));
    setTimeout(() => g.classList.remove('attivo'), 900);
  });
}

/* Lena si avvicina al personaggio, si gira verso di lui e parla. */
function parlaCon(p, g) {
  g.classList.add('attivo');
  const lato = stato.x < p.x ? -1 : 1;
  const k = p.alto || 1;
  vai(p.piedi ? p.x + lato * 30 : p.x + lato * 34 * k, () => {
    stato.verso = p.x >= stato.x ? 1 : -1;
    disegnaLena(LENA.ferma, 0);
    p.parla();
    setTimeout(() => g.classList.remove('attivo'), 900);
  });
}

function esci(u) {
  vai(u.vaiA, () => {
    const aperta = u.verso && (!u.aperta || u.aperta());
    if (!aperta) { dialogo('Lena', variante('uscita-' + u.id, u.chiusa || ['Non posso andare di là, per ora.'])); return; }
    cambiaStanza(u.verso, u.arrivo);
  });
}

/* Passa a un'altra stanza con una breve dissolvenza al nero. */
function cambiaStanza(id, arrivo) {
  const box = $('scena-box');
  const ridotto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (ridotto) { entra(id, arrivo); return; }
  box.classList.add('buio');
  setTimeout(() => { entra(id, arrivo); box.classList.remove('buio'); }, 380);
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
  const altri = Object.values(STANZE).flatMap(s => [s.sfondo, ...(s.personaggi || []).map(p => p.img)]);
  for (const src of [LENA.ferma, ...LENA.pose, ...altri]) { const i = new Image(); i.src = src; }
}

window.addEventListener('DOMContentLoaded', () => {
  precarica();
  $('scena').addEventListener('click', toccaScena);
  $('mostra-oggetti').addEventListener('click', mostraOggetti);
  $('dialogo').addEventListener('click', () => { if (stampa) { const f = stampa.fine; finisciStampa(); if (f) f(); } });
  // Parole del glossario, nel dialogo e nei fogli da leggere.
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a.gl');
    if (!a) return;
    e.preventDefault(); e.stopPropagation();
    apriGlossario(a.dataset.gl);
  }, true);
  $('foglio-chiudi').addEventListener('click', chiudiFoglio);
  $('glossario-chiudi').addEventListener('click', () => { $('glossario').hidden = true; });
  // Salva anche il punto in cui si trova Lena quando si chiude o si nasconde la pagina.
  window.addEventListener('pagehide', salva);
  document.addEventListener('visibilitychange', () => { if (document.hidden) salva(); });
  avvio();
});
