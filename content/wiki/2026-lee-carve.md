---
year: 2026
venue: "arXiv preprint"
affiliations: ["KAIST", "Qualcomm AI Research, Qualcomm Korea YH"]
research_groups: []
reviewed: false
tags: [dataset, benchmark, method, video-retrieval, video-qa, egocentric-video, training-free]
---

# Rethinking RAG in Long Videos: What to Retrieve and How to Use It?

CARVE selects an evidence representation per video chunk, while V-RAGBench separates retrieval quality from answer generation.

**Authors:** Yuho Lee, Jisu Shin, Nicole Hee-Yeon Kim, Jihwan Bang, Juntae Lee, Kyuwoong Hwang, Fatih Porikli, Hwanjun Song.
**Paper:** [PDF](../raw/2026-lee-carve.pdf) · [arXiv v2](https://arxiv.org/abs/2606.13141v2)
**Website:** Not found in checked sources.
**Code:** Not found in checked sources; the inspected v2 promises benchmark, code and evaluation scripts upon acceptance.
**Source version:** arXiv:2606.13141v2, 2 October 2026. No conference acceptance was established in this check.
**Citations:** 0 ([OpenAlex](https://openalex.org/W7164529186), checked 2026-11-03).

![CARVE / V-RAGBench: Figure 1 from the paper](../assets/2026-lee-carve.png)

*Figure 1 from the original paper ([PDF page 2](../raw/2026-lee-carve.pdf#page=2)).*

## Problem and contribution

A correct answer can conceal failed retrieval when a model guesses from priors. The work introduces evidence-localized evaluation and asks which modality and temporal granularity best represent each retrieved chunk, rather than selecting one representation for an entire question (§§1, 3–4).

## Approach

Offline preprocessing divides videos into two-minute chunks. Each receives four representations: visual keyframes, visual clip, textual keyframe descriptions and textual clip summary. CARVE retrieves candidates through all four indices, retaining each candidate's configuration tag (§§3, 5).

A multimodal reranker re-scores candidates under their retrieving configurations. For a chunk appearing under several tags, the highest-scoring one wins. The final top-five chunks enter the generator in those winning forms, interleaving visual and textual evidence. Pretrained embedding and reranking models are used without task-specific training. This searches inside one complete source video per question, not across an unrestricted multi-camera archive (Appendix B).

V-RAGBench contains 2,100 open-ended question/evidence/answer triples over 216 Ego4D and EgoLife videos lasting roughly 1–9 hours. Filtering removes shortcut-answerable questions and ambiguous recurring evidence. The split is 1,800 training and 300 test questions (§4).

## Evidence and limits

CARVE reaches Recall@5 0.603 versus the strongest baseline's 0.510, with nDCG@5 0.433. Qwen3-VL-8B answer pass rate is 0.352, judged by Qwen3.6-35B-A3B and averaged across three generation runs (Table 2). Baselines share the same chunk embeddings; these are adapted, configuration-controlled comparisons rather than reproductions of every original system. Removing recurring answer-bearing events improves diagnostic isolation but limits transfer to repetitive work.

## Research connections

- **Builds on:** [[2022-grauman-ego4d]] and [[2025-yang-egolife]] — provide the source recordings (§4).
- **Compares with:** [[2025-jeong-videorag]] and [[2025-luo-video-rag]] — adapted baselines isolate retrieval choices (§6, Appendix B.2).

## Relevance to Aligned

Our interpretation: test mixed visual/text retrieval and report localization separately from QA. Construction evaluation must additionally distinguish repeated similar operations and physical objects.

## Human notes
