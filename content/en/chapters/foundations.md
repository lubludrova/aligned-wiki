<a id="chapter-1"></a>



The goal is to understand which research ideas are needed for the system described in [Problem statement](/chapters/problem-statement/), how they work, and where their demonstrated capabilities end. Papers on video generation and robot policy learning are excluded from the main discussion because they do not address the current task of searching and monitoring construction work.

The material is organized by task: search and answers over an archive → linking observations → verifying evidence → object states → errors and corrections → timely intervention. Representations and memory storage methods are discussed within the tasks they serve. **Key** means important for architectural decisions, rather than the highest score on a leaderboard.

The main local source is Aligned Wiki. Topic searches were also conducted in RL-Wiki and PM-Wiki. PM-LLM-Benchmark concerns the analysis of processes that have already been represented and does not solve the extraction of a reliable event log from video. Process analysis is therefore considered after perception and observation linking. Local paper cards are used for navigation, while important numbers and architectural claims are checked against the original PDFs and official repositories.

### What exactly needs to be built

The question “What did Pedro do yesterday afternoon?” looks like Video Question Answering. But the system first needs to identify the relevant time interval and cameras, find events, associate them with the person, check the source frames, and formulate an answer with sources. The question “Was yesterday’s defect fixed?” adds physical object identification, state history, and data freshness checks. None of these steps follows automatically from a VLM’s ability to describe a short clip.

Consider a hypothetical example. On Monday, Pedro’s camera shows a panel being installed. On Tuesday, another worker records the same panel. Tuesday’s recording shows a covered surface, but the concealed fasteners are no longer visible. The system can report that the panel appears covered and present both observations. This does not establish that the fasteners were installed correctly. This distinction between observation and conclusion needs to exist in the data, rather than only in the cautious wording of an answer.

| Requirement | What the system must be able to do | What to evaluate separately |
|---|---|---|
| Searchable memory | Find the relevant event among weeks of recordings | Recall of relevant intervals in the presence of many similar episodes |
| Grounded answers | Answer and present supporting evidence | Correctness of the claim, completeness and accuracy of references |
| Multi-source continuity | Link the same object and work across cameras and shifts | Incorrect object merges and missed associations |
| Proactive detection | Detect problems without a question | Misses, false alarms, time to detection |
| Issue lifecycle | Track a problem and its correction | Incorrect closure, duplicates, reopening |
| Freshness | Explain how recent the available data is | Upload and processing delay for each camera |
| Scale | Process 18–36 thousand camera-hours | Total cost, throughput, latency |

### Archive size and context size

In the problem scenario, 50–100 cameras × 6 hours × 60 working days yield 18 000–36 000 camera-hours. If, purely for calculation, the stream is divided into non-overlapping 30-second intervals, this gives 2.16–4.32 million intervals. At one frame per second, it gives 64.8–129.6 million frames

At an assumed 4 Mbit/s, the source video occupies approximately 32.4–64.8 TB in decimal units, excluding replication, audio, and derived data. One 768-dimensional float16 vector per interval requires about 3.32–6.64 GB of numerical data alone, excluding the index and metadata. These calculations are not recommendations for bitrate or embedding size. 

Processing the daily 300–600 camera-hours within 24 hours requires aggregate throughput of 12.5–25 camera-hours per hour of wall-clock time. This does not yet specify the number of GPUs: that depends on decoding, the model, resolution, frame rate, and batching. For alerts during work, peak incoming volume and queue latency matter

### Basic datasets and representation evaluation protocols

Before choosing an encoder, it helps to understand what its benchmark evaluates. Aligned needs both inexpensive candidate retrieval and preservation of fine visual details. Good performance on the former does not guarantee the latter. Detailed retrieval and QA protocols are discussed in the next chapter.

| Dataset or test | What is evaluated | How to interpret the result |
|---|---|---|
| **MSR-VTT, MSVD, LSMDC, ActivityNet, DiDeMo** | Matching a text query to a video in the clip retrieval settings used by CLIP4Clip | Recall depends on the split and the number of candidates. It is not the completeness of retrieval of all events on a site. [CLIP4Clip, §§3–4](https://arxiv.org/abs/2104.08860) |
| **WebVid-2M** | Video–caption pairs for representation learning in Frozen in Time | A training corpus, rather than an independent evaluation of a complete video memory. [Frozen in Time, §§3–4](https://openaccess.thecvf.com/content/ICCV2021/papers/Bain_Frozen_in_Time_A_Joint_Video_and_Image_Encoder_for_ICCV_2021_paper.pdf) |
| **InternVideo2 task suite** | Transfer of a general backbone to recognition, retrieval, and multimodal understanding | More than 60 tasks do not constitute a single quality metric. The encoder and reader are evaluated separately. [InternVideo2, §3 and experiments](https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/11491.pdf) |
| **VOC object discovery, ADE20K** in EgoViT | Object localization CorLoc and segmentation mIoU after supervised fine-tuning | Comparison with baselines retrained by the authors. Does not evaluate long-term identity, state, or work quality. [PDF, Table 1, Appendix C.4](https://arxiv.org/pdf/2603.13912v1#page=6) |
| **ADE20K, NYUv2** in V-JEPA 2.1 | Segmentation and depth with a trained head on frozen features | Evaluate dense representations, rather than a complete video memory. The linear probing conditions differ from EgoViT fine-tuning. [PDF, §2.3, Figure 5](https://arxiv.org/pdf/2603.14482v3#page=6) |

This table establishes the role of the data in the papers discussed. It is not a new audit of all historical splits or a ranking of current encoders.

### Video representations and answer stages

**Representation** converts a clip into a form suitable for retrieval. **Retrieval** selects candidates. **Reranking** refines their order using a more expensive model. **Temporal grounding** identifies the start and end of the event that supports the answer. **Generation** formulates the answer. In practice, these stages can be combined, but separate evaluation reveals where an error occurs.

There are three main representations.

1. **Text memory.** ASR provides speech, OCR provides written text, and a captioner describes what is visible. This enables text search. However, the text contains only what the recognizer chose to preserve. A washer that was never described will not emerge from an accurate search over descriptions.
2. **Visual memory.** Embeddings preserve frame and clip features. They help retrieve visually similar events even without a suitable caption. Semantic similarity does not guarantee object or person identity, or that the work was completed.
3. **Structured memory.** Events, objects, places, states, and their relationships become explicit records. This makes queries such as “after,” “the same,” and “before correction” easier. However, extraction and merging errors become part of the memory and can affect many subsequent answers.

ASR cannot be treated as a transcript of everything that happens. A worker may be silent, describe plans, or discuss someone else’s work. The statement “I tightened everything” is evidence of an utterance, rather than direct visual confirmation of tightening. For the same reason, the presence of a tool in a frame does not prove that it was used.

### Frozen in Time: why embeddings allow indexing to be separated from querying

**Bain et al., ICCV 2021.** *Frozen in Time: A Joint Video and Image Encoder for End-to-End Retrieval* trains independent text and video encoders in a shared space using image–text and video–text pairs, including WebVid-2M. Spatial and temporal attention encodes the clip, while contrastive learning brings matching pairs closer together. Video can be indexed in advance, leaving only the text embedding and similarity computation for query time. This is a historical foundation for inexpensive candidate retrieval, rather than verification of the physical correctness of work. Below, CLIP4Clip illustrates another route to this retrieval through transfer from an image–text model, while InternVideo2 provides a broader multimodal backbone. This is a comparison of approaches, not a claim of direct architectural lineage. [PDF, pp. 3–4, §§3–4](https://openaccess.thecvf.com/content/ICCV2021/papers/Bain_Frozen_in_Time_A_Joint_Video_and_Image_Encoder_for_ICCV_2021_paper.pdf).

### CLIP4Clip: strong image features are already useful for clip retrieval

**Luo et al., preprint 2021.** *CLIP4Clip: An Empirical Study of CLIP for End to End Video Clip Retrieval* investigates transferring CLIP to video, aggregating frames, and configuring training on MSR-VTT, MSVD, LSMDC, ActivityNet, and DiDeMo. The paper provides an accessible baseline: pretrained image–text features aggregated for a clip enable text-to-video retrieval. But a similar set of frames does not necessarily distinguish “unscrewed and removed” from “placed and screwed in.” For Aligned, such an index should be supplemented with temporal features and inspection of the retrieved episode. InternVideo2 is discussed next as a different scale and design of representations, rather than a demonstrated improvement over CLIP4Clip under an identical protocol. [PDF, pp. 4–8, §§3–4](https://arxiv.org/abs/2104.08860), [code](https://github.com/ArrowLuo/CLIP4Clip). The year refers to the first preprint.

### InternVideo2: one backbone can support several levels of the system

**Wang et al., ECCV 2024.** *InternVideo2: Scaling Foundation Models for Multimodal Video Understanding* combines three stages: distillation of unmasked video token features from expert encoders while masking the input, multimodal contrastive learning, and next-token prediction. The authors scale the video encoder to 6B parameters and evaluate transfer across more than 60 video and audio tasks.

This helps clarify the difference between good visual features, a retrieval model, and a conversational interface. They can share a backbone while having different training objectives and operating modes. In the official repository, stages 1–2 are separated from stage 3, which is associated with VideoChat2. For Aligned, encoder selection and reader selection should be evaluated separately. Strong action recognition does not establish that a memory is ready to search thousands of hours.

[PDF, pp. 4–6, Figure 2, §3](https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/11491.pdf), [official implementation](https://github.com/OpenGVLab/InternVideo/tree/main/InternVideo2). This is a historical architectural reference, not a claim that the 2024 version is the best model at the time of the review.

<a id="paper-2026-tan-egovit"></a>

### EgoViT, Tan et al., CVPR 2026: stable local region features

**EgoViT** trains an encoder on unlabeled egocentric clips: teacher–student self-distillation is combined with pseudo-depth and the selection of reliable region correspondences across frames. For Aligned, it is a candidate feature extractor before tracking and indexing. In a comparable retraining of DINO, object discovery on VOC improves from **37.2 → 45.2% CorLoc**, and ADE20K from **21.2 → 26.0 mIoU**, although the latter requires supervised fine-tuning. Proto-objects do not guarantee stable identity: an attention head can switch from a person to a car. Weak reproduction of DoRA and a single seed limit the comparison. The additional Ego4D-mini consists of three clips with SAM2 pseudo-GT, while the appendix also includes a broader evaluation of tracking and supervised video segmentation. These are local features, rather than an instance database or a check of a product’s state. [PDF, Table 1, Appendices C–D, I](https://arxiv.org/pdf/2603.13912v1#page=6).

<a id="paper-2026-mur-labadia-v-jepa-2-1"></a>

### V-JEPA 2.1, Mur-Labadia et al., 2026 preprint: preserving local video structure

**V-JEPA 2.1** extends masked latent prediction: both hidden and visible patches receive teacher supervision, while intermediate layers help preserve local geometry and global action information together. Images and videos use different patch tokenizers. For Aligned, this is a candidate source of features for tracking and state analysis, rather than a ready-made natural-language retrieval system. On ADE20K and NYUv2, performance is evaluated using trained heads on a frozen encoder, so this is not zero-shot scene reconstruction. Gains depend on the task, while the robot planning results require a separate action-conditioned predictor and do not establish the quality of construction monitoring. Compact distilled variants allow the cost of feature extraction to be evaluated separately. [PDF, §§2.3, 3, Figure 4](https://arxiv.org/pdf/2603.14482v3#page=5).

### Why top-k alone is not enough

If a query asks for one episode, top-k retrieval may suffice. If it asks to list all instances of rework over a week, the number of relevant events is unknown in advance. Returning ten compelling examples does not prove that the list is complete. Such questions require traversal of temporal and spatial partitions of the archive, coverage tracking, and explicit identification of intervals that have not been inspected.

A reasonable system design starts with exact site/date/camera filters, followed by a union of text and visual candidates, then reranking and verification against the source video. Filters must not silently exclude additional sources when the question concerns the work rather than just a particular camera wearer. A vector index is one component here, rather than a complete video memory.
