import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const root = readFileSync(new URL('../.gitlab-ci.yml', import.meta.url), 'utf8');
const release = readFileSync(new URL('../.gitlab/ci/release.yml', import.meta.url), 'utf8');
const security = readFileSync(new URL('../.gitlab/ci/security.yml', import.meta.url), 'utf8');

describe('release pipeline contract', () => {
  it('only creates automatic pipelines for MRs, schedules and stable tags', () => {
    expect(root).toContain('merge_request_event');
    expect(root).toContain('schedule');
    expect(root).toContain('CI_COMMIT_TAG =~ /^v');
    expect(root).toContain('- when: never');
    expect(root).not.toContain('CI_DEFAULT_BRANCH');
    expect(root).not.toContain('lot-');
  });

  it('pins the requested execution and security images', () => {
    expect(root).toContain('node:22.12.0-alpine');
    expect(security).toContain('zricethezav/gitleaks:v8.30.1');
    expect(security).toContain('ghcr.io/google/osv-scanner:v2.5.1');
  });

  it('gates publication on every release check', () => {
    for (const job of [
      'format',
      'lint',
      'types',
      'unit',
      'contrast',
      'axe',
      'audit',
      'secrets',
      'osv',
      'sbom',
      'packaging',
    ]) {
      expect(release).toContain(`    - ${job}\n`);
    }
  });
});
