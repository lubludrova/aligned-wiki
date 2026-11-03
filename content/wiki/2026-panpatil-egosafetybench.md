---
year: 2026
venue: "arXiv preprint"
affiliations:
  - "AIM Intelligence"
  - "Seoul National University"
research_groups: []
reviewed: false
tags: [dataset, benchmark, egocentric-video, execution-quality]
---

# EgoSafetyBench: A Diagnostic Egocentric Video Benchmark for Evaluating Embodied VLMs as Runtime Safety Guards

EgoSafetyBench separates missed hazards, unnecessary intervention, alarm timing, and susceptibility to misleading visible text.

**Authors:** Siddhant Panpatil, Arth Singh, Mijin Koo, Chaeyun Kim, Haon Park, Dasol Choi.

**Paper:** [Stored PDF](../raw/2026-panpatil-egosafetybench.pdf) · [Source](https://arxiv.org/pdf/2607.00218v2)
**Website:** https://huggingface.co/datasets/AIM-Intelligence/EgoSafetyBench
**Code:** https://github.com/AIM-Intelligence/EgoSafetyBench
**Source version:** arXiv:2607.00218v2, 4 October 2026, 17 pages. First preprint: 30 June 2026.
**Citations:** 0 ([OpenAlex](https://openalex.org/W7167033496), checked 2026-11-03).

![EgoSafetyBench: Figure 2 from the paper](../assets/2026-panpatil-egosafetybench.png)

*Figure 2 from the original paper ([PDF page 4](../raw/2026-panpatil-egosafetybench.pdf#page=4)).*

## Problem and contribution

Binary safe/unsafe classification can reward a model that overreacts to knives or machinery while missing contextual danger. This benchmark contains 1,200 synthetic five-second robot-view scenarios. The situational track uses 800 examples across routine, safe-but-suspicious, obvious-hazard, and contextual-hazard conditions. Another 400 examine misleading in-scene text against matched truthful controls (§§3–4). These are robot-view safety diagnostics, not recorded construction-worker incidents.

## Approach

A scenario generator builds contrastive cases differing in a decisive visible cue. Structural and semantic filters precede video rendering and half-second annotation. At evaluation, the guard sees either the current chunk or a short causal history, without future frames. Outputs are evaluated for situational danger and misleading-channel judgments separately (Figure 2, p. 4).

Timing uses the first alarm relative to the annotated hazard onset. An alarm that is too early is counted separately rather than being automatically credited as successful prevention. Decisive evidence is intentionally visible, so the benchmark does not test diagnosis of genuinely unobservable failures.

## Evidence and limits

The best “caught” rate under the current-chunk protocol is 53.5% with a 0.5-second tolerance (Claude-Sonnet-4.6, Table 5, p. 7). High overall video classification accuracy therefore does not imply reliable intervention timing. Safe-video false alarms and premature alarms remain substantial. A small real-video check contains only 20 clips and supports preliminary transfer discussion, not field deployment validation. Synthetic rendering, short horizons, curated visible cues, and model-based generation/filtering limit conclusions for long and partially occluded worker recordings (§§4, 6 and appendix).

## Research connections

- **Cites:** [[2022-grauman-ego4d]] — contrasts first-person activity/video-language benchmarks with situational runtime safety evaluation (§2, reference 13). This is contextual positioning, not reuse of Ego4D as the safety dataset.

## Relevance to Aligned

Our interpretation: adopt matched safe/hazardous counterexamples and explicit early/late/missed/false alarm accounting. Keep visual prompt-injection robustness separate from procedural compliance, and add long negative periods and absent-evidence cases in an Aligned-specific evaluation.

## Human notes
