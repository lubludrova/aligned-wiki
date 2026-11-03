---
year: 2026
venue: "EMNLP"
affiliations: ["Queen Mary University of London", "Independent researcher", "Durham University", "Imperial College London", "Huawei"]
research_groups: [huawei-multimodal-agents]
reviewed: false
tags: [method, video-memory, video-retrieval, video-qa, efficient-processing]
---

# Caption-once, Frames-on-Demand: Visual-Need Routing for Budget-Aware Agentic Long Video Understanding

CFD caches video descriptions and retrieves bounded visual evidence only when a question needs details that text cannot supply.

**Authors:** Weitong Cai, Hang Zhang, Yukai Huang, Yiqiao Xie, Shan Gao, Jiankang Deng, Songcen Xu, Jifei Song, Zhensong Zhang.
**Paper:** [PDF](../raw/2026-cai-cfd.pdf) · [arXiv v1](https://arxiv.org/abs/2609.11899v1) · [EMNLP publication](https://aclanthology.org/2026.emnlp-main.422/)
**Website:** [Official project](https://weitongcai.com/CFD/)
**Code:** Not found in checked sources.
**Citations:** 0 ([OpenAlex](https://openalex.org/W7212252498), checked 2026-11-03).

![CFD: Figure 2 from the paper](../assets/2026-cai-cfd.png)

*Figure 2 from the original paper ([PDF page 5](../raw/2026-cai-cfd.pdf#page=5)).*

## Problem and contribution

Text summaries preserve broad event order cheaply at question time but can omit color, identity, visible text, or other decisive details. Repeatedly captioning video during reasoning is expensive. CFD separates reusable offline description from selective visual verification, making visual access an explicit query budget (§§1–2).

## Approach

An offline captioner builds two timestamped text stores: an event-level storyline from shot boundaries and a finer log of uniform clips. The full event memory is shown to the answering model. Clip details remain available for targeted expansion (§2.1, Figure 2).

The answering agent first attempts a text-only response. If evidence is insufficient, a localization agent selects an unexplored event and inserts its cached clip descriptions. A visual-need router then decides whether pixels would help. If so, bounded keyframes enter a small FIFO visual memory and the agent re-answers using text and images. The loop ends at a confident answer or iteration limit (§§2.2–2.3).

The default uses frozen Qwen3-VL-8B for captioning and 32B for reasoning. It indexes complete videos before questions and introduces no task-specific training.

## Evidence and limits

CFD reaches 67.5% on Video-MME with 5.76 online frames per question. Against the same pipeline with always-on frame retrieval, routing reduces frames by 13.1% while accuracy changes from 67.2% to 67.5% (Table 9). The much larger comparison with dense inference includes other pipeline differences. These frame counts exclude offline captioning, and the router adds an LLM call, so frame savings do not guarantee lower latency.

Experiments use Video-MME and movie/TV-based InfiniBench. The authors explicitly identify shot-boundary segmentation as unsuitable for continuous egocentric footage. Appendix E reports GPU energy and average end-to-end costs of 229.3 seconds per video for indexing and 68.2 seconds per query in the fixed eight-worker setup on two H200 GPUs. Edge/cloud separation is simulated, without mobile-hardware or real-network validation (Limitations, Table 15).

## Research connections

- **Builds on:** VideoLucy — adapts the hierarchical, agentic reasoning pattern while replacing query-time recaptioning with cached clip text (§§2.1–2.2).
- **Compares with:** VideoLucy — reports a reproduced Video-MME baseline (Table 3).

## Relevance to Aligned

Our interpretation: useful for separating routine textual answers from costly visual checks. Worker-video event segmentation and transient defect detection must be validated independently before applying its budgets.

## Human notes
