import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { papers } from './content';

export interface MapPaper {
  id: string; title: string; year: number; venue: string; href: string;
  summary: string; kind: string; spotlight: boolean; spotlightReason?: string;
}
export interface MapGroup { id: string; title: string; description: string; papers: MapPaper[]; }
export interface MapTopic { id: string; title: string; description: string; groups: MapGroup[]; }
const directory = join(process.cwd(), 'content');
const descriptions: Record<string, Pick<MapPaper, 'summary' | 'kind' | 'spotlight' | 'spotlightReason'>> = JSON.parse(readFileSync(join(directory, 'map-papers.json'), 'utf8'));
const taxonomy: (Omit<MapTopic, 'groups'> & { groups: (Omit<MapGroup, 'papers'> & { papers: string[] })[] })[] = JSON.parse(readFileSync(join(directory, 'map-topics.json'), 'utf8'));
export const mapTopics: MapTopic[] = taxonomy.map(topic => ({ ...topic, groups: topic.groups.map(group => ({ ...group, papers: group.papers.map(slug => {
  const paper = papers.find(paper => paper.slug === slug)!;
  return { id: slug, title: paper.shortTitle, year: paper.year, venue: paper.metadata.venue, href: `/papers/${slug}/`, ...descriptions[slug] };
}) })) }));
export const legacyMapTopics: Record<string, string[]> = {
  foundations: ['features'], archive: ['retrieval'], evidence: ['grounding', 'states'],
  practice: ['construction'], synthesis: ['assessment'], adjacent: ['assessment'],
};
export const legacyMapChapters = Object.fromEntries([...new Set(papers.flatMap(paper => paper.chapters))].map(chapter => [chapter,
  taxonomy.filter(topic => topic.groups.some(group => group.papers.some(slug => papers.find(paper => paper.slug === slug)!.chapters.includes(chapter)))).map(topic => topic.id),
]));
