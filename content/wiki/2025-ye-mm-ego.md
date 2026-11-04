---
year: 2025
venue: "ICLR"
affiliations: ["CSE, HKUST", Apple, UCLA]
research_groups: [apple-machine-learning-research]
reviewed: false
tags: [dataset, benchmark, method, video-qa, video-retrieval, video-representation, egocentric-video, sft]
---

# MM-Ego: Towards Building Egocentric Multimodal LLMs for Video QA

MM-Ego learns a coarse-to-fine video reader that scans compressed frame representations, selects relevant details and answers egocentric questions.

**Authors:** Hanrong Ye, Haotian Zhang, Erik Daxberger, Lin Chen, Zongyu Lin, Yanghao Li, Bowen Zhang, Haoxuan You, Dan Xu, Zhe Gan, Jiasen Lu, Yinfei Yang.
**Paper:** [PDF](../raw/2025-ye-mm-ego.pdf)
**Website:** [Apple research page](https://machinelearning.apple.com/research/mm-ego)
**Code:** Not found in checked sources.
**Source version:** arXiv 2410.07177v2, 13 April 2025, published at ICLR 2025 following the 2024 preprint. The author list follows this PDF, including Yanghao Li, who is omitted from the checked Apple webpage.
**Citations:** 0 ([OpenAlex](https://openalex.org/W4403345903), checked 2026-11-03).

![MM-Ego memory pointer prompting for frame selection](../assets/2025-ye-mm-ego.png)

*Figure 4. MM-Ego memory pointer prompting for frame selection. Source: [original paper, PDF p. 5](../raw/2025-ye-mm-ego.pdf#page=5).*

## Problem and contribution

Uniformly sampling a few frames can miss small but answer-critical details, while processing every frame at high resolution is expensive. MM-Ego combines seven million narration-derived training questions, a learned frame-selection mechanism and EgoMemoria, a benchmark containing 7,026 questions across 629 videos (§§2–3).

## Approach

SigLIP encodes up to 300 sampled frames. Spatial pooling produces one compressed token per frame for a global glimpse. Qwen2-7B reads those tokens and the question with a learned memory-pointer token. Pointer-to-frame scores, combined with an exploration bias, select 32 frames. A second language-model pass uses their detailed visual embeddings to answer (Fig. 4, §2.2).

Training starts from LLaVA-OneVision and mixes generated egocentric QA with other multimodal data. Language loss trains answers, while narration-derived key frames supervise pointer scores. During training, the detailed second pass receives ground-truth frame indices. At inference it receives predicted selections. Stored per-video embeddings support this two-pass reader, without an enduring identity database or causal update policy (§§2.1–2.2, 3.2).

## Evidence and limits

On EgoMemoria, mean debiased accuracy rises from 47.32 for the base model to 55.97 with the same egocentric training mixture and 61.27 with MM-Ego. The pointer's incremental gain is therefore 5.30 points, while the larger total gain also includes specialized training. This metric averages model-filtered subsets and duration groups, rather than measuring unbiased population accuracy (Table 3, §3.3).

The comparison with GPT-4o is not equal-budget: MM-Ego searches up to 300 frames before selecting 32 detailed frames, while GPT-4o receives 32 uniformly sampled frames. Reducing detailed-frame count leaves the global scan intact, and no end-to-end latency or indexing-cost benchmark is reported (Tables 4–5).

Questions and key-frame targets derive from narrations without a reported independent visual audit rate. No official full implementation or checkpoint release was established. The two-minute wearable example is a demonstration, not a systematic field evaluation. Complete-video processing remains offline.

## Research connections

- **Builds on:** [[2022-grauman-ego4d]] — uses narrations and official episodic-memory splits for training and evaluation (§2.1).
- **Builds on:** Li et al., *LLaVA-OneVision* (2024) — initializes the multimodal backbone before egocentric supervised fine-tuning (§3.2).
- **Cites:** Di and Xie, *Grounded Question-Answering in Long Egocentric Videos* (2024) — discusses narration-derived QA and grounded evaluation (§4, Appendix B).

## Relevance to Aligned

Our interpretation: retain cheap global representations and inspect detailed video only for relevant moments. This design needs measured total cost, verified evidence coverage and a persistent memory layer before use with worker-camera archives.

## Human notes
