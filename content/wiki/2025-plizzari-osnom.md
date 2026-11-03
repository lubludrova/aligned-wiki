---
year: 2025
venue: "3DV"
affiliations: ["Politecnico di Torino", "Avataar Inc.", "University of California, Berkeley", "University of Bristol"]
research_groups: [bristol-mavi]
reviewed: false
tags: [benchmark, method, spatial-understanding, video-memory, egocentric-video]
---

# Spatial Cognition from Egocentric Video: Out of Sight, Not Out of Mind

OSNOM evaluates persistent 3D tracking of manipulated objects, and its Lift, Match and Keep baseline retains their locations when they leave the camera view.

**Authors:** Chiara Plizzari, Shubham Goel, Toby Perrett, Jacob Chalk, Angjoo Kanazawa, Dima Damen.
**Paper:** [PDF](../raw/2025-plizzari-osnom.pdf)
**Website:** [Project website](https://dimadamen.github.io/OSNOM/)
**Code:** [GitHub repository](https://github.com/Chiaraplizz/OSNOM)
**Source version:** arXiv:2404.05072v2, 21 January 2025. First released April 2024. The [official project](https://dimadamen.github.io/OSNOM/) identifies the camera-ready work as 3DV 2025.
**Citations:** 5 ([OpenAlex](https://openalex.org/W4413556468), checked 2026-11-03).

![OSNOM spatial memory of objects outside the current view](../assets/2025-plizzari-osnom.png)

*Figure 1. OSNOM spatial memory of objects outside the current view. Source: [original paper, PDF p. 1](../raw/2025-plizzari-osnom.pdf#page=1).*

## Problem and contribution

Ordinary tracking forgets objects outside the image. OSNOM instead asks where every previously encountered active object is in a fixed world frame, including periods of occlusion and absence. It introduces a benchmark over 100 EPIC-KITCHENS evaluation videos and a training-free association method, Lift, Match and Keep (LMK).

## Approach

LMK first reconstructs camera poses and a static scene mesh from the video. It aligns monocular depth to that mesh, then projects each object-mask centroid into 3D. DINOv2 features describe the object's appearance. Hungarian matching combines appearance and spatial distances to assign observations to persistent object tracks (§3, Fig. 2).

Each track retains its last position and a rolling appearance average. Unobserved objects stay at their last location until matched again. First observations are also projected backward to the video's beginning. Thus sequential matching does not make the complete pipeline causal: geometry is precomputed from the video, and initialization retrospectively fills earlier states (§§3.1–3.2).

There is no question-answering stage. Stored tracks directly support location, visibility, reachability, and movement queries. Learned perception models are used without task-specific training, while thresholds are chosen on ten validation videos. Main experiments use interpolated human-annotated masks, with predicted detections examined separately (§4).

## Evidence and limits

LMK correctly localizes 64% of objects after one minute and 37% after ten minutes, using a 30-centimetre tolerance and identity consistency (Fig. 4, §5). These are offline video results, not user-assistance trials. Reconstruction takes approximately five GPU-hours per video. The reported 1,000-fps CPU association excludes mesh construction, feature extraction, and depth lifting (§4.2).

Ground-truth locations use the same lifting pipeline. Its validation measures cross-view consistency of ten static objects, rather than independent motion-capture accuracy (Appendix B). Predicted masks reduce performance. Clutter, occlusion, and changing appearance cause identity splits or lost tracks (Appendices D–E). Assuming an unseen object remains stationary is especially restrictive if another person moves it.

## Research connections

- **Builds on:** EPIC-Fields — supplies the camera-reconstruction pipeline, paired with VISOR object masks (§§2–3.1).
- **Compares with:** EgoLoc and IT3DEgo — adapts their retrieval/tracking outputs to the same 3D evaluation (§4.2).
- **Cites:** [[2022-grauman-ego4d]] — contrasts continuous object permanence with VQ3D's last-seen localization (§2).

## Relevance to Aligned

Our interpretation: persistent object tracks could preserve tool locations through head turns. Multiworker changes, reconstruction cost, and uncertain unseen motion need explicit handling before construction-site use.

## Human notes
