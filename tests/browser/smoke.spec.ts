import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = [
  '/',
  '/no-router',
  '/blog/',
  '/blogging',
  '/kitchen-sink',
  '/i18n/fr',
  '/i18n/en',
  '/print',
];

for (const theme of ['light', 'dark'] as const) {
  for (const route of routes) {
    test(`${route} is axe-clean in the ${theme} theme`, async ({ page }) => {
      await page.addInitScript((selectedTheme) => {
        localStorage.setItem('theme', selectedTheme);
      }, theme);
      await page.goto(route);
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      await expect(page.locator('main#main')).toBeVisible();
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations).toEqual([]);
    });
  }
}
