---
year: 2018
venue: "SIGCOMM"
affiliations: ["University of Chicago", "Microsoft Research", "University of California, Berkeley", "Databricks Inc."]
research_groups: []
reviewed: false
tags: [method, efficient-processing, real-world-evaluation, training-free]
---

# Chameleon: Scalable Adaptation of Video Analytics

Chameleon reduces configuration-search overhead by sharing useful settings over time and across related camera streams.

**Authors:** Junchen Jiang, Ganesh Ananthanarayanan, Peter Bodik, Siddhartha Sen, Ion Stoica.
**Paper:** [PDF](../raw/2018-jiang-chameleon.pdf)
**Website:** Not found in checked sources.
**Code:** Not found in checked sources.

**Source version:** ACM SIGCOMM 2018 author-hosted proceedings PDF. DOI:10.1145/3230543.3230574.
**Citations:** 467 ([OpenAlex](https://openalex.org/W2887117815), checked 2026-11-03).

![Chameleon object detection pipelines and configuration knobs](../assets/2018-jiang-chameleon.png)

*Figure 1. Chameleon object detection pipelines and configuration knobs. Source: [original paper, PDF p. 3](../raw/2018-jiang-chameleon.pdf#page=3).*

## Problem and contribution

Lower frame rates, resolutions and smaller networks can save compute, but the cheapest accurate setting changes with scene content. Exhaustively profiling every camera repeatedly can cost more than the inference it saves.

## Approach

The controller profiles a leader camera to identify promising configurations, then restricts subsequent temporal and follower-camera searches to that set. Periodic full exploration refreshes the candidates. Approximate independence between configuration knobs reduces combinatorial search to cheaper per-knob measurements. Similarity groups come from observed configuration accuracy, rather than assuming all nearby cameras behave identically. Outputs remain detections from the chosen existing vision pipeline. The system maintains configuration profiles, not semantic event memory (§§4–5).

## Evidence and limits

Evaluation replays sampled traffic footage chronologically from five Bellevue cameras across 24 hours and adds ten cafeteria cameras over three days. Pipelines include direct neural object detection and motion-region classification. Reported accuracy is agreement with the most expensive detector configuration, not human-labeled safety truth. The study reports 20–50% higher accuracy at similar resource use and substantial GPU-time reductions at comparable accuracy, with profiling charged to the budget (§6, Figure 10). These gains depend on temporal persistence and camera similarity. The paper explicitly discusses model-switching delays up to one second and suggests separate profiling resources (§5.5). It does not establish rare-event preservation or a construction-specific latency SLA, and the checked PDF does not clearly identify a GPU model.

## Research connections

- **Builds on:** [[2017-zhang-videostorm]] — reuses the premise of reconfigurable video pipelines and discusses its configuration-update interface (§5.5).
- **Compares with:** One-time configuration profiling — the main baseline tests the value of continuous adaptation (§6.2).

## Relevance to Aligned

Our interpretation: useful when many fixed construction cameras share activity patterns. Profile the real cost of each detector/VLM path, while measuring rule-specific misses so averaged teacher agreement does not hide brief glove or fall-protection violations.

## Human notes
