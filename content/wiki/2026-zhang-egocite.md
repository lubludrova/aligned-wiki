---
year: 2026
venue: "arXiv preprint"
affiliations: ["University of Michigan, Ann Arbor", "Samsung Research America"]
research_groups: []
reviewed: false
tags: [video-memory, video-retrieval, video-qa, efficient-processing, egocentric-video]
---

# EgoCITE: Context-Augmented Indexing and Time-Aware Retrieval for Long-Horizon Egocentric Memory

EgoCITE makes memory entries understandable outside their original context and retrieves evidence according to the question's temporal intent.

**Authors:** Le Zhang, Hao Chen, Vlad Roznyatovskiy, Jianzhong Zhang, Ke Sun.
**Paper:** [PDF](../raw/2026-zhang-egocite.pdf)
**Website:** [Author-linked project website](https://egocite.github.io/)
**Code:** [Official repository](https://github.com/lezhangleonard/EgoCITE)
**Source version:** arXiv 2608.12627v3, 18 August 2026. Preprint under review, with no accepted venue verified.

![EgoCITE: Figure 3 from the paper](../assets/2026-zhang-egocite.png)

*Figure 3 from the original paper ([PDF page 4](../raw/2026-zhang-egocite.pdf#page=4)).*

## Problem and contribution

Short captions often contain unresolved pronouns or omitted objects. Semantic retrieval can find the right action at the wrong time, especially when someone repeats it. EgoCITE addresses these two failure modes through context-resolved indexing and explicit time-aware evidence selection, without training a new model (§§3–4).

## Approach

Inputs are timestamped video captions, speech transcripts and prior person identities. EgoScheme uses preceding context to rewrite fragments into self-contained facts. EgoIndex stores four complementary textual views: actions, activities, utterances and conversations. Embedded entries retain timestamps and source-caption provenance in searchable vector indices (Fig. 3, Appendix B).

A drafting agent turns a question into semantic and temporal queries, combining similarity with soft temporal relevance. A sampling agent then curates retrieved evidence according to qualifiers such as “last,” “first” or “usually.” A response agent answers from the selected entries (§4.2).

Fine-grained entries use preceding five-minute context. Coarse activities and conversations use complete 30-minute windows and may merge across boundaries. Their start timestamps do not establish when the information became available, so this offline evaluation does not validate causal streaming.

## Evidence and limits

On EgoR1-Bench, matched component additions raise accuracy from 61.3% for caption retrieval to 69.7% with atomic indices, 71.3% with context resolution and 75.3% with temporal retrieval. On EgoLifeQA, the GPT configuration reaches 63.8% versus a reimplemented WorldMM's 49.6% (Tables 2 and 10).

Main results use human dense captions and transcripts. Automatic-caption variants still require manually annotated person-appearance files. All three benchmarks reuse EgoLife recordings, limiting evidence for unseen workplaces and open-set identities (Appendices B.1 and C.1).

Five-round querying averages 32.0 seconds and an estimated $0.110 per question on a sample, excluding perception and index construction (Table 13). Released preprocessing, memory and evaluation code improves inspectability, but end-to-end automation, total operating cost and physical execution assessment remain unproven.

## Research connections

- **Builds on:** [[2025-yang-egolife]] — uses recordings, dense captions, transcripts and questions (Appendix C.1).
- **Compares with:** [[2026-yeo-worldmm]] — evaluates memory retrieval and answer accuracy under reimplemented baselines (Tables 2–3).

## Relevance to Aligned

Our interpretation: test self-contained event descriptions and explicit temporal intent before adding more elaborate memory structures. Track both event time and availability time, and budget automatic identity resolution separately.

## Human notes
