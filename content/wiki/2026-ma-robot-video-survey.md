---
year: 2026
venue: "arXiv preprint"
affiliations: ["Shanghai Jiao Tong University", "University of Cambridge", "Key Laboratory of System Control and Information Processing, Ministry of Education of China"]
research_groups: []
reviewed: false
tags: [survey, robot-learning, video-representation, reward-learning, egocentric-video]
---

# Robot Learning from Human Videos: A Survey

Organizes human-video-to-robot transfer by task, observation and action interfaces, relating each pathway to supervision, data requirements and physical grounding.

**Authors:** Junyi Ma, Erhang Zhang, Haoran Yang, Ditao Li, Chenyang Xu, Guangming Wang, Hesheng Wang.
**Paper:** [PDF](../raw/2026-ma-robot-video-survey.pdf) · [arXiv v1](https://arxiv.org/abs/2604.27621v1)
**Website:** Not found in checked sources.
**Code:** [Companion repository](https://github.com/IRMVLab/awesome-robot-learning-from-human-videos) — curated literature list and update tooling, not a robot-policy implementation.
**Source version:** arXiv:2604.27621v1, 30 April 2026. No journal acceptance verified. The archived PDF uses a SAGE template with an unassigned journal title and DOI.
**Citations:** 0 ([OpenAlex](https://openalex.org/W7159680369), checked 2026-11-04).

![Taxonomy separating task, observation and action transfer from human-video data foundations](../assets/2026-ma-robot-video-survey.png)

*Figure 2. Human-robot transfer pathways and data foundations. Source: [archived PDF, p. 2](../raw/2026-ma-robot-video-survey.pdf#page=2).*

## Problem and contribution

Human videos contain abundant demonstrations but usually lack executable robot actions. This survey examines how task knowledge, visual information and motion cues cross that gap. Its contribution is a synthesis of manipulation-learning methods and data sources, rather than a new robot policy (§§1–2).

## Approach

Task-oriented transfer extracts explicit step structures or compact task intentions to guide planners and existing skills. Observation-oriented transfer transforms human videos into robot-like or body-independent views, or learns shared visual embeddings. Action-oriented transfer extracts explicit affordances, such as contacts and trajectories, or learns latent action codes from visual changes (§3, Figure 2).

These pathways describe the information transferred, separately from the learning algorithm. Imitation learning uses video-derived instructions, observations or action cues. RL can use them for policy initialization and reward construction. Methods are classified by their dominant transfer pathway even when they combine several (§§2–3.4).

The practical selection guide asks which bottleneck matters. Task plans require downstream skills, visual alignment does not supply missing actions, geometric cues require reliable interaction parsing, and latent actions still need grounding in robot controls. Hybrid systems can combine planning, perception and motion priors with closed-loop correction (§3.5, Table 9).

## Evidence and limits

The survey catalogs 50 existing human-video datasets and records their attributes and use by reviewed studies (§4.1, Tables 10–11). It introduces neither a new video dataset nor an evaluation benchmark. The companion repository can evolve beyond the archived PDF.

Comparisons synthesize published studies, not a shared experimental rerun. Different robots, tasks, video sources and training data prevent a clean ranking of transfer pathways (§5.7). Human trajectories or plausible generated videos do not establish robot feasibility, contact stability or successful physical execution. No new robot trial validates the survey's overall taxonomy (§§3.5, 5).

## Research connections

- **Cites:** [[2023-ma-vip]] — discusses value-oriented visual pretraining within observation transfer (§3.2.2, PDF p. 9).
- **Cites:** [[2022-grauman-ego4d]] — maps its use across human-video learning studies (§4.1, Table 11).
- **Cites:** [[2025-chavan-indego]] — includes industrial egocentric footage among potential data sources (§4.1, Tables 10–11, §5.5).

## Relevance to Aligned

Our interpretation: use this taxonomy for the future transition from worker recordings to robot training, explicitly stating which information transfers and what robot supervision remains necessary. For current construction-video assessment, action recognition, visual progress and executable skill remain separate claims. Persistent evidence memory and procedural correctness require additional mechanisms.

## Human notes
