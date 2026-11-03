---
year: 2025
venue: "arXiv preprint"
affiliations: ["Department of Electrical and Computer Engineering, Rutgers University"]
research_groups: []
reviewed: false
tags: ["video-qa"]
---

# Explicit Abstention Knobs for Predictable Reliability in Video Question Answering

Tests confidence-threshold risk–coverage trade-offs and their sensitivity to reduced visual evidence.

**Authors:** Jorge Ortiz.
**Paper:** [PDF](../raw/2025-ortiz-abstention-knobs.pdf)
**Website:** Not found in checked sources.
**Code:** Not found in checked sources.
**Source version:** arXiv:2601.00138v2, 15 January 2026. First public preprint: 31 December 2025.

![Abstention Knobs example video evidence packet](../assets/2025-ortiz-abstention-knobs.png)

*Figure 1. Abstention Knobs example video evidence packet. Source: [original paper, PDF p. 7](../raw/2025-ortiz-abstention-knobs.pdf#page=7).*

## Problem and contribution

A confidence threshold can reduce errors by declining more questions, but that does not establish that confidence tracks available evidence. This diagnostic study compares selective VideoQA under different frame budgets (§§1, 3).

## Approach

Fixed question instances → deterministically sampled frame packets → Gemini 2.0 Flash answer and confidence → acceptance only above a threshold.

The original packet combines uniformly sampled frames with extra temporal-center frames, normally yielding 15–18 frames. A sparse condition uses six frames. Separate prompt interfaces collect self-reported confidence and answer-token log probabilities. Threshold sweeps measure conditional error among answered items, coverage and calibration. Other degradations vary image quality or frame availability (§§3–4).

The method is an evaluation harness around a fixed model, not a trained evidence-sufficiency detector. It does not implement the proposed evidence-bounded “warrant” mechanism (§6.3.2).

## Evidence and limits

The main set contains 300 NExT-QA validation questions, balanced across descriptive, temporal and causal categories. Table 2 reports 9.4% risk at 63.7% coverage for a selected threshold. Under six-frame evidence, the same threshold gives 9.3% risk and 53.7% coverage (Table 3). This result should not be described as an observed increase in conditional risk at that threshold.

Median reported confidence remains high after subsampling, but removing frames does not prove removal of the decisive information for each question. The claim that the problem is fundamental to model representations exceeds what one model and this small test establish. Threshold selection and small accepted subsets also limit reliable deployment conclusions (§§5–6 and limitations).

## Research connections

- **Builds on:** NExT-QA supplies questions and videos (§3.1), and selective prediction supplies risk–coverage evaluation (§2.1).
- **Cites:** Geifman and El-Yaniv's selective-classification work as background for confidence gating (§2.1).

## Relevance to Aligned

Our interpretation: borrow the controlled evidence-degradation experiment and report risk jointly with coverage. Improve it by removing annotated decisive intervals, rather than assuming frame count measures information. Use as a narrow diagnostic companion to answerability benchmarks, not as a universal threshold or proof that confidence-based filtering always fails.

## Human notes
