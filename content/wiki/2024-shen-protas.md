---
year: 2024
venue: "CVPR"
affiliations: ["Northeastern University"]
research_groups: []
reviewed: false
tags: [dataset, method, procedure-understanding, video-representation, egocentric-video]
---

# Progress-Aware Online Action Segmentation for Egocentric Procedural Task Videos

ProTAS uses estimated within-action progress and learned task dependencies to stabilize causal action segmentation.

**Authors:** Yuhan Shen, Ehsan Elhamifar.
**Paper:** [PDF](../raw/2024-shen-protas.pdf)
**Website:** Not found in checked sources.
**Code:** [GitHub repository](https://github.com/Yuhan-Shen/ProTAS)

**Source version:** CVPR 2024 accepted proceedings PDF, pp.18186–18197.
**Citations:** 27 ([OpenAlex](https://openalex.org/W4402702885), checked 2026-11-03).

![ProTAS progress-aware online action segmentation](../assets/2024-shen-protas.png)

*Figure 2. ProTAS progress-aware online action segmentation. Source: [original paper, PDF p. 3](../raw/2024-shen-protas.pdf#page=3).*

## Problem and contribution

An offline action segmenter can fail badly when future frames disappear at inference. ProTAS trains causally and uses procedural progress as an additional source of temporal consistency, rather than relying only on the current action score (§§3–4).

## Approach

I3D features from 32 historical frames feed a causalized MS-TCN or ASFormer. A parallel GRU regresses progress for each action. An MLP combines this progress with raw action probabilities. A task graph is estimated from training transcripts or learned from that initialization. Progress-derived completion states penalize actions whose prerequisites are incomplete or whose successors have already begun (§§4.1–4.5).

Training requires framewise step labels. Importantly, the target progress is the fraction of an annotated segment's elapsed duration, not a measured fraction of physical work completed. At inference, only current/past frames are used. The output is action probabilities and progress estimates, not error explanations or a worker-productivity judgment (Eq.4, §4.5).

## Evidence and limits

On the normal-video EgoPER subset with MS-TCN, adding progress and task graphs raises F1@0.5 from 39.4 for the causal backbone to 46.3, while frame accuracy falls from 71.8 to 70.2. GTEA and EgoProceL also show segment-quality gains (Table 1). The distinction matters because smoother segmentation need not yield better boundary timing.

The EgoPER experiments explicitly exclude its 173 erroneous videos and use 213 normal ones. Assembly101 gains are smaller, with grayscale views and small manipulated objects identified as difficulties. The paper does not establish full camera-to-output latency or construction progress accuracy (§5.1). Public training and evaluation code is present in the official repository.

## Research connections

- **Builds on:** [[2024-lee-egoper]] — uses its normal videos and task graphs to study causal segmentation, without evaluating error detection (§5.1).
- **Builds on:** [[2022-sener-assembly101]] — tests transfer to toy assembly and discusses small-object limitations (§5.1).
- **Builds on:** MS-TCN and ASFormer — converts their temporal operators to causal versions and adds progress/task-graph constraints (§4.1).

## Relevance to Aligned

Our interpretation: A direct progress-monitoring baseline for known work procedures. Its temporal progress target must be replaced or calibrated against physical completion before reporting installed quantities or percentage completion. Rework and valid interruptions also require evaluation beyond normal procedures.

## Human notes

