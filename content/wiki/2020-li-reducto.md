---
year: 2020
venue: "ACM SIGCOMM"
affiliations: ["University of California, Los Angeles"]
research_groups: []
reviewed: false
tags: [method, efficient-processing, video-representation]
---

# Reducto: On-Camera Filtering for Resource-Efficient Real-Time Video Analytics

Adapts inexpensive on-camera frame filtering to query-specific accuracy targets and changing video content.

**Authors:** Yuanqi Li, Arthi Padmanabhan, Pengzhan Zhao, Yufei Wang, Guoqing Harry Xu, Ravi Netravali.
**Paper:** [PDF](../raw/2020-li-reducto.pdf)
**Website:** Not found in checked sources.
**Code:** [GitHub repository](https://github.com/reducto-sigcomm-2020/reducto)
**Source version:** Author-hosted 18-page SIGCOMM 2020 paper, DOI 10.1145/3387514.3405874.
**Citations:** 272 ([OpenAlex](https://openalex.org/W3046256272), checked 2026-11-03).

![Reducto camera and server processing pipeline](../assets/2020-li-reducto.png)

*Figure 4. Reducto camera and server processing pipeline. Source: [original paper, PDF p. 5](../raw/2020-li-reducto.pdf#page=5).*

## Problem and contribution

Filtering frames after transmission wastes network capacity, while neural filters may exceed camera compute budgets. Reducto uses cheap low-level frame differences on the camera and adapts their thresholds to query accuracy and scene changes (§§2–4).

## Approach

Server profiling and a query → selected differencing feature and threshold table → camera-side filtering → server inference on retained frames (Fig. 4).

The server chooses pixel, edge or area differences and clusters observed differences into query-specific threshold settings. The camera buffers short segments, selects a matching threshold and sends informative frames. Previously computed results stand in for skipped frames. Out-of-profile segments are sent without filtering and used to retrain the table. Raw frames can still be archived locally for future questions (§4.1).

The implementation handles tagging, counting and bounding-box detection. It explicitly does not support activity-detection queries carrying state across frames. Multiple simultaneous queries are discussed as an extension, not the evaluated implementation.

## Evidence and limits

Evaluation replays recordings from seven surveillance cameras through constrained camera hardware or a VM and a GPU server, including live network links. Reference outputs normally come from YOLO, so accuracy means agreement with that detector rather than independently annotated real-world truth (§5.1).

At a 90% query-accuracy target, Figure 10 reports median filtering of 51–97% across the evaluated query/object combinations. This is not guaranteed rare-defect recall. Results concern people and cars under surveillance views. One-second segment buffering trades decision delay for stable thresholds, and object-based filtering cannot establish correctness of an unseen procedural step (§§4.1, 5.2).

## Research connections

- **Compares with:** NoScope, Glimpse and other video-analytics optimizations to assess filtering and resource trade-offs (§5).
- **Cites:** retrospective archive-query systems as motivation for retaining untransmitted raw frames (§4.1).

## Relevance to Aligned

Our interpretation: evaluate cheap ingestion filtering before expensive visual inference, while preserving original evidence. Helmet motion, tiny defects and changing query vocabularies require new validation. Keep inference sampling distinct from footage deletion, and constrain filtering by event-level misses and alert delay rather than teacher agreement alone.

## Human notes
