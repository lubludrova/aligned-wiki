---
year: 2026
venue: "AAAI / IAAI, 40(47), 40167-40175"
affiliations: ["Beijing University of Posts and Telecommunications", "Nanyang Technological University", "Nanjing Technological University", "Huafeng Technology (Nanjing)"]
research_groups: []
reviewed: false
tags: [dataset, benchmark, method, execution-quality, egocentric-video, construction, real-world-evaluation, production-use]
---

# ConstructAI: From Real-Time Safety Insight to Skill Growth in Deployed Construction AI Systems

Describes a deployed construction-safety workflow linking camera observations, localized violations, corrective requirements and confirmation of rectification.

**Authors:** Gaowei Zhang, Wei Wang, Tiong Lee Kong, Kai Xing, Huan Li, Yi Wang.
**Paper:** [PDF](../raw/2026-zhang-constructai.pdf) · [Publisher](https://ojs.aaai.org/index.php/AAAI/article/view/41452)
**Website:** Not found in checked sources.
**Code:** Not found in checked sources. Similarly named repositories found in search were not attributable to this paper.
**Source version:** Nine-page AAAI-26 proceedings PDF, DOI 10.1609/aaai.v40i47.41452, published 14 March 2026 in the IAAI deployed-applications track. Downloaded unchanged from the publisher.
**Citations:** 0 ([OpenAlex](https://openalex.org/W7138868116), checked 2026-11-03).

![ConstructAI: Figure 1 from the paper](../assets/2026-zhang-constructai.png)

*Figure 1 from the original paper ([PDF page 4](../raw/2026-zhang-constructai.pdf#page=4)).*

## Problem and contribution

Safety detection has limited operational value if nobody receives, acts on, and verifies a correction. ConstructAI connects visual analysis to assigned issues, worker feedback and an evidence-linked rectification archive. Its contribution is a system and author-reported deployment case, rather than a validated general measure of worker skill (Introduction, Output).

## Approach

Helmet, fixed-camera and drone video plus worker/task/time metadata → edge detection and cloud multimodal analysis → violation masks and reports → new evidence of correction (Fig. 1, Deployment).

A LLaMA3/LLaVA-like backbone connects through a SEG token and adapters to a SAM2 decoder. Supervised text and mask losses train explanations and localization. Lightweight edge detectors propose risks, while cloud processing produces regulatory references and corrective instructions. Workers receive alerts and instructional clips. Subsequent photos or video support rectification confirmation, and issue records retain the evidence and required action (PDF pp. 3-5, 7).

The intended workflow is continuous edge/cloud monitoring. The paper does not specify a reproducible no-future-information test or multi-camera association algorithm. Figure 4 labels Qwen3, whereas annotation prose names Qwen2-72B. Visual input handling for DeepSeek-R1 is also unclear.

## Evidence and limits

Ref-Construct validation J&F improves from 46.6 zero-shot to 55.6 after fine-tuning (Table 2). Dataset size and split construction are unspecified, limiting interpretation of both adaptation and generalization.

**Practical evidence:** Authors report deployment at more than 40 Chinese construction sites. Table 3 gives rectification completion of 21/929 before and 910/1,200 after deployment, approximately 2.3% and 75.8%. Mean rectification delay changes from about 340 to 15 minutes. Detection-to-alert latency below ten seconds is a different measure (PDF pp. 7-8).

These are uncontrolled before/after reports, with unclear exposure periods, cohort comparability and uncertainty. Increasing detected-case counts does not establish recall without missed-case labels. Table 2's UNINEXT aggregate is inconsistent with its displayed components. Training descriptions differ between sections, and no public code or dataset was verified. Reduced repeat violations do not directly demonstrate skill growth.

## Research connections

- **Builds on:** SAM2 - supplies mask decoding through the SEG-token interface (Fig. 1, PDF pp. 3-5).
- **Compares with:** MeViS and UNINEXT - zero-shot referring-video-segmentation baselines (Table 2).
- **Cites:** [[2022-sener-assembly101]] - contextualizes egocentric activity understanding (Related Work, PDF p. 2).

## Relevance to Aligned

Our interpretation: a direct reference for the issue lifecycle, including evidence, assignment and verified correction. Treat operational improvements as hypotheses to test. Searchable multi-week memory, cross-worker attribution, false alerts and end-to-end cost remain unestablished.

## Human notes
