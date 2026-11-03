---
year: 2024
venue: "ECCV"
affiliations: ["Politecnico di Torino", "FAIR, Meta", "University of Bristol"]
research_groups: [meta-fair, bristol-mavi]
reviewed: false
tags: [video-memory, video-retrieval, spatial-understanding, egocentric-video]
---

# AMEGO: Active Memory from long EGOcentric videos

AMEGO builds a reusable visual memory of hand-object interactions and activity locations, then answers queries about their timing, order and overlap.

**Authors:** Gabriele Goletto, Tushar Nagarajan, Giuseppe Averta, Dima Damen.
**Paper:** [PDF](../raw/2024-goletto-amego.pdf)
**Website:** [Project website](https://gabrielegoletto.github.io/AMEGO/)
**Code:** [GitHub repository](https://github.com/gabrielegoletto/AMEGO)
**Source version:** arXiv:2409.10917v1, 17 September 2024, including the appendix. Published at ECCV 2024.

![AMEGO object interactions and location memory](../assets/2024-goletto-amego.png)

*Figure 1. AMEGO object interactions and location memory. Source: [original paper, PDF p. 2](../raw/2024-goletto-amego.pdf#page=2).*

## Problem and contribution

Uniformly sampled video features can miss which object a person actually manipulated and where. AMEGO stores these interactions explicitly without imposing an object-category vocabulary. Its Active Memories Benchmark (AMB) evaluates fine-grained sequencing, concurrency and temporal grounding through visual multiple-choice queries (§§1, 4).

## Approach

Egocentric frames enter an incremental pipeline. Consistent hand-object detections initiate interaction tracklets. EgoSTARK extends object tracks when hands disappear, while hand visibility and new detections help decide when interactions end. Completed tracks store bounding boxes, timestamps, hand side and averaged DINOv2 features. Online similarity clustering links them to previously observed object instances (§3.1).

Low optical flow plus hand presence identifies periods spent interacting at a location. Averaged SWAG features cluster these intervals into recurring activity zones. These are appearance-based locations rather than metric 3D coordinates (§§3.2, 5.1).

After video processing, query-image features retrieve object or location identities. Temporal joins, sequence matching and interval overlap select answers without reprocessing video. Query logic is template-specific, not an LLM dialogue policy. The pipeline uses pretrained components without additional model training, although thresholds are selected using annotated examples (§3.3, Appendix §§9–11).

## Evidence and limits

AMB contains approximately 20,500 questions from 100 EPIC-KITCHENS videos. AMEGO-L achieves 36.3% accuracy against 23.6% for the strongest listed baseline and 20% random guessing (Table 3). Detailed component evaluation covers only two manually annotated videos (§5.2).

Multiple objects held by the same hand remain difficult, and longer videos hurt concurrency and grounding (§5.3). Benchmark construction filters cases involving repeated different instances of the same object class, limiting evidence for difficult identity discrimination (Appendix §8.1). Reuse avoids repeated visual processing, but the paper does not quantify end-to-end runtime or storage savings.

## Research connections

- **Cites:** [[2024-fan-videoagent]] — contrasts its structured memory with AMEGO's focus on manipulated objects (§2, reference 9).
- **Cites:** [[2022-grauman-ego4d]] — motivates long-video understanding and supplies one standalone evaluation video (§§2, 5.2).
- **Builds on:** EgoTracks/EgoSTARK, Tang et al. — provides the single-object tracker used during interactions (§§3.1, 5.1).

## Relevance to Aligned

Our interpretation: interaction-centered memory could support tool-use and work-area retrieval without fixed construction vocabularies. It still needs state-change evidence, reliable re-identification and error reasoning before retrieved interactions can establish execution quality.

## Human notes
