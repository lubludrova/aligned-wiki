---
year: 2019
venue: "PVLDB 13(4), 533–546"
affiliations: ["Stanford DAWN Project, Stanford University"]
research_groups: []
reviewed: false
tags: [video-retrieval, efficient-processing]
---

# BlazeIt: Optimizing Declarative Aggregation and Limit Queries for Neural Network-Based Video Analytics

BlazeIt executes declarative video queries with specialized models, sampling and selective verification instead of fully materializing expensive detector outputs.

**Authors:** Daniel Kang, Peter Bailis, Matei Zaharia.
**Paper:** [PDF](../raw/2019-kang-blazeit.pdf) · [Publisher PDF](https://www.vldb.org/pvldb/vol13/p533-kang.pdf)
**Website:** Not found in checked sources beyond the code repository.
**Code:** [Official repository](https://github.com/stanford-futuredata/blazeit)
**Source version:** Published PVLDB article dated 2019, presented at VLDB 2020. The filename follows the publication year printed on the PDF.

![BlazeIt video query processing compared with naive processing](../assets/2019-kang-blazeit.png)

*Figure 1. BlazeIt video query processing compared with naive processing. Source: [original paper, PDF p. 2](../raw/2019-kang-blazeit.pdf#page=2).*

## Problem and contribution

Filtering frames is insufficient for questions such as the average object count or finding ten representative matches. BlazeIt introduces FrameQL, a SQL-like interface over object positions, classes, tracks and user-defined predicates, and optimizations for aggregation and cardinality-limited queries (§§2–4).

## Approach

Stored video and a FrameQL query → query plan → cheap proxy predictions plus selected target-detector calls → aggregate or verified examples (Figure 1).

At ingestion, a sampled target-model annotated set supplies reusable labels. A query can train a small specialized network using these labels. For aggregation, its predictions become control variates: correlated cheap estimates reduce the number of expensive samples needed for a requested statistical error target. For LIMIT queries, proxy ranking prioritizes likely matches, which the target detector verifies until enough examples are found (§§3, 6–7).

The virtual relation is populated on demand rather than exhaustively. Entity resolution and optional image predicates are supplied components. The evaluated setting is batch analytics over recorded streams, not a demonstrated continuously operating safety system.

## Evidence and limits

The paper evaluates traffic and surveillance workloads, separating aggregation from limited-example search (§9). Accuracy guarantees concern the target detector's relation, not human-verified physical events. Section 6 states sampling assumptions and estimates the data range from the annotated sample. The direct-proxy shortcut additionally depends on no model drift.

Object classes are restricted by the supplied detector (§3.2). Counting object appearances across frames is not automatically counting distinct installations or incidents. A successful LIMIT query deliberately stops after enough examples and cannot establish exhaustive event coverage.

## Research connections

- **Cites:** [[2018-hsieh-focus]] — related indexed video-query acceleration (§10).
- **Builds on:** Kang et al., *NoScope* — specialized neural-network proxies, extended to aggregation and limited search (§3.1).

## Relevance to Aligned

Our interpretation: separate approximate statistics, example retrieval and exhaustive incident enumeration in the query interface and evaluator. Reuse cheap predictors only with an explicit error contract and verified underlying visual predicates.

## Human notes
