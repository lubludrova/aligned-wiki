---
year: 2026
venue: "Procedia Computer Science 277, 1150–1160 / ISM 2025"
affiliations: ["University of Twente"]
research_groups: []
reviewed: false
tags: [procedure-understanding, construction]
---

# Surrogate Case Identifier Rules for Construction Site Hoists

Tests how alternative event-grouping rules change estimated hoist utilization and discovered process structure when native ride identifiers are absent.

**Authors:** Erjan Steenbergen, Rob Bemthuis, Faiza Bukhsh.
**Paper:** [PDF](../raw/2026-steenbergen-hoist-case-identifiers.pdf) · [Institutional record](https://research.utwente.nl/en/publications/surrogate-case-identifier-rules-for-construction-site-hoists/)
**Website:** Not found in checked sources beyond the institutional record.
**Code:** Not found in checked sources.
**Source version:** Eleven-page published PDF supplied by the user. Volume/publication year is 2026, while the conference and PDF copyright are 2025. DOI 10.1016/j.procs.2026.02.155 is confirmed by the institutional record.

![Hoist surrogate case identifiers: Figure 1 from the paper](../assets/2026-steenbergen-hoist-case-identifiers.png)

*Figure 1 from the original paper ([PDF page 4](../raw/2026-steenbergen-hoist-case-identifiers.pdf#page=4)).*

## Problem and contribution

A floor call, door movement and cabin destination do not identify one passenger journey automatically. Concurrent users can share physical events. The paper compares explicit grouping choices instead of treating an inferred case identifier as ground truth (§§1, 4).

## Approach

Cleaned hoist telemetry → alternative surrogate cases → event logs → utilization estimates and BPMN models → numeric and structural comparisons (Figure 1).

Rules group by active interval, passenger journey, calendar day, motion, waiting-plus-riding, concurrent waiting-plus-riding, or consecutive cabin requests. Overlapping cases can duplicate events. A Little's-Law-derived correction adjusts utilization for concurrency. PM4Py computes indicators, Apromore discovers models, and BPMNDiffViz compares shared nodes/arcs. Discovery parameters are expert-tuned. This is retrospective process mining, not visual tracking or a deployed online association system (§§3–4).

## Evidence and limits

One month of 2023 telemetry contains approximately three million events from 180 sensors. ActiveTime grouping yields 56.50% utilization against a raw-signal reference of 57.19%, a difference of 0.69 percentage points. Their shared input signal makes agreement insufficient evidence of correct ride reconstruction. ActiveTime and Person models share only 48% of their structure (Tables 2, 4).

The reference is explicitly not definitive ground truth. No labeled event-to-ride benchmark establishes association accuracy. The narrative calls the collection six rules, but tables evaluate seven named variants. Derived numbers contain errors: Table 2 prints an 11.36-point difference for 66.55% versus 57.19%, whose difference is 9.36 points. Rules and discovery settings are manually chosen, one dataset is studied, and operational deployment is outside scope (§§3.6, 6).

## Research connections

- **Builds on:** PM4Py — computes event-log indicators (§3.4, reference 6).
- **Builds on:** BPMNDiffViz — compares discovered process structures (§3.5, reference 14).

## Relevance to Aligned

Our interpretation: test camera, worker, object, work-instance and issue identifiers separately. Similar aggregate progress does not validate event association. Preserve competing assignments and validate merges/splits against annotated executions before interpreting recurrence or closing an issue.

## Human notes
