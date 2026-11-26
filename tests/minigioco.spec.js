// Ritorno da Jüterbog e minigioco della tipografia: comporre «pietà di me» e stampare.
const { test, expect } = require('@playwright/test');

test('Hans riporta Lena a Wittenberg; Lena compone e stampa la prima riga', async ({ page }) => {
  test.setTimeout(120_000);
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const fermo = () => page.waitForFunction(() => !stato.cammina, null, { timeout: 15000 });
  // Tocca l'angolo del riquadro: al centro potrebbe esserci un pulsante.
  const tuttoIlTesto = async () => { await page.click('#dialogo', { position: { x: 4, y: 4 } }); await page.waitForTimeout(60); };
  const tocca = async (id) => { await page.click(`[data-id="${id}"] .area`, { force: true }); await fermo(); await tuttoIlTesto(); };
  const continua = async () => {
    for (;;) {
      await tuttoIlTesto();
      const b = await page.$('#scelte button');
      if (!b) break;
      await b.click();
      await page.waitForTimeout(80);
    }
  };

  await page.goto('./');
  await page.evaluate(() => {
    ['compito', 'risma', 'agnes-2', 'missione', 'spalatino-1', 'divieto', 'passaggio', 'parole', 'lettera', 'cercatore-visto'].forEach(setFlag);
    entra('jueterbog');
  });
  await tuttoIlTesto();

  // Hans: "Non ancora", poi "Sì, torniamo".
  await tocca('hans-j');
  await page.click('#scelte button:has-text("Non ancora")');
  expect(await page.evaluate(() => stato.idStanza)).toBe('jueterbog');
  await tocca('hans-j');
  await page.click('#scelte button:has-text("Sì, torniamo")');
  await page.waitForFunction(() => stato.idStanza === 'tipografia');
  await tuttoIlTesto();
  await expect(page.locator('#testo')).toContainText('Due giorni dopo');

  // Prima del lavoro, la cassa si guarda soltanto.
  await tocca('casse');
  await expect(page.locator('#mini')).toBeHidden();

  // Grunenberg dà il lavoro.
  await tocca('grunenberg');
  await continua();
  expect(await page.evaluate(() => flag('salmi'))).toBe(true);

  // La cassa apre il minigioco.
  await page.click('[data-id="casse"] .area', { force: true });
  await fermo();
  await expect(page.locator('#mini')).toBeVisible();
  await expect(page.locator('#mini-titolo')).toHaveText('Comporre una riga');

  // Errore tipico: la «q» al posto della «p».
  await page.click('.cassetto[data-lettera="q"]');
  await expect(page.locator('#mini-msg')).toContainText('specchio');
  await expect(page.locator('#mini-compositoio .piombo')).toHaveCount(0);
  // Uno spazio nel posto sbagliato.
  await page.click('.cassetto[data-lettera=" "]');
  await expect(page.locator('#mini-msg')).toContainText('tra le parole');

  for (const l of 'pietà di me') await page.click(`.cassetto[data-lettera="${l}"]`);
  await expect(page.locator('#mini-compositoio .piombo')).toHaveCount(11);
  // Nella cassa le lettere sono allo specchio; nel compositoio stanno a testa in giù.
  await expect(page.locator('.cassetto .specchio').first()).toHaveCSS('transform', /matrix\(-1, 0, 0, 1/);
  await expect(page.locator('#mini-compositoio .capovolta').first()).toHaveCSS('transform', /matrix\(1, 0, 0, -1/);
  await page.click('.mini-avanti');

  // Il torchio: ordine sbagliato, poi giusto.
  await page.click('[data-passo="leva"]');
  await expect(page.locator('#mini-msg')).toContainText('vuoto');
  await page.click('[data-passo="inchiostra"]');
  await page.click('[data-passo="leva"]');
  await expect(page.locator('#mini-msg')).toContainText('No');
  await page.click('[data-passo="foglio"]');
  await page.click('[data-passo="leva"]');
  await expect(page.locator('.foglio-stampato')).toHaveText('pietà di me');
  await page.click('.mini-avanti');
  await expect(page.locator('#mini')).toBeHidden();

  expect(await page.evaluate(() => [flag('riga'), stato.fonti.includes('salmi')])).toEqual([true, true]);
  await continua();
  await expect(page.locator('#testo')).toContainText('Convento Nero');
  expect(errors).toEqual([]);
});

test('dopo la missione Grunenberg lascia andare Lena', async ({ page }) => {
  await page.goto('./');
  await page.evaluate(() => { ['compito', 'risma', 'missione'].forEach(setFlag); entra('tipografia'); });
  await page.click('[data-id="grunenberg"] .area', { force: true });
  await page.waitForFunction(() => !stato.cammina);
  await page.click('#dialogo');
  await expect(page.locator('#testo')).toContainText('lavori per lui');
});
