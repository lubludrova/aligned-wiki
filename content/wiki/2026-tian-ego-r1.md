---
year: 2026
venue: "IEEE Transactions on Pattern Analysis and Machine Intelligence"
affiliations: ["S-Lab, Nanyang Technological University", "A*STAR, Singapore", "Simon Fraser University", "Shanghai AI Lab"]
research_groups: [ntu-s-lab]
reviewed: false
tags: [video-memory, video-retrieval, video-qa, egocentric-video]
---

# Ego-R1: Chain-of-Tool-Thought for Ultra-Long Egocentric Video Reasoning

Ego-R1 trains a small controller to search hierarchical video memories and call visual tools when a question needs finer evidence.

**Authors:** Shulin Tian, Ruiqi Wang, Hongming Guo, Penghao Wu, Yuhao Dong, Xiuying Wang, Jingkang Yang, Hao Zhang, Hongyuan Zhu, Ziwei Liu.
**Paper:** [PDF](../raw/2026-tian-ego-r1.pdf)
**Website:** [Project website](https://egolife-ai.github.io/Ego-R1/)
**Code:** [Official repository](https://github.com/egolife-ai/Ego-R1)
**Source version:** arXiv 2506.13654v1, 16 June 2025. The authors report TPAMI 2026 publication under the expanded title “Ego-R1: Agentic Chain-of-Tool-Thought for Ultra-Long Egocentric Video Reasoning.” The journal article was not inspected. Results below follow the archived preprint.

![Ego-R1: Figure 1 from the paper](../assets/2026-tian-ego-r1.png)

*Figure 1 from the original paper ([PDF page 1](../raw/2026-tian-ego-r1.pdf#page=1)).*

## Problem and contribution

Days of video exceed ordinary model context, while a fixed retrieval pass may miss details needed by a question. Ego-R1 learns a sequence of evidence searches instead of relying only on a prompted agent. Its contribution combines a tool controller, synthetic training traces and a week-scale QA benchmark (§§3–5).

## Approach

Thirty-second video captions and aligned speech transcripts become timestamped logs, then progressively coarser summaries. A Qwen2.5-3B controller chooses a temporal level, keywords and time range for hierarchical retrieval. It can then question a video model about a short window or inspect a particular frame with a vision-language model. A separate long-context model helps consolidate the answer (§3, §6.1).

Supervised fine-tuning uses 25,000 synthetic tool-use traces. Subsequent group-relative policy optimization rewards correct final answers on a 4,400-question pool. This trains evidence navigation, not robot policies (§§4–5).

Memory comprises text summaries and accessible source footage, without persistent physical-object identities. Evaluation restricts footage to before the query timestamp, but memory construction is offline. Live ingestion and causal boundaries of coarse summaries are not independently validated.

## Evidence and limits

On the 300-question Ego-R1 benchmark, the same controller improves from 34.3% after supervised training to 46.0% after RL. Retrieval alone reaches 39.7%, supporting the value of visual tool calls (Tables 3–4). Cross-system comparisons use different frame budgets and external models, so the 3B controller size does not describe total system cost (Table 2).

Training and evaluation share the same six-wearer week. EgoLifeQA results exclude overlapping training questions only for Ego-R1, without specifying the remaining denominator, and cannot be read as a matched full-test ranking (Table 2 footnote). Code and training data are released, but complete ingestion cost, query latency and transfer to unseen workplaces remain unmeasured.

## Research connections

- **Builds on:** [[2025-yang-egolife]] — uses recordings and questions to construct training data and evaluation (§4.2, §6.1).
- **Compares with:** [[2024-fan-videoagent]] — evaluates an earlier tool-based video agent, with different evidence budgets (Table 2, §6.1).

## Relevance to Aligned

Our interpretation: learn when to refine a memory search and revisit source evidence. First establish reliable retrieval, timestamps and total operating cost before adding controller training.

## Human notes
