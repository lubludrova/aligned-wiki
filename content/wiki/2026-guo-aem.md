---
year: 2026
venue: "ICLR 2026"
affiliations: ["Michigan State University"]
research_groups: [msu-action]
reviewed: false
tags: [method, execution-quality, state-changes, spatial-understanding, egocentric-video]
---

# Procedural Mistake Detection via Action Effect Modeling

AEM learns action-effect representations to detect procedural mistakes from egocentric video without running its external effect-labeling models at inference.

**Authors:** Wenliang Guo, Yujiang Pu, Yu Kong.
**Paper:** [PDF](../raw/2026-guo-aem.pdf) · [arXiv v2](https://arxiv.org/abs/2512.03474v2)
**Website:** [Project](https://wenliangguo.github.io/Mistake_Detection/)
**Code:** [WenliangGuo/AEM](https://github.com/WenliangGuo/AEM)
**Citations:** 0 ([OpenAlex](https://openalex.org/W4417029021), checked 2026-11-03).

![AEM: Figure 2 from the paper](../assets/2026-guo-aem.png)

*Figure 2 from the original paper ([PDF page 4](../raw/2026-guo-aem.pdf#page=4)).*

## Problem and contribution

Recognizing the expected action can miss an incorrect execution that produces the wrong object state. AEM augments action features with learned representations of what an action changes. It trains a one-class mistake detector using correct executions, while relying on supervised action segmentation (§§3.1–3.5).

## Approach

Video → ActionFormer segments and temporal features → learned effect tokens → alignment with task/action prompts → mistake scores.

During training, an effect-frame sampler selects informative frames. Grounding DINO supplies object crops and positions, while GPT-4o provides symbolic attributes and relations. Visual and graph representations supervise the effect token's state and relation components. The detector contrastively aligns effect-enhanced action embeddings with task/action text prompts. Low cosine similarity signals a potential mistake (§§3.3–3.5, Figure 3).

At inference, the network predicts effect representations directly. Effect-frame sampling, grounding and GPT-based scene-graph construction are skipped. The evaluated workflow is offline, rather than a demonstrated continuously operating assistant.

## Evidence and limits

Experiments cover EgoPER and CaptainCook4D cooking procedures. Gains over AMNAR depend on the metric: CaptainCook4D precision and AUC improve, but EDA is 71.9 versus 72.3 (Tables 1–2).

Action segmentation remains a bottleneck: EgoPER AUC increases from 73.8 with predicted segments to 86.7 with ground-truth segments (Appendix B.2). Automatically generated scene graphs are noisy (Appendix B.4). The method evaluates task-specific mistakes, not transferable construction expertise, and does not establish reasoning about long-range consequences.

## Research connections

- **Builds on:** Zhang et al., *ActionFormer* (ECCV 2022) — supplies action segmentation and temporal features (§3.3).
- **Compares with:** [[2025-huang-amnar]] — normal-action representation baseline (§4, Tables 1–2).
- **Cites:** Niu et al., *SCHEMA* (CVPR 2024) — informs action/state descriptions used in effect-frame selection (§3.4).

## Relevance to Aligned

Our interpretation: a candidate for checking whether a known procedure produced the expected local effect. Its training/inference separation could reduce repeated processing cost. Testing on construction-specific states, imperfect segmentation and visually subtle defects is still necessary before interpreting its scores as evidence of skill.

## Human notes

