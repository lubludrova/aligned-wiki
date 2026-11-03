export const normalize = value => value.toLocaleLowerCase('ru').replaceAll('ё', 'е').trim();

export function search(entries, query, chapter = '') {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  return entries.filter(entry => !chapter || entry.chapterSlug === chapter || entry.chapters?.includes(chapter)).map(entry => {
    const title = normalize(entry.title);
    const text = normalize(entry.text);
    const corpus = title + ' ' + text;
    if (!terms.every(term => corpus.includes(term))) return null;
    const score = terms.reduce((total, term) => total + (title === term ? 100 : title.includes(term) ? 15 : 1), 0);
    return { ...entry, score };
  }).filter(Boolean).sort((a, b) => b.score - a.score);
}
