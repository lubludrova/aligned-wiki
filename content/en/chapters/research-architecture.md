
**STEM · Spatio-Temporal Evidence Memory · 5 November 2026**

Aligned should build a persistent evidence memory that can recover the history of physical work across days, places and camera wearers. The proposed system keeps short video anchors, binds construction observations to their sources, and retrieves several complementary pieces of evidence before answering. Daily Reports use the same memory through a complete traversal of the reporting scope. Assessment becomes a later family of readers over that evidence, with explicit work-item states and requirements.

![STEM architecture: persistent memory construction on the left, evidence retrieval and verification on the right, and a separate coverage path for Daily Reports.](/media/research-architecture/stem-overview.svg)

*Figure 1. Proposed STEM pipeline. An original vector illustration using the two-panel construction/retrieval composition of [MERIT](/papers/2026-choi-merit/), Figure 2, as a visual reference. Solid paths form the Stage 1 core. Dashed paths denote optional hierarchy or iterative search. All construction scenes are schematic examples.*

The central research question is whether **construction-specific bindings and uncertain spatial context improve recovery of every necessary observation under a fixed reading budget**. A second question is whether work episodes improve retrieval and reporting without losing short events. Neither effect has been demonstrated on Aligned footage. This document specifies a research programme and a candidate architecture, not an implemented or validated system.

> **Reading the evidence.** **[E]** identifies a published result under its original protocol. **[P]** identifies our design or experiment. **[H]** identifies an untested benefit. **[T]** identifies a proposed acceptance target. Calculations state their assumptions. Paper names link to this site's publication pages, with direct primary-source links beside numerical claims.

### 1. A shared memory for two different questions

“What happened to the pipe in room 304 before the wall was closed?” requires a linked history. Finding one image of a pipe is insufficient. The system needs the relevant item, observations before concealment, the closing event and defensible temporal order. “What work was observed today?” instead requires coverage of an entire period. Both depend on source-grounded memory, but they need different retrieval contracts.

Stage 1 therefore has two primary outputs: bounded historical QA and evidence-based Daily Reports. Both return observations with citations, attribution and gaps. A separately evaluated detector may propose one visible condition for review. Reports do not depend on that detector succeeding.

| Capability | Proposed commitment [P] | Evidence boundary |
| --- | --- | --- |
| Historical QA | Find, compare and explain recorded observations across episodes. | Same-item identity and every consequential claim require support. |
| Daily Reports | Cover the requested day/zone and assemble verified observations. | Recorded activity is not complete site activity or productivity. |
| Automatic candidates | Evaluate one observable condition in shadow mode. | No general anomaly, compliance or safety verdict. |
| Stage 2 assessment | Add item states, requirements and specialist readers. | Installed, visually satisfactory and formally accepted remain distinct. |

Inputs are original video and timestamps, recording-to-wearer assignments, a versioned zone vocabulary, and audio or location measurements when available. Accurate indoor pose, exhaustive views, resolved speaker identity and a construction-trained captioner are not assumed. Drawings, procedures and acceptance records become dependencies only for claims that require them. The [problem statement](/chapters/problem-statement/) supplies the product context, while the [existing synthesis](/chapters/synthesis/) supplies the wider research landscape.

### 2. What the literature supports

The evidence supports persistent memory, multiple access paths and explicit source checking. It does not establish the performance of their proposed combination. These results answer different questions and must not be read as one leaderboard.

| Work and protocol | Published evidence [E] | Architectural consequence |
| --- | --- | --- |
| [MERIT](/papers/2026-choi-merit/), EgoLifeQA, 500 questions, GPT-5 | QA 71.2%, retrieval hit .56, target-time oracle with neighbor filtering 83.2%. [Tables 1, 3, 5](https://arxiv.org/html/2608.07663v2). | Reproduce the baseline and separate retrieval failure from reader failure. |
| [EM²Mem](/papers/2026-chen-em2mem/), matched evidence and 300-second retrieval budget | Macro target-time coverage C@300 (%) is 36.7 for bound records versus 31.2 for four-channel rank fusion. Reported paired gain +5.4 points, 95% interval [2.6, 8.3]. QA gain is uncertain. [Table 12, Appendix C.4](https://arxiv.org/html/2609.00551v1). | Test construction-time binding against late fusion on identical evidence. |
| [EgoCITE](/papers/2026-zhang-egocite/), EgoR1 granularity ablation | Fine, coarse and combined indices yield hit rates 55.7%, 59.3% and 62.7%. [Appendix D](https://arxiv.org/html/2608.12627v1). | Test complementary resolutions while keeping the fine path accessible. |
| [GEB](/papers/2026-ren-geb/), MultiHop-EgoQA, three-minute clips, Qwen3.5-35B | All-interval overlap is .521 overall and .235 on questions needing at least three intervals. [Table 3](https://arxiv.org/html/2609.38155v1). | A single retrieval hit substantially understates the multi-evidence problem. |
| [S-EMBER](/papers/2026-wang-s-ember/), audio-free smart-glasses episodes | Gemini 3.1 Pro obtains overall free-form accuracy 47.83% but joint correct-answer/IoU≥.5 score .297. [Table 3](https://arxiv.org/html/2607.02689v2). | Evaluate the answer and its temporal grounding jointly. |

**MERIT is the primary control.** Its 30-second records have event, dialogue, object/state and summary keys. Maximum key similarity retrieves seeds, neighboring captions supply context, and iterative text search precedes final visual QA. Preserve Qwen3-Embedding-4B, top-k=10 for GPT-5 or 5 for Qwen3-VL-8B, ±2 neighbors, the five-round cap and released frame policy. Keep our three-round variant separate. [Method and Appendix A](https://arxiv.org/html/2608.07663v2).

Two qualifications matter. WorldMM's **65.6** belongs to MERIT Table 1, while **63.2** is the reproduced baseline in Table 5. The released EgoLife setup also uses human-derived captions, not an automatic construction-video pipeline. [WorldMM preprocessing](https://github.com/wgcyeo/WorldMM/blob/main/script/2_preprocess.sh). Run that reproduction and the automatic-caption site baseline as different experiments.

The [MERIT evaluator](https://github.com/choi-yeeun/MERIT/blob/6edea6e/eval/hit_rate_egolife.py) permits a temporal margin, and the [README command](https://github.com/choi-yeeun/MERIT#egolifeqa) sets it to two clips, or ±60 seconds. This any-target hit does not measure complete evidence or what survives filtering. Its memory-construction accounting also excludes initial captioning. Neither headline is an end-to-end reliability or cost guarantee.

### 3. Memory construction: preserve evidence before abstraction

#### 3.1 Stable leaves and typed observations

The baseline partitions each recording into non-overlapping **30-second evidence leaves**. This is a stable indexing address, not a claim about task duration or the finest possible citation. Preserve the shorter final leaf and capture gaps. Decoded source timestamps allow localization below the anchor length.

For leaf $i$, store the source interval $I_i=[t_i^0,t_i^1]$, recording and wearer IDs, local-to-shared clock mapping with uncertainty, sampled-frame times, modality provenance, visibility indicators and writer version. Retain original video, raw captions, text keys and an independently searchable visual representation. An opaque or blurred interval remains in the coverage ledger even if it produces no reliable observation.

An observation is an atomic proposition with an evidence pointer. Its schema distinguishes **observed**, **spoken** and **inferred** content, action participants, object candidates, state, polarity, location uncertainty, valid-as-of time and verification status. “A person fastens a panel” does not identify the wearer as that actor. “The worker says it is complete” is an attributed statement. Neither proves accepted completion.

The initial writer samples frames at 1 fps, measures image quality, emits a structured visual description and keys, and runs timestamped OCR and optional ASR separately. This rate is a starting budget [P]. Brief events can fall between frames, and query-time rereading cannot retrieve a completely unindexed event by itself. Measure omission by event duration and keep a periodic higher-density audit of otherwise unselected intervals.

#### 3.2 Construction keys retain relationships

Store one provenance-linked record per leaf, with several searchable views. The important addition is binding: **who did what to which object, with what visible effect**. A bag containing “panel,” “drill” and “installed” cannot distinguish carrying a panel past an installation from fastening that panel to a stud.

| Field | Example | Rule |
| --- | --- | --- |
| Activity and participants | `fasten / board / to metal stud` | Preserve verb–object–target roles. |
| Object and material state | `W3 / exposed frame / partly boarded` | Keep identity evidence separate from appearance similarity. |
| Process step | `position → fasten → inspect` | Store observed steps without inventing missing transitions. |
| Quality cue | `visible gap at joint` | Observation only. A verdict needs a requirement and suitable view. |
| Progress cue | `open frame → partly covered` | Link before/after observations of the same item. |
| Literal identifier | `room 304`, `wall W3`, product code | Retain raw OCR/ASR, confidence and normalized code for lexical search. |
| Place | Floor/zone candidate and source | Distinguish camera location from the viewed object's location. |
| Speech | Timestamped statement, speaker unresolved if necessary | Keep what was said distinct from what was seen. |
| Summary and raw caption | Short retrieval phrase plus original wording | Keep detail available when normalized fields are wrong. |

Generate compatible fields together, with null for unavailable evidence. A small trade vocabulary can normalize synonyms without creating speculative observations. Polarity remains an explicit field, but retain literal negative wording too. Retrieval may find both “guardrail visible” and “guardrail not visible,” after which predicate checking must distinguish them. A narrow view cannot establish scene-wide absence.

The first comparison holds the captioner fixed: flat caption, four MERIT keys, construction keys, then a bound-record embedding. Compare MaxSim with reciprocal-rank fusion of lexical, textual and visual lists. A separate writer experiment tests joint caption/key generation, because changing the captioner and key scheme together would confound their effects.

For unit-normalized query and non-null key embeddings $u_Q$ and $v_{ik}$, the simple scores are

$$
\begin{aligned}
s_{\mathrm{max}}(i,Q)&=\max_k u_Q^\top v_{ik},\\
s_{\mathrm{RRF}}(i,Q)&=\sum_{c:\,i\in L_c}\frac{w_c}{\kappa+\operatorname{rank}_{L_c}(i)}.
\end{aligned}
$$

$L_c$ is a channel's candidate list with ranks starting at 1, $w_c\ge0$ its development-fixed weight and $\kappa\gt0$ a rank-smoothing constant. An absent channel contributes zero. A leaf without text keys remains eligible through other branches. Rank fusion avoids directly adding cosine similarity to uncalibrated lexical scores. Construction keys must earn their place: MERIT's smaller-reader ablation finds a larger gain from neighbor filtering than from keys. [Appendix Table 11](https://arxiv.org/html/2608.07663v2).

Use frozen captioner, reader and visual-encoder revisions initially. Qwen3-VL-8B is an economical reader starting point from the reproduction, with a stronger reader tested on identical oracle evidence. A pooled visual encoder such as SigLIP2 is a candidate access path, not a proven best construction representation. Pin prompts, sampling, image resolution and token budgets with model revisions.

#### 3.3 Work episodes add context without replacing leaves

[EM²Mem](/papers/2026-chen-em2mem/) reports C@300 of **36.7, 30.3, 23.9 and 26.0** for 30-second, 60-second, 120-second and scene-boundary-proxy anchors respectively. Those alternatives replace the anchors. They do not test our overlay or prove that 30 seconds is optimal on construction video. [Table 14](https://arxiv.org/html/2609.00551v1).

We therefore propose a variable-length **Work Episode** over retained leaves. Candidate boundaries arise from sustained action/tool changes, state transitions, zone changes, capture gaps and caption/visual drift. Hysteresis reduces fragmentation caused by brief head turns. A bounded LLM merge pass groups adjacent compatible leaves, preserving child IDs, boundary evidence and uncertainty. Travel, waiting and interruptions receive explicit labels. A resumed task links to an earlier episode through a task-instance hypothesis.

Episode summaries and zone/day inventories are additional access paths. Search still reaches every leaf directly, so a faulty parent cannot hide all of its children. Preserve observed state changes explicitly, and score episode-boundary errors through their effects on retrieval, reporting and later step recognition. A long caption alone is not a successful hierarchy.

Hierarchy and compression are separate experiments. An hour contains 120 thirty-second leaves. Adding six ten-minute summaries while retaining every leaf caption **adds** work. Selective captioning or delta descriptions could reduce expensive calls [H], but require their own recall–cost study. An inherited description must be flagged and must never become new visual evidence.

#### 3.4 Identity across wearers and days

Shared memory keeps per-recording observations and tentative `same_event`, `same_item` and `same_place` links. Candidate links require compatible time, location and discriminating identifiers or visual evidence. Source records remain distinct. Jointly visible separate objects veto a same-object merge, but do not prevent two objects participating in one event. [GEB](/papers/2026-ren-geb/) supplies an instance-association precedent, not a construction identity guarantee.

Wearer identity comes from device assignment. Actor and speaker identity require separate evidence. Deduplicate repeated views only for a specified physical-event count, preserving alternative associations when uncertain. [MA-EgoQA](/papers/2026-kim-ma-egoqa/) motivates shared-event retrieval, while its prepared multi-person memories do not validate automatic camera synchronization or cross-site re-identification.

For different cameras, assert that event A precedes B only when A's latest plausible end is earlier than B's earliest plausible start. Otherwise order is unknown. Within one continuous recording, source timing still establishes local order. State histories retain contradictory observations and their dates instead of overwriting an earlier fact with a plausible narrative.

### 4. Spatial memory as uncertain evidence

#### 4.1 Start with zones, earn a motion model

Let $\mathcal Z$ be versioned floor/zone IDs and $\bot$ mean unknown location. Each leaf has a camera-zone distribution $q_i^{\mathrm{cam}}$ and, where supported, object-zone distributions $q_{i,j}^{\mathrm{obj}}$ for individual observations/item candidates $j$. One leaf may show objects in different rooms. A worker standing in room 303 can film a pipe in room 304. If the object's location lacks evidence, keep it unknown. Camera position may be a flagged weak prior, never a silent identity assignment.

Reliable supplied zone IDs need only a spatial index. Otherwise combine OCR/voice anchors, visual place recognition and available sensors. IMU and barometer may constrain motion and floor changes. UWB/BLE require infrastructure and site calibration. VIO/SLAM may add relative trajectories, but registration, repeated floors and changing layouts remain separate problems. A full metric reconstruction is not a Stage 1 prerequisite.

An HMM (hidden Markov model) is one candidate [P] for the camera trajectory, with hidden zone $z_i$, observations $o_i$, likelihood $L_i(z)$ and transition probabilities $A_i(z',z)$. Writing $q_i=q_i^{\mathrm{cam}}$,

$$
\widetilde q_i(z)=L_i(z)\sum_{z'\in\mathcal Z\cup\{\bot\}}A_i(z',z)q_{i-1}(z'),
\qquad
q_i(z)=\frac{\widetilde q_i(z)}{\sum_u\widetilde q_i(u)}.
$$

The transition model follows plausible adjacency and elapsed time, with explicit paths into and out of unknown. These wearer-motion transitions do not smooth stationary-object locations. Missing observations should weaken localization rather than fabricate certainty. Fit and calibrate likelihoods on development data. Report wrong-floor errors, confidence calibration, assignable share and robustness across map revisions. Compare this model with independent labels and simple anchor propagation before adopting it.

Post-shift reports may use smoothing with the full shift. Causal monitoring must use only the filtering distribution available at that moment. Future anchors, episode summaries and later item associations cannot leak into a replay of an earlier decision.

#### 4.2 A spatial score to test, not assume

For an object-location query, let $\pi_Q(z)$ distribute its intended place over known zones, and let $q_i(z)$ abbreviate the query-relevant candidate's $q_{i,j}^{\mathrm{obj}}(z)$. Preserve alternative item associations instead of selecting the most convenient room. Define a smoothed archive prior $b(z)$ with positive mass on every known zone. The expected match under that prior is $B_Q$:

$$
\begin{aligned}
B_Q&=\sum_{z\in\mathcal Z}b(z)\pi_Q(z),\\
m_i&=\sum_{z\in\mathcal Z}q_i(z)\pi_Q(z)+q_i(\bot)B_Q,\\
\operatorname{LR}_z(i,Q)&=\frac{(1-\epsilon)m_i+\epsilon B_Q}{B_Q}.
\end{aligned}
$$

Here $0\lt\epsilon\le1$ is a development-selected reliability shrinkage parameter. Measured location mistakes inform its choice, but their raw error rate is not automatically a valid mixture probability. If location is entirely unknown, $m_i=B_Q$ and the ratio is exactly 1. Its log contribution is therefore zero. As reliability weakens toward $\epsilon=1$, the term becomes neutral for every leaf.

A candidate ranking score is

$$
S(i,Q)=s_{\mathrm{fuse}}(i,Q)-\lambda_t d(I_i,T_Q)
+w_Q\log\operatorname{LR}_z(i,Q).
$$

$s_{\mathrm{fuse}}$ is a normalized retrieval score, $d$ measures temporal distance in a declared unit, and $w_Q$ captures how confidently the query identifies a place. When no time or place is specified, set the corresponding weight to zero. This is a **ranking heuristic**, not a calibrated posterior: captions can contain location evidence already, and channels are dependent. Clamp or tune the spatial contribution on development data to avoid overwhelming semantic relevance.

The simpler baseline is rank fusion plus soft zone preference. Compare both with no location and hard filtering that retains unknowns. Crucially, reserve candidates selected without inferred spatial constraints **after final reranking and truncation**. Merely adding a global branch before a common score cutoff offers no protection if that cutoff removes all of its candidates. Explicit user time scope and causal cutoffs still apply to every branch.

Location and audio answer different questions. Repeated-room discrimination may benefit from location [H], whereas reasons, instructions and named materials may depend on speech. Use a 2×2 audio/location experiment with video fixed, and separate passive speech, deliberate voice notes and sensor-derived location. A spoken room identifier must not accidentally appear in a supposedly audio-free sensor comparison.

### 5. Retrieval that completes an evidence set

#### 5.1 Plan, retrieve, diversify and inspect

A typed query plan specifies the contract, scope, item candidates and **evidence slots**. A slot states a proposition to establish and the evidence needed for it. Slots are revisable hypotheses, since the query may contain a false premise or the first retrieved event may concern another item.

The algorithm below serves bounded find/compare/history questions. `timeline`, `find_all` and `count` instead enumerate the complete scope, check the requested predicate and compute aggregates from supported records, using the reporting traversal below. Top-k retrieval cannot establish completeness. Archive-wide exhaustive answers remain experimental until event recall and visibility coverage are validated.

| Step | Proposed algorithm [P] | Failure to measure |
| --- | --- | --- |
| 1. Plan | Resolve explicit time, place and wearer scope. Decompose comparison/history questions into slots. | Wrong date, item binding or assumed event. |
| 2. Candidate union | Per slot, search text keys, literal identifiers and visual features through global, time, place, wearer and optional episode branches. | Gold evidence never enters the pool. |
| 3. Fuse and diversify | Compare MaxSim, rank fusion and spatial scoring. Allocate candidates across slots and retain an unscoped reserve. | Repeated clips crowd out a necessary day or state. |
| 4. Expand | Read temporal neighbors, initially ±2 leaves, and relevant episode children. | A boundary or caption filter drops decisive context. |
| 5. Verify and localize | Inspect original frames with explicit time offsets, checking identity, predicate, visibility and contradictions. | Right clip, wrong interpretation or timestamp. |
| 6. Complete | Search missing or contradicted slots again, initially up to three rounds within one total budget. | Fluent answer despite an unsupported premise. |
| 7. Answer | Emit supported atomic claims with source intervals and unresolved parts. | Citation does not entail the stated claim. |

Temporal references to events require two hops. “Before close-in” first locates the closing event, then searches the preceding period for the same item. Carry ambiguity in the anchor rather than committing to the earliest vaguely similar clip. Bounded search ends with a supported answer, a supported partial answer, or a specific explanation of the gap.

Deduplication uses content and source overlap, not just episode membership. Two distinct required moments inside one episode must survive. Count unique source-seconds, decoded frames and model tokens across expansion, retries and verification. Budgeting only seeds would make a method with unlimited neighboring context appear artificially efficient.

#### 5.2 A worked history query

![Three evidence slots for a pipe history: an exposed pipe, work on the same item, and the later closed wall. A similar-room distractor is rejected, and an unresolved acceptance slot remains explicit.](/media/research-architecture/evidence-slots.svg)

*Figure 2. An illustrative query, not a model result. Matching the wall/item and temporal relation is necessary in addition to recovering each clip. Accepted quality is a separate question with a separate evidence requirement.*

Suppose Tuesday's video shows pipe P7 at wall W3 in room 304, another interval shows a worker applying material around that penetration, and Wednesday's video shows W3 covered. These observations support a dated description of visible work before the later covered state. They do not establish the material specification, hidden workmanship or formal acceptance. A lookalike penetration in room 305 cannot fill the second slot merely because its visual embedding is closer.

If only the first and third slots are supported, the answer describes those observations and says the intervening work was not found in the searched evidence. “Not recorded” requires an independently established recording gap. “Not visually decidable” applies when the footage exists but cannot resolve the property. “Stale” means the last supported state predates the requested one. None implies that the work did not happen.

#### 5.3 Verification is another fallible stage

The verifier reads original evidence and labels each claim supported, contradicted or unresolved. A different model can expose correlated caption errors, but it is not independent ground truth. Keep rejected candidates and their reasons so false rejection can be audited. On a development sample, compare the verifier with blinded human replay and report its precision/retention trade-off.

[S-EMBER](/papers/2026-wang-s-ember/) shows that explicit temporal offsets can materially change grounding, motivating a fixed timestamp interface for every reader. Its experiments concern minutes-long episodes, so long-archive retrieval still needs a separate evaluation. Compare localized reading with whole-episode reading at a declared budget. Fine localization and high-resolution inspection may need different frame allocations.

### 6. Daily Reports need complete scope traversal

Reporting begins with **all recorded intervals in scope**, including leaves without an episode assignment. Enumerate episodes where available and reconcile their children against the leaf ledger. Probable-zone and unknown-zone intervals remain visible in the coverage accounting. The first implementation can traverse leaves directly, so reporting does not wait for the hierarchy to prove useful.

The pipeline is **scope enumeration → typed observation inventory → event deduplication → source verification → report composition**. Verification selects adequate source views for every retained claim. The writer groups facts by work item and zone, preserves attribution and dates, and carries citations through composition. Any newly introduced factual assertion returns to verification.

This still guarantees neither that the writer noticed every visible event nor that every event was recorded. Measure both separately. A coverage-oriented traversal prevents top-k omission by design, while annotated event recall measures remaining perception and selection losses. Sampling only “interesting” clips is unsuitable for evaluating report completeness.

| Report component | Supported content | Required qualification |
| --- | --- | --- |
| Observed work | Actions, materials and equipment actually seen. | State the recording scope and unresolved actor/item identity. |
| State changes | Before/after observations linked to the same item. | Distinguish changed appearance from correct installation. |
| Attributed statements | Instructions, explanations or completion claims in speech. | Name the source type and retain disagreement with visual evidence. |
| Reviewed issues | Confirmed visible observations and separately reviewed candidates. | Never silently promote a detector output into an accepted finding. |
| Coverage | Recorded/usable time, missing intervals, uncertain zones and last observations. | No footage is not evidence of no work or no issue. |

Counts and observed durations are computed from verified records. Merge shared-clock intervals across cameras only after supported same-event/item association, retaining ranges for ambiguous identity or timing. Retrieval cost still counts each camera view separately. A footage-based duration is observed time, not total labor time. Delivery quantities, workforce totals, hidden inspections and accepted completion require their own records.

Construction reporting is a useful but limited precedent. [Mengiste et al.](/papers/2025-mengiste-weekly-progress/) combine images and schedule data, yet one reporting case estimated ceiling completion at 60% against a 21% reference. That is an individual case error, not a general accuracy estimate. [Table 1](https://www.iaarc.org/publications/fulltext/084_Automating_Weekly_Construction_Activity_Progress_Reporting__Leveraging_AI-Driven_Workflows.pdf). Fluent reporting and accurate progress measurement are separate outcomes.

### 7. Automatic findings get their own experiment

Choose **one observable candidate class after inspecting real footage and label availability**. Materials visibly occupying a registered route segment is a reasonable candidate, not a predetermined winner. Its pipeline would check route visibility, localize the route and material, verify spatial consistency in the source, and consolidate repeated views into one event. Adjacent staging, passing carriage and foreground projection are essential hard negatives. Image-plane overlap alone does not establish physical occupancy or permitted clearance.

Evaluate the detector on complete normal periods and independently annotated observable positives. A visibility gate's false rejection counts as a miss when humans judge the condition visible. Keep a separate denominator for genuinely unobservable events. Shadow candidates remain outside operational reports until the class passes its gate, after which human review still distinguishes observation from a compliance decision.

[PROVIA](/papers/2026-wen-provia/) illustrates why a generic monitoring promise is premature: under a nominal validation budget of 0.1 false alarms **per minute**, it reports recall .154 on CaptainCook4D, .098 on IndustReal and .034 on HoloAssist. The IndustReal time-only control reaches .294. These are procedural benchmarks, not route-occupancy estimates. [Table IV](https://arxiv.org/html/2609.20638v1).

For a single class, let $\rho$ be true-event incidence per eligible hour, $r$ event recall and $f$ false candidates per eligible hour. Under a stationary counting approximation with duplicates consolidated,

$$
\operatorname{Precision}\approx\frac{\rho r}{\rho r+f}.
$$

At assumed $\rho=0.03$, $r=0.8$ and $f=0.1$, precision is only **19.4%**. This calculation is not an estimate of Aligned prevalence. It explains why low false-candidate burden and adequate precision must both be measured at natural prevalence. Enriched positive samples help diagnose errors but cannot directly estimate deployment precision.

### 8. Stage 2: readers over physical work-item histories

![Stage 2 reads shared evidence through progress, quality and process readers. Requirements and item scope feed the readers, and typed assessment records return with provenance. Human acceptance is recorded separately.](/media/research-architecture/assessment-readers.svg)

*Figure 3. Specialist readers reuse Stage 1 evidence. Additional records preserve item identity, uncertainty, requirements and model version. An acceptance record has its own authority and evidence source.*

#### 8.1 Separate physical state, process and acceptance

For work item $j$, maintain a history of observations and a belief over task-specific physical states $x_{j,t}$. Keep inferred process stage and human acceptance as separate fields. A simple filtering candidate is

$$
p(x_{j,t}\mid O_{j,\le t})\propto
p(O_{j,t}\mid x_{j,t})\sum_{x'}p(x_{j,t}\mid x_{j,t-1}=x')p(x_{j,t-1}=x'\mid O_{j,\lt t}).
$$

The observation likelihood must account for visibility and uncertain item association. Missing evidence supplies no positive state observation. Transition uncertainty may increase over an unobserved period, but the model must not insert a completed step merely because the procedure expects it. Allow removal and rework, so state and progress can regress. This model is an experiment [P], not an inference guarantee.

A partial-order task model expresses prerequisites and valid alternatives rather than one rigid sequence. Events can affect multiple items. Compare it with an ordered-list prompted reader and a current-frame/state accumulator before introducing a complex graph. Invalid transitions and unseen valid branches remain observable outputs instead of being masked away by hard constraints.

Requirements are versioned records with item scope, effective time, expected property, tolerance, required evidence type and an observation window. Pre-concealment evidence cannot be recreated from a later finished surface. A revised requirement triggers a new assessment linked to the old one. It does not rewrite what the camera observed. The distinction between sensed execution and acceptance follows the design argument in [From Sensing to Scheduling](/papers/2026-isaac-sensing-scheduling/), which is conceptual rather than an empirical validation.

#### 8.2 Three readers and one shared evidence contract

| Reader | Additional inputs and procedure [P] | Output and limitation |
| --- | --- | --- |
| Progress | Enumerated work items, milestone definitions and coverage. Retrieve and reconcile item-state observations. | Observed quantities and unknown scope. Accepted quantities require acceptance evidence. |
| Quality | Applicable requirement, suitable close-up and calibrated geometry when dimensions matter. Inspect the relevant component. | A requirement-specific observation with uncertainty. Hidden bonding, torque and pressure need other evidence. |
| Process | Task definition, allowable order and action/effect observations. Test prerequisites and later state. | Supported transition or unresolved deviation. An unseen step is not automatically omitted. |

Each reader writes typed assessment records with source intervals, requirement version, method version, uncertainty and review status. Preserve the original observations beneath them. Corrections require an original condition, a corrective attempt, a later same-item state and any required acceptance record. An object disappearing from view cannot close the issue.

Evaluate state macro-F1, transition F1 and delay, wrong-item association and false restoration separately. Compare quantities with an independent survey or inspection, scoring observed-installed and accepted quantities independently. Process tests include valid alternative orders, missing views and time-only controls. A reader's success on correct oracle clips does not establish success on its own retrieved history.

[IndustReal](/papers/2024-schoonbeek-industreal/) motivates explicit assembly states, but participants deliberately expose those states between steps. [IMPACT](/papers/2026-wen-impact/) separates state, transitions and recovery, showing why recognizing a final state does not validate the correction history. These are useful mechanisms and evaluation designs, with capture conditions different from incidental helmet footage. [IndustReal, §§4–5](https://openaccess.thecvf.com/content/WACV2024/papers/Schoonbeek_IndustReal_A_Dataset_for_Procedure_Step_Recognition_Handling_Execution_Errors_WACV_2024_paper.pdf), [IMPACT, Tables 1 and 5](https://arxiv.org/html/2604.10409v1).

Start with one tagged partition-wall package and independently checked pre-concealment observations. Compare passive helmet footage with directed checkpoint views before training a specialist. Freeze general models initially, then use local labels for calibration or a narrow detector. A large general model, full scene graph or end-to-end RL objective enters only after a measured failure justifies it.

### 9. Evaluation must follow the evidence through the system

#### 9.1 A diagnostic pilot and a larger validation study

Begin with approximately **120 camera-hours** across several days and wearers in one work package [P]. This is a diagnostic envelope for observability and memory, not a sufficient sample of rare anomalies. Include repeat rooms, overlapping cameras, interruptions, poor views, brief events, unsuccessful corrections and normal periods. Add distractor footage to measure archive growth without pretending it increases the number of independently labeled events.

Collect a question diary and annotate at least 120 screening questions, including answerable, partially answerable, unanswerable and false-premise cases. For answerable questions, experts identify one or more **minimal sufficient evidence bundles** with decisive intervals, recording identity and required item bindings. Independently annotate a stratified set of full reporting periods to expose events that retrieval pooling never proposes. Double-label consequential examples and adjudicate disagreements.

Group all views of a physical event, the same work instance and its correction chain into one split. Use development data for prompts, calibration, thresholds and budgets, then freeze a later test. Keep unseen-worker and eventually unseen-site tests separate. Estimate final sample size from paired disagreement and the desired confidence-interval width. A 120-question screen cannot establish a tight two-point noninferiority claim or a rare-error guarantee.

The larger **480–960 camera-hour** envelope from the longer proposal is an optional archive/field stage. It is not an alternative estimate of the same pilot and not sufficient by itself to validate rare findings. Eligible negative exposure, natural positives, independent event clusters and question diversity determine what can be concluded.

#### 9.2 Exact evidence metrics

For question $Q$, let $\mathcal G_Q$ contain its valid sufficient bundles. Each $G\in\mathcal G_Q$ is a set of decisive, nonzero-duration source intervals. Let $R$ be the union of returned intervals, grouped by recording. The diagnostic match rule uses $\eta=0.8$ coverage without a temporal margin:

$$
\begin{aligned}
c(g,R)&=\frac{|g\cap R_{\mathrm{recording}(g)}|}{|g|},\\
\operatorname{IR}(Q)&=\max_{G\in\mathcal G_Q}\frac{1}{|G|}\sum_{g\in G}\mathbf1[c(g,R)\ge\eta],\\
\operatorname{AR}(Q)&=\mathbf1\!\left[\exists G\in\mathcal G_Q\;\forall g\in G:\ c(g,R)\ge\eta\right].
\end{aligned}
$$

**IR** is required-interval recall. **AR**, the primary retrieval endpoint, is all-required bundle success. Macro-average each over answerable questions. For unanswerable questions, score correct abstention, false-premise rejection and unsupported assertions separately. The joint answer/evidence score is the fraction of all answerable test questions answered completely and correctly, with every required proposition supported, correct item bindings and a sufficient cited bundle. Partial answers and abstentions score zero on this endpoint.

Evaluate curves at **120, 300 and 600 unique source-seconds per question**, counting cameras separately and including expansion and verification. The five-minute point is the initial comparison budget. Report questions whose minimum sufficient bundle exceeds the budget without removing them from the main denominator. Retain temporal IoU at .3/.5 for moment localization and continuous target-time coverage as separate metrics. These proposed coverage rules are stricter than a tolerant any-hit score and are not numerically interchangeable with it.

Instrument a recall funnel: candidate pool → selected intervals → deduplication → context filter → verified evidence → final citations. Record actual inspected frame timestamps and cumulative frame/token expenditure. An interval being returned does not prove its decisive frames were read. Oracle-evidence reader tests use gold intervals but the same declared reader/frame budget, with a separately reported unconstrained human reference.

Report factual precision, citation support, salient-event recall, brief-event recall, wrong-item/zone binding, stale claims and risk–coverage curves. Define answer coverage as the share of questions fully answered, with partial answers reported separately. Also measure omissions of required supported propositions, so a one-fact answer cannot pass by avoiding full abstention. Reports need both claim precision and independently annotated event recall. Monitoring adds event recall, false candidates per eligible negative hour and per recorded hour, duplicates and delay from first observable evidence.

#### 9.3 Experiments that decide which components survive

| Experiment | Controlled comparison | Decision it resolves |
| --- | --- | --- |
| E0 · Reproduce and instrument | Published MERIT, margin 0/2, seed and post-filter evidence, exact model/configuration versions. | Establish the reference and locate retrieval losses. |
| E1 · Observability and reader | Human and model on oracle clips, then directed views/reference records. | Change capture or narrow the claim when evidence itself is insufficient. |
| E2 · Keys and fusion | Same captions: flat, four keys, construction schema, bound record, MaxSim/RRF. Add visual and literal channels individually. | Retain fields and branches only when they improve recall or the cost frontier. |
| E3 · Space and audio | Video, +audio, +location, +both. Compare no/soft/hard location and reserved global retrieval. | Measure marginal value by query type without modality leakage. |
| E4 · Location inference | Supplied labels, anchor propagation, HMM, sensor tiers and oracle labels. Inject correlated wrong-floor runs. | Decide whether probabilistic motion inference earns its complexity. |
| E5 · Temporal memory | 10/30/60-second leaves, overlay on/off, neighbor versus episode expansion. Separately vary caption density. | Separate hierarchy value from compression and brief-event loss. |
| E6 · Multi-evidence and scale | Global top-k, slot allocation, re-querying and content deduplication as rooms/days/wearers increase. | Measure all-required recall, false merges and the cost of repetition. |
| E7 · Grounded reader | Localized versus whole-episode reading, explicit offsets, stronger reader on the same evidence. | Identify residual interpretation and localization failures. |
| E8 · Reports | Complete-scope inventory versus retrieved/free-form summaries, then verification and composition. | Measure factuality, omissions and reviewer effort independently. |
| E9 · One candidate class | Same complete periods, with/without detector candidates, blinded event review. | Establish useful findings at natural prevalence and acceptable burden. |
| E10 · Specialist readers | Same reader on retrieved versus oracle evidence, current-frame and simple procedure baselines. | Separate Stage 2 reasoning from retrieval and process-prior shortcuts. |
| E11 · Capture windows | Passive helmet, directed checkpoint and independent inspection for selected items. | Bound the quality/progress claims the capture can support. |

Run E0–E1 first. Use E2–E8 as development ablations, then preregister one primary final comparison. E11 precedes substantial Stage 2 modeling, even though it is listed last. A sequential ladder helps implementation, but factorial or leave-one-component-out comparisons are needed to detect interactions. Freeze captioner, reader, evidence availability and budgets whenever attributing a gain to memory.

### 10. Promotion gates and computation

The following are **proposed supervised-MVP targets [T]**, chosen as explicit review criteria rather than predicted performance. Calibrate the achievable scope during the pilot, then freeze thresholds before the final test. Point estimates screen the pilot. For promotion, minimum-quality targets apply to one-sided 95% lower confidence bounds and error limits to upper bounds, with clustering by independent event/work instance or shift as appropriate. Too few independent clusters leaves the gate unresolved. Compression uses paired differences, and the zero-critical-error rule remains a separate screen.

| Capability | Proposed gate [T] | Additional protection |
| --- | --- | --- |
| QA retrieval | IR ≥90%, AR ≥80% at 300 source-seconds. | Report single/multiple intervals, wrong-room and long-bundle slices. |
| Answer and citations | Factual precision and citation support each ≥95%. | Unsupported substantive claims ≤2% of emitted claims, unnecessary incompleteness ≤15% of answerable questions, plus joint correctness/grounding. |
| Daily Reports | Supported atomic claims ≥95%, salient observable-event recall ≥90%. | Predefine salience, also report unweighted and brief-event recall. |
| Compression | At most two percentage points loss in AR and brief-event recall. | Paired lower confidence bound on each difference must exceed −2 points. |
| One visible condition | Event precision ≥90%, observable-event recall ≥80%. | Upper 95% false-candidate-rate bound ≤0.1 per eligible negative hour, at natural prevalence. |
| Item/acceptance integrity | No unsupported acceptance or critical wrong-item correction in the gate set. | Zero observed failures is a screening condition, not proof of a zero failure rate. |

These targets replace, rather than average, the incompatible 97%/95% criteria and tolerance-based recall floors in the source proposals. Claim precision, citation support and event coverage have different denominators. A model with high citation support can still omit most of the day's work. A model with high retrieval recall can still misinterpret what it found.

For zero false candidates over $T$ eligible negative hours, the homogeneous-Poisson one-sided 95% upper rate is $-\log(0.05)/T\approx3/T$. Thirty such hours give roughly 0.1/hour. Clustering, changing conditions and positive-event scarcity still require a larger field study. Time spent looking away does not increase eligible exposure.

Select the simplest architecture meeting the chosen evidence constraints. A complex layer should improve a preregistered paired endpoint or achieve equal quality at lower measured cost. Small uncertain gains remain provisional research, rather than becoming mandatory infrastructure. Keep [WorldMM](/papers/2026-yeo-worldmm/)-style graph memory as a later comparison for persistent relationship failures, with identical readers and evidence budgets.

Computation must include the writer and the expected query load:

$$
C_{\mathrm{total}}(N)=C_{\mathrm{decode}}+C_{\mathrm{perception}}+C_{\mathrm{index}}
+C_{\mathrm{episodes}}+\sum_{q=1}^{N}C_{\mathrm{retrieve+read+verify}}(q).
$$

Choose consistent accounting units, such as money or accelerator-seconds, and report token counts and storage separately. Compare equal-evidence and equal-compute settings explicitly. Generated observations, API calls, frames and tokens are not interchangeable. Record ingestion throughput, availability lag, per-question mean/p95 latency and rereading cost. No Aligned GPU/API savings are established by this proposal.

### 11. Implementation order and contribution

| Priority | Build or evaluate | Completion criterion |
| --- | --- | --- |
| P0 | Source/clock ledger, truth set, exact MERIT and oracle reader. | Reproducible decomposition of capture, memory, retrieval and reader errors. |
| P0 | Construction keys, independent visual/literal retrieval, time/zone access and complete evidence slots. | Paired evidence-recall comparison under a fixed budget. |
| P0 | Source verification and coverage-based reports. | Claim support and event coverage pass separately. |
| P1 | Work Episode overlay and zone/day summaries. | Benefit beyond leaf retrieval and ordinary temporal expansion. |
| P1 | HMM or other probabilistic location inference. | Improvement over simple labels/propagation with calibrated uncertainty. |
| P2 | One shadow detector and selected specialist readers. | Independent per-class/state/capture gates, including failed corrections. |

The first contribution to test is **spatially informed, construction-specific evidence retrieval with complete-bundle evaluation**. Hierarchy is an additional hypothesis. Compression is another. Neither is a prerequisite for the first useful report. Stage 2 inherits the evidence contract and adds the task knowledge and capture conditions needed for stronger claims.

The research succeeds if it identifies which observations survive memory construction, which necessary intervals can be recovered at realistic budgets, and which conclusions remain defensible after replaying the source. General quality assessment follows only where those three questions have satisfactory answers.

### 12. Provenance and limits

This proposal consolidates the two supplied November 5 architecture drafts and the requested comparison. It keeps STEM's retrieval detail, adds complete-scope reporting and explicit work-item/acceptance states, and treats motion inference, fusion and hierarchy as experiments. The original drafts remain unchanged. Primary-source pointers above identify the methods, tables and code supporting the central claims. The wiki notes preserve broader source qualifications.

No Aligned video was processed, no research model was trained and no benchmark result was independently reproduced for this page. The upstream drafts had different source access, so inaccessible studies and speculative cost estimates are not used as validation here. Figures illustrate the proposed system and invented examples, not measured outputs. Independent document reviews and website checks validate consistency and presentation, not the scientific performance of STEM.
