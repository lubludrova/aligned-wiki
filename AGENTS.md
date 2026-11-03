# Website workflow

Read README.md before changing this website.

The neighboring `../aligned-wiki/` is the canonical source for research notes, publication metadata, citation counts and their provenance. Complete and verify changes in that wiki first, following its AGENTS.md and README.md, then run `pnpm sync:wiki` here.

Do not independently edit imported notes in `content/wiki/`, `content/wiki-papers.json`, `content/citation-counts.json`, or `content/publication-types.json`. The importer regenerates them from the wiki, including citation and contribution-type records for review-only publications. Website presentation and navigation changes may be made here, using the synchronized data.

After synchronization, update map placement for newly ingested notes and run `pnpm verify`. Keep changes local unless the user explicitly requests publication.

Spotlight membership and reasons in `content/map-papers.json` are also imported from the wiki manifest. Change the canonical wiki selection first and run the importer. Preserve independently authored map summaries and contribution kinds.
