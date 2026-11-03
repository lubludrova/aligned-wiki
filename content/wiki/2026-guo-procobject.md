---
year: 2026
venue: "NeurIPS, Evaluations and Datasets Track"
affiliations:
  - "Michigan State University, USA"
research_groups: []
reviewed: false
tags: [procedure-understanding, state-changes, video-qa, egocentric-video]
---

# Benchmarking and Learning Object-Centric Procedural Understanding in Instructional Videos

ProcObject-10K evaluates object-centered procedural questions with temporal evidence and adds object-supervised fine-tuning.

**Authors:** Wenliang Guo, Yu Kong.

**Paper:** [Stored PDF](../raw/2026-guo-procobject.pdf) · [Source](https://arxiv.org/pdf/2512.03479v3)
**Website:** https://wenliangguo.github.io/ProcObject-10K-Page/
**Code:** https://github.com/WenliangGuo/ProcObject-10K
**Source version:** arXiv:2512.03479v3, 29 October 2026, 28 pages. First preprint: December 2025. The stored version identifies NeurIPS 2026, Evaluations and Datasets Track.

![ProcObject-10K: Figure 2 from the paper](../assets/2026-guo-procobject.png)

*Figure 2 from the original paper ([PDF page 4](../raw/2026-guo-procobject.pdf#page=4)).*

## Problem and contribution

Recognizing actions does not establish which object states enable later steps. ProcObject-10K contains 10,522 open-ended questions over 1,799 videos, 137 tasks, and nine domains. Its five question types cover preconditions, state evolution, counterfactual reasoning, mistakes, and readiness. Answers must identify supporting time intervals, including brief evidence and evidence distributed across multiple moments (§3, pp. 3–5).

## Approach

During training, Qwen3.5 extracts supporting object phrases from question–answer pairs. Grounding DINO localizes those objects, producing confidence-weighted spatial masks and temporal presence labels. Two auxiliary heads on the vision encoder encourage attention to relevant image patches and frames alongside the ordinary answer-generation loss. The auxiliary heads are removed at inference. This is pseudo-label supervision, not human-verified object tracking (§4, pp. 6–7, Figure 4).

At inference, the multimodal model consumes sampled video frames and a question, then generates an answer and temporal evidence. The benchmark evaluates retrospective reasoning over a supplied video rather than autonomous alerts during execution.

## Evidence and limits

Table 5 (p. 9) isolates the added supervision: ordinary supervised fine-tuning gives judge score 3.18 and temporal IoU 42.4, while adding both auxiliary losses gives 3.51 and 44.5. These are answer/temporal-grounding scores, not spatial tracking accuracy or correct-error-detection rates. Comparisons with other grounded-QA systems use different backbones, frame budgets, and training datasets (Table 3), so they do not isolate architecture alone. Annotation and evaluation still depend partly on generative models. Dense object tracks and physical verification of inferred states are absent (Appendix C).

## Research connections

- **Compares with:** [[2025-chen-gelm]] — grounded question answering on MultiHop-EgoQA, with different input budgets and training sources (Table 3, p. 9).

## Relevance to Aligned

Our interpretation: add separate evidence requirements for “what changed,” “is this ready,” and “what is missing.” Object-focused auxiliary supervision is a plausible adaptation method, but procedural correctness requires visible state evidence and uncertainty handling beyond this QA benchmark.

## Human notes
