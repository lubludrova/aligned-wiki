---
year: 2018
venue: "OSDI"
affiliations: ["Carnegie Mellon University", "Microsoft", "University of Wisconsin", "ETH Zürich"]
research_groups: []
reviewed: false
tags: [method, video-retrieval, efficient-processing, video-representation]
---

# Focus: Querying Large Video Datasets with Low Latency and Low Cost

Focus divides object-class video search between inexpensive ingestion and selective expensive verification at query time.

**Authors:** Kevin Hsieh, Ganesh Ananthanarayanan, Peter Bodik, Shivaram Venkataraman, Paramvir Bahl, Matthai Philipose, Phillip B. Gibbons, Onur Mutlu.
**Paper:** [PDF](../raw/2018-hsieh-focus.pdf) · [Proceedings](https://www.usenix.org/conference/osdi18/presentation/hsieh)
**Website:** Not found in checked sources beyond the proceedings page.
**Code:** Not found in checked sources.
**Source version:** OSDI 2018 author-hosted proceedings manuscript, 18 pages, downloaded unchanged from Microsoft Research. Earlier arXiv abstracts report different speedups and author lists.
**Citations:** 127 ([OpenAlex](https://openalex.org/W2784041417), checked 2026-11-03).

![Focus video ingestion and query pipeline](../assets/2018-hsieh-focus.png)

*Figure 4. Focus video ingestion and query pipeline. Source: [original paper, PDF p. 5](../raw/2018-hsieh-focus.pdf#page=5).*

## Problem and contribution

Running an expensive detector on every incoming frame makes ingestion costly. Waiting until a question arrives makes answers slow. Focus explicitly trades these costs while targeting precision and recall relative to a chosen expensive detector (§§1, 3).

## Approach

Video frames → cheap specialized CNN → object features and approximate top-K class index → candidate clusters → expensive query-time classification → matching frames (Figure 4).

The ingestion model is compressed and specialized for frequent classes in a stream. An OTHER class preserves candidates for less frequent categories. Incremental clustering groups visually similar object appearances, and the index records several plausible classes instead of only the highest-scoring one. At query time, the expensive model classifies candidate cluster representatives and propagates their labels to members (§§4.1–4.3).

A stream tuner samples expensive-model outputs, rejects configurations that miss the requested fidelity target, and selects a point on the ingestion/query-cost trade-off. Ingestion, tuning and query processing can run on separate machines (§§4.4–5). The output is a set of frames for a class query, optionally restricted by camera and time, not an event narrative.

## Evidence and limits

Evaluation uses traffic, surveillance and news videos. YOLOv2 outputs over its supported classes serve as the reference truth (§§2.2, 6). Consequently, matching the reference detector is not independently established recognition accuracy. Clustering can reduce both precision and recall, and unfamiliar camera conditions can invalidate specialization assumptions (§4.3).

The work supports class-conditioned search, not arbitrary procedural predicates, multi-camera instance identity or subtle workmanship assessment. Its benchmark speedups must not be transferred to modern VLM workloads without measuring decoding, indexing and verification together.

## Research connections

- **Compares with:** Kang et al., *NoScope* (2017) — a specialized neural-network query baseline (§6).

## Relevance to Aligned

Our interpretation: use the explicit ingestion/query budget and selective verification pattern when estimating a multi-week archive. Preserve original footage and separately evaluate rare-defect recall before applying aggressive clustering.

## Human notes
