// Il ritorno da Lutero: la prova del capitolo con quattro domande.
const { test, expect } = require('@playwright/test');

test('Lutero fa quattro domande; le risposte sbagliate spiegano e si riprova', async ({ page }) => {
  test.setTimeout(90_000);
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  // Tocca l'angolo del riquadro: al centro potrebbe esserci un pulsante.
  const tuttoIlTesto = async () => { await page.click('#dialogo', { position: { x: 4, y: 4 } }); await page.waitForTimeout(60); };
  const scegli = async (testo) => { await tuttoIlTesto(); await page.click(`#scelte button:has-text("${testo}")`); await page.waitForTimeout(60); };

  await page.goto('./');
  const prima = ['compito', 'risma', 'agnes-2', 'missione', 'lutero-1', 'spalatino-1', 'divieto', 'passaggio', 'parole', 'lettera', 'cercatore-visto', 'ritorno', 'salmi'];
  await page.evaluate((f) => { f.forEach(setFlag); entra('cella'); }, prima);
  await tuttoIlTesto();

  // Prima della riga dei salmi, Lutero manda Lena da Grunenberg.
  await page.click('[data-id="lutero"] .area', { force: true });
  await page.waitForFunction(() => !stato.cammina);
  await tuttoIlTesto();
  await expect(page.locator('#testo')).toContainText('Grunenberg ti cerca');

  await page.evaluate(() => setFlag('riga'));
  await page.click('[data-id="lutero"] .area', { force: true });
  await page.waitForFunction(() => !stato.cammina);
  for (let i = 0; i < 6; i++) await scegli('Continua');

  // Domanda 1: prima sbagliata (leggenda), poi giusta.
  await tuttoIlTesto();
  await expect(page.locator('#testo')).toContainText('Prima domanda');
  await scegli('permesso scritto');
  await tuttoIlTesto();
  await expect(page.locator('#testo')).toContainText('leggenda');
  await scegli('Riprova');
  await scegli('pena tolta');
  await scegli('Continua');

  // Domanda 2: i soldi.
  await scegli('principe Federico');
  await tuttoIlTesto();
  await expect(page.locator('#testo')).toContainText('Spalatino');
  await scegli('Riprova');
  await scegli('per un debito');
  await scegli('Continua');

  // Domanda 3 e 4.
  await scegli('anche senza confessione');
  await scegli('Continua');
  await scegli('migliaia');
  await scegli('Continua');

  expect(await page.evaluate(() => flag('prova'))).toBe(true);
  for (let i = 0; i < 4; i++) await scegli('Continua');
  await tuttoIlTesto();
  await expect(page.locator('#testo')).toContainText('95 tesi');
  expect(errors).toEqual([]);
});
