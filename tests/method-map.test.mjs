import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = file => JSON.parse(readFileSync(new URL(`../content/${file}`, import.meta.url), 'utf8'));
const topics = read('map-topics.json'), details = read('map-papers.json');
const slugs = [...new Set([...read('en/papers.json').map(paper => paper.slug), ...Object.keys(read('wiki-papers.json'))])].sort();

test('method map places every publication once in manageable groups', () => {
  const groups = topics.flatMap(topic => topic.groups);
  const mapped = groups.flatMap(group => group.papers);
  assert.equal(new Set(topics.map(topic => topic.id)).size, topics.length);
  assert.equal(new Set(groups.map(group => group.id)).size, groups.length);
  assert.equal(new Set(mapped).size, mapped.length);
  assert.deepEqual([...mapped].sort(), slugs);
  assert(groups.every(group => group.papers.length > 0 && group.papers.length <= 8));
  assert(topics.find(topic => topic.id === 'retrieval').groups.length >= 7);
});

test('every paper has a sourced preview with a specific contribution type', () => {
  assert.deepEqual(Object.keys(details).sort(), slugs);
  const kinds = new Set(['Method', 'Method & benchmark', 'Benchmark', 'Dataset', 'Survey']);
  for (const item of Object.values(details)) {
    assert(item.summary.length > 30 && item.summary.length <= 250);
    assert(kinds.has(item.kind));
    assert(item.summarySource);
  }
});

test('spotlight matches the user-selected wiki shortlist across the map and catalog', () => {
  const expected = ['2025-chavan-indego', '2026-choi-merit', '2026-kim-ma-egoqa', '2026-wang-s-ember', '2026-huang-apm-bench', '2026-guo-aem', '2026-wen-provia', '2026-chaudhari-ledger', '2026-lee-carve', '2026-yeo-worldmm', '2026-chalk-whareformer'];
  const wiki = read('wiki-papers.json');
  assert.deepEqual(Object.keys(details).filter(slug => details[slug].spotlight).sort(), expected.sort());
  assert.deepEqual(Object.keys(wiki).filter(slug => wiki[slug].spotlight).sort(), expected.sort());
  for (const slug of slugs) {
    assert.equal(details[slug].spotlight, wiki[slug]?.spotlight || false, slug);
    if (!details[slug].spotlight) {
      assert.equal(details[slug].spotlightReason, undefined, `${slug}: stale Spotlight reason`);
      assert.equal(details[slug].spotlightSource, undefined, `${slug}: stale Spotlight source`);
    }
  }
  for (const slug of expected) {
    assert.equal(details[slug].spotlightReason, wiki[slug].spotlightReason);
    assert.equal(details[slug].spotlightSource, wiki[slug].spotlightSource);
    assert.match(details[slug].spotlightSource, /manifest\.json/);
  }
});
