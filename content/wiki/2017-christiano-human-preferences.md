---
year: 2017
venue: "NeurIPS"
affiliations: [OpenAI, DeepMind]
research_groups: []
reviewed: false
tags: [method, reward-learning, preference-learning, robot-learning]
---

# Deep Reinforcement Learning from Human Preferences

A learned reward model turns human comparisons of short behavior clips into a training signal for deep reinforcement learning.

**Authors:** Paul F Christiano, Jan Leike, Tom B Brown, Miljan Martic, Shane Legg, Dario Amodei.
**Paper:** [PDF](../raw/2017-christiano-human-preferences.pdf)
**Website:** [Official research announcement](https://openai.com/index/learning-from-human-preferences/)
**Code:** Not found in checked sources. A [third-party reproduction](https://github.com/mrahtz/learning-from-human-preferences) explicitly identifies itself as a reproduction.
**Source version:** arXiv:1706.03741v4, 17 February 2023, a revision of the [2017 conference paper](https://proceedings.neurips.cc/paper/2017/hash/d5e2c0adad503c91f91df240d0cd4e49-Abstract.html). Affiliations follow the stored PDF, which gives Brown an email address without an institution.
**Citations:** 1058 ([OpenAlex](https://openalex.org/W2626804490), checked 2026-11-03).

![Human preference learning and reward prediction loop](../assets/2017-christiano-human-preferences.png)

*Figure 1. Human preference learning and reward prediction loop. Source: [original paper, PDF p. 2](../raw/2017-christiano-human-preferences.pdf#page=2).*

## Problem and contribution

Desired behavior can be easier to recognize than to demonstrate or encode as a reward. The contribution is scaling preference-based reward learning to deep RL while limiting human queries, rather than asking humans to score every environment step (§1).

## Approach

Three processes run asynchronously: a policy collects trajectories, humans compare selected 1–2-second clips, and an ensemble of reward networks learns from those comparisons. A Bradley–Terry likelihood compares summed predicted rewards across each pair. Ties receive equal preference probability, while incomparable pairs are discarded. Ensemble disagreement selects further queries, although the authors find this heuristic can hurt some tasks (§2.2).

The persistent supervision is a database of comparisons, alongside learned reward and policy parameters. MuJoCo reward networks consume simulator observations/actions, whereas Atari reward networks consume four stacked image frames. Normalized predicted rewards train TRPO policies for simulated robotics and A2C policies for Atari. These are the original policy optimizers, not PPO. Human feedback continues during learning to follow the policy's changing behavior. Once trained, the policy chooses actions from observations without requiring a new human comparison for each action (§2, Appendix A).

## Evidence and limits

Experiments cover eight MuJoCo tasks and seven Atari games. Around 700 comparisons approach true-reward training on the simulated control tasks. Atari results with 5,500 human comparisons are mixed, including poor Qbert learning. Human-feedback curves are single runs, whereas synthetic-feedback and true-reward baselines average several runs (Figs. 2–3). A simulated backflip takes 900 author comparisons (§3.2).

Offline-only feedback permits reward exploitation, illustrated by endless Pong volleys. Short clips can conceal task context, and human inconsistency affects learning. Benchmark environments are modified to suppress reward leakage through scores and termination signals (§3.3, Appendix A).

**Practical evidence:** Contractors interact with the labeling system, with measured response times and learning outcomes (§3.1, Appendix B). This is training supervision, not a practical user evaluation, physical robot experiment, or operational deployment.

## Research connections

- **Builds on:** Akrour et al., *APRIL* (2012) and *Programming by Feedback* (2014) — adapts their reward-learning/policy-optimization loop to nonlinear models and short clips (§1.1).
- **Builds on:** Wilson et al., *A Bayesian Approach for Policy Learning from Trajectory Preference Queries* (2012) — adopts trajectory comparisons while relaxing their reset and reward-model assumptions (§§1.1, 2.1).

## Relevance to Aligned

Our interpretation: comparative judgments could train task-specific quality rewards, but reliable worker assessment requires evidence beyond short clips and testing against reward exploitation.

## Human notes
