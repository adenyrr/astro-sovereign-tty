import { defineConfig, devices } from '@playwright/test';

const port = Number(process.env.PLAYWRIGHT_PORT ?? 4321);

export default defineConfig({
  testDir: './tests/browser',
  outputDir: './test-results',
  timeout: process.env.CI ? 60_000 : 30_000,
  workers: process.env.CI ? 3 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'reports/playwright.xml' }],
  ],
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run preview:playground',
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'chromium-desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'chromium-mobile', use: { ...devices['Pixel 7'] } },
    { name: 'webkit-mobile', use: { ...devices['iPhone 14'] } },
  ],
});
