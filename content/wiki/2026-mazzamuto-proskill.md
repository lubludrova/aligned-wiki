---
year: 2026
venue: "WACV 2026"
affiliations: ["University of Catania", "Next Vision s.r.l.", "Toyota Motor Europe"]
research_groups: [catania-coai]
reviewed: false
tags: [dataset, benchmark, execution-quality, preference-learning, egocentric-video]
---

# ProSkill: Segment-Level Skill Assessment in Procedural Videos

ProSkill converts human comparisons of procedural video clips into action-specific skill rankings and benchmarks models that predict them.

**Authors:** Michele Mazzamuto, Daniele Di Mauro, Gianpiero Francesca, Giovanni Maria Farinella, Antonino Furnari.
**Paper:** [PDF](../raw/2026-mazzamuto-proskill.pdf) · [arXiv v1](https://arxiv.org/abs/2601.20661v1)
**Website:** [Project](https://fpv-iplab.github.io/ProSkill/)
**Code:** [Annotations, ranking and clip-extraction tools](https://github.com/fpv-iplab/ProSKILL_WACV)
**Citations:** 0 ([OpenAlex](https://openalex.org/W7126040381), checked 2026-11-03).

![ProSkill: Figure 1 from the paper](../assets/2026-mazzamuto-proskill.png)

*Figure 1 from the original paper ([PDF page 1](../raw/2026-mazzamuto-proskill.pdf#page=1)).*

## Problem and contribution

Recognizing an action says little about how well it was performed. Earlier skill datasets emphasized sports, whole performances, or binary judgments. ProSkill adds continuous and pairwise labels to individual steps in everyday and assembly procedures. Its main contribution is the annotation protocol and benchmark, rather than a new general-purpose skill estimator (§§1–4).

## Approach

Presegmented clips of the same action → informative pair selection → human preference votes → ELO ratings → percentile scores.

A Swiss tournament pairs clips with similar current ratings. Five qualified crowdworkers judge each pair, with three additional judgments when agreement is low. Ratings update after each round. Six rounds produce rankings independently for each action, then percentile normalization puts them on a common numerical scale. This does not establish that equally ranked clips from different actions demonstrate equivalent competence (§§3–4, Fig. 1).

For prediction, offline I3D or VideoMAE features represent each clip. Supervised baselines either regress its rating or compare performances. The stored dataset contains clips, action identities, pairwise judgments and scores. Automatic step discovery and continuous monitoring are outside this task (§5).

## Evidence and limits

The benchmark contains 1,135 clips, 71 actions and about 14 hours from five existing datasets. Evaluation separates source videos across splits and measures rank correlation or pairwise accuracy. It does not establish worker-disjoint generalization (§§4–5, Tables 2–6).

Predictions remain imperfect: the strongest Meccano rank correlation in Table 3's main comparison is 0.59. More fundamentally, labels measure perceived execution quality. Figure 5 assigns a low rank to a clip interrupted by a child. Our interpretation: contextual disruption can therefore be confused with the worker's underlying ability. Per-action percentile scores should not become universal qualifications without independent validation.

## Research connections

- **Builds on:** [[2024-grauman-ego-exo4d]], [[2022-sener-assembly101]], MECCANO, EPIC-Tent and IKEA ASM — reuses procedural clips and adds skill annotations (§4).
- **Compares with:** CoFInAl, USDL and DAE-AQA — evaluates existing action-quality models under a shared feature pipeline (§5).

## Relevance to Aligned

Our interpretation: a practical starting point for human-reviewed comparisons of construction task segments. We would need trade-specific rubrics, explicit defect evidence and worker-disjoint evaluation before using these rankings as proof of skill.

## Human notes
