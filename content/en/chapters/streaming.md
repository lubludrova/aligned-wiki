<a id="chapter-7"></a>

A manager can ask about yesterday's event after recording has finished. A proactive assistant must notice a useful moment while the event is still happening: preserve evidence before an assembly is concealed, recognize step completion, or warn about an error. For Aligned, these are two connected tasks: maintaining accessible history as video arrives and choosing when to act. A fast answer from an existing memory does not establish that the system can create that memory in time, and a detected error does not necessarily warrant an intervention.

### Benchmarks and evaluation protocols

| Benchmark / protocol | What is tested | Limitation and reuse |
|---|---|---|
| **OVOBench and StreamingBench** | In the reviewed OneStreamer experiments, answering about the past and updating streaming memory | TTFT with prepared captions and memory update time belong to different experiments. One use in OneStreamer is insufficient to establish broad independent reuse. [Source](https://arxiv.org/pdf/2610.01762v1) |
| **RVS-Ego** | Answers from retained recent history, with quality, latency, and cache size evaluated in ReKV | Latency is measured on precomputed frames and fixed-length answers. Independent reuse has not been established here. [Source](https://arxiv.org/pdf/2503.00540v1) |
| **ProactEgoMem** | A timely notification or starting, maintaining, and stopping a memory tool | Replay with a query every second, not measurement of a complete wearable pipeline. Independent reuse has not been established. [Source](https://arxiv.org/pdf/2610.30089v2) |
| **StreamArena** | Reactive and proactive tasks, including queries about the past and event monitoring | Reactive replay pauses the video while an answer is generated. Independent reuse has not been established. [Source](https://arxiv.org/pdf/2608.05703v1) |
| **Qualcomm Interactive Cooking** | Instruction completion, the next step, and errors in streaming and turn-based settings | Replay does not test how a person responds to advice. Independent reuse has not been established. [Source](https://arxiv.org/pdf/2511.21998v2) |
| **GuideMe** | Next-step instruction, completion feedback, error detection, and corrective guidance | The main protocol uses anchor sampling and GT history. Independent reuse has not been established. [Source](https://arxiv.org/pdf/2607.02991v1) |
| **CaptainCook4D and Assembly101 in MistExit** | An error decision after partial observation of an already segmented step | Observation ratio is not latency from onset. Other methods in [Chapter 6](/chapters/procedures/#chapter-6) also use the data, but this specific early-exit protocol differs. [Source](https://arxiv.org/pdf/2603.14252v1) |
| **EgoSafetyBench** | The first alert relative to the appearance of a decisive cue, with safe counterexamples | Short synthetic robot-view clips and a small real-video evaluation. Independent reuse has not been established. [Source](https://arxiv.org/pdf/2607.00218v2) |
| **StreamForest throughput protocol** | Bounded visual memory serving multiple questions | Single-token answers in Appendix H do not establish the speed of substantive dialogue. [Source](https://arxiv.org/pdf/2509.24871v1) |
| **APM-Bench** | Cross-session memory and the timing of assistance based on the available past | A simulated stream is used. The detailed formulation is in [Chapter 2](/chapters/archive/#chapter-2). [Source](https://arxiv.org/pdf/2609.37559v2) |

The inclusion of multiple models in the original paper does not count as independent benchmark reuse. Both task quality and frame-arrival conditions matter here: video may continue during an answer, pause, or arrive only at preselected moments. These settings cannot be compared using a single latency metric.

#### ProactEgoMem, 2026: memory quality begins when recording starts

**A key benchmark for the proactive component.** If the model did not start retaining the inspection before the wall was closed, even perfect subsequent retrieval cannot recover the missing evidence. ProactEgoMem distinguishes information capture, state tracking, and location tracking. At notification level, a timely message is sufficient. At intervention level, the system must start a memory tool, maintain recording, and stop it correctly. [Paper](https://arxiv.org/abs/2610.30089v2), [project](https://proactegomem.github.io/), [code](https://github.com/mayhugotong/ProactEgoMem).

![ProactEgoMem: proactive memory protocol](/media/assets/pdf-audit-proactegomem.png)

*The figure shows the design of the ProactEgoMem benchmark, not a model architecture. Liao et al., arXiv:2610.30089v2, Fig. 2, PDF p. 2. Notification requires a timely message, while Intervention requires starting, maintaining, and stopping a memory tool. Three task groups test the retention of information, state, and object location.*

The Daily track contains 300 clips, 16 hours, and 1,000 questions. The Sci track contains 100 laboratory clips and 6.47 hours. Streaming is simulated by querying every second with the latest ten frames at 1 fps, the state of active tools, and the five most recent records. The comparisons use no memory, predicted memory, and oracle memory. Oracle memory exceeds actually created memory by at least 20 percentage points in **34 of 36** valid model–task combinations. The bottleneck therefore often lies in deciding “what to record and when,” rather than in the final answer. [PDF, p. 6, Table 3 and §5.2, p. 8, §5.4 and Fig. 6](https://arxiv.org/pdf/2610.30089v2).

This measures timing within a simulated protocol, not the physical latency of a wearable pipeline. Errors include late starts, fragmentation, and tools left running. For Aligned, an analogous test should evaluate evidence capture before occlusion, stable assembly identity, and timely issue updates after corrective action.

#### GuideMe: four different kinds of assistance

**GuideMe, ECCV 2026.** The work evaluates procedural assistance on 2 458 videos and 47 775 interactions. Its taxonomy is particularly useful: next-step instruction, completion feedback, error detection, and corrective guidance. It prevents a good account of the next step from being confused with detection of a current error. However, the baseline protocol uses queries tied to annotated intervention moments, balanced silent examples, and **ground-truth dialogue history**. This makes the conditions substantially easier than continuous autonomous operation. [Wiki](/notes/2026-liu-guideme/), [PDF, §§3.2–3.5, pp. 6–10](https://arxiv.org/pdf/2607.02991v1#page=6).

After SFT, Qwen3-VL-8B soft F1 increases from 35.7 to 39.7 and false alarms fall from 37.7 to 24.5, but no-response rises from 6.7 to 20.6. More silent behavior is both less intrusive and less complete. In a separate ablation on 100 videos, replacing GT history with the model's own responses lowers Doubao soft F1 from 36.9 to 20.0. The PDF's no-GT ablation still retains anchor-based sampling. These numbers cannot be presented as the quality of fully autonomous continuous coaching. [PDF, Table 2, p. 11, Table 4 and §4.4, p. 14](https://arxiv.org/pdf/2607.02991v1#page=14).

![GuideMe: source annotations and generation of procedural knowledge and dialogues](/media/assets/expansion-problems/guideme.png)

*Original Figure 2, PDF p. 6. This is the benchmark construction pipeline, not evidence of actual closed-loop interaction with a person.*

#### EgoSafetyBench: alerts relative to the appearance of evidence

**EgoSafetyBench, preprint 2026.** It is most useful as an alert-evaluation design: safe but apparently suspicious cases are separated from contextual hazards. A decisive visible cue changes within 1 200 synthetic five-second robot-view clips. The model sees the current chunk or a short causal history. The first alert is evaluated relative to onset, with overly early responses counted separately. The best caught rate with a 0.5-second tolerance is 53.5%, even when overall clip classification looks substantially better. [Wiki](/notes/2026-panpatil-egosafetybench/), [PDF, §§3–4 and Table 5, pp. 3–7](https://arxiv.org/pdf/2607.00218v2#page=7).

Aligned should adopt contrastive safe controls, accounting for early/late alerts, and separate tests of misleading visible text. The limitation is fundamental: the decisive cue is visible by design, the horizon is short, and the real-video evaluation includes only 20 clips. The work does not establish the ability to detect an invisible error on a construction site.

![EgoSafetyBench: scenario creation, filtering, rendering, annotation, and evaluation](/media/assets/expansion-problems/egosafetybench.png)

*Original Figure 2, PDF p. 4. The synthetic benchmark pipeline.*

#### StreamArena and Qualcomm Interactive Cooking: the interaction protocol

StreamArena separates reactive and proactive tasks. Its reactive replay pauses video time during an answer, so query latency does not include a continuing arrival of frames. StreamMind below illustrates one possible system for this benchmark. [PDF, Appendix C.5](https://arxiv.org/pdf/2608.05703v1).

Qualcomm Interactive Cooking evaluates instruction completion, issuing the next step, and warning about an error. The streaming main set and turn-based protocol produce different results. Matching an alert to an annotation allows a 30-second window, and the recorded person does not respond to the model's recommendations. This test therefore evaluates assistance generation during replay, not error prevention. LiveMamba and its results are discussed below. [PDF, §5.1, Tables 4–5](https://arxiv.org/pdf/2511.21998v2#page=7).

### Foundations and key methods

#### Maintaining history during a stream

First, consider what remains accessible after a frame leaves the recent window. KV-cache, compressed visual tokens, and textual observations have different costs and losses. These methods are not successive versions of a single architecture.

##### ReKV: reusing internal representations

**[ReKV](/notes/2025-di-rekv/)** addresses repeated reading: it retains video-stream attention keys/values in RAM or on disk and returns relevant blocks to the context. Internal retrieval uses the model's already computed key and query representations, while external retrieval uses a separate visual–text matching mechanism. This is an interesting option for recent history when response latency matters more than representation portability. [PDF v1, §3, Figure 2, p. 4](https://arxiv.org/pdf/2503.00540v1#page=4).

For LLaVA-OV-7B with internal retrieval, Table 5 reports 63.7% on RVS-Ego, 3.3 seconds to complete an answer, and 18.8 GB of cache per hour. Speed is measured on pre-extracted frames at 0.5 fps, fixed-size questions, and answers of 128 tokens. This is neither a universal production-dialogue latency nor a measurement of video decoding. The total cache grows with the recording and depends on the model. For multiweek histories of all workers, that volume needs a separate calculation. Unlike textual observations and original clips, KV-cache is difficult to inspect and transfer between model versions. [PDF, §4.5, Table 5, p. 8](https://arxiv.org/pdf/2503.00540v1#page=8).

![ReKV architecture](/media/assets/expansion-memory/rekv-architecture.png)

*Original Figure 2, p. 4: streaming encoding, storage, and retrieval of KV-cache.*

##### StreamForest: a detailed window and compressed history

**StreamForest**, Zeng et al., NeurIPS 2025, retains a recent window with detailed features and gradually moves older observations into event trees. When the token budget is exceeded, neighboring nodes are merged based on similarity, age, and the number of previous merges. A question is supplied alongside the tree roots and recent window (§3.1). [Paper note](/notes/2025-zeng-streamforest/), [PDF](https://arxiv.org/pdf/2509.24871v1).

![StreamForest: a detailed window and compressed event memory](/media/assets/expansion-crosscut/streamforest-fig2.png)

*Original Fig. 2, PDF p. 4. History is bounded by the number of visual tokens. This design does not guarantee retention of the original video or preservation of evidence for every event.*

This is a useful baseline for recent memory, but not a replacement for a long-term archive. Appendix I acknowledges that minima in inter-frame similarity reflect coarse scene changes and may miss semantic boundaries. Appendix H measures multiround throughput with **single-token answers**, so those FPS figures cannot be presented as ordinary dialogue latency. Aligned's evaluation must continue accepting frames while generating substantive answers, measuring backlog and retention of brief defects.

##### OneStreamer, 2026: fresh visual tokens alongside recorded history

OneStreamer combines current frames, textual memory, and a decision about when to respond. Recent frames remain in a FIFO window, while the model writes timestamped `Observe` and `Summary` entries as the stream proceeds. These survive after the original frames leave the window. For proactive behavior, the model generates the states `Silence`, `Standby`, and `Response`. Selective training on state transitions reduces the dominance of constant silence in the training sequence. This is fine-tuning of Qwen3-VL-4B, not a simple instruction to a general-purpose LLM. [Paper](https://arxiv.org/abs/2610.01762v1), [project](https://mcg-nju.github.io/OneStreamer/), [code](https://github.com/MCG-NJU/OneStreamer).

With the same checkpoint and recent-16-frame window, caption memory raises backward ASI on OVOBench from **63.5 to 71.6**. This is a useful ablation specifically of memory. However, **0.124 s TTFT** is measured for an answer on a single 360-second OVOBench example on an H200 with precomputed captions. It is not the cost of writing memory. A separate small online test on StreamingBench gives approximately **0.636 s per memory update**, including decoding and inference. [PDF, p. 8, Table 2, p. 9, Table 4, p. 26, Table 19](https://arxiv.org/pdf/2610.01762v1).

Our conclusion: OneStreamer explains how to organize “what I see now / what I remember from before / when to respond.” For Aligned, it needs an external index and access to originals. If a caption did not retain the fastener type, that text-only historical path cannot recover it. The paper does not resolve text accumulation across shifts or the quality of construction notifications. Public weight availability should be checked before reproduction, as a repository alone does not establish it.

##### StreamMind: moving expensive memory work out of the fast response path

**Zhang et al., 2026.** StreamMind, a baseline for StreamArena, separates a fast front end from background memory processing. A Front Worker answers from fresh context or delegates retrieval to the backend. A separate Monitor Worker watches for a predefined event. A Memory Writer maintains an event hierarchy and entity graph. This resembles the division of responsibilities between chat and the proactive component in Aligned. [PDF, §2.2, Fig. 2](https://arxiv.org/pdf/2608.05703v1).

![StreamMind: interface, monitoring, and background memory](/media/assets/expansion-existing/2026-zhang-streamarena.png)

*Original Fig. 2, PDF p. 5. Fast responses, event monitoring, and retrieval of older information have separate workers.*

There is a substantial limit to the evidence: reactive replay pauses video time during an answer (Appendix C.5), and query latency excludes previously completed background processing. In a comparison using the same backbone, lower latency comes with lower accuracy, so the architecture offers a trade-off rather than free acceleration. For Aligned, the test must be repeated with continuous input during responses, accounting for backlog, missed events, and background update costs.

#### Deciding whether to intervene

Memory determines what information is available. The next choice is whether it is sufficient to report completion or an error, and whether observation should continue.

##### LiveMamba: step completion, errors, and the next step

**LiveMamba / Qualcomm Interactive Cooking, NeurIPS 2025.** This work comes closer than many VideoQA systems to the required assistant behavior: observing continuously, identifying completion, issuing the next step, and warning about an error. InternViT and Q-Former compress video into tokens for Mamba-130M, while a separate Qwen3-32B replans the process when needed. The entire assistant cannot be treated as having only 130M parameters. [Wiki](/notes/2025-bhattacharyya-livemamba/), [PDF, §4, pp. 5–7](https://arxiv.org/pdf/2511.21998v2#page=5).

On the streaming main set, instruction-completion accuracy is 31.5%, and error precision/recall/F1 is 0.17/0.10/0.13. The values 51.0% and F1 0.19 belong to a separate turn-based protocol. The main text disagrees with the table on F1, so the figures from Table 4 are used here. Alert matching uses a 30-second window around the annotated moment, which is not equivalent to a short delay after the error appears. The recorded person does not change their behavior in response to the model: the evaluation measures hint generation during playback, not error prevention or successful correction. [PDF, §5.1 and Tables 4–5, pp. 7–8](https://arxiv.org/pdf/2511.21998v2#page=8).

![LiveMamba: streaming vision, Q-Former, recurrent backbone, and a separate replanner](/media/assets/expansion-problems/livemamba.png)

*Original Figure 2, PDF p. 5.*

##### MistExit: observing further or making a decision

**MistExit, preprint 2026.** Its distinctive idea is to learn not only error recognition but also the decision to “keep observing or stop the analysis.” A detector predicts correctness and future features, after which a GRU actor–critic trained with PPO chooses when to exit. However, the video is already divided into keystep clips. Known step boundaries are explicitly stipulated in the footnote to §3. [Wiki](/notes/2026-majumder-mistexit/), [PDF, §§3–4, pp. 5–9](https://arxiv.org/pdf/2603.14252v1#page=5).

On CaptainCook4D, AP is 57.4 after observing 3.0% of the clip. On Assembly101, it is 57.0 at 9.2%. Observation ratio is normalized by the length of a pre-segmented step and is not latency relative to the observable onset of an error. In Assembly101, corrective actions are merged into the mistake class. The work is therefore useful as a method for managing computation and deferring decisions, but not as a ready-made violation-onset detector or evidence of recognizing successful repair. [PDF, §5.1, p. 10, Figure 3, p. 12](https://arxiv.org/pdf/2603.14252v1#page=12).

![MistExit: a detector with feature prediction and a learned exit policy](/media/assets/expansion-problems/mistexit.png)

*Original Figure 2, PDF p. 6. Future features are predicted, not read from future frames at inference.*

### How the approaches differ

ReKV reuses a model's internal representations, StreamForest bounds the visual context, OneStreamer retains textual history alongside current frames, and StreamMind separates fast responses, monitoring, and background memory. These are alternative ways to maintain accessible information. LiveMamba and MistExit separately address when to report completion, an error, or sufficient observation. ProactEgoMem evaluates an even earlier decision: when to start retaining the required evidence at all. Memory, diagnostic decisions, and intervention policies are therefore evaluated separately, even when implemented by one model.
