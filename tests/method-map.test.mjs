import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = file => JSON.parse(readFileSync(new URL(`../content/${file}`, import.meta.url), 'utf8'));
const topics = read('map-topics.json'), details = read('map-papers.json');
const slugs = [...new Set([...read('en/papers.json').map(paper => paper.slug), ...Object.keys(read('wiki-papers.json'))])].sort();

const resourceRegister = read('map-resources.json');
const resources = resourceRegister.resources;
const types = read('publication-types.json');
const solutions = read('map-solutions.json').solutions;
const branches = [];
function visit(node) { branches.push(node); node.children.forEach(visit); }
topics.forEach(visit);

test('the research map preserves the approved hierarchy and every publication', () => {
  assert.deepEqual(topics.map(topic => topic.id), ['methods', 'robotics', 'datasets', 'research-surveys', 'systems']);
  assert.deepEqual(topics[0].children.map(node => node.id), ['perception', 'memory-construction', 'retrieval', 'qa', 'assessment']);
  const primary = branches.flatMap(node => node.papers);
  assert.equal(new Set(branches.map(node => node.id)).size, branches.length);
  assert.equal(new Set(primary).size, primary.length, 'one primary placement per publication');
  const covered = new Set([...primary, ...resources.map(resource => resource.publication)]);
  assert.deepEqual([...covered].sort(), slugs, 'include mixed method/resource contributions and resource-only papers');
  const expectedPrimary = slugs.filter(slug => types[slug].some(type => ['method', 'survey', 'empirical-study'].includes(type)));
  assert.deepEqual([...primary].sort(), expectedPrimary);
  const shared = branches.flatMap(node => node.relatedPapers ?? []);
  assert(shared.every(slug => primary.includes(slug)), 'shared references must have a primary home');
  assert.deepEqual([...shared].sort(), ['2026-chen-em2mem', '2026-long-m3-agent', '2026-yeo-worldmm']);
  assert(branches.find(node => node.id === 'robot-memory').papers.includes('2025-anwar-remembr'));
  assert(branches.find(node => node.id === 'retrieval').papers.includes('2026-tian-ego-r1'), 'RL retrieval is not robot learning');
  assert(branches.find(node => node.id === 'qa').papers.includes('2025-chen-gelm'), 'grounded QA stays in QA');
});

test('resource facets are complete, source-backed, and distinct from publication types', () => {
  assert.equal(resources.length, 107);
  assert.equal(new Set(resources.map(item => item.id)).size, resources.length);
  assert.equal(new Set(resources.map(item => item.title)).size, resources.length);
  for (const resource of resources) {
    assert(slugs.includes(resource.publication), resource.title);
    assert(resource.summary && resource.evidence, resource.title);
    assert(resource.roles.length > 0 && resource.roles.every(role => ['dataset', 'benchmark'].includes(role)), resource.title);
    assert(resource.roles.every(role => types[resource.publication].includes(role)), resource.title);
    for (const facet of ['tasks', 'videoTypes', 'evaluationFormats', 'accessProtocols']) {
      assert(resource[facet].length > 0, `${resource.title}: ${facet}`);
      assert.equal(new Set(resource[facet]).size, resource[facet].length, `${resource.title}: duplicate ${facet}`);
      assert(resource[facet].every(value => typeof value === 'string' && value.length > 0));
    }
    assert.equal(typeof resource.robotics, 'boolean');
    assert(resource.sourceUrls.length > 0 && resource.sourceUrls.every(url => /^https:\/\//.test(url)), resource.title);
  }
  const introducing = slugs.filter(slug => types[slug].some(type => ['dataset', 'benchmark'].includes(type)));
  assert.deepEqual([...new Set(resources.map(item => item.publication))].sort(), introducing);
  const training = resources.find(item => item.title === 'RoboReward training data');
  const evaluation = resources.find(item => item.title === 'RoboRewardBench');
  assert(!training.roles.includes('benchmark'), 'training data do not inherit the paper benchmark type');
  assert(evaluation.roles.includes('benchmark'));
  assert(training.robotics && evaluation.robotics);
  const vantage = resources.find(item => item.title === 'VANTAGEBench');
  assert(vantage && !vantage.videoTypes.some(type => /^egocentric\b/i.test(type)), 'VANTAGE camera setting must follow the detailed note');
  assert(resources.find(item => item.title === 'EgoSafetyBench').robotics);
  assert(resourceRegister.taxonomySources.some(source => source.url === 'https://arxiv.org/html/2609.31713v1'));
});

test('resource regrouping preserves identity and robot separation', () => {
  for (const robotics of [false, true]) {
    const selected = resources.filter(resource => resource.robotics === robotics);
    const expected = selected.map(resource => resource.id).sort();
    for (const facet of ['tasks', 'videoTypes', 'evaluationFormats']) {
      const groups = new Map();
      for (const resource of selected) for (const label of resource[facet]) {
        groups.set(label, [...(groups.get(label) ?? []), resource.id]);
      }
      assert.deepEqual([...new Set([...groups.values()].flat())].sort(), expected);
      const ids = [...groups.keys()].map(title => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
      assert.equal(new Set(ids).size, ids.length, 'facet labels must not produce colliding graph IDs');
    }
  }
});

test('business solutions resolve to sourced external entries', () => {
  const referenced = branches.flatMap(node => node.solutions ?? []);
  assert.deepEqual([...referenced].sort(), solutions.map(item => item.id).sort());
  assert.equal(solutions.length, 8);
  for (const solution of solutions) {
    assert.match(solution.url, /^https:\/\//);
    assert(solution.summary && solution.limitations && solution.kind);
  }
});

test('every publication retains a sourced preview and canonical contribution types', () => {
  assert.deepEqual(Object.keys(details).sort(), slugs);
  for (const [slug, item] of Object.entries(details)) {
    assert(item.summary.length > 30 && item.summary.length <= 250, slug);
    assert(item.summarySource);
    assert(types[slug]?.length > 0);
  }
  for (const slug of ['2026-liang-capmem', '2026-kim-ma-egoqa', '2026-li-egoerrorvqa']) {
    assert(!types[slug].includes('method'), `${slug}: do not use stale map preview kinds`);
  }
});

test('spotlight matches the user-selected wiki shortlist across the map and catalog', () => {
  const expected = ['2025-chavan-indego', '2026-choi-merit', '2026-kim-ma-egoqa', '2026-wang-s-ember', '2026-huang-apm-bench', '2026-guo-aem', '2026-wen-provia', '2026-chaudhari-ledger', '2026-lee-carve', '2026-yeo-worldmm', '2026-chalk-whareformer'];
  const wiki = read('wiki-papers.json');
  assert.deepEqual(Object.keys(details).filter(slug => details[slug].spotlight).sort(), expected.sort());
  assert.deepEqual(Object.keys(wiki).filter(slug => wiki[slug].spotlight).sort(), expected.sort());
  for (const slug of slugs) {
    assert.equal(details[slug].spotlight, wiki[slug]?.spotlight || false, slug);
    if (!details[slug].spotlight) {
      assert.equal(details[slug].spotlightReason, undefined, `${slug}: stale Spotlight reason`);
      assert.equal(details[slug].spotlightSource, undefined, `${slug}: stale Spotlight source`);
    }
  }
  for (const slug of expected) {
    assert.equal(details[slug].spotlightReason, wiki[slug].spotlightReason);
    assert.equal(details[slug].spotlightSource, wiki[slug].spotlightSource);
    assert.match(details[slug].spotlightSource, /manifest\.json/);
  }
});
