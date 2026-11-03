---
year: 2025
venue: "CVPR"
affiliations: ["ReLER, CCAI, Zhejiang University", "ReLER, AAII, University of Technology Sydney"]
research_groups: []
reviewed: false
tags: [method, video-representation, spatial-understanding, state-changes]
---

# DiffVsgg: Diffusion-Driven Online Video Scene Graph Generation

DiffVsgg updates object–relation scene graphs causally by conditioning a latent diffusion model on earlier graph predictions.

**Authors:** Mu Chen, Liulei Li, Wenguan Wang, Yi Yang.
**Paper:** [PDF](../raw/2025-chen-diffvsgg.pdf)
**Website:** Not found in checked sources.
**Code:** [GitHub placeholder](https://github.com/kagawa588/DiffVsgg)

**Source version:** arXiv:2503.13957v1, 18 March 2025, including supplementary material. CVPR 2025 acceptance confirmed by the official repository.
**Citations:** 7 ([OpenAlex](https://openalex.org/W4413156276), checked 2026-11-03).

![DiffVSGG offline and diffusion-based online scene graph generation](../assets/2025-chen-diffvsgg.png)

*Figure 1. DiffVSGG offline and diffusion-based online scene graph generation. Source: [original paper, PDF p. 1](../raw/2025-chen-diffvsgg.pdf#page=1).*

## Problem and contribution

Many video scene-graph systems aggregate a completed sequence before predicting relationships. DiffVsgg instead treats each new frame as a graph update, combining spatial reasoning with prior relational state (§3).

## Approach

An object detector supplies regions, categories and features. Subject, union-region and positional features form a padded matrix of object-pair embeddings. A diffusion model denoises this matrix, with the previous frame's denoised graph acting as conditioning. Motion cues derived from relative box positions supplement the update. Readout heads produce object classes, boxes and relation labels (§§3.2–3.3).

Training uses ground-truth objects and scene graphs, first learning denoising and then task-specific heads. Inference uses observed current/past frames, without a user query. The output is a sequence of relational graphs, not natural-language retrieval. Persistent worker identity across cameras and explicit long-duration event aggregation are not demonstrated.

## Evidence and limits

On Action Genome under graph constraints, full scene-graph detection reaches recall@50 45.5 and mean recall@50 26.2, compared with STTran's 37.0 and 22.2. These are detection results, distinct from much higher predicate-classification scores that receive oracle objects (Table 1). Additional VidVRD experiments broaden the relation setting (Supplement §2).

Table 8 reports 8.7 fps, but the checked source does not establish the hardware or full camera/feature-extraction cost scope. Main-text ablation selects 20 diffusion steps, whereas supplement testing instructions mention 50, leaving a reproducibility discrepancy. Long-tail predicate bias and diffusion cost remain limitations. The official repository currently says Code Coming soon, so it is a method reference rather than a ready implementation (Supplement §§1, 6–7).

## Research connections

- **Builds on:** Action Genome, Ji et al. (2020) — supplies supervised object–relation annotations and the primary benchmark (§4.1).
- **Compares with:** STTran and TEMPURA — evaluates temporal scene-graph baselines under the same constrained/unconstrained protocols (Tables 1–2).

## Relevance to Aligned

Our interpretation: A concrete causal alternative to caption-only memory for relations such as holding, contacting and relative position. Construction use requires new object/relation vocabularies, robust identity tracking and event-level validation. Missing a glove cannot be inferred solely from absence of a predicted relation.

## Human notes

