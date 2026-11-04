---
year: 2026
venue: "ICML"
affiliations: ["City University of Hong Kong", "University of Science and Technology of China", "National University of Singapore", "The Chinese University of Hong Kong, Shenzhen", "University of Electronic Science and Technology of China", "Beijing University of Posts and Telecommunications", "Zhejiang University"]
research_groups: []
reviewed: false
tags: [dataset, benchmark, method, video-memory, video-qa, spatial-understanding, egocentric-video, training-free]
---

# Keep It in Mind: User-Centric Continual Spatial Intelligence Reasoning in Egocentric Video Streams

DirectMe retrieves a pose-aware spatial scene graph to answer questions about previously observed objects relative to the user's current position.

**Authors:** Yun Wang, Junbin Xiao, Han Lyu, Yifan Wang, Jing Zuo, Zhanjie Zhang, Hong Huang, Dapeng Wu, Angela Yao.
**Paper:** [PDF](../raw/2026-wang-directme.pdf)
**Website:** [Proceedings page](https://proceedings.mlr.press/v306/wang26je.html)
**Code:** [GitHub repository](https://github.com/cocowy1/UCS-Bench)
**Source version:** arXiv:2606.15200v1, 13 June 2026. Published at ICML 2026, PMLR 306:131373–131417.
**Citations:** 0 ([OpenAlex](https://openalex.org/W7164913088), checked 2026-11-03).

![DirectMe: Figure 5 from the paper](../assets/2026-wang-directme.png)

*Figure 5 from the original paper ([PDF page 6](../raw/2026-wang-directme.pdf#page=6)).*

## Problem and contribution

Remembering an object's earlier image does not establish whether it is now behind a moving user. UCS-Bench tests this distinction with 8,114 timestamped questions across 532 videos totaling over 170 hours. Questions cover trajectories, positions, proximity/reachability, and categories/quantities. Human annotations identify earlier evidence, with model-assisted distractor generation and text-only bias filtering (§3, Appendix F).

## Approach

DirectMe requires no task-specific training. Pretrained depth/pose estimation, detection, mask tracking, and scene description process video at 1 fps. Observations become a world-aligned metric-semantic point map with timestamps and instance IDs. A graph retains object anchors, semantic places, spatial relations, observation counts, last-seen times, and representative keyframes. Objects can remain retrievable after leaving view (§4.2, Appendix D).

Queries identify entities and required spatial operations, retrieve a small subgraph with supporting evidence, and transform world coordinates into the user's current reference frame. An MLLM combines these relations with visual/textual context to select an answer (§4.3). Perception and graph construction are ingestion costs shared across queries. The paper does not measure end-to-end latency, memory growth, or a validated retention bound.

[?] Causality is underspecified: §4.1 describes incremental fixed-window construction using only observations available at the query, whereas Appendix D.3 explicitly builds the graph offline and pools object locations and places over trajectories. Timestamp-filtered retrieval alone does not establish that graph construction excludes future evidence. The reported protocol needs clarification before interpreting it as a fully causal deployment.

## Evidence and limits

DirectMe raises Qwen3-VL-8B accuracy from 44.0% to 50.5% and InternVL3-8B from 43.8% to 49.7% (Table 3). The backbone baselines use 64 sampled frames, while DirectMe ingests at 1 fps. Graph-only augmentation reaches 50.2%, versus 44.5% for captions alone (Table 5). Among 500 failures, tracking accounts for 40%, ego-pose relations 23%, retrieval 20%, and reasoning 17% (Table 4).

The 91.0% human reference uses 985 questions from 60 videos, with replay and unrestricted video access, rather than an identical streaming protocol (Appendix F.6). Results concern recorded-data QA, not an evaluated wearable assistant or physical robot. Geometric drift and identity errors can corrupt persistent spatial claims.

## Research connections

- **Builds on:** [[2025-yang-egolife]] — supplies one of UCS-Bench's six source datasets (§3.1, Table 1).
- **Builds on:** Depth Anything 3 — estimates metric depth and camera poses (§4.2).
- **Cites:** [[2025-plizzari-osnom]] — motivates maintaining spatial knowledge when objects are out of sight (§1).

## Relevance to Aligned

Our interpretation: pose-grounded memory could locate tools across viewpoint changes. Assessing work quality still requires action/state evidence and reliable causal updates.

## Human notes
