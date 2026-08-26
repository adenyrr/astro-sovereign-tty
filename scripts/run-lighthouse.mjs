import { spawnSync } from 'node:child_process';
import { chromium } from '@playwright/test';

const result = spawnSync(
  'npx',
  ['--yes', '@lhci/cli@0.15.1', 'autorun', '--config=lighthouserc.json'],
  {
    stdio: 'inherit',
    env: { ...process.env, CHROME_PATH: chromium.executablePath() },
  },
);

if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
