# Aligned Research Atlas

An English literature review for Aligned, with thematic chapters and individual publication pages. The visual references are [Aligned](https://www.aligned.company/) and [RL Handbook](https://rl-handbook.com): a graphite introduction, quiet typography, a warm reading background, and a smoothly expanding research map. The homepage has a single-column table of contents. Reading pages have a chapter sidebar and a section outline.

## Run locally

Requires Node.js 24 (tested with 24.14.0) and pnpm 10.33.0, as recorded in `package.json`.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://127.0.0.1:4321. If the port is occupied, Astro prints the selected address. Normal builds do not access the parent repository or wiki. This project folder is self-contained.

```sh
pnpm check             # TypeScript and search tests
pnpm test:translation  # Translation structure, links, figures, tables, and numbers
pnpm build             # Static site in dist/
pnpm test:links        # All local routes, images, and anchors in the build
pnpm verify            # All checks, production build, and local link validation
pnpm preview           # Preview the built site
```

## Features

- Navigation: overview and contents (`/`), a Reading entry point (`/chapters/problem-statement/`), a separate research map (`/map/`), and a paper catalog (`/papers/`). Full-text search opens from the search button, with complete results at `/library/`.
- The research map has five roots: Methods, Robotics, Datasets & Benchmarks, Surveys & Studies, and Systems & Business Solutions. Methods has five broad areas, with deeper branches only for memory and assessment. Every one of the 175 publications is reachable through its primary placement or introduced resources. Semantic-memory references deliberately share three mixed-memory papers. Of the 107 introduced resources, 98 general resources can be grouped by task, video type or evaluation format, with access protocols shown separately. Nine robot resources remain grouped by task under Robotics and carry the same facet metadata. Eight products/reference platforms come from the wiki business catalog. Counts are unique items within a branch. Publications, resources and products are separate items, so branch counts do not sum to the publication inventory and overlapping groups are not additive. Pan and zoom the recursive graph or use its list view. Branches, dataset grouping and Spotlight persist in the URL, legacy links are retained, and reduced-motion preferences disable animation.
- Paper previews appear on hover or keyboard focus, with a short description, publication year, venue, and contribution type. A tap opens the preview on touch screens. Gold stars identify the wiki’s 11 Spotlight priorities, with their rationale and an optional Spotlight-only filter. The current selection is the user's November 3 list, imported from the wiki manifest into both the catalog and map. Superseded selections stay in the wiki's history. Spotlight records research priorities and does not imply human review or a conference award. Branches show navigation categories, not claims of scientific lineage.
- The map opens as a graph on desktop and a readable list on narrow screens. Both views are available on the same page. The list also works without JavaScript.
- An introductory Problem statement within Foundations and representations, 11 thematic chapters, two appendices, 175 publication pages, 56 chapter figures, and 161 wiki-note illustrations.
- Papers includes all 161 wiki notes plus 14 review-only publications (175 total). Full-text search covers complete notes and review excerpts. Filter by topic, year, chapter, review coverage, and wiki Spotlight. Sort by newest/oldest year or most/least citations, with unavailable counts always last. Queries, filters and sorting persist in the URL. `⌘K` / `Ctrl+K` searches the whole site.
- Publication details and catalog cards show dated OpenAlex cited-by snapshots. The November 3 snapshot has 168 verified counts and three explicitly unavailable entries. SAM 3 and three survey additions have separately checked November 4 counts, bringing the current inventory to 172 verified counts and three unavailable entries. Paper headers contain only Original publication and Read chapter resource links. Authors, affiliations, source qualifications, project/code/data links and citations share one consistent details layout. Counts are imported from the wiki and are not fetched live during builds or browsing.
- All publications have contribution types before topic tags: dataset, benchmark, method, survey and empirical-study. Types can overlap and are searchable with the Papers topic filter. Dataset/benchmark tags identify introducing contributions, not use of another paper's data. Classifications, including the 14 review-only publications, originate in the wiki.
- Chapter outlines, section links, previous/next navigation, and links from discussions to publication pages.
- Figure enlargement, horizontally scrolling tables, light and dark themes, and print styles.
- Copy links and mark chapters as read. Reading marks and theme preferences stay in the current browser.

## Content and limitations

At the author’s request, the site uses the **last fully checked review snapshot** from November 2, 2026, SHA-256:

```text
a4f563815095741a13d7325dcb5fed219b553087a36523f45fa5e861c9360557
```

Unfinished parallel additions about continuous monitoring were not imported. The original review Markdown was not modified. The wiki’s later illustration additions are imported separately from the reviewed chapter snapshot. The snapshot is in `content/review.original.md`, with its exact-import report in `content/import-report.json`.

Chapter 2 was subsequently rewritten locally on November 3 at the author's request. Its 38 publications were assessed for usefulness to Aligned, with core methods explained in detail and secondary work reduced to one paragraph of 2–4 sentences without figures. The English revision is approximately 4,800 words with six figures. Relevance decisions, primary-source locations, preserved section anchors, and the revised structural baseline are recorded in `content/en/chapter-revisions/archive.json`. The original Russian chapter and imported review remain unchanged.

The reviewed subset contains 123 records with discussions, three bibliographic data-source records, and one historical DTGL record. These are **127 publications, not 127 detailed method reviews**. The full catalog adds 48 wiki-only publications for 175 total. The research map covers all 175, while the reviewed chapters retain their original scope. Different VideoAgent and VideoRAG papers remain separate. Where several methods share a discussion, their pages show that shared passage with an explicit note and links to the related papers. TGML results are not attributed to DTGL.

The complete website is in English, including chapter text, paper discussions, figure captions, search, and source notes. The active content lives in `content/en/`. Russian originals remain in `content/chapters/` and `content/notes/` for comparison. The bilingual problem statement is presented once in English. Published research figures retain their original form. Downloadable source audit records preserve their evidence, with local machine paths replaced by project-relative paths or `local-sources/` references. These references document original locations and do not imply that the original files are included.

For the 161 wiki-backed publications, paper pages render the complete imported Markdown note, source qualifications, and linked research connections. Links lead to relevant review discussions where available. The 14 publications without wiki notes continue to use chapter excerpts. Empty Human notes sections are hidden, and human review status is preserved in Publication details. Legacy Russian section anchors are preserved alongside English anchors, so previously shared chapter links still work.

PDF files are represented by links to original publications from the checked local registers. Roughly 1 GB of PDFs is not duplicated in this project. Some addresses lead to publisher pages rather than directly to PDFs. Inapplicable `#page` fragments were removed from those links. External server availability was not rechecked during the website translation. Figures are stored within the project, with captions and attribution.

## Edit or add content

Always complete and verify the wiki stage first, then synchronize this website. The neighboring `aligned-wiki/` is the single source of truth for research notes, publication metadata, citation counts and their evidence, including the 14 bibliographic citation records without standalone wiki notes. The website keeps generated copies for portable builds. Do not repair those copies independently or publish a local synchronization without the user's instruction.

Primary files:

```text
content/en/chapters/*.md      English chapters and appendices
content/en/chapters.json      Chapter order, titles, groups, and routes
content/en/papers.json        Reviewed publications and discussion locations
content/wiki/*.md            Exact wiki note snapshots
content/wiki-papers.json      Wiki inventory, metadata, topics, source links, and image provenance
content/citation-counts.json  Generated dated citation snapshots for every publication
content/publication-types.json  Generated contribution types for every publication
public/media/wiki/*.png       Imported primary figures
content/en/notes/             English source notes
content/en/notes.json         Notes that become pages
content/en/heading-aliases.json  Current section IDs mapped to legacy IDs
content/paper-metadata.json   Publication year, venue, authors, affiliations, resource links, and provenance
content/table-references.json  Exact benchmark/method aliases mapped to paper or primary-source URLs
content/map-topics.json       Recursive research branches, primary placement and explicit shared references
content/map-resources.json    Imported wiki resource inventory and independent classification facets
content/map-solutions.json    Imported wiki business-catalog snapshot
content/map-legacy.json       Published map IDs mapped to current branches
content/map-papers.json       Sourced summaries and wiki Spotlight reasons (displayed types come from publication-types.json)
content/source-map.json       Local sources mapped to external URLs
public/media/                Figures
src/lib/content.ts           Groups, rendering, outlines, and search data
src/styles/global.css        Visual styles
```

**Import wiki updates:** run `pnpm sync:wiki`, update the map for any new papers, then run `pnpm verify`. The manual importer reads the neighboring `aligned-wiki/`, copies every paper note and its illustration, imports every citation snapshot from the wiki manifest, and checks identity collisions. This neighboring directory is the local source wiki, not a second clone of this website repository despite its GitHub name. Normal builds remain self-contained. New wiki notes appear in Papers without requiring a chapter. Add a sourced preview to `content/map-papers.json` and a primary placement in `content/map-topics.json` for each new method, survey or study. Dataset-only publications are reached through their introduced resources. Maintain resource classifications and product snapshots in the wiki’s `raw/map-resources.json` and `raw/map-solutions.json`, then import them with `pnpm sync:wiki`. The importer verifies resource names and introducing publications against the canonical contribution register. Map tests require full publication coverage, distinct resource identities, and explicit shared references. Keep the wiki as the source of these notes. Original Markdown downloads retain wiki-relative links and are intended for use within that wiki directory structure. Commit and push synchronized updates only when publication is requested. The hosted build never imports from the local wiki, and chapter text is updated separately.

**New paper in an existing chapter:** add a subsection to the English Markdown, then a record in `content/en/papers.json`. Use a unique slug, title, year, source, and `locations` with the exact subsection heading. `chapters` defines topic links. Add the corresponding metadata record in `content/paper-metadata.json`, including `year`, `venue`, `authors`, `affiliations`, `links`, `sourceNote`, and `metadataStatus`. Leave unknown fields empty rather than inferring them. For the research map, add a sourced summary to `content/map-papers.json` and a primary research placement or canonical introduced resource. Displayed contribution types come from the imported wiki register. Do not infer spotlight status from publication venue or human review status. The catalog, map, paper page, and search update during the build.

```json
{
  "slug": "2027-author-method",
  "title": "Full paper title",
  "shortTitle": "Method",
  "year": 2027,
  "sourceUrls": ["https://example.org/paper"],
  "chapters": ["archive"],
  "headingTitles": ["Method: subsection title"],
  "locations": [{"chapter": "archive", "headingTitle": "Method: subsection title"}],
  "coverage": "discussion"
}
```

The unnumbered `/chapters/problem-statement/` page reads `content/en/notes/problem_statement.md` directly. The former `/notes/problem_statement/` route redirects there.

**New chapter:** add Markdown and a record in `content/en/chapters.json`. Array order determines the reading sequence. The group must exist in `groups` in `src/lib/content.ts`. The chapter automatically appears in reading navigation and search. The methods map has its own task taxonomy and contains paper nodes rather than chapters.

**Figures:** add a PNG under `public/media/` and reference `/media/...png`. Before each build, `sync-media.mjs` updates image dimensions to prevent layout shifts while reading.

**Stable links:** retain published paper and chapter slugs. Explicit `paper-*` and `chapter-*` anchors are preserved. Automatic section URLs depend on headings. Inserting new headings does not affect existing aliases. When renaming a heading, update its key in `content/en/heading-aliases.json` and keep its previously published English ID as an explicit anchor.

The translation check compares the translated snapshot against its Russian source, except for the explicitly rewritten Chapter 2, which is checked against its English editorial baseline. The chapter-revision tests additionally enforce publication coverage, short-entry length, the chapter length and figure budgets, and preserved published anchors. Intentional content additions require an explicit update to the relevant baseline or the check. Do not treat a structural check as a scientific revalidation of new claims.

## Publication metadata and table links

Publication headers show the publication year and venue. Original publication and Read chapter sit together with the available code, project, or data links. Authors, affiliations, source versions, and resource limitations are under Publication details. Only one original-publication button is displayed. The review text keeps its own explicitly inspected PDF version, which can differ from a later publication year.

The metadata snapshot covers all 127 papers: 113 wiki notes and 14 explicit fallbacks from checked sources. `python3 scripts/import-paper-metadata.py` refreshes this file from the neighboring wiki and the documented fallbacks. This is a manual import, not part of a portable site build. It does not modify the wiki. Keep `sourceNote`, source-version notes, and link-specific qualifications when editing metadata.

Table links use an explicit alias registry. Existing citations and code spans stay intact. Ambiguous names such as bare VideoAgent and VideoRAG are not automatically assigned to one paper. New aliases must point to the correct method or dataset, rather than a paper that merely evaluates on it.

The Back link returns to the page that opened the paper, preserving catalog filters, map branches, or the originating chapter section/table row. Paper links carry a local `from` context, with a same-origin referrer fallback. Direct visits fall back to Papers. Read chapter always opens the paper's primary discussion.

## Reimporting the original review

This is a separate manual operation, **not part of the build**. It requires the neighboring `docs/` and `aligned-wiki/` directories and replaces the imported Russian chapters and publication register. Preserve local edits before reimporting.

```sh
python3 scripts/import-review.py --source /absolute/path/to/approved-review.md
```

Even for a snapshot stored elsewhere, relative references resolve from `docs/research/`, the original document’s location. Inspect `content/import-report.json`, especially `unresolved_links`, and check new publications. Do not silently use an evolving draft as the publication source.

Translate and review the changed text before updating the active English edition. `scripts/sync-english.mjs` is the one-time translation migration helper. It maps headings by their original order and regenerates English metadata and legacy aliases. It is not run during normal builds and will replace metadata if invoked. Do not run it against chapters whose structures have independently diverged.

## Deployment

The site uses [Astro](https://docs.astro.build/en/guides/deploy/vercel/) and produces plain HTML, CSS, and JavaScript. Its source repository is [lubludrova/aligned-wiki](https://github.com/lubludrova/aligned-wiki). The website files are at the repository root, even though the local checkout is named `literature-review/`.

Import this existing repository at [vercel.com/new](https://vercel.com/new) with these settings:

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Root Directory | Repository root (`./`) |
| Production branch | `main` |
| Node.js | `24.x`, enforced by `package.json` |
| Install Command | `pnpm install --frozen-lockfile` |
| Build Command | `pnpm verify` |
| Output Directory | `dist` |
| Environment variables | None required |

The install, build, and output settings are already recorded in `vercel.json`. No server adapter, database, local wiki, or original PDFs are needed. `pnpm verify` checks types, tests, translation structure, and the production build's internal links before a deployment can succeed. GitHub Actions runs the same checks on pushes to `main` and pull requests from a standalone checkout.

After connecting the repository, Vercel deploys pushes to `main` to production and creates previews for other branches. The GitHub push alone does not create a Vercel project. Connect a custom domain after the first deployment if desired. Vercel Hobby is for personal, non-commercial use. Select a suitable paid plan for company use, following [Vercel's plan terms](https://vercel.com/docs/plans/hobby).

On Vercel, the root `middleware.js` requires HTTP Basic authentication before serving pages and static resources, including JSON, Markdown downloads and images. Credentials are defined in that middleware. Rejected requests return `401` with a browser login challenge and `Cache-Control: no-store`. Verify the deployed site with missing, incorrect and correct credentials. Ordinary Astro development/preview servers do not execute this Vercel routing middleware.

Source PDFs are represented by external links and retain their source host's access rules. The source wiki, research workspace, dependency directories, build output, screenshots, local verification artifacts, and environment files are excluded from this repository. When manually reimporting an audit register, replace machine-specific paths before committing the resulting public copy.

Any static host supporting directory `index.html` files and `404.html` can also serve the generated `dist/` folder, but must provide its own authentication because the access check above runs on Vercel.
