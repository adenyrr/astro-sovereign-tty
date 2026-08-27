import { expect, test } from '@playwright/test';

test.describe('hide-on-scroll header', () => {
  test('mobile header hides downward and returns upward', async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.includes('mobile'));
    await page.goto('/');
    const header = page.locator('#site-header');
    await page.evaluate(() => window.scrollTo(0, 700));
    await expect(header).toHaveAttribute('data-scroll-state', 'hidden');
    await expect.poll(async () => (await header.boundingBox())?.y ?? 0).toBeLessThan(0);
    await page.evaluate(() => window.scrollBy(0, -160));
    await expect(header).toHaveAttribute('data-scroll-state', 'visible');
  });

  test('open drawer forces transform none', async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.includes('mobile'));
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, 700));
    await page.locator('.mobile-menu').evaluate((menu: HTMLDetailsElement) => {
      menu.open = true;
      menu.dispatchEvent(new Event('toggle'));
    });
    await expect(page.locator('.mobile-menu')).toHaveAttribute('open', '');
    await expect(page.locator('#site-header')).toHaveCSS('transform', 'none');
    expect((await page.locator('.mobile-panel').boundingBox())?.width).toBeGreaterThan(300);
  });

  test('focus and anchors remain unobscured on mobile', async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.includes('mobile'));
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, 700));
    await page.locator('.mobile-menu summary').focus();
    await expect(page.locator('#site-header')).toHaveAttribute('data-scroll-state', 'visible');
    await page.goto('/#section-10');
    const target = await page.locator('#section-10').boundingBox();
    const headerHeight = await page
      .locator('#site-header')
      .evaluate((header) => header.offsetHeight);
    expect(target?.y).toBeGreaterThanOrEqual(headerHeight);
  });

  test('default header hides on desktop and returns upward', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-desktop');
    await page.goto('/');
    const header = page.locator('#site-header');
    await page.evaluate(() => window.scrollTo(0, 700));
    await expect(header).toHaveAttribute('data-scroll-state', 'hidden');
    await expect.poll(async () => (await header.boundingBox())?.y ?? 0).toBeLessThan(0);
    await page.evaluate(() => window.scrollBy(0, -160));
    await expect(header).toHaveAttribute('data-scroll-state', 'visible');
  });

  test('true hides on desktop and false never hides', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-desktop');
    await page.goto('/print');
    await page.evaluate(() => {
      const spacer = document.createElement('div');
      spacer.style.height = '3000px';
      document.querySelector('main')?.append(spacer);
    });
    await page.evaluate(() => window.scrollTo(0, 700));
    await expect(page.locator('#site-header')).toHaveAttribute('data-scroll-state', 'hidden');
    await page.goto('/blogging');
    await page.evaluate(() => window.scrollTo(0, 700));
    await expect(page.locator('#site-header')).toHaveAttribute('data-scroll-state', 'visible');
  });
});
