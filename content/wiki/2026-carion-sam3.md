---
year: 2026
venue: "ICLR"
affiliations: ["Meta Superintelligence Labs"]
research_groups: []
reviewed: false
tags: [dataset, benchmark, method, video-representation, efficient-processing]
---

# SAM 3: Segment Anything with Concepts

SAM 3 detects, segments and tracks all instances of a prompted concept, combining a shared detector–tracker backbone with new SA-Co training and evaluation resources.

**Authors:** Nicolas Carion, Laura Gustafson, Yuan-Ting Hu, Shoubhik Debnath, Ronghang Hu, Didac Suris, Chaitanya Ryali, Kalyan Vasudev Alwala, Haitham Khedr, Andrew Huang, Jie Lei, Tengyu Ma, Baishan Guo, Arpit Kalla, Markus Marks, Joseph Greer, Meng Wang, Peize Sun, Roman Rädle, Triantafyllos Afouras, Effrosyni Mavroudi, Katherine Xu, Tsung-Han Wu, Yu Zhou, Liliane Momeni, Rishi Hazra, Shuangrui Ding, Sagar Vaze, Francois Porcher, Feng Li, Siyuan Li, Aishwarya Kamath, Ho Kei Cheng, Piotr Dollár, Nikhila Ravi, Kate Saenko, Pengchuan Zhang, Christoph Feichtenhofer.
**Paper:** [PDF](../raw/2026-carion-sam3.pdf) · [ICLR publication](https://proceedings.iclr.cc/paper_files/paper/2026/hash/e0982cbc81401df3430ee1ff780dc7a2-Abstract-Conference.html)
**Website:** [Project website](https://ai.meta.com/sam3)
**Code:** [Official repository](https://github.com/facebookresearch/sam3)
**Source version:** arXiv:2511.16719v2, 28 March 2026, 78 pages including appendices. First preprint: 20 November 2025. ICLR 2026 publication is verified, but the publisher PDF was not compared.
**Citations:** 28 ([OpenAlex](https://openalex.org/W4417095222), checked 2026-11-04).

![SAM 3 shares image features between a concept detector and a mask-propagation tracker with video memory](../assets/2026-carion-sam3.png)

*Figure 4. Shared encoder, concept-conditioned detector, and video tracker with mask memory. Source: [archived PDF, p. 4](../raw/2026-carion-sam3.pdf#page=4).*

## Problem and contribution

Earlier SAM models require instance-level visual prompts. Promptable Concept Segmentation instead accepts short noun phrases, image exemplars, or both, returning masks and video identities for every matching instance. A human/AI data engine checks mask quality and missing instances. Its SA-Co resources separate training corpora from image and video evaluation (§§1, 4–5).

## Approach

A shared image encoder supplies detector and tracker features, while a text encoder embeds concept prompts. A DETR-style detector separates concept presence from local mask prediction. In video, the detector discovers objects while a SAM 2-derived tracker propagates existing masks from stored frame/mask features. Overlap association joins detections to tracks and starts new identities. Confidence-filtered memory and detector reprompting reduce drift (§3, Appendix C).

Forward tracking processes frames sequentially, while interactive corrections can propagate through a complete video. Original SAM 3 stores memory per object. Appendix H's Multiplex variant groups objects into shared memory buckets, preserving individual identities through object embeddings and unpacking. The official SAM 3.1 release adds Multiplex and a newly trained detector, so its results are distinguished from the original model (Table 43).

## Evidence and limits

SA-Co/VEval evaluates phrase-conditioned video masks and associations on SA-V, YT-Temporal-1B and SmartGlasses. On SmartGlasses, original SAM 3 reaches 36.4 cgF1 and 63.6 pHOTA versus human references of 58.5 and 72.3. These measure concept recognition, masks and tracking, not procedural understanding (§6, Table 5).

Appendix H reports 5.2× tracking throughput at 128 objects on one H100 for Multiplex versus optimized SAM 3, with slight single-object overhead and mixed accuracy changes. This is a tracking-stage comparison. Complex referring expressions require an additional MLLM, and neither long-term identity after extended disappearance nor shared 3D memory is established (Appendices B, G–H). Code and checkpoints are released, with gated checkpoint access. Public benchmark annotations do not imply the entire training corpus is downloadable.

## Research connections

- **Builds on:** [SAM 2](https://arxiv.org/abs/2408.00714) — inherits visual prompting and memory-based video mask propagation (§3, Appendix C).
- **Builds on:** [DETR](https://arxiv.org/abs/2005.12872) — uses transformer detection queries for concept-conditioned object localization (Appendix C.2).

## Relevance to Aligned

Our interpretation: a useful automatic mask/short-track frontend for tools and components before persistent association or event extraction. Test missed instances, identical-object merges, egocentric occlusion and end-to-end latency. SAM 3 alone cannot certify work quality or preserve cross-shift object identity.

## Human notes
