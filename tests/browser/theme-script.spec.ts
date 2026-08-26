import { expect, test } from '@playwright/test';

test('head script restores dark and reading preferences on a cold load', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('theme', 'dark');
    localStorage.setItem('reading-mode', 'comfortable');
  });
  await page.goto('/');
  const root = page.locator('html');
  await expect(root).toHaveAttribute('data-theme', 'dark');
  await expect(root).toHaveAttribute('data-reading-mode', 'comfortable');
  await expect(root).toHaveClass(/dark/);
});

test('system color scheme still works without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, colorScheme: 'dark' });
  const page = await context.newPage();
  await page.goto('/');
  expect(
    await page.locator('body').evaluate((body) => getComputedStyle(body).colorScheme),
  ).toContain('dark');
  await context.close();
});
