---
year: 2025
venue: "CVPR"
affiliations: ["Huazhong University of Science and Technology", "University of Michigan, Ann Arbor", "Kanagawa University"]
research_groups: []
reviewed: false
tags: [dataset, benchmark, method, video-qa, efficient-processing, video-representation, sft, supervised-training]
---

# Holmes-VAU: Towards Long-term Video Anomaly Understanding at Any Granularity

Hierarchical anomaly instructions and anomaly-focused frame selection support explanations from clips through full videos.

**Authors:** Huaxin Zhang, Xiaohao Xu, Xiang Wang, Jialong Zuo, Xiaonan Huang, Changxin Gao, Shanjun Zhang, Li Yu, Nong Sang.
**Paper:** [PDF](../raw/2025-zhang-holmes-vau.pdf)
**Website:** Not found in checked sources.
**Code:** [Repository](https://github.com/pipixin321/HolmesVAU)

**Source version:** CVF accepted proceedings version, pp.13843–13853. Initial arXiv preprint appeared in 2024. CVF supplemental PDF extracted unchanged from the official ZIP.
**Citations:** 38 ([OpenAlex](https://openalex.org/W4413157891), checked 2026-11-03).

![Holmes-VAU anomaly-focused video understanding](../assets/2025-zhang-holmes-vau.png)

*Figure 4. Holmes-VAU anomaly-focused video understanding. Source: [original paper, PDF p. 5](../raw/2025-zhang-holmes-vau.pdf#page=5).*

## Problem and contribution

Frame-level anomaly scores do not explain complex incidents, and uniform sampling can discard brief evidence inside long videos. Holmes-VAU combines a multi-scale instruction dataset with a sampler that concentrates a multimodal model on anomalous intervals.

## Approach

HIVAU-70k starts from UCF-Crime and XD-Violence. Annotators mark event boundaries, a video model captions clips, and an LLM recursively produces event/video summaries with category labels. Humans review the instructions. A supervised anomaly scorer consumes dense visual features. Its cumulative score distribution selects a fixed number of frames, balancing anomaly density and context. Frozen InternVL2-2B components with LoRA adaptation then answer caption, judgment, description and analysis queries. The global sampling distribution requires the supplied video, rather than maintaining a causal live event state (§§3–4).

## Evidence and limits

The data engine produces 55,806 clips, 11,076 events and 5,443 videos. Evaluation uses 3,300 reviewed test samples at three temporal scales. Table 1 reports 88.96% UCF-Crime AUC and 87.68% XD-Violence AP with frame-level scorer supervision. Table 4 shows that anomaly-focused sampling improves explanation metrics against uniform and top-score selection. Its 566 ms result for 16 frames measures first-token generation latency, not observation time, complete-video scanning or full-answer delay. Experiments use two A100 GPUs. BLEU/CIDEr improvements measure agreement with curated narratives and do not independently establish causal correctness or construction safety performance (§5).

## Research connections

- **Compares with:** [[2024-wu-ovvad]] — detection results under different supervision in Table 1.
- **Cites:** [[2024-zanella-lavad]] — contrasts dense caption windows with selective anomalous-frame sampling (§4).

## Relevance to Aligned

Our interpretation: directly useful for designing incident-to-shift reporting and hierarchical evidence annotations. Retain it as an offline report/explanation reference, while a separate causal detector constructs the live event ledger.

## Human notes
