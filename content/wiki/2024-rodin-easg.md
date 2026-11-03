---
year: 2024
venue: "CVPR"
affiliations: ["University of Catania", "Intel Labs"]
research_groups: []
reviewed: false
tags: ["video-representation", "state-changes", "egocentric-video"]
---

# Action Scene Graphs for Long-Form Understanding of Egocentric Videos

Egocentric Action Scene Graphs represent actions, participating objects, relations and persistent object identity as a temporally evolving graph.

**Authors:** Ivan Rodin, Antonino Furnari, Kyle Min, Subarna Tripathi, Giovanni Maria Farinella.
**Paper:** [PDF](../raw/2024-rodin-easg.pdf)
**Website:** Not found in checked sources.
**Code:** [GitHub repository](https://github.com/fpv-iplab/EASG)

**Source version:** arXiv:2312.03391v1, 6 December 2023, including supplementary material. CVPR 2024 publication confirmed by official repository.

![Ego4D-EASG scene-graph annotation pipeline](../assets/2024-rodin-easg.png)

*Figure 3. Ego4D-EASG scene-graph annotation pipeline. Source: [original paper, PDF p. 5](../raw/2024-rodin-easg.pdf#page=5).*

## Problem and contribution

Verb–noun labels omit indirect objects and relationships needed to explain a longer activity. EASG supplies an explicit representation, an Ego4D annotation extension and initial generation and downstream-use baselines (§§3–6).

## Approach

Each action graph contains the camera wearer, an action verb and object nodes. Edges specify direct objects and relations such as with, from or into. Objects have bounding boxes in precondition, point-of-no-return and postcondition frames. Object indices are reconciled across the sequence to represent the same physical instance over time (§§3–4, Figure 2).

Human annotators extend and validate Ego4D labels, followed by a global temporal identity-reconciliation stage. A supervised baseline combines clip features and object-region features to predict edges, object classes and verbs. The experiments distinguish edge classification, graph classification with an oracle verb and the harder EASG classification setting (§5). POST frames and global reconciliation make this a representation/annotation study rather than a causal live tracking system.

## Evidence and limits

The checked paper contains 221 sequences and 11.4 hours, with 407 object, 219 verb and 16 relation classes. In the constrained EASG classification setting, baseline recall@10 is only 14.3, compared with 60.4 for edge classification with oracle semantic inputs (Tables 2–3). These settings must not be conflated.

Graph sequences improve GPT-based anticipation and summarization relative to verb–noun sequences. Summarization uses 147 clips and reaches CIDEr 13.79 versus 9.42, while original narrations reach 19.99. These experiments test annotated representations, not a measured end-to-end generated-graph reporting pipeline (§6, Table 5, Supplement D–F). The official repository provides dataset, annotation workflow and baseline components.

## Research connections

- **Builds on:** [[2022-grauman-ego4d]] — extends state-change keyframes, narrations and object/hand annotations with action-centered dynamic graphs (§4).
- **Cites:** Ego-Topo, Nagarajan et al. (2020) — contrasts location-topology graphs with the proposed action/object interaction representation (§2.2).

## Relevance to Aligned

Our interpretation: A useful schema for evidence-backed event records: actor, action, objects, relations, time and persistent identities. A construction implementation would need multiple explicit actors, causal identity association, spatial grounding from fixed cameras and measured accuracy for generated rather than annotated graphs.

## Human notes

