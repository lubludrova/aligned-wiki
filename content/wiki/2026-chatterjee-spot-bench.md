---
year: 2026
venue: "NeurIPS (Evaluations and Datasets Track)"
affiliations: ["National University of Singapore", "Google Inc."]
research_groups: []
reviewed: false
tags: [dataset, benchmark, video-memory, state-changes, procedure-understanding]
---

# Don't Pause! Every prediction matters in a streaming video

SPOT-Bench evaluates every response across a continuous stream, including badly timed alerts and unnecessary speech.

**Authors:** Dibyadip Chatterjee, Zhanzhong Pang, Fadime Sener, Yale Song, Angela Yao.
**Paper:** [PDF](../raw/2026-chatterjee-spot-bench.pdf)
**Website:** [Project website](https://dibschat.github.io/SPOT-Bench/)
**Code:** [Repository](https://github.com/dibschat/SPOT-Bench)

**Source version:** arXiv 2604.24317v1. Project page states NeurIPS 2026 acceptance and renames AsynKV to Ctrl-SPOT. This note reports the archived v1 experiments.
**Citations:** 0 ([OpenAlex](https://openalex.org/W7157017701), checked 2026-11-03).

![SPOT-Bench: Figure 2 from the paper](../assets/2026-chatterjee-spot-bench.png)

*Figure 2 from the original paper ([PDF page 2](../raw/2026-chatterjee-spot-bench.pdf#page=2)).*

## Problem and contribution

Paused video questions conceal whether a system can decide when to act. SPOT-Bench tests continuous detection, interaction and intervention, making silence and duplicate responses part of the evaluation.

## Approach

The benchmark contains 940 videos, 68 hours, 5,106 query turns and 7,546 expected responses. Six tasks cover action boundaries, state changes, question answering, procedure guidance and solicited/unsolicited intervention. Timeliness-F1 matches predictions to human-annotated acceptable intervals, penalizing late, redundant and false responses. Exact matching handles detection, while open-ended tasks use a model judge. The training-free AsynKV baseline adapts Qwen2.5-VL-7B with short GPU KV memory, longer CPU memory, query-aware retrieval and episodic summaries (§§4–6, Appendix B).

## Evidence and limits

Table 4 reports overall Timeliness-F1@5 of 10.2 for AsynKV, versus 3.0 for a 16-frame offline model repeatedly queried during streaming. Intervention remains particularly weak, with only 26 videos covering its two tasks. Timeliness uses video timestamps, not measured wall-clock alert latency. Separate H100 profiling reports 0.51 s mean response latency versus 2.56 s for re-encoding 16 frames. The claimed 52% dead-time depends on inactive queries, which may disappear under always-active safety rules. Offline perception-ceiling experiments restrict evaluation using ground-truth response windows and cannot support full-stream false-alarm comparisons (§5.2).

## Research connections

- **Compares with:** [[2025-zeng-streamforest]] — retrospective benchmark comparison in Table 6, distinct from the continuous SPOT protocol.
- **Builds on:** Qwen2.5-VL, Bai et al. (2025) — the frozen backbone shared by controlled streaming baselines (§5.1).

## Relevance to Aligned

Our interpretation: a strong evaluation template for persistent construction alerts and progress notifications. Add shift-long normal footage, rule-specific false alarms per camera-hour, and real observation-to-alert delay. Keep model-judged response quality separate from human-confirmed incidents.

## Human notes
