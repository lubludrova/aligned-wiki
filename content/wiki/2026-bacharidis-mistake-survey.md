---
year: 2026
venue: "Computer Vision and Image Understanding"
affiliations: ["Institute of Computer Science, Foundation for Research and Technology – Hellas", "University of Crete"]
research_groups: [forth-hccv]
reviewed: false
tags: [survey, procedure-understanding, execution-quality, egocentric-video]
---

# Vision-Based Mistake Analysis in Procedural Activities: A Review of Advances and Challenges

This survey organizes procedural mistake analysis by error type, temporal task, procedural structure, supervision, and evaluation protocol.

**Authors:** Konstantinos Bacharidis, Antonis A. Argyros.
**Paper:** [PDF](../raw/2026-bacharidis-mistake-survey.pdf)
**Website:** [Publisher record](https://www.sciencedirect.com/science/article/pii/S1077314226002092)
**Code:** No dedicated implementation linked in the stored survey.
**Source version:** arXiv:2510.19292v2, 3 December 2025, first released 22 October 2025. This note covers that preprint. The later journal publication is CVIU 270, article 104842 (2026), verified by the publisher record and [author publication catalog](https://users.ics.forth.gr/argyros/publications.html).
**Citations:** 1 ([OpenAlex](https://openalex.org/W4416246614), checked 2026-11-03).

![Vision-based mistake recognition, detection, and early recognition](../assets/2026-bacharidis-mistake-survey.png)

*Figure 1. Vision-based mistake recognition, detection, and early recognition. Source: [original paper, PDF p. 1](../raw/2026-bacharidis-mistake-survey.pdf#page=1).*

## Problem and contribution

Recognizing an action does not establish whether it is appropriate for a task. The survey distinguishes recognition of a completed mistake, temporal detection of its extent, and early recognition from an incomplete action prefix. It separates task-aware correctness from generic visual anomaly detection, because an unusual execution can be valid and a visually ordinary action can violate a dependency (§§I–II).

## Approach

The error taxonomy separates procedural deviations, such as omitted, extra, or corrective steps, from executional errors involving technique, timing, modification, or domain-specific constraints. These categories describe a proposed synthesis of inconsistent dataset conventions, not universal ground truth (§III, Figure 4).

A second taxonomy groups representations into structure-free clip models, step-wise models, task/knowledge/rule graphs, and transcript-driven templates. These retain different context: local appearance, step prototypes, dependency histories, or alignment to a full procedure. The survey separately compares ordinary classification, one-class learning, task completion, and video–text alignment objectives (§VII, Figure 6).

Supervision is explicit: absence of mistake labels does not imply absence of action labels, transcripts, or correct-only examples. Online methods predict from accumulated observations, while many segmentation and alignment approaches use completed recordings. Table II records online status and annotation assumptions, but there is no common runtime, memory-retention, or ingestion/query-cost experiment. This is a literature synthesis, not a newly trained system.

## Evidence and limits

Tables I–II organize datasets and model configurations rather than rerunning them under one benchmark. The metrics discussion distinguishes recall-like Error Detection Accuracy from segment accuracy, temporal localization, omission overlap, and sequence-order scores. Caption overlap can reward a fluent explanation that identifies the wrong cause (§V).

The main open problems are permissible variations versus true violations, coarse annotations, error propagation, and grounded explanations. Synthetic instruction–clip mismatches expand supervision but can break scene continuity needed for causal analysis (§VIII). [?] Stored-version dataset descriptions contain inconsistencies, including EgoPER duration in prose versus Table I. Dataset statistics and individual method claims should therefore be checked against their original papers.

## Research connections

- **Cites:** [[2024-lee-egoper]] — step prototypes, omissions, and error metrics (§§IV–V, VII).
- **Cites:** [[2025-huang-amnar]] — multiple permissible normal branches (§VII-A).
- **Cites:** [[2025-patsch-mistsense]] — online detection and explanation (§VII).
- **Cites:** [[2026-li-matt]] — semantic and spatiotemporal attribution, cited through its 2025 preprint (§VI-A).

## Relevance to Aligned

Our interpretation: evaluate procedure compliance and execution quality separately, with explicit evidence availability and false-alarm measures. Neither unusual motion nor textual explanation alone establishes a mistake.

## Human notes
