import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import assert from 'node:assert/strict';

const root = new URL('../dist/', import.meta.url).pathname;
const files = dir => readdirSync(dir, { withFileTypes: true }).flatMap(item => item.isDirectory() ? files(join(dir, item.name)) : [join(dir, item.name)]);
const pages = files(root).filter(file => file.endsWith('.html'));
const ids = new Map();
const errors = [];
const decode = value => value.replaceAll('&amp;', '&').replaceAll('&#39;', "'").replaceAll('&quot;', '"');
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const pageIds = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => decode(match[1]));
  if (new Set(pageIds).size !== pageIds.length) errors.push(`Duplicate IDs: ${relative(root, page)}`);
  ids.set(page, new Set(pageIds));
}
let checked = 0;
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const value = decode(match[1]);
    if (/^(https?:|data:|mailto:|tel:|javascript:)/.test(value)) continue;
    const current = `https://local.test/${relative(root, page).replace(/index\.html$/, '')}`;
    const url = new URL(value, current);
    let target = join(root, decodeURIComponent(url.pathname));
    if (existsSync(target) && statSync(target).isDirectory()) target = join(target, 'index.html');
    if (!existsSync(target)) errors.push(`${relative(root, page)} → missing ${value}`);
    else if (url.hash && extname(target) === '.html' && !url.hash.startsWith('#topic=')) {
      if (!ids.get(target)?.has(decodeURIComponent(url.hash.slice(1)))) errors.push(`${relative(root, page)} → missing anchor ${value}`);
    }
    const from = url.searchParams.get('from');
    if (from) {
      const origin = new URL(from, current);
      const originPage = join(root, decodeURIComponent(origin.pathname), 'index.html');
      if (origin.origin !== 'https://local.test' || !origin.pathname.startsWith('/chapters/') || !ids.has(originPage)) errors.push(`${relative(root, page)} → invalid reading context ${from}`);
      else if (origin.hash && !ids.get(originPage).has(decodeURIComponent(origin.hash.slice(1)))) errors.push(`${relative(root, page)} → missing reading context anchor ${from}`);
    }
    checked++;
  }
}
const report = JSON.parse(readFileSync(new URL('../content/import-report.json', import.meta.url), 'utf8'));
assert.equal(report.chapters.length, 13);
assert(report.chapters.every(chapter => chapter.text_preserved));
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`PASS: ${pages.length} HTML pages, ${checked} local references, no missing routes/assets/anchors or duplicate IDs. The original 13-chapter Russian import remains preserved.`);
