<a id="chapter-3"></a>



Consider one Aligned episode. Pedro brings the fasteners, another worker installs a panel, and a third records the reworked area that evening. Searching for “panel” and “fasteners” will return many similar frames. To reconstruct this particular job, the system must establish four distinct links: the recordings concern the same time, the same place, the same physical object, and the same procedure. Semantic similarity proves none of these. It is therefore useful to read the literature on multiple sources in terms of the link each method actually recovers.

This chapter covers shared memory across participants, attributing an action to a person, selecting a complementary view, and identifying an object or a work instance. Reasoning over a long history was already discussed in [Chapter 2](/chapters/archive/#chapter-2). Here the question is more specific: can the retrieved observations legitimately be combined into one history at all?

### Benchmarks and evaluation protocols

A large video collection and a benchmark for a particular link are different things. Hundreds of camera wearers do not imply hundreds of synchronized views, and a correct answer about an object does not directly measure the accuracy of its identification.

| Benchmark or protocol | What is tested and what the model receives | How to interpret the result | Reuse and evaluation boundary |
|---|---|---|---|
| **MA-EgoQA** | Questions about observations from multiple EgoLife participants | Five-choice QA accuracy, comparing shared memory with individual descriptions | Independent reuse has not been established in this review. Does not automatically test synchronization or entity-matching quality |
| **MyEgo** | The camera wearer's own actions, belongings, and history | Open-answer accuracy with a model judge | The public evaluation is described below. Independent reuse has not been established, and the temporal gap is usually short |
| **M3-Bench-robot / web** | Questions about multimodal memory under the M3-Agent protocol | QA and ablations of semantic memory / identity equivalence | Independent reuse has not been established. Not a separate face–voice association metric, and humans simulate the robot's perspective in the robot subset |
| **EgoExoMem** | One ego stream and one synchronized exo stream on LEMMA and Ego-Exo4D | QA with the same model and frame budget | Independent reuse has not been established. Not multicamera memory for a work shift |
| **Ego4D VQ / VQ3D** | Finding a previously seen object, including its location | Localization under the specified query type and success criterion | LEDGER uses an adapted VQ3D setup. Its result cannot automatically be compared with the official protocol |
| **OSNOM / EPIC-KITCHENS** | Identity and 3D position at a temporal offset | PCL requires the correct instance and a position within 30 cm | The underlying corpus is reused, but human masks and precomputed geometry simplify this protocol |
| **EgoLifeQA / Ego-R1 Bench** | Questions about a long history, used by GEB | QA and retrieval cost with a particular reader | Reused by methods in [Chapter 2](/chapters/archive/#chapter-2), but do not provide separate identity precision/recall |
| **Video-MME Long** | General long-video evaluation in M3-Agent | QA with specified frame access | Used by several methods in Chapter 2, not a dedicated test of identity linking |
| **VisualSync: EgoHumans, 3D-POP, CMU** | Short, jointly visible events with artificial temporal offsets | Below, EgoHumans and 3D-POP illustrate offset error, while CMU illustrates processing cost | A synchronization protocol, not a test of clock drift over a work shift |
| **Construction hoist case assignment** | A month of hoist telemetry, with different rules for defining trips | Sensitivity of KPIs and process models to the rules | No independent trip ground truth. A case study rather than a benchmark of event-linking accuracy |
| **UCS-Bench / DirectMe** | 8 114 questions over 532 videos, more than 170 hours: trajectories, user-relative position, proximity/accessibility, categories/counts | QA on timestamped questions and past evidence. Human 91.0% was obtained on a separate sample with replay | Independent reuse has not been established. Causality of the full memory-construction process has not been demonstrated, and 1-fps DirectMe and the 64-frame baseline have different budgets. [PDF, §3, Table 3, Appendix F.6](https://arxiv.org/pdf/2606.15200v1#page=8) |
| **NaVQA** | 210 spatial, temporal, and descriptive questions over seven CODa robot sequences | Descriptive accuracy, coordinate/time error, overall correctness with thresholds of 15 m and two minutes | Independent reuse has not been established here. Robot position is provided, and these tolerances do not test fastener-localization accuracy. [ReMEmbR, §§V–VI](https://arxiv.org/pdf/2409.13682v1#page=4) |
| **All-Angles Bench** | Static synchronized views, correspondence, counting, directions, and distances | Three-choice accuracy and consistency of question pairs, with a separate partial-visibility control | Not temporal memory. Independent reuse has not been established here. [PDF, §§2–4](https://arxiv.org/pdf/2504.15280v2) |
| **EgoExoBench** | Synchronized views and asynchronous demonstrations, 11 tasks | Four-choice QA, with separate evaluations with and without a reference | EgoExoLearn/Ego-Exo4D are reused as sources. Independent reuse of the benchmark itself has not been established here. [PDF, §3, Tables 1–2](https://arxiv.org/pdf/2507.18342v1) |
| **EgoExoLearn** | An asynchronous demonstration and execution, action association and relative skill ranking | Action matching and pairwise accuracy on presegmented clips | The source data and annotations are reused by EgoExoBench. Gaze may be unavailable on an ordinary hard hat. [PDF, §§3–4](https://arxiv.org/pdf/2403.16182v3) |
| **Multi-Ego** | A shared video summary from multiple wearable cameras | Summary F1 under a length budget | Subjective highlights do not evaluate evidence completeness. Independent reuse has not been established here. [PDF, §§3–5](https://openaccess.thecvf.com/content/WACV2022/papers/Elfeki_Multi-Stream_Dynamic_Video_Summarization_WACV_2022_paper.pdf) |

Sources and protocol details are provided in the corresponding discussions below. “Independent reuse has not been established” describes the scope of this review, not a claim that no other uses exist.

#### Foundational datasets: what large collections actually provide

| Dataset | Original scale, rather than the continually changing size of the latest release | What matters for Aligned | Limits of interpretation |
|---|---|---|---|
| **Ego4D, CVPR 2022** | 3 670 hours, 931 wearers, 74 locations, 9 countries | NLQ for evidence localization, VQ for object search, state-change and audio-visual tasks | The number of participants is not the number of synchronized cameras. NLQ evaluates an interval, not the quality of a free-form answer |
| **Assembly101, CVPR 2022** | 362 disassembly/assembly executions, 4 321 videos from different views, 513 camera-hours, 53 people | Synchronized views, steps, errors and corrections, hand poses | 4 321 videos are not 4 321 independent executions. Toy assembly differs from construction |
| **Ego-Exo4D, CVPR 2024** | 740 participants, 1 286 hours summed across views in the expanded version examined | Synchronized ego/exo views, expert commentary, step dependencies, pose and proficiency | Proficiency is annotated differently across domains. An external view does not guarantee that a defect is visible |

Sources: [Ego4D proceedings](https://openaccess.thecvf.com/content/CVPR2022/html/Grauman_Ego4D_Around_the_World_in_3000_Hours_of_Egocentric_Video_CVPR_2022_paper.html), [Assembly101](https://arxiv.org/abs/2203.14712v2), [Ego-Exo4D expanded manuscript](https://arxiv.org/abs/2311.18259v4). Data and tools: [Ego4D episodic-memory baselines](https://github.com/EGO4D/episodic-memory), [Assembly101 action recognition](https://github.com/assembly-101/assembly101-action-recognition), [Ego4D/Ego-Exo4D tools](https://github.com/facebookresearch/Ego4d).

The historical contribution of these works is to break the vague goal of “understanding video” into testable tasks. Ego4D provides formulations for retrieving past events and interactions. Assembly101 supports evaluation of procedures with errors and recovery. Ego-Exo4D adds expert explanations and linked viewpoints. They are not ready-made site-management systems, but they allow individual components to be tested before collecting expensive specialized data.

#### MA-EgoQA: questioning the shared history of multiple participants

**Kim et al., 2026, preprint.** The benchmark contains 1 741 five-choice questions based on a week of shared life among six EgoLife participants. It requires combining evidence across participants rather than reading just one individual's recording. Sharing a corpus with EgoLifeQA does not make these evaluations independent tests of transfer across environments. EgoMAS, the method proposed alongside the benchmark, is discussed below. [Paper, §§4–6](https://arxiv.org/abs/2603.09827v2).

#### MyEgo — first establish whose action it is

**Xiao et al., CVPR 2026.** This work is useful as a diagnostic test of personal attribution. “Where did I put the tool?” differs from “Where is a tool visible?” A model may name another person's conspicuous object and technically describe the frame correctly, yet give the user the wrong answer. MyEgo tests the camera wearer's own belongings, actions, and past episodes. [Paper](https://arxiv.org/abs/2604.01966v1), §§3–4.

![MyEgo: grounding the question in the wearer and the time of the evidence](/media/assets/pdf-audit-myego-fig2.png)

*Original Fig. 2, PDF p. 3, arXiv:2604.01966v1. In (a), the wearer's hand must be distinguished from someone else's. In (b), the task is to recall which particular game pieces the wearer used. Question time and answer time are annotated separately. This illustrates the benchmark, not a memory architecture. [PDF](https://arxiv.org/pdf/2604.01966v1).*

The benchmark contains 5 012 manually written questions over 541 videos from Ego4D, EgoLife, and CASTEL2024. GPT-5 achieves **46.1% open-answer accuracy**, and Qwen3-VL-8B-Instruct achieves **36.4%** (Table 2, PDF p. 6). Here, open-answer accuracy is determined by binary judgment from GPT-5 mini, not exact string matching. Human 84.7% was measured on a separate sample of 300 questions, so the direct gap from a model's result on the full benchmark cannot be interpreted as a strictly matched comparison. Another crucial detail is that the mean gap between the evidence and the question is about 20 seconds. This tests difficult attribution, rather than demonstrating week-long memory.

**For Aligned:** camera ID, wearer ID, visible actor ID, and speaker ID should be separate fields. An action in Pedro's footage may be performed by his colleague. Recording who was issued a camera establishes only the first correspondence. It does not replace visual identification of the person performing the action. [MyEgo GitHub](https://github.com/Ryougetsu3606/MyEgo) includes data, inference, and evaluation. The work does not propose a new persistent-memory architecture.

#### EgoExoMem: evidence from complementary viewpoints

**Liu et al., 2026, preprint.** This work considers a pair: one ego stream and one synchronized exo stream. A head-mounted camera shows fine hand actions, while the external view shows surrounding people and the scene. Comparing methods requires fixing the total frame budget across them. [Paper](https://arxiv.org/abs/2605.18734v2), §4, Table 4.

![EgoExoMem: evidence from two synchronized viewpoints](/media/assets/pdf-audit-egoexomem-fig1.png)

*Original Fig. 1, PDF p. 1, arXiv:2605.18734v2. The ego view shows the state of the watermelon, while the exo view identifies when another person puts down a plate. Comparing them rules out a later but incorrect frame. This is the benchmark setup, not an E²-Select diagram. [PDF](https://arxiv.org/pdf/2605.18734v2).*

<a id="paper-2026-yeh-all-angles-bench"></a>

#### All-Angles Bench: check correspondences before combining views

**Yeh et al., AAAI 2026.** One worker may be visible in two cameras, while another appears in only one. Simply adding the people in the images will overcount participants, while taking the maximum count from a single view may undercount them. All-Angles Bench tests precisely this reconciliation of observations. It is a spatial-understanding benchmark, not a new memory architecture. This discussion examines the stored **arXiv v2 from April 2025**, which evaluates 27 models. The final publication reports a broader set of models, and its numbers are not automatically carried over to this version. [PDF, §2](https://arxiv.org/pdf/2504.15280v2#page=3).

The authors select synchronized static images from four or five cameras across 90 Ego-Exo4D and EgoHumans scenes. This produces 2 132 three-choice questions. Six task families cover attributes, counting, camera positions, imagined object movement, relative direction, and distance. Questions initially prepared with language-model assistance undergo human correction and additional validation. Rephrased or view-reversed pairs test answer stability rather than a single successful choice (§§2.2, 3.3).

![Original All-Angles Bench diagram](/media/assets/new-work-selection-2026-11-02/2026-yeh-all-angles-bench.png)

*Original Figure 2, PDF p. 2. All-Angles Bench: six question types over multiple static views. This illustrates the benchmark, not a camera-fusion model. [Source](https://arxiv.org/pdf/2504.15280v2#page=2).*

On the same sample of **250 questions**, humans achieve 82.0%, InternVL2.5-38B achieves 60.8%, and GPT-4o achieves 52.4%. This is a comparable subset, not a human evaluation of the entire dataset. The main text and appendix disagree on how questions were distributed among annotators. Another limitation of the metric is that Figure 5 groups together pairs with two correct answers and pairs with two incorrect answers. Low inconsistency therefore does not prove correctness. [Table 1, p. 5, §3.3 and Appendix §8.1](https://arxiv.org/pdf/2504.15280v2#page=5).

In a separate evaluation, 55 scenes are manually cropped so that information about people is distributed across views. An instruction to establish identities first helps GPT-4o but does not yield consistent gains for stronger counting models. What transfers to Aligned is the design of this control: test the same episode with full and partial visibility before recording a shared event. Static scenes do not test identity persistence across work shifts, camera movement, or object history. Independent reuse of this test has not been established in the sources reviewed. [§4.1, Figures 6–7](https://arxiv.org/pdf/2504.15280v2#page=6).

<a id="paper-2025-he-egoexobench"></a>

#### EgoExoBench: a second view and a reference execution solve different problems

**He et al., NeurIPS 2025 Datasets and Benchmarks.** A second video may show the same event from another camera, or it may demonstrate a similar operation performed by another person. The first case requires reconciling observations. The second requires matching actions despite differences in execution. EgoExoBench brings together **7 330 four-choice questions** from six sources. Eleven tasks test semantic correspondence, viewpoint relationships, and temporal relations. They include identifying the camera wearer, predicting the next action, and comparing execution quality. This is a collection of tests, not a multiday memory system. [PDF v1, §3](https://arxiv.org/pdf/2507.18342v1#page=3).

Correct answers are derived from the original annotations of actions, people, and execution proficiency. Language models help construct questions and distractors, check annotation consistency, and remove cases that can be answered without video. Some visibility and spatial questions are checked manually. Such filtering reduces specific shortcuts but does not establish that every question necessarily requires both views. For Aligned, this is a reason to compare the full input with an input that omits the additional camera or reference, rather than treating more video as inherently useful (§§3.2–3.3).

![Original EgoExoBench diagram](/media/assets/new-work-selection-2026-11-02/2025-he-egoexobench.png)

*Original Figure 1, PDF p. 3. EgoExoBench: collecting source videos, creating QA, and validating questions. This depicts benchmark preparation, not a memory architecture. [Source](https://arxiv.org/pdf/2507.18342v1#page=3).*

On the same sample of **330 questions**, human accuracy with deliberation is 90.1%, versus 48.5% for Qwen2.5-VL-72B. In the small skill-estimation portion of this sample, the scores are 68.9% and 26.7%. These are subset results. The overall Qwen score differs between the text and Table 1, so the human comparison cannot be replaced with an arbitrary headline score from the paper. [Table 1, pp. 7–8](https://arxiv.org/pdf/2507.18342v1#page=8).

The control with and without a reference is particularly useful. For Qwen, an additional demonstration raises next-action accuracy from **31.7% → 39.9%**, but reduces skill-estimation accuracy from **31.4% → 29.9%**. All three models tested have a lower skill score with a reference. Context that helps continue a procedure therefore does not necessarily help assess quality. This is a limited experiment on recorded clips, not proof that expert examples are generally useless. [Table 2, p. 9](https://arxiv.org/pdf/2507.18342v1#page=9).

EgoExoLearn and Ego-Exo4D are reused here as sources of data and annotations. This confirms reuse of the original collections, but not independent reuse of the new EgoExoBench itself. Its comparative labels also do not define construction-quality criteria or a worker's absolute qualification level.

<a id="paper-2024-huang-egoexolearn"></a>

#### EgoExoLearn: matching a demonstration to a different execution

**Huang et al., CVPR 2024.** EgoExoLearn links exo demonstrations with ego executions recorded at another time and in another environment. Its 120 hours of recordings include action, gaze, and comparative-quality annotations. For skill ranking, four annotators compare pairs of clips showing the same action, leaving 34 239 pairs after filtering. This is the number of comparisons, not independent workers. Baseline models rank presegmented clips, while an additional reference produces small and mixed changes in performance. For Aligned, the protocol for matching an instruction to an execution is useful, but kitchen preferences do not establish the quality of a construction assembly. The data and skill annotations are later used in EgoExoBench. [EgoExoLearn, §§3–4, Table 5](https://arxiv.org/pdf/2403.16182v3#page=8), [EgoExoBench, §3.3](https://arxiv.org/pdf/2507.18342v1#page=5).

### Origins and key methods

#### VisualSync: a shared timeline before combining events

**Liu et al., NeurIPS 2025.** [Note](/notes/2025-liu-visualsync/), [PDF](https://arxiv.org/pdf/2512.02017v1).

VisualSync estimates a constant temporal offset for each video from jointly visible motion. First, VGGT reconstructs camera geometry, segmentation identifies moving regions, CoTracker3 builds point trajectories, and MASt3R establishes cross-view correspondences. A search over temporal offsets then minimizes epipolar-geometry violations for camera pairs. Rejecting unreliable pairs and applying robust global optimization reconciles the individual offsets (§3.2, Fig. 3).

![VisualSync: estimating geometry, correspondences, and temporal offsets](/media/assets/expansion-crosscut/visualsync-fig3.png)

*Original Fig. 3, PDF p. 4. Correspondence and pairwise-offset estimation precede global synchronization. The authors' labels are preserved.*

Table 1 reports **46.6 ms median and 122.1 ms mean** for EgoHumans. These figures cannot be combined into a promise of “always under 50 ms”: the 3D-POP median is 77.8 ms, and individual baselines win on individual metrics. Evaluation uses roughly ten-second jointly observed episodes with artificially imposed offsets. Processing time is also substantial: for the authors' CMU example with 15 videos of 200 frames each, the full pass takes about 3.3 hours on an A6000 (§4.3, PDF pp. 7–10).

For Aligned, the separate synchronization test itself is useful: deliberately offset camera clocks and measure not only the error in milliseconds but also the resulting false event merges. VisualSync does not solve clock drift over a shift, matching similar jobs across days, or object identity. It requires shared moving points and sufficiently reliable geometry. Quadratic processing of all pairs cannot be silently extrapolated to a hundred camera wearers.

#### EgoMAS: shared memory for multiple workers

**Kim et al., 2026, preprint.** EgoMAS is a shared-memory baseline for MA-EgoQA, described above. [Paper, §§4–6 and Fig. 5](https://arxiv.org/abs/2603.09827v2).

Each participant has an individual memory containing descriptions of observations. Every ten minutes, a central manager merges the descriptions into shared event memory. Each record contains **When, What, Where, Who, How**. Given a question, BM25 first retrieves shared events, after which the manager decides whose individual memory to consult and how to reformulate the query. The answer is assembled from the shared record and more detailed individual results. This does not require training a new model.

![EgoMAS: shared event memory and agent-wise retrieval](/media/assets/egomas-architecture.png)

*Figure — EgoMAS architecture. Excerpt from Fig. 5, PDF p. 9, Kim et al. On the left, the manager combines ten-minute captions from different wearers into 4W1H events. On the right, shared retrieval generates separate queries to participants' memories, and the answer then draws on both levels. The original English labels are preserved. [Source](https://arxiv.org/abs/2603.09827v2).*

The two-stage retrieval logic matters here. For “Who finished cleaning?”, shared memory helps identify the episode and participants, while individual records clarify who swept the floor and who cleaned the table. In Aligned, a similar shared record could point to a joint panel installation while preserving distinct evidence for individual operations. This is our application of the principle, not a result of a construction experiment by the authors.

In Table 2, EgoMAS with Gemini 2.5 Flash achieves **41.41%**, compared with **36.93%** when concatenated captions are fed to the same model, a difference of **4.48 percentage points**. An oracle supplied with the correct evidence reaches 83.80%, while random choice scores 20%. This supports the value of organizing retrieval, but also shows a large remaining gap. The reported 1.3 seconds refers to a separate measurement on 100 questions using a smaller model and prebuilt memory. It cannot be used as “camera → completed answer” latency.

**For Aligned:** shared memory should be an index into observations, not the sole repository of truth. If the central summary incorrectly merges two installations, the source records are needed for correction. Neither the domestic benchmark nor the prepared captions test automatic clock synchronization, changing camera identifiers, ASR errors on a noisy site, or reliable object linking across 100 wearers.

The [official GitHub](https://github.com/KangsanKim07/MA-EgoQA) includes shared-memory construction, a BM25 index, and inference. Inspection of `construct_shared_memory.py` confirms that it works with precomputed ten-minute captions and uses Gemini to merge them. The code should not be treated as a ready-made ingestion system for hard-hat cameras.

#### M3-Agent — a key work linking voices, faces, events, and knowledge

**Long et al., first release 2025, ICLR 2026.** M3-Agent makes memory multimodal in identity as well as input. A person may appear face-on in one clip and speak off camera in another. Independent captions do not guarantee that these observations will be linked. [Paper](https://arxiv.org/abs/2508.09736v4), §§4–5, Tables 5–6.

![M3-Agent: writing and retrieving multimodal memory](/media/assets/pdf-audit-m3-agent-fig1.png)

*Original Fig. 1, PDF p. 2, arXiv:2508.09736v4. On the left, video and audio become episodic and semantic records. In the center, a graph links faces, voices, and knowledge. On the right, the controller repeats retrieval until it can answer. The diagram separates memory writing from memory use. [PDF](https://arxiv.org/pdf/2508.09736v4).*

The writer processes 30-second audiovisual clips. Tools extract faces and speakers, assigning them `face_id` and `voice_id`. The model records episodic events and semantic information, such as a person's attributes or inferred relationships. The graph stores text, face images, audio segments, embeddings, time, and equivalence links. Repeated confirmation of a face–voice correspondence increases its weight. Conflicts are resolved by voting over accumulated links.

The reader operates separately: it formulates a search, retrieves memory, refines the query, and decides whether the information is sufficient. The writer is based on Qwen2.5-Omni-7B and trained on synthetic demonstrations. The Qwen3-32B controller is optimized with DAPO using a correctness score for the final answer. This trains a retrieval strategy, not a robot's physical actions.

M3-Agent achieves **30.7% on M3-Bench-robot**, **48.9% on M3-Bench-web**, and **61.8% on VideoMME-Long**. Removing semantic memory while holding the controller fixed reduces these scores to **13.6%, 29.7%, 48.7%**. A separate ablation without identity equivalence gives **19.5%, 39.7%, 52.1%**. Both extracted knowledge and identity linking are therefore useful in this protocol. This does not imply that every automatically recorded semantic fact is reliable.

For Aligned, this boundary is precisely what matters. “Pedro often works with panels” is a generalization, whereas “panel installation is visible at 14:32” is an observation. The former does not prove the latter. An incorrect long-term face–voice association can recur in many future answers. M3-Agent provides neither a demonstrated bound on memory growth nor full end-to-end latency for a construction site. The name M3-Bench-robot also calls for caution: the recordings were made by humans simulating a robot's perspective.

The [official GitHub](https://github.com/bytedance-seed/m3-agent) includes face processing, memory, retrieval, and the controller. Static inspection of `mmagent/retrieve.py` shows that it converts face/voice references into shared character mappings. This confirms that the mechanism is implemented, but no model runs or reproduction of the published metrics were performed here.

<a id="paper-2022-elfeki-multi-ego"></a>

#### Multi-Ego / Multi-DPP: early selection of events and viewpoints

**Elfeki et al., WACV 2022.** Multi-Ego contains 12 hours of recordings from three wearers, from which 41 short sequences are extracted. Multi-DPP combines camera features, a bidirectional LSTM, and a determinantal point process to select diverse important events together with suitable views. The result is a shared video summary with a budget of 15% of one camera's duration. With three views, summary F1 is 25.03 versus 23.37 for the best reported comparison. This measures agreement with subjective highlights, not preservation of every defect. For Aligned, joint event and viewpoint selection is transferable, but offline encoding and the small dataset do not test causal memory over a shift. E²-Select below solves a different problem: selecting frames for a specific question. [PDF, §§3–5, Table 1](https://openaccess.thecvf.com/content/WACV2022/papers/Elfeki_Multi-Stream_Dynamic_Video_Summarization_WACV_2022_paper.pdf#page=7).

#### E²-Select: selecting a complementary viewpoint

E²-Select first estimates CLIP relevance to the question within each stream. It then divides a total budget of 32 frames between the views. Within each stream, k-DPP specifies a relevance-and-diversity criterion. The published `kdpp_select` uses greedy approximate MAP selection rather than exact probabilistic sampling. Intuitively, ten nearly identical hand frames are less useful than several hand frames and one showing the tool being passed. Selected frames are sorted by time and fed to a frozen VLM.

With InternVL3.5, accuracy increases from **50.7%** under uniform dual-view input to **56.3%** with E²-Select. With Gemini 2.5 Flash, the corresponding values are **55.3% → 58.2%**. One cannot mix the first model's starting point with the second model's endpoint and attribute the difference to the selector. The original videos average about 111 seconds for LEMMA and 425 seconds for Ego-Exo4D. The experiment does not test week-long memory.

The [GitHub](https://github.com/RuipingL/EgoExoMem) already includes `code/rag_baselines/eval_egoexomem.py`, with budget allocation and `kdpp_select`. In the inspected implementation, kernel columns are computed as selection proceeds, without materializing the full N×N matrix. Thus, “the published code necessarily has quadratic memory usage” would be incorrect. This is a code-level clarification, not a measured performance result. Scaling to dozens of cameras and full shifts remains untested.

**For Aligned:** a second view should be requested when needed, for example when a hand obscures the fastening point. But the selector does not replace synchronization, instance matching, or checking that both cameras are looking at the same panel.

#### GEB — the key idea: a physical instance's biography

**Ren et al., 2026, preprint.** A conventional timeline answers “What happened at 14:00?” An object biography answers “What happened to this particular drill over the week?” Two records saying “red drill on the table” may describe different drills. GEB therefore links visually grounded encounters with the same instance while preserving each encounter's context. [Paper](https://arxiv.org/abs/2609.38155v1), §§3–4, Table 4, Appendix B.

![GEB: an instance biography links observations across days](/media/assets/pdf-audit-geb-fig2.png)

*Original Fig. 2, PDF p. 3, arXiv:2609.38155v1. On the left, an observation preserves a visually grounded action involving a particular mixer. In the center, its appearances are linked across days. On the right, the controller reads the biography and refines retrieval. The lower strip preserves the episode's context. [PDF](https://arxiv.org/pdf/2609.38155v1).*

Within a 30-second clip, a detector and tracker combine detections into an observation. The record receives crops, a description, timestamps, and a source link. Similarity then proposes candidates among already known objects. A strong match with at least one recent observation is required, with no contradiction to the others. If two objects are simultaneously visible as separate objects, merging is vetoed. The graph then connects entities, observations, episodes, and source clips.

During retrieval, relevance propagates through the graph, including through Personalized PageRank. After finding the relevant appearance of a drill, the system can navigate to earlier encounters and surrounding events. The controller also sees information about observations it has not yet examined, allowing it to direct the next query.

On 500 EgoLifeQA questions, full GEB reaches **72.0%**. With the same reader and controller, disabling association gives **68.6%**, identification by name alone gives **69.2%**, and adding descriptions to captions without biographies gives **68.2%**. This is more informative than comparing two systems with different backbones: the effect is not reducible to extra text. But answer accuracy is not identity-matching accuracy, and separate identity precision/recall have not been established here.

Cost is crucial. Roughly 52 hours from one wearer require **308 244 observation-description generation calls**, while detection runs at 10 fps. The reported 13.6 seconds of retrieval per question excludes ingestion, the controller, and answer generation. It is a rerun of retrieval for 50 Ego-R1-Bench questions on one A100, averaging 2.42 searches per question, not a measurement of whole-system latency (Appendix B, PDF p. 14). In addition, descriptions use ±40 seconds of context, and people's names are reconciled across days. Filtering records by query time does not remove future information already incorporated into a description. This is offline memory construction.

**For Aligned:** the structure and conservative approach to merging are worth adopting, but the cost must be estimated before choosing this ingestion method. Incorrectly merging two identical panels is more dangerous than missing a link: it creates a false history of repair. The system must be able to retain “possibly the same object” as a hypothesis without converting it into a fact. At the inspected revision, the [GEB GitHub](https://github.com/rhfeiyang/GEB) contains a README and illustrations, while code and artifacts are marked as coming soon. A reproducible implementation has not been confirmed.

<a id="paper-2025-anwar-remembr"></a>

#### ReMEmbR, Anwar et al., ICRA 2025: a description with time and camera position

**ReMEmbR** stores captions of three-second windows together with time and robot position, after which an LLM repeatedly invokes text, coordinate, or time search. This is a simple spatial-memory baseline for Aligned when camera position is available externally. It stores the observer's position, not the object's precise pose. On long NaVQA examples, descriptive accuracy is 0.65 versus 0.55 for GPT-4o given all captions, but mean positional error remains **46.25 m**. The spatial-correctness criterion allows 15 m. The work demonstrates a physical 25-minute office tour followed by navigation, without a controlled success-rate evaluation. Text memory cannot recover a detail omitted by the captioner. [PDF, §§IV–VIII, Table I](https://arxiv.org/pdf/2409.13682v1#page=5).

#### OSNOM — an object still exists after the wearer turns away

**Plizzari et al., first release 2024, 3DV 2025.** OSNOM studies object permanence. A visual tracker usually ends a track when an object leaves the frame. This is insufficient for memory: the person still wants to know where the tool is. [Paper](https://arxiv.org/abs/2404.05072v2), §§3–4.

The **Lift, Match and Keep** baseline reconstructs scene geometry and camera positions, aligns monocular depth with a mesh, and lifts object-mask centers from the image into 3D. DINOv2 describes appearance. Hungarian matching combines geometric and appearance proximity. When an object is not observed, its last position is retained.

![OSNOM: lifting observations from the image into world coordinates](/media/assets/pdf-audit-osnom-fig2.png)

*Original Fig. 2, PDF p. 4, arXiv:2404.05072v2. Object-mask centers are taken on the left, mesh-aligned depth is shown in the center, and projection into 3D using camera pose is shown on the right. The figure depicts the Lift stage, while the subsequent Match and Keep stages are described in the text. [PDF](https://arxiv.org/pdf/2404.05072v2).*

On 100 EPIC-KITCHENS evaluation videos, the authors report **64% correct localizations at a one-minute temporal offset** and **37% at ten minutes** (PDF p. 2, Fig. 4 on p. 6). PCL requires the correct identity and a position within 30 cm. Evaluation proceeds backward and forward relative to anchor frames (§4.1), so this is not guaranteed accuracy after an object has remained continuously out of view for ten minutes. The main experiments use interpolated human masks. The numbers therefore do not reflect the full error cascade of an automatic detector. Mesh reconstruction takes about five GPU-hours per video. The fast CPU association, reported at 1 000 fps, excludes this stage, feature extraction, and depth lifting.

The main limitation with multiple workers is clear: while Pedro was looking away, someone else may have moved the tool. “Last observed here” does not mean “currently located here.” There is also a noncausal detail: first observations are projected backward to the start of the recording, and geometry is prepared in advance. Despite sequential matching, the full system is not a demonstrated causal streaming pipeline. The [official GitHub](https://github.com/Chiaraplizz/OSNOM) provides reconstruction, tracking, and evaluation.

#### LEDGER — a key work on remembering coordinates and observed movements

**Chaudhari et al., 2026, preprint.** LEDGER combines instance records, geometry, location history, and descriptions. Unlike memory restricted to hand interactions, it also tries to remember objects the person never touched. [Paper](https://arxiv.org/abs/2610.10538v1), §3, Fig. 2, Table 4, Appendix C.

![LEDGER: video processing, persistent object memory, query-time reasoning](/media/assets/ledger-architecture.png)

*Figure — LEDGER architecture. Excerpt from Fig. 2, PDF p. 5. Panel (a) shows detection and lifting observations into 3D, (b) shows instance records with location histories, and (c) shows an answer based only on the text of these records. The last observed position comes with a timestamp, not a guarantee of the current location. [Source](https://arxiv.org/abs/2610.10538v1).*

First, a model proposes object categories, a detector finds instances, and a geometry module lifts observations into 3D. Camera positions are provided or estimated. Observations are linked by labels and distances, while an additional mask-tracking pass reduces fragmentation. Several consistent observations of a new location create a new **rest segment**. This suppresses spurious movements caused by noisy geometry, but may miss a brief relocation.

The question addresses a textual representation of the records: which objects were seen, when, where, and in what context. The baseline reader does not revisit frames. The system gains reusable memory built independently of the future question. However, coordinates have metric meaning only when poses have the appropriate scale. Separate, disconnected scenes do not automatically become one map.

On the adapted Ego4D VQ3D setup, the configuration with **SAM 3 detector + trajectory memory + EgoLoc poses, without SAM 3 consolidation** has a median error of **0.99 m** and a mean error of **1.41 m**, among **153 returned predictions from 164 queries** (Table 4, PDF p. 10). The query is an object name, whereas official VQ3D uses an image crop. The authors explicitly warn that the success criterion also differs. One therefore cannot write “LEDGER solves VQ3D with 99% accuracy” or compare such a figure directly with the leaderboard. For Aligned, even a median error of about a meter does not establish suitability for checking a construction assembly's dimensions and tolerances.

Memory is built offline. Removing records after query time does not make construction causal. Scene changes degrade both construction and retrieval, while expensive tracking limits the long-video evaluation performed. The [LEDGER GitHub](https://github.com/LEDGER-3D/LEDGER) includes the pipeline, reader, and memory examples. Its README specifies that the published construction path uses FastVGGT without supplied poses, whereas the HD-EPIC/VQ3D examples were built with dataset-specific poses. The existence of a demo therefore does not imply that every table is fully reproducible with a single script.

<a id="paper-2026-wang-directme"></a>

#### DirectMe, Wang et al., ICML 2026: where is the object relative to me now?

“The tool was on the right” becomes outdated as soon as the worker turns, even if the tool itself has not moved. **DirectMe** addresses precisely this gap between remembering a world position and answering relative to a person's current position. For Aligned, it could complement tool or assembly search after moving to another part of a room. Rather than simply retaining the last coordinate, the system transforms spatial relations into the camera wearer's current reference frame. This is a separate formulation alongside OSNOM and LEDGER, not an established improvement over them on a shared test. [PDF, §§3–4](https://arxiv.org/pdf/2606.15200v1#page=6).

Without task-specific training, DirectMe processes recordings at 1 fps. Depth Anything 3 estimates depth and camera pose, Grounding DINO finds objects, SAM2 maintains masks, and scene descriptions add semantic information. Observations are linked in a metric-semantic map with timestamps and instance IDs. The graph stores objects, places, spatial relations, last-observation times, and anchor frames. Preparing this memory is a separate perception cost, not a free part of answering.

![Original DirectMe / UCS-Bench diagram](/media/assets/new-work-selection-2026-11-02/2026-wang-directme.png)

*Original Figure 5, PDF p. 6. DirectMe: a geometric map, graph, and user-relative spatial answer. The online label in the figure does not resolve the contradiction between §4.1 and offline construction in Appendix D.3. [Source](https://arxiv.org/pdf/2606.15200v1#page=6).*

Given a question, the system identifies the relevant entities and spatial operations, retrieves a small subgraph, and transforms world coordinates into the current egocentric frame. The MLLM receives these relations together with visual and textual context. An object can remain queryable after leaving the frame. But the stored link depends on tracking and geometry: an incorrect instance ID or pose drift becomes an erroneous spatial claim.

On UCS-Bench, Qwen3-VL-8B with DirectMe achieves **50.5% versus 44.0%** for the baseline. In a separate ablation, adding only the graph gives **50.2%**, and only captions gives **44.5%**. However, the backbone baseline receives 64 frames, while DirectMe processes video at 1 fps, so the full comparison does not isolate the graph's benefit under an equal input budget. Among 500 analyzed errors, tracking accounts for **40%**, ego-pose relations for **23%**, retrieval for **20%**, and reasoning over correct evidence for **17%**. This is a distribution of causes among errors, not whole-system failure rates. [PDF, Tables 3–5](https://arxiv.org/pdf/2606.15200v1#page=8).

The streaming status requires caution. §4.1 describes causal updates within a fixed window, but Appendix D.3 explicitly builds the graph offline and merges position and place information across a trajectory. Time-filtering retrieval alone is insufficient to establish that the constructed memory contains no future information. The work is therefore useful as a spatial benchmark and an architectural candidate, but not as proof of a ready-made causal assistant. Full latency, memory growth, and accuracy in checking construction outcomes are not established here. [PDF, §4.1 and Appendix D.3](https://arxiv.org/pdf/2606.15200v1#page=19).

#### Combining observations into work instances remains a separate task

Even perfect synchronization does not tell us whether two observations refer to one installation or two neighboring identical elements. Separate identifiers are needed for the camera, person, physical object, work instance, and issue. This follows from the Aligned problem formulation and is not a demonstrated result of VisualSync.

**Surrogate Case Identifier Rules for Construction Site Hoists**, Steenbergen, Bemthuis, and Bukhsh, Procedia Computer Science 2026 / ISM 2025. The full PDF was checked. The authors use a month of construction-hoist telemetry: roughly three million events from 180 sensors. Button presses, door openings, and motion do not come with a trip identifier. Different rules group them by active interval, passenger path, day, movement, and waiting. Overlapping trips allow an event to belong to multiple cases (§§3–4). [Note](/notes/2026-steenbergen-hoist-case-identifiers/), [PDF](https://research.utwente.nl/en/publications/surrogate-case-identifier-rules-for-construction-site-hoists/).

![Hoists: comparing rules for forming process instances](/media/assets/expansion-crosscut/hoist-case-identifiers-fig1.png)

*Original Fig. 1, PDF p. 4 / proceedings p. 1153. This is a diagram of sensitivity analysis for event logs and process models with respect to identifiers, not a neural architecture or a person-identification algorithm.*

An event log, KPIs, and a BPMN model are built for each rule. ActiveTime yields utilization of **56.50%**, versus **57.19%** for the measure derived from the raw sensor signal, a difference of **0.69 percentage points**. But the same signal enters both calculations: this is not independent validation that the reconstructed trips are correct. Structural agreement between the ActiveTime and Person models is only 48% (Tables 2, 4). Similar utilization does not establish which events belonged to the same execution.

The source's own quality calls for caution. The text mentions six rules, but the tables contain **seven named variants**. In Table 2, the difference between 66.55% and 57.19% is printed as 11.36, although arithmetically it is 9.36 percentage points. Table 3 also contains inconsistent differences. The authors explicitly state that the reference is not definitive ground truth, do not test event correspondence against annotated trips, and do not evaluate deployment (§§3.6, 4.2, 6). The work is therefore useful as an argument for a separate case-assignment test. For Aligned, false merges and splits of work instances should be annotated, ambiguity should be preserved, and agreement of aggregated KPIs should not be treated as proof of a correct object history.

### Comparing approaches

EgoMAS shared event memory links participants' descriptions. M3-Agent links faces and voices. GEB constructs a physical instance's history, while OSNOM and LEDGER add object location. These are different results: a shared installation record does not yet establish which particular panel was in the frame, and the last coordinate does not prove its current position.

VisualSync solves the preceding task of time alignment, while E²-Select selects useful views after alignment. Case assignment exposes another level: even correctly linked object observations must be assigned to the same work execution. These methods therefore complement one another only when each link is explicitly validated. The complete Aligned data schema is assembled in [Chapter 11](/chapters/synthesis/#chapter-11).
