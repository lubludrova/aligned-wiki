---
year: 2022
venue: "CVPR"
affiliations: [Meta AI, University of Texas at Austin, University of Minnesota, University of Catania, Meta Reality Labs, Georgia Tech, Carnegie Mellon University, UC Berkeley, University of Bristol, King Abdullah University of Science and Technology, National University of Singapore, Carnegie Mellon University Africa, Meta, Universidad de los Andes, University of Tokyo, Indiana University, "International Institute of Information Technology, Hyderabad", MIT, University of Pennsylvania, Dartmouth]
research_groups: [meta-reality-labs, ego4d-consortium]
reviewed: false
tags: [video-memory, video-retrieval, state-changes, egocentric-video, multi-person]
---

# Ego4D: Around the World in 3,000 Hours of Egocentric Video

Ego4D provides diverse egocentric recordings and benchmarks for retrieving past experiences, understanding interactions and object changes, and forecasting activity.

**Authors:** Kristen Grauman, Andrew Westbury, Eugene Byrne, Zachary Chavis, Antonino Furnari, Rohit Girdhar, Jackson Hamburger, Hao Jiang, Miao Liu, Xingyu Liu, Miguel Martin, Tushar Nagarajan, Ilija Radosavovic, Santhosh Kumar Ramakrishnan, Fiona Ryan, Jayant Sharma, Michael Wray, Mengmeng Xu, Eric Zhongcong Xu, Chen Zhao, Siddhant Bansal, Dhruv Batra, Vincent Cartillier, Sean Crane, Tien Do, Morrie Doulaty, Akshay Erapalli, Christoph Feichtenhofer, Adriano Fragomeni, Qichen Fu, Abrham Gebreselasie, Cristina González, James Hillis, Xuhua Huang, Yifei Huang, Wenqi Jia, Weslie Khoo, Jáchym Kolář, Satwik Kottur, Anurag Kumar, Federico Landini, Chao Li, Yanghao Li, Zhenqiang Li, Karttikeya Mangalam, Raghava Modhugu, Jonathan Munro, Tullie Murrell, Takumi Nishiyasu, Will Price, Paola Ruiz Puentes, Merey Ramazanova, Leda Sari, Kiran Somasundaram, Audrey Southerland, Yusuke Sugano, Ruijie Tao, Minh Vo, Yuchen Wang, Xindi Wu, Takuma Yagi, Ziwei Zhao, Yunyi Zhu, Pablo Arbeláez, David Crandall, Dima Damen, Giovanni Maria Farinella, Christian Fuegen, Bernard Ghanem, Vamsi Krishna Ithapu, C. V. Jawahar, Hanbyul Joo, Kris Kitani, Haizhou Li, Richard Newcombe, Aude Oliva, Hyun Soo Park, James M. Rehg, Yoichi Sato, Jianbo Shi, Mike Zheng Shou, Antonio Torralba, Lorenzo Torresani, Mingfei Yan, Jitendra Malik.
**Paper:** [PDF](../raw/2022-grauman-ego4d.pdf)
**Website:** [Official project](https://ego4d-data.org/)
**Code:** [Episodic-memory baselines](https://github.com/EGO4D/episodic-memory) and [hands-and-objects baselines](https://github.com/EGO4D/hands-and-objects)
**Source version:** Author-hosted 18-page [CVPR 2022 proceedings paper](https://openaccess.thecvf.com/content/CVPR2022/html/Grauman_Ego4D_Around_the_World_in_3000_Hours_of_Egocentric_Video_CVPR_2022_paper.html), pp. 18995–19012, following the 2021 preprint. Relevant sections of the separate [official supplement](https://openaccess.thecvf.com/content/CVPR2022/supplemental/Grauman_Ego4D_Around_the_CVPR_2022_supplemental.pdf) were also inspected. Counts below follow this paper, not later releases.

![Ego4D first-person video benchmark suite](../assets/2022-grauman-ego4d.png)

*Figure 6. Ego4D first-person video benchmark suite. Source: [original paper, PDF p. 6](../raw/2022-grauman-ego4d.pdf#page=6).*

## Problem and contribution

Short, curated third-person clips poorly capture a moving observer's continuous interactions. Ego4D contributes 3,670 hours from 931 camera wearers in 74 locations across nine countries, plus five benchmark families. The work establishes data and evaluation tasks rather than a single memory architecture (§§1–3).

## Approach

Distributed collection yields long, mostly unscripted recordings. Two independent annotators narrate each video, producing 3.85 million timestamped sentences. These guide task-specific labeling and taxonomies. The released representation consists of video, annotations, precomputed SlowFast features, and available auxiliary modalities (§§3–4).

Episodic Memory takes a past video plus a language query, object crop, or activity label. It returns an answer-bearing interval, the object's last-seen track with optional 3D location, or all matching activity intervals. NLQ evaluates evidence localization, not generated answer correctness. Hands and Objects labels pre-change, point-of-no-return, and post-change frames. Other benchmarks cover audio-visual diarization, social attention, and future actions, hands, or locomotion (§5).

Task-specific supervised baselines train on annotated splits. For example, NLQ combines frozen SlowFast/BERT features with 2D-TAN or VSLNet to predict intervals at inference. It processes supplied recorded clips. The benchmark does not prescribe persistent streaming ingestion or a shared deployed assistant (supplement §F).

## Evidence and limits

Original NLQ test recall@1 at temporal IoU 0.3 is only 5.80% for 2D-TAN and 5.47% for VSLNet, exposing difficult retrieval rather than solved memory (supplement Table 11, printed p. 38).

Modalities are uneven: 491 hours have 3D scans and 224 hours have synchronized cameras worn by multiple people, versus 3,670 RGB hours (Table 1). Multi-person interaction is explicitly benchmarked, not inferred from participant count. Geographic coverage, urban recruitment, pandemic conditions, battery-limited capture, and annotator language introduce bias (§3.5). Natural recordings and annotations do not demonstrate practical assistant effectiveness or professional skill assessment.

## Research connections

- **Builds on:** Damen et al., *Scaling Egocentric Vision: The EPIC-KITCHENS Dataset* (2018) — adapts pause-and-talk narration and broadens collection beyond kitchens (§§2, 4).
- **Builds on:** Feichtenhofer et al., *SlowFast Networks for Video Recognition* (2019) — provides reusable video features for multiple baselines (Table 1, supplement §F).
- **Builds on:** 2D-TAN and VSLNet (Zhang et al., 2020) — adapts and evaluates existing language-localization methods on NLQ (supplement §F, Table 11).

## Relevance to Aligned

Our interpretation: a foundational testbed for memory retrieval and object-state evidence. Its carpentry examples are useful context, but dedicated construction quality labels and operational validation remain necessary.

## Human notes
