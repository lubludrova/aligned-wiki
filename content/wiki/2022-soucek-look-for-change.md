---
year: 2022
venue: "CVPR"
affiliations: ["Czech Institute of Informatics, Robotics and Cybernetics, Czech Technical University in Prague", DeepMind, "Département d’informatique de l’ENS, École normale supérieure", Inria, CNRS, PSL Research University]
research_groups: []
reviewed: false
tags: [dataset, benchmark, method, state-changes, construction]
---

# Look for the Change: Learning Object States and State-Modifying Actions from Untrimmed Web Videos

Look for the Change jointly localizes initial states, modifying actions, and final states in untrimmed web videos using temporal ordering and a few exemplar images.

**Authors:** Tomáš Souček, Jean-Baptiste Alayrac, Antoine Miech, Ivan Laptev, Josef Sivic.
**Paper:** [PDF](../raw/2022-soucek-look-for-change.pdf)
**Website:** [Official project](https://data.ciirc.cvut.cz/public/projects/2022LookForTheChange/)
**Code:** [Official repository](https://github.com/soCzech/LookForTheChange)
**Source version:** [arXiv:2203.11637v1](https://arxiv.org/abs/2203.11637v1), 22 March 2022, including appendices. The work was subsequently published at [CVPR 2022, pp. 13956–13966](https://openaccess.thecvf.com/content/CVPR2022/html/Soucek_Look_for_the_Change_Learning_Object_States_and_State-Modifying_Actions_CVPR_2022_paper.html).
**Citations:** 25 ([OpenAlex](https://openalex.org/W4313174527), checked 2026-11-03).

![Learning actions and object states from state-changing videos](../assets/2022-soucek-look-for-change.png)

*Figure 2. Learning actions and object states from state-changing videos. Source: [original paper, PDF p. 3](../raw/2022-soucek-look-for-change.pdf#page=3).*

## Problem and contribution

Recognizing an action does not identify its effect on an object. Earlier joint state/action discovery used small curated collections. This work scales to noisy untrimmed videos through alternating pseudo-label estimation and nonlinear classifier training, adding image-guided video weighting. Its ChangeIt dataset contains 34,428 videos, 2,642 hours, and 44 action-object categories, with 667 videos manually annotated for evaluation (§§1, 4).

## Approach

Frozen image and video encoders produce concatenated features at one-second intervals. Separate two-layer classifiers, trained independently for each category, score the modifying action and two object states. Training alternates between finding the highest-scoring ordered triplet—initial state before action before final state—and updating classifiers from nearby pseudo-labeled samples. Action negatives are sampled at a fixed temporal distance rather than uniformly (§§3, 5.1).

A few selected images of the initial and final states supply feature similarity scores. Their best order-consistent match determines each video's training weight, suppressing irrelevant search results. Thus temporal labels are self-generated, but the full method uses exemplar-image supervision and pretrained visual features (§3.1).

The learned representation is category-specific classifiers over frozen video features. At inference, they score a complete recording and output one constrained state/action/state triplet. Other occurrences are treated as background. This is offline temporal localization, not streaming tracking or full procedure reconstruction (§§3.2, 5.2).

## Evidence and limits

ChangeIt state precision is 0.35 and action precision 0.68, versus 0.30/0.63 for CLIP and 0.30/0.59 for Alayrac et al. These measure whether predicted timestamps fall inside annotated intervals, not segmentation quality or causal correctness (Table 2, §5.2). Results average best-performing checkpoints across three runs.

The single-triplet ordering assumes a dominant, usually irreversible change and excludes immediate reversals. Separate models cannot share learning across related categories. Editing artifacts can become false final states, and visually subtle changes remain hard (Appendix E, Fig. 9). Construction-related classes are actually evaluated, but state precision is only 0.23 for outlet installation and 0.28 for tile cutting (Appendix Table 4). No physical-system or deployed-assistant outcomes are reported.

## Research connections

- **Builds on:** Alayrac et al., *Joint Discovery of Object States and Manipulation Actions* (2017) — extends joint ordered discovery beyond linear classifiers and curated video (§§1, 5.4).
- **Cites:** [[2018-doughty-skill-ranking]] — discusses object-appearance changes as evidence for skill determination (§2, reference [20]).
- **Cites:** [[2022-grauman-ego4d]] — identifies concurrent state-change annotations with a complementary egocentric focus (§2, reference [29]).

## Relevance to Aligned

Our interpretation: useful for mining candidate before/action/after evidence from weakly labeled material. Construction use requires richer object identity, reversals, repeated operations, and independent workmanship criteria.

## Human notes
