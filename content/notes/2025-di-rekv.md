---
year: 2025
venue: "ICLR 2025"
affiliations: ["Shanghai Jiao Tong University", "Alibaba Group"]
research_groups: []
reviewed: false
tags: ["video-memory", "video-qa", "efficient-processing"]
---

# Streaming Video Question-Answering with In-context Video KV-Cache Retrieval

Separates streaming video encoding from later questions by retaining and retrieving model-specific video KV caches without additional training.

**Authors:** Shangzhe Di, Zhelun Yu, Guanghao Zhang, Haoyuan Li, Tao Zhong, Hao Cheng, Bolin Li, Wanggui He, Fangxun Shu, Hao Jiang.
**Paper:** [PDF](https://arxiv.org/pdf/2503.00540v1) · [Primary record](https://arxiv.org/abs/2503.00540v1)
**Website:** Not found in checked sources.
**Code:** [Author repository](https://github.com/Becomebright/ReKV)
**Source version:** arXiv:2503.00540v1, 1 March 2025, conference-labelled ICLR 2025 manuscript.

## Problem and contribution

Repeatedly encoding long video for each question creates unnecessary work, while bounded visual memory can lose earlier evidence. ReKV stores previously computed attention keys and values outside GPU memory and reloads selected blocks when a question arrives (§3).

## Approach

Frame stream → vision encoder and sliding-window language-model attention → KV caches retained in RAM/disk → question-conditioned cache retrieval → autoregressive answer (Fig. 2).

External retrieval uses a CLIP-like model to rank frames or frame blocks. Internal retrieval instead averages existing key vectors into representatives and scores them with question queries separately at each attention layer. Retrieved key/value blocks become context for answer generation. Video encoding and QA can use separate processes and GPUs. All video caches are retained, so bounded GPU context does not mean bounded total storage.

## Evidence and limits

Table 5 reports RVS-Ego accuracy 63.7%, 3.3-second response-completion latency and 18.8 GB/hour offloaded cache for LLaVA-OV-7B with internal retrieval. The speed test uses one hour of pre-extracted 0.5-fps frames and 100 questions, padded to 64 question tokens and fixed 128-token answers (§4.5). The result excludes video decoding and is not an arbitrary production conversation latency.

Table 2 separates retrieval recall from QA accuracy and includes an oracle-evidence control. Retrieval helps the selected backbones, but baseline quality also matters. Cache storage grows with recorded duration and depends on model dimensions and tokenization. Cache reuse across model upgrades and many concurrent camera streams is not established.

The experiments concern answers to posed questions, not proactive error discovery or a lifecycle of repaired defects. The internal representation is also less inspectable than timestamped source clips or structured observations.

## Research connections

- **Builds on:** LLaVA-OneVision supplies the main Video-LLM backbones (§4.2).
- **Compares with:** Flash-VStream on streaming QA (§4.5, Table 5).
- **Cites:** [2022-grauman-ego4d](/notes/2022-grauman-ego4d/) through the egocentric evaluation lineage (§4.1).

## Relevance to Aligned

Our interpretation: a recent-memory alternative worth testing when low answer latency matters. Compare bytes per camera-hour alongside compute savings, and retain portable source evidence. The reported storage makes an unqualified extrapolation to weeks of all-worker video inappropriate.

## Human notes
