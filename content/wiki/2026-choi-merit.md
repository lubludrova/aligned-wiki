---
year: 2026
venue: "ECCV"
affiliations: ["Yonsei University", "Adobe Research"]
research_groups: [yonsei-ciplab, adobe-research]
reviewed: false
tags: [video-memory, video-retrieval, video-qa, efficient-processing, egocentric-video]
---

# Keep It Simple: Multi-Key Episodic Memory Retrieval for Ultra-Long Video Understanding

MERIT indexes short video episodes with several textual keys and expands relevant context only when a question arrives.

**Authors:** Yeeun Choi, Youngbeom Yoo, Joon-Young Lee, Hyolim Kang, Seon Joo Kim.
**Paper:** [PDF](../raw/2026-choi-merit.pdf) · [arXiv v2](https://arxiv.org/abs/2608.07663v2), with [ECCV 2026 acceptance](https://eccv.ecva.net/virtual/2026/poster/5468) independently recorded by the conference.
**Website:** [Project website](https://choi-yeeun.github.io/MERIT/)
**Code:** [GitHub repository](https://github.com/choi-yeeun/MERIT)

![MERIT: Figure 2 from the paper](../assets/2026-choi-merit.png)

*Figure 2 from the original paper ([PDF page 6](../raw/2026-choi-merit.pdf#page=6)).*

## Problem and contribution

Building elaborate semantic graphs before knowing future questions can lose specific evidence and add substantial processing. MERIT instead keeps episodes close to their original content, deferring contextual synthesis until retrieval. Its contribution is a simple alternative to hierarchical and graph memories, not a claim that every task needs less structure (§§1–3).

## Approach

The preprocessing stage divides video into non-overlapping 30-second clips and generates dense captions, incorporating transcripts where available. Clips receive event, object and summary keys, plus a dialogue key when speech is available. The stored record associates these keys with its caption, timestamp, and source clip (§§3, 4.2, Figure 2).

At query time, an agent formulates a search query. Embedding similarity against the best-matching key retrieves candidate clips. A neighbor filter inspects surrounding captions and extracts question-relevant context. The iterative search and stopping decisions use text only. Retrieved visual frames enter the final QA call, after retrieval ends (§3.2, Appendix A). Multiple keys improve specificity, while neighboring episodes restore temporal context.

This is a training-free retrieval pipeline over preprocessed videos. It does not establish continuous, unbounded online operation, and key extraction still depends on the initial captioner.

## Evidence and limits

With GPT-5, MERIT reports 71.2% on the 500-question EgoLifeQA evaluation, 71.8% on LVBench, and 77.7% on Video-MME Long (Tables 1–2). Under reproduced retrieval settings, its EgoLifeQA hit rate is 0.56 versus WorldMM's 0.53, showing that substantial retrieval headroom remains (Table 5).

Construction accounting excludes initial dense captioning. Table 6 measures additional memory-building calls and tokens, not total ingestion expense. More retrieved context also helps large solvers but can hurt the 8B solver (Table 7). Arbitrarily long streaming and downstream construction-quality assessment remain unvalidated (Appendix D.2).

## Research connections

- **Builds on:** [[2026-yeo-worldmm]] — follows its GPT-5-mini dense-captioning setup (§4.2), then replaces graph construction with multi-key episodes.
- **Compares with:** [[2026-rege-egagent]] — includes entity-graph retrieval as a benchmark baseline (Tables 1–2).

## Relevance to Aligned

Our interpretation: a strong first retrieval baseline because the representation is inspectable and preserves access to source clips. Add structured object or procedure state only when experiments show the simpler episodic index misses necessary evidence.

## Human notes
