---
year: 2026
venue: "arXiv preprint"
affiliations: ["Stanford University", "UC Berkeley"]
research_groups: [stanford-iris]
reviewed: false
tags: [dataset, benchmark, method, reward-learning, execution-quality, robot-learning, rl-fine-tuning, real-world-evaluation, sft]
---

# RoboReward: General-Purpose Vision-Language Reward Models for Robotics

RoboReward turns a task instruction and robot rollout into a completion score, with benchmarks and physical policy-learning tests.

**Authors:** Tony Lee, Andrew Wagenmaker, Karl Pertsch, Percy Liang, Sergey Levine, Chelsea Finn.
**Paper:** [PDF](../raw/2026-lee-roboreward.pdf)
**Source version:** arXiv 2601.00675v2, 8 January 2026.
**Website:** [RoboRewardBench](https://crfm.stanford.edu/helm/robo-reward-bench/)
**Code:** Not found in checked sources. [Official model weights and inference example](https://huggingface.co/teetone/RoboReward-8B) are available.
**Citations:** 0 ([OpenAlex](https://openalex.org/W7118501563), checked 2026-11-03).

![RoboReward: Figure 4 from the paper](../assets/2026-lee-roboreward.png)

*Figure 4 from the original paper ([PDF page 7](../raw/2026-lee-roboreward.pdf#page=7)).*

## Problem and contribution

Robot demonstration datasets contain many successes but insufficient failures for learning reliable rewards. General VLMs can also confuse partial completion with success. RoboReward combines a reward-training dataset, a human-verified evaluation benchmark and specialized VLMs that predict five levels of task completion (§§1, 4).

## Approach

**Training data:** start with Open X-Embodiment demonstrations and RoboArena rollouts. An offline VLM/LLM pipeline describes successful videos, proposes alternative task instructions for which those same videos represent failure or partial success, then verifies the resulting labels. Truncating successful videos creates additional partial-progress examples. Real RoboArena failures and human progress scores complement these synthetic negatives (§§4.1–4.2, Fig. 4).

Qwen3-VL models with 4B or 8B parameters learn from the resulting instruction/video/score pairs. Their visual backbone stays frozen while the fusion and language layers are fine-tuned. The retained representation is the trained model, not a persistent event memory (§4.3).

**Inference:** provide a task description and complete rollout video. One model produces an end-of-episode score from 1, no success, to 5, complete success. The expensive data-generation pipeline is unnecessary at inference. Physical learning uses this episodic score in DSRL to improve an already pretrained diffusion policy. This setup does not produce dense per-frame quality judgments by default (§5.2).

## Evidence and limits

RoboRewardBench contains 2,831 human-verified examples, with task descriptions disjoint from training. Its labels still express a specified completion rubric, rather than general physical skill (§4.3).

On two WidowX tasks, the 8B reward improves policy success from 5% to 50% and from 10% to 80%, measured over 20 trials per setting after 6,000 training steps. Human-provided rewards reach 75% and 90% (§5.2, Table 2). This is encouraging but narrow hardware evidence. Synthetic instruction changes and truncation do not exhaust real execution failures, and the paper identifies long-horizon evaluation as future work (§6).

## Research connections

- **Builds on:** Open X-Embodiment — supplies heterogeneous robot demonstrations for reward supervision (§4.1).
- **Builds on:** DSRL — adapts a pretrained diffusion policy using the learned episodic reward (§5.2).

## Relevance to Aligned

Our interpretation: a candidate baseline for scoring short, task-specific video episodes and testing whether those scores help downstream learning. Applying it to construction requires human validation of the rubric, failure coverage and domain transfer. Completion alone does not establish skill.

## Human notes
