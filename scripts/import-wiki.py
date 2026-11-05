#!/usr/bin/env python3
"""Copy the Aligned paper wiki into a portable, provenance-bearing site snapshot.

Run manually after updating the wiki. The source wiki is read only. Markdown bytes
are preserved, source illustrations are copied into public/media/wiki, and the
JSON register supplies metadata, image hashes and public PDF targets.
Normal site builds use this snapshot and do not require the neighboring wiki.
"""

import csv
import hashlib
import importlib.util
import json
import re
from collections import defaultdict
from pathlib import Path
from urllib.parse import unquote, urlparse

SITE = Path(__file__).resolve().parents[1]
WIKI = SITE.parent / 'aligned-wiki'
OUTPUT = SITE / 'content/wiki'
REGISTER = SITE / 'content/wiki-papers.json'
CITATIONS = SITE / 'content/citation-counts.json'
PUBLICATION_TYPES = SITE / 'content/publication-types.json'
PAPER_TAGS = SITE / 'content/paper-tags.json'
MAP_RESOURCES = SITE / 'content/map-resources.json'
MAP_SOLUTIONS = SITE / 'content/map-solutions.json'
MAP_DESCRIPTIONS = SITE / 'content/map-papers.json'
MEDIA = SITE / 'public/media/wiki'
spec = importlib.util.spec_from_file_location('paper_metadata', SITE / 'scripts/import-paper-metadata.py')
metadata_import = importlib.util.module_from_spec(spec)
spec.loader.exec_module(metadata_import)


def list_field(front, key):
    match = re.search(r'^' + key + r':(.*?)(?=\n[a-z_]+:|\Z)', front, re.M | re.S)
    assert match, f'Missing list: {key}'
    value = match[1].strip()
    if value.startswith('['):
        return [metadata_import.scalar(item) for item in next(csv.reader([value[1:-1]], skipinitialspace=True))]
    return [metadata_import.scalar(item) for item in re.findall(r'^\s*-\s+(.*)$', value, re.M)]


def identities(urls):
    result = set()
    for url in urls:
        arxiv = re.search(r'arxiv\.org/(?:abs|pdf)/(\d{4}\.\d{4,5})(?:v\d+)?', url)
        if arxiv:
            result.add('arxiv:' + arxiv[1])
        parsed = urlparse(url)
        if parsed.hostname in ('doi.org', 'dx.doi.org'):
            result.add('doi:' + unquote(parsed.path.lstrip('/')).lower())
    return result


def main():
    paths = sorted((WIKI / 'wiki').glob('*.md'))
    index = (WIKI / 'index.md').read_text()
    names = dict((slug, name) for name, slug in re.findall(r'\[([^\]]+)\]\(wiki/([^/)]+)\.md\)', index))
    assert set(names) == {path.stem for path in paths}, 'Wiki index and note inventory differ'
    manifest = json.loads((WIKI / 'raw/manifest.json').read_text())
    type_register = WIKI / manifest['publication_types']['registry']
    assert hashlib.sha256(type_register.read_bytes()).hexdigest() == manifest['publication_types']['registry_sha256'], 'Publication-type registry hash mismatch'
    type_records = json.loads(type_register.read_text())['papers']
    citation_records = manifest['citation_counts']['papers']
    citation_snapshots = {}
    archived = {entry['file']: entry for entry in manifest['papers']}
    spotlight_selection = manifest['full_review']['spotlight']
    spotlight = {Path(entry['note']).stem: entry for entry in spotlight_selection['works']}
    assert len(spotlight) == len(spotlight_selection['works']) == spotlight_selection['count'], 'Duplicate or inconsistent Spotlight selection'
    assert set(spotlight) <= set(names), 'Spotlight contains a missing wiki note'
    review = json.loads((SITE / 'content/en/papers.json').read_text())
    existing_metadata = json.loads((SITE / 'content/paper-metadata.json').read_text())
    records = {}
    OUTPUT.mkdir(exist_ok=True)
    for path in paths:
        data = path.read_bytes()
        text = data.decode('utf8')
        front = text.split('---', 2)[1]
        heading = re.search(r'^# (.+)$', text, re.M)
        assert heading, f'Missing title: {path.name}'
        intro = text[heading.end():].split('\n## ', 1)[0].strip()
        header_start = re.search(r'^\*\*Authors:', intro, re.M)
        assert header_start, f'Missing metadata header: {path.name}'
        summary = intro[:header_start.start()].strip()
        header = intro[header_start.start():].strip()
        metadata = metadata_import.from_wiki(path)
        # Retain qualifications recorded during the earlier metadata migration.
        if previous_note := existing_metadata.get(path.stem, {}).get('publicationNote'):
            metadata['publicationNote'] = previous_note
        # A few notes have explicit data resources in addition to code/project links.
        seen = {entry['url'] for entry in metadata['links']}
        for key in ('Data', 'Dataset'):
            for entry in metadata_import.header_links(metadata_import.field(header, key), key):
                if entry['url'] not in seen:
                    metadata['links'].append(entry)
                    seen.add(entry['url'])
        source_links = {}
        images = []
        for href in re.findall(r'\]\(([^)]+)\)', text):
            if href.startswith(('http://', 'https://', 'mailto:', '#')):
                continue
            relative, _, fragment = href.partition('#')
            if relative == f'../assets/{path.stem}.png':
                image = (WIKI / 'assets' / f'{path.stem}.png').read_bytes()
                assert image.startswith(b'\x89PNG\r\n\x1a\n'), f'Invalid source PNG: {relative}'
                MEDIA.mkdir(parents=True, exist_ok=True)
                (MEDIA / f'{path.stem}.png').write_bytes(image)
                public_path = f'/media/wiki/{path.stem}.png'
                source_links[href] = public_path
                images.append({'sourcePath': relative, 'publicPath': public_path, 'sha256': hashlib.sha256(image).hexdigest()})
                continue
            assert relative.startswith('../raw/') and relative.endswith('.pdf'), f'Unknown local source: {path.name}: {href}'
            url = archived[Path(relative).name]['source_url']
            assert url.startswith(('https://', 'http://')), f'Non-public PDF source: {path.name}'
            source_links[href] = url.split('#')[0] + '#' + fragment if fragment else url
        assert len(images) == 1, f'Expected one source illustration: {path.name}'
        source_urls = list(dict.fromkeys([
            archived[path.stem + '.pdf']['source_url'],
            *[match[2] for match in metadata_import.LINK.finditer(metadata_import.field(header, 'Paper'))],
        ]))
        reviewed = re.search(r'^reviewed:\s*(true|false)\s*$', front, re.M)
        assert reviewed, f'Missing human review status: {path.name}'
        citation = citation_records[path.stem]
        citation_line = re.findall(r'^\*\*Citations:\*\* (.+)$', text, re.M)
        assert len(citation_line) == 1, f'Expected one citation line: {path.name}'
        assert citation['provider'] in citation_line[0] and citation['checked'] in citation_line[0], f'Citation source/date mismatch: {path.name}'
        if citation['status'] == 'verified':
            assert citation_line[0].startswith(f"{citation['count']} ("), f'Citation count mismatch: {path.name}'
            assert citation['url'] in citation_line[0], f'Citation record mismatch: {path.name}'
        else:
            assert citation['count'] is None and 'Unavailable' in citation_line[0], f'Unavailable citations must not become zero: {path.name}'
        citation_snapshots[path.stem] = {
            key: citation[key] for key in ('count', 'provider', 'checked', 'url', 'status', 'reason') if key in citation
        }
        record = {
            'title': heading[1], 'shortTitle': names[path.stem], 'summary': summary,
            'year': metadata['year'], 'sourceUrls': source_urls, 'metadata': metadata,
            'tags': list_field(front, 'tags'), 'researchGroups': list_field(front, 'research_groups'),
            'reviewed': reviewed[1] == 'true', 'spotlight': path.stem in spotlight,
            'sourceLinks': source_links, 'sourceHeaderMarkdown': header, 'images': images,
            'sourceSha256': hashlib.sha256(data).hexdigest(),
        }
        assert record['tags'] == type_records[path.stem]['tags'], f'Wiki tags and contribution register differ: {path.name}'
        if path.stem in spotlight:
            record.update({
                'spotlightReason': spotlight[path.stem]['reason'],
                'spotlightLimit': spotlight[path.stem]['limit'],
                'spotlightSource': 'aligned-wiki/raw/manifest.json#/full_review/spotlight',
            })
        records[path.stem] = record
        (OUTPUT / path.name).write_bytes(data)
    assert {path.stem for path in OUTPUT.glob('*.md')} == set(records), 'Stale snapshot files require explicit review'
    for slug in records:
        for target in re.findall(r'\[\[([^\]]+)\]\]', (OUTPUT / f'{slug}.md').read_text()):
            assert target.split('|')[0].split('#')[0] in records, f'Unresolved wiki connection: {slug}: {target}'
    # Report shared publication identities, including renamed notes, before merging.
    by_identity = defaultdict(set)
    by_title = defaultdict(set)
    for slug, record in records.items():
        for identity in identities(record['sourceUrls'] + [link['url'] for link in record['metadata']['links']]):
            by_identity[identity].add(slug)
        by_title[re.sub(r'\W+', '', record['title']).lower()].add(slug)
    for paper in review:
        for identity in identities(paper['sourceUrls']):
            by_identity[identity].add(paper['slug'])
        by_title[re.sub(r'\W+', '', paper['title']).lower()].add(paper['slug'])
    duplicates = {key: sorted(slugs) for key, slugs in by_identity.items() if len(slugs) > 1}
    title_duplicates = [sorted(slugs) for slugs in by_title.values() if len(slugs) > 1]
    REGISTER.write_text(json.dumps(records, ensure_ascii=False, indent=2) + '\n')
    review_slugs = {paper['slug'] for paper in review}
    for slug in sorted(review_slugs - set(records)):
        citation = citation_records[slug]
        citation_snapshots[slug] = {
            key: citation[key] for key in ('count', 'provider', 'checked', 'url', 'status', 'reason') if key in citation
        }
    assert set(citation_snapshots) == review_slugs | set(records), 'Citation snapshot and publication inventory differ'
    CITATIONS.write_text(json.dumps(citation_snapshots, ensure_ascii=False, indent=2) + '\n')
    assert set(type_records) == review_slugs | set(records), 'Contribution types and publication inventory differ'
    PUBLICATION_TYPES.write_text(json.dumps({slug: record['types'] for slug, record in type_records.items()}, ensure_ascii=False, indent=2) + '\n')
    PAPER_TAGS.write_text(json.dumps({slug: record['tags'] for slug, record in type_records.items()}, ensure_ascii=False, indent=2) + '\n')
    # Research classifications originate in the wiki, just like paper metadata.
    resource_bytes = (WIKI / 'raw/map-resources.json').read_bytes()
    resource_register = json.loads(resource_bytes)
    expected_resources = {(slug, name) for slug, record in type_records.items() for name in record['resources']}
    actual_resources = {(entry['publication'], entry['title']) for entry in resource_register['resources']}
    assert actual_resources == expected_resources, 'Map resource inventory differs from the introducing-publication register'
    assert len({entry['id'] for entry in resource_register['resources']}) == len(actual_resources), 'Duplicate map resource IDs'
    MAP_RESOURCES.write_bytes(resource_bytes)
    MAP_SOLUTIONS.write_bytes((WIKI / 'raw/map-solutions.json').read_bytes())
    map_descriptions = json.loads(MAP_DESCRIPTIONS.read_text())
    for slug, description in map_descriptions.items():
        description['spotlight'] = slug in spotlight
        if slug in spotlight:
            description['spotlightReason'] = records[slug]['spotlightReason']
            description['spotlightSource'] = records[slug]['spotlightSource']
        else:
            description.pop('spotlightReason', None)
            description.pop('spotlightSource', None)
    MAP_DESCRIPTIONS.write_text(json.dumps(map_descriptions, ensure_ascii=False, indent=2) + '\n')
    # This supporting proposal is canonical wiki content, outside the paper inventory.
    proposal = (WIKI / 'research-architecture.md').read_text()
    proposal = re.sub(r'^# .+\n', '', proposal, count=1)
    proposal = proposal.replace('](https://aligned-wiki.vercel.app/', '](/')
    for slug in re.findall(r'\]\(wiki/([^/)]+)\.md\)', proposal):
        assert slug in records, f'Unknown proposal publication: {slug}'
        proposal = proposal.replace(f'](wiki/{slug}.md)', f'](/papers/{slug}/)')
    proposal_media = SITE / 'public/media/research-architecture'
    proposal_media.mkdir(parents=True, exist_ok=True)
    for name in re.findall(r'\]\(assets/research-architecture/([^/)]+\.svg)\)', proposal):
        (proposal_media / name).write_bytes((WIKI / 'assets/research-architecture' / name).read_bytes())
        proposal = proposal.replace(f'](assets/research-architecture/{name})', f'](/media/research-architecture/{name})')
    (SITE / 'content/en/chapters/research-architecture.md').write_text(proposal)
    print(json.dumps({
        'wikiNotes': len(records), 'reviewPapers': len(review),
        'sameSlugOverlap': len(set(records) & review_slugs),
        'wikiOnly': len(set(records) - review_slugs),
        'mergedInventory': len(set(records) | review_slugs),
        'spotlight': len(spotlight), 'humanReviewed': sum(record['reviewed'] for record in records.values()),
        'pdfMappings': sum(sum(href.startswith('../raw/') for href in record['sourceLinks']) for record in records.values()),
        'images': sum(len(record['images']) for record in records.values()),
        'duplicateIdentityCandidates': duplicates, 'duplicateTitleCandidates': title_duplicates,
    }, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
