---
year: 2026
venue: "arXiv preprint"
affiliations: ["Meta Reality Labs", "University of Virginia", "University of Illinois Urbana-Champaign"]
research_groups: [meta-wearables-ai-ml]
reviewed: false
tags: [method, video-memory, video-retrieval, efficient-processing, egocentric-video, training-free, rl]
---

# MemLife: Curating and Reasoning over Long-Term Egocentric Video Memories

MemLife writes entity-grounded episodic memories, while MemOpt trains the writer to preserve evidence that later questions can retrieve.

**Authors:** Guangzhi Xiong, Xinyuan Zhang, Xiao Yang, Hyokun Yun, Kai Zhang, Shiun-Zu Kuo, Hyeonjeong Ha, Xilun Chen, Kai Sun, Lucas Liang, Guangqiang Dong, Ejaz Ahmed, Ahmed A Aly, Anuj Kumar, Raffay Hamid, Aidong Zhang, Xin Luna Dong.
**Paper:** [PDF](../raw/2026-xiong-memlife.pdf) · [arXiv v1](https://arxiv.org/abs/2609.40195v1)
**Website:** Not found in checked sources.
**Code:** Not found in checked sources.
**Citations:** 0 ([OpenAlex](https://openalex.org/W7215043595), checked 2026-11-03).

![MemLife: Figure 2 from the paper](../assets/2026-xiong-memlife.png)

*Figure 2 from the original paper ([PDF page 4](../raw/2026-xiong-memlife.pdf#page=4)).*

## Problem and contribution

Long-term video QA can fail because evidence was never recorded or because the reader cannot find it. MemLife addresses both with an explicit writer–reader design. MemOpt then optimizes what the writer preserves without using noisy final-answer success as its only training signal (§§1–3).

## Approach

The writer combines each clip's frames and transcript into a timestamped description. It grounds named entities from speech and narrates from the wearer's perspective. Each episode is generated independently and stored with a text embedding, avoiding sequential dependence between written memories (§3.2, Figure 2).

The reader reformulates a question and its temporal scope, searches within that scope, fetches broader intervals when needed, and orders evidence chronologically before answering. The default reads text only. A separate MemLife-V variant can fetch source frames, recovering details that written memories missed.

MemLife can run without training. MemOpt applies GRPO only to the writer, combining token-level faithfulness, preservation of answer-relevant facts, and retrievability. Reader actions are cached within each training epoch to reduce reward variation (§3.3). Evaluation uses prebuilt memories rather than demonstrating continuous wearable operation.

## Evidence and limits

With a Qwen3.5-9B writer and reader, MemOpt raises accuracy from 56.50% to 60.35% on 623 held-out-subject SuperMemory-VQA questions and from 52.80% to 56.60% on 500 EgoLifeQA questions (Table 1, Appendix A.1). Backbone and cross-system tests support transfer, while mixed recall changes show that accuracy gains are not simply better retrieval (Tables 3–6).

The reported 0.68 MB/hour and 13.1 seconds/question on SuperMemory-VQA measure stored memory and reading. They exclude ingestion cost, and reading excludes model initialization (Appendix E). Dataset processing excludes 82 inaccessible SuperMemory questions (Appendix A). Text-only memory cannot recover unrecorded visual detail, and benchmarks do not establish construction-quality assessment.

## Research connections

- **Compares with:** [[2026-yeo-worldmm]] and [[2026-rege-egagent]] — evaluates graph-based memory systems under its benchmark setup (Table 1, Appendix A.2).
- **Builds on:** [[2026-alam-supermemory-vqa|SuperMemory-VQA]] — supplies training and evaluation histories, with held-out subjects (§4.1).

## Relevance to Aligned

Our interpretation: begin with inspectable episodic text and temporal retrieval, then consider writer training once worker-specific evidence and questions exist. Preserve source-video access for visual-quality claims.

## Human notes
