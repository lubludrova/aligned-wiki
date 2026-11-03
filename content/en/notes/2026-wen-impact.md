---
year: 2026
venue: "arXiv preprint"
affiliations:
  - "Karlsruhe Institute of Technology"
  - "ETH Zurich"
  - "Italian Institute of Technology"
  - "INSAIT, Sofia University"
research_groups: []
reviewed: false
tags: [procedure-understanding, state-changes, execution-quality, egocentric-video]
---

# IMPACT: A Dataset for Multi-Granularity Human Procedural Action Understanding in Industrial Assembly

IMPACT jointly annotates component state, procedural steps, anomalies, and recovery across synchronized views of commercial-tool assembly.

**Authors:** Di Wen, Zeyun Zhong, David Schneider, Manuel Zaremski, Linus Kunzmann, Yitian Shi, Ruiping Liu, Yufan Chen, Junwei Zheng, Jiahang Li, Jonas Hemmerich, Qiyi Tong, Patric Grauberger, Arash Ajoudani, Danda Pani Paudel, Sven Matthiesen, Barbara Deml, Jürgen Beyerer, Luc Van Gool, Rainer Stiefelhagen, Kunyu Peng.

**Paper:** [Stored PDF](https://arxiv.org/pdf/2604.10409v1) · [Source](https://arxiv.org/pdf/2604.10409v1)
**Website:** Not found in checked primary sources.
**Code:** https://github.com/Kratos-Wen/IMPACT
**Source version:** arXiv:2604.10409v1, 12 April 2026, 9 pages. The author repository still describes an ACM Multimedia 2026 Dataset Track submission under review, so acceptance is not assumed.

## Problem and contribution

Action recognition alone can hide failures at state transitions and repairs. IMPACT records 112 trials by 13 participants, totaling 39.5 hours around two angle-grinder models. Four external RGB-D cameras and one egocentric camera capture controlled assembly/disassembly, with gaze and audio. Multiple views are synchronized within a laboratory setup, not an uncontrolled industrial deployment (§3).

## Approach

A partial-order procedure graph represents valid alternative execution paths. Seventeen components have ternary assembly states: unassembled, correctly assembled, or misassembled. Step-level and hand-specific actions are aligned with normal/anomaly/recovery phases. View-specific null spans identify periods where evidence is unobservable. Benchmark splits assign all views of each trial together, preventing direct cross-view trial leakage (§§3–4, Figures 1–2).

Tasks cover temporal recognition, cross-view matching, forecasting, and state/reasoning. Importantly, the reported State & Reasoning benchmarks use the front exocentric view under the IID split (§5.1, p. 5). Their numerical results cannot be attributed to the egocentric camera.

## Evidence and limits

Table 5 (p. 6) gives MS-TCN++ final-state accuracy 0.93 but transition F1 0.33. Strong aggregate completion therefore coexists with weak transition tracking. Recovery remains particularly difficult, with the listed per-hand recovery F1 values at most 1.25% on the left and 6.41% on the right. Two devices, fixed workstations, rare recovery spans, and front-view evaluation limit transfer claims. The PDF states CC BY 4.0, while the current repository lists a different dataset license. Release terms/version must be checked before reuse rather than inferred from this archived manuscript.

## Research connections

- **Compares with:** [2025-schoonbeek-storm-psr](/notes/2025-schoonbeek-storm-psr/) — includes STORM-PSR in the state/procedure recognition evaluation (Table 5).
- **Cites:** [2024-huang-egoexolearn](/notes/2024-huang-egoexolearn/) — related synchronized egocentric/exocentric data (§2).

## Relevance to Aligned

Our interpretation: a strong design reference for separating normal action, visible fault, attempted repair, and verified restored state. Preserve per-view observability and evaluate transitions separately from final-state accuracy before transferring the benchmark to helmet cameras.

## Human notes
