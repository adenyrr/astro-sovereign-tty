import { execFileSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

describe('contrast checker', () => {
  it('rejects an AA text regression', () => {
    expect(() =>
      execFileSync(
        process.execPath,
        ['scripts/check-contrast.mjs', '--file', 'tests/fixtures/contrast-fail.css'],
        { stdio: 'pipe' },
      ),
    ).toThrow();
  });
});
