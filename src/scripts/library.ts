import { search, type SearchEntry } from '../lib/search.mjs';

const input = document.querySelector<HTMLInputElement>('#library-query')!;
const select = document.querySelector<HTMLSelectElement>('#library-chapter')!;
const results = document.querySelector<HTMLElement>('#library-results')!;
const counter = document.querySelector<HTMLElement>('.library-count')!;
const initialUrl = new URL(location.href);
input.value = initialUrl.searchParams.get('q') || '';
select.value = initialUrl.searchParams.get('chapter') || '';
let entries: SearchEntry[];
function render() {
  if (!entries) return;
  const matches = search(entries, input.value, select.value);
  results.replaceChildren();
  counter.textContent = `${matches.length} ${matches.length === 1 ? 'result' : 'results'}`;
  const url = new URL(location.href);
  for (const [key, value] of [['q', input.value], ['chapter', select.value]]) value ? url.searchParams.set(key, value) : url.searchParams.delete(key);
  history.replaceState(null, '', url);
  if (!matches.length) {
    const p = document.createElement('p'); p.className = 'empty-results'; p.textContent = 'No results. Try another query or chapter.'; results.append(p); return;
  }
  for (const match of matches) {
    const a = document.createElement('a'); a.href = match.url; a.className = 'library-result'; a.setAttribute('aria-label', match.title);
    const context = document.createElement('span'); context.className = 'eyebrow'; context.textContent = `${match.number ? match.number + ' / ' : ''}${match.chapter}`;
    const h2 = document.createElement('h2'); h2.textContent = match.title;
    const arrow = document.createElement('span'); arrow.textContent = '↗'; h2.append(arrow);
    const p = document.createElement('p'); p.textContent = match.text.slice(0, 220) + (match.text.length > 220 ? '…' : '');
    a.append(context, h2, p); results.append(a);
  }
}
input.addEventListener('input', render); select.addEventListener('change', render);
fetch('/search.json').then(response => { if (!response.ok) throw new Error('Search unavailable'); return response.json(); }).then(data => { entries = data; render(); }).catch(() => { counter.textContent = 'Search could not load. All content is available below.'; });
