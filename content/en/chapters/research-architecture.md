
**STEM · Spatio-Temporal Evidence Memory · Updated 6 November 2026**

Aligned should turn helmet video into a searchable history of physical work. Keep short, traceable observations, find the evidence a question needs, and check the original video before answering. Use the same memory to write daily reports.

The main hypothesis is simple: **records that connect an action to an object, a place and a time will recover more useful evidence than captions alone.** This proposal defines how to test that idea. It has not yet been validated on Aligned footage.

![STEM: video becomes evidence records, which support search, source verification and daily reports.](/media/research-architecture/stem-overview.svg)

*Figure 1. Proposed STEM pipeline, drawn with [MERIT](/papers/2026-choi-merit/), Figure 2, as a visual reference. Dashed paths show optional episodes or repeated search. All scenes and answers are illustrative.*

<a id="1-a-shared-memory-for-two-different-questions" class="legacy-anchor" aria-hidden="true"></a>

### 1. What we will build first

The first version has two jobs. **Historical QA** answers questions such as “What happened to the pipe in room 304 before the wall was closed?” **Daily Reports** describe the work visible during a chosen day or shift. Both provide video references and say what remains unknown.

These jobs need different search strategies. A question needs a small set of relevant clips. A report needs a review of the whole reporting period. Quality, progress and process assessment come later, once the evidence can be recovered reliably.

Start with video, timestamps and camera-to-wearer assignments. Use audio and location data when available. Accurate indoor positioning is helpful but is not a prerequisite. The site's [problem statement](/chapters/problem-statement/) explains the broader product goal.

<a id="3-memory-construction-preserve-evidence-before-abstraction" class="legacy-anchor" aria-hidden="true"></a>
<a id="31-stable-leaves-and-typed-observations" class="legacy-anchor" aria-hidden="true"></a>

### 2. Build memory from short observations

Split each recording into **30-second clips**, called evidence leaves. Keep the original video and exact timestamps so a reader can revisit a moment inside a clip. Record capture gaps and poor visibility, even when no useful description can be produced.

For each leaf, save a caption, visual features, source details and a few construction-specific search keys. Start with one sampled frame per second and measure how often this misses brief events.

<a id="32-construction-keys-retain-relationships" class="legacy-anchor" aria-hidden="true"></a>

| Key | Example | Why it matters |
| --- | --- | --- |
| Action and target | Apply material around pipe P7 | Connects the action to the object it affects. |
| Object and visible state | P7 penetration is exposed | Supports a history of the same physical item. |
| Identifier and place | Wall W3, room 304 | Separates similar rooms and components. |
| Change or quality cue | A gap is visible at the joint | Preserves an observation without declaring a defect. |

Store the keys together with their source caption. Keep raw room codes and other identifiers for exact matching. Separate **what was seen, what was said and what was inferred**. A spoken completion claim is not visual proof, and a visible gap is not automatically a quality violation.

<a id="33-work-episodes-add-context-without-replacing-leaves" class="legacy-anchor" aria-hidden="true"></a>

An optional **Work Episode** groups neighboring leaves into a longer activity, such as preparation, installation or inspection. Use changes in action, tools, visible state or zone to propose boundaries, then merge compatible neighbors. Brief head turns should not split a task unnecessarily.

Episodes add context while every leaf remains directly searchable. They do not automatically reduce cost: keeping all captions and adding summaries requires more processing. Selective captioning is a separate experiment that must show it preserves short events.

<a id="4-spatial-memory-as-uncertain-evidence" class="legacy-anchor" aria-hidden="true"></a>
<a id="41-start-with-zones-earn-a-motion-model" class="legacy-anchor" aria-hidden="true"></a>

### 3. Use location without trusting it blindly

Start with floor and zone IDs. If these are unreliable, combine room signs, visual place recognition and available sensor measurements. Keep several possible zones and an explicit “unknown” option. A motion model can smooth the camera's path, but should be added only if it beats simpler location estimates.

**Camera location and object location are different.** A worker in room 303 may film a pipe in room 304. Store the object's location separately, and leave it unknown when the view cannot establish it.

<a id="42-a-spatial-score-to-test-not-assume" class="legacy-anchor" aria-hidden="true"></a>

Use location to favor plausible clips, rather than discard everything else. After the final ranking and cutoff, keep some candidates found without inferred location constraints. This prevents one wrong room estimate from hiding all the evidence. Explicit dates or other user-given scope still apply.

<a id="34-identity-across-wearers-and-days" class="legacy-anchor" aria-hidden="true"></a>

Link observations across cameras or days only when identifiers, place and appearance support the same item. Preserve uncertain alternatives and original records. Similar-looking pipes are not necessarily the same pipe. Cross-camera event order also needs synchronized timestamps with known uncertainty.

<a id="5-retrieval-that-completes-an-evidence-set" class="legacy-anchor" aria-hidden="true"></a>
<a id="51-plan-retrieve-diversify-and-inspect" class="legacy-anchor" aria-hidden="true"></a>

### 4. Answer with a complete set of evidence

For the pipe question, define three **evidence slots**: identify P7 and W3, find work on that item, and find the later covered state or closing event. The search should fill these slots, rather than return many similar clips from one moment.

1. **Search several ways.** Use text keys, exact identifiers and visual features, with time, place and wearer information where relevant. Keep a global search path.
2. **Combine and diversify results.** Prefer clips that cover different required observations. Compare simple ranking methods before adding a complex spatial score.
3. **Expand the context.** Read neighboring clips and, when available, relevant episode members.
4. **Check the source.** Inspect original video with timestamps. Verify the item, action, visible state and temporal relationship, including contradictory evidence.
5. **Fill gaps or stop.** Search again for missing slots within a fixed budget. Return supported claims with citations and name unresolved parts.

For clips with text keys, a useful starting score is MERIT's **best-matching key**:

$$
s(i,Q)=\max_{k\in K_i}\cos\bigl(e(Q),e(k)\bigr).
$$

Here $Q$ is the question, $K_i$ contains clip $i$'s keys, and $e$ turns text into an embedding. The clip receives the similarity of its closest key. Compare this with rank fusion, which combines the result lists from different searches without directly adding incompatible scores.

<a id="52-a-worked-history-query" class="legacy-anchor" aria-hidden="true"></a>

![A pipe history needs evidence of the item, the intervening work and the later covered wall.](/media/research-architecture/evidence-slots.svg)

*Figure 2. Three complementary observations support a history. A similar-looking item in another room cannot replace the missing evidence.*

For example, Tuesday's clips may show P7 exposed and material being applied around it. Wednesday's clip may show W3 covered. This supports a description of visible work before the wall was **observed covered**. It does not prove the exact closing time, hidden workmanship or formal acceptance.

<a id="53-verification-is-another-fallible-stage" class="legacy-anchor" aria-hidden="true"></a>

If the work clip cannot be found, say so. Missing evidence does not prove that the work never happened. A verifier can also make mistakes, so compare its judgments with human review. Questions asking for **all events, counts or complete timelines** need the full-scope approach below.

<a id="6-daily-reports-need-complete-scope-traversal" class="legacy-anchor" aria-hidden="true"></a>

### 5. Write reports from the whole period

A daily report should start from **every recorded interval in scope**, including leaves without an episode assignment. Keep uncertain zones and unusable footage visible in the coverage record.

The workflow is: **list the intervals → collect observations → merge repeated views of the same event → check source claims → write the report**. Group the result by work item and zone, with video references and gaps.

A report should distinguish observed actions, visible state changes, attributed speech and reviewed issues. Compute counts from verified records. Merge overlapping camera views only when they show the same event. Recorded activity does not establish total labor time, site-wide productivity or accepted completion.

Reviewing every interval prevents search from silently skipping part of the shift. It does not guarantee that the model notices every event, so test report coverage separately from factual accuracy.

<a id="8-stage-2-readers-over-physical-work-item-histories" class="legacy-anchor" aria-hidden="true"></a>
<a id="81-separate-physical-state-process-and-acceptance" class="legacy-anchor" aria-hidden="true"></a>

### 6. Add assessment after the memory works

Stage 2 adds specialized readers over the same evidence. Each physical work item gets a dated state history. Keep **observed state**, **inferred process stage** and **formal acceptance** separate. Missing footage must not turn an expected step into a completed one. Allow rework, removal and valid alternative work sequences.

<a id="82-three-readers-and-one-shared-evidence-contract" class="legacy-anchor" aria-hidden="true"></a>

| Reader | Question | Extra evidence needed |
| --- | --- | --- |
| Progress | What changed, and how much work is visible? | Defined work items, scope and milestone rules. |
| Quality | Does this visible feature meet its requirement? | The applicable requirement and a suitable view or measurement. |
| Process | Were the required steps and effects observed? | Prerequisites, allowed sequences and relevant observations. |

![Progress, quality and process readers reuse shared evidence, with item scope and requirements.](/media/research-architecture/assessment-readers.svg)

*Figure 3. Specialist results return to memory with their sources and uncertainty. Human acceptance remains a separate record.*

Keep requirement versions and assessment sources so a later decision can be reviewed. A finished surface cannot reveal hidden work. Start with one work package and compare passive helmet footage with deliberate checkpoint views before training a specialist. [IndustReal](/papers/2024-schoonbeek-industreal/) offers a useful state-based evaluation example, although its participants deliberately expose assembly states to the camera. [Source, §§4–5](https://openaccess.thecvf.com/content/WACV2024/papers/Schoonbeek_IndustReal_A_Dataset_for_Procedure_Step_Recognition_Handling_Execution_Errors_WACV_2024_paper.pdf).

<a id="7-automatic-findings-get-their-own-experiment" class="legacy-anchor" aria-hidden="true"></a>

Automatic monitoring is a separate experiment. Choose one visible condition after inspecting real footage, such as materials occupying a known route. Initially keep candidates for human review outside operational reports. Measure missed events, precision and false candidates per hour when the condition can be observed. Use normal footage, not just selected positive examples. Reports should not depend on this detector succeeding.

<a id="2-what-the-literature-supports" class="legacy-anchor" aria-hidden="true"></a>

### 7. What we take from existing research

**[MERIT](/papers/2026-choi-merit/) is the main baseline.** It builds several keys per short clip, retrieves likely evidence, reads neighbors and searches again when needed. On EgoLifeQA with GPT-5 it reports 71.2% QA accuracy. This rises to 83.2% when the relevant time points are supplied and neighboring clips are filtered. The first diagnostic is therefore to separate failure to find evidence from failure to understand it. [Tables 1, 3 and 5](https://arxiv.org/html/2608.07663v2).

Reproduce MERIT's published configuration first. Treat the automatic-caption construction-video version as a separate baseline: the released EgoLife pipeline uses human-derived captions. Its tolerant retrieval hit rate also does not measure whether every required observation was found. [Evaluator](https://github.com/choi-yeeun/MERIT/blob/6edea6e/eval/hit_rate_egolife.py), [caption preprocessing](https://github.com/wgcyeo/WorldMM/blob/main/script/2_preprocess.sh).

**[EM²Mem](/papers/2026-chen-em2mem/) supports testing short anchors.** At a 300-second evidence budget, its reported target-time coverage is 36.7% for 30-second anchors versus 30.3% for 60-second anchors. This motivates our baseline, but does not prove that 30 seconds is best for construction footage or that episode summaries help. [Table 14](https://arxiv.org/html/2609.00551v1).

**[EgoCITE](/papers/2026-zhang-egocite/)** motivates combining short and longer memory units. **[GEB](/papers/2026-ren-geb/)** motivates evaluating whether several required intervals are recovered together. These results guide experiments, rather than validate the proposed STEM combination. [EgoCITE, Appendix D](https://arxiv.org/html/2608.12627v1), [GEB, Table 3](https://arxiv.org/html/2609.38155v1).

<a id="9-evaluation-must-follow-the-evidence-through-the-system" class="legacy-anchor" aria-hidden="true"></a>
<a id="91-a-diagnostic-pilot-and-a-larger-validation-study" class="legacy-anchor" aria-hidden="true"></a>

### 8. What to test and build next

Start with about **120 camera-hours and 120 screening questions** across days and wearers in one work package. Include repeated rooms, poor views, brief events and questions the footage cannot answer. Label the evidence each answer needs and a sample of complete reporting periods. This diagnoses memory failures, but is too small to establish reliability for rare anomalies.

Keep all views of the same event and work instance in the same data split. Tune prompts and thresholds on development data, then freeze them before a later test. Compare methods with the same captioner, reader and available evidence when measuring the effect of memory changes.

<a id="93-experiments-that-decide-which-components-survive" class="legacy-anchor" aria-hidden="true"></a>

| Order | Experiment | Decision |
| --- | --- | --- |
| 1 | Reproduce MERIT. Give the reader the correct clips separately. | Is the main problem capture, retrieval or interpretation? |
| 2 | Compare captions, MERIT keys and construction keys. Add exact-ID and visual search. | Do richer records recover more required evidence? |
| 3 | Test video alone, with audio, with location, and with both. | Which inputs help which questions? |
| 4 | Compare leaves alone with episode overlays and neighboring-clip expansion. | Does hierarchy help beyond simple context? |
| 5 | Test complete-scope reports and claim verification. | Are the facts supported, and is important visible work covered? |

<a id="92-exact-evidence-metrics" class="legacy-anchor" aria-hidden="true"></a>

The main retrieval measure is **complete evidence recall**: the share of answerable questions for which the system retrieves at least one sufficient set of observations.

$$
\mathrm{AR}=\frac{N_{\mathrm{complete}}}{N_{\mathrm{answerable}}}.
$$

A complete set must contain every required interval in one valid bundle, from the correct recordings. For the first experiment, count an interval as found when at least 80% is covered, without extra temporal tolerance. Check item identity, temporal relationships and claim support separately in the final answer. A partial answer does not count as a complete, correct answer.

Compare at **300 unique source-seconds per question**, including neighbors, repeated searches and source verification, and report frame and token use too. Count different camera views separately. Inspect failures at each stage: candidate search, selection, filtering, source reading and final citations.

<a id="10-promotion-gates-and-computation" class="legacy-anchor" aria-hidden="true"></a>

For a later supervised MVP, proposed targets are **80% complete evidence recall, 95% supported claims and 90% recall of important visible report events**. These are separate goals, not achieved results. Define important events in advance, freeze targets after the diagnostic pilot, and require confidence bounds to meet them before promotion. Also report incomplete answers and unsupported claims so the system cannot appear accurate by saying very little.

Measure the full cost of writing memory, building episodes, searching and checking video. Keep a new component only if it improves evidence quality or achieves comparable quality at lower cost. Add location models, compression and specialist readers only when a measured failure justifies them.

<a id="11-implementation-order-and-contribution" class="legacy-anchor" aria-hidden="true"></a>

**Build first:** source records and MERIT reproduction, construction keys and time/place search, multi-evidence answers, then complete-scope reports. Test episode hierarchy next. Quality, progress and monitoring follow once the evidence and capture conditions support their claims.

<a id="12-provenance-and-limits" class="legacy-anchor" aria-hidden="true"></a>

This proposal combines the two supplied architecture drafts. The original drafts remain unchanged. No Aligned footage was processed and no benchmark was reproduced for this page. The linked studies supply the research basis, while the figures illustrate the proposed design.
