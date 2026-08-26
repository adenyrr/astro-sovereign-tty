import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const packageJson = JSON.parse(read('package.json')) as {
  version: string;
  license: string;
  peerDependencies: Record<string, string>;
};
const readme = read('README.md');
const changelog = read('CHANGELOG.md');

describe('2.0.0 release contract', () => {
  it('aligns the package, changelog and documented release', () => {
    expect(packageJson.version).toBe('2.0.0');
    expect(changelog).toContain('## [2.0.0] - 2026-08-26');
    expect(readme).toContain('Current release: `v2.0.0`');
    expect(readme).toContain('src="https://forge.massivedynamics.be/');
  });

  it('keeps the locked license and Astro compatibility contract', () => {
    expect(packageJson.license).toBe('SEE LICENSE IN LICENSE');
    expect(packageJson.peerDependencies.astro).toBe('^6.2.0 || ^7.0.0');
    expect(read('LICENSE')).toContain('Attribution-NonCommercial 4.0 International');
  });

  it('ships migration, WCAG, CSP, font and token documentation', () => {
    for (const path of [
      'docs/migration-v2.md',
      'docs/accessibility.md',
      'docs/csp.md',
      'docs/fonts.md',
      'docs/tokens.md',
    ]) {
      expect(read(path).length, path).toBeGreaterThan(500);
    }
  });
});
