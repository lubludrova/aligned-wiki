export function sortPapers(papers, order = 'year-desc') {
  return [...papers].sort((a, b) => {
    if (order === 'citations-desc' || order === 'citations-asc') {
      if (a.citations === null && b.citations !== null) return 1;
      if (b.citations === null && a.citations !== null) return -1;
      const difference = (a.citations ?? 0) - (b.citations ?? 0);
      if (difference) return order === 'citations-desc' ? -difference : difference;
    }
    return (order === 'year-asc' ? a.year - b.year : b.year - a.year) || a.title.localeCompare(b.title);
  });
}
