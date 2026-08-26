import { expect, test } from '@playwright/test';

test('Astro Fonts keeps Atkinson lazy until reading intent', async ({ page }) => {
  const fontRequests: string[] = [];
  page.on('request', (request) => {
    if (request.resourceType() === 'font') fontRequests.push(new URL(request.url()).pathname);
  });

  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const readingPath = await page
    .locator('meta[name="astro-ui-reading-font"]')
    .getAttribute('content');
  expect(readingPath).toMatch(/^\/_astro\/fonts\/[^/]+\.woff2$/u);
  expect(fontRequests).not.toContain(readingPath);

  const eagerPreloads = page.locator(
    'link[rel="preload"][as="font"]:not([data-astro-ui-reading-font])',
  );
  await expect(eagerPreloads).toHaveCount(2);
  await expect(page.locator('link[data-astro-ui-reading-font]')).toHaveCount(0);

  await page.locator('#reading-mode-toggle').focus();
  const lazyPreload = page.locator('link[data-astro-ui-reading-font]');
  await expect(lazyPreload).toHaveCount(1);
  await expect(lazyPreload).toHaveAttribute('href', readingPath!);
});
