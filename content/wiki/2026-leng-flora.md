---
year: 2026
venue: "arXiv preprint"
affiliations: ["NVIDIA"]
research_groups: [nvidia-gear]
reviewed: false
tags: [execution-quality, reward-learning, efficient-processing, egocentric-video, production-use]
---

# FLORA: An Open Model Suite for Scaling Robotics Data Engines

FLORA turns human or robot episode videos into timestamped action captions and several forms of execution-reward labels.

**Authors:** Sicong Leng, Yunze Man, Zhiqi Li, Jing Wang, Yuhe Zhang, Ryan Punamiya, Siddharth Patki, Kaiyuan Zheng, Zi-ang Cao, Zhiding Yu, Sifei Liu, Danfei Xu, Ben Levin, Jan Kautz, Yuke Zhu, Johan Bjorck, Linxi Jim Fan.
**Paper:** [PDF](../raw/2026-leng-flora.pdf)
**Source version:** arXiv 2610.31779v1, submitted 22 October 2026. The PDF itself is dated 26 October.
**Website:** [NVIDIA GEAR project](https://research.nvidia.com/labs/gear/flora/)
**Code:** [Sample inference code](https://github.com/NVIDIA/Flora) · [Model collection](https://huggingface.co/collections/nvidia/flora)

![FLORA: Figure 1 from the paper](../assets/2026-leng-flora.png)

*Figure 1 from the original paper ([PDF page 1](../raw/2026-leng-flora.pdf#page=1)).*

## Problem and contribution

Robot data pipelines need action descriptions, temporal boundaries and quality judgments. Separate specialist models cover only parts of this workload, while repeated frontier-model calls are expensive. FLORA packages segmentation, captioning and reward annotation as reusable models, with evaluation of complete annotation pipelines (§§1–2).

## Approach

**Training:** a Qwen3.5-9B segmenter and Qwen3.5-27B captioner receive supervised fine-tuning followed by GRPO. A separate 27B rewarder receives supervised fine-tuning. These are distinct models, not one shared agent that learns an execution policy (§4.3).

**Video to captions:** the segmenter processes overlapping video windows and predicts event boundaries with continuation information. Stitching reconstructs intervals in the original timeline. For each fixed interval, the captioner receives the target frames and neighboring context, then describes the intended action, objects and manipulator roles. A failed attempt retains its intended action without being described as successful. Outputs are timestamped text records (§4.1, Fig. 6).

**Video to rewards:** the rewarder consumes task-conditioned video under three prompts. It predicts whole-episode completion on a five-level scale, dense normal/suboptimal/failure labels, or grades against a user-provided rubric. Dense labeling uses overlapping windows and future evidence, so it is retrospective processing rather than a causal online alarm (§4.2). Training annotations and rubric definitions supply human supervision. Generated labels still require validation for a new deployment.

## Evidence and limits

Evaluation includes WGO-Bench, RoboRewardBench and RobometerBench, plus internal caption and reward benchmarks. Better segmentation does not imply universally better captions: on WGO-Bench, FLORA trails Astra in caption accuracy and joint annotation quality (§2.1).

DenseRewardBench has only 40 episodes. FLORA detects 53.3% of failure steps but also labels roughly 11% of normal steps as failures (§2.2). Its 125-fold annotation-cost advantage is a model-based estimate, not a measured deployment cost. It assumes a selected 50-episode cohort and eight GB300 GPUs at $10 per GPU-hour (§2.3, Appendix D). Results assess annotation quality, not validated construction skill or downstream policy transfer.

**Practical evidence:** The authors report using FLORA in the GR00T training-data pipeline (abstract, §5 and [official project](https://research.nvidia.com/labs/gear/flora/)). This is author-reported internal operational use. Customer deployment and measured business ROI are not established.

## Research connections

- **Compares with:** [[2026-lee-roboreward]] — evaluates outcome scoring on RoboRewardBench (§2.2).
- **Compares with:** [[2026-liang-robometer]] — evaluates trajectory ranking and progress ordering (§2.2). Specialized-model results retain their published protocols.

## Relevance to Aligned

Our interpretation: a concrete candidate for producing searchable event records alongside separate quality labels. Preserve source timestamps and video evidence, then let a human validate captions and failures. Its outputs could feed a memory system, but FLORA itself does not implement long-term retrieval or Q&A.

## Human notes
