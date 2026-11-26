/* ==========================================================================
   MINIGIOCO DELLA TIPOGRAFIA
   1. Comporre una riga: le lettere di piombo sono allo specchio. Nel compositoio
      si mettono da sinistra a destra, una dopo l'altra.
   2. Stampare: inchiostrare, posare il foglio, abbassare la leva.
   Lo stesso minigioco servirà più avanti per comporre una tesi.
   ========================================================================== */

// Lettere che allo specchio sembrano un'altra lettera.
const SPECCHIO = { p: 'q', q: 'p', b: 'd', d: 'b' };

const PASSI_TORCHIO = [
  { id: 'inchiostra', testo: 'Inchiostra le lettere con i mazzi' },
  { id: 'foglio', testo: 'Posa il foglio sulle lettere' },
  { id: 'leva', testo: 'Tira la leva del torchio' },
];

function apriMini(titolo) {
  $('mini-titolo').textContent = titolo;
  $('mini').hidden = false;
}
function chiudiMini() { $('mini').hidden = true; $('mini-corpo').innerHTML = ''; }

/* testo: la riga da comporre. cassa: le lettere nei cassetti (anche quelle sbagliate). */
function componiRiga({ titolo, testo, cassa, poi }) {
  apriMini(titolo);
  const corpo = $('mini-corpo');
  corpo.innerHTML = `
    <p class="mini-aiuto">Componi la riga del manoscritto. Nella cassa le lettere di piombo sono <strong>allo specchio</strong>: guardale bene.</p>
    <div class="mini-etichetta">Il manoscritto</div>
    <div id="mini-mano" class="mano"></div>
    <div class="mini-etichetta">Il compositoio: le lettere vanno da sinistra a destra, a testa in giù</div>
    <div id="mini-compositoio" class="compositoio" aria-live="polite"></div>
    <div id="mini-msg" class="mini-msg" aria-live="polite"></div>
    <div class="mini-etichetta">La cassa</div>
    <div id="mini-cassa" class="cassa"></div>`;
  const lettere = [...testo];
  let i = 0;
  const mano = $('mini-mano');
  const segni = lettere.map((c) => {
    const s = document.createElement('span');
    s.textContent = c === ' ' ? ' ' : c;
    mano.appendChild(s);
    return s;
  });
  const aggiorna = () => segni.forEach((s, k) => s.classList.toggle('ora', k === i));
  aggiorna();
  const msg = (t, cls) => { const m = $('mini-msg'); m.innerHTML = t; m.className = 'mini-msg ' + (cls || ''); };
  msg('Serve la lettera evidenziata nel manoscritto.');

  const grid = $('mini-cassa');
  for (const l of [...cassa, ' ']) {
    const b = document.createElement('button');
    b.className = 'cassetto' + (l === ' ' ? ' spazio' : '');
    b.dataset.lettera = l;
    b.setAttribute('aria-label', l === ' ' ? 'spazio' : `lettera ${l}`);
    b.innerHTML = l === ' ' ? '<span class="vuoto"></span><small>spazio</small>' : `<span class="specchio">${l}</span>`;
    b.addEventListener('click', () => {
      const serve = lettere[i];
      if (l === serve) {
        const p = document.createElement('span');
        p.className = 'piombo' + (l === ' ' ? ' spazio' : '');
        // Nel compositoio il pezzo sta capovolto: la lettera allo specchio, girata, appare a testa in giù.
        p.innerHTML = l === ' ' ? '' : `<span class="capovolta">${l}</span>`;
        $('mini-compositoio').appendChild(p);
        i++;
        aggiorna();
        if (i < lettere.length) { msg('Giusto. Avanti con la prossima.', 'bene'); return; }
        msg('La riga è composta. Ora al torchio.', 'bene');
        grid.querySelectorAll('button').forEach(x => { x.disabled = true; });
        const v = document.createElement('button');
        v.className = 'mini-avanti';
        v.textContent = 'Vai al torchio ⟶';
        v.addEventListener('click', () => stampaRiga({ titolo, testo, poi }));
        corpo.appendChild(v);
        v.focus();
      } else if (serve === ' ') {
        msg('Ora serve uno <strong>spazio</strong>: un pezzo di piombo più basso, che non stampa.', 'errore');
      } else if (l === ' ') {
        msg(`Lo spazio va tra le parole. Ora serve la «${serve}».`, 'errore');
      } else if (SPECCHIO[serve] === l) {
        msg(`Attenzione: questa è una «${l}». Nel piombo la «${serve}» è allo specchio, e sembra una «${l}».`, 'errore');
      } else {
        msg(`Questa è una «${l}». Ora serve la «${serve}».`, 'errore');
      }
    });
    grid.appendChild(b);
  }
}

function stampaRiga({ titolo, testo, poi }) {
  const corpo = $('mini-corpo');
  corpo.innerHTML = `
    <p class="mini-aiuto">La riga è chiusa nella forma, sotto il torchio. Fai i tre passi nell'ordine giusto.</p>
    <ol id="mini-passi" class="mini-passi"></ol>
    <div id="mini-msg" class="mini-msg" aria-live="polite"></div>
    <div id="mini-azioni" class="mini-azioni"></div>`;
  const msg = (t, cls) => { const m = $('mini-msg'); m.innerHTML = t; m.className = 'mini-msg ' + (cls || ''); };
  const spiegazioni = {
    inchiostra: 'Prima si inchiostra: il foglio, poi, coprirebbe le lettere.',
    foglio: 'Il foglio si posa sulle lettere già inchiostrate. Prima l\'inchiostro.',
    leva: 'Se tiri la leva ora, il torchio preme sul vuoto. Prima inchiostro e foglio.',
  };
  let fatti = 0;
  // Ordine dei pulsanti diverso dall'ordine giusto.
  for (const id of ['leva', 'inchiostra', 'foglio']) {
    const passo = PASSI_TORCHIO.find(p => p.id === id);
    const b = document.createElement('button');
    b.className = 'mini-azione';
    b.dataset.passo = id;
    b.textContent = passo.testo;
    b.addEventListener('click', () => {
      if (PASSI_TORCHIO[fatti].id !== id) {
        msg(fatti === 0 ? spiegazioni[id] : `No: ora bisogna «${PASSI_TORCHIO[fatti].testo.toLowerCase()}».`, 'errore');
        return;
      }
      const li = document.createElement('li');
      li.textContent = passo.testo;
      $('mini-passi').appendChild(li);
      b.disabled = true;
      fatti++;
      if (fatti < PASSI_TORCHIO.length) { msg('Giusto.', 'bene'); return; }
      // Il foglio stampato: la riga si legge diritta.
      $('mini-azioni').remove();
      msg('Il piano scende e preme. Si solleva il foglio…', 'bene');
      const f = document.createElement('div');
      f.className = 'foglio-stampato';
      f.innerHTML = `<span>${testo}</span>`;
      corpo.appendChild(f);
      const nota = document.createElement('p');
      nota.className = 'mini-aiuto';
      nota.innerHTML = 'Nella forma la riga è tutta allo specchio. Il torchio la gira: sulla carta si legge diritta.';
      corpo.appendChild(nota);
      const fine = document.createElement('button');
      fine.className = 'mini-avanti';
      fine.textContent = 'Fatto';
      fine.addEventListener('click', () => { chiudiMini(); if (poi) poi(); });
      corpo.appendChild(fine);
      fine.focus();
    });
    $('mini-azioni').appendChild(b);
  }
}
