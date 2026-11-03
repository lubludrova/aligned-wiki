import { search, normalize, type SearchEntry } from '../lib/search.mjs';

// Keep the exact source URL when opening a paper, including map state and filters.
for (const eventName of ['click', 'auxclick', 'contextmenu']) {
  document.addEventListener(eventName, event => {
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
    if (!link || link.hasAttribute('data-reading-back')) return;
    const target = new URL(link.href);
    if (target.origin !== location.origin || !/^\/papers\/[^/]+\/$/.test(target.pathname)) return;
    if (target.pathname === location.pathname) {
      target.search = location.search;
      link.href = target.href;
      return;
    }
    if (location.pathname.startsWith('/chapters/') && target.searchParams.has('from')) return;
    target.searchParams.set('from', location.pathname + location.search + location.hash);
    link.href = target.href;
  }, true);
}

const searchDialog = document.querySelector<HTMLDialogElement>('#search-dialog')!;
const searchInput = document.querySelector<HTMLInputElement>('#global-search')!;
const resultContainer = document.querySelector<HTMLElement>('#search-results')!;
let entries: SearchEntry[] | undefined;
let pendingEntries: Promise<SearchEntry[]> | undefined;
let toastTimer: ReturnType<typeof setTimeout>;

export function toast(message: string) {
  const element = document.querySelector<HTMLElement>('.toast')!;
  element.textContent = message;
  element.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => element.classList.remove('visible'), 2600);
}
export function getEntries() {
  if (!pendingEntries) pendingEntries = fetch('/search.json').then(response => {
    if (!response.ok) throw new Error('Search unavailable');
    return response.json() as Promise<SearchEntry[]>;
  }).catch(error => { pendingEntries = undefined; throw error; });
  return pendingEntries;
}
function highlight(element: HTMLElement, text: string, query: string) {
  const term = normalize(query).split(/\s+/)[0];
  const start = term ? normalize(text).indexOf(term) : -1;
  if (start < 0) { element.textContent = text; return; }
  element.append(document.createTextNode(text.slice(0, start)));
  const mark = document.createElement('mark');
  mark.textContent = text.slice(start, start + term.length);
  element.append(mark, document.createTextNode(text.slice(start + term.length)));
}
function renderResults() {
  if (!entries) return;
  const query = searchInput.value.trim();
  const matches = query ? search(entries, query) : [];
  const results = query ? matches.slice(0, 24) : entries.filter(entry => entry.url.startsWith('/chapters/') && !entry.url.includes('#'));
  resultContainer.replaceChildren();
  if (!results.length) {
    const p = document.createElement('p');
    p.className = 'empty-results'; p.textContent = 'No results. Try a paper title or another term.';
    resultContainer.append(p); return;
  }
  for (const result of results) {
    const link = document.createElement('a'); link.href = result.url; link.className = 'search-result';
    const context = document.createElement('small'); context.textContent = `${result.number ? result.number + ' / ' : ''}${result.chapter}`;
    const title = document.createElement('strong'); highlight(title, result.title, query);
    const excerpt = document.createElement('p');
    const position = query ? normalize(result.text).indexOf(normalize(query).split(/\s+/)[0]) : 0;
    const start = Math.max(0, position - 45);
    highlight(excerpt, (start ? '…' : '') + result.text.slice(start, start + 180) + (result.text.length > start + 180 ? '…' : ''), query);
    link.append(context, title, excerpt); link.addEventListener('click', () => searchDialog.close());
    resultContainer.append(link);
  }
  if (query && matches.length > 24) {
    const all = document.createElement('a');
    all.className = 'search-result'; all.href = `/library/?q=${encodeURIComponent(query)}`;
    all.textContent = `View all results (${matches.length}) →`;
    resultContainer.append(all);
  }
}
async function openSearch() {
  setMenu(false);
  if (!searchDialog.open) searchDialog.showModal();
  searchInput.focus();
  if (!entries) {
    resultContainer.textContent = 'Loading search…';
    try { entries = await getEntries(); }
    catch { resultContainer.textContent = 'Search could not load. Close this window and try again.'; return; }
  }
  renderResults();
}
document.querySelectorAll('[data-search-open]').forEach(button => button.addEventListener('click', openSearch));
document.querySelector('[data-search-close]')?.addEventListener('click', () => searchDialog.close());
searchInput.addEventListener('input', renderResults);
searchDialog.addEventListener('click', event => { if (event.target === searchDialog) searchDialog.close(); });
searchDialog.addEventListener('keydown', event => {
  if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;
  const links = Array.from(resultContainer.querySelectorAll<HTMLAnchorElement>('a'));
  if (!links.length) return;
  event.preventDefault();
  const current = links.indexOf(document.activeElement as HTMLAnchorElement);
  const next = event.key === 'ArrowDown' ? (current + 1) % links.length : (current <= 0 ? links.length - 1 : current - 1);
  links[next].focus();
});
document.addEventListener('keydown', event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openSearch(); }
  if (event.key === 'Escape') setMenu(false);
});
document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme !== 'dark';
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', document.body.classList.contains('home-page') ? '#242724' : dark ? '#1e2124' : '#f7f6f2');
  try { localStorage.setItem('aligned-theme', dark ? 'dark' : 'light'); } catch { /* Storage is optional. */ }
});

const menuButton = document.querySelector<HTMLButtonElement>('.mobile-menu')!;
const sidebar = document.querySelector<HTMLElement>('.sidebar')!;
const mobileViewport = matchMedia('(max-width: 1024px)');
const workspace = document.querySelector<HTMLElement>('.workspace')!;
function setMenu(open: boolean) {
  const wasOpen = document.body.classList.contains('nav-open');
  workspace.inert = false;
  if (!open && wasOpen && mobileViewport.matches) menuButton.focus();
  document.body.classList.toggle('nav-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  sidebar.inert = (mobileViewport.matches && !open) || (!mobileViewport.matches && !document.body.classList.contains('reading')); 
  if (open) {
    sidebar.querySelector<HTMLAnchorElement>('a')?.focus();
    workspace.inert = mobileViewport.matches;
  }
}
mobileViewport.addEventListener('change', () => setMenu(false));
setMenu(false);
menuButton.addEventListener('click', () => setMenu(!document.body.classList.contains('nav-open')));
document.querySelector('.sidebar-scrim')?.addEventListener('click', () => setMenu(false));
document.querySelector('[data-sidebar-close]')?.addEventListener('click', () => { setMenu(false); menuButton.focus(); });
sidebar.addEventListener('keydown', event => {
  if (event.key !== 'Tab' || !document.body.classList.contains('nav-open')) return;
  const controls = Array.from(sidebar.querySelectorAll<HTMLElement>('a,button,summary')).filter(e => e.getClientRects().length);
  if (event.shiftKey && document.activeElement === controls[0]) { event.preventDefault(); controls.at(-1)?.focus(); }
  else if (!event.shiftKey && document.activeElement === controls.at(-1)) { event.preventDefault(); controls[0].focus(); }
});

document.querySelectorAll('[data-copy-link]').forEach(button => button.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(window.location.href); toast('Link copied'); }
  catch { toast('Copy the address from your browser’s address bar'); }
}));
const markButton = document.querySelector<HTMLButtonElement>('[data-reading-mark]');
if (markButton) {
  const key = `aligned-read:${markButton.dataset.readingMark}`;
  const update = (read: boolean) => { markButton.setAttribute('aria-pressed', String(read)); markButton.textContent = read ? '✓ Read' : 'Mark as read'; };
  try { update(localStorage.getItem(key) === 'true'); } catch { /* Reading remains available without storage. */ }
  markButton.addEventListener('click', () => {
    const read = markButton.getAttribute('aria-pressed') !== 'true'; update(read);
    try { localStorage.setItem(key, String(read)); toast(read ? 'Saved in this browser' : 'Reading mark removed'); } catch { toast('Reading mark lasts until this page is closed'); }
  });
}
const figureDialog = document.querySelector<HTMLDialogElement>('#figure-dialog')!;
document.querySelectorAll<HTMLButtonElement>('.figure-zoom').forEach(button => button.addEventListener('click', () => {
  const source = button.querySelector('img')!;
  const image = figureDialog.querySelector('img')!;
  image.src = source.src; image.alt = source.alt;
  figureDialog.querySelector('p')!.textContent = source.alt;
  figureDialog.showModal();
}));
document.querySelector('[data-figure-close]')?.addEventListener('click', () => figureDialog.close());
figureDialog.addEventListener('click', event => { if (event.target === figureDialog) figureDialog.close(); });

const article = document.querySelector<HTMLElement>('article.prose');
if (article) {
  const headings = Array.from(article.querySelectorAll<HTMLElement>('h2[id],h3[id],h4[id]'));
  let scheduled = false;
  const update = () => {
    scheduled = false;
    const height = document.documentElement.scrollHeight - innerHeight;
    const bar = document.querySelector<HTMLElement>('.reading-progress span');
    if (bar) bar.style.width = `${height > 0 ? Math.min(100, scrollY / height * 100) : 100}%`;
    const active = headings.filter(heading => heading.getBoundingClientRect().top <= 150).at(-1) || headings[0];
    document.querySelectorAll<HTMLAnchorElement>('[data-toc-link]').forEach(link => {
      const selected = link.dataset.tocLink === active?.id;
      link.classList.toggle('active', selected);
      if (selected) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
  };
  window.addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}
