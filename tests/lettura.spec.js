// Opzioni di lettura: grandezza, carattere, spazio, testo subito, lettura ad alta voce.
const { test, expect } = require('@playwright/test');

// Voce finta: registra le frasi invece di parlare.
async function voceFinta(page) {
  await page.addInitScript(() => {
    window.__detto = [];
    const synth = {
      speaking: false,
      getVoices: () => [{ name: 'Voce italiana', lang: 'it-IT', localService: true }],
      speak(u) { window.__detto.push(u.text); },
      cancel() {},
      addEventListener() {},
    };
    Object.defineProperty(window, 'speechSynthesis', { value: synth, configurable: true });
    window.SpeechSynthesisUtterance = function (t) { this.text = t; };
  });
}

const opzione = (page, chiave, valore) => page.click(`.let-opz[data-chiave="${chiave}"][data-valore='${JSON.stringify(valore)}']`);

test('grandezza, carattere e spazio cambiano il testo dei dialoghi', async ({ page }) => {
  await page.goto('./');
  const prima = await page.locator('#testo').evaluate(e => e.getBoundingClientRect().height);
  await page.click('#apri-lettura');
  await expect(page.locator('#lettura')).toBeVisible();
  await opzione(page, 'grandezza', 2);
  await opzione(page, 'carattere', 'dislessia');
  await opzione(page, 'spazio', true);
  await page.click('#lettura-chiudi');
  await expect(page.locator('#lettura')).toBeHidden();

  await expect(page.locator('#testo')).toHaveCSS('font-family', /OpenDyslexic/);
  await expect(page.locator('#chi')).toHaveCSS('font-family', /OpenDyslexic/);
  await expect(page.locator('#testo')).toHaveCSS('letter-spacing', /px/);
  expect(await page.locator('#testo').evaluate(e => e.getBoundingClientRect().height)).toBeGreaterThan(prima);

  // Le lettere di piombo del minigioco restano in carattere da stampa.
  await page.evaluate(() => minigiocoSalmi());
  await expect(page.locator('.cassetto').first()).toHaveCSS('font-family', /Fell/);
  await expect(page.locator('.mini-aiuto')).toHaveCSS('font-family', /OpenDyslexic/);
});

test('testo subito: niente stampa lettera per lettera', async ({ page }) => {
  await page.goto('./');
  await page.click('#apri-lettura');
  await opzione(page, 'subito', true);
  await page.click('#lettura-chiudi');
  await page.evaluate(() => dialogo('Lena', 'Una frase abbastanza lunga da stampare lettera per lettera.'));
  await expect(page.locator('#testo .l[style*="hidden"]')).toHaveCount(0);
});

test('le opzioni restano dopo la riapertura e dopo "Ricomincia da capo"', async ({ page }) => {
  await page.goto('./');
  await page.click('#apri-lettura');
  await opzione(page, 'carattere', 'leggibile');
  await page.click('#lettura-chiudi');
  await page.evaluate(() => { setFlag('risma'); entra('mercato'); });
  await page.reload();
  await expect(page.locator('#testo')).toHaveCSS('font-family', /Atkinson/);
  await page.click('#scelte button:has-text("Ricomincia da capo")');
  await page.click('#dialogo', { position: { x: 4, y: 4 } });
  await page.click('#scelte button:has-text("Sì, ricomincia")');
  await expect(page.locator('#testo')).toHaveCSS('font-family', /Atkinson/);
});

test('lettura ad alta voce: pulsante Ascolta e lettura automatica', async ({ page }) => {
  await voceFinta(page);
  await page.goto('./');
  await expect(page.locator('.dialogo-testa .ascolta')).toBeHidden();
  await page.click('#apri-lettura');
  await opzione(page, 'voce', true);
  await expect(page.locator('#lettura-corpo')).toContainText('Voce italiana');
  await page.click('#lettura-chiudi');

  // "Ascolta" legge chi parla e la sua frase.
  await page.evaluate(() => dialogo('Mastro Grunenberg', 'Prendi una <a class="gl" data-gl="risma" href="#">risma</a> ⟶'));
  await page.click('.dialogo-testa .ascolta');
  expect(await page.evaluate(() => window.__detto.at(-1))).toBe('Mastro Grunenberg. Prendi una risma');

  // Un secondo tocco sullo stesso testo ferma la voce.
  await page.click('.dialogo-testa .ascolta');
  await expect(page.locator('.dialogo-testa .ascolta')).toHaveText('🔈 Ascolta');
  await page.click('.dialogo-testa .ascolta');
  await expect(page.locator('.dialogo-testa .ascolta')).toHaveText('⏹ Ferma');

  // Con un foglio aperto, legge il foglio.
  await page.evaluate(() => leggi('Avviso sulla bacheca', AVVISO));
  await page.click('#foglio-box .ascolta');
  expect(await page.evaluate(() => window.__detto.at(-1))).toContain('Jüterbog');
  await page.click('#foglio-chiudi');

  // Lettura automatica di ogni frase.
  await page.click('#apri-lettura');
  await opzione(page, 'auto', true);
  await page.click('#lettura-chiudi');
  await page.evaluate(() => dialogo('Lena', 'Vado al mercato.'));
  expect(await page.evaluate(() => window.__detto.at(-1))).toBe('Lena. Vado al mercato.');
});
