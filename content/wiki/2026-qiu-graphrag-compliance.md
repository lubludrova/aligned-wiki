---
year: 2026
venue: "Advanced Engineering Informatics 74, 104642"
affiliations: ["School of Civil Engineering, Chongqing University", "State Key Laboratory of Safety and Resilience of Civil Engineering in Mountain Area", "Institute of Smart City and Intelligent Transportation, Southwest Jiaotong University", "College of Civil Engineering, Hunan University", "Hong Kong Center for Construction Robotics, The Hong Kong University of Science and Technology", "Xinjiang University of Technology"]
research_groups: []
reviewed: false
tags: [method, video-qa, procedure-understanding, execution-quality, egocentric-video, construction, training-free]
---

# A GraphRAG-driven multi-agent framework for worker-centric construction process compliance supervision via egocentric video

Aligns video-derived activities with regulatory rules in two knowledge graphs, then iteratively retrieves evidence to answer construction-compliance questions.

**Authors:** Zijin Qiu, Jiepeng Liu, Yi Xia, Wenchen Shan, Jingjing Guo, Pengkun Liu, Hongtuo Qi.
**Paper:** [PDF](../raw/2026-qiu-graphrag-compliance.pdf) · [Publisher](https://www.sciencedirect.com/science/article/abs/pii/S1474034626003344)
**Website:** Not found in checked sources.
**Code:** Not found in checked sources.
**Source version:** Published 22-page article, available online 11 April 2026, DOI 10.1016/j.aei.2026.104642. The user supplied the original publisher PDF. Referenced supplementary prompts were not available in this file.
**Citations:** 0 ([OpenAlex](https://openalex.org/W7153469945), checked 2026-11-03).

![GraphRAG construction compliance: Figure 8 from the paper](../assets/2026-qiu-graphrag-compliance.png)

*Figure 8 from the original paper ([PDF page 8](../raw/2026-qiu-graphrag-compliance.pdf#page=8)).*

## Problem and contribution

Visual activity descriptions and regulatory clauses use different concepts. The paper proposes aligned ontologies and iterative agent retrieval to check whether required activities occurred, whether their order was valid, and whether durations met thresholds. Its examples use Chinese masonry specifications, not US construction requirements (§3.1, Table 2).

## Approach

Recorded ego video and regulatory text → narratives and structured entities → two Neo4j knowledge graphs → routed retrieval and reflection → compliance answer (Figs. 2, 8).

Qwen2.5-VL generates activity narratives. Schema-guided language-model extraction populates a site graph with actors, tools, materials, activity times and ordering, and a regulation graph with requirements, conditions and dependencies. The interface allows users to correct descriptions before graph analysis (§§3.1.3, 4.2).

A planning agent routes questions to site, regulation, or combined retrieval. Separate query agents retrieve eight semantic anchors and their one-hop neighbors. A reasoning/reflection agent checks sufficiency and requests additional evidence, up to four rounds. Shared retrieval history supports the answer (§§3.2, 4.2). This is query-driven analysis of uploaded recordings. Continuous monitoring is discussed, but causal full-shift ingestion and multi-worker memory are not evaluated.

## Evidence and limits

Twelve safety professionals assess outputs over 100 scenarios derived from selected Ego4D masonry clips: 30 site-only, 30 rules-only and 40 combined cases (§§4.1, 4.4). Final LLM semantic accuracy is 0.94 versus non-agentic GraphRAG's 0.85, with faithfulness 0.93 versus 0.83. Removing reflection lowers context recall from 0.90 to 0.78 (Figs. 20, 22). These measure answer/context quality, not defect-detection recall or false alarms over a shift.

The judge implementation, uncertainty estimates and effect of manual description corrections are insufficiently specified for reproduction. Table 3 contains an end time preceding its start time. The digest limit changes from tokens to characters between §§3.2.2 and 4.2. Referenced supplementary prompts are unavailable here. Claimed 3-5-minute checks lack a complete workload/cost protocol (§5.2). Occlusion and upstream description errors remain explicit failure modes (§5.4, Fig. 24).

## Research connections

- **Builds on:** Bai et al., [Qwen2.5-VL Technical Report](https://arxiv.org/abs/2502.13923) (2025) - supplies visual narrative generation (§3.1.3, reference 64).
- **Builds on:** [[2022-grauman-ego4d]] - supplies selected masonry recordings for evaluation (§4.1, reference 65).

## Relevance to Aligned

Our interpretation: a direct reference for separating observed evidence from applicable requirements and exposing missing evidence during retrieval. Validate timestamps, abstention, US-specific requirements and unedited perception before using its answers to create or close issues. Multi-day continuity, notification reliability and total processing cost remain separate tests.

## Human notes
