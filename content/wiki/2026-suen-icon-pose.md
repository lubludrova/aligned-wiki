---
year: 2026
venue: "Artificial Intelligence for a Sustainable Built Environment, 1(1), 1–27"
affiliations: ["Columbia University", "Colorado School of Mines", "The University of British Columbia"]
research_groups: []
reviewed: false
tags: [dataset, benchmark, method, video-representation, egocentric-video, construction, sft, supervised-training]
---

# ICON-pose: an egocentric worker action recognition dataset for human–robot collaboration

Introduces construction-specific egocentric pose data and classifies action sequences using predicted skeletons.

**Authors:** Christine Wun Ki Suen, Ziming Liu, Lei Huang, Kangkang Duan, Yangming Shi, Zhengbo Zou.
**Paper:** [PDF](../raw/2026-suen-icon-pose.pdf) · [Primary source](https://doi.org/10.1108/AISBE-11-2025-0007)
**Website:** [Author dataset repository](https://github.com/ICON-Pose/ICON-Pose)
**Code:** [Author repository](https://github.com/ICON-Pose/ICON-Pose). Its README says training code and checkpoints are coming soon. Dataset releases are linked separately.
**Source version:** Original 27-page journal PDF, 2026, DOI 10.1108/AISBE-11-2025-0007.
**Citations:** 0 ([OpenAlex](https://openalex.org/W7211957703), checked 2026-11-03).

![ICON-Pose: title and abstract excerpts](../assets/2026-suen-icon-pose.png)

*Title and abstract excerpts from the original paper ([PDF pages 1–2](../raw/2026-suen-icon-pose.pdf#page=1)).*

## Problem and contribution

Generic egocentric pose datasets contain few construction actions. ICON-Pose provides domain-specific image/keypoint annotations and a pose-based recognition baseline for both coarse and visually similar worker actions (Introduction, Dataset overview).

## Approach

Hardhat-mounted 360-degree fisheye video → sampled egocentric images → DeepLabV3/ResNet-50 heatmaps → integral regression of 18 joints → pose sequence → RBF-SVM action class (Methodology, Figs. 7–9). The pose model is pretrained on EgoCap and fine-tuned on ICON-Pose. Temporal interpolation and translation augment action sequences before classification.

The camera sits on a 17.7-inch gooseneck mount and views the wearer’s body. This differs materially from a compact forward-facing helmet camera. Five actors perform 63 actions across ten categories in laboratory and green-screen spaces, producing 1,387 annotated images. Some backgrounds are replaced with construction scenes (Dataset, pp. 8–12).

## Evidence and limits

Pose evaluation reports PCKh@0.5 of 97.3% on 278 test images. Table 3 reports 82.26% action accuracy and 0.2-second classification inference for 186 test inputs. That timing is not demonstrated full-stream processing or time-to-event detection (Results, pp. 16–21).

Actor-held-out and site-held-out validation are not established. The text describes a 70/30 action split after augmentation, whereas Table 3 lists 620 training and 186 test inputs, which is not that ratio. Figure 3b’s coarse/fine counts also disagree with the adjacent prose. Cross-dataset comparisons with other action classifiers are not matched benchmark comparisons. Similar skeletons confuse drilling versus screwing and removing a helmet versus a jacket (Figs. 13–15).

The paper names a public dataset repository, but availability and evaluation reproducibility must be checked independently of that statement (Data availability).

## Research connections

- **Builds on:** EgoCap, Rhodin et al. (2016) — supplies 5,646 pretraining images for egocentric pose estimation (Training details, p. 15).
- **Builds on:** DeepLabV3 and ResNet-50 — supply the heatmap architecture (Methodology, Fig. 8).

## Relevance to Aligned

Our interpretation: useful for construction action vocabulary and camera-design trade-offs, with moderate reading priority because transfer evidence is limited. Pose sequences can support activity features, but this benchmark does not validate worker productivity, safety-rule compliance, or continuous daily records.

## Human notes
