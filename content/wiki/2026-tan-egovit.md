---
year: 2026
venue: "CVPR"
affiliations: ["Communication University of China", "State Key Laboratory of Media Convergence and Communication", "The Chinese University of Hong Kong, Shenzhen"]
research_groups: [cuc-mcc]
reviewed: false
tags: [method, video-representation, spatial-understanding, egocentric-video]
---

# Towards Stable Self-Supervised Object Representations in Unconstrained Egocentric Video

EgoViT learns object-focused visual features from unlabeled egocentric clips through self-distillation, depth regularization and filtered temporal correspondence.

**Authors:** Yuting Tan, Xilong Cheng, Yunxiao Qin, Zhengnan Li, Jingjing Zhang.
**Paper:** [PDF](../raw/2026-tan-egovit.pdf)
**Website:** Not found in checked sources.
**Code:** Not found in checked sources.
**Source version:** arXiv:2603.13912v1, 14 March 2026, including Appendices A–I. Published at CVPR 2026.
**Citations:** 0 ([OpenAlex](https://openalex.org/W7138152984), checked 2026-11-03).

![EgoViT: Figure 2 from the paper](../assets/2026-tan-egovit.png)

*Figure 2 from the original paper ([PDF page 3](../raw/2026-tan-egovit.pdf#page=3)).*

## Problem and contribution

Camera motion, clutter and occlusion make object-focused features unstable in first-person video. EgoViT trains a reusable image encoder whose attention discovers candidate object regions, called proto-objects, and encourages their representations to remain consistent across nearby frames (§§1–3).

## Approach

Training consumes sampled RGB clips and pseudo-depth maps from pretrained Depth Anything V2. An exponential-moving-average teacher ViT produces attention-weighted prototypes. Similarity to patch features yields masks, which are applied to raw images before the student encodes each region (§3.1, Appendix A).

Self-distillation aligns both the student's whole-frame representation and its weighted combination of region features with the teacher's scene representation. An auxiliary decoder predicts depth from intermediate features. Finally, teacher similarity filters unreliable cross-frame region pairs before a contrastive objective aligns accepted pairs and separates other prototypes (§§3.1–3.4).

The encoder is trained offline from scratch on eight-frame clips, initially from one 65-minute Zurich walking video. Its depth supervision nevertheless imports external pretrained knowledge. At inference RGB alone supplies features for task-specific localization, segmentation or tracking pipelines. It does not maintain a persistent object database (Appendices C, H).

## Evidence and limits

Against the authors' DINO reimplementation under the same pretraining protocol, VOC object discovery improves from 37.2% to 45.2% CorLoc. ADE20K segmentation improves from 21.2 to 26.0 mIoU after supervised fine-tuning, rather than zero-shot segmentation (Table 1, Appendix C.4). VISOR video segmentation also improves after task fine-tuning (Table 13).

The DoRA reproduction falls far below its published results, so comparisons establish gains within this implementation, not superiority over original checkpoints (Appendix D). Experiments use one fixed seed (§4.1). Ego4D-mini comprises three clips evaluated mainly qualitatively, with noisy SAM2 boxes and mixed quantitative outcomes (Appendix I).

Proto-objects need not be complete objects or stable identities indefinitely. Figure 8 explicitly reassigns one head from a pedestrian to a car. Long-term tracking results additionally use OSTrack (§4.4).

## Research connections

- **Builds on:** DINO, Caron et al. — inherits teacher–student self-distillation, centering and sharpening (Appendix H.1).
- **Compares with:** DoRA, Venkataramanan et al. — compares learning from the same walking video and analyzes reproduction discrepancies (Table 1, Appendix D).
- **Builds on:** [[2022-grauman-ego4d]] — samples three evaluation clips for cross-domain object localization (Appendix I).

## Relevance to Aligned

Our interpretation: these features could help proposals remain visually coherent before memory indexing. Persistent material identity, object-state transitions and workmanship assessment still require separate representations and validation on worksite recordings.

## Human notes
