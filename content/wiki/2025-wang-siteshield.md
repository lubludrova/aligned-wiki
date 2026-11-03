---
year: 2025
venue: "arXiv preprint"
affiliations: ["The University of Sydney", "University of Technology Sydney"]
research_groups: []
reviewed: false
tags: [method, execution-quality, construction]
---

# Automating construction safety inspections using a multi-modal vision-language RAG framework

Pairs inspection images with spoken hazard descriptions and retrieves regulations to generate construction safety reports.

**Authors:** Chenxin Wang, Elyas Asadi Shamsabadi, Zhaohui Chen, Luming Shen, Alireza Ahmadian Fard Fini, Daniel Dias-da-Costa.
**Paper:** [PDF](../raw/2025-wang-siteshield.pdf) · [Primary source](https://arxiv.org/abs/2510.04145v1)
**Website:** Not found in checked sources.
**Code:** Not found in checked sources.
**Source version:** Original 33-page arXiv:2510.04145v1 PDF, 2025. Model names and results refer to this inspected version.
**Citations:** 0 ([OpenAlex](https://openalex.org/W4414971097), checked 2026-11-03).

![SiteShield multimodal construction monitoring flowchart](../assets/2025-wang-siteshield.png)

*Figure 1. SiteShield multimodal construction monitoring flowchart. Source: [original paper, PDF p. 5](../raw/2025-wang-siteshield.pdf#page=5).*

## Problem and contribution

Inspection reports must connect observed conditions to relevant regulations. SiteShield studies whether multimodal inspector records and document retrieval improve report content and regulatory citations, rather than detecting every event in continuous video (§§1–2).

## Approach

Site photographs plus recorded descriptions → timestamp/location matching → model-generated descriptions → ColPali document-page retrieval → report with supporting regulatory references (Figs. 1, 4–5). The inspected manuscript names GPT-5 as its generation model and LangChain for orchestration. Location embeddings help match image/audio pairs when metadata differ (§§2.1–2.3).

The case study selects 25 construction images and records corresponding 20–40-second audio descriptions that explicitly name hazards. Three configurations compare image-only generation without RAG, image-only SiteShield and image-plus-audio SiteShield. This is batch inspection assistance, not autonomous video monitoring (§3, §4.3).

## Evidence and limits

Two construction researchers and Microsoft Copilot score 75 reports for completeness, relevance, accuracy and readability. Human ratings favor the multimodal configuration, but there are only 25 selected cases and no independent operational trial (§4.1, Tables 4–5).

Table 7 reports regulatory-citation F1 of 0.8170, precision 0.7600 and recall 0.9600 with audio, versus F1 0.6479 for images alone. These are regulatory retrieval/application labels, not hazard-event recall. The additional audio already describes hazards, so the improvement cannot establish better visual detection (§§4.2–4.3).

The paper reports responses within a few minutes without a timing distribution. Example reports retain visual mistakes, and the image-only configuration retrieves irrelevant regulations. Dataset/code are available by request rather than as a verified public implementation (§4, Data Availability).

## Research connections

- **Builds on:** ColPali, Faysse et al. (2024) — retrieves relevant regulation pages through visual document embeddings (§2.3, Fig. 5, Ref. 33).
- **Cites:** Pu et al., AutoRepo (2024) — earlier automated construction reporting context (§1, Ref. 8).

## Relevance to Aligned

Our interpretation: a targeted reference for turning already collected evidence into reports with auditable regulatory citations. Keep inspector statements distinct from model-observed facts. Its moderate priority reflects useful report design but weak evidence for autonomous perception, live alerts or full-day completeness.

## Human notes
