---
year: 2026
venue: "AAAI"
affiliations: [UC Berkeley, TranscEngram, NYU, University of Oxford, UC Davis, HKU]
research_groups: []
reviewed: false
tags: [spatial-understanding, multi-person, egocentric-video]
---

# Seeing from Another Perspective: Evaluating Multi-View Understanding in MLLMs

All-Angles Bench diagnoses cross-view correspondence and spatial reasoning with human-checked questions, paired variants and controlled partial visibility.

**Authors:** Chun-Hsiao Yeh, Chenyu Wang, Shengbang Tong, Ta-Ying Cheng, Ruoyu Wang, Tianzhe Chu, Yuexiang Zhai, Yubei Chen, Shenghua Gao, Yi Ma.
**Paper:** [PDF](../raw/2026-yeh-all-angles-bench.pdf)
**Website:** [Project website](https://danielchyeh.github.io/All-Angles-Bench/)
**Code:** [Official repository](https://github.com/Chenyu-Wang567/All-Angles-Bench)
**Source version:** Archived arXiv 2504.15280v2, 27 April 2025, evaluating 27 models. Publication is verified at AAAI 2026, whose abstract reports 38 models. The final publication PDF was not obtained. Claims below follow the inspected v2.

![All-Angles Bench: Figure 3 from the paper](../assets/2026-yeh-all-angles-bench.png)

*Figure 3 from the original paper ([PDF page 3](../raw/2026-yeh-all-angles-bench.pdf#page=3)).*

## Problem and contribution

A model may recognize each image yet fail to identify the same person or object across cameras, reconcile partial views or transform directions between viewpoints. All-Angles Bench isolates these failures using 2,132 questions from 90 scenes. Its value is a controlled spatial diagnostic, rather than a temporal-memory architecture (§2).

## Approach

The dataset selects synchronized static images from four or five cameras per scene, using 83 Ego-Exo4D scenes and seven EgoHumans scenes. Six task families cover attributes, counting, camera pose, hypothetical object manipulation, relative direction and distance (§2, Appendix §7.1).

A language model drafts questions. Eight human annotators correct them, and another annotator checks each item. Many questions have rephrased or viewpoint-reversed counterparts. Frozen models receive image sets and answer choices, without training a persistent representation. Evaluation measures accuracy and whether paired versions are answered correctly together (§§2.2, 3.3).

A separate experiment selects 55 scenes and manually crops images to distribute person observations across views. It contrasts complete visibility with partial visibility and tests prompts that explicitly identify individuals before counting (§4.1).

## Evidence and limits

On a matched 250-question subset, humans score 82.0%, InternVL2.5-38B 60.8% and GPT-4o 52.4%. However, main-text and appendix descriptions disagree about how the questions were divided between human evaluators (Table 1, Appendix §8.1).

Identification prompting helps GPT-4o under partial visibility, but gains diminish or reverse for stronger counting models. Figure 5 groups both-correct and both-wrong pairs together, so a low inconsistency rate must be interpreted alongside accuracy. Consistent mistakes remain mistakes (Figs. 5–7).

The 90 static scenes provide no test of persistent identity through time, video memory or workplace deployment. Paired questions are correlated and do not add independent scenes. Released evaluation resources support reuse, while repository licensing language mixes MIT and noncommercial restrictions and needs clarification before product use.

## Research connections

- **Builds on:** [[2024-grauman-ego-exo4d]] — samples multi-camera imagery for its spatial tasks (Appendix §7.1, ref. 18).
- **Builds on:** Khirodkar et al., *EgoHumans* (2023) — supplies additional synchronized multi-person scenes (Appendix §7.1, ref. 24).

## Relevance to Aligned

Our interpretation: test person/object correspondence and duplicate counting before combining observations from worker and site cameras. The controlled partial-visibility design can expose fusion errors that a plausible final answer conceals.

## Human notes
