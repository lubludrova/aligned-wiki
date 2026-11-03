---
year: 2025
venue: "ISARC 2025, 641–648"
affiliations: ["New York University Abu Dhabi"]
research_groups: []
reviewed: false
tags: [state-changes, construction, real-world-evaluation]
---

# Automating Weekly Construction Activity Progress Reporting: Leveraging AI-Driven Workflows

Connects inspection photos and an updated schedule to an automated reporting workflow, while exposing errors in visually estimated completion.

**Authors:** Eyob Mengiste, Muammer Semih Sonkor, Zihao Zheng, Samuel A. Prieto, Borja García de Soto.
**Paper:** [PDF](../raw/2025-mengiste-weekly-progress.pdf) · [Primary source](https://doi.org/10.22260/ISARC2025/0084)
**Website:** Not found in checked sources.
**Code:** Not found in checked sources.
**Source version:** Original eight-page ISARC 2025 proceedings PDF, DOI 10.22260/ISARC2025/0084.

![Automated construction progress reporting process](../assets/2025-mengiste-weekly-progress.png)

*Figure 2. Automated construction progress reporting process. Source: [original paper, PDF p. 4](../raw/2025-mengiste-weekly-progress.pdf#page=4).*

## Problem and contribution

Weekly reports require integrating planned tasks, site observations and projected work. This paper connects those stages in a low-code workflow and demonstrates the resulting report on one university fit-out project (§§1–2).

## Approach

Staff-uploaded inspection photos and a previously updated MS Project schedule → Google Drive storage → n8n orchestration → GPT-4o completion estimates → schedule comparison → weekly report returned through Telegram (§3, Figs. 1–2).

JavaScript extracts tasks planned for the current and following week. The model estimates percentage completion from images and task context. Another model call compares estimates with the previous schedule and selects the higher values. The workflow derives schedule-performance indicators, next-week tasks and captioned evidence. A user sends `/report` to request generation. Taking photographs and uploading an updated schedule remain manual, and schedule maintenance is explicitly outside the stated scope (§§3.1–3.2, 4.2).

## Evidence and limits

**Practical evidence:** A campus meeting-room-to-auditorium conversion supplies one selected reporting week, a baseline schedule and 360-degree inspection photographs (§4). This is a case demonstration, without a controlled comparison of saved effort or generalization across projects.

Table 1 is especially informative: concrete work is estimated as 0% and “Not started” although actual completion is 100%. Ceiling installation is estimated at 60% against actual 21%. Thus successful report generation does not establish reliable progress measurement (§5, Table 1). The table footnote and §7 explicitly require site verification.

The evaluation excludes cost metrics, relies on an up-to-date previous schedule and lacks measured work volumes. Static photos cannot establish everything that happened between inspections. Broad claims of bias elimination are not demonstrated by these results (§§6–7).

## Research connections

- **Cites:** Xiao et al., automated daily reports from construction videos (2024) — earlier integration of computer vision and ChatGPT (§2.1, Ref. 12).
- **Cites:** Pu et al., AutoRepo (2024) — multimodal construction-reporting predecessor (§2.2, Ref. 22).

## Relevance to Aligned

Our interpretation: retain as a concrete downstream workflow and a cautionary evaluation case, not a leading perception method. For daily reports, attach each completion claim to visible evidence and distinguish observation, model estimate and confirmed progress. A successful report export must not turn an uncertain percentage into an accepted project fact.

## Human notes
