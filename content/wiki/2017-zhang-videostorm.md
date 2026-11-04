---
year: 2017
venue: "NSDI"
affiliations: ["Microsoft", "Princeton University"]
research_groups: []
reviewed: false
tags: [method, efficient-processing, real-world-evaluation, training-free]
---

# Live Video Analytics at Scale with Approximation and Delay-Tolerance

VideoStorm jointly schedules live analytics by output quality, resource demand and tolerated processing lag.

**Authors:** Haoyu Zhang, Ganesh Ananthanarayanan, Peter Bodik, Matthai Philipose, Paramvir Bahl, Michael J. Freedman.
**Paper:** [PDF](../raw/2017-zhang-videostorm.pdf)
**Website:** [Project website](https://www.usenix.org/conference/nsdi17/technical-sessions/presentation/zhang)
**Code:** Not found in checked sources.

**Source version:** USENIX NSDI 2017 proceedings, pp.377–392.
**Citations:** 329 ([OpenAlex](https://openalex.org/W2599379624), checked 2026-11-03).

![VideoStorm distributed video analytics architecture](../assets/2017-zhang-videostorm.png)

*Figure 1. VideoStorm distributed video analytics architecture. Source: [original paper, PDF p. 3](../raw/2017-zhang-videostorm.pdf#page=3).*

## Problem and contribution

Different video tasks need different accuracy and delay. Equal resource shares can waste capacity while urgent tasks fall behind. VideoStorm explicitly represents these trade-offs across many simultaneous queries.

## Approach

Each query is a graph of vision transforms with knobs such as resolution, frame sampling and detector configuration. An offline profiler explores configurations and keeps a resource-quality Pareto frontier. Quality is measured against labeled footage or an expensive reference configuration. The online scheduler predicts accumulated lag and chooses allocations/configurations that maximize aggregate or worst-query utility. Placement, migration and local rescheduling handle changing load. Encoded input buffers keep delayed footage available for later processing (§§4–7).

## Evidence and limits

The prototype runs on 101 Azure D3 v2 machines, each with four CPU cores and 14 GB RAM. Recorded Bellevue/Seattle traffic is replayed at its original rate. Queries include license plates, counting, classification and tracking. Experiments report improvements up to 80% in quality and sevenfold in lag over fair scheduling, under the evaluated workloads (§8). These are CPU-era cluster results rather than VLM or construction benchmarks. Profiles require representative data, and their quality estimates inherit reference-model errors. A ten-minute license-plate profile exhaustively covering 414 configurations costs 20 CPU-days, motivating cheaper search (§5). Scheduling thousands of queries takes seconds, which is separate from per-frame analytic delay. Migration and demand-error experiments support the scheduling design, without establishing rare-event recall.

## Research connections

- **Builds on:** Model Predictive Control — predicts lag accumulation before choosing resource allocations (§6.2.1).
- **Cites:** JetStream — distinguishes joint compute/quality/lag optimization from WAN-driven data degradation (§9).

## Relevance to Aligned

Our interpretation: a foundational scheduler for mixing urgent safety rules, slower activity estimates and daily-report jobs on shared infrastructure. Assign separate deadlines and quality floors, preserve evidence during overload, and replace average utility with event-sensitive objectives where missed incidents matter.

## Human notes
