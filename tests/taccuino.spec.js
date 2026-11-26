// Il Taccuino dello storico: fonti trovate e linea del tempo.
const { test, expect } = require('@playwright/test');

test('all\'inizio il Taccuino è vuoto: fonti coperte e fatti da scoprire', async ({ page }) => {
  await page.goto('./');
  await page.click('#apri-taccuino');
  await expect(page.locator('#taccuino')).toBeVisible();
  await expect(page.locator('.tac-conto')).toContainText('0 di 8');
  await expect(page.locator('.tac-fonte.chiusa')).toHaveCount(8);
  await page.click('.tac-scheda[data-scheda="linea"]');
  await expect(page.locator('.tac-linea li.chiuso')).toHaveCount(8);
  await page.click('#taccuino-chiudi');
  await expect(page.locator('#taccuino')).toBeHidden();
});

test('una fonte trovata si legge nel Taccuino e si rilegge', async ({ page }) => {
  await page.goto('./');
  // Leggere l'avviso al mercato mette la fonte nel Taccuino, con un avviso.
  await page.evaluate(() => { setFlag('risma'); entra('mercato'); });
  await page.click('[data-id="bacheca"] .area', { force: true });
  await page.waitForFunction(() => !stato.cammina);
  await expect(page.locator('#avviso-borsa')).toContainText('Nuova fonte nel Taccuino');
  await page.click('#foglio-chiudi');

  await page.click('#apri-taccuino');
  await expect(page.locator('.tac-conto')).toContainText('1 di 8');
  const avviso = page.locator('.tac-fonte[data-fonte="avviso"]');
  await expect(avviso).not.toHaveClass(/chiusa/);
  await expect(avviso).toContainText('Chi l\'ha scritta?');
  await expect(avviso).toContainText('arcivescovo Alberto');

  // «Rileggi» apre il foglio sopra il Taccuino.
  await avviso.locator('.tac-rileggi').click();
  await expect(page.locator('#foglio-box')).toBeVisible();
  await expect(page.locator('#foglio-testo')).toContainText('Jüterbog');
  const sopra = await page.evaluate(() => document.elementFromPoint(innerWidth / 2, innerHeight / 2).closest('#foglio-box, #taccuino')?.id);
  expect(sopra).toBe('foglio-box');
  await page.click('#foglio-chiudi');
  await expect(page.locator('#taccuino')).toBeVisible();
});

test('a fine capitolo il Taccuino è completo, e la linea del tempo è in ordine', async ({ page }) => {
  await page.goto('./');
  await page.evaluate(() => {
    ['lutero-1', 'parole', 'riga', 'tesi', 'mappa', 'finale', 'porta'].forEach(setFlag);
    ['avviso', 'libro-reliquie', 'predica', 'moneta', 'lettera', 'salmi', 'tesi'].forEach(fonte);
  });
  await page.click('#apri-taccuino');
  await expect(page.locator('.tac-conto')).toContainText('8 di 8');
  // Il Taccuino si apre dall'alto, non dal pulsante «Chiudi».
  expect(await page.evaluate(() => document.getElementById('taccuino-corpo').scrollTop)).toBe(0);
  await expect(page.locator('.tac-fonte.chiusa')).toHaveCount(0);
  // Ogni fonte trovata si apre.
  for (const id of await page.evaluate(() => FONTI.map(f => f.id))) {
    await page.click(`.tac-rileggi[data-fonte="${id}"]`);
    await expect(page.locator('#foglio-box')).toBeVisible();
    expect((await page.textContent('#foglio-testo')).length, id).toBeGreaterThan(60);
    await page.click('#foglio-chiudi');
  }
  await page.click('.tac-scheda[data-scheda="linea"]');
  await expect(page.locator('.tac-linea li.visto')).toHaveCount(8);
  const date = await page.locator('.tac-data').allTextContents();
  expect(date[0]).toBe('2 luglio 1505');
  expect(date.at(-1)).toBe('1546');
});

test('il salvataggio ricorda le fonti del Taccuino', async ({ page }) => {
  await page.goto('./');
  await page.evaluate(() => { fonte('avviso'); entra('mercato'); });
  await page.reload();
  await page.click('#scelte button:has-text("Continua la storia")');
  await page.click('#apri-taccuino');
  await expect(page.locator('.tac-conto')).toContainText('1 di 8');
});

test('sul telefono scorre solo la parte centrale: schede e «Chiudi» restano fissi', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 664 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto('./');
  await page.evaluate(() => {
    ['lutero-1', 'parole', 'riga', 'tesi', 'mappa', 'finale', 'porta'].forEach(setFlag);
    ['avviso', 'libro-reliquie', 'predica', 'moneta', 'lettera', 'salmi', 'tesi'].forEach(fonte);
  });
  await page.click('#apri-taccuino');
  for (const scheda of ['fonti', 'linea']) {
    await page.click(`.tac-scheda[data-scheda="${scheda}"]`);
    const corpo = page.locator('#taccuino-corpo');
    // Il contenuto è più lungo dello spazio: si scorre dentro il corpo.
    expect(await corpo.evaluate(e => e.scrollHeight > e.clientHeight), scheda).toBe(true);
    await corpo.evaluate(e => { e.scrollTop = e.scrollHeight; });
    // Schede e «Chiudi» restano dentro lo schermo e si possono toccare.
    for (const sel of ['.tac-scheda[data-scheda="fonti"]', '#taccuino-chiudi']) {
      const b = await page.locator(sel).boundingBox();
      expect(b.y, sel).toBeGreaterThanOrEqual(0);
      expect(b.y + b.height, sel).toBeLessThanOrEqual(664);
      const sopra = await page.evaluate(([x, y]) => document.elementFromPoint(x, y)?.closest('button')?.id || document.elementFromPoint(x, y)?.closest('button')?.dataset.scheda, [b.x + b.width / 2, b.y + b.height / 2]);
      expect(sopra, sel).toBeTruthy();
    }
    expect(await page.evaluate(() => document.getElementById('taccuino-carta').scrollTop)).toBe(0);
  }
  await page.click('#taccuino-chiudi');
  await expect(page.locator('#taccuino')).toBeHidden();
  await ctx.close();
});
