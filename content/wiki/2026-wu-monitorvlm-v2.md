---
year: 2026
venue: "arXiv preprint"
affiliations: ["University of Science and Technology Beijing", "Johns Hopkins University"]
research_groups: []
reviewed: false
tags: [method, efficient-processing, execution-quality, real-world-evaluation, production-use]
---

# MonitorVLM-v2: A Deployed Vision-Language Framework for Real-Time Safety Violation Detection

A deployed mining monitor replaces free-form reasoning with bounded rule-ID decisions and mandatory human confirmation.

**Authors:** Jiang Wu, Sichao Wu, Yinsong Ma, Lifang Zheng, Jingliang Duan.
**Paper:** [PDF](../raw/2026-wu-monitorvlm-v2.pdf)
**Website:** Not found in checked sources.
**Code:** [Repository](https://github.com/JiangWu0826/ms-swift)

**Source version:** arXiv 2608.00975v1, 2 August 2026.
**Citations:** 0 ([OpenAlex](https://openalex.org/W7172445049), checked 2026-11-03).

![MonitorVLM-v2: Figure 2 from the paper](../assets/2026-wu-monitorvlm-v2.png)

*Figure 2 from the original paper ([PDF page 8](../raw/2026-wu-monitorvlm-v2.pdf#page=8)).*

## Problem and contribution

Industrial safety monitoring requires repeatable decisions across concurrent feeds. MonitorVLM-v2 compresses expensive generative explanations into a probability distribution over 35 safety regulations plus nonviolation, with a human review interface.

## Approach

A YOLOv11 personnel sentinel checks streams at 1 fps. Human-containing segments contribute three frames from a three-second window. A domain-adapted VLM emits one masked rule token. Training first shuffles rule-to-token mappings during supervised learning, then uses symbolic policy optimization to reward correct sampled labels and penalize incorrect alternatives. Entropy routes low-uncertainty cases to Top-1 confirmation and other cases to Top-3 review. Every recorded prediction requires human confirmation. Corrected events enter a feedback buffer for later adaptation (Methods, pp.24–26).

## Evidence and limits

Training contains 13,079 events from one mine, with 862 held-out test events. The final comparison reports 69.84% exact rule-ID accuracy, 74.73% recall and 87.94% precision (p.14). Three-frame inference takes approximately 0.15–0.39 s across backbones, excluding the three-second observation interval and human response. Experiments use eight A40 GPUs, but deployment resource accounting is incomplete. The authors report four months on ten concurrent fixed cameras: 89 confirmed AI detections versus 32 manual detections, with 25 shared and seven manual-only events. AI coverage is 24 hours versus 18 hours manually, and the union of discovered events is not exhaustive ground truth (pp.19–21). The linked repository currently presents generic ms-swift documentation, so a paper-specific SymPO/weight release is not verified.

## Research connections

- **Builds on:** Qwen3-VL-2B-Instruct — domain SFT and symbolic policy optimization produce the final monitor (p.14, Methods).
- **Compares with:** GRPO and DAPO — symbolic-output optimization baselines, not robot-policy training (pp.12–14).

## Relevance to Aligned

Our interpretation: the closest operational design for explicit construction rules and reviewed incident logs. PPE visibility, unseen sites, sentinel misses and reviewer workload require measurement. A single rule label cannot represent every simultaneous violation or explain worker inactivity.

## Human notes
