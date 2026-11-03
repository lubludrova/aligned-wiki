---
year: 2026
venue: "arXiv"
affiliations: ["AIM3 Lab, Renmin University of China", "MiLM Plus, Xiaomi Inc.", "Peking University"]
research_groups: []
reviewed: false
tags: [dataset, benchmark, method, video-representation, video-qa]
---

# StreamPro: From Reactive Perception to Proactive Decision-Making in Streaming Video

StreamPro combines class-balanced streaming supervision with multi-turn reinforcement learning to optimize response content, timing and trajectory coherence.

**Authors:** Ao Li, Zihan Xiao, Zihao Yue, Boshen Xu, Linli Yao, Jiaze Li, Pei Fu, Jianzhong Ju, Jian Luan, Qin Jin.
**Paper:** [PDF](../raw/2026-li-streampro.pdf)
**Website:** Not found in checked sources.
**Code:** Not found in checked sources.

**Source version:** arXiv:2605.16381v1, 11 May 2026, including appendices.
**Citations:** 0 ([OpenAlex](https://openalex.org/W7161704811), checked 2026-11-03).

![StreamPro: Figure 4 from the paper](../assets/2026-li-streampro.png)

*Figure 4 from the original paper ([PDF page 6](../raw/2026-li-streampro.pdf#page=6)).*

## Problem and contribution

Silence vastly outnumbers useful responses in streams, while optimizing each answer alone can reward fragmented or chronologically incoherent output. StreamPro treats triggering as a decision under partial observations and evaluates both reactive perception and early intervention (§§1, 3).

## Approach

At each step, a video LLM emits Silence or Response plus text. Supervised fine-tuning reweights decision tokens by effective class frequency. GRPO then combines output-format rewards, content/timing rewards and an LLM-judged trajectory rubric covering granularity, sequence and coverage (§4).

The reward deliberately differs from the evaluation metric: training adds semantic and timing scores and widens timing tolerance to avoid sparse rewards, while evaluation multiplies them. The benchmark matches responses to annotated events and penalizes excessive or missed outputs. Training introduces 63K supervised and 3K RL samples, mixing the supervised set with TimeChat-Online-139K, VideoChat-Flash-3K and 287K filtered Streamo examples. Evaluation tasks include event narration, object changes, anomalies, temporal reasoning, next-step guidance and pedestrian risk forecasting (§§3.3–4.3, Appendix B).

## Evidence and limits

StreamPro-Bench contains 577 videos and 1,285 QA pairs. The 4B GRPO model reaches weighted overall F1 41.5, but its Proactive Agency F1 is only 7.6, compared with 45.0 for perceptual understanding and 44.4 for temporal reasoning. The unweighted overall score is 32.3, not 41.5 (Table 2). Most semantic correctness comes from an LLM judge, and task-specific timing windows materially affect credit (§3.3, Appendix A.2).

This is a preprint benchmark/training study. Its synthetic 63K/3K training sets exclude Risk Forecasting and omit human review, unlike benchmark construction (Appendix B.2). Early-risk results concern first-person pedestrian hazards, not construction safety. The paper provides no established whole-shift compute or end-to-end response latency. A paper-specific official code release was not identified in checked sources.

## Research connections

- **Builds on:** [[2026-xia-streamo]] — adopts decision-token streaming and compares class-balanced loss against its focal loss (§2, Table 5).
- **Compares with:** MMDuet2, Wang et al. (2026) — evaluates another multi-turn RL approach to proactive interaction (Table 2).

## Relevance to Aligned

Our interpretation: Especially useful for designing trigger rewards and measuring the tradeoff between premature, late, redundant and missed reports. Its weak early-agency score argues for explicit safety validation and conservative interpretation rather than treating aggregate video understanding as reliable anticipation.

## Human notes

