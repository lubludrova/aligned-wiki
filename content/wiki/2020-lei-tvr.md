---
year: 2020
venue: "ECCV 2020"
affiliations: ["University of North Carolina at Chapel Hill"]
research_groups: []
reviewed: false
tags: ["video-retrieval", "video-representation", "efficient-processing"]
---

# TVR: A Large-Scale Dataset for Video-Subtitle Moment Retrieval

Provides a video-and-subtitle corpus retrieval benchmark and XML, a late-fusion model for selecting videos and localizing relevant moments.

**Authors:** Jie Lei, Licheng Yu, Tamara L. Berg, Mohit Bansal.
**Paper:** [PDF](../raw/2020-lei-tvr.pdf) · [Primary record](https://arxiv.org/abs/2001.09099v2)
**Website:** [Author project](https://tvr.cs.unc.edu/) [?] Inaccessible during this check.
**Code:** [Author repository](https://github.com/jayleicn/TVRetrieval)
**Source version:** arXiv:2001.09099v2, 18 August 2020, ECCV 2020 paper with appendices, 35 pages.

![TVR cross-modal moment localization model](../assets/2020-lei-tvr.png)

*Figure 4. TVR cross-modal moment localization model. Source: [original paper, PDF p. 8](../raw/2020-lei-tvr.pdf#page=8).*

## Problem and contribution

A practical archive query must identify the correct recording as well as a temporal interval. TVR adds multimodal evidence to corpus moment retrieval, using 109K queries over 21.8K clips from six television shows. Each query has a temporal window and a label indicating visual, subtitle or combined evidence. The paper also provides the related TVC captioning dataset (§§1–3).

## Approach

Video and subtitle features → separately encoded reusable context → modality-specific query representations → video ranking and convolutional start/end prediction → ranked corpus moments (Fig. 4, §4).

XML combines appearance and motion features with aligned subtitle representations. Query attention produces different representations for the visual and subtitle branches. Shallow representations support video retrieval. Deeper contextual features yield query-clip similarity signals, and trainable convolutional filters detect start/end transitions. At inference, XML first retrieves 100 videos, then ranks temporal candidates within them (§4.3).

The late-fusion design supports precomputing context features. It does not generate answers, maintain persistent entities or certify that all repeated occurrences have been found. The evaluation separates video retrieval, single-video moment retrieval and corpus moment retrieval.

## Evidence and limits

Section 5 and the appendix compare localization accuracy, efficiency, visual-only/subtitle-only inputs and start/end alternatives. The benchmark's freely annotated intervals are finer than fixed five-second bins. Nevertheless, R@K with an IoU threshold only measures recovery of the annotated relevant interval. It is not a QA metric or exhaustive event-counting guarantee.

The 21.8K figure counts clips, not hours. Edited television footage contains named characters, dialogue and scene cuts that differ from helmet audio and repeated construction activity. Subtitles are available inputs, so measured performance cannot establish robustness to field ASR errors. The paper credits earlier work with introducing corpus moment retrieval and should not be cited as its inventor.

The author repository resolves and contains code. The project website is linked by the paper/repository but was inaccessible in this check, so its present leaderboard availability is unverified.

## Research connections

- **Builds on:** TVQA supplies the source television clips (§3, Appendix A.2).
- **Compares with:** MCN and CAL as corpus-moment retrieval baselines (§5).

## Relevance to Aligned

Our interpretation: use this task decomposition and modality-specific controls when introducing audio transcripts. Evaluate candidate-video recall separately from interval localization and answer support. Modern backbones can replace features without removing the need to test those stages independently.

## Human notes
