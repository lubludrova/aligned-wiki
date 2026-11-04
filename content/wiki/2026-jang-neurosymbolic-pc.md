---
year: 2026
venue: "Journal of Computational Design and Engineering, 13(8), 90–108"
affiliations: ["Korea Institute of Civil Engineering and Building Technology", "Incheon National University"]
research_groups: []
reviewed: false
tags: [method, procedure-understanding, construction, multi-person, sft]
---

# Neuro-symbolic vision framework for construction: Knowledge graph-augmented monitoring and productivity analysis of precast concrete assembly

Refines detected construction activities with spatial, temporal and prerequisite rules, then exports activity durations and productivity records.

**Authors:** Junyoung Jang, Eunbeen Jeong, Jongwoo Cho, Tae Wan Kim.
**Paper:** [PDF](../raw/2026-jang-neurosymbolic-pc.pdf) · [Primary source](https://doi.org/10.1093/jcde/qwag067)
**Website:** Not found in checked sources.
**Code:** Not found in checked sources.
**Source version:** Original 19-page journal PDF, advance publication 16 July 2026, DOI 10.1093/jcde/qwag067.
**Citations:** 0 ([OpenAlex](https://openalex.org/W7168518220), checked 2026-11-03).

![Neuro-symbolic PC monitoring: Figure 1 from the paper](../assets/2026-jang-neurosymbolic-pc.png)

*Figure 1 from the original paper ([PDF page 4](../raw/2026-jang-neurosymbolic-pc.pdf#page=4)).*

## Problem and contribution

Precast assembly monitoring needs coherent sequences and component-level work durations despite occlusions and ambiguous actions. The contribution combines neural perception with explicit domain constraints and a productivity-analysis interface (§§1–3.1).

## Approach

Site video → YOLOv11 detections and DeepSORT tracks → VideoMAE activity predictions → knowledge-graph refinement → activity logs and productivity metrics. Recognition uses 16-frame windows for rigging, lifting, assembly and unrigging across columns, beams and slabs (§§3.3–3.5).

The graph checks prerequisites and plausible transitions, then combines rule, spatial, duration and transition confidence. Its online updates change duration statistics after enough observations, not relational weights. The interface exports JSON/CSV records for later reporting (§§3.6–3.8). Worker-height normalization approximates spatial proximity in the image plane rather than reconstructing metric 3D distance.

## Evidence and limits

The dataset contains 12,000 images and 12,791 clips from one site. Video data use a stratified 70/10/20 split. Table 14 reports 96.5% F1 versus 91.3% for YOLO plus VideoMAE late fusion and 88.2% for VideoMAE alone. Table 15 isolates spatial and temporal constraints, but its aggregate reaches 91.2%, so it should not be conflated with the full-system score (§§3.2, 4.3).

Productivity evaluation covers 142 components from a reported temporally separated test period. Table 18 gives author-defined aggregate MAPE of 1.3–3.4%: it averages time/productivity percentage errors, then activities. Table 17 separately reports work-time errors. Throughput is reported as 28.3 FPS on RTX 3090, without a multi-camera latency distribution (§§4.4–5.1).

Generalization across sites and severe weather is untested. Two-dimensional proximity fails when objects occupy different depth planes, and site calibration remains necessary. Safety checks and BIM-based planned-versus-actual progress are future work (§5).

## Research connections

- **Builds on:** Jang et al., precast image dataset (2024) and installation-action video dataset (2025) — supply the perception training data (§3.2).
- **Cites:** Fang et al., knowledge graphs for construction hazards — motivates domain knowledge integration (§2.4).

## Relevance to Aligned

Our interpretation: a high-priority example of converting video into structured process records before generating reports. Test its constraint logic against real rework and interruptions so that unusual but valid activity is not forcibly rewritten into a standard sequence. It does not establish that an inactive person is shirking.

## Human notes
