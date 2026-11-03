---
year: 2026
venue: "CoRL 2026"
affiliations: ["Stanford University"]
research_groups: [stanford-iris]
reviewed: false
tags: [reward-learning, preference-learning, execution-quality, robot-learning, rl-fine-tuning, real-world-evaluation]
---

# Freeform Preference Learning for Robotic Manipulation

FPL learns rewards along human-defined preference axes and conditions a robot policy on the desired trade-off between them.

**Authors:** Marcel Torne, Anubha Mahajan, Abhijnya Bhat, Chelsea Finn.
**Paper:** [PDF](../raw/2026-torne-freeform-preference.pdf) · [arXiv v3](https://arxiv.org/abs/2606.32027v3)
**Website:** [Project](https://freeform-pl.github.io/fpl.website/)
**Code:** [Reward learning and simulation](https://github.com/freeform-pl/fpl) · [Real-robot experiments](https://github.com/freeform-pl/fpl_real)

The stored August 2026 v3 predates the CoRL 2026 acceptance listed by [Stanford IRIS](https://irislab.stanford.edu/publications.html).

![Freeform Preference Learning: Figure 1 from the paper](../assets/2026-torne-freeform-preference.png)

*Figure 1 from the original paper ([PDF page 2](../raw/2026-torne-freeform-preference.pdf#page=2)).*

## Problem and contribution

Binary success cannot express preferences such as speed, gentleness or execution style. A single preference reward also fixes the trade-off during training. FPL learns separate, language-specified quality axes and trains one policy that can respond to different requested score combinations (§§1, 3).

## Approach

Trajectory pairs + axis descriptions + human comparisons → axis-conditioned reward model → scored demonstrations → reward-conditioned policy.

The reward model learns which trajectory a person prefers along a specified axis. For real-robot experiments, it uses Qwen3.5-VL-4B with a frozen vision encoder. The learned reward labels demonstrations across the selected axes. Their scores become part of the text conditioning for a π0.5 policy, which is fine-tuned through supervised reward-conditioned policy fitting. The paper frames this as offline or batch-online RL policy extraction, without policy-gradient updates. Collecting more policy rollouts, preferences and demonstrations supports further training (§3, Appendix §§9.1–9.3).

At deployment, changing requested scores steers the policy within its selected axis set. The simulated experiments use state inputs and separate reward heads, so they should not be read as additional tests of the real-world video-language implementation.

## Evidence and limits

The paper evaluates four real manipulation tasks and two simulated tasks, with twenty real rollouts per method and three simulation seeds (§§4–5). Results support task-specific quality trade-offs, not a universal measure of competence.

Human preference collection remains necessary. Dense temporal rewards are illustrated qualitatively (§5.3). Table 8 calls an aggregate a success rate while the project page calls it task progress, so those labels should not be silently equated. Transfer to passive worker-camera video is untested.

## Research connections

- **Builds on:** [[2017-christiano-human-preferences]] — extends trajectory-preference reward learning to language-defined axes (§§2–3.1).
- **Builds on:** π0.5 — the real-world policy backbone conditioned on quality scores (Appendix §9.2).
- **Cites:** [[2026-liang-robometer]] and [[2026-lee-roboreward]] — general robotic reward models (§1).
- **Compares with:** π0.6*-style advantage conditioning — a baseline using scalar advantages derived from success/failure rewards and time cost (Appendix §9.4).

## Relevance to Aligned

Our interpretation: a useful formulation for making “good execution” explicit through separate human-defined criteria. The immediate question is whether such preferences can be collected consistently for construction work. Policy conditioning is a later robotics application, after the video evidence and evaluation axes are reliable.

## Human notes

