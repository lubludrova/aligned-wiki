---
year: 2025
venue: "CVPR"
affiliations:
  - University of Texas at Austin
  - FAIR Meta
  - Carnegie Mellon University
research_groups: [meta-fair]
reviewed: false
tags: [dataset, benchmark, method, execution-quality, video-retrieval, egocentric-video]
---

# ExpertAF: Expert Actionable Feedback from Video

ExpertAF learns to turn a learner's video and body pose into corrective commentary, a retrieved expert demonstration, and a generated expert pose sequence.

**Authors:** Kumar Ashutosh, Tushar Nagarajan, Georgios Pavlakos, Kris Kitani, Kristen Grauman.

**Paper:** [Stored PDF](../raw/2025-ashutosh-expertaf.pdf)
**Website:** https://vision.cs.utexas.edu/projects/ExpertAF/
**Code:** https://github.com/thechargedneutron/ExpertAF
**Source version:** CVF open-access accepted CVPR 2025 paper, pp. 13582–13594. The first arXiv release was in 2024. The separate CVPR supplement was also consulted.
**Citations:** 20 ([OpenAlex](https://openalex.org/W4413144637), checked 2026-11-03).

![ExpertAF multimodal expert feedback model](../assets/2025-ashutosh-expertaf.png)

*Figure 3. ExpertAF multimodal expert feedback model. Source: [original paper, PDF p. 5](../raw/2025-ashutosh-expertaf.pdf#page=5).*

## Problem and contribution

Skill scores leave learners to infer what they should change. ExpertAF formulates actionable coaching as three linked outputs and builds weak supervision from Ego-Exo4D expert commentary. Llama 3 summarizes comments and labels correct/incorrect body regions. Matching erroneous learner clips to correct executions, followed by pose alignment, produces 25,505 training tuples and 1,272 manually verified test tuples across basketball, soccer, and climbing (§§3.1–3.2, supplement B).

## Approach

The principal input contains synchronized ego and exo video plus 3D body poses. A frozen InternVideo2 encoder and an adapted pose tokenizer encode demonstrations, with learned projections connecting their features to Llama 3-8B. Supervised autoregressive objectives train commentary generation, expert-demonstration retrieval, and pose generation using paired learner/expert examples (§3, Fig. 3).

At inference, commentary is generated from the learner demonstration alone. That commentary then conditions candidate ranking for expert retrieval and prediction of discrete pose tokens, which a pose decoder converts into corrected motion. The model generates poses, not expert RGB video. The paired expert input available during commentary training is removed at standard inference. A separately reported privileged-input variant retains it. Experiments operate on four-second clips rather than a continuous interactive coaching session (supplement C–D).

## Evidence and limits

Table 1 reports retrieval recall@50 of 19.1% among 1,272 candidates, versus 18.0% for pose-augmented fine-tuned LLaVA. Generated pose error is 135 mm PA-MPJPE versus 150 mm. Five raters per sport evaluate a random 250-example subset, scoring ExpertAF 3.2/4 for commentary and retrieval and 2.4/4 for pose generation (Table 1, supplement G). These are offline correctness ratings, without a measured improvement in learners' subsequent performance.

The strongest results require both camera viewpoints and pose. Ego-only commentary BLEU-4 falls from 44.9 to 40.0 (supplement Table 2). Automatically reconstructed poses can be wrong, expert feedback varies in granularity, and nonvisual judgments such as fatigue remain difficult. Figure 4 includes an incorrect diagnosis. These constraints limit claims about autonomous coaching from ordinary wearable video.

## Research connections

- **Builds on:** [[2024-grauman-ego-exo4d]] supplies synchronized views, poses, skill levels, and expert commentary used to construct the supervision (§3.2, reference 29).

## Relevance to Aligned

Our interpretation: actionable feedback benefits from coupling an explanation to a concrete corrective example. Applying this to procedural work would require validated error-specific demonstrations and evidence that the advice improves execution.

## Human notes
