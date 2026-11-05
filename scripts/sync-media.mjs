import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('../public/', import.meta.url).pathname;
const walk = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(join(directory, entry.name)) : [join(directory, entry.name)]);
const dimensions = {};
for (const file of walk(join(root, 'media'))) {
  if (file.endsWith('.svg')) {
    const svg = readFileSync(file, 'utf8');
    const size = svg.match(/<svg\b[^>]*\bviewBox="0 0 ([\d.]+) ([\d.]+)"/);
    if (size) dimensions['/' + relative(root, file)] = { width: Number(size[1]), height: Number(size[2]) };
    continue;
  }
  if (!file.endsWith('.png')) continue;
  const buffer = readFileSync(file);
  if (!buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) throw new Error(`Invalid PNG: ${file}`);
  dimensions['/' + relative(root, file)] = { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}
writeFileSync(new URL('../content/media.json', import.meta.url), JSON.stringify(dimensions, null, 2) + '\n');
console.log(`Image dimensions: ${Object.keys(dimensions).length} PNG/SVG figures`);
