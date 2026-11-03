---
year: 2026
venue: "EMNLP"
affiliations:
  - "Department of EEE, The Hong Kong Polytechnic University"
  - "School of EEE, Nanyang Technological University"
research_groups: []
reviewed: false
tags: [procedure-understanding, execution-quality, video-qa, egocentric-video]
---

# EgoErrorVQA: Assess Egocentric Comprehension Capabilities through Procedural Errors for Ego-Agentic AI

EgoErrorVQA evaluates procedural error comprehension and separates procedural matching, visual narration, and error classification in Ego-ADR.

**Authors:** Junlong Li, Junxi Li, Jianjun Gao, Chen Cai, Lap-Pui Chau, Yi Wang.

**Paper:** [Stored PDF](https://arxiv.org/pdf/2608.24134v1) · [Source](https://arxiv.org/pdf/2608.24134v1)
**Website:** Not found in checked primary sources.
**Code:** https://github.com/z1oong/EgoErrorVQA
**Source version:** arXiv:2608.24134v1, 25 August 2026, 20 pages. EMNLP 2026 status verified in the author repository.

## Problem and contribution

General video question answering can overlook omissions, wrong objects, ordering, and unnecessary actions. EgoErrorVQA converts existing procedural-error recordings into open-ended and multiple-choice questions, with human refinement. It includes an evaluator interface and distinguishes correctness, error identification, and explanatory quality (§§3–4). This is evaluation of supplied questions and video intervals, not continuous autonomous discovery of errors.

## Approach

Ego-ADR first matches the supplied procedural action against a procedure bank and retrieves neighboring steps. It separately narrates the video and then reasons about the discrepancy between the observed action and procedural context. Depending on model capabilities, matching/classification use deeper textual reasoning or shallow TF-IDF, string matching, and keyword-based alternatives (§5, Figure 3, p. 5).

Decoupling procedural knowledge from visual narration aims to avoid asking one model pass to solve every subproblem at once. However, narration can discard crucial small-object or state evidence. Supplying a relevant action interval also removes part of the localization problem faced by a deployed assistant.

## Evidence and limits

On the eight-frame Qwen2.5-VL setting, Table 4 (p. 7) raises F1 from 18.2 to 19.8 and overall accuracy from 12.8 to 19.6. The relative accuracy gain is therefore not a comparable percentage-point F1 improvement. Stronger headline accuracy can also result from predicting the dominant correct class, while high recall can reflect indiscriminate error labeling (§6.2). Open-ended scoring uses model judges, and rare categories remain poorly recognized. These results do not demonstrate successful corrective intervention or prevention.

## Research connections

- **Builds on:** [2025-haneji-egooops](/notes/2025-haneji-egooops/) and [2022-sener-assembly101](/notes/2022-sener-assembly101/) — source procedural videos and error annotations incorporated into the benchmark (§3).

## Relevance to Aligned

Our interpretation: separate instruction retrieval, evidence narration, and rule/error reasoning, and preserve the original visual evidence for verification. Evaluate localization, per-error precision/recall, and explanation grounding independently from aggregate QA accuracy.

## Human notes
