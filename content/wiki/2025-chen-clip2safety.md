---
year: 2025
venue: "Expert Systems with Applications"
affiliations: ["University of Connecticut", "University of California Irvine"]
research_groups: []
reviewed: false
tags: [method, construction, execution-quality, efficient-processing, sft]
---

# Vision language model for interpretable and fine-grained detection of safety compliance in diverse workplaces

Clip2Safety combines scene recognition, object crops, and image–text matching to check PPE presence and attributes across workplace types.

**Authors:** Zhiling Chen, Hanning Chen, Mohsen Imani, Ruimin Chen, Farhad Imani.
**Paper:** [PDF](../raw/2025-chen-clip2safety.pdf) · [Publisher](https://doi.org/10.1016/j.eswa.2024.125769)
**Website:** Not found in checked sources.
**Code:** [Official implementation](https://github.com/Ed1sonChen/Clip2Safety)

**Source version:** Inspected arXiv:2408.07146v1, submitted 13 August 2024. The journal publication is volume 265, article 125769, March 2025. Results below refer to the inspected preprint.
**Citations:** 53 ([OpenAlex](https://openalex.org/W4404734233), checked 2026-11-03).

![Clip2Safety safety item and feature verification](../assets/2025-chen-clip2safety.png)

*Figure 2. Clip2Safety safety item and feature verification. Source: [original paper, PDF p. 6](../raw/2025-chen-clip2safety.pdf#page=6).*

## Problem and contribution

Detecting a helmet or glove does not establish whether its appearance or properties match the work context. Clip2Safety separates scene-dependent PPE requirements, item detection, and attribute verification. Its contribution is a modular image-analysis pipeline and an evaluation distinguishing directly observable colors, context-dependent materials, and inferred functionality.

## Approach

An image enters a BLIP-2 scene recognizer adapted with LoRA on image–scene pairs. GPT-4o produces required equipment and attribute descriptions for that scene. YOLO-World identifies people and equipment, and cropped regions enter frozen CLIP encoders alongside text prompts. Similarity thresholds determine presence and attribute matches. An optional GPT-4o stage interprets similarity lists (§3, Figures 2–3). The representation is per-image boxes and verification results. There is no temporal tracker, event memory, or causal streaming protocol.

## Evidence and limits

The evaluation combines four image datasets into six workplace scenes, nine object categories, and 49 attributes (§4.1). Table 3 reports mean accuracy of 70.2% for Clip2Safety and 72.3% with GPT-4o, versus 70.1% for LLaVA-1.6-7B. However, PPE-presence accuracy is 76.8% versus LLaVA's 91.2%, so the average conceals different strengths. Table 4 compares individual inference stages on an RTX 4090. It does not establish continuous-camera alert latency, and its timing comparison omits the GPT-4o variant.

Functionality inference has an AUC of 0.55 in §4.4.3, and Figure 7 shows incorrect attribute predictions. Labels and plausible descriptions do not establish physical resistance, certification, or actual protection. The inspected evaluation does not measure false alerts over long normal periods or daily-report completeness.

## Research connections

- **Builds on:** YOLO-World and CLIP provide object crops and visual–text embeddings (§§3.3–3.4).
- **Builds on:** Nath et al.'s Pictor-v3 supplies construction images (§4.1).

## Relevance to Aligned

Our interpretation: useful for separating visible PPE evidence from context-dependent requirements. Glove presence is a relevant feature, but hidden material properties should remain unverified. Event persistence, worker association across frames, approved site rules, and auditable report aggregation require additional components.

## Human notes
