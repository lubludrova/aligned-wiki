---
year: 2026
venue: "Applied Sciences"
affiliations: ["Université du Québec à Trois-Rivières", "Institut de Recherche Robert-Sauvé en Santé et en Sécurité du Travail"]
research_groups: []
reviewed: false
tags: [construction, survey, spatial-understanding, multi-person]
---

# Computer Vision-Based Collision Prevention in Construction: Bridging Academic Advances and Industrial Requirements

This review connects construction collision-monitoring research to commercial-system capabilities and the evidence needed for reliable warnings.

**Authors:** Marwa Ziadia, François Gauthier, Damien Burlet-Vienney.
**Paper:** [PDF](../raw/2026-ziadia-collision-survey.pdf) · [Publisher](https://doi.org/10.3390/app162110507)
**Website:** Not found in checked sources.
**Code:** Not applicable to this review. No public analysis repository identified.

**Source version:** Published Applied Sciences 16(21), article 10507, 23 October 2026. Original publisher PDF inspected. The academic search covers 2012–2024, while commercial documentation was collected in March–June 2026.

![Title and abstract of the construction collision monitoring review](../assets/2026-ziadia-collision-survey.png)

*Title and abstract screenshot from the original paper ([PDF page 1](../raw/2026-ziadia-collision-survey.pdf#page=1)). No method or taxonomy overview figure is provided in this survey.*

## Problem and contribution

Accurate detections in curated experiments do not automatically produce timely, stable collision warnings on active construction sites. The review connects five functions—detection, proximity estimation, tracking, worker re-identification, and deployment robustness—to industrial reporting and integration gaps. Its contribution is an evaluation-oriented synthesis rather than a new detector or unified benchmark.

## Approach

The authors screen Scopus and Google Scholar results, restrict the core search to ten construction-related venues, and retain 158 publications. Full papers are coded for sensing, tasks, application, data, evaluation, and limitations. The industrial review combines product documentation, trade-show information, and interviews with seven Quebec/Ontario suppliers in 2024–2025 (§2). The resulting representation is a comparison of functions, reported performance, operating conditions, and missing disclosures. There is no trained model or streaming implementation.

## Evidence and limits

Table 1 documents commercial products' sensor types, metric versus zonal distance outputs, stated ranges, and disclosed latency. Tracking and re-identification are frequently undisclosed. These are supplier specifications, not independently reproduced measurements. Tables 2–5 organize academic evidence by function, while §4.3 recommends distance/occlusion-stratified precision and recall, false alerts per hour, alert persistence, end-to-end timing and jitter, metric-distance errors, and sensor-health events.

The corpus is not exhaustive. Restricting venues can exclude relevant computer-vision research, and no additional study-quality appraisal was applied (§2.1). Different test settings and metric definitions prevent direct cross-study rankings (§5.2). Interviews and product inventories provide operational context but do not establish comparative accident reduction. The authors' timing recommendation is tied to collision-warning applications, rather than a universal deadline for every safety or progress event.

## Research connections

- **Cites:** Jeelani et al.'s worker-localization and hazard-detection framework, including its lack of metric distance to dynamic hazards (Table 3, reference 55).
- **Cites:** ISO 21815-3 and ISO/IEC TR 5469 when distinguishing warning functions from avoidance/control functions (§4.5). The review is not a substitute for those standards.

## Relevance to Aligned

Our interpretation: valuable for specifying monitoring evidence beyond frame accuracy. A construction system should expose alert burden, timing, visibility, and track continuity, while daily summaries need separate checks for event completeness and grounded duration estimates.

## Human notes
