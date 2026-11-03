---
year: 2024
venue: "NeurIPS (Datasets and Benchmarks Track)"
affiliations: ["Stanford University"]
research_groups: []
reviewed: false
tags: [dataset, benchmark, method, egocentric-video, efficient-processing, video-representation]
---

# Streaming Detection of Queried Event Start

SDQES turns a natural-language event description into a standing detector that must identify the event onset causally.

**Authors:** Cristóbal Eyzaguirre, Eric Tang, Shyamal Buch, Adrien Gaidon, Jiajun Wu, Juan Carlos Niebles.
**Paper:** [PDF](../raw/2024-eyzaguirre-sdqes.pdf)
**Website:** [Project website](https://sdqesdataset.github.io/)
**Code:** [Repository](https://github.com/sdqesdataset/sdqes_baselines)

**Source version:** Accepted NeurIPS 2024 proceedings version, with appendices.
**Citations:** 2 ([OpenAlex](https://openalex.org/W4415796177), checked 2026-11-03).

![SDQES streaming detection task and query examples](../assets/2024-eyzaguirre-sdqes.png)

*Figure 1. SDQES streaming detection task and query examples. Source: [original paper, PDF p. 2](../raw/2024-eyzaguirre-sdqes.pdf#page=2).*

## Problem and contribution

Retrieving an event after watching a video does not establish the ability to detect its beginning as it happens. SDQES combines language-conditioned event detection with explicit timing and prediction-budget constraints.

## Approach

EgoSDQES contains 12,767 query annotations across 1,773 Ego4D videos, totaling over 740 hours. GPT-4 uses existing captions and temporal annotations to generate contextually disambiguated queries. Streaming Recall@K scores whether the first K chronological predictions include an onset within a −5/+10-second tolerance. Streaming Minimum Distance measures temporal error. Frozen dual encoders receive trainable temporal adapters, including causal QRNN and RetNet variants. Visual representations can be shared across multiple queries (§§3–5).

## Evidence and limits

In five-minute clips, the strongest reported EgoVideo adapter reaches 16.0% recall for its first prediction and 26.4% for its first three. Humans reach 72.4% and 86.2% on 87 untrimmed examples. Timing experiments on one V100 process an entire 5m50s video in 1.68 s for the image baseline: this is not per-frame latency. A QRNN adapter adds 21.5% overhead, versus 260.2% for sliding-window processing. These measurements average three runs of one video. Every evaluated query has an annotated occurrence, and only one instance is labeled, so the benchmark does not establish absent-event false alarms or repeated-event completeness (§6, Appendix B).

## Research connections

- **Builds on:** [[2022-grauman-ego4d]] — reuses videos, narrations, NLQ and Moments annotations, preserving official train/validation separation (§4).
- **Compares with:** CLIP, EgoVLP, LaViLa and EgoVideo — visual-language backbones with task-trained adapters (§6, Table 2).

## Relevance to Aligned

Our interpretation: a clear starting point for requests such as “alert when unloading begins.” Construction use needs third-person cameras, absent-event queries, repeated occurrences and entity-specific grounding. Its bounded prediction budget is useful for separating detection quality from alarm spam.

## Human notes
