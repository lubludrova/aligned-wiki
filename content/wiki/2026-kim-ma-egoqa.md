---
year: 2026
venue: "arXiv preprint"
affiliations: ["KAIST", "New York University", "Samsung Electronics", "ETRI", "DeepAuto.ai"]
research_groups: [kaist-mlai, nyu-agentic-learning]
reviewed: false
tags: [dataset, benchmark, video-memory, video-retrieval, video-qa, egocentric-video, multi-person]
---

# MA-EgoQA: Question Answering over Egocentric Videos from Multiple Embodied Agents

MA-EgoQA tests reasoning across multiple camera wearers, with EgoMAS as a shared-memory retrieval baseline.

**Authors:** Kangsan Kim, Yanlai Yang, Suji Kim, Woongyeong Yeo, Youngwan Lee, Mengye Ren, Sung Ju Hwang.
**Paper:** [PDF](../raw/2026-kim-ma-egoqa.pdf) · [arXiv v2](https://arxiv.org/abs/2603.09827v2)
**Website:** [Project website](https://ma-egoqa.github.io/)
**Code:** [GitHub repository](https://github.com/KangsanKim07/MA-EgoQA)
**Citations:** 0 ([OpenAlex](https://openalex.org/W7134962445), checked 2026-11-03).

![MA-EgoQA: Figure 5 from the paper](../assets/2026-kim-ma-egoqa.png)

*Figure 5 from the original paper ([PDF page 9](../raw/2026-kim-ma-egoqa.pdf#page=9)).*

## Problem and contribution

A single worker's camera cannot explain everything a team did. MA-EgoQA asks systems to align observations across people and times. Its 1,741 multiple-choice questions cover social interaction, task coordination, theory of mind, temporal reasoning, and environmental interaction. The videos come from six people living together for seven days, rather than a construction site (§§3–4).

## Approach

EgoMAS retains individual caption memories and builds a shared event memory. Every ten-minute window, a central manager merges the agents' captions into records describing when, what, where, who, and how. These records provide a joint view while individual memories retain more specific evidence (§5, Figure 5).

For a question, BM25 retrieves relevant shared records. The manager then generates queries for selected agents, retrieves their memories, and combines individual and shared evidence into an answer. The default training-free baseline uses prepared text memories. Appendix H additionally tests retrieved video frames during answering, with mixed effects across categories (Table S11). Neither establishes live camera processing.

Benchmark construction uses generated questions, filtering for trivial or single-agent answers, cross-model checks, and human review. Four reviewers reduced 3,436 candidates to the final set (§4.2).

## Evidence and limits

EgoMAS with Gemini 2.5 Flash reaches 41.41%, compared with 36.93% for concatenated captions using that model. Chance is 20%, and an oracle-evidence configuration remains substantially better (Table 2). Shared memory and dynamic retrieval contribute separately in ablations (Table 4).

The reported 1.3-second latency uses a 100-question subset and a smaller backbone over prepared memories. It excludes the cost of constructing the video descriptions. A stronger embedding retriever improves accuracy over BM25 but costs more, so BM25 is a practical baseline, not the highest-accuracy option (Table 5). Domestic coordination and generated question distributions limit direct transfer to worksite quality assessment.

## Research connections

- **Builds on:** [[2025-yang-egolife]] — reuses synchronized multi-person recordings (§4.1).
- **Compares with:** [[2026-yeo-worldmm]] — adapts its single-stream retrieval to the multi-agent setting (§6).

## Relevance to Aligned

Our interpretation: the shared-event/individual-evidence split is useful for reconstructing team activity. Worker identity, clock alignment, and conflicting observations would need explicit validation before using it to attribute responsibility or skill.

## Human notes
