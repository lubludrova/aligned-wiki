<a id="chapter-5"></a>



Quality and unfinished work require a separate vocabulary of **object states**. “The worker was painting the wall” describes an action. “Half of this wall is covered in paint” describes the state of a particular object. “The coating meets the requirements” adds quality criteria. For Aligned, “Has this job been completed?” therefore starts with an observable change in a specific element. The following works learn to distinguish states before and after an action, the remaining untreated region, and readiness for the next step. Procedures and corrections are examined in the [next chapter](/chapters/procedures/#chapter-6), while the basis for construction acceptance is discussed in [Chapter 8](/chapters/construction/#chapter-8).

### Benchmarks and evaluation protocols

| Benchmark / protocol | What is tested and what the model receives | Limitations and reuse |
|---|---|---|
| **ChangeIt** | Localization of the initial state, action, and final state in video of a specified category. State/action precision measures whether a timestamp falls within the interval | One dominant transition does not cover repetition or repair. Reused in VidOSC, Table 2. [Original work](https://arxiv.org/pdf/2203.11637v1), [VidOSC](https://openaccess.thecvf.com/content/CVPR2024/papers/Xue_Learning_Object_State_Changes_in_Videos_An_Open-World_Perspective_CVPR_2024_paper.pdf) |
| **MOSCATO-CMU, EGTEA, and the subset of EgoPER used** | Predicting the states of multiple objects, framewise and segment F1 | Different metric granularities change the conclusion, and the EgoPER subset contains normal executions. Reuse of source videos is not independent validation of a new state benchmark. [Source](https://openaccess.thecvf.com/content/ICCV2025/papers/Zameni_MOSCATO_Predicting_Multiple_Object_State_Change_Through_Actions_ICCV_2025_paper.pdf) |
| **IndustReal and MECCANO** | Recognizing completed assembly steps. F1 and recognition delay | Delay is computed only over true positives. IndustReal is also used in PROVIA, but under a different error protocol. [STORM-PSR](https://arxiv.org/pdf/2510.12385), [PROVIA](https://arxiv.org/pdf/2609.20638v1) |
| **WhereToChange-HowTo and WTC-VOST** | Spatial separation of actionable/transformed regions, mIoU | Egocentric transfer in the evaluation examined is limited to chop and peel. Independent reuse has not been established. [Source](https://arxiv.org/pdf/2503.11953v2) |
| **HD-EPIC** | Detailed actions, states, object relocations, and spatial context, five-choice QA | Kitchens and expensive annotations, not automatic reconstruction of a digital twin. The data are reused in APM-Bench, but that is a different test. [HD-EPIC](https://openaccess.thecvf.com/content/CVPR2025/papers/Perrett_HD-EPIC_A_Highly-Detailed_Egocentric_Video_Dataset_CVPR_2025_paper.pdf), [APM-Bench](https://arxiv.org/pdf/2609.37559v2) |
| **ProcObject-10K** | Open answers about object preconditions, changes, and readiness, together with temporal evidence | Judge scores and temporal IoU are not physical state-tracking accuracy. Independent reuse has not been established. [Source](https://arxiv.org/pdf/2512.03479v3) |
| **StateDiffNet synthetic pairs** | A difference mask between the current assembly and a known correct reference, IoU | The quantitative test is synthetic, and real-world transfer is shown qualitatively. Independent reuse has not been established. [Source](https://arxiv.org/pdf/2408.12945v1) |
| **EgoTSR++ protocol** | Pairwise comparison of proximity to the goal state, including frame reordering, regression, and recovery | Relative progress is not absolute completion, and recovery relies on nine source videos. Independent reuse has not been established. [Source](https://arxiv.org/pdf/2609.31751v1) |
| **HowToChange** | 20 transformations, 409 object–transformation combinations. Framewise F1 on known combinations and 91 new combinations, with the transformation category provided | New combinations do not mean new operations. Independent reuse has not been established here. [VidOSC, §4](https://openaccess.thecvf.com/content/CVPR2024/papers/Xue_Learning_Object_State_Changes_in_Videos_An_Open-World_Perspective_CVPR_2024_paper.pdf) |
| **OSCaR evaluation protocols** | Descriptions before, during, and after the action, and descriptions of the state change. 500 videos with human-corrected reference descriptions | The action and interval are known. New categories are also evaluated against automatic references, and text metrics do not establish outcome correctness. Independent reuse has not been established. [PDF, §4, §6.3–6.4](https://arxiv.org/pdf/2402.17128v4) |
| **VOST, VSCOS, M3VOS, and DAVIS in TubeletGraph** | Segmentation and tracking of transforming objects given an initial mask. DAVIS is a control without an emphasis on transformation | Existing datasets are reused. Mask quality is not transformation-graph completeness. [PDF, §4.1, Table 2](https://arxiv.org/pdf/2511.04678v2) |
| **VOST-TAS** | 57 video instances, 108 transformations, 293 objects from VOST validation. Joint evaluation of timing, resulting masks, and descriptions | Semantic scores are conditional on successful matching. H requires the conditions to hold jointly. Independent reuse of the new test has not been established. [PDF, §4.1–4.2, Table 3](https://arxiv.org/pdf/2511.04678v2) |
| **RoboMeter: MIT Franka / RBM-EVAL-OOD failure detection** | 100 trajectories across seven robotic tasks, 30 successful and 70 unsuccessful, in scenes outside RBM-1M. Failure-detection TPR/TNR, success probability, and temporal progress monitoring | The authors' own evaluation, with no established independent reuse. Stalled progress and visible failure are not product defects. [PDF, §IV, Appendix E.5, Table XXVII](https://arxiv.org/pdf/2603.02115v2#page=31) |

These tests have different units of output: a timestamp, mask, completed step, answer, or relative comparison. They cannot be reduced to a single “state-understanding accuracy.” Reuse notes describe a specific use of data in the works examined. They do not guarantee an identical split or the quality of every protocol.

#### HD-EPIC: detailed annotations of state and spatial history

**[HD-EPIC](/notes/2025-perrett-hd-epic/)** provides detailed ground truth for actions, states, and spatial history. The dataset contains 41 hours in nine kitchens, including detailed action descriptions, object relocations, gaze, sound, recipes, and links to a digital twin. Its 26 650 five-choice questions cover 30 prototypes. In the final PDF, Gemini Pro scores 37.6% averaged across categories, while the human reference on a sample is 90.3%. This is neither open-ended QA nor retrieval completeness. [Publisher PDF, §§3–5, Table 2, p. 7](https://openaccess.thecvf.com/content/CVPR2025/papers/Perrett_HD-EPIC_A_Highly-Detailed_Egocentric_Video_Dataset_CVPR_2025_paper.pdf#page=7).

Unlike large but sparsely annotated archives, HD-EPIC allows us to test what a model knows about a specific object before and after an action. However, the digital twin and dense annotations are expensive ground truth, not an automatically reconstructed model output. Kitchens do not represent construction standards, but offer a stricter intermediate test than the general question “What is happening?” The research value lies in checking representation quality and evaluation procedures, not in demonstrated industrial deployment.

![HD-EPIC annotations](/media/assets/expansion-memory/hd-epic-annotations.png)

*Original Figure 1 of the final PDF, p. 1: actions, objects, sound, gaze, and spatial relations.*

#### ProcObject-10K: state together with temporal evidence

**ProcObject-10K, NeurIPS 2026, Evaluations and Datasets Track.** The work adds an important qualification to conventional step recognition: the same action can lead to different outcomes, and whether the next step is possible depends on the object's state. The dataset contains 10 522 open questions over 1 799 videos. Preconditions, state changes, counterfactual situations, errors, and readiness require answers accompanied by temporal evidence intervals. This joins two Aligned subtasks: memory must retain evidence suitable for verification, and the controller must compare it with the conditions for performing the work. [Wiki](/notes/2026-guo-procobject/), [PDF, §§3–4, pp. 3–7](https://arxiv.org/pdf/2512.03479v3#page=3).

### Origins and key methods

#### Look for the Change, Souček et al., CVPR 2022: initial state → action → final state

The method searches for an **initial state → modifying action → final state** triple in a long unannotated video. On frozen 2D/3D features, two MLPs are trained separately for each category: one distinguishes initial and final states, and the other recognizes the action. Training alternates between selecting the most plausible ordered triple and updating the model on these pseudo-labels. A few exemplar images help downweight irrelevant videos. Exemplar images are an additional source of supervision, although framewise action/state labels are not supplied for training. [Project](https://data.ciirc.cvut.cz/public/projects/2022LookForTheChange/), [code](https://github.com/soCzech/LookForTheChange). On ChangeIt — 34,428 videos, 2,642 hours, 44 categories — state precision is **0.35** and action precision is **0.68**, versus 0.30/0.63 for CLIP. The metric measures whether the selected timestamp falls within an annotated interval, not defect geometry. In the construction-related outlet installing category, state precision is only **0.23**, and for tile cutting it is **0.28**. [PDF, Table 2, Appendix Table 4](https://arxiv.org/pdf/2203.11637v1). For Aligned, the before/action/after evidence structure itself is useful. But a single dominant transition poorly captures repetitions, corrections, and partial completion.

<a id="paper-2024-xue-vidosc"></a>

#### VidOSC, Xue et al., CVPR 2024: transferring a state transition to a new object

VidOSC continues the `initial state → transformation → final state` formulation but tests new combinations of a material and an already known transformation. The method receives temporal features from the entire video, uses language descriptions and pseudo-labels, and then trains a temporal Transformer to distinguish states and background. In its formulation, VidOSC connects the focus on an individual transition in Look for the Change to the more complex object history considered by MOSCATO. However, a “new combination” does not mean an unknown operation: the transformation category is known in advance, and the main variant is trained separately for each category. The full video is available at prediction time, so the results do not establish timely recognition of an outcome in a stream. For Aligned, the interest lies in transfer across materials rather than a ready-made universal quality controller. [PDF, §3–4, Table 2](https://openaccess.thecvf.com/content/CVPR2024/papers/Xue_Learning_Object_State_Changes_in_Videos_An_Open-World_Perspective_CVPR_2024_paper.pdf)

<a id="paper-2024-nguyen-oscar"></a>

#### OSCaR, Nguyen et al., Findings of NAACL 2024: state-change descriptions as training data

OSCaR offers another way to obtain supervision: given the action, object, and episode boundaries, GPT-4V describes frames before, during, and after the action, as well as the change itself. These descriptions form examples for fine-tuning a vision-language model. For Aligned, this is a useful scheme for preparing records of observed outcomes, but not proof that an operation was performed correctly. The main human-correction effort covers 500 videos, while evaluation on new categories uses automatic GPT-4V references. Textual agreement with such a reference does not establish the actual causality of a change. A small user comparison also cannot be extrapolated to the reliability of work monitoring. OSCaR is therefore best read as an approach to annotation and description training that complements explicit state evaluation. [PDF, §3–4, §6](https://arxiv.org/pdf/2402.17128v4)

#### MOSCATO, Zameni et al., ICCV 2025: reconciling actions and multiple object states

MOSCATO tracks the states of multiple objects throughout a procedure. GPT-4o receives annotated actions and proposes states for affected objects while retaining earlier properties. CLIP estimates the time of change, and GLIP checks visibility. When pseudo-labels are constructed, all objects affected by one action are approximated as changing state at a single shared moment. Parallel MSTCN++ branches then learn action recognition and multi-label state prediction, while **State–Action Interaction** reconciles them. Predicted actions are used at inference. [PDF, §§3–5](https://openaccess.thecvf.com/content/ICCV2025/papers/Zameni_MOSCATO_Predicting_Multiple_Object_State_Change_Through_Actions_ICCV_2025_paper.pdf), [official dataset resources](https://github.com/eelhami/iccv25_moscato).

![MOSCATO: an action and multiple object states](/media/assets/pdf-audit-moscato-fig2.png)

*Original Fig. 2, PDF p. 4 (proceedings p. 11603), ICCV 2025. The upper branch constructs pseudo-labels and before/after state correlations, the middle branch predicts actions, and the lower branch predicts the states of multiple objects. SAI combines these signals on the right. Ground-truth actions are used for training and pseudo-labeling, while predicted actions are used at inference. [PDF](https://openaccess.thecvf.com/content/ICCV2025/papers/Zameni_MOSCATO_Predicting_Multiple_Object_State_Change_Through_Actions_ICCV_2025_paper.pdf).*

The result is mixed. On MOSCATO-CMU, adding SAI raises framewise F1-Max from **30.55 → 35.61**. On the harder EGTEA dataset, F1-Max instead falls from **12.85 → 8.04**, although segment F1@0.5 rises from **0 → 6.45**. [PDF, Tables 2, 4](https://openaccess.thecvf.com/content/ICCV2025/papers/Zameni_MOSCATO_Predicting_Multiple_Object_State_Change_Through_Actions_ICCV_2025_paper.pdf). This shows how evaluation depends on temporal granularity. The EgoPER subset used retains normal executions, so better state prediction does not demonstrate error detection. For Aligned, linking each action to the set of objects it changes is useful, but uncertainty in pseudo-labels and visibility gaps must be preserved.

#### STORM-PSR, Schoonbeek et al., CVIU 2025: separately confirming a completed step

STORM-PSR develops the PSR assembly-state approach from IndustReal by adding a temporal branch to assembly-state analysis. This is a direct method lineage described in [§4.1, PDF p. 7](https://arxiv.org/pdf/2510.12385#page=7). One branch recognizes assembly state using YOLOv8-M and allowable transitions, while the other analyzes recent frames using a ViT and a temporal transformer. The two branches' probabilities are averaged with equal weights, and accumulated confidence must exceed a threshold before a step is recorded as complete. This allows a change in part of an object to be used even under partial occlusion. [Project](https://timschoonbeek.github.io/stormpsr), [code](https://github.com/shaohsuanhung/STORM-PSR).

![STORM-PSR: two sources of confirmation for a completed step](/media/assets/pdf-audit-storm-psr-fig1.png)

*Original Fig. 1, PDF p. 3, arXiv:2510.12385v1 (accepted CVIU manuscript). The upper branch analyzes a frame sequence, and the lower branch recognizes assembly state. Their joint prediction concerns completed steps. Confidence accumulation and the acceptance threshold are described in §4.2 but are not separately depicted in this figure. [PDF](https://arxiv.org/pdf/2510.12385).*

Compared with the **IndustReal [43]** assembly-state baseline, F1 on IndustReal rises from **0.891 → 0.901**, and recognition delay falls from **21.0 → 15.5 s**. On MECCANO, delay also falls, from **99.8 → 88.6 s**, but F1 drops from **0.545 → 0.497**. Delay is computed only for true positives, so a shorter delay does not imply a better overall result. [PDF, Table 1](https://arxiv.org/pdf/2510.12385). The tasks concern toy assembly, and the temporal window is limited. For Aligned, the transferable principle is to confirm completion separately rather than treating the action as proof of it.

<a id="paper-2025-sun-tubeletgraph"></a>

#### TubeletGraph, Sun et al., NeurIPS 2025: one object can become several

TubeletGraph considers a case that is awkward for conventional instance memory: after cutting, chopping, or another transformation, the original object changes appearance and may split into several parts. The task is to preserve the connection between these parts and the original object and describe the transition. For Aligned, this usefully complements [physical-instance memory](/chapters/observations/#chapter-3): the history of a workpiece and the resulting parts cannot always be represented as one continuous track. However, the work primarily studies visible object transformations, not identification of construction elements from design documentation.

The inputs are a video and an initial mask of the target object. CropFormer partitions frames into objects, SAM2.1 tracks the resulting regions, and the appearance of an uncovered region creates a candidate for a new fragment of the history. The candidate is linked to the original object through spatial proximity and masked CLIP feature similarity. After a transition is detected, GPT-4.1 receives images with contours and describes the transformation and new objects. The result is a graph of linked visual trajectories and state transitions. This adds structure to segmentation, but a language description does not replace checking that all parts have actually been found.

![Original TubeletGraph diagram](/media/assets/new-work-selection-2026-11-02/2025-sun-tubeletgraph.png)

*Original Figure 2, PDF p. 5. TubeletGraph: short tracks, recovery of emerging parts, and a transformation graph. This is an offline process with a supplied initial mask, not a guaranteed streaming identity history. [Source](https://arxiv.org/pdf/2511.04678v2#page=5).*

VOST, VSCOS, and M3VOS primarily evaluate segmentation of transforming objects, while DAVIS serves as a control without this emphasis. The new VOST-TAS adds joint evaluation of transformation timing, masks of all resulting objects, and description semantics. The distinction matters: on VOST, the improvement over SAM2.1 is 48.4 → 50.9 in J, whereas the strict overall completeness measure H on VOST-TAS reaches only 6.5%. High semantic-description accuracy among successfully matched events does not imply equally complete recovery of all transformations.

The method uses the entire recording, including a candidate's subsequent frames when checking its link to the original object. A temporal transition is triggered by the mechanism that recovers a missing trajectory, so a transformation that causes no such gap may generate no event. Constructing the partitions takes about seven seconds per frame on an RTX A6000 in the reported implementation. Finally, training no new weights does not mean doing no tuning: thresholds are selected on the VOST training split. The work provides a useful format for object-splitting histories, but does not yet establish either their completeness or their timely construction during work. [PDF, §3–4, Tables 2–3](https://arxiv.org/pdf/2511.04678v2)

#### SPOC, Mandikal et al., WACV 2026: localizing the remaining work

SPOC partitions an observed object into **actionable** and **transformed** regions. Grounding DINO, SAM, and tracking generate masks, CLIP with textual state descriptions supplies pseudo-labels, and temporal constraints refine them. A Transformer combines local CLIP mask features with global DINOv2 context to classify regions. A separate model is trained for each verb, so transfer to new objects does not mean demonstrated transfer to an unknown action. [Project](https://vision.cs.utexas.edu/projects/spoc-spatially-progressing-osc/), [data and utilities](https://github.com/priyankamandikal/spoc).

![SPOC: pseudo-labels and training for spatial state segmentation](/media/assets/pdf-audit-spoc-fig2.png)

*Original Fig. 2, PDF p. 4, arXiv:2503.11953v2. Panel (a) creates masks and initial CLIP labels, (b) corrects transition order and ambiguous labels, and (c) trains a video encoder/decoder with the detector, segmentor, and tracker frozen. Red regions still require action, while green regions have already been transformed. [PDF](https://arxiv.org/pdf/2503.11953v2).*

mIoU is **0.502 on WhereToChange-HowTo**, versus **0.427** for SAM+GPT-4o, while transferring the same HowTo-trained model to egocentric WTC-VOST gives **0.267**. The latter sample covers only chop and peel, so this compares different datasets and action compositions rather than isolating the effect of an ego viewpoint. [PDF, Table 2](https://arxiv.org/pdf/2503.11953v2). A single mask containing both processed and unprocessed parts cannot assign them different classes. For Aligned, this is a useful model for localizing remaining work, such as surface coverage, but the visible processed-area fraction does not establish coating thickness, compliance with the procedure, or the quality of hidden regions.

#### ProcObject-10K: object supervision for answers and grounding

The training method extracts anchor-object names from QA pairs, localizes them with Grounding DINO, and generates pseudo-labels for spatial and temporal attention. Auxiliary heads are used only during training. The controlled comparison is particularly important: ordinary SFT yields a judge score of 3.18 and temporal IoU of 42.4, while adding both object losses yields 3.51 and 44.5. This is the contribution of additional supervision, not the entire gain over the original model. Temporal IoU does not measure spatial-tracking correctness or the rate of detected violations. The work provides neither complete human-annotated object trajectories nor physical-state validation. [PDF, Table 5, p. 9, Appendix C](https://arxiv.org/pdf/2512.03479v3#page=9).

![ProcObject-10K: extracting object pseudo-labels and additional training heads](/media/assets/expansion-problems/procobject.png)

*Original Figure 4, PDF p. 6. The spatial and temporal heads are absent at inference.*

#### StateDiffNet: comparing an assembly with a correct reference

**StateDiffNet, ECCV 2024 VISION Workshop, proceedings published in 2025.** This usefully complements STORM-PSR: instead of identifying completed steps, the model localizes differences between the current assembly image and an image of the required correct state. A Siamese encoder, cross-attention, and a U-Net-like decoder produce a difference mask. Synthetic CAD pairs enable learning invariance to lighting and small viewpoint changes. But the approach requires a correct reference and a comparable object view in advance. Its quantitative IoU results are obtained on synthetic data. Transfer to real egocentric frames is shown **qualitatively**, and detection of part-placement errors remains unreliable. This is not measured industrial-inspection accuracy. [Wiki](/notes/2025-lehman-statediffnet/), [PDF, §3, §4.1 and Figure 6, pp. 5–10](https://arxiv.org/pdf/2408.12945v1#page=5).

![StateDiffNet: reference, test image, shared encoder, and difference mask](/media/assets/expansion-problems/statediffnet.png)

*Original Figure 2, PDF p. 5.*

The practical implication for Aligned is that detecting no difference cannot be equated with correctness when the relevant part is obscured by a hand or a suitable view is missing. Expected state, observed evidence, and observability status should be stored separately. Reference comparison is meaningful only after selecting the appropriate procedure stage.

#### AEM and EgoTSR++: action effects and movement toward a goal

**AEM, Guo et al., ICLR 2026**, adds a representation of an action's expected effect to step recognition: object states and the relations between them. Grounding DINO and GPT-4o help generate supervision during training. At inference, learned effect tokens and projectors replace them, and errors are determined relative to correct executions. This is therefore neither a large-VLM call on every frame nor a ready-made streaming controller. [PDF, §3, Fig. 3](https://arxiv.org/pdf/2512.03474v2).

![AEM: extracting effects during training and using a compact representation at inference](/media/assets/expansion-existing/2026-guo-aem.png)

*Original Fig. 3, PDF p. 5. The left and center portions construct training signals. The authors' caption explicitly separates them from testing.*

For Aligned, this supports checking an action's outcome: “the worker used a tool” does not yet mean “the part is properly fastened.” However, the experimental pipeline includes trained action segmentation and constraints of known procedures. Evaluation on a complete recording cannot be extrapolated to warnings at the moment of error without a separate causal replay.

**EgoTSR++, Yang et al., 2026 preprint**, asks a different question: which of two visual states is closer to the specified goal? Pairs are tested in both orders so that the model does not simply choose the second frame because it appears later. Training moves from CoT supervision to cheaper final tags. Tests include regression and recovery, so progress need not be monotonic. [PDF, §§6–7](https://arxiv.org/pdf/2609.31751v1).

![EgoTSR++: moving from reasoning to training with final tags](/media/assets/expansion-existing/2026-yang-egotsr.png)

*Original Fig. 4, PDF p. 7. This is a training scheme for state comparison, not automatic certification of completion.*

The useful elements are the frame-reordering control and the distinction between progress, regression, and recovery. But the relative judgment “closer to the goal” is not the absolute judgment “done correctly.” The recovery portion relies on just nine source videos, so a large number of resulting pairs does not imply as many independent repair cases. In Aligned, before/after comparison should be accompanied by checks of element identity, visibility of the necessary features, and a specific criterion for closing the issue.

<a id="paper-2026-liang-robometer"></a>

#### RoboMeter, Liang et al., 2026 preprint: progress and a separate success check

**RoboMeter** complements progress estimation with a separate success probability and training on preferences between successful and unsuccessful trajectories. Progress tokens see only current and past frames. For Aligned, the separate failure-detection experiment on 100 robotic trajectories across seven tasks is relevant: 30 successful and 70 unsuccessful. Monitoring looks for regression or stalled progress through its correlation with time. In Table XXVII, mean TPR/TNR are **0.77/0.70**, so the signal still allows missed failures and false alarms. Expert demonstrations are assigned linear progress, and some negative examples are created by rewinding. An allowable return to an earlier step therefore cannot automatically be treated as a defect. The model does not observe hidden contact forces, and construction-outcome quality is not tested here. [PDF, §III, §IV, Appendix E.5](https://arxiv.org/pdf/2603.02115v2#page=30).

### How the approaches differ

Look for the Change defines a temporal before/action/after triple. MOSCATO links actions to the states of multiple objects, while AEM uses expected effects to evaluate execution. This is a shared line of inquiry into action outcomes, not a claim of direct architectural inheritance. STORM-PSR decides whether a step is complete, SPOC localizes the remaining region, and StateDiffNet searches for differences from a specified reference. ProcObject-10K connects an answer to object context and temporal evidence, while EgoTSR++ compares two states' proximity to a goal. These outputs complement one another, but require different references and are not interchangeable.
