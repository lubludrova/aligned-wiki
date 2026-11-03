---
year: 2026
venue: "EMNLP 2026 Industry Track"
affiliations: ["University College London", "Imperial College London", "Durham University", "Shanghai Jiao Tong University", "Queen Mary University of London", "Huawei Noah’s Ark Lab", "Independent Researcher"]
research_groups: []
reviewed: false
tags: ["video-memory", "video-qa", "efficient-processing", "egocentric-video"]
---

# CapMem: A Benchmark for Caption-Based Episodic Memory in Egocentric Video

Tests reusable caption memory against direct video QA with matched-frame controls, repeated-query cost accounting and sparse visual verification.

**Authors:** Dingli Liang, Yiqiao Xie, Yukai Huang, Zhaokai Wang, Weitong Cai, Guangwen Feng, Jifei Song, Zhensong Zhang, Hang Zhang.
**Paper:** [PDF](https://aclanthology.org/2026.emnlp-industry.233.pdf) · [Primary record](https://aclanthology.org/2026.emnlp-industry.233/)
**Website:** Not found in checked sources.
**Code:** Not found in checked sources.
**Source version:** Publisher PDF, EMNLP 2026 Industry Track, pp. 3888–3914, 27 pages.

## Problem and contribution

Captioning a video once may make repeated questions cheaper, but captions can omit decisive visual details. CapMem tests that trade-off on 75 videos totaling 33.7 hours and 1,000 human-authored questions. Text-only controls filter visually bypassable questions, while frame-aligned comparisons distinguish representational benefits from simply seeing more frames (§§3–5).

## Approach

Video → timestamped 30- or 60-second captions → text-only episodic QA. Direct VideoQA and text-only CleanQA serve as controls. A separate retrieve-and-verify harness retrieves caption windows, samples at most 12 supporting frames, and conditionally overrides the initial caption answer (Fig. 2, Appendix D).

The ordinary CaptionQA baseline concatenates captions, rather than demonstrating an industrial vector database. The visual override requires strong support and excludes explicit clock-time questions. Both captioning and answering capabilities influence performance, so cross-captioner controls are also provided.

## Evidence and limits

On videos longer than 20 minutes, matched-frame tests across six Qwen models retain mean caption advantages of 3.22 and 2.55 percentage points for 30- and 60-second windows (§5.2, Tables 4–5). This does not establish universal superiority: short videos can favor direct visual input.

Repeated-query accounting includes caption construction amortization, but direct-video cost uses an analytical visual-patch proxy, not measured production billing (Table 7, Appendix F.6). Sparse verification cannot recover every omitted brief event.

Crucially, the final visual-override policy was chosen after inspecting failures on the same evaluation split, without a separate development set (Appendix D, PDF p. 18). Treat its gains as exploratory. The matched-frame caption comparison is a distinct experiment and should not inherit stronger causal claims from the verification harness.

## Research connections

- **Builds on:** [2022-grauman-ego4d](/notes/2022-grauman-ego4d/) and [2025-yang-egolife](/notes/2025-yang-egolife/) supply source videos (§4.1).
- **Cites:** EgoSchema as prior egocentric QA context (Introduction).

## Relevance to Aligned

Our interpretation: a useful controlled baseline for caption-once memory and escalation to source video. Keep ingestion costs, caption omissions and query costs separate. Before deployment, evaluate a fixed verification policy on held-out construction episodes and preserve original evidence.

## Human notes
