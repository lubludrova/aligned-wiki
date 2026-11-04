---
year: 2026
venue: "arXiv preprint"
affiliations: ["FAIR at Meta", "Universidad de Zaragoza"]
research_groups: [meta-fair]
reviewed: false
tags: [method, video-representation, spatial-understanding, egocentric-video, real-world-evaluation, self-supervised-learning]
---

# V-JEPA 2.1: Unlocking Dense Features in Video Self-Supervised Learning

V-JEPA 2.1 learns reusable image and video features that preserve local geometry and temporal consistency while retaining global action information.

**Authors:** Lorenzo Mur-Labadia, Matthew Muckley, Amir Bar, Mido Assran, Koustuv Sinha, Mike Rabbat, Yann LeCun, Nicolas Ballas, Adrien Bardes.
**Paper:** [PDF](../raw/2026-mur-labadia-v-jepa-2-1.pdf) · [arXiv v3](https://arxiv.org/abs/2603.14482v3)
**Website:** Not found in checked sources.
**Code:** [Official code and checkpoints](https://github.com/facebookresearch/vjepa2)
**Citations:** 8 ([OpenAlex](https://openalex.org/W7137837393), checked 2026-11-03).

![V-JEPA 2.1: Figure 4 from the paper](../assets/2026-mur-labadia-v-jepa-2-1.png)

*Figure 4 from the original paper ([PDF page 5](../raw/2026-mur-labadia-v-jepa-2-1.pdf#page=5)).*

## Problem and contribution

Earlier V-JEPA features work well for global video understanding but lose useful local spatial structure. V-JEPA 2.1 changes the self-supervised objective so that individual patches retain information useful for depth, segmentation and tracking (§§2.1–2.3).

## Approach

Image or short video clip → modality-specific patch tokenizer → shared visual encoder → dense patch features → task-specific head or predictor.

During training, a student encoder sees masked input, while an exponential-moving-average teacher sees the complete input. A predictor learns the teacher's representations for both masked patches and visible context patches. Distance-weighted context supervision encourages local structure, and supervision at intermediate layers restores global understanding. Separate image/video tokenizers avoid treating a still image as a repeated video (§2.3, Figure 4).

The learned encoder is reused for downstream tasks. Depth and segmentation use trained heads on frozen features. Robot planning additionally trains an action-conditioned predictor on robot data. The encoder itself produces features, not a persistent archive or language-search interface. Distillation provides smaller 80M- and 300M-parameter variants (§§2.3.6, 3.3, 3.10).

## Evidence and limits

Tests cover Ego4D interaction anticipation, EPIC-KITCHENS action anticipation, depth, segmentation, tracking and video QA (§3). Improvements are task-dependent: the model does not beat every image encoder or improve every QA benchmark (Tables 8, 10).

The largest reported grasp improvement also changes the planning horizon and increases planning time from 3 to 14 seconds, with ten evaluations per skill (Table 6). It should not be attributed solely to better features. None of these experiments establishes shift-long video memory, construction-defect detection or skill assessment.

## Research connections

- **Builds on:** Assran et al., *V-JEPA 2* — masked latent prediction and the robot-planning setup (§§2.1, 3.3).
- **Compares with:** *DINOv3* and *InternVideo2* — dense and global feature baselines (Tables 4, 8–10).
- **Builds on:** *DROID* — robot trajectories used to train the action-conditioned predictor (§3.3).

## Relevance to Aligned

Our interpretation: a candidate reusable feature extractor beneath object tracking, state analysis and procedural models. Compare the distilled encoders against simpler image features on actual helmet footage, measuring defect sensitivity and complete extraction cost before selecting a backbone.

## Human notes

