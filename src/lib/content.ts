import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Marked, type Tokens } from 'marked';
import GithubSlugger from 'github-slugger';
import { linkTableReferences } from './table-references.mjs';
import { prepareWikiNote } from './wiki-markdown.mjs';

export interface Chapter {
  id: string; slug: string; number: string | number; title: string; description: string; group: string;
}
export interface Section { id: string; title: string; depth: number; text: string; markdown: string; }
export interface PublicationMetadata {
  year: number; venue: string; authors: string; affiliations: string[];
  links: { label: string; url: string; note?: string }[];
  sourceNote: string; sourceVersion?: string; publicationNote?: string; metadataStatus: string;
}
export interface CitationSnapshot {
  count: number | null; provider: string; checked: string; url: string | null;
  status: 'verified' | 'unavailable'; reason?: string;
}
export interface Paper {
  slug: string; title: string; shortTitle: string; year: number; sourceUrls: string[];
  chapters: string[]; headingTitles: string[]; locations: { chapter: string; headingTitle: string }[];
  coverage: string; sourceStatus?: string; note?: string; metadata: PublicationMetadata;
}
export interface WikiPaper {
  title: string; shortTitle: string; summary: string; year: number; sourceUrls: string[];
  metadata: PublicationMetadata; tags: string[]; researchGroups: string[];
  reviewed: boolean; spotlight: boolean; spotlightReason?: string; sourceLinks: Record<string, string>;
}
export const groups = [
  { id: 'foundations', title: 'Foundations and representations', description: 'The Aligned task and video representations', color: '#697660' },
  { id: 'archive', title: 'Retrieval and memory', description: 'Events, intervals, and long-term history', color: '#b44834' },
  { id: 'observations', title: 'Linking observations', description: 'Cameras, people, and object identity', color: '#617b83' },
  { id: 'evidence', title: 'Evidence and object states', description: 'From observations to verifiable results', color: '#9a7b47' },
  { id: 'procedures', title: 'Errors and assistance', description: 'Procedures, corrections, and intervention', color: '#94736b' },
  { id: 'practice', title: 'Construction and practice', description: 'Domain research and business cases', color: '#647864' },
  { id: 'synthesis', title: 'Synthesis and further reading', description: 'Related ideas, architecture, and sources', color: '#7b758c' },
];
const directory = join(process.cwd(), 'content', 'en');
export const citationCounts: Record<string, CitationSnapshot> = JSON.parse(readFileSync(join(directory, '..', 'citation-counts.json'), 'utf8'));
export const chapters: Chapter[] = JSON.parse(readFileSync(join(directory, 'chapters.json'), 'utf8'));
export const notes: { slug: string; title: string }[] = JSON.parse(readFileSync(join(directory, 'notes.json'), 'utf8'));
const imageDimensions: Record<string, { width: number; height: number }> = JSON.parse(readFileSync(join(directory, '..', 'media.json'), 'utf8'));
const publicationMetadata: Record<string, PublicationMetadata> = JSON.parse(readFileSync(join(directory, '..', 'paper-metadata.json'), 'utf8'));
const tableReferences: Record<string, string> = JSON.parse(readFileSync(join(directory, '..', 'table-references.json'), 'utf8'));
export const wikiPapers: Record<string, WikiPaper> = JSON.parse(readFileSync(join(directory, '..', 'wiki-papers.json'), 'utf8'));
export const publicationTypes: Record<string, string[]> = JSON.parse(readFileSync(join(directory, '..', 'publication-types.json'), 'utf8'));
export const paperTags = Object.fromEntries(Object.entries(publicationTypes).map(([slug, types]) => [slug, wikiPapers[slug]?.tags || types]));
export const reviewPapers: Paper[] = JSON.parse(readFileSync(join(directory, 'papers.json'), 'utf8')).map((paper: Paper) => ({ ...paper, year: publicationMetadata[paper.slug].year, metadata: publicationMetadata[paper.slug] }));
export const papers: Paper[] = [
  ...reviewPapers.map(paper => {
    const wiki = wikiPapers[paper.slug];
    return wiki ? { ...paper, title: wiki.title, year: wiki.year, metadata: wiki.metadata, sourceUrls: wiki.sourceUrls } : paper;
  }),
  ...Object.entries(wikiPapers).filter(([slug]) => !reviewPapers.some(paper => paper.slug === slug)).map(([slug, wiki]) => ({
    slug, title: wiki.title, shortTitle: wiki.shortTitle, year: wiki.year, sourceUrls: wiki.sourceUrls, metadata: wiki.metadata,
    chapters: [], headingTitles: [], locations: [], coverage: 'wiki',
  })),
];
const paperTitles = Object.fromEntries(papers.map(paper => [paper.slug, paper.shortTitle]));
export const wikiNotes = Object.fromEntries(Object.entries(wikiPapers).map(([slug, wiki]) => {
  const raw = readFileSync(join(directory, '..', 'wiki', `${slug}.md`), 'utf8');
  return [slug, { raw, ...prepareWikiNote(raw, wiki.sourceLinks, paperTitles) }];
}));
const headingAliases: Record<string, Record<string, string>> = JSON.parse(readFileSync(join(directory, 'heading-aliases.json'), 'utf8'));
export const plain = (value: string) => value.replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/<[^>]+>/g, '').replace(/[*_`#]/g, '').replace(/\s+/g, ' ').trim();
export const escapeHtml = (value: string) => value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export function renderMarkdown(markdown: string, route: string, idPrefix = '') {
  const slugger = new GithubSlugger();
  const sections: Section[] = [];
  let current: Section | undefined;
  const engine = new Marked({ gfm: true });
  const tokens = engine.lexer(markdown);
  for (const token of tokens) {
    if (token.type === 'heading') {
      current = { id: idPrefix + slugger.slug(plain(token.text)), title: plain(token.text), depth: token.depth, text: '', markdown: '' };
      sections.push(current);
    } else if (current) {
      const text = token.type === 'table'
        ? [(token as Tokens.Table).header, ...(token as Tokens.Table).rows].map(row => row.map(cell => plain(cell.text)).join(' · ')).join('. ')
        : plain(token.raw);
      current.text += text + ' ';
      current.markdown += token.raw;
    }
  }
  let headingIndex = 0;
  let tableIndex = 0;
  let tableContext = '';
  const inChapter = route.startsWith('/chapters/');
  const paperHref = (href: string, id = tableContext || sections[headingIndex - 1]?.id) => inChapter ? `${href}?from=${encodeURIComponent(route + (id ? `#${id}` : ''))}` : href;
  engine.use({ renderer: {
    heading(token: Tokens.Heading) {
      const section = sections[headingIndex++];
      const legacyId = headingAliases[route]?.[section.id];
      const alias = legacyId ? `<a id="${escapeHtml(legacyId)}" class="legacy-anchor" aria-hidden="true"></a>` : '';
      const depth = Math.max(2, token.depth - 1);
      const related = papers.filter(paper => paper.locations.some(location => route === `/chapters/${location.chapter}/` && plain(location.headingTitle) === section.title));
      const links = related.length ? `<div class="paper-inline-links">${related.map(paper => `<a href="${escapeHtml(paperHref(`/papers/${paper.slug}/`, section.id))}">${escapeHtml(paper.shortTitle)} <span aria-hidden="true">↗</span></a>`).join('')}</div>` : '';
      return `${alias}<h${depth} id="${escapeHtml(section.id)}"><a class="heading-link" href="${route}#${encodeURIComponent(section.id)}" aria-label="Link to section: ${escapeHtml(section.title)}">${this.parser.parseInline(token.tokens)}<span aria-hidden="true">↗</span></a></h${depth}>${links}`;
    },
    link(token: Tokens.Link) {
      if (!inChapter || !token.href.startsWith('/papers/')) return false;
      return `<a href="${escapeHtml(paperHref(token.href))}">${this.parser.parseInline(token.tokens)}</a>`;
    },
    image(token: Tokens.Image) {
      const size = imageDimensions[token.href];
      const dimensions = size ? ` width="${size.width}" height="${size.height}"` : '';
      return `<button class="figure-zoom" type="button" aria-label="Zoom in: ${escapeHtml(token.text)}"><img src="${escapeHtml(token.href)}" alt="${escapeHtml(token.text)}"${dimensions} loading="lazy" decoding="async"/><span aria-hidden="true">↗</span></button>`;
    },
    table(token: Tokens.Table) {
      const id = inChapter ? `table-${++tableIndex}` : '';
      tableContext = id;
      const head = token.header.map(cell => `<th scope="col">${this.parser.parseInline(cell.tokens)}</th>`).join('');
      const rows = token.rows.map((row, index) => {
        const rowId = id ? `${id}-row-${index + 1}` : '';
        tableContext = rowId;
        return `<tr${rowId ? ` id="${rowId}"` : ''}>${row.map(cell => `<td>${this.parser.parseInline(linkTableReferences(cell.tokens, tableReferences))}</td>`).join('')}</tr>`;
      }).join('');
      tableContext = '';
      return `<div${id ? ` id="${id}"` : ''} class="table-scroll" role="region" aria-label="Table, scroll horizontally" tabindex="0"><table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
    },
  } });
  return { html: engine.parser(tokens), sections, minutes: Math.max(1, Math.ceil(plain(markdown).split(' ').length / 190)) };
}

export const chapterContent = chapters.map(chapter => {
  const markdown = chapter.slug === 'problem-statement'
    ? readFileSync(join(directory, 'notes', 'problem_statement.md'), 'utf8').replace(/^# .+\n/, '')
    : readFileSync(join(directory, 'chapters', `${chapter.slug}.md`), 'utf8');
  return { ...chapter, markdown, ...renderMarkdown(markdown, `/chapters/${chapter.slug}/`) };
});
export const sectionSearchEntries = chapterContent.flatMap(chapter => [
  { id: chapter.id, title: chapter.title, chapter: chapter.title, chapterSlug: chapter.slug, number: chapter.number, group: chapter.group, url: `/chapters/${chapter.slug}/`, text: plain(chapter.markdown.split(/^### /m)[0]) },
  ...chapter.sections.map(({ markdown: _markdown, ...section }) => ({ ...section, chapter: chapter.title, chapterSlug: chapter.slug, number: chapter.number, group: chapter.group, url: `/chapters/${chapter.slug}/#${encodeURIComponent(section.id)}` })),
]);
export function paperLocations(paper: Paper) {
  return paper.locations.map(location => {
    const chapter = chapterContent.find(ch => ch.slug === location.chapter)!;
    const section = chapter.sections.find(section => section.title === plain(location.headingTitle));
    if (!section) throw new Error(`Missing paper location: ${paper.slug} / ${location.headingTitle}`);
    const siblings = papers.filter(other => other.slug !== paper.slug && other.locations.some(loc => loc.chapter === location.chapter && plain(loc.headingTitle) === section.title));
    return { chapter, section, siblings };
  });
}
export const paperSearchEntries = papers.map(paper => {
  const locations = paperLocations(paper);
  const chapter = chapterContent.find(ch => ch.slug === paper.chapters[0]);
  const wiki = wikiPapers[paper.slug];
  const reviewText = locations.map(loc => loc.section.text).join(' ');
  return { id: paper.slug, title: paper.shortTitle, chapter: chapter?.title || 'Wiki library', chapterSlug: chapter?.slug || '', number: chapter?.number || '',
    group: chapter?.group || '', url: `/papers/${paper.slug}/`,
    text: [paper.title, paper.metadata.authors, ...paperTags[paper.slug], plain(wikiNotes[paper.slug]?.markdown || ''), reviewText].join(' '),
    summary: wiki?.summary || reviewText, year: paper.year, venue: paper.metadata.venue, citations: citationCounts[paper.slug].count,
    tags: paperTags[paper.slug], spotlight: wiki?.spotlight || false, inReview: paper.chapters.length > 0,
    coverage: paper.coverage, chapters: paper.chapters };
});
export const searchEntries = [...paperSearchEntries, ...sectionSearchEntries];
