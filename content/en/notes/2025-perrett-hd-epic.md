---
year: 2025
venue: "CVPR 2025"
affiliations: ["University of Bristol", "Leiden University", "Singapore Management University", "University of Bath"]
research_groups: []
reviewed: false
tags: ["video-qa", "state-changes", "spatial-understanding", "egocentric-video"]
---

# HD-EPIC: A Highly-Detailed Egocentric Video Dataset

Provides densely interconnected egocentric annotations linking recipes, actions, audio, object movement, gaze and 3D scene locations.

**Authors:** Toby Perrett, Ahmad Darkhalil, Saptarshi Sinha, Omar Emara, Sam Pollard, Kranti Kumar Parida, Kaiting Liu, Prajwal Gatti, Siddhant Bansal, Kevin Flanagan, Jacob Chalk, Zhifan Zhu, Rhodri Guerrier, Fahd Abdelazim, Bin Zhu, Davide Moltisanti, Michael Wray, Hazel Doughty, Dima Damen.
**Paper:** [PDF](https://openaccess.thecvf.com/content/CVPR2025/papers/Perrett_HD-EPIC_A_Highly-Detailed_Egocentric_Video_Dataset_CVPR_2025_paper.pdf) · [Primary record](https://openaccess.thecvf.com/content/CVPR2025/html/Perrett_HD-EPIC_A_Highly-Detailed_Egocentric_Video_Dataset_CVPR_2025_paper.html)
**Website:** [Project website](https://hd-epic.github.io/site/)
**Code:** [Author annotations and evaluation resources](https://github.com/hd-epic/hd-epic-annotations)
**Source version:** CVF open-access accepted CVPR 2025 paper, 13 pages, pp. 23901–23913. Both the archived PDF abstract and Table 2 say 37.6%, while the publisher HTML abstract previously showed 37.0%.

## Problem and contribution

Broad video collections often lack the connected ground truth needed to diagnose why a model fails. HD-EPIC captures 41 hours in nine home kitchens over multiple days and annotates the same activity at several temporal and spatial levels. It is a validation dataset and benchmark, not a proposed general video-memory architecture (§§3–5).

## Approach

Unscripted Aria recordings → detailed narrations and event boundaries → recipe preparation/steps, audio labels and object tracks → 3D digital twins and gaze associations → component benchmarks and 26,650 five-option QA items (Fig. 1).

Human annotation connects object taking/placing to fixtures and positions. Digital scene reconstruction and calibrated sensor information allow object evidence to be situated in a shared local space. QA questions are instantiated from 30 prototypes, with hard distractors drawn from other actual observations. Thus object motion, fine-grained actions and long-range reasoning can be tested against structured evidence (§§4–5).

## Evidence and limits

Table 2 reports Gemini Pro's mean-category VQA accuracy of 37.6% against a sampled-human reference of 90.3%. The sampled human evaluation is not an exhaustive answer audit, and this metric should not be mistaken for retrieval recall. The PDF abstract agrees with the table, unlike the earlier publisher-page abstract.

Separate action, sound and long-term object-segmentation evaluations expose different failure modes (Tables 3–4, Fig. 14). The dense annotations and digital twins are valuable supervision but costly assumptions, not outputs that an uncalibrated helmet pipeline obtains automatically.

Kitchen activity does not establish construction-quality assessment, multi-worker identity or multi-shift issue closure. The official project documents later release of calibration, pose and gaze intermediates, which should be distinguished from a tested end-to-end memory system.

## Research connections

- **Cites:** [2022-grauman-ego4d](/notes/2022-grauman-ego4d/) and [2024-grauman-ego-exo4d](/notes/2024-grauman-ego-exo4d/) in dataset/annotation comparisons (§2, Table 1).
- **Compares with:** SAM2 and Cutie for long-term object segmentation (§5, Fig. 14).

## Relevance to Aligned

Our interpretation: use this dataset to separate errors in object association, spatial anchoring and downstream QA before field transfer. Its annotation structure is a useful design reference for a smaller construction validation set. Avoid treating ground-truth poses or fixtures as already solved perception.

## Human notes
