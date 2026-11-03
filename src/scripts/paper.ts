const back = document.querySelector<HTMLAnchorElement>('[data-reading-back]');
const from = new URLSearchParams(location.search).get('from');
for (const source of [from, document.referrer]) {
  if (!back || !source) continue;
  try {
    const target = new URL(source, location.origin);
    if (target.origin === location.origin && target.pathname !== location.pathname) {
      back.href = target.pathname + target.search + target.hash;
      break;
    }
  } catch { /* Invalid context leaves the Papers fallback intact. */ }
}
