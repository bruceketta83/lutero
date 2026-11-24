// Test automatici (Playwright). Avvio: npm test
// Il gioco è servito in /lutero/, come su GitHub Pages: un percorso assoluto si rompe anche nei test.
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60_000,
  fullyParallel: true,
  retries: 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:4176/lutero/',
    ...devices['iPhone 13'],
    browserName: 'chromium',
    deviceScaleFactor: 1,
    trace: 'off'
  },
  webServer: {
    command: 'mkdir -p .site && ln -sfn .. .site/lutero && python3 -m http.server 4176 -d .site',
    url: 'http://localhost:4176/lutero/',
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'ignore'
  }
});
