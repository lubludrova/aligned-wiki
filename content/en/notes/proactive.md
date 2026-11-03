# Independent original-PDF audit: proactive, streaming, grounded QA, construction

Audit date: 2026-11-01. Scope: all material architecture, protocol, dataset and numerical claims in `docs/research/parts/proactive.md` (review sections 7–10 and synthesis). Evidence was freshly extracted from the original PDFs with PyMuPDF / `pdftotext -layout`. Previous audit files, evidence summaries and wiki summaries were not used. Page numbers below are **1-based PDF pages**, not printed proceedings pages unless explicitly specified. This verifies what the authors report, not reproduction or external validity.

Verdicts: **confirmed** = supported by the named original PDF. **qualified** = support requires the stated scope or correction. **unverified/removed** = not established by an available original PDF and removed from the narrative. **inference** = review author's design interpretation, not a paper result.

## Source inventory and version control

| Key | Original PDF / version inspected |
|---|---|
| E | `aligned-wiki/raw/2024-lee-egoper.pdf`, CVPR 2024 proceedings, pp. 18655–18666, 12 PDF pages |
| T | `aligned-wiki/raw/2026-seminara-tgml.pdf`, arXiv:2502.17753v2, 38 pages. Reported graph/mistake numbers apply to this version, not independently to the TPAMI final. |
| D | `docs/research/pdf-audit/2024-dtgl.pdf`, official NeurIPS 2024 proceedings, 35 pages. [Original URL](https://papers.nips.cc/paper_files/paper/2024/file/6d19163eaec3b0f0accbe462a0139466-Paper-Conference.pdf). |
| M | `aligned-wiki/raw/2025-patsch-mistsense.pdf`, ICCV 2025 proceedings, pp. 14528–14537, 10 pages |
| P | `aligned-wiki/raw/2026-wen-provia.pdf`, arXiv:2609.20638v1, 9 pages |
| I | `aligned-wiki/raw/2025-chavan-indego.pdf`, arXiv:2511.19684v1, 53 pages |
| O | `aligned-wiki/raw/2026-zeng-onestreamer.pdf`, arXiv:2610.01762v1, 29 pages |
| A | `aligned-wiki/raw/2026-liao-proactegomem.pdf`, arXiv:2610.30089v2, 29 pages |
| G | `aligned-wiki/raw/2025-chen-gelm.pdf`, arXiv:2408.14469v1, 21 pages. The file is a 2024 preprint despite the filename and AAAI 2025 bibliographic label. |
| S | `aligned-wiki/raw/2026-wang-s-ember.pdf`, arXiv:2607.02689v2, 17 pages |
| B | `docs/research/pdf-audit/2009-d4ar.pdf`, ITcon 14 (2009), printed pp. 129–153, 25 pages. [Original URL](https://www.itcon.org/papers/2009_13.content.06965.pdf). |
| C | `docs/research/evidence/proactive/2026-constructai.pdf`, AAAI 2026 proceedings, printed pp. 40167–40175, 9 pages |
| Q | EgoConQS, DOI 10.1016/j.autcon.2024.105933. **Original PDF unavailable.** Publisher access and author-uploaded ResearchGate page were checked, direct retrieval returned 403. Search-visible abstracts/full-text transcriptions do not count as original PDF verification. |
| H | EgoSafe / *Egocentric camera-based method for detecting static hazardous objects on construction sites*, DOI 10.1016/j.autcon.2025.106048, SSRN 4936193. **Original PDF unavailable.** SSRN Delivery PDF URL returned HTTP 403, publisher page offers article access. Do not confuse with the distinct 2026 mobile safety benchmark named EgoSafe. |

## EgoPER / EgoPED

| Claim | PDF locator | Evidence checked | Verdict / narrative action |
|---|---|---|---|
| EgoPER is the dataset, EgoPED the method | E pp. 3–4, §§3–4 | Separate dataset and framework definitions | confirmed |
| Omission, addition, modification, slip, correction taxonomy | E p. 4, §3.2 | Five explicitly defined categories, including corrective actions | confirmed |
| Learns multiple normal-step prototypes | E p. 5, §4.2.2 | K-means on hybrid features and contrastive InfoNCE objective | confirmed |
| I3D holistic features and temporal segmentation | E pp. 4–5, §§4.1, 4.2.1 | I3D features, TAS backbone and frame classification | confirmed |
| Active hands/objects, per-frame graph and GCN, feature concatenation | E p. 5, Figs. 4–5 | AOD gives boxes and contact state, edges connect active objects, GCN representation concatenates with holistic features | confirmed |
| Prototype similarity threshold and segment smoothing | E p. 6, §4.2.3 | Cosine comparisons, per-step threshold, majority vote per predicted segment | confirmed |
| Omission detector compares nearest normal step sequence | E p. 6, §4.2.3 | Edit-distance nearest training transcript, missing-step set difference | confirmed |
| Offline, full video at inference | E p. 4, §4.1 | Explicit offline setting, entire test video available | confirmed |
| 57.0 EDA / 62.0 AUC vs S3R 43.0 / 54.9 | E p. 6, Table 3 | All-task column, EgoPED with AF and S3R rows | confirmed, not notification precision |
| Five cooking tasks, 386 videos, 11 participants, two environments | E p. 3, §§3.1–3.2 | Dataset collection and task list, 213 normal + 173 error videos | confirmed |
| Scripted error collection, normal-only training still requires step labels | E pp. 3–4, §§3.1, 4.1 | Instructions induce deviations, normal training videos have framewise step labels | confirmed |
| Prototypes on train, thresholds on normal validation | E pp. 6–7, §§4.2.3, 5.1 | 80/10/10 normal-video split, error videos in test, per-step statistics computed on validation | confirmed as paper protocol |
| `test_ed.py`/`get_thresholds` implementation and access-request README | No original-PDF evidence | A paper cannot certify a code inspection or present access status | unverified/removed, replaced with paper protocol |

## TGML / DTGL

| Claim | PDF locator | Evidence checked | Verdict / narrative action |
|---|---|---|---|
| Task graph encodes partial order, allows alternatives in ordering | T pp. 1–4, Fig. 1, §III | DAG dependencies and likelihood of next step given observed-step set | confirmed |
| DTGL is NeurIPS 2024 predecessor | D p. 1 conference footer and title; T introductory discussion | Official proceedings identity and related maximum-likelihood formulation | confirmed. TPAMI 2026 final publication identity is bibliographic context, final PDF not independently compared. |
| DO optimizes weighted adjacency matrix through TGML loss | T p. 5, §III-B1 | Direct gradient descent on edge-scoring matrix, softmax normalized adjacency | confirmed |
| TGT can use textual or visual step embeddings | T p. 6, Fig. 3 and §III-B2 | Frozen EgoVLPv2, random exemplar per step for video, learned start/end embeddings | confirmed |
| TGT architecture predicts edges | T p. 6, Fig. 3 | Step transformer, DCEL regularizer, concatenated node pairs, relation transformer, adjacency output and TGML objective | confirmed, prose made more concrete |
| Thresholding, transitive reduction, weakest-cycle-edge removal | T p. 7, §III-D | Postprocessing described separately from differentiable training | confirmed |
| Check prerequisites against observed step history | T p. 12, §IV-E | Precondition set for current step compared with prior recognized actions | confirmed, this does not store rich object/work-item state |
| Graph F1 87.8 / 91.0 / 72.3 on CaptainCook4D / EgoPER / EgoProceL | T p. 8, Tables I–III | DO mean F1 columns, with SD 1.5 / 2.1 / 2.2 respectively | confirmed |
| Assembly101-O recognized-action DO average F1 53.5 and error F1 28.1 | T p. 13, Table VI, `DO+` row | Bottom block uses automatically predicted action sequences, separate class-error F1 column | confirmed, not ground-truth-action performance |
| Frequent order is not automatically normative, work-item binding needed | Not an empirical paper claim | Explicit Aligned transfer analysis | inference, kept labelled as our conclusion |

## MistSense

| Claim | PDF locator | Evidence checked | Verdict / narrative action |
|---|---|---|---|
| Frozen visual encoder/image Q-Former, temporal Video Q-Former | M pp. 3–4, §§3.1–3.3, Fig. 2 | Frozen image feature extraction and trainable temporal queries | confirmed |
| MediaPipe hands, temporal hand encoder, Hand Q-Former, fused classifier | M pp. 3, 6–7, §§3.1, 4.3, 4.6 | Predicted poses, hand feature pathway, features summed for mistake logits | confirmed |
| Gate triggers LLM from RGB-only representations | M p. 4, §3.2, Eq. 1, Fig. 2 | Thresholded sigmoid logits gate Video Q-Former features, not hand features | confirmed |
| ViT-L, Llama2-7B, projection training and LoRA | M pp. 4–5, §3.3 and p. 7, §4.6 | Projection-only first explanation stage, then LoRA adapted LLM, model identities | confirmed |
| Epic-tent-O RGB+predicted hands 63.3 overall F1 vs DO 46.5 | M p. 6, Table 3 | Correct mean-F1 column and rows | confirmed |
| Full Epic-tent error supervision changes comparison | M pp. 5–6, §§4.2–4.3 | MistSense requires error annotations and uses unmodified original Epic-tent for training | qualified, not matched training-data architecture ablation |
| HoloAssist overall F1 55.7, mistake precision 10.3 and recall 31.6 | M p. 5, Table 1 | RGB+H(P) row, average F1 vs separate mistake precision/recall | confirmed |
| Explanation BLEU/ROUGE-L/CIDEr | M pp. 5–6, Tables 2, 4 | Text-similarity evaluation | confirmed, causal validity is not established by these metrics |
| About 4 seconds and 20.5 GB on one RTX A6000 | M p. 7, §4.6 | One inference run including detection and explanation | confirmed, not multi-camera throughput |
| Existing architecture crop | M p. 4, Fig. 2 | Viewed the existing PNG, visually consistent with original figure and complete model branches | confirmed, Russian explanatory caption improved |
| No official code exists | No original-PDF support for absence | Absence cannot be inferred from paper text | qualified: code reproducibility not established in this PDF-only audit |

## PROVIA

| Claim | PDF locator | Evidence checked | Verdict / narrative action |
|---|---|---|---|
| Separate factual history from accepted progress | P pp. 1, 4–5, §IV-D | Factual per-actor state updates from all observed steps, posterior over automaton state and execution status | confirmed |
| Online segmenter and automaton induced from correct demonstrations | P pp. 3–4, §§IV-B–C, Fig. 1 | Causal segmentation, decoded demonstration prefix tree, Bayesian state merging | confirmed |
| Correct/mistake/correction status, only correct advances procedure | P pp. 4–5, §IV-D | Transition operators preserve procedure state for mistake/correction branches | confirmed, insertion status additionally used where applicable |
| Sequential detector accumulates evidence and emits alarm | P p. 5, §IV-E | Sequential statistic and validation-selected alarm threshold | confirmed |
| Supervised steps and status labels, not normal-only learning | P pp. 3, 5, §§IV-B, IV-F | Segmenter trained from step supervision, status model trained after freezing segmenter with mistake/correction labels | confirmed |
| Score full trials and later errors, validation budget fixed for test | P p. 2, §III and p. 8, Table IV caption | Complete recordings, thresholds maximize validation recall under false-alarm budget then frozen | confirmed |
| Budget 0.1: recall CC4D .154, HoloAssist .034, IndustReal .098 | P p. 8, Table IV | PROVIA row, each dataset's 0.1 column | confirmed |
| Test false-alarm rates .075 / .093 / .126 per correct minute | P p. 8, Table IV | FA columns corresponding to same frozen 0.1 thresholds | confirmed |
| Does not beat all perception-free controls on IndustReal | P p. 7, §V-F; p. 8, Table IV | Explicit paper conclusion and control rows | confirmed |
| Grace matching is not one-to-one | P p. 2, §III; p. 7, §V-F | One decision grace may credit preceding mistake, one alarm may credit two adjacent mistakes | confirmed, made explicit |
| Strict one-to-one CC4D recall falls .154 → .094 at 0.1 budget | P p. 7, §V-F | Ablation comparison reports .094 and best competitor .081 | confirmed, added to narrative to quantify caveat |
| Existing PROVIA figure | P p. 4, Fig. 1 | Viewed existing crop, complete factual-state/filter/segmenter diagram matches PDF | confirmed |
| `alarm_protocol.py` and `operating_points.py` code behavior | No original-PDF verification of implementation | Fresh audit cannot inherit previous code audit | unverified/removed, replaced with PDF protocol |
| 0.1/minute implies six/hour | Arithmetic, not article measurement | 0.1 × 60, conditional on preserving rate | inference, explicitly labelled |

## IndEgo

| Claim | PDF locator | Evidence checked | Verdict / narrative action |
|---|---|---|---|
| Industrial assembly/repair/logistics/woodworking and collaboration | I pp. 2–6, §§1, 3 | Dataset domains and collaborative tasks | confirmed |
| Dataset/benchmark suite, not deployed assistant | I pp. 1–2, 7–10 | New dataset and benchmark tasks | confirmed |
| 3460 ego videos / 197.1 h, 1092 exo / 96.8 h | I p. 2 and p. 4, Table 2 | Unique recording and duration totals | confirmed |
| 20 participants | I p. 5, Participants; p. 19, Appendix C | 15 male and five female participants | confirmed |
| Actions/task graphs/mistakes/narration/Aria sensor data | I pp. 5–7, §3.3, §4.1 | Annotation and device modality descriptions | confirmed |
| Mistake benchmark 1166 sequences, 25 tasks | I p. 7, §4.1 | Correct executions plus planned and unplanned mistakes | confirmed |
| Gemini F1 40.9 and VideoLLaMA3+MLP 39.5 | I pp. 7–8, Table 3 and model key | GFT is **Gemini 2.0 Flash Thinking Experimental**, VL3+MLP uses extracted action-step embeddings | confirmed, Gemini version clarified |
| Singular-action QA Gemini 64.1 vs human 90.0 | I pp. 9–10, Table 7 | Accuracy column, four human evaluators with access to industrial tool database | confirmed, table reference corrected |
| Early mistake detection receives initial 50% of known segment | I p. 8, Table 3 caption and §4.1 | Segment prefix protocol, not autonomous stream onset detection | confirmed |
| Scripted mistakes, limited workshops, approximate ego/exo sync | I pp. 23–24, Appendix E.4; pp. 45–47 limitations/checklist | Devices not automatically synchronized to Aria, start times approximate, staged subset and participant/setting limits | confirmed |

## OneStreamer

| Claim | PDF locator | Evidence checked | Verdict / narrative action |
|---|---|---|---|
| FIFO recent visual window plus timestamped Observe/Summary history | O pp. 3–4, §3.2, Fig. 3; p. 14, Appendix A.2 | Captions written while stream unfolds and retained after original visual frames leave FIFO | confirmed, prose corrected to avoid implying captions are generated only when frames expire |
| Silence/Standby/Response states | O p. 5, §3.3; p. 14, Table 5 | Three states for proactive QA, proactive interaction uses two of these | qualified, family-specific state vocabularies |
| Selective transition/state supervision reduces repetitive silence | O p. 5, §3.3; p. 14, Appendix A.1 | Output anchors retained, frequent groups capped, both transition and persistence sampled | confirmed |
| Qwen3-VL-4B-Instruct fine-tuning | O p. 7, Implementation Details | Single-stage supervised fine-tuning of named base model | confirmed |
| ASI 63.5 → 71.6 at same checkpoint/recent-16 window | O p. 8, Table 2 | FIFO vs PHCM, caption memory presence differs | confirmed |
| .124 s TTFT on one 360 s OVOBench sample, H200, precomputed captions | O p. 9, Table 4 and caption | Answer-stage latency only, source video and hardware explicitly specified | confirmed, excludes memory construction |
| .636 s per online update | O p. 26, Table 19, Appendix E.3 | One 360 s StreamingBench clip, 1 update/sec, 32 s visual window at 4 FPS, H200, decode/preprocess/inference included | qualified, small separate throughput test not recent-16 answer ablation |
| Caption loss cannot reconstruct omitted visual specifics | Inference based on O pp. 4, 14 | Historical path stores text after visual eviction | inference, kept as Aligned design limitation |
| Weight availability | Not established by original PDF | Current release status requires separate repository/access check | qualified, no availability claim made |

## ProactEgoMem

| Claim | PDF locator | Evidence checked | Verdict / narrative action |
|---|---|---|---|
| Benchmark for proactive memory, not a new model architecture | A pp. 1–3, Fig. 2 | Defines evaluation tasks and notification/intervention levels | confirmed |
| Information capture, state tracking, location tracking | A pp. 2–4, §3, Fig. 2 | Three ambient-memory task families | confirmed |
| Notification vs tool start/maintain/end lifecycle | A pp. 2–4, Fig. 2, §3 | Notification sends message, intervention controls lifecycle and completion message | confirmed |
| Daily 300 clips /16 h /1000 QA, Sci 100 clips /6.47 h | A p. 6, Table 3 | Paired Daily/Sci statistics, Sci additionally has 500 QA | confirmed |
| 1 request per second, last 10 frames at 1 FPS, active tools and latest 5 history records | A p. 6, §5.2 | Explicit simulated streaming input and JSON protocol | confirmed |
| No/proactive/oracle memory comparison | A p. 8, §5.4, Fig. 6 | Uniform frames vs tool-acquired frames vs GT event windows, QA after stream ends | confirmed |
| Oracle ≥20 accuracy points above acquired memory in 34/36 valid cells | A p. 8, §5.4 | Explicit count in text for Daily task/model comparison | confirmed, old Fig. 10 citation corrected to Fig. 6 / §5.4 |
| Delayed actions, fragmented tools, unclosed state | A p. 9, §5.6, Fig. 10; pp. 20–22, Figs. 16–19 | Failure traces and lifecycle errors | confirmed |
| Timing scores are not wearable wall-clock latency | A p. 6, §5.2; p. 17, timing discussion | Requests simulate stream time, timing measured against annotated boundaries | inference from explicit protocol, retained distinction |
| New diagram | A p. 2, Fig. 2 | Rendered and visually inspected exact figure crop | confirmed, caption explicitly calls it benchmark |

## GeLM / MultiHop-EgoQA

| Claim | PDF locator | Evidence checked | Verdict / narrative action |
|---|---|---|---|
| Frozen InternVideo features and Vicuna-7B | G pp. 4–5, §§5.1–5.2, Fig. 3; p. 7 implementation | Frozen visual encoding, InternVideo-MM-L-14 and Vicuna-7B v1.3, projection into multimodal representation | confirmed |
| Grounding tokens enclose answer phrases, hidden states query temporal grounding | G pp. 4–5, §§5.2–5.3, Fig. 3 | `<T>...</T>` pairs define separate grounding queries | confirmed |
| Saliency transformer and similarity branch | G pp. 4–5, §5.3 | Joint saliency across video and separate query/frame similarity, predicts multiple intervals | confirmed |
| Saliency supervision improves similarity mIoU 13.4 →16.7 | G p. 7, Table 3 and ablation paragraph | Adding saliency BCE to language + similarity objective | confirmed |
| IoU@.3 14.1 →18.2 | G pp. 6–7, Eq. 11, Table 3 | Percentage with set-of-intervals IoU **exceeding** .3 | confirmed, narrative now says >.3 |
| About three-minute clips | G p. 3, §4.1 | Ego4D cut into non-overlapping three-minute clips | confirmed |
| QA score GeLM 4.8 vs GPT-4o 5.4 out of 10 | G p. 6, Table 2 and §6.1 | GeLM fine-tuned 180 frames, GPT-4o zero-shot 60 frames, judge score not accuracy | qualified, different protocols preserved |
| Claim-level evidence is design implication | G pp. 4–5 supports phrase-grounding structure | Aligned proposal, not established construction performance | inference |
| Version | G p. 1 | arXiv:2408.14469v1, 26 Aug 2024 | clarified in narrative, no silent transfer of numbers to final proceedings |

## S-EMBER

| Claim | PDF locator | Evidence checked | Verdict / narrative action |
|---|---|---|---|
| GQ@.5 combines correct semantic answer and temporal IoU threshold | S pp. 6–7, §4.2 | Joint metric differs from pure grounding recall | confirmed |
| 9448 QA, 3141 clips, 613 wearers, 388 aggregate hours | S pp. 1, 4–5, Table 1 and §3 | Dataset statistics, aggregate duration not per-query context | confirmed |
| Clips typically 5–20 minutes | S p. 3, Fig. 1 caption; p. 15 conclusion | Caption says **typically**, Table 1 mean 7.4 minutes | qualified, narrative should not imply strict minimum/maximum for every clip |
| Gemini 3.1 Pro GQ .297, human .698 | S p. 7, Table 3 | Correct GQ column | confirmed |
| Human result is annotation-derived reference | S p. 7, §5.1 Human Performance | Independently written answers and inter-annotator interval agreement | confirmed, not a matched timed inference experiment |
| Qwen3VL-32B mIoU .018 →.412 with per-frame offsets, 128-frame match | S p. 9, §7 | Explicit ablation statement | confirmed |
| Benchmark diagram | S p. 3, Fig. 1 | Original crop rendered and visually inspected, includes trigger timestamp and prior evidence | confirmed, caption identifies benchmark annotation protocol |
| Non-commercial license | Not in inspected PDF | License status belongs to current dataset terms, not PDF result | unverified/removed, replaced with requirement for separate license check |
| Overlap does not establish causal use, abstention tests needed | Not a paper result | Aligned evaluation proposal, counterfactual/deletion tests | inference, explicitly framed |

## D4AR

| Claim | PDF locator | Evidence checked | Verdict / narrative action |
|---|---|---|---|
| Ordinary progress photos recover camera location/orientation and sparse scene | B p. 1 abstract; pp. 12–14, §4.1 | SIFT matching, SfM and bundle adjustment | confirmed |
| Register as-built scene with as-planned 4D representation | B p. 1; p. 12, §4.1; pp. 16–18 | Geometric registration, planned schedule and 3D model, visual progress comparison | confirmed, BIM is broad modern shorthand for described 3D/4D as-planned model |
| Preliminary results on three construction projects | B p. 1 abstract; p. 3; pp. 17–22 applications/conclusion | Explicit three-project pilot scope | confirmed |
| Not helmet long-video QA or hidden-defect verification | B scope and methodology | No such task is evaluated | qualified, Aligned transfer limit |

## Missing original construction PDFs

| Claim removed or limited | Missing source | Evidence status | Verdict / narrative action |
|---|---|---|---|
| EgoConQS video self-stitching graph network | Q | Publisher abstract mentions it, but no original PDF architecture inspected | unverified/removed from architecture discussion |
| EgoConQS recall 35.85%, mAP 6.07% | Q | Search-visible abstract agrees, but table, split, denominator, thresholds unavailable in original PDF | unverified/removed from headline narrative |
| Recall averaged across k and tIoU | Q | Would require original Tables 5–6 and evaluation definition | unverified/removed |
| EgoSafe helmet wide-angle/Grounding DINO | H | SSRN abstract supports only general camera/OVOD concept, original model specification unavailable | unverified/removed |
| EgoSafe >5000 Tuscaloosa images, 79.0 weighted F1 | H | Headline F1 appears in abstract, dataset/split not independently inspected in PDF | unverified/removed |
| Correct class may coexist with incorrect localization | H | Full original limitation text unavailable | unverified/removed as paper-specific claim |
| Both papers concern construction quality/safety | Q/H bibliographic titles and publisher/author pages | Narrow bibliographic placement only | qualified, retained with conspicuous missing-PDF status, not counted as verified results |

The missing PDFs are not replaced with wiki summaries, related-paper descriptions, browser text transcriptions, or search snippets. No claim is labelled “PDF verified” on that basis.

## ConstructAI

| Claim | PDF locator | Evidence checked | Verdict / narrative action |
|---|---|---|---|
| Deployed construction/power-grid monitoring in China | C pp. 1–3, 6–8 | Named Chinese deployments and power-grid/construction scope | confirmed as author deployment report |
| Helmet cameras, fixed CCTV, drones | C p. 3 Multi-Source Input; p. 4 Fig. 2; p. 7 Deployment | Three input types | confirmed |
| Edge detectors plus cloud reasoning/segmentation | C p. 7 Deployment Strategy | Lightweight edge models create event streams, full cloud stack with MLLM and SAM2 | confirmed |
| LLaMA3/LoRA and SAM2/adapter | C p. 4 Fig. 1 and caption | Exact labels in original architecture figure | qualified, p. 3 describes language backbone more generally as LLaVA-like, checkpoint not pinned |
| SEG token connects language and segmentation | C p. 3 ConstructAI subsection, Fig. 1 p. 4 | Decoupled language/segmentation backbones connected through shared SEG token | confirmed, added detail |
| Detect, assign manager, rectify, verify with fresh imagery, archive | C pp. 4–5 Output; p. 7 Deployment Strategy | New video/photo verification, responsibility and issue tracking, archived records | confirmed as reported workflow, accuracy of automatic closure not separately measured |
| Ref-Construct J&F 46.6 zero-shot /55.6 fine-tuned, MeViS 10.4 | C p. 7 Table 2 | Validation segmentation metric and comparison rows | confirmed, not violation recall |
| Completion rate 2.3→75.8%, delay ~340→~15 min, alert <10 sec | C p. 8 Table 3 | Separate outcome columns, 21/929 and 910/1200 completed rectifications | confirmed, distinct quantities, author before/after report |
| Intro time comparison conflates rectification and alert | C pp. 1–2 vs pp. 7–8 | Intro calls response seconds against minutes, detailed table separates stages | qualified, narrative uses Table 3 distinctions |
| 929→1200 detections is not recall improvement without denominator | C pp. 7–8 Table 3 | Detected-count totals, no total true-violation denominator | qualified, paper's recall wording not adopted |
| 28000 video-hours and >9000 reports | C p. 2, overview, p. 1 reports | Reported operational volume | confirmed as author report only |
| Before/after lacks described randomization | C pp. 6–8 Tables 1, 3 and deployment text | No randomized allocation/control protocol presented | qualified, association not causation |
| DeepSeek-R1 / Qwen2-72B pseudo-annotation input unclear | C p. 5 Ref-Construct annotation; p. 9 reference | Describes images/crops sent to named models, Qwen citation points to Qwen2-VL, model naming/interface unresolved | qualified, uncertainty preserved, no invented visual adapter |
| Training recipe inconsistent in specificity | C p. 3 training paragraph vs p. 5 Training and Testing | Two-stage general→domain adaptation vs one-for-all end-to-end and no task-specific pretraining | qualified, narrative flags unresolved recipe rather than harmonizing silently |
| Public code/benchmark availability | C entire 9-page paper | No adequate release/specification link located | qualified: PDF does not establish reproducibility, no claim that code cannot exist elsewhere |
| New architecture figure | C p. 4 Fig. 1, printed p. 40170 | Original crop rendered and visually inspected, all input/model/output branches retained | confirmed |
| Transfer to US, safety causality, weeks-long QA not demonstrated | C evaluated tasks and deployment scope | No matching experiment | qualified, retained as limits |

## Cross-paper synthesis and figures

The introductory observation→interpretation→issue separation, construction examples, work-item/version binding, external evidence index, issue lifecycle schema, refusal/counterfactual tests and proposed evaluation metrics are **review-author design proposals**, not claimed results of any paper. Their status remains explicit in the Russian narrative.

New original figure assets, all visually inspected after crop at 3× PDF resolution:

| Asset | Source | Type and inspection result |
|---|---|---|
| `assets/pdf-audit-tgml.png` | T p. 6 Fig. 3 | Model architecture. Complete branches, labels and output visible. |
| `assets/pdf-audit-constructai.png` | C p. 4 Fig. 1 | Model architecture. Full input/model/output frame visible. |
| `assets/pdf-audit-proactegomem.png` | A p. 2 Fig. 2 | **Benchmark/task protocol**, not model. Notification and intervention lifecycles visible. |
| `assets/pdf-audit-s-ember.png` | S p. 3 Fig. 1 | **Benchmark annotation protocol**, not model. Trigger time, answers and evidence interval visible. |

Existing `2025-patsch-mistsense-architecture.png` and `2026-wen-provia-architecture.png` were also opened with `view_image` and compared to their original figure/source-page context. Russian captions explain information flow rather than merely name the image.

Coverage: every critical numeric, architectural, dataset and protocol assertion in the assigned narrative has a ledger disposition. This does **not** mean every paper has original-PDF verification: EgoConQS and EgoSafe are explicit exceptions. Availability/licensing/code-inspection claims outside PDF evidence were removed or converted to unresolved status. No wiki/main review file was edited by this audit worker.

## Complete-source SHA-256 inventory

| File | SHA-256 |
|---|---|
| `aligned-wiki/raw/2026-liao-proactegomem.pdf` | `1c463a309668f5c1b856865c2bf17df99040880fc41a116b52a51315dbbeec6b` |
| `aligned-wiki/raw/2025-chen-gelm.pdf` | `2e900ce30050daaa190fbc5cfc5cdda5d92f256ee86402fa997f8f8e9d3ed49c` |
| `aligned-wiki/raw/2026-zeng-onestreamer.pdf` | `d4f119d50c8ef75d1e13e36d3e041f955b616ac065fd47097ea1d1c430b23e75` |
| `aligned-wiki/raw/2025-chavan-indego.pdf` | `f9a4b9c69980d358bf3964e1b5fc40fdb38f0b6cffb2ceaca4553f7906640e52` |
| `aligned-wiki/raw/2026-wen-provia.pdf` | `7f9ee74d2edd2d832e943688243859cdfd81bf7b7b09050d86f7bd17fcb7b23a` |
| `aligned-wiki/raw/2025-patsch-mistsense.pdf` | `ecc0b464c020c65d0765d5cd91bc5b92f7c9b3f593ae416bff967aacd1a7a56f` |
| `aligned-wiki/raw/2024-lee-egoper.pdf` | `779d37d28afe7d94e03376bc4ced76c5630d8449259782437d48cda1f7af596f` |
| `aligned-wiki/raw/2026-seminara-tgml.pdf` | `1d0c328e5e5c635f2e77d2aa0457207727c45efd6f1258e2eef96d7f2e823a80` |
| `aligned-wiki/raw/2026-wang-s-ember.pdf` | `a19dd911977b7b7ad2651673df90d5ea20fbd44471297b335afdb6e3a0884e04` |
| `docs/research/pdf-audit/2009-d4ar.pdf` | `b075e4957ad17f2784e64750b285a1c5f3697b3ea4726b95b6bd5c12f7cb800b` |
| `docs/research/evidence/proactive/2026-constructai.pdf` | `cbeca15f2c4f861587e8e9cd7ff89947ff8339dba9fdd7ba2c0e1dd21878b1e3` |
| `docs/research/pdf-audit/2024-dtgl.pdf` | `35dd536b2e37e8cc0a05d8db6fda6fa023f159cf8543df831828c70880f422a7` |

Final inventory: **12 complete original PDFs**, covering 12 separately identified publications (counting DTGL and TGML separately), plus **2 missing original PDFs** (EgoConQS and EgoSafe). DTGL complete download succeeded from the alternate official `proceedings.neurips.cc` host after `papers.nips.cc` timeouts. Only its predecessor/publication identity is needed by this narrative. TGML results are verified directly against TGML v2.
