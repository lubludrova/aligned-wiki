import test from 'node:test';
import assert from 'node:assert/strict';
import { search } from '../src/lib/search.mjs';
const entries = [
  { title: 'EgoCITE: временная память', text: 'Полные окна могут использовать будущий контекст.', chapterSlug: 'archive' },
  { title: 'AMNAR', text: 'Несколько допустимых продолжений. Учёт ошибок.', chapterSlug: 'procedures' },
  { title: 'Обзор', text: 'EgoCITE сравнивается с памятью других систем.', chapterSlug: 'archive' },
];
test('ranks a matching title above a body mention', () => assert.equal(search(entries, 'egocite')[0].title, entries[0].title));
test('finds Cyrillic terms across title and body', () => assert.equal(search(entries, 'память будущий').length, 1));
test('normalizes Russian ё without weakening all-term matching', () => {
  assert.equal(search(entries, 'учет ОШИБОК').length, 1);
  assert.equal(search(entries, 'учет камер').length, 0);
});
test('applies chapter filters and supports an empty query', () => {
  assert.equal(search(entries, '', 'archive').length, 2);
  assert.equal(search(entries, 'egocite', 'procedures').length, 0);
});

test('includes papers discussed in a secondary chapter', () => assert.equal(search([{ title: 'Shared paper', text: 'Evidence', chapterSlug: 'archive', chapters: ['archive', 'evidence'] }], 'Shared', 'evidence').length, 1));
