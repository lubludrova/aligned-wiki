---
year: 2026
venue: "Findings of EMNLP"
affiliations: ["Zhejiang University", "South China University of Technology", "Lenovo Group Limited"]
research_groups: []
reviewed: false
tags: [method, video-memory, video-retrieval, video-qa, efficient-processing, egocentric-video, training-free]
---

# EM²Mem: Event-Centric Multimodal Memory for Large Language Models

EM²Mem aligns captions, speech, visual evidence and provenance into shared event records before retrieval, trading more ingestion work for cheaper repeated queries.

**Authors:** Yijun Chen, Yaqi Zheng, Yanya Li, Boyi Xiao, Buqiang Xu, Shuofei Qiao, Jizhan Fang, Xinle Deng, Yunzhi Yao, Xuehai Wang, Liuxin Zhang, Hui Li, Huajun Chen, Shumin Deng.
**Paper:** [PDF](../raw/2026-chen-em2mem.pdf)
**Website:** Not found in checked sources.
**Code:** [Official research implementation](https://github.com/zjunlp/LightMem-Ego/tree/main/research/em2mem)
**Source version:** arXiv 2609.00551v1, 1 September 2026. Publication verified in [Findings of EMNLP 2026](https://aclanthology.org/2026.findings-emnlp.903/). Numerical claims follow the archived preprint.
**Citations:** 0 ([OpenAlex](https://openalex.org/W7206213724), checked 2026-11-03).

![EM²Mem: Figure 2 from the paper](../assets/2026-chen-em2mem.png)

*Figure 2 from the original paper ([PDF page 3](../raw/2026-chen-em2mem.pdf#page=3)).*

## Problem and contribution

Independent caption, frame and transcript stores can return disconnected fragments that an answer model must reconcile. EM²Mem instead binds heterogeneous evidence to a common temporal address during construction. Its contribution is event-level organization and readout, rather than a new graph formalism (§3).

## Approach

Thirty-second anchors collect captions, transcripts, sampled keyframes, structured fields and source provenance. Three-minute, ten-minute and one-hour views add surrounding context. An episodic graph links events, while a semantic graph summarizes recurring entities and relationships (§3, Appendix A).

At query time, semantic search retrieves event candidates. One-hop graph expansion adds related evidence, and an LLM selector assembles a compact context for answer generation. Raw keyframes remain available for targeted visual checks. Construction and answering use prompted models without new end-to-end training.

The released research pipeline is offline. A controlled retrieval experiment applies causal filtering, but headline results do not establish live availability of coarse summaries or globally consolidated facts.

## Evidence and limits

The main EgoLifeQA evaluation uses 500 questions from one wearer's 44.3-hour recording. Accuracy is 66.0%, versus 64.0% for a matched WorldMM reproduction and 65.6% originally reported by WorldMM (Table 1).

With identical records, models and evidence budgets, aligned retrieval improves coverage at a 300-second budget by 5.4 percentage points, with a 95% interval of +2.6 to +8.3. The corresponding QA increase from 60.0% to 63.0% is statistically uncertain, with an interval of −0.8 to +6.8 (Table 12, Appendix C.4).

Mean query latency falls from 459.00 to 98.21 seconds, a 4.67× improvement. The separate 37.4× throughput result includes eight-worker execution and baseline implementation differences (Table 2, Appendix B.2). Construction requires 89.23M versus 60.55M tokens. Including 500 queries, totals are slightly higher: 104.50M versus 102.58M (Tables 9–10). Query savings therefore do not imply lower total token use at this workload.

Released code supports inspection, but multi-worker construction sites, causal streaming and execution quality remain untested.

## Research connections

- **Compares with:** [[2026-yeo-worldmm]] — reports published and reproduced accuracy, plus matched cost measurements (Tables 1–2, Appendix C).
- **Compares with:** [[2026-tian-ego-r1]] — includes learned tool navigation among memory and video-agent baselines (Table 1).

## Relevance to Aligned

Our interpretation: bind evidence and provenance before search, then measure retrieval coverage separately from answer accuracy. Evaluate ingestion plus the expected number of queries before selecting the memory design.

## Human notes
