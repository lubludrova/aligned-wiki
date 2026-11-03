---
year: 2025
venue: "CVPR"
affiliations: ["S-Lab, Nanyang Technological University", "LMMs-Lab", "IMDEA Networks", "University of Brescia", "Politecnico di Milano"]
research_groups: [ntu-s-lab, lmms-lab]
reviewed: false
tags: [video-memory, video-retrieval, video-qa, egocentric-video, multi-person]
---

# EgoLife: Towards Egocentric Life Assistant

EgoLife provides synchronized, week-long recordings of six housemates, a long-horizon QA benchmark, and an audio-visual caption memory baseline for personal assistance.

**Authors:** Jingkang Yang, Shuai Liu, Hongming Guo, Yuhao Dong, Xiamengwei Zhang, Sicheng Zhang, Pengyun Wang, Zitang Zhou, Binzhu Xie, Ziyue Wang, Bei Ouyang, Zhengyu Lin, Marco Cominelli, Zhongang Cai, Bo Li, Yuanhan Zhang, Peiyuan Zhang, Fangzhou Hong, Joerg Widmer, Francesco Gringoli, Lei Yang, Ziwei Liu.
**Paper:** [PDF](https://arxiv.org/pdf/2503.03803v3)
**Website:** [Project website](https://egolife-ai.github.io/)
**Code:** [GitHub repository](https://github.com/EvolvingLMMs-Lab/EgoLife)
**Source version:** arXiv:2503.03803v3, 9 February 2026, an affiliation-corrected revision of the [CVPR 2025 publication](https://openaccess.thecvf.com/content/CVPR2025/html/Yang_EgoLife_Towards_Egocentric_Life_Assistant_CVPR_2025_paper.html). Affiliations follow its corrected title page.

## Problem and contribution

Life assistance requires remembering repeated events, identities, habits, and interactions across days. EgoLife records six participants preparing a party together, using Aria glasses and synchronized external sensors. Approximately 300 hours were captured, with 266 hours retained. EgoLifeQA contains 3,000 multiple-choice questions covering objects, events, tasks, habits, and interpersonal relationships. Questions require evidence at least five minutes earlier (§3, Tables 1–2).

## Approach

EgoButler combines EgoGPT for clip understanding with EgoRAG for memory retrieval. EgoGPT extends LLaVA-OneVision with Whisper audio features. It is supervised on EgoIT-99K, whose QA pairs are generated from existing dataset annotations, and optionally fine-tuned on EgoLife's first-day captions for identity personalization (§4.1).

During ingestion, EgoGPT captions 30-second audio-video clips. Timestamped descriptions and hourly/daily summaries form a persistent memory bank. The architectural proposal searches coarse summaries before fine evidence. The reported implementation uses text similarity to retrieve three clips, re-examines evidence with the captioning model, and uses GPT-4o for final answers in the main comparison (§§4.2–5, Fig. 7). The authors characterize retrieval as single-pass, without iterative reasoning recovery (§5).

This shifts video-captioning work to memory construction, but provides no measured ingestion/query cost breakdown or bounded-retention policy. Experiments use stored recordings, not a demonstrated live assistant. Past-evidence questions alone do not establish a fully causal online implementation.

## Evidence and limits

The reported EgoLifeQA evaluation covers Jake's 500 questions, rather than all six participants. Personalized EgoGPT reaches 36.0% average accuracy, versus 33.1% without first-day adaptation and 36.9% with a Gemini captioner (Table 5). Human-verified audio-visual captions reach 45.5%, exposing the memory-quality bottleneck (Table 7).

A single household, predominantly Chinese speech, and researcher encouragement toward informative activities limit naturalistic generalization. Clothing-based identity confusion, incomplete speech understanding, and missing retrieval evidence remain failures (§§3.1, 5). Recording participants is dataset collection, not evidence of assistant efficacy in actual use.

## Research connections

- **Builds on:** [2022-grauman-ego4d](/notes/2022-grauman-ego4d/) — uses its annotated clips in EgoIT instruction tuning (Table 3, Appendix F).
- **Builds on:** LLaVA-OneVision — supplies the multimodal base extended with an audio branch (§4.1).
- **Cites:** [2024-grauman-ego-exo4d](/notes/2024-grauman-ego-exo4d/) — contrasts synchronized skilled-activity recordings with multi-day interpersonal coverage (§2.1, Table 1).

## Relevance to Aligned

Our interpretation: EgoLife is useful for testing memory across workers and days. It does not establish construction-specific state tracking, procedural correctness, or proof of skill.

## Human notes
