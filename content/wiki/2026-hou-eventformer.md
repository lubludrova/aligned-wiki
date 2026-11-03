---
year: 2026
venue: "ECIR 2026"
affiliations: ["CAS Key Laboratory of AI Security, Institute of Computing Technology, Chinese Academy of Sciences", "CAS Key Laboratory of Network Data Science and Technology, Institute of Computing Technology, Chinese Academy of Sciences", "University of Chinese Academy of Sciences"]
research_groups: []
reviewed: false
tags: ["video-retrieval", "video-representation", "efficient-processing"]
---

# Event-Aware Video Corpus Moment Retrieval

Indexes event representations to retrieve candidate videos, then localizes query-relevant intervals within those candidates.

**Authors:** Danyang Hou, Liang Pang, Yanyan Lan, Huawei Shen, Xueqi Cheng (published 2026 version). The archived 2024 preprint lists Danyang Hou, Liang Pang, Huawei Shen and Xueqi Cheng.
**Paper:** [PDF](../raw/2026-hou-eventformer.pdf) · [Primary record](https://link.springer.com/chapter/10.1007/978-3-032-21289-4_1)
**Website:** Not found in checked sources.
**Code:** [Author repository](https://github.com/hdy007007/eventformer)
**Source version:** The year/venue and five-author list follow the ECIR 2026 publisher record. The archived and read source is arXiv:2402.13566v1 (21 February 2024), 11 pages, with four authors and the affiliations above. Final-paper methods/tables were not available for comparison. The unfinished ACM template in the preprint does not establish a 2018 publication.

![EventFormer: Figure 2 from the paper](../assets/2026-hou-eventformer.png)

*Figure 2 from the original paper ([PDF page 4](../raw/2026-hou-eventformer.pdf#page=4)).*

## Problem and contribution

Corpus moment retrieval must select both the right video and its relevant temporal interval. Maximum similarity to individual frames can ignore event continuity. EventFormer groups consecutive visual features into events and learns hierarchical frame/event representations for a two-stage pipeline (§3 of the archived preprint).

## Approach

Video features and subtitles → event reasoning and hierarchical encoder → reusable video/event representations. Query encoding retrieves the top ten videos, then a query-conditioned localizer predicts start/end frames (Figs. 2, 4).

Event boundaries use contrastive convolution, temporally constrained clustering or fixed windows. Anchor attention restricts different heads to different neighborhood sizes. The retriever uses frame- and event-level contrastive objectives. The localizer receives event-level auxiliary supervision, but uses frame outputs for inference because precise boundaries require finer resolution (§§3.3–3.5).

This is supervised corpus retrieval on available recordings, not autonomous stream segmentation or persistent object memory. Subtitles remain a separate retrieval modality.

## Evidence and limits

In the archived preprint, Table 8 reports 31 MB of stored retrieval vectors and 43 ms top-ten video retrieval for the clustering variant on TVR validation, versus 161 MB and 88 ms for ReLoCLNet. EventFormer localization adds 103 ms. These are component measurements, excluding raw video decoding, index construction and answer generation.

Table 3 reports TVR-test VCMR R@1 at IoU 0.7 of 11.11. That is a specific temporal retrieval metric, not answer accuracy. Event extraction strategies behave differently across datasets (§4.2), so segmentation is not universally solved.

[?] The final ECIR PDF is inaccessible in this check. Do not transfer preprint numbers to the final version without comparison. The publisher-linked repository resolves but is empty, so executable reproduction was not verified.

## Research connections

- **Builds on:** [[2020-lei-tvr]] supplies the TVR benchmark and XML comparison (§4.1, Tables 2–3).
- **Compares with:** ReLoCLNet, HERO and CONQUER (§4).

## Relevance to Aligned

Our interpretation: a useful separation between reusable corpus indexing and precise query-dependent evidence localization. Add site/person/time filters and compare total ingestion cost. Neither multi-camera event identity nor construction-quality reasoning follows from the retrieval results.

## Human notes
