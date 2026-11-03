---
year: 2024
venue: "CVPR"
affiliations:
  - "Northwestern Polytechnical University"
  - "Singapore Management University"
  - "Xidian University"
research_groups: []
reviewed: false
tags: [execution-quality, video-representation]
---

# Open-Vocabulary Video Anomaly Detection

OVVAD extends anomaly localization to naming anomaly classes absent from the training videos using visual-language alignment and generated examples.

**Authors:** Peng Wu, Xuerong Zhou, Guansong Pang, Yujia Sun, Jing Liu, Peng Wang, Yanning Zhang.

**Paper:** [Stored PDF](https://openaccess.thecvf.com/content/CVPR2024/papers/Wu_Open-Vocabulary_Video_Anomaly_Detection_CVPR_2024_paper.pdf) · [Source](https://openaccess.thecvf.com/content/CVPR2024/papers/Wu_Open-Vocabulary_Video_Anomaly_Detection_CVPR_2024_paper.pdf)
**Website:** Not found in checked primary sources.
**Code:** Not found in checked primary sources.
**Source version:** CVPR 2024 open-access accepted paper, 11 pages. First preprint appeared in 2023.

## Problem and contribution

Ordinary weakly supervised video anomaly detection produces an anomaly score but cannot name unfamiliar categories. OVVAD separates frame-level detection from video-level categorization and evaluates base classes seen during training versus novel classes specified by text at evaluation. “Open vocabulary” here does not mean that the system discovers every possible industrial error without a candidate label set (§§1, 3).

## Approach

Frozen CLIP image/text encoders provide visual features and category embeddings. A temporal adapter enriches the visual sequence, while semantic knowledge obtained from language-model questions supports anomaly detection. An attentive aggregation branch aligns video representations with category text. A novel-anomaly synthesis module converts textual descriptions into generated images and short clips to expose additional visual appearances during training (§§3.1–3.3, Figure 2, p. 4).

Initial training combines video-level anomaly supervision and class alignment without dense labels on real videos. Subsequent fine-tuning uses frame-level labels for synthetically inserted anomaly clips (§3.5.2). The temporal adapter aggregates across the supplied sequence. The paper does not establish a future-blind implementation or an operational streaming alarm protocol.

## Evidence and limits

Experiments use UCF-Crime, XD-Violence, and UBnormal with base/novel splits (§4). Detection AUC/AP and category top-1 accuracy measure different tasks and populations. In particular, anomaly-category accuracy is assessed on anomalous videos, rather than including the many normal periods that dominate workplace monitoring. The method does not model a task-specific instruction graph, component completion states, recovery behavior, or the consequences of acting on an alarm. Generated anomalous examples introduce an additional synthetic-to-real generalization assumption. No false alarms per worker-hour or measured human intervention benefit is reported.

## Research connections

- **Builds on:** CLIP (Radford et al., 2021) — frozen visual/text embeddings provide the representation and open-vocabulary label alignment (§3.1).

## Relevance to Aligned

Our interpretation: use this as a methodological baseline for extending a named hazard vocabulary. Keep it separate from procedural-error detection, which must decide whether an otherwise ordinary action violates the current task and observed state.

## Human notes
