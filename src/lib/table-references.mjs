// Match explicit names only, leaving existing links and inline code untouched.
export function linkTableReferences(tokens, references) {
  const aliases = Object.keys(references).sort((a, b) => b.length - a.length);
  if (!aliases.length) return tokens;
  const escaped = aliases.map(name => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(?<![\\p{L}\\p{N}_+-])(${escaped.join('|')})(?![\\p{L}\\p{N}_+-])`, 'gu');
  function visit(items) {
    let htmlLinkDepth = 0;
    return items.flatMap(token => {
      if (token.type === 'html') {
        htmlLinkDepth += (token.text.match(/<a(?:\s|>)/gi) || []).length;
        htmlLinkDepth -= (token.text.match(/<\/a\s*>/gi) || []).length;
        return [token];
      }
      if (htmlLinkDepth > 0) return [token];
      if (token.type === 'strong' || token.type === 'em' || token.type === 'del') {
        return [{ ...token, tokens: visit(token.tokens) }];
      }
      if (token.type !== 'text' || token.tokens) return [token];
      const result = [];
      let cursor = 0;
      for (const match of token.text.matchAll(pattern)) {
        if (match.index > cursor) result.push({ type: 'text', raw: token.text.slice(cursor, match.index), text: token.text.slice(cursor, match.index) });
        result.push({ type: 'link', raw: match[0], href: references[match[0]], tokens: [{ type: 'text', raw: match[0], text: match[0] }], text: match[0] });
        cursor = match.index + match[0].length;
      }
      if (cursor < token.text.length) result.push({ type: 'text', raw: token.text.slice(cursor), text: token.text.slice(cursor) });
      return result;
    });
  }
  return visit(tokens);
}
