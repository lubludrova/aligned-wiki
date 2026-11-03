---
year: 2025
venue: "NeurIPS"
affiliations: ["Nanjing University", "Shanghai AI Laboratory", "Zhejiang University", "Noah’s Ark Lab, Huawei", "Yinwang Intelligent Tech."]
research_groups: ["nju-mcg"]
reviewed: false
tags: [dataset, benchmark, method, video-memory, efficient-processing, video-qa]
---

# StreamForest: Efficient Online Video Understanding with Persistent Event Memory

Combines a detailed recent window with event-tree compression to answer questions from bounded streaming visual memory.

**Authors:** Xiangyu Zeng, Kefan Qiu, Qingyu Zhang, Xinhao Li, Jing Wang, Jiaxin Li, Ziang Yan, Kun Tian, Meng Tian, Xinhai Zhao, Yi Wang, Limin Wang.
**Paper:** [PDF](../raw/2025-zeng-streamforest.pdf)
**Website:** [Project website](https://github.com/MCG-NJU/StreamForest)
**Code:** [GitHub repository](https://github.com/MCG-NJU/StreamForest)
**Source version:** arXiv:2509.24871v1, 29 September 2025. NeurIPS 2025 status verified by the official author repository.
**Citations:** 7 ([OpenAlex](https://openalex.org/W7197034076), checked 2026-11-03).

![StreamForest persistent event memory and spatiotemporal processing](../assets/2025-zeng-streamforest.png)

*Figure 2. StreamForest persistent event memory and spatiotemporal processing. Source: [original paper, PDF p. 4](../raw/2025-zeng-streamforest.pdf#page=4).*

## Problem and contribution

A streaming assistant must preserve recent visual detail while retaining useful history under a fixed token budget. StreamForest introduces a Fine-grained Spatiotemporal Window, a Persistent Event Memory Forest, streaming instruction data and a driving-oriented evaluation benchmark (§§3–4).

## Approach

Incoming frames → visual encoder and recent window → event nodes and hierarchical merges → bounded visual memory plus question → answer (Fig. 2).

Current frames retain detailed tokens. Older frames are spatially compressed, then grouped into meta-events at local minima of inter-frame similarity. When memory exceeds its budget, adjacent event nodes are merged using penalties for visual similarity, temporal distance and previous merge count. Token merging reduces the selected pair's representation. At query time, the model receives the forest roots and recent window, rather than re-encoding the entire past (§3.1).

Training combines image/video pretraining and streaming instruction tuning. The driving-specific variant receives additional driving data. These variants should not be conflated (§5).

## Evidence and limits

Tables 1–2 evaluate online and offline QA benchmarks. Online tests use only video available before the question timestamp and process input at 1 fps. Table 6 separately reports visual encoding, memory updates and LLM inference. Appendix H's multi-round speed test constrains each response to one token, so its throughput is not ordinary conversational latency.

Appendix I acknowledges that similarity minima mostly identify coarse visual changes and can miss semantic event boundaries. Bounded tokens do not guarantee retention of brief defects, original source pixels or all evidence for an old event. Results do not establish multi-camera identity association or a persistent searchable archive across shifts.

## Research connections

- **Builds on:** ToMe supplies the token-merging mechanism (§3.1.2).
- **Compares with:** VideoChat-Online's Pyramid Memory Bank and similarity-based merging under common memory comparisons (§5.3, Tables 5–6).

## Relevance to Aligned

Our interpretation: a baseline for recent streaming memory, separate from durable raw-footage storage and event indexes. Test rare-event retention and semantic alert boundaries while ingestion continues during answers. The official MCG-NJU repository provides paper-specific evidence for the registered NJU MCG attribution.

## Human notes
