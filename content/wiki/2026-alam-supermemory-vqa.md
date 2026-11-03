---
year: 2026
venue: arXiv preprint
affiliations:
- The Ohio State University
- Meta
research_groups:
- osu-aiot-mlsys
reviewed: false
tags:
- video-memory
- video-retrieval
- video-qa
- egocentric-video
---

# SuperMemory-VQA: An Egocentric Visual Question-Answering Benchmark for Long-Horizon Memory

Evaluates practical wearable-memory questions with explicit unanswerability and distinctions between precise and vague answers.

**Authors:** Samiul Alam, Shakhrul Iman Siam, Michael J. Proulx, James Fort, Richard Newcombe, Hyo Jin Kim, Mi Zhang.

**Paper:** [PDF](../raw/2026-alam-supermemory-vqa.pdf) · [arXiv](https://arxiv.org/abs/2606.00825)

**Website:** [Project website](https://supermemory-vqa.github.io/)

**Code:** [GitHub repository](https://github.com/AIoT-MLSys-Lab/supermemory-vqa) — annotation pipeline and review frontend. [Dataset](https://huggingface.co/datasets/OSU-AIoT-MLSys-Lab/SuperMemory-VQA).

**Source version:** arXiv 2606.00825v1, 30 May 2026. The repository says under review at NeurIPS 2026 Datasets and Benchmarks. Acceptance has not been verified.

![SuperMemory-VQA benchmark task dimensions](../assets/2026-alam-supermemory-vqa.png)

*Figure 1. SuperMemory-VQA benchmark task dimensions. Source: [original paper, PDF p. 2](../raw/2026-alam-supermemory-vqa.pdf#page=2).*

## Problem and contribution

A useful memory assistant should recognize when the recording cannot support an answer. SuperMemory-VQA studies practical questions about objects, intentions, scenes, timelines, conversations and contextual retrieval. Four-option questions distinguish correct, vague, wrong and unanswerable responses, adding evidence sufficiency to recall accuracy.

## Approach

Ten participants recorded 52.9 hours with Aria glasses during loosely scripted activities in and around a simulated home. Only three participants recorded across multiple days, up to two weeks. Captions, transcripts and person information form a consolidated ledger. Planning, verification, retrieval and enhancement agents generate questions, followed by human checking against source video. The result is 4,853 question–answer pairs.

The paper evaluates Video-RAG and an adapted EgoButler with ten model backbones. Video-RAG retrieves transcript, OCR and object information from 30-minute shards and supplies selected frames. EgoButler searches short-clip captions and hierarchical summaries. Evidence access stops at the question's end time. Historical retrieval remains allowed, so this is not a bounded-state online-ingestion guarantee.

## Evidence and limits

Gemini-3-Flash with Video-RAG reaches 61.0% answer accuracy and 83.9% answerability F1, versus 54.1% and 71.2% with EgoButler (Table 2). Answerability F1 measures a binary decision within this multiple-choice setting, not calibrated confidence in open-ended deployment. A text-only control reaches 23.8% against 25% chance, but covers only one participant and one model (Table 3).

The collection is small and partly scripted. Gemini-generated annotations can favor related model styles, and reviewers familiar with sessions are not independent blind auditors. Released gaze, IMU and SLAM data are not used by the reported baselines. A perceived-usefulness survey does not establish productivity or safety outcomes.

The release includes annotation code and data, with redacted transcripts instead of raw audio. The dataset card specifies CC-BY-NC-SA-4.0, differing from the paper's less specific CC-BY-NC wording. Public labels require disclosure if used in later training.

## Research connections

- **Compares with:** [[2025-yang-egolife]] — adapts EgoButler as a benchmark baseline (§4.1, Table 2).

## Relevance to Aligned

Our interpretation: use the abstention distinction when a camera missed a crucial operation. Connect spoken plans with later visual evidence, while separately validating unscripted work sites, unseen workers and open-ended uncertainty.

## Human notes
