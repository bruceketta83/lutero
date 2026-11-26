// Salvataggio: il gioco ricorda la storia e si può ricominciare da capo.
const { test, expect } = require('@playwright/test');

test('alla riapertura il gioco riprende da dove era rimasto', async ({ page }) => {
  await page.goto('./');
  await page.evaluate(() => { ['compito', 'risma', 'agnes-2'].forEach(setFlag); prendi('risma', 'una risma di carta'); fonte('avviso'); entra('mercato', 120); });

  await page.reload();
  await expect(page.locator('#testo')).toContainText('Piazza del mercato');
  await page.click('#scelte button:has-text("Continua la storia")');
  expect(await page.evaluate(() => stato.idStanza)).toBe('mercato');
  expect(await page.evaluate(() => [flag('risma'), flag('agnes-2'), stato.borsa, stato.fonti])).toEqual([true, true, ['risma'], ['avviso']]);
  // L'uscita per il convento resta aperta: Agnes è già stata aiutata.
  await expect(page.locator('[data-id="convento"]')).toHaveCount(1);
});

test('si può ricominciare da capo, con una conferma', async ({ page }) => {
  await page.goto('./');
  await page.evaluate(() => { ['compito', 'risma'].forEach(setFlag); entra('mercato'); });
  await page.reload();
  await page.click('#scelte button:has-text("Ricomincia da capo")');
  await page.click('#dialogo');
  // Con "No" non si perde niente.
  await page.click('#scelte button:has-text("No, continua")');
  expect(await page.evaluate(() => flag('risma'))).toBe(true);

  await page.reload();
  await page.click('#scelte button:has-text("Ricomincia da capo")');
  await page.click('#dialogo');
  await page.click('#scelte button:has-text("Sì, ricomincia")');
  expect(await page.evaluate(() => [stato.idStanza, flag('risma'), stato.borsa])).toEqual(['tipografia', false, []]);
  await page.reload();
  // Dopo il nuovo inizio non c'è la domanda: si parte dalla tipografia.
  await expect(page.locator('#scelte button')).toHaveCount(0);
  expect(await page.evaluate(() => stato.idStanza)).toBe('tipografia');
});

test('un salvataggio rovinato non blocca il gioco', async ({ page }) => {
  await page.goto('./');
  await page.evaluate(() => localStorage.setItem('lutero-salvataggio-v1', '{rotto'));
  await page.reload();
  expect(await page.evaluate(() => stato.idStanza)).toBe('tipografia');
});

test('l\'avviso della borsa non blocca i tocchi sulla scena', async ({ page }) => {
  await page.goto('./');
  await page.evaluate(() => prendi('risma', 'una risma di carta'));
  await expect(page.locator('#avviso-borsa')).toBeVisible();
  await expect(page.locator('#avviso-borsa')).toHaveCSS('pointer-events', 'none');
});
