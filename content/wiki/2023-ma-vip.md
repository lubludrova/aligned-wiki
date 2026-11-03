---
year: 2023
venue: "ICLR"
affiliations: ["FAIR, Meta AI", "University of Pennsylvania"]
research_groups: [meta-fair]
reviewed: false
tags: [method, reward-learning, video-representation, robot-learning, egocentric-video, real-world-evaluation]
---

# VIP: Towards Universal Visual Reward and Representation via Value-Implicit Pre-Training

VIP learns reusable visual representations and goal-image rewards from passive human video, then uses them for robot control without adapting the encoder.

**Authors:** Yecheng Jason Ma, Shagun Sodhani, Dinesh Jayaraman, Osbert Bastani, Vikash Kumar, Amy Zhang.
**Paper:** [PDF](../raw/2023-ma-vip.pdf)
**Website:** [Project website](https://sites.google.com/view/vip-rl)
**Code:** [GitHub repository](https://github.com/facebookresearch/vip)
**Source version:** arXiv:2210.00030v2, 7 March 2023. First released in 2022, published at ICLR 2023.
**Citations:** 47 ([OpenAlex](https://openalex.org/W4302010007), checked 2026-11-03).

![VIP value-implicit pre-training and visuomotor use](../assets/2023-ma-vip.png)

*Figure 1. VIP value-implicit pre-training and visuomotor use. Source: [original paper, PDF p. 2](../raw/2023-ma-vip.pdf#page=2).*

## Problem and contribution

An image encoder useful for imitation need not provide a useful reward when its distance to a goal image is optimized. VIP trains representations explicitly for this second role, using action-free human video rather than task-specific robot rewards (§§1–4).

## Approach

Offline video subtrajectories provide initial, intermediate, next and goal frames to a shared ResNet-50 encoder. A goal-conditioned offline-RL dual objective removes the need for action labels. The practical model represents value as negative Euclidean embedding distance, combining initial-to-goal attraction with a temporal-difference term. Supervision comes from temporal sampling and a synthetic goal-reaching reward, not human preferences (§4, Appendix D).

At inference, current and goal images become embeddings. The decrease in distance supplies a dense transition reward. The frozen encoder also supplies policy observations. Downstream controllers use trajectory optimization, simulated online RL or real-robot reward-weighted regression on offline demonstrations. This is a frame-based reward module, not a persistent video memory (§§3, 5).

## Evidence and limits

The experiments compare visual rewards across FrankaKitchen tasks and camera views. Appendix G.3 shows that comparable imitation representations can differ sharply as rewards, supporting the paper's central distinction.

**Practical evidence:** On a physical seven-DoF Franka, VIP-weighted regression achieves 100%, 90%, 60% and 90% success across four tabletop tasks, with only ten evaluation rollouts per task. Three tasks use twenty demonstrations each. Drawer closing uses ten demonstrations plus twenty failures (§5.2, Table 1, Appendix F, Table 3).

These are small controlled tests with manually checked success and fixed camera placement. A static goal cannot express required intermediate steps, and symmetric distance poorly represents irreversible transitions. Goals from different domains and general task-quality judgments remain untested (Appendix H).

## Research connections

- **Builds on:** [[2022-grauman-ego4d]] — supplies the passive human videos used for pretraining (§5, Appendix D.1).
- **Compares with:** R3M, Nair et al. (2022) — shares the pretraining data and tests both embedding rewards and imitation performance (§5, Appendix G.3).

## Relevance to Aligned

Our interpretation: VIP is a useful baseline for visual progress rewards and future robot learning. Construction procedures would require additional evidence about object condition, required steps and irreversible mistakes before such a score could support proof of skill.

## Human notes
