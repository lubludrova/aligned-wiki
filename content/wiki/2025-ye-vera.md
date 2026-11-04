---
year: 2025
venue: "CVPR"
affiliations:
  - "The University of Iowa"
  - "Max Planck Institute for Intelligent Systems, Tübingen"
  - "Auburn University"
research_groups: []
reviewed: false
tags: [method, execution-quality, video-representation, supervised-training]
---

# VERA: Explainable Video Anomaly Detection via Verbalized Learning of Vision-Language Models

VERA learns verbal diagnostic questions from weak video labels while keeping the vision-language model weights frozen.

**Authors:** Muchao Ye, Weiyang Liu, Pan He.

**Paper:** [Stored PDF](../raw/2025-ye-vera.pdf) · [Source](https://openaccess.thecvf.com/content/CVPR2025/papers/Ye_VERA_Explainable_Video_Anomaly_Detection_via_Verbalized_Learning_of_Vision-Language_CVPR_2025_paper.pdf)
**Website:** https://vera-framework.github.io/
**Code:** https://github.com/vera-framework/VERA
**Source version:** CVPR 2025 open-access accepted paper, 10 pages.
**Citations:** 49 ([OpenAlex](https://openalex.org/W4413155334), checked 2026-11-03).

![VERA iterative optimization of video anomaly guiding questions](../assets/2025-ye-vera.png)

*Figure 2. VERA iterative optimization of video anomaly guiding questions. Source: [original paper, PDF p. 4](../raw/2025-ye-vera.pdf#page=4).*

## Problem and contribution

A broad question such as “is this anomalous?” can underuse a vision-language model’s knowledge. VERA treats a small set of guiding questions as trainable textual parameters. This seeks more accurate scores and readable explanations without weight updates, rather than eliminating supervision or training altogether (§§1, 3).

## Approach

A learner VLM predicts anomaly labels from sampled video frames using the current questions. An optimizer VLM receives those predictions and known video labels, then proposes improved questions. Validation selects the question set. This verbal optimization uses coarsely labeled training data and repeated model calls (Figure 2, p. 4).

At inference, the model scores short video segments and generates explanations. ImageBind similarities retrieve related scenes from both preceding and following segments. Contextual score fusion, Gaussian smoothing, and a position weight based on the complete video produce frame-level scores (§3.3, pp. 5–6, Figure 3). Thus the published inference pipeline is retrospective and uses future information.

## Evidence and limits

On UCF-Crime, the question ablation raises AUC from 78.81 without guiding questions to 86.55 with learned questions (Table 5, p. 7). This is a benchmark anomaly-ranking result, not an accuracy rate for actionable alerts. Context refinement also materially affects scores (Table 6), so performance cannot be attributed solely to the verbal questions. Explanations are generated textual outputs, without demonstrated causal faithfulness or worker-confirmed correction. Fixed-camera surveillance data, coarse binary supervision, access to the complete recording, and the extra optimization/inference calls constrain transfer to continuous egocentric assistance.

## Research connections

- **Compares with:** [[2024-wu-ovvad]] — video anomaly detection benchmark comparison (Table 2, p. 6).
- **Builds on:** verbalized machine learning — iteratively modifies natural-language parameters rather than model weights (§3.2).

## Relevance to Aligned

Our interpretation: learning a compact, task-specific diagnostic question list is an inexpensive adaptation candidate relative to weight fine-tuning. Evaluate the prompt-learning component separately from offline smoothing, and redesign retrieval causally before using it for proactive warnings.

## Human notes
