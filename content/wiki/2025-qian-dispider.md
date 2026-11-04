---
year: 2025
venue: "CVPR"
affiliations: ["The Chinese University of Hong Kong", "Shanghai AI Laboratory"]
research_groups: []
reviewed: false
tags: [method, video-qa, video-memory, efficient-processing, sft]
---

# Dispider: Enabling Video LLMs with Active Real-Time Interaction via Disentangled Perception, Decision, and Reaction

Dispider separates streaming perception and response decisions from an asynchronous answer generator so observation can continue during language output.

**Authors:** Rui Qian, Shuangrui Ding, Xiaoyi Dong, Pan Zhang, Yuhang Zang, Yuhang Cao, Dahua Lin, Jiaqi Wang.
**Paper:** [PDF](../raw/2025-qian-dispider.pdf)
**Website:** Not found in checked sources.
**Code:** [GitHub repository](https://github.com/Mark12Ding/Dispider)

**Source version:** arXiv:2501.03218v1, 6 January 2025. CVPR 2025 publication confirmed by the official repository.
**Citations:** 23 ([OpenAlex](https://openalex.org/W4413157343), checked 2026-11-03).

![Dispider asynchronous perception, decision, and response](../assets/2025-qian-dispider.png)

*Figure 1. Dispider asynchronous perception, decision, and response. Source: [original paper, PDF p. 1](../raw/2025-qian-dispider.pdf#page=1).*

## Problem and contribution

A single video LLM faces competing demands: cheap continuous observation, deciding when enough evidence exists and generating detailed answers. Dispider assigns these functions to separate modules while maintaining query and response-time context (§3).

## Approach

Visual-change boundaries divide the observed stream into nonuniform clips. A compact Qwen2-1.5B processor compresses clip features and maintains pooled history. A binary decision head reads this memory, the question and special pending/answered markers. Its history deliberately excludes generated answer text, preventing the large generator from blocking observation (§3.2).

When triggered, a Qwen2-7B reaction module receives the query, earlier answers and relevant historical clips retrieved using the decision representation. Temporal relevance labels train this retrieval. Negative training examples let the reaction module reject unnecessary triggers. Supervision combines grounded QA, temporal annotations and constructed streaming QA (§§3.3, 4.1). The system is principally query-conditioned. It is not a general query-independent event ledger.

## Evidence and limits

The streaming ETBench evaluation places the instruction at the beginning of each video. Dispider reaches temporal-grounding F1 36.1 versus 13.2 for VideoLLM-online, and dense-caption F1 33.8 versus 24.0. Its offline answers are evaluated separately (Table 3). StreamingBench proactive-output performance remains 25.34, so successful examples do not imply reliable triggering (Table 1).

The paper reports 1 fps sampling, which is not measured end-to-end latency or a full multi-camera compute budget. Scene-change segmentation may be less informative for stationary construction cameras. The current repository exposes inference and evaluation with checkpoint links, but explicitly excludes training objectives and trainer code (§4.1, repository README).

## Research connections

- **Builds on:** [[2024-chen-videollm-online]] — adopts streaming dialogue formulation and targets its blocked response-generation behavior (§§2.3, 3.1).
- **Compares with:** MovieChat, Song et al. (2024) — includes a memory-based long-video QA baseline, separately from proactive evaluation (Table 2).

## Relevance to Aligned

Our interpretation: A strong architectural reference for a cheap always-running observer and a more expensive verifier/report writer. Construction use still needs standing monitoring policies, evidence-preserving event records and causal throughput tests under overlapping events.

## Human notes

