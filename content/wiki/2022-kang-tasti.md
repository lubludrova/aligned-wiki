---
year: 2022
venue: "SIGMOD"
affiliations: ["Stanford University"]
research_groups: []
reviewed: false
tags: [video-representation, video-retrieval, efficient-processing]
---

# TASTI: Semantic Indexes for Machine Learning-based Queries over Unstructured Data

TASTI reuses an embedding index and a small set of expensive labels to generate proxy scores for multiple downstream queries.

**Authors:** Daniel Kang, John Guibas, Peter Bailis, Tatsunori Hashimoto, Matei Zaharia.
**Paper:** [PDF](../raw/2022-kang-tasti.pdf) · [Author PDF](https://ddkang.github.io/papers/2022/tasti-paper.pdf)
**Website:** Not found in checked sources beyond the official repository.
**Code:** [Official repository](https://github.com/stanford-futuredata/tasti)
**Source version:** Fourteen-page author manuscript. Its running header contains an unfinished Conference'17 template. SIGMOD 2022 identity is independently confirmed by the official repository and the author institution's publication record, not that header.

![TASTI training, index construction, and query processing](../assets/2022-kang-tasti.png)

*Figure 1. TASTI training, index construction, and query processing. Source: [original paper, PDF p. 4](../raw/2022-kang-tasti.pdf#page=4).*

## Problem and contribution

Training a separate proxy model for every query repeats labeling and training work. TASTI instead exploits similarity between the structured outputs of an expensive target labeler, allowing different queries to share one index (§§1–2).

## Approach

Records and a target-labeler schema → optional triplet-trained embedding model → representative records and labels → query-specific proxy scores → existing query-processing algorithms (Figure 1).

A user defines when two target-labeler outputs are close, such as similar object types and positions. Furthest-point-first sampling selects diverse training examples and cluster representatives. The index stores embeddings, representative labels and distances. For a new query, exact scores on labeled representatives are propagated to other records through embedding distances (§§3–4).

Aggregation, selection and limited-example search then use those proxy scores without training a new predictor per query. Embedding training is optional. This is an index over stored data rather than a video-language assistant or persistent object-state graph.

## Evidence and limits

Section 6 evaluates three video datasets plus text and speech, with target-labeler calls as the primary cost metric and selected end-to-end measurements. The same visual index can support more than one class or query type. These results do not establish arbitrary semantic generalization beyond the induced schema.

The theoretical analysis assumes properties such as suitable query losses and clustering density. It analyzes one nearest representative while the implementation normally uses five, and the paper explicitly lists this mismatch (§5.3). Neither the theory nor the proxy guarantees corrects errors in the target labeler itself.

## Research connections

- **Builds on:** [[2019-kang-blazeit]] — uses its aggregation and limit-query algorithms with index-derived proxy scores (§§2.3, 6.1).
- **Compares with:** per-query proxies from BlazeIt and related systems (§6).

## Relevance to Aligned

Our interpretation: a reusable-index baseline for recurring structured questions. Compare total annotation and inference cost across a workload, while preserving source clips for questions outside the index's schema.

## Human notes
