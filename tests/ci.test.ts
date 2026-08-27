import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const root = readFileSync(new URL('../.gitlab-ci.yml', import.meta.url), 'utf8');
const quality = readFileSync(new URL('../.gitlab/ci/quality.yml', import.meta.url), 'utf8');
const release = readFileSync(new URL('../.gitlab/ci/release.yml', import.meta.url), 'utf8');
const security = readFileSync(new URL('../.gitlab/ci/security.yml', import.meta.url), 'utf8');

describe('release pipeline contract', () => {
  it('uses the standard .yml extension for GitLab configuration', () => {
    expect(readdirSync(new URL('../.gitlab/ci/', import.meta.url)).sort()).toEqual([
      'quality.yml',
      'release.yml',
      'security.yml',
    ]);
    expect(root).not.toContain('.yaml');
  });

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
    expect(quality).toContain('mcr.microsoft.com/playwright:v1.62.1-noble');
    expect(quality).toContain('node-v22.12.0-linux-x64.tar.gz');
    expect(quality).toContain('e05a4d65232ae2b27b3d77da2e368522fb46b923335b8e0d5f77624c32484044');
    expect(quality).toContain('--no-same-owner');
    expect(quality.match(/extends: \.browser-job/gu)).toHaveLength(2);
    expect(security).toContain('zricethezav/gitleaks:v8.30.1');
    expect(security).toContain('ghcr.io/google/osv-scanner:v2.5.1');
    expect(security).toContain('/root/osv-scanner scan source --recursive .');
    expect(security).toContain('renovate/renovate:44.46.0');
    expect(security).toContain('$CI_PIPELINE_SOURCE == "schedule" && $RUN_RENOVATE == "true"');
  });

  it('gates publication on every release check', () => {
    for (const job of [
      'format',
      'lint',
      'types',
      'unit',
      'contrast',
      'axe',
      'performance',
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
