---
year: 2026
venue: "Sensors"
affiliations: ["Chongqing University", "State Key Laboratory of Safety and Resilience of Civil Engineering in Mountain Area"]
research_groups: []
reviewed: false
tags: [dataset, benchmark, method, construction, execution-quality, spatial-understanding, efficient-processing]
---

# A Vision-Based Sensing Framework for PPE Detection and Safety Harness Compliance Recognition in High-Formwork Construction Environments Using YOLO-ILB

YOLO-ILB combines a compact PPE detector with image-geometry rules for classifying safety-harness anchoring states.

**Authors:** Gang Yao, Lang Liu, Yang Yang, Xiaodong Cai.
**Paper:** [PDF](../raw/2026-yao-yolo-ilb.pdf) · [Publisher](https://doi.org/10.3390/s26134147)
**Website:** Not found in checked sources.
**Code:** Not found in checked sources.

**Source version:** Published Sensors 26(13), article 4147, 1 July 2026. Original publisher PDF inspected. The data-availability statement offers data from the corresponding author on request.
**Citations:** 1 ([OpenAlex](https://openalex.org/W7166854352), checked 2026-11-03).

![YOLO-ILB: Figure 5 from the paper](../assets/2026-yao-yolo-ilb.png)

*Figure 5 from the original paper ([PDF page 10](../raw/2026-yao-yolo-ilb.pdf#page=10)).*

## Problem and contribution

High-formwork scaffolds create occlusion, scale variation, and small safety-hook targets. Wearing a harness alone does not demonstrate compliant anchoring. This paper modifies a lightweight detector and adds explicit hook–harness association and relative-height rules, extending equipment-presence detection to three inferred anchoring states.

## Approach

A UAV image enters a supervised YOLO11n-derived detector with Inception depthwise convolutions, large separable-kernel attention, and bidirectional feature fusion. Outputs cover helmet, no-helmet, harness, no-harness, and safety-hook boxes. The compliance stage associates hooks with harnesses using distance and a lanyard-length constraint, then compares vertical box-center coordinates. It outputs high anchoring, low anchoring, or an unclipped/too-distant-hook candidate (§3.3). These are geometric rule interpretations of detections, not observations of physical attachment strength. Processing is per image. Temporal tracking and automated video alerts are future work (§5).

## Evidence and limits

The 2,700-image dataset combines 1,257 controlled scaffold images with 1,443 images from 17 active construction sites. The 6:3:1 stratified image split does not demonstrate site-disjoint generalization (§3.1). Table 3 reports 0.939 mAP@50 and 262.3 FPS on an RTX 4060. This detector throughput is not measured camera-to-alert latency. Hooks are the weakest category, with 0.846 recall (§4.1, Table 4).

Anchoring evaluation selects 200 test images containing complete detections, with 305 manually checked targets. Table 6 reports 90.82% accuracy (§4.3). Selection limits end-to-end interpretation. Missing hooks can be occluded rather than unattached, and viewpoint distortion changes apparent vertical order. Neither prolonged event detection nor false alerts per camera-hour is evaluated. No public implementation or downloadable dataset was identified.

## Research connections

- **Builds on:** YOLO11n, LSKA, and BiFPN supply the detector components (§3.2).
- **Cites:** Nath et al.'s PPE detector as prior presence-oriented safety monitoring (§1, reference 6).

## Relevance to Aligned

Our interpretation: a direct example of extracting a small safety feature and applying a contextual rule. It motivates retaining hook visibility and association uncertainty alongside the result, then testing temporal persistence and fixed-camera geometry before reporting non-compliance.

## Human notes
