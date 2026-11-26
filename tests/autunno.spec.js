// 31 ottobre 1517: le tesi, la porta della chiesa, la tesi da comporre, la mappa e il finale.
const { test, expect } = require('@playwright/test');

test('dal salto di tempo al finale del capitolo 1', async ({ page }) => {
  test.setTimeout(180_000);
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const fermo = () => page.waitForFunction(() => !stato.cammina, null, { timeout: 15000 });
  // Tocca l'angolo del riquadro: al centro potrebbe esserci un pulsante.
  const tuttoIlTesto = async () => {
    if (await page.locator('#foglio-box, #mini').filter({ visible: true }).count()) return;
    await page.click('#dialogo', { position: { x: 4, y: 4 } });
    await page.waitForTimeout(60);
  };
  const tocca = async (id) => { await page.click(`[data-id="${id}"] .area`, { force: true }); await fermo(); await tuttoIlTesto(); };
  const scegli = async (testo) => { await tuttoIlTesto(); await page.click(`#scelte button:has-text("${testo}")`); await page.waitForTimeout(60); };
  // "Continua" finché ci sono solo pulsanti Continua.
  const continua = async () => {
    for (;;) {
      await tuttoIlTesto();
      const b = page.locator('#scelte button', { hasText: 'Continua' });
      if (!(await b.count()) || await page.locator('#foglio-box').isVisible()) break;
      await b.first().click();
      await page.waitForTimeout(80);
    }
  };

  await page.goto('./');
  const prima = ['compito', 'risma', 'agnes-1', 'avviso-letto', 'agnes-2', 'missione', 'lutero-1', 'spalatino-1', 'divieto',
    'passaggio', 'parole', 'lettera', 'cercatore-visto', 'ritorno', 'salmi', 'riga', 'prova'];
  await page.evaluate((f) => { f.forEach(setFlag); entra('cella'); }, prima);
  await expect(page.locator('#data')).toHaveText('Wittenberg, primavera 1517');

  // Salto di tempo.
  await tocca('lutero');
  await scegli('Passano i mesi');
  await page.waitForFunction(() => flag('autunno') && stato.idStanza === 'cella');
  await expect(page.locator('#data')).toHaveText('Wittenberg, 31 ottobre 1517');
  await tuttoIlTesto();
  await expect(page.locator('#testo')).toContainText('vigilia di Ognissanti');

  // Lutero mostra le tesi.
  await tocca('lutero');
  await continua();
  await expect(page.locator('#foglio-box')).toBeVisible();
  await expect(page.locator('#foglio-testo')).toContainText('tintinna');
  await page.click('#foglio-chiudi');
  await continua();
  expect(await page.evaluate(() => [flag('tesi'), stato.borsa.includes('copia-tesi'), stato.fonti.includes('tesi')])).toEqual([true, true, true]);

  // Grunenberg manda prima alla chiesa.
  await page.evaluate(() => entra('tipografia'));
  await tocca('grunenberg');
  await expect(page.locator('#testo')).toContainText('Chiesa del Castello');

  // Alla porta: il racconto e la domanda sulla fonte.
  await page.evaluate(() => entra('chiesa'));
  await tuttoIlTesto();
  await expect(page.locator('#testo')).toContainText('Ognissanti');
  await page.click('[data-id="portone"] .area', { force: true });
  await fermo();
  await continua();
  await expect(page.locator('#testo')).toContainText('Domanda');
  await scegli('Melantone, che era lì');
  await tuttoIlTesto();
  await expect(page.locator('#testo')).toContainText('1518');
  await scegli('Riprova');
  await scegli('quasi trent');
  await scegli('Continua');
  expect(await page.evaluate(() => flag('porta'))).toBe(true);
  // Dopo la scena, il portone porta di nuovo nella sala delle reliquie.
  expect(await page.evaluate(() => stato.idStanza)).toBe('chiesa');

  // In bottega: comporre «fate penitenza».
  await page.evaluate(() => entra('tipografia'));
  await tocca('grunenberg');
  await continua();
  expect(await page.evaluate(() => [flag('lavoro-tesi'), stato.borsa.includes('copia-tesi')])).toEqual([true, false]);
  await page.click('[data-id="casse"] .area', { force: true });
  await fermo();
  await expect(page.locator('#mini-titolo')).toHaveText('Comporre una tesi');
  for (const l of 'fate penitenza') await page.click(`.cassetto[data-lettera="${l}"]`);
  await page.click('.mini-avanti');
  for (const s of ['inchiostra', 'foglio', 'leva']) await page.click(`[data-passo="${s}"]`);
  await expect(page.locator('.foglio-stampato')).toHaveText('fate penitenza');
  await page.click('.mini-avanti');
  await continua();
  await expect(page.locator('#foglio-titolo')).toHaveText('Le tesi viaggiano');
  await expect(page.locator('.mappa .citta')).toHaveCount(5);
  await page.click('#foglio-chiudi');
  expect(await page.evaluate(() => flag('mappa'))).toBe(true);

  // Il finale con Frau Agnes.
  await page.evaluate(() => entra('mercato'));
  await expect(page.locator('#data')).toHaveText('Wittenberg, dicembre 1517');
  await tuttoIlTesto();
  await expect(page.locator('#testo')).toContainText('Dicembre');
  await tocca('agnes');
  await continua();
  expect(await page.evaluate(() => flag('finale'))).toBe(true);
  await expect(page.locator('#testo')).toContainText('Fine del capitolo 1');
  expect(errors).toEqual([]);
});

test('dopo il ritorno la strada per Jüterbog è chiusa', async ({ page }) => {
  await page.goto('./');
  await page.evaluate(() => { ['missione', 'divieto', 'ritorno'].forEach(setFlag); entra('chiesa', 80); });
  await page.click('[data-id="strada"] .area', { force: true });
  await page.waitForFunction(() => !stato.cammina);
  await page.click('#dialogo', { position: { x: 4, y: 4 } });
  expect(await page.evaluate(() => stato.idStanza)).toBe('chiesa');
  await expect(page.locator('#testo')).toContainText('Wittenberg');
});
