<div>
<a id="chapter-2"></a>
</div>

The question “What happened to this panel yesterday?” requires more than a model that understands a supplied clip. The system must make recordings searchable, find the relevant episodes, recover enough context, and return to the source when descriptions omit a decisive detail. Repeating that process for many questions also requires memory that can be reused without reading the entire archive again.

This chapter follows those decisions: construct reusable memory → retrieve an episode → inspect additional evidence → combine events across a long history → handle repetitions and compound queries → account for processing cost. The examples concern Aligned’s multi-day construction archive. Establishing that observations show the same physical object or work instance is the separate problem of [Chapter 3](/chapters/observations/#chapter-3), while claim-level support and abstention are developed in [Chapter 4](/chapters/evidence/#chapter-4).

<div>
<a id="benchmarks-and-evaluation-protocols-a-map-of-the-tasks"></a>
<a id="table-1"></a>
<a id="table-1-row-1"></a>
<a id="table-1-row-2"></a>
<a id="table-1-row-3"></a>
<a id="table-1-row-4"></a>
<a id="table-1-row-5"></a>
<a id="table-1-row-6"></a>
<a id="table-1-row-7"></a>
<a id="table-1-row-8"></a>
<a id="table-1-row-9"></a>
<a id="table-1-row-10"></a>
<a id="table-1-row-11"></a>
<a id="table-1-row-12"></a>
<a id="table-1-row-13"></a>
<a id="table-1-row-14"></a>
<a id="table-1-row-15"></a>
<a id="table-1-row-16"></a>
<a id="table-1-row-17"></a>
</div>

### 2.1. Build memory before the question arrives

A useful starting system stores short episodes with timestamps, descriptions, speech where available, visual features, and links to the source. A question searches these records, after which a reader examines selected evidence. The central choice is how much information to extract once during ingestion and how much to reconstruct for each question.

#### LLoVi: an early caption-first baseline

**LLoVi, Zhang et al., EMNLP 2024**, converts short video segments into descriptions and lets an LLM answer through those descriptions and intermediate summaries. It is a useful historical baseline for understanding the separation between visual perception and language reasoning, but its selected-video QA setting leaves archive retrieval and repeated-query cost largely outside the experiment. For Aligned, the enduring lesson is the information bottleneck: a detail omitted by the captioner is unavailable to an answerer that sees only text. [Paper, §3](https://aclanthology.org/2024.emnlp-main.1209/).

<div>
<a id="two-different-videoagents-active-reading-and-reusable-memory"></a>
<a id="table-2"></a>
<a id="table-2-row-1"></a>
<a id="table-2-row-2"></a>
</div>

#### VideoAgent (Fan): reusable temporal and object memory

**Fan’s VideoAgent, ECCV 2024**, makes the memory-and-tools architecture explicit. Two-second segments receive captions and retrieval features. A separate object memory stores tracked appearances, visual features, identifiers, and occurrence intervals in SQL. Given a question, GPT-4 can read captions, locate a segment, ask a video model about a short interval, or query object appearances. The results guide subsequent tool calls. [PDF, §2, Figure 2](https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/03241.pdf).

![VideoAgent: reusable temporal and object memory with query-time tools](/media/assets/2024-fan-videoagent-figure2.png)

*Original Figure 2, PDF p. 4. Memory construction precedes the agent’s retrieval and visual-reading tools.*

This remains useful despite the age of its backbones because it separates reusable indexing from question-dependent inspection. Removing object memory reduces accuracy from 71.3% to 62.7% in the 150-question NExT-QA ablation, Table 6. This is evidence for that component under the stated protocol. It does not establish that object identities remain reliable across workers or shifts. For Aligned, the temporal memory and tool interface are architectural references, while physical-object association belongs to the checks in Chapter 3.

<div>
<a id="merit-versus-emmem-where-to-perform-semantic-integration"></a>
</div>

#### MERIT: several keys per episode, context when needed

**MERIT, Choi et al., ECCV 2026**, is a strong starting point for Aligned because it keeps the initial memory simple. Each 30-second episode receives event, object, and summary keys, plus a dialogue key when speech is available. A question may match any key. After retrieval, neighboring captions supply the context needed to interpret the episode. The search loop operates on text, with selected frames entering the final answer call. [PDF, §3, Appendix A](https://arxiv.org/pdf/2608.07663v2).

![MERIT: multi-key episodes and question-dependent temporal expansion](/media/assets/2026-choi-merit-figure2.png)

*Original Figure 2, PDF p. 6. Multiple retrieval keys preserve different entry points into the same episode.*

Consider “Pedro picked up a spirit level, checked the panel, and called Alex.” An action key can match a question about checking alignment even when a generic summary emphasizes the call. Neighboring episodes may identify which panel was involved. This is our construction example of the mechanism. It makes the memory inspectable and postpones much contextual synthesis until the question is known.

With GPT-5, MERIT reports 71.2% on 500 EgoLifeQA questions, but its retrieval hit rate is 0.56, Table 5. WorldMM’s reproduced hit rate is 0.53 under a different temporal-window budget, so the two values are not an equal-budget retrieval ranking. The construction-cost comparison excludes shared dense captioning. For Aligned, MERIT is therefore a baseline to test with automatic captions and fixed evidence budgets before paying for more elaborate memory.

#### CapMem: reusable caption memory

**CapMem, Liang et al., EMNLP Industry 2026**, asks a useful prior question: how much can stored descriptions accomplish when the source frames and models are controlled? Its 75-video evaluation compares direct visual answering with descriptions of 30- or 60-second windows reused for subsequent questions. After aligning frame coverage, the mean gains on videos longer than 20 minutes are 3.22 and 2.55 percentage points across six Qwen models. This supports measuring a simple text-memory baseline before attributing improvements to graphs or agents. [PDF, Tables 4–6](https://aclanthology.org/2026.emnlp-industry.233.pdf#page=6).

The paper’s additional retrieve-and-verify policy was chosen after examining errors on the same evaluation set, Appendix D. Its gains need an independent test. The more useful contribution here is the controlled comparison and the distinction between viewing once and answering repeatedly. Aligned should test what captions preserve about object names, negations, brief errors, and outcomes, then measure the total cost of ingestion plus a realistic series of questions.

<div>
<a id="21-find-the-relevant-recording-and-time-interval"></a>
<a id="first-distinguish-tasks-often-grouped-under-the-term-video-qa"></a>
<a id="сначала-разделим-задачи-которые-часто-называют-одним-словом-video-qa"></a>
<a id="tvr-and-v-ragbench-two-different-retrieval-scales"></a>
<a id="tvr-и-v-ragbench-два-разных-масштаба-поиска"></a>
<a id="task-2-1"></a>
</div>

### 2.2. Find the recording and the evidence

A memory index must answer two different questions: which recording contains the event, and which interval inside it is relevant? An experiment that receives the correct long video in advance tests only the latter part. Text and visual retrieval can supply complementary candidates, while reranking spends more computation on a smaller set.

<div>
<a id="xml-an-early-reference-for-corpus-localization"></a>
</div>

#### TVR / XML: a historical corpus-localization reference

**TVR and its XML baseline, Lei et al., ECCV 2020**, separate video retrieval from temporal localization over 109 thousand queries and 21.8 thousand television clips. XML precomputes video/subtitle representations, retrieves candidate recordings, and predicts interval boundaries. This remains a useful task decomposition, although its original features and television setting are not a preferred Aligned implementation. Use it to understand corpus-level evaluation, with modern candidate retrieval tested separately from localization. [PDF v2, §§3–5](https://arxiv.org/pdf/2001.09099#page=5).

#### EventFormer: an event index before precise localization

**EventFormer, Hou et al.**, groups temporal features into events, retrieves ten recordings through a compact index, then applies a query-dependent localizer. The inspected 2024 preprint reports 31 MB of retrieval representations and 43 ms retrieval in its TVR setup, excluding ingestion and adding a separate localization stage. Its event-level index is worth comparing with fixed-window embeddings, but supervised localization and the television benchmarks limit direct transfer, and the final ECIR 2026 tables were not rechecked. [Preprint, §3, Table 8](https://arxiv.org/pdf/2402.13566v1#page=9).

<div>
<a id="carve-retrieving-and-selecting-different-forms-of-evidence"></a>
</div>

#### CARVE and V-RAGBench: choose the useful representation of each chunk

**CARVE, Lee et al., 2026 preprint**, addresses a more immediate retrieval choice: the same episode can be represented by frames, clip features, frame descriptions, or a clip summary. It searches all four representations, preserves each candidate’s retrieval configuration, and reranks candidates with a multimodal model. The generator receives the top five chunks in their selected visual or textual forms. A visually distinctive fastening detail and a semantically specific conversation need not use the same representation. [PDF v2, §§3, 5](https://arxiv.org/pdf/2606.13141v2).

The accompanying **V-RAGBench** pairs questions with evidence chunks and answers, allowing retrieval to be evaluated separately from generation. On 300 test questions, CARVE achieves Recall@5 of 0.603 versus 0.510 for the strongest baseline on that metric, Table 2. This is useful evidence for mixed retrieval and reranking under a shared experimental setup, rather than a comparison of unrelated published QA scores.

The source long video is already selected, and benchmark construction removes ambiguous recurring evidence. Those choices help isolate retrieval errors but omit two central Aligned difficulties: choosing among recordings and distinguishing repeated installations. CARVE is therefore a candidate retrieval component. Its evaluation design needs additional repeated-event and corpus-search tests before it becomes an archive baseline.

<div>
<a id="wikihowqa-and-longervideos-answers-over-a-collection"></a>
<a id="videorag-jeong-et-al-findings-of-acl-2025-arxiv250105874"></a>
</div>

#### VideoRAG (Jeong): retrieve an instructional video first

**VideoRAG, Jeong et al., Findings of ACL 2025**, retrieves videos from HowTo100M for instructional questions and supplies selected frames, optionally with transcripts, to an answer generator. This demonstrates video-corpus RAG, but “how should I perform this action?” differs from reconstructing what a particular worker did yesterday. Keep it as a corpus-retrieval reference: its ROUGE-L evaluation of instructions does not measure event boundaries, object identity, or completeness of a worker’s history. [PDF, §§2–3](https://aclanthology.org/2025.findings-acl.1096.pdf).

<div>
<a id="video-rag-luo-et-al-neurips-2025-arxiv241113093"></a>
</div>

#### Video-RAG (Luo): add speech, visible text, and object evidence

**Video-RAG, Luo et al., NeurIPS 2025**, retrieves question-relevant ASR, OCR, and detected-object information to accompany frames from an already selected video. With LongVA-7B, accuracy rises from 56.0% with subtitles to 62.0% with Video-RAG, Table 1. This makes auxiliary modalities useful to test when reading retrieved footage, but the method does not select recordings from a site archive. Spoken claims such as “I secured everything” must retain their provenance as speech rather than becoming visual confirmation of the work. [PDF, §3, Table 1](https://arxiv.org/pdf/2411.13093v4).

### 2.3. Inspect more evidence when the first retrieval is insufficient

A limited retrieval set can miss a small visual detail or the beginning of a longer operation. The reader can then refine the time interval, search again, or inspect source frames. This introduces a stopping decision: additional inspection should resolve an uncertainty rather than repeatedly retrieve similar material.

#### VideoAgent (Wang): active frame selection

**Wang’s VideoAgent, ECCV 2024**, uses an LLM to iteratively request useful frames and assemble evidence for a question. It is distinct from Fan’s VideoAgent: its main value here is active reading, while Fan explicitly builds reusable temporal and object memory. For Aligned, it is a historical reference for adaptive inspection of selected footage. The reported small number of frames used for answering excludes upstream feature extraction and retrieval costs. [PDF, §3, Tables 1–3](https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/10325.pdf).

#### VideoTree: describing regions of interest

**VideoTree, Wang et al., CVPR 2025**, clusters visual features, describes representatives, and deepens the hierarchy where the current question requires more detail. It is useful for selectively reading an already retrieved shift or episode, but its question-dependent tree is not persistent archive memory. Building such a reader for each question still requires source features, and its long-video QA results do not test cross-shift event retrieval. [PDF, §3](https://openaccess.thecvf.com/content/CVPR2025/papers/Wang_VideoTree_Adaptive_Tree-based_Video_Representation_for_LLM_Reasoning_on_Long_CVPR_2025_paper.pdf).

<div>
<a id="mm-ego-ye-et-al-iclr-2025-an-overview-first-detailed-frames-next"></a>
<a id="paper-2025-ye-mm-ego"></a>
</div>

#### MM-Ego: an overview before detailed frames

**MM-Ego, Ye et al., ICLR 2025**, scans compressed representations of up to 300 frames and learns to select 32 for detailed reading. The mechanism is a possible local reader, although its gains combine specialized egocentric training with learned selection and its global scan remains part of the cost. Its selected-video results do not establish persistent archive retrieval or an equal-budget selection benefit over uniformly sampled frames. [PDF, §2.2, Tables 3–5](https://arxiv.org/pdf/2410.07177v2#page=8).

#### MovieChat: compressing visual context

**MovieChat, Song et al., CVPR 2024**, compresses visual tokens into short- and long-term memory inside the video model. It is a historical reference for fitting a selected sequence into limited GPU memory, with a different role from an external index that serves many future questions. For Aligned, preserving a long input in compressed form still needs separate tests of fine-detail retention and archive search. [Paper](https://openaccess.thecvf.com/content/CVPR2024/papers/Song_MovieChat_From_Dense_Token_to_Sparse_Memory_for_Long_Video_CVPR_2024_paper.pdf).

<div>
<a id="caption-once-frames-on-demand-checking-pixels-only-when-necessary"></a>
</div>

#### CFD: checking pixels only when necessary

**Caption-once, Frames-on-Demand, Cai et al., EMNLP 2026**, stores a storyline and clip captions, then routes questions to additional descriptions or source frames when visual information is needed. In its controlled routing ablation, online frames fall from 6.63 to 5.76 per question while Video-MME accuracy changes from 67.2% to 67.5%, Table 9. This is a useful selective-inspection policy, but it excludes offline captioning and does not establish low latency. The authors also identify shot-boundary segmentation as a limitation for continuous egocentric footage, making event preparation a prerequisite for transfer. [PDF, §2, Table 9, Appendix E](https://arxiv.org/pdf/2609.11899v1).

<div>
<a id="hpp-rauf-et-al-emnlp-2026-an-agent-programs-its-evidence-search"></a>
<a id="paper-2026-rauf-hpp"></a>
</div>

#### HPP: programmatic evidence search

**HPP, Rauf et al., EMNLP 2026**, lets an LLM write programs that search video, retain intermediate results, merge intervals, and inspect selected clips. On a controlled 150-question comparison, code execution improves accuracy from 56.7% to 66.7% over ordinary tool calling with the same models, tools, subtitle access, and iteration budget, Table 4. This is relevant if Aligned’s queries require repeated searches and explicit aggregation, but the evaluated system reads selected recordings and averages roughly 100 seconds per question. Treat it as an optional agent interface to compare after establishing basic retrieval, with the inspected paper/code differences recorded in the full paper note. [PDF, §3, Tables 4–5](https://aclanthology.org/2026.emnlp-main.2377.pdf#page=8).

<div>
<a id="ego-r1-bench-questions-for-agentic-search"></a>
<a id="ego-r1-training-a-controller-to-seek-additional-evidence"></a>
<a id="ego-r1-научить-контроллер-искать-дополнительные-доказательства"></a>
</div>

#### Ego-R1: learning when to search and look again

**Ego-R1, Tian et al.**, trains a controller to choose among hierarchical text search, time-range refinement, video questions, and individual-frame inspection. Supervised tool-use traces provide the initial policy, followed by GRPO for final-answer correctness. The contribution for Aligned is a learned evidence-search strategy, with a useful distinction from simply prompting an agent to keep searching. [Inspected 2025 preprint v1, §§3–5](https://arxiv.org/pdf/2506.13654v1).

![Ego-R1: memory search, video questions, and frame inspection](/media/assets/pdf-audit-ego-r1-figure1.png)

*Original Figure 1, PDF p. 1. A controller selects tools rather than receiving the whole recording in one context.*

On the 300-question Ego-R1 Bench, controller accuracy rises from 34.3% after SFT to 46.0% after RL, Table 3. Training and testing use the same EgoLife week, so this does not establish transfer to an unseen site. The controller’s 3B parameter count also excludes its visual and context-processing tools. It is a meaningful later-stage experiment once Aligned has reliable tools and successful search traces. Controller training should follow a measured retrieval bottleneck.

#### Benchmarks for reading a selected video

**EgoSchema** tests multiple-choice understanding of approximately three-minute egocentric clips and is used by several readers above. It is useful as a local-reading check, but the correct clip is supplied, so its accuracy should not decide which archive memory to adopt. [Original paper](https://arxiv.org/pdf/2308.09126v1).

**LongVideoBench** evaluates referring reasoning over supplied videos with interleaved video and subtitle inputs. It can test the reader after retrieval, provided subtitle access and frame budgets are matched. It is a different benchmark from LVBench, which appears in MERIT and WorldMM. [Original paper, §§2–4](https://arxiv.org/pdf/2407.15754v1).

**Video-MME** covers short, medium, and long supplied videos, with audio/subtitle conditions that matter when comparing readers. It provides a broad comprehension check, but neither a high total score nor the long split measures recall across a multi-camera archive. [Original paper](https://arxiv.org/abs/2405.21075v3).

<div>
<a id="23-answer-a-question-over-a-long-history"></a>
<a id="task-2-3"></a>
</div>

### 2.4. Combine evidence across a long history

“Why was the panel reworked?” may require the original installation, the discovery of a defect, and the subsequent correction. A longer context window does not ensure that all these episodes will be found. The relevant design choice is whether to reconstruct their relationships after retrieval or store some relationships in advance.

<div>
<a id="egolifeqa-from-a-clip-to-a-week-of-memory"></a>
<a id="egobutler--egorag-a-multi-day-memory-baseline"></a>
<a id="egobutler--egorag-baseline-многодневной-памяти"></a>
</div>

#### EgoLife / EgoButler: a multi-day reference setting

**EgoLife, Yang et al., CVPR 2025**, provides a useful early setting for this problem: six participants recorded over a shared week, with 266 retained camera-hours. EgoLifeQA contains 3,000 questions, while the main published EgoButler evaluation uses Jake’s 500-question subset. EgoGPT creates audiovisual captions; EgoRAG retrieves descriptions, revisits selected clips, and supplies evidence to an answer model. The main experiment uses three retrieved clips, a concrete baseline for multi-day retrieval. [PDF, §§3–5](https://arxiv.org/pdf/2503.03803v3).

MERIT, EGAgent, WorldMM, and EM²Mem reuse this environment, which helps compare designs but concentrates evidence on one domestic week. Different captions, readers, and retrieval budgets also prevent a simple leaderboard from identifying the best memory architecture. For Aligned, this is a reference protocol to adapt to repeated work across shifts, with automatic perception and unseen locations evaluated explicitly.

<div>
<a id="egomemreason--a-week-of-video-does-not-yet-mean-a-week-of-reasoning"></a>
</div>

#### EgoMemReason: test whether several episodes are actually needed

**EgoMemReason, Wang et al., COLM 2026**, is particularly useful for deciding whether long-history reasoning is being tested at all. Its 500 questions require an average of 5.1 evidence segments and 25.9 hours of backtracking. Supplying oracle evidence raises Gemini-3-Flash accuracy from 39.6% to 67.2%, separating difficulty in finding the necessary material from difficulty reasoning over it. [PDF, §3.3, Table 1, Appendix C.3](https://arxiv.org/abs/2605.09874v2).

This benchmark uses EgoLife again, and the full-video/oracle comparison changes evidence input rather than isolating one retriever. Its transferable contribution is the diagnostic: manually deliver all required clips, then compare the reader’s answer with the result under ordinary retrieval. The same test can reveal whether a failed repair-history answer needs a better index or better interpretation.

<div>
<a id="apm-bench-and-egomonth-cross-session-memory-and-long-histories"></a>
</div>

#### APM-Bench: memory across interrupted sessions

**APM-Bench, Huang et al., 2026**, compares stored video, text summaries, and specialized memory over prerecorded activities with simulated streaming access across sessions. It is useful for testing shift breaks and missing historical evidence, but proposes an evaluation protocol rather than a new memory architecture. Its cross-session and proactive-response tests should supplement archive QA when interruption handling becomes a measured requirement. [PDF v2, §§3–4](https://arxiv.org/pdf/2609.37559v2).

#### EgoMonth: a longer calendar span

**EgoMonth, Chen et al., 2026**, extends evaluation to recordings spread across 20–120 calendar days, with questions about episodes, repetitions, and relationships. This supplies useful question types for across-shift testing, although the calendar span does not mean uninterrupted recording and multiple-choice counting does not measure event-list completeness. It should inform Aligned’s evaluator rather than select a memory architecture from models with unequal frame budgets. [PDF, §§3–4](https://arxiv.org/pdf/2608.13113v1).

#### EGAgent: explicit temporal relationships

**EGAgent, Rege et al., ACL 2026**, stores people, objects, and places with relationships such as interaction and conversation, each tied to time intervals. An agent can query this structure through SQL alongside frame and transcript search. “Who repeatedly helped Pedro with the tool?” then becomes a search over relationships as well as similar captions. [PDF, §3](https://arxiv.org/pdf/2601.18157v3).

The controlled GPT-4.1 comparison improves EgoLifeQA accuracy from 48.6% without the entity graph to 50.7% with it, Table 1. Its 169-second average answering time and use of manually diarized EgoLife transcripts constrain immediate transfer. The practical idea is a queryable temporal relation store; Aligned should add it when relation-heavy questions expose a failure of simpler episode retrieval. Correctly identifying the people and physical objects remains a prerequisite, developed in Chapter 3.

<div>
<a id="graph-memory-egagent-and-worldmm"></a>
</div>

#### WorldMM: choose between event, semantic, and visual memory

**WorldMM, Yeo et al., CVPR 2026**, separates episodic graphs at several timescales, semantic relationships and habits, and visual features with source frames. A retrieval agent chooses which memory to query and accumulates evidence for a separate answer model. This is useful when a question combines a precise episode with a recurring relationship or a detail omitted by text. [PDF, §3](https://arxiv.org/pdf/2512.02425v2).

![WorldMM: complementary memories selected by a retrieval agent](/media/assets/pdf-audit-worldmm-figure2.png)

*Original Figure 2, PDF p. 3. Episodic, semantic, and visual evidence remain separate retrieval options.*

Replacing episodic graph retrieval with embedding retrieval lowers EgoLifeQA accuracy from 56.4% to 52.0% with the 8B solver, Table 4. This supports the graph component within that system. It does not show that every Aligned query needs three memory stores, and the latency analysis excludes a full accounting of video ingestion. Compare the added structure against MERIT under the same captions, reader, and evidence budget. A semantic node about “panels” cannot substitute for identifying a particular panel.

<div>
<a id="videorag-ren-et-al-arxiv250201549-2025-preprint"></a>
</div>

#### VideoRAG (Ren): graph and visual retrieval across videos

**Ren et al.’s VideoRAG** combines a cross-video textual knowledge graph with visual segment retrieval and question-specific re-description of candidates. Its LongerVideos evaluation covers collections of lectures, documentaries, and entertainment, making it a useful multi-video reference with weaker domain alignment than the egocentric studies above. The inspected 2025 preprint’s answer-preference results do not measure complete event retrieval, and semantic links across videos do not establish physical-object identity. [Preprint, §§3–4, Tables 1–2](https://arxiv.org/pdf/2502.01549v1).

#### EM²Mem: bind modalities before retrieval

**EM²Mem, Chen et al., Findings of EMNLP 2026**, moves integration earlier than MERIT. Captions, transcripts, keyframes, and provenance share a 30-second event anchor, with additional context at larger timescales. Semantic retrieval, graph expansion, and evidence selection then operate over these aligned records. The anchor is a fixed temporal address, so it should not be confused with a detected semantic event boundary. [PDF, §3, Appendix C.7](https://arxiv.org/pdf/2609.00551v1).

![EM²Mem: modalities linked to a shared event address](/media/assets/pdf-audit-em2mem-figure2.png)

*Original Figure 2, PDF p. 3. Evidence is integrated during construction and selected at question time.*

The useful comparison is where to perform contextual work. MERIT expands context around retrieved episodes after the question arrives; EM²Mem prepares linked multimodal records beforehand. In the controlled 300-second evidence-budget experiment, alignment improves coverage by 5.4 percentage points, Table 12. The accompanying QA increase from 60.0% to 63.0% has a confidence interval spanning zero, so the cleaner finding concerns evidence coverage.

Mean query latency falls from 459.00 to 98.21 seconds against the reproduced baseline, but construction uses more tokens. Including 500 questions, total token use is 104.50M versus 102.58M, Tables 9–10. For Aligned, the shared source address is immediately useful to prototype, while the full graph design should be justified by coverage gains and the expected workload.

<div>
<a id="egocite-zhang-et-al-2026-preprint-finding-the-right-fact-at-the-right-time"></a>
<a id="paper-2026-zhang-egocite"></a>
</div>

#### EgoCITE: temporal meaning and self-contained records

**EgoCITE, Zhang et al., 2026**, resolves contextual fragments such as “he picked it up again,” indexes several textual views, and includes “first,” “last,” or “usually” in evidence selection. These mechanisms address repetitive work directly and are worth testing before assuming that richer graphs will solve ambiguous captions. Main results rely on human captions/transcripts, while the automatic variant retains manual person-identity information, so the reported gains do not establish an automatic site pipeline. Compare its record rewriting and temporal selection on the same automatic captions as the simpler baseline. [PDF v3, §§3–4, Appendix C.1](https://arxiv.org/pdf/2608.12627v3).

<div>
<a id="amb-the-order-of-object-interactions"></a>
<a id="amb-порядок-взаимодействий-с-объектами"></a>
</div>

#### AMEGO: interaction memory

**AMEGO, Goletto et al., ECCV 2024**, builds reusable memory from hand–object interactions and visually recognizable locations, then answers temporal queries over those records. Its Active Memories Benchmark tests interaction order and overlap, providing a useful specialized alternative when hand interactions define the relevant episodes. The narrower representation and filtering of some difficult same-class instance cases limit its role as a general construction archive memory. Physical-instance association is better examined alongside Chapter 3. [PDF, §§3–4, Appendix §8.1](https://arxiv.org/pdf/2409.10917).

<div>
<a id="22-find-all-matching-episodes"></a>
<a id="24-count-events-and-evaluate-a-compound-condition"></a>
<a id="24-посчитать-события-и-проверить-составное-условие"></a>
<a id="protocols-cost-completeness-and-predicate-quality"></a>
<a id="протоколы-стоимость-полнота-и-качество-предикатов"></a>
<a id="task-2-2"></a>
<a id="task-2-4"></a>
</div>

### 2.5. Find repeated events and evaluate compound conditions

“Show an installation” permits a useful hit. “List all rework this week” requires a set of events whose size is unknown, while “how much time was spent waiting?” may permit an estimate with a stated error. Retrieval and query execution need different stopping rules for these outputs. Multiple cameras also require deduplication, which depends on the observation-linking problem in Chapter 3.

<div>
<a id="qv-m-a-multi-moment-protocol"></a>
<a id="flashmmr-several-intervals-for-one-query"></a>
<a id="flashmmr-несколько-интервалов-на-один-запрос"></a>
</div>

#### QV-M² / FlashMMR: several intervals for one query

**FlashMMR, Cao et al., NeurIPS 2025**, makes repeated moments an explicit retrieval target. QV-M² expands QVHighlights to 2,212 annotations covering 6,384 intervals, with metrics that account for multiple ground truths. The model combines frame features, query interaction, and a temporal pyramid to predict several relevant intervals. [PDF, §§3–5](https://proceedings.nips.cc/paper_files/paper/2025/file/faaa187af979e46dc54f4d43f8b815b2-Paper-Conference.pdf).

On QV-M², G-mAP is 35.14 versus FlashVTG’s 32.14. For questions with three or more target intervals, the corresponding scores are 22.89 and 20.19, Table 3. This is a useful protocol for testing missed repetitions inside one video. The paper’s post-verification component concerns localization learning, not an independent factual check at every query.

For Aligned, the contribution is the shift from a successful hit to a set of annotated occurrences. Extending it to a week requires identifying the recordings inspected, accounting for uninspected intervals, and separating missed detections from missed retrieval. None of the evidence here establishes exhaustive coverage across a site archive. That remains a separate evaluation target.

<div>
<a id="blazeit-and-tasti-statistics-and-index-reuse"></a>
</div>

#### BlazeIt: distinguish statistics from example retrieval

**BlazeIt, Kang et al., PVLDB 2019**, uses inexpensive predictors to accelerate aggregate estimates and LIMIT queries over a detector-defined video relation. Its lasting value is the difference in output contracts: estimate a quantity with an error bound, or stop after finding enough examples. For Aligned, these are useful systems baselines, but detector agreement does not validate physical events, and counting frame appearances does not count unique installations. [PDF, §§3, 6–7](https://www.vldb.org/pvldb/vol13/p533-kang.pdf).

<div>
<a id="equi-vocal-the-user-defines-an-event-through-examples"></a>
</div>

#### EQUI-VOCAL: define an event through examples

**EQUI-VOCAL, Zhang et al., PVLDB 2023**, synthesizes a temporal/spatial query from positive and negative examples, using active learning to refine the specification. It is useful when an expert can demonstrate a recurring event, but assumes available visual predicates and supports a bounded language without negation or disjunction. Its output is matching segments, so an absence claim or a complete register of individual events requires capabilities beyond the reported method. [PDF, §§2–4](https://www.vldb.org/pvldb/vol16/p2714-zhang.pdf).

<div>
<a id="vocal-udf-teaching-the-system-a-new-observable-condition"></a>
</div>

#### VOCAL-UDF: add a missing observable condition

**VOCAL-UDF, Zhang et al., SIGMOD 2025**, translates a question into an executable query and identifies missing predicates. It can generate a Python function over available features or train a small visual model from VLM labels. Execution checks and user-guided selection choose a candidate, which can then serve future queries. [PDF v2, §§4–5](https://arxiv.org/pdf/2408.02243v2).

![VOCAL-UDF: create predicates separately from executing queries](/media/assets/expansion-systems/2025-zhang-vocal-udf.png)

*Original Figure 2, PDF p. 7. The system builds missing functions before applying the completed query.*

This is useful for Aligned’s repeated, expert-defined checks because the condition and its validation can be inspected separately from the answer model. A critical boundary is the dummy UDF, which always returns True when other candidates are inadequate: it effectively removes a condition. A compliance check must expose that condition as unverified. Frame-level predicates also do not directly implement arbitrary state changes across time. Start with observable conditions that have labeled examples and a held-out validation set. Execution correctness alone does not establish that the condition means what the expert intended.

### 2.6. Improve memory quality and account for total cost

All the designs above depend on what was recorded in memory. Better retrieval cannot recover a fact omitted by the writer unless source video remains accessible. At the same time, detailed preprocessing of every camera-hour can cost more than the later questions. These two costs should be measured together before adding training or a heavier index.

<div>
<a id="flora-leng-et-al-2026-training-a-memory-writer-to-identify-events"></a>
<a id="paper-2026-leng-flora"></a>
</div>

#### FLORA: prepare event records before retrieval

**FLORA, Leng et al., 2026**, trains a segmenter and captioner to convert recordings into action intervals and descriptions, with a separate rewarder for robotics annotation. Its boundary stitching and separation of intended action from execution outcome are useful upstream ideas, but it does not implement archive retrieval or long-term QA. The robotics reward results do not justify construction-quality conclusions, so only the event-record preparation component belongs in this chapter’s candidate pipeline. Validate its boundaries and captions on helmet footage before adopting it as a memory writer. [PDF, §§2, 4, Figure 6](https://arxiv.org/pdf/2610.31779v1).

<div>
<a id="memlife-the-memory-writer-also-needs-optimization"></a>
</div>

#### MemLife: optimize what the writer preserves

**MemLife, Xiong et al., 2026 preprint**, separates a clip writer from a reader that searches records, refines time windows, and optionally returns to video. Its MemOpt procedure trains the writer through GRPO for source faithfulness, retention of useful facts, and retrievability. This addresses a different bottleneck from Ego-R1: the content of memory rather than the controller’s choice of tools. [PDF, §3](https://arxiv.org/pdf/2609.40195v1).

With the same Qwen3.5-9B writer/reader family, MemOpt improves EgoLifeQA accuracy from 52.80% to 56.60% on 500 questions, Table 1. This supports writer optimization within the experiment, while its compact-memory and reading-speed figures exclude ingestion. For Aligned, first collect failures where needed evidence was visibly present but poorly recorded. Those cases can justify a writer-training experiment against unchanged captions, reader, and video-access budgets.

<div>
<a id="focus-dividing-work-between-ingestion-and-querying"></a>
</div>

#### Focus: divide work between ingestion and questions

**Focus, Hsieh et al., OSDI 2018**, builds an inexpensive approximate object-class index, then applies an expensive detector to selected cluster representatives at query time. It remains useful for thinking about the ingestion/query tradeoff, despite a recognition setting narrower than Aligned’s. Its accuracy target is agreement with a reference detector, so the original speedups do not establish rare-defect recall or modern VLM operating cost. Use the budgeting principle as a baseline while preserving source footage. [PDF, §§3–5](https://www.microsoft.com/en-us/research/uploads/prod/2018/07/Focus_OSDI18.pdf).

#### TASTI: reuse an index across structured questions

**TASTI, Kang et al., SIGMOD 2022**, learns similarity between outputs of an expensive labeler, labels representatives, and propagates their scores for several query types. This is useful when Aligned has recurring questions over a stable output schema, because one index can replace repeated query-specific proxy training. Its benefits remain tied to that schema and labeler quality. A semantic question outside the stored properties still needs source inspection. [PDF, §§2–4](https://ddkang.github.io/papers/2022/tasti-paper.pdf).

<div>
<a id="reducto-saving-input-processing-costs"></a>
</div>

#### Reducto: filter before expensive processing

**Reducto, Li et al., SIGCOMM 2020**, uses inexpensive frame differences on the camera and server-selected thresholds to reduce transmission and inference. It is a peripheral ingestion reference here: the inspected implementation does not support activity detection with state across frames, and its people/car experiments do not establish sensitivity to small construction defects. Any transfer should measure event-level misses under helmet motion while keeping the original recordings available. [PDF, §§4–5](https://www.cs.princeton.edu/~ravian/publications/reducto_sigcomm20.pdf).

<div>
<a id="table-3"></a>
<a id="table-3-row-1"></a>
<a id="table-3-row-2"></a>
<a id="table-3-row-3"></a>
<a id="table-3-row-4"></a>
</div>

### Comparing the approaches

The most useful initial comparison for Aligned is a reusable episode index following MERIT, independent text and visual retrieval, and a bounded return to source clips. CapMem supplies a controlled caption-memory baseline; CARVE motivates testing mixed representations; EgoMemReason supplies the oracle-evidence diagnostic. These components describe testable choices rather than an already validated combined architecture.

Add complexity for an observed failure. Relation-heavy questions can justify EGAgent/WorldMM-style structure or EM²Mem’s earlier evidence integration. Repeated failed searches can justify a more capable controller. Missing facts can justify writer optimization. Queries for every event need a separate coverage test. Approximate statistics and limited-example search need their own stated guarantees.

Compare these choices with the same recordings, automatic captions, answer model, and evidence budget. Measure required-evidence coverage, answer quality, ingestion cost, cost over a series of questions, and query latency separately. The next chapter examines the assumption that all of them depend on: whether observations from different times, cameras, and people can legitimately be combined into one work history.
