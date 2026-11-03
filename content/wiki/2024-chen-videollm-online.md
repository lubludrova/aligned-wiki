---
year: 2024
venue: "CVPR"
affiliations: ["National University of Singapore", "Reality Labs Research, Meta"]
research_groups: []
reviewed: false
tags: [dataset, method, video-representation, efficient-processing, egocentric-video, video-qa]
---

# VideoLLM-online: Online Video Large Language Model for Streaming Video

VideoLLM-online trains a video language model to alternate between silent visual ingestion and temporally aligned language responses.

**Authors:** Joya Chen, Zhaoyang Lv, Shiwei Wu, Kevin Qinghong Lin, Chenan Song, Difei Gao, Jia-Wei Liu, Ziteng Gao, Dongxing Mao, Mike Zheng Shou.
**Paper:** [PDF](../raw/2024-chen-videollm-online.pdf)
**Website:** [Project website](https://showlab.github.io/videollm-online/)
**Code:** [GitHub repository](https://github.com/showlab/videollm-online)

**Source version:** arXiv:2406.11816v1, 17 June 2024, including supplementary material. CVPR 2024 publication confirmed by CVF and official repository.
**Citations:** 78 ([OpenAlex](https://openalex.org/W4402727512), checked 2026-11-03).

![VideoLLM-online streaming inference with a continuous key-value cache](../assets/2024-chen-videollm-online.png)

*Figure 5. VideoLLM-online streaming inference with a continuous key-value cache. Source: [original paper, PDF p. 7](../raw/2024-chen-videollm-online.pdf#page=7).*

## Problem and contribution

Repeatedly prompting an offline video model wastes decoding time and produces redundant responses. The LIVE framework makes response timing part of training and supports narration or instruction-conditioned dialogue over incoming frames (§3.1).

## Approach

A frozen image encoder and learned projector feed visual tokens into Llama-2/3, interleaved with dialogue. Besides ordinary language loss, a streaming EOS objective teaches the model to remain silent on frames where no response is required. EOS targets are supervised without inserting every silence token into the conversational context. Inference adjusts the EOS probability with a threshold (§§3.1, 3.3–3.4).

Training dialogues come from timestamped Ego4D narrations and LLM-transformed offline annotations. Continuous KV caching retains prior visual/text context. Image encoding can continue while language generation runs, buffering delayed frames. This avoids dropping incoming images but does not mean the language model keeps reasoning over new frames during its own answer (§§3.2–3.4, Figure 5).

## Evidence and limits

On Ego4D narration validation, the default 7B model achieves TimeDiff 2.32 seconds and fluency 42.6%, versus 6.47 seconds and 11.1% for interleaved dialogue. These are annotation-alignment metrics, not safety-event recall (Table 1). The reported five-minute-stream inference uses 18.2 GB and 13.5 fps on an A100, with inputs sampled at 2 fps.

Most paper experiments compress each frame to one CLS token. The released 8B demonstration variant uses ten tokens per frame for additional detail and shorter supported context. Neither long-context capacity nor throughput demonstrates preservation of small PPE cues or indefinite memory. The repository provides code and checkpoint references (§4.1, Table 1, §3.3 footnote).

## Research connections

- **Builds on:** LLaVA — reuses image-encoder/projector/LLM structure while changing supervision and temporal dialogue format (§3.3).
- **Cites:** [[2024-zhou-streaming-dvc]] — identifies concurrent causal captioning work and contrasts its fixed decoding points with dialogue (§2).

## Relevance to Aligned

Our interpretation: A foundational reproducible baseline for learning when to emit an event and when to stay silent. Construction monitoring needs richer spatial evidence, calibrated missed-event/false-alarm evaluation and a memory policy beyond the bounded demonstration context.

## Human notes

