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
  const tuttoIlTesto = async () => { await page.click('#dialogo'); await page.waitForTimeout(60); };
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

test('il percorso dalla tipografia ad Agnes funziona senza errori', async ({ page }) => {
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

  // Si torna in tipografia.
  await tocca('tipografia');
  await page.waitForFunction(() => stato.idStanza === 'tipografia');
  expect(errors).toEqual([]);
});

test('nel mercato ogni cosa da toccare è libera e ha un testo', async ({ page }) => {
  const { tuttoIlTesto, fermo } = aiuti(page);
  await page.goto('./');
  await page.evaluate(() => { setFlag('risma'); entra('mercato'); });
  await tuttoIlTesto();
  const zone = await page.evaluate(() => [
    ...STANZE.mercato.oggetti.map(o => o.id),
    ...STANZE.mercato.personaggi.map(p => p.id),
  ]);
  for (const id of zone) {
    const b = await page.locator(`[data-id="${id}"] .area`).boundingBox();
    const sopra = await page.evaluate(([x, y]) => document.elementFromPoint(x, y)?.closest('[data-id]')?.dataset.id, [b.x + b.width / 2, b.y + b.height / 2]);
    expect(sopra, id).toBe(id);
  }
  for (const id of await page.evaluate(() => STANZE.mercato.oggetti.filter(o => o.testo).map(o => o.id))) {
    await page.click(`[data-id="${id}"] .area`, { force: true });
    await fermo();
    await tuttoIlTesto();
    expect((await page.textContent('#testo')).length, id).toBeGreaterThan(20);
  }
});

test('in tipografia Grunenberg non copre le cose da toccare', async ({ page }) => {
  await page.goto('./');
  const zone = await page.evaluate(() => [...STANZE.tipografia.oggetti.map(o => o.id), 'grunenberg']);
  for (const id of zone) {
    const b = await page.locator(`[data-id="${id}"] .area`).boundingBox();
    const sopra = await page.evaluate(([x, y]) => document.elementFromPoint(x, y)?.closest('[data-id]')?.dataset.id, [b.x + b.width / 2, b.y + b.height / 2]);
    expect(sopra, id).toBe(id);
  }
});
