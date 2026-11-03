---
year: 2023
venue: "PVLDB 16(11), 2714–2727"
affiliations: ["University of Washington", "Microsoft Gray Systems Lab"]
research_groups: []
reviewed: false
tags: [method, video-retrieval, spatial-understanding, efficient-processing]
---

# EQUI-VOCAL: Synthesizing Queries for Compositional Video Events from Limited User Interactions

EQUI-VOCAL learns executable spatiotemporal video queries from positive and negative examples plus active user feedback.

**Authors:** Enhao Zhang, Maureen Daum, Dong He, Brandon Haynes, Ranjay Krishna, Magdalena Balazinska.
**Paper:** [PDF](../raw/2023-zhang-equi-vocal.pdf) · [Published PDF](https://www.vldb.org/pvldb/vol16/p2714-zhang.pdf)
**Website:** Not found in checked sources beyond the repository.
**Code:** [Official repository](https://github.com/uwdb/EQUI-VOCAL)
**Source version:** Published fourteen-page PVLDB 2023 article. The extended arXiv report is a separate version.
**Citations:** 14 ([OpenAlex](https://openalex.org/W4386123413), checked 2026-11-03).

![EQUI-VOCAL query synthesis from user feedback](../assets/2023-zhang-equi-vocal.png)

*Figure 1. EQUI-VOCAL query synthesis from user feedback. Source: [original paper, PDF p. 1](../raw/2023-zhang-equi-vocal.pdf#page=1).*

## Problem and contribution

Users may recognize a desired event but cannot write its database query. The system synthesizes a sequence of spatial conditions and duration constraints, rather than training an opaque classifier for every event (§§1–2).

## Approach

Video-derived objects, attributes and relations plus example labels → scene-graph query search → active labeling → executable query → matching video segments (Figure 1).

Predefined detectors, trackers and user-defined predicates populate relational tables. A restricted language expresses temporally ordered region graphs. Beam search expands candidate queries, scores them against labels and penalizes excessive complexity. Active learning selects additional clips that distinguish candidates. The executor translates the resulting query into SQL and caches intermediate results (§§3–4).

This is query synthesis and batch execution over a prepared video database. The system returns segment identifiers containing a match, and can stop at the earliest matching sequence within a segment. It does not enumerate every distinct event instance.

## Evidence and limits

Evaluation includes synthetic scene graphs, real traffic trajectories, comparisons with Quivr/PATSQL and a user study (§5). Query quality, synthesis time and label budget are assessed separately. Comparison settings restrict the predicate vocabulary and sometimes downsample data, so timings are not an unconstrained end-to-end video-processing benchmark.

The language does not support negation, disjunction or ternary relations (§2.3). It consequently cannot directly express a missing-step claim as unrestricted absence. Predefined predicate errors and object-tracking mistakes propagate into results. Training labels and additional user interactions are required, and the method searches a bounded query space.

## Research connections

- **Compares with:** Quivr and PATSQL — trajectory-query and relational query-by-example baselines (§5).
- **Cites:** [[2019-kang-blazeit]] — related video analytics systems (Related Work).

## Relevance to Aligned

Our interpretation: a useful way to turn labeled examples into inspectable recurring searches. Evaluate predicate validity and event deduplication independently. Missing footage must not be encoded as a negative observation, and unsupported operators should remain explicit.

## Human notes
