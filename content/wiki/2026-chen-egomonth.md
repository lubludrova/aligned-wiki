---
year: 2026
venue: "arXiv preprint"
affiliations: ["Nanjing University", "Huawei Technologies Co., Ltd.", "Tianjin University"]
research_groups: []
reviewed: false
tags: ["video-memory", "video-qa", "egocentric-video"]
---

# EgoMonth: A Month-Level Egocentric Video Benchmark for Long-Term Spatiotemporal Memory

Tests exact episodic recall and cross-day reasoning using first-person recordings spanning 20–120 days per participant.

**Authors:** Weitao Chen, Hu Jiaxin, Xie Tianyidan, Yang Li, Yuyi Qian, Banghao Xu, Ziheng Tang, Shenyi Wang, Mingyue Yu, Duo Li, Jiacheng Shi, Gao Wang, Zhan Xu, Zhicheng Qiu, Xuanfu Li, Jian Yang, Lanjun Wang, Zili Yi.
**Paper:** [PDF](../raw/2026-chen-egomonth.pdf) · [Primary record](https://arxiv.org/abs/2608.13113v1)
**Website:** [Project website](https://sealical.github.io/egomonth/)
**Code:** Not found in checked sources.
**Source version:** arXiv:2608.13113v1, 13 August 2026, 21 pages. Author-name order follows the PDF, including Hu Jiaxin and Xie Tianyidan.

![EgoMonth: Figure 1 from the paper](../assets/2026-chen-egomonth.png)

*Figure 1 from the original paper ([PDF page 1](../raw/2026-chen-egomonth.pdf#page=1)).*

## Problem and contribution

Short or unrelated videos cannot establish persistent knowledge of recurring places, objects and activities. EgoMonth collects 301 hours in 738 clips from 20 participants and provides 1,443 human-written four-option questions. Its 14 tasks distinguish recurring-pattern consolidation, precise episodic indexing and reasoning that combines several observations (§§3.2–3.4).

## Approach

Daily first-person recordings → anonymized participant timelines → human questions with supporting episodes and reviewed distractors → multiple-choice model evaluation (Figs. 1–2).

This is a dataset and evaluation framework, not a proposed memory architecture. Annotators inspect recordings, identify events and states, construct questions, and cross-review answers. Tasks include object location, event time, temporal order, event counting and cross-view spatial reasoning. The distinction between repeated patterns and exact episodes is central: recovering a routine does not prove that the correct occurrence was found.

## Evidence and limits

Table 3 reports Gemini 2.5 Pro at 71.8% macro-average task accuracy against a 94.2% human reference. Its event-counting accuracy is 52.0%, versus 94.4% for humans. Overall question-weighted accuracy is a different statistic, 72.6% versus 95.1% (§4.1).

Models receive different frame budgets and interfaces. Therefore the table is not a controlled comparison of memory architectures. Calendar coverage is not uninterrupted footage. Multiple-choice answers do not measure exhaustive event retrieval, timestamp evidence quality, ingestion throughput or cross-worker deduplication. The recordings concern ordinary life rather than workmanship, and some tasks infer habits or personality, which are outside Aligned's current scope.

The paper specifies research-only access conditions and approval for raw recordings (§6, Appendix F). Available project documentation does not imply production-ready data access or a verified training recipe.

## Research connections

- **Cites:** [[2025-yang-egolife]] as a shorter multi-day benchmark (§2.2, Table 2).
- **Cites:** [[2022-grauman-ego4d]] and [[2024-grauman-ego-exo4d]] for egocentric data coverage (§2).

## Relevance to Aligned

Our interpretation: borrow exact-episode and repeated-event questions for evaluation across shifts. Require retrieved supporting intervals and event deduplication in addition to a final answer. The benchmark extends temporal span but does not establish our required archive throughput or construction reliability.

## Human notes
