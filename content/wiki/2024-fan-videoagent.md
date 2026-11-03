---
year: 2024
venue: "ECCV"
affiliations: ["State Key Laboratory of General Artificial Intelligence, BIGAI", "School of Computer Science, Peking University", "School of Intelligence Science and Technology, Peking University"]
research_groups: []
reviewed: false
tags: [method, video-memory, video-retrieval, video-qa, egocentric-video]
---

# VideoAgent: A Memory-augmented Multimodal Agent for Video Understanding

VideoAgent combines caption and object-occurrence memories with an LLM that retrieves video evidence through four tools to answer questions.

**Authors:** Yue Fan, Xiaojian Ma, Rujie Wu, Yuntao Du, Jiaqi Li, Zhi Gao, Qing Li.
**Paper:** [PDF](../raw/2024-fan-videoagent.pdf)
**Website:** [Project website](https://videoagent.github.io/)
**Code:** [GitHub repository](https://github.com/flowithin/VideoAgentECCV)
**Source version:** ECCV 2024 proceedings PDF, 18 pages. This is Fan et al., associated with arXiv:2403.11481. The [official supplement](https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/03241-supp.pdf), printed pp. 19–34, was also read.
**Citations:** 60 ([OpenAlex](https://openalex.org/W4402961691), checked 2026-11-03).

![VideoAgent video representations and tool-based question answering](../assets/2024-fan-videoagent.png)

*Figure 2. VideoAgent video representations and tool-based question answering. Source: [original paper, PDF p. 4](../raw/2024-fan-videoagent.pdf#page=4).*

## Problem and contribution

Long-video questions often require both broad event context and consistent identities across separated object appearances. VideoAgent represents these explicitly before querying, allowing a language-model controller to request relevant evidence instead of receiving every frame (§1).

## Approach

The complete video is divided into two-second segments. LaViLa captions, ViCLIP video embeddings and caption embeddings form temporal memory. Object detection and tracking produce local tracks. CLIP/DINOv2 similarity merges appearances into object identities, stored as visual features plus SQL records of category and segment occurrence (§§2.2–2.3, Figure 2).

Given a question, GPT-4 repeatedly selects among caption retrieval, similarity-based segment localization, short-clip visual QA and object-memory queries. A separate GPT-4 memory agent retrieves candidate object identities and writes SQL to inspect their appearances (supplement C.1). Tool results accumulate in a history buffer used for the final answer (§2.4, Algorithms 1–2).

There is no task-specific end-to-end training. Re-identification parameters are tuned on EgoObjects, and NLQ similarity-fusion weights are selected on the Ego4D NLQ training set (§2.3, supplement C.1). Memory construction precedes querying. The paper does not establish causal streaming ingestion or physical-state tracking.

## Evidence and limits

VideoAgent reaches 60.2% on full EgoSchema, below Gemini 1.5 Pro's reported 63.2%. NExT-QA evaluation uses a sampled 600-question subset, with smaller 150-question ablations. Removing object memory reduces ablation accuracy from 71.3% to 62.7% (Tables 1, 5–6).

Localization improves when generated captions are replaced by ground-truth narrations, exposing dependence on perception quality. Fully automatic localization still trails supervised GroundNLQ (Table 2). Supplementary case studies show correct multiple-choice answers despite incorrect visual descriptions, so answer accuracy alone does not verify faithful grounding (supplement D). Baseline frame budgets and controller models differ, so cross-system gains do not isolate memory’s contribution (supplement C.2). Results concern recorded-video benchmarks, without measured operational deployment or comprehensive ingestion/query costs.

## Research connections

- **Cites:** [[2022-grauman-ego4d]] — evaluates temporal localization on its natural-language-query benchmark (§3.2).
- **Builds on:** LaViLa, Zhao et al. (2023) — generates the segment captions stored in temporal memory (§2.2).
- **Compares with:** LifeLongMemory, Wang et al. (2023) — contrasts similarity retrieval with LLM-selected caption windows, while noting differing recall definitions (§3.2, Table 3).

## Relevance to Aligned

Our interpretation: separating reusable visual evidence from query-time reasoning is a practical architecture reference. Construction use would need verified identity persistence, citations to retrieved moments and explicit object-state and execution-error representations beyond occurrence records.

## Human notes
