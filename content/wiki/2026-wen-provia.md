---
year: 2026
venue: "arXiv preprint"
affiliations: ["Karlsruhe Institute of Technology", "Hunan University"]
research_groups: []
reviewed: false
tags: [method, procedure-understanding, execution-quality, egocentric-video]
---

# PROVIA: Procedure State Tracking for Online Mistake Detection in Egocentric Videos

PROVIA separates observed actions from accepted procedure progress to detect mistakes online and evaluates alarms across complete executions.

**Authors:** Di Wen, Kailun Yang, Jimmy Weissert, Luc Maria Scherrer, Cedric Zöllner, Ruiping Liu, Yufan Chen, Jiale Wei, Junwei Zheng, Kunyu Peng.
**Paper:** [PDF](../raw/2026-wen-provia.pdf) · [arXiv v1](https://arxiv.org/abs/2609.20638v1)
**Website:** Not found in checked sources.
**Code:** [Kratos-Wen/PROVIA](https://github.com/Kratos-Wen/PROVIA)
**Citations:** 0 ([OpenAlex](https://openalex.org/W7213593472), checked 2026-11-03).

![PROVIA: Figure 1 from the paper](../assets/2026-wen-provia.png)

*Figure 1 from the original paper ([PDF page 4](../raw/2026-wen-provia.pdf#page=4)).*

## Problem and contribution

A mistake changes what happened without necessarily advancing the intended procedure. Methods that append every recognized action to one history can lose this distinction. PROVIA tracks factual history separately from accepted progress. It also challenges evaluations that stop at the first mistake, hiding recovery and later false alarms (§§II–III).

## Approach

Streaming visual features → causal step segmentation → observation model and procedure-state filter → completion-weighted mistake scores → sequential alarms (Fig. 1).

During training, decoded correct demonstrations become a probabilistic automaton. Bayesian state merging combines histories that predict similar continuations, retaining alternative valid paths. During inference, factual history records all observed steps, while the accepted-progress distribution advances only along the correct-status branch. The filter distinguishes correct execution, mistakes and corrections, with insertion handling where required (§IV).

An open segment accumulates evidence until its completion decision. A sequential detector aggregates scores and issues alarms using a threshold selected against a validation false-alarm budget. The query supplies past frames and the known task, without ground-truth boundaries, correctness labels or future frames (§§III, IV-A–E).

Training is supervised: the segmenter learns step labels and boundaries, then is frozen. The status model subsequently learns from mistake annotations on those fixed segments. This is not a normal-executions-only detector. Stored reference automata and running histories support one procedure, rather than a searchable archive (§IV-F).

## Evidence and limits

Experiments cover CaptainCook4D, IndustReal, HoloAssist and IMPACT. At a validation budget of 0.1 false alarms/minute, mistake recall is 0.154 on CaptainCook4D and 0.034 on HoloAssist. IndustReal does not consistently beat controls using timing without video. These low-recall operating points matter for practical alerts (§V, Table IV).

Reported 58–70 FPS uses an A100 and particular feature pipelines, not a demonstrated archive-processing cost. Controlled PREGO and MistSense comparisons remove components from the original methods, so their results should not be generalized to unrestricted implementations (§V).

## Research connections

- **Cites:** [[2026-guo-aem]] — places effect-based detection among methods with fixed normal references (§II).
- **Compares with:** PREGO and [[2025-patsch-mistsense]] — evaluates controlled baselines under the same full-trial alarm protocol (§V).

## Relevance to Aligned

Our interpretation: a useful execution-state component and evaluation discipline. Construction trials should preserve recoveries and measure false alarms over whole shifts before scores inform skill profiles.

## Human notes
