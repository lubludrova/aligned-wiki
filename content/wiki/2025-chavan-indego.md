---
year: 2025
venue: "NeurIPS, Datasets and Benchmarks Track"
affiliations:
  - Fraunhofer IPK, Berlin
  - Technical University of Berlin
  - University of Tübingen
  - RWTH Aachen University
  - Leibniz University Hannover
research_groups: []
reviewed: false
tags: [dataset, benchmark, procedure-understanding, execution-quality, video-qa, egocentric-video, multi-person]
---

# IndEgo: A Dataset of Industrial Scenarios and Collaborative Work for Egocentric Assistants

IndEgo provides multimodal industrial-work recordings and benchmarks for mistake detection, situated reasoning, and understanding two workers collaborating on a task.

**Authors:** Vivek Chavan, Yasmina Imgrund, Tung Dao, Sanwantri Bai, Bosong Wang, Ze Lu, Oliver Heimann, Jörg Krüger.

**Paper:** [Stored PDF](../raw/2025-chavan-indego.pdf)
**Website:** https://indego-dataset.github.io/
**Code:** https://github.com/Vivek9Chavan/IndEgo/
**Dataset:** https://huggingface.co/datasets/FraunhoferIPK/IndEgo
**Source version:** arXiv:2511.19684v1, 24 November 2025, 53 pages including appendices and checklist. NeurIPS 2025 Datasets and Benchmarks publication is independently confirmed by the proceedings. This note follows the stored arXiv version.
**Citations:** 1 ([OpenAlex](https://openalex.org/W4417077289), checked 2026-11-03).

![IndEgo industrial activities and multimodal annotations](../assets/2025-chavan-indego.png)

*Figure 1. IndEgo industrial activities and multimodal annotations. Source: [original paper, PDF p. 1](../raw/2025-chavan-indego.pdf#page=1).*

## Problem and contribution

Existing procedural datasets often center on stationary tabletop activities. IndEgo adds mobile, physically demanding industrial scenarios: assembly/disassembly, inspection/repair, logistics, and woodworking. Twenty participants contribute 3,460 ego recordings totaling 197.1 hours and 1,092 exo recordings totaling 96.8 hours. Collaboration includes equal partners, supervision, and teacher–student demonstrations, with both workers wearing cameras (§3, Appendix B).

## Approach

Project Aria captures RGB, audio, gaze, and motion. Processed outputs include hand poses, trajectories, and semi-dense point clouds. Participants annotate their own actions, followed by another person's review. The release includes task graphs, step labels, mistake descriptions, narration transcripts, and summaries. Error data combines deliberately introduced and spontaneous mistakes (§§3–4, Appendices F–K).

This is a dataset and benchmark suite, not one deployed assistant architecture. Zero-shot VLM baselines receive clips and explicit prompts describing expected actions or known mistakes. Learned baselines extract step embeddings from pretrained VLMs and train an MLP or transformer classifier with higher weights for mistakes. Inference classifies supplied segments. The early-detection variant exposes only their first half, which does not establish an automatic streaming segmentation pipeline. Collaborative baselines assign actions and roles to the two wearers, while QA combines video with question options and uses a separate LLM judge (Appendices I, M).

## Evidence and limits

The mistake benchmark has 1,166 recordings over 25 tasks. Gemini's zero-shot F1 is 40.9%, versus 39.5% for VideoLLaMA3 features with an MLP (Table 3). On singular-action QA, Gemini reaches 64.1% against humans' 90.0%. Collaborative zero-shot accuracy is 35.2% (§4.3).

Fine-grained annotation agreement is only 0.25 under exact matching, rising to 0.54 after synonym grouping. Data comes from limited research-workshop environments, some errors are staged, and ego/exo synchronization is manually aligned rather than guaranteed millisecond-accurate (§3.2, Appendices E.4, O). Baselines use sampled frames and task-specific prompts. These offline results do not demonstrate improved worker outcomes or operational deployment.

## Research connections

- **Cites:** [[2022-sener-assembly101]] and [[2024-grauman-ego-exo4d]] frame the comparison with existing procedural and synchronized-view datasets (§§2–3.4, references 18 and 14).

## Relevance to Aligned

Our interpretation: paired worker perspectives and role annotations offer a useful test of attributing actions correctly during collaborative work, alongside conventional step tracking.

## Human notes
