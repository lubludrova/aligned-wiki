---
year: 2026
venue: "Automation in Construction 183, 106783"
affiliations: ["Department of Civil and Construction Engineering, National Taiwan University of Science and Technology"]
research_groups: []
reviewed: false
tags: [method, procedure-understanding, spatial-understanding, construction, real-world-evaluation]
---

# Automated construction progress monitoring and control through AI-based image recognition and BIM integration

Maps multi-camera construction-phase detections to named BIM components and visualizes their progress against a schedule.

**Authors:** Chang-Cheng Hsieh, Hung-Ming Chen, Wan-Yu Chen, Ting-Yu Wu.
**Paper:** [PDF](../raw/2026-hsieh-ai-bim-progress.pdf) · [DOI](https://doi.org/10.1016/j.autcon.2026.106783)
**Website:** Not found in checked sources.
**Code:** Not found in checked sources.
**Source version:** Twenty-one-page publisher article supplied by the user, available online 19 January 2026.
**Citations:** 7 ([OpenAlex](https://openalex.org/W7124830140), checked 2026-11-03).

![AI+BIM construction progress: Figure 2 from the paper](../assets/2026-hsieh-ai-bim-progress.png)

*Figure 2 from the original paper ([PDF page 5](../raw/2026-hsieh-ai-bim-progress.pdf#page=5)).*

## Problem and contribution

A detector's phase label must be associated with a particular construction component before it can update project progress. The contribution is camera-to-BIM integration and component-level schedule comparison, rather than a new recognition architecture (§§2–3).

## Approach

Scheduled IP-camera images → YOLOv8 phase boxes → calibrated virtual camera and ray casting → BIM component state → schedule comparison and colored visualization (Figures 2, 13).

Distances to known columns support camera positioning, with manual adjustment. A ray through each box center selects the first intersected BIM element. Multiple views update that element using a configurable policy: highest confidence, earliest construction phase, or majority vote with an earliest-phase tie break. Fusion policies are uncalibrated heuristics. Six classes cover rebar, formwork and concrete phases. RTSP/FFmpeg and Unity connect detections to BIM and schedules (§§3.1–3.2).

## Evidence and limits

The detector uses 580 images with an 8:1:1 split. Table 5 reports 253 test instances, precision 80.8%, recall 72.7% and mAP@0.5 75.2%. These are phase-detection metrics, not component-assignment or defect-detection accuracy. Site-disjoint partitioning is not specified, and unseen-site examples are qualitative (§3.1.5).

**Practical evidence:** After demonstrations with modified photographs, a reinforced-concrete project uses three cameras. Table 7 records view coverage of eleven columns, not a labeled confusion matrix. Table 8 reports an update cycle below one minute for three cameras versus below ten minutes for a roughly 40-m manual route. Actual updates are configured hourly, so cycle runtime is not observation freshness (§4.4).

Alignment remains partly manual. Occlusion tests use manually simulated obstruction. Phase correctness, earliest-phase fusion and cross-view assignment lack separate quantitative validation. The work does not evaluate workmanship, hidden defects, moving helmet cameras or repair acceptance.

## Research connections

- **Builds on:** YOLOv8 — supplies replaceable phase detections (§3.1.2).
- **Builds on:** Unity Physics.Raycast — associates a detection center with a BIM element (§3.2.3).

## Relevance to Aligned

Our interpretation: use persistent physical-component IDs to join observations across cameras and compare observed state with a plan. Retain evidence and ambiguous assignments. A detected later construction phase cannot by itself confirm that earlier work passed inspection.

## Human notes
