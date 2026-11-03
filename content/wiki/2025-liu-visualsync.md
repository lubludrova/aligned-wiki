---
year: 2025
venue: "NeurIPS"
affiliations: ["University of Illinois Urbana-Champaign"]
research_groups: []
reviewed: false
tags: [method, spatial-understanding, video-representation]
---

# VisualSync: Multi-Camera Synchronization via Cross-View Object Motion

Estimates globally consistent camera time offsets from cross-view tracks of moving points.

**Authors:** Shaowei Liu, David Yifan Yao, Saurabh Gupta, Shenlong Wang.
**Paper:** [PDF](../raw/2025-liu-visualsync.pdf)
**Website:** [Project website](https://stevenlsw.github.io/visualsync/)
**Code:** [GitHub repository](https://github.com/stevenlsw/visualsync)
**Source version:** arXiv:2512.02017v1, 1 December 2025, NeurIPS 2025 paper.
**Citations:** 1 ([OpenAlex](https://openalex.org/W4416969208), checked 2026-11-03).

![VisualSync multi-camera synchronization using object motion](../assets/2025-liu-visualsync.png)

*Figure 1. VisualSync multi-camera synchronization using object motion. Source: [original paper, PDF p. 1](../raw/2025-liu-visualsync.pdf#page=1).*

## Problem and contribution

Independently recorded views cannot be fused reliably when their clocks disagree. VisualSync estimates a constant offset for each video without supplied camera poses or hardware synchronization. It uses the fact that matched moving points satisfy epipolar constraints only when observations refer to the same physical instant (§3).

## Approach

Overlapping videos → camera poses, dynamic masks and point tracks → pairwise temporal offsets → globally consistent timestamps (Fig. 3, PDF p. 4).

VGGT estimates camera geometry. Grounded-SAM/DEVA identify and track moving regions, CoTracker3 follows points within each view, and MASt3R matches them across views. Discrete search minimizes geometric inconsistency for each camera pair. Unreliable pairs are filtered, then robust least squares reconciles the remaining offsets. This is offline preprocessing, not a causal detector or a persistent event-identity system (§§3.2–4.1).

## Evidence and limits

Evaluation uses roughly ten-second overlapping subsequences from four datasets, with artificial cropping to create offsets. On EgoHumans, Table 1 reports 46.6 ms median and 122.1 ms mean error. The same table gives 77.8 ms median on 3D-POP, so a blanket “below 50 ms across datasets” claim is unsupported. Several baselines win individual metrics (§4.1, PDF p. 7).

Runtime is substantial: the reported 15-view, 200-frame CMU setup takes about 3.3 hours on one A6000. Pairwise processing scales quadratically. Some reliable camera poses and shared dynamic evidence are necessary, and the method does not handle varying playback speeds (§4.3 and limitations, PDF pp. 9–10).

## Research connections

- **Builds on:** VGGT, MASt3R and CoTracker3 supply geometry, cross-view correspondence and temporal tracks (§3.2).
- **Compares with:** Sync-NeRF and adaptations of Uni4D and MASt3R, with ground-truth-camera inputs explicitly marked (Tables 1–2).

## Relevance to Aligned

Our interpretation: a reference for estimating clock offsets before merging helmet observations. Test it on overlapping site clips and evaluate downstream erroneous event merges. It does not resolve repeated installations, clock drift over shifts or worker identity, and is not evidence of affordable synchronization across a full site.

## Human notes
