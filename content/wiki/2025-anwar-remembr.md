---
year: 2025
venue: "ICRA"
affiliations: ["NVIDIA", "University of Southern California", "University of Texas at Austin"]
research_groups: []
reviewed: false
tags: [dataset, benchmark, method, video-memory, video-qa, spatial-understanding, real-world-evaluation, training-free]
---

# ReMEmbR: Building and Reasoning Over Long-Horizon Spatio-Temporal Memory for Robot Navigation

ReMEmbR stores timestamped, localized video captions and retrieves them iteratively to answer questions and generate robot navigation goals.

**Authors:** Abrar Anwar, John Welsh, Joydeep Biswas, Soha Pouya, Yan Chang.
**Paper:** [PDF](../raw/2025-anwar-remembr.pdf)
**Website:** [Project website](https://nvidia-ai-iot.github.io/remembr/)
**Code:** [GitHub repository](https://github.com/NVIDIA-AI-IOT/remembr)
**Source version:** arXiv:2409.13682v1, 20 September 2024. The [official project](https://nvidia-ai-iot.github.io/remembr/) identifies the publication as ICRA 2025.
**Citations:** 20 ([OpenAlex](https://openalex.org/W4413944788), checked 2026-11-03).

![ReMEmbR long-horizon robot memory and querying](../assets/2025-anwar-remembr.png)

*Figure 1. ReMEmbR long-horizon robot memory and querying. Source: [original paper, PDF p. 1](../raw/2025-anwar-remembr.pdf#page=1).*

## Problem and contribution

A robot must remember where and when it encountered something across a growing deployment history. ReMEmbR separates continuous memory construction from question answering and introduces NaVQA, with 210 spatial, temporal, and descriptive questions over seven robot-navigation sequences (§§III–V).

## Approach

A pretrained VILA model captions consecutive three-second windows using six frames. A text encoder embeds each caption, and a vector database retains captions alongside timestamps and robot positions. This is question-independent, sequential ingestion. It assumes external localization and continuously appends records, without a learned retention or deduplication mechanism (§IV, Fig. 2).

At query time, an LLM chooses text, position, or time retrieval functions. Retrieved records enter its context, and it can reformulate queries before returning structured text, coordinates, times, or durations. Experiments allow three retrieval rounds. The system uses pretrained models without task-specific training. Captioning is paid during ingestion, while question answering processes retrieved text rather than the complete video. The retained location is the robot's observed position, not a reconstructed object's precise pose.

## Evidence and limits

On long NaVQA examples, GPT-4o ReMEmbR reaches 0.65 descriptive accuracy against 0.55 for all-caption GPT-4o. Mean positional error remains 46.25 metres, limiting precise localization (Table I). Reported query latency is about 25 seconds for a 21.5-minute history, versus 90 seconds for a frame-based baseline on a shorter 5.5-minute video. This is a query-stage comparison, not an end-to-end ingestion benchmark (§VII).

**Practical evidence:** A Nova Carter robot with Jetson Orin built memory during a 25-minute office tour and subsequently executed spoken navigation requests. These are qualitative physical demonstrations, including a failure confusing a water fountain with a soda machine, without a controlled success-rate study (§VIII, Fig. 5).

Caption omissions cannot be recovered from the textual memory. Repetitive records accumulate, and the benchmark uses generous 15-metre spatial and two-minute temporal correctness thresholds (§§VI, IX).

## Research connections

- **Builds on:** Lin et al., *VILA* (CVPR 2024) — supplies the pretrained video captioner (§IV, reference 47).
- **Cites:** [[2022-grauman-ego4d]] — frames episodic memory as video question answering, then motivates actionable spatial outputs beyond textual answers (§I, reference 5).

## Relevance to Aligned

Our interpretation: this is a reproducible baseline for timestamped construction-video retrieval. Precise tool placement, object identity, execution quality, and evidence recovery would require richer retained observations and evaluation.

## Human notes
