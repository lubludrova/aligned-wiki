---
year: 2026
venue: "IEEE Transactions on Pattern Analysis and Machine Intelligence"
affiliations: ["Harbin Institute of Technology, Shenzhen", "Shandong Jianzhu University", "Peking University", "The Hong Kong Polytechnic University"]
research_groups: []
reviewed: false
tags: [survey, video-retrieval, video-qa, video-representation]
---

# A Survey on Video Temporal Grounding with Multimodal Large Language Model

Separates temporal grounding tasks from model roles, training paradigms and feature processing, with task-specific datasets and evaluation metrics.

**Authors:** Jianlong Wu, Wei Liu, Ye Liu, Meng Liu, Liqiang Nie, Zhouchen Lin, Chang Wen Chen.
**Paper:** [PDF](../raw/2026-wu-temporal-grounding-survey.pdf) · [arXiv v1](https://arxiv.org/abs/2508.10922v1) · [Published record](https://doi.org/10.1109/TPAMI.2025.3615586)
**Website:** [Author repository](https://github.com/iLearn-Lab/TPAMI26-Awesome-MLLMs-for-Video-Temporal-Grounding)
**Code:** The repository curates papers and implementation links, rather than implementing one survey model.
**Source version:** arXiv:2508.10922v1, 7 August 2025, 20 pages, covering literature through May 2025. The later journal issue is TPAMI 48(2), 1521–1541, February 2026, verified through publisher-deposited Crossref metadata and the [PubMed record](https://pubmed.ncbi.nlm.nih.gov/41021939/). The publisher PDF was not compared.
**Citations:** 17 ([OpenAlex](https://openalex.org/W4414604029), checked 2026-11-04).

![Temporal grounding taxonomy separating model roles, training paradigms and visual or temporal feature processing](../assets/2026-wu-temporal-grounding-survey.png)

*Figure 3. Three dimensions for organizing temporal grounding methods. Source: [archived PDF, p. 5](../raw/2026-wu-temporal-grounding-survey.pdf#page=5).*

## Problem and contribution

Answering a video question and identifying its supporting interval are different requirements. This survey reviews multimodal large language models for temporal grounding, organizing task definitions, modeling choices and reported evaluations. It introduces no new video dataset or trained grounding system (§§1–2).

## Approach

The task layer distinguishes moment retrieval, dense video captioning, highlight detection and temporally grounded QA. Their outputs differ: query-matching intervals, multiple timestamped descriptions, frame-level saliency, or answers with temporal evidence (§2.1, Figure 2).

The method taxonomy has three separate dimensions. First, an MLLM can facilitate another grounding module by producing descriptions or annotations, or directly execute grounding by predicting timestamps and answers. Second, the survey separates temporally specialized pretraining, task-specific fine-tuning and training-free pipelines using pretrained components. Third, feature processing covers visual compression or refinement and explicit or implicit temporal modeling (§3, Figure 3).

These dimensions describe different design decisions. A caption-based pipeline still needs a localization mechanism. Direct timestamp generation still depends on temporal representations, supervision and the visual evidence retained after sampling. Training-free means no task-specific parameter updates, not an untrained foundation model (§§3.1–3.3).

## Evidence and limits

Section 4 organizes existing datasets and cross-paper performance tables, separating zero-shot and fine-tuned settings. It discusses interval-overlap and retrieval metrics, captioning scores, highlight metrics, and grounded-QA accuracy. These tables are a literature comparison, not a common rerun establishing one best architecture.

The archived version's May 2025 cutoff limits its coverage of newer methods, even though the journal issue is dated 2026. Category boundaries require care: §3.3.2 calls NumPro's visible frame indices implicit temporal modeling. Section 5 identifies lost temporal cues under compression, weak temporal modeling and incomplete audio integration. Its benchmark results do not establish reliable construction-site operation or persistent memory across recordings.

## Research connections

- **Cites:** [[2022-grauman-ego4d]] — timestamped narrations support derived grounded-QA annotations (§3.1.1, reference 129).
- **Cites:** Xiao et al., *Can I Trust Your Answer? Visually Grounded Video Question Answering* (CVPR 2024) — NExT-GQA distinguishes answer accuracy from temporal evidence quality (§§2.1.4, 4.1, reference 11).

## Relevance to Aligned

Our interpretation: specify the required output and its metric before choosing a model. Evaluate finding an interval separately from answering correctly, and test repeated events and missing evidence explicitly. The taxonomy helps compare localization components, while archive coverage, entity continuity and procedure correctness need additional evaluation.

## Human notes
