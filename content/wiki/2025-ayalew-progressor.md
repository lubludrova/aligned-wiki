---
year: 2025
venue: "ICCV"
affiliations: ["University of Chicago", "Toyota Technological Institute at Chicago"]
research_groups: [ttic-ripl]
reviewed: false
tags: [reward-learning, robot-learning, egocentric-video, real-world-evaluation]
---

# PROGRESSOR: A Perceptually Guided Reward Estimator with Self-Supervised Online Refinement

PROGRESSOR learns visual progress rewards from demonstrations and tests their use in simulated online RL and human-video-pretrained robot imitation.

**Authors:** Tewodros W. Ayalew, Xiao Zhang, Kevin Yuanbo Wu, Tianchong Jiang, Michael Maire, Matthew R. Walter.
**Paper:** [PDF](../raw/2025-ayalew-progressor.pdf)
**Source version:** Ten-page [accepted ICCV 2025 proceedings paper](https://openaccess.thecvf.com/content/ICCV2025/html/Ayalew_PROGRESSOR_A_Perceptually_Guided_Reward_Estimator_with_Self-Supervised_Online_Refinement_ICCV_2025_paper.html), not the earlier arXiv manuscript. Separate supplementary material was not reviewed.
**Website:** [Project website](https://ripl.github.io/progressor/)
**Code:** [GitHub repository](https://github.com/ripl/progressor)

![PROGRESSOR visual progress estimation and reinforcement learning](../assets/2025-ayalew-progressor.png)

*Figure 1. PROGRESSOR visual progress estimation and reinforcement learning. Source: [original paper, PDF p. 1](../raw/2025-ayalew-progressor.pdf#page=1).*

## Problem and contribution

Dense task rewards are expensive to specify. Video representations can provide a substitute, but a reward trained only on successful demonstrations may misjudge the unfamiliar states a learning robot visits. PROGRESSOR predicts progress with uncertainty and proposes an online correction mechanism for this distribution shift (§§1–2).

## Approach

**Reward training:** sample an initial, intermediate and goal image from an expert video. Their relative timestamps provide a progress target, assuming the demonstration advances toward completion. A shared visual encoder processes the three images, then MLPs predict the mean and variance of a Gaussian progress distribution. Learning matches this distribution to the temporal target (§4.1).

**Inference:** the initial image, current observation and supplied goal image produce a progress estimate. The reward subtracts an uncertainty penalty from predicted progress. This is a learned comparison of three observations, rather than a memory of the complete execution.

**Policy learning:** in simulated online RL, the model periodically reduces its progress predictions on policy-generated observations while retaining expert supervision. This “push-back” discourages exploiting optimistic rewards (§4.2, Fig. 2). The separate physical-robot experiment freezes a reward model pretrained on EPIC-KITCHENS human video and uses its scores to weight action-labeled robot demonstrations when training ACT (§5.2). Human video supplies reward pretraining, while people still supply robot demonstrations and goal observations.

## Evidence and limits

Online refinement is evaluated on six Meta-World tasks. Human-video transfer is evaluated on four UR5 tasks, with 40 demonstrations per task, half unsuccessful, and 20 evaluation rollouts per method (§5, Fig. 5). These are separate experimental settings, not evidence of online hardware RL from human footage alone.

The method assumes visually observable states and approximately monotonic expert progress. Repeated actions, necessary temporary regressions or hidden task state can undermine its timestamp-derived targets (§§1, 3–4). Push-back can also penalize already competent policy behavior (§5.1).

## Research connections

- **Builds on:** Rank2Reward, Yang et al. (2024) — temporal ranking motivates progress rewards and handling non-expert observations (§2).
- **Compares with:** [[2023-ma-vip]] — a visual reward baseline retrained on the same EPIC-KITCHENS subset (§5.2.2).
- **Builds on:** ACT, Zhao et al. (2023) — adds reward weighting to its action-reconstruction loss (§5.2.3).

## Relevance to Aligned

Our interpretation: human work video could help learn a reusable progress signal for future robot training. Progress still needs validation against actual outcomes and execution quality before it can support worker skill assessment.

## Human notes
