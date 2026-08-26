import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const theme = (name: string) =>
  readFileSync(new URL(`../src/styles/themes/${name}.css`, import.meta.url), 'utf8');

describe('static brand themes', () => {
  it.each(['adenyrr', 'docu', 'train'])('%s exposes only the brand triplet', (name) => {
    const css = theme(name);
    expect([...css.matchAll(/--([\w-]+)\s*:/gu)].map((match) => match[1])).toEqual([
      'amber-rgb',
      'accent-amber',
    ]);
    expect(css).not.toContain('!important');
  });

  it('preserves the established adenyrr and docu palette', () => {
    for (const name of ['adenyrr', 'docu']) {
      expect(theme(name)).toContain('--amber-rgb: 232, 169, 76');
      expect(theme(name)).toContain('light-dark(#744200, #e8a94c)');
    }
  });

  it('uses the approved training blue', () => {
    expect(theme('train')).toContain('--amber-rgb: 120, 170, 215');
    expect(theme('train')).toContain('light-dark(#1c4f77, #86bde8)');
  });
});
