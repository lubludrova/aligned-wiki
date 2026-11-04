---
year: 2024
venue: "CVPR"
affiliations: ["University of Trento", "Fondazione Bruno Kessler"]
research_groups: []
reviewed: false
tags: [method, video-representation, video-qa, training-free]
---

# Harnessing Large Language Models for Training-free Video Anomaly Detection

LAVAD turns pretrained captions and language-model judgments into anomaly scores without target-domain training.

**Authors:** Luca Zanella, Willi Menapace, Massimiliano Mancini, Yiming Wang, Elisa Ricci.
**Paper:** [PDF](../raw/2024-zanella-lavad.pdf)
**Website:** [Project website](https://lucazanella.github.io/lavad/)
**Code:** [Repository](https://github.com/lucazanella/lavad)

**Source version:** CVF accepted proceedings version, pp.18527–18536, with supplementary material. Affiliations follow this PDF.
**Citations:** 105 ([OpenAlex](https://openalex.org/W4402753378), checked 2026-11-03).

![LAVAD language-based video anomaly detection pipeline](../assets/2024-zanella-lavad.png)

*Figure 4. LAVAD language-based video anomaly detection pipeline. Source: [original paper, PDF p. 4](../raw/2024-zanella-lavad.pdf#page=4).*

## Problem and contribution

Training conventional anomaly detectors requires collecting representative footage and defining normality for each domain. LAVAD investigates whether frozen visual and language priors can replace this adaptation, while preserving textual descriptions useful for inspecting detections.

## Approach

BLIP-2 captions sampled video frames. ImageBind retrieves a semantically aligned caption from the whole video to replace each noisy description. Llama-2-13B-chat summarizes captions from a ten-second window centered on the frame, then emits a discrete anomaly score. Video-text similarity retrieves ten related temporal summaries and aggregates their scores. The retained intermediate representation comprises captions, temporal summaries and embeddings. The full procedure uses complete-video context and future frames, so it is an offline detector (§3, Figure 4).

## Evidence and limits

Tables 1–2 report 80.28% frame-level AUC on UCF-Crime and 62.01% AP on XD-Violence. Removing temporal summaries or score refinement lowers UCF AUC by approximately 7.5 points. Results depend on dataset-specific prompt and captioner selection: the supplement uses an ensemble on UCF but a single BLIP-2 variant on XD. No prospective deployment or online latency evaluation is established. Supplement §C shows false positives from erroneous captions and visible introductory text, illustrating that fluent explanations can propagate source errors. Caption quality, embedding alignment and prompt sensitivity remain explicit limitations (supplement §D).

## Research connections

- **Builds on:** ImageBind, Girdhar et al. (CVPR 2023) — supplies aligned image, video and text encoders (§3.3).
- **Compares with:** LLaVA-1.5, Liu et al. (2023) — direct per-frame scoring baseline in §4.1 and Tables 1–2.

## Relevance to Aligned

Our interpretation: a foundational reference for converting footage into semantic evidence and retrospective incident summaries. Its complete-video cleaning and centered windows require redesign for live alerts. Generated descriptions should remain linked to source frames before use in a daily construction report.

## Human notes
