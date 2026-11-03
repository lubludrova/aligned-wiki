<a id="chapter-2"></a>



Questions about the same archive require different outputs. “Show the installation of this panel” asks for an episode. “Find all instances of rework on it” requires a complete set of events. “Why was it reworked?” requires an answer based on several pieces of evidence. “What fraction of the time was spent on rework?” requires a defined counting procedure. The chapter is therefore organized around these tasks. Text memory, visual embeddings, graphs, and agent tools are ways to solve them, rather than separate user tasks.

For Aligned, the common input consists of camera recordings, audio, and metadata spanning several shifts. Throughout this chapter, it is important to distinguish what the model has already been given: the relevant clip, one long recording, or the entire corpus. Verification that the final answer is supported by the right evidence is addressed in [Chapter 4](/chapters/evidence/#chapter-4).

### Benchmarks and evaluation protocols: a map of the tasks

| Task | Benchmarks and data | What is evaluated and what is provided in advance | Limitation and reuse |
|---|---|---|---|
| Find a recording and a moment | **TVR**, **ActivityNet Captions**, **DiDeMo** | Corpus retrieval and temporal localization in the authors’ settings | EventFormer reuses TVR, ActivityNet Captions, and DiDeMo (§4.1, Tables 2–4). Localization results must not be conflated with clip retrieval from Chapter 1. [TVR PDF](https://arxiv.org/pdf/2001.09099), [EventFormer PDF](https://arxiv.org/pdf/2402.13566v1) |
| Find evidence for an answer | **V-RAGBench** | `query → evidence chunk → answer` within a given long video | Episode uniqueness is enforced by filtering out repetitions. Independent reuse is not established here. [PDF, §4](https://arxiv.org/pdf/2606.13141v2) |
| Answer through corpus retrieval | **WikiHowQA / HowTo100M**, **LongerVideos** | Instructional answers based on retrieved videos or synthesis across a collection | ROUGE-L and judge preference do not measure event coverage. HowTo100M is the retrieval corpus in the reported experiment. [Jeong PDF](https://aclanthology.org/2025.findings-acl.1096.pdf), [Ren PDF](https://arxiv.org/pdf/2502.01549v1) |
| Find several moments | **QV-M² / QVHighlights** | Several annotated intervals in one video, multi-moment metrics | QV-M² extends QVHighlights annotations. Baselines in the original paper do not constitute independent reuse of the new test. Coverage across several cameras is not evaluated. [FlashMMR PDF](https://proceedings.nips.cc/paper_files/paper/2025/file/faaa187af979e46dc54f4d43f8b815b2-Paper-Conference.pdf) |
| Find a past episode and connect events | **EgoLifeQA**, **Ego-R1 Bench** | Multi-day EgoLife recordings, but different question sets and available tools | EgoLifeQA is reused by EGAgent, WorldMM, MERIT, and EM²Mem. This is one source environment, rather than independent domains. The main Jake subset contains 500 questions. Sources and differences are given below |
| Memory across sessions and reasoning over a long history | **APM-Bench**, **EgoMonth**, **EgoMemReason** | Cross-session memory, episodes/habits, and reasoning over temporally separated evidence | APM simulates a causal stream, EgoMonth’s calendar span does not equal continuous recording, and EgoMemReason uses EgoLife. Independent reuse of these new tests is not established here |
| Understand a given video | **EgoSchema**, **NExT-QA**, **LongVideoBench**, **Video-MME**, **LVBench** | QA over a recording that has already been selected. A short clip and a long video impose different workloads | EgoSchema is used in LLoVi and both VideoAgent papers, while Video-MME is used in several methods below. This is not yet archive retrieval. [LongVideoBench](https://longvideobench.github.io/index.html), [Video-MME PDF](https://openaccess.thecvf.com/content/CVPR2025/papers/Fu_Video-MME_The_First-Ever_Comprehensive_Evaluation_Benchmark_of_Multi-modal_LLMs_in_CVPR_2025_paper.pdf) |
| Reconstruct object interactions | **AMB** on **EPIC-KITCHENS** | Temporal order and overlap of interactions, visual multiple-choice queries | Some difficult identity cases are filtered out. Independent reuse of AMB is not established here. [AMEGO PDF](https://arxiv.org/pdf/2409.10917) |
| Evaluate the cost of reusable memory | **CapMem evaluation set** | 75 videos, several questions per recording, frame coverage controls | This is the paper’s protocol. The visual override policy was selected based on errors on the same test. [CapMem PDF](https://aclanthology.org/2026.emnlp-industry.233.pdf) |
| Execute a compound query | **CLEVRER, CityFlow-NL, Charades** in VOCAL-UDF | Query execution over objects and predicates in different domains | The presence of several datasets does not establish validation of construction codes. [VOCAL-UDF PDF](https://arxiv.org/pdf/2408.02243v2) |
| Evaluate retrieval and aggregate costs | **Focus, BlazeIt, TASTI, and Reducto protocols** | Quality relative to a chosen labeler, ingest/query cost, sampling, or filtering | The teacher detector’s output often serves as the reference. This is not human ground truth for defects. Sources are discussed in §2.4 |
| Find material and compile a report | **MultiVENT-Raw** | Corpus retrieval and a separate evaluation of supported claims | The detailed protocol and citation F1 are in [Chapter 4](/chapters/evidence/#chapter-4). Not a benchmark of construction hardhat cameras |
| Understand a given long video through agentic search | **LongVideoBench, EgoSchema, Video-MME, MLVU** in HPP | QA and, for MLVU SSC, description of a localized scene. The code/tool calling comparison uses a separate set of 150 LVB-3600 questions | Independent reuse of general QA tests, but not a benchmark of event retrieval completeness. Subtitle access and the number of iterations are fixed only in the specified comparison. [HPP, §§4–5, Tables 2–4](https://aclanthology.org/2026.emnlp-main.2377.pdf#page=7) |
| Evaluate the temporal meaning of memory retrieval | **EgoLifeQA, EgoMem, EgoR1-Bench** in EgoCITE | QA, retrieval hit rate, and sequential addition of components | All three tests use EgoLife. The main experiment receives human captions/transcripts, and the automatic variant retains a manual person-ID prior. This is data reuse, rather than transfer to a new environment. [PDF, Table 2, Appendix C.1](https://arxiv.org/pdf/2608.12627v3#page=8) |
| Select visual details within a given video | **EgoMemoria** | 7 026 questions over 629 videos, mean debiased accuracy after filtering questions answerable from text alone | Filters and duration groups affect averaging. Data and reference frames come from narrations, and independent reuse is not established. [MM-Ego, §§3.1–3.3, Table 3](https://arxiv.org/pdf/2410.07177v2#page=8) |
| Prepare intervals and descriptions for an index | **What’s Going On / WGO, DenseCaptionBench** | WGO: 100 human and robot episodes, segmentation F1, caption score with correct boundaries, and joint F1. DenseCaptionBench diagnoses captions separately | WGO provides an episode instruction, and the comparison does not equalize all computation. WGO is reused from earlier work. Independent reuse of the new DenseCaptionBench is not established here. [FLORA, §2.1](https://arxiv.org/pdf/2610.31779v1) |
| Separate recording an action from evaluating its outcome | **DenseRewardBench, RubricBench** in FLORA | Dense execution-quality labels and criterion-based episode evaluation. DenseRewardBench contains 40 held-out robotics episodes | Additional writer/rewarder diagnostics, rather than archive retrieval or a live detector. Future context is allowed. Independent reuse is not established here. [PDF, §2.2–2.3, §4.2](https://arxiv.org/pdf/2610.31779v1) |

A new name does not make a test stronger. Reuse is supported by specific papers and does not imply data independence. For new datasets, the absence of confirmation in this review does not mean that nobody has used them. The general HD-EPIC and Ego4D protocols are discussed in Chapters [5](/chapters/states/#chapter-5) and [3](/chapters/observations/#chapter-3).

<a id="task-2-1"></a>

### 2.1. Find the relevant recording and time interval

The required outputs are the recording address and the event boundaries. Retrieval within one selected video is easier than corpus retrieval: the correct camera and shift are already known. For Aligned, this distinction determines whether the relevant installation will be found among operations that look identical.

#### First, distinguish tasks often grouped under the term Video QA

The question “What did Pedro do yesterday afternoon?” does not begin with answer generation. The system first needs to select his camera, correctly interpret the date and time zone, find events within the relevant interval, and then check whether they are sufficient to answer. “Who fixed yesterday’s defect?” is harder: it requires linking the object, its previous state, its new state, and several observations. These examples are our interpretation of Aligned’s requirements, rather than tasks already solved by the papers discussed below.

It is useful to distinguish four levels:

1. **Clip understanding.** The model receives a short segment that has already been selected and describes it. There is no retrieval yet.
2. **Within-video retrieval / temporal grounding.** The system must return an interval matching a query from one known video. The correct recording has already been selected for it.
3. **Corpus retrieval.** The system must first find the relevant recordings among many cameras, shifts, and days. Similar events in the wrong place or at the wrong time are particularly dangerous here.
4. **Evidence-grounded reasoning.** The system must combine several retrieved intervals, explain its conclusion, and indicate what supports each part of the answer.

A single QA accuracy percentage does not evaluate all four levels. A model can guess the correct answer option from the general meaning of the question. Or it can find the correct scene but misread the action. The development of this literature is therefore best understood as a gradual separation of memory, retrieval, verification, and generation.

#### TVR and V-RAGBench: two different retrieval scales

**TVR** contains 109 thousand queries over 21.8 thousand television clips. Queries may require visual evidence, textual evidence, or both. This is a useful “find the recording, then the interval” setting and a way to examine the value of subtitles. Television dialogue does not test ASR robustness to construction noise. The paper builds on the earlier corpus moment retrieval formulation and did not invent it. [TVR / XML, PDF v2, §§3–5, pp. 5–11](https://arxiv.org/pdf/2001.09099#page=5).

**Rethinking RAG in Long Videos: What to Retrieve and How to Use It?, Lee et al., arXiv preprint 2026**, version v2 dated October 2, is an important addition to the wiki. The authors construct V-RAGBench as a set of `query → evidence chunk → answer` triples. For each question, the target answer must rely on one unique episode. Questions answerable without video are filtered out, as are cases where another episode supplies the answer. The final set contains **2,100 questions, 1,800 train and 300 test**. Retrieval takes place within the source long video. [PDF, §4](https://arxiv.org/pdf/2606.13141v2).

For Aligned, an experimental design that evaluates retrieval and answering separately is useful. However, evidence uniqueness is deliberately enforced here by removing repeated events. On a real construction site, repetitions are a central difficulty. V-RAGBench is therefore useful for diagnosing retrieval and reading, while an in-house benchmark should additionally test selection of the correct instance among similar installations. In the checked PDF version, the authors promise to release the benchmark, code, and evaluation scripts after acceptance (PDF p. 10). This statement does not establish that code has been published. We have not reproduced this result.

#### WikiHowQA and LongerVideos: answers over a collection

**WikiHowQA** is used by Jeong’s VideoRAG for instructional questions with video retrieval from HowTo100M. ROUGE-L compares the answer with reference text, rather than measuring object or temporal accuracy. In the reported comparison, BM25 searches Wikipedia, so both the knowledge source and the modality change. This cannot be treated as a clean ablation of video versus text on one corpus. [PDF, §3.1 and Table 1](https://aclanthology.org/2025.findings-acl.1096.pdf).

**LongerVideos**, introduced with Ren’s VideoRAG, contains **164 videos, 22 collections, 602 questions, and approximately 134.6 hours** in version v1 dated February 3, 2025, Table 1. These are lectures, documentaries, and entertainment recordings. In Table 2, with answers compared by GPT-4o-mini as judge, the win rate against NaiveRAG in the aggregate Overall Winner category is **53.26%**, and against LightRAG it is **57.14%**. This is pairwise answer preference under the authors’ evaluation protocol, rather than the proportion of factually correct answers or retrieval recall. [PDF v1, Tables 1–2](https://arxiv.org/pdf/2502.01549v1).

These tests evaluate the answer after retrieval. Their results complement retrieval metrics but do not replace evaluation of all retrieved events or support for individual claims.

#### XML: an early reference for corpus localization

**Lei et al., 2020.** XML encodes video and subtitles separately, constructs modality-dependent query representations, selects 100 recordings, and localizes the start and end within the candidates. For Aligned, the important element is the decomposition into recording retrieval and interval localization. EventFormer is discussed below as another way to build an index for the same corpus-level task, rather than an automatically established direct successor to XML. [Paper card](/notes/2020-lei-tvr/), [PDF v2, §§3–5](https://arxiv.org/pdf/2001.09099#page=5).

![XML: retrieving a recording and an interval](/media/assets/expansion-memory/tvr-xml-architecture.png)

*Original Figure 4, p. 8.*

#### EventFormer: an event index before precise localization

**[EventFormer](/notes/2026-hou-eventformer/)** replaces purely frame-level indexing with a more compact event index: it groups video, extracts event representations through attention, retrieves the top-10 recordings, and runs a precise localizer. In Table 8 of the checked preprint, the K-means variant stores 31 MB of precomputed representations and takes 43 ms to retrieve recordings, versus 161 MB and 88 ms for ReLoCLNet. This is the index size for a specific TVR setup and retrieval time, rather than the entire system’s memory or a complete answer. Localization is reported separately at 103 ms. [PDF v1, Figure 2, p. 4, Table 8, p. 9](https://arxiv.org/pdf/2402.13566v1#page=9).

For Aligned, this supports using events as index units, but does not guarantee that an event is represented correctly: merging adjacent frames can hide a brief defect. The method uses localization trained on annotated intervals, so it cannot be transferred to an open construction ontology without evaluation. An important source limitation is that the checked version is the 2024 arXiv preprint, while the published ECIR 2026 version adds Yanyan Lan as an author. The final publisher PDF was not obtained, and its tables were not separately verified. The authors’ repository was empty when checked. All numbers reported in this review refer specifically to the preprint.

![EventFormer event index](/media/assets/expansion-memory/eventformer-retriever.png)

*Original Figure 2 from the checked preprint, p. 4.*

#### CARVE: retrieving and selecting different forms of evidence

CARVE searches four representations in parallel: visual/frame, visual/clip, text/frame, and text/clip. Each candidate retains a label identifying how it was retrieved. A multimodal reranker selects the most useful representation for each episode. The generator receives these selected forms of evidence, rather than a single modality for the entire question.

In Table 2, over 300 test questions, **Recall@5 = 0.603**, versus **0.510** for the strongest baseline on this metric, and **nDCG@5 = 0.433**. With Qwen3-VL-8B, the pass rate is **0.352**. This is the fraction of open-ended answers judged correct by Qwen3.6-35B-A3B, averaged over three generation runs (§6, Table 2). It illustrates why retrieval and answer quality should be reported together: retrieved evidence still needs to be read correctly. In the ablation, all four representations achieve 0.603 Recall@5, while the best single representation, visual/clip, achieves 0.507, Table 3. [CARVE, PDF v2, §6, Tables 2–3](https://arxiv.org/pdf/2606.13141v2).

#### VideoRAG, Jeong et al., Findings of ACL 2025, arXiv:2501.05874

This paper addresses **retrieval over video corpus**: finding videos useful for answering an instructional question. Video and text representations are used for retrieval, while the generator receives the visual content of the retrieved recordings. VideoRAG-V supplies only frames, whereas VideoRAG-VT adds subtitles or ASR text. Informative frames are also selected. This is an important step from “here is a video, answer” to “find the video first.” [PDF](https://aclanthology.org/2025.findings-acl.1096.pdf), [code](https://github.com/starsuzi/VideoRAG).

In Table 1, on WikiHowQA with the HowTo100M video corpus and LLaVA-Video-7B, VideoRAG-V achieves **ROUGE-L 24.95**, while Text RAG with BM25 achieves **17.22**. However, the BM25 baseline retrieves documents from Wikipedia, so both the modality and the knowledge source change (§3.1). This is not a clean video-versus-text ablation on one corpus. ROUGE-L evaluates similarity to reference instructional text. It does not measure the correctness of a construction object reference, timestamp accuracy, or the quality of evidence for a defect. For Aligned, the paper supports using video itself in retrieval/generation, but its question “how do I perform this action?” differs from “what actually happened to this panel yesterday?”.

#### VideoRAG, Ren et al., arXiv:2502.01549, 2025 preprint

**A key paper for understanding multi-video RAG.** Ren and colleagues combine two channels: a textual knowledge graph spanning videos and visual retrieval over video segments. Transcripts and descriptions supply entities and relations, the graph helps find related information, and visual features preserve information that the text did not convey. After selecting candidates, the system refines the relevant context and generates an answer. [PDF, §3](https://arxiv.org/pdf/2502.01549v1), [code](https://github.com/HKUDS/VideoRAG).

![VideoRAG Ren: multi-video indexing and two retrieval channels](/media/assets/pdf-audit-videorag-ren-figure1.png)

*Original figure: Ren et al., arXiv:2502.01549v1, Figure 1, PDF p. 3. (a) Collection of source videos. (b) A VLM and ASR produce text, separate graphs are merged, and text and video features are indexed in parallel. (c) The query is routed to graph and visual retrieval, and retrieved clips are filtered and recaptioned for the answer. Graph links are semantic and do not by themselves establish the physical identity of objects.*

For Aligned, linking documents and several videos is useful, but a semantic relationship is not physical identity. Two recordings about a “concrete wall” can concern different walls. Separate constraints on site, zone, time, and object are needed. The current GitHub repository contains `VideoRAG-algorithm` and a separate `Vimo-desktop` application, and the README reports KDD 2026. The numbers given here refer to the preprint that was read, rather than an unchecked final conference version. A separate earlier static inspection of `_op.py` confirms a distinct visual retrieval path over segments. An application in the repository does not demonstrate deployment on a construction site.

<a id="task-2-2"></a>

### 2.2. Find all matching episodes

The query “when was this tool used?” can have several correct answers. Here, the evaluation unit is a set of intervals, rather than one successful hit. For Aligned’s archive, this additionally requires coverage across cameras and shifts, deduplication of the same event, and explicit boundaries of the material inspected.

#### QV-M²: a multi-moment protocol

The authors of QV-M² expand the annotations to 2 212 pairs with 6 384 intervals and use metrics with multiple ground truths. This makes it possible to evaluate missed repetitions within one video. Such a test does not yet establish completeness of the event register for an entire multi-camera archive. [PDF, §§3–5](https://proceedings.nips.cc/paper_files/paper/2025/file/faaa187af979e46dc54f4d43f8b815b2-Paper-Conference.pdf).

#### FlashMMR: several intervals for one query

**[QV-M² / FlashMMR](/notes/2025-cao-flashmmr/)** addresses a different gap. The question “when was this tool used?” can correspond to several non-overlapping intervals even within one video. Under the QV-M² protocol described above, FlashMMR combines SlowFast/CLIP features, query–video interaction, and a temporal pyramid. On QV-M², G-mAP is 35.14 versus 32.14 for FlashVTG, while for queries with three or more target intervals it is 22.89 versus 20.19. Even here, retrieving all repetitions remains difficult. [PDF, §§3–5, Table 3, p. 9](https://proceedings.nips.cc/paper_files/paper/2025/file/faaa187af979e46dc54f4d43f8b815b2-Paper-Conference.pdf#page=9).

A possible interpretation of the term post-verification needs correcting: Figure 3 and the training description associate this block with learning from temporal IoU and representation consistency. This is not evidence of a separate fact-checking step for every user query. The released inference code likewise contains no such independent verifier. Its value for Aligned lies in localization training and the protocol for evaluating a set of episodes. No metric based solely on top-1 similarity can replace checks for misses, duplicates, and total coverage of all events. [PDF, Figure 3, p. 6](https://proceedings.nips.cc/paper_files/paper/2025/file/faaa187af979e46dc54f4d43f8b815b2-Paper-Conference.pdf#page=6), [authors’ inference code](https://github.com/Zhuo-Cao/QV-M2/blob/main/FlashMMR/model.py).

![FlashMMR architecture](/media/assets/expansion-memory/flashmmr-architecture.png)

*Original Figure 3, p. 6. The post-verification block belongs to training.*

<a id="task-2-3"></a>

### 2.3. Answer a question over a long history

For the question “why did the work have to be redone?”, returning a similar clip is insufficient. The system must preserve source observations, retrieve related episodes, and combine them into an answer. Below, memory tests are discussed first, followed by reading and writing methods. Persistent memory is also useful for the tasks in §2.1–2.2, but the cost of lost context is particularly clear here.

#### Benchmarks for reading a selected video

**EgoSchema** evaluates multiple-choice understanding of approximately three-minute egocentric videos. **LongVideoBench** contains 6,678 questions and 17 categories of referred reasoning. **Video-MME** includes 900 videos, 2,700 questions, and about 254 hours, with short/medium/long variants and settings with or without subtitles. **LVBench** is used in the MERIT comparison as another long-video QA test. The relevant video has already been selected in these tasks, so QA accuracy cannot be interpreted as corpus retrieval recall.

**NExT-QA** is used in Fan’s VideoAgent, with different subsets for the main comparison and ablations. This must be taken into account before comparing numbers. Sources: [LongVideoBench](https://longvideobench.github.io/index.html), [Video-MME paper](https://openaccess.thecvf.com/content/CVPR2025/papers/Fu_Video-MME_The_First-Ever_Comprehensive_Evaluation_Benchmark_of_Multi-modal_LLMs_in_CVPR_2025_paper.pdf), [Video-MME code](https://github.com/MME-Benchmarks/Video-MME), [VideoAgent Fan, Tables 1 and 6](https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/03241.pdf), [MERIT, Tables 1–2](https://arxiv.org/pdf/2608.07663v2).

**LVBench and LongVideoBench are different benchmarks.** LVBench is reused by MERIT and WorldMM, as is Video-MME Long. LongVideoBench is also used by Luo’s Video-RAG, but its experiment omits the original test’s interleaved input format. Reuse therefore does not make all published numbers directly comparable. [MERIT, §4.1, Tables 1–2](https://arxiv.org/pdf/2608.07663v2), [WorldMM, §4.1, Table 1](https://arxiv.org/pdf/2512.02425v2), [Video-RAG Luo, §4.1, Table 3](https://arxiv.org/pdf/2411.13093v4).

#### EgoLifeQA: from a clip to a week of memory

**Key paper: EgoLife / EgoButler / EgoRAG, Yang et al., CVPR 2025.** Both the benchmark and the baseline matter here. Six participants live and interact in one house for a week. Approximately 300 hours were recorded, with 266 remaining after selection. EgoLifeQA contains 3,000 questions, but the main published EgoButler evaluation uses **500 questions for one participant, Jake**. It must not be presented as a test on all 3,000 questions. [PDF](https://arxiv.org/pdf/2503.03803v3), [project](https://egolife-ai.github.io/), [code](https://github.com/EvolvingLMMs-Lab/EgoLife).

For Aligned, this is the closest early demonstration that multi-day memory is a task in its own right. However, a house with six participants, predominantly Chinese speech, and deliberately organized activities is not equivalent to a construction site with 100 cameras. Synchronized recording of several people does not by itself mean that the baseline reliably combines evidence across all cameras.

Reuse of EgoLifeQA is confirmed by separate method studies: [MERIT, §4.1 and Table 1](https://arxiv.org/pdf/2608.07663v2), [WorldMM, §4.1 and Table 1](https://arxiv.org/pdf/2512.02425v2), [EM²Mem, §4.1 and Table 1](https://arxiv.org/pdf/2609.00551v1), [EGAgent, §4.1 and Table 1](https://arxiv.org/pdf/2601.18157v3). This is useful for comparing memory variants, but preprocessing, readers, and evidence budgets differ. Several papers on the same domestic week do not replace transfer evaluation in other environments.

#### Ego-R1 Bench: questions for agentic search

The version of Ego-R1 Bench described here contains 300 questions over the long EgoLife history. The system can successively query memory and visual evidence. Train and test use the same week, while a separate EgoLifeQA evaluation removes overlap with training without a clear remaining denominator. The controller training results below refer specifically to this protocol and the checked v1 preprint. [PDF, Table 3 and Appendix C](https://arxiv.org/pdf/2506.13654v1).

#### APM-Bench and EgoMonth: cross-session memory and long histories

**APM-Bench: evaluating a video assistant with cross-session memory**

**[APM-Bench](/notes/2026-huang-apm-bench/), Huang et al., 2026** is a benchmark for comparing ways of storing past experience. The authors do not propose their own video assistant architecture. The central question is: **what should be preserved after one session ends so that it can be used when the camera is switched on again?**

Experiments use **prerecorded videos with simulated streaming access**. The model sees only the recording up to the current moment, with no future frames. This evaluates assistant behavior as video arrives, rather than demonstrating a live service.

The workflow is: **first session → store memory → break → memory + available portion of the next session → answer or decide to remain silent**.

Three implementation options are compared:

- **Video as memory:** preserve past recordings and feed them to the model again at query time.
- **Text as memory:** create a summary at the end of each session, then supply past summaries with the current video at query time.
- **Specialized systems:** process sessions sequentially while retaining the method’s internal memory, such as a KV-cache, visual features, an event tree, or another state.

For evaluation, 104 sequences of related activities containing 549 sessions are assembled from EgoLife and HD-EPIC. The tests cover **recalling past sessions**, **understanding the current scene**, and **choosing when to help or remind**. Quality, response latency, and memory size are measured together. [PDF v2, §§3.1–3.3 and 4.1](https://arxiv.org/pdf/2609.37559v2#page=4).

The key result is that preserving detailed history helps recall the past but costs more. For example, Gemini 3.6 Flash achieves **69.37%** on cross-session questions with video memory versus **47.50%** with text summaries. Yet even access to the relevant past does not guarantee appropriate proactive assistance. For Aligned, the paper is useful as a protocol for testing memory across shifts and breaks. [PDF v2, Table 3 and §4.3](https://arxiv.org/pdf/2609.37559v2#page=8).

![APM-Bench protocol](/media/assets/expansion-memory/apm-bench-protocol.png)

*Original Figure 1, PDF v2, p. 2. This is a protocol diagram, rather than a new model architecture.*

**[EgoMonth](/notes/2026-chen-egomonth/)** complements APM at a different scale: 301 hours, 738 clips, 20 participants, and calendar periods of 20–120 days. Its 1 443 questions distinguish habits and stable information, retrieval of a specific episode, and reasoning over several pieces of evidence. Event counting, temporal order, and locating an object after several moves are particularly useful for Aligned. However, calendar coverage does not equal continuous recording of every day. [PDF v1, §§3–4](https://arxiv.org/pdf/2608.13113v1#page=3).

In Table 3, Gemini 2.5 Pro averages 71.8% across tasks, compared with a human reference of 94.2%. Averaging across all questions instead gives different values: 72.6% and 95.1%. On event counting, the scores are 52.0% versus 94.4%. This is four-choice QA, rather than the completeness of retrieved episodes. Different models also receive different frame budgets. The paper presents a useful set of difficult tasks but does not establish the architectural superiority of a particular memory type. [PDF v1, Table 3, p. 8](https://arxiv.org/pdf/2608.13113v1#page=8).

![Examples of EgoMonth questions](/media/assets/expansion-memory/egomonth-questions.png)

*Original Figure 2, p. 3: examples of questions over one video and several recordings.*

#### EgoMemReason — a week of video does not yet mean a week of reasoning

**Wang et al., COLM 2026.** This paper forces a distinction between the length of the available recording and the temporal span of the evidence actually needed. A question may concern seven days of video yet be answerable from one frame in the last twenty seconds. EgoMemReason deliberately requires combining object states, event order, and recurring habits across long periods. [Paper](https://arxiv.org/abs/2605.09874v2), §3, Table 1, Appendix C.3.

![EgoMemReason: three question types using evidence across several days](/media/assets/pdf-audit-egomemreason-fig1.png)

*Original Fig. 1, PDF p. 2, arXiv:2605.09874v2. The upper panels ask about an event and an object’s history, while the lower panel concerns a recurring habit. Colored links indicate which separated observations are needed for the answer. This is a diagram of benchmark tasks, rather than a new memory architecture. [PDF](https://arxiv.org/abs/2605.09874v2).*

Across 500 questions, the average requirement is **5.1 evidence segments** and **25.9 hours of backtracking**. Observations are restricted to the past relative to query time. Gemini-3-Flash achieves **39.6%** under the main protocol, which samples frames from the available past video (Table 1, PDF p. 8), and **67.2%** when given only oracle evidence clips (Appendix C.3, PDF p. 22). This compares evidence input conditions, rather than measuring the recall of a separate retriever. The conclusion has two parts: input evidence selection loses much of what is needed, but even perfect evidence delivery does not eliminate reasoning errors. Aligned should therefore evaluate “did we find all the necessary clips?” separately from “did we draw the right conclusion from what we found?”.

This is a benchmark, rather than a new memory. It uses the same EgoLife week, so several high scores on EgoLife-derived datasets do not constitute several independent confirmations of domain transfer. The [GitHub repository](https://github.com/Ziyang412/EgoMemReason) contains annotations and evaluation of different models. Version v1.1 shuffles answer options: old predictions stored only as letters require remapping.

#### AMB: the order of object interactions

**Active Memories Benchmark (AMB)** contains approximately 20.5 thousand questions over 100 EPIC-KITCHENS videos. These are visual multiple-choice queries about object interactions, rather than an open-ended conversation with a manager. AMEGO, the method introduced with the benchmark, is discussed below. Its AMEGO-L variant achieves **36.3%**, versus **23.6%** for the strongest reported baseline and 20% for random choice, Table 3. The positive result indicates the value of representing interactions. It does not establish high identification accuracy for visually identical tools: some difficult cases involving different instances of the same class were filtered out during benchmark preparation, Appendix §8.1, PDF p. 21. [AMEGO, PDF, Table 3 and Appendix §8.1](https://arxiv.org/pdf/2409.10917).

#### LLoVi: an early caption-first baseline

**LLoVi — A Simple LLM Framework for Long-Range Video Question-Answering, Zhang et al., EMNLP 2024.** A video model describes short segments, and an LLM answers from descriptions and intermediate summaries. In the original 2023 preprint, the authors report 50.3% on EgoSchema and an advantage of 18.1 percentage points over the stated previous best method. This is a historical result. Captions make the loss of a fact inspectable, but remain interpretations of an image: “holding a drill near a panel” cannot be turned into “secured the panel” without justification. VideoTree next considers selective elaboration, while CapMem addresses description reuse. This is a development of a family of ideas, rather than a claim of direct code or architectural lineage. [Paper](https://aclanthology.org/2024.emnlp-main.1209/), [preprint](https://arxiv.org/abs/2312.17235v1), [code](https://github.com/CeeZh/LLoVi).

#### VideoTree: describing regions of interest

**VideoTree, Wang et al., CVPR 2025**, develops the idea of selective description. Rather than reading the whole video in equal detail, the system clusters visual features, describes representatives, evaluates their relevance to the query, and deepens the tree in relevant regions. This is a query-adaptive hierarchy: the question influences where computation is spent. An important difference from persistent memory is that the tree is built for the current question. For Aligned, it makes sense to use this mechanism within an already retrieved shift or episode, rather than reinspecting the entire archive for each message. The authors demonstrate performance on long-video QA, but that does not establish the ability to maintain a continuously updated multi-camera log. [PDF, Figure 1 and §3](https://openaccess.thecvf.com/content/CVPR2025/papers/Wang_VideoTree_Adaptive_Tree-based_Video_Representation_for_LLM_Reasoning_on_Long_CVPR_2025_paper.pdf), [code](https://github.com/Ziyang412/VideoTree).

<a id="paper-2025-ye-mm-ego"></a>

#### MM-Ego, Ye et al., ICLR 2025: an overview first, detailed frames next

**MM-Ego** first represents up to 300 frames using one compressed token per frame. Qwen2-7B with a trainable memory pointer selects 32 frames, and a second pass reads their detailed features. For Aligned, this is a local reader option after retrieval. On EgoMemoria, mean debiased accuracy is **47.32 → 55.97 → 61.27** for the original model, the same model with egocentric training data, and MM-Ego. MM-Ego exceeds the baseline trained on the same mixture by 5.30 percentage points. During training, the detailed pass receives ground-truth frame indices, while inference uses predicted indices. The comparison with GPT-4o on 32 uniformly sampled frames does not equalize access to an overview of 300 frames. The cost of full reading and persistent memory are not evaluated. [PDF, §2.2, Tables 3–5](https://arxiv.org/pdf/2410.07177v2#page=8).

#### MovieChat: compressing visual context

Another line of work saves context **inside the visual model**, rather than through an external retrieval index. **MovieChat, Song et al., CVPR 2024**, compresses visual tokens into short-term and long-term memory. The authors demonstrate processing more than 10 thousand frames on a GPU with 24 GB of memory in a visual-only test at 224 × 224 resolution, without skipping frames (Figure 1). This is a result about the resources needed to process a sequence. It does not mean that every detail of every frame is preserved, and it does not provide ready-made retrieval over 36 thousand camera-hours. For Aligned, these methods are interesting as local readers of selected video. [Paper](https://openaccess.thecvf.com/content/CVPR2024/papers/Song_MovieChat_From_Dense_Token_to_Sparse_Memory_for_Long_Video_CVPR_2024_paper.pdf), [code](https://github.com/wenhaochai/MovieChat).

#### Two different VideoAgents: active reading and reusable memory

Two papers with the same short title appeared in 2024. Their architectures must not be combined into one, nor their results transferred from one to the other.

| Paper | Main idea | Verified result | What transfers to Aligned |
|---|---|---|---|
| **VideoAgent, Xiaohan Wang et al., ECCV 2024**, arXiv:2403.10517 | An LLM iteratively requests the most useful frames through tools | 54.1% on the full EgoSchema set, 60.2% on the 500-question subset. An average of 8.4 frames is used to answer | Active refinement instead of reading all frames |
| **VideoAgent, Yue Fan et al., ECCV 2024**, arXiv:2403.11481 | Temporal memory and object memory are built first, then queried by an agent | 60.2% on the full EgoSchema set. Object memory ablation: 71.3% → 62.7% on 150 NExT-QA questions | Separate indexing and separate tools for retrieval and visual verification |

Sources: [Wang PDF, Tables 1–3](https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/10325.pdf), [Fan PDF, Tables 1 and 6](https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/03241.pdf). Wang’s small frame count refers to the frames selected for understanding, rather than the full cost of decoding, feature extraction, and retrieval. Fan’s main NExT-QA comparison uses 600 questions, while the ablations use 150. These results do not form a single table under an identical protocol.

**Key paper: Fan’s VideoAgent.** It demonstrates an architectural principle directly needed by Aligned: expensive processing of a recording should produce memory usable for many future questions.

1. Video is divided into two-second segments. LaViLa generates captions, while ViCLIP and a text encoder provide retrieval features.
2. Objects are detected and tracked. Visual similarity helps link separate appearances of the same instance.
3. Temporal memory stores segment descriptions and features. Object memory stores identifiers and occurrence intervals in SQL, along with visual features.
4. GPT-4 selects a tool: read captions within an interval, retrieve a segment semantically, ask a video model about a short clip, or query object memory.
5. A tool result can lead to another query. The final answer is constructed after collecting context. [§2, Figure 2](https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/03241.pdf).

![VideoAgent — Temporal Memory, Object Memory and Tool-use](/media/assets/2024-fan-videoagent-figure2.png)

*Figure: VideoAgent architecture. Source: Fan et al., ECCV 2024, Figure 2, PDF p. 4. On the left, video is transformed into temporal memory with captions and features, and object memory with identifiers, occurrences, and object features. On the right, the agent repeatedly calls four tools and receives their results. This is the original diagram, rather than a demonstration of re-identification accuracy.*

In a construction example, the memory could return “this tool appeared with Pedro at 14:12 and with another worker at 14:26.” But **an object’s appearance is not its state**. An SQL table of occurrences does not yet justify concluding that a fastener was installed correctly. This is the boundary between memory/retrieval and quality assessment.

A practical limitation is that captioning or re-identification errors enter memory and are reused. The improvement in localization when captions are replaced with ground-truth narrations shows how retrieval depends on perception quality. [Fan’s code](https://github.com/flowithin/VideoAgentECCV), [Wang’s project](https://wxh1996.github.io/VideoAgent-Website/). Fan’s README describes separate memory construction and inference stages and several model environments. This is a research implementation, rather than a ready-to-use site service.

#### AMEGO: interaction memory

**AMEGO — Active Memory from long EGOcentric videos, Goletto et al., ECCV 2024** is useful as an alternative memory concept. It remembers which objects the hands interacted with and the visually recognizable areas where work occurred. This is a more structured visual memory, rather than a general-purpose LLM chat system. [PDF](https://arxiv.org/pdf/2409.10917), [code](https://github.com/gabrielegoletto/AMEGO).

A stable sequence of hand–object contact detections starts an interaction tracklet, after temporal filtering of isolated activations. A tracker continues the observation, DINOv2 features are aggregated over the track, and similar tracks are linked to object instances. In parallel, periods of activity in the same place are grouped into location memory. A query can then be answered through temporal order and interval overlap. For example, “which object was used before this?” becomes a search for neighboring interactions, rather than a new description of the entire video.

For Aligned, AMEGO’s value is in selecting events through hand interactions with work objects. But an area’s appearance does not provide room coordinates, and the visual similarity of two power screwdrivers does not prove they are the same tool. Such associations should remain verifiable hypotheses.

#### Video-RAG, Luo et al., NeurIPS 2025, arXiv:2411.13093

This method adds **retrieved auxiliary text** to selected frames: ASR, OCR, and information about detected objects. The query determines which auxiliary information to retrieve. An existing LVLM then receives both frames and compact text. This is a training-free extension of a video model, rather than a standalone memory covering all cameras. [PDF, Figure 2](https://arxiv.org/pdf/2411.13093v4), [code](https://github.com/Leon1207/Video-RAG-master).

In camera-ready Table 1, LongVA-7B with 128 frames achieves **52.6%** on Video-MME without subtitles, **56.0%** with subtitles, and **62.0%** with Video-RAG. The gain over the subtitle variant is therefore **6.0 percentage points**, rather than 9.4 percentage points. With LLaVA-Video-72B, the result is 77.4% versus 75.9% with subtitles. Conditions with different access to audio-derived text must not be conflated. The lesson for Aligned is specific: written text, speech, and visual features complement each other, but each textual piece of evidence must retain its provenance. The remark “I already secured everything” is a person’s statement, rather than visual verification of the fastening.

#### EgoButler / EgoRAG: a multi-day memory baseline

EgoGPT creates audiovisual captions for 30-second clips. These form a memory with timestamps and summaries at larger scales. EgoRAG retrieves relevant descriptions, reexamines selected segments, and passes the material to an answer model. It is important to distinguish the conceptual hierarchy in the figure from the experimental implementation described: the main pipeline retrieves three clips through text similarity and uses GPT-4o for the final answer, §4.2–5.

![EgoButler: EgoGPT creates memory, EgoRAG selects evidence](/media/assets/pdf-audit-egolife-egobutler-figure7.png)

*Original figure: Yang et al., arXiv:2503.03803v3, Figure 7, PDF p. 7. On the left (a), EgoGPT converts audio and video into timestamped captions. On the right (b), the query provides retrieval keys for multi-level memory, and selected evidence is returned to the model. The figure shows the conceptual system, while the main experiment in §5 uses textual top-3 retrieval and GPT-4o for the final answer.*

EgoGPT personalized on the first day achieves **36.0%** average accuracy, compared with **33.1%** without personalization and **36.9%** with a Gemini captioner, Table 5. In the separate ablation in Table 7, human-verified audiovisual captions achieve **45.5%**, versus **36.0%** for personalized EgoGPT captions. The caption of that table explicitly identifies personalized EgoGPT as the common answer model, whereas §5 specifies GPT-4o for the main Table 5 comparison. This therefore supports a conclusion about memory quality within Table 7, rather than a fully controlled comparison between the two tables.

<a id="paper-2026-rauf-hpp"></a>

#### HPP, Rauf et al., EMNLP 2026: an agent programs its evidence search

The question “how many times did the worker return to this assembly?” may require several searches, removal of repeated hits, and order verification. **HPP — Hierarchical Programmatic Probing** allows an LLM to express this sequence as a program in a stateful Python environment. Intermediate intervals and visual reading results remain in variables. The model can refine the query, merge what it found, and inspect an individual clip. This is a distinct agentic reader alongside VideoAgent and Ego-R1, rather than an established continuation of their architectures. [PDF, §3, Figure 1](https://aclanthology.org/2026.emnlp-main.2377.pdf#page=3).

A hierarchy of shots, scenes, and semantic clusters is constructed as needed. Retrieval combines similarity of global representations with token–frame MaxSim. The agent calls functions for frame sampling, temporal zooming, subtitle search, and VLM queries. The hierarchy and embeddings are cached as they are used. The base configuration combines GPT-5-mini with Qwen3-VL-2B without dedicated controller training. “2B” therefore describes only the visual reader, rather than the whole system. The method processes prerecorded video, and does not evaluate maintaining durable memory for several workers.

![Original HPP diagram](/media/assets/new-work-selection-2026-11-02/2026-rauf-hpp.png)

*Original Figure 1, PDF p. 3. HPP: a coding LLM, a stateful environment, and video inspection tools. The diagram describes processing recorded video, rather than a continuous incoming stream. [Source](https://aclanthology.org/2026.emnlp-main.2377.pdf#page=3).*

The authors report **66.4% accuracy** on LongVideoBench. More informative is the separate comparison on 150 LVB-3600 questions: code execution achieves **66.7% versus 56.7%** for ReAct-style tool calling with identical models, tools, subtitle access, and iteration budgets. This is evidence for the value of the programmatic interface in this experiment, but does not establish equal total computation. Average times of **99.1 and 110.4 seconds** per question on the LVB-600/3600 subsets include frame extraction, indexing, retrieval, and VLM inference invoked inside the REPL. [PDF, Tables 2, 4–5, pp. 7–9](https://aclanthology.org/2026.emnlp-main.2377.pdf#page=8).

Reproducibility requires further clarification. In the PDF, MaxSim first maximizes similarity over query tokens and averages over frames, whereas the checked code at revision `558cc07` maximizes over frames and averages over text tokens. The default activity proxy uses compressed packet sizes, while the paper describes motion vectors and residuals. In the API cost estimate in Appendix C.2, the text assumes 70% cached input, but the formula assumes 80%. Token savings therefore cannot be turned into a promise about total processing cost. [PDF, §3, Appendix C.2](https://aclanthology.org/2026.emnlp-main.2377.pdf#page=20), [search.py](https://github.com/AwaisRauf/hpp/blob/558cc0767170f2dca9cec3c074bc466b037d618a/hpp/utils/search.py#L372), [hierarchy.py](https://github.com/AwaisRauf/hpp/blob/558cc0767170f2dca9cec3c074bc466b037d618a/hpp/utils/hierarchy.py#L277).

For Aligned, the transferable operation is verifiable: several searches → merged intervals → rereading → answer. Programmatically removing identical timestamps does not yet establish that two cameras show the same event. The main evaluation is QA, so completeness of all rework events, reference correctness, and sensitivity to brief stationary defects need separate testing. The authors also note premature answers, repeated probing, and confirmation bias.

#### Ego-R1: training a controller to seek additional evidence

**Ego-R1, Tian et al., preprint 2025** proposes Chain-of-Tool-Thought. The authors subsequently report TPAMI 2026, but the results below refer to **arXiv v1**, rather than the unchecked journal version. [PDF](https://arxiv.org/pdf/2506.13654v1), [code](https://github.com/egolife-ai/Ego-R1).

Instead of fixed top-k retrieval, a small Qwen2.5-3B chooses a sequence of actions: search hierarchical text memory, refine a time range, query a video model about a clip, or inspect a specific frame. Supervised fine-tuning uses 25 thousand synthetic tool-use traces. GRPO then trains it to choose actions that lead to a correct final answer. This is RL for information search, rather than training a model to direct physical work.

![Ego-R1: hierarchical memory and sequential tool calls](/media/assets/pdf-audit-ego-r1-figure1.png)

*Original figure: Tian et al., arXiv:2506.13654v1, Figure 1, PDF p. 1. The upper panel separates hierarchical text retrieval from the Video-LLM and frame-level VLM. Below, the controller first finds the day and event, then queries a specific frame and combines observations. This is an example tool-use trace from the paper, rather than an independent check of the correctness of all reasoning.*

On the **300-question Ego-R1 Bench**, the SFT controller achieves **34.3%**, rising to **46.0%** after RL, Table 3. In a separate tool ablation, retrieval alone achieves **39.7%** (Appendix C, Table 4, PDF p. 19), supporting the value of returning to visual material. However, 3B is the controller size. The video model, frame analysis model, and a separate context processing model are all part of the full system and its cost.

For Aligned, the idea is useful at a second stage: if the material initially retrieved is insufficient, the system should refine its search purposefully. But stable tools and annotations of successful searches are needed first. Otherwise, RL will learn to exploit benchmark-specific features. Training and testing in the paper use the same week of recordings, and the EgoLifeQA evaluation removes overlaps with training without a clear remaining denominator. This limits the interpretation of transfer to unseen sites.

#### Graph memory: EGAgent and WorldMM

**Key paper: EGAgent — Agentic Very Long Video Understanding, Rege et al., ACL 2026.** The question “who regularly helped Pedro with this tool?” is poorly served by retrieving a single similar caption. EGAgent makes relationships between people, objects, and places directly queryable. [PDF](https://arxiv.org/pdf/2601.18157v3), [code](https://github.com/facebookresearch/egagent).

Entities and relations with their active intervals are extracted from scene descriptions and stored in SQLite. A planning agent breaks the question into subtasks and selects frame, transcript, or graph retrieval. An analyzer retains relevant information in working memory, and a final multimodal VQA agent generates an answer from the question and selected evidence. The architecture does not identify a separate verifier for each claim. This is a symbolic temporal entity graph, rather than a 3D site map. A separate earlier static inspection of `create_db_entity_graph.py` confirms fields for relation sources/targets and temporal indices, while `langgraph_agent.py` confirms routing among the three channels.

![EGAgent: three sources and SQL queries over a temporal graph](/media/assets/pdf-audit-egagent-figure2.png)

*Original figure: Rege et al., arXiv:2601.18157v3, Figure 2, PDF p. 4. Panel ① shows the planning agent, three sources, retriever, analyzer, and working memory before VQA. Panel ② links visual identification of a trip with the participant graph. Panel ③ details SQL retrieval of relations with temporal constraints. The final VQA agent formulates the answer, and the figure contains no separate module for checking each citation.*

The **57.5%** result on EgoLifeQA uses Gemini 2.5 Pro. A more isolated comparison with GPT-4.1 yields **48.6% without the entity graph versus 50.7% with it**, Table 1. In Table 4, the GPT-4.1 configuration requires **169 seconds and 571K tokens per question**. Replacing LLM-based transcript retrieval with BM25 gives 125 seconds and 172K tokens, but accuracy drops to 43.9%. This illustrates a real tradeoff, rather than ready-made conversational latency. Manually diarized transcripts are also used on EgoLife. For Aligned, the transferable elements are the relationship representation and routing method, rather than an assumption that speed and quality transfer in full.

**WorldMM, Yeo et al., CVPR 2026**, separates memory into three types: episodic, for what happened at a specific time, semantic, for stable relationships and habits, and visual, for features and frames used to check details. Episodic graphs are built at several temporal scales. An agent repeatedly selects the memory type and query, then passes the collected evidence to a solver. [PDF](https://arxiv.org/pdf/2512.02425v2), [code](https://github.com/wgcyeo/WorldMM).

![WorldMM: episodic, semantic, and visual memory](/media/assets/pdf-audit-worldmm-figure2.png)

*Original figure: Yeo et al., arXiv:2512.02425v2, Figure 2, PDF p. 3. On the left, three memories are built. In the center, the retrieval agent selects a memory and a query at each step. On the right, the response agent receives the search history and retrieved data. The diagram distinguishes long-term generalization from returning to frames, but does not demonstrate guaranteed entity resolution verification.*

On EgoLifeQA with an 8B solver, replacing episodic graph retrieval with embedding retrieval lowers the result **from 56.4% to 52.0%**, Table 4. This is a useful internal ablation because it compares a memory component. The latency analysis measures processing of 100 random EgoLifeQA questions, §4.6. It does not provide a separate full accounting of source video reading and memory construction. The plot therefore cannot be interpreted as measuring the cost of “new video → ready memory → answer.”

Our conclusion is that a graph is needed when typical questions actually require composition of relationships. For “show the moment the panel was installed,” a simpler index may suffice. A graph’s presence does not solve entity resolution. If two different panels are merged into one node, complex reasoning will only combine incompatible events more confidently.

#### MERIT versus EM²Mem: where to perform semantic integration

These two papers are particularly useful to read together. They place complex processing at different points: **before a future question** or **after it arrives**.

**Key paper: MERIT — Keep It Simple, Choi et al., ECCV 2026.** Instead of a large graph, each 30-second episode is stored with several text keys: event, object, summary, and dialogue when speech is present. A question can match any key. After retrieval, the system reads neighboring captions and extracts context specifically for that question. The retrieval loop and the decision “keep searching?” operate on text. Visual frames are used in the final QA call. [PDF, §3 and Appendix A](https://arxiv.org/pdf/2608.07663v2), [code](https://github.com/choi-yeeun/MERIT).

![MERIT — Multi-key Episodes and Temporal Expansion](/media/assets/2026-choi-merit-figure2.png)

*Figure: MERIT pipeline. Source: Choi et al., arXiv:2608.07663v2, Figure 2, PDF p. 6. The original diagram shows key construction on the left and expansion to neighboring episodes on the right.*

Imagine the episode “Pedro picked up a spirit level, checked the panel, and called Alex.” One generic embedding may match “who checked whether it was vertical?” poorly. A separate action key increases the chance of retrieving the episode. Neighboring records help establish which panel was involved. This illustrates the mechanism for Aligned, rather than providing a benchmark example.

With GPT-5, MERIT reports **71.2% on 500 EgoLifeQA questions, 71.8% on LVBench, and 77.7% on Video-MME Long**, Tables 1–2. In retrieval settings reproduced by the MERIT authors, the hit rate is **0.56 versus 0.53 for WorldMM**, Table 5. However, the windows differ: MERIT returns 30-second clips, while WorldMM can return intervals up to an hour long. This is not a comparison at an equal temporal evidence budget. Even here, almost half the questions fail to hit the target timestamp under this metric. High QA accuracy does not imply equally reliable evidence localization.

The claimed reduction in memory construction cost excludes the shared dense captioning stage, Table 6. It therefore cannot be translated into “all camera processing becomes cheaper by the same factor.” The main value for Aligned is a simple, strong baseline against which to evaluate adding graphs.

**EM²Mem — Event-Centric Multimodal Memory, Chen et al., Findings of EMNLP 2026**, moves integration earlier: captions, transcript, keyframes, and provenance are linked to a shared 30-second event anchor. This is a fixed temporal address, rather than an automatically detected semantic event boundary (Appendix C.7). Additional contexts span 3 minutes, 10 minutes, and an hour. Semantic search is followed by graph expansion and selection of a compact evidence set. [PDF](https://arxiv.org/pdf/2609.00551v1), [research code](https://github.com/zjunlp/LightMem-Ego/tree/main/research/em2mem).

![EM²Mem: a shared event address, graph links, and evidence selection](/media/assets/pdf-audit-em2mem-figure2.png)

*Original figure: Chen et al., arXiv:2609.00551v1, Figure 2, PDF p. 3. The left panel links captions, speech, frames, and multi-level context under a fixed 30-second address. The central panel shows node and edge types, including support/provenance. On the right, retrieval and graph expansion produce candidates, and the selector chooses a compact set for the answer model. Provenance denotes a link to a source, rather than automatically established truth of an extracted fact.*

On EgoLifeQA, the system achieves **66.0%** versus **64.0%** for the EM²Mem authors’ comparable reproduction of WorldMM, Table 1. In a controlled experiment with a 300-second evidence budget, retrieval coverage improves by **5.4 percentage points**, with a 95% interval of **[+2.6, +8.3]**. The QA improvement of **60.0% → 63.0%** has an interval of **[−0.8, +6.8]**, so this separate test does not establish a confident QA gain, Table 12.

Average question latency is **459.00 → 98.21 seconds**, a 4.67× gain. A separate throughput result of 37.4× includes eight parallel workers and implementation differences. Memory construction consumes **89.23M tokens versus 60.55M**. With 500 questions, the total is **104.50M versus 102.58M**, Tables 9–10. A cheaper query does not yet mean lower total token cost here.

A separate earlier static inspection of the README and `build_multimodal_event_record.py` confirms an offline research pipeline. A separate online backend in the parent LightMem-Ego project does not turn the EM²Mem benchmark result into an evaluation of a live system. For Aligned, the main value is a shared evidence address: every fact should be tied to a recording, camera, interval, and processing version.

<a id="paper-2026-zhang-egocite"></a>

#### EgoCITE, Zhang et al., 2026 preprint: finding the right fact at the right time

A record such as “he picked it up again” can lose both the person and the tool. Even a clear description such as “Pedro checks the panel” does not say whether this was the first or last inspection. **EgoCITE** separates these two problems: it first makes a record understandable outside its original context, then accounts for the question’s temporal meaning during retrieval. For Aligned, this is particularly useful for repeated actions across shifts. The paper does not train a new model or assume that a more complex graph will remove ambiguity by itself. [PDF, §§3–4, Figure 3](https://arxiv.org/pdf/2608.12627v3#page=4).

EgoScheme converts captions and speech into self-contained records by resolving pronouns and recovering omitted participants from context. EgoIndex stores four text representations: actions, activities, utterances, and conversations. Each record retains its timestamp and a link to the original caption. Fine-grained actions and utterances use the preceding five-minute context, while activities and conversations use complete 30-minute windows, with possible merging of neighboring records. If context cannot resolve a detail unambiguously, the specification requires preserving the original wording. This is a record construction rule, rather than an experimental guarantee of error-free output.

![Original EgoCITE diagram](/media/assets/new-work-selection-2026-11-02/2026-zhang-egocite.png)

*Original Figure 3, PDF p. 4. EgoCITE: context resolution, four record types, and temporal evidence selection. The first block includes perception and person ID, whose quality in the main experiment is supplied through prepared data. [Source](https://arxiv.org/pdf/2608.12627v3#page=4).*

A drafting agent translates the question into semantic, temporal, and representation-dependent queries. Retrieval combines similarity with soft temporal relevance. A sampling agent then selects a consistent evidence set that accounts for “first,” “last,” or “usually,” after which a response agent formulates the answer. Unlike a hard restriction to one preselected day, temporal meaning participates in both ranking and subsequent selection. Misinterpreting that meaning can still exclude the required observation.

In the component experiment on EgoR1-Bench, accuracy changes **61.3 → 69.7 → 71.3 → 75.3%** as atomic indices, context resolution, and temporal retrieval are added sequentially. On EgoLifeQA, the GPT configuration achieves **63.8%**, compared with **49.6%** for the authors’ reproduction of WorldMM. However, the main memory source consists of **human dense captions and transcripts**. Even the automatic captioning variant uses manually prepared descriptions of participants’ appearances. All three tests, including EgoMem, use EgoLife recordings. EgoMem here should not be confused with EgoMemReason from another paper. [PDF, Tables 2, 10, Appendices B.1 and C.1](https://arxiv.org/pdf/2608.12627v3#page=13).

Five retrieval rounds take an average of **32.0 seconds** per question in the reported sample, excluding perception and index construction. The starting timestamp of a record extracted from a full 30-minute window also does not establish that it was available at that moment. For Aligned, event time and availability time, automatic identification errors, and the full cost of memory writing must therefore be tracked separately. Context resolution and temporal selection should be compared using identical source captions, rather than attributing the entire result to the retrieval architecture. [PDF, §4.1, Table 13](https://arxiv.org/pdf/2608.12627v3#page=20).

#### CapMem: reusable caption memory

**[CapMem](/notes/2026-liang-capmem/)** is an essential comparison point for EGAgent, MERIT, and graph memory: first obtain descriptions of 30- or 60-second windows, then repeatedly answer from the stored text. This separates the cost of initial viewing from the cost of each question. On 75 videos totaling 33.7 hours and 1 000 questions, the authors separately control frame coverage, the captioning model, and the answer model. After aligning frames, the average advantage on videos longer than 20 minutes is +3.22 percentage points for 30-second windows and +2.55 percentage points for 60-second windows across six Qwen models. For short videos, text can lose important details. [Publisher PDF, Tables 4–6, pp. 6–7](https://aclanthology.org/2026.emnlp-industry.233.pdf#page=6).

A separate retrieve–verify mechanism returns several neighboring windows and checks the answer against a limited number of frames. A substantial caveat is needed here: Appendix D explicitly states that the answer override policy, including the exception for questions about exact clock times, was chosen after analyzing errors on the same evaluation set. There is no separate development split. These improvements require independent validation and should not become the main evidence for the method’s reliability. The cleaner reason for inclusion is the experiment with fixed frames and reusable descriptions. [PDF, Appendix D, pp. 17–18](https://aclanthology.org/2026.emnlp-industry.233.pdf#page=17).

The cost in Table 7 also cannot be translated directly into an API bill: direct video uses an analytical visual token proxy, rather than actual bills from all providers. For Aligned, the paper suggests a testable experiment: identical sources and frames, several questions per recording, and separate accounting of construction, updating, retrieval, and answering costs. It is useful to test whether descriptions of long windows preserve object names, negations, and brief errors.

![CapMem memory](/media/assets/expansion-memory/capmem-memory.png)

*Original Figure 2, PDF p. 3: construction and reuse of caption memory.*

#### Caption-once, Frames-on-Demand: checking pixels only when necessary

**CFD, Cai et al., EMNLP 2026** adds explicit **visual-need routing** to this picture. During indexing, the system stores an event storyline and more detailed clip captions. It first tries to answer from text. If information is insufficient, it selects an event, adds stored details, and decides whether source frames are needed. A bounded FIFO visual memory holds several currently relevant frames. [PDF](https://arxiv.org/pdf/2609.11899v1), [official publication](https://aclanthology.org/2026.emnlp-main.422/), [project](https://weitongcai.com/CFD/).

![CFD: from storyline to local captions and frames on demand](/media/assets/pdf-audit-cfd-figure2.png)

*Original figure: Cai et al., arXiv:2609.11899v1, Figure 2, PDF p. 5. The upper part separates event memory, uniform clip captions, and visual working memory. The lower part shows an early textual answer, temporal localization, caption refinement, and visual-need routing to frames. Edge/cloud denotes separation of stages here. Physical wearable deployment was not evaluated, as the authors note in Limitations, PDF p. 10.*

In the controlled ablation from always-on visual retrieval to the visual-need router, the number of online frames falls **6.63 → 5.76 per question**, by 13.1%, while Video-MME accuracy changes **67.2% → 67.5%**, Table 9. These frames exclude offline captioning. Appendix E reports **229.3 seconds of indexing per video and 68.2 seconds per question** in a configuration with eight workers on two H200s. Frame savings therefore do not establish low conversational latency. The authors also explicitly note the limitations of shot-boundary segmentation for continuous egocentric video. For Aligned, the transferable policy is “is text sufficient, or are pixels needed?”, while event segmentation and the budget for small defects require separate evaluation. Public code was not confirmed in the inspected sources.

<a id="paper-2026-leng-flora"></a>

#### FLORA, Leng et al., 2026: training a memory writer to identify events

FLORA is useful for a video archive even before retrieval: the system first needs to determine where one action ends and another begins, then create a description suitable for indexing. The paper separates this into a segmenter and a captioner. A separate rewarder evaluates execution for robotics data. For Aligned, the main interest lies in the first chain: converting a long recording into intervals with meaningful descriptions. It complements memory methods that assume prepared events, but does not itself solve retrieval over a multi-day archive.

The segmenter processes overlapping windows, marks actions continuing beyond a boundary, and merges results from neighboring windows. Additional window offsets help refine boundaries. The captioner receives the selected interval together with surrounding context to name the intended action. This distinction matters: a failed attempt can still receive a description of the action the person intended to perform. Such a description is convenient for retrieval, but a record of “screw on the part” does not establish that “the part is securely fastened.” Synchronized views, when available, are combined in the input, but this is not a mechanism for independently matching recordings from different workers.

![Original FLORA diagram](/media/assets/new-work-selection-2026-11-02/2026-leng-flora.png)

*Original Figure 6, PDF p. 8. FLORA: event segmentation and descriptions separate from dense, outcome, and rubric reward labels. This is a video annotation diagram, rather than an architecture for long-term memory or a causal detector. [Source](https://arxiv.org/pdf/2610.31779v1#page=8).*

The models are based on Qwen3.5 and undergo supervised fine-tuning, with the segmenter and captioner additionally trained through GRPO. What’s Going On evaluates boundaries, captions with correct boundaries, and their joint result separately. This reveals the cost of writer errors: FLORA exceeds Astra on segmentation F1, 50.3 versus 46.0, but trails on captioning for correct segments, 64.7 versus 77.4, and joint F1, 34.5 versus 39.0. Successful segmentation therefore does not yet guarantee better event memory. Claimed cost advantages also depend on selected hardware, utilization, and the calculation model, rather than constituting a universal deployment measurement.

The rewarder must not be confused with a real-time monitor. It evaluates an episode’s outcome or produces dense normal, suboptimal, and failure labels, but uses future context: in windowed processing, the last four seconds are not evaluated until the next window appears. On DenseRewardBench, macro-F1 is 46.2, and failure-class recall is 53.3%. At the same time, about 11% of normal steps are labeled as failure, so even within the robotics protocol this is incomplete diagnosis with appreciable false alarms. FLORA shows how to train boundaries, record content, and outcome evaluation separately. These fields should likewise remain separate in Aligned’s memory so that intention, observed action, and confirmed outcome do not collapse into one confident description. [PDF, §2–4, Tables 1, 3, 5](https://arxiv.org/pdf/2610.31779v1)

#### MemLife: the memory writer also needs optimization

**Xiong et al., 2026 preprint.** MemLife separates independent clip writing from agentic memory reading. The writer combines video with speech, links mentioned names to entities, and formulates a description from the camera wearer’s perspective. The reader refines the question and time window, searches embeddings, reads records, and calls FetchVideo when source recordings are available. Writing each clip independently limits propagation of earlier errors, but does not itself solve cross-clip identification. [PDF, §§3–4](https://arxiv.org/pdf/2609.40195v1).

![MemLife and MemOpt: writing, reading, and learning memory quality](/media/assets/expansion-existing/2026-xiong-memlife.png)

*Original Fig. 2, PDF p. 4. Access to source video is an additional mode. The base reader can operate on text memory alone.*

A separate idea, MemOpt, trains the writer through GRPO on three record qualities: source faithfulness, preservation of needed facts, and retrievability. This is RL for memory writing, rather than for directing a worker. For Aligned, it is useful to compare ordinary captions with these records using the same reader and an identical frame budget. Text memory compactness and answer speed figures cannot be interpreted as the cost of the whole system: they exclude storage of originals and the full preprocessing pipeline. An answer without reinspection remains limited by what the writer preserved.

<a id="task-2-4"></a>

### 2.4. Count events and evaluate a compound condition

Video memory must support several different query contracts. “Show an example of panel installation” allows early stopping. “Find all instances of rework on this panel” requires completeness and deduplication. “What fraction of time was spent waiting?” requires a definition of the measured quantity and acceptable error. “Notify me when a hazardous state appears after an operation” requires a temporal rule and timely execution. One QA score does not characterize all four modes.

The video database literature is useful here. It often uses simpler visual tasks than modern VLMs, but explicitly separates the costs of perception, indexing, and repeated query execution. For Aligned, this is a distinct architectural dimension that complements MERIT, EGAgent, and caption memory.

#### Protocols: cost, completeness, and predicate quality

Focus, BlazeIt, TASTI, EQUI-VOCAL, and VOCAL-UDF do not form a single leaderboard. Retrieving a few examples allows early stopping, estimating an aggregate requires a defined quantity and acceptable error, and a compound query depends on the predicates and operators supported. Completeness of all individual events must be evaluated separately. CLEVRER, CityFlow-NL, and Charades are used to evaluate VOCAL-UDF, while an expensive detector supplies the reference in several systems experiments. Agreement with it does not correct its errors. [Focus](https://www.microsoft.com/en-us/research/uploads/prod/2018/07/Focus_OSDI18.pdf), [BlazeIt](https://www.vldb.org/pvldb/vol13/p533-kang.pdf), [TASTI](https://ddkang.github.io/papers/2022/tasti-paper.pdf), [EQUI-VOCAL](https://www.vldb.org/pvldb/vol16/p2714-zhang.pdf), [VOCAL-UDF](https://arxiv.org/pdf/2408.02243v2).

#### Focus: dividing work between ingestion and querying

**Hsieh et al., OSDI 2018, a key systems reference.** Focus answers queries about frames containing objects of a specified class. As video arrives, an inexpensive specialized CNN builds an approximate index of several most likely classes. Similar object occurrences are grouped into clusters. When a query arrives, an expensive model refines the class of representatives from selected clusters and propagates the result to their members. The OTHER class preserves the ability to retrieve less frequent categories.

The key idea is to choose ingestion and answering costs jointly. A higher-quality index requires more work in advance but reduces subsequent checks. A stream tuner selects the configuration for target precision/recall and preferences between the two costs. This is closer to our task of planning a multi-week archive than comparing context length alone. [PDF, §§3–5, pp. 4–9](https://www.microsoft.com/en-us/research/uploads/prod/2018/07/Focus_OSDI18.pdf).

![Focus: ingest-time index and query-time refinement](/media/assets/expansion-systems/2018-hsieh-focus.png)

*Original Figure 4, PDF p. 5. Inexpensive indexing is performed on the left, and query-time refinement on the right. [Source](https://www.microsoft.com/en-us/research/uploads/prod/2018/07/Focus_OSDI18.pdf).*

The limitation is fundamental: “ground truth” here is YOLOv2 output, rather than independent human annotation. Clustering can incorrectly merge different occurrences, and classes are limited by the model. Successful agreement with a teacher therefore does not establish small-defect detection quality. Our proposed transfer is to test a similar budgeting mechanism on our own questions and rare events while preserving source video.

#### BlazeIt and TASTI: statistics and index reuse

**BlazeIt, Kang et al., PVLDB 2019**, introduces FrameQL and executes queries over a virtual object table. Instead of running an expensive detector over every frame, the system first obtains a small labeled sample. An inexpensive network helps estimate statistics or rank candidates. For aggregates, its predictions are used as a control variate: a correlated inexpensive signal reduces the number of expensive measurements needed. For a LIMIT query, the system checks likely matches and stops after obtaining the requested number of examples. [PDF, §§3, 6–7, pp. 3, 5–7](https://www.vldb.org/pvldb/vol13/p533-kang.pdf).

![BlazeIt: declarative queries over a virtual video relation](/media/assets/expansion-systems/2019-kang-blazeit.png)

*Original Figure 1, PDF p. 2. The virtual table is materialized as needed. [Source](https://www.vldb.org/pvldb/vol13/p533-kang.pdf).*

The statistical bound applies to the detector output table defined by the authors and to the sampling assumptions. It does not correct recognition errors. Counting objects in frames also does not count unique installations. For Aligned, it is useful to distinguish approximate statistics, example retrieval, and a complete incident register explicitly. A LIMIT restriction must not be hidden behind the statement “all problems have been found.”

**TASTI, Kang et al., SIGMOD 2022**, removes the need to train a separate proxy model for every query. The user defines which outputs of an expensive labeler should be considered similar. A learned representation groups similar records. The system labels representatives, stores distances to them, and, for a new query, propagates the representatives’ exact scores to the remaining records. These proxy scores are then used by aggregation, selection, or limited retrieval algorithms. [PDF, §§2.3–4, pp. 3–5](https://ddkang.github.io/papers/2022/tasti-paper.pdf).

![TASTI: reusable semantic index and query-specific score propagation](/media/assets/expansion-systems/2022-kang-tasti.png)

*Original Figure 1, PDF p. 4. Embedding training, index construction, and query execution are separate stages. [Source](https://ddkang.github.io/papers/2022/tasti-paper.pdf).*

This is a useful baseline for recurring workloads. It should be compared on the total cost of a query series, including index construction. Its limitations are also explicit: the labeler schema determines the available properties, and the theoretical results require conditions on the loss function and cluster density. In §5.3, the authors specifically note the discrepancy between analysis of one nearest representative and practical use of five. Such theory does not guarantee the truth of a conclusion about construction work.

#### EQUI-VOCAL: the user defines an event through examples

**Zhang et al., PVLDB 2023, a key paper for configurable compound queries.** EQUI-VOCAL receives several positive and negative clips and synthesizes a query over objects, relations, and state sequences. Beam search explores a bounded query space, active learning requests additional discriminating examples, and an SQL executor runs the resulting rule. Temporal constraints allow sequences and minimum condition durations to be expressed. [PDF, §§2–4, pp. 3–7](https://www.vldb.org/pvldb/vol16/p2714-zhang.pdf).

![EQUI-VOCAL: query synthesis from labeled examples](/media/assets/expansion-systems/2023-zhang-equi-vocal.png)

*Original Figure 1, PDF p. 1. Examples refine the user’s intent, and the resulting query is then applied to new segments. [Source](https://www.vldb.org/pvldb/vol16/p2714-zhang.pdf).*

For Aligned, this suggests configuring recurring checks together with an expert. However, §2.3 explicitly excludes negation and disjunction. The method cannot be credited with a ready-made check for “the operation was not performed.” In addition, §4 allows stopping after the first match within a segment: the output is matching segments, rather than a complete list of all individual events. Object tracking and visual predicates are assumed to be input components, whose reliability must be measured separately.

#### VOCAL-UDF: teaching the system a new observable condition

**Zhang et al., SIGMOD 2025, a key paper for an extensible vocabulary of checks.** VOCAL-UDF translates a question into a formal query and identifies missing predicates. A generator creates either a Python function over available features or a small visual model trained on labels from a strong VLM. Execution checking rejects invalid programs, while active learning with user labels helps select a semantically appropriate candidate. The resulting predicate is saved for future queries. [PDF v2, §§4–5, pp. 7–15](https://arxiv.org/pdf/2408.02243v2).

![VOCAL-UDF: parser, generated predicates and query execution](/media/assets/expansion-systems/2025-zhang-vocal-udf.png)

*Original Figure 2, PDF p. 7. Creation of a missing function is separated from query execution. [Source](https://arxiv.org/pdf/2408.02243v2).*

This mechanism has a limit that matters for compliance. If candidates perform poorly, the selector can choose a dummy UDF that always returns True. This is equivalent to removing the condition from the query (§4.4.2). For a retrieval system, such a fallback can preserve useful candidates. For a conclusion that “the requirement is satisfied,” it is unacceptable without an explicit statement that the condition was not checked. UDFs that directly evaluate change across several times are also unsupported, although some transitions can be approximated by a sequence of frame-level predicates (§8).

The practical transfer is a versioned registry of observable conditions with examples, an independent validation set, and an explicit “check unavailable” state. Detector creation cost should be separated from repeated application. Evaluation on CLEVRER, CityFlow-NL, and Charades confirms specific query engine capabilities, rather than a complete system for checking construction codes.

#### Reducto: saving input processing costs

**Reducto**, Li et al., SIGCOMM 2020, makes savings earlier, before frame transmission and expensive inference. The server profiles a query and selects an inexpensive inter-frame feature and a threshold table. The camera applies it to short segments. When new differences fall outside the learned range, it sends the segment without filtering and initiates a table update (§4.1, Fig. 4). [Paper card](/notes/2020-li-reducto/), [PDF](https://www.cs.princeton.edu/~ravian/publications/reducto_sigcomm20.pdf).

![Reducto: the camera filters frames, the server updates the threshold model](/media/assets/expansion-crosscut/reducto-fig4.png)

*Original Fig. 4, PDF p. 5. Profiling, threshold selection, and main inference run in different locations.*

A key limitation is especially important for transfer: the current Reducto implementation explicitly **does not support activity detection with state across frames**. It is evaluated on tagging, counting, and bounding boxes of people and cars, with reference outputs mostly supplied by YOLO (§§4.1, 5.1). Agreement with a detector is not recall of physical defects. One-second buffering also contributes to latency. The authors already provide a useful detail for Aligned: frames that are not sent can remain in a local archive. Inference savings and the policy for preserving originals should therefore be evaluated separately.

### Comparing the approaches

Text descriptions provide inspectable memory and inexpensive repeated questions. Visual retrieval helps find a detail that was never described, but similarity does not establish physical identity. A graph makes temporal and entity relationships available for compound questions, while also retaining the consequences of merging errors. An agentic reader can refine retrieval and return to frames, but adds latency and depends on tool quality.

Query execution systems expose a different choice: how much work to perform as video arrives, what to check at query time, and whether an answer can be estimated from a sample. This applies to the same text and visual indices. Focus and CapMem should be compared on the total cost of a series of questions, rather than just the time for one answer. An inexpensive LIMIT query or approximate aggregate still does not become a complete event list.

| Contract | Relevant idea | What Aligned additionally requires |
|---|---|---|
| Find a few examples | Focus, BlazeIt LIMIT | State the sample’s limitations and preserve supporting frames |
| Find all cases | Corpus/multi-moment retrieval and executable conditions | Complete coverage, event deduplication, unknown intervals |
| Estimate statistics | BlazeIt, TASTI | A definition of the quantity, perception error separated from sampling error |
| Repeat a compound check | EQUI-VOCAL, VOCAL-UDF | Validated predicates, support for the required operators, temporal causality |

This is our project-level conclusion. None of these systems immediately provides a reliable multi-camera repair register. Their value is in making the computational and semantic obligations of a query explicit before choosing a large reader or graph memory.
