---
year: 2026
venue: "arXiv preprint"
affiliations: ["Shanghai Jiao Tong University", "Eastern Institute of Technology, Ningbo", "Shenzhen Institutes of Advanced Technology, Chinese Academy of Sciences", "Zhongguancun Academy, Beijing", "Dalian University of Technology", "Beihang University", "Hong Kong Polytechnic University"]
research_groups: []
reviewed: false
tags: ["video-memory", "video-qa", "efficient-processing", "egocentric-video"]
---

# APM-Bench: Benchmarking cross-Session Persistent Memory for Real-World Egocentric Streaming Video Assistants

Evaluates persistent video memory across interrupted sessions, jointly testing recall, current perception, proactive responses, missing evidence, storage and latency.

**Authors:** Jianguo Huang, Jinming Liu, Qiyao Wang, Liang Xu, Jianhang Li, Zhimian Wen, Mingda Li, Shule Lu, Zhicheng Wang, Yuhan Guo, Xin Jin, Wenjun Zeng.
**Paper:** [PDF](https://arxiv.org/pdf/2609.37559v2) · [Primary record](https://arxiv.org/abs/2609.37559v2)
**Website:** [Project website](https://jianguo-huang11.github.io/APM-Bench/). Resolved in the final link check after an earlier access failure.
**Code:** [Author repository](https://github.com/Jianguo-Huang11/APM-Bench)
**Source version:** arXiv:2609.37559v2, 12 October 2026, 33 pages.

## Problem and contribution

A continuous-video benchmark does not establish that memory survives session boundaries or remains useful after interruptions. APM-Bench organizes related activities from existing recordings into 104 trajectories containing 549 sessions and 2,719 candidates. It separates cross-session understanding, current perception and adaptive responses rather than treating them as one QA capability (§3).

## Approach

EgoLife and HD-EPIC recordings → activity-related trajectories and timestamped sessions → stored historical representation plus current causal video prefix → answer or silence/intervention decision (Figs. 1, 5).

Raw replay, text summaries and specialized memory methods share the evaluation protocol, but use different backbones and storage representations. Adaptive-response probes are independent runtime instances. A separate evidence-availability test retains only the two most recent completed sessions and adds an insufficient-evidence option. Storage measures prior-session state, excluding the ongoing session (§3.3, Appendix B.4).

## Evidence and limits

Table 13 separates 130 evidence-available questions from 130 evidence-unavailable cases. Gemini 3.6 Flash selects correct answers on 85.38% of the former but detects missing evidence on 59.23% of the latter. These are different denominators, not one QA score.

Table 3 shows a utility/storage trade-off: the same Gemini model scores 69.37 versus 47.50 on cross-session understanding with raw video versus text summaries. Its storage entries are 3.01 GiB versus 3.09 KiB per video-hour. This does not include an end-to-end site ingestion workload, and model-family comparisons are not controlled memory-only ablations.

Organized trajectories average about 69 video minutes, despite longer real-world spans (Appendix C.4). Independent probes do not establish autonomous continuous intervention. The checked repository still advertises a pending code/data release, so reproduction remains unverified.

## Research connections

- **Builds on:** [2025-yang-egolife](/notes/2025-yang-egolife/) and [2025-perrett-hd-epic](/notes/2025-perrett-hd-epic/) supply source recordings (§3.1).
- **Compares with:** [2025-di-rekv](/notes/2025-di-rekv/) supplies a KV-cache baseline (Table 3).

## Relevance to Aligned

Our interpretation: use this protocol to test persistence between shifts and explicitly distinguish missing historical evidence from a wrong answer. Add separate failure labels for capture gaps, discarded memory and retrieval misses. The benchmark does not validate multi-worker construction memory at our archive scale.

## Human notes
