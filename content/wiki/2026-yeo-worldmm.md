---
year: 2026
venue: "CVPR"
affiliations: ["KAIST", "Nanyang Technological University, Singapore", "DeepAuto.ai"]
research_groups: [kaist-mlai, ntu-adaptive-machine-intelligence]
reviewed: false
tags: [method, video-memory, video-retrieval, video-qa, egocentric-video, training-free]
---

# WorldMM: Dynamic Multimodal Memory Agent for Long Video Reasoning

WorldMM answers long-video questions by iteratively retrieving complementary episodic, semantic, and visual memories.

**Authors:** Woongyeong Yeo, Kangsan Kim, Jaehong Yoon, Sung Ju Hwang.
**Paper:** [PDF](../raw/2026-yeo-worldmm.pdf) · [arXiv v2](https://arxiv.org/abs/2512.02425v2), first submitted December 2025.
**Website:** [Project website](https://worldmm.github.io/)
**Code:** [GitHub repository](https://github.com/wgcyeo/WorldMM)
**Citations:** 0 ([OpenAlex](https://openalex.org/W4417005444), checked 2026-11-03).

![WorldMM: Figure 2 from the paper](../assets/2026-yeo-worldmm.png)

*Figure 2 from the original paper ([PDF page 3](../raw/2026-yeo-worldmm.pdf#page=3)).*

## Problem and contribution

Questions about a week of experience require both precise moments and recurring relationships. Flat caption retrieval loses connections, while summaries can discard visual details. WorldMM separates these needs into three memory stores and lets a retrieval agent choose which evidence to request (§§1–3).

## Approach

Video frames and available transcripts first become timestamped captions. Episodic memory converts captions at several temporal scales into graphs, preserving local events and broader context. Semantic memory incrementally consolidates relationships and habits. Visual memory stores clip embeddings and timestamped frames, retaining a route back to images rather than relying entirely on captions (§3.1, Figure 2).

At question time, an LLM chooses a memory type and search query. Episodic retrieval combines graph propagation with reranking. Semantic retrieval searches consolidated relations. Visual retrieval uses either embedding similarity or a time interval. The agent accumulates evidence across several rounds, then passes it and the retrieval history to a response model (§§3.2–3.3).

The framework uses pretrained models without task-specific training. Memory construction precedes answering. Incremental semantic updates do not by themselves establish an end-to-end live wearable implementation.

## Evidence and limits

Experiments cover EgoLifeQA, Ego-R1, HippoVlog, LVBench, and Video-MME. Ablations support complementary memory types and adaptive timescales: replacing episodic graphs with embedding retrieval lowers EgoLifeQA accuracy from 56.4% to 52.0% with the 8B solver (Table 4).

The latency comparison uses 100 sampled EgoLifeQA questions over prepared memories (§4.6, Figure 6). It should not be interpreted as full video-ingestion cost. Caption errors, graph construction overhead, and bounded retrieval remain limitations, and the reported tasks do not establish reliable physical-quality judgments (Appendix G).

## Research connections

- **Compares with:** [[2025-yang-egolife|EgoLife / EgoRAG]] — contrasts hierarchical caption retrieval with multimodal memory (§4, Table 1).
- **Compares with:** [[2026-long-m3-agent|M3-Agent]] — evaluates another entity-centered long-term memory system (§4.1, Table 1, Appendix B.1).

## Relevance to Aligned

Our interpretation: a useful architectural reference for combining task-event history, persistent relationships, and visual verification. We should compare its extra indexing work against simpler retrieval before adopting multiple graph stores for construction-worker video.

## Human notes
