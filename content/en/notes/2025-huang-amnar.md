---
year: 2025
venue: "CVPR"
affiliations:
  - School of Computer Science and Engineering, Sun Yat-sen University
  - Peng Cheng Laboratory
  - Key Laboratory of Machine Intelligence and Advanced Computing, Ministry of Education, China
  - Guangdong Province Key Laboratory of Information Security Technology
research_groups: []
reviewed: false
tags: [procedure-understanding, execution-quality, egocentric-video]
---

# Modeling Multiple Normal Action Representations for Error Detection in Procedural Tasks

AMNAR detects execution errors by comparing the observed action with context-adapted representations of multiple valid next actions.

**Authors:** Wei-Jin Huang, Yuan-Ming Li, Zhi-Wei Xia, Yu-Ming Tang, Kun-Yu Lin, Jian-Fang Hu, Wei-Shi Zheng.

**Paper:** [Stored PDF](https://openaccess.thecvf.com/content/CVPR2025/papers/Huang_Modeling_Multiple_Normal_Action_Representations_for_Error_Detection_in_Procedural_CVPR_2025_paper.pdf)
**Website:** [Official publication page](https://openaccess.thecvf.com/content/CVPR2025/html/Huang_Modeling_Multiple_Normal_Action_Representations_for_Error_Detection_in_Procedural_CVPR_2025_paper.html)
**Code:** https://github.com/iSEE-Laboratory/AMNAR
**Source version:** CVF open-access accepted CVPR 2025 paper, pp. 27794–27804, plus its separately published supplement. The repository also links the distinct arXiv manuscript 2503.22405.

## Problem and contribution

A correct procedure can admit several next actions. Comparing an observed action against one predicted label or a fixed class prototype can therefore create false alarms. AMNAR combines task-graph constraints with visual reconstruction of every candidate's expected execution, so normality depends on both permissible ordering and preceding visual context (§§1–3).

## Approach

Pretrained I3D features enter an ActionFormer segmentation model, producing action labels, boundaries, and refined frame features. Dynamic programming aligns the previously recognized action sequence with a task graph, suppresses inconsistent detections, and collects reachable next-action classes. For each candidate, causal dilated convolutions and local cross-attention predict a residual added to its normal class centroid (§§3.3–3.5).

Training uses normal executions with framewise action labels. Predicted segments are filtered against ground-truth overlap and assigned corrected training labels. The reconstruction loss predicts the actual normal segment representation from preceding features and its known class. Candidate enumeration is omitted during this training stage. At inference, the minimum Euclidean distance between the observed segment and all reconstructed candidates is compared with a class-specific threshold estimated from normal training distances (§§3.6–3.7). Graphs are supplied for EgoPER and derived from training sequences for the other datasets.

## Evidence and limits

On EgoPER, Table 1 reports 64.4% error-detection accuracy and 68.5% AUC, versus EgoPED's 57.0% and 62.0%. Gains remain when EgoPED receives AMNAR's stronger segmentation results (Table 8). HoloAssist reaches 69.9% accuracy but only 56.5% AUC, indicating limited discrimination despite improvement over the baseline (Table 2).

HoloAssist evaluation uses its validation set, treats unseen action classes as background, and omits the error-free Belt task. Crucially, CaptainCook4D evaluation excludes missing-step and ordering errors, restricting the claimed coverage (supplement B.1–B.2). Reconstruction explicitly uses causal context, but detection compares segment-averaged features through the segment end. The paper does not establish framewise notification latency or practical user outcomes. Results remain dependent on segmentation, known action classes, and task graphs.

## Research connections

- **Builds on:** [2024-lee-egoper](/notes/2024-lee-egoper/) supplies the normal-training formulation, dataset, segmentation pipeline, and principal EgoPED comparison (§§3.1, 4, reference 16).

## Relevance to Aligned

Our interpretation: retaining several permissible next steps can prevent valid alternative workflows from being mislabeled as errors. Execution correctness and missing-step detection still need separately verified coverage.

## Human notes
