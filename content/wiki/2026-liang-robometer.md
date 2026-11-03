---
year: 2026
venue: "RSS"
affiliations: ["University of Southern California", "UT Dallas", "MIT", "University of Washington", "Ai2", "NVIDIA"]
research_groups: [usc-lira, uw-rse, utd-irvl, mit-clear]
reviewed: false
tags: [reward-learning, preference-learning, execution-quality, robot-learning, rl-fine-tuning, real-world-evaluation]
---

# Robometer: Scaling General-Purpose Robotic Reward Models via Trajectory Comparisons

Robometer combines progress prediction with trajectory comparisons to learn from successful and failed behavior and support robot policy improvement.

**Authors:** Anthony Liang, Yigit Korkmaz, Jiahui Zhang, Minyoung Hwang, Abrar Anwar, Sidhant Kaushik, Aditya Shah, Alex S. Huang, Luke Zettlemoyer, Dieter Fox, Yu Xiang, Anqi Li, Andreea Bobu, Abhishek Gupta, Stephen Tu, Erdem Bıyık, Jesse Zhang. Sidhant Kaushik is listed as an independent researcher.
**Paper:** [PDF](../raw/2026-liang-robometer.pdf)
**Source version:** arXiv 2603.02115v2, 13 May 2026. [RSS 2026 proceedings](https://www.roboticsproceedings.org/rss22/p140.html).
**Website:** [Project website](https://robometer.github.io/)
**Code:** [Reward model](https://github.com/robometer/robometer) · [Policy learning](https://github.com/robometer/robometer-policy-learning)

![Robometer: Figure 1 from the paper](../assets/2026-liang-robometer.png)

*Figure 1 from the original paper ([PDF page 1](../raw/2026-liang-robometer.pdf#page=1)).*

## Problem and contribution

Successful demonstrations provide convenient progress targets, but arbitrary progress percentages are difficult to assign to failures. Robometer adds relative trajectory comparisons: deciding which execution better completes an instruction can use data that lacks dense progress labels. Its contribution is a shared reward model trained with both forms of supervision (§§I–III).

## Approach

**Training:** RBM-1M combines robot, human and simulated videos with more than one million video-language annotations. Successful demonstrations supply time-derived progress targets. Success/failure contrasts, mismatched instructions and rewound videos produce comparison examples without collecting new human pairwise preferences. Existing outcome information and curated demonstrations are still needed (§III-A,D, Appendix A).

A Qwen3-VL-4B backbone receives an instruction and sampled video frames. Learned progress tokens feed progress and success heads. A separate preference token compares two trajectories. Their losses jointly shape the representation, while causal masking prevents a progress prediction from using future frames (§III-B–C, Appendix Fig. 11).

**Inference:** one trajectory yields progress and success estimates for sampled observations. Two trajectories additionally yield a preference. Sparse sampling makes inference practical but does not preserve a detailed long-term execution memory. The scores can supply RL rewards, select useful demonstration segments, or flag stalled execution. In the physical online experiment, predicted success also controls termination and stage transitions, while humans reset the scene (§IV-Q3).

## Evidence and limits

Two physical online tasks improve from 20% base-policy success to 85% and 70%, each measured over 20 evaluation trials. Separate experiments test offline learning, demonstration retrieval and failure detection (§IV-Q3, Figs. 6–8).

High temporal-order correlation on successful videos does not establish reliable failure assessment. The paper explicitly identifies sparse-history limitations, rare or subtle failures, and unobserved contact forces or grasp stability (§V). Its reported learning gains are specific to the evaluated robot tasks, not construction-worker footage.

## Research connections

- **Compares with:** [[2026-lee-roboreward]] — tests reward quality and downstream learning against episodic completion scoring (§IV).
- **Builds on:** [[2025-zhang-rewind]] — uses video rewinding to create regressing executions (§III-D).
- **Compares with:** TOPReward — a training-free VLM reward baseline (§IV-Q1).

## Relevance to Aligned

Our interpretation: useful for ranking demonstrations and distinguishing relevant, successful segments before robot training. A separate human-reviewed assessment protocol must establish whether its preferences agree with construction quality and whether important failures remain visible after frame sampling.

## Human notes
