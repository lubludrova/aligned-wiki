---
year: 2026
venue: "CVPR Workshops, SAUAFG"
affiliations:
  - "Hitachi, Ltd. Research and Development Group, Japan"
research_groups: []
reviewed: false
tags: [dataset, benchmark, method, procedure-understanding, egocentric-video, training-free]
---

# EgoIndAssembly: Diagnosing Fine-Grained Temporal Hand Reasoning in Vision–Language Models for Skilled Assembly

EgoIndAssembly stresses temporal localization of visually similar assembly steps and introduces progressive procedure grounding as a baseline.

**Authors:** Tatsuya Sasaki.

**Paper:** [Stored PDF](../raw/2026-sasaki-egoindassembly.pdf) · [Source](https://openaccess.thecvf.com/content/CVPR2026W/SAUAFG/papers/Sasaki_EgoIndAssembly_Diagnosing_Fine-Grained_Temporal_Hand_Reasoning_in_Vision-Language_Models_for_CVPRW_2026_paper.pdf)
**Website:** https://huggingface.co/datasets/sasakits/EgoIndAssembly
**Code:** Not found in checked primary sources.
**Source version:** CVPR Workshops 2026 accepted open-access paper, 9 pages, proceedings pp. 8894–8902.
**Citations:** Unavailable (OpenAlex, checked 2026-11-03. No matching indexed record was verified).

![EgoIndAssembly: title and abstract excerpts](../assets/2026-sasaki-egoindassembly.png)

*Title and abstract excerpts from the original paper ([PDF page 1](../raw/2026-sasaki-egoindassembly.pdf#page=1)).*

## Problem and contribution

Recognizing coarse actions does not guarantee understanding which small component a hand is manipulating. EgoIndAssembly contains 222 egocentric videos, approximately 13.6 hours at one frame per second, dominated by medical assembly with a smaller industrial portion. Its diagnostic focus is similar neighboring steps, temporal hand motion, and fine object detail (§§1, 3). The annotated task is step grounding, rather than direct scoring of worker skill or detecting safety violations.

## Approach

Given the procedure’s candidate step labels, baselines compare text–video similarity with temporal dynamic programming, hand-focused visual representations, and vision-language prompting. Progressive Procedure Grounding independently processes nonoverlapping chronological chunks with the full step-label list and a prompt focusing on hand–object interactions. Algorithm 1 specifies no persistent state or earlier-chunk history. It predicts the step associated with each frame without applying the CLIP baseline’s dynamic-programming postprocessing (§4, Algorithm 1, p. 5).

This design tests whether temporal context and detailed observations distinguish neighboring manipulations. It still presupposes the relevant procedure and its labels, and one-frame-per-second sampling can discard rapid actions.

## Evidence and limits

Table 3 (p. 5) reports the strongest listed configuration at mean-over-frames 0.435 and temporal IoU 0.240, using 30.6 model calls per video. These modest grounding scores do not establish reliable error recognition. Ablations show that hand focus alone is not consistently beneficial. The baseline values in Tables 3 and 4 are not identical and should not be combined into a single improvement claim. The dataset URL is stated in the paper, but returned HTTP 401 during the 1 November 2026 check, so unrestricted public data access was not confirmed. This is a diagnostic research benchmark, not an operational evaluation.

## Research connections

- **Cites:** [[2022-sener-assembly101]] — contrasts existing shared-taxonomy assembly benchmarks with the proposed fine-grained diagnostic setting (§3).

## Relevance to Aligned

Our interpretation: include as a challenging benchmark for the perception stage. Similar actions and occluded small components are failure modes to test before trusting any higher-level compliance verdict. It contributes little direct evidence about intervention or recovery.

## Human notes
