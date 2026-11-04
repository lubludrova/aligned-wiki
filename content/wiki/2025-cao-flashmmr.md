---
year: 2025
venue: "NeurIPS 2025"
affiliations: ["The University of Queensland"]
research_groups: []
reviewed: false
tags: [dataset, benchmark, method, video-retrieval, video-representation, supervised-training]
---

# When One Moment Isn’t Enough: Multi-Moment Retrieval with Cross-Moment Interactions

Introduces QV-M² and FlashMMR to retrieve several separate moments matching one natural-language query.

**Authors:** Zhuo Cao, Heming Du, Bingqing Zhang, Xin Yu, Xue Li, Sen Wang.
**Paper:** [PDF](../raw/2025-cao-flashmmr.pdf) · [Primary record](https://proceedings.nips.cc/paper_files/paper/2025/hash/faaa187af979e46dc54f4d43f8b815b2-Abstract-Conference.html)
**Website:** Not found in checked sources.
**Code:** [Author repository](https://github.com/Zhuo-Cao/QV-M2)
**Source version:** NeurIPS 2025 proceedings PDF, 19 pages.
**Citations:** 1 ([OpenAlex](https://openalex.org/W4415962915), checked 2026-11-03).

![FlashMMR feature extraction, moment refinement, and prediction](../assets/2025-cao-flashmmr.png)

*Figure 3. FlashMMR feature extraction, moment refinement, and prediction. Source: [original paper, PDF p. 6](../raw/2025-cao-flashmmr.pdf#page=6).*

## Problem and contribution

Finding one strong match is insufficient when an activity recurs. The work reannotates QVHighlights for multi-moment retrieval, providing 2,212 annotations covering 6,384 temporal segments. Evaluation distinguishes queries with one, two and at least three target moments (§3).

## Approach

Video and query → frozen SlowFast/CLIP features → cross-modal fusion with dummy tokens → temporal feature pyramid → scored start/end proposals (Fig. 3, §4).

A post-verification training module extracts features at proposed intervals, predicts their quality with a GRU, and supervises quality against temporal overlap with ground truth. A representation objective encourages consistency with ground-truth moment membership. Figure 3 explicitly describes the verification branch during training, while inference uses the temporal predictor and NMS. Thus this is not an independent generative verifier rewatching evidence at query time.

Boundary post-processing constrains durations, clipping and rounding. The model operates on an available video rather than demonstrating causal continuous monitoring. Its outputs are intervals and scores, not natural-language answers or persistent entity identities.

## Evidence and limits

On QV-M², Table 3 reports G-mAP 35.14 versus 32.14 for FlashVTG. For queries with at least three targets, mAP is 22.89 versus 20.19. The gain leaves substantial multi-target errors, rather than proving complete enumeration.

Section 3.3 counts a prediction as a true positive only when it matches an unmatched ground-truth interval. This prevents duplicate matches from inflating that precision calculation. The paper's mean-IoU and recall definitions should still be inspected separately rather than treating every metric as exhaustive coverage.

Vlog/news footage and within-video moments do not establish multi-camera deduplication, site-wide counts or a stopping rule that certifies every matching event was found. Annotation and split choices constrain transfer (§6).

## Research connections

- **Builds on:** FlashVTG supplies shared components and experimental settings (§§4–5).
- **Builds on:** QVHighlights supplies videos and initial annotation context (§3.1).
- **Compares with:** Moment-DETR, QD-DETR and other temporal retrievers (Tables 3–4).

## Relevance to Aligned

Our interpretation: use multi-target retrieval tests for repeated rework, installations or waiting episodes. Score evidence coverage and duplicate event counts separately from answer correctness. This fills a more concrete gap than another single-answer QA benchmark.

## Human notes
