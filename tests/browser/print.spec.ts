import { expect, test } from '@playwright/test';

test('print rules are opt-in on the print route', async ({ page }) => {
  await page.emulateMedia({ media: 'print' });
  await page.goto('/print');
  await expect(page.locator('#site-header')).toBeHidden();
  await expect(page.locator('#site-footer')).toBeHidden();
  await expect(page.locator('main')).toHaveCSS('padding-top', '0px');

  await page.goto('/');
  await expect(page.locator('#site-header')).toBeVisible();
});
