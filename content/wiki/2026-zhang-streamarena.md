---
year: 2026
venue: "arXiv preprint"
affiliations: ["The Hong Kong University of Science and Technology", "Xiaohongshu Inc.", "The University of Hong Kong", "The Chinese University of Hong Kong"]
research_groups: [jia-lab]
reviewed: false
tags: [video-memory, video-qa, efficient-processing]
---

# StreamArena: Toward Continuous, Interactive, and Long-Horizon Agentic Streaming Video Understanding

StreamArena evaluates persistent streaming-video assistants, while StreamMind separates immediate interaction from memory construction and retrieval.

**Authors:** Xichen Zhang, Guankai Li, Yinghao Zhu, Shijian Wang, Sitong Wu, Shaozuo Yu, Meng Chu, Yuan Lu, Jiaya Jia.
**Paper:** [PDF](../raw/2026-zhang-streamarena.pdf) · [arXiv v1](https://arxiv.org/abs/2608.05703v1)
**Website:** Not found in checked sources.
**Code:** [GitHub repository](https://github.com/JIA-Lab-research/StreamArena) — repository revisions extend beyond the summarized paper version.

![StreamArena: Figure 1 from the paper](../assets/2026-zhang-streamarena.png)

*Figure 1 from the original paper ([PDF page 4](../raw/2026-zhang-streamarena.pdf#page=4)).*

## Problem and contribution

Video assistants need to answer current questions, recall earlier events, use external tools, and monitor for future events without restarting observation for every request. StreamArena combines these requirements in 3,646 tasks over 243 videos lasting roughly one to two hours. Its seven domains include entertainment and everyday activities, not solely egocentric work (§2.1).

## Approach

StreamMind processes incoming frames and speech through two cooperating layers. A front worker handles the recent context and routes requests. A separate monitor watches for an event after the user registers a condition (§2.2, Figure 2).

In parallel, a memory writer turns the stream into hierarchical events, entity relations, and associated keyframes. A backend router plans historical retrieval and external search, using recall and search workers to supply evidence. Thus, answering can reuse previously accumulated state instead of rebuilding the video prefix. Keyframes retain a visual evidence channel alongside textual descriptions.

The system orchestrates pretrained models without introducing a trained memory model. Memory is updated causally during streaming, although background construction still consumes computation. The evaluation pauses the video clock during reactive answers, so it does not establish uninterrupted live ingestion while answering (Appendix C.5).

## Evidence and limits

Using the same Qwen3.5-397B-A17B backbone, StreamMind lowers pooled reactive-question latency from 81.4 to 27.5 seconds while accuracy falls from 54.2% to 48.6% (Table 4). This is a latency–accuracy trade-off. Background processing before the question is excluded.

Proactive timing measures the triggering observation, excluding subsequent response generation. Tool-task accuracy checks answer correctness and does not prove actual tool invocation (§2.1). Baseline interfaces differ, and some reconstruct the causal prefix at each query. Long-range historical recall still deteriorates substantially (§4, Table 3). These limits prevent reading the headline results as a complete operating-cost or reliability estimate.

## Research connections

- **Compares with:** StreamForest — evaluates a persistent-event-memory streaming model (Table 3, Appendix C).
- **Cites:** [[2026-rege-egagent]] — discusses structured memory for retrieving historical visual evidence (Appendix A).

## Relevance to Aligned

Our interpretation: the separation of immediate interaction, background indexing, and historical retrieval is useful for worker-camera systems. Construction-specific recall, missed alerts, and total processing cost require independent measurement.

## Human notes
