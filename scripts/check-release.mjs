import { readFile } from 'node:fs/promises';

const tag = process.argv[2] ?? process.env.CI_COMMIT_TAG ?? '';
const stableTag = /^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/u;
if (!stableTag.test(tag))
  throw new Error(`Stable SemVer tag required, received: ${tag || '(empty)'}`);

const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
const changelog = await readFile(new URL('../CHANGELOG.md', import.meta.url), 'utf8');
const version = tag.slice(1);

if (packageJson.name !== 'astro-sovereign-tty') {
  throw new Error(`Unexpected public package name: ${packageJson.name}`);
}
if (packageJson.version !== version) {
  throw new Error(`Tag ${tag} does not match package version ${packageJson.version}`);
}
if (!changelog.includes(`## [${version}]`)) {
  throw new Error(`CHANGELOG.md has no release heading for ${version}`);
}

console.log(`Release contract verified for ${tag}.`);
