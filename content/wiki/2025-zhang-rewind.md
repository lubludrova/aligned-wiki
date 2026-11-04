---
year: 2025
venue: "CoRL"
affiliations: ["University of Southern California", "Amazon Robotics", "KAIST"]
research_groups: [usc-lira]
reviewed: false
tags: [method, reward-learning, robot-learning, rl-fine-tuning, real-world-evaluation, rl, supervised-training]
---

# ReWiND: Language-Guided Rewards Teach Robot Policies without New Demonstrations

ReWiND learns language-conditioned progress rewards from demonstrations and synthetic reversals, then uses them for offline-to-online robot policy learning.

**Authors:** Jiahui Zhang, Yusen Luo, Abrar Anwar, Sumedh A. Sontakke, Joseph J. Lim, Jesse Thomason, Erdem Bıyık, Jesse Zhang.
**Paper:** [PDF](../raw/2025-zhang-rewind.pdf)
**Website:** [Project website](https://rewind-reward.github.io/)
**Code:** [GitHub repository](https://github.com/rewind-reward/ReWiND)
**Source version:** arXiv:2505.10911v2, 19 September 2025, first released 16 May 2025. [CoRL 2025 oral](https://openreview.net/forum?id=XjjXLxfPou), also listed by the project and USC LiraLab publication catalog.
**Citations:** 0 ([OpenAlex](https://openalex.org/W4417093146), checked 2026-11-03).

![ReWiND reward pre-training and transfer to a new task](../assets/2025-zhang-rewind.png)

*Figure 1. ReWiND reward pre-training and transfer to a new task. Source: [original paper, PDF p. 2](../raw/2025-zhang-rewind.pdf#page=2).*

## Problem and contribution

A reward model must recognize failure as well as progress if it is to improve policies on unseen task variations. ReWiND addresses this with a small demonstration set from the target environment plus roughly 350,000 Open-X trajectories. It removes the need for demonstrations of each new variation, but still assumes initial demonstrations and human supervision during online learning (§§1–3).

## Approach

Frozen DINOv2 image and MiniLM language embeddings feed a four-layer causal transformer and per-frame reward head. Training downsamples clips to 16 frames. Only the first image receives a positional embedding, discouraging prediction from elapsed time alone. The model regresses normalized demonstration progress, assigns zero to mismatched instructions, and learns decreasing targets from randomly reversed video suffixes. Instruction paraphrases expand linguistic coverage (§3.1, Appendix A).

These labels come from demonstration chronology and synthetic rewinding, not human preference comparisons. Rewinding may produce physically impossible motion. The representation retains episode history through sampled visual tokens rather than an external retrieval memory.

The learned model labels offline trajectories for IQL policy pretraining. Online SAC-based updates then optimize policy rollouts for a new instruction. Physical experiments use an action-chunked transformer regularized toward its pretrained policy. Although reward attention is causal, the implementation labels collected rollouts for replay-based learning, without demonstrating a continuously running reward service or reporting reward-query latency. Human success bonuses and manual environment resets remain necessary (§3.2, Appendices A–C).

## Evidence and limits

On eight selected MetaWorld tasks across three seeds, success reaches a 79% interquartile mean after 100,000 environment steps (Figure 5). On Koch bimanual hardware, average success rises from 12% to 68% across five tasks, evaluated with ten trials each after about one hour of online training per task. This mixture includes two familiar tasks and three visual, spatial, or language variations, not five entirely unseen skills (§4.2, Figure 6).

Removing rewinding reduces normalized policy performance by 33% (Table 3). Frozen features struggle with occluded bimanual scrubbing, and poor initial behavior can prevent improvement. Chronological progress is a proxy for competence, not a calibrated execution-quality score (§5).

## Research connections

- **Builds on:** IQL and SAC — provide offline pretraining and online optimization (Appendix A.1.3).
- **Compares with:** LIV, RoboCLIP, VLC, and GVL — reward generalization and policy-rollout alignment baselines (§4.1).
- **Cites:** [[2025-luo-hil-serl]] — supports human-provided success feedback (§3.2, reference 56).

## Relevance to Aligned

Our interpretation: synthetic regressions offer inexpensive negative supervision, but reward validation must include realistic failures and distinguish task progress from execution quality.

## Human notes
