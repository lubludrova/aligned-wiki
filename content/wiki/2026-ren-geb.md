---
year: 2026
venue: "arXiv preprint"
affiliations: ["University of Illinois Urbana-Champaign", "Amazon.com, Inc."]
research_groups: []
reviewed: false
tags: [video-memory, video-retrieval, video-qa, egocentric-video]
---

# Beyond the Timeline: Augmenting Long-Video Memory with Grounded Entity Biographies

Grounded Entity Biographies (GEB) connects visually associated encounters of the same physical object or person to their surrounding events and source evidence.

**Authors:** Hui Ren, Lei Fan, Henry Pao, Han Guo, Zeeshan Zia, Ying Chen, Alexander Schwing, Gang Hua.
**Paper:** [PDF](../raw/2026-ren-geb.pdf)
**Website:** [Author-linked project website](https://geb-video.github.io/)
**Code:** [Official repository](https://github.com/rhfeiyang/GEB) — code and artifacts are announced as coming soon.
**Source version:** arXiv 2609.38155v1, 29 September 2026. No accepted venue verified.

![GEB / Grounded Entity Biographies: Figure 2 from the paper](../assets/2026-ren-geb.png)

*Figure 2 from the original paper ([PDF page 3](../raw/2026-ren-geb.pdf#page=3)).*

## Problem and contribution

Two objects can share a name, while one object may receive different descriptions across encounters. Retrieving relevant events therefore does not establish which physical instance participated. GEB adds visually grounded instance histories to episodic memory and tests whether identity structure helps beyond simply adding more descriptions (§§1–3).

## Approach

Object detection and tracking produce observations within 30-second clips. Each observation stores representative crops, timestamps, source footage and a vision-language description informed by surrounding captions and speech. Multimodal similarity proposes cross-clip identity matches, recent references test consistency, and simultaneous visibility as separate objects vetoes a merge (Appendix A).

A graph links entities, observations, episodes and source clips. Retrieval starts from relevant evidence and follows identity links into a chronological biography. Its text includes contextual descriptions and references to appearances not yet inspected, allowing a controller to request further evidence before answering (§3.4). The method uses pretrained models and manually calibrated association thresholds.

Memory construction is offline. Descriptions see captions and transcripts within ±40 seconds, and person naming consolidates daily profiles across days. Filtering graph nodes by query timestamp does not remove future context already embedded in those records.

## Evidence and limits

On 500 EgoLifeQA questions, full GEB reaches 72.0%. Matched controls score 68.6% without association, 69.2% with names as identities and 68.2% when descriptions are merely appended to captions. These support the representation beyond extra text (Table 4).

On MultiHop-EgoQA, removing association reduces complete evidence coverage from 52.1% to 48.4%, while the displayed mean answer score remains 3.11. Coverage is not direct evidence of correct identities, and improvements need not improve answers (Table 3, Appendix C).

The main week-scale evaluation uses one wearer. Building its approximately 52-hour memory requires 308,244 observation-description calls plus detection at ten frames per second. Reported 13.6-second retrieval time per question excludes the controller, answer model and ingestion (Appendix B). No independent identity precision/recall or complete system cost is reported. Code remains unreleased.

## Research connections

- **Builds on:** [[2024-fan-videoagent]] — follows appearance-based regrouping of fragmented tracks (Appendix A).
- **Compares with:** [[2026-yeo-worldmm]] — evaluates long-video answers and evidence coverage (Tables 1–3).
- **Cites:** [[2024-goletto-amego]] — discusses persistent object representations as related memory work (§2).

## Relevance to Aligned

Our interpretation: preserve the distinction between “a drill” and “this drill” across work episodes. Test identity errors, causal availability and ingestion cost before treating biographies as reliable worker memory.

## Human notes
