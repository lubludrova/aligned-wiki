import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';

const content = new URL('../content/', import.meta.url);
const records = JSON.parse(readFileSync(new URL('wiki-papers.json', content), 'utf8'));
const review = JSON.parse(readFileSync(new URL('en/papers.json', content), 'utf8'));
const note = slug => readFileSync(new URL(`wiki/${slug}.md`, content), 'utf8');

test('the portable wiki snapshot contains every registered note with unchanged bytes', () => {
  const files = readdirSync(new URL('wiki/', content)).filter(file => file.endsWith('.md'));
  assert.deepEqual(files.map(file => file.slice(0, -3)).sort(), Object.keys(records).sort());
  assert.equal(files.length, 155);
  for (const [slug, record] of Object.entries(records)) {
    const source = note(slug);
    assert.equal(createHash('sha256').update(source).digest('hex'), record.sourceSha256, slug);
    assert(source.includes(`# ${record.title}\n`), `${slug}: title`);
    assert(source.includes(record.summary), `${slug}: summary`);
    assert(source.includes(record.sourceHeaderMarkdown), `${slug}: source qualifications`);
    assert.equal(record.year, record.metadata.year, slug);
    assert.equal(record.reviewed, /^reviewed:\s*true\s*$/m.test(source), `${slug}: human review`);
  }
});

test('wiki research connections and archived PDF references have valid portable targets', () => {
  for (const [slug, record] of Object.entries(records)) {
    const source = note(slug);
    for (const match of source.matchAll(/\[\[([^\]]+)\]\]/g)) {
      const target = match[1].split('|')[0].split('#')[0];
      assert(records[target], `${slug}: missing research connection ${target}`);
    }
    for (const match of source.matchAll(/\]\(([^)]+)\)/g)) {
      const href = match[1];
      if (!/^(https?:|mailto:|#)/.test(href)) {
        assert.match(record.sourceLinks[href] || '', /^(https?:\/\/|\/media\/wiki\/)/, `${slug}: unmapped ${href}`);
      }
    }
    assert.equal(record.images?.length, 1, `${slug}: one source illustration`);
    for (const image of record.images) {
      const bytes = readFileSync(new URL(`../public${image.publicPath}`, content));
      assert.equal(createHash('sha256').update(bytes).digest('hex'), image.sha256, `${slug}: illustration bytes`);
      assert(bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])), `${slug}: PNG signature`);
      assert.equal(record.sourceLinks[image.sourcePath], image.publicPath, `${slug}: illustration mapping`);
      assert.match(source, /!\[[^\]]+\]\(\.\.\/assets\/[^)]+\.png\)/, `${slug}: image alt text`);
      assert.match(source, /\.pdf#page=\d+/, `${slug}: source page attribution`);
    }
    assert(record.sourceUrls.length > 0, `${slug}: publication source`);
    assert(record.sourceUrls.every(url => /^https?:\/\//.test(url)), `${slug}: public source URLs`);
  }
});

test('wiki and review inventories merge without losing review-only publications', () => {
  const existing = new Set(review.map(paper => paper.slug));
  const wiki = Object.keys(records);
  assert.equal(wiki.filter(slug => existing.has(slug)).length, 113);
  assert.equal(wiki.filter(slug => !existing.has(slug)).length, 42);
  assert.equal([...existing].filter(slug => !records[slug]).length, 14);
  assert.equal(new Set([...existing, ...wiki]).size, 169);
  const spotlight = Object.values(records).filter(record => record.spotlight);
  assert.equal(spotlight.length, 11);
  assert(spotlight.every(record => record.spotlightReason && record.spotlightLimit && record.spotlightSource.endsWith('/full_review/spotlight')));
});
