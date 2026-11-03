import { slug as headingSlug } from 'github-slugger';

// Keep the imported note intact on disk and adapt only its site presentation.
export function prepareWikiNote(raw, sourceLinks = {}, paperTitles = {}) {
  const body = raw.replace(/\r\n/g, '\n')
    .replace(/^---\n[\s\S]*?\n---\n/, '')
    .replace(/^\s*# [^\n]+\n/, '').trim();
  const firstSection = body.search(/^## /m);
  const introduction = firstSection < 0 ? body : body.slice(0, firstSection);
  const sections = firstSection < 0 ? '' : body.slice(firstSection);
  const firstMetadata = introduction.search(/^\*\*(?:Authors|Paper|Website|Code|Source version|Research context|Dataset|Data):\*\*/m);
  const summary = firstMetadata < 0 ? introduction : introduction.slice(0, firstMetadata);
  const headerAndFigure = firstMetadata < 0 ? '' : introduction.slice(firstMetadata);
  const firstFigure = headerAndFigure.search(/^!\[/m);
  const sourceHeader = firstFigure < 0 ? headerAndFigure : headerAndFigure.slice(0, firstFigure);
  const figure = firstFigure < 0 ? '' : headerAndFigure.slice(firstFigure);
  const content = sections.split(/(?=^## )/m)
    .filter(section => !/^## Human notes\s*$/.test(section.trim())).join('');

  function links(markdown) {
    return markdown.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_match, target, alias) => {
      const [paper, anchor] = target.split('#');
      const title = paperTitles[paper];
      if (!title) throw new Error(`Unknown wiki paper: ${paper}`);
      const label = (alias || title).replace(/([\\\[\]])/g, '\\$1');
      return `[${label}](/papers/${paper}/${anchor ? `#wiki-${headingSlug(anchor)}` : ''})`;
    }).replace(/\]\((\.\.?\/[^\s)]+)\)/g, (_match, href) => {
      const url = sourceLinks[href];
      if (!url) throw new Error(`Unmapped wiki source: ${href}`);
      return `](${url})`;
    });
  }

  const sourceHeaderMarkdown = links(sourceHeader.trim().replace(/\n(?=\*\*[^\n]+:\*\*)/g, '\n\n'));
  const sourceFields = sourceHeaderMarkdown ? sourceHeaderMarkdown.split(/\n+(?=\*\*[^*\n]+:\*\*)/).map(field => {
    const match = field.match(/^\*\*([^*\n]+):\*\*\s*([\s\S]*)$/);
    if (!match) throw new Error('Unrecognized wiki publication metadata');
    return { label: match[1], markdown: match[2].trim() };
  }) : [];
  return {
    markdown: links([summary.trim(), figure.trim(), content.trim()].filter(Boolean).join('\n\n')),
    sourceHeaderMarkdown, sourceFields,
  };
}
