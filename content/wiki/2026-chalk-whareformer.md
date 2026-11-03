---
year: 2026
venue: "ECCV"
affiliations: ["University of Bristol", "NAVER LABS Europe"]
research_groups: [bristol-mavi]
reviewed: false
tags: [method, spatial-understanding, video-memory, egocentric-video]
---

# Whareformer: Learning to Track What is Where in Long Egocentric Videos

Whareformer learns to associate object observations with persistent tracks using appearance and relative 3D location, including when objects temporarily leave the camera view.

**Authors:** Jacob Chalk, Saptarshi Sinha, Dima Damen, Yannis Kalantidis, Diane Larlus.
**Paper:** [PDF](../raw/2026-chalk-whareformer.pdf) · [Publisher record](https://link.springer.com/chapter/10.1007/978-3-032-37461-5_26)
**Website:** [Project website](https://jacobchalk.github.io/Whareformer/)
**Code:** [Official repository](https://github.com/JacobChalk/Whareformer)
**Source version:** arXiv:2607.08537v1, 9 July 2026, 23 pages including supplementary material. ECCV 2026 publication is independently confirmed by Springer, but the final publisher PDF was not compared.
**Citations:** 0 ([OpenAlex](https://openalex.org/W7167904081), checked 2026-11-03).

![Whareformer assigns observations to persistent tracks or an explicit new-track token](../assets/2026-chalk-whareformer.png)

*Figure 2. Appearance/location matching, transformer assignment, and track-memory updates. Source: [archived PDF, p. 4](../raw/2026-chalk-whareformer.pdf#page=4).*

## Problem and contribution

Object permanence requires remembering the identity and location of an object after a head turn or occlusion. Whareformer replaces the OSNOM baseline's hand-designed association thresholds with learned matching and an explicit choice to start a new track. It addresses persistent tracking, not question answering (§§1–3).

## Approach

Object masks supply DINOv2 appearance descriptors, reduced through PCA. Depth, scene geometry, and camera poses lift observations into a common 3D frame. Each track stores clustered appearance history through DenStream and roughly one second of recent locations (§§3.2–3.3).

For each observation, appearance and location distances to every existing track become tokens. A transformer compares these possibilities with a New Track token and predicts the assignment. Conflicts between simultaneous observations are resolved, then the selected track's memory is updated (§§3.4–3.6, Fig. 2).

Training uses labeled track identities with teacher forcing, while inference updates associations sequentially from predictions. DAgger-style correction is an additional training ablation. This online association consumes prepared masks/features/geometry, so it does not demonstrate a complete live camera-ingestion pipeline (§3.7, §4.5).

## Evidence and limits

Training uses 56 EPIC-KITCHENS videos. Evaluation covers 54 held-out EPIC videos plus IT3DEgo and HD-EPIC. On EPIC, mean Percentage of Correct Locations rises from LMK's 53.0% to 72.2%, with a 30-centimetre tolerance, while IDF1 rises from 70.0% to 84.0% (§4, Table 1).

Main experiments depend on ground-truth masks. Using predicted masks reduces mPCL to 62.9% and IDF1 to 78.6% (Appendix E, Table 11). Prepared geometry and features remain upstream costs, and retained locations cannot reveal movements occurring entirely out of view. Evaluation concerns minute-scale recordings, not shared multiworker memory across shifts. Public code was inspected statically, without reproducing results.

## Research connections

- **Builds on:** [[2025-plizzari-osnom]] — adopts the object-permanence task and 3D lifting pipeline while learning association (§§2–3.2).
- **Compares with:** [[2025-plizzari-osnom]] — evaluates against LMK with shared masks and locations (§4.2, Table 1).
- **Builds on:** [[2025-perrett-hd-epic]] — uses its object masks and spatial annotations for cross-dataset evaluation (§4.1).

## Relevance to Aligned

Our interpretation: a direct candidate for preserving tool or component identity across camera turns. Test false merges between identical objects, automatic geometry/mask quality, and unseen movements before extending it to multiple workers or repair histories.

## Human notes
