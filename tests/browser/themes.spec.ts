import { expect, test } from '@playwright/test';

test('the static train theme overrides the layered default without important', async ({ page }) => {
  await page.goto('/kitchen-sink');
  const palette = await page.locator('html').evaluate((root) => {
    const style = getComputedStyle(root);
    return {
      vivid: style.getPropertyValue('--amber-rgb').trim(),
      ink: style.getPropertyValue('--accent-amber').trim(),
    };
  });
  expect(palette.vivid).toBe('120, 170, 215');
  expect(palette.ink.replaceAll(' ', '')).toBe('light-dark(#1c4f77,#86bde8)');
  await expect(page.locator('.pill--amber')).toHaveCSS('color', 'rgb(28, 79, 119)');
});
