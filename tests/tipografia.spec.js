// Prima stanza: la tipografia con Lena che cammina.
const { test, expect } = require('@playwright/test');

function watch(page) {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('requestfailed', r => errors.push(`richiesta fallita: ${r.url()}`));
  page.on('request', r => { if (!r.url().startsWith('http://localhost:4176/') && !r.url().startsWith('data:')) errors.push(`file esterno: ${r.url()}`); });
  return errors;
}

test('la tipografia si apre con sfondo, Lena e testo, senza errori', async ({ page }) => {
  const errors = watch(page);
  await page.goto('./');
  await expect(page.locator('#luogo')).toHaveText('Tipografia di Mastro Grunenberg');
  await expect(page.locator('#sfondo')).toHaveAttribute('href', 'img/bg/tipografia.webp');
  await expect(page.locator('#lena-img')).toHaveAttribute('href', 'img/chars/lena.webp');
  await expect(page.locator('#testo')).toContainText('Tocca il pavimento');
  // Tutte le immagini di Lena esistono.
  for (const src of await page.evaluate(() => [LENA.ferma, ...LENA.pose])) {
    expect((await page.request.get(src)).ok(), src).toBe(true);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
  expect(errors).toEqual([]);
});

test('toccando il pavimento Lena cammina con le pose e poi si ferma', async ({ page }) => {
  const errors = watch(page);
  await page.goto('./');
  const box = await page.locator('#scena').boundingBox();
  await page.mouse.click(box.x + box.width * 0.15, box.y + box.height * 0.9);
  const viste = new Set();
  for (let i = 0; i < 12; i++) {
    await page.waitForTimeout(130);
    viste.add(await page.getAttribute('#lena-img', 'href'));
  }
  expect([...viste].filter(h => h.includes('cammina')).length).toBeGreaterThanOrEqual(4);
  // Va verso sinistra: è girata.
  await expect(page.locator('#lena')).toHaveAttribute('transform', /scale\(-1 1\)/);
  await page.waitForFunction(() => !stato.cammina, null, { timeout: 15000 });
  await expect(page.locator('#lena-img')).toHaveAttribute('href', 'img/chars/lena.webp');
  expect(await page.evaluate(() => stato.x)).toBeLessThan(80);
  expect(errors).toEqual([]);
});

test('ogni oggetto si può toccare: Lena ci va e lo descrive', async ({ page }) => {
  await page.goto('./');
  const ids = await page.evaluate(() => STANZE.tipografia.oggetti.map(o => o.id));
  for (const id of ids) {
    const area = page.locator(`[data-id="${id}"] .area`);
    const b = await area.boundingBox();
    // Il centro della zona è proprio quell'oggetto (niente lo copre).
    const sopra = await page.evaluate(([x, y]) => document.elementFromPoint(x, y)?.closest('[data-id]')?.dataset.id, [b.x + b.width / 2, b.y + b.height / 2]);
    expect(sopra, id).toBe(id);
    await area.click({ force: true });
    await page.waitForFunction(() => !stato.cammina, null, { timeout: 15000 });
    await expect(page.locator('#chi')).toHaveText('Lena');
    const testi = await page.evaluate((i) => STANZE.tipografia.oggetti.find(o => o.id === i).testo, id);
    await page.waitForFunction(() => !document.querySelector('#testo .l[style*="hidden"]'), null, { timeout: 10000 });
    const mostrato = await page.locator('#testo').textContent();
    expect(testi.map(t => t.replace(/<[^>]+>/g, '')), id).toContain(mostrato);
  }
});

test('il testo compare lettera per lettera; un tocco lo mostra tutto', async ({ page }) => {
  await page.goto('./');
  await page.click('[data-id="torchio"] .area', { force: true });
  await page.waitForFunction(() => !stato.cammina, null, { timeout: 15000 });
  await page.waitForTimeout(60);
  const nascoste = await page.locator('#testo .l[style*="hidden"]').count();
  expect(nascoste).toBeGreaterThan(0);
  await page.click('#dialogo');
  await expect(page.locator('#testo .l[style*="hidden"]')).toHaveCount(0);
});

test('i caratteri da stampa sono nel sito e si caricano', async ({ page }) => {
  await page.goto('./');
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.fonts.check('20px Fell'))).toBe(true);
  expect(await page.evaluate(() => document.fonts.check('20px Fraktur'))).toBe(true);
});

test('il pulsante Oggetti mostra per un momento tutte le zone da toccare', async ({ page }) => {
  await page.goto('./');
  await page.click('#mostra-oggetti');
  await expect(page.locator('#scena')).toHaveClass(/mostra/);
  await expect(page.locator('#scena')).not.toHaveClass(/mostra/, { timeout: 4000 });
});
