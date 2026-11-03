# PDF audit of Section 4: retrieval and long-term video memory

Date: 2026-11-01. Text under review: `docs/research/LITERATURE_REVIEW_RU.md`, Section 4, with working edits limited to `docs/research/parts/retrieval.md`.

Only the review's claims being checked and the original PDFs were used. Earlier audits, wiki summaries, and evidence markdown were not used as evidence. Local PDFs in `aligned-wiki/raw` were read without modification. Missing primary PDFs were downloaded to `docs/research/evidence/pdf-audit-*.pdf`. All page references below are physical PDF pages, starting from 1 and including the appendix. Printed page numbers may differ.

A verdict of “confirmed” means agreement with a published claim/table in the specific PDF. It is not independent replication of the result or proof that every author interpretation is true. Metrics from different papers are not combined into a common leaderboard. Rows about applicability to Aligned identify an engineering inference or a limitation of the task formulation. Any internal ambiguity in the source paper is explicitly retained.

## Substantive clarifications in the working text

- Jeong: 24.95 versus 17.22 also compares different knowledge sources, HowTo100M versus Wikipedia. V uses only frames in generation, while VT adds transcripts.
- EgoLife: Table 7 names EgoGPT as the common response model, while the main comparison in §5/Table 5 names GPT-4o. The caption-quality ablation is now interpreted within Table 7.
- EGAgent: the final VQA-agent generates the answer, and no separate claim verifier is described.
- WorldMM: 100-query latency does not provide complete separate construction accounting. The PDF does not establish the stronger claim of a precise warm-cache protocol.
- MovieChat: 24 GB / >10K frames is qualified by the conditions visual-only, 224 × 224, and no frame sampling.
- Ren: the URL and numbers are tied to v1. Ego-R1: RAG-only 39.7 is tied to Appendix Table 4. EM²Mem: a 30-second anchor is explicitly distinguished from a semantic event boundary.
- MERIT/EM²Mem reproduction was performed by the authors of the respective papers. CARVE pass rate is supplemented with the judge, number of test queries, and generation runs.

## Original source register

SHA-256 records the exact bytes read. For available arXiv manuscripts, the version was determined from the PDF stamp. Conference labels without a footer are not considered independently confirmed by this procedure.

| ID | Work | PDF | Version | Pages | SHA-256 |
|---|---|---|---|---:|---|
| R01 | LLoVi | [pdf-audit-llovi-v1.pdf](https://arxiv.org/pdf/2312.17235v1) | arXiv:2312.17235v1, 28.12.2023 | 20 | `9a2a86c1653ff9099e3f797a6778791924a54648a6d3f31dc81a8ed531c8ad19` |
| R02 | VideoTree | [pdf-audit-videotree.pdf](https://openaccess.thecvf.com/content/CVPR2025/papers/Wang_VideoTree_Adaptive_Tree-based_Video_Representation_for_LLM_Reasoning_on_Long_CVPR_2025_paper.pdf) | CVPR 2025 proceedings | 12 | `e0bc9217e1e801c8ab9dc4b45c10bda22f6bf2c6a498ab9554a410dbcfb0557e` |
| R03 | MovieChat | [pdf-audit-moviechat.pdf](https://openaccess.thecvf.com/content/CVPR2024/papers/Song_MovieChat_From_Dense_Token_to_Sparse_Memory_for_Long_Video_CVPR_2024_paper.pdf) | CVPR 2024 proceedings | 12 | `f72bccf94acb6b164f55aefb4765b3032d177491f77ad279aac80b1929cec4bd` |
| R04 | VideoAgent Wang | [videoagent-wang.pdf](https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/10325.pdf) | ECCV 2024 proceedings, paper 10325 | 19 | `fd95bb5ef464d1f11172bfd160f1217cf1a94ecdd6ec7d139eb6ba2eb3e14736` |
| R05 | VideoAgent Fan | [2024-fan-videoagent.pdf](https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/03241.pdf) | ECCV 2024 manuscript, metadata creation 17.07.2024 | 18 | `6ff20b52bfafd1ca5a27867a504d21fdd6d37ee92150708fb12011058627ce5e` |
| R06 | AMEGO | [2024-goletto-amego.pdf](https://arxiv.org/pdf/2409.10917v1) | arXiv:2409.10917v1, 17.09.2024 | 26 | `ef17c3cebe5869e0e7c9a3e9099395f0c98731b2bcab3abc59460aaac07fcf53` |
| R07 | Video-RAG Luo | [video-rag-luo.pdf](https://arxiv.org/pdf/2411.13093v4) | arXiv:2411.13093v4, 23.11.2025, NeurIPS 2025 footer | 19 | `38704ba84dd4f272fd6b6ad2a175f2f6425bc6550f01d1097bce8fcfa80eef35` |
| R08 | VideoRAG Jeong | [videorag-jeong.pdf](https://aclanthology.org/2025.findings-acl.1096.pdf) | Findings ACL 2025, pp. 21278–21298 | 21 | `4cc33e154cea08ab0a941a3244976aa4675ec1dc7977d3f26c04a87eca9bd234` |
| R09 | VideoRAG Ren | [videorag-ren.pdf](https://arxiv.org/pdf/2502.01549v1) | arXiv:2502.01549v1, 03.02.2025 | 18 | `b4316d030772145b22c3f8bbdd9a82a8d443732923e46a4f0ffbe988ed8e51a6` |
| R10 | EgoLife | [2025-yang-egolife.pdf](https://arxiv.org/pdf/2503.03803v3) | arXiv:2503.03803v3, 09.02.2026 | 27 | `62089719b6879f1f7f10401989959c9a7e0531aa411284d10c9a713f0634c49a` |
| R11 | Ego-R1 | [2026-tian-ego-r1.pdf](https://arxiv.org/pdf/2506.13654v1) | arXiv:2506.13654v1, 16.06.2025 | 22 | `a783d05057585e0c41c42461a52e647af7d450dc4830f91ebb1316a0877df937` |
| R12 | EGAgent | [2026-rege-egagent.pdf](https://arxiv.org/pdf/2601.18157v3) | arXiv:2601.18157v3, 03.07.2026 | 29 | `0c7990925ebe18775b14f43f2427822606eefccec427f6ed77d84a6b94e8acd1` |
| R13 | WorldMM | [2026-yeo-worldmm.pdf](https://arxiv.org/pdf/2512.02425v2) | arXiv:2512.02425v2, 27.03.2026 | 29 | `23604d364cc705579ab683f16b7e5f6ddfdd6aa8d187aa7463885c0d1aef484d` |
| R14 | MERIT | [2026-choi-merit.pdf](https://arxiv.org/pdf/2608.07663v2) | arXiv:2608.07663v2, 16.09.2026 | 33 | `982d2db50ce6d794beebc332451ee83958bbd6f24430ca61a33178e768c240e8` |
| R15 | EM²Mem | [2026-chen-em2mem.pdf](https://arxiv.org/pdf/2609.00551v1) | arXiv:2609.00551v1, 01.09.2026 | 28 | `de8c9e919690780e796e25f2cd24813a6a85598405ebbaaf467d7ed2c1fd3829` |
| R16 | CFD | [2026-cai-cfd.pdf](https://arxiv.org/pdf/2609.11899v1) | arXiv:2609.11899v1, 10.09.2026 | 26 | `54e507afd2bac5fa815a474f6310dd153fedd5616aab20c510df6ae9f91b5ba9` |
| R17 | CARVE | [carve.pdf](https://arxiv.org/pdf/2606.13141v2) | arXiv:2606.13141v2, 02.10.2026 | 36 | `9afed50dc3bb4f34a5800bbc7b0cc972c0bcfadb6c96fc42f0acfae7343d024a` |
| R18 | LongVideoBench | [pdf-audit-longvideobench.pdf](https://arxiv.org/pdf/2407.15754v1) | arXiv:2407.15754v1, 22.07.2024 | 29 | `75a51f71b09fd677a4838a73b53997aa80dde5007bd1b5d0e3bf9736479d9725` |
| R19 | Video-MME | [pdf-audit-videomme.pdf](https://openaccess.thecvf.com/content/CVPR2025/papers/Fu_Video-MME_The_First-Ever_Comprehensive_Evaluation_Benchmark_of_Multi-modal_LLMs_in_CVPR_2025_paper.pdf) | CVPR 2025 proceedings | 11 | `33cb0634be2fc08b7fa53689e3bea6f4ff2b6bb8538a32caf445e292900de03b` |
| R20 | EgoSchema | [pdf-audit-egoschema.pdf](https://arxiv.org/pdf/2308.09126v1) | arXiv:2308.09126v1, 17.08.2023 | 32 | `4ae865287c1d40b806c5f51e4b5101fe90f7d246a201668f14bbb9cab00b442f` |

## R01. LLoVi

Source for every row in this block: `docs/research/evidence/pdf-audit-llovi-v1.pdf`, arXiv:2312.17235v1, 28.12.2023.

| ID | Page / table / section | Review claim | What the original contains and under what conditions | Verdict / action |
|---|---|---|---|---|
| R01.01 | p. 2, Figure 2, pp. 3–4, §3 | Short captions → temporally ordered text → LLM reasoning. | A pretrained frame/clip captioner processes short segments, after which the LLM receives the description sequence. The captioner and LLM are modular. | Confirmed. |
| R01.02 | p. 4, §3.2, p. 15, Table 12 | Intermediate summarization before answering. | A multi-round prompt first generates a question-conditioned summary, then answers from it. This is a prompt stage, not a trained temporal memory module. | Confirmed. |
| R01.03 | p. 1, Abstract, p. 2, main findings | 50.3% on full EgoSchema and +18.1 percentage points over the previous best method. | The authors explicitly state full test set, zero-shot, and absolute gain. 50.3 − 18.1 = 32.2. This should not be confused with the 500-question subset and 51.8 in Table 1. | Confirmed for v1 2023, not a current leaderboard. |
| R01.04 | p. 14, Appendix B.1 | This design does not require a new end-to-end long-video model. | The integration itself is training-free, but for EgoSchema the authors retrain LaViLa without overlapping EgoSchema videos. The claim does not imply that no component was ever trained. | Confirmed under the review's narrow formulation. The limitation is recorded here. |

## R02. VideoTree

Source for every row in this block: `docs/research/evidence/pdf-audit-videotree.pdf`, CVPR 2025 proceedings.

| ID | Page / table / section | Review claim | What the original contains and under what conditions | Verdict / action |
|---|---|---|---|---|
| R02.01 | pp. 2–4, §3, Figures 1–2 | Feature clustering, representative captions, relevance scoring, and deeper expansion. | Adaptive breadth expansion repeats visual clustering / cluster captioning / relevance scoring. Relevance-guided depth expansion refines relevant branches. Selected captions are temporally ordered before answering. | Confirmed. |
| R02.02 | pp. 3–4, §3.1–3.2 | The tree depends on the question. | The initial construction explicitly takes video and query, and relevance scoring is conditioned on the question. This is a query-adaptive representation. | Confirmed. |
| R02.03 | pp. 3–5, §3–4 | This is long-video QA, not a validated, continuously updated multicamera archive. | The method takes a given video and question as input. The QA experiments do not measure corpus retrieval across sites, cameras, and weeks. | A valid limitation on the scope of the result, not a separate negative experiment. |

## R03. MovieChat

Source for every row in this block: `docs/research/evidence/pdf-audit-moviechat.pdf`, CVPR 2024 proceedings.

| ID | Page / table / section | Review claim | What the original contains and under what conditions | Verdict / action |
|---|---|---|---|---|
| R03.01 | pp. 3–4, Figure 2, §3.2–3.5, Algorithm 1 | Compression of visual tokens into short-term and long-term memory. | Frame-wise visual encoder, FIFO short-term buffer, consolidation of similar neighboring representations into long-term memory, and projection to the LLM. Global mode reads long-term memory, while breakpoint adds short-term memory and the current frame. | Confirmed. |
| R03.02 | p. 1, Figure 1 caption | More than 10 thousand frames on a 24 GB GPU. | Figure 1 explicitly specifies visual-only inference, 224 × 224, without frame sampling, and >10K frames on 24GB. This tests processing resource requirements, not retention of every detail. | Confirmed with conditions. The 224 × 224 and visual-only conditions were added to the review. |
| R03.03 | pp. 3–4, §3 | Applicability as a local reader, not evidence of search over 36 thousand camera-hours. | The architecture takes one video, aggregates tokens, and answers. There is no experiment at the stated construction scale. | Engineering interpretation is separate from the published result. |

## R04. VideoAgent Wang

Source for every row in this block: `docs/research/evidence/videoagent-wang.pdf`, ECCV 2024 proceedings, paper 10325.

| ID | Page / table / section | Review claim | What the original contains and under what conditions | Verdict / action |
|---|---|---|---|---|
| R04.01 | pp. 4–7, §3, Figures 1–2 | An LLM iteratively selects useful frames through tools. | The LLM reads captions of initial frames, evaluates sufficiency, generates descriptions for CLIP retrieval, receives new visual observations, and repeats the cycle. | Confirmed. This is a separate work from Fan. |
| R04.02 | p. 8, Tables 1–2, §4.2 | 54.1% on full EgoSchema and 60.2% on a subset of 500. | The tables separate Subset/Fullset. The main results text directly repeats 54.1 / 60.2 and the subset size. | Confirmed. |
| R04.03 | p. 8, Table 1, pp. 10–11, efficiency/ablations | An average of 8.4 frames. | Avg. frames = 8.4 refers to selected frames for visual understanding. The method uses CLIP retrieval over the video, so this is not the number of all decoded or embedded frames. | Confirmed with the existing caveat. |
| R04.04 | p. 11, Tables 4–5 | 8.4 cannot be attributed to the full pipeline cost. | The tables examine the number of observation frames, initial frames, and iterations. They do not measure the complete indexing/decoding cost per camera-hour. | The metric formulation supports this interpretive limit. |

## R05. VideoAgent Fan

Source for every row in this block: `aligned-wiki/raw/2024-fan-videoagent.pdf`, ECCV 2024 manuscript, metadata creation 17.07.2024.

| ID | Page / table / section | Review claim | What the original contains and under what conditions | Verdict / action |
|---|---|---|---|---|
| R05.01 | p. 4, §2.2, p. 7, Algorithm 1 | Two-second segments, LaViLa, ViCLIP, and a text encoder. | LaViLa receives 4 frames from a 2-second segment. ViCLIP receives 10 uniformly sampled frames. Captions are encoded with text-embedding-3-large, continued on p. 5. | Confirmed. |
| R05.02 | pp. 5–6, §2.3 | Objects are detected and tracked, and reappearances are merged through visual similarity. | RT-DETR + ByteTrack create tracking IDs. Re-ID combines CLIP and DINOv2 similarity. This is an estimated feature-based association, not guaranteed physical identity. | Confirmed. |
| R05.03 | p. 6, §2.3 | Object memory stores IDs, occurrences in SQL, and visual features. | The feature table contains CLIP feature / object ID. SQL fields: object ID, category, indices of video segments. Time is encoded through segment indices, not a separate continuous trajectory. | Confirmed. The review's general description of occurrence intervals is acceptable. |
| R05.04 | pp. 6–8, §2.4, Algorithms 1–2 | Four tools and iterative GPT-4. | Caption retrieval, segment localization, short-clip visual QA through Video-LLaVA, and object-memory SQL querying. History is extended after each call until stopping or reaching the limit. | Confirmed. |
| R05.05 | p. 9, Table 1 | 60.2% on full EgoSchema. | Table 1 separately reports full test and subset results, with full VideoAgent = 60.2. | Confirmed. Not to be confused with Wang's 60.2 on the subset. |
| R05.06 | pp. 12–13, Table 5 and §3.5 | The main NExT-QA comparison uses 600 questions, with 150 for ablations. | The authors select 600 total for evaluation cost, then 50 of each type for the 150-question ablation subset. | Confirmed. |
| R05.07 | p. 13, Table 6 | Object memory ablation 71.3 → 62.7. | All tools = 71.3, without object memory querying = 62.7. This is a 150-question NExT-QA subset, not full EgoSchema. | Confirmed. |
| R05.08 | p. 10, Table 2, §3.2 | Ground-truth narrations improve segment localization relative to captions. | The table separates LaViLa / Ego4D narration features and their ViCLIP ensembles. The improvement concerns NLQ localization, not an ablation of the entire object memory. | Confirmed with a local scope of inference. |
| R05.09 | p. 4, Figure 2 | The existing crop does show temporal/object memory and four tools. | The original Figure 2 was visually compared with the PNG. The left side shows construction, and the right side shows iterative tool-use. | Visually confirmed, and the review caption was expanded. |

## R06. AMEGO

Source for every row in this block: `aligned-wiki/raw/2024-goletto-amego.pdf`, arXiv:2409.10917v1, 17.09.2024.

| ID | Page / table / section | Review claim | What the original contains and under what conditions | Verdict / action |
|---|---|---|---|---|
| R06.01 | pp. 5–6, §3.1, Figure 2 | Hand–object contact starts a tracklet, a tracker maintains it, and DINOv2 merges and associates observations. | Initialization requires several spatially overlapping HOI detections within a temporal window. SOT continues the track. Averaged DINOv2 features support online clustering and instance assignment. | Confirmed after clarification: initiation is not triggered by a single contact frame. |
| R06.02 | p. 7, §3.2 | Location memory groups activity at a location. | Low optical flow and hand presence serve as proxies for activity in an area. Segments are matched using averaged visual features. The method does not produce metric room coordinates. | Confirmed. |
| R06.03 | pp. 7–10, §3.3–4, pp. 23–24, Appendix §9 | Visual queries, sequence, concurrency, and temporal grounding. | An object/location crop is matched to a memory ID. Answers use order, overlaps, first/last locations, and temporal IoU with the options. These are semantic-free visual MCQs, not open-ended LLM dialogue. | Confirmed. |
| R06.04 | pp. 8, 10, §4 | 20.5K questions over 100 EPIC-KITCHENS videos. | Benchmark construction explicitly states 100 videos, 20.5K queries, and five options per question. | Confirmed. |
| R06.05 | p. 13, Table 3 | AMEGO-L 36.3, strongest baseline 23.6, random 20.0. | Total column: AMEGO-L 36.3, S-QA(BLIP-2) 23.6, Random 20.0. A difference of 12.7 percentage points. | Confirmed. |
| R06.06 | Appendix §8.1, pp. 19, 21 | The benchmark reduces some ambiguity between instances of the same class. | Object ground-truth construction links paired actions, then filters cases where different instances of the same type reappear within one video. This limitation prevents an inference of reliable re-ID of identical tools. | Confirmed as a benchmark limitation, not a claim that all identical objects are completely excluded. |

## R07. Video-RAG Luo

Source for every row in this block: `docs/research/evidence/video-rag-luo.pdf`, arXiv:2411.13093v4, 23.11.2025, NeurIPS 2025 footer.

| ID | Page / table / section | Review claim | What the original contains and under what conditions | Verdict / action |
|---|---|---|---|---|
| R07.01 | pp. 3–6, §3, Figure 2 | A training-free LVLM extension with ASR/OCR/object auxiliary text. | The question helps produce retrieval queries, and external tools extract and filter text from audio, visible writing, and objects. The LVLM receives selected frames plus auxiliary text. | Confirmed. This is not the Ren/Jeong video-corpus system. |
| R07.02 | p. 7, Table 1 | LongVA-7B, 128 frames: 52.6 without subtitles, 56.0 with subtitles, 62.0 with Video-RAG. | Overall columns w/o S / w/ S / Ours = 52.6 / 56.0 / 62.0. Gain column = +6.0 versus w/ S. | Confirmed for v4 camera-ready. |
| R07.03 | p. 7, Table 1 | LLaVA-Video-72B 77.4 versus 75.9 with subtitles. | 64 frames, Overall w/ S = 75.9, Ours = 77.4, Gain +1.5. 70.3 is the variant without subtitles. | Confirmed. |
| R07.04 | p. 7, Table 1 caption | +9.4 must not be counted against the subtitle baseline. | 62.0 − 52.6 = 9.4 relative to no-subtitle, 62.0 − 56.0 = 6.0 relative to subtitle. The two baselines have different access to audio text. | Confirmed by arithmetic and the table headings. |


## R08. VideoRAG Jeong

Source for every row in this block: `docs/research/evidence/videorag-jeong.pdf`, Findings ACL 2025, pp. 21278–21298.

| ID | Page / table / section | Review claim | What the original contains and under what conditions | Verdict / action |
|---|---|---|---|---|
| R08.01 | pp. 3–4, §2, Figure 2 | Video-corpus retrieval with visual/text representations and informative-frame selection. | Video retrieval combines visual/text features, and generation uses retrieved videos. Adaptive frame selection is introduced for retrieval/generation. | Confirmed. |
| R08.02 | p. 5, §3.1 | The generator always receives frames and subtitles. | VIDEORAG-V uses only frames as generation context. VIDEORAG-VT uses frames + transcripts. Subtitles/ASR may participate in retrieval independently of the generation variant. | Clarified in the review, with V and VT distinguished. |
| R08.03 | p. 6, Table 1 | LLaVA-Video-7B, WikiHowQA/HowTo100M: VideoRAG-V ROUGE-L 24.95, BM25 17.22. | Both numbers appear in the corresponding model block / dataset column. VideoRAG-VT = 24.93, not 24.95. | Numbers confirmed. |
| R08.04 | p. 5, §3.1, baseline definitions | This is a clean advantage of the video modality under the same corpus. | No. TEXTRAG BM25 retrieves Wikipedia documents, while VideoRAG retrieves HowTo100M videos. Both modality and knowledge source change. | A substantive caveat was added to the review. |
| R08.05 | p. 5, Evaluation Metrics | ROUGE-L measures agreement between an answer and a reference instructional text. | Longest common subsequence of the generated answer versus ground truth. The metric contains no timestamp correctness or construction-defect check. | Confirmed. |

## R09. VideoRAG Ren

Source for every row in this block: `docs/research/evidence/videorag-ren.pdf`, arXiv:2502.01549v1, 03.02.2025.

| ID | Page / table / section | Review claim | What the original contains and under what conditions | Verdict / action |
|---|---|---|---|---|
| R09.01 | pp. 3–6, Figure 1, §3.1–3.2 | Two channels: a textual cross-video graph and visual segment retrieval. | VLM captions and ASR provide text chunks / entities / relations, and graphs are merged. A separate multimodal encoder indexes clips. Query reformulation and a visual-content query guide retrieval. | Confirmed. |
| R09.02 | pp. 5–6, §3.2, p. 8 implementation | After initial retrieval, the material is refined before answering. | LLM-based candidate filtering and query-specific second-round video captioning supply the generator with more detailed information. The implementation describes 30-second clips, 5 initial frames, and 15 recaptioning frames. | Confirmed. |
| R09.03 | p. 7, Table 1 | LongerVideos: 164 videos, 22 collections, 602 questions, approximately 134.6 h. | All row = 22 / 164 / 602 / 27.4 mean queries / ~134.6 h. Lecture, documentary, and entertainment are listed separately. | Confirmed for v1. The link is pinned to v1. |
| R09.04 | p. 8, Table 2 | Overall Winner 53.26% against NaiveRAG, 57.14% against LightRAG. | All column, Overall Winner row for the two corresponding pairs. This is not Comprehensiveness or an unweighted average across the three genres. | Confirmed. |
| R09.05 | pp. 7–8, evaluation protocol | This is an answer-preference win rate, not correctness/recall. | GPT-4o-mini ranks answers, order is swapped to counter position bias, and evaluation is repeated five times. LongerVideos questions are generated by NotebookLM from transcripts. | Confirmed. The judge was added to the main text. |
| R09.06 | p. 3, Figure 1 | A new original architecture diagram. | Visually checked: (a) video collection, (b) multimodal indexing/merged graph, (c) hybrid retrieval, filtering, recaptioning and generation. | The crop was added and inspected. This v1 diagram is not attributed to the KDD 2026 final version. |

## R10. EgoLife

Source for every row in this block: `aligned-wiki/raw/2025-yang-egolife.pdf`, arXiv:2503.03803v3, 09.02.2026.

| ID | Page / table / section | Review claim | What the original contains and under what conditions | Verdict / action |
|---|---|---|---|---|
| R10.01 | pp. 1, 3–4, §3.1, Tables 1–2 | Six participants, seven days, approximately 300 h, with 266 h retained. | The dataset overview describes a shared week in EgoHouse. Tables 1–2 contain 266 h retained across six long streams. Approximately 300 h refers to collected material, not the retained evaluation corpus. | Confirmed. |
| R10.02 | pp. 3, 6–7, Table 2, Figure 6, §5 | 3,000 QA in the dataset, but the main evaluation uses 500 Jake QA. | Figure 6: 500 per participant, 3K total. Implementation Details on p. 7 explicitly states quick evaluation on Jake’s 500 QA in this version. | Confirmed. The denominator cannot be expanded to 3,000. |
| R10.03 | p. 6, §4.1–4.2 | EgoGPT produces audiovisual captions every 30 s, and memory contains timestamps and summaries. | EgoGPT reads video/audio, and the memory bank contains clip information and hourly/daily summaries. Figure 7 shows a conceptual hierarchical pipeline. | Confirmed. |
| R10.04 | p. 7, §5 | Main experiment: top-3 clips through text similarity, final GPT-4o. | The implementation paragraph specifies text-based similarity, top 3 30-second clips, universal final GPT-4o, and re-querying GPT-4o-mini. The formula in §4.2 and the λ=0 comment are not fully consistent, so the review follows the explicit prose in §5 rather than deriving details from λ. | Confirmed with the source's internal ambiguity noted. |
| R10.05 | p. 7, Table 5 | Day 1 personalization: 36.0 versus 33.1, Gemini-captioner 36.9. | Average column: EgoIT-99K+D1 36.0, EgoIT-99K 33.1, Gemini-1.5-Pro 36.9. Captioner swaps in EgoButler are described in §5. | Confirmed. |
| R10.06 | p. 8, Table 7 | Human audiovisual captions achieve 45.5 and demonstrate a caption bottleneck. | Visual-Audio Caption = 45.5, personalized EgoGPT captions = 36.0. The Table 7 caption specifies EgoGPT(EgoIT-99K+D1) as the common response model, unlike GPT-4o in §5/Table 5. | Numbers confirmed. The impression of a fixed answer model across tables was corrected. |
| R10.07 | p. 7, Figure 7 | A new EgoButler/EgoGPT/EgoRAG diagram. | Panel a shows captioning, and b shows memory, keyword extraction, retrieval evidence, and answering. The figure was visually checked. The conceptual hierarchy is not presented as the exact main-evaluation implementation. | The crop was added and inspected. |
| R10.08 | pp. 3–5, §3, pp. 6–8, §4–5 | A house, Chinese speech, and coordinated activity do not establish transfer to 100 construction cameras. | This is a single-household collection with six participants and an organized shared activity. The Jake evaluation is not a cross-camera deployment test. | A valid external-validity limit. The number 100 refers to the Aligned scenario. |

## R11. Ego-R1

Source for every row in this block: `aligned-wiki/raw/2026-tian-ego-r1.pdf`, arXiv:2506.13654v1, 16.06.2025.

| ID | Page / table / section | Review claim | What the original contains and under what conditions | Verdict / action |
|---|---|---|---|---|
| R11.01 | pp. 1, 4–6, Figure 1, §3–4 | Chain-of-Tool-Thought with H-RAG, Video-LLM, and a frame VLM. | Three main tool interfaces accept keywords/time windows or a timestamp and question. CoTT alternates thought, tool, and returned observation. | Confirmed. |
| R11.02 | pp. 6–9, §4.2–6.3 | Qwen2.5-3B controller, 25K traces, SFT followed by GRPO. | 25K generated CoTT traces for SFT, a 4.4K QA corpus for RL, and Qwen-2.5-3B-Instruct as the base. Training is described separately from external perceptual tools. | Confirmed. 3B is not the size of the entire system. |
| R11.03 | p. 8, §6.1 | Ego-R1 Bench contains 300 QA. | 300 questions distributed evenly across six perspectives, with human-labeled and human-verified generated QA. This is a separate benchmark from EgoLifeQA. | Confirmed. |
| R11.04 | p. 9, Table 3 | 34.3 SFT → 46.0 SFT+RL. | One base controller, SFT only and SFT+RL rows, task accuracy. Format accuracy is 100.0 for both trained rows and is not confused with task accuracy. | Confirmed. |
| R11.05 | p. 19, Table 4, Appendix C.1 | RAG-only 39.7 versus full 46.0. | Right side of Table 4. The left side shows an additional dependency on the video tool: LLaVA-Video 43.7, Gemini-1.5-Pro 46.0. | Confirmed. An exact reference to the appendix table was added. |
| R11.06 | pp. 8, 17–18, §6.1, Appendix B | The controller does not encompass the entire system's size/cost. | An additional summary model is mentioned in §6.1. The Gemini video tool, VLM, and memory construction are described separately. | Confirmed. |
| R11.07 | pp. 5–6, Figure 2, p. 8 Table 2 caption, p. 9 results | EgoLife-related training/evaluation and overlap removal without a denominator. | Data generation uses EgoLife views A1–A6. Table 2 explicitly excludes QA used for training, but the remaining clean EgoLifeQA count is not provided next to the 36.0 result. The text contains an inconsistent volume of 500+ h of training data, so we do not assert the exact identity of all source files here. | The limitation is confirmed. Transfer to independent households/construction sites is not established. |
| R11.08 | p. 1, Figure 1 | A new tool-use diagram. | Three tools at the top, retrieval and visual inspection steps below. The original figure crop was inspected. | Visually confirmed. TPAMI 2026 status is not certified by the v1 PDF. |

## R12. EGAgent

Source for every row in this block: `aligned-wiki/raw/2026-rege-egagent.pdf`, arXiv:2601.18157v3, 03.07.2026.

| ID | Page / table / section | Review claim | What the original contains and under what conditions | Verdict / action |
|---|---|---|---|---|
| R12.01 | pp. 4–7, Figure 2, §3.2–3.3 | A temporal entity scene graph in SQLite. | Nodes/edges contain entities, relations, and start/end time. SQL querying supports time, keywords, source/target entities, and relationship type. This is a symbolic relational representation. | Confirmed. Not a 3D map. |
| R12.02 | pp. 4, 6–7, Figure 2, Algorithm 1 | A planner decomposes the query, a retriever reads frames/transcripts/graph, and an analyzer compresses evidence. | A planning agent constructs subtasks, three search tools retrieve data, and the Analyzer retains relevant context in memory M. | Confirmed. |
| R12.03 | p. 7, VQA Agent description | At the end, a multimodal model verifies the answer. | The VQA Agent conditions on Q and compact evidence M to generate final A. No separate claim/citation verification stage is defined. | Corrected: the final model generates the answer rather than independently verifying it. |
| R12.04 | p. 8, Table 1 | Gemini 2.5 Pro 57.5, GPT-4.1 without the graph 48.6 and with the graph 50.7. | Average column of the corresponding rows. 48.6→50.7 compares F+T with EG+F+T under one backbone. 57.5 uses a different model and is not a clean graph ablation. | Confirmed. |
| R12.05 | p. 10, Table 4 | GPT-4.1 LLM transcript search: 169 s, 571K tokens, 50.7. | T Search LLM row, Runtime sec / Tokens. This is the question-time pipeline. | Confirmed. |
| R12.06 | p. 10, Table 4 | BM25: 125 s, 172K tokens, 43.9. | BM25 row, the same EG+F+T architecture, with transcript search changed. Accuracy differs by 6.8 percentage points. | Confirmed. |
| R12.07 | p. 7, §4.2, p. 10 Limitations | Manual diarization in EgoLife. | The authors use manually diarized transcripts including speaker identities. Limitations anticipates degradation from automatic diarization errors. | Confirmed. |
| R12.08 | p. 4, Figure 2 | A new EGAgent diagram. | Three panels were visually checked: pipeline, cross-modal composition, and SQL graph querying. | The crop was added and inspected. |

## R13. WorldMM

Source for every row in this block: `aligned-wiki/raw/2026-yeo-worldmm.pdf`, arXiv:2512.02425v2, 27.03.2026.

| ID | Page / table / section | Review claim | What the original contains and under what conditions | Verdict / action |
|---|---|---|---|---|
| R13.01 | pp. 3–5, Figure 2, §3 | Episodic, semantic, and visual memories with multiscale graphs and iterative selection. | Episodic graphs store factual events at different scales, semantic memory consolidates persistent knowledge, and visual memory stores frame features/timestamps. A retrieval-agent selects the memory/query, and a response-agent reads the history. | Confirmed. |
| R13.02 | p. 8, Table 4 and §4.7 | WorldMM-8B 56.4 → 52.0 with episodic embedding retrieval. | Embedding Retrieval row = 52.0, full WorldMM = 56.4. §4.7 explicitly specifies WorldMM-8B, unlike the GPT solver in other ablations. | Confirmed. |
| R13.03 | p. 8, §4.6 and Figure 6 | Latency is measured on 100 questions. | 100 randomly sampled queries from EgoLifeQA. The authors call latency end-to-end, but do not provide a separate complete construction cost in this analysis. | The count is confirmed. The categorical claim of preconstructed memories was softened to reflect the measurement boundary. |
| R13.04 | pp. 3–5, memory construction and inference are separate | Figure 6 cannot establish the cost of a new archive. | The architecture separates memory construction from inference, and the figure compares query latency. A full video-ingestion budget cannot be derived from it. | A valid inference with the limits of available data stated explicitly. |
| R13.05 | p. 3, Figure 2 | A new WorldMM diagram. | All three construction tracks, adaptive retrieval, and response generation were visually checked. | The crop was added and inspected. |

## R14. MERIT

Source for every row in this block: `aligned-wiki/raw/2026-choi-merit.pdf`, arXiv:2608.07663v2, 16.09.2026.

| ID | Page / table / section | Review claim | What the original contains and under what conditions | Verdict / action |
|---|---|---|---|---|
| R14.01 | pp. 6–8, Figure 2, §3 | A 30-second episode with event/object/summary/dialogue keys and temporal neighbor filtering. | Four key channels are indexed, the query selects anchors, and neighboring captions are read around them. The dialogue key is excluded for LVBench (§4.2), where speech is not used. | Confirmed. |
| R14.02 | p. 19, Appendix A | The retrieval loop is textual, with frames used only for final QA. | The appendix explicitly says iterative retrieval relies solely on textual context, with visual frames exclusively used for final QA. Query generation/evidence sufficiency and neighbor filtering use the same backbone. | Confirmed. |
| R14.03 | pp. 8–10, Tables 1–2 | GPT-5: EgoLifeQA 71.2, LVBench 71.8, Video-MME Long 77.7. | Table 1 Avg 71.2, Table 2 71.8/77.7. §4.1 specifies 500 EgoLifeQA and long Video-MME only. | Confirmed. These are the authors' reported results, not our runs. |
| R14.04 | pp. 11–13, Table 5 | Hit rate 0.56 vs WorldMM 0.53. | Hit = annotated target timestamp falls within returned interval. The baseline marked * was reproduced by the MERIT authors using common captions/captioner. QA 63.2 for the WorldMM reproduction is not the original 65.6. | Confirmed, with reproduction authorship explicitly added. |
| R14.05 | p. 13, retrieval analysis | Unequal temporal budget: 30 s versus up to 1 h. | MERIT/EgoRAG retrieve fixed 30-second units. WorldMM windows include 1 h. Restricting WorldMM to 30 s gives the authors a 0.31 hit rate. This is not a matched evidence-duration experiment. | Confirmed. |
| R14.06 | pp. 12–13, Table 6 | Construction savings exclude dense captioning. | Captioning is expressly excluded as a common initial step. Table 6 counts memory-construction calls/input/output after the common captions. | Confirmed. The factor cannot be transferred to all camera processing. |
| R14.07 | p. 6, Figure 2 | The existing MERIT diagram does come from the original. | Stage 1 multi-key extraction and Stage 2 retrieval/neighbor filtering were visually compared with the PNG. | Visually confirmed. |


## R15. EM²Mem

Source for every row in this block: `aligned-wiki/raw/2026-chen-em2mem.pdf`, arXiv:2609.00551v1, 01.09.2026.

| ID | Page / table / section | Review claim | What the original contains and under what conditions | Verdict / action |
|---|---|---|---|---|
| R15.01 | pp. 3–4, Figure 2, §3.2–3.4 | An event anchor connects captions, transcripts, frames, fields, context, and provenance. | µ_i=(e_i,R_i,C_i), with e_i a temporal address. Episodic/semantic graph links and provenance support returning to the event. | Confirmed. |
| R15.02 | p. 15, Appendix B, p. 19 Appendix C.7 | A 30 s anchor, with context at 3 min/10 min/1 h. | The implementation explicitly uses these context scales. C.7 explains that a fixed anchor is a temporal indexing address, not a learned semantic boundary. | Confirmed. The temporal rather than semantic nature of the boundary was added to the review. |
| R15.03 | pp. 4, 15–16, §3.4 and Appendix B | Semantic retrieval → graph expansion → ranked candidates → compact selector. | Coarse candidate search, one-hop graph expansion, event scoring, and a GPT-5 selector choosing 5 anchors with at most 3 keyframes each for the answer model. | Confirmed. |
| R15.04 | p. 5, Table 1 | EgoLifeQA 66.0 versus reproduced WorldMM 64.0. | WorldMM†=64.0 under the same evaluation setting, original WorldMM=65.6. The 2.0 percentage points must not be presented as the difference from the original row. | Confirmed. The reproduction was performed by the EM²Mem authors. |
| R15.05 | pp. 17–18, Appendix C.4, Table 12 | At a 300 s budget, coverage gain +5.4, 95% CI [+2.6,+8.3]. | Control: 4-channel RRF vs Aligned-30s, all 500 questions, the same 6,057 records, models/prompts/budgets. C@300 31.2→36.7, with gain +5.4 in the table from unrounded values. The reported precision of +5.4 is retained. | Confirmed. The rounded 36.7−31.2=5.5 does not justify replacing the published gain. |
| R15.06 | p. 18, Table 12 and prose | QA 60.0→63.0, 95% CI [−0.8,+6.8]. | The authors explicitly state difference not statistically significant, p=0.1505. Coverage p=0.0003 is a separate metric. | Confirmed. No demonstrated QA gain is claimed in this control. |
| R15.07 | p. 5, Table 2 | 459.00→98.21 s, 4.67× per-query latency. | The Avg latency/query rows agree, with the ratio rounded to 4.67. | Confirmed. |
| R15.08 | p. 5, Table 2 and efficiency prose | 37.39× throughput includes 8 workers and different evaluation pipelines. | Wall-clock 229,502→6,138 s. EM²Mem uses 8 independent-query workers, while WorldMM is limited by incremental HippoRAG graph construction during inference. | Confirmed. Not equivalent to 37.4× individual latency. |
| R15.09 | p. 16, Tables 9–10 | Build tokens 89.23M vs 60.55M, total for 500 queries 104.50M vs 102.58M. | Table 9 reports upfront tokens, and Table 10 adds inference 15.27M / 42.03M. EM²Mem's total is higher by 1.92M. | Confirmed. The query count and token versus money distinction are retained. |
| R15.10 | p. 3, Figure 2 | A new original diagram. | The schema, graph construction, and retrieval panels were visually checked. Labels survived despite nonstandard PDF text encoding. | The crop was added and inspected. |

## R16. CFD

Source for every row in this block: `aligned-wiki/raw/2026-cai-cfd.pdf`, arXiv:2609.11899v1, 10.09.2026.

| ID | Page / table / section | Review claim | What the original contains and under what conditions | Verdict / action |
|---|---|---|---|---|
| R16.01 | pp. 3–6, §2, Figure 2 | Offline event storyline and clip captions, story-first answering, and a visual-need router. | Event memory depends on TransNetV2 boundaries, while clip memory is generated independently at uniform intervals. Insufficient text triggers localization / clip enrichment, and the router decides whether to obtain pixels. | Confirmed. |
| R16.02 | pp. 5–6, §2.3, Algorithm 1 | Bounded FIFO visual working memory. | Retrieved frames update fixed-capacity FIFO memory, not a permanent complete archive of all visual details. | Confirmed. |
| R16.03 | p. 9, Table 9 | Always frames 6.63→5.76 frames/query, 67.2→67.5 accuracy. | Average cells (accuracy / online frames): Always 67.2/6.63, Router 67.5/5.76. (6.63−5.76)/6.63 ≈13.12%. | Confirmed. 13.1% is the controlled router increment, not the overall reduction in baseline frames. |
| R16.04 | pp. 9, 19–20, Appendix E | Online frames exclude offline captioning. | The tables separate offline cost from online serving and retrieved visual frames. The router itself adds an LLM call, and frame savings do not guarantee latency savings. | Confirmed. |
| R16.05 | p. 20, Appendix E | 229.3 s/video offline and 68.2 s/query online, 8 workers, 2 H200. | The text distinguishes end-to-end from model-serving. One H200 for the 8B captioner, one for the 32B reasoner, and a fixed eight-worker setup. | Confirmed. |
| R16.06 | p. 10, Limitations | Shot boundaries are poorly suited to continuous egocentric video. | TransNetV2 is designed for edited video, and hard cuts are rare in wearable streams. The authors propose replacing segmentation and emphasize this as future work. | Confirmed. |
| R16.07 | p. 10, Limitations | The edge/cloud design does not establish physical wearable deployment. | Separation is simulated, and the captioner targets a server-class GPU/desktop, not a phone/glasses. Network/energy effects require future study. | Confirmed. Added to the diagram caption. |
| R16.08 | p. 5, Figure 2 | A new original CFD diagram. | Event/clip memories and the story-first/localization/router/final multimodal loop were visually inspected. | The crop was added and inspected. |

## R17. CARVE

Source for every row in this block: `docs/research/evidence/carve.pdf`, arXiv:2606.13141v2, 02.10.2026.

| ID | Page / table / section | Review claim | What the original contains and under what conditions | Verdict / action |
|---|---|---|---|---|
| R17.01 | pp. 4–5, §4 | V-RAGBench: query→one unique evidence chunk→open answer, within-source-video retrieval. | The source video is supplied. Segmentation/deduplication suppresses repeated events. Post-hoc filters remove shortcuts and check evidence uniqueness through competing chunks. | Confirmed as design/filtering intent, not an absolute guarantee for every QA. |
| R17.02 | p. 5, §4 | 2,100 total, 1,800 train, 300 test. | Three categories are subsampled to 700 each. Final split counts are stated explicitly. | Confirmed. |
| R17.03 | pp. 5–7, §5, Algorithm 1 | Four modality/granularity representations and tagged candidates. | Parallel retrieval over text/visual × frame/clip. Reranking retains the winning configuration for each chunk, and the generator receives each chunk's selected representation. | Confirmed. |
| R17.04 | p. 8, Table 2 | Recall@5 0.603 vs strongest baseline 0.510, nDCG@5 0.433. | CARVE row, VideoRAG-A R@5=0.510. The strongest nDCG baseline is GQR 0.340, a different baseline. | Confirmed. The review correctly ties the 0.510 comparison only to Recall. |
| R17.05 | pp. 7–8, §6, Table 2 | Qwen3-VL-8B pass rate 0.352. | Open answers are judged by Qwen3.6-35B-A3B. Table 2 averages generation over three runs. Retrieval is deterministic, not averaged QA accuracy. | Confirmed. The judge, 300 test examples, and three runs were added. |
| R17.06 | p. 8, Table 3 | Best single visual/clip R@5 0.507, full four 0.603. | The modality/granularity ablation table. For pass rate, the best single representation is visual/frame at 0.323, so “best” refers specifically to retrieval Recall. | Confirmed with the metric specified. |
| R17.07 | p. 5, Event Extraction and Deduplication | Real recurring events are deliberately excluded. | The authors explicitly explain that natural recurring-event queries are excluded to ensure unique evidence. This is an important limitation for transfer to repeated installations. | Confirmed. |
| R17.08 | p. 10, Reproducibility statement | Public code has not yet been confirmed. | The PDF promises benchmark/source/eval scripts upon acceptance. A promise does not establish actual release at the audit date. | The review's wording is tied directly to the PDF. Live GitHub was not checked. |
| R17.09 | p. 1, arXiv stamp | Version v2 dated 2 October 2026. | The PDF states arXiv:2606.13141v2, 2 Oct 2026. | Confirmed. |

## R18. LongVideoBench

Source for every row in this block: `docs/research/evidence/pdf-audit-longvideobench.pdf`, arXiv:2407.15754v1, 22.07.2024.

| ID | Page / table / section | Review claim | What the original contains and under what conditions | Verdict / action |
|---|---|---|---|---|
| R18.01 | pp. 1–4, §1–3, Tables 1–2 | 6,678 MCQ, 17 categories, referring reasoning. | The abstract and Table 2 confirm the counts. The task first localizes the referred context, then reasons about related details/events. | Confirmed. |
| R18.02 | p. 2, dataset setup | One source video is supplied. This is not corpus retrieval across weeks. | 3,763 videos, with a question referring to one video with interleaved subtitles. Duration groups also include 8–15 s and 15–60 s. Not all videos are hour-long. | Confirmed with an additional caveat: the benchmark has mixed durations. |
| R18.03 | p. 1, arXiv stamp | The reviewed PDF is v1 dated 22 July 2024. | The independent PDF check verifies dataset/task claims. NeurIPS status is not certified by this v1 without a proceedings footer. | The version is recorded, with venue metadata outside numerical verification. |

## R19. Video-MME

Source for every row in this block: `docs/research/evidence/pdf-audit-videomme.pdf`, CVPR 2025 proceedings.

| ID | Page / table / section | Review claim | What the original contains and under what conditions | Verdict / action |
|---|---|---|---|---|
| R19.01 | pp. 2–4, Table 1, §3 | 900 videos, 2,700 questions, approximately 254 h. | 900 total, three QA/video. Table 1 average 1017.9 s ×900 /3600 =254.475 h. “Approximately 254” is therefore valid as rounding, not an exact integer. | Confirmed by the original table numbers and arithmetic. |
| R19.02 | p. 4, §3, p. 5 evaluation | Short/medium/long, with and without subtitles. | 300 videos in each duration split. Short <2 min, medium 4–15, long 30–60. 744 videos have original subtitles, while all 900 have audio. Evaluation compares access to subtitles. | Confirmed. The subtitles condition does not imply that all 900 have an original subtitle file. |
| R19.03 | pp. 3–5, QA annotation/evaluation | MCQ accuracy does not measure issue-level evidence verification. | Each question has four options, with scoring of the chosen answer. The protocol contains no construction issue/correction tracks or citation validation. | A valid limit on the benchmark's scope. |

## R20. EgoSchema

Source for every row in this block: `docs/research/evidence/pdf-audit-egoschema.pdf`, arXiv:2308.09126v1, 17.08.2023.

| ID | Page / table / section | Review claim | What the original contains and under what conditions | Verdict / action |
|---|---|---|---|---|
| R20.01 | pp. 1–2, Abstract, p. 5 §3.1.1 | Approximately three-minute egocentric clips with MCQ. | Each question chooses among five options based on a three-minute clip. Videos are drawn from Ego4D, with clip selection and captions specified before evaluation. | Confirmed. |
| R20.02 | pp. 1–2, task definition | The relevant clip is provided in advance, without an archive retrieval/citation requirement. | Input: question + clip. Output: the correct option. The temporal certificate evaluates the duration of understanding required, not whether the method can select a recording from among cameras. | Confirmed by the task boundary. |

## Figures and visual verification

The new PNGs are direct crops from the original PDFs without redrawing, translating labels, or adding results. Rendering used PyMuPDF at a scale of 4 px/pt. Each final PNG was opened and inspected separately. No panels are cut off, arrows missing, or original labels unreadable when viewed at full size. Two preexisting crops were also checked. All diagrams have a Russian explanation of their panels in the working section.

| PNG in `docs/research/assets/` | Original PDF | Page / figure | Crop rectangle in pt, x0 y0 x1 y1 | Check |
|---|---|---|---|---|
| `pdf-audit-videorag-ren-figure1.png` | R09 | p. 3, Figure 1 | 105, 73, 506, 211 | Inspected, all three panels complete |
| `pdf-audit-egolife-egobutler-figure7.png` | R10 | p. 7, Figure 7 | 56, 17, 556, 284 | Inspected, captioning and QA stages |
| `pdf-audit-ego-r1-figure1.png` | R11 | p. 1, Figure 1 | 105, 239, 507, 462 | Inspected, toolkit and trace |
| `pdf-audit-egagent-figure2.png` | R12 | p. 4, Figure 2 | 70, 65, 539, 295 | Inspected, panels ①②③ |
| `pdf-audit-worldmm-figure2.png` | R13 | p. 3, Figure 2 | 56, 67, 556, 215 | Inspected, three memories and inference |
| `pdf-audit-em2mem-figure2.png` | R15 | p. 3, Figure 2 | 68, 68, 528, 302 | Inspected, schema / graph / retrieval |
| `pdf-audit-cfd-figure2.png` | R16 | p. 5, Figure 2 | 132, 68, 472, 258 | Inspected, including feedback arrows |
| `2024-fan-videoagent-figure2.png` | R05 | p. 4, Figure 2 | Previous crop, retained | Inspected and compared with the original |
| `2026-choi-merit-figure2.png` | R14 | p. 6, Figure 2 | Previous crop, retained | Inspected and compared with the original |

## Limits and remaining questions

1. Claims about GitHub contents (`_op.py`, `create_db_entity_graph.py`, `langgraph_agent.py`, `build_multimodal_event_record.py`, README, and app directory names) refer to an earlier separate static inspection. They were not checked in this audit or used to validate the literature. In the main text they are marked separately, rather than removed or presented as PDF evidence. The PDF does not establish CFD code availability at the audit date. For CARVE, only the promise of release upon acceptance was verified.
2. Conference/journal names for EGAgent, WorldMM, MERIT, EM²Mem, CFD, and TPAMI for Ego-R1 are not automatically certified by preprint content. The register records the version read. Where the PDF has a proceedings footer (Jeong, Luo, downloaded CVPR papers), it is noted. Architectures and metrics are confirmed for the listed PDFs, not presumed later final versions.
3. EgoLife v3 is dated 2026, although the work is known as CVPR 2025. This does not justify transferring v3 details to the original published version without checking. The review's numbers refer to the explicitly linked v3.
4. The EgoLife §4.2 equation and §5 comment on λ are not fully consistent. The working text retains the verbal implementation description in §5. Ego-R1 has an ambiguity between the 500+ h data-generation description and the standard 266 h EgoLife corpus. The exact correspondence of training/test source files is not established by the paper.
5. None of the confirmed QA tables measures the complete Aligned scenario: 100 cameras, camera/site identity, continuous updates, repeated visually similar operations, issue→fix verification, and claim-level citation correctness simultaneously. Such conclusions remain design requirements in the review rather than being attributed to the papers.
6. Nothing was run to reproduce training, inference, retrieval accuracy, or latency. Published methods, tables, protocols, and illustrations were checked. The absence of confidence intervals for most small ablations was not replaced by our own assessment of statistical significance.

