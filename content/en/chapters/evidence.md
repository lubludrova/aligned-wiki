<a id="chapter-4"></a>



A correctly worded answer does not yet show that the system found the right episode. “The panel was installed and inspected” contains two claims that may require different clips. Even a correct observation from yesterday does not necessarily describe the current state. For Aligned, this chapter's task is to connect each claim to sufficient, current evidence and to abstain from drawing a conclusion when that evidence is unavailable.

[Chapter 2](/chapters/archive/#chapter-2) covers retrieval and answer generation. Here the basis of the answer is examined: whether the cited interval is the right one, whether it actually supports the claim, whether the fact is outdated, and whether the question itself has a false premise.

### Benchmarks and evaluation protocols

| Benchmark or protocol | What the model must provide | What is evaluated | Reuse and limitations |
|---|---|---|---|
| **MultiHop-EgoQA** | An answer and multiple evidence intervals within a selected clip | QA and temporal grounding under the GeLM protocol | Independent reuse has not been established here. Roughly three-minute clips do not test a week-long archive |
| **S-EMBER** | A correct answer and a supporting interval | Joint GQ@0.5, QA, and temporal IoU | Data and code are published. Independent reuse has not been established here |
| **MultiVENT-Raw** | Retrieve videos and produce a report with supported claims | Retrieval nDCG, information F1, and citation F1 | A separate corpus-level test. Public resources are not a ready-made RAG pipeline |
| **UVQA evaluation** | Distinguish an answerable question from one with a false premise | Answerability F1, answer quality, and excessive abstention | A small synthetic test, with different sources for positive and negative questions |
| **SuperMemoryVQA** | Distinguish precise, vague, incorrect, and impossible answers | Multiple-choice answerability F1 | Not a test of free-form answer calibration. Independent reuse has not been established |
| **EGOSTREAM** | Account for how long a fact remains true | Answers within the validity window | The recording boundary sometimes ends the window without an observed state change |
| **EgoProbe** | Bind a detail to the correct event | Answers in the presence of plausible distracting details | The first turn always has a Yes answer. This limits interpretation of the overall score |
| **TimeQA-Hard in When Silence Is Golden** | Answer a textual temporal question or abstain | Correct and unsupported answers, abstention behavior | A text-based control, not an evaluation of visual evidence extraction |
| **NExT-QA in Explicit Abstention Knobs** | Answer or abstain with different numbers of frames | Risk–coverage at a fixed threshold | 300 questions, and reducing the frame count does not guarantee removal of the decisive evidence |

Benchmark names do not imply a uniform standard of evidence. Even high temporal IoU does not establish that the model used that particular clip. For the new specialized tests MultiHop-EgoQA, S-EMBER, MultiVENT-Raw, UVQA, SuperMemoryVQA, EGOSTREAM, and EgoProbe, independent reuse has not been established in the sources examined. The external control dataset NExT-QA is also used in Fan's VideoAgent from [Chapter 2](/chapters/archive/#chapter-2), but under a different protocol. Specific protocols and links are provided below.

#### MultiHop-EgoQA, AAAI 2025: multiple claims and multiple intervals

“What operations were performed before the assembly was closed up?” requires several separated episodes. MultiHop-EgoQA evaluates the answer together with temporal support. Here, “long-form” means roughly three-minute clips, not weeks of memory. The proposed GeLM method and its results are discussed after the benchmarks. [Project and data](https://qirui-chen.github.io/MultiHop-EgoQA), [checked PDF](https://arxiv.org/pdf/2408.14469v1).

#### S-EMBER, 2026: joint evaluation of the answer and its timing

**A key benchmark for evidence-backed chat.** S-EMBER requires both a correct answer and localization of the supporting interval. **GQ@0.5** counts a success only when the answer is correct and temporal IoU is at least 0.5. The dataset contains 9,448 questions, 3,141 clips, 613 wearers, and 388 total hours. But clips typically last 5–20 minutes, so the total volume does not imply multiday context for one query. [Paper](https://arxiv.org/abs/2607.02689v2), [code](https://github.com/facebookresearch/S-EMBER), [data](https://huggingface.co/datasets/facebook/S-EMBER).

![S-EMBER: questions and evidence intervals](/media/assets/pdf-audit-s-ember.png)

*Figure — the S-EMBER benchmark annotation protocol, not a model architecture. Wang et al., arXiv:2607.02689v2, Fig. 1, PDF p. 3. A question arises at a particular moment in the stream, and answers at different levels of detail must rely on the marked preceding interval. This diagram explains what QA and temporal grounding jointly evaluate.*

Gemini 3.1 Pro achieves **GQ@0.5 = 0.297**, while the annotation-derived human reference is **0.698**. The human reference reflects annotation agreement rather than an identical timed inference experiment. Explicit time offsets raise Qwen3VL-32B mIoU from **0.018 to 0.412** with 128 frames. Even the interface used to supply timestamps substantially affects the result. [PDF, p. 7, Table 3 and §5.1, p. 9, §7](https://arxiv.org/abs/2607.02689v2).

For Aligned, this joint criterion matters more than a text score alone. But temporal overlap does not prove that the model actually used the evidence. Additional tests are needed: substituting a similar event from another shift, removing a key frame, conflicting sources, and unanswerable questions. Correct abstention — “this cannot be established from the available recordings” — should be evaluated separately. S-EMBER alone does not cover the full abstention protocol. Access conditions and rights for product training are not established by this PDF review and require a separate check of the current license.

#### MultiVENT-Raw: retrieval quality and report support diverge

**Kriz et al., arXiv preprint 2026, a key work for evaluation design.** *MultiVENT-Raw: A Benchmark for Retrieval and Reasoning over Raw Videos* tests event retrieval and report generation from multiple source videos. In Table 1, nDCG@10 on the Full split is 18.0 for OmniEmbed and 47.2 for fine-tuned OmniEmbed-mv. In Table 2, with top-10 retrieval and the same TRACE-lite, information F1 rises from 19.7 to 26.2 when switching to OmniEmbed-mv + RankVideo. The best citation F1 in the final Full block is only 6.9 for MARQUIS-bullet. The evaluation uses a MiRAGE reference with a Qwen3.5-27B judge.

The practical implication for Aligned is that better retrieval does not prove that every report claim is supported. Citations need a separate check. This is a benchmark of an event corpus, not weeks of construction hard-hat footage. [PDF v1, pp. 6–7, Tables 1–2](https://arxiv.org/html/2609.28437v1).

The README and file tree of the [official repository](https://github.com/hltcoe/multivent-raw) were inspected: they primarily provide navigation to the data rather than a ready-made RAG pipeline. The full dataset requires access and occupies roughly 4.5 TB. Derived ASR/OCR/embeddings are available separately. The corpus was not downloaded as part of this review.

![MultiVENT-Raw — query, source videos and supported claims](/media/assets/pdf-audit-multivent-task.png)

*Figure — MultiVENT-Raw task example, original Figure 2, PDF p. 3. The query is shown on the left, video evidence in the center, and verifiable claims on the right. This is a benchmark diagram, not a model architecture. [Original PDF](https://arxiv.org/html/2609.28437v1).*

#### UVQA: answerability under a false premise

The UVQA evaluation contains 300 human-filtered negative questions and 300 positive questions from ActivityNet-QA. Negative examples alter an object, relation, or attribute, so the supplied video does not support the question's premise. Different sources for positive and negative examples create a potential confound between domain cues and answerability. Training to recognize such questions is discussed below. [PDF v1, §§4.3–5.1](https://arxiv.org/pdf/2507.04976v1#page=6).

#### SuperMemoryVQA, EGOSTREAM, and EgoProbe: reliability is more than answer accuracy

These works define three different diagnostic tests. **SuperMemoryVQA** (Alam et al., 2026) distinguishes precise, vague, incorrect, and impossible answers. Its multiple-choice answerability F1 is not confidence calibration for free-form dialogue. **EGOSTREAM** (Forte et al., 2026) adds a fact-validity window: an old answer may cease to be true because the world changes, even if memory has not forgotten it. Some windows end at the recording boundary rather than an observed state change, which must be considered when interpreting results. In the reported Table 4, every configuration takes longer than one second to process a frame at an input rate of 1 fps, so a streaming formulation does not yet demonstrate real-time operation. [SuperMemoryVQA PDF](https://arxiv.org/pdf/2606.00825v1), [EGOSTREAM PDF](https://arxiv.org/abs/2605.31557).

**EgoProbe** (Pang et al., 2026) tests whether a detail is bound to the correct event, using plausible distracting details from other episodes. This is directly useful for repetitive work: the relevant tool may have been present yesterday but absent in the current instance. However, the first turn of the published dialogue always has a Yes answer (Appendix D), so the aggregate score cannot be interpreted as a shortcut-resistant evaluation. For Aligned, initial recall and event binding should be tested separately on balanced questions, including similar events on different days. [EgoProbe PDF](https://arxiv.org/abs/2610.17128).

### Origins and key methods

#### GeLM, Chen et al., AAAI 2025: linking parts of the answer to evidence intervals

GeLM learns to answer and ground separate parts of the answer in multiple intervals. Frozen InternVideo features are projected into Vicuna-7B, and the answer contains special grounding tokens around semantic phrases. Their hidden states are linked to frames through a saliency transformer and similarity branch, producing multiple intervals. [Project](https://qirui-chen.github.io/MultiHop-EgoQA), [code](https://github.com/qirui-chen/MultiHop-EgoQA).

In the stored preprint `2408.14469v1`, adding saliency supervision raises mean temporal IoU from **13.4 → 16.7**, and the proportion of examples with IoU > 0.3 from **14.1% → 18.2%**. This is a genuine contribution from joint training, but absolute localization remains weak. In this work, “long-form” means roughly three-minute clips, not weeks of memory. GeLM's QA score of 4.8/10 versus GPT-4o's 5.4/10 cannot be treated as a clean model comparison: training and frame counts differ. [PDF, pp. 6–7, Tables 2–3](https://arxiv.org/pdf/2408.14469v1).

Our conclusion is that evidence should be stored at the **claim** level, rather than as one shared link below a long answer. For example, “the fasteners were installed” and “tightening was checked” should have their own supporting intervals, even if both concern the same assembly.

#### UVQA: learning to abstain when the premise is false

**[UVQA](/notes/2025-yoon-uvqa/)** teaches a model to recognize false-premise questions: an object, relation, or attribute in the description is changed, after which a question and an explanation of unanswerability are generated. SFT/DPO training combines 30 thousand such negative examples with 30 thousand answerable examples. [PDF v1, §§4.3–5.1, pp. 6–7](https://arxiv.org/pdf/2507.04976v1#page=6).

For VideoChat2, DPO yields answerability F1 of 0.64 versus 0.00 without alignment, and answer accuracy of 0.54 versus 0.22. The conditional rate of excessive abstention among positive questions previously answered correctly is 0.09 for DPO versus 0.25 for SFT. This is not the false-abstention rate over all queries. The work is useful precisely for its paired requirements: reduce fabricated answers while preserving useful ones. Model judges, a small synthetic test, and the unavailability of some original DiDeMo/YFCC videos under the repository's current instructions limit the conclusions. [PDF, Table 1, p. 8](https://arxiv.org/pdf/2507.04976v1#page=8), [repository](https://github.com/EsYoon7/UVQA).

For Aligned, three situations should be distinguished: the evidence is actually absent from the available archive, the evidence exists but retrieval missed it, and the evidence was found but is not sufficiently discernible to support a conclusion. UVQA directly studies the boundary of the supplied video, while APM studies the limits of retained history. Together they motivate this protocol, but neither work alone solves the entire three-part evaluation.

![UVQA data generation](/media/assets/expansion-memory/uvqa-data-pipeline.png)

*Original Figure 3, p. 6: controlled false premises.*

#### When to answer: learning abstention and checking the basis of the answer itself

**When Silence Is Golden**, Zhou et al., ICLR 2026, complements video benchmarks with a text-based experiment. The model receives a question and temporal information, and its permitted actions include “No Answer.” The authors compare ordinary context, temporally filtered passages, knowledge-graph facts, and training on reasoning. In the last variant, expert traces validated by their final answers provide an SFT cold start, after which GRPO optimizes format, answer correctness, and correct abstention (§§3–4). [Note](/notes/2026-zhou-temporal-abstention/), [PDF](https://arxiv.org/pdf/2602.04755v2).

![Training temporal QA with an abstention option](/media/assets/expansion-crosscut/temporal-abstention-fig2.png)

*Original Fig. 2, PDF p. 4. This trains the textual reasoning layer, rather than defining an architecture for visual evidence extraction.*

The reason to include this work extends beyond improved answer scores. The analysis in §6.3 and Fig. 4b shows opposite behavior at different difficulty levels: on TimeQA-Hard, RL reduces abstentions and increases the number of answers to questions with no valid answer. More retrieved graph facts can also lower the abstention rate. A graph, reasoning trace, and RL therefore do not replace separate evaluation of unsupported answers and unnecessary abstentions. For Aligned, such a model is applicable after a trustworthy event log has been constructed. It cannot establish that the camera actually saw the decisive moment.

**Explicit Abstention Knobs**, Ortiz, a preprint first published on December 31, 2025, is useful as a narrower negative control. On 300 NExT-QA questions, the author compares confidence gating with ordinary and sparse frame sets. At one selected threshold, the original setting gives 9.4% errors among accepted answers and 63.7% coverage, while the six-frame setting gives 9.3% and 53.7%, respectively (Tables 2–3). This particular result should not be described as increased conditional risk: the main observed change is in the proportion of questions answered. [Note](/notes/2025-ortiz-abstention-knobs/), [PDF](https://arxiv.org/pdf/2601.00138v2).

Persistently high confidence motivates checking the input evidence, but the author's conclusion about a fundamental representation problem is stronger than this experiment supports. Reducing the number of frames does not guarantee removal of the information needed for that particular question. Our next test should therefore deliberately remove the annotated decisive interval while retaining other observations, and separately compare missing recordings, loss during compression, and retrieval errors. This is a proposal for Aligned, not a guarantee already demonstrated by one of the papers.

### Comparing approaches

GeLM makes temporal references part of the model's output. S-EMBER evaluates the answer and reference jointly, while MultiVENT-Raw separately exposes retrieval quality, report content, and citations. UVQA learns answerability from the supplied video, while confidence gating changes the proportion of accepted answers. None of these mechanisms alone establishes that the relevant event is absent from the entire archive.

Freshness and event binding add independent conditions: a fact may have been true earlier or may concern another visually similar operation. It is therefore useful to distinguish abstention caused by a missing observation, retrieval failure, insufficient visibility, and outdated evidence. This separation prevents a single high QA score from concealing different sources of error.
