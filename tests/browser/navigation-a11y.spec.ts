import { expect, test } from '@playwright/test';

test('English locale externalizes chrome labels', async ({ page }) => {
  await page.goto('/i18n/en');
  await expect(page.locator('.skip-link')).toHaveText('Skip to main content');
  await expect(page.locator('.desktop-nav')).toHaveAttribute('aria-label', 'Primary navigation');
  await expect(page.locator('#theme-toggle')).toHaveAttribute('aria-label', /Switch to/);
  await expect(page.locator('#reading-mode-toggle')).toHaveAttribute(
    'aria-label',
    'Enable reading mode',
  );
  await expect(page.locator('#site-footer nav')).toHaveAttribute('aria-label', 'Footer navigation');
});

test('active navigation respects path segment boundaries', async ({ page }) => {
  await page.goto('/blogging');
  await expect(page.locator('.desktop-nav a', { hasText: 'blog' })).not.toHaveAttribute(
    'aria-current',
    'page',
  );
});

test('mobile drawer traps focus, makes the page inert and restores focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const summary = page.locator('.mobile-menu summary');
  await summary.click();

  await expect(summary).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('main')).toHaveAttribute('inert', '');
  await expect(page.locator('.mobile-panel nav a').first()).toBeFocused();

  await page.locator('.mobile-panel a').last().focus();
  await page.keyboard.press('Tab');
  await expect(summary).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(summary).toBeFocused();
  await expect(summary).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('main')).not.toHaveAttribute('inert', '');
});

test('forced colors retains visible active and focus states', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' });
  await page.goto('/blog/');
  const mobile = (page.viewportSize()?.width ?? 1280) <= 820;
  if (mobile) {
    await page.locator('.mobile-menu summary').click();
    await expect(page.locator('.mobile-panel nav a').first()).toBeFocused();
  }
  const active = page.locator(
    mobile ? '.mobile-panel [aria-current="page"]' : '.desktop-nav [aria-current="page"]',
  );
  await expect(active).toBeVisible();
  await expect(active).toHaveCSS('text-decoration-line', 'underline');
  await active.focus();
  await expect(active).toBeFocused();
});
