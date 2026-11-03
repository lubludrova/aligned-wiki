---
year: 2026
venue: "WACV"
affiliations: ["University of Texas at Austin"]
research_groups: [ut-austin-vision]
reviewed: false
tags: [state-changes, spatial-understanding, egocentric-video]
---

# SPOC: Spatially-Progressing Object State Change Segmentation in Video

SPOC segments object regions that still need transformation versus regions already transformed, enabling spatial estimates of activity progress.

**Authors:** Priyanka Mandikal, Tushar Nagarajan, Alex Stoken, Zihui Xue, Kristen Grauman.
**Paper:** [PDF](../raw/2026-mandikal-spoc.pdf)
**Website:** [Project website](https://vision.cs.utexas.edu/projects/spoc-spatially-progressing-osc/)
**Code:** [Dataset and visualization utilities](https://github.com/priyankamandikal/spoc)
**Source version:** arXiv:2503.11953v2, 23 December 2025, including Appendices A–F. The publication venue and year are WACV 2026.

![SPOC: Figure 3 from the paper](../assets/2026-mandikal-spoc.png)

*Figure 3 from the original paper ([PDF page 5](../raw/2026-mandikal-spoc.pdf#page=5)).*

## Problem and contribution

During chopping, intact and chopped material coexist. A single frame-level state label cannot locate what remains to be processed. SPOC defines actionable and transformed regions, introduces WhereToChange annotations, and learns region-state classification from automatically generated labels (§§1, 3–4).

## Approach

Input is video plus the known action and object category. Grounding DINO detects the object, SAM generates masks, and DeAOT propagates them. CLIP compares masked regions with LLM-generated descriptions of the two states. Thresholds also identify background and uncertain regions. Across each track, ordering constraints remove reversals from transformed to actionable and resolve uncertain labels using temporal proximity (§§3.2–3.3).

A separate model per action combines local CLIP mask features and global DINOv2 frame features, adds mask/time embeddings, and passes them through a Transformer and classifier. Cross-entropy training uses refined pseudo-labels. Output assigns each proposed mask to actionable, transformed or background. Training samples 16-frame windows. This is a clip-based formulation, with no demonstrated causal streaming protocol (§3.4, Appendix C.1).

About 17,000 instructional clips supply training data without manually drawn training masks. However, pseudo-label thresholds are selected by IoU grid search, whose independent calibration split is not specified (Appendix D).

## Evidence and limits

Mean IoU reaches 0.502 on WTC-HowTo, versus 0.427 for SAM plus GPT-4o. On egocentric WTC-VOST it drops to 0.267 (Table 2). Transition-only frames score 0.332, exposing difficulty when states coexist (Table 3).

A single proposal covering both states cannot receive different labels. Tracking also fails under deformation and head motion. Novel objects are tested within known actions, while unseen actions require retraining (Appendix F). Evaluation excludes ambiguous clips (Appendix B).

The actionable-area fraction produces more monotonic progress curves than VIP and LIV, but these are offline video measurements, without robot policy training or physical-system evaluation (§5.3, Appendix E).

## Research connections

- **Builds on:** [[2024-xue-vidosc]] — extends HowToChange data and VLM state pseudo-labeling to tracked spatial regions (§§3.2, 4).
- **Compares with:** [[2023-ma-vip]] — evaluates goal-image distance as an alternative progress signal (§5.3, Table 4).

## Relevance to Aligned

Our interpretation: spatially localized remaining work could complement procedural progress on physical tasks. Construction transfer needs new state definitions and robust proposals. Visible transformation alone cannot establish dimensional accuracy, safety or workmanship quality.

## Human notes
