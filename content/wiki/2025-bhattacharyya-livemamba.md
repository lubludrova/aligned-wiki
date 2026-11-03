---
year: 2025
venue: "NeurIPS"
affiliations:
  - "Qualcomm AI Research"
  - "University of British Columbia"
research_groups: []
reviewed: false
tags: [procedure-understanding, execution-quality, egocentric-video, efficient-processing]
---

# Can Multi-Modal LLMs Provide Live Step-by-Step Task Guidance?

LiveMamba combines a recurrent video-language assistant with a benchmark for timed instructions, completion recognition, and mistake feedback.

**Authors:** Apratim Bhattacharyya, Bicheng Xu, Sanjay Haresh, Reza Pourreza, Litian Liu, Sunny Panchal, Pulkit Madan, Leonid Sigal, Roland Memisevic.

**Paper:** [Stored PDF](../raw/2025-bhattacharyya-livemamba.pdf) · [Source](https://arxiv.org/pdf/2511.21998v2)
**Website:** https://apratimbh.github.io/livecook/
**Code:** https://github.com/Qualcomm-AI-research/qualcomm_interactive_cooking_eval
**Source version:** arXiv:2511.21998v2, 12 April 2026, 34 pages, revision of the NeurIPS 2025 paper. Venue confirmed by the author project.

![LiveMamba task guidance and feedback scenario](../assets/2025-bhattacharyya-livemamba.png)

*Figure 1. LiveMamba task guidance and feedback scenario. Source: [original paper, PDF p. 2](../raw/2025-bhattacharyya-livemamba.pdf#page=2).*

## Problem and contribution

A procedural assistant must decide when to speak, recognize completion, and detect incorrect execution. Qualcomm Interactive Cooking extends recorded CaptainCook4D cooking videos with timed instructions and feedback. Its main evaluation follows the recorded action order, while advanced planning introduces mismatches requiring replanning (§3). These settings should not be collapsed into one result.

## Approach

An InternViT visual encoder feeds a Q-Former that compresses frame tokens. A Mamba-130M language backbone maintains recurrent state and alternates between observing the stream and generating instructions or feedback. A separate Qwen3-32B replanner revises the plan when necessary. Pretraining and task adaptation include instruction-completion augmentation and counterfactual instruction–video mismatches (§4, Figure 2, p. 5).

The small recurrent backbone therefore does not describe the full system size or cost. Nor does model inference throughput directly measure how quickly a newly observable mistake triggers an alert.

## Evidence and limits

On the streaming main set, Table 4 (p. 8) reports 31.5% instruction-completion accuracy and mistake precision/recall/F1 of 0.17/0.10/0.13. Table 5 reports a separate turn-based protocol with 51.0% and F1 0.19. The narrative F1 in §5.3 is inconsistent with Table 4, so these values follow the table. Mistake matching accepts a 30-second window centered on the annotated alert (§5.1), which permits both early and late matches. The replayed person does not respond to generated advice. Consequently, this evaluates timed coaching predictions, not measured prevention or successful correction in a closed human–assistant loop.

## Research connections

- **Builds on:** [[2022-grauman-ego4d]] — egocentric video-language pretraining data (§4.2).
- **Builds on:** CaptainCook4D (Peddi et al., 2024) — underlying cooking videos and mistakes used to construct the interactive benchmark (§3).

## Relevance to Aligned

Our interpretation: the recurrent observer plus occasional larger replanner is relevant to continuous monitoring. Retain completion, mistake recall, alarm timing, and feedback quality as separate measurements, and budget the replanner explicitly.

## Human notes
