---
year: 2026
venue: arXiv preprint
affiliations:
- Hong Kong University of Science and Technology
- King Abdullah University of Science and Technology
- East China Normal University
- Nanyang Technological University
research_groups: []
reviewed: false
tags:
- video-memory
- video-qa
- egocentric-video
---

# EgoProbe: Benchmarking Long-Range and Exact Memory in Streaming Egocentric Videos

Tests whether streaming video memories bind a recalled detail to the correct event when similar events recur.

**Authors:** Haokai Pang, Yuqian Fu, Yifei Wang, Yujiao Shen, Tianwen Qian, Mohamed Elhoseiny, Hongbo Fu.

**Paper:** [PDF](../raw/2026-pang-egoprobe.pdf) · [arXiv](https://arxiv.org/abs/2610.17128)

**Website:** Not found in checked sources.

**Code:** Not found in checked sources. The paper promises code and data, but a public implementation was not located as of 31 October 2026.

**Source version:** arXiv 2610.17128v1, 12 October 2026. Fresh preprint, with no peer-reviewed venue established in checked sources.

![EgoProbe: Figure 1 from the paper](../assets/2026-pang-egoprobe.png)

*Figure 1 from the original paper ([PDF page 2](../raw/2026-pang-egoprobe.pdf#page=2)).*

## Problem and contribution

Remembering an event happened differs from remembering which detail belonged to it. EgoProbe examines long-range retention and confusion between similar experiences. Its distinctive feature is wrong answer options drawn from other real events, making repeated-event misbinding observable.

## Approach

The benchmark derives 2,366 independent question–answer pairs from 671 videos in Ego4D/QaEgo4D and EgoLife, with 1,229 additional two-turn dialogues. A construction pipeline identifies related events, delays queries, disambiguates references and generates event-linked distractors before human verification. Base contains long-range recall questions without intervening related events. Echo adds related events and asks either one detailed question or an initial yes/no question followed by a four-option detail question.

Strict streaming models ingest without future questions and cannot reload discarded video. Prefix-reference models may reread earlier frames at query time. These protocols and their unequal frame budgets must be compared separately.

## Evidence and limits

StreamForest scores 50.66% on Base, 38.89% on Echo single-turn questions and 35.39% complete two-turn dialogues (Table 2). Completion requires both answers correct across all 1,229 dialogues, not just those with a correct first answer.

Every first-turn label is Yes (Appendix D). An always-Yes strategy therefore achieves perfect first-turn accuracy and, with random four-choice second answers, 25% expected completion. The displayed 12.5% random reference is weaker than this trivial baseline. Coarse-correct/fine-wrong cases consequently do not establish successful coarse memory.

Event-linked errors also rise when more related-event distractors exist, but their random floor rises too, and the subsets are not matched causal controls (Table 4). Only 24.4% of questions require at least 30-minute recall. The longest reported interval includes recording gaps. Annotators see proposed labels, agreement is not reported, and the promised release remains unavailable for inspection.

## Research connections

- **Builds on:** [[2022-grauman-ego4d]] — supplies video through Ego4D/QaEgo4D (§3.2).
- **Builds on:** [[2025-yang-egolife]] — supplies the longer recording histories (§3.2).

## Relevance to Aligned

Our interpretation: test whether evidence concerns this installation, inspection or shift, rather than another similar job. Borrow the single-turn event-binding diagnostic, adding matched distractor controls and genuinely absent-event queries. This preprint supports a useful test idea, not a validated skill score or production-ready evaluator.

## Human notes
