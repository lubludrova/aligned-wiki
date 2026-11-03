import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = file => JSON.parse(readFileSync(new URL(`../content/${file}`, import.meta.url), 'utf8'));
const citations = read('citation-counts.json');
const wiki = read('wiki-papers.json');
const slugs = [...new Set([...read('en/papers.json').map(paper => paper.slug), ...Object.keys(wiki)])].sort();

test('every publication has a dated citation snapshot that distinguishes missing data from zero', () => {
  assert.deepEqual(Object.keys(citations).sort(), slugs);
  for (const [slug, snapshot] of Object.entries(citations)) {
    assert(snapshot.provider, `${slug}: missing provider`);
    assert.match(snapshot.checked, /^\d{4}-\d{2}-\d{2}$/, `${slug}: missing check date`);
    if (snapshot.status === 'verified') {
      assert(Number.isSafeInteger(snapshot.count) && snapshot.count >= 0, `${slug}: invalid count`);
      const recordPattern = snapshot.provider === 'OpenAlex'
        ? /^https:\/\/openalex.org\/W\d+$/
        : /^https:\/\/(?:www\.)?semanticscholar.org\/paper\/(?:[^/]+\/)?[a-f0-9]{40}$/;
      assert(['OpenAlex', 'Semantic Scholar'].includes(snapshot.provider), `${slug}: unsupported provider`);
      assert.match(snapshot.url, recordPattern, `${slug}: missing matched record`);
    } else {
      assert.equal(snapshot.status, 'unavailable', slug);
      assert.equal(snapshot.count, null, `${slug}: unavailable is not zero`);
      assert(snapshot.reason, `${slug}: unavailable needs an explanation`);
    }
  }
});

test('site citation snapshots agree with the single citation line in each imported wiki note', () => {
  for (const slug of Object.keys(wiki)) {
    const raw = readFileSync(new URL(`../content/wiki/${slug}.md`, import.meta.url), 'utf8');
    const lines = raw.match(/^\*\*Citations:\*\* .*$/gm) || [];
    assert.equal(lines.length, 1, `${slug}: expected one citation line`);
    const snapshot = citations[slug];
    assert(lines[0].includes(snapshot.provider) && lines[0].includes(snapshot.checked), `${slug}: source/date mismatch`);
    if (snapshot.status === 'verified') {
      assert(lines[0].startsWith(`**Citations:** ${snapshot.count} (`), `${slug}: count mismatch`);
      assert(lines[0].includes(`](${snapshot.url})`), `${slug}: record mismatch`);
    } else assert(lines[0].includes('Unavailable'), `${slug}: missing unavailable status`);
  }
});
