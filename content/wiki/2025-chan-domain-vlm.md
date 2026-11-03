---
year: 2025
venue: "ICCBEI 2025, Kalpa Publications in Computing 22, 894–908"
affiliations: ["The Hong Kong University of Science and Technology", "Drainage Services Department, Government of the Hong Kong Special Administrative Region", "AutoSafe Ltd."]
research_groups: []
reviewed: false
tags: [dataset, method, execution-quality, construction, real-world-evaluation]
---

# A Domain Knowledge-Enhanced Large Vision-Language Model for Construction Site Safety Monitoring

Adapts a vision-language model to work-at-height rules and connects sampled camera frames to alerts and indexed incident records.

**Authors:** Chak-Fu Chan, Xiaowen Guo, Peter Kok-Yiu Wong, Jolly Pui-Ching Chan, Jack C.P. Cheng, Pak-Him Leung, Xingyu Tao.
**Paper:** [PDF](../raw/2025-chan-domain-vlm.pdf) · [Primary source](https://easychair.org/publications/paper/7fbx)
**Website:** Not found in checked sources.
**Code:** Not found in checked sources.
**Source version:** Original 15-page ICCBEI 2025 proceedings PDF, DOI 10.29007/1n8g. This note covers the conference paper, not the separate ontology-enhanced journal article.
**Citations:** 0 ([OpenAlex](https://openalex.org/W4413786482), checked 2026-11-03).

![Domain VLM semi-automatic construction safety data labeling](../assets/2025-chan-domain-vlm.png)

*Figure 2. Domain VLM semi-automatic construction safety data labeling. Source: [original paper, PDF p. 4](../raw/2025-chan-domain-vlm.pdf#page=4).*

## Problem and contribution

Construction safety inspection requires relating workers, equipment and task-specific rules rather than merely detecting PPE. The paper combines domain adaptation of CogAgent with an alert and incident-logging workflow for work-at-height inspection (§§1–2).

## Approach

Camera stream → regularly sampled image → adapted CogAgent → rule-compliance answer → alarm and indexed image/output pair (§2.3). GPT-4V and GroundingDINO assist annotation, followed by manual correction. Two LoRA stages first learn construction grounded captions and then safety-rule examples. An additional high-resolution branch supports small visual details (§§2.1–2.2).

The field trial samples each camera every ten seconds. The 8-bit model runs on an RTX 4090. A separate interactive mode answers questions about the current frame. Historical records use frame IDs and generated text. This is periodic image inspection, without an evaluated temporal event-segmentation or cross-camera association mechanism (§§2.3, 3.1).

## Evidence and limits

Tables 2–4 report sensitivity increasing from 76.3% to 84.7% and specificity from 74.3% to 91.7%. Evaluation is explicitly per safety rule, with 300 positive and 300 negative test cases, not event recall or false alerts per camera-hour (§3.2). The dataset contains 1,500 images after augmentation, with 900 for training/validation and 600 for testing. Independence of augmented source images across splits is not established (§3.1).

**Practical evidence:** Authors report installation at Shek Wu Hui Sewage Treatment Works (§3.1). This supports a field-system example, but no controlled operational benefit, sustained multi-camera throughput or measured detection-to-alert distribution is supplied. Occluded limbs, thin lanyards and anchorage points remain difficult, and the authors acknowledge hallucinations (§3.3).

## Research connections

- **Builds on:** Hong et al., CogAgent — high-resolution visual-language backbone adapted through staged instruction tuning (§2.2, Fig. 4).
- **Cites:** Tang, Roberts and Golparvar-Fard, human–object interaction recognition for safety inspection — motivates richer semantic reasoning than object labels (§1, References).

## Relevance to Aligned

Our interpretation: a high-priority construction reference for periodic inspection, explicit rules and evidence-linked alarms. Its reported sampling interval is a design choice, not a guaranteed response time. We still need persistent events, duplicate suppression, abstention when hands or anchors are invisible, and day-level coverage accounting.

## Human notes
