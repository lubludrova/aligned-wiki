---
year: 2026
venue: "CVPR"
affiliations: ["Hong Kong Baptist University", "Tencent Youtu Lab"]
research_groups: []
reviewed: false
tags: ["video-representation", "video-qa", "state-changes"]
---

# Streaming Video Instruction Tuning

Streamo trains one model to track streaming instructions, distinguish silence from incomplete evidence and emit task-appropriate responses.

**Authors:** Jiaer Xia, Peixian Chen, Mengdan Zhang, Xing Sun, Kaiyang Zhou.
**Paper:** [PDF](../raw/2026-xia-streamo.pdf)
**Website:** [Project website](https://jiaerxia.github.io/Streamo/)
**Code:** [GitHub repository](https://github.com/maifoundations/Streamo)

**Source version:** arXiv:2512.21334v2, 10 April 2026. First preprint appeared in 2025. CVPR 2026 acceptance confirmed by official repository.

![Streamo: Figure 2 from the paper](../assets/2026-xia-streamo.png)

*Figure 2 from the original paper ([PDF page 4](../raw/2026-xia-streamo.pdf#page=4)).*

## Problem and contribution

Online QA alone does not ensure a model can narrate actions, report completed events, localize requested intervals and update answers when object states change. Streamo introduces a shared dialogue format, multi-task data and state-aware training for these behaviors (§§3–4).

## Approach

Incoming frames form timestamped, one-second dialogue turns. The model predicts Silence for irrelevant content, Standby while collecting relevant evidence or Response followed by text when sufficient information arrives. Class-frequency weights and focal weighting apply specifically to these decision tokens. A frozen vision encoder feeds a trained connector and language model (§§3.2–3.3, 5.3).

Streamo-Instruct-465K contains 465.8K samples over 135,875 videos. Annotation pipelines use VLM-generated changes, captions and temporal grounding, with additional offline QA. Narration can produce a general event stream, whereas event grounding and time-sensitive QA are conditioned on explicit instructions. Synthetic supervision is therefore different from independently verified safety annotations (§4).

## Evidence and limits

On the authors' 300-video, 3,000-instruction Streamo-Bench, Streamo-7B reaches 29.4 forward-grounding mIoU and 38.3 backward-grounding mIoU. Caption scores in that table are VLM-judged win rates, while time-sensitive QA uses separate accuracy and recall. The average mixes these measures and should not be read as event-detection accuracy (§5.2, Table 5, Appendix C).

Training uses 1 fps, with additional 2 fps evaluation. These are sampling rates, not demonstrated real-time throughput. The limitations explicitly identify growing inference time and memory with sequence length. Code and training data are released, but the official README states model weights cannot be publicly released (§7, repository).

## Research connections

- **Compares with:** [[2025-qian-dispider]] — contrasts modular proactive interaction with joint state-token training (Tables 2 and 5).
- **Builds on:** [[2024-chen-videollm-online]] — extends silence/response training with an explicit incomplete-evidence state and multi-task supervision (§§2–3).

## Relevance to Aligned

Our interpretation: Useful for defining output contracts for action events, state transitions and delayed confirmation, before archive chat. It does not solve persistent worker/object identity or shift-length memory, and small safety cues still require visual validation.

## Human notes

