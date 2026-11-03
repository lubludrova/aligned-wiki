---
year: 2026
venue: "ECCV"
affiliations: ["Institute of Artificial Intelligence, Beihang University", "Meituan", "Hangzhou International Innovation Institute, Beihang University"]
research_groups: []
reviewed: false
tags: [dataset, benchmark, state-changes, video-memory, video-representation]
---

# SVCBench: A Streaming Video Counting Benchmark for Spatial-Temporal State Maintenance

SVCBench evaluates how object and event counts evolve across a video, exposing state drift hidden by final-answer accuracy.

**Authors:** Pengyiang Liu, Zhongyue Shi, Hongye Hao, Qi Fu, Xueting Bi, Siwei Zhang, Xiaoyang Hu, Zitian Wang, Linjiang Huang, Si Liu.
**Paper:** [PDF](../raw/2026-liu-svcbench.pdf)
**Website:** [Project website](https://buaa-colalab.github.io/SVCBench/)
**Code:** [Repository](https://github.com/buaa-colalab/SVCBench)

**Source version:** arXiv 2603.12703v3, 29 June 2026, ECCV 2026. Supersedes the earlier VCBench title.
**Citations:** 0 ([OpenAlex](https://openalex.org/W7138824284), checked 2026-11-03).

![SVCBench: Figure 4 from the paper](../assets/2026-liu-svcbench.png)

*Figure 4 from the original paper ([PDF page 7](../raw/2026-liu-svcbench.pdf#page=7)).*

## Problem and contribution

Daily operational summaries need consistent counts of people, events and completed work cycles. Correctly describing individual frames is insufficient if identities are duplicated or count updates are missed.

## Approach

The benchmark contains 406 videos, 1,000 question-answer pairs, 10,071 annotated events/state changes and 4,576 query points. Eight categories distinguish current counts, changes, unique identities, newcomers, atomic actions, transitions, cycles and episodes. Models receive only the video prefix available at each query. Numeric accuracy, monotonicity consistency and update detection evaluate count trajectories. Offline baselines re-encode sampled prefixes, while native streaming models maintain their own memory (§§3–4).

## Evidence and limits

Table 2 reports a best overall Gaussian Precision Accuracy of 37.0, compared with 96.1 for humans. Periodic-event counting remains especially weak. Fifty natural sports videos complement an initial set with loop-concatenated repetitions, reducing dependence on that synthetic construction. Annotation uses five trained annotators and senior adjudication. Query points are selected on stable frames, so the protocol measures requested state estimates, not autonomous event triggering. Update Detection Accuracy rewards changes at ground-truth change points without fully penalizing spurious updates elsewhere or checking their magnitude. Oracle overlays substantially improve counting, but do not isolate all reasoning failures. Reported GPU runtime spans offline queries or whole streaming videos, not camera-to-alert latency (Tables 2–3, Appendices).

## Research connections

- **Compares with:** StreamingVLM, Dispider, LiveStar and Flash-VStream — native streaming baselines in Tables 2–3.
- **Cites:** OVOBench — identifies its similar prefix-based evaluation while adding repeated process-level count queries (§2, §4.1).

## Relevance to Aligned

Our interpretation: directly relevant to progress counts, worker presence and repeated task cycles. Combine its state-trajectory checks with identity tracking, evidence timestamps and complete-shift false-update rates. Counting alone cannot determine why someone is waiting or whether work is satisfactory.

## Human notes
