---
year: 2025
venue: "NeurIPS"
affiliations: ["Cornell University"]
research_groups: [cornell-hariharan]
reviewed: false
tags: [dataset, benchmark, method, state-changes, spatial-understanding, egocentric-video]
---

# Tracking and Understanding Object Transformations

TubeletGraph recovers object fragments missed by tracking and connects their masks, transformation timestamps and descriptions in a state graph.

**Authors:** Yihong Sun, Xinyu Yang, Jennifer J. Sun, Bharath Hariharan.
**Paper:** [PDF](../raw/2025-sun-tubeletgraph.pdf)
**Website:** [Project website](https://tubelet-graph.github.io/)
**Code:** [GitHub repository](https://github.com/YihongSun/TubeletGraph)
**Source version:** arXiv:2511.04678v2, 13 January 2026, including Appendix A. The publication venue and year are NeurIPS 2025.
**Citations:** 2 ([OpenAlex](https://openalex.org/W4416027219), checked 2026-11-03).

![TubeletGraph object tracking and state graph construction](../assets/2025-sun-tubeletgraph.png)

*Figure 2. TubeletGraph object tracking and state graph construction. Source: [original paper, PDF p. 5](../raw/2025-sun-tubeletgraph.pdf#page=5).*

## Problem and contribution

A tracker may follow an apple while losing newly cut pieces. Track Any State asks for all resulting tracks plus the transformations connecting them. TubeletGraph converts this into searching among short object tracks, called tubelets, rather than rediscovering missing pixels directly. VOST-TAS adds transformation annotations to VOST for evaluating this joint task (§§1, 3.1, 4).

## Approach

Input is a complete video and an initial target-object mask. CropFormer partitions the first frame into entities, and SAM2.1 tracks each entity forward. New entity masks in insufficiently covered regions initiate additional tubelets (§3.2).

Candidate tubelets join the target only if they overlap plausible SAM2 masks at emergence and have sufficiently similar masked CLIP features. Semantic matching compares earlier target appearances with candidate appearances across later frames, so this is an offline pipeline. GPT-4.1 then sees contour-marked initial and emergence frames, names the transformation and resulting objects, and supplies descriptions for graph nodes and edges (§§3.3–3.4).

The components remain pretrained without task-specific model training. Proximity and semantic thresholds are calibrated on VOST's training split and reused across datasets. Outputs are masks and state graphs, not an action policy (§4).

## Evidence and limits

On VOST, mean mask IoU improves from SAM2.1's 48.4 to 50.9, and final-quarter IoU improves from 32.4 to 36.7 (Table 2). VOST-TAS contains 57 video instances and 108 transformations. Temporal recall is 20.4%, while only 6.5% satisfy the combined temporal, all-object spatial and semantic criteria (Table 3).

High description accuracy is conditional on successful localization, with GPT-4.1 also serving as semantic evaluator (Appendix A.2). Transformation detection depends on recovering a missed track, so changes tracked correctly may be missed as events. Occlusion can confuse object naming, and false-positive base tracks propagate into the graph (Appendix A.5). Constructing the partition costs about seven seconds per frame on one RTX A6000, excluding any claim of live operation (§4.3).

## Research connections

- **Cites:** [[2024-xue-vidosc]] — contrasts temporal stage localization with joint transformation tracking (§2.2).
- **Cites:** [[2026-mandikal-spoc]] — discusses spatially progressing state segmentation, citing its 2025 preprint (§2.2, reference 26).
- **Builds on:** SAM 2, Ravi et al. — propagates entity masks and supplies candidate masks for recovery (§3).

## Relevance to Aligned

Our interpretation: preserving material identity through cutting, separating or assembling could ground a work-history record. Low event recall, expensive processing and unverified quality criteria currently limit it to exploratory analysis of recordings.

## Human notes
