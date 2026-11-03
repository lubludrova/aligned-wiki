# Independent original-PDF audit: multi-source memory and object states

Audit date: 2026-11-01. Scope: sections 5 and 6 of `LITERATURE_REVIEW_RU.md`, with edits restricted to `parts/multisource.md` and `parts/object-states.md`. This is a fresh audit. Inputs were the review, its owned parts, and the original PDFs in `aligned-wiki/raw`. No prior audit, wiki summary, implementation checkout, or external website was used as evidence. The local PDF files below are the exact versions checked. Page numbers are physical PDF pages counted from 1, not a browser page estimate.

Verdicts: **Verified** means directly supported by the indicated PDF. **Qualified** means the value is right but a condition or interpretation needed tightening. **Inference** denotes the review author's architectural interpretation rather than a published experimental result. **Not PDF-verifiable** is an explicit coverage gap, not a finding that the claim is false.

## Source manifest

All paths are relative to repository root. A PDF's arXiv stamp identifies the version when present. No current venue or repository status was inferred from another paper's reference list.

| ID | Exact PDF | Version checked |
|---|---|---|
| MA | `aligned-wiki/raw/2026-kim-ma-egoqa.pdf` | arXiv:2603.09827v2, 11 Mar 2026, 34 pp. |
| MY | `aligned-wiki/raw/2026-xiao-myego.pdf` | arXiv:2604.01966v1, 2 Apr 2026, 17 pp. |
| M3 | `aligned-wiki/raw/2026-long-m3-agent.pdf` | arXiv:2508.09736v4, 9 Oct 2025, 48 pp. The filename's 2026 is not the PDF's first-release year. |
| EX | `aligned-wiki/raw/2026-liu-egoexomem.pdf` | arXiv:2605.18734v2, 8 Jul 2026, 19 pp. |
| GEB | `aligned-wiki/raw/2026-ren-geb.pdf` | arXiv:2609.38155v1, 29 Sep 2026, 29 pp. |
| OS | `aligned-wiki/raw/2025-plizzari-osnom.pdf` | arXiv:2404.05072v2, 21 Jan 2025, 14 pp. |
| LD | `aligned-wiki/raw/2026-chaudhari-ledger.pdf` | arXiv:2610.10538v1, 7 Oct 2026, 48 pp. |
| ER | `aligned-wiki/raw/2026-wang-egomemreason.pdf` | arXiv:2605.09874v2, 18 Aug 2026, 23 pp. Header states COLM 2026. |
| E4 | `aligned-wiki/raw/2022-grauman-ego4d.pdf` | CVPR 2022 proceedings PDF, 18 pp., no arXiv stamp. |
| EE4 | `aligned-wiki/raw/2024-grauman-ego-exo4d.pdf` | arXiv:2311.18259v4, 25 Sep 2024, 99 pp. Expanded manuscript. |
| A101 | `aligned-wiki/raw/2022-sener-assembly101.pdf` | CVPR 2022 proceedings PDF, 20 pp., no arXiv stamp. This local PDF is not stamped arXiv v2 despite the review's linked arXiv URL. |
| LF | `aligned-wiki/raw/2022-soucek-look-for-change.pdf` | arXiv:2203.11637v1, 22 Mar 2022, 18 pp. |
| MOS | `aligned-wiki/raw/2025-zameni-moscato.pdf` | ICCV 2025 proceedings PDF, 12 pp., main-paper printed pp. 11600–11609. |
| ST | `aligned-wiki/raw/2025-schoonbeek-storm-psr.pdf` | arXiv:2510.12385v1, 14 Oct 2025, 26 pp. First-page footnote explicitly identifies an author accepted manuscript for CVIU, with final DOI pending. |
| SP | `aligned-wiki/raw/2026-mandikal-spoc.pdf` | arXiv:2503.11953v2, 23 Dec 2025, 25 pp. |

## Claim ledger: MA-EgoQA / EgoMAS

| Claim | Original evidence | Verdict and action |
|---|---|---|
| MA-EgoQA is a benchmark, EgoMAS its training-free centralized baseline | MA pp. 9–10, §5, Fig. 5 | Verified. Distinction retained. |
| Individual observation captions merged every 10 minutes | MA p. 10, §5.1 explicitly uses preceding ten-minute interval | Verified. Does not itself establish a full streaming video ingest. |
| Shared event fields When, What, Where, Who, How | MA p. 10 §5.1 and p. 9 Fig. 5 | Verified. |
| BM25 shared retrieval followed by agent-specific subqueries and retrieval | MA p. 10 §5.2, equations for Rsys and Raj | Verified. |
| Answer uses both system context and individual retrieved memories | MA p. 10 final response equation | Verified. |
| 1,741 questions, six agents, seven days | MA p. 6 §3.3 | Verified. |
| Five answer options | MA p. 7 §4 dataset construction | Verified. Chance is 20%, also Table 2. |
| Gemini 2.5 Flash EgoMAS 41.41%, all-caption concat 36.93%, gain 4.48 percentage points | MA p. 11 Table 2, corresponding Gemini rows | Verified. Arithmetic 41.41 − 36.93 = 4.48. Same backbone, different evidence organization. |
| Oracle 83.80% | MA p. 11 Table 2, Oracle Gemini row and setup paragraph | Verified. Oracle uses context used to generate questions, not a measured perfect end-to-end visual retrieval system. |
| 1.3 s is not Gemini 41.41% full camera-to-answer latency | MA pp. 13–14 §7.2, Fig. 6 | Verified qualification. Timing averages 100 randomly selected questions and uses EgoMAS Qwen2.5VL-7B-Instruct. |
| Figure asset really is Fig. 5 p. 9 | MA p. 9 rendered and visually compared with `assets/egomas-architecture.png` | Verified. Added Russian explanation of left and right panels. |
| GitHub construction script, Gemini merging, published inference contents | Review's implementation paragraph | Not PDF-verifiable. No code audit claimed by this reviewer. See coverage gaps. |

## Claim ledger: MyEgo

| Claim | Original evidence | Verdict and action |
|---|---|---|
| Personalized wearer grounding, distinct from generic visible-object QA | MY pp. 1–3, §3.1, Figs. 1–2 | Verified. |
| 5,012 manually annotated open-ended QA pairs from 541 videos | MY pp. 3–4 §§3.2–3.3 | Verified. Multiple-choice distractors additionally use model generation and filtering, so “manual” should not imply every distractor was written without models. |
| Ego4D, EgoLife, CASTEL2024 sources | MY p. 3: 182 + 257 + 102 = 541 videos | Verified. |
| GPT-5 46.1%, Qwen3-VL-8B 36.4% OE accuracy | MY p. 6 Table 2, visual check | Qualified. 36.4 is the **Instruct** variant. Thinking is 34.3. Corrected model name. |
| Open-ended “accuracy” metric | MY p. 5 §4.1 | Qualified. Added that GPT-5 mini issues binary answer-equivalence judgments. It is not exact-match accuracy. |
| Human 84.7% is measured on 300 questions | MY p. 5 evaluation paragraph and p. 6 Table 2 | Verified. Two students outside annotation on a random 300-sample subset. Existing caveat retained. |
| Average evidence/query gap about 20 seconds | MY p. 4 §3.3.1, Fig. 3 | Verified. “Current” means within 2 seconds, and the answer moment is never after the question. Does not support week-long memory. |
| Benchmark does not introduce a persistent memory architecture | MY §§3–4 | Verified characterization. Figure inserted is an example protocol, explicitly not an architecture diagram. |
| Separate camera, wearer, actor, speaker IDs in Aligned | No empirical claim in MY | Inference. Useful engineering recommendation, marked as Aligned interpretation. |
| CVPR 2026 venue and present GitHub resources | Not stated in the audited preprint as venue header | Not PDF-verifiable. Retained existing citation metadata, not newly certified. |

## Claim ledger: M3-Agent

| Claim | Original evidence | Verdict and action |
|---|---|---|
| Separate memorization and control processes | M3 p. 2 Fig. 1, pp. 8–11 §4 | Verified. Original Fig. 1 inserted. |
| 30-second audiovisual clips | M3 p. 9 Table 4 and p. 10 §4.4 | Verified. This is a processing unit, not the entire memory horizon. |
| Face and speaker tools produce persistent face_id and voice_id | M3 p. 9 §4.2 | Verified. |
| Graph stores raw text/image/audio, embeddings, weights and timestamps | M3 p. 8 Table 3 and p. 9 §4.1 | Verified. |
| Episodic observations and semantic facts, relationships and attributes | M3 pp. 9–10 §4.2 | Verified. Semantic memory is inferred knowledge, not guaranteed ground truth. |
| Face–voice equivalence and weight-based conflict voting | M3 p. 9 memory update paragraph and p. 10 Memory Generation | Verified. Model-produced equivalence updates edges, frequently supported mappings dominate. This does not establish calibrated identity confidence. |
| Control iterates Search or Answer | M3 pp. 10–11 §4.3 and Algorithm 1 | Verified. |
| Writer Qwen2.5-Omni-7B, imitation learning on synthetic demonstrations | M3 pp. 10–11 §4.4 | Verified. |
| Qwen3-32B controller, DAPO and correctness reward on final answer | M3 pp. 10–12 §4.4 and p. 14 Table 7 | Verified. Reward is binary GPT-4o answer evaluation. Not physical action-policy training. |
| Full results 30.7 / 48.9 / 61.8 on robot / web / VideoMME-Long | M3 p. 13 Table 5 and p. 14 Table 6 | Verified. |
| Without semantic memory 13.6 / 29.7 / 48.7, without equivalence 19.5 / 39.7 / 52.1 | M3 p. 14 Table 6, visual check | Verified. Control is fixed as control-32b-rl, explicitly in caption. |
| Robot perspective footage recorded by humans | M3 p. 6 Video Filming | Verified. Actors simulate robot behavior using head-mounted cameras. |
| No demonstrated bounded-growth memory or construction-site end-to-end latency | M3 method/evaluation scope | Inference about absence of evidence, not a complexity proof. Keep carefully worded as not demonstrated. |
| ICLR 2026 acceptance and `mmagent/retrieve.py` behavior | Neither verified by the original dated preprint | Not PDF-verifiable. |

## Claim ledger: EgoExoMem / E²-Select

| Claim | Original evidence | Verdict and action |
|---|---|---|
| One synchronized ego and exo stream | EX p. 1 Fig. 1, pp. 5–7 §4 | Verified for the method setting. Does not establish multi-day multi-worker association. |
| Independent CLIP query-frame similarities | EX p. 6 Eqs. 1–2 | Verified. |
| Query-relevance allocation of fixed view budget | EX p. 6 Eq. 3 | Verified. |
| Total 32 input frames in evaluation | EX p. 7 §5.1 | Verified. This is the evaluation budget, not an intrinsic fixed limit of the method. |
| Per-view k-DPP quality/diversity selection | EX p. 6 Eqs. 4–5 | Verified at paper level. Exact sampling vs greedy approximate MAP is a separate code question. |
| Selected frames merged chronologically before answer model | EX p. 7 Eq. 6 and adjoining paragraph | Verified. Training-free method. |
| InternVL3.5 concat 50.7 → E²-Select 56.3 | EX p. 8 Table 4 | Verified. Same backbone and overall column. |
| Gemini 2.5 Flash concat 55.3 → E²-Select 58.2 | EX p. 8 Table 4 | Verified. Must not cross-subtract different backbone rows. |
| LEMMA average duration 111 s, Ego-Exo4D 425 s | EX p. 3 §3.1 | Verified, exact means 111.3 s and 425.0 s. |
| Released `kdpp_select` uses greedy approximate MAP and lazy kernel columns | Original paper calls it sampling and presents an N×N kernel | Not PDF-verifiable. No conclusion about actual code memory complexity follows from the PDF alone. Existing explicit code attribution retained and flagged. |
| New figure is an E²-Select architecture | EX p. 1 Fig. 1 | Rejected characterization in advance. Caption explicitly calls it benchmark dual-view evidence, not method architecture. |

## Claim ledger: GEB

| Claim | Original evidence | Verdict and action |
|---|---|---|
| Entity biographies organize repeated observations of a physical instance, not a name alone | GEB pp. 3–4 §§3.1–3.2 | Verified. |
| 30-second clips, detector and within-clip tracker | GEB p. 13 Appendix A | Verified: YOLOE-26x-seg at 10 fps, BoT-SORT, track regrouping. |
| Observation stores crops, description, timestamps and source | GEB pp. 3–4 and p. 13 | Verified. |
| Match must agree with all retained references and strongly with one | GEB p. 5 Eq. 3 | Verified. It is all retained recent references, not every historical observation. |
| Same-frame spatial separation vetoes merging | GEB p. 5 Eq. 3 and p. 13 Appendix A | Verified. Absence of separation evidence is not proof of identity, explicitly stated in paper. |
| Entity, observation, episode and source-clip nodes | GEB p. 4 Eq. 2 | Verified. |
| Personalized PageRank propagates retrieval relevance | GEB p. 5 §3.4, p. 13 graph settings | Verified. |
| Controller sees references to not-yet-searched observations | GEB pp. 5–6 reading description, p. 9 Table 4 unsearched-observation ablation | Verified. |
| EgoLifeQA 500 questions, full 72.0%, no association 68.6%, name key 69.2%, appended captions 68.2% | GEB p. 9 Table 4 | Verified. Fixed controller and answer model explicitly stated. |
| These QA results are not identity precision/recall | GEB Table 4 reports QA accuracy | Verified metric distinction. No claim of a measured identity P/R made. |
| Approx. 52 hours, 308,244 observation description calls | GEB p. 14 Table 5 plus p. 13 one VLM call per observation | Verified by combining the stated count and per-observation procedure. These are locally served Qwen3.5-35B calls, not necessarily paid API calls. |
| Detection 10 fps | GEB p. 13 Appendix A | Verified. |
| Retrieval 13.6 s excludes ingestion, controller, answer generation | GEB p. 14 Appendix B | Qualified. Added 50 Ego-R1-Bench questions, one A100, 2.42 searches/question. The rerun uses full-week memory and is an upper bound on the earlier search corpus size. |
| Descriptions use ±40 s captions/transcripts | GEB p. 13 Description | Verified. Future context relative to an observation can enter descriptions. |
| Naming consolidates identities across days | GEB p. 13 Naming | Verified. |
| Offline construction is not made causal by query-time filtering | GEB p. 14 explicitly says written once offline, p. 13 query re-indexing | Verified description plus causal inference. |
| README-only / coming soon present repository status | No checkout read | Not PDF-verifiable. |

## Claim ledger: OSNOM / Lift, Match and Keep

| Claim | Original evidence | Verdict and action |
|---|---|---|
| Reconstruct mesh and poses, align monocular depth, lift mask centroids | OS pp. 3–4 §3.1 and p. 4 Fig. 2 | Verified. Inserted original Lift diagram, not mislabeled as the entire LMK pipeline. |
| DINOv2 appearance features and Hungarian appearance/location matching | OS p. 5 §3.2 Eqs. 4–8, p. 6 implementation details | Verified. |
| Unobserved object retains last state/position | OS p. 5 first paragraph | Verified. This is a persistence assumption. |
| 100 evaluation videos | OS p. 5 §4.1: 110 selected, 10 validation, 100 evaluation | Verified. |
| 64% at 1 minute and 37% at 10 minutes | OS p. 2 contribution C3, Fig. 4 p. 6 | Qualified. Values correct. Changed wording to temporal offset because §4.1 evaluates f ± δ, not uninterrupted out-of-sight duration only. |
| 30 cm tolerance plus identity | OS p. 6 Evaluation metric | Verified, PCL requires both. |
| Main results use human/interpolated masks | OS p. 5 §4.1, p. 7 detector ablation | Verified. VISOR ground-truth mask interpolations remove detector errors from main setting. |
| Reconstruction about 5 GPU-hours/video, association 1,000 fps | OS p. 6 implementation | Verified. Mesh: one 2080Ti, DINOv2 30 fps and lifting 200 fps on P100, LMK 1,000 fps on one CPU core. These are separate stages. |
| First observations projected backward | OS p. 4 Eq. 2 | Verified. Noncausal historical filling is explicit, even though association is described as online. |
| Third party could move an unseen tool | OS p. 5 dataset specifies single-participant videos and all motions caused by wearer | Inference for multi-worker deployment, not an evaluated OSNOM scenario. |
| 3DV 2025 acceptance, repository contents | Dated arXiv version does not certify current venue/release contents | Not PDF-verifiable. |

## Claim ledger: LEDGER

| Claim | Original evidence | Verdict and action |
|---|---|---|
| Object records, geometry, position histories, descriptions, including untouched objects | LD p. 6 §3 and §3.1 | Verified. |
| Vocabulary discovery → detector → 3D lifting with supplied or estimated poses | LD p. 5 Fig. 2 and p. 6 Discovery and geometry | Verified. Default text names Qwen3.5-9B, YOLO-World and WildDet3D. |
| Labels/distances for association, second mask-tracking pass for fragmentation | LD p. 6 Association and persistence | Verified. SAM 3 propagation merges fragments subject to co-occurrence and distance checks. |
| New rest segment needs repeated displacement observations | LD pp. 6–7 | Verified. May miss brief moves, acknowledged by authors. |
| Text-only baseline answerer does not receive frames | LD p. 5 Fig. 2(c), p. 7 Answering | Verified. |
| Coordinates metric only with pose scale, separate scenes not one registered map | LD p. 6 | Verified. |
| 0.99 m median, 1.41 m mean, 153 of 164 queries | LD p. 10 Table 4, p. 32 Table 20, visual check | Qualified. Added exact variant: SAM 3 detector, trajectory memory, EgoLoc poses, no SAM 3 consolidation. YOLO-World row is 1.06/1.46 with 148 returned predictions. |
| Query is object name, official benchmark uses crop | LD pp. 5, 7, 31–32 Appendix C | Verified. |
| Published success rates cannot be directly compared | LD p. 31 Table 19 footnote, p. 32 Table 20 | Verified. Authors' threshold is permissive enough for a clip-centroid baseline to pass 100%. Existing warning justified. |
| Offline construction and filtered snapshots do not establish causal streaming | LD p. 7 Answering, p. 11 limitations | Verified explicitly, not just inferred. |
| Scene changes harm construction and retrieval | LD pp. 10–11 RQ5 | Verified. Results pertain to stitched streams and scene-specific assumptions, not arbitrary workplace scenes. |
| Long dense recordings constrained by construction cost | LD p. 11 limitations and Appendix D | Verified at general scope. No end-to-end cost figure added. |
| Existing ledger architecture image corresponds to Fig. 2 p. 5 | Direct rendered-PDF comparison with `assets/ledger-architecture.png` | Verified. Added explanation of panels and last-observed timestamp. |
| README FastVGGT path and dataset-specific pose examples | Repository not read | Not PDF-verifiable in this audit. |

## Claim ledger: EgoMemReason

| Claim | Original evidence | Verdict and action |
|---|---|---|
| Benchmark rather than new memory system | ER pp. 1–4, §§1–3 | Verified. New figure caption explicitly marks a task diagram. |
| 500 questions, 5.1 evidence segments and 25.9 h backtracking | ER p. 1 abstract, p. 2 Fig. 2 and text, p. 7 statistics | Verified. Backtracking describes evidence temporal scope, not runtime or sum of retrieved clip durations. |
| Only past information relative to query | ER p. 4 formal V≤tq definition, p. 7 visual-evidence verification | Verified at task level. Does not prove every baseline's ingest is causal. |
| Gemini-3-Flash 39.6% | ER p. 8 Table 1 | Verified. |
| Oracle evidence 67.2% | ER p. 22 Appendix C.3 Oracle-Evidence Analysis | Verified. |
| Gap proves an individual retriever missed evidence | Table 1 uses sampled input frames for general MLLMs | Qualified. Replaced “search loses evidence” with broader input-evidence selection and explicitly said this is not a retrieval-recall measurement. |
| Same EgoLife week, not independent domain transfer | ER data construction in §3 | Verified source overlap, inference about dependence. |
| v1.1 shuffled answer options and remapping advice | Release behavior not established by PDF | Not PDF-verifiable. |
| PDF internally describes sampling budget inconsistently | ER p. 8 says 1,024 frames then downscaling, p. 22 Table 4 gives 39.6 at 512 and 37.8 at 1,024 for Gemini | Source inconsistency recorded. Review now says sampled past frames without assigning an unsupported unique effective budget. |

## Claim ledger: foundational datasets

| Claim | Original evidence | Verdict and action |
|---|---|---|
| Ego4D: 3,670 h, 931 wearers, 74 locations, 9 countries | E4 pp. 1, 3 | Verified for this first-release proceedings PDF. Not 3,000 merely from title. |
| Ego4D NLQ is interval localization, not free-answer QA | E4 p. 6 §5.1 | Verified: top-k recall at temporal IoU thresholds. |
| Ego4D VQ, object state changes and audiovisual tasks | E4 pp. 6–8 §§5.1–5.3 | Verified. |
| Participant count does not mean simultaneous cameras | E4 p. 1 says portions additionally have synchronized multi-ego video | Verified distinction. |
| Assembly101: 362 performances, 4,321 videos, 513 h, 53 people | A101 p. 1 abstract/introduction, p. 4 §4, p. 5 Tables 1–2 | Verified. 362 disassembly-assembly sequences recorded from multiple views, not 4,321 independent executions. |
| Synchronized views, hand poses, errors/corrections | A101 p. 1, pp. 3–5, Table 4 | Verified. Eight static + four egocentric views. |
| Toys differ from construction | A101 title abstract and p. 1 “take-apart toy vehicles” | Verified dataset fact, deployment caveat is inference. |
| Ego-Exo4D: 740 participants, 1,286 combined-view hours | EE4 p. 2 abstract, p. 10 Fig. 6 | Verified for v4 expanded manuscript. Fig. 6 also states 5,035 takes and ego+exo hours. |
| Synchronized ego/exo, expert commentary, dependencies, pose and proficiency | EE4 pp. 2–4, §§4–5, pp. 34–38 | Verified. |
| Proficiency annotations vary by domain and target | EE4 pp. 37–38 §5.3, Table 9 | Verified with nuance: demonstrator and demonstration tasks differ, bike repair/health excluded from demonstrator classification, all 8 scenarios retained for execution quality. |
| Original proceedings and expanded manuscript are the same version | Manifest distinguishes them | Not assumed. No mixing of earlier release numbers with v4 counts. |

## Claim ledger: Look for the Change

| Claim | Original evidence | Verdict and action |
|---|---|---|
| Ordered initial state → action → final state | LF p. 3 Fig. 2 and p. 5 Eqs. 9–10 | Verified. Causal order is a constraint, not causal identification from observational data. |
| Separate models for each category, frozen features | LF p. 6 §5.1 | Qualified wording. There are two MLP classifiers per category: one two-state classifier and one action classifier, not necessarily three independently trained classifiers. Corrected. |
| Alternating pseudo-label assignment and classifier optimization | LF pp. 3–6, Eqs. 1–2, training regime | Verified. |
| Exemplars downweight irrelevant videos | LF pp. 4–5 §3.1 | Verified. Rephrased unsupervised caveat precisely: extra image supervision, but no framewise action/state labels for training. |
| 34,428 videos, 2,642 h, 44 categories | LF p. 6 dataset collection | Verified. Annotated evaluation is much smaller, 667 videos/48 h, so total video count should not imply a fully annotated benchmark. |
| ChangeIt state/action precision 0.35 / 0.68 vs CLIP 0.30 / 0.63 | LF p. 8 Table 2 | Verified. CLIP baseline also uses the causal ordering constraint (§5.4 p. 7). |
| Outlet installing state precision 0.23 and tile cutting 0.28 | LF p. 14 Table 4, visual check | Verified, Ours column. CLIP's corresponding state values are higher at 0.35 / 0.45, so these categories do not support universal superiority. |
| Timestamp hits annotated interval, not defect geometry | LF p. 6 §5.2 | Verified. |
| One dominant transition ignores repetitions / partial completion | LF p. 5 ordering constraint says most prominent instance, other instances ignored | Verified method limit plus deployment inference. |

## Claim ledger: MOSCATO

| Claim | Original evidence | Verdict and action |
|---|---|---|
| Multiple object states across action sequence | MOS pp. 1–2 and p. 6 §4 | Verified. |
| GPT-4o uses ground-truth action segments, preserves/refines earlier properties | MOS p. 3 §3.1 stages 1–3 | Verified. Training pseudo-label process, not test-time access to ground-truth actions for trained model. |
| CLIP estimates point of change, GLIP estimates visibility | MOS p. 4 stages 4–5 | Verified. Added approximation that all affected objects share one change point within an action. |
| Parallel MSTCN++ state/action branches and SAI | MOS pp. 4–6 §§3.2–3.4, p. 7 implementation | Verified. States use multi-label sigmoid. |
| Inference uses predicted actions | MOS p. 6 Eq. 8, p. 8 discussion of pseudo-label baseline | Verified. Oracle action annotations apply to the separate Pseudo-Labels baseline. |
| CMU F1-Max 30.55 → 35.61 | MOS p. 7 Table 2, visual check | Verified, w/o SAI versus w/ SAI. |
| EGTEA F1-Max 12.85 → 8.04 | MOS p. 8 Table 4, visual check | Verified. Important negative result retained. |
| EGTEA segment F1@0.5 0.0 → 6.45 | MOS p. 8 Table 4 | Verified. Does not rescue framewise performance by changing the metric silently. |
| EgoPER subset excludes erroneous demonstrations | MOS p. 6 footnote 3 | Verified: only 213 normal videos. |
| State prediction alone not error detection | Dataset subset and task definitions | Valid inference. |
| New Fig. 2 is original architecture | MOS p. 4, printed p. 11603 | Verified by rendering and crop inspection. |

## Claim ledger: STORM-PSR

| Claim | Original evidence | Verdict and action |
|---|---|---|
| YOLOv8-M assembly-state stream and spatial/temporal stream | ST p. 3 Fig. 1, pp. 7–10 §4, p. 14 §5.4 | Verified. |
| ViT spatial encoder and temporal transformer | ST pp. 8, 10, 13 | Verified. |
| Stream probabilities combined and confidence accumulated before accepting completion | ST p. 7 Eq. 9 and p. 8 §4.2 | Verified, clarified equal averaging. |
| Partial occlusion motivates temporal stream | ST pp. 6–8 | Verified motivation and design. Not unconditional success under all occlusions. |
| IndustReal F1 0.891 → 0.901, delay 21.0 → 15.5 s | ST p. 14 Table 1, visual check | Verified. Added comparison is against IndustReal [43] baseline, not temporal-only stream. |
| MECCANO delay 99.8 → 88.6 s, F1 0.545 → 0.497 | ST p. 14 Table 1 | Verified. Negative F1 result retained. |
| Delay over true positives only | ST p. 6 Eq. 7, n = number of TPs | Verified. |
| Limited window and toy assembly | ST p. 13 w=256 frames, 64 sampled embeddings, dataset §5.1 | Verified. No claim of full shift memory or industrial tolerance inspection. |
| CVIU 2025 status | ST p. 1 footnote | Verified as accepted manuscript dated 2025. Final publication DOI/date not verified. |

## Claim ledger: SPOC

| Claim | Original evidence | Verdict and action |
|---|---|---|
| Spatial actionable/transformed regions, with background class | SP pp. 3–5 §§3.1–3.4 | Verified. |
| Grounding DINO, SAM, tracking, CLIP pseudo-labels | SP p. 4 Fig. 2, p. 6 implementation | Verified. Tracker is DeAOT in SAM-Track pipeline. |
| Causal ordering and ambiguity resolution refine labels | SP p. 4 §3.3 | Verified. This is monotonic progression prior, not support for arbitrary reversible repair cycles. |
| Local and global features with transformer | SP pp. 4–5 §3.4, Fig. 3 | Qualified by naming local CLIP and global DINOv2. |
| Generalizes to any new action | SP p. 4 explicitly trains per verb and leaves unseen actions to future work | Not supported. Added per-verb limitation to avoid implied open-action capability. |
| WTC-HowTo mIoU 0.502 vs SAM+GPT-4o 0.427 | SP p. 6 Table 2 | Verified. Mean IoU over actionable/transformed masks, not overall pixel accuracy. |
| WTC-VOST mIoU 0.267 | SP pp. 5–6, Table 2 | Qualified. Same HowTo-trained model, out-of-distribution transfer. VOST test subset includes only chop/peel. Rephrased to avoid treating 0.502→0.267 as an isolated ego-view ablation. |
| A single mask spanning both states cannot express distinct labels | SP p. 8 failure discussion | Verified. |
| Partial transformed area does not establish thickness or hidden quality | No construction quality evaluation | Inference for Aligned. |
| WACV 2026 venue | No WACV 2026 header or acceptance statement in audited PDF | Not PDF-verifiable. |

## Figures and visual verification

All added images are direct PyMuPDF rasterizations of original PDF rectangles at 3× scale. No generated diagram, reconstructed architecture, labels altered in pixels, or external screenshot is presented as original. Every final crop was opened with `view_image`. Crop coordinates below use PDF points `(x0, y0, x1, y1)`.

| Asset under `docs/research/assets/` | Source | Crop | Visual verdict |
|---|---|---|---|
| `pdf-audit-m3-agent-fig1.png` | M3 p. 2 Fig. 1 | 70,435,543,640 | Complete diagram, all workflow labels visible. |
| `pdf-audit-geb-fig2.png` | GEB p. 3 Fig. 2 | 106,80,508,246 | Grounded observation, identity timeline, episode context, reader visible. |
| `pdf-audit-moscato-fig2.png` | MOS p. 4 Fig. 2 | 58,68,556,309 | All three branches and SAI output visible. |
| `pdf-audit-storm-psr-fig1.png` | ST p. 3 Fig. 1 | 145,136,446,305 | Both streams, video/procedure inputs and classifier visible. |
| `pdf-audit-spoc-fig2.png` | SP p. 4 Fig. 2 | 82,70,532,320 | Panels a/b/c complete including frozen/trainable symbols and label legend. |
| `pdf-audit-osnom-fig2.png` | OS p. 4 Fig. 2 | 49,69,547,193 | Mask→depth→3D panels complete. Caption limits claim to Lift stage. |
| `pdf-audit-egoexomem-fig1.png` | EX p. 1 Fig. 1 | 139,259,476,422 | Dual-view example and answer options visible. Caption says task example. |
| `pdf-audit-egomemreason-fig1.png` | ER p. 2 Fig. 1 | 108,79,505,232 | Entity/event/behavior questions and evidence timeline complete. |
| `pdf-audit-myego-fig2.png` | MY p. 3 Fig. 2 | 58,71,555,236 | Both examples, timestamps and (a)/(b) panel labels visible. |
| Existing `egomas-architecture.png` | MA p. 9 Fig. 5 | Existing file, unchanged | Matches original. Existing crop includes English figure caption. |
| Existing `ledger-architecture.png` | LD p. 5 Fig. 2 | Existing file, unchanged | Matches original panels, title and embedded example. |

Tables inspected as rendered images, in addition to text: MyEgo Table 2, M3 Table 6, LEDGER Table 4, MOSCATO Tables 2 and 4, STORM Table 1, Look for the Change Appendix Table 4. Initial temporary MyEgo/LEDGER table crops omitted the last row, so they were expanded and re-inspected before accepting the values. These temporary crops were not delivered as figure assets. Other tables had unambiguous extracted row/column order and were checked against associated prose and captions.

## Coverage limits and remaining gaps

1. **All 15 assigned papers were opened as original PDFs.** Every numerical result in sections 5–6 has a ledger row, including adverse comparisons and timing exclusions. Architectural claims are mapped above. No numeric mismatch was found in the main reported values, but several important protocol qualifications were added.
2. **Venue metadata is not fully verified by this PDF-only pass.** In particular MyEgo/CVPR 2026, M3-Agent/ICLR 2026, OSNOM/3DV 2025 and SPOC/WACV 2026 need proceedings or official acceptance evidence if the parent review requires publication-status certification. This audit neither confirms nor retracts those existing labels. STORM's accepted CVIU status and EgoMemReason's COLM header are explicit in the PDFs.
3. **Implementation and release-status paragraphs remain outside this audit.** Specifically MA-EgoQA's construction script, MyEgo repository contents, M3 retrieval mappings, EgoExoMem greedy/lazy kernel implementation, GEB coming-soon status, OSNOM released stages, LEDGER README pose paths, EgoMemReason v1.1 answer remapping, and dataset repository availability need separate source-code/release evidence. Existing statements were not silently converted into PDF-certified facts.
4. **No metrics were reproduced.** Verification means faithful reporting of the originals, not independent validation of labels, confidence intervals, identity correctness, hidden leakage, or author-provided timing measurements.
5. **The six-layer Aligned proposal and construction examples remain explicitly engineering hypotheses.** Dataset results do not validate 100-worker entity matching, defect tolerances, causal shift-long operation, source-clock synchronization, or the 18,000–36,000 camera-hour deployment scale. The latter comes from the review's workload scenario rather than any of these papers.
6. **EgoMemReason sampling inconsistency is in the source.** The 39.6/67.2 oracle comparison is explicit, but a unique effective full-video frame budget cannot be certified from the conflicting main setup and Appendix Table 4. The revised prose avoids assigning one.
7. **Figures for benchmarks are not architectures.** MyEgo, EgoExoMem and EgoMemReason captions explicitly say what the original figure shows. OSNOM's added image shows Lift only. No unsupported full-system architecture was invented.
