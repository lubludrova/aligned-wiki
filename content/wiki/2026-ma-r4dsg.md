---
year: 2026
venue: "ACM Multimedia (author-reported acceptance)"
affiliations: ["College of Design and Innovation, Tongji University", "Samsung R&D Institute China - Beijing", "Shanghai Jiao Tong University", "Samsung Networks, Samsung Research America", "Shanghai Research Institute for Intelligent Autonomous Systems, Tongji University"]
research_groups: []
reviewed: false
tags: [method, video-memory, spatial-understanding, video-qa, egocentric-video]
---

# R4DSG: Relative 4D Scene Graph Memory for Object-Centric Question Answering in Long Egocentric Video

R4DSG writes object histories as changes relative to stable scene anchors, then retrieves compact records for questions about past locations and transitions.

**Authors:** Ke Ma, Yamin Mao, Weiming Li, Shuai Tan, Yijie Zhong, Hao Chen, Haofen Wang, Meng Wang.
**Paper:** [PDF](../raw/2026-ma-r4dsg.pdf) · [arXiv v1](https://arxiv.org/abs/2608.11017v1)
**Website:** [Official project](https://dualtransparency.github.io/R4DSG/)
**Code:** Not found in checked sources. The [official repository](https://github.com/dualtransparency/R4DSG) contains the static project page and demonstrations, not a released inference pipeline.
**Source version:** arXiv:2608.11017v1, 11 August 2026, 10 pages. Authors report ACM Multimedia 2026 acceptance. The repository describes the publisher DOI as reserved, and independent publisher confirmation was unavailable in this check.
**Citations:** 0 ([OpenAlex](https://openalex.org/W7202243079), checked 2026-11-03).

![R4DSG pipeline from semantic episodes through relative object graphs to retrieval-ready memory](../assets/2026-ma-r4dsg.png)

*Figure 2. Episode-local perception, persistent anchor-relative changes, memory writing, and object-centric QA. Source: [archived PDF, p. 5](../raw/2026-ma-r4dsg.pdf#page=5).*

## Problem and contribution

Captions may mention an object without preserving which instance moved or when its surroundings changed. R4DSG organizes monocular RGB video around persistent objects and stable references such as tables or shelves. Its contribution is a retrieval-ready relative spatial memory, without assuming calibrated poses, depth input, or a globally aligned map (§§1, 3.1–3.2).

## Approach

Activity and location episodes provide controlled object prompts. A SAM 3-style segmentation stage produces masks and local tracks, while SAM 3D-style lifting supplies coarse relative geometry. Frame graphs contain objects, places, activities, and spatial relations. Association uses semantic, size, position, and anchor-neighborhood consistency, preferring track splits when observations conflict (§3.4).

Stable anchor changes become temporal events. A deterministic writer combines these with local context into segment records containing time, place, activity, object states, interactions, and source evidence. QA retrieves eight records and linearizes them for Qwen3.5-27B. The conservative protocol introduces answer options only after retrieval. This is retrospective offline memory with limited cross-day persistence, not demonstrated streaming perception (§§3.3–3.4, 5).

## Evidence and limits

On 255 object-centric questions, the option-blind/no-why configuration achieves 37.3% accuracy versus 34.9% for a control sharing cached visual evidence but omitting persistent association and anchor-transition writing. The AMEGO-inspired baseline reaches 36.1%, but is an adaptation rather than an official reproduction (Table 2).

[?] The QA file spans seven days, while §4.1 describes all experiments as using Day1’s 828 clips, about 6.9 hours. Effective evidence coverage therefore needs clarification. Perception is not independently human-validated, and the 15-question why result is exploratory. The 0.58-MB figure covers serialized memory, excluding footage, models, and ingestion cost (Tables 3, 5, §5).

## Research connections

- **Builds on:** [[2025-yang-egolife]] — supplies the public A1_JAKE evaluation questions (§4.1).
- **Compares with:** [[2024-goletto-amego]] — uses an adapted interaction-memory baseline, not the original implementation (§4.1).
- **Cites:** [[2024-rodin-easg]] — contextualizes temporal graph representations for egocentric activities (§2.3).

## Relevance to Aligned

Our interpretation: anchor-relative histories could track tools or materials when a reliable site-wide map is unavailable. Test false merges and splits across similar objects and cameras separately. Location transitions and inferred explanations do not establish construction quality or the current state of an unobserved object.

## Human notes
