---
year: 2025
venue: "ICCV Workshops, SAUAFG"
affiliations:
  - "Kyoto University"
  - "Sony Interactive Entertainment"
research_groups: []
reviewed: false
tags: [dataset, benchmark, procedure-understanding, execution-quality, egocentric-video]
---

# EgoOops: A Dataset for Mistake Action Detection from Egocentric Videos referring to Procedural Texts

EgoOops tests whether procedural text enables localization and classification of execution mistakes in untrimmed egocentric recordings.

**Authors:** Yuto Haneji, Taichi Nishimura, Hirotaka Kameko, Keisuke Shirai, Tomoya Yoshida, Keiya Kajimura, Koki Yamamoto, Taiyu Cui, Tomohiro Nishimoto, Shinsuke Mori.

**Paper:** [Stored PDF](../raw/2025-haneji-egooops.pdf) · [Source](https://www.lsta.media.kyoto-u.ac.jp/mori/research/public/haneji-SAUAFG2025.pdf)
**Website:** https://y-haneji.github.io/EgoOops-project-page/
**Code:** https://github.com/Y-Haneji/EgoOops-annotations/
**Source version:** ICCV Workshops 2025 accepted open-access version, 11 PDF pages, proceedings pp. 2690–2700. The title differs slightly from the project-page heading.
**Citations:** 3 ([OpenAlex](https://openalex.org/W7131077887), checked 2026-11-03).

![EgoOops StepFormer++ action segmentation architecture](../assets/2025-haneji-egooops.png)

*Figure 3. EgoOops StepFormer++ action segmentation architecture. Source: [original paper, PDF p. 6](../raw/2025-haneji-egooops.pdf#page=6).*

## Problem and contribution

An action can be wrong because instructions require a different tool, material, or execution method. EgoOops supplies procedural texts, aligned steps, mistake classes, and explanatory descriptions for 50 videos across five tasks. Four student participants work in controlled setups, and about half the recordings deliberately include mistakes. The dataset targets execution mistakes, excluding step-order mistakes and omissions (§3, including its scope footnote).

## Approach

StepFormer++ first aligns the video with the supplied procedure. EgoVLPv2 features feed transformer step slots, and Drop-DTW matches video segments with text. Supervised frame-level contrastive alignment augments the original self-supervised objective. An MLP then combines each predicted segment’s features and instruction representation to classify correct execution, mistake, or correction (§4, Figure 3, p. 6).

This is retrospective alignment and classification over untrimmed video. Its use of a procedural reference is valuable, but it does not establish a causal streaming detector or an assistant that produces and verifies corrective actions.

## Evidence and limits

Table 4 (p. 7) reports average detection mAP of 2.5 for StepFormer++ versus 0.7 for ActionFormer, averaged over low temporal-IoU thresholds 0.1/0.2/0.3. Supplying ground-truth step segments raises the oracle result to 34.7, exposing alignment as a major bottleneck. The dataset contains 95 mistake annotations, including only seven self-correction instances (§3.4). This small controlled sample cannot support broad recovery or industrial-generalization claims. Text helps because visual behavior alone may be valid under another instruction, but localization errors can still dominate the complete pipeline.

## Research connections

- **Builds on:** [[2022-grauman-ego4d]] — supplies pretraining data for the StepFormer initialization (§4.2).
- **Cites:** [[2024-lee-egoper]] — related egocentric procedural-error data and classifier setting (§2.2, §5.3).

## Relevance to Aligned

Our interpretation: retain the instruction-conditioned definition of correctness and assess end-to-end localization separately from oracle-interval classification. Its explicit correction labels are useful examples, but seven cases are insufficient to validate repair monitoring.

## Human notes
