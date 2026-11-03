---
year: 2026
venue: COLM 2026
affiliations:
- University of North Carolina at Chapel Hill
- Nanyang Technological University
research_groups: []
reviewed: false
tags:
- video-memory
- video-qa
- egocentric-video
---

# EgoMemReason: A Memory-Driven Reasoning Benchmark for Long-Horizon Egocentric Video Understanding

Tests whether video memories can combine multiple observations across days to track entities, order events and infer routines.

**Authors:** Ziyang Wang, Yue Zhang, Shoubin Yu, Ce Zhang, Zengqi Zhao, Jaehong Yoon, Hyunji Lee, Gedas Bertasius, Mohit Bansal.

**Paper:** [PDF](../raw/2026-wang-egomemreason.pdf) · [arXiv](https://arxiv.org/abs/2605.09874v2)

**Website:** [Project website](https://egomemreason.github.io/)

**Code:** [GitHub repository](https://github.com/Ziyang412/EgoMemReason) — evaluation scripts, annotations and dataset access instructions.

**Source version:** arXiv 2605.09874v2, 18 August 2026. The archived PDF is marked COLM 2026, also confirmed by the conference proceedings.

![EgoMemReason: Figure 4 from the paper](../assets/2026-wang-egomemreason.png)

*Figure 4 from the original paper ([PDF page 6](../raw/2026-wang-egomemreason.pdf#page=6)).*

## Problem and contribution

Finding one relevant clip is insufficient when a question asks how an object changed or which routine recurred across several days. EgoMemReason separates entity, event and behavior memory into six tasks. Its contribution is an evidence-aggregation benchmark, not a new persistent-memory architecture.

## Approach

The benchmark reuses EgoLife recordings. Object-centered captions and hierarchical summaries support candidate question generation, followed by language-only filtering, visual evidence checking and two stages of human review. The second stage independently re-answers questions against the recording, mitigating the first stage's exposure to proposed answers.

Each question has a query time and supporting evidence segments. Models may use only observations before that time. They return a multiple-choice answer using sampled video or agent-specific retrieval. This causal prefix restriction does not establish bounded-state streaming ingestion.

## Evidence and limits

The 500 questions require an average of 5.1 evidence segments and 25.9 hours of backtracking (§3.3). In Table 1, Gemini-3-Flash reaches 39.6% overall, WorldMM 30.6%, and the random reference 16.8%. Giving Gemini oracle evidence raises accuracy to 67.2% (Appendix C.3), exposing both retrieval failures and substantial reasoning difficulty even with the relevant clips.

The data still come from the same six EgoLife participants in one shared week and environment. This is not population diversity or construction validation. Frame limits and agent settings vary, so the 17-system table is not a compute-matched architecture ranking. Model-assisted filtering and annotation can introduce selection bias despite the human checks. The public benchmark's v1.1 release reshuffles option letters, requiring remapping of older letter-only predictions. Raw video access remains subject to EgoLife's separate process.

## Research connections

- **Builds on:** [[2025-yang-egolife]] — supplies the recordings used to construct the benchmark (§3.3).
- **Compares with:** [[2026-yeo-worldmm]] — evaluated as a memory-agent baseline (Table 1).

## Relevance to Aligned

Our interpretation: adapt the task design to questions spanning repeated work, such as tracking a tool's location or checking whether a defect recurs across shifts. Keep evidence localization and evidence reasoning as separate diagnostics. The reported scores do not establish worker skill, causality or transfer to construction.

## Human notes
