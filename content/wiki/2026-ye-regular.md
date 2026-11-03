---
year: 2026
venue: "UIST"
affiliations: ["The Hong Kong University of Science and Technology"]
research_groups: []
reviewed: false
tags: ["procedure-understanding", "execution-quality", "egocentric-video", "real-world-evaluation"]
---

# RegulAR: Graph-Grounded Error Recognition and Assistance for Procedural Tasks in Augmented Reality

RegulAR combines an instruction-derived dependency graph with periodic video observations to track procedural progress and deliver error-specific AR assistance.

**Authors:** Yi-Lin Ye, Jindu Wang, Hiu Tung Wong, Shuchang Xu, Huamin Qu, Wong Kam-Kwai.
**Paper:** [PDF](../raw/2026-ye-regular.pdf)
**Website:** Not found in checked sources.
**Code:** Not found in checked sources.

**Source version:** arXiv:2608.26715v1, 27 August 2026. The title page identifies UIST 2026 and DOI 10.1145/3830398.3830593.

![RegulAR: Figure 3 from the paper](../assets/2026-ye-regular.png)

*Figure 3 from the original paper ([PDF page 5](../raw/2026-ye-regular.pdf#page=5)).*

## Problem and contribution

Most procedural assistants present the next instruction without retaining explicit prerequisites, completed actions or the consequences of mistakes. RegulAR makes these states inspectable and uses them to regulate both recognition and intervention (§4).

## Approach

A GPT-5 parser turns instructions into a hierarchical dependency graph with observable completion criteria, example errors and skip-risk metadata. Every five seconds, a batch MLLM receives recent headset frames sampled at 1 fps and the current graph state. It predicts step, action and status. Graph checks suppress repeated observations and distinguish missing prerequisites from permissible reordering. Execution errors come from the visual model, while dependency violations identify omissions (§§4.1–4.2, Figure 3).

An impact score combines affected downstream actions and estimated risk to choose the salience of AR feedback. The Unity application runs on Quest 3 with a Modal backend, Gemini 2.0 Flash-Lite batch inference and a separate Gemini live-audio model. The five-second cycle is a sampling policy, not a measured end-to-end response latency (§§4.3–4.4).

## Evidence and limits

Twelve participants completed egg and candle tasks in a counterbalanced within-subject comparison. Action accuracy was 0.90 over 535 evaluated observations versus 0.69 over 525 for the prompt-only baseline. Crucially, state/error correctness was not evaluated when action recognition was wrong, and repeated observations were merged. Thus Table 1 does not establish unconditional error recall (§6.2).

Participants preferred the graph-based system, but six reported recognition delays. The small controlled study, short tasks and different error counts between conditions limit generalization. Perceived recovery support is stronger evidence here than a demonstrated improvement in recovery success (§§5.2–7).

## Research connections

- **Cites:** G2Vid, Dvornik et al. (2022) — motivates representing alternative valid execution orders with task graphs (§4.1).
- **Cites:** [[2024-lee-egoper]] — discusses task-graph approaches to procedural error detection and their full-video alignment requirements (§2.2, reference 38).

## Relevance to Aligned

Our interpretation: A particularly relevant design for persistent progress state, prerequisite checks and graded intervention. Transferring it to construction would require observable task criteria, worker-specific state and evaluation under occlusion, concurrency and network delay. Its error vocabulary should not automatically define unsafe behavior.

## Human notes

