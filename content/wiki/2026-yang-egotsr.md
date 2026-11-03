---
year: 2026
venue: "arXiv preprint"
affiliations: ["Zhejiang University", "Qingdao University", "Tianjin University", "National University of Singapore"]
research_groups: []
reviewed: false
tags: [procedure-understanding, state-changes, spatial-understanding, egocentric-video]
---

# EgoTSR++: Egocentric Spatiotemporal Reasoning for Task Progress Understanding

EgoTSR++ learns to compare two visual states against a task goal, testing whether its judgment survives swapped inputs, regressions and recovery.

**Authors:** Xiaoda Yang, Can Wang, Yuxiang Liu, Pengfei Zhou, Jianwen Lou, Shuicheng Yan.
**Paper:** [PDF](../raw/2026-yang-egotsr.pdf) · [arXiv v1](https://arxiv.org/abs/2609.31751v1)
**Website:** Not found in checked sources.
**Code:** Not found in checked sources for this version.

![EgoTSR++: Figure 1 from the paper](../assets/2026-yang-egotsr.png)

*Figure 1 from the original paper ([PDF page 2](../raw/2026-yang-egotsr.pdf#page=2)).*

## Problem and contribution

A video model may mistake chronological order for task progress: a later frame is not necessarily closer to the goal after an error. EgoTSR++ frames progress as a goal-conditioned comparison and tests both presentation orders of each physical image pair. The answer should follow the visual state, regardless of which input slot contains it (§§3–4).

## Approach

Task instruction and two images → fine-tuned vision-language comparator → choice of the state closer to completion.

Training pairs come primarily from successful, approximately monotonic trajectories, where the later frame supplies the preference label. Both input orders are included. A two-stage curriculum first teaches explicit task-relevant reasoning with chain-of-thought examples, then scales training with direct answer labels. The main model fully fine-tunes Qwen2.5-VL-7B (§§5–6, Fig. 4).

For long-horizon pairs, LongTag adds an ordered subtask outline. A separately trained planner predicts this outline from the initial observation and task instruction at test time. Ground-truth subtask metadata is confined to training. Failure-aware training separately adds non-monotonic executions, including regressions and repairs (§§5.2, 7).

The evaluated interface is a pairwise query, not continuous video monitoring. It stores learned parameters rather than a persistent event memory, and produces neither an absolute completion percentage nor an action policy.

## Evidence and limits

The complete curriculum reports 87.5% short-horizon and 92.4% long-horizon comparison accuracy, with a 0.1-point long-horizon forward/inverse gap (Table 2). On the separate fixed-window failure evaluation, failure-aware training raises accuracy to 75.9% and recovery accuracy to 69.8% across 1,345 physical pairs (Tables 7–9).

Temporal labels depend on approximately monotonic success. Order invariance alone cannot establish physical correctness. Recovery evaluation covers only nine source videos. The PDF refers to supplementary split and training details that are absent from this version, and a release for EgoTSR++ is unverified. Table 6 also reports a nonzero order gap for a separately scored single-image baseline, without explaining tie handling or other order-dependent effects. Construction defects, worker competence and downstream robot control remain unvalidated.

## Research connections

- **Cites:** [From Perception to Planning](https://arxiv.org/abs/2604.10517) — earlier EgoTSR work discussed in the motivation (§1, reference 4).
- **Builds on:** AgiBot World, Open X-Embodiment, EPIC-KITCHENS and [[2022-grauman-ego4d]] — converts their trajectories into comparison supervision (§5.1).

## Relevance to Aligned

Our interpretation: a candidate for comparing task checkpoints or ranking apparent progress. Construction use needs explicit outcome labels and recovery examples before interpreting progress preferences as evidence of quality.

## Human notes
