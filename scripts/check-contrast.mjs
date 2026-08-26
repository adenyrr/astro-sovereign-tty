import fs from 'node:fs';
import path from 'node:path';

const explicit = process.argv.indexOf('--file');
const source =
  explicit >= 0
    ? process.argv[explicit + 1]
    : fs.existsSync('src/styles/tokens.css')
      ? 'src/styles/tokens.css'
      : 'src/styles/global.css';
const pairPattern = /--([\w-]+)\s*:\s*light-dark\(\s*(#[\da-f]{6})\s*,\s*(#[\da-f]{6})\s*\)/gi;

function extractPairs(css) {
  const pairs = new Map();
  for (const match of css.matchAll(pairPattern)) pairs.set(match[1], [match[2], match[3]]);
  return pairs;
}

function luminance(hex) {
  const channels = hex
    .slice(1)
    .match(/../g)
    .map((value) => Number.parseInt(value, 16) / 255);
  const [r, g, b] = channels.map((value) =>
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [high, low] = [luminance(a), luminance(b)].sort((left, right) => right - left);
  return (high + 0.05) / (low + 0.05);
}

const failures = [];
const cases = [];

function checkPairs(label, pairs) {
  const backgrounds = ['bg-0', 'bg-1', 'surface-raised'].filter((name) => pairs.has(name));
  const foregrounds = [...pairs.keys()].filter(
    (name) => name.startsWith('text-') || name.startsWith('accent-'),
  );
  for (const foreground of foregrounds) {
    for (const background of backgrounds) {
      for (const theme of [0, 1]) {
        const ratio = contrast(pairs.get(foreground)[theme], pairs.get(background)[theme]);
        const name = `${label}: ${foreground} on ${background} (${theme === 0 ? 'light' : 'dark'})`;
        cases.push({ name, ratio });
        if (ratio < 4.5) failures.push(`${name}: ${ratio.toFixed(2)}:1`);
      }
    }
  }
}

const basePairs = extractPairs(fs.readFileSync(source, 'utf8'));
checkPairs(path.basename(source, '.css'), basePairs);

if (explicit < 0) {
  const themeDirectory = 'src/styles/themes';
  for (const filename of fs.readdirSync(themeDirectory).filter((name) => name.endsWith('.css'))) {
    const themeCss = fs.readFileSync(path.join(themeDirectory, filename), 'utf8');
    const properties = [...themeCss.matchAll(/--([\w-]+)\s*:/g)].map((match) => match[1]);
    if (properties.join(',') !== 'amber-rgb,accent-amber') {
      failures.push(`${filename}: expected only --amber-rgb and --accent-amber`);
      continue;
    }
    const themedPairs = new Map(basePairs);
    for (const [name, values] of extractPairs(themeCss)) themedPairs.set(name, values);
    checkPairs(filename, themedPairs);
  }
}

fs.mkdirSync('reports', { recursive: true });
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<testsuite name="token-contrast" tests="${cases.length}" failures="${failures.length}">${cases.map(({ name, ratio }) => `<testcase name="${name}" classname="contrast"><system-out>${ratio.toFixed(2)}:1</system-out></testcase>`).join('')}</testsuite>\n`;
fs.writeFileSync('reports/contrast.xml', xml);

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`✓ ${cases.length} contrast checks from ${path.normalize(source)} and static themes`);
