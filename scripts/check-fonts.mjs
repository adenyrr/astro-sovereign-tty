import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const fontDirectory = 'playground/dist/_astro/fonts';
const files = (await readdir(fontDirectory)).filter((file) => file.endsWith('.woff2'));
if (files.length > 3) throw new Error(`Font budget exceeded: ${files.length} WOFF2 files (max 3)`);
if (files.length !== 3) throw new Error(`Expected exactly 3 WOFF2 files, found ${files.length}`);

const html = await readFile('playground/dist/index.html', 'utf8');
const preloads = [...html.matchAll(/<link\s+rel="preload"[^>]+as="font"[^>]*>/gu)];
if (preloads.length !== 2) throw new Error(`Expected 2 font preloads, found ${preloads.length}`);
if (!html.includes('name="astro-ui-reading-font"')) {
  throw new Error('Missing lazy reading font URL');
}
if (/fontsource|font-inter|Inter Variable/iu.test(html)) {
  throw new Error('Legacy font dependency leaked into output');
}

console.log(`Font budget verified: ${files.length} WOFF2, ${preloads.length} eager preloads.`);
console.log(files.map((file) => path.join(fontDirectory, file)).join('\n'));
