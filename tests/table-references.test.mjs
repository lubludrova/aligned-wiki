import test from 'node:test';
import assert from 'node:assert/strict';
import { Lexer, Parser } from 'marked';
import { linkTableReferences } from '../src/lib/table-references.mjs';
const render = (text, references) => Parser.parseInline(linkTableReferences(Lexer.lexInline(text), references));

test('links benchmark names without replacing existing citations or code', () => {
  const html = render('**TVR**, V-RAGBench, [TVR PDF](https://example.org/tvr) and `TVR`', { TVR: '/papers/tvr/', 'V-RAGBench': '/papers/carve/' });
  assert.match(html, /<strong><a href="\/papers\/tvr\/">TVR<\/a><\/strong>/);
  assert.match(html, /<a href="\/papers\/carve\/">V-RAGBench<\/a>/);
  assert.match(html, /<a href="https:\/\/example.org\/tvr">TVR PDF<\/a>/);
  assert.match(html, /<code>TVR<\/code>/);
  assert.equal((html.match(/<a /g) || []).length, 3);
});

test('prefers qualified aliases and avoids partial method names', () => {
  const html = render('VideoAgent Wang, VideoAgent Fan, EgoLifeQA, EgoLife and SuperEgoLife', {
    'VideoAgent Wang': '/papers/wang/', 'VideoAgent Fan': '/papers/fan/',
    EgoLife: '/papers/egolife/', EgoLifeQA: '/papers/egolife/',
  });
  assert.match(html, /href="\/papers\/wang\/">VideoAgent Wang/);
  assert.match(html, /href="\/papers\/fan\/">VideoAgent Fan/);
  assert.equal((html.match(/<a /g) || []).length, 4);
  assert.ok(html.endsWith('and SuperEgoLife'));
});

test('preserves Unicode names and punctuation when linking', () => {
  const text = 'QV-M² / QVHighlights, EM²Mem → evidence';
  const html = render(text, { 'QV-M²': '/papers/flashmmr/', QVHighlights: 'https://example.org/qv', 'EM²Mem': '/papers/em2mem/' });
  assert.equal(html.replace(/<[^>]+>/g, ''), text);
  assert.equal((html.match(/<a /g) || []).length, 3);
});


test('preserves raw HTML links and treats alias punctuation literally', () => {
  const html = render('<a href="/existing/">TVR</a> and V-JEPA 2.1, not V-JEPA 2X1', { TVR: '/papers/tvr/', 'V-JEPA 2.1': '/papers/vjepa/' });
  assert.ok(html.startsWith('<a href="/existing/">TVR</a>'));
  assert.equal((html.match(/<a /g) || []).length, 2);
  assert.ok(html.endsWith('not V-JEPA 2X1'));
});


test('treats trailing plus signs as part of a method name', () => {
  const html = render('EgoTSR++ and EgoTSR+++', { 'EgoTSR++': '/papers/egotsr/' });
  assert.equal((html.match(/<a /g) || []).length, 1);
  assert.ok(html.endsWith('and EgoTSR+++'));
});
