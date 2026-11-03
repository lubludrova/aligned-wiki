---
year: 2026
venue: "ECCV"
affiliations: ["Allen Institute for AI", "University of Washington", "Woven by Toyota", "Microsoft"]
research_groups: []
reviewed: false
tags: [dataset, benchmark, method, video-representation, state-changes, spatial-understanding]
---

# Synthetic Visual Genome 2: Extracting Large-scale Spatio-Temporal Scene Graphs from Videos

SVG2 scales temporal object–attribute–relation annotations and trains TraSeR to decode structured video graphs from object-aligned visual trajectories.

**Authors:** Ziqi Gao, Jieyu Zhang, Wisdom Oluchi Ikezogwo, Jae Sung Park, Tario G You, Daniel Ogbu, Chenhao Zheng, Weikai Huang, Yinuo Yang, Winson Han, Quan Kong, Rajat Saini, Ranjay Krishna.
**Paper:** [PDF](../raw/2026-gao-svg2.pdf)
**Website:** [Project website](https://uwgzq.github.io/papers/SVG2/)
**Code:** [GitHub repository](https://github.com/uwGZQ/SVG2)

**Source version:** arXiv:2602.23543v3, 6 March 2026. ECCV 2026 acceptance confirmed by the official repository announcement dated 23 July 2026.
**Citations:** 0 ([OpenAlex](https://openalex.org/W7133186495), checked 2026-11-03).

![SVG2 / TraSeR: Figure 2 from the paper](../assets/2026-gao-svg2.png)

*Figure 2 from the original paper ([PDF page 4](../raw/2026-gao-svg2.pdf#page=4)).*

## Problem and contribution

Video captions often omit persistent identities, changing attributes and explicit relation intervals. SVG2 targets this representation gap through automatic data synthesis and a graph parser that preserves both object-level context and local temporal evidence (§§3–4).

## Approach

The annotation pipeline combines SAM2 panoptic masks, discovery of newly appearing objects and a second offline tracking pass. DAM describes object trajectories, GPT-4.1-nano parses names/attributes, SAM3 verifies object-label support and GPT-5 extracts timestamped spatial and nonspatial relations (§3.1, Appendix A).

TraSeR builds on Qwen2.5-VL-3B. Mask-aligned tokens are grouped by object identity. One resampler summarizes entire trajectories while another preserves short temporal windows. The language model decodes a structured graph. Training mixes the synthetic dataset with human-annotated segmentation and relation datasets (§§4.1–4.3). Both global trajectory aggregation and the replayed tracking stage use complete-video context, so this is an offline extraction/teacher candidate, not a live causal system.

## Evidence and limits

SVG2 contains approximately 636K videos. Human checks on 1.2K object trajectories, 2K attributes and 1.1K relations yield 93.8%, 88.3% and 85.4% correctness respectively. These are sampled annotation checks, not guarantees over all synthetic data (§3.1).

Crucially, the main graph benchmark supplies ground-truth trajectories. Under lenient semantic matching and temporal IoU 0.5, TraSeR obtains VidOR relation recall 25.0 versus GPT-5's 21.7 (Table 2, §5). Generated trajectories are used in the separate QA experiment, where GPT-4.1 improves from 66.8 to 71.4 on 500 Perception-Test questions (Table 5). Training uses eight H100s, but no complete extraction throughput is established. Public project links identify code, data and model artifacts.

## Research connections

- **Builds on:** SAM2, Ravi et al. (2024) — supplies mask propagation, extended with automatic object discovery and offline consistency refinement (§3.1, Appendix A.1).
- **Builds on:** Panoptic Video Scene Graph Generation, Yang et al. (2023) — provides a temporal panoptic representation and evaluation benchmark (§§2, 5).

## Relevance to Aligned

Our interpretation: A strong reference for the daily-report evidence layer and for generating training labels: identities, attributes and relation intervals survive beyond a single caption. For construction, preserve source crops and uncertainty because synthetic predicates, occlusion errors and oracle-trajectory evaluations do not establish dependable safety facts.

## Human notes

