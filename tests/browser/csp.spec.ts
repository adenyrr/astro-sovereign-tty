import { expect, test } from '@playwright/test';

test('native Astro CSP is emitted without blocked chrome resources', async ({ page }) => {
  const violations: string[] = [];
  page.on('console', (message) => {
    if (/content security policy|refused to/iu.test(message.text()))
      violations.push(message.text());
  });

  await page.goto('/');
  const policy = page.locator('meta[http-equiv="content-security-policy"]');
  await expect(policy).toHaveCount(1);
  await expect(policy).toHaveAttribute('content', /default-src 'self'/);
  await page.locator('#theme-toggle').click();
  const mobile = (page.viewportSize()?.width ?? 1280) <= 820;
  if (mobile) await page.locator('.mobile-menu summary').click();
  await page
    .locator(mobile ? '.mobile-panel a[href="/blog"]' : '.desktop-nav a[href="/blog"]')
    .click();
  await expect(page).toHaveURL(/\/blog\/?$/u);
  expect(violations).toEqual([]);
});
