---
year: 2026
venue: "arXiv preprint"
affiliations: ["LMU Munich", "Stanford University", "Google", "Technical University of Munich"]
research_groups: []
reviewed: false
tags: [dataset, benchmark, video-memory, state-changes, spatial-understanding, egocentric-video]
---

# ProactEgoMem: Benchmarking Proactive Memory in Streaming Egocentric Video

ProactEgoMem tests whether an assistant acquires useful memory at the right time and maintains it through an event's lifecycle.

**Authors:** Ruotong Liao, Meikel Kokowski, Xiaoxiao Sun, Yongqin Xian, Laura Bravo Sánchez, Shiye Su, Federico Tombari, Serena Yeung-Levy, Volker Tresp.
**Paper:** [PDF](../raw/2026-liao-proactegomem.pdf) · [arXiv v2](https://arxiv.org/abs/2610.30089v2), 26 October 2026.
**Website:** [Project website](https://proactegomem.github.io/)
**Code:** [GitHub repository](https://github.com/mayhugotong/ProactEgoMem)
**Citations:** 0 ([OpenAlex](https://openalex.org/W7223225027), checked 2026-11-03).

![ProactEgoMem: Figure 2 from the paper](../assets/2026-liao-proactegomem.png)

*Figure 2 from the original paper ([PDF page 2](../raw/2026-liao-proactegomem.pdf#page=2)).*

## Problem and contribution

Later retrieval cannot recover evidence that an assistant never retained. ProactEgoMem evaluates the earlier decision: when to capture transient information, track object state, or follow an object's location. It is a benchmark and diagnostic study, rather than a new trained memory architecture (§§1–3).

## Approach

Three task families cover information capture, state tracking, and location tracking. At the notification level, the model emits a timely message. At the intervention level, it must start, maintain, and stop a memory tool, then report the outcome. This separates noticing an event from retaining its useful evidence (§3, Figures 2–3).

All evaluated models receive a task prompt and causal observations. The protocol simulates streaming with one request per video second, the latest ten frames at 1 fps, and JSON context containing active tools plus the five latest completed records. Invalid JSON counts as silence (§5.2).

Later multiple-choice QA compares no memory, predicted tool memory, and oracle memory. Information-capture QA uses trace text plus up to 40 frames from the selected intervals. State- and location-tracking QA use text-only tool traces containing object names, states or locations, and times. The no-memory control receives 40 uniformly sampled frames from the full clip (§5.4, Appendix K.3).

## Evidence and limits

The Daily track contains 300 clips totaling 16 hours and 1,000 questions. The Sci track contains 100 laboratory clips totaling 6.47 hours. These are collections of short clips, not continuous full-shift trials (Table 3).

Oracle memory exceeds proactive-memory QA by at least 20 percentage points in 34 of 36 valid model–task settings. Common failures include false alarms, late starts, fragmented tracking, and tools that never close (§§5.4–5.6, Figure 10).

Timing, precision/recall, interval overlap, and QA must be read together. The headline 0.2-second timing tolerance is especially strict relative to the one-second evaluation clock. This is simulated decision timing, not measured wearable response latency. Laboratory results also expose domain-transfer failures.

## Research connections

- **Builds on:** [[2022-grauman-ego4d]] — supplies the Daily recordings, with newly reviewed event and QA annotations (§4).
- **Cites:** [[2025-yang-egolife|EgoLifeQA]] — contrasts offline episodic QA with proactive acquisition (Appendix A, Table 5).

## Relevance to Aligned

Our interpretation: a useful evaluation pattern for deciding when to retain object-state and location evidence. Construction-specific events, tolerable missed evidence, and interruption budgets must be defined before using these tools for skill assessment.

## Human notes
