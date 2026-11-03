---
year: 2024
venue: "CVPR"
affiliations: ["FAIR, Meta", "University of Texas at Austin", "Carnegie Mellon University", "University of California, Berkeley", "Project Aria, Meta", "University of Bristol", "IIIT, Hyderabad", "University of Illinois, Urbana Champaign", "University of Minnesota", "National University of Singapore", "Universidad de los Andes", "Simon Fraser University", "University of North Carolina, Chapel Hill", "University of Catania", "University of Pennsylvania", "University of Tokyo", "Meta", "Indiana University", "Johns Hopkins University", "King Abdullah University of Science and Technology", "Georgia Tech"]
research_groups: [meta-fair, bristol-mavi, ut-austin-vision]
reviewed: false
tags: [execution-quality, procedure-understanding, spatial-understanding, egocentric-video]
---

# Ego-Exo4D: Understanding Skilled Human Activity from First- and Third-Person Perspectives

Ego-Exo4D pairs first-person and third-person recordings with expert critiques, procedural annotations and 3D pose to benchmark understanding of skilled human activity.

**Authors:** Kristen Grauman, Andrew Westbury, Lorenzo Torresani, Kris Kitani, Jitendra Malik, Triantafyllos Afouras, Kumar Ashutosh, Vijay Baiyya, Siddhant Bansal, Bikram Boote, Eugene Byrne, Zach Chavis, Joya Chen, Feng Cheng, Fu-Jen Chu, Sean Crane, Avijit Dasgupta, Jing Dong, Maria Escobar, Cristhian Forigua, Abrham Gebreselasie, Sanjay Haresh, Jing Huang, Md Mohaiminul Islam, Suyog Jain, Rawal Khirodkar, Devansh Kukreja, Kevin J Liang, Jia-Wei Liu, Sagnik Majumder, Yongsen Mao, Miguel Martin, Effrosyni Mavroudi, Tushar Nagarajan, Francesco Ragusa, Santhosh Kumar Ramakrishnan, Luigi Seminara, Arjun Somayazulu, Yale Song, Shan Su, Zihui Xue, Edward Zhang, Jinxu Zhang, Angela Castillo, Changan Chen, Xinzhu Fu, Ryosuke Furuta, Cristina González, Prince Gupta, Jiabo Hu, Yifei Huang, Yiming Huang, Weslie Khoo, Anush Kumar, Robert Kuo, Sach Lakhavani, Miao Liu, Mi Luo, Zhengyi Luo, Brighid Meredith, Austin Miller, Oluwatumininu Oguntola, Xiaqing Pan, Penny Peng, Shraman Pramanick, Merey Ramazanova, Fiona Ryan, Wei Shan, Kiran Somasundaram, Chenan Song, Audrey Southerland, Masatoshi Tateno, Huiyu Wang, Yuchen Wang, Takuma Yagi, Mingfei Yan, Xitong Yang, Zecheng Yu, Shengxin Cindy Zha, Chen Zhao, Ziwei Zhao, Zhifan Zhu, Jeff Zhuo, Pablo Arbeláez, Gedas Bertasius, David Crandall, Dima Damen, Jakob Engel, Giovanni Maria Farinella, Antonino Furnari, Bernard Ghanem, Judy Hoffman, C. V. Jawahar, Richard Newcombe, Hyun Soo Park, James M. Rehg, Yoichi Sato, Manolis Savva, Jianbo Shi, Mike Zheng Shou, Michael Wray.
**Paper:** [PDF](../raw/2024-grauman-ego-exo4d.pdf)
**Website:** [Project website](https://ego-exo4d-data.org/)
**Code:** [Dataset tools and downloader](https://github.com/facebookresearch/Ego4d)
**Source version:** arXiv:2311.18259v4, 25 September 2024, 99 pages. The original paper appeared at CVPR 2024. This note follows the expanded stored manuscript, distinct from the [IJCV version published in 2025](https://link.springer.com/article/10.1007/s11263-025-02557-6).

![Ego-Exo4D synchronized views and multimodal annotations](../assets/2024-grauman-ego-exo4d.png)

*Figure 1. Ego-Exo4D synchronized views and multimodal annotations. Source: [original paper, PDF p. 3](../raw/2024-grauman-ego-exo4d.pdf#page=3).*

## Problem and contribution

Recognizing an action does not establish whether it was executed well. Ego-Exo4D supplies complementary close-up and whole-body views across eight skill domains, with 740 participants and 1,286 hours across all views. Its benchmark families cover cross-view relations, recognition and procedures, proficiency, and ego-pose (§§3–5).

## Approach

Aria glasses and four or five stationary GoPros capture synchronized video. Calibration and perception services add camera poses, point clouds and gaze. Annotators then produce atomic action descriptions, participant narrations, expert commentary, keystep dependencies, and manual or automatically triangulated pose labels (§§3–4, Appendix A).

This is a dataset and benchmark suite with task-specific models. For proficiency, video clips enter TimeSFormer classifiers whose predictions are averaged into a demonstrator-level label. Supervised labels combine scenario-specific experience surveys and expert assessments. Separately, Omnivore video features enter an adapted ActionFormer to predict timestamps of good execution or needed improvement, supervised from expert comments. Optional exocentric features or predictions are fused. These proficiency baselines use recorded videos, excluding commentary, audio, gaze and participant information at inference (§5.3, Appendix E.5).

The recognition suite also defines streaming, energy-budgeted prediction. Its power figures derive from a profiler-based cost model, without measuring a deployed wearable assistant (§5.2.2, Appendix E.3).

## Evidence and limits

On participant-disjoint splits, the best single-take ego-only demonstrator classifier reaches 50.4% test accuracy against a 42.4% majority baseline (Table 10). Localized evaluation remains difficult: ActionFormer using ego and exo views achieves 4.04% test mAP, averaged over 0.25, 0.5 and 1-second timestamp tolerances (Table 11).

Expertise labels are heterogeneous proxies: basketball uses years of experience, cooking uses expert ratings, and bouldering uses achieved route difficulty (Table E7). The same comment can praise one aspect while criticizing another (Table E8). Long-tailed activities, fixed-camera occlusion and expert-heavy sampling restrict coverage (§6). These results do not establish interactive coaching effectiveness.

## Research connections

- **Cites:** [[2022-grauman-ego4d]] — prior egocentric dataset and inspiration for atomic action descriptions (§§2, 4.3).
- **Cites:** [[2022-sener-assembly101]] — earlier multi-view procedural dataset and supervised mistake-detection setting (§§2, 5.2.3).
- **Cites:** [[2018-doughty-skill-ranking]] — earlier video-based skill determination (§2, bibliography p. 90).

## Relevance to Aligned

Our interpretation: expert critiques and dependency labels offer complementary targets for assessing workmanship and procedural correctness. Construction transfer still needs domain-specific criteria, causal alert timing and evaluation of whether feedback improves actual work.

## Human notes
