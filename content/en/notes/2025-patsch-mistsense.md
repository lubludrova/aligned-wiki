---
year: 2025
venue: "ICCV"
affiliations:
  - Technical University of Munich, School of Computation, Information, and Technology, Department of Computer Engineering, Chair of Media Technology
  - Munich Institute of Robotics and Machine Intelligence (MIRMI)
research_groups: [tum-lmt]
reviewed: false
tags: [procedure-understanding, execution-quality, egocentric-video]
---

# MistSense: Versatile Online Detection of Procedural and Execution Mistakes

MistSense combines RGB and hand-motion features to detect procedural and execution errors online, then generates a textual explanation when a detector threshold is crossed.

**Authors:** Constantin Patsch, Yuankai Wu, Marsil Zakour, Driton Salihu, Eckehard Steinbach.

**Paper:** [Stored PDF](https://openaccess.thecvf.com/content/ICCV2025/papers/Patsch_MistSense_Versatile_Online_Detection_of_Procedural_and_Execution_Mistakes_ICCV_2025_paper.pdf)
**Website:** [Official publication page](https://openaccess.thecvf.com/content/ICCV2025/html/Patsch_MistSense_Versatile_Online_Detection_of_Procedural_and_Execution_Mistakes_ICCV_2025_paper.html)
**Code:** Not found in the checked paper, official publication pages, or author-group sources.
**Source version:** CVF open-access accepted ICCV 2025 paper, pp. 14528–14537. The official CVF listing provides no separate supplement.

## Problem and contribution

Incorrect ordering is only one way a procedure can fail. MistSense also targets execution mistakes, such as choosing the wrong object or manipulating it incorrectly, and connects binary detection to an explanation. It learns directly from labeled correct/incorrect execution and annotated explanations rather than requiring only normal demonstrations (§§1–3).

## Approach

For each video segment ending at the current time, a frozen ViT-L and image Q-Former extract RGB features. A trainable Video Q-Former models temporal relations. MediaPipe hand poses pass through a temporal-convolution and self-attention encoder, projection, and separate Hand Q-Former. Adding the two representations feeds a binary mistake classifier (§3.1, Fig. 2).

Training first optimizes detection with weighted binary cross-entropy while keeping the image encoder fixed. Explanation training then fits a projection into Llama 2-7B's embedding space, followed by LoRA adaptation of the language model. At inference, a threshold gate invokes explanation generation after detecting an error. Explanations receive RGB-derived features, not the hand representation (§§3.2–3.3). Features are sampled at 2 fps, and one detection-plus-explanation run takes about four seconds and 20.5 GB VRAM on an RTX A6000 (§4.6).

## Evidence and limits

On Epic-tent-O, RGB plus predicted hands reaches 63.3% overall F1 versus 46.5% for differentiable task-graph learning. This comparison uses different supervision: MistSense adds labeled erroneous examples from the original Epic-tent dataset (§4.2, Table 3). On HoloAssist, overall F1 is 55.7%, but mistake precision is only 10.3% and recall 31.6%, making aggregate performance a poor proxy for dependable alerts (Table 1).

HoloAssist explanations are evaluated on validation data using captioning metrics. Epic-tent explanations are constructed from action/error labels and consequently have repetitive structure. Figure 3 shows wrong diagnoses and missed brief errors. No user study demonstrates effective correction, and the measured inference time does not establish a real-time wearable deployment.

## Research connections

- **Cites:** [2024-lee-egoper](/notes/2024-lee-egoper/) motivates task-specific error detection and contrasts prototype-based methods with temporal-order approaches (§§1–2, reference 18).
- **Cites:** [2022-sener-assembly101](/notes/2022-sener-assembly101/) is discussed as the source of Assembly101-O, not used in MistSense's reported evaluation (§2.3, reference 31).

## Relevance to Aligned

Our interpretation: separate error detection from explanation generation, and evaluate alert precision and diagnosis correctness independently before presenting automatic corrective advice.

## Human notes
