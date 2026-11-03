---
year: 2018
venue: "CVPR"
affiliations: [University of Bristol]
research_groups: []
reviewed: false
tags: [execution-quality, preference-learning]
---

# Who’s Better? Who’s Best? Pairwise Deep Ranking for Skill Determination

A Siamese video model learns relative skill scores from pairwise judgments and ranks complete demonstrations of the same task.

**Authors:** Hazel Doughty, Dima Damen, Walterio Mayol-Cuevas.
**Paper:** [PDF](../raw/2018-doughty-skill-ranking.pdf)
**Website:** [Author project page](https://dimadamen.github.io/Skill/)
**Code:** Not found in checked sources.
**Data:** [Official EPIC-Skills 2018 annotations and video links](https://github.com/hazeld/EPIC-Skills2018)
**Source version:** Author-hosted, 10-page accepted paper for [CVPR 2018, pp. 6057–6066](https://openaccess.thecvf.com/content_cvpr_2018/html/Doughty_Whos_Better_Whos_CVPR_2018_paper.html). This is the pairwise-ranking paper, not the later rank-aware temporal-attention model also featured on the project page.

![Pairwise skill comparison and demonstration ranking](../assets/2018-doughty-skill-ranking.png)

*Figure 1. Pairwise skill comparison and demonstration ranking. Source: [original paper, PDF p. 1](../raw/2018-doughty-skill-ranking.pdf#page=1).*

## Problem and contribution

Task completion time and action identity do not determine how skillfully someone performs. The paper learns a relative score per demonstration, rather than a fixed expert/novice label per person. It adds temporal split supervision and a similarity loss to pairwise ranking, and releases EPIC-Skills annotations covering surgery, dough rolling, drawing, and chopstick use (§§1, 3–4).

## Approach

Training pairs contain complete videos of the same task. Shared-weight Siamese branches use Temporal Segment Networks with separate RGB and optical-flow streams. Each video is divided into corresponding temporal splits, with sampled snippets producing a score per split. Ordered pairs receive a margin-ranking loss. Pairs judged similar receive a loss discouraging score differences above a margin. This assumes that corresponding normalized splits depict comparable progress through the task (Fig. 2, §§3.3–3.6).

Surgical comparisons derive from expert scores. Other tasks use four crowd judgments per pair, retaining unanimous rankings and deriving similar pairs from their partial-order graph. Similarity therefore does not simply mean every disputed comparison (§4.1).

At inference, a single video is sufficient: sample snippets across it, average each stream's scores, combine the streams, and sort videos by their scalar scores. The stored representation is model parameters and per-video scores, not a temporal memory or a localized explanation (§3.7).

## Evidence and limits

Four-fold evaluation reports two-stream pairwise precision of 70.2% for surgery, 79.4% for dough rolling, 83.2% for drawing, and 71.5% for chopsticks. RankSVM remains better on chopsticks at 76.6% (Tables 2–3). Motion features generally help, and using a single frame is insufficient (Figs. 4–5).

The test protocol includes pairs with one video previously seen in another training pair. It does not establish generalization to entirely unseen workers or new task categories. Datasets are small, ambiguous preferences are filtered, and scalar rankings do not certify absolute workmanship or locate errors (§§4–5). Evaluation is offline on recordings.

## Research connections

- **Builds on:** Wang et al., *Temporal Segment Networks* (2016) — reuses sparse video sampling and two-stream consensus (§3.3).
- **Builds on:** Yao et al., *Highlight Detection with Pairwise Deep Ranking for First-Person Video Summarization* (2016) — extends its ranking-margin formulation and evaluates its adapted baseline (§§2, 5.4).

## Relevance to Aligned

Our interpretation: this is a useful baseline for comparison-based proof-of-skill research, provided evaluation separates workers and tasks and preserves uncertainty in human judgments.

## Human notes
