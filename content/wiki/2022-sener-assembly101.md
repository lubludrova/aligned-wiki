---
year: 2022
venue: "CVPR"
affiliations: [Meta Reality Labs Research, National University of Singapore]
research_groups: [meta-reality-labs]
reviewed: false
tags: [procedure-understanding, execution-quality, egocentric-video]
---

# Assembly101: A Large-Scale Multi-View Video Dataset for Understanding Procedural Activities

Assembly101 benchmarks action understanding and mistake detection using synchronized views of toy assembly, with flexible ordering, corrections, and hand poses.

**Authors:** Fadime Sener, Dibyadip Chatterjee, Daniel Shelepov, Kun He, Dipika Singhania, Robert Wang, Angela Yao.
**Paper:** [PDF](../raw/2022-sener-assembly101.pdf)
**Website:** [Official project](https://assembly-101.github.io/)
**Code:** [Official action-recognition baselines](https://github.com/assembly-101/assembly101-action-recognition)
**Source version:** [arXiv:2203.14712v2](https://arxiv.org/abs/2203.14712v2), 1 May 2022, including the supplement. Published at CVPR 2022. Supplement page numbers restart after PDF p. 11.

![Assembly101 synchronized views and action annotations](../assets/2022-sener-assembly101.png)

*Figure 1. Assembly101 synchronized views and action annotations. Source: [original paper, PDF p. 2](../raw/2022-sener-assembly101.pdf#page=2).*

## Problem and contribution

Procedures can reach the same goal through different step orders, including errors and recovery. Assembly101 captures 362 disassembly/assembly sequences from 53 adults working on 101 toys, producing 4,321 synchronized-view videos and 513 camera-hours. Eight fixed RGB cameras and four egocentric monochrome cameras record each sequence. Participants see a completed-toy image and first disassemble the toy, rather than follow a prescribed action sequence (§§3–4).

## Approach

The contribution is a dataset and benchmark suite. Annotations include fine hand-object interactions, coarse assembly steps, correct/mistake/correction labels, and five-level skill scores. A modified MEgATrack estimates 3D hand joints from the headset views. The persistent assets are recordings, timestamped labels, poses, and extracted video features (§3).

Supervised baselines train TSM on trimmed action clips and graph networks on hand poses. TSM features feed temporal convolutional models for complete-video segmentation and TempAgg for anticipation and mistake recognition. At inference, recognition predicts an action, segmentation labels frames, and mistake classification assigns the current coarse segment one of three correctness labels. The reported early variant uses half the segment (§5, supplement §3).

## Evidence and limits

TSM action accuracy is 39.2% on fixed views versus 23.0% on egocentric views. For mistakes, feature-based recognition obtains 30.8% precision and 46.6% recall, dropping to 29.3% and 35.0% in early prediction (Tables 5, 10). These are offline benchmark results, not an evaluated worker-assistance deployment.

[?] Strictly causal mistake inference is unresolved: main §5.7 specifies a prefix ending at the current segment, but supplement §3.4 describes a feature window extending 60 seconds beyond its end. Segment boundaries are supplied, so these results also do not establish continuous alarm performance.

Skill labels use coarse thresholds on speed and mistake count, not expert workmanship judgments (supplement §2.4). Toy assemblies, constrained cameras, imbalanced classes, and prior disassembly limit transfer to construction work. Camera-hours and repeated view labels must not be mistaken for independent executions.

## Research connections

- **Cites:** [[2022-grauman-ego4d]] — contrasts synchronized ego/exo assembly views with broad egocentric daily-activity coverage (§2.2, Tables 1–2).
- **Builds on:** Sener et al., *Temporal Aggregate Representations for Long-Range Video Understanding* (2020) — adapts TempAgg to anticipation and mistake classification (§§5.1, 5.7).
- **Cites:** Doughty et al., *The Pros and Cons* (2019) — motivates moving beyond a global skill score to specific mistakes (§4.4, reference [7]).

## Relevance to Aligned

Our interpretation: useful for testing procedure representations and recovery detection, provided we distinguish toy-task success from professional skill and verify a causal evaluation protocol.

## Human notes
