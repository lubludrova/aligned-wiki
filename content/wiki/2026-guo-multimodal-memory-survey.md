---
year: 2026
venue: arXiv preprint
affiliations:
- Rutgers
- Notre Dame
- Michigan
- Fudan
- MBZUAI
- JHU
- Peer AI
- UC San Diego
- Georgia Tech
- SemiAnalysis
- USC
- LMSYS Org
- NUS
- Capital One
- Independent Researcher
- CMU
- UIC
- KAIST
- Zoom
- NVIDIA
- Penn
- MSU
- Duke
- UT Dallas
- Cornell
- ModelsLive
- Princeton
- UCF
- Squirrel AI
- NTU
- Purdue
- TikTok
- Dartmouth
- UIUC
- Washington
- Humani Labs
- Meta
research_groups: []
reviewed: false
tags:
- survey
- video-memory
- efficient-processing
---

# Seeing, Maintaining, and Learning: The Evolution of Multimodal Agent Memory

Organizes multimodal memory by representation and management policy, with guidance on provenance, temporal validity and lifecycle evaluation.

**Authors:** Minghao Guo, Qingyue Jiao, Xiujin Liu, Jianhong Pang, Ruimeng Yang, Naihao Xu, Liwei Che, Haochen Xue, Ziqi Wang, Xinying Cai, Jiaxuan Luo, Jiaxin Deng, Xuesong Ye, Jintao Qu, Wenyao Gao, Jingwen Gu, Chenyang Zhao, Shichun Liu, Guibin Zhang, Zefang Liu, Siyin Wang, Wujiang Xu, Danrui Li, Zeru Shi, Woongyeong Yeo, Shuang Liu, Wei-Chieh Huang, Weizhi Zhang, Tianyu Yang, Kangsan Kim, Yebowen Hu, Bowen Wen, Bowen Jiang, Haohao Su, Ming Yin, Sheldon Yu, Mian Zhang, Yuyan Chen, Hanrong Zhang, Kai Mei, Zihao Zhang, Mingyu Jin, Xi Zhu, Hengyi Wang, Tianxin Wei, Linyong Nan, Zhenwen Liang, Zhendong Chu, Ziqi Huang, Yongye Su, Sixun Dong, Shujian Liu, Kaiqu Liang, Jiaojiao Han, Zhaoye Fei, Kun Wang, Shihan Dou, Zhichun Guo, Xingjian Diao, Zeqi Gu, Heng Wang, Tao Feng, Cheng Qian, Hamid Palangi, Silei Xu, Xi Yun, Yi Zhu, Shilong Liu, Qingsong Wen, Sung Ju Hwang, Zuxuan Wu, Yu-Gang Jiang, Yiyu Shi, Dimitris N. Metaxas, Jiaxuan You, Julian McAuley, Mengdi Wang, Jiawei Han, Philip S. Yu, Ziyi Ye.

**Paper:** [PDF](../raw/2026-guo-multimodal-memory-survey.pdf) · [arXiv](https://arxiv.org/abs/2610.19366)

**Website:** [Survey website](https://seeing-maintaining-learning.github.io/)

**Code:** [GitHub repository](https://github.com/Seeing-Maintaining-Learning/multimodal-agent-memory-evolution) — curated architecture and benchmark records, not an implemented memory assistant.

**Source version:** arXiv 2610.19366v1, 14 October 2026. Survey preprint, with no acceptance verified. The archived PDF catalogs 297 architectures, while the current repository lists 299.

![Multimodal Agent Memory Survey: Figure 1 from the paper](../assets/2026-guo-multimodal-memory-survey.png)

*Figure 1 from the original paper ([PDF page 4](../raw/2026-guo-multimodal-memory-survey.pdf#page=4)).*

## Problem and contribution

“Memory” can mean stored evidence, a retrieval index, changing facts or a learned management policy. This survey separates these concepts to support architecture planning. It provides a design taxonomy rather than evidence for one best architecture.

## Approach

The first axis classifies the representation consumed by an agent: source-specific features, explicit text or structured records, latent or parametric memory, and hybrids. An auxiliary vector index alone does not define the operative representation.

The second axis distinguishes fixed memory (T1), changing memory under stable rules (T2), and deployment feedback that persistently changes the management policy (T3). An offline-trained writer whose policy stays fixed during deployment remains T2.

The cross-axis analysis relates these choices to recoverable evidence, editing, reversibility, temporal validity and dependent updates. Evaluation guidance separates memory formation, maintenance, access and utilization, including oracle retrieval and evidence-removal controls. Cost accounting includes ingestion, source storage, retrieval, model consumption and deferred writes.

## Evidence and limits

The PDF reviews 297 architectures and 82 benchmark/protocol records. Figure 8 uses exclusive representation categories, whereas later incidence plots overlap categories. Counts reflect author selection and classification decisions, not a representative statistical sample or performance meta-analysis.

The current companion repository has 299 architecture records, so its counts should not be mixed with the PDF. The survey does not implement or experimentally validate its proposed design principles. Individual catalog claims still require checking against the original paper's protocol.

## Research connections

- **Cites:** [[2025-yang-egolife]] — video-memory evaluation example (§7, Table 2).
- **Cites:** [[2026-alam-supermemory-vqa]] — unanswerability-aware video-memory benchmark (Table 2).

## Relevance to Aligned

Our interpretation: keep source-linked evidence, current state and memory-management policy conceptually separate. Use the lifecycle checklist to diagnose whether a failure comes from writing, stale state, retrieval or unsupported reasoning. Architecture popularity does not establish suitability for worker cameras.

## Human notes
