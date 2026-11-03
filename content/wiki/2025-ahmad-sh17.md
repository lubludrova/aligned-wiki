---
year: 2025
venue: "Journal of Safety Science and Resilience"
affiliations: ["University of Windsor"]
research_groups: []
reviewed: false
tags: [video-representation, execution-quality]
---

# SH17: A dataset for human safety and personal protective equipment detection in manufacturing industry

SH17 provides annotated workplace images and detector baselines covering body parts and PPE, including hands and gloves.

**Authors:** Hafiz Mughees Ahmad, Afshin Rahimi.
**Paper:** [PDF](../raw/2025-ahmad-sh17.pdf) · [Publisher](https://doi.org/10.1016/j.jnlssr.2024.09.002)
**Website:** [Dataset repository](https://github.com/ahmadmughees/SH17dataset)
**Code:** [Official data and training repository](https://github.com/ahmadmughees/SH17dataset)

**Source version:** Inspected arXiv:2407.04590v1, 5 July 2024. The journal version appeared in volume 6(2), pages 175–185, June 2025. Repository citation metadata uses the earlier 2024 date. Results below refer to the preprint.

![SH17 industrial safety dataset examples](../assets/2025-ahmad-sh17.png)

*Figure 1. SH17 industrial safety dataset examples. Source: [original paper, PDF p. 6](../raw/2025-ahmad-sh17.pdf#page=6).*

## Problem and contribution

PPE datasets often concentrate on construction helmets and vests, leaving manufacturing equipment and small body regions poorly represented. SH17 adds 8,099 images with 75,994 bounding boxes across 17 categories. Its main contribution is a reusable detection dataset and a common comparison of YOLOv8, YOLOv9, and YOLOv10 variants, rather than a complete safety-monitoring system.

## Approach

The authors collect workplace images from Pexels, remove duplicates and images without target objects, and manually annotate people, body parts, tools, and PPE (§III). Annotation review includes corrections by a team lead and a graduate student. COCO-pretrained detectors receive supervised box training on an 80/20 image split, using 640-pixel inputs. Inference produces independent object boxes and classes. The extended annotation includes properties such as whether equipment is worn, but the reported detector benchmarks primarily evaluate the 17 object classes. There is no stream state or incident ledger.

## Evidence and limits

Table III reports YOLOv9-e at 70.9% mAP@50 and 48.7% mAP@50–95. The class-specific results are more informative for gloves: precision is 81.6%, recall 58.9%, and AP@50 66.5% (Table IV, p. 10). More than half the annotations occupy under 1% of image area (§III-D), making small details a substantive challenge.

Transfer to the three compatible Pictor-PPE classes yields 58.8% mAP@50 (§IV-A, Table V). This is useful domain-transfer evidence, but excludes glove transfer. Stock photographs and a random image split do not establish performance on distant fixed-camera workers, unseen construction sites, or continuous normal operation. Detection scores also do not measure whether a particular task requires gloves or whether an absent detection means bare hands.

## Research connections

- **Compares with:** Nath et al.'s Pictor-PPE supplies a cross-domain construction benchmark (§IV-A).
- **Compares with:** YOLOv8, YOLOv9, and YOLOv10 under the same SH17 split and training schedule (§IV, Table III).

## Relevance to Aligned

Our interpretation: a concrete starting resource for hand/glove observability and failure analysis. Worker–hand–PPE association, visibility-aware abstention, temporal confirmation, and task-specific requirements must be evaluated separately before converting detections into safety events.

## Human notes
