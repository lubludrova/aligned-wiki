---
year: 2026
venue: "arXiv preprint"
affiliations: ["Johns Hopkins University", "Johns Hopkins University Applied Physics Laboratory"]
research_groups: [jhu-b3]
reviewed: false
tags: [video-memory, spatial-understanding, video-qa, egocentric-video]
---

# Never Look Back: Understanding Persistence in 3D Object Memory from Egocentric Videos

LEDGER stores object identities, 3D locations, histories, and descriptions so later questions can use persistent memory without replaying video.

**Authors:** Shravan S Chaudhari, William Paul, Suchi Saria, Rama Chellappa, Homanga Bharadhwaj.
**Paper:** [PDF](../raw/2026-chaudhari-ledger.pdf) · [arXiv v1](https://arxiv.org/abs/2610.10538v1)
**Website:** [Project website](https://ledger-3d.github.io/)
**Code:** [GitHub repository](https://github.com/LEDGER-3D/LEDGER)

![LEDGER — Never Look Back: Figure 2 from the paper](../assets/2026-chaudhari-ledger.png)

*Figure 2 from the original paper ([PDF page 5](../raw/2026-chaudhari-ledger.pdf#page=5)).*

## Problem and contribution

Remembering only touched objects or summarizing isolated clips misses objects that matter later. LEDGER investigates persistence: retaining an object's identity and recorded locations after it leaves view. It makes geometry and observation history directly accessible to a language-model reader, including for untouched objects (§§1–3).

## Approach

The construction pipeline discovers object categories, detects objects, lifts observations into 3D, and associates them across frames using labels and geometry. A later mask-based pass merges fragmented tracks. Camera poses are supplied where available or estimated. Observations are grouped into stable location segments, with contextual descriptions attached to object histories (§3, Figure 2).

The memory contains object records, times observed, recorded movements, and supporting scene or event context. It distinguishes unobserved intervals from known positions rather than claiming continuous visibility. A question retrieves relevant records, which a language model reads as text. Spatial queries can also use camera pose and object coordinates. The default reader does not revisit source frames.

This is an offline construction pipeline using pretrained components. Restricting a memory snapshot to observations before a question does not make the underlying construction causal, an explicit distinction in §3.2.

## Evidence and limits

Evaluation covers HD-EPIC questions, UCS-Bench, and Ego4D VQ3D. Ablations show that object persistence, descriptions, and geometry help different question types, while video frames remain useful and more agentic reading is not consistently better (§4).

In a named-object adaptation of VQ3D, median error is 0.99 metres over 153 returned predictions from 164 queries (Table 4, Appendix C.1). Coverage matters, and this differs from the official crop-query protocol. Scene transitions can damage both construction and retrieval, and geometry is not uniformly metric across datasets. Expensive tracking also limits scale: the HourVideo study builds memory for only 21 of 167 recordings (Appendix D). None of these experiments establishes defect detection or precise construction metrology.

## Research connections

- **Compares with:** [[2025-plizzari-osnom]] — adapts object-permanence tracking for spatial-memory evaluation (§4, Appendix C).
- **Compares with:** [[2024-goletto-amego]] — tests interaction-centered memory against broader persistent object coverage (§4).

## Relevance to Aligned

Our interpretation: a candidate representation for where tools and materials were last observed and how their recorded locations changed. Identity errors, uncertainty during absence, and offline processing must remain visible to any quality-assessment layer.

## Human notes
