---
year: 2026
venue: "ECCV"
affiliations: ["University of Maryland, College Park"]
research_groups: []
reviewed: false
tags: [procedure-understanding, video-representation, efficient-processing, egocentric-video]
---

# VidParse: Online Parsing of Egocentric Procedures Like a Pro

VidParse combines frozen hand–object features, similarity-based boundaries, and task-graph constraints to parse egocentric procedures without gradient updates.

**Authors:** Anubhav Gupta, Archit Kambhamettu, Vatsal Agarwal, Pulkit Kumar, Abhinav Shrivastava.
**Paper:** [PDF](../raw/2026-gupta-vidparse.pdf)
**Website:** [Project website](https://learn2phoenix.github.io/VidParse/)
**Code:** [GitHub repository](https://github.com/learn2phoenix/VidParse)
**Source version:** arXiv:2608.27562v2, 27 October 2026, first released 27 August 2026. [ECCV 2026](https://eccv.ecva.net/virtual/2026/poster/4540), listed under the conference title *Egocentric Procedure Parsing*. Version 2 corrects GTEA evaluation to four splits.

![VidParse: Figure 2 from the paper](../assets/2026-gupta-vidparse.png)

*Figure 2 from the original paper ([PDF page 4](../raw/2026-gupta-vidparse.pdf#page=4)).*

## Problem and contribution

Frame classifiers can flicker between steps while losing a procedure's longer dependencies. VidParse instead segments changes in manipulation appearance and restricts decoding to an observed task graph. Its training-free claim means no downstream weight optimization, not absence of annotated task data (§§1–3).

## Approach

A frozen hand–object detector defines an enclosing interaction region. Frozen DINOv2 patch features averaged inside it yield a frame descriptor, with missing detections replaced by the previous valid feature. A sliding self-similarity matrix and Gaussian-weighted checkerboard filter detect changes, producing action segments (§§3.2–3.3).

Offline preparation clusters labeled training examples into short action prototypes and derives prerequisites, optional steps, starts, and revisits from ordered annotations. During inference, segment descriptors match these prototypes by cosine distance. A ten-hypothesis beam combines duration-weighted visual costs with visibility rules and rejects transitions absent from the graph (§§3.4–3.5, 4.2).

The graph and prototypes persist across a run, while the visual boundary buffer is short. Predictions remain revisable within a fixed lag, including retroactive filling of brief background gaps, then become committed. This is delayed online segmentation, not immediate per-frame output. [?] The paper describes the commitment lag only as a few seconds. A special rule suppresses background predictions during the known microwave step (Supplement §§5–6).

## Evidence and limits

On normal EgoPER recordings, F1@0.5 reaches 77.6 versus ProTAS's 51.3, with frame accuracy 80.7 versus 76.6. Offline MS-TCN remains stronger on this dataset. Corrected four-split GTEA F1@0.5 is 74.0 versus 54.9 for ProTAS (Table 1).

Average processing totals 408.6 seconds/video, including 339 seconds for hand–object detection, 36.8 for features, and 32.8 for CPU parsing. The reported 8.6 fps exceeds ProTAS's 4.5 fps but remains below EgoPER's 10-fps input sampling rate (Table 3). Fast decoding alone therefore does not establish real-time end-to-end operation.

The hard graph can reject a genuinely valid unseen order and force an incorrect parse. Because evaluation excludes EgoPER's erroneous videos, it does not demonstrate mistake detection. Long occlusions and non-manual actions weaken the interaction features (§§4.1, 6, Supplement §6).

## Research connections

- **Builds on:** [[2024-lee-egoper]] — supplies procedural videos and step annotations (§4.1).
- **Builds on:** DINOv2 and Shan et al.'s hand–object detector — provide frozen visual features (§3.2).
- **Compares with:** ProTAS — online parsing baseline, including feature and speed comparisons (Tables 1–3).

## Relevance to Aligned

Our interpretation: graph constraints can stabilize progress tracking, but an assistant should retain evidence of unexpected actions rather than automatically forcing them onto valid paths.

## Human notes
