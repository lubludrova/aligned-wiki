<a id="chapter-6"></a>

Search answers “Where did X happen?” Quality monitoring answers “Did X happen correctly, and is there enough evidence to claim that?” These are different tasks. Frames showing a worker holding a powered screwdriver next to a fastening establish the location and action. They do not yet establish that all fasteners are present, the required torque was applied, or the design was followed. This chapter considers sequence correctness, execution errors, and recovery. The timing of intervention is addressed in [Chapter 7](/chapters/streaming/#chapter-7).

In this chapter, **observation**, **interpretation**, and **an issue decision** should be read as three separate levels. An Aligned example is “a hole without a fastener is visible” → “the assembly is probably incomplete” → “open an issue after checking the requirements and completion deadline.” The final operation requires context that may not be present in the image. Likewise, lack of movement does not establish avoidable downtime, and a repeated action may be an intended operation rather than rework. These are our system requirements, not a ready-made capability of any one paper.

### Benchmarks and evaluation protocols

| Benchmark / protocol | What is tested | Limitation and reuse |
|---|---|---|
| **EgoPER** | Omission, addition, modification, slip, and correction errors in known procedures | 386 recordings, 11 participants, two environments, and scripted errors. Used in TGML, with the normal subset used in MOSCATO, for different tasks. [EgoPER](https://openaccess.thecvf.com/content/CVPR2024/papers/Lee_Error_Detection_in_Egocentric_Procedural_Task_Videos_CVPR_2024_paper.pdf), [TGML](https://arxiv.org/pdf/2502.17753v2), [MOSCATO](https://openaccess.thecvf.com/content/ICCV2025/papers/Zameni_MOSCATO_Predicting_Multiple_Object_State_Change_Through_Actions_ICCV_2025_paper.pdf) |
| **CaptainCook4D** | Errors in technique, order, quantity, and measurements | Used in TGML, PROVIA, and MistExit, but protocols and evaluation units differ. [TGML](https://arxiv.org/pdf/2502.17753v2), [PROVIA](https://arxiv.org/pdf/2609.20638v1), [MistExit](https://arxiv.org/pdf/2603.14252v1) |
| **IndustReal** | Completed steps, assembly state, and errors | Used by STORM-PSR and PROVIA. Completion F1 and alert recall under a specified budget are not the same evaluation. [STORM-PSR](https://arxiv.org/pdf/2510.12385), [PROVIA](https://arxiv.org/pdf/2609.20638v1) |
| **HoloAssist** | Execution with instructor speech, errors, and corrections | Reused in MistSense and PROVIA. Rare errors make class precision more important than an overall score. [MistSense](https://openaccess.thecvf.com/content/ICCV2025/papers/Patsch_MistSense_Versatile_Online_Detection_of_Procedural_and_Execution_Mistakes_ICCV_2025_paper.pdf), [PROVIA](https://arxiv.org/pdf/2609.20638v1) |
| **Assembly101 / Assembly101-O** | Assembly, errors, and corrective actions | TGML and MistExit use different formulations. MistExit merges correction with mistake, which does not test successful recovery. [TGML](https://arxiv.org/pdf/2502.17753v2), [MistExit](https://arxiv.org/pdf/2603.14252v1) |
| **EgoProceL and Epic-tent / Epic-tent-O** | A dependency graph and error detection, respectively, in the reviewed experiments | For Epic-tent, full error supervision must be distinguished from the restricted protocol. This review offers no unified comparison. [TGML](https://arxiv.org/pdf/2502.17753v2), [MistSense](https://openaccess.thecvf.com/content/ICCV2025/papers/Patsch_MistSense_Versatile_Online_Detection_of_Procedural_and_Execution_Mistakes_ICCV_2025_paper.pdf) |
| **IndEgo** | Actions, errors, task graphs, and collaborative work in workshop scenarios | Early evaluation may supply an already segmented interval. Independent reuse of the specific mistake benchmark has not been established here. [Source](https://arxiv.org/pdf/2511.19684v1) |
| **IMPACT** | Component states, anomaly/recovery, and per-camera observability | State & Reasoning is evaluated on front-exo with an IID split. Independent reuse has not been established. [Source](https://arxiv.org/pdf/2604.10409v1) |
| **EgoOops** | An error relative to a textual instruction and localization of its interval | A small controlled dataset excluding omissions/order mistakes. Independent reuse has not been established. [Source](https://www.lsta.media.kyoto-u.ac.jp/mori/research/public/haneji-SAUAFG2025.pdf) |
| **EgoErrorVQA** | Error reasoning given a question and interval | Not a search for the error moment in a continuous recording. Independent reuse has not been established. [Source](https://arxiv.org/pdf/2608.24134v1) |
| **EgoIndAssembly** | Distinguishing similar manipulations and procedure grounding | Not a test of errors or skill quality, and data access has not been confirmed. Independent reuse has not been established. [Source](https://openaccess.thecvf.com/content/CVPR2026W/SAUAFG/papers/Sasaki_EgoIndAssembly_Diagnosing_Fine-Grained_Temporal_Hand_Reasoning_in_Vision-Language_Models_for_CVPRW_2026_paper.pdf) |
| **Diagnostic protocols of IndEgoAssistant, PRISM, and MATT** | Step recognition, temporal structure, and instruction–video mismatch | Respectively, a single scenario, provided step boundaries, or a synthetic instruction substitution. Autonomous detection of natural errors has not been established. [IndEgoAssistant](https://arxiv.org/pdf/2608.22617v1), [PRISM](https://arxiv.org/pdf/2610.31117v1), [MATT](https://arxiv.org/pdf/2511.20525v2) |
| **AMNAR protocol on EgoPER, HoloAssist, and CaptainCook4D** | Normal-only training with action labels, error detection accuracy, and AUC relative to several valid normal continuations | CaptainCook4D excludes Missing Step and Ordering. HoloAssist uses validation, excludes Belt, and treats new classes as background. This reuses data under a narrower protocol. [PDF, §4](https://openaccess.thecvf.com/content/CVPR2025/papers/Huang_Modeling_Multiple_Normal_Action_Representations_for_Error_Detection_in_Procedural_CVPR_2025_paper.pdf), [supplement, §B.1–B.3](https://openaccess.thecvf.com/content/CVPR2025/supplemental/Huang_Modeling_Multiple_Normal_CVPR_2025_supplemental.pdf) |
| **GTEA and the normal subset of EgoPER in VidParse** | Framewise accuracy, Edit, and segmental F1 with known classes and graphs, training labels, and permitted revision of recent history | Tests parsing of normal execution. Reusing EgoPER does not imply error evaluation. Speed includes the hand/object detector and backbone. [PDF, §4, Tables 1–3](https://arxiv.org/pdf/2608.27562v2) |
| **EgoTaskQA / LEMMA** | 40K questions over 2K clips, with normal and indirect splits. Answers about actions, states, dependencies, and participants | Some relations and counterfactual questions are constructed using rules. Language-only shortcuts require separate controls. Independent reuse has not been established here. [PDF, §3–4](https://arxiv.org/pdf/2210.03929v1) |

Reuse of a dataset by another work supports its role as a shared test, but does not make the split, available annotations, or decision timing identical. For Aligned, it is essential to distinguish classifying a prepared step, localizing an error in an entire video, and evaluating a sequence of alerts with corrections.

<a id="paper-2022-jia-egotaskqa"></a>

#### EgoTaskQA, Jia et al., NeurIPS 2022: questions about dependencies within a procedure

EgoTaskQA contains 40 thousand balanced questions over two thousand short LEMMA clips. State and relation annotations are used to construct action dependencies and questions about order, intent, consequences, and other participants. For Aligned, this is an early test of whether an answering system understands connections within a procedure rather than merely recognizing an action. However, many relations are specified through rules and annotations, and a participant's presumed awareness does not measure their internal state. The authors separately show the role of linguistic cues and propose an indirect split for more complex references between actions. Accuracy is therefore useful as a reasoning diagnostic, but does not establish detection of a real error or the causal validity of an inference from a single video. [PDF, §3–4](https://arxiv.org/pdf/2210.03929v1)

#### IndustReal, HoloAssist, and CaptainCook4D

These three datasets provide different evaluation foundations. They allow product state, the timing of assistance, and error type to be separated.

| Work | What it tests and why it is useful | What cannot be transferred without a new test |
|---|---|---|
| **IndustReal**, Schoonbeek et al., WACV 2024 | Part states and recognition of completed steps with errors. 84 recordings, 27 participants, 5.8 hours. In Table 4, PSR overall F1 = 0.883, falling to 0.816 on recordings with errors | The latency of 22.4 s applies only to true positives and does not penalize misses. Controlled assembly of a 3D-printed car and instructions to remove hands after steps make observation easier. [PDF, §4, Table 4](https://openaccess.thecvf.com/content/WACV2024/papers/Schoonbeek_IndustReal_A_Dataset_for_Procedure_Step_Recognition_Handling_Execution_Errors_WACV_2024_paper.pdf) |
| **HoloAssist**, Wang et al., ICCV 2023 | Multimodal execution history with a human instructor's speech and corrections. The PDF reports 166 hours and 2221 sessions | Errors are rare, and several tasks use provided step boundaries or windows before a known intervention. Experiments in Tables 7–8 use 10% of the data. This is not an evaluation of an autonomous continuous instructor. [PDF, §§3–4](https://openaccess.thecvf.com/content/ICCV2023/papers/Wang_HoloAssist_an_Egocentric_Human_Interaction_Dataset_for_Interactive_AI_Assistants_ICCV_2023_paper.pdf) |
| **CaptainCook4D**, Peddi et al., NeurIPS 2024 Datasets and Benchmarks | 384 cooking recordings, 94.5 hours, and seven error types. Useful for errors in technique, order, quantity, and measurements, not just missing steps | Errors are deliberately scripted. Fine-grained actions are annotated for only part of the data. Step-level classification and voting across subsegments do not measure time to first error detection. [PDF, §§3–4, Fig. 5](https://proceedings.neurips.cc/paper_files/paper/2024/file/f4a04396c2ed1342a5d8d05e94cb6101-Paper-Datasets_and_Benchmarks_Track.pdf) |

Our evaluator needs independent splits by person, object, and execution. Thousands of windows from a single recording must not be treated as thousands of independent examples. Correct step boundaries, when supplied to the model, must be a separate oracle condition.

#### IndEgo, NeurIPS 2025: an intermediate test between kitchens and construction sites

IndEgo covers assembly, repair, logistics, and woodworking, including collaboration between two people. It is a **dataset and benchmark suite**, not a ready-made assistant. The collection contains 3,460 ego recordings totaling 197.1 hours, 1,092 exo recordings totaling 96.8 hours, and 20 participants. Available annotations and inputs include actions, task graphs, errors, narration, motion, and other Aria sensor data. [Project](https://indego-dataset.github.io/), [code](https://github.com/Vivek9Chavan/IndEgo), [data](https://huggingface.co/datasets/FraunhoferIPK/IndEgo).

On the mistake benchmark of 1,166 recordings across 25 tasks, zero-shot Gemini 2.0 Flash Thinking Experimental achieves **40.9% F1**, while VideoLLaMA3 features+MLP achieves **39.5%**. For single-action QA, Gemini reaches **64.1%**, versus **90.0%** for humans. However, early diagnosis here may receive the first half of an already segmented interval. This is not equivalent to autonomously detecting error onset in a continuous shift. Some errors are staged, the environments are limited to workshop scenarios, and ego/exo synchronization does not guarantee millisecond precision. [PDF, pp. 7–10, Tables 3, 7, pp. 23–24, Appendix E.4, pp. 44–45, Appendix O](https://arxiv.org/pdf/2511.19684v1).

For Aligned, this is a closer transfer test than domestic QA, especially for interaction between a performer and an assistant. However, industrial assembly in a controlled environment does not replace our own annotations of defects in construction assemblies.

#### IMPACT: an error, an attempted correction, and a restored state

**IMPACT, preprint 2026**, separates an error, an attempted correction, and a restored state. Across 112 laboratory trials of assembling/disassembling commercial angle grinders, it combines a partially ordered procedure, states of 17 components, hand-specific normal/anomaly/recovery labels, and gaps in observability for each camera separately. These annotations better match Aligned's question “what was violated, what did the person do after feedback, and was the required state restored?” than a single abnormal label. [Wiki](/notes/2026-wen-impact/), [PDF, §§3–4, pp. 3–5](https://arxiv.org/pdf/2604.10409v1#page=3).

However, the State & Reasoning benchmark uses **the frontal exo view and an IID split**, even though the dataset also contains an egocentric camera. MS-TCN++ achieves final-state accuracy of 0.93, but transition F1 is 0.33. Recovery F1 among the reported models does not exceed 1.25% for the left hand and 6.41% for the right. High final-state accuracy masks weak reconstruction of the transition sequence. IMPACT's main value for us is its design of states, recovery, and observability. The numbers cannot be transferred to a helmet camera. The PDF and current repository also disagree on the dataset license, so release terms require a separate check before use. [PDF, §5.1, p. 5, Table 5 and reproducibility statement, p. 6](https://arxiv.org/pdf/2604.10409v1#page=6).

![IMPACT: synchronized cameras, components, and levels of procedural annotation](/media/assets/expansion-problems/impact.png)

*Original Figure 1, PDF p. 2. This is a diagram of the data and tasks. The presence of an ego camera does not mean that all results were obtained from it.*

#### Diagnostic tests of instructions and fine manipulations

**EgoOops, ICCV Workshops 2025**, tests how errors depend on instructions: using tape may look normal but be wrong if the procedure requires glue. The dataset contains 50 controlled videos and only seven self-correction examples. Its scope excludes omissions/order mistakes, so it does not validate a broad class of recoveries. [Wiki](/notes/2025-haneji-egooops/), [PDF, §3](https://www.lsta.media.kyoto-u.ac.jp/mori/research/public/haneji-SAUAFG2025.pdf#page=3).

**EgoErrorVQA, EMNLP 2026**, tests error reasoning within an already supplied question and video interval. An open-ended judge and correct/error imbalance limit interpretation of the final score. This evaluates diagnosis from provided material, not autonomous detection of violation onset. [Wiki](/notes/2026-li-egoerrorvqa/), [PDF, §5](https://arxiv.org/pdf/2608.24134v1#page=5).

**EgoIndAssembly, CVPR Workshops 2026**, is an additional perceptual benchmark. Its 222 videos test discrimination between adjacent manipulations of small parts that look almost identical. The work helps test a prerequisite for reliable higher-level reasoning: whether the model actually sees which part was moved where. The authors' HF address returned 401 when checked, so dataset availability has not been confirmed. [Wiki](/notes/2026-sasaki-egoindassembly/), [PDF, §4](https://openaccess.thecvf.com/content/CVPR2026W/SAUAFG/papers/Sasaki_EgoIndAssembly_Diagnosing_Fine-Grained_Temporal_Hand_Reasoning_in_Vision-Language_Models_for_CVPRW_2026_paper.pdf#page=4).

### Foundations and key methods

#### EgoPED: finding deviations from correct examples

**EgoPED, CVPR 2024**, is the method proposed alongside EgoPER. [Paper and project](https://www.khoury.northeastern.edu/home/eelhami/egoper.htm), [code](https://github.com/robert80203/EgoPER_official).

The starting idea is to learn what correct steps look like instead of enumerating every possible error. However, “correct” has multiple visual forms, so each step retains several **prototypes**, the centers of groups of normal features. A fastener, for example, can be tightened from different views and with different tools.

The architecture works as follows. The complete video is converted into I3D features. Temporal action segmentation predicts steps and their boundaries. A separate branch identifies hands and the objects they interact with, while graph convolution encodes relations between objects. The combined representation is compared with normal prototypes of the presumed step. Low similarity becomes an error signal, followed by segment-level smoothing. A missing step cannot be found as an unusual frame, so omissions use a separate comparison of the sequence with the nearest correct demonstration. This is **offline** analysis of a complete video, not a demonstrably causal streaming detector. [PDF, §§4–5](https://openaccess.thecvf.com/content/CVPR2024/papers/Lee_Error_Detection_in_Egocentric_Procedural_Task_Videos_CVPR_2024_paper.pdf).

Across five cooking tasks, EgoPED with ActionFormer averages **57.0% segment-level error detection accuracy** and **62.0% framewise AUC**, versus 43.0% and 54.9% for S3R. These are different metrics, neither equivalent to the proportion of useful manager notifications. Training on correct executions still requires step annotations. [PDF, §3, Table 3](https://openaccess.thecvf.com/content/CVPR2024/papers/Lee_Error_Detection_in_Egocentric_Procedural_Task_Videos_CVPR_2024_paper.pdf).

According to the paper, prototypes are constructed from normal training videos, while thresholds are computed on normal validation videos. This is a check of the described protocol. Training and reproduction of the reported numbers were not performed here. [PDF, pp. 6–7, §§4.2.3, 5.1](https://openaccess.thecvf.com/content/CVPR2024/papers/Lee_Error_Detection_in_Egocentric_Procedural_Task_Videos_CVPR_2024_paper.pdf). For Aligned, the transferable idea is **multiple permissible ways to execute a step**, not a ready-made cooking detector.

<a id="paper-2025-huang-amnar"></a>

#### AMNAR, Huang et al., CVPR 2025: the correct continuation need not be unique

AMNAR refines an assumption that can easily produce an overly strict error detector. If several next actions are valid, disagreement with a single predicted continuation does not establish a violation. The method considers valid next action classes, constructs a history-conditioned normal representation for each, and compares the observation with the best match. This matters for Aligned in procedures where independent operations may be reordered. It still requires a known procedure with action classes and a graph of valid execution.

The model first segments video into actions. Given the recognized history, the graph determines valid next classes. Each class's average normal representation is refined using previous actions through causal temporal convolutions and attention. After observing the next segment, the system compares its features with all valid normal alternatives. The minimum distance becomes an anomaly score, which is compared with the threshold for the corresponding class. Thus, order variability is considered before diagnosis rather than explained afterward by a language model.

![Original AMNAR architecture](/media/assets/new-work-selection-2026-11-02/2025-huang-amnar.png)

*Original Figure 2, PDF p. 3. AMNAR: selecting valid next actions, reconstructing normal features, and comparing them with the observed segment. The described error assessment requires the segment to end. [Source](https://openaccess.thecvf.com/content/CVPR2025/papers/Huang_Modeling_Multiple_Normal_Action_Representations_for_Error_Detection_in_Procedural_CVPR_2025_paper.pdf#page=3).*

Training requires normal executions with framewise action labels. Thresholds are also computed from normal training data, so normal-only does not mean annotation-free here. EgoPER uses a provided graph, while HoloAssist and CaptainCook4D graphs are constructed from training sequences. The main comparison with EgoPED also includes segmenter differences. A more informative control uses the same segmentation model: in Table 8, error detection accuracy increases from 63.1 to 64.4, and AUC from 61.9 to 68.5. This supports the value of multiple normal continuations, but does not make every improvement in the main table the effect of a single component.

The evaluation is narrower than the label “procedural errors.” CaptainCook4D excludes Missing Step and Ordering because the authors focus on execution errors. HoloAssist uses the validation split, excludes the Belt task, and treats classes unseen in training as background. Causality of the context block does not establish an early alert either: the representation of the action under evaluation aggregates frames from its segmented interval. AMNAR is therefore useful as a model of normal variability and for assessing an already observed action. A missing required step, alert latency, and successful correction require additional protocols. [Main PDF, §3–4, Table 8](https://openaccess.thecvf.com/content/CVPR2025/papers/Huang_Modeling_Multiple_Normal_Action_Representations_for_Error_Detection_in_Procedural_CVPR_2025_paper.pdf), [supplement, §B.1–B.3](https://openaccess.thecvf.com/content/CVPR2025/supplemental/Huang_Modeling_Multiple_Normal_CVPR_2025_supplemental.pdf)

#### DTGL / TGML: a procedure as a dependency graph

**A key work for interpretable order checking.** In a linear scenario “A → B → C,” every deviation looks like an error. In a real procedure, A and B may sometimes occur in either order, but C requires both results. A **task graph** describes such dependencies. DTGL is a NeurIPS 2024 work, and TGML is its extension published in TPAMI in 2026. The quantitative results here refer to the stored preprint `2502.17753v2`, not an independently checked final journal version. [PDF](https://arxiv.org/pdf/2502.17753v2), [shared repository](https://github.com/fpv-iplab/Differentiable-Task-Graph-Learning).

TGML learns edge weights from sequences of annotated actions. The **Direct Optimization** variant directly optimizes the dependency matrix. **Task Graph Transformer** receives textual or visual step embeddings from EgoVLPv2. The first transformer encodes steps, a relation head connects pairs of their representations, and a second transformer produces the edge matrix. After training, thresholds, removal of transitive links, and removal of weak cycle edges yield the final DAG. Online checking is straightforward: when a new step is recognized, its prerequisites are checked against the history of already observed steps.

![TGML: Task Graph Transformer architecture](/media/assets/pdf-audit-tgml.png)

*The figure is the original architecture of TGT, a TGML variant. Seminara et al., arXiv:2502.17753v2, Fig. 3, PDF p. 6. Textual names or video examples of steps pass through EgoVLPv2, a step transformer, and a relation head. The output is a dependency matrix learned from annotated sequences through the TGML loss. This is a model diagram, not a ready-made construction detector.*

For edge reconstruction, DO achieves F1 **87.8 / 91.0 / 72.3** on CaptainCook4D / EgoPER / EgoProceL. However, good graph reconstruction does not imply a good video-based error detector. With recognized rather than ground-truth actions on Assembly101-O, overall average F1 is **53.5**, while F1 specifically for the error class is **28.1**. Action recognition errors propagate to the next level. [PDF, p. 8, Tables I–III, p. 13, Table VI](https://arxiv.org/pdf/2502.17753v2).

There are two limitations for construction. A frequently observed order is not necessarily a mandatory regulatory requirement. Also, a set of completed step names does not retain the number of repetitions, the specific assembly, or result quality. “A fastener was installed” cannot be credited to an entire room after a single such action. Our conclusion is that the graph must be linked to a **work item**, permissible alternatives, and a requirements version. Recognition uncertainty must be retained, or a gap in camera coverage will become a false accusation of an ordering violation.

#### MistSense, ICCV 2025: detecting an error and explaining it separately

**Why read it:** it shows how to combine fine motor information, video, and a language explanation. A frozen ViT-L and image Q-Former extract features from RGB, and a temporal Video Q-Former aggregates frames. In parallel, MediaPipe-predicted hand positions pass through a temporal encoder and Hand Q-Former. Their representations are combined for a binary decision. When a threshold is exceeded, Llama 2-7B with a trained projection and LoRA generates an explanation. An important detail is that the language branch receives RGB features, not the hand representation directly. [Paper](https://openaccess.thecvf.com/content/ICCV2025/html/Patsch_MistSense_Versatile_Online_Detection_of_Procedural_and_Execution_Mistakes_ICCV_2025_paper.html), [reviewed local PDF, Fig. 2](https://openaccess.thecvf.com/content/ICCV2025/papers/Patsch_MistSense_Versatile_Online_Detection_of_Procedural_and_Execution_Mistakes_ICCV_2025_paper.pdf).

![MistSense architecture](/media/assets/2025-patsch-mistsense-architecture.png)

*The figure is the original MistSense architecture. Patsch et al., ICCV 2025, Fig. 2, PDF p. 4 / proceedings p. 14531. RGB and hand positions are combined for error detection. Only RGB features reach the language branch through the gate, so explanation and detection have different inputs. The English labels are retained.*

On Epic-tent-O, RGB+predicted hands achieves **63.3% overall F1**, compared with 46.5% for DO. However, MistSense receives error supervision from the full Epic-tent dataset, so this is not a clean architectural comparison under identical data. HoloAssist is more revealing: overall F1 is **55.7%**, but error-class precision is only **10.3%**, with recall of **31.6%**. Under this protocol, most positive decisions are incorrect despite the attractive overall score. [PDF, Tables 1, 3](https://openaccess.thecvf.com/content/ICCV2025/papers/Patsch_MistSense_Versatile_Online_Detection_of_Procedural_and_Execution_Mistakes_ICCV_2025_paper.pdf).

Explanations are evaluated using BLEU/ROUGE/CIDEr. Matching reference wording does not establish correct causal diagnosis. One detection+explanation run takes approximately four seconds and 20.5 GB VRAM on an RTX A6000 under the described pipeline, which does not establish throughput for 100 cameras. Reproducible code availability cannot be established from the PDF alone. For Aligned, the useful principle is that **detector confidence**, **diagnosis correctness**, and **notification policy** are evaluated separately.

<a id="paper-2026-gupta-vidparse"></a>

#### VidParse, Gupta et al., ECCV 2026: recognizing execution before checking errors

VidParse addresses recognition of the current step and its boundaries, a task that precedes error detection. The authors combine frozen foundation-model features with a procedure graph and bounded revision of the recent past. For Aligned, the useful idea is a revisable history: a brief occlusion should not immediately create a final new step. However, a system that prefers a correct sequence may simultaneously make a real violation less visible. Parsing quality therefore cannot automatically be treated as execution-monitoring quality.

Visual features come from DINOv2 in the hand–object interaction region. Changes in the temporal similarity of these features are used to find action boundaries. Step prototypes and a graph of permissible transitions are constructed in advance from annotated training executions. Beam search matches observations to prototypes, permits graph-supported repetitions and optional steps, but rejects prohibited transitions. Gap rectification can correct a brief recognition failure. Older decisions are committed after a delay of several seconds, while recent ones may still be revised.

![Original VidParse architecture](/media/assets/new-work-selection-2026-11-02/2026-gupta-vidparse.png)

*Original Figure 2, PDF p. 4. VidParse: interaction features, boundary detection, and graph constraints on the sequence. Parsing uses annotated prototypes and permissible transitions. This experiment does not evaluate execution errors. [Source](https://arxiv.org/pdf/2608.27562v2#page=4).*

Thus, training-free means that the proposed recognizer's weights are not trained, not that training examples, labels, or task-specific structure are absent. The main tests are GTEA and only normal EgoPER executions. On EgoPER, comparison with ProTAS using the same DINOv2 interaction features raises F1@0.5 from 67.26 to 77.61, but lowers framewise accuracy from 83.31 to 80.69. The method reconstructs segment structure better in this comparison, but does not outperform it on every aspect of recognition. These results also do not establish that the system detects incorrect ordering or a missing operation.

The limitation is especially clear in the appendix examples: a new valid order absent from the learned graph may be incorrectly pruned. In violation assessment, this is even more dangerous, because an actual incorrect transition may also disappear from the final history. Speed must include the visual input: Table 3 reports 8.6 frames per second with hand and object detection and feature extraction, while EgoPER is processed at 10 frames per second. This is not evidence of operation without accumulating delay. VidParse is useful as a structural recognition baseline, while PROVIA next asks a different question: how to retain an observed error without turning it into valid procedure progress. [PDF, §3–5, Tables 2–3, supplementary limitations](https://arxiv.org/pdf/2608.27562v2)

#### PROVIA, 2026: an erroneous step must not automatically advance the procedure

**A key work for execution state and honest alert evaluation.** Imagine that a worker mistakenly closes a cover before checking the connections, then reopens it and corrects the connection. The factual history must retain both closing and opening. However, progress through the correct procedure must not treat premature closing as successful completion.

PROVIA separates **factual state** from **accepted procedure progress**. A streaming segmenter identifies steps, correct demonstrations are converted into a probabilistic automaton, and a filter maintains a distribution over procedure states and correct/mistake/correction statuses. Progress advances only through the correct branch, while factual memory also updates during errors. A sequential detector accumulates evidence and raises an alarm. The segmenter is trained on steps, and the status model on annotated errors. This is not training only on normal videos. [Paper](https://arxiv.org/abs/2609.20638v1), [PDF, §IV](https://arxiv.org/pdf/2609.20638v1), [code](https://github.com/Kratos-Wen/PROVIA).

![PROVIA architecture](/media/assets/2026-wen-provia-architecture.png)

*The figure is the original PROVIA procedure-tracking diagram. Wen et al., arXiv:2609.20638v1, Fig. 1, PDF p. 4. Reference executions and a streaming query are on the left, with separate factual state and belief over procedure state below.*

The experimental protocol is particularly important: videos are not truncated at the first error. Subsequent errors, corrections, and false alarms are evaluated throughout the execution. A threshold is tuned on validation to a false-alarm budget and transferred to test. At **0.1 false alarms per minute of correct execution on validation**, recall of all errors is **0.154 on CaptainCook4D**, **0.034 on HoloAssist**, and **0.098 on IndustReal**. Actual test rates per minute of correct execution are respectively 0.075, 0.093, and 0.126, so the validation budget does not guarantee the same rate after transfer. On IndustReal, the method does not consistently outperform controls without visual perception. [PDF, Table IV](https://arxiv.org/pdf/2609.20638v1).

This is not a reason to ignore the method. It is important evidence of how difficult useful alerting is. Even 0.1 false alarms per minute would amount to six per hour of correct execution if that rate persisted. It cannot be scaled across all cameras without merging events. This arithmetic is our illustration, not a measurement from the paper on a construction site.

The PDF itself describes a **grace** allowance of one following decision when crediting an alert: one alert can confirm two adjacent errors. Under strict one-to-one matching, PROVIA recall on CaptainCook4D at the same validation budget of 0.1 falls from 0.154 to **0.094**. Headline recall must therefore be read together with the matching rule. [PDF, p. 2, §III, p. 7, §V-F](https://arxiv.org/pdf/2609.20638v1). Aligned should adopt the separation of fact and progress, together with a full-working-day protocol, rather than promise ready-made reliability in defect recognition.

#### IndEgoAssistant, PRISM, and MATT: procedure structure does not imply compliance

**IndEgoAssistant**, Chavan and Krüger, CIRP Annals 2026, extracts a procedure from an expert video and spoken explanation. WhisperX aligns speech with time, an LLM proposes a dependency graph, and an expert then validates it. Frozen V-JEPA-2 features support action recognition, while history and the graph constrain permissible next steps. With multiple demonstrations, small task-specific heads are trained. [PDF, §2, Fig. 2](https://arxiv.org/pdf/2608.22617v1).

![IndEgoAssistant: expert demonstration, procedure graph, and visual features](/media/assets/expansion-existing/2026-chavan-indego-assistant.png)

*Original Fig. 2, PDF p. 2. The graph undergoes expert validation. This is a substantial part of task preparation.*

For Aligned, this is a concrete way to onboard a new operation, particularly if a foreman can demonstrate correct execution with explanations. However, the paper evaluates a single equipment-disassembly scenario, and step recognition is tested offline. A next step allowed by the graph does not establish the quality of the previous one. The expert graph should therefore be used as a testable assumption, not an automatically trustworthy rule.

**PRISM**, Loginova et al., 2026, is useful as an inexpensive comparison: describe an action through semantic roles and use an HMM for temporal structure. However, evaluation relies on supplied step boundaries, a known set of candidates, and correct reference examples. Improving the local classifier does not mean Viterbi always improves the final sequence. [PDF, Methods / Experiments](https://arxiv.org/pdf/2610.31117v1).

**MATT**, Li et al., 2026, considers instruction–video mismatch through what/when/where answers. This is a useful template for explaining an issue with temporal and spatial localization. However, errors are created by substituting instructions, the point-of-no-return is inherited from state-change annotations, and the model sees the complete clip without a causal mask. The work therefore does not establish timely detection of natural errors or repair. Both works are included briefly as diagnostic baselines rather than primary detector candidates. [PDF, data construction / model](https://arxiv.org/pdf/2511.20525v2).

#### StepFormer++: an error relative to a textual instruction

StepFormer++ first aligns untrimmed video with text, then classifies segments. On EgoOops, mAP of 2.5 versus 0.7 for ActionFormer remains very low even at tIoU 0.1/0.2/0.3. An oracle with ground-truth step boundaries achieves 34.7, showing how strongly classification depends on localization. [PDF, Table 4, p. 7](https://www.lsta.media.kyoto-u.ac.jp/mori/research/public/haneji-SAUAFG2025.pdf#page=7).

![EgoOops: StepFormer++ and alignment with procedural text](/media/assets/expansion-problems/egooops.png)

*Original Figure 3, PDF p. 6.*

#### Ego-ADR: the procedure, observation, and diagnostic conclusion

**Ego-ADR**, proposed alongside EgoErrorVQA, structures reasoning by matching the queried step to a procedure, describing the observation, and then classifying the deviation. Ego-ADR uses a separate procedure bank and different textual reasoning strategies. However, questions/intervals are already supplied. For Qwen2.5-VL with eight frames, F1 rises from 18.2 to 19.8, while accuracy rises from 12.8 to 19.6. The relative increase in the second metric should not be presented as a comparable improvement in detection quality. An open-ended judge and correct/error imbalance limit interpretation. For Aligned, this is supporting work on separating knowledge from observation, not a primary result in streaming monitoring. [Wiki](/notes/2026-li-egoerrorvqa/), [PDF, §5 and Table 4, pp. 5–7](https://arxiv.org/pdf/2608.24134v1#page=7).

![Ego-ADR: step matching, video description, and error classification](/media/assets/expansion-problems/egoerrorvqa.png)

*Original Figure 3, PDF p. 5.*

#### Progressive Procedure Grounding: distinguishing adjacent manipulations

Progressive Procedure Grounding uses successive chunks and attention to hands. On EgoIndAssembly, the best reported MoF of 0.435 and tIoU of 0.240 are not measures of error detection or worker skill assessment. [PDF, Algorithm 1 and Table 3, pp. 4–5](https://openaccess.thecvf.com/content/CVPR2026W/SAUAFG/papers/Sasaki_EgoIndAssembly_Diagnosing_Fine-Grained_Temporal_Hand_Reasoning_in_Vision-Language_Models_for_CVPRW_2026_paper.pdf#page=5).

### How the approaches differ

EgoPED compares observations with multiple normal prototypes, DTGL/TGML reconstructs step dependencies, and MistSense handles detection and explanation separately. PROVIA stores factual history separately from progress through the correct procedure, so an erroneous action need not advance execution. IndEgoAssistant adds an expert-validated graph, while StepFormer++ and Ego-ADR connect observations to a textual procedure. These are different bases for an error decision. Neither correct order nor similarity to a normal example alone establishes that the physical state has been restored.
