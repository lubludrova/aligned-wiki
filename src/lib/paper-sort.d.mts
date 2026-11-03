export function sortPapers<T extends { title: string; year: number; citations: number | null }>(papers: T[], order?: string): T[];
