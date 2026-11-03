---
year: 2026
venue: "ECCV 2026"
affiliations: ["ETH Zürich"]
research_groups: [eth-siplab]
reviewed: false
tags: [execution-quality, egocentric-video]
---

# SkillSpotter: Pose-Aware Multi-View Skilled Action Detection and Grading in Ego-Exo Videos

SkillSpotter combines video features and body pose to locate moments of skilled activity and label them as good execution or needing improvement.

**Authors:** Björn Braun, Christian Holz.
**Paper:** [PDF](../raw/2026-braun-skillspotter.pdf) · [Accepted author PDF](https://static.siplab.org/papers/eccv2026-skillspotter.pdf)
**Website:** [Project](https://siplab.org/projects/SkillSpotter)
**Code:** [eth-siplab/SkillSpotter](https://github.com/eth-siplab/SkillSpotter)

![SkillSpotter action detection and quality grading architecture](../assets/2026-braun-skillspotter.png)

*Figure 2. SkillSpotter action detection and quality grading architecture. Source: [original paper, PDF p. 5](../raw/2026-braun-skillspotter.pdf#page=5).*

## Problem and contribution

Useful skill feedback requires both finding the relevant moment and judging its execution. These are different failure modes. SkillSpotter adapts temporal action detection to expert-annotated feedback timestamps, separating localization metrics from grading accuracy. It supports ego-only, exo-only and combined views (§3.1).

## Approach

Pre-extracted Omnivore features → ActionFormer temporal pyramid → pose fusion and optional cross-view attention → timestamp, good/tip label and confidence (Fig. 2).

The temporal pyramid represents events at multiple scales. A separate pose encoder captures joint positions and motion, with learned gates controlling how much pose information enters the video features. For combined views, bidirectional attention exchanges information between synchronized ego and exo streams. Learned suppression radii reduce duplicate detections while allowing different feedback events to coincide (§3.2).

Expert timestamps and binary quality labels supervise the detector. Training uses ground-truth body pose, whereas evaluation uses predicted pose. In the ego setting, pose prediction requires the Aria camera trajectory. Thus this configuration is not a simple RGB-only helmet pipeline. Cross-view attention uses the full temporal extent, so the combined model is an offline demonstration analyzer, not a demonstrated causal alert system (§§3.1–3.3).

## Evidence and limits

On Ego-Exo4D, ego-only class-specific detection mAP reaches 21.82 and balanced grading accuracy 60.40. Grading accuracy is measured on matched detections and therefore depends on matching coverage (§§3.1, 4.2, Table 1).

Subtle manipulation remains difficult: Cooking and Music detection mAP are 3.08 and 1.57. Stronger results on large body movements do not establish reliable fine-grained construction quality assessment (§4.4, Table 4). The reported 19.70 FPS on an H200 excludes video decoding, Omnivore extraction and pose estimation (Appendix A). Outputs identify feedback moments, but do not explain the defect or assign an overall worker qualification.

## Research connections

- **Builds on:** [[2024-grauman-ego-exo4d]] — adopts its demonstration-proficiency task, expert annotations and pose resources (§§3.1–3.2).
- **Builds on:** ActionFormer and Omnivore — reuses temporal detection and visual representations, adding pose fusion, cross-view attention and adaptive suppression (§3.2).

## Relevance to Aligned

Our interpretation: useful for selecting moments that deserve human review. A helmet-video adaptation needs affordable pose inputs and stronger hand-object evidence before its binary labels can support trade-specific skill judgments.

## Human notes
