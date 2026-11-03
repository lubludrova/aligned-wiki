---
year: 2024
venue: "CVPR"
affiliations: ["The University of Texas at Austin", "FAIR, Meta"]
research_groups: [meta-fair, ut-austin-vision]
reviewed: false
tags: [dataset, benchmark, method, state-changes, video-representation]
---

# Learning Object State Changes in Videos: An Open-World Perspective

VidOSC learns temporal stages of object transformations from language-derived pseudo-labels and transfers them to unfamiliar object–transformation combinations.

**Authors:** Zihui Xue, Kumar Ashutosh, Kristen Grauman.
**Paper:** [PDF](../raw/2024-xue-vidosc.pdf)
**Website:** [Project website](https://vision.cs.utexas.edu/projects/VidOSC/)
**Code:** [GitHub repository](https://github.com/facebookresearch/VidOSC)
**Source version:** CVF accepted CVPR 2024 paper, pp. 18493–18503. The separate ten-page [supplement](https://openaccess.thecvf.com/content/CVPR2024/supplemental/Xue_Learning_Object_State_CVPR_2024_supplemental.pdf) informs the protocol qualifications below.
**Citations:** 17 ([OpenAlex](https://openalex.org/W4402753682), checked 2026-11-03).

![VidOSC data mining, pseudo-labeling, training, and testing](../assets/2024-xue-vidosc.png)

*Figure 2. VidOSC data mining, pseudo-labeling, training, and testing. Source: [original paper, PDF p. 4](../raw/2024-xue-vidosc.pdf#page=4).*

## Problem and contribution

Models trained on “melting butter” should recognize stages of melting unfamiliar materials. VidOSC shares initial, transitioning and end-state labels across objects undergoing the same transformation. Its HowToChange benchmark holds out rarer object–transformation combinations, covering 20 transformations and 409 combinations (§§3–4). The formulation includes passive or off-camera transformations rather than requiring visible human action.

## Approach

During data construction, Llama 2 mines candidate transformations from instructional-video transcripts. GPT-4 produces state descriptions, and CLIP or VideoCLIP scores visual similarity to them. Confidence thresholds assign state or background pseudo-labels. Ambiguous frames and labels violating initial→transitioning→end ordering are excluded (§3.3, supplement §4.1).

Frozen InternVideo features represent each second. Global features are concatenated with features of active-object crops obtained by a hand-object detector. An MLP projection, positional encoding and temporal Transformer integrate the complete sequence, then an MLP classifies every timepoint. Cross-entropy training uses pseudo-labels rather than manually annotated training intervals (§§3.2–3.3, 5).

The main HowToChange model is specialized per transformation. At inference it needs no transcript, but assumes the transformation category is known. A supplementary unified model predicts the category too, with lower accuracy. Complete-sequence attention makes these offline predictions, not causal streaming estimates (supplement §4.2, Table 7).

## Evidence and limits

On HowToChange, framewise F1 reaches 46.4% for known and 43.1% for novel combinations, compared with VideoCLIP's 36.6% and 34.3% (Table 2). Removing temporal modeling reduces novel precision@1 from 58.2% to 48.2% (Table 3).

“Open world” covers new object combinations within known transformations, not arbitrary new transformations. Clips predominantly contain one change, and evaluation videos are verified to contain the specified change. Concurrent processes and spatial localization remain future work (§6, supplement §2). Pseudo-label thresholds use grid searches against labeled scores, so avoiding dense training annotations does not imply an entirely annotation-free development process (supplement §4.2).

## Research connections

- **Compares with:** [[2022-soucek-look-for-change]] — uses ChangeIt and compares state/action localization under matched and open-world splits (§5, Table 2).
- **Cites:** [[2022-grauman-ego4d]] — adopts its visually detectable state-change framing and distinguishes point-of-no-return localization (§§2–3.1).
- **Builds on:** InternVideo, Wang et al. — frozen video features support temporal state prediction (§5).

## Relevance to Aligned

Our interpretation: shared transformation stages could help recognize completion across unfamiliar materials. Construction use still requires persistent identity, simultaneous changes, online evidence and acceptance criteria beyond reaching an apparent end state.

## Human notes
