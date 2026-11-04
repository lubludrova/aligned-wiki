---
year: 2026
venue: "arXiv"
affiliations: ["University of New South Wales", "University of Southern Queensland"]
research_groups: []
reviewed: false
tags: [method, video-memory, spatial-understanding, execution-quality, efficient-processing, sft, self-supervised-learning]
---

# From 3D Perception to Safety Reasoning: A Graph-Based Framework for Real-Time Underground Mine Monitoring

The framework converts colored point-cloud streams into scene graphs, immediate rule alerts, contextual language-model assessments, and retrieved historical evidence.

**Authors:** Pasindu Ranasinghe, Simit Raval, Dibyayan Patra, Bikram Banerjee, Ismet Canbulat.
**Paper:** [PDF](../raw/2026-ranasinghe-safety-reasoning.pdf) · [arXiv](https://arxiv.org/abs/2606.03460)
**Website:** Not found in checked sources.
**Code:** Not found in checked sources.

**Source version:** Inspected arXiv:2606.03460v1, 2 June 2026. arXiv lists ESWA (2026), 134601. Crossref for [the related journal DOI](https://doi.org/10.1016/j.eswa.2026.134601) instead records volume 334, February 2027, and the changed subtitle “an intelligent hybrid framework.” This note describes the 2026 preprint, not an independently checked journal version.
**Citations:** 0 ([OpenAlex](https://openalex.org/W7163413338), checked 2026-11-03).

![Graph-based mine safety reasoning: Figure 1 from the paper](../assets/2026-ranasinghe-safety-reasoning.png)

*Figure 1 from the original paper ([PDF page 8](../raw/2026-ranasinghe-safety-reasoning.pdf#page=8)).*

## Problem and contribution

Immediate proximity rules miss recurring interactions and slowly developing hazards. The paper connects geometric perception to structured, traceable reasoning at different timescales. Underground mining supplies the application setting, with shared personnel–machine spaces, occlusion, and limited annotated data.

## Approach

LiDAR–camera data become colored point clouds. A sparse Minkowski UNet uses contrastive pretraining followed by supervised segmentation. Segmented instances and uncertainty clusters become scene-graph nodes, with spatial relations and tracked motion carried into a rolling ten-second temporal graph. Deterministic rules check proximity, trajectory convergence, and related conditions independently of Qwen2.5-3B contextual reasoning. Selected histories are stored as graph summaries and retrieved through GraphRAG when persistence, uncertainty, or recurrence triggers additional analysis (§§2.2–2.6). Outputs reference object identities and evidence. The archive also stores prior interpretations, so it is not purely raw observation memory.

## Evidence and limits

Evaluation uses continuous streams with approximately 95% normal graph snapshots and 115 scripted hazard instances. Scenarios combine Gazebo simulations and controlled object placement into real roadway scans, with programmatic onset times and one hazard introduced at a time (§3.2, Table 3). Coverage rises from 65/115 with rules to 87/115 with contextual reasoning and 107/115 with historical retrieval. These results are not natural-incident field validation.

Table 7 separates 86.3 ms frame processing at a 4 Hz input rate, 6.7-second LLM assessments every ten seconds, and approximately 9.7 seconds of additional GraphRAG processing on an RTX 4080. The abstract's 30 FPS applies to segmentation only. Zero baseline false positives are reported for the rule layer, not established for every reasoning layer. Table 6 identifies invalid structured outputs and missed gradual changes caused by lossy summaries.

## Research connections

- **Compares with:** PointNet++ and Point Transformer V3 for segmentation (Table 2), and direct PointLLM prompting for scene interpretation (§3.2.3).
- **Builds on:** GraphRAG-style retrieval using LlamaIndex and Qdrant (§2.6).

## Relevance to Aligned

Our interpretation: a strong architectural reference for fast geometric checks plus slower context and recurrence analysis. Construction RGB cameras, trustworthy observation histories, overlapping events, and complete daily reports remain untested adaptations.

## Human notes
