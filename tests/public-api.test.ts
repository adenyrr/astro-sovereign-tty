import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import sovereignTty from '../src/integration';

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const packageJson = JSON.parse(read('package.json')) as { exports: Record<string, unknown> };

describe('v3 public API', () => {
  it('documents every non-component public entry point', () => {
    const readme = read('README.md');
    for (const entryPoint of [
      '.',
      './integration',
      './i18n',
      './navigation',
      './safe-href',
      './csp',
      './package.json',
      './global.css',
    ]) {
      expect(packageJson.exports).toHaveProperty(entryPoint);
      expect(readme).toContain(
        `@adenyrr/astro-sovereign-tty${entryPoint === '.' ? '' : entryPoint.slice(1)}`,
      );
    }
  });

  it('keeps CSP opt-in while preserving footer attribution', () => {
    const themeScript = read('src/components/ThemeScript.astro');
    const footer = read('src/components/Footer.astro');
    expect(themeScript).toContain('const { csp = false }');
    expect(footer).toContain('design by adenyrr');
  });

  it('rejects font variable collisions from consumers', () => {
    const setup = sovereignTty().hooks['astro:config:setup'] as (options: {
      config: { fonts: Array<{ cssVariable: string }> };
      updateConfig: (config: unknown) => void;
    }) => void;

    expect(() =>
      setup({
        config: { fonts: [{ cssVariable: '--astro-ui-font-body' }] },
        updateConfig: () => undefined,
      }),
    ).toThrow('--astro-ui-font-body');
  });
});
