/* ==========================================================================
   OPZIONI DI LETTURA (dislessia, ipovisione, chi legge piano)
   Come in Espo-Nentia:
   - testo più grande, carattere moderno e leggibile, più spazio tra lettere e righe;
   - testo subito, senza l'effetto della stampa lettera per lettera;
   - lettura ad alta voce (sintesi vocale del dispositivo).
   Le opzioni sono salvate a parte: "Ricomincia da capo" non le cancella.
   ========================================================================== */
const LETTURA_KEY = 'lutero-lettura-v1';
const LETTURA_BASE = { grandezza: 0, carattere: 'stampa', spazio: false, subito: false, voce: false, auto: false, velocita: 1 };
const GRANDEZZE = [{ zoom: 1, nome: 'Normale' }, { zoom: 1.15, nome: 'Grande' }, { zoom: 1.3, nome: 'Molto grande' }];
const CARATTERI = [
  { id: 'stampa', nome: 'Stampa antica', css: '"Fell", Georgia, serif' },
  { id: 'leggibile', nome: 'Leggibile', css: '"Atkinson Hyperlegible", sans-serif' },
  { id: 'dislessia', nome: 'OpenDyslexic', css: '"OpenDyslexic", sans-serif' },
];

let lettura = null;
const _el = (id) => document.getElementById(id);

function opzioniLettura() {
  if (lettura) return lettura;
  lettura = { ...LETTURA_BASE };
  try { Object.assign(lettura, JSON.parse(localStorage.getItem(LETTURA_KEY)) || {}); } catch (e) { /* valori di base */ }
  return lettura;
}

function cambiaLettura(chiave, valore) {
  const o = opzioniLettura();
  o[chiave] = valore;
  if (chiave === 'voce' && !valore) { o.auto = false; fermaVoce(); }
  try { localStorage.setItem(LETTURA_KEY, JSON.stringify(o)); } catch (e) { /* solo per questa visita */ }
  applicaLettura();
  if (!_el('lettura').hidden) disegnaPannelloLettura();
}

function applicaLettura() {
  const o = opzioniLettura();
  const root = document.documentElement;
  root.style.setProperty('--zoom-lettura', (GRANDEZZE[o.grandezza] || GRANDEZZE[0]).zoom);
  root.classList.toggle('car-leggibile', o.carattere === 'leggibile');
  root.classList.toggle('car-dislessia', o.carattere === 'dislessia');
  root.classList.toggle('lettura-spazio', !!o.spazio);
  root.classList.toggle('lettura-voce', !!o.voce && voceDisponibile());
}

/* Usata dal motore: il testo compare tutto insieme? */
const letturaSubito = () => !!opzioniLettura().subito;

/* ---------- Lettura ad alta voce ---------- */
const voceDisponibile = () => typeof window.speechSynthesis !== 'undefined' && typeof window.SpeechSynthesisUtterance !== 'undefined';

function voceItaliana() {
  if (!voceDisponibile()) return null;
  const voci = speechSynthesis.getVoices();
  return voci.find(v => /^it[-_]IT/i.test(v.lang) && v.localService) || voci.find(v => /^it/i.test(v.lang)) || null;
}

/* Il testo da leggere: senza tag, frecce e simboli decorativi. */
function testoDaLeggere(html) {
  const box = document.createElement('div');
  box.innerHTML = html;
  box.querySelectorAll('br, p, div, li').forEach(b => b.insertAdjacentText('afterend', ' '));
  return box.textContent
    .replace(/[⟶⟵↑→←✓✗«»…]/g, ' ')
    .replace(/\p{Extended_Pictographic}|️/gu, ' ')
    .replace(/\s+([.,!?;:])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

let parla = false;
let testoDetto = '';

function fermaVoce() {
  if (voceDisponibile()) speechSynthesis.cancel();
  parla = false;
  aggiornaAscolta();
}

function dici(testo) {
  if (!voceDisponibile() || !testo) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(testo);
  u.lang = 'it-IT';
  const v = voceItaliana();
  if (v) u.voice = v;
  u.rate = opzioniLettura().velocita || 1;
  u.onend = u.onerror = () => { if (!speechSynthesis.speaking) { parla = false; aggiornaAscolta(); } };
  parla = true;
  testoDetto = testo;
  aggiornaAscolta();
  speechSynthesis.speak(u);
}

/* Cosa si legge ora: il foglio aperto, altrimenti chi parla e la sua frase. */
function testoCorrente() {
  if (!_el('foglio-box').hidden) return testoDaLeggere(`${_el('foglio-titolo').innerHTML}. ${_el('foglio-testo').innerHTML}`);
  if (!_el('glossario').hidden) return testoDaLeggere(`${_el('glossario-parola').innerHTML}. ${_el('glossario-testo').innerHTML}`);
  const chi = _el('chi').textContent;
  return testoDaLeggere(`${chi ? chi + '. ' : ''}${_el('testo').innerHTML}`);
}

function ascolta(e) {
  if (e) e.stopPropagation();
  const t = testoCorrente();
  // Ferma solo se sta già leggendo questo testo; un testo nuovo si legge subito.
  if (parla && t === testoDetto) { fermaVoce(); return; }
  dici(t);
}

function aggiornaAscolta() {
  document.querySelectorAll('.ascolta').forEach(b => {
    b.textContent = parla ? '⏹ Ferma' : '🔈 Ascolta';
    b.setAttribute('aria-pressed', parla ? 'true' : 'false');
  });
}

/* Chiamate dal motore quando cambia il testo. */
function letturaSuDialogo(chi, html) {
  const o = opzioniLettura();
  if (!o.voce) return;
  if (o.auto && html) dici(testoDaLeggere(`${chi ? chi + '. ' : ''}${html}`));
  else fermaVoce();
}
function letturaSuFoglio(titolo, html) {
  const o = opzioniLettura();
  if (o.voce && o.auto) dici(testoDaLeggere(`${titolo}. ${html}`));
}

/* ---------- Pannello "Lettura" ---------- */
function riga(titolo, nota, pulsanti) {
  return `<div class="let-riga"><div class="let-titolo">${titolo}</div>${nota ? `<div class="let-nota">${nota}</div>` : ''}<div class="let-scelte">${pulsanti}</div></div>`;
}
function pulsante(acceso, testo, chiave, valore, stile = '', disattivo = false) {
  return `<button type="button" class="let-opz${acceso ? ' on' : ''}" aria-pressed="${acceso}" data-chiave="${chiave}" data-valore='${JSON.stringify(valore)}' ${stile ? `style='${stile}'` : ''} ${disattivo ? 'disabled' : ''}>${testo}</button>`;
}
const siNo = (chiave, valore, disattivo) => pulsante(!valore, 'No', chiave, false) + pulsante(valore, 'Sì', chiave, true, '', disattivo);

function disegnaPannelloLettura() {
  const o = opzioniLettura();
  const ok = voceDisponibile();
  const it = voceItaliana();
  const notaVoce = !ok ? 'Questo browser non sa leggere ad alta voce.'
    : (it ? `Voce: ${it.name}.` : 'Se non senti niente, installa la voce italiana nelle impostazioni del telefono.');
  _el('lettura-corpo').innerHTML = `
    <div class="let-prova">Prova: Mastro Grunenberg conta le risme di carta e borbotta.</div>
    ${riga('Grandezza del testo', '', GRANDEZZE.map((g, i) => pulsante(o.grandezza === i, g.nome, 'grandezza', i, `font-size:${Math.round(16 * g.zoom)}px`)).join(''))}
    ${riga('Carattere', 'Leggibile e OpenDyslexic aiutano chi ha la dislessia a non confondere le lettere.',
      CARATTERI.map(c => pulsante(o.carattere === c.id, c.nome, 'carattere', c.id, `font-family:${c.css}`)).join(''))}
    ${riga('Più spazio tra lettere e righe', '', siNo('spazio', o.spazio))}
    ${riga('Testo subito', 'Il testo compare tutto insieme, senza l\'effetto della stampa lettera per lettera.', siNo('subito', o.subito))}
    ${riga('Lettura ad alta voce', `Mostra il pulsante «Ascolta» nei dialoghi e nei fogli. ${notaVoce}`, siNo('voce', o.voce, !ok))}
    ${o.voce && ok ? riga('Leggi ogni frase da sola', '', siNo('auto', o.auto)) +
      riga('Velocità della voce', '', [[0.8, 'Lenta'], [1, 'Normale']].map(([v, n]) => pulsante(o.velocita === v, n, 'velocita', v)).join('')) : ''}`;
}

function apriLettura(e) {
  if (e) e.stopPropagation();
  disegnaPannelloLettura();
  _el('lettura').hidden = false;
  _el('lettura-carta').scrollTop = 0;
  _el('lettura-chiudi').focus({ preventScroll: true });
}

document.addEventListener('DOMContentLoaded', () => {
  applicaLettura();
  _el('apri-lettura').addEventListener('click', apriLettura);
  _el('lettura-chiudi').addEventListener('click', () => { _el('lettura').hidden = true; });
  _el('lettura-corpo').addEventListener('click', (e) => {
    const b = e.target.closest('.let-opz');
    if (b && !b.disabled) cambiaLettura(b.dataset.chiave, JSON.parse(b.dataset.valore));
  });
  document.querySelectorAll('.ascolta').forEach(b => b.addEventListener('click', ascolta));
  // Le voci del telefono arrivano dopo il caricamento della pagina.
  if (voceDisponibile() && speechSynthesis.addEventListener) speechSynthesis.addEventListener('voiceschanged', () => voceItaliana());
});
