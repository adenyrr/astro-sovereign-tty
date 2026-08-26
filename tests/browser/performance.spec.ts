import { expect, test } from '@playwright/test';

test('fixed ambient backdrop remains contained and does not repaint on scroll', async ({
  browserName,
  context,
  page,
}) => {
  test.skip(browserName !== 'chromium', 'Chrome DevTools layer events are Chromium-only');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const session = await context.newCDPSession(page);
  let layers: Array<{ layerId: string; backendNodeId?: number }> = [];
  const painted = new Set<string>();
  session.on('LayerTree.layerTreeDidChange', (event) => {
    layers = event.layers;
  });
  session.on('LayerTree.layerPainted', (event) => painted.add(event.layerId));
  await session.send('LayerTree.enable');
  await page.goto('/');

  await expect(page.locator('#ambient-bg')).toHaveCSS('contain', 'strict');
  const backgroundAttachments = await page.locator('body').evaluate((element) =>
    getComputedStyle(element)
      .backgroundAttachment.split(',')
      .map((value) => value.trim()),
  );
  expect(backgroundAttachments).not.toHaveLength(0);
  expect(backgroundAttachments.every((value) => value === 'scroll')).toBe(true);
  const documentNode = await session.send('DOM.getDocument');
  const ambientNode = await session.send('DOM.querySelector', {
    nodeId: documentNode.root.nodeId,
    selector: '#ambient-bg',
  });
  const description = await session.send('DOM.describeNode', { nodeId: ambientNode.nodeId });
  await page.waitForTimeout(100);
  const ambientLayerIds = layers
    .filter((layer) => layer.backendNodeId === description.node.backendNodeId)
    .map((layer) => layer.layerId);

  painted.clear();
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(250);
  expect(ambientLayerIds.some((layerId) => painted.has(layerId))).toBe(false);
  await session.detach();
});
