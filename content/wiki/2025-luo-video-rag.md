---
year: 2025
venue: "NeurIPS"
affiliations: ["Xiamen University", "Nanjing University", "University of Rochester"]
research_groups: []
reviewed: false
tags: [method, video-retrieval, video-qa, efficient-processing, training-free]
---

# Video-RAG: Visually-aligned Retrieval-Augmented Long Video Comprehension

Video-RAG augments an existing video model with question-relevant speech, visible text and object information extracted from the supplied video.

**Authors:** Yongdong Luo, Xiawu Zheng, Guilin Li, Shukang Yin, Haojia Lin, Chaoyou Fu, Jinfa Huang, Jiayi Ji, Fei Chao, Jiebo Luo, Rongrong Ji.
**Paper:** [PDF](../raw/2025-luo-video-rag.pdf) · [arXiv v4](https://arxiv.org/abs/2411.13093v4)
**Website:** [Project website](https://video-rag.github.io/)
**Code:** [Official repository](https://github.com/Leon1207/Video-RAG-master)
**Source version:** arXiv:2411.13093v4, 23 November 2025, camera-ready NeurIPS version with supplementary material. First preprint appeared in 2024.
**Citations:** 9 ([OpenAlex](https://openalex.org/W4404648887), checked 2026-11-03).

![Video-RAG retrieval augmentation compared with alternative approaches](../assets/2025-luo-video-rag.png)

*Figure 1. Video-RAG retrieval augmentation compared with alternative approaches. Source: [original paper, PDF p. 2](../raw/2025-luo-video-rag.pdf#page=2).*

## Problem and contribution

Sparse frames can omit speech, readable text and object details. Increasing the visual context is expensive and need not improve answers. Video-RAG adds a single retrieval stage over auxiliary information without fine-tuning the video model (§§1, 3).

## Approach

Input is a complete, already selected video and a question. The model first uses the question alone to request relevant speech, physical entities and desired object properties. Whisper transcribes audio; EasyOCR extracts frame text. Contriever embeddings and FAISS support semantic retrieval of speech and OCR chunks (§§3.2–3.4).

For objects, CLIP selects promising frames for the requested entities, and APE performs open-vocabulary detection. Coordinates become text describing object locations, counts and relative positions. Relevant auxiliary text is organized chronologically and supplied alongside sampled video frames and the original question to the existing LVLM (§3.5, Figure 2).

This is training-free augmentation of prepared video QA. It neither selects the correct recording from a multi-camera archive nor maintains persistent physical-object identities.

## Evidence and limits

Table 1 reports LongVA-7B with 128 frames at 52.6% on Video-MME without subtitles, 56.0% with subtitles and 62.0% with Video-RAG. The gain over the subtitle-equipped baseline is 6.0 percentage points. LLaVA-Video-72B improves from 75.9% with subtitles to 77.4%. MLVU and LongVideoBench are also evaluated (Tables 2–3).

Auxiliary recognition errors can enter answers, and generated object counts or transcripts are not ground truth. Supplementary Table 8 separates database construction from query inference; the short incremental inference figure must not be interpreted as processing a new video end to end. Repository pipeline and evaluation files were inspected statically, without running models.

## Research connections

- **Compares with:** [[2024-fan-videoagent]] — supplementary §§B–C compare against an agentic baseline on a Video-MME subset.
- **Cites:** [[2025-jeong-videorag]] — related work distinguishes corpus retrieval from auxiliary-text augmentation (§2).

## Relevance to Aligned

Our interpretation: combine speech, labels and object evidence when reading retrieved footage, retaining each source's provenance. Spoken claims about completion still require separate visual or procedural verification.

## Human notes
