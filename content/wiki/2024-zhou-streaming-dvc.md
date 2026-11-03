---
year: 2024
venue: "CVPR"
affiliations: ["Google"]
research_groups: []
reviewed: false
tags: [method, video-memory, video-representation, efficient-processing]
---

# Streaming Dense Video Captioning

Streaming Dense Video Captioning compresses visual history into fixed-size memory and emits timestamped descriptions of completed events before the video ends.

**Authors:** Xingyi Zhou, Anurag Arnab, Shyamal Buch, Shen Yan, Austin Myers, Xuehan Xiong, Arsha Nagrani, Cordelia Schmid.
**Paper:** [PDF](../raw/2024-zhou-streaming-dvc.pdf)
**Website:** Not found in checked sources.
**Code:** [GitHub repository](https://github.com/google-research/scenic/tree/main/scenic/projects/streaming_dvc)

**Source version:** arXiv:2404.01297v1, 1 April 2024. CVPR 2024 identity confirmed by the official Scenic repository.
**Citations:** 54 ([OpenAlex](https://openalex.org/W4402726946), checked 2026-11-03).

![Streaming dense video captioning with a memory module](../assets/2024-zhou-streaming-dvc.png)

*Figure 2. Streaming dense video captioning with a memory module. Source: [original paper, PDF p. 2](../raw/2024-zhou-streaming-dvc.pdf#page=2).*

## Problem and contribution

Standard dense captioners see an entire downsampled video before producing all event captions. This paper separates two problems: ingesting frames with bounded visual memory and generating event descriptions at intermediate times (§3).

## Approach

A per-frame encoder supplies tokens to a weighted clustering memory. Incoming tokens and previous cluster centers are merged into a fixed number of centers, preserving diverse visual evidence without retaining every frame embedding. The default uses 514 memory tokens and two clustering iterations (§3.2, Algorithm 1).

At periodic decoding points, a language decoder predicts start/end time tokens and captions for events already completed. Previous captions become a prefix to reduce duplication. Training randomly removes prefix events and asks the decoder to recover them, approximating imperfect earlier predictions. GIT and Vid2Seq backbones are adapted with annotated dense-caption supervision (§§3.1–3.3). The output is query-independent extraction, although its free text does not enforce stable actor/object identities.

## Evidence and limits

On visual-only ActivityNet, streaming GIT obtains CIDEr 41.2 and SODAc 6.6 versus 29.8 and 5.7 for GIT. Streaming Vid2Seq also improves on YouCook2 and ViTT (Table 4). However, important experiments sample 64 frames and decode at the midpoint and end. Shortening the decoding stride from 32 to 21 lowers CIDEr from 40.6 to 34.7, with duplicate events still observed (§4.2, Table 3).

The memory mechanism is causal, but these few-minute benchmarks do not establish prompt alerts over a full shift. Bounded visual memory also does not automatically bound growing caption prefixes or preserve small visual details. Official Scenic training/evaluation code exists, while its model-zoo checkpoint entries still say Coming soon (repository README).

## Research connections

- **Builds on:** Vid2Seq, Yang et al. (2023) — reuses unified time/text tokens and adapts its visual pathway and decoding to causal operation (§§3.1, 4.1).
- **Compares with:** MovieChat, Song et al. (2024) — tests its token-merging memory against weighted clustering under matched memory budgets (§4.2.1, Table 1).

## Relevance to Aligned

Our interpretation: A direct baseline for building an event timeline before any user query. Daily reports would still require deduplication, confidence, actor/object links and retained source clips, since captions can omit precisely the glove, contact or state detail needed for safety review.

## Human notes

