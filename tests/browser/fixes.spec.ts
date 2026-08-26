import { expect, test } from '@playwright/test';

test('cards keep a computed shadow in both themes', async ({ page }) => {
  await page.goto('/kitchen-sink');
  const card = page.locator('.card').first();
  await expect(card).toBeVisible();
  expect(await card.evaluate((element) => getComputedStyle(element).boxShadow)).not.toBe('none');
  await page.locator('#theme-toggle').click();
  expect(await card.evaluate((element) => getComputedStyle(element).boxShadow)).not.toBe('none');
});

test('counters initialize without ClientRouter', async ({ page }) => {
  await page.goto('/no-router');
  const counter = page.locator('.stat-value');
  await counter.scrollIntoViewIfNeeded();
  await expect(counter).toContainText('42');
});

test('dark theme survives a ClientRouter swap', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
  await page.goto('/');
  await page.locator('.desktop-nav a[href="/blog"]').click();
  await expect(page).toHaveURL(/\/blog\/?$/);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});
