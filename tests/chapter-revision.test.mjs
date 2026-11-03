import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import test from 'node:test';
import { Marked } from 'marked';
import GithubSlugger from 'github-slugger';

const read = path => readFileSync(new URL(`../content/${path}`, import.meta.url), 'utf8');
const review = JSON.parse(read('en/chapter-revisions/archive.json'));
const markdown = read('en/chapters/archive.md');
const originalPapers = JSON.parse(read('papers.json'));
const papers = JSON.parse(read('en/papers.json'));
const aliases = JSON.parse(read('en/heading-aliases.json'))['/chapters/archive/'];
const engine = new Marked();
const tokens = engine.lexer(markdown);
const section = title => {
  const start = tokens.findIndex(token => token.type === 'heading' && token.text === title);
  assert(start >= 0, `Missing discussion: ${title}`);
  const end = tokens.findIndex((token, index) => index > start && token.type === 'heading' && token.depth <= tokens[start].depth);
  return tokens.slice(start + 1, end < 0 ? tokens.length : end);
};
const visible = text => text.replace(/<[^>]+>/g, '').replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_`]/g, '').trim();

test('Chapter 2 relevance review retains every original publication with a valid discussion', () => {
  const expected = originalPapers.filter(paper => paper.locations.some(location => location.chapter === 'archive')).map(paper => paper.slug).sort();
  assert.deepEqual(review.papers.map(paper => paper.slug).sort(), expected);
  const current = papers.filter(paper => paper.locations.some(location => location.chapter === 'archive'));
  assert.deepEqual(current.map(paper => paper.slug).sort(), expected);
  for (const entry of review.papers) {
    assert(entry.reason && entry.source.url && entry.source.location, `Missing relevance evidence: ${entry.slug}`);
    assert(section(entry.heading).some(token => token.type === 'paragraph'), `Empty discussion: ${entry.slug}`);
    const paper = current.find(paper => paper.slug === entry.slug);
    assert(paper.locations.some(location => location.chapter === 'archive' && location.headingTitle === entry.heading), `Wrong discussion: ${entry.slug}`);
    for (const location of paper.citationLocations.filter(location => location.chapter === 'archive')) section(location.headingTitle);
  }
});

test('secondary Chapter 2 publications have one paragraph, two to four sentences, and no figures', () => {
  const segmenter = new Intl.Segmenter('en', { granularity: 'sentence' });
  for (const entry of review.papers.filter(paper => paper.depth === 'brief')) {
    const discussion = section(entry.heading);
    engine.walkTokens(discussion, token => assert.notEqual(token.type, 'image', `Figure in brief discussion: ${entry.slug}`));
    const paragraphs = discussion.filter(token => token.type === 'paragraph' && (!entry.paragraphStartsWith || token.text.startsWith(entry.paragraphStartsWith)));
    assert.equal(paragraphs.length, 1, `Brief discussion must be one paragraph: ${entry.slug}`);
    const text = visible(paragraphs[0].text.replace(/\[[^\]]*\]\([^)]*\)/g, '')).replace(/\bet al\./g, 'et al');
    const count = [...segmenter.segment(text)].filter(part => /[A-Za-z]/.test(part.segment)).length;
    assert(count >= 2 && count <= 4, `${entry.slug}: expected 2–4 sentences, found ${count}`);
  }
});

test('Chapter 2 stays within its length and figure budgets and preserves published anchors', () => {
  assert(visible(markdown).split(/\s+/).length <= review.maximumWords);
  let figures = 0;
  engine.walkTokens(tokens, token => { if (token.type === 'image') figures++; });
  assert(figures <= review.maximumFigures);
  const ids = new Set([...markdown.matchAll(/<a id="([^"]+)"><\/a>/g)].map(match => match[1]));
  const slugger = new GithubSlugger();
  for (const token of tokens.filter(token => token.type === 'heading')) {
    const id = slugger.slug(visible(token.text));
    ids.add(id);
    if (aliases[id]) ids.add(aliases[id]);
  }
  for (const id of review.preservedAnchors) assert(ids.has(id), `Lost published anchor: ${id}`);
});
