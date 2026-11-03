---
year: 2026
venue: "EMNLP"
affiliations: ["Queen's University Belfast", "AMD", "Queen Mary University of London"]
research_groups: []
reviewed: false
tags: [video-retrieval, video-qa, efficient-processing]
---

# HPP: Hierarchical Programmatic Probing for Long Video Understanding by Decoupling Perception and Reasoning

HPP lets a coding LLM compose video-search and perception operations in a persistent Python environment to answer questions over a recorded video.

**Authors:** Awais Rauf, Ahmed Hasssan, Gregory Slabaugh.
**Paper:** [PDF](../raw/2026-rauf-hpp.pdf) · [Publication](https://aclanthology.org/2026.emnlp-main.2377/)
**Website:** [Project website](https://awaisrauf.com/HPP)
**Code:** [Official repository](https://github.com/AwaisRauf/hpp)
**Source version:** Twenty-eight-page EMNLP 2026 publisher PDF, pp. 53993–54020. Code inspected at commit `558cc0767170f2dca9cec3c074bc466b037d618a`. Author spellings follow the PDF.

![HPP: Figure 1 from the paper](../assets/2026-rauf-hpp.png)

*Figure 1 from the original paper ([PDF page 3](../raw/2026-rauf-hpp.pdf#page=3)).*

## Problem and contribution

Long-video questions require locating sparse evidence and combining observations across time. HPP separates visual perception from planning and aggregation, allowing an LLM to write programs rather than follow a fixed retrieval workflow (§3, Figure 1).

## Approach

Recorded video and optional subtitles → on-demand hierarchy and retrieval → Python probes and local VLM calls → accumulated evidence and answer.

The proposed hierarchy uses codec information to form shots, then groups shots into scenes and semantic clusters. Search combines pooled similarity with token–frame MaxSim. A coding LLM selects regions, extracts frames or clips, queries a small VLM, and retains intermediate results in Python variables. It can reformulate searches, merge timestamped hits, verify candidates, count events and order observations. Embeddings and hierarchy are cached as needed. This is query-time exploration of complete recordings, not demonstrated continuous ingestion or durable multi-worker memory. Default evaluation pairs GPT-5-mini with Qwen3-VL-2B, without task-specific controller training (§3, Appendices A, E–F).

## Evidence and limits

Table 2 reports 66.4% LongVideoBench accuracy. On a separate 150-question LVB-3600 subset, code execution improves accuracy from 56.7% to 66.7% over ReAct-style tool calling with the same models, tools, subtitle access and iteration budget. This does not establish equal total computation or universal superiority (Table 4).

Mean end-to-end latency is 99.1/110.4 seconds on sampled LVB-600/3600 queries. The 2B designation excludes the reasoning LLM. Cross-system timing comparisons use different settings (Table 5).

**Source and implementation caveats:**

- “Up to 16× fewer tokens” compares with a frame-sampling token model, not complete operating cost. Appendix C.2 assumes 70% cached input in prose but uses 80% in its formula (Figure 5, PDF p. 20).
- Equation 1 uses motion vectors and residuals. Released [hierarchy code](https://github.com/AwaisRauf/hpp/blob/558cc0767170f2dca9cec3c074bc466b037d618a/hpp/utils/hierarchy.py) instead derives its default activity proxy from compressed packet sizes.
- The printed MaxSim averages over frames after maximizing over query tokens. Released [search code](https://github.com/AwaisRauf/hpp/blob/558cc0767170f2dca9cec3c074bc466b037d618a/hpp/utils/search.py) averages over tokens after maximizing over frames. These operations differ (§3, PDF p. 5).
- Evaluation is predominantly multiple-choice QA, with one additional captioning experiment. It does not validate exhaustive event retrieval, multi-camera association, causal alerts, defect detection or repair confirmation (§§5, 7).

The authors report premature answers, repetitive probing, confirmation bias and context accumulation. Code inspection was static, with no experimental reproduction.

## Research connections

- **Builds on:** Recursive Language Models, Zhang et al. (2025) — adapts a persistent REPL and prompting framework (§3, Appendix F.2).
- **Builds on:** ColBERT, Khattab and Zaharia (2020) — motivates late-interaction retrieval (§3).
- **Compares with:** VideoAgent by Wang et al. (2024), a distinct paper from the Fan et al. VideoAgent already in this wiki (Table 2).

## Relevance to Aligned

Our interpretation: high-priority retrieval/QA reference alongside [[2026-tian-ego-r1]] and [[2026-cai-cfd]]. Test code-driven evidence aggregation against ordinary tool calling with matched models and budgets. Timestamp deduplication within one recording does not establish shared event identity across cameras. Helmet motion may dominate codec-based activity scores while static defects receive little attention, a transfer hypothesis requiring measurement. Preserve source clips and separately evaluate evidence coverage, citations, latency and false conclusions about repairs.

## Human notes

