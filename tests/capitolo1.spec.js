// Capitolo 1, inizio: Grunenberg, la risma, il mercato, l'avviso e Frau Agnes.
const { test, expect } = require('@playwright/test');

function watch(page) {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('requestfailed', r => errors.push(`richiesta fallita: ${r.url()}`));
  return errors;
}

function aiuti(page) {
  const fermo = () => page.waitForFunction(() => !stato.cammina, null, { timeout: 15000 });
  // Tocca l'angolo del riquadro: al centro potrebbe esserci un pulsante.
  const tuttoIlTesto = async () => { await page.click('#dialogo', { position: { x: 4, y: 4 } }); await page.waitForTimeout(60); };
  const tocca = async (id) => { await page.click(`[data-id="${id}"] .area`, { force: true }); await fermo(); await tuttoIlTesto(); };
  // Va avanti con "Continua" finché la conversazione finisce.
  const continua = async () => {
    for (;;) {
      await tuttoIlTesto();
      const b = await page.$('#scelte button');
      if (!b) break;
      await b.click();
      await page.waitForTimeout(80);
    }
  };
  return { fermo, tuttoIlTesto, tocca, continua };
}

test('il percorso dalla tipografia a Lutero e Spalatino funziona senza errori', async ({ page }) => {
  test.setTimeout(240_000); // Lena attraversa sei stanze a passo d'uomo.
  const errors = watch(page);
  const { tocca, continua, tuttoIlTesto } = aiuti(page);
  await page.goto('./');
  await tuttoIlTesto();

  // Prima del compito non si esce e la carta non si tocca.
  await tocca('mercato');
  expect(await page.evaluate(() => stato.idStanza)).toBe('tipografia');
  await tocca('risme');
  expect(await page.evaluate(() => stato.borsa)).toEqual([]);

  // Grunenberg dà il compito.
  await tocca('grunenberg');
  await expect(page.locator('#chi')).toHaveText('Mastro Grunenberg');
  await continua();
  expect(await page.evaluate(() => flag('compito'))).toBe(true);

  // La risma va nella borsa.
  await tocca('risme');
  expect(await page.evaluate(() => stato.borsa)).toEqual(['risma']);
  await expect(page.locator('#avviso-borsa')).toBeVisible();

  // Al mercato.
  await tocca('mercato');
  await page.waitForFunction(() => stato.idStanza === 'mercato');
  await expect(page.locator('#luogo')).toHaveText('Piazza del mercato');
  await expect(page.locator('[data-id="agnes"]')).toHaveCount(1);

  // Agnes chiede di leggere l'avviso.
  await tocca('agnes');
  await expect(page.locator('#chi')).toHaveText('Frau Agnes');
  await continua();
  expect(await page.evaluate(() => flag('agnes-1'))).toBe(true);

  // L'avviso si legge e le parole del glossario si aprono.
  await page.click('[data-id="bacheca"] .area', { force: true });
  await page.waitForFunction(() => !stato.cammina);
  await expect(page.locator('#foglio-box')).toBeVisible();
  await expect(page.locator('#foglio-testo')).toContainText('Jüterbog');
  await expect(page.locator('#foglio-testo')).toContainText('ricostruito');
  await page.click('#foglio-testo a.gl[data-gl="purgatorio"]');
  await expect(page.locator('#glossario')).toBeVisible();
  await expect(page.locator('#glossario-parola')).toHaveText('Purgatorio');
  await page.click('#glossario-chiudi');
  await page.click('#foglio-chiudi');
  await expect(page.locator('#foglio-box')).toBeHidden();
  expect(await page.evaluate(() => stato.fonti)).toContain('avviso');

  // Agnes racconta del marito.
  await tocca('agnes');
  await continua();
  expect(await page.evaluate(() => flag('agnes-2'))).toBe(true);
  await expect(page.locator('#testo')).toContainText('fiorino');

  // Al Convento Nero: il portinaio indica la cella.
  await tocca('convento');
  await page.waitForFunction(() => stato.idStanza === 'cortile');
  await expect(page.locator('#luogo')).toHaveText('Convento Nero');
  await tocca('portinaio');
  await expect(page.locator('#chi')).toHaveText('Il frate portinaio');
  await continua();
  await expect(page.locator('#scelte button')).toHaveCount(0);

  // La porta della cella: si bussa ed entra.
  await page.click('[data-id="porta-cella"] .area', { force: true });
  await page.waitForFunction(() => stato.idStanza === 'cella', null, { timeout: 8000 });
  await expect(page.locator('[data-id="lutero"]')).toHaveCount(1);

  // Lutero prende la carta e dà la missione.
  await tocca('lutero');
  await expect(page.locator('#testo')).toContainText('Dottor Martin?');
  await continua();
  expect(await page.evaluate(() => flag('missione'))).toBe(true);
  expect(await page.evaluate(() => stato.borsa)).toEqual(['biglietto']);
  await expect(page.locator('#testo')).toContainText('Spalatino');

  // Si torna al mercato e si va alla Chiesa del Castello.
  await tocca('cortile-da-cella');
  await page.waitForFunction(() => stato.idStanza === 'cortile');
  await tocca('mercato-da-cortile');
  await page.waitForFunction(() => stato.idStanza === 'mercato');
  await tocca('chiesa');
  await page.waitForFunction(() => stato.idStanza === 'chiesa');
  await expect(page.locator('#luogo')).toHaveText('Chiesa del Castello');

  // Il portone porta alla sala delle reliquie.
  await page.click('[data-id="portone"] .area', { force: true });
  await page.waitForFunction(() => stato.idStanza === 'reliquie', null, { timeout: 8000 });

  // Il libro delle reliquie è una fonte.
  await page.click('[data-id="libro-reliquie"] .area', { force: true });
  await page.waitForFunction(() => !stato.cammina);
  await expect(page.locator('#foglio-testo')).toContainText('Cranach');
  await page.click('#foglio-chiudi');
  expect(await page.evaluate(() => stato.fonti)).toContain('libro-reliquie');

  // Spalatino racconta, poi la domanda del Taccuino.
  await tocca('spalatino');
  await expect(page.locator('#testo')).toContainText('biglietto');
  for (let i = 0; i < 30 && !(await page.locator('#scelte button', { hasText: 'protestante' }).count()); i++) {
    await tuttoIlTesto();
    await page.click('#scelte button');
    await page.waitForTimeout(80);
  }
  expect(await page.evaluate(() => stato.borsa)).toEqual([]);
  // Risposta sbagliata: spiegazione, poi la domanda torna.
  await page.click('#scelte button:has-text("protestante")');
  await tuttoIlTesto();
  await expect(page.locator('#testo')).toContainText('1529');
  await page.click('#scelte button:has-text("Rispondi di nuovo")');
  await tuttoIlTesto();
  // Risposta giusta.
  await page.click('#scelte button:has-text("fuori dalla Sassonia")');
  expect(await page.evaluate(() => flag('divieto'))).toBe(true);
  await continua();
  await expect(page.locator('#testo')).toContainText('Jüterbog');

  // Si torna indietro fino alla tipografia.
  await tocca('chiesa-da-reliquie');
  await page.waitForFunction(() => stato.idStanza === 'chiesa');
  await tocca('mercato-da-chiesa');
  await page.waitForFunction(() => stato.idStanza === 'mercato');
  await tocca('tipografia');
  await page.waitForFunction(() => stato.idStanza === 'tipografia');
  expect(errors).toEqual([]);
});

test('la chiesa si apre solo dopo la missione di Lutero', async ({ page }) => {
  const { tocca, tuttoIlTesto } = aiuti(page);
  await page.goto('./');
  await page.evaluate(() => { setFlag('risma'); setFlag('agnes-2'); entra('mercato'); });
  await tuttoIlTesto();
  await tocca('chiesa');
  expect(await page.evaluate(() => stato.idStanza)).toBe('mercato');
  await expect(page.locator('#testo')).toContainText('dottor Martin');
});

test('il convento si apre solo dopo aver aiutato Frau Agnes', async ({ page }) => {
  const { tocca, tuttoIlTesto } = aiuti(page);
  await page.goto('./');
  await page.evaluate(() => { setFlag('risma'); entra('mercato'); });
  await tuttoIlTesto();
  await tocca('convento');
  expect(await page.evaluate(() => stato.idStanza)).toBe('mercato');
  await expect(page.locator('#testo')).toContainText('Frau Agnes');
});

for (const stanza of ['mercato', 'cortile', 'cella', 'chiesa', 'reliquie', 'confine', 'jueterbog']) {
  test(`${stanza}: ogni cosa da toccare è libera e ha un testo`, async ({ page }) => {
    const { tuttoIlTesto, fermo } = aiuti(page);
    await page.goto('./');
    await page.evaluate((st) => { setFlag('risma'); setFlag('agnes-2'); setFlag('lettera'); entra(st); }, stanza);
    await tuttoIlTesto();
    const zone = await page.evaluate((st) => [
      ...STANZE[st].oggetti.map(o => o.id),
      ...(STANZE[st].personaggi || []).filter(p => !p.se || p.se()).map(p => p.id),
      ...STANZE[st].uscite.map(u => u.id),
    ], stanza);
    for (const id of zone) {
      const b = await page.locator(`[data-id="${id}"] .area`).boundingBox();
      const sopra = await page.evaluate(([x, y]) => document.elementFromPoint(x, y)?.closest('[data-id]')?.dataset.id, [b.x + b.width / 2, b.y + b.height / 2]);
      expect(sopra, `${stanza}/${id}`).toBe(id);
    }
    for (const id of await page.evaluate((st) => STANZE[st].oggetti.filter(o => o.testo).map(o => o.id), stanza)) {
      await page.click(`[data-id="${id}"] .area`, { force: true });
      await fermo();
      await tuttoIlTesto();
      expect((await page.textContent('#testo')).length, id).toBeGreaterThan(20);
    }
  });
}

test('in tipografia Grunenberg non copre le cose da toccare', async ({ page }) => {
  await page.goto('./');
  const zone = await page.evaluate(() => [...STANZE.tipografia.oggetti.map(o => o.id), 'grunenberg']);
  for (const id of zone) {
    const b = await page.locator(`[data-id="${id}"] .area`).boundingBox();
    const sopra = await page.evaluate(([x, y]) => document.elementFromPoint(x, y)?.closest('[data-id]')?.dataset.id, [b.x + b.width / 2, b.y + b.height / 2]);
    expect(sopra, id).toBe(id);
  }
});

test('il viaggio: Hans al confine, poi Tetzel e la lettera a Jüterbog', async ({ page }) => {
  test.setTimeout(150_000);
  const errors = watch(page);
  const { tocca, continua, tuttoIlTesto } = aiuti(page);
  await page.goto('./');
  await page.evaluate(() => { ['risma', 'agnes-2', 'missione', 'spalatino-1', 'divieto'].forEach(setFlag); entra('chiesa'); });
  await tuttoIlTesto();

  // Dalla chiesa alla strada per Jüterbog.
  await tocca('strada');
  await page.waitForFunction(() => stato.idStanza === 'confine');
  await expect(page.locator('#luogo')).toHaveText('Il confine della Sassonia');

  // Senza passaggio non si va avanti.
  await tocca('jueterbog');
  expect(await page.evaluate(() => stato.idStanza)).toBe('confine');

  // Hans chiede di leggere il foglio.
  await tocca('hans');
  await expect(page.locator('#chi')).toHaveText('Hans il carrettiere');
  for (let i = 0; i < 10 && await page.locator('#foglio-box').isHidden(); i++) {
    await tuttoIlTesto();
    await page.click('#scelte button');
    await page.waitForTimeout(80);
  }
  await expect(page.locator('#foglio-testo')).toContainText('6');
  await page.click('#foglio-chiudi');
  await tuttoIlTesto();
  // Risposta sbagliata, poi si rilegge.
  await page.click('#scelte button:has-text("4 grossi")');
  await tuttoIlTesto();
  await expect(page.locator('#testo')).toContainText('mercante');
  await page.click('#scelte button:has-text("Rileggi")');
  await page.click('#foglio-chiudi');
  await tuttoIlTesto();
  await page.click('#scelte button:has-text("6 grossi")');
  expect(await page.evaluate(() => flag('passaggio'))).toBe(true);
  await continua();

  // A Jüterbog.
  await tocca('jueterbog');
  await page.waitForFunction(() => stato.idStanza === 'jueterbog');
  await expect(page.locator('[data-id="cercatore"]')).toHaveCount(0);

  // La predica di Tetzel.
  await tocca('tetzel');
  await expect(page.locator('#chi')).toHaveText('Frate Tetzel');
  await continua();
  expect(await page.evaluate(() => flag('parole'))).toBe(true);
  expect(await page.evaluate(() => stato.fonti)).toEqual(expect.arrayContaining(['predica', 'moneta']));

  // Hans fa leggere la sua lettera d'indulgenza.
  await tocca('hans-j');
  for (let i = 0; i < 10 && await page.locator('#foglio-box').isHidden(); i++) {
    await tuttoIlTesto();
    await page.click('#scelte button');
    await page.waitForTimeout(80);
  }
  await expect(page.locator('#foglio-testo')).toContainText('San Pietro');
  await page.click('#foglio-chiudi');
  expect(await page.evaluate(() => flag('lettera'))).toBe(true);
  await continua();

  // L'uomo con il mantello scuro compare, poi sparisce.
  await expect(page.locator('[data-id="cercatore"]')).toHaveCount(1);
  await tocca('cercatore');
  await page.click('#scelte button');
  await expect(page.locator('[data-id="cercatore"]')).toHaveCount(0);
  await tuttoIlTesto();
  await expect(page.locator('#testo')).toContainText('Hans mi riporta');

  // Agnes ha dato il suo fiorino.
  await tocca('agnes-j');
  await continua();
  expect(await page.evaluate(() => flag('agnes-j'))).toBe(true);

  // Si torna alla strada.
  await tocca('strada-da-jueterbog');
  await page.waitForFunction(() => stato.idStanza === 'confine');
  expect(errors).toEqual([]);
});
