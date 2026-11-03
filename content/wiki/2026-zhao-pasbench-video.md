---
year: 2026
venue: "arXiv preprint"
affiliations: ["The Chinese University of Hong Kong, Shenzhen", "Tsinghua University"]
research_groups: []
reviewed: false
tags: ["execution-quality", "video-representation"]
---

# PaSBench-Video: A Streaming Video Benchmark for Proactive Safety Warning

PaSBench-Video distinguishes seeing an accident from issuing a correctly grounded warning during its actionable precursor.

**Authors:** Yusong Zhao, Yuejin Xie, Youliang Yuan, Junjie Hu, Jitian Guo, Yujiu Yang, Pinjia He.
**Paper:** [PDF](../raw/2026-zhao-pasbench-video.pdf)
**Website:** [Project website](https://huggingface.co/datasets/beingbetter11643/PaSBench-Video)
**Code:** Not found in checked sources.

**Source version:** arXiv 2606.02443v1.

![PaSBench-Video: Figure 2 from the paper](../assets/2026-zhao-pasbench-video.png)

*Figure 2 from the original paper ([PDF page 3](../raw/2026-zhao-pasbench-video.pdf#page=3)).*

## Problem and contribution

An alert can be semantically plausible but useless because it arrives before visible evidence or after intervention is possible. This benchmark explicitly annotates visible risk onset, accident time and a possible preventive action.

## Approach

The dataset contains 481 risk clips and 259 safe clips. A causal three-second window advances every 0.3 s, sampling at 10 fps and carrying a compact state summary. Models emit a warning decision, risk reason and recommended action. Four nested metrics test detection before a deadline, detection within the risk interval, correct timing of the first warning, and grounding in the correct risk source. Safe clips measure the fraction exceeding one, five or ten warnings (§§3–4).

## Evidence and limits

The strictest reported First-Act@1 score reaches only 20%. However, content grounding is manually audited on 50 valid hits per selected model, rather than exhaustively over every output. The definition checks the risk source and does not fully validate the recommended intervention. All 46 industrial and 33 healthcare risk clips are generated using Kling, while safe clips come from driving and daily-life datasets. Thus industrial false-alarm calibration lacks matched synthetic negatives. The protocol supplies only past frames, but sequential API inference commonly exceeds the 0.3-second observation stride. It simulates causal decisions rather than demonstrating real-time concurrent service. False-positive rates are per clip, not per camera-hour (Tables 5, 13 and Appendix B).

## Research connections

- **Builds on:** PaSBench, Yuan et al. (2025) — extends proactive safety evaluation from static visual inputs to temporally bounded warning opportunities (§2).
- **Builds on:** Nexar, SmartHome and RAdSV — provide real risk/safe source clips and different scene distributions (§3, Appendix A).

## Relevance to Aligned

Our interpretation: adopt the separation between risk onset, first warning and accident deadline for construction hazards. Evaluate real site footage with matched safe operations, human-verified recommendations, and the actual queue and inference delays before drawing deployment conclusions.

## Human notes
