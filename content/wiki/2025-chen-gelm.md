---
year: 2025
venue: "AAAI"
affiliations: [Shanghai Jiao Tong University]
research_groups: []
reviewed: false
tags: [dataset, benchmark, method, video-qa, video-retrieval, egocentric-video]
---

# Grounded Multi-Hop VideoQA in Long-Form Egocentric Videos

GeLM links answer phrases to multiple supporting video intervals, with MultiHop-EgoQA measuring both answer quality and temporal evidence localization.

**Authors:** Qirui Chen, Shangzhe Di, Weidi Xie.
**Paper:** [PDF](../raw/2025-chen-gelm.pdf)
**Website:** [Project website](https://qirui-chen.github.io/MultiHop-EgoQA)
**Code:** [Official repository](https://github.com/qirui-chen/MultiHop-EgoQA)
**Source version:** arXiv 2408.14469v1, 26 August 2024. Publication year follows the verified AAAI 2025 proceedings. Numerical claims below follow the archived preprint.
**Citations:** 14 ([OpenAlex](https://openalex.org/W4409346443), checked 2026-11-03).

![GeLM grounded video question answering architecture](../assets/2025-chen-gelm.png)

*Figure 3. GeLM grounded video question answering architecture. Source: [original paper, PDF p. 5](../raw/2025-chen-gelm.pdf#page=5).*

## Problem and contribution

A useful answer may depend on several disjoint moments, such as every ingredient cut during a procedure. Returning one interval or a plausible sentence does not establish that all relevant evidence was found. The paper contributes an evidence-annotated benchmark, automatically generated training data and a model that grounds individual answer phrases (§§3–5).

## Approach

The input is a question and a three-minute ego video. Frozen InternVideo features are projected into Vicuna-7B. Generated answers contain paired grounding tokens around relevant phrases. Their hidden states interact with visual features through a temporal saliency transformer and a phrase–frame similarity branch. Thresholded scores become multiple supporting time intervals (Fig. 3, §5).

Narrations from Ego4D supply action descriptions and approximate intervals. A language model generates and filters multi-hop question–answer–evidence triplets. Training uses 10,414 samples from 3,156 clips, combining language loss, saliency supervision and contrastive phrase–frame alignment. The evaluation set contains 1,080 manually verified and refined triplets from 360 clips (§4, §6.3).

The representation consists of clip features and answer-conditioned grounding vectors. Full-clip processing is offline. “Long-form” here means approximately three minutes, not persistent memory across a worker's shift.

## Evidence and limits

Adding saliency supervision to the similarity branch improves mean temporal IoU from 13.4 to 16.7 and success at IoU 0.3 from 14.1% to 18.2%. This same-model control supports complementary training objectives, while absolute localization remains weak (Table 3).

GeLM's QA score is 4.8/10 versus GPT-4o's 5.4/10. Their grounding comparison is not controlled for training or visual access: GeLM is fine-tuned with 180 frame units, while GPT-4o uses 60 frames zero-shot. The implementation also extracts features at eight frames per second, so table budgets are not total processing-cost measurements (Table 2, §6.3).

Synthetic training labels and GPT-based generation, filtering and answer judging can share biases. Human results use only 10% of the test set. Released code and checkpoints aid reuse, but neither reliable evidence citation nor long-horizon memory is established.

## Research connections

- **Builds on:** [[2022-grauman-ego4d]] — derives clips and narrations for grounded-QA construction (§4.1).
- **Cites:** Di and Xie, *Grounded Question-Answering in Long Egocentric Videos* (2024) — discusses earlier grounded QA before extending evaluation to scattered evidence (§2).

## Relevance to Aligned

Our interpretation: answer phrases should point to inspectable evidence intervals. GeLM offers a concrete architecture and training target for that interface, with localization errors measured separately from fluent answers.

## Human notes
