import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = file => JSON.parse(readFileSync(new URL(`../content/${file}`, import.meta.url), 'utf8'));
const wiki = read('wiki-papers.json');
const types = read('publication-types.json');
const paperTags = read('paper-tags.json');
const order = ['dataset', 'benchmark', 'method', 'survey', 'empirical-study'];
const slugs = [...new Set([...read('en/papers.json').map(paper => paper.slug), ...Object.keys(wiki)])].sort();

test('every publication has ordered contribution types before its topic tags', () => {
  assert.deepEqual(Object.keys(types).sort(), slugs);
  for (const [slug, contribution] of Object.entries(types)) {
    assert(contribution.length > 0, `${slug}: missing contribution type`);
    assert.deepEqual(contribution, order.filter(type => contribution.includes(type)), `${slug}: invalid or unordered types`);
    if (!wiki[slug]) continue;
    const tags = wiki[slug].tags;
    assert.deepEqual(tags.filter(tag => order.includes(tag)), contribution, `${slug}: type mismatch`);
    assert.deepEqual(tags.slice(0, contribution.length), contribution, `${slug}: types must precede topics`);
    assert.equal(tags.length, new Set(tags).size, `${slug}: duplicate tags`);
  }
});

test('resource authorship, training-only data and diagnostic studies remain distinct', () => {
  for (const type of ['dataset', 'benchmark', 'method']) assert(types['2026-lee-carve'].includes(type));
  assert.deepEqual(types['2026-chalk-whareformer'], ['method']);
  assert.deepEqual(types['2026-ma-r4dsg'], ['method']);
  assert.deepEqual(types['2026-zeng-onestreamer'], ['dataset', 'method']);
  assert.deepEqual(types['2025-plizzari-osnom'], ['benchmark', 'method']);
  assert.deepEqual(types['2025-ortiz-abstention-knobs'], ['empirical-study']);
  assert.deepEqual(types['2026-guo-multimodal-memory-survey'], ['survey']);
  assert.deepEqual(types['2024-wu-longvideobench'], ['dataset', 'benchmark']);
});

test('learning paradigms cover methods in both wiki notes and review-only publications', () => {
  const paradigms = ['training-free', 'sft', 'rl', 'supervised-training', 'self-supervised-learning', 'unsupervised-learning', 'preference-optimization'];
  assert.deepEqual(Object.keys(paperTags).sort(), slugs);
  for (const [slug, contribution] of Object.entries(types)) {
    const tags = paperTags[slug];
    assert.deepEqual(tags.slice(0, contribution.length), contribution, slug);
    assert.equal(tags.length, new Set(tags).size, slug);
    if (wiki[slug]) assert.deepEqual(tags, wiki[slug].tags, slug);
    assert.equal(tags.some(tag => paradigms.includes(tag)), contribution.includes('method'), slug);
  }
  assert.equal(slugs.filter(slug => !wiki[slug] && types[slug].includes('method')).length, 10);
  const expected = [45, 46, 13, 42, 11, 1, 1];
  paradigms.forEach((tag, index) => assert.equal(slugs.filter(slug => paperTags[slug].includes(tag)).length, expected[index], tag));
  assert(paperTags['2021-luo-clip4clip'].includes('sft'));
  assert(paperTags['2025-liu-egosafe'].includes('training-free'));
  assert(paperTags['2025-yoon-uvqa'].includes('preference-optimization'));
});
