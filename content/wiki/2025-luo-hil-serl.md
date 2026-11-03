---
year: 2025
venue: "Science Robotics"
affiliations: ["UC Berkeley"]
research_groups: [berkeley-rail]
reviewed: false
tags: [robot-learning, reward-learning, real-world-evaluation]
---

# Precise and Dexterous Robotic Manipulation via Human-in-the-Loop Reinforcement Learning

HIL-SERL combines learned success detection, demonstrations and human corrections to improve physical robot skills through online reinforcement learning.

**Authors:** Jianlan Luo, Charles Xu, Jeffrey Wu, Sergey Levine.
**Paper:** [PDF](../raw/2025-luo-hil-serl.pdf)
**Source version:** arXiv 2410.21845v3, 20 March 2025. [Science Robotics publication confirmed by the first author](https://jianlanluo.github.io/).
**Website:** [Project website](https://hil-serl.github.io/)
**Code:** [GitHub repository](https://github.com/rail-berkeley/hil-serl)

![HIL-SERL actor, learner, and replay architecture](../assets/2025-luo-hil-serl.png)

*Figure 2. HIL-SERL actor, learner, and replay architecture. Source: [original paper, PDF p. 6](../raw/2025-luo-hil-serl.pdf#page=6).*

## Problem and contribution

Imitating demonstrations can reproduce imperfect behavior, while learning manipulation from scratch requires too much physical exploration. HIL-SERL integrates an existing off-policy RL algorithm with visual representations, task-success detection, human corrections and robot control. Its contribution is a working system across difficult manipulation tasks, rather than a general skill-assessment model (§§1–3).

## Approach

**Training:** people label successful and unsuccessful images to train a task-specific binary reward classifier, then provide roughly 20–30 teleoperated demonstrations. During robot trials, a human can take over to correct an action. Policy experience enters an online replay buffer, while interventions enter both online and demonstration buffers. A separate learner samples equally from the two buffers and updates the policy and critic using RLPD (§§3.3–3.5, Fig. 2).

**Input to action:** streaming camera images pass through an ImageNet-pretrained ResNet-10. Its features combine with robot proprioception, then policy networks produce end-effector commands and, where needed, gripper decisions. A low-level controller executes them. The success classifier supplies sparse completion rewards during learning. The persistent learning state is the replay data and network weights, rather than a searchable video memory. Deployment uses the learned policy, while physical resets and task setup remain separate requirements.

## Evidence and limits

Table 1 reports 100% success over 100 evaluation trials per individual task, covering insertion, assembly, handover and dynamic manipulation. Most training runs take 1–2.5 hours, but timing-belt assembly takes six. The chained IKEA assembly uses scripted transitions and only ten trials. These are results within the paper's task setups, not a guarantee of reliability (§§4.2–4.3).

The authors did not test extensive randomization or generalization to unstructured environments. Longer horizons remain uncertain, and every task requires its own training and success definition (§6).

## Research connections

- **Builds on:** SERL, Luo et al. (2024) — adds online human corrections to demonstration-assisted RL (§2).
- **Builds on:** RLPD, Ball et al. (2023) — mixes prior and online data for off-policy learning (§3.3).
- **Compares with:** HG-DAgger, Kelly et al. (2018) — imitation baseline using comparable demonstrations and corrections (§4.3).

## Relevance to Aligned

Our interpretation: a useful future pattern for turning a validated outcome detector and human correction into policy improvement. It does not show that passive worker video can supply the required robot actions, success labels or trustworthy proof of skill.

## Human notes
