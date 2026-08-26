import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const readStyle = (name: string) =>
  readFileSync(new URL(`../src/styles/${name}`, import.meta.url), 'utf8');

describe('layered CSS contract', () => {
  it('keeps the default barrel autonomous and ordered', () => {
    const styles = readStyle('styles.css');
    expect(styles).toContain('@layer astro-ui.tokens, astro-ui.base, astro-ui.components');
    expect(styles).toContain("@import './tokens.css' layer(astro-ui.tokens)");
    expect(styles).toContain("@import './base.css' layer(astro-ui.base)");
    expect(styles).toContain("@import './components.css' layer(astro-ui.components)");
    expect(styles).not.toMatch(/@import 'tailwindcss'|fontsource|compat\.css/iu);
  });

  it('isolates Tailwind and vaul in opt-in files', () => {
    expect(readStyle('tailwind.css')).toMatch(/@import 'tailwindcss'|@utility/u);
    expect(readStyle('compat.css')).toMatch(/vaul-drawer|mobile-drawer/u);
    expect(readStyle('components.css')).not.toMatch(/@utility|vaul-drawer|mobile-drawer/u);
  });

  it('defines every variable used by the default layers', () => {
    const css = ['tokens.css', 'base.css', 'components.css'].map(readStyle).join('\n');
    const definitions = new Set([...css.matchAll(/--([\w-]+)\s*:/gu)].map((match) => match[1]));
    const references = new Set([...css.matchAll(/var\(--([\w-]+)/gu)].map((match) => match[1]));
    expect([...references].filter((name) => !definitions.has(name))).toEqual([]);
  });
});
