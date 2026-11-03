---
year: 2024
venue: "CVPR"
affiliations: ["OpenGVLab, Shanghai AI Laboratory", The University of Tokyo, Nanjing University, Fudan University, Zhejiang University, USTC, "SIAT, CAS"]
research_groups: [shanghai-opengvlab]
reviewed: false
tags: [execution-quality, procedure-understanding, video-representation, preference-learning, egocentric-video]
---

# EgoExoLearn: A Dataset for Bridging Asynchronous Ego- and Exo-centric View of Procedural Activities in Real World

EgoExoLearn connects third-person demonstrations with first-person task execution through gaze, procedural annotations and human pairwise skill judgments.

**Authors:** Yifei Huang, Guo Chen, Jilan Xu, Mingfang Zhang, Lijin Yang, Baoqi Pei, Hongjie Zhang, Lu Dong, Yali Wang, Limin Wang, Yu Qiao.
**Paper:** [PDF](https://arxiv.org/pdf/2403.16182v3)
**Website:** Not found in checked sources.
**Code:** [Official OpenGVLab release](https://github.com/OpenGVLab/EgoExoLearn)
**Source version:** arXiv 2403.16182v3, 6 March 2025, including supplementary material. The work was published at CVPR 2024.

## Problem and contribution

Following a tutorial requires matching actions performed by different people, at different times and in different environments. EgoExoLearn studies this asynchronous setting, supplementing synchronized recordings of the same performance. Its 120 hours cover five daily and three laboratory tasks, with gaze, action captions and comparative skill annotations (§§1–3).

## Approach

Participants watch exocentric demonstrations and record their own executions with eye tracking. The collection comprises 432 ego videos totaling 96.5 hours and 315 exo videos totaling 23.5 hours. Coarse and fine action labels support cross-view association, anticipation, planning, segmentation, captioning and skill assessment (§3).

For skill ranking, fixed video features feed rank-aware temporal attention and a scoring network. Human comparisons supervise which of two ego clips shows better execution. Optional branches add an exo reference by feature concatenation or a triplet loss. Gaze provides focused crops around attended regions. This produces relative clip scores, not a persistent memory, localized quality certification or robot policy (§4.2.3).

Four annotators judge 40,191 candidate pairs. Retaining at least three agreeing judgments leaves 34,239 pairs across 3,304 short clips. These are comparisons, not independent workers. The skill subset covers cooking actions and perceived fluency, speed and proficiency (§3.2, supplement §6.3.3).

## Evidence and limits

Gaze improves the I3D rank-attention egg-cracking baseline from 78.45% to 82.08%. Expert references are less convincing: concatenation without gaze lowers all four category scores. Adding reference triplet loss to gaze changes 82.08/79.37/83.92/79.36 to 82.16/79.59/84.05/79.29, yielding tiny, mixed differences without significance estimates (Table 5).

The dataset and benchmark resources are released, but cooking comparisons do not establish construction competence. Eye tracking may be unavailable on worker cameras. Participant-disjoint skill generalization remains unverified here. Most tasks use recorded clips, while anticipation explicitly stops observation one second before the target action (§§4.2.2–4.2.3).

## Research connections

- **Compares with:** [2018-doughty-skill-ranking](/notes/2018-doughty-skill-ranking/) — evaluates the earlier pairwise-ranking baseline on its skill annotations (Table 5, ref. 26).
- **Builds on:** Doughty et al., *The Pros and Cons: Rank-Aware Temporal Attention for Skill Determination in Long Videos* (2019) — adapts its attention-based ranking model (§4.2.3, ref. 27).
- **Cites:** [2024-grauman-ego-exo4d](/notes/2024-grauman-ego-exo4d/) — contrasts synchronized ego/exo capture with asynchronous demonstration following (§2, ref. 38).

## Relevance to Aligned

Our interpretation: a strong reference for collecting comparative skill labels and evaluating tutorial-to-worker transfer. It also motivates testing whether extra reference footage actually helps, before adding that cost to our pipeline.

## Human notes
