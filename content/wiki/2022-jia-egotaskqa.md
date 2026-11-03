---
year: 2022
venue: "NeurIPS Datasets and Benchmarks"
affiliations: ["UCLA Center for Vision, Cognition, Learning, and Autonomy (VCLA)", "Beijing Institute for General Artificial Intelligence (BIGAI)", "Institute for Artificial Intelligence, Peking University", "Department of Automation, Tsinghua University"]
research_groups: [ucla-vcla, bigai]
reviewed: false
tags: [dataset, benchmark, video-qa, state-changes, procedure-understanding, egocentric-video, multi-person]
---

# EgoTaskQA: Understanding Human Tasks in Egocentric Videos

EgoTaskQA turns annotated object states, action dependencies and actor–helper interactions into diagnostic questions about goal-directed physical tasks.

**Authors:** Baoxiong Jia, Ting Lei, Song-Chun Zhu, Siyuan Huang.
**Paper:** [PDF](../raw/2022-jia-egotaskqa.pdf)
**Website:** [Project website](https://sites.google.com/view/egotaskqa/home)
**Code:** [Official repository](https://github.com/Buzz-Beater/EgoTaskQA)
**Source version:** arXiv 2210.03929v1, 8 October 2022. Publication verified in the NeurIPS 2022 Datasets and Benchmarks proceedings.
**Citations:** 28 ([OpenAlex](https://openalex.org/W7133185840), checked 2026-11-03).

![EgoTaskQA collaborative task and question examples](../assets/2022-jia-egotaskqa.png)

*Figure 1. EgoTaskQA collaborative task and question examples. Source: [original paper, PDF p. 2](../raw/2022-jia-egotaskqa.pdf#page=2).*

## Problem and contribution

Recognizing an action does not explain what it changed, why it was needed, or what a collaborator could observe. EgoTaskQA adds before/after object states and task dependencies to LEMMA recordings, then generates descriptive, predictive, explanatory and counterfactual questions. Its contribution is an annotation and evaluation framework, rather than a deployed memory model (§§1–3).

## Approach

About 2,000 clips average 25 seconds and five actions. Approximately 30,000 annotation blocks describe objects, relations and people before and after actions. Object transition chains and manually defined precondition/effect rules form dependency graphs. Executable question templates query those graphs, producing roughly 368,000 candidates that are filtered and balanced into 40,000 questions (§§3.1–3.2, Fig. 2).

The benchmark supplies annotated structured representations and trains existing supervised video-QA classifiers to predict answer classes. Actor–helper visibility supports questions about another person's awareness. A target ego clip is the model input, not a collection of distributed wearer memories. Processing is offline. Counterfactual labels follow symbolic rules, while awareness labels reflect annotator judgments, rather than experimentally established causality or directly measured mental states (§3).

## Evidence and limits

Language shortcuts remain substantial. HCRN scores 42.20% overall with video versus 32.51% without it, but state-change accuracy is 67.38% with video and 68.77% without. These controls make clear that correct answers do not necessarily establish visual understanding (Tables 2–3).

The normal split randomly partitions questions, so it does not establish generalization to unseen recordings or workers. The indirect-reference split tests a different question distribution. The reported human result comes from a small quality-check sample, not a matched full-test evaluation. Indoor collaborative clips, subjective awareness labels and predefined task rules limit transfer to construction or long-term memory (§§3.2, 4).

## Research connections

- **Builds on:** Jia et al., *LEMMA* (2020) — reuses recordings of goal-directed actor–helper collaboration and adds state/dependency annotations (§3.1, ref. 11).
- **Cites:** [[2022-grauman-ego4d]] — contrasts broad lifelog coverage with the dense task annotations required here (§2, ref. 13).

## Relevance to Aligned

Our interpretation: a useful starting schema for worker actions, effects, prerequisites and observable collaboration. Its shortcut controls should inform our evaluations. Construction-specific quality criteria, person-disjoint testing and persistent evidence retrieval still need separate validation.

## Human notes
