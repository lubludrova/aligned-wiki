import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { papers } from './content';

export interface MapPaper {
  id: string; title: string; year: number; venue: string; href: string;
  summary: string; kind: string; spotlight: boolean; spotlightReason?: string;
  publication?: string; videoTypes?: string[]; tasks?: string[];
  evaluationFormats?: string[]; accessProtocols?: string[];
  limitations?: string; sourceUrls?: string[]; linkLabel?: string;
}
export interface MapNode {
  id: string; title: string; description: string; children: MapNode[]; items: MapPaper[];
}
interface TaxonomyNode {
  id: string; title: string; description: string; children: TaxonomyNode[];
  papers: string[]; relatedPapers?: string[]; solutions?: string[];
}
interface Resource {
  id: string; title: string; publication: string; summary: string; roles: string[];
  tasks: string[]; videoTypes: string[]; evaluationFormats: string[]; accessProtocols: string[];
  robotics: boolean; sourceUrls: string[]; evidence: string; limitations: string;
}
interface Solution { id: string; title: string; kind: string; summary: string; url: string; limitations: string; }
const directory = join(process.cwd(), 'content');
const read = <T>(name: string): T => JSON.parse(readFileSync(join(directory, name), 'utf8'));
const descriptions = read<Record<string, Pick<MapPaper, 'summary' | 'spotlight' | 'spotlightReason'>>>('map-papers.json');
const types = read<Record<string, string[]>>('publication-types.json');
const taxonomy = read<TaxonomyNode[]>('map-topics.json');
const resources = read<{ resources: Resource[]; taxonomySources: {title: string; url: string; note: string}[] }>('map-resources.json');
const solutions = read<{ checked: string; solutions: Solution[] }>('map-solutions.json');
const labels: Record<string, string> = { dataset: 'Dataset', benchmark: 'Benchmark', method: 'Method', survey: 'Survey', 'empirical-study': 'Empirical study' };
const bySlug = new Map(papers.map(paper => [paper.slug, paper]));
function publication(slug: string): MapPaper {
  const paper = bySlug.get(slug);
  if (!paper) throw new Error(`Map references an unknown publication: ${slug}`);
  return { id: slug, title: paper.shortTitle, year: paper.year, venue: paper.metadata.venue,
    href: `/papers/${slug}/`, publication: slug, ...descriptions[slug],
    kind: types[slug].map(type => labels[type]).join(' · '), linkLabel: 'Read publication' };
}
function resourceItem(resource: Resource): MapPaper {
  const source = publication(resource.publication);
  return { ...source, id: resource.id, title: resource.title, summary: resource.summary,
    kind: resource.roles.map(role => labels[role] ?? role).join(' · '),
    videoTypes: resource.videoTypes, tasks: resource.tasks, evaluationFormats: resource.evaluationFormats,
    accessProtocols: resource.accessProtocols, limitations: resource.limitations,
    sourceUrls: resource.sourceUrls, linkLabel: 'Read introducing publication' };
}
function solutionItem(id: string): MapPaper {
  const item = solutions.solutions.find(solution => solution.id === id);
  if (!item) throw new Error(`Map references an unknown solution: ${id}`);
  return { id: `solution-${id}`, title: item.title, year: Number(solutions.checked.slice(0, 4)),
    venue: `Catalog checked ${solutions.checked}`, href: item.url, summary: item.summary, kind: item.kind,
    spotlight: false, limitations: item.limitations, linkLabel: 'Open official source', sourceUrls: [item.url] };
}
export type DatasetView = 'task' | 'video' | 'evaluation';
const axes = { task: 'tasks', video: 'videoTypes', evaluation: 'evaluationFormats' } as const;
function resourceGroups(view: DatasetView, robotics: boolean): MapNode[] {
  const grouped = new Map<string, MapPaper[]>();
  for (const resource of resources.resources.filter(resource => resource.robotics === robotics)) {
    for (const label of resource[axes[view]]) {
      const items = grouped.get(label) ?? [];
      items.push(resourceItem(resource)); grouped.set(label, items);
    }
  }
  return [...grouped].sort(([a], [b]) => a.localeCompare(b)).map(([title, items]) => ({
    id: `${robotics ? 'robot-resources' : 'resources'}-${view}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`,
    title, description: 'Resources can appear in several groups. Each resource retains one identity and its introducing publication.',
    children: [], items: items.sort((a, b) => a.title.localeCompare(b.title)),
  }));
}
export const datasetViews: Record<DatasetView, MapNode[]> = {
  task: resourceGroups('task', false), video: resourceGroups('video', false), evaluation: resourceGroups('evaluation', false),
};
function expand(node: TaxonomyNode): MapNode {
  const children = node.id === 'datasets' ? datasetViews.task : node.id === 'robot-datasets' ? resourceGroups('task', true) : node.children.map(expand);
  return { id: node.id, title: node.title, description: node.description, children,
    items: [...node.papers, ...(node.relatedPapers ?? [])].map(publication).concat((node.solutions ?? []).map(solutionItem)) };
}
export const mapTopics = taxonomy.map(expand);
export const mapStats = { publications: papers.length, resources: resources.resources.length, solutions: solutions.solutions.length };
export const mapTaxonomySources = resources.taxonomySources;
export const legacyMapTopics = read<Record<string, string[]>>('map-legacy.json');
function hasChapter(node: MapNode, chapter: string): boolean {
  return node.items.some(item => item.publication && bySlug.get(item.publication)?.chapters.includes(chapter)) || node.children.some(child => hasChapter(child, chapter));
}
export const legacyMapChapters = Object.fromEntries([...new Set(papers.flatMap(paper => paper.chapters))].map(chapter => [chapter,
  mapTopics.filter(node => hasChapter(node, chapter)).map(node => node.id),
]));
