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

for (const route of routes) {
  test(`${route} is reachable and has no serious axe violation`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('main#main')).toBeVisible();
    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations.filter((violation) =>
        ['serious', 'critical'].includes(violation.impact ?? ''),
      ),
    ).toEqual([]);
  });
}
