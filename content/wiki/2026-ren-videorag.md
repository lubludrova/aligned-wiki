---
year: 2026
venue: "KDD"
affiliations: ["The University of Hong Kong", "Baidu Inc."]
research_groups: []
reviewed: false
tags: [dataset, benchmark, method, video-memory, video-retrieval, video-qa]
---

# VideoRAG: Retrieval-Augmented Generation with Extreme Long-Context Videos

VideoRAG combines a cross-video textual knowledge graph with visual segment retrieval and question-specific evidence descriptions.

**Authors:** Xubin Ren, Lingrui Xu, Long Xia, Shuaiqiang Wang, Dawei Yin, Chao Huang.
**Paper:** [PDF](../raw/2026-ren-videorag.pdf) · [arXiv v1](https://arxiv.org/abs/2502.01549v1) · [KDD proceedings DOI](https://doi.org/10.1145/3770854.3783944)
**Website:** Not found in checked sources beyond the official repository.
**Code:** [Official repository](https://github.com/HKUDS/VideoRAG)
**Source version:** The archived/read source is the 18-page arXiv v1, 3 February 2025. KDD 2026 publication is independently confirmed by the conference's paper list. Results below belong to the preprint; the final proceedings text was not compared.
**Citations:** 7 ([OpenAlex](https://openalex.org/W4407176006), checked 2026-11-03).

![VideoRAG (Ren et al.): Figure 1 from the paper](../assets/2026-ren-videorag.png)

*Figure 1 from the original paper ([PDF page 3](../raw/2026-ren-videorag.pdf#page=3)).*

## Problem and contribution

Captions alone can lose visual detail, while isolated clip embeddings do not explicitly connect knowledge across videos. VideoRAG builds complementary textual and visual indices for collections that exceed one model context (§§1–3).

## Approach

During indexing, 30-second clips receive MiniCPM-V descriptions from five frames and Distil-Whisper transcripts. An LLM extracts entities and relationships into a merged graph; text chunks receive text embeddings. ImageBind separately encodes clips for visual retrieval (§3.1, Figure 1).

At query time, semantic entity matching identifies relevant text and linked clips. A scene-focused reformulation searches the visual index. Candidates are filtered for relevance, then re-examined with 15 frames per clip and the transcript to produce question-specific descriptions. A language model answers from these descriptions and retrieved text, rather than ingesting the entire archive (§§3.2–3.3).

This is indexing and querying complete recordings, not demonstrated causal streaming. The released algorithm combines graph and visual candidates with a union, whereas preprint Equation 6 prints an intersection; source and implementation should not be treated as identical.

## Evidence and limits

LongerVideos contains 164 videos, 22 collections, 602 questions and about 134.6 hours of lectures, documentaries and entertainment (Table 1). GPT-4o-mini judges pairwise answer preferences: VideoRAG's Overall Winner rate is 53.26% against NaiveRAG and 57.14% against LightRAG, not factual-answer accuracy or retrieval recall (Table 2). Queries are generated from transcripts, and this evaluation does not establish an unlimited processing capacity.

The repository contains algorithm and evaluation code alongside a separate desktop application. Selected code was inspected, without executing models or comparing the final conference implementation experimentally.

## Research connections

- **Compares with:** [[2024-fan-videoagent]] — evaluates a modified long-video baseline in §4.2 and Table 3.

## Relevance to Aligned

Our interpretation: graph and visual retrieval can complement one another across shifts. Semantic entity links do not establish that two observations depict the same physical panel; identity, geometry and source-linked state changes require separate validation.

## Human notes
