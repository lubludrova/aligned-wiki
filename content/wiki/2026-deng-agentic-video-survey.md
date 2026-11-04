---
year: 2026
venue: "arXiv preprint"
affiliations: ["The University of Western Australia"]
research_groups: []
reviewed: false
tags: [survey, video-memory, video-retrieval, video-qa]
---

# Agentic Video Understanding: A Survey

Organizes video agents by the problems motivating adaptive evidence control, their state representations, learning mechanisms and evaluation requirements.

**Authors:** Xinyu Deng, Siwen Luo, Daochang Liu.
**Paper:** [PDF](../raw/2026-deng-agentic-video-survey.pdf) · [arXiv v2](https://arxiv.org/abs/2609.31713v2)
**Website:** [Survey repository](https://github.com/DXY0711/Awesome-Agentic-Video-Understanding)
**Code:** The linked repository is a curated bibliography, not an implemented video agent.
**Source version:** arXiv:2609.31713v2, 21 October 2026, first released 21 September 2026. Authors report DICTA 2026 acceptance on arXiv and in the repository, but a published proceedings record was not verified. This note covers the archived preprint.
**Citations:** 0 ([OpenAlex](https://openalex.org/W7214779667), checked 2026-11-04).

![Four video-agent state representations, from selected observations to a revisable world state](../assets/2026-deng-agentic-video-survey.png)

*Figure 3. Four video-agent state-space paradigms. Source: [archived PDF, p. 5](../raw/2026-deng-agentic-video-survey.pdf#page=5).*

## Problem and contribution

Long videos require decisions about where to inspect, what to retain, whether evidence is sufficient and when to respond. The survey defines an agent through intermediate evidence state and adaptive actions that change evidence access, state, tools or termination. Fixed-sampling, one-pass video models fall outside its core scope (§II).

## Approach

The core loop selects an action from the task, current state and available video, obtains an observation, then updates state before continuing or stopping. Offline access permits revisiting the complete video, whereas streaming decisions must use only the observed prefix (§II-B).

Four challenge-to-design links organize the literature: context bottlenecks motivate hierarchical evidence memory, sparse evidence motivates active acquisition, temporal causality motivates state tracking, and multimodal ambiguity motivates specialized coordination. A method may address several challenges, although the survey assigns a primary one (§III).

A separate axis describes the operative state: discrete visual observations, temporally ordered observations, associated entities and evidence, or a partial world state revised as observations arrive. The relational category does not require a literal graph implementation. These representations describe different retained structure, not measured superiority (§IV, Figure 3).

Training-free control, supervised imitation and reinforcement learning are treated separately from representation. Trajectory traces, grounding annotations and preference/reward signals are also distinguished, preventing a memory format from being mistaken for a training strategy (§§V–VI).

## Evidence and limits

The corpus primarily covers 2024–2026 systems, including recent preprints. Tables I–III classify methods and existing benchmarks rather than rerunning them in a common experiment. The survey introduces no video dataset or evaluation benchmark (§§II-C, V, VII).

Evaluation distinguishes full-video and causal-prefix access, answer quality and agent behavior. Grounding, timing, cost and reliable stopping need additional assessment. The taxonomy does not establish that more agents, persistent graphs or RL improve construction-video performance (§§VII–VIII).

## Research connections

- **Cites:** [[2026-yeo-worldmm]] — complementary episodic, semantic and visual memories illustrate hierarchical evidence organization (§III-A, §IV-C, reference 43).
- **Cites:** [[2026-tang-takusen]] — asynchronous event boundaries illustrate timing and trajectory supervision (§VI-A, reference 86).

## Relevance to Aligned

Our interpretation: separate evidence retention, targeted reinspection and current-state updates when choosing components. Evaluate each under explicit video-access and cost budgets, with source-linked evidence and decisions to wait or stop. The survey offers an architectural checklist, not a validated worker-assistance pipeline.

## Human notes
