import type { MapNode, MapPaper } from '../lib/method-map';
type Point = {
  key: string; kind: 'root' | 'topic' | 'group' | 'paper'; label: string; accessibleLabel?: string;
  x: number; y: number; span: number; children: Point[]; parent?: string;
  href?: string; expanded?: boolean; count?: number; paper?: MapPaper; action?: () => void;
};
type NodeView = {
  point: Point; element: HTMLDivElement; target: HTMLButtonElement | HTMLAnchorElement; label: HTMLSpanElement;
  x: number; y: number; opacity: number; fromX: number; fromY: number; fromOpacity: number;
  exiting: boolean; exitStart: number;
};
type Camera = { x: number; y: number; z: number };
type Pointer = { x: number; y: number };
type DatasetMode = 'task' | 'video' | 'evaluation';
type Branch = { node: MapNode; path: string; parent?: string; depth: number };

function initializeNetwork() {
  const viewport = document.querySelector<HTMLElement>('#knowledge-map');
  const source = document.querySelector('#map-data');
  if (!viewport || !source) return;
  const { topics, datasetViews, legacyTopics, legacyChapters } = JSON.parse(source.textContent || '{}') as { topics: MapNode[]; datasetViews: Record<DatasetMode, MapNode[]>; legacyTopics: Record<string, string[]>; legacyChapters: Record<string, string[]> };
  let datasetMode: DatasetMode = 'task';
  const datasetSelect = document.querySelector<HTMLSelectElement>('[data-map-datasets]')!;
  const branches = new Map<string, Branch>();
  let spotlightOnly = false;
  const graph = document.querySelector<HTMLElement>('#map-graph')!;
  const list = document.querySelector<HTMLElement>('#map-list')!;
  const stage = viewport.querySelector<HTMLElement>('.network-stage')!;
  const nodes = viewport.querySelector<HTMLElement>('.network-nodes')!;
  const edges = viewport.querySelector<SVGSVGElement>('.network-edges')!;
  const scaleLabel = document.querySelector('#map-scale');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const openBranches = new Set<string>();
  const nodeViews = new Map<string, NodeView>();
  const edgeViews = new Map<string, SVGPathElement>();
  const camera: Camera = { x: 0, y: 0, z: 1 };
  let destination: Camera = { ...camera };
  let bounds = { left: -150, top: -30, right: 470, bottom: 900 };
  let anchor: { key: string; x: number; y: number; endX: number; endY: number } | null = null;
  let layoutStart = 0;
  let frame = 0;
  let lastTime = 0;
  let view: 'graph' | 'list' = 'graph';
  let dirty = true;
  let viewportWidth = 0;
  let viewportHeight = 0;
  const clampZoom = (value: number) => Math.max(0.12, Math.min(2.4, value));
  Object.assign(viewport.style, { overflow: 'clip', touchAction: 'none' });
  Object.assign(stage.style, { position: 'absolute', left: '0', top: '0', width: '0', height: '0', minWidth: '0', minHeight: '0', transformOrigin: '0 0' });
  Object.assign(nodes.style, { position: 'absolute', left: '0', top: '0', width: '0', height: '0', transform: 'none' });
  Object.assign(edges.style, { position: 'absolute', transform: 'none', overflow: 'visible', pointerEvents: 'none' });

  const preview = document.querySelector<HTMLElement>('#paper-preview')!;
  let previewTarget: HTMLElement | null = null;
  let dismissingPreview = false;
  let previewTimer: ReturnType<typeof setTimeout>;
  function hidePreview() {
    clearTimeout(previewTimer);
    const origin = previewTarget;
    const restoreFocus = preview.contains(document.activeElement);
    preview.hidden = true;
    previewTarget?.removeAttribute('aria-describedby');
    previewTarget = null;
    if (restoreFocus && origin?.isConnected) {
      dismissingPreview = true; origin.focus({ preventScroll: true }); dismissingPreview = false;
    }
  }
  function positionPreview() {
    if (preview.hidden || !previewTarget) return;
    const rect = (previewTarget.querySelector('.network-label') ?? previewTarget).getBoundingClientRect();
    const area = viewport!.getBoundingClientRect();
    if (document.activeElement !== previewTarget && (rect.bottom < area.top || rect.top > area.bottom || rect.right < 0 || rect.left > innerWidth)) { hidePreview(); return; }
    preview.style.maxHeight = `${Math.max(100, innerHeight - area.top - 24)}px`;
    const width = preview.offsetWidth, height = preview.offsetHeight;
    const left = rect.right + 18 + width < innerWidth ? rect.right + 18 : rect.left - width - 18;
    preview.style.left = `${Math.max(16, Math.min(innerWidth - width - 16, left))}px`;
    preview.style.top = `${Math.max(area.top + 8, Math.min(innerHeight - height - 16, rect.top - 12))}px`;
  }
  function showPreview(target: HTMLElement, paper: MapPaper) {
    if (dismissingPreview) return;
    clearTimeout(previewTimer);
    previewTarget?.removeAttribute('aria-describedby');
    previewTarget = target;
    preview.querySelector('h2')!.textContent = paper.title;
    preview.querySelector('.preview-meta')!.textContent = [paper.year, paper.venue, paper.kind].filter(Boolean).join(' · ');
    preview.querySelector('.preview-summary')!.textContent = paper.summary;
    const spotlight = preview.querySelector<HTMLElement>('.preview-spotlight')!;
    spotlight.hidden = !paper.spotlight;
    const reason = paper.spotlightReason ?? '';
    spotlight.querySelector('p')!.textContent = reason.match(/^.*?[.!?](?:\s|$)/)?.[0].trim() ?? reason;
    const link = preview.querySelector<HTMLAnchorElement>('.preview-link')!;
    link.href = paper.href;
    link.textContent = `${paper.linkLabel ?? 'Read publication'} →`;
    const facets = preview.querySelector<HTMLDListElement>('.preview-facets')!;
    facets.replaceChildren();
    for (const [label, values] of [['Task', paper.tasks], ['Video', paper.videoTypes], ['Evaluation', paper.evaluationFormats], ['Access', paper.accessProtocols]] as const) {
      if (!values?.length) continue;
      const term = document.createElement('dt'); term.textContent = label;
      const value = document.createElement('dd'); value.textContent = values.join(' · ');
      facets.append(term, value);
    }
    const limits = preview.querySelector<HTMLElement>('.preview-limitations')!;
    limits.textContent = paper.limitations ?? '';
    limits.hidden = !paper.limitations;
    const sources = preview.querySelector<HTMLElement>('.preview-sources')!;
    sources.replaceChildren();
    for (const [index, url] of (paper.sourceUrls ?? []).entries()) {
      const sourceLink = document.createElement('a'); sourceLink.href = url;
      sourceLink.textContent = `Source ${index + 1}`;
      sources.append(sourceLink);
    }
    preview.hidden = false;
    target.setAttribute('aria-describedby', 'preview-description');
    positionPreview();
  }
  function schedulePreviewHide() {
    clearTimeout(previewTimer);
    previewTimer = setTimeout(() => {
      if (!preview.matches(':hover') && !preview.contains(document.activeElement) && !previewTarget?.matches(':hover, :focus')) hidePreview();
    }, 160);
  }
  preview.addEventListener('pointerenter', () => clearTimeout(previewTimer));
  preview.addEventListener('pointerleave', schedulePreviewHide);
  preview.addEventListener('focusin', () => clearTimeout(previewTimer));
  preview.addEventListener('focusout', schedulePreviewHide);
  preview.querySelector('button')!.addEventListener('click', hidePreview);
  document.addEventListener('keydown', event => { if (event.key === 'Escape') hidePreview(); });

  const visibleItems = (node: MapNode) => node.items.filter(item => !spotlightOnly || item.spotlight);
  const activeTopics = () => topics.map(node => node.id === 'datasets' ? { ...node, children: datasetViews[datasetMode] } : node);
  function itemIds(node: MapNode): Set<string> {
    return new Set([...visibleItems(node).map(item => item.id), ...node.children.flatMap(child => [...itemIds(child)])]);
  }
  function indexBranches() {
    branches.clear();
    function visit(node: MapNode, parent?: string, depth = 1) {
      const path = parent ? `${parent}/${node.id}` : node.id;
      branches.set(path, { node, path, parent, depth });
      node.children.forEach(child => visit(child, path, depth + 1));
    }
    activeTopics().forEach(node => visit(node));
  }
  function openPath(path: string) {
    const branch = branches.get(path);
    if (!branch) return;
    if (branch.parent) openPath(branch.parent);
    openBranches.add(path);
  }
  function restore() {
    const path = new URLSearchParams(window.location.hash.slice(1));
    spotlightOnly = path.get('spotlight') === '1';
    const mode = path.get('datasets');
    datasetMode = mode === 'video' || mode === 'evaluation' ? mode : 'task';
    datasetSelect.value = datasetMode;
    indexBranches(); openBranches.clear();
    const requested = (path.get('branches') ?? '').split(',');
    for (const key of ['topic', 'topics', 'group', 'groups']) {
      for (const id of (path.get(key) ?? '').split(',')) {
        if (!id) continue;
        requested.push(...(legacyTopics[id] ?? [id]));
      }
    }
    for (const key of ['chapter', 'chapters']) {
      for (const slug of (path.get(key) ?? '').split(',')) requested.push(...(legacyChapters[slug] ?? []));
    }
    for (const id of requested) {
      if (branches.has(id)) openPath(id);
      else for (const [branchPath, branch] of branches) if (branch.node.id === id) openPath(branchPath);
    }
    document.querySelector('[data-map-spotlight]')?.setAttribute('aria-pressed', String(spotlightOnly));
    dirty = true;
  }
  function save() {
    const path = new URLSearchParams();
    if (openBranches.size) path.set('branches', [...openBranches].join(','));
    if (datasetMode !== 'task') path.set('datasets', datasetMode);
    if (spotlightOnly) path.set('spotlight', '1');
    history.replaceState(history.state, '', `${window.location.pathname}${window.location.search}${path.size ? `#${path}` : '#map'}`);
  }
  function toggleBranch(path: string, key?: string) {
    if (openBranches.has(path)) {
      for (const open of openBranches) if (open === path || open.startsWith(`${path}/`)) openBranches.delete(open);
    } else openPath(path);
    save(); dirty = true;
    if (view === 'graph') rebuild(key); else syncList();
  }
  function makePoint(kind: Point['kind'], key: string, label: string, x: number, extra: Partial<Point> = {}): Point {
    return { kind, key, label, x, y: 0, span: kind === 'paper' ? Math.max(72, Math.ceil(label.length / 32) * 20 + 20) : 84, children: [], ...extra };
  }
  function tree() {
    const root = makePoint('root', 'root', 'Aligned', 0, { action: () => fit() });
    function branchPoint(branch: Branch, parent: string): Point {
      const { node, path, depth } = branch;
      const key = `branch:${path}`;
      const x = 300 + (depth - 1) * 350;
      const point = makePoint(depth === 1 ? 'topic' : 'group', key, node.title, x, {
        parent, expanded: openBranches.has(path), count: itemIds(node).size,
        action: () => toggleBranch(path, key),
      });
      if (openBranches.has(path)) {
        point.children = [
          ...node.children.filter(child => itemIds(child).size).map(child => branchPoint(branches.get(`${path}/${child.id}`)!, key)),
          ...visibleItems(node).map(item => makePoint('paper', `item:${path}/${item.id}`, item.title, x + 350, {
            parent: key, href: item.href, paper: item,
            accessibleLabel: [item.title, item.year, item.kind, item.spotlight ? 'Wiki spotlight' : ''].filter(Boolean).join(', '),
          })),
        ];
      }
      return point;
    }
    root.children = activeTopics().filter(node => itemIds(node).size).map(node => branchPoint(branches.get(node.id)!, root.key));
    function measure(point: Point): number {
      point.span = Math.max(point.span, point.children.reduce((sum, child) => sum + measure(child), 0));
      return point.span;
    }
    const result: Point[] = [];
    function place(point: Point, top: number) {
      point.y = top + point.span / 2;
      result.push(point);
      const childrenHeight = point.children.reduce((sum, child) => sum + child.span, 0);
      let childTop = top + (point.span - childrenHeight) / 2;
      for (const child of point.children) { place(child, childTop); childTop += child.span; }
    }
    measure(root); place(root, 0);
    return result;
  }
  function startFrame() {
    if (!frame && view === 'graph') { lastTime = performance.now(); frame = requestAnimationFrame(tick); }
  }
  function drawCamera() {
    stage.style.transform = `translate3d(${camera.x}px, ${camera.y}px, 0) scale(${camera.z})`;
    if (scaleLabel) scaleLabel.textContent = `${Math.round(camera.z * 100)}%`;
    positionPreview();
  }
  function drawEdges() {
    for (const [key, edge] of edgeViews) {
      const child = nodeViews.get(key);
      const parent = child?.point.parent ? nodeViews.get(child.point.parent) : undefined;
      if (!child || !parent) { edge.remove(); edgeViews.delete(key); continue; }
      const bend = (child.x - parent.x) * 0.48;
      edge.setAttribute('d', `M${parent.x},${parent.y} C${parent.x + bend},${parent.y} ${child.x - bend},${child.y} ${child.x},${child.y}`);
      edge.style.opacity = String(Math.min(child.opacity, parent.opacity));
    }
  }
  function tick(now: number) {
    frame = 0;
    const elapsed = reducedMotion.matches ? 1 : Math.min(1, (now - layoutStart) / 420);
    const progress = 1 - (1 - elapsed) ** 3;
    let moving = false;
    for (const [key, node] of nodeViews) {
      if (node.exiting) {
        const exitProgress = reducedMotion.matches ? 1 : Math.min(1, (now - node.exitStart) / 150);
        node.opacity = node.fromOpacity * (1 - exitProgress);
        if (exitProgress === 1) { node.element.remove(); nodeViews.delete(key); edgeViews.get(key)?.remove(); edgeViews.delete(key); continue; }
        moving = true;
      } else {
        node.x = node.fromX + (node.point.x - node.fromX) * progress;
        node.y = node.fromY + (node.point.y - node.fromY) * progress;
        node.opacity = node.fromOpacity + (1 - node.fromOpacity) * progress;
        moving ||= elapsed < 1;
      }
      node.element.style.transform = `translate3d(${node.x}px, ${node.y}px, 0)`;
      node.element.style.opacity = String(node.opacity);
    }
    if (anchor) {
      const node = nodeViews.get(anchor.key);
      if (node) { camera.x = anchor.x + (anchor.endX - anchor.x) * progress - node.x * camera.z; camera.y = anchor.y + (anchor.endY - anchor.y) * progress - node.y * camera.z; destination = { ...camera }; }
      if (elapsed === 1) anchor = null;
    } else {
      const amount = reducedMotion.matches ? 1 : 1 - Math.exp(-Math.min(64, now - lastTime) / 65);
      camera.x += (destination.x - camera.x) * amount;
      camera.y += (destination.y - camera.y) * amount;
      camera.z += (destination.z - camera.z) * amount;
      const cameraMoving = Math.abs(destination.x - camera.x) > 0.05 || Math.abs(destination.y - camera.y) > 0.05 || Math.abs(destination.z - camera.z) > 0.0001;
      if (!cameraMoving) Object.assign(camera, destination);
      moving ||= cameraMoving;
    }
    lastTime = now;
    drawEdges(); drawCamera();
    if (moving) frame = requestAnimationFrame(tick);
  }
  function createNode(point: Point, origin: { x: number; y: number }, animate: boolean): NodeView {
    const element = document.createElement('div');
    element.className = `network-node network-node-${point.kind}`;
    element.dataset.key = point.key;
    Object.assign(element.style, { left: '0', top: '0', transform: `translate3d(${origin.x}px, ${origin.y}px, 0)`, opacity: animate ? '0' : '1' });
    const target = point.href ? document.createElement('a') : document.createElement('button');
    target.className = 'network-target';
    const dot = document.createElement('span'); dot.className = 'network-dot'; dot.setAttribute('aria-hidden', 'true');
    const label = document.createElement('span'); label.className = 'network-label';
    target.append(dot, label); element.append(target);
    if (point.paper) {
      if (point.paper.spotlight) {
        element.classList.add('is-spotlight');
        const star = document.createElement('span'); star.className = 'network-star'; star.textContent = '★'; star.setAttribute('aria-hidden', 'true'); target.append(star);
      }
      target.addEventListener('pointerenter', event => { if ((event as PointerEvent).pointerType !== 'touch') showPreview(target, point.paper!); });
      target.addEventListener('pointerleave', schedulePreviewHide);
      target.addEventListener('focus', () => showPreview(target, point.paper!));
      target.addEventListener('blur', schedulePreviewHide);
      target.addEventListener('click', event => {
        if ((event as PointerEvent).pointerType === 'touch') { event.preventDefault(); showPreview(target, point.paper!); }
      });
    } else if (point.count !== undefined) {
      const count = document.createElement('span'); count.className = 'network-count'; target.append(count);
    }
    nodes.append(element);
    return { point, element, target, label, x: origin.x, y: origin.y, opacity: animate ? 0 : 1,
      fromX: origin.x, fromY: origin.y, fromOpacity: animate ? 0 : 1, exiting: false, exitStart: 0 };
  }
  function rebuild(anchorKey?: string, fitAll = false) {
    hidePreview();
    const now = performance.now();
    const focused = document.activeElement;
    const focusedKey = focused instanceof Element ? focused.closest<HTMLElement>('.network-node')?.dataset.key : undefined;
    const anchoredNode = anchorKey ? nodeViews.get(anchorKey) : undefined;
    anchor = anchoredNode ? { key: anchorKey!, x: camera.x + anchoredNode.x * camera.z, endX: camera.x + anchoredNode.x * camera.z, y: camera.y + anchoredNode.y * camera.z, endY: camera.y + anchoredNode.y * camera.z } : null;
    destination = { ...camera };
    const layout = tree();
    const keys = new Set(layout.map(point => point.key));
    const animate = nodeViews.size > 0 && !reducedMotion.matches;
    for (const [key, node] of nodeViews) {
      if (keys.has(key) || node.exiting) continue;
      node.exiting = true; node.exitStart = now; node.fromOpacity = node.opacity;
      node.element.inert = true; node.element.setAttribute('aria-hidden', 'true'); node.element.style.pointerEvents = 'none';
    }
    for (const point of layout) {
      let node = nodeViews.get(point.key);
      if (!node) {
        const parent = point.parent && nodeViews.get(point.parent);
        node = createNode(point, animate && parent ? parent : point, animate); nodeViews.set(point.key, node);
      }
      node.fromX = node.x; node.fromY = node.y; node.fromOpacity = node.opacity;
      node.point = point; node.exiting = false;
      node.element.inert = false; node.element.removeAttribute('aria-hidden'); node.element.style.pointerEvents = '';
      node.label.textContent = point.label;
      if (!point.paper) node.target.title = point.label;
      const count = node.target.querySelector('.network-count');
      if (count) count.textContent = String(point.count);
      node.target.setAttribute('aria-label', point.accessibleLabel ?? point.label);
      if (node.target instanceof HTMLAnchorElement) node.target.href = point.href!;
      else {
        node.target.type = 'button'; node.target.onclick = point.action ?? null;
        if (point.expanded === undefined) node.target.removeAttribute('aria-expanded'); else node.target.setAttribute('aria-expanded', String(point.expanded));
      }
      if (point.parent) {
        let edge = edgeViews.get(point.key);
        if (!edge) {
          edge = document.createElementNS('http://www.w3.org/2000/svg', 'path'); edge.setAttribute('fill', 'none'); edge.setAttribute('vector-effect', 'non-scaling-stroke');
          edges.append(edge); edgeViews.set(point.key, edge);
        }
        edge.setAttribute('class', `network-edge${point.expanded || point.kind === 'paper' ? ' network-edge-active' : ''}`);
      }
    }
    bounds = { left: -155, top: Math.min(...layout.map(point => point.y)) - 35,
      right: Math.max(...layout.map(point => point.x + (point.kind === 'paper' ? 320 : 155))),
      bottom: Math.max(...layout.map(point => point.y + 40)) };
    const width = bounds.right - bounds.left, height = bounds.bottom - bounds.top;
    edges.setAttribute('viewBox', `${bounds.left} ${bounds.top} ${width} ${height}`);
    Object.assign(edges.style, { left: `${bounds.left}px`, top: `${bounds.top}px`, width: `${width}px`, height: `${height}px` });
    if (anchor) {
      const branch = layout.find(point => point.key === anchor!.key);
      if (branch?.expanded && branch.children.length) {
        const rightEdge = (point: Point): number => Math.max(point.x + (point.kind === 'paper' ? 320 : 155), ...point.children.map(rightEdge));
        const overflow = camera.x + rightEdge(branch) * camera.z - viewport!.clientWidth + 40;
        anchor.endX -= Math.max(0, overflow);
        anchor.endY = (viewport!.clientHeight - 60) / 2;
      }
    }
    layoutStart = animate ? now : now - 420;
    dirty = false;
    if (fitAll) showRestoredPath(!animate); else startFrame();
    if (focusedKey && !keys.has(focusedKey)) (nodeViews.get(anchorKey ?? '') ?? nodeViews.get('root'))?.target.focus({ preventScroll: true });
  }
  function fit(immediate = false) {
    anchor = null;
    const padding = viewport!.clientWidth < 600 ? 24 : 45;
    const z = clampZoom(Math.min((viewport!.clientWidth - padding * 2) / (bounds.right - bounds.left), (viewport!.clientHeight - 140) / (bounds.bottom - bounds.top)));
    destination = { z, x: viewport!.clientWidth / 2 - (bounds.left + bounds.right) / 2 * z,
      y: (viewport!.clientHeight - 60) / 2 - (bounds.top + bounds.bottom) / 2 * z };
    if (immediate || reducedMotion.matches) { Object.assign(camera, destination); drawCamera(); }
    startFrame();
  }
  function showRestoredPath(immediate: boolean) {
    const branch = [...openBranches].reverse().map(path => nodeViews.get(`branch:${path}`)).find(node => node && !node.exiting && node.point.children.length);
    if (!branch?.point.children.length) { fit(immediate); return; }
    anchor = null;
    const left = branch.point.x - 140;
    const right = Math.max(...branch.point.children.map(point => point.x + (point.kind === 'paper' ? 320 : 140)));
    const z = clampZoom(Math.min(1, (viewport!.clientWidth - 70) / (right - left), (viewport!.clientHeight - 120) / branch.point.span));
    destination = { x: viewport!.clientWidth / 2 - (left + right) / 2 * z, y: (viewport!.clientHeight - 60) / 2 - branch.point.y * z, z };
    if (immediate || reducedMotion.matches) { Object.assign(camera, destination); drawCamera(); }
    startFrame();
  }
  function releaseAnchor() { if (anchor) { anchor = null; destination = { ...camera }; } }
  function zoomAt(x: number, y: number, z: number) {
    hidePreview(); releaseAnchor();
    const worldX = (x - camera.x) / camera.z, worldY = (y - camera.y) / camera.z;
    destination = { z: clampZoom(z), x: x - worldX * clampZoom(z), y: y - worldY * clampZoom(z) };
    if (reducedMotion.matches) { Object.assign(camera, destination); drawCamera(); }
    startFrame();
  }
  function revealNode(key: string) {
    const node = nodeViews.get(key);
    if (!node || node.exiting || view !== 'graph') return;
    const left = camera.x + (node.point.x - (node.point.kind === 'paper' ? 10 : 150)) * camera.z;
    const right = camera.x + (node.point.x + (node.point.kind === 'paper' ? 315 : 150)) * camera.z;
    const top = camera.y + (node.point.y - 20) * camera.z;
    const bottom = camera.y + (node.point.y + 40) * camera.z;
    const margin = 24;
    const dx = left < margin ? margin - left : right > viewport!.clientWidth - margin ? viewport!.clientWidth - margin - right : 0;
    const dy = top < margin ? margin - top : bottom > viewport!.clientHeight - 90 ? viewport!.clientHeight - 90 - bottom : 0;
    if (!dx && !dy) return;
    releaseAnchor(); destination = { x: camera.x + dx, y: camera.y + dy, z: camera.z }; startFrame();
  }
  function syncList() {
    list.querySelectorAll<HTMLDetailsElement>('[data-branch]').forEach(details => {
      const datasetRoot = details.closest<HTMLElement>('[data-dataset-view]');
      const active = !datasetRoot || datasetRoot.dataset.datasetView === datasetMode;
      const branch = branches.get(details.dataset.branch!);
      details.hidden = !active || !branch || itemIds(branch.node).size === 0;
      details.open = openBranches.has(details.dataset.branch!);
      const count = details.querySelector<HTMLElement>(':scope > summary .network-count');
      if (count && branch) count.textContent = String(itemIds(branch.node).size);
    });
    list.querySelectorAll<HTMLElement>('[data-paper]').forEach(row => { row.hidden = spotlightOnly && row.dataset.spotlight !== 'true'; });
  }
  function setView(next: 'graph' | 'list') {
    hidePreview(); view = next; graph.hidden = view !== 'graph'; list.hidden = view !== 'list';
    document.querySelectorAll<HTMLButtonElement>('[data-map-view]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mapView === view)));
    if (view === 'graph') {
      viewportWidth = viewport!.clientWidth; viewportHeight = viewport!.clientHeight;
      rebuild(undefined, dirty || !nodeViews.size);
    } else { cancelAnimationFrame(frame); frame = 0; syncList(); }
  }
  list.addEventListener('click', event => {
    const details = (event.target as Element).closest('summary')?.parentElement;
    if (!(details instanceof HTMLDetailsElement) || !details.dataset.branch) return;
    event.preventDefault();
    toggleBranch(details.dataset.branch);
  });
  datasetSelect.addEventListener('change', () => {
    const mode = datasetSelect.value;
    datasetMode = mode === 'video' || mode === 'evaluation' ? mode : 'task';
    indexBranches();
    for (const path of openBranches) if (path.startsWith('datasets/')) openBranches.delete(path);
    openPath('datasets');
    save(); dirty = true;
    if (view === 'graph') rebuild('branch:datasets', true); else syncList();
  });
  document.querySelector<HTMLElement>('.network-filters')!.hidden = false;
  document.querySelectorAll<HTMLButtonElement>('[data-map-view]').forEach(button => button.addEventListener('click', () => setView(button.dataset.mapView === 'list' ? 'list' : 'graph')));
  document.querySelector('[data-map-spotlight]')?.addEventListener('click', event => {
    spotlightOnly = !spotlightOnly;
    (event.currentTarget as HTMLButtonElement).setAttribute('aria-pressed', String(spotlightOnly));
    save(); dirty = true;
    if (view === 'graph') rebuild(undefined, true); else syncList();
  });
  document.querySelector('[data-map-fit]')?.addEventListener('click', () => fit());
  document.querySelector('[data-map-reset]')?.addEventListener('click', () => { openBranches.clear(); save(); rebuild(undefined, true); });
  document.querySelectorAll<HTMLButtonElement>('[data-map-zoom]').forEach(button => button.addEventListener('click', () => zoomAt(viewport!.clientWidth / 2, viewport!.clientHeight / 2, destination.z * (button.dataset.mapZoom === 'in' ? 1.2 : 1 / 1.2))));
  viewport.addEventListener('wheel', event => {
    event.preventDefault();
    const rect = viewport.getBoundingClientRect();
    const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientHeight : 1);
    zoomAt(event.clientX - rect.left, event.clientY - rect.top, destination.z * Math.exp(-Math.max(-150, Math.min(150, delta)) * (event.ctrlKey ? 0.008 : 0.0025)));
  }, { passive: false });
  viewport.addEventListener('keydown', event => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (['+', '=', '-'].includes(event.key)) { event.preventDefault(); zoomAt(viewport.clientWidth / 2, viewport.clientHeight / 2, destination.z * (event.key === '-' ? 1 / 1.2 : 1.2)); }
    else if (event.key === '0') { event.preventDefault(); fit(); }
    else if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
      event.preventDefault(); releaseAnchor(); const step = event.shiftKey ? 150 : 70;
      destination.x += event.key === 'ArrowLeft' ? step : event.key === 'ArrowRight' ? -step : 0;
      destination.y += event.key === 'ArrowUp' ? step : event.key === 'ArrowDown' ? -step : 0;
      startFrame();
    }
  });
  viewport.addEventListener('focusin', event => {
    const key = (event.target as Element).closest<HTMLElement>('.network-node')?.dataset.key;
    if (key) revealNode(key);
  });

  const pointers = new Map<number, Pointer>();
  let gesture: { center: Pointer; distance: number; camera: Camera } | null = null;
  let moved = false;
  let suppressClickUntil = 0;
  function pointerPosition(event: PointerEvent): Pointer {
    const rect = viewport!.getBoundingClientRect(); return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }
  function pointerGeometry() {
    const [a, b] = [...pointers.values()];
    return b ? { center: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, distance: Math.max(1, Math.hypot(b.x - a.x, b.y - a.y)) }
      : { center: a, distance: 1 };
  }
  viewport.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if (!(event.target as Element).closest('.network-node-paper')) hidePreview();
    releaseAnchor(); destination = { ...camera };
    if (!pointers.size) moved = false;
    pointers.set(event.pointerId, pointerPosition(event));
    gesture = { ...pointerGeometry(), camera: { ...camera } };
    if (!(event.target as Element).closest('.network-node')) viewport.setPointerCapture(event.pointerId);
    if (pointers.size > 1) moved = true;
  });
  window.addEventListener('pointermove', event => {
    if (!pointers.has(event.pointerId) || !gesture) return;
    pointers.set(event.pointerId, pointerPosition(event));
    const current = pointerGeometry();
    if (!moved && Math.hypot(current.center.x - gesture.center.x, current.center.y - gesture.center.y) < 5) return;
    hidePreview(); moved = true; viewport!.classList.add('network-dragging');
    if (!viewport!.hasPointerCapture(event.pointerId)) viewport!.setPointerCapture(event.pointerId);
    const z = pointers.size > 1 ? clampZoom(gesture.camera.z * current.distance / gesture.distance) : gesture.camera.z;
    const worldX = (gesture.center.x - gesture.camera.x) / gesture.camera.z;
    const worldY = (gesture.center.y - gesture.camera.y) / gesture.camera.z;
    Object.assign(camera, { z, x: current.center.x - worldX * z, y: current.center.y - worldY * z });
    destination = { ...camera }; drawCamera(); startFrame();
  });
  function endPointer(event: PointerEvent) {
    if (!pointers.delete(event.pointerId)) return;
    if (moved) suppressClickUntil = performance.now() + 150;
    if (pointers.size) gesture = { ...pointerGeometry(), camera: { ...camera } };
    else { gesture = null; viewport!.classList.remove('network-dragging'); }
  }
  window.addEventListener('pointerup', endPointer); window.addEventListener('pointercancel', endPointer);
  viewport.addEventListener('lostpointercapture', endPointer);
  viewport.addEventListener('click', event => {
    if (event.detail && performance.now() < suppressClickUntil) { event.preventDefault(); event.stopPropagation(); }
  }, true);
  window.addEventListener('hashchange', () => { restore(); if (view === 'graph') rebuild(undefined, true); else syncList(); });
  new ResizeObserver(() => {
    if (view !== 'graph' || !viewport.clientWidth || !viewport.clientHeight) return;
    const dx = (viewport.clientWidth - viewportWidth) / 2, dy = (viewport.clientHeight - viewportHeight) / 2;
    camera.x += dx; camera.y += dy; destination.x += dx; destination.y += dy;
    if (anchor) { anchor.x += dx; anchor.endX += dx; anchor.y += dy; anchor.endY += dy; }
    viewportWidth = viewport.clientWidth; viewportHeight = viewport.clientHeight; drawCamera();
  }).observe(viewport);
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) { Object.assign(camera, destination); layoutStart = performance.now() - 420; startFrame(); } });
  restore(); setView(matchMedia('(max-width: 700px)').matches ? 'list' : 'graph');
}
initializeNetwork();
if (import.meta.hot) import.meta.hot.accept(() => window.location.reload());
export {};
