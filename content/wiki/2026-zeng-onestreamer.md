---
year: 2026
venue: "arXiv preprint"
affiliations: ["NJU", "PJLAB", "JD", "SJTU", "USTC", "CAS", "CUHK", "PKU", "THU", "FDU", "ZJU"]
research_groups: [nju-mcg]
reviewed: false
tags: [dataset, method, video-memory, video-qa, efficient-processing, sft]
---

# OneStreamer: Unifying Perception, Memory, and Proactive Response in Streaming Video Interaction

OneStreamer jointly learns to record factual video memories and respond when enough evidence has arrived.

**Authors:** Xiangyu Zeng, Yuandong Yang, Zhiqiu Zhang, Yuhan Zhu, Xinhao Li, Qingyi Si, Dingyu Yao, Changlian Ma, Haoran Chen, Xinyu Chen, Yansong Shi, Junhao Zhou, Yifei Li, Jun Zhang, Chuanyu Qin, Chenxu Yang, Xinlei Yu, Kun Ouyang, Yuchen Shao, Qianshan Wei, Changhai Zhou, Jun Gao, Jiaqi Wang, Limin Wang.
**Paper:** [PDF](../raw/2026-zeng-onestreamer.pdf) · [arXiv v1](https://arxiv.org/abs/2610.01762v1). Affiliations follow the PDF's abbreviations.
**Website:** [Project website](https://mcg-nju.github.io/OneStreamer/)
**Code:** [GitHub repository](https://github.com/MCG-NJU/OneStreamer) — model weights labeled “Public access pending” when checked on 2026-10-31.
**Citations:** 0 ([OpenAlex](https://openalex.org/W7216450763), checked 2026-11-03).

![OneStreamer: Figure 3 from the paper](../assets/2026-zeng-onestreamer.png)

*Figure 3 from the original paper ([PDF page 4](../raw/2026-zeng-onestreamer.pdf#page=4)).*

## Problem and contribution

A streaming model must remember observations before knowing future questions, while preserving current visual detail and deciding when to speak. OneStreamer treats memory writing and responses as related generation tasks, supported by evidence-aligned training data and selective supervision of response states (§§1–3).

## Approach

Incoming clips become visual tokens. A FIFO window retains the most recent frames, while earlier evidence survives as timestamped text. The model emits local-detail `Observe` captions and `Summary` records for completed events. These records remain in the same causal history as recent visuals and dialogue (§§3.1–3.2, Figure 3).

For proactive questions, `Silence`, `Standby`, and `Response` distinguish continued observation, emerging evidence, and an answer. Proactive State Transition Learning retains supervision at output anchors and selected state changes or persistence positions. Other state tokens stay in the sequence but are masked from the state loss (§3.3).

Training fine-tunes Qwen3-VL-4B using synthesized streaming examples plus other video data. At inference, the model generates its own captions and control states. It does not retrieve historical visual features, so details absent from its textual memory cannot be visually recovered through this mechanism.

## Evidence and limits

The paper reports leading aggregate results among its compared methods on eight streaming benchmarks (Table 1). With the same checkpoint and recent-16-frame window, retaining caption memory raises OVOBench backward ASI from 63.5 to 71.6 (Table 2). State-supervision ablations distinguish useful selection from random sparsity (Table 3).

The 0.124-second time-to-first-token result uses one 360-second sample on an H200 with precomputed captions, excluding memory creation (Table 4). A separate small online test reports 0.636 seconds per memory update, including decoding and inference (Appendix E.3, Table 19). Accumulated text, caption omissions and full-shift cost remain unresolved. Workmanship assessment is untested.

## Research connections

- **Builds on:** Streamo — extends generative response control with factual memory writing and selective state supervision (§§1, 3).
- **Compares with:** StreamForest — includes persistent event-memory streaming as a baseline (Table 1).

## Relevance to Aligned

Our interpretation: a candidate for the live perception and recording layer, particularly when useful events must be captured before a question. It needs separate retention, interruption, and operating-cost tests on worker footage.

## Human notes
