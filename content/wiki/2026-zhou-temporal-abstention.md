---
year: 2026
venue: "ICLR"
affiliations: ["The Hong Kong University of Science and Technology (Guangzhou)", "Tongji University", "University of Tübingen", "The Hong Kong University of Science and Technology"]
research_groups: []
reviewed: false
tags: [method]
---

# When Silence Is Golden: Can LLMs Learn to Abstain in Temporal QA and Beyond?

Studies learned abstention in temporal text QA through reasoning supervision and abstention-aware reinforcement learning.

**Authors:** Xinyu Zhou, Chang Jin, Carsten Eickhoff, Zhijiang Guo, Seyed Ali Bahrainian.
**Paper:** [PDF](../raw/2026-zhou-temporal-abstention.pdf)
**Website:** Not found in checked sources.
**Code:** [GitHub repository](https://github.com/Blackzxy/AbstentionTemporalQA)
**Source version:** arXiv:2602.04755v2, 4 March 2026, ICLR 2026 paper. The experiments concern text QA, not video.
**Citations:** 0 ([OpenAlex](https://openalex.org/W7128022193), checked 2026-11-03).

![When Silence Is Golden: Figure 2 from the paper](../assets/2026-zhou-temporal-abstention.png)

*Figure 2 from the original paper ([PDF page 4](../raw/2026-zhou-temporal-abstention.pdf#page=4)).*

## Problem and contribution

Temporal questions can become unanswerable when facts refer to incompatible or ambiguous periods. A model may answer confidently despite that mismatch. The paper compares evidence representations and training strategies for generating an answer or an explicit “No Answer” (§§3–4).

## Approach

Question and text context → optional temporal sub-context or knowledge-graph facts → answer or abstention.

The strongest studied training pipeline uses expert-generated reasoning traces filtered by final-answer correctness for supervised fine-tuning, followed by GRPO. A rule-based reward combines output formatting, lexical/exact-match answer scores, and correct abstention. False abstention and answers to unanswerable questions receive no answer reward. Alternative pipelines use time-filtered context or retrieved temporal graph facts (§4, Fig. 2).

No video encoder, timestamp extraction or evidence-capture module is provided. A faithful event ledger would have to be constructed separately before applying these ideas to video.

## Evidence and limits

TimeQA supplies answerable and unanswerable textual questions, with additional out-of-distribution text QA tests. Models range up to 7B, while the principal RL experiment uses Qwen2.5-1.5B. Table 2 and §5.2 show improved answer scores after the reasoning-supervision/RL pipeline, but the reliability analysis is mixed: on TimeQA-Hard, RL reduces abstention and increases false negatives (§6.3, Fig. 4b).

Adding more graph facts can also reduce abstention. Better answer accuracy therefore does not establish reliable uncertainty recognition. The limited models, single-turn English setting and dependence on generated supervision constrain generalization (limitations). No visual missing-evidence or construction evaluation is performed.

## Research connections

- **Builds on:** GRPO supplies the RL optimization method (§3.2), and TimeQA supplies temporally scoped questions (§5.1).
- **Compares with:** supervised fine-tuning, LoRA, prompting and a separate answerability classifier (Tables 1–2).

## Relevance to Aligned

Our interpretation: a training and evaluation reference for refusing unsupported temporal answers after retrieval. Evaluate answer errors, missed abstentions and unnecessary abstentions separately. Training an answer policy cannot repair missing observations or certify a closed issue.

## Human notes
