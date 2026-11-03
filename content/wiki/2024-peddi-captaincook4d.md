---
year: 2024
venue: "NeurIPS, Datasets and Benchmarks Track"
affiliations: ["The University of Texas at Dallas", "University of Florida"]
research_groups: []
reviewed: false
tags: [procedure-understanding, execution-quality, egocentric-video]
---

# CaptainCook4D: A Dataset for Understanding Errors in Procedural Activities

CaptainCook4D supplies procedural videos with explicit execution and ordering errors for step-level error recognition, localization and procedure learning.

**Authors:** Rohith Peddi, Shivvrat Arya, Bharath Challa, Likhitha Pallapothula, Akshay Vyas, Bhavya Gouripeddi, Qifan Zhang, Jikai Wang, Vasundhara Komaragiri, Eric Ragan, Nicholas Ruozzi, Yu Xiang, Vibhav Gogate.
**Paper:** [PDF](../raw/2024-peddi-captaincook4d.pdf) · [Published PDF](https://proceedings.neurips.cc/paper_files/paper/2024/file/f4a04396c2ed1342a5d8d05e94cb6101-Paper-Datasets_and_Benchmarks_Track.pdf)
**Website:** [Official project](https://captaincook4d.github.io/captain-cook/)
**Code:** [Official release organization](https://github.com/CaptainCook4D/) · [Annotations](https://github.com/CaptainCook4D/annotations) · [Downloader](https://github.com/CaptainCook4D/downloader). Links verified through the official project page. Implementations were not executed.
**Source version:** Fifty-four-page NeurIPS 2024 proceedings PDF including appendices. First preprint appeared in 2023. Author order follows this PDF.

![CaptainCook4D recipe graphs, execution variations, and sensor recordings](../assets/2024-peddi-captaincook4d.png)

*Figure 1. CaptainCook4D recipe graphs, execution variations, and sensor recordings. Source: [original paper, PDF p. 2](../raw/2024-peddi-captaincook4d.pdf#page=2).*

## Problem and contribution

Procedural understanding requires distinguishing a plausible action from a correctly executed step. CaptainCook4D captures both correct recipes and deliberately induced deviations, with seven error categories covering preparation, technique, measurement, temperature, timing, order and missing steps (§3, Figure 3).

## Approach

Recipes and task graphs → synchronized egocentric recordings → step boundaries and error descriptions → separate error-recognition, localization and procedure-learning benchmarks.

Participants follow ordinary or modified instructions that induce selected mistakes. The recorder annotates the video and another person reviews it. Coarse annotations cover the collection, while fine-grained action labels cover a subset (§3.2).

Supervised error baselines extract one-second video features and train binary classifiers. A step's label is assigned to its subsegments during training, and majority voting predicts the full step. Zero-shot VQA baselines instead receive task-aware prompts. Procedure learning and early recognition use separate protocols (§4 and Appendix B). The dataset is not one unified streaming assistant.

## Evidence and limits

The collection contains 384 recordings totaling 94.5 hours, with approximately 5.3K step annotations and 10K fine-grained action annotations. The latter cover 20% of data (§3.2). Step-level and recording-level splits are distinct and must not be combined into one performance claim (§4.1).

Supplied step boundaries, deliberately induced errors and scripted instructions simplify or alter the deployment problem. A whole-step error label does not identify the precise onset of a visible error. Temperature and measurement errors may require contextual information not recoverable from a sparse frame sample. Collection covers a limited geographic and procedural domain (§5).

## Research connections

- **Cites:** [[2022-grauman-ego4d]] — context for egocentric activity datasets (§2).
- **Compares with:** EgoProceL — procedure-learning reference and baseline (§4.3).

## Relevance to Aligned

Our interpretation: a source dataset for separating error categories and testing whether a system needs action, object-state or procedural evidence. Add explicitly missing-camera intervals and genuine repair trajectories before evaluating issue closure.

## Human notes
