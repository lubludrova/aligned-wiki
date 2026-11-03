import { search, type SearchEntry } from '../lib/search.mjs';
type PaperEntry = SearchEntry & { chapters: string[]; tags: string[]; year: number; spotlight: boolean; inReview: boolean };
const input = document.querySelector<HTMLInputElement>('#paper-query')!;
const selects = ['topic', 'year', 'coverage', 'chapter'].map(key => ({ key, element: document.querySelector<HTMLSelectElement>(`#paper-${key}`)! }));
const spotlight = document.querySelector<HTMLButtonElement>('#paper-spotlight')!;
const reset = document.querySelector<HTMLButtonElement>('#paper-reset')!;
const cards = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-paper]'));
const results = document.querySelector<HTMLElement>('#paper-results')!;
const counter = document.querySelector<HTMLElement>('.paper-count')!;
const params = new URLSearchParams(location.search);
input.value = params.get('q') || '';
selects.forEach(({key,element}) => { element.value = params.get(key) || ''; });
spotlight.setAttribute('aria-pressed', String(params.get('spotlight') === '1'));
let entries: PaperEntry[];
function filter() {
  if (!entries) return;
  const values = Object.fromEntries(selects.map(({key,element}) => [key,element.value]));
  const onlySpotlight = spotlight.getAttribute('aria-pressed') === 'true';
  const candidates = entries.filter(entry => (!values.topic || entry.tags.includes(values.topic))
    && (!values.year || entry.year === Number(values.year))
    && (!values.chapter || entry.chapters.includes(values.chapter))
    && (!values.coverage || entry.inReview === (values.coverage === 'review'))
    && (!onlySpotlight || entry.spotlight));
  const matches = search(candidates, input.value);
  const matchedIds = new Set(matches.map(entry => entry.id));
  cards.forEach(card => { card.hidden = !matchedIds.has(card.dataset.paper!); });
  const ordered = input.value.trim() ? matches : [...matches].sort((a,b) => b.year - a.year || a.title.localeCompare(b.title));
  const byId = new Map(cards.map(card => [card.dataset.paper, card]));
  ordered.forEach(entry => results.append(byId.get(entry.id)!));
  counter.textContent = matches.length ? `${matches.length} ${matches.length === 1 ? 'paper' : 'papers'}` : 'No matching papers. Try clearing a filter.';
  reset.hidden = !input.value && !Object.values(values).some(Boolean) && !onlySpotlight;
  const url = new URL(location.href);
  for (const [key,value] of Object.entries({ q: input.value, ...values, spotlight: onlySpotlight ? '1' : '' })) value ? url.searchParams.set(key,value) : url.searchParams.delete(key);
  history.replaceState(null,'',url);
}
input.addEventListener('input',filter);
selects.forEach(({element}) => element.addEventListener('change',filter));
spotlight.addEventListener('click', () => { spotlight.setAttribute('aria-pressed', String(spotlight.getAttribute('aria-pressed') !== 'true')); filter(); });
reset.addEventListener('click', () => { input.value = ''; selects.forEach(({element}) => { element.value = ''; }); spotlight.setAttribute('aria-pressed','false'); filter(); input.focus(); });
fetch('/papers.json').then(response => { if(!response.ok) throw new Error('Search unavailable'); return response.json(); }).then(data => { entries=data; filter(); }).catch(() => { counter.textContent='Search could not load. All papers are available below.'; });
