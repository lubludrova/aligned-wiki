import assert from 'node:assert/strict';
import test from 'node:test';
import { prepareWikiNote } from '../src/lib/wiki-markdown.mjs';

test('wiki presentation preserves source qualifications separately from the complete note', () => {
  const raw = `---
year: 2026
reviewed: false
---

# Full publication title

An inspectable memory.

**Authors:** A. Author.
**Paper:** [PDF](../raw/memory.pdf), the inspected preprint.
**Code:** Not found in checked sources.
**Data:** A restricted research release.

## Approach

Uses 30-second clips.

## Evidence and limits

The reported 71.2% excludes ingestion cost.

## Research connections

- **Builds on:** [[world-memory]] — follows its captioning setup.
- **Compares with:** [[world-memory|Memory baseline]] — same protocol.

## Human notes
`;
  const result = prepareWikiNote(raw, { '../raw/memory.pdf': 'https://arxiv.org/pdf/2601.00001v2' }, { 'world-memory': 'World Memory' });
  assert(result.markdown.startsWith('An inspectable memory.'));
  assert(result.markdown.includes('The reported 71.2% excludes ingestion cost.'));
  assert(result.markdown.includes('**Builds on:** [World Memory](/papers/world-memory/) — follows its captioning setup.'));
  assert(result.markdown.includes('[Memory baseline](/papers/world-memory/)'));
  assert(!result.markdown.includes('Human notes'));
  assert(!result.markdown.includes('**Paper:**'));
  assert(result.sourceHeaderMarkdown.includes('[PDF](https://arxiv.org/pdf/2601.00001v2), the inspected preprint.'));
  assert(result.sourceHeaderMarkdown.includes('**Code:** Not found in checked sources.'));
  assert(result.sourceHeaderMarkdown.includes('**Data:** A restricted research release.'));
});

test('nonempty human notes and external citations remain intact', () => {
  const result = prepareWikiNote('# Title\n\nSummary.\n\n## Human notes\n\nCheck the [ablation](https://example.org/paper#page=4).\n\n## Further reading\n\nText.');
  assert(result.markdown.includes('## Human notes\n\nCheck the [ablation](https://example.org/paper#page=4).'));
  assert(result.markdown.includes('## Further reading\n\nText.'));
});

test('wiki section links use the paper page heading namespace', () => {
  const result = prepareWikiNote('# T\n\n[[memory#Evidence and limits|Evidence]]', {}, { memory: 'Memory' });
  assert.equal(result.markdown, '[Evidence](/papers/memory/#wiki-evidence-and-limits)');
});

test('missing wiki papers and unmapped sources fail rather than producing broken links', () => {
  assert.throws(() => prepareWikiNote('# T\n\n[[missing]]'), /Unknown wiki paper: missing/);
  assert.throws(() => prepareWikiNote('# T\n\n[PDF](../raw/missing.pdf)'), /Unmapped wiki source/);
});

test('the primary figure and its source caption stay in the visible note', () => {
  const result = prepareWikiNote('# T\n\nSummary.\n\n**Authors:** A.\n\n![Method overview](../assets/method.png)\n\n*Figure 2, [PDF page 3](../raw/method.pdf#page=3).*\n\n## Approach\n\nMethod.', {
    '../assets/method.png': '/media/wiki/method.png',
    '../raw/method.pdf#page=3': 'https://arxiv.org/pdf/2601.00001#page=3',
  });
  assert(result.markdown.includes('![Method overview](/media/wiki/method.png)'));
  assert(result.markdown.includes('*Figure 2, [PDF page 3](https://arxiv.org/pdf/2601.00001#page=3).*'));
  assert.equal(result.sourceHeaderMarkdown, '**Authors:** A.');
});
