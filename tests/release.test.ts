import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const packageJson = JSON.parse(read('package.json')) as {
  name: string;
  version: string;
  license: string;
  repository: { url: string };
  homepage: string;
  bugs: { url: string };
  publishConfig: { access: string; registry: string };
  peerDependencies: Record<string, string>;
};
const readme = read('README.md');
const changelog = read('CHANGELOG.md');
const workflow = read('.github/workflows/verify.yml');

describe('2.0.0 release contract', () => {
  it('aligns the package, changelog and documented release', () => {
    expect(packageJson.name).toBe('astro-sovereign-tty');
    expect(packageJson.version).toBe('2.0.0');
    expect(changelog).toContain('## [2.0.0] - 2026-08-26');
    expect(readme).toContain('Current release: `v2.0.0`');
    expect(readme).toContain(
      'src="https://raw.githubusercontent.com/adenyrr/astro-sovereign-tty/v2.0.0/preview.svg"',
    );
    expect(readme).toContain(
      'https://github.com/adenyrr/astro-sovereign-tty/actions/workflows/verify.yml/badge.svg?branch=main',
    );
    expect(workflow).toContain('name: Pipeline');
    expect(workflow).toContain('node-version: 22.12.0');
  });

  it('publishes publicly from the canonical GitHub repository', () => {
    expect(packageJson.repository.url).toBe(
      'git+https://github.com/adenyrr/astro-sovereign-tty.git',
    );
    expect(packageJson.homepage).toBe('https://github.com/adenyrr/astro-sovereign-tty#readme');
    expect(packageJson.bugs.url).toBe('https://github.com/adenyrr/astro-sovereign-tty/issues');
    expect(packageJson.publishConfig).toEqual({
      access: 'public',
      registry: 'https://registry.npmjs.org/',
    });
    expect(changelog).toContain(
      '[2.0.0]: https://github.com/adenyrr/astro-sovereign-tty/releases/tag/v2.0.0',
    );
    expect(read('SECURITY.md')).toContain(
      'https://github.com/adenyrr/astro-sovereign-tty/security/advisories/new',
    );
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
