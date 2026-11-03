---
year: 2026
venue: "arXiv preprint"
affiliations: ["NVIDIA", "Clemson University"]
research_groups: []
reviewed: false
tags: [dataset, benchmark, spatial-understanding, state-changes, video-representation, video-qa]
---

# VANTAGE-Bench: Evaluating the Infrastructure AI Gap in Vision-Language Models

VANTAGE-Bench evaluates semantic, spatial and temporal understanding in operational camera views beyond ordinary video question answering.

**Authors:** Zaid Pervaiz Bhat, Nimra Nayyar, Arihant Jain, Lap Fung Chan, John Suchanek, Yu Wang, Varun Praveen, Tomasz Kornuta, Vidya Nariyambut Murali.
**Paper:** [PDF](../raw/2026-bhat-vantage-bench.pdf)
**Website:** [Project website](https://vantage-bench.org/)
**Code:** [Repository](https://github.com/Clemson-Capstone/VANTAGE-Bench)

**Source version:** arXiv 2609.09396v1. Results refer to this archived version rather than the changing website leaderboard.
**Citations:** 0 ([OpenAlex](https://openalex.org/W7212144841), checked 2026-11-03).

![VANTAGE-Bench operational domains and evaluation taxonomy](../assets/2026-bhat-vantage-bench.png)

*Figure 1. VANTAGE-Bench operational domains and evaluation taxonomy. Source: [original paper, PDF p. 4](../raw/2026-bhat-vantage-bench.pdf#page=4).*

## Problem and contribution

Construction monitoring needs localized people, objects and incidents from elevated cameras. Generic cinematic or egocentric benchmarks poorly cover those viewpoints and often hide temporal failures inside multiple-choice scores.

## Approach

The dataset contains 3,346 media assets and 35,027 annotations across warehouses, transport and smart spaces. Eight tasks include event verification, question answering, pointing, referring expressions, object localization, temporal localization, dense captioning and single-object tracking. Experts annotate and review the data, with a further sampled audit. Seventeen models receive standardized zero-shot prompts. Task-specific metrics measure coordinates, intervals, captions and tracking trajectories (§§3–5).

## Evidence and limits

The best reported temporal-localization result is 55.71 mIoU and dense-captioning score 37.28 SODA. These metrics should not be numerically compared as if they shared one accuracy scale. Tracking evaluates a single pass over the complete sampled sequence, not a causal online tracker. All tracking scenes are synthetic warehouses, and 20% of event-verification/VQA data is synthetic. Referring-expression and pointing sources also include aerial or vehicle-mounted views, so not every task uses fixed CCTV. Specialist trackers maintain roughly 80 tracking AUC while several VLMs deteriorate with longer horizons. Ground-truth labels remain held out. The public media/questions and harness support submission-based evaluation, without establishing live throughput or whole-shift false alarms (Appendices B–D).

## Research connections

- **Builds on:** PhysicalAI-SmartSpaces and DRIVE simulation — supply operational and synthetic scenes (§3, Appendix A).
- **Builds on:** VLMEvalKit, Duan et al. (2024) — provides the standardized model-evaluation infrastructure (§4).

## Relevance to Aligned

Our interpretation: a valuable geometry and evidence-grounding stress test before applying a VLM to construction cameras. Add real PPE visibility, occlusion, person identity continuity and causal incident timing. Dense captions can support daily reports only when attached to verified intervals and source frames.

## Human notes
