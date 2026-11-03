---
year: 2026
venue: "ECCV"
affiliations:
  - "City University of Hong Kong"
  - "Huawei Research"
  - "University of Science and Technology of China"
  - "Chinese University of Hong Kong"
  - "City University of Hong Kong (Dongguan)"
research_groups: []
reviewed: false
tags: [procedure-understanding, execution-quality, egocentric-video]
---

# GuideMe: Multi-Domain Task Guidance and Intervention in Streaming Video

GuideMe benchmarks when and how a video assistant should instruct, acknowledge completion, detect mistakes, or offer corrective guidance.

**Authors:** Fang Liu, Jinpeng Chen, Ke Xu, Yuhao Liu, Huankang Guan, Xudong Lu, Yang Bo, Gerhard Hancke, Rui Liu, Rynson W.H. Lau.

**Paper:** [Stored PDF](../raw/2026-liu-guideme.pdf) · [Source](https://arxiv.org/pdf/2607.02991v1)
**Website:** https://fawnliu.github.io/project/guideme/
**Code:** https://github.com/fawnliu/GuideMe
**Source version:** arXiv:2607.02991v1, 3 July 2026, 19 pages. ECCV 2026 status verified on the author project/repository. Author order/spelling follows the stored PDF, including “Yang Bo.”

![GuideMe: Figure 2 from the paper](../assets/2026-liu-guideme.png)

*Figure 2 from the original paper ([PDF page 6](../raw/2026-liu-guideme.pdf#page=6)).*

## Problem and contribution

The benchmark covers 2,458 videos, 223.7 hours, and 47,775 interaction samples across cooking, manipulation, everyday tasks, and fitness. It distinguishes instruction generation from observing errors and producing appropriately timed corrective advice. Existing annotated videos are converted into chronological assistant interactions, rather than recording new users responding to model interventions (§§3.1–3.3).

## Approach

The construction pipeline merges step annotations, separates correct/wrong/correction activities, generates procedural knowledge using repeated language-model sampling, and produces timestamped dialogue (Figure 2, p. 6). Evaluation uses a trailing visual window plus dialogue history. Temporal-semantic bipartite matching scores alignment, behavioral categories distinguish silence, false alarms, and missing responses, and an LLM judge scores content (§§3.4–3.5).

Crucially, the default queries are anchored to annotated intervention timestamps with balanced silent examples, and history contains ground-truth dialogue. Dense one-second queries and model-generated history are separate ablations, not the default autonomous deployment setting.

## Evidence and limits

Fine-tuning Qwen3-VL-8B raises soft F1 from 35.7 to 39.7, while false alarms fall from 37.7 to 24.5 and missing responses rise from 6.7 to 20.6 (Table 2, p. 11). Thus reduced interruption trades against coverage. On a 100-video ablation subset, replacing ground-truth history with predictions lowers Doubao soft F1 from 36.9 to 20.0 (Table 4, p. 14). The metrics combine semantics and timing and are not literal error-detection recall. Advice correctness and observed human repair remain distinct outcomes.

## Research connections

- **Builds on:** [[2024-lee-egoper]] — source videos and procedural/error annotations used to construct timed interactions (§3.2, Figure 2).

## Relevance to Aligned

Our interpretation: reuse the response taxonomy and evaluate predicted-history accumulation. For Aligned, add continuous query timing and actual follow-up state verification before claiming that a suggested correction solved the problem.

## Human notes
