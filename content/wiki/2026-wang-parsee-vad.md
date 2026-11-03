---
year: 2026
venue: "arXiv preprint"
affiliations: ["Shanghai Jiao Tong University", "Nanjing University", "Nanjing University of Science and Technology"]
research_groups: []
reviewed: false
tags: ["efficient-processing", "video-memory"]
---

# PARSEE-VAD: Efficient Training-Free Online Video Anomaly Detection via Proposition-Aware Reasoning and Streaming Evidence Escalation

Frozen multimodal inference acquires selected propositions and carries compact score state across causal windows.

**Authors:** Ji Wang, Shuangqing Zhang, Guo-Sen Xie, Fang Zhao.
**Paper:** [PDF](../raw/2026-wang-parsee-vad.pdf)
**Website:** Not found in checked sources.
**Code:** Not found in checked sources.

**Source version:** arXiv 2609.33236v1, 27 September 2026. The PDF says ICLR 2027, but that venue claim is not independently verified at this review cutoff.

![PARSEE-VAD: Figure 2 from the paper](../assets/2026-wang-parsee-vad.png)

*Figure 2 from the original paper ([PDF page 4](../raw/2026-wang-parsee-vad.pdf#page=4)).*

## Problem and contribution

Caption histories can lose visual detail, while retaining all visual history is expensive. PARSEE-VAD separates current evidence acquisition from short-term continuity instead of repeatedly generating a narrative history.

## Approach

At two-second decision anchors, nine past/current frames form a reusable visual prefix for frozen Qwen3.5-9B. Paired answer-order prompts expose signed margins for abnormality and visible dynamics. Conditional branches ask about forceful human interaction and consequential environmental interaction. A bounded score update combines these propositions with two-step historical support. The method stores scalar state rather than captions or a long video memory and performs no target-domain training (§3).

## Evidence and limits

Table 1 reports 85.15% UCF-Crime AUC, 79.02% XD-Violence AP and 82.02% MSAD AP. Scores are assigned to completed intervals after closure. Appendix E separately evaluates anchor-aligned scores, excluding processing delay, so headline accuracy must not be interpreted as frame-time alarm availability. On one RTX 5880 Ada, 3,607 MSAD windows take 1.372 s mean and 1.741 s P95, including decoding and orchestration. A 71.7% specialist-query reduction yields only 13.2% end-to-end mean saving against dense probes (Appendix C, Tables 4–5). Fixed margins transfer imperfectly across backbones. Critically, the dynamics gate suppresses persistent fire, smoke or fallen people and can prevent the environmental specialist from running (Appendix F).

## Research connections

- **Compares with:** [[2024-wu-ovvad]] and [[2025-ye-vera]] — reported comparison results in Table 1, under different supervision and temporal protocols.
- **Cites:** [[2024-zanella-lavad]] — contrasts language-mediated anomaly scoring with direct proposition evidence (§2.2).

## Relevance to Aligned

Our interpretation: useful for interpretable, bounded-cost probes at several latency settings. Construction rules need separate static-condition probes, calibrated thresholds and a durable event ledger for daily reports.

## Human notes
