import { readFileSync, writeFileSync } from 'node:fs';
import { Marked } from 'marked';
import GithubSlugger from 'github-slugger';
import assert from 'node:assert/strict';

const root = new URL('../content/', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
const json = path => JSON.parse(read(path));
const write = (path, data) => writeFileSync(new URL(`en/${path}`, root), JSON.stringify(data, null, 2) + '\n');
const plain = value => value.replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/<[^>]+>/g, '').replace(/[*_`#]/g, '').replace(/\s+/g, ' ').trim();
const headings = markdown => {
  const slugger = new GithubSlugger();
  return new Marked().lexer(markdown).filter(token => token.type === 'heading').map(token => ({ title: plain(token.text), depth: token.depth, id: slugger.slug(plain(token.text)) }));
};
const titles = {
  foundations: ['The Aligned task and video foundations', 'The scientific ideas behind Aligned, how they work, and the limits of their demonstrated capabilities.'],
  archive: ['Retrieval and question answering over video archives', 'Finding episodes, retrieving every relevant event, and answering questions across recordings and long-term memory.'],
  observations: ['Connecting observations across cameras, people, and objects', 'Linking observations of the same scene, person, or object while preserving uncertainty about identity.'],
  evidence: ['Answers with evidence: localization, freshness, and abstention', 'Finding the evidence for each claim, tracking how current it is, and recognizing when an answer is not supported.'],
  states: ['Object states and verification of work outcomes', 'Distinguishing observed actions from object states and determining what evidence confirms the result of work.'],
  procedures: ['Recognizing procedures, errors, and corrections', 'Recognizing steps, reasoning about valid alternatives, and distinguishing mistakes from successful corrections.'],
  streaming: ['Streaming understanding and timely intervention', 'Understanding incoming video and deciding when enough evidence is available to assist or alert.'],
  construction: ['Research on construction', 'Connecting observed work to building elements, plans, requirements, and construction-specific evidence.'],
  business: ['Related business cases', 'Products that inform Aligned’s requirements and useful operational baselines, kept separate from scientific evidence.'],
  adjacent: ['Related directions and additional methods', 'Anomaly detection, skill assessment, and feedback beyond predefined procedure graphs.'],
  synthesis: ['Design synthesis for Aligned', 'A proposed architecture and evaluation plan derived from the review, rather than a single experimentally validated method.'],
  reading: ['Reading plan and glossary', 'A reading sequence for the key ideas, related surveys, and definitions of recurring terms.'],
  methodology: ['Review scope and reproducibility', 'Source selection, audit history, evidence limitations, and the distinction between published findings and design synthesis.'],
};
const chapters = json('chapters.json');
const headingMap = new Map();
const aliases = {};
for (const chapter of chapters) {
  const old = headings(read(`chapters/${chapter.slug}.md`));
  const translated = headings(read(`en/chapters/${chapter.slug}.md`));
  assert.deepEqual(old.map(h => h.depth), translated.map(h => h.depth), `${chapter.slug}: heading structure changed`);
  const mapping = new Map(old.map((h,i) => [h.title, translated[i].title]));
  headingMap.set(chapter.slug, mapping);
  aliases[`/chapters/${chapter.slug}/`] = Object.fromEntries(old.flatMap((h,i) => h.id === translated[i].id ? [] : [[translated[i].id, h.id]]));
  [chapter.title, chapter.description] = titles[chapter.slug];
}
write('chapters.json', chapters);
const translateLocation = location => {
  const title = headingMap.get(location.chapter)?.get(plain(location.headingTitle));
  assert(title !== undefined, `Missing heading: ${location.chapter} / ${location.headingTitle}`);
  return { ...location, headingTitle: title };
};
const papers = json('papers.json').map(paper => {
  const locations = paper.locations.map(translateLocation);
  return { ...paper, locations, headingTitles: locations.map(l => l.headingTitle), citationLocations: paper.citationLocations.map(translateLocation) };
});
write('papers.json', papers);
const notes = json('notes.json').map(note => ({ ...note, title: note.slug === 'pdf_audit_ru' ? 'Rechecking the literature review against original PDFs' : note.slug === 'retrieval' ? 'PDF audit of section 4: retrieval and long-term video memory' : note.title }));
for (const note of notes) {
  if (note.slug === 'problem_statement') continue;
  const strip = s => s.replace(/^---\n[\s\S]*?\n---\n/, '').replace(/^# .+\n/m, '');
  const old = headings(strip(read(`notes/${note.slug}.md`)));
  const translated = headings(strip(read(`en/notes/${note.slug}.md`)));
  assert.deepEqual(old.map(h => h.depth), translated.map(h => h.depth), `${note.slug}: note heading structure changed`);
  aliases[`/notes/${note.slug}/`] = Object.fromEntries(old.flatMap((h,i) => h.id === translated[i].id ? [] : [[translated[i].id, h.id]]));
}
write('notes.json', notes);
write('heading-aliases.json', aliases);
console.log(`English metadata: ${chapters.length} chapters, ${papers.length} papers, ${notes.length} notes.`);
