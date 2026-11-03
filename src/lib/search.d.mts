export interface SearchEntry { id: string; title: string; text: string; chapterSlug: string; chapter: string; number: string | number; url: string; chapters?: string[]; }
export function normalize(value: string): string;
export function search<T extends SearchEntry>(entries: T[], query: string, chapter?: string): (T & { score: number })[];
