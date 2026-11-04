---
year: 2024
venue: "CVPR"
affiliations: ["Northeastern University", "Stony Brook University"]
research_groups: [northeastern-nova]
reviewed: false
tags: [dataset, benchmark, method, execution-quality, procedure-understanding, egocentric-video, supervised-training]
---

# Error Detection in Egocentric Procedural Task Videos

The paper introduces the EgoPER cooking-error dataset and EgoPED, an offline detector that learns normal step prototypes and flags deviations during task execution.

**Authors:** Shih-Po Lee, Zijia Lu, Zekun Zhang, Minh Hoai, Ehsan Elhamifar.
**Paper:** [PDF](../raw/2024-lee-egoper.pdf), [Supplementary material](https://www.khoury.northeastern.edu/home/eelhami/publications/cvpr24_suppmat_EgoPER.pdf)
**Website:** [Project website](https://www.khoury.northeastern.edu/home/eelhami/egoper.htm)
**Code:** [GitHub repository](https://github.com/robert80203/EgoPER_official)
**Source version:** CVPR 2024 accepted proceedings PDF, pp. 18655–18666. The separate author-hosted supplement was also checked.
**Citations:** 33 ([OpenAlex](https://openalex.org/W4402733587), checked 2026-11-03).

![EgoPER action, object-relation, and step-prototype learning](../assets/2024-lee-egoper.png)

*Figure 4. EgoPER action, object-relation, and step-prototype learning. Source: [original paper, PDF p. 5](../raw/2024-lee-egoper.pdf#page=5).*

## Problem and contribution

Procedural mistakes depend on the intended task and can look like ordinary actions. EgoPER adds 386 recordings covering five cooking tasks, with step omission, addition, modification, slip and correction annotations. EgoPED detects deviations using only error-free training videos, while still requiring framewise step supervision (§§3–4).

## Approach

The model processes a complete video offline. I3D features feed a temporal action-segmentation backbone that models the sequence. An active-object detector identifies hands, objects and contact states. A graph convolutional network encodes relationships among active objects. Combined holistic and relational features predict each frame's step (§4.2, Figure 4).

K-means forms several normal prototypes per step. A contrastive objective pulls matching step features toward their prototypes and distinguishes other steps. At inference, low similarity to the predicted step's nearest prototype marks an error, with thresholds calibrated on normal validation data and segment-majority voting smoothing predictions. Omitted steps require a separate comparison against the closest training transcript, selected by edit distance (§4.2.3).

## Evidence and limits

EgoPED with ActionFormer reaches 57.0% segment-level error detection accuracy and 62.0% framewise AUC on EgoPER, versus 43.0% and 54.9% for S3R (Table 3). Active-object features and multiple prototypes improve results, but better action segmentation alone does not guarantee better error detection (§5.2).

The dataset covers eleven participants in two environments. Errors were scripted and prompted through an earphone, so their prevalence and form need not match spontaneous workplace failures (§3.1, Supplement §S.1). Recipe modifications can count as errors even when the outcome is unchanged. Cooking-trained object detection transfers poorly to assembly, so HoloAssist and ATA tests omit that branch (§5.1). Recorded-data evaluation does not establish a working online assistant.

## Research connections

- **Cites:** [[2022-sener-assembly101]] — contrasts assembly datasets and their error supervision with EgoPER's cooking taxonomy (§2, Table 2).
- **Builds on:** ActionFormer, Zhang et al. (2022) — supplies a temporal segmentation backbone whose boundaries support error predictions (§5.1).
- **Compares with:** S3R, Wu et al. (2022) — evaluates a video-anomaly baseline under the procedural-error protocol (Table 3).

## Relevance to Aligned

Our interpretation: EgoPER offers a concrete error taxonomy and a normal-only detection baseline. Construction use would require task-specific normal examples, precise definitions of permissible variation and validation against naturally occurring errors, including mistakes invisible in the final product.

## Human notes
