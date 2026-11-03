---
year: 2022
venue: "WACV"
affiliations: [Microsoft, University of Central Florida]
research_groups: []
reviewed: false
tags: [video-representation, egocentric-video, multi-person]
---

# Multi-Stream Dynamic Video Summarization

Multi-DPP jointly selects important events and representative camera views from recordings made by several moving wearers.

**Authors:** Mohamed Elfeki, Liqiang Wang, Ali Borji.
**Paper:** [PDF](../raw/2022-elfeki-multi-ego.pdf)
**Website:** Not found in checked sources.
**Code:** [Author repository](https://github.com/M-Elfeki/Multi-DPP) — annotations and evaluation resources are available, but the README still lists training-code cleanup and upload as unfinished.
**Source version:** WACV 2022 proceedings PDF, pp. 339–348. This note follows the published paper, not the earlier 2018 preprint. Ali Borji has no institution assigned in its author block.

![Multi-Ego multi-view video summarization](../assets/2022-elfeki-multi-ego.png)

*Figure 1. Multi-Ego multi-view video summarization. Source: [original paper, PDF p. 1](../raw/2022-elfeki-multi-ego.pdf#page=1).*

## Problem and contribution

Team members can record the same event from different viewpoints or perform independent activities simultaneously. Summarizing each camera separately duplicates shared events and misses the choice of the clearest view. The paper introduces Multi-Ego, a genuine multi-wearer dataset, and Multi-DPP, a joint event/view selection formulation (§§1–3).

## Approach

Timestamped videos become frame features from GoogLeNet. A shared bidirectional LSTM models each camera's temporal context. Pooling across views and a small network produce joint event features, while another shared network predicts per-view quality. A multi-stream determinantal point process favors important, diverse events and their representative views. Temporal segmentation converts selections into shots under a summary budget of 15% of one camera's duration (Fig. 2, §4).

Supervised training combines summary likelihood with view-selection cross-entropy. An unsupervised variant optimizes diversity. Stored features and selected shots support a universal highlight video, rather than entity histories or an evidence-query interface. Streams need timestamps but need not start and finish together. Bidirectional encoding makes the evaluated system offline (§4.3).

## Evidence and limits

Multi-Ego contains 12 hours from three users, divided into 41 sequences of roughly 3–7 minutes. Five people annotate summaries. Evaluation rotates training, validation and testing across six collections, rather than demonstrating transfer to new wearers (§§3, 5).

Three-view summary F1 is 25.03 versus 23.37 for the best listed alternative and 21.10 when using cross-entropy alone. The two-view advantage is smaller: 28.30 versus 27.67 (Table 1). These scores measure agreement with subjective highlights, not preservation of every safety incident or answer-bearing moment. Shared parameters do not establish constant compute or shift-long scalability. The incomplete implementation release also limits immediate reuse.

## Research connections

- **Builds on:** Zhang et al., *Video Summarization with Long Short-Term Memory* (2016) — extends recurrent DPP summarization to joint event and camera selection (§4, ref. 55).
- **Compares with:** Mahasseni et al., *Unsupervised Video Summarization with Adversarial LSTM Networks* (2017) — evaluates adaptations that merge camera streams or their separate summaries (Table 1, ref. 29).

## Relevance to Aligned

Our interpretation: an early design reference for reducing redundant worker-camera footage. A usable evidence index would need query-aware selection, rare-error retention checks and causal processing, rather than relying on highlight quality alone.

## Human notes
