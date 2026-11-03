---
year: 2025
venue: "ECCV 2024 VISION Workshop, proceedings published 2025"
affiliations:
  - "Eindhoven University of Technology"
  - "ASML Research"
research_groups: []
reviewed: false
tags: [state-changes, execution-quality, egocentric-video]
---

# Find the Assembly Mistakes: Error Segmentation for Industrial Applications

StateDiffNet localizes visible assembly-state differences against an intended correct reference instead of classifying a fixed list of errors.

**Authors:** Dan Lehman, Tim J. Schoonbeek, Shao-Hsuan Hung, Jacek Kustra, Peter H.N. de With, Fons van der Sommen.

**Paper:** [Stored PDF](https://arxiv.org/pdf/2408.12945v1) · [Source](https://arxiv.org/pdf/2408.12945v1)
**Website:** https://timschoonbeek.github.io/error_seg
**Code:** https://github.com/Dan-Leh/find-my-assembly-mistakes
**Source version:** arXiv:2408.12945v1, 23 August 2024, 23 pages. ECCV 2024 VISION workshop proceedings appeared in 2025, which determines this wiki filename/year.

## Problem and contribution

An assembly image is erroneous relative to the intended state, not necessarily because it looks globally unusual. StateDiffNet takes an intended correct assembly view and a test view, then segments meaningful differences. The formulation allows unseen combinations of parts while requiring an appropriate reference and a sufficiently similar viewpoint (§§1, 3).

## Approach

A Siamese ResNet encoder extracts features from both images. Cross-attention combines corresponding features in the skip connections of a U-Net-style decoder. A convolutional head predicts a binary difference mask. Variants compare global/local attention and multiscale aggregation (Figure 2, p. 5).

Training uses paired synthetic CAD renders with controlled part changes, pose, lighting, and appearance variation. Ground-truth masks derive from synthetic instance segmentation, allowing the model to learn which differences matter and which nuisance changes to ignore. This is a reference-conditioned image comparison system, not temporal step tracking or autonomous retrieval of the correct reference.

## Evidence and limits

Quantitative evaluation measures segmentation on synthetic image pairs and examines generalization to unseen assembly states and viewpoints (§4). Real egocentric IndustReal examples are evaluated qualitatively only (§4.1, p. 8, Figure 6, p. 10). Some configurations identify missing or incorrectly oriented parts, but placement errors remain unreliable. Accordingly, the real examples do not establish a measured industrial error-detection rate. CAD availability, view alignment, visible parts, and knowing the intended state are substantial assumptions. Hidden components and occluded differences cannot be treated as confirmed correctness merely because no mask appears.

## Research connections

- **Builds on:** Sachdeva and Zisserman, *The Change You Want to See* (WACV 2023) — adapts its change-detection architecture for assembly error segmentation (§3.1, reference 18).
- **Builds on:** IndustReal — supplies real egocentric examples for qualitative transfer evaluation (§4.1).

## Relevance to Aligned

Our interpretation: useful when Aligned can select a correct reference state and acquire a comparable view. Combine localized differences with visibility checks and procedure context. Do not use this paper as evidence of reliable field deployment or complete temporal error detection.

## Human notes
