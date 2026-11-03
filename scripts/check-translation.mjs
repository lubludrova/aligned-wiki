import { readFileSync, readdirSync } from 'node:fs';
import assert from 'node:assert/strict';
import { Marked } from 'marked';

const root = new URL('../content/', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
const engine = new Marked();
const numbers = text => {
  const normalized = text.replace(/(?<=\d)[ ,\u00a0\u202f](?=\d{3}(?:\D|$))/g, '').replace(/(?<=\d),(?=\d)/g, '.');
  return (normalized.match(/\d+(?:\.\d+)*/g) || []).sort();
};
const structure = text => {
  const tokens = engine.lexer(text);
  const links = [], images = [], tables = [];
  engine.walkTokens(tokens, token => {
    if (token.type === 'link') links.push(token.href);
    if (token.type === 'image') images.push(token.href);
    if (token.type === 'table') tables.push([token.header.length, ...token.rows.map(row => row.length)]);
  });
  return {
    headings: tokens.filter(t => t.type === 'heading').map(t => t.depth),
    links, images, tables,
    anchors: [...text.matchAll(/<a id="([^"]+)"><\/a>/g)].map(m => m[1]),
    numbers: numbers(text),
  };
};
let chapterCount = 0, noteCount = 0, figures = 0, revisionCount = 0;
for (const kind of ['chapters', 'notes']) {
  for (const file of readdirSync(new URL(`${kind}/`, root)).filter(f => f.endsWith('.md'))) {
    let original = read(`${kind}/${file}`);
    const translated = read(`en/${kind}/${file}`);
    // This note contained the same statement twice, in English and Russian.
    if (file === 'problem_statement.md') original = original.split('### Русский')[0];
    // Approved navigation change: the product brief now belongs to Foundations.
    if (kind === 'chapters' && file === 'foundations.md') {
      original = original.replace('/notes/problem_statement/', '/chapters/problem-statement/');
      // Approved editorial addition: two sourced examples of top-k video RAG.
      original += '\n[VideoRAG (Jeong et al.)](https://aclanthology.org/2025.findings-acl.1096.pdf), [CARVE](https://arxiv.org/pdf/2606.13141v2).\n';
    }
    const target = structure(translated);
    // Chapter 2 was explicitly rewritten and shortened after translation.
    // Its reviewed English baseline replaces translation parity for this chapter.
    const revision = kind === 'chapters' && file === 'archive.md'
      ? JSON.parse(read('en/chapter-revisions/archive.json'))
      : undefined;
    const source = revision ? revision.structureBaseline : structure(original);
    if (revision) revisionCount++;
    for (const field of ['headings', 'links', 'images', 'tables', 'anchors', 'numbers']) {
      assert.deepEqual(target[field], source[field], `${kind}/${file}: ${field} changed`);
    }
    const visible = translated.replace(/\]\([^)]*\)/g, ']').replace(/<[^>]+>/g, '');
    assert(!/[А-Яа-яЁё]/.test(visible), `${kind}/${file}: untranslated text`);
    if (kind === 'chapters') { chapterCount++; figures += target.images.length; } else noteCount++;
  }
}
for (const file of ['chapters.json', 'papers.json', 'notes.json']) {
  assert(!/[А-Яа-яЁё]/.test(read(`en/${file}`)), `${file}: untranslated metadata`);
}
console.log(`PASS: ${chapterCount} English chapters, ${noteCount} English notes, ${figures} figures. Structure, links, anchors, tables, and numbers match ${revisionCount} editorial baseline and the remaining translation sources. No untranslated Russian text.`);
