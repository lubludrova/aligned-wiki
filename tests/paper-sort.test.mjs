import test from 'node:test';
import assert from 'node:assert/strict';
import { sortPapers } from '../src/lib/paper-sort.mjs';

const papers = [
  { title: 'Older', year: 2020, citations: 100 },
  { title: 'Recent', year: 2026, citations: 9 },
  { title: 'Zero', year: 2025, citations: 0 },
  { title: 'Missing', year: 2026, citations: null },
];
const titles = (order, entries = papers) => sortPapers(entries, order).map(paper => paper.title);

test('citation sorting is numeric and keeps unavailable counts after verified zero in both directions', () => {
  assert.deepEqual(titles('citations-desc'), ['Older', 'Recent', 'Zero', 'Missing']);
  assert.deepEqual(titles('citations-asc'), ['Zero', 'Recent', 'Older', 'Missing']);
});

test('year sorting has deterministic ties and preserves the original inventory', () => {
  const before = structuredClone(papers);
  assert.deepEqual(titles('year-desc'), ['Missing', 'Recent', 'Zero', 'Older']);
  assert.deepEqual(titles('year-asc'), ['Older', 'Zero', 'Missing', 'Recent']);
  assert.deepEqual(papers, before);
  assert.deepEqual(titles('citations-desc', [papers[3], { title: 'Another missing', year: 2025, citations: null }]), ['Missing', 'Another missing']);
});
