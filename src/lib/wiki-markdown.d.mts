export function prepareWikiNote(
  raw: string,
  sourceLinks?: Record<string, string>,
  paperTitles?: Record<string, string>,
): { markdown: string; sourceHeaderMarkdown: string };
