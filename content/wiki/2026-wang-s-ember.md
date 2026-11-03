---
year: 2026
venue: arXiv preprint
affiliations:
- FAIR, Meta
- Reality Labs, Meta
research_groups:
- meta-fair
- meta-reality-labs
reviewed: false
tags:
- video-memory
- video-retrieval
- video-qa
- egocentric-video
---

# S-EMBER: A Large-Scale Benchmark for Streaming Egocentric Memory Retrieval

Evaluates whether an answer about earlier wearable video is both correct and supported by a localized evidence interval.

**Authors:** Xiaodong Wang, Xuanyi Zhao, Pedro Rodriguez, Devendra Singh Sachan, Barlas Oguz, Seungwhan Moon, Shang-Wen Li, Gargi Ghosh, Xin Dong, Wen-Tau Yih.

**Paper:** [PDF](../raw/2026-wang-s-ember.pdf) · [arXiv](https://arxiv.org/abs/2607.02689v2)

**Website:** Not found in checked sources. The official repository and [dataset page](https://huggingface.co/datasets/facebook/S-EMBER) provide project resources.

**Code:** [GitHub repository](https://github.com/facebookresearch/S-EMBER) — evaluation tasks, model wrappers, scripts and answer judge.

**Source version:** arXiv 2607.02689v2, 26 August 2026. Preprint, with no peer-reviewed venue established in checked sources.

![S-EMBER: Figure 1 from the paper](../assets/2026-wang-s-ember.png)

*Figure 1 from the original paper ([PDF page 3](../raw/2026-wang-s-ember.pdf#page=3)).*

## Problem and contribution

A plausible answer about a past event can be wrong or point to the wrong evidence. S-EMBER evaluates answer correctness together with the supporting time interval. It contributes manually grounded questions and an evaluation protocol, rather than a new memory architecture.

## Approach

613 users recorded 3,141 clips with consumer smart glasses. Annotators generate look-back questions, answers at three response granularities and supporting temporal intervals, followed by review. Queries occur at fixed times and models receive only the video prefix observed so far.

Baselines use native video models or timestamped captions passed to a language model. Outputs include an answer and evidence interval. GQ@0.5 counts success only when the answer is correct and temporal intersection-over-union reaches 0.5. This tests observable grounding, not whether the model causally relied on that evidence. Models may reread the prefix, so query-time causality does not establish bounded-memory streaming ingestion.

## Evidence and limits

The collection contains 9,448 questions and 388 aggregate video hours, but clips last 5–20 minutes and average 7.4 minutes. It does not demonstrate memory across days. Gemini 3.1 Pro reaches GQ@0.5 of 0.297 versus the annotation-derived human reference of 0.698 (Table 3). The latter is annotation agreement, not a matched timed inference trial. Proprietary and open models use different input budgets.

Explicit time offsets improve Qwen3VL-32B's mean temporal IoU from 0.018 to 0.412 at 128 frames (§7), illustrating how interface details affect apparent memory ability. Optional two-pass selection processes 64 frames first and 128 in the answering pass, with roughly twice one-pass runtime. The stated 128-frame final budget excludes the first pass's extra processing (Appendices E–F).

Evaluation code is released. Dataset access requires accepting non-commercial terms and is gated. Neither released code nor ordinary-life footage establishes construction performance or unrestricted product-training rights.

## Research connections

- **Cites:** [[2024-goletto-amego]] — earlier egocentric memory representation (§2.1, Table 1).
- **Cites:** [[2025-yang-egolife]] — earlier longer-horizon egocentric benchmark (§2.1, Table 1).

## Relevance to Aligned

Our interpretation: require a worker-camera answer to include the actual supporting event. Adapt the joint metric to full shifts, repeated operations and human review. Separately test retrieval cost, evidence dependence and execution quality, which this benchmark does not establish.

## Human notes
