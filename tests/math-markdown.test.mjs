import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { Marked } from 'marked';
import { mathMarkdown } from '../src/lib/math-markdown.mjs';

const render = text => new Marked(mathMarkdown).parse(text);

test('equations retain subscripts, aligned rows and accessible MathML', () => {
  const html = render('A probability $q_{i,j}(z)$ precedes the equation.\n\n$$\n\\begin{aligned}\na_i&=\\sum_j b_j\\\\\nc_i&=\\frac{a_i}{2}\n\\end{aligned}\n$$\n');
  assert.match(html, /class="katex-mathml"/);
  assert.match(html, /<msub>/);
  assert.match(html, /<mfrac>/);
  assert.match(html, /<mtable/);
  assert.match(html, /tabindex="0"/);
});

test('inline and fenced code retain literal dollars and invalid math fails the build', () => {
  assert.match(render('`$not_math$`'), /<code>\$not_math\$<\/code>/);
  assert.match(render('```text\n$x$\n```'), /\$x\$/);
  assert.match(render('The cost is \\$5.'), /\$5/);
  assert.throws(() => render('$\\notARealCommand$'));
});

test('every proposal equation renders and narrative sections remain intact', () => {
  const source = readFileSync(new URL('../content/en/chapters/research-architecture.md', import.meta.url), 'utf8');
  const html = render(source);
  const displayCount = (source.match(/^\$\$$/gm) || []).length / 2;
  assert(displayCount > 0);
  assert.equal((html.match(/class="math-display"/g) || []).length, displayCount);
  assert.equal((html.match(/<h3>/g) || []).length, (source.match(/^### /gm) || []).length);
  assert(!html.includes('katex-error'));
  assert(!html.includes('$$'));
});
