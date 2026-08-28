import { execFileSync } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const root = new URL('..', import.meta.url);
const astroVersion = process.env.ASTRO_VERSION ?? '7.2.9';
const fixture = await mkdtemp(join(tmpdir(), 'astro-sovereign-tty-'));

const run = (command, args, options = {}) =>
  execFileSync(command, args, { cwd: fixture, stdio: 'inherit', ...options });
const runCapture = (command, args) => {
  const output = execFileSync(command, args, { cwd: fixture, encoding: 'utf8' });
  process.stdout.write(output);
  return output;
};

try {
  const pack = JSON.parse(
    execFileSync('npm', ['pack', '--json', '--pack-destination', fixture], {
      cwd: root,
      encoding: 'utf8',
    }),
  );
  const tarball = join(fixture, pack[0].filename);

  await writeFile(
    join(fixture, 'package.json'),
    `${JSON.stringify(
      {
        name: 'astro-sovereign-tty-consumer-fixture',
        private: true,
        type: 'module',
        scripts: { build: 'astro build', check: 'astro check' },
      },
      null,
      2,
    )}\n`,
  );
  await mkdir(join(fixture, 'src/pages'), { recursive: true });
  await writeFile(
    join(fixture, 'astro.config.mjs'),
    `import { defineConfig } from 'astro/config';
import sovereignTty from '@adenyrr/astro-sovereign-tty/integration';

export default defineConfig({ integrations: [sovereignTty()] });
`,
  );
  await writeFile(
    join(fixture, 'tsconfig.json'),
    JSON.stringify(
      {
        compilerOptions: {
          module: 'NodeNext',
          moduleResolution: 'NodeNext',
          strict: true,
          noEmit: true,
        },
        include: ['src'],
      },
      null,
      2,
    ),
  );
  await writeFile(
    join(fixture, 'src/pages/index.astro'),
    `---
import '@adenyrr/astro-sovereign-tty/styles.css';
import Fonts from '@adenyrr/astro-sovereign-tty/Fonts.astro';
import ThemeScript from '@adenyrr/astro-sovereign-tty/ThemeScript.astro';
import { safeHref } from '@adenyrr/astro-sovereign-tty/safe-href';
const href = safeHref('/');
---
<html lang="en"><head><ThemeScript /><Fonts /></head><body><a href={href}>Home</a></body></html>
`,
  );
  await writeFile(
    join(fixture, 'src/api.ts'),
    `import { safeHref } from '@adenyrr/astro-sovereign-tty/safe-href';
export const href = safeHref('/');
`,
  );

  run('npm', [
    'install',
    '--no-audit',
    '--no-fund',
    tarball,
    `astro@${astroVersion}`,
    '@astrojs/check@^0.9.6',
    'typescript@^5.9.2',
  ]);
  run('npm', ['run', 'check']);
  run('npx', ['tsc', '--noEmit']);
  const buildOutput = runCapture('npm', ['run', 'build']);
  if (/\[WARN\]\s*\[csp\]/u.test(buildOutput)) {
    throw new Error('ThemeScript emitted a CSP warning without csp enabled.');
  }
  run('node', [
    '--input-type=module',
    '--eval',
    "import('@adenyrr/astro-sovereign-tty/safe-href').then(({ safeHref }) => { if (safeHref('/') !== '/') process.exit(1); })",
  ]);
  run('node', [
    '--eval',
    "if (!require.resolve('@adenyrr/astro-sovereign-tty/package.json')) process.exit(1)",
  ]);

  const packageJson = JSON.parse(
    await readFile(join(fixture, 'node_modules/@adenyrr/astro-sovereign-tty/package.json'), 'utf8'),
  );
  if (packageJson.version !== '3.0.0')
    throw new Error('Fixture installed an unexpected package version.');
  console.log(`Tarball consumer passed with Astro ${astroVersion}.`);
} finally {
  await rm(fixture, { recursive: true, force: true });
}
