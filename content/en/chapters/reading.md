<a id="appendix-reading"></a>

### A reading order for the key ideas

The sequence below follows the tasks in the new table of contents. Arrows indicate reading order, not established methodological lineage.

| Step | Read | Question you should be able to answer afterward |
|---|---|---|
| 1 | Frozen in Time → CLIP4Clip | Why can video be indexed before a query arrives, and what is lost in an embedding? |
| 2 | TVR / EventFormer → QV-M² → APM-Bench / EgoMonth | Are we looking for one moment, every recurrence, or evidence across several sessions? |
| 3 | VideoRAG (Ren) and VideoRAG (Jeong) | How does retrieval across several videos differ from asking a question about an already selected clip? |
| 4 | VideoAgent (Fan) → EgoLife | How can a sequence of frames become a memory with retrieval tools? |
| 5 | MERIT → EGAgent → EM²Mem | What is computed once during indexing, and what is repeated for every question? |
| 6 | CapMem → MemLife → Focus / TASTI | What does a complex memory add with identical frames and the full ingest + query cost accounted for? |
| 7 | MA-EgoQA → GEB → LEDGER | How do we distinguish a person, a camera, an event and a physical object instance? |
| 8 | S-EMBER / GeLM → MultiVENT-Raw | How can we evaluate both an answer and its evidence? |
| 9 | ProcObject-10K → AEM → StateDiffNet → IMPACT | Which features can confirm a state, an error and recovery? |
| 10 | PROVIA → MistSense → ProactEgoMem | When are observations sufficient for a timely alert? |
| 11 | LiveMamba → GuideMe → MistExit → EgoSafetyBench | How can timely intervention be measured without future frames or predefined step boundaries? |
| 12 | ConstructAI → Qiu GraphRAG → From Sensing to Scheduling | How do a violation, a visible correction and accepted work differ? |
| 13 | Construction studies → our own evaluation | Which assumptions of earlier work fail on a construction site? |

Not every paper needs equally deep reading. For an architectural decision, first examine the task, method diagram, experimental protocol and ablations. Training details become relevant after selecting a component that actually needs training. Inspect the repository separately from the PDF: a GitHub link does not guarantee inference code, weights or a reproducible evaluator.

<a id="paper-2026-guo-multimodal-memory-survey"></a>

### A survey of multimodal memory: representation and management policy

**Seeing, Maintaining, and Learning, Guo et al., 2026 preprint**, is useful as a reading map. It separates what is stored from how memory changes: fixed memory, updates under unchanging rules, or changes to the policy itself based on feedback during use. An offline-trained writer with a fixed policy does not automatically belong to the last category. For Aligned, it is particularly useful to evaluate evidence formation, maintenance of freshness, retrieval and use separately, including oracle retrieval and evidence removal. This is a systematization of the literature, not a common experiment across methods. Catalog counts depend on the version, and claims about individual systems require primary sources. [PDF, §§3–4, 8.4.1](https://arxiv.org/abs/2610.19366).

<a id="paper-2026-bacharidis-mistake-survey"></a>

### A survey of procedural mistakes: task, annotation and decision time

**Vision-Based Mistake Analysis in Procedural Activities, Bacharidis and Argyros, CVIU 2026**, distinguishes recognizing an error within a step, localizing it in time, and making an early decision from incomplete observations. For Aligned, this is a useful terminology check: an unusual movement may be valid, while an ordinary action may violate a procedural dependency. The survey also distinguishes ordering errors from execution errors, and the absence of error labels from the absence of action labels, transcripts or correct demonstrations. Its tables organize published protocols rather than reevaluate models on a common test. The checked version is the archived arXiv v2 from December 2025. Its dataset statistics should be checked against the original sources, including because of internal inconsistencies concerning EgoPER. [PDF, §§II, V, VII, Tables I–II](https://arxiv.org/pdf/2510.19292v2#page=3).

### Terminology without conflating tasks

| Term | Meaning in this review |
|---|---|
| Camera-hour | One hour of recording from one camera, regardless of overlapping events on other cameras |
| Clip | A bounded video interval that is stored or supplied to a model |
| Event | An event in the world that may have several video observations |
| Entity | A particular person, object or place that retains its identity across observations |
| Caption | A generated description that may be incomplete or incorrect |
| Evidence | A source clip supporting a specific claim |
| Retrieval | Selection of potentially relevant clips from a corpus |
| Grounding | Linking a claim to a location, object or time interval |
| Episodic memory | Memory of specific events and when they were observed |
| Semantic memory | Generalized facts and regularities inferred from several observations |
| State | The condition of an object, rather than an action occurring nearby |
| Progress | Change relative to a goal or procedure, not necessarily quality |
| Compliance | Conformity with a specific requirement, rather than general plausibility |
| Causal evaluation | Each decision can use only information obtained by that time |
| Offline evaluation | The algorithm may have access to the entire recording, including the continuation of an event |
| Abstention | Withholding a substantive conclusion when evidence is insufficient |
| Faithfulness | Agreement between an answer and the sources used, as defined by the particular paper |

**Recall@k** means different things in different papers. With one correct clip, it is often the fraction of queries with a hit in the top-k. With several relevant videos, it may be the proportion of all relevant videos retrieved. **Temporal IoU** is the intersection of the predicted and reference time intervals divided by their union. **mAP**, accuracy, judge score and citation F1 cannot be compared as a single quality percentage.

Response time also requires a common protocol: number of queries, model, hardware, cache, network calls, and whether decoding and preprocessing are included. Speedup relative to an expensive baseline can still leave absolute latency unsuitable for conversation.
