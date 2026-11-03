<a id="chapter-10"></a>

Not every suspicious event can be specified in advance through a graph of a known procedure. The first part of this chapter considers anomaly detection using category descriptions and diagnostic questions. The second covers finding moments for expert review, comparative assessment of execution, and corrective examples. For Aligned, these are related components: an anomaly score does not establish a violation of a particular requirement, and a relative skill score does not confirm the absence of a defect or a worker's qualification.

### Benchmarks and evaluation protocols

| Test | What it evaluates | Why it does not replace procedural monitoring |
|---|---|---|
| **UCF-Crime** | Frame-level anomaly scores, AUC, and anomalous-video categorization tasks | High AUC does not specify an acceptable alert rate during long periods of normal work |
| **XD-Violence** | Anomaly detection: AP in OVVAD/Anomize, AUC in the VERA protocol. OVVAD/Anomize distinguish novel categories | Improvement on some categories does not imply universal superiority or repair recognition |
| **EPIC-Skills 2018** | Pairwise ranking of videos of surgical and everyday tasks | Relative assessment, not defect detection. A pair split does not establish transfer to new workers. The method is reused as a baseline in EgoExoLearn. [PDF, §§4–5](https://dimadamen.github.io/Skill/whos_better_whos_best.pdf) |
| **Ego-Exo4D demonstration proficiency in SkillSpotter** | Localization of expert timestamps and good/tip labels, class-agnostic/class-specific mAP, and grading on matched detections | Neither absolute quality nor online error detection. The published method uses offline context and pose. [PDF, §3.1](https://static.siplab.org/papers/eccv2026-skillspotter.pdf#page=4) |
| **ExpertAF on Ego-Exo4D** | Commentary, retrieval of an expert demonstration, and pose generation from a learner clip | Offline evaluation of outputs does not test whether a person successfully corrects their execution after receiving advice. [PDF, §§3–4](https://openaccess.thecvf.com/content/CVPR2025/papers/Ashutosh_ExpertAF_Expert_Actionable_Feedback_from_Video_CVPR_2025_paper.pdf) |
| **ProSkill** | Relative quality of pre-segmented steps, rank correlation, and pairwise accuracy | ELO/percentile within an action is not an absolute qualification. Independent reuse has not been established here. [PDF, §§3–5](https://arxiv.org/pdf/2601.20661v1) |

UCF-Crime and XD-Violence are reused by OVVAD, Anomize, and VERA under different protocols. Categories, available supervision, and temporal processing rules differ. Sources: [OVVAD, experiments](https://openaccess.thecvf.com/content/CVPR2024/papers/Wu_Open-Vocabulary_Video_Anomaly_Detection_CVPR_2024_paper.pdf), [Anomize, Tables 1–2](https://openaccess.thecvf.com/content/CVPR2025/papers/Li_Anomize_Better_Open_Vocabulary_Video_Anomaly_Detection_CVPR_2025_paper.pdf), [VERA, §4.1, Tables 3, 5–6](https://openaccess.thecvf.com/content/CVPR2025/papers/Ye_VERA_Explainable_Video_Anomaly_Detection_via_Verbalized_Learning_of_Vision-Language_CVPR_2025_paper.pdf).

<a id="paper-2026-mazzamuto-proskill"></a>

#### ProSkill: comparative annotation of individual steps

**Mazzamuto et al., WACV 2026.** ProSkill contains 1 135 pre-segmented clips, 71 actions, and approximately 14 hours from five procedural datasets. A Swiss tournament selects informative pairs of the same action, people compare the executions, and an ELO rating is then converted into a percentile score. Models learn regression or pairwise ranking over prepared clips. This is a benchmark of perceived quality, not a universal qualification scale: the same percentile for different actions does not establish equivalent competence. In the example in Figure 5, an execution interrupted by a child receives a low rating, illustrating the influence of context. Expert comparisons are useful for Aligned, but separate defect criteria and a worker-disjoint evaluation are needed. The paper's split of source videos does not establish a split of workers. [PDF, §§3–5, Figure 5](https://arxiv.org/pdf/2601.20661v1#page=7).

### Open-vocabulary anomalies

#### OVVAD and Anomize: anomaly categories

**OVVAD, CVPR 2024** combines CLIP, a temporal adapter, semantic descriptions, and synthetic examples of novel anomalies. Its two outputs are a frame anomaly score and a video category name. **Anomize, CVPR 2025** develops this formulation through static/dynamic streams, a concept library, and grouped descriptions of similar classes. On XD-Violence, AP for novel categories rises from 76.03 to 84.24, but overall UCF-Crime AUC falls from 86.40 to 84.49. This is a specific gain on some tasks, not universal superiority. Categories are named in advance, category accuracy is computed on anomalous videos, and long normal periods and false alarms per hour are not the main evaluation protocol. [OVVAD wiki](/notes/2024-wu-ovvad/), [OVVAD PDF, §3, pp. 3–5](https://openaccess.thecvf.com/content/CVPR2024/papers/Wu_Open-Vocabulary_Video_Anomaly_Detection_CVPR_2024_paper.pdf#page=3), [Anomize wiki](/notes/2025-li-anomize/), [Anomize PDF, Tables 1–2, p. 6](https://openaccess.thecvf.com/content/CVPR2025/papers/Li_Anomize_Better_Open_Vocabulary_Video_Anomaly_Detection_CVPR_2025_paper.pdf#page=6).

![OVVAD: detection, categorization, and synthesis of novel anomalies](/media/assets/expansion-problems/ovvad.png)

*OVVAD, original Figure 2, PDF p. 4.*

![Anomize: concept library, grouped label descriptions, and static and dynamic streams](/media/assets/expansion-problems/anomize.png)

*Anomize, original Figure 3, PDF p. 4.*

#### VERA: learnable diagnostic questions

**VERA, CVPR 2025** is most interesting for its idea of learning short diagnostic questions while keeping VLM weights frozen. A learner answers the current questions, and an optimizer modifies the questions using weak video-level labels. This is supervised learning with additional model calls. An ablation on UCF-Crime gives AUC 78.81 without questions and 86.55 with learned questions. However, the published inference procedure retrieves similar segments **from the past and the future**, smooths scores, and accounts for position relative to the entire video. Transfer to a proactive stream therefore requires redesign and reevaluation. A good explanation also does not establish that its details are correct or that a person has corrected the violation. [Wiki](/notes/2025-ye-vera/), [PDF, §3.3, pp. 5–6, Tables 5–6, p. 7](https://openaccess.thecvf.com/content/CVPR2025/papers/Ye_VERA_Explainable_Video_Anomaly_Detection_via_Verbalized_Learning_of_Vision-Language_CVPR_2025_paper.pdf#page=5).

![VERA: verbal optimization of diagnostic questions with a learner and optimizer](/media/assets/expansion-problems/vera.png)

*Original Figure 2, PDF p. 4. The diagram shows question learning. Retrospective video processing belongs to the separate inference pipeline in Figure 3.*

### Relative execution assessment and moments for review

<a id="paper-2018-doughty-skill-ranking"></a>

#### Who’s Better: early pairwise ranking of execution

**Doughty et al., CVPR 2018.** Two Siamese Temporal Segment Network branches learn to score videos of the same action from human preferences. Ranking loss separates ordered pairs, while similarity loss keeps scores close for executions judged similar. A single video is sufficient at inference, and the resulting score can rank demonstrations. EPIC-Skills combines surgical and everyday tasks. This is relative assessment without error localization or absolute certification of the result. Test pairs may contain a video that appeared in another training pair, so transfer to new workers has not been established. EgoExoLearn later compares this baseline with attention-based ranking. The comparison task is useful for Aligned, but it should be evaluated on independent people and specific work criteria. [PDF, §§3–5](https://dimadamen.github.io/Skill/whos_better_whos_best.pdf), [EgoExoLearn, Table 5](https://arxiv.org/pdf/2403.16182v3#page=8).

<a id="paper-2026-braun-skillspotter"></a>

#### SkillSpotter: finding a moment to assess and assessing execution separately

**Braun and Holz, ECCV 2026.** Assessing a prepared clip assumes that the relevant moment has already been selected. SkillSpotter addresses the preceding task: returning timestamps, a **good execution / tip for improvement** label, and confidence from a demonstration recording. This formulation is useful for Aligned when preparing a human review queue. However, a tip label does not yet identify a physical defect, and successfully finding moments does not establish a worker's overall qualification. The main test uses expert annotations from the Ego-Exo4D demonstration proficiency task. [PDF, §3.1](https://static.siplab.org/papers/eccv2026-skillspotter.pdf#page=4).

Pre-extracted Omnivore features feed an ActionFormer temporal pyramid. A separate encoder processes 3D body pose, with learnable gates controlling its contribution. In the multiview setting, bidirectional cross-view attention combines ego and exo features. Learned suppression radii reduce duplicate predictions while retaining the possibility of multiple feedback types at nearby moments. This is a supervised detector trained on expert timestamps and binary assessments. It does not generate an explanation of a violation (§3.2).

![Original SkillSpotter architecture](/media/assets/new-work-selection-2026-11-02/2026-braun-skillspotter.png)

*Original Figure 2, PDF p. 5. SkillSpotter: temporal features, pose fusion, and cross-view exchange before feedback localization. The two-view setting uses full temporal context. [Source](https://static.siplab.org/papers/eccv2026-skillspotter.pdf#page=5).*

The evaluation is deliberately separated. Class-agnostic mAP tests whether a moment is found, class-specific mAP also requires the correct label, and balanced accuracy is computed only on matched predictions. The latter therefore depends on matching coverage and does not characterize every event in the recording. In the ego-only setting, **class-specific mAP = 21.82** and balanced accuracy is **60.40**. These values cannot be read as “60% of all errors were detected.” On Cooking and Music, detection mAP is only 3.08 and 1.57, indicating the weakness of current features for fine interactions. [§3.1, Table 1, Table 4](https://static.siplab.org/papers/eccv2026-skillspotter.pdf#page=9).

The available inputs also matter. Training uses ground-truth body pose, while evaluation uses predicted pose. Ego pose requires the Aria camera trajectory, so this setting is not equivalent to ordinary helmet RGB. Cross-view attention receives full temporal context. The published design is an offline demonstration analyzer, not a validated timely detector. The speed of 19.70 FPS on an H200 excludes decoding, Omnivore extraction, and pose estimation. [§3.3, Appendix A/G](https://static.siplab.org/papers/eccv2026-skillspotter.pdf#page=20).

For Aligned, we transfer the separate checks “did we find the relevant moment?” and “did we assess what we found correctly?” Moving from this result to an alert or issue closure will require our own annotations of observable violations, a causal setting, and evaluation of manual interactions with parts.

<a id="paper-2025-ashutosh-expertaf"></a>

#### ExpertAF: an explanation together with a corrective example

**Ashutosh et al., CVPR 2025.** ExpertAF learns from Ego-Exo4D expert commentary and links three outputs: corrective text, a retrieved expert demonstration, and a generated pose sequence. InternVideo2 encodes the video, poses become tokens, and Llama 3-8B learns to predict responses. During ordinary inference, commentary is produced without a paired expert example, although one is available during training. A strong configuration uses ego/exo video and 3D pose. Linking advice to a concrete example is useful for Aligned, but experiments on sports clips and human assessments of responses do not show improvement in a person's subsequent execution. The generated output is pose, not RGB video of a correction, and a continuous assistant is not evaluated here. [PDF, §§3–4](https://openaccess.thecvf.com/content/CVPR2025/papers/Ashutosh_ExpertAF_Expert_Actionable_Feedback_from_Video_CVPR_2025_paper.pdf#page=3).

### Comparing the approaches

Comparative ranking, feedback localization, and corrective-example generation also have different outputs. Who’s Better and ProSkill assess prepared executions, SkillSpotter first finds moments in a recording, and ExpertAF adds an explanation and example. Their metrics cannot be combined with anomaly AUC or treated as evidence of correction after advice.

OVVAD and Anomize connect visual features to a category vocabulary. VERA optimizes questions posed to a frozen VLM. These are different ways to specify a check, not successive versions of one system. They should be compared with equal access to the past and future, separately from explanation quality and confirmation of corrective action.
