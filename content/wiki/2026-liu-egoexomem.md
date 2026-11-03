---
year: 2026
venue: "arXiv preprint"
affiliations: [Karlsruhe Institute of Technology, ETH Zurich, University of Oxford, Hunan University, "INSAIT, Sofia University ‘St. Kliment Ohridski’"]
research_groups: [kit-cvhci]
reviewed: false
tags: [video-qa, video-retrieval, spatial-understanding, egocentric-video]
---

# EgoExoMem: Cross-View Memory Reasoning over Synchronized Egocentric and Exocentric Videos

EgoExoMem tests complementary ego/exo evidence, while E²-Select allocates a limited frame budget across views according to the question.

**Authors:** Ruiping Liu, Junwei Zheng, Yufan Chen, Di Wen, Shaofang Quan, Chengzhi Wu, Jiaming Zhang, Kailun Yang, Kunyu Peng, Rainer Stiefelhagen.
**Paper:** [PDF](../raw/2026-liu-egoexomem.pdf)
**Website:** Not found in checked sources.
**Code:** [Official repository](https://github.com/RuipingL/EgoExoMem)
**Source version:** arXiv 2605.18734v2, 8 July 2026. No conference or journal publication was verified.

![EgoExoMem / E²-Select: Figure 3 from the paper](../assets/2026-liu-egoexomem.png)

*Figure 3 from the original paper ([PDF page 5](../raw/2026-liu-egoexomem.pdf#page=5)).*

## Problem and contribution

A wearable view reveals nearby manipulations but can miss other people or the wider scene. A fixed camera offers complementary context. EgoExoMem contributes about 2,600 human-checked questions across eight temporal, spatial and activity categories, plus a training-free retrieval baseline (§§3–4).

The setting is one synchronized ego stream and one exo stream, not shared memory across many camera wearers. Source videos average approximately 111 seconds for LEMMA and 425 seconds for Ego-Exo4D. The term memory therefore should not imply multi-day retention (§3.1).

## Approach

Videos are sampled at one frame per second. CLIP measures question relevance within each view. Relative relevance allocates a total 32-frame budget between ego and exo streams. A per-view k-DPP selector balances relevance with diversity, then timestamp sorting combines the selected frames for a frozen multimodal language model (§4).

Stored candidate embeddings and timestamps support query-dependent selection. The method does not build persistent object histories or train a new memory model. It accesses complete supplied recordings offline. Questions are generated from source annotations, edited by three annotators and filtered with a text-only model (§3.3).

## Evidence and limits

With InternVL3.5, E²-Select achieves 56.3% versus 50.7% for uniform dual-view concatenation. With Gemini 2.5 Flash, the corresponding comparison is 58.2% versus 55.3%. These are separate same-backbone comparisons, not a single improvement from 50.7% to 58.2% (Table 4).

Some questions remain answerable from either view alone. The text-only filtering threshold is below 45% per type, still above four-choice chance, and does not establish freedom from language shortcuts. No significance estimates accompany small improvements. Candidate selection has quadratic dependence on frame count, with no shift-long or many-camera cost evaluation (§§3.3, 4–5).

Benchmark and baseline resources are public, but a fully packaged E²-Select reproduction was not established from the release. Recorded-video testing provides no evidence of operational worker assistance.

## Research connections

- **Builds on:** [[2024-grauman-ego-exo4d]] — reuses synchronized recordings and annotations (§3.1, ref. 26).
- **Compares with:** [[2026-kim-ma-egoqa]] — evaluates an adapted EgoMAS memory baseline in its dual-view setting (Table 3, ref. 42).
- **Compares with:** [[2026-yeo-worldmm]] — evaluates a multimodal memory baseline under the supplied frame budget (Table 3, ref. 104).

## Relevance to Aligned

Our interpretation: useful for deciding when a worker camera needs another viewpoint and how to divide a visual budget. Persistent identity tracking, causal ingestion and construction-quality evidence remain separate requirements.

## Human notes
