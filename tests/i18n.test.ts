import { describe, expect, it } from 'vitest';
import { en, fr, resolveChromeLabels } from '../src/i18n';

describe('chrome labels', () => {
  it('uses French by default and exposes complete FR/EN dictionaries', () => {
    expect(resolveChromeLabels({}).skipToContent).toBe(fr.skipToContent);
    expect(Object.keys(fr)).toEqual(Object.keys(en));
  });

  it('merges consumer overrides over the selected locale', () => {
    expect(
      resolveChromeLabels({ locale: 'en', labels: { openMenu: 'Show navigation' } }),
    ).toMatchObject({
      openMenu: 'Show navigation',
      closeMenu: en.closeMenu,
    });
  });
});
