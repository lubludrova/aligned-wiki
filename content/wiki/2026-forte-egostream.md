---
year: 2026
venue: arXiv preprint
affiliations:
- University of Catania
research_groups: []
reviewed: false
tags:
- dataset
- benchmark
- video-memory
- video-qa
- efficient-processing
- egocentric-video
---

# EGOSTREAM: A Diagnostic Benchmark for Streaming Episodic Memory in Egocentric Vision

Diagnoses which facts survive streaming memory compression and how answer validity changes the interpretation of recall.

**Authors:** Rosario Forte, Giuseppe Lando, Antonino Furnari.

**Paper:** [PDF](../raw/2026-forte-egostream.pdf) · [arXiv](https://arxiv.org/abs/2605.31557)

**Website:** [Project website](https://saroo25.github.io/Egostream/)

**Code:** Not found in checked sources. The public project page says GitHub is coming soon, despite an anonymous-repository statement in the PDF.

**Source version:** arXiv 2605.31557v2, 1 June 2026. Preprint, with no peer-reviewed venue established in checked sources.
**Citations:** 0 ([OpenAlex](https://openalex.org/W7163072204), checked 2026-11-03).

![EGOSTREAM: Figure 4 from the paper](../assets/2026-forte-egostream.png)

*Figure 4 from the original paper ([PDF page 6](../raw/2026-forte-egostream.pdf#page=6)).*

## Problem and contribution

A remembered answer can become wrong because the world changed, not because a model forgot. EGOSTREAM introduces answer-validity windows and evaluates memory mechanisms across fact types and recall delays. Its main contribution is a diagnostic protocol and controlled cache-policy study.

## Approach

The benchmark curates 2,250 questions from five egocentric datasets and expands them into 8,528 four-option evaluations at different recall times. Seven categories cover details, space, time, events, social information, causal information and prospective memory. A validity window defines when a proposed answer should remain acceptable.

A frozen Qwen3-VL backbone ingests video sequentially without knowing future questions. The unified framework compares sliding windows, protected prompt tokens, protected recent tokens, visual-token pruning or merging, and quantized offloading. At recall time it answers from retained state. Unbounded raw-frame replay is disallowed, but offloaded token storage may grow. Configurations approximate mechanisms from the literature rather than reproduce every complete original model.

## Evidence and limits

Under the same 9,804-token active budget, protecting prompt tokens improves semantic macro-accuracy from 29.53% to 44.74% over FIFO (Table 4). With the same pseudo-attention criterion, intra-frame pruning reaches 45.12% versus merging's 41.87%. These are framework-specific findings, not universal architecture rankings.

The implemented validity labels are weaker than the conceptual definition. Ego4D and Multi-Hop answers are assumed valid until clip end, while HD-EPIC uses narration-derived neighboring answerable spans (Appendix A.5). These are not exhaustively verified state-change boundaries. Recall bins also differ in source and category composition, and annotators see proposed labels.

Every reported Table 4 configuration takes more than one second per frame at one-frame-per-second input. The implementation therefore does not achieve real-time ingestion on the reported setup. Some prose numbers disagree with the table, so the comparisons above use table entries. Public code remains promised.

## Research connections

- **Builds on:** [[2025-yang-egolife]] — one of the benchmark's five source datasets (§3.1).
- **Cites:** [[2024-goletto-amego]] — prior egocentric memory work (§2, reference 16).

## Relevance to Aligned

Our interpretation: distinguish “the tool moved” from “the system forgot where it was.” Evaluate compression by fact type, recall delay and measured processing cost, while collecting stronger validity annotations for actual work sites.

## Human notes
