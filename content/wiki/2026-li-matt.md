---
year: 2026
venue: "CVPR"
affiliations: ["University of Michigan", "Voxel51"]
research_groups: []
reviewed: false
tags: [dataset, benchmark, method, execution-quality, egocentric-video, supervised-training]
---

# Mistake Attribution: Fine-Grained Mistake Understanding in Egocentric Videos

MATT attributes instruction–video mismatches to semantic roles, a reference moment, and a spatial region using synthetic supervision from existing egocentric datasets.

**Authors:** Yayuan Li, Aadit Jain, Filippos Bellos, Jason J. Corso.
**Paper:** [PDF](../raw/2026-li-matt.pdf)
**Website:** [Project website](https://yayuanli.github.io/MATT/)
**Code:** [GitHub repository](https://github.com/yayuanli/MATT)
**Source version:** arXiv:2511.20525v2, 25 March 2026, first released 25 November 2025. [CVPR 2026 proceedings](https://openaccess.thecvf.com/content/CVPR2026/html/Li_Mistake_Attribution_Fine-Grained_Mistake_Understanding_in_Egocentric_Videos_CVPR_2026_paper.html) independently confirm publication.
**Citations:** 0 ([OpenAlex](https://openalex.org/W4417094662), checked 2026-11-03).

![MATT: Figure 3 from the paper](../assets/2026-li-matt.png)

*Figure 3 from the original paper ([PDF page 6](../raw/2026-li-matt.pdf#page=6)).*

## Problem and contribution

Binary mistake detection says little about what went wrong. MATT separates attribution into the violated instruction component, its temporal reference or Point-of-No-Return (PNR), and the relevant image region. MisEngine generates supervision, while MisFormer predicts these outputs jointly (§§1, 3).

## Approach

MisEngine parses short instructions into predicate and object roles, then pairs instructions with clips containing different verbs, objects, both, or neither. It creates 257,584 Ego4D-M and 221,094 EPIC-KITCHENS-M pairs. Ego4D state-change timestamps and hand/object annotations supply inherited PNR and box targets. These are proxies for mistake consolidation, not newly observed irreversible mistakes. EPIC-KITCHENS-M supplies semantic supervision only (§3.1, Supplement A–B).

MisFormer cross-attends instruction-role embeddings to video-patch features. Figure 3 marks its pretrained text and video encoders as frozen. Trainable heads predict role-wise errors with binary cross-entropy, frame probabilities with cross-entropy, and bounding boxes with Huber loss. Spatial decoding combines an attention map with the selected frame's RGB pixels. Temporal and spatial losses apply only to mistake examples, and inference activates these heads when a semantic error is predicted (§3.2).

Temporal attention explicitly has no causal mask. Processing uses a completed attempt clip, averaging about eight seconds, rather than maintaining persistent procedural memory. Representation extraction and attribution happen per attempt. The paper does not establish streaming response latency (§§3.2, 4.2).

## Evidence and limits

Semantic F1 reaches 56.24 on Ego4D-M and 83.89 on EPIC-KITCHENS-M. On the smaller subset also evaluated by ChatGPT-4o, MisFormer scores 55.41/84.78 versus 50.95/77.23, respectively (Table 2).

Spatial mIoU is 59.21 versus SSDA's stronger 64.54, despite the abstract's broad superiority claim. [?] Several numbers conflict between tables and prose, including SSDA localization and PNR error across Tables 3 and 6. The reported 68.9 fps measures only spatial attribution, not the complete system (Table 4, §4.2).

EgoPER mistake-detection F1 rises from 26.78 to 35.18 with synthetic pretraining, versus EgoPED's 32.18, but supervision differs (Table 5). Synthetic role swaps omit many omissions, ordering errors, and subtle execution failures. The 8:1:1 pair split does not establish source-clip or person independence. A sixteen-person realism study evaluates dataset examples, not an assistance system (Supplement B).

## Research connections

- **Builds on:** [[2022-grauman-ego4d]] — supplies videos and inherited temporal/spatial supervision (§3.1).
- **Compares with:** [[2024-lee-egoper]] and [[2025-huang-amnar]] — mistake-detection baselines and transfer evaluation (Table 5).

## Relevance to Aligned

Our interpretation: explicit what/when/where outputs could make feedback auditable, but synthetic mismatches and full-clip inference do not yet establish timely intervention during genuine mistakes.

## Human notes
