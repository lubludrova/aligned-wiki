---
year: 2026
venue: "IEEE TPAMI"
affiliations: ["University of Catania"]
research_groups: [catania-coai]
reviewed: false
tags: [procedure-understanding, execution-quality, video-representation, egocentric-video]
---

# Task Graph Maximum Likelihood Estimation for Procedural Activity Understanding in Egocentric Videos

TGML learns explicit task graphs from observed action sequences and reuses their prerequisite structure for procedural reasoning and online mistake detection.

**Authors:** Luigi Seminara, Giovanni Maria Farinella, Antonino Furnari.
**Paper:** [PDF](../raw/2026-seminara-tgml.pdf)
**Website:** [DTGL predecessor project linked by TGML](https://fpv-iplab.github.io/Differentiable-Task-Graph-Learning/)
**Code:** [Shared DTGL repository](https://github.com/fpv-iplab/Differentiable-Task-Graph-Learning). Release of the journal-specific additions was not verified.
**Source version:** arXiv:2502.17753v2, 26 February 2025, first released 25 February 2025. This note covers that preprint. The later journal article appeared in IEEE TPAMI 48(9), 10518–10534, September 2026 ([publisher record](https://ieeexplore.ieee.org/abstract/document/11505801/)).

![TGML: Figure 1 from the paper](../assets/2026-seminara-tgml.png)

*Figure 1 from the original paper ([PDF page 2](../raw/2026-seminara-tgml.pdf#page=2)).*

## Problem and contribution

Procedural assistants need to distinguish legitimate alternative orderings from missing prerequisites. TGML replaces hand-designed graph extraction with differentiable learning of dependency weights. This journal extension adds EgoProceL graph annotations and broader procedural reasoning evaluation to the authors' 2024 DTGL work (§§I, IV).

## Approach

Nodes represent named steps plus START/END. An edge points from a step to its prerequisite. Training uses annotated action sequences, without ground-truth edges. A weighted likelihood rewards connections from the current step to observed steps while contrasting unobserved alternatives. Direct Optimization (DO) learns the adjacency scores themselves. Task Graph Transformer (TGT) instead processes frozen EgoVLPv2 text or video embeddings, forms every node pair, and predicts edge scores. A distinctiveness loss discourages collapsed node embeddings (§III, Figure 3).

Training happens offline, generally per procedure. Repeated actions are removed or expanded into alternative repetition-free sequences. Masking forbids selected edges but does not guarantee acyclicity. Thresholding, transitive reduction, and removal of the weakest cycle edges produce the final DAG (§III-C–E).

Online mistake detection retains the set of previously observed step identities and flags the current step when any prerequisite is absent. MiniRoad supplies causal action predictions. The persistent graph and observed-step set discard visual detail, repetition counts, and exact timing. Ego-Exo4D reasoning instead uses weighted graphs to score prerequisites, optionality, omissions, and future steps (§IV-D–E).

## Evidence and limits

DO reaches graph-edge F1 of 87.8, 91.0, and 72.3 on CaptainCook4D, EgoPER, and EgoProceL, respectively. These exceed the strongest reported competitors by 14.5, 10.2, and 13.6 points (Tables I–III).

The headline online gains of 19.8/6.4 points use ground-truth actions. With predicted actions, average F1 gains shrink to 7.3/1.3 points on Assembly101-O/EPIC-Tent-O. DO's Assembly101-O average reaches 53.5, but its mistake-class F1 is only 28.1 (Table VI).

Generating all three graph collections takes about one hour for DO versus 48 hours for TGT on a V100S with different concurrency. These are offline training costs. [?] Claimed real-time downstream execution lacks an end-to-end timing measurement including recognition (Appendix A-G).

Frequent observed orders can become false prerequisites, as Figure 13 demonstrates. Acyclic, identity-based history also limits repeated or state-dependent procedures and fine execution-quality judgments. No assistant deployment is evaluated.

## Research connections

- **Builds on:** Seminara et al.'s *Differentiable Task Graph Learning* (NeurIPS 2024), explicitly extended here (§I, reference 7).
- **Builds on:** [[2024-lee-egoper]], [[2024-grauman-ego-exo4d]], and [[2022-sener-assembly101]] — graph-learning and downstream evaluation data (§IV).
- **Compares with:** PREGO — online mistake-detection baseline, distinguished from graph-based competitors (Table VI).

## Relevance to Aligned

Our interpretation: explicit prerequisites support inspectable feedback, but uncertain recognition and task-specific exceptions must survive graph abstraction to avoid unjustified warnings.

## Human notes
