---
year: 2025
venue: "NeurIPS Datasets and Benchmarks"
affiliations: [Nanjing University, Shanghai AI Laboratory, The University of Tokyo, Zhejiang University, Fudan University]
research_groups: []
reviewed: false
tags: [dataset, benchmark, video-qa, execution-quality, procedure-understanding, spatial-understanding, egocentric-video]
---

# EgoExoBench: A Benchmark for First- and Third-person View Video Understanding in MLLMs

EgoExoBench tests cross-view video reasoning, including whether an additional demonstration improves action prediction or relative skill assessment.

**Authors:** Yuping He, Yifei Huang, Guo Chen, Baoqi Pei, Jilan Xu, Tong Lu, Jiangmiao Pang.
**Paper:** [PDF](../raw/2025-he-egoexobench.pdf)
**Website:** Not found in checked sources.
**Code:** [Official repository](https://github.com/ayiyayi/EgoExoBench)
**Source version:** Archived arXiv 2507.18342v1, 24 July 2025. Publication is verified at NeurIPS 2025. The final proceedings were also checked, but source locations and numbers below refer to the archived v1.
**Citations:** 5 ([OpenAlex](https://openalex.org/W4415234026), checked 2026-11-03).

![EgoExoBench video collection and question construction](../assets/2025-he-egoexobench.png)

*Figure 1. EgoExoBench video collection and question construction. Source: [original paper, PDF p. 3](../raw/2025-he-egoexobench.pdf#page=3).*

## Problem and contribution

Understanding one camera does not establish correspondence between first- and third-person observations. EgoExoBench organizes 7,330 four-choice questions from six datasets into eleven tasks: semantic matching, viewpoint association and temporal reasoning. Its distinctive contribution for physical work is testing skill judgments with and without a reference demonstration (§3).

## Approach

Existing task, action, person and skill annotations supply answer labels. Language models generate distractors and questions, check annotation consistency, and remove examples answerable by a text-only model. Selected visibility and spatial cases receive manual checks. This filtering reduces specific shortcuts without proving that all questions require cross-view evidence (§§3.2–3.3).

Frozen multimodal models receive multiple video clips and choose an answer. Some tasks pair synchronized observations, while others compare asynchronous demonstrations. Skill questions ask which candidate execution is best relative to a reference. The stored artifact is a benchmark with clips and annotations, not a memory database. Evaluation uses recorded clips without training a new assistant or testing live worker monitoring (§§3–4).

## Evidence and limits

On the matched 330-question human subset, deliberate human accuracy is 90.1% overall versus Qwen2.5-VL-72B's 48.5%. Within its small skill subset, the corresponding scores are 68.9% and 26.7%. These are subset results, not full-benchmark human comparisons (Table 1).

Reference demonstrations improve next-action prediction but lower all three tested models' skill scores. Qwen rises from 31.7% to 39.9% on action prediction, while skill drops from 31.4% to 29.9%. Additional visual context alone therefore does not establish reliable assessment (Table 2).

Reporting inconsistencies remain: Qwen's full-benchmark aggregate is 44.7% in Table 1 versus 47.0% in prose. The human timing description also differs between the main text and supplement. Public source videos, synthetic choices and inherited domain-specific rankings limit validity for construction quality. No workplace deployment is evaluated.

## Research connections

- **Builds on:** [[2024-grauman-ego-exo4d]] — derives matching, sequence and skill questions from its recordings and annotations (§3.3, ref. 17).
- **Builds on:** [[2024-huang-egoexolearn]] — reuses asynchronous demonstrations and skill annotations (§3.3, ref. 23).
- **Compares with:** [[2025-yang-egolife]] — evaluates EgoGPT as an egocentric model baseline (§4.1, Table 1, ref. 72).

## Relevance to Aligned

Our interpretation: use reference-removal controls when evaluating proof-of-skill models. A fluent comparison of worker and expert footage needs independent quality labels and calibrated evidence before it can support a competence claim.

## Human notes
