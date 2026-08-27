import { mkdir, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

const result = spawnSync('npm', ['pack', '--dry-run', '--json'], {
  cwd: new URL('..', import.meta.url),
  encoding: 'utf8',
});
if (result.status !== 0) throw new Error(result.stderr || 'npm pack --dry-run failed');

const report = JSON.parse(result.stdout);
if (report[0]?.name !== '@adenyrr/astro-sovereign-tty') {
  throw new Error(`Unexpected package name: ${report[0]?.name ?? '(missing)'}`);
}
const files = report[0]?.files?.map(({ path }) => path) ?? [];
const forbidden = files.filter((path) =>
  /^(?:playground|tests|scripts|test-results|playwright-report|reports)\//u.test(path),
);
if (forbidden.length) throw new Error(`Forbidden package files: ${forbidden.join(', ')}`);
if (!files.some((path) => path.startsWith('src/')))
  throw new Error('Package contains no src files');

await mkdir(new URL('../reports', import.meta.url), { recursive: true });
await writeFile(
  new URL('../reports/package-dry-run.json', import.meta.url),
  `${JSON.stringify(report, null, 2)}\n`,
);
console.log(`Package manifest verified: ${files.length} files.`);
