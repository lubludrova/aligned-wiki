---
year: 2025
venue: "ICCV 2025"
affiliations: ["Northeastern University"]
research_groups: [northeastern-nova]
reviewed: false
tags: [dataset, benchmark, method, state-changes, procedure-understanding, egocentric-video]
---

# MOSCATO: Predicting Multiple Object State Change through Actions

MOSCATO jointly models action segments and the evolving states of multiple objects throughout an egocentric procedure.

**Authors:** Parnian Zameni, Yuhan Shen, Ehsan Elhamifar.
**Paper:** [PDF](../raw/2025-zameni-moscato.pdf) · [CVF source](https://openaccess.thecvf.com/content/ICCV2025/papers/Zameni_MOSCATO_Predicting_Multiple_Object_State_Change_Through_Actions_ICCV_2025_paper.pdf)
**Website:** Not found in checked sources.
**Code:** Not released in checked repository. [Official dataset resources](https://github.com/eelhami/iccv25_moscato)
**Citations:** 4 ([OpenAlex](https://openalex.org/W7160082739), checked 2026-11-03).

![MOSCATO action and object-state prediction framework](../assets/2025-zameni-moscato.png)

*Figure 2. MOSCATO action and object-state prediction framework. Source: [original paper, PDF p. 4](../raw/2025-zameni-moscato.pdf#page=4).*

## Problem and contribution

Single-object state-change methods cannot describe how several objects evolve across a sequence of actions. MOSCATO introduces a multi-object benchmark and a model trained with action annotations rather than manually labeled object states (§§1–3).

## Approach

Training video + action segments → object-state pseudo-labels → parallel state-prediction and action-segmentation networks → refined framewise object-state probabilities.

GPT-4o describes the objects affected by each action and carries forward their previous states. Descriptions are compressed into a shared vocabulary and checked for omitted persistent attributes. CLIP estimates when states change, and GLIP filters labels according to object visibility (§3.1, Figure 3).

I3D video features feed MSTCN++ branches for action segmentation and multi-label state prediction. A state–action module learns which states tend to precede or follow actions, then combines predicted action segments with the state branch's outputs. Inference uses predicted action segments, rather than annotated test actions (§§3.2–3.4, Figure 2). This is an offline video-analysis formulation with a closed vocabulary, not an established causal streaming system.

## Evidence and limits

The benchmark augments CMU, EGTEA and EgoPER cooking videos. The method improves state prediction on CMU and EgoPER, but EGTEA remains difficult: adding action–state interaction improves segment scores while reducing frame F1-Max (Tables 2, 4).

EgoPER includes only normal executions (§5.1). Consequently, these experiments do not validate mistake detection. Training requires action-segment labels, and pseudo-label generation approximates different objects' changes with one shared transition time per action (§3.1). The pseudo-label baseline additionally receives ground-truth test action labels, unlike the trained method (§5.1).

## Research connections

- **Builds on:** Li et al., *MS-TCN++* — temporal architecture adapted for multi-label object states (§3.2).
- **Builds on:** [[2024-lee-egoper]] — action-annotated videos reused to construct the state benchmark (§4).
- **Cites:** [[2024-xue-vidosc]] — contrasts its single-object, open-world formulation with multi-object state prediction (§2).

## Relevance to Aligned

Our interpretation: a concrete schema for recording what changed, which objects were affected, and how that relates to procedural progress. The next question is whether this representation survives mistakes, unseen construction materials and objects temporarily leaving the camera view.

## Human notes

