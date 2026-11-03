---
year: 2024
venue: "WACV"
affiliations: ["Eindhoven University of Technology", "ASML Research"]
research_groups: []
reviewed: false
tags: [procedure-understanding, state-changes, execution-quality, egocentric-video]
---

# IndustReal: A Dataset for Procedure Step Recognition Handling Execution Errors in Egocentric Videos in an Industrial-Like Setting

IndustReal distinguishes recognizing an action from recognizing the correct completion of a procedure step through assembly-state evidence.

**Authors:** Tim J. Schoonbeek, Tim Houben, Hans Onvlee, Peter H.N. de With, Fons van der Sommen.
**Paper:** [PDF](../raw/2024-schoonbeek-industreal.pdf) · [Published PDF](https://openaccess.thecvf.com/content/WACV2024/papers/Schoonbeek_IndustReal_A_Dataset_for_Procedure_Step_Recognition_Handling_Execution_Errors_WACV_2024_paper.pdf)
**Website:** [Author project](https://timschoonbeek.github.io/industreal.html)
**Code:** [Official repository](https://github.com/TimSchoonbeek/IndustReal)
**Source version:** Ten-page WACV 2024 proceedings article, first preprint 2023.

![IndustReal parts, assemblies, and maintenance tasks](../assets/2024-schoonbeek-industreal.png)

*Figure 1. IndustReal parts, assemblies, and maintenance tasks. Source: [original paper, PDF p. 2](../raw/2024-schoonbeek-industreal.pdf#page=2).*

## Problem and contribution

An action label does not establish that a component was installed correctly. The paper defines procedure step recognition (PSR) and supplies action, assembly-state and step-completion annotations for assembly and maintenance of a construction-set car (§§3–4).

## Approach

HoloLens sensor streams and procedural knowledge → assembly-state detector → state-change interpretation and accumulated confidence → ordered completed-step record.

Component-state labels distinguish correctly installed, not correctly installed yet, and incorrectly installed parts. Baselines infer completed steps from state changes, then add temporal confidence accumulation and restrictions from the expected procedure (§5.3). Inputs are causal up to the decision time. CAD models and synthetic renderings support a separate synthetic-training condition.

Evaluation separates procedure-order similarity, completion F1 and delay. Premature completion predictions count as false positives. Delay is measured only on true positives, so it cannot summarize missed or false completions by itself (§3.2).

## Evidence and limits

The dataset contains 84 recordings, 5.8 hours and 27 participants (Table 1). Splits separate participants and reserve some execution errors from training. Collection uses consistent lighting/background, and participants remove their hands after a step to reduce occlusion (§4.3).

The strongest baseline reports overall completion F1 0.883 and 22.4-second average delay, versus F1 0.816 on recordings containing errors (Table 4). These are completion metrics, not defect-detection recall. The paper separately reports poor assembly-state detection for error states (§5.2). The setting is controlled toy-part assembly, not production construction.

## Research connections

- **Cites:** [[2022-sener-assembly101]] — contrasts procedural-error annotations and assembly-state coverage (§2.3).
- **Compares with:** SlowFast and MViTv2 — action-recognition backbones (Table 2).

## Relevance to Aligned

Our interpretation: a useful foundation for state-based completion and false-closure evaluation. Preserve separate labels for incorrect, incomplete and unobserved states, and test ordinary hand occlusion rather than assuming clean inspection views.

## Human notes
