---
year: 2026
venue: "CVPR"
affiliations: ["University of Rochester", "Sony Group Corporation"]
research_groups: []
reviewed: false
tags: [method, video-representation, efficient-processing, sft]
---

# Asynchronous Temporal Modeling with Two-Agent Framework for Streaming Dense Video Captioning

Takusen pairs a small boundary detector with a larger captioner to separate when an event should be described from what its description should say.

**Authors:** Yolo Y. Tang, Chao Huang, Susan Liang, Jing Bi, Yicheng Wang, Daiki Shimada, Chenliang Xu.
**Paper:** [PDF](../raw/2026-tang-takusen.pdf)
**Website:** Not found in checked sources.
**Code:** Not found in checked sources.

**Source version:** CVPR 2026 accepted proceedings PDF, 12 pages.
**Citations:** Unavailable (OpenAlex, checked 2026-11-03. No identity-matched record found after title and acronym searches).

![Takusen: Figure 1 from the paper](../assets/2026-tang-takusen.png)

*Figure 1 from the original paper ([PDF page 1](../raw/2026-tang-takusen.pdf#page=1)).*

## Problem and contribution

Silence-heavy streaming training can make a captioner's response threshold brittle. Takusen moves event-boundary decisions to an Oracle agent that sends explicit start/end messages to a Listener, rather than relying solely on the Listener's silence probability (§§1, 3).

## Approach

The Oracle uses sparse 1 fps inputs with CM2 or VideoLLaMA3-2B. The Listener uses denser 2 fps inputs, SigLIP and Llama-3-8B. Start messages acknowledge an event and end messages trigger captions. Uniform fixed decoding points supplement predicted boundaries, so the final system combines event-driven and periodic output (§§3.2–3.4).

The formal timing condition allows the Oracle to run ahead of the Listener, while both remain behind the currently available stream. This is not future access relative to acquisition, but it permits a lagging captioner. The Listener is adapted with LoRA and projector training on dense event labels, using text and silence objectives. Long context replaces a separate external memory mechanism (§§3.3–3.5).

## Evidence and limits

On visual-only YouCook2, Takusen reaches CIDEr 40.7 and F1 37.0, compared with streaming Vid2Seq's 32.9 and 24.1. ActivityNet CIDEr rises from streaming GIT's 41.2 to 43.7 (Table 1). Removing fixed decoding points reduces ActivityNet CIDEr to 12.3 with CM2, despite F1 remaining 53.5. Boundary-aware oracle input reaches CIDEr 107.5, exposing a substantial localization bottleneck (Table 3).

The reported A6000 48 GB and 16–20 hours describe training, not inference latency. Sampling rates and asynchronous design do not establish camera-to-caption delay or sustainable multi-camera throughput. Evaluation remains on short benchmark videos. No official code or project release was identified in the checked paper and search.

## Research connections

- **Builds on:** [[2024-chen-videollm-online]] — draws on the combined silence/text training objective (§3.5).
- **Compares with:** [[2024-zhou-streaming-dvc]] — compares against streaming GIT/Vid2Seq and incorporates fixed decoding points alongside boundary triggers (§3.4, Table 1).

## Relevance to Aligned

Our interpretation: A strong observer/verifier pattern for independently extracting events as a worksite stream evolves. Testing should measure both event-time localization and actual delivery delay, with duplicate, missed and overlapping events included. It does not yet provide report-ready identities or calibrated safety decisions.

## Human notes

