---
year: 2026
venue: "CVPR"
affiliations: ["Northeastern University"]
research_groups: []
reviewed: false
tags: [method, procedure-understanding, execution-quality, egocentric-video, training-free]
---

# AXG-Reasoner: Error Detection and Explanation in Long Task Videos with Vision–Language Models

AXG-Reasoner aligns action segments with learned subaction graphs to expose sparse mistakes and generate localized explanations with frozen vision–language models.

**Authors:** Shih-Po Lee, Ehsan Elhamifar.
**Paper:** [PDF](../raw/2026-lee-axg-reasoner.pdf)
**Website:** Not found in checked sources.
**Code:** [GitHub repository](https://github.com/robert80203/AXG-Reasoner)

**Source version:** CVPR 2026 accepted proceedings PDF, pp.3421–3431.
**Citations:** Unavailable (OpenAlex, checked 2026-11-03. No identity-matched record found after title and acronym searches).

![AXG-Reasoner: Figure 2 from the paper](../assets/2026-lee-axg-reasoner.png)

*Figure 2 from the original paper ([PDF page 3](../raw/2026-lee-axg-reasoner.pdf#page=3)).*

## Problem and contribution

A model can recognize the overall intended action while missing a brief incorrect tool use or dropped object. AXG-Reasoner decomposes actions into finer units so that keyframe selection and prompts focus on these sparse error cues (§3).

## Approach

The pipeline starts with a trained temporal action segmenter and action-labeled, error-free demonstrations. VLM descriptions and object names are embedded with local timestamps, clustered and summarized into subactions. A directed action execution graph retains subaction sequences supported by training examples (§§3.2–3.3).

At inference, graph-to-video alignment partitions each predicted action segment into subactions. Selected frames and subaction prompts feed a frozen Qwen2.5-VL or InternVL model. Unmatched, dropped intervals are assumed erroneous and receive a forced zero correctness score, with the VLM asked to describe the mistake. Any low-scoring subaction marks its parent action erroneous (§3.4, Algorithm 1). This is complete-segment analysis, not a demonstrated causal stream. The frozen reasoner still depends on learned segmentation and annotated normal examples.

## Evidence and limits

Experiments cover five EgoPER tasks and five selected CaptainCook4D recipes. On ground-truth EgoPER action segments, Qwen2.5-VL error detection improves from 56.7 to 63.6 mean normal/error F1. Error-class F1 rises from 26.3 to 47.0 while normal-class F1 falls from 87.1 to 80.1 (Table 3). These are oracle-boundary results, separate from predicted-segmentation tests.

Free-form explanations are scored by an LLM against reference explanations, not by independent human correctness judgments. Inference ignores subactions shorter than two seconds. H100 hardware is reported, but no end-to-end streaming latency is established. Noisy subactions can over-flag valid execution (§§4.1–4.2, Table 5).

## Research connections

- **Builds on:** [[2024-lee-egoper]] — uses normal training demonstrations, error annotations and procedural evaluation (§4.1).
- **Compares with:** [[2025-wang-videotree]] — tests its keyframe selection against procedure-specific subaction selection (§4.1, Tables 1 and 3).
- **Builds on:** GTG2Vid, Lee and Elhamifar (2025) — supplies a segmentation option and the error-detection evaluation protocol (§4.1).

## Relevance to Aligned

Our interpretation: Useful for an expensive verifier invoked after a cheap detector identifies a suspicious operation. Retaining subaction intervals and selected visual evidence could support report explanations. Forced-error treatment of unmatched behavior requires particular caution around legitimate construction-task variation.

## Human notes

