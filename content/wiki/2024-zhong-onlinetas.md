---
year: 2024
venue: "NeurIPS"
affiliations: ["University of Adelaide", "National University of Singapore"]
research_groups: []
reviewed: false
tags: ["procedure-understanding", "video-representation", "efficient-processing"]
---

# OnlineTAS: An Online Baseline for Temporal Action Segmentation

OnlineTAS combines adaptive temporal memory, causal segmentation and duration-aware post-processing to label procedural actions as video arrives.

**Authors:** Qing Zhong, Guodong Ding, Angela Yao.
**Paper:** [PDF](../raw/2024-zhong-onlinetas.pdf)
**Website:** Not found in checked sources.
**Code:** [GitHub placeholder](https://github.com/QingZhong1996/OnlineTAS)

**Source version:** NeurIPS 2024 proceedings PDF, including appendix and checklist, 22 pages.

![OnlineTAS context-aware feature augmentation and adaptive memory](../assets/2024-zhong-onlinetas.png)

*Figure 1. OnlineTAS context-aware feature augmentation and adaptive memory. Source: [original paper, PDF p. 4](../raw/2024-zhong-onlinetas.pdf#page=4).*

## Problem and contribution

Online action segmentation must recognize temporally related steps without future context and avoid rapidly alternating predictions. OnlineTAS provides a supervised baseline that explicitly separates instantaneous frame accuracy from stable segment quality (§§1, 3).

## Approach

Frame features pass through a GRU and a context-aware feature augmentation block. Attention combines the current clip with a bounded memory containing recent features and compressed older context. A causal temporal convolutional model predicts action probabilities. Training uses framewise action labels and temporal smoothing (§§3.1–3.4).

A confidence-and-duration rule retains the preceding action when a new prediction is weak and the current segment is short. Fully online inference advances a trailing window one frame at a time and retains its last prediction. Semi-online inference labels a whole non-overlapping clip after collecting it, adding acquisition delay for its earlier frames (§3.5, §4.3). Neither mode identifies arbitrary unseen actions or produces open-ended explanations.

## Evidence and limits

Evaluation uses GTEA, 50Salads and Breakfast cooking videos. On Breakfast, post-processing raises online F1@50 from 9.3 to 30.5 while lowering frame accuracy from 56.7 to 52.9. This makes the stability-versus-boundary-accuracy tradeoff explicit (Table 9).

The runtime audit reports 4.2 ms with precomputed I3D features, but 29.5 ms, or 33.8 fps, for the full measured pipeline including GPU optical flow and I3D on an NVIDIA A40 (Table 10). Throughput does not remove semi-online clip-collection delay. The authors identify late action-start detection, confidently incorrect fragments, interrupted actions and indefinitely long histories as unresolved limitations (§4.3, p.10). The official code repository remains a Coming soon placeholder.

## Research connections

- **Builds on:** MS-TCN, Farha and Gall (2019) — replaces noncausal convolutions and adds context memory to the segmentation backbone (§3.1).
- **Compares with:** LSTR, Xu et al. (2021) — evaluates a long/short-memory online detector on procedural segmentation, with and without the same post-processing (§4.2, Tables 8–9).

## Relevance to Aligned

Our interpretation: A practical inexpensive layer for task-specific activity intervals and duration statistics before daily reporting. Construction would require new labels and explicit handling of interruptions, background and waiting. A persistent label alone cannot justify an inference about worker effort or intention.

## Human notes

