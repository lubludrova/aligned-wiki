---
year: 2026
venue: "ISARC, pp. 824–831"
affiliations: ["Department of Structural Engineering, Ben-Gurion University of the Negev", "Department of Civil and Environmental Engineering, Catholic University of America"]
research_groups: []
reviewed: false
tags: [method, procedure-understanding, execution-quality, construction, training-free]
---

# From Sensing to Scheduling: Deviation-Based Framework for Sensor-Aware Progress Monitoring and Schedule Control

Separates sensed execution from formal acceptance and translates measured work into schedule deviations and recovery targets.

**Authors:** Shabtai Isaac, Gunnar Lucko.
**Paper:** [PDF](../raw/2026-isaac-sensing-scheduling.pdf)
**Website:** Not found in checked sources.
**Code:** Not found in checked sources.
**Source version:** Eight-page ISARC 2026 publisher PDF downloaded 1 November 2026. Its title uses “Deviation-Based Framework”.
**Citations:** 0 ([OpenAlex](https://openalex.org/W7165917260), checked 2026-11-03).

![From Sensing to Scheduling: Figure 1 from the paper](../assets/2026-isaac-sensing-scheduling.png)

*Figure 1 from the original paper ([PDF page 3](../raw/2026-isaac-sensing-scheduling.pdf#page=3)).*

## Problem and contribution

Visible installation does not necessarily establish completion: tests, inspections and approvals can remain outstanding. Progress quantities also do not directly specify schedule delay. The paper proposes a management framework linking evidence-aware work packages, measured quantities and explicit acceptance milestones (§§1–3).

## Approach

Planned deliverables and evidence requirements → sensed or documented executed quantities → backlog, delay and forecast → schedule updates with acceptance gates (Tables 1–2).

Each work package receives an evidence type and an observability window. Geometry may establish that work exists, while quality tests or inspection records establish performance and acceptance. The proposed completion circuit separates execution, test/verify and acceptance. A deterministic translation compares planned and actual cumulative work, estimates remaining duration from productivity, and computes productivity needed to recover the plan (§§4–5).

This is a sensing-agnostic method, not a new vision model, deployed software architecture or automatic inspection system. Its inputs require defensible measurement of executed work.

## Evidence and limits

Section 6 explicitly uses a small illustrative concrete-wall example rather than empirical validation. Figure 2's visual-observability categories are heuristic. The example demonstrates calculability, not improved project outcomes or reliable visual recognition (PDF pp. 4, 6).

Section 7 acknowledges occlusion, hidden work and narrow evidence windows. Uncertainty is not propagated probabilistically through the forecasts. The method requires meaningful work units and sufficiently frequent observations, and acceptance data must come from additional sources when visual geometry cannot establish compliance. Multi-project comparisons and measured management benefits remain future work (§§7–8).

## Research connections

- **Cites:** Turkan et al., “Automated progress tracking using 4D schedule and 3D sensing technologies” (2012), as an existing measurement pipeline (§2, reference 1).
- **Cites:** Hamledari et al.'s IFC-based schedule updating, as a complementary representation for updates (§2, reference 8).

## Relevance to Aligned

Our interpretation: add evidence types and windows to issue records and distinguish observed repair from accepted closure. A concealed fastening needs prior visual evidence or an appropriate inspection record. Use this conceptual separation in system design, but do not cite the paper as validation of automated acceptance or calibrated uncertainty.

## Human notes
