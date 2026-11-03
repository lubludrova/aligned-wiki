---
year: 2026
venue: "ECCV"
affiliations: ["National Tsing Hua University", "NVIDIA"]
research_groups: []
reviewed: false
tags: [method, video-memory, efficient-processing, video-qa]
---

# ReactVAU: A Slow-Fast Decoupled Framework for Streaming Video Anomaly Understanding

A small anomaly detector gates expensive verification while protecting suspicious visual evidence in streaming memory.

**Authors:** Chia-Hui Chen, Shih-Ying Yeh, Fu-En Yang, Min-Hung Chen, Shang-Hong Lai.
**Paper:** [PDF](../raw/2026-chen-reactvau.pdf)
**Website:** [Project website](https://huiyuiui.github.io/ReactVAU/)
**Code:** [Repository](https://github.com/huiyuiui/ReactVAU-code)

**Source version:** arXiv 2609.07941v2, with author-hosted supplementary material. ECCV 2026 status is stated on the project page.
**Citations:** 0 ([OpenAlex](https://openalex.org/W7212020541), checked 2026-11-03).

![ReactVAU: Figure 2 from the paper](../assets/2026-chen-reactvau.png)

*Figure 2 from the original paper ([PDF page 5](../raw/2026-chen-reactvau.pdf#page=5)).*

## Problem and contribution

Generic streaming compression can erase rare incidents, while repeatedly invoking a large model wastes compute on normal footage. ReactVAU couples event detection, selective reasoning, and evidence retention.

## Approach

Four frames per second become a 2×2 grid for a fine-tuned PaliGemma2-3B detector. Its score controls StreamForest memory merging, an eight-frame anomaly pool, and a StreamForest-7B verification gate. Normal intervals update memory sparsely. Triggered intervals retain denser observations and receive a fused anomaly score. Both modules receive LoRA/projector adaptation, using approximately 240,000 labeled grids and HIVAU-70K instructions. Training-derived thresholds target 90% recall. Detection uses causal smoothing, but interval scores are broadcast retrospectively. Semantic QA is evaluated only after the video ends (supplement §§1–4).

## Evidence and limits

Table 1 reports 88.44% UCF-Crime AUC and 88.50% XD-Violence AP. These are surveillance benchmark results, not construction-rule recall. The H100 timing table contains inconsistent weighted averages: its normal/anomaly latencies and stated rates do not reproduce the reported means. Its 95% call-saving figure is a projection. More useful consumer profiling covers one video on RTX 4090: normal-path mean 76.8 ms, triggered-path mean 966.6 ms, triggered P95 1089.3 ms, and maximum backlog 411 ms (supplement Table 5). These exclude the need to observe each one-second interval and do not demonstrate concurrent-camera capacity. Two training stages each require roughly 12–16 H100 hours (supplement Table 1).

## Research connections

- **Builds on:** [[2025-zeng-streamforest]] — preserves its memory hierarchy while adding anomaly-aware protection (§§3.1–3.4).
- **Compares with:** [[2025-ye-vera]] — includes its offline anomaly scores in Table 1.

## Relevance to Aligned

Our interpretation: a strong architectural candidate for cheap continuous screening plus evidence-backed incident reports. Validate missed small PPE violations, gate failures, alert availability, and shared-GPU overload before treating it as a safety monitor.

## Human notes
