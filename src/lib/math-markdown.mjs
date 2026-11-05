import katex from 'katex';

const render = (text, displayMode) => katex.renderToString(text, {
  displayMode, throwOnError: true, strict: 'error', trust: false,
});

// Opt in for authored mathematical documents, leaving historical dollar text intact.
// Inline math uses single-line $...$ without literal dollars inside the expression.
export const mathMarkdown = {
  extensions: [
    {
      name: 'mathBlock', level: 'block',
      start: source => source.indexOf('$$\n'),
      tokenizer(source) {
        const match = /^\$\$\n([\s\S]+?)\n\$\$(?:\n|$)/.exec(source);
        if (match) return { type: 'mathBlock', raw: match[0], text: match[1] };
      },
      renderer: token => `<div class="math-display" role="region" aria-label="Equation, scroll horizontally" tabindex="0">${render(token.text, true)}</div>\n`,
    },
    {
      name: 'mathInline', level: 'inline',
      start: source => source.indexOf('$'),
      tokenizer(source) {
        const match = /^\$([^$\n]+?)\$/.exec(source);
        if (match) return { type: 'mathInline', raw: match[0], text: match[1] };
      },
      renderer: token => render(token.text, false),
    },
  ],
};
