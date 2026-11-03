---
year: 2025
venue: "CVPR"
affiliations:
  - "National Engineering Research Center for Multimedia Software, School of Computer Science, Wuhan University"
  - "Shanghai Key Lab of Intelligent Information Processing, School of Computer Science, Fudan University"
  - "State Key Laboratory for Multimedia Information Processing, School of Computer Science, Peking University"
  - "Hubei Key Laboratory of Transportation Internet of Things, Wuhan University of Technology"
research_groups: []
reviewed: false
tags: [execution-quality, video-representation]
---

# Anomize: Better Open Vocabulary Video Anomaly Detection

Anomize combines static visual concepts and temporal label-aligned features to detect and classify unfamiliar anomaly categories.

**Authors:** Fei Li, Wenxuan Liu, Jingjing Chen, Ruixu Zhang, Yuran Wang, Xian Zhong, Zheng Wang.

**Paper:** [Stored PDF](https://openaccess.thecvf.com/content/CVPR2025/papers/Li_Anomize_Better_Open_Vocabulary_Video_Anomaly_Detection_CVPR_2025_paper.pdf) · [Source](https://openaccess.thecvf.com/content/CVPR2025/papers/Li_Anomize_Better_Open_Vocabulary_Video_Anomaly_Detection_CVPR_2025_paper.pdf)
**Website:** Not found in checked primary sources.
**Code:** Not found in checked primary sources.
**Source version:** CVPR 2025 open-access accepted paper, 10 pages.

## Problem and contribution

Open-vocabulary anomaly systems can confuse novel events with visually similar training classes. Anomize distinguishes ambiguity in anomaly scoring from confusion in naming the anomaly. It addresses both with complementary visual and textual representations, rather than changing the task into procedural compliance checking (§§1–3).

## Approach

A frozen CLIP image encoder supplies original frame features. A lightweight temporal encoder produces a second, dynamic stream. Language-model descriptions organize anomaly labels into related groups, while a separate concept library supplies visible objects or phenomena. Each detection stream receives its corresponding textual augmentation. Their scores are blended into frame anomaly scores. A categorization branch aligns fused visual features with label representations (§3, Figure 3, p. 4).

Training proceeds in stages for categorization and detection, using weak video labels. Inference assumes a provided label vocabulary and produces both anomaly scores and a video class. It does not infer the correct next procedural state or verify that a repair succeeded.

## Evidence and limits

Table 1 (p. 6) improves XD-Violence novel-category AP from OVVAD’s 76.03 to 84.24. However, overall UCF-Crime AUC decreases from 86.40 to 84.49. The paper therefore does not demonstrate uniform detection superiority. Classification gains in Table 2 concern anomalous test videos, not normal/abnormal decision accuracy over a complete work shift. Implementation settings specify different score weights for base versus novel categories (§4.1), which warrants clarification when reproducing one deployable mixed-category policy. Both datasets emphasize violence/crime or generic surveillance anomalies, with no continuous egocentric workplace evaluation, alert-delay study, or measured false alarms per hour.

## Research connections

- **Builds on / Compares with:** [2024-wu-ovvad](/notes/2024-wu-ovvad/) — adopts the base/novel open-vocabulary detection-and-categorization setting and compares both detection and category accuracy (§§3–4, Tables 1–2).

## Relevance to Aligned

Our interpretation: grouped label descriptions and a visual concept library could help disambiguate named hazards. They remain supporting components, because procedural violations can be visually ordinary and depend on instructions, temporal prerequisites, and object state.

## Human notes
