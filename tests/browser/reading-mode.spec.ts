import { expect, test } from '@playwright/test';

test('reading mode remains binary and applies the accessible measure', async ({ page }) => {
  await page.goto('/');
  const root = page.locator('html');
  const toggle = page.locator('#reading-mode-toggle');

  await expect(root).toHaveAttribute('data-reading-mode', 'default');
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await toggle.click();
  await expect(root).toHaveAttribute('data-reading-mode', 'comfortable');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');

  const metrics = await page
    .locator('main p')
    .first()
    .evaluate((paragraph) => {
      const paragraphStyle = getComputedStyle(paragraph);
      const headingStyle = getComputedStyle(document.querySelector('main h1')!);
      const bodyStyle = getComputedStyle(document.body);
      return {
        bodyFont: bodyStyle.fontFamily,
        letterSpacing: Number.parseFloat(paragraphStyle.letterSpacing),
        maxWidth: paragraphStyle.maxWidth,
        paragraphSpacing: Number.parseFloat(paragraphStyle.marginBottom),
        headingLetterSpacing: headingStyle.letterSpacing,
      };
    });
  expect(metrics.bodyFont).toContain('Atkinson Hyperlegible Next');
  expect(metrics.letterSpacing).toBeGreaterThanOrEqual(0);
  expect(Number.parseFloat(metrics.maxWidth)).toBeGreaterThan(0);
  expect(Number.parseFloat(metrics.maxWidth)).toBeLessThanOrEqual(660);
  expect(metrics.paragraphSpacing).toBeGreaterThan(16);
  expect(
    metrics.headingLetterSpacing === 'normal' ||
      Number.parseFloat(metrics.headingLetterSpacing) >= 0,
  ).toBe(true);

  await toggle.click();
  await expect(root).toHaveAttribute('data-reading-mode', 'default');
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('body')).toHaveCSS('font-family', /Inclusive Sans/);
});

test('WCAG Text Spacing overrides do not cause horizontal page overflow', async ({ page }) => {
  await page.goto('/kitchen-sink');
  await page.locator('#reading-mode-toggle').click();
  await page.addStyleTag({
    content: `
      * { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; }
      p { margin-bottom: 2em !important; }
    `,
  });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
  expect(overflow).toBe(false);
});
