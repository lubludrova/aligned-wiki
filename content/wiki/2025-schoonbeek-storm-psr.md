---
year: 2025
venue: "Computer Vision and Image Understanding"
affiliations:
  - Department of Electrical Engineering, Eindhoven University of Technology
  - ASML
research_groups: [tue-aria]
reviewed: false
tags: [dataset, benchmark, method, procedure-understanding, execution-quality, state-changes, egocentric-video, sft, supervised-training]
---

# Learning to Recognize Correctly Completed Procedure Steps in Egocentric Assembly Videos through Spatio-Temporal Modeling

STORM-PSR combines assembly-state detection with temporal completion recognition to identify correctly finished procedure steps despite partial occlusion.

**Authors:** Tim J. Schoonbeek, Shao-Hsuan Hung, Dan Lehman, Hans Onvlee, Jacek Kustra, Peter H.N. de With, Fons van der Sommen.

**Paper:** [Stored PDF](../raw/2025-schoonbeek-storm-psr.pdf)
**Website:** https://timschoonbeek.github.io/stormpsr
**Code:** https://github.com/shaohsuanhung/STORM-PSR
**Source version:** arXiv:2510.12385v1, 14 October 2025, 26-page author accepted manuscript. The published article is CVIU 262, 104528, December 2025, [DOI](https://doi.org/10.1016/j.cviu.2025.104528). Page references below follow the stored manuscript.
**Citations:** 2 ([OpenAlex](https://openalex.org/W4415315604), checked 2026-11-03).

![STORM-PSR spatiotemporal procedure recognition stream](../assets/2025-schoonbeek-storm-psr.png)

*Figure 2. STORM-PSR spatiotemporal procedure recognition stream. Source: [original paper, PDF p. 7](../raw/2025-schoonbeek-storm-psr.pdf#page=7).*

## Problem and contribution

Recognizing an action does not establish that a step was completed correctly. Earlier assembly-state methods wait until the whole object is visible, delaying recognition under hand/tool occlusion. STORM-PSR adds a temporal stream that recognizes changes in the relevant parts, introduces two supervision-aware sampling strategies, and releases completion/state annotations for MECCANO (§§1, 5.1).

## Approach

One stream uses YOLOv8-M assembly-state detections and known procedure transitions to infer completed steps. The other encodes frames with ViT-S, aggregates a trailing clip through a six-layer temporal transformer, and uses a multilabel MLP to predict component changes. Equal averaging fuses their probabilities. Accumulated confidence must cross a threshold before a step and timestamp are recorded (§§4.1–4.5).

Spatial pretraining uses supervised contrastive learning on frames sampled near sparse completion labels, with optional synthetic CAD images. Temporal training oversamples clips just before and after completions, emphasizing hard negatives and positives while reducing ambiguous boundary examples. Binary cross-entropy learns net component changes, followed by joint fine-tuning. An install/remove cycle inside one training clip cancels under the XOR target. At inference, consecutive trailing windows use past observations, with 64 sampled frames spanning at most 256 frames, approximately 21–26 seconds (§§4.2–4.4, 5.2, 6).

## Evidence and limits

On IndustReal, mean recognition delay falls from 21.0 to 15.5 seconds while F1 rises from 0.891 to 0.901. On MECCANO, delay falls from 99.8 to 88.6 seconds, but F1 declines from 0.545 to 0.497 (Table 1). Delay counts only true-positive recognitions, so faster detection does not by itself establish better overall coverage (§§3.2, 6).

The complete system runs at 75.1 fps on an A100, versus 284.8 fps for the state-only stream. Both datasets concern toy assemblies, and IndustReal participants deliberately provide occasional unobstructed views. MECCANO has sparse completion labels and long intervals without visible objects. The temporal stream alone performs poorly, and its limited window does not represent the entire procedure. These are offline benchmark results, without measured worker benefits (§§5–7).

## Research connections

- **Builds on:** Schoonbeek et al., *IndustReal* (WACV 2024), defines the task, metrics, dataset, and state-detection baseline (reference 43).
- **Cites:** [[2022-sener-assembly101]] contextualizes occlusion and multiview procedural datasets (§2.1, reference 44).

## Relevance to Aligned

Our interpretation: track correctly completed object changes separately from observed actions, and assess recognition delay alongside missed and premature completions.

## Human notes
