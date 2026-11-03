---
year: 2024
venue: "Findings of NAACL"
affiliations: ["University of Rochester", "University of Texas at Dallas", "Arizona State University"]
research_groups: []
reviewed: false
tags: [dataset, benchmark, method, state-changes, video-qa, egocentric-video]
---

# OSCaR: Object State Captioning and State Change Representation

OSCaR creates language supervision and benchmarks for describing object states, explaining their changes, and answering questions about egocentric interactions.

**Authors:** Nguyen Nguyen, Jing Bi, Ali Vosoughi, Yapeng Tian, Pooyan Fazli, Chenliang Xu.
**Paper:** [PDF](../raw/2024-nguyen-oscar.pdf)
**Website:** [Project website](https://nguyennm1024.github.io/OSCaR/)
**Code:** [GitHub repository](https://github.com/nguyennm1024/OSCaR)
**Source version:** arXiv:2402.17128v4, 2 April 2024, including Appendix A. Published in Findings of NAACL 2024.
**Citations:** 10 ([OpenAlex](https://openalex.org/W4401043560), checked 2026-11-03).

![OSCaR object state descriptions and state-change reasoning examples](../assets/2024-nguyen-oscar.png)

*Figure 2. OSCaR object state descriptions and state-change reasoning examples. Source: [original paper, PDF p. 2](../raw/2024-nguyen-oscar.pdf#page=2).*

## Problem and contribution

A short action label such as “cut” omits appearance, material and intermediate-state details. OSCaR represents those details in natural language, combining captioning, question answering and dialogue. Its central contribution is a GPT-4V-assisted annotation pipeline and benchmark, accompanied by instruction-tuned LLaVA baselines (§§1–3).

## Approach

The pipeline selects EPIC-KITCHENS and Ego4D segments using existing actions, object names and event boundaries. Three frames represent before, during and after an interaction. GPT-4V receives these frames plus the annotated action and object, then generates three frame descriptions and one change description. Further prompts turn captions into multiple-choice questions and dialogues, including reasoning questions (§3.2, Appendix A.1).

For the baseline, CLIP image features pass through a learned projector into Vicuna's token space. LLaVA then generates answers conditioned on visual content and a text prompt. LoRA fine-tuning uses the generated instruction data, either alone or mixed with LLaVA's original data, for one epoch (§6.1). This is offline supervision and sampled-frame inference. It provides no persistent object memory or streaming change detector.

## Evidence and limits

The human-checked benchmark contains 500 videos with four captions each. The mixed-data 7B model reaches ROUGE-L 26.24 versus 22.60 for LLaVA 7B (Table 2). Seven evaluators also select favorable descriptions for only five videos. OSCaR is selected 73.93% of the time versus GPT-4V's 82.5%, with up to two selections allowed (§6.3, Figure 6).

Novel-object evaluation includes 344 cooking clips and 356 clips across other domains, but references are GPT-4V-generated rather than equivalently human-corrected (§§4.2, 6.4). Text overlap therefore measures agreement with synthetic descriptions, not verified physical causality. GPT-4V also judges model outputs, introducing dependence on the same model used for supervision. Missing audio and long-term transitions remain explicit limitations (§8).

## Research connections

- **Builds on:** [[2022-grauman-ego4d]] — mines annotated interactions as source videos (§3.1).
- **Cites:** [[2024-xue-vidosc]] — concurrent open-world state-change research with a different formulation (§1).
- **Cites:** [[2022-soucek-look-for-change]] — earlier joint temporal localization of states and actions (§2).
- **Builds on:** LLaVA, Liu et al. — visual instruction-tuning architecture and baseline (§6.1).

## Relevance to Aligned

Our interpretation: state descriptions could make visual evidence legible to a worker or downstream reasoning model. They need grounding checks and task-specific acceptance criteria before descriptions can justify completion or quality judgments.

## Human notes
