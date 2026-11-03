---
year: 2026
venue: "arXiv preprint"
affiliations:
  - "The University of Texas at Austin"
  - "University of Utah"
research_groups: []
reviewed: false
tags: [procedure-understanding, execution-quality, efficient-processing]
---

# MistExit: Learning to Exit for Early Mistake Detection in Procedural Videos

MistExit learns when to stop observing a pre-segmented procedural step and issue a correctness prediction.

**Authors:** Sagnik Majumder, Anish Nethi, Ziad Al-Halah, Kristen Grauman.

**Paper:** [Stored PDF](https://arxiv.org/pdf/2603.14252v1) · [Source](https://arxiv.org/pdf/2603.14252v1)
**Website:** https://vision.cs.utexas.edu/projects/mist_exit/
**Code:** Not found in checked primary sources.
**Source version:** arXiv:2603.14252v1, 15 March 2026, 24 pages.

## Problem and contribution

Waiting for an entire action wastes time when sufficient evidence is already visible. MistExit frames early mistake detection as a trade-off between decision quality and observation cost. Its input is a streaming clip with known keystep boundaries. The paper explicitly assumes pre-segmented steps, leaving segmentation outside the method (§3, p. 5 footnote).

## Approach

A CNN and transformer process recently observed frames, predict correctness, and anticipate future visual features. Anticipation provides an auxiliary learning signal rather than access to actual future frames at inference. After supervised detector training, a GRU actor–critic policy consumes recent imagery and detector outputs, then chooses to continue or exit with a correct/mistake prediction. PPO optimizes a combination of improving evidence, decision correctness, and observation penalties (§4, Figure 2, p. 6).

The approach turns the timing decision into a learned policy. It does not discover the start of each step, track an entire day’s activity, or generate a corrective instruction.

## Evidence and limits

Figure 3 (p. 12) reports AP 57.4 at observation ratio 3.0% on CaptainCook4D and AP 57.0 at 9.2% on Assembly101. Observation ratio is the fraction of a known clip observed, not delay measured from the moment a mistake becomes visually identifiable. These moderate AP values should not be described as reliable near-immediate alerts. In Assembly101, correction steps are collapsed into the mistake label (§5.1, p. 10), so the result does not validate distinguishing an ongoing fault from an attempted repair. Benchmark testing also does not measure false interruptions over long normal work periods or whether users act successfully on alerts.

## Research connections

- **Builds on:** [2022-sener-assembly101](/notes/2022-sener-assembly101/) — uses step-level annotations for early correctness evaluation, collapsing correction into mistake (§5.1).
- **Builds on:** PREGO — detector design for procedural mistake evidence, extended with anticipation and an exit policy (§§4–5).

## Relevance to Aligned

Our interpretation: a learned defer/decide policy could control expensive analysis or interruption. Train and evaluate it using causal error-onset labels, missed-error cost, false alarms, and explicit observability, while separately solving step segmentation.

## Human notes
