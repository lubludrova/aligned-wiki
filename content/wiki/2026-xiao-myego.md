---
year: 2026
venue: "CVPR"
affiliations: [University of Science and Technology of China, National University of Singapore]
research_groups: []
reviewed: false
tags: [video-qa, egocentric-video, multi-person]
---

# Ego-Grounding for Personalized Question-Answering in Egocentric Videos

MyEgo tests whether video models connect objects, actions and earlier observations to the correct camera wearer instead of another person or a similar item.

**Authors:** Junbin Xiao, Shenglang Zhang, Pengxiang Zhu, Angela Yao.
**Paper:** [PDF](../raw/2026-xiao-myego.pdf)
**Website:** Not found in checked sources.
**Code:** [Official MyEgo repository](https://github.com/Ryougetsu3606/MyEgo)
**Source version:** arXiv 2604.01966v1, 2 April 2026. Publication verified in the CVPR 2026 proceedings. Numbers below follow the archived PDF, rather than the repository's subset leaderboard.

![MyEgo / Ego-Grounding: Figure 1 from the paper](../assets/2026-xiao-myego.png)

*Figure 1 from the original paper ([PDF page 1](../raw/2026-xiao-myego.pdf#page=1)).*

## Problem and contribution

Finding a plausible bottle or tool is insufficient when the question concerns the wearer's own item. MyEgo isolates this personalized grounding problem in scenes containing multiple people and similar-looking objects. It contributes manually authored questions about the wearer's belongings, activities and past, rather than a new memory architecture (§§1–3).

## Approach

The benchmark combines 541 videos from Ego4D, EgoLife and CASTEL2024, averaging 9.2 minutes. Ten annotators write 5,012 questions and answers and mark question and evidence moments. Model-generated distractors receive further checks, supporting open-answer and multiple-choice evaluation (§3.2).

Frozen video models usually receive 32 frames sampled from the video prefix ending at the question timestamp. Some long-video baselines receive 128 frames. The stored representation is annotated questions and temporal evidence, not persistent wearer identities. Most models resample the available history per question, so the causal input boundary does not itself establish an efficient streaming system (§4.1).

## Evidence and limits

GPT-5 achieves 46.1% open-answer accuracy and Qwen3-VL-8B 36.4%. The reported human 84.7% uses a separate 300-question subset, making the displayed gap descriptive rather than a matched full-benchmark comparison (Table 2).

Known evidence locations help: Gemini's previous-event accuracy rises from 40.3% with uniform frames to 51.5% with question/answer-centered frames. This is an oracle availability experiment, not a deployable retrieval gain. Its ±1.5-second windows may include frames after the question, since causal clipping is not specified (Table 3).

The mean evidence-to-query delay is about 20 seconds, and 90% are below 40 seconds. Average video length therefore overstates the retention horizon actually tested. Sparse sampling also confounds forgetting with never receiving the relevant frame (§§3.3, 4.3).

The main text and supplement describe different shortcut-filter inputs. Automatic answer judging reaches 94% agreement on only 100 checked examples after prompt refinement. These qualifications matter alongside the human-authored questions and public evaluation release. No construction-quality or deployed assistant trial is reported.

## Research connections

- **Builds on:** [[2022-grauman-ego4d]] — selects source recordings for personalized question annotation (§3.2, Appendix A.1).
- **Builds on:** [[2025-yang-egolife]] — contributes multi-person household recordings to the benchmark (§3.2, Appendix A.1).
- **Cites:** [[2025-ye-mm-ego]] — contrasts EgoMemoria's general egocentric QA with personalized wearer grounding (Table 1, ref. 47).

## Relevance to Aligned

Our interpretation: evaluate whose tool, action or mistake an answer refers to before trusting worker-specific memory. Extend this diagnostic to repeated operations, longer delays and evidence intervals that stay strictly within the observed past.

## Human notes
