---
year: 2025
venue: "ICLR 2025"
affiliations: ["Korea Advanced Institute of Science and Technology", "University of Illinois at Urbana-Champaign"]
research_groups: []
reviewed: false
tags: ["video-qa", "preference-learning"]
---

# Can Video LLMs Refuse to Answer? Alignment for Answerability in Video Large Language Models

Studies whether Video-LLMs can recognize questions unsupported by a supplied video, and trains refusal behavior using synthetic negative questions.

**Authors:** Eunseop Yoon, Hee Suk Yoon, Mark Hasegawa-Johnson, Chang D. Yoo.
**Paper:** [PDF](../raw/2025-yoon-uvqa.pdf) · [Primary record](https://arxiv.org/abs/2507.04976v1)
**Website:** Not found in checked sources.
**Code:** [Author repository](https://github.com/EsYoon7/UVQA)
**Source version:** arXiv:2507.04976v1, 7 July 2025, conference-labelled ICLR 2025 manuscript, 26 pages. The PDF renders Mark Hasegawa-Johnson without the middle initial present in the arXiv metadata.

![UVQA answerability alignment data construction](../assets/2025-yoon-uvqa.png)

*Figure 3. UVQA answerability alignment data construction. Source: [original paper, PDF p. 6](../raw/2025-yoon-uvqa.pdf#page=6).*

## Problem and contribution

A model can understand visible objects yet answer a question with a false premise. UVQA separates answerability from ordinary answer quality and introduces metrics that expose harmful over-refusal after alignment (§4).

## Approach

Video-description pairs → controlled changes to objects, relations or attributes → GPT-4-generated unanswerable questions and explanations → mixed answerable/unanswerable SFT or DPO (Fig. 3, §§4.3–5.2).

Object and relation substitutions use MOMA-LRG scene-graph triplets. Attribute substitutions use adjectives in DiDeMo descriptions, with category-preserving changes. Training combines 30K generated negative examples with 30K answerable Video-ChatGPT examples. The balanced evaluation uses 300 human-filtered negatives and 300 ActivityNet-QA positives. These different source distributions are a potential shortcut and an external-validity limitation.

## Evidence and limits

For VideoChat2, Table 1 reports answerability F1 of 0.64 after DPO versus 0.00 unaligned, and absolute response accuracy of 0.54 versus 0.22. These are separate metrics. The excessive-refusal score is 0.09 for DPO versus 0.25 for SFT, conditional on answerable items the original model answered correctly. It is not the overall false-refusal rate.

The paper uses GPT-4 to classify response types and score answers, with a supplemental human check. Its deliberately balanced and relatively small evaluation does not establish operational error rates under real user traffic. Synthetic substitutions cover false premises, but not all causes of missing evidence such as an occluded action or a forgotten recording.

Most importantly, unanswerability is relative to the supplied video. This does not prove that an archive lacks evidence when retrieval missed the correct clip. Refusal training therefore complements retrieval diagnostics and cannot replace them. The public repository exposes generation and training code, but its README reports unavailable download paths for the DiDeMo/YFCC100M attribute videos at the time of checking.

## Research connections

- **Builds on:** MOMA-LRG, DiDeMo and Video-ChatGPT supply generation and training data (§§4.3–5.1).
- **Compares with:** Video-LLaVA, VideoChat2 and VLM-RLAIF before and after SFT/DPO (Table 1).

## Relevance to Aligned

Our interpretation: include paired answerable and unsupported questions in evaluation, penalize false refusals, and explain which evidence is missing. Combine this with [[2026-huang-apm-bench]] missing-memory probes and explicit retrieval-recall tests.

## Human notes
