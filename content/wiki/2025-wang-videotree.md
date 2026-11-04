---
year: 2025
venue: "CVPR"
affiliations: ["University of North Carolina at Chapel Hill"]
research_groups: []
reviewed: false
tags: [method, video-retrieval, video-qa, efficient-processing, training-free]
---

# VideoTree: Adaptive Tree-based Video Representation for LLM Reasoning on Long Videos

VideoTree selects question-relevant keyframes through adaptive visual clustering, then answers from their time-ordered captions.

**Authors:** Ziyang Wang, Shoubin Yu, Elias Stengel-Eskin, Jaehong Yoon, Feng Cheng, Gedas Bertasius, Mohit Bansal.
**Paper:** [PDF](../raw/2025-wang-videotree.pdf) · [arXiv v3](https://arxiv.org/abs/2405.19209v3)
**Website:** [Project website](https://videotree2024.github.io/)
**Code:** [Official repository](https://github.com/Ziyang412/VideoTree)
**Source version:** arXiv:2405.19209v3, 14 March 2025, including supplementary material; main results cross-checked with the CVPR 2025 open-access proceedings PDF.
**Citations:** 55 ([OpenAlex](https://openalex.org/W4413145669), checked 2026-11-03).

![VideoTree adaptive tree construction and relevance-guided retrieval](../assets/2025-wang-videotree.png)

*Figure 1. VideoTree adaptive tree construction and relevance-guided retrieval. Source: [original paper, PDF p. 1](../raw/2025-wang-videotree.pdf#page=1).*

## Problem and contribution

Uniform dense captioning wastes computation on irrelevant or redundant content. VideoTree allocates description effort according to the current question and the diversity of visual content, without task-specific training (§§1, 3).

## Approach

A complete video and question enter a three-stage pipeline. A pretrained encoder embeds sampled frames; k-means groups similar appearances. A captioner describes cluster representatives, and an LLM rates their relevance. If too few clusters are highly relevant, breadth expansion increases the cluster count up to a limit. Depth expansion subclusters relevant groups, assigning more representatives to promising content (§§3.1–3.2, Figure 2).

Selected keyframes or short clips are captioned and sorted chronologically. The final LLM receives these descriptions and the question, not raw frames. The tree guides selection; the final reasoning input is temporally ordered text (§3.3, supplementary §9). Main experiments use EVA-CLIP, dataset-dependent captioners and GPT-4. The question-dependent tree is not a persistent, question-independent archive memory, and evaluation uses complete recordings.

## Evidence and limits

VideoTree reports 61.1% accuracy on full EgoSchema, 75.6% on NExT-QA and 54.2% on Video-MME Long (Tables 1–2). Their videos average three minutes, 44 seconds and 44 minutes respectively; the last split spans 30–60 minutes. Supplementary evaluations add IntentQA and MLVU (§8).

On EgoSchema's 500-question subset, removing depth expansion reduces accuracy from 66.2% to 64.4%; also removing adaptive breadth yields 61.2% (Table 5). These controlled ablations support adaptive selection, not multi-day identity tracking. Caption omissions remain a bottleneck, and extracting visual features is still required before selective captioning (§7). Public code separates feature extraction, expansion and QA; runtime reproduction was not performed.

## Research connections

- **Compares with:** [[2024-fan-videoagent]] — Table 1 includes Fan's distinct VideoAgent alongside Wang's similarly named method; their results should not be conflated.

## Relevance to Aligned

Our interpretation: use query-adaptive reading after retrieving a relevant shift or episode. Test whether its captions preserve small construction details; it does not establish archive-wide retrieval, persistent object identity or defect verification.

## Human notes
