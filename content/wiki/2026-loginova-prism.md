---
year: 2026
venue: arXiv preprint
affiliations:
- University of Trento
- Gran Sasso Science Institute
- University of Edinburgh
research_groups: []
reviewed: false
tags:
- procedure-understanding
- execution-quality
- egocentric-video
---

# Through a PRISM, Clearly: Step-Sequence Reasoning for Mistake Recognition in Procedural Videos

Diagnoses completed-procedure mistakes through language-grounded step sequences, with controls separating representation and decoding effects.

**Authors:** Olga Loginova, Oleksandr Bezrukov, Frank Keller.

**Paper:** [PDF](../raw/2026-loginova-prism.pdf) · [arXiv](https://arxiv.org/abs/2610.31117)

**Website:** Not found in checked sources.

**Code:** Not found in checked sources. The paper promises implementation release upon acceptance, but no official release was located as of 31 October 2026.

**Source version:** arXiv 2610.31117v1, 22 October 2026. Fresh preprint, with no acceptance verified.

![PRISM: Figure 2 from the paper](../assets/2026-loginova-prism.png)

*Figure 2 from the original paper ([PDF page 4](../raw/2026-loginova-prism.pdf#page=4)).*

## Problem and contribution

A completed task can contain omitted, substituted or reordered steps despite looking superficially plausible. PRISM tests interpretable mistake recognition after completion. It assumes ground-truth temporal step boundaries, a known task-specific candidate inventory and valid reference sequences before reasoning begins.

## Approach

A vision-language model describes each segmented step. The system embeds either raw descriptions or semantic-role text that separates predicates and arguments. Training-only dimensionality reduction and a task-specific hidden Markov model map these representations to procedural states. The HMM is fitted using correct executions, with validation selecting configurations and thresholds.

Viterbi decoding produces a step sequence. Alignment to valid references, semantic checks and anomaly signals identify insertions, deletions, substitutions and transpositions. This is offline full-sequence analysis, not online detection from an unsegmented stream. The study separates nearest-candidate matching, learned local emissions and sequence decoding to test which components actually help.

## Evidence and limits

Experiments use EgoPER, CaptainCook4D and EgoOops. Learned local emissions improve over nearest-candidate matching in all 12 matched conditions. Viterbi improves seven, ties four and hurts one, with no gain on EgoPER (Table 3). Thus the local classifier has more consistent support than sequence decoding.

Under matched downstream settings, semantic-role text improves all six dataset–model combinations, but paired bootstrap intervals exclude zero for only three gains. When raw and structured representations are independently tuned, the best raw configurations outperform the best semantic-role configurations in all six settings (Tables 1–2, Appendix F.5). Conditional gains do not establish a universally better representation.

Cross-paper comparisons use different segmentation protocols and are not clean matched rankings. Gold boundaries and known reference procedures are privileged inputs. Error-taxonomy mapping compresses richer physical mistakes into edit categories. No operational latency, construction field trial or released implementation was verified.

## Research connections

- **Builds on:** [[2024-lee-egoper]] — supplies a procedural-error dataset (§4).
- **Compares with:** [[2026-guo-aem]] — reported baseline with explicitly differing segmentation conditions (Table 4).

## Relevance to Aligned

Our interpretation: use this as a transparent post-task quality-analysis baseline. First compare a trained local step classifier against the full decoder. Then measure what survives predicted segmentation, unseen tasks and imperfect camera coverage. Sequence conformity alone is not a measure of workmanship, safety or general skill.

## Human notes
