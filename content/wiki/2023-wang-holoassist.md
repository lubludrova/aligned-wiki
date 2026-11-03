---
year: 2023
venue: "ICCV"
affiliations: ["Microsoft", "ETH Zurich"]
research_groups: []
reviewed: false
tags: [procedure-understanding, execution-quality, egocentric-video, multi-person]
---

# HoloAssist: an Egocentric Human Interaction Dataset for Interactive AI Assistants in the Real World

HoloAssist records human instructors helping task performers and benchmarks mistake recognition and intervention prediction from egocentric observations.

**Authors:** Xin Wang, Taein Kwon, Mahdi Rad, Bowen Pan, Ishani Chakraborty, Sean Andrist, Dan Bohus, Ashley Feniello, Bugra Tekin, Felipe Vieira Frujeri, Neel Joshi, Marc Pollefeys.
**Paper:** [PDF](../raw/2023-wang-holoassist.pdf) · [Published PDF](https://openaccess.thecvf.com/content/ICCV2023/papers/Wang_HoloAssist_an_Egocentric_Human_Interaction_Dataset_for_Interactive_AI_Assistants_ICCV_2023_paper.pdf)
**Website:** [Official project and release](https://holoassist.github.io/)
**Code:** [Baseline release](https://github.com/Ember-HoloAssist/holoassist-release) · [Projection utilities](https://github.com/taeinkwon/PyHoloAssist). Links verified through the official project page. Implementations were not executed.
**Source version:** Twelve-page ICCV 2023 article. The PDF reports 166 hours, while the current project page says 169 hours. Counts here follow the archived PDF.

![HoloAssist interactive task setting and recorded modalities](../assets/2023-wang-holoassist.png)

*Figure 1. HoloAssist interactive task setting and recorded modalities. Source: [original paper, PDF p. 1](../raw/2023-wang-holoassist.pdf#page=1).*

## Problem and contribution

Successful demonstrations omit the conversation through which humans diagnose and correct mistakes. HoloAssist captures interactive task performance, providing errors, instructor interventions and multimodal observations as distinct annotation targets (§§1–3).

## Approach

A performer wears HoloLens while an instructor watches the live first-person stream and gives spoken guidance. Synchronized RGB, depth, hands, gaze and other sensor streams accompany transcripts, coarse/fine action boundaries and mistake labels (Figures 1–2).

Annotations distinguish self-corrected mistakes, instructor-corrected mistakes and uncorrected mistakes. The baseline mistake benchmark collapses these into one class. Modified TimeSformer models consume visual and sensor tokens, while a separate sequence model forecasts hand positions (§§3.2, 4.2, 5).

Mistake classification uses supplied action clips through the current clip's end. Intervention-type prediction uses windows immediately before known interventions. These are supervised benchmark tasks, not demonstrated autonomous intervention timing across an uninterrupted shift.

## Evidence and limits

The paper reports 2,221 sessions and 350 unique instructor–performer pairs. Mistakes account for roughly 6% of fine-grained actions (§4.2). Table 7 exposes poor mistake-class precision/recall despite less alarming aggregate scores. Mistake and intervention experiments cover only 10% of the collection (Table 7 footnote).

Sessions are split per task rather than establishing worker-independent construction transfer (§5). Human assistance is observed during collection, but the work does not show an AI assistant improving physical task outcomes. Extra gaze and hand-pose channels are not assured on ordinary helmet cameras.

## Research connections

- **Cites:** [[2022-sener-assembly101]] — procedural activity and mistake-detection context (§§2, 4.2).
- **Cites:** [[2022-grauman-ego4d]] — contrasts broad egocentric data with explicit interaction annotations (Table 2).

## Relevance to Aligned

Our interpretation: use the correction-type labels to distinguish detecting an error from observing its resolution. Spoken instructions can supply context, but a recommendation alone should not close a physical issue.

## Human notes
