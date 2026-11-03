<a id="appendix-evidence"></a>

**Original source audit: November 1, 2026. Text restructuring: November 2, 2026.** The review is intended to support architectural decisions for the current Aligned problem statement. It is a thematic literature review drawing on a local collection and external primary sources, not a registered systematic review establishing exhaustive coverage of all publication databases.

Workflow: the problem statement, rules and Aligned Wiki index were read, and RL-Wiki and PM-Wiki were searched. Papers were selected on retrieval, long-term memory, linking sources, object states, errors, streaming and construction applications. Key local PDFs were read for methods, diagrams, tables and limitations. External searches added work on video corpus RAG, CARVE, MultiVENT-Raw and construction applications. ARIS `research-lit` was used for search and synthesis. Its arXiv helper failed with a certificate error, so primary sources were obtained through web access and direct downloads without disabling TLS verification.

The analysis was performed by three thematic subagents and the main agent. An initial selective cross-check was followed, at the user's additional request, by a second audit: new independent agents received the review and original PDFs without the previous audit conclusions. Critical results and architectural claims were checked for every paper discussed. PDFs, pages, tables, configurations and verdicts were recorded for the claims. **Agreement with the original paper does not constitute independent reproduction of its results.** Numbers from papers without an accessible PDF were removed from the main text, while the papers themselves were retained with an explicit limitation. [PDF audit results and register](/notes/pdf_audit_ru/).

### How to interpret source status

- **Original PDF checked:** specific architectures and numbers were checked against the cited sections/tables. The result remains a report by the authors.
- **Repository inspected:** the README, structure and selected functions were inspected. This establishes the presence of a mechanism, not the operability of the entire environment.
- **Abstract / partial text only:** for EgoConQS and construction EgoSafe (Liu et al., 2025), the full PDFs were unavailable in the earlier audit. Their numerical results were removed. Qiu construction GraphRAG has now been checked against a supplied full PDF, and its section has been updated. The separate EgoSafe by Chen et al., 2026 is a different paper, kept in the queue alongside RefCap. The full PDFs of Hsieh AI + BIM and Steenbergen et al. on case identifiers were supplied by the user, read and independently cross-checked.
- **Our synthesis:** the proposed Aligned architecture, data fields, metrics and experimental sequence are conclusions of this review, not published results of a unified system.

Papers using the same week of EgoLife are not independent confirmations of transfer across environments. A preprint, an accepted paper and a new code version may differ. Where a preprint was checked, its figures are not automatically attributed to the final publication.

### What was actually checked in the implementations

| Implementation | Static inspection | Practical limitation |
|---|---|---|
| EGAgent | Time/entity SQL schema, visual/audio/graph routing | Production latency and ingestion throughput were not measured |
| EM²Mem | Multimodal event record construction, offline README | The parent project's online backend is a separate mode |
| VideoRAG (Ren) | Separate entity and visual retrieval | A desktop app does not establish reliability on a construction site |
| MA-EgoQA / EgoMAS | Shared memory construction and inference from prepared captions | Perception cost needs a separate evaluation |
| EgoExoMem | View budget and greedy approximate MAP selector | Experimental reproduction was not performed |
| LEDGER | Construction path and query examples | The released pose-free branch differs from examples using prepared poses |
| M3-Agent | Character mapping during retrieval | Face/voice association errors need a separate test |
| GEB | README/assets | The full implementation had not been released as of the inspection date |
| PROVIA | Validation threshold selection and alarm protocol | Training and the evaluator were not run |
| EgoPER | Training prototypes, validation thresholds, test path | Data access must be requested from the authors |

GitHub links appear in the paper sections. Detailed evidence records and inspected code revisions are stored alongside the review as supporting materials. Neither model weights nor large datasets were downloaded for reproduction. No paid inference requests or training runs were launched.

### Why some directions are not covered in detail

Reward learning and robot control papers in the wiki—VIP, HIL-SERL, ReWiND, RoboReward and similar work—are important for a possible future proof-of-skill direction, but are not necessary foundations for the current retrieval system and issue register. Most general-purpose video backbones are mentioned only to explain the role of representations. The review does not attempt to declare a single winning model without a common protocol.

Related memory approaches not discussed in detail are not declared irrelevant or inferior. Selection prioritizes work that introduces a distinct necessary mechanism, provides a strong ablation, or reveals an important evaluation limit. Coverage here is assessed against system requirements: retrieval, evidence, multiple sources, state history, detection, correction, freshness and cost.

### History of the previous review expansion

A new search added 38 source notes based on full PDFs, followed by renewed selection for two Aligned subtasks. The archive gained 32 PDFs, while six further papers received notes based on originals already stored. At the time of that pass, the wiki contained 114 notes and 130 PDFs. That pass added 39 original figures to the review, bringing the total to 66. Inclusion does not imply equal priority: the main text emphasizes distinct methods, while narrow diagnostic studies and additional datasets receive a brief description of their role and limitations. Each new note retains `reviewed: false`, because agent checking is not human approval.

Three subagents prepared thematic sections and then exchanged independent checks. The main agent checked cross-topic conclusions, original sources for construction cases, and new systems papers. New numbers were checked against specific tables, denominators, availability of future frames, step boundaries, tuning data and execution modes. Images were extracted from original PDFs, and captions distinguish architectures from benchmark and data preparation diagrams. Sources, versions, hashes, inclusion decisions and recheck results are stored in the [wiki manifest](/downloads/aligned-wiki/raw/manifest.json). External-link checks from that pass apply to the materials addressed, not to every historical link in the wiki.

Specific limitations of that pass: for EventFormer, the 2024 preprint was read, while the accepted-paper metadata refers to ECIR 2026. CapMem's final frame verification policy was selected on the same test set, so its improvements are considered exploratory. IMPACT evaluates State & Reasoning with front-exo, not ego. GuideMe's default GT-history and anchor sampling simplify the task relative to autonomous streaming operation. Business-case timelines and capabilities are vendor reports, not independent measurements. All these limitations inform experimental choices rather than being hidden behind a general “verified” label.

### Queue of papers with incomplete access

**RefCap, 2025.** The [ICASSP 2025 publisher record](https://ieeexplore.ieee.org/document/10888164/) and [author repository](https://github.com/BUAAPY/RefCap) were checked, but the full original PDF was not obtained. Its potential role is visual verification of retrieval. The method and results are not treated on equal footing with papers checked in full text.

**EgoSafe, Chen et al., 2026.** The full PDF could not be obtained in the previous pass. This is a different paper from construction EgoSafe by Liu et al., 2025 in Chapter 8. Without the full text, its methods and results are not used as a basis for architectural selection.

**EgoConQS and EgoSafe, Liu et al., 2025.** Brief entries in Chapter 8 retain the topical context and sources. Quantitative conclusions remain deferred until the full texts are obtained.

### Restructuring audit of November 2, 2026

The content was reorganized by task without a new search of the complete literature corpus. The first chapter combines the former introduction, problem statement and representation foundations. Publications introducing both a benchmark and a method were split into separate descriptions of each. Three subagents checked thematic portions and then independently checked one another's sections. An additional pass through local primary PDFs confirmed specific instances of benchmark reuse and distinguished direct methodological extensions from comparisons and similar ideas.

All original source links and 66 illustrations were preserved. Local link targets, table-of-contents anchors and the correspondence between relocated blocks and the original version were checked. This is a structural and content audit, not a new reproduction of metrics or an exhaustive search for all subsequent citations. Code and data availability statuses refer to the dates of the checks described. The original version and details of that pass are stored alongside the review as supporting materials.

### Additional selection of 28 papers on November 2, 2026

The user's list of 28 papers was reviewed separately: 10 received a detailed discussion, 15 a brief insertion, and three were excluded from the main narrative. For each, the local source note and relevant sections of the primary PDF were read. Three thematic subagents prepared decisions and then independently checked one another's groups. After discussion, RoboMeter moved from exclusion to brief inclusion: its separate evaluation of unsuccessful-execution detection was relevant independently of robot policy training. PROGRESSOR, Freeform Preference Learning and Deep RL from Human Preferences remained outside the current review because the main results reviewed concern control-policy training rather than retrieval and verification of work quality.

Evaluation-protocol rows were added at the start of the relevant chapters, along with ten figures from original PDFs. Benchmark reuse is stated only where concrete sources confirm it. A new author-created test is not described as an independent standard. For HPP, the paper was also compared with a pinned code revision. Local links, anchors, tables, and preservation of the previous sources and 66 illustrations were checked, bringing the total number of illustrations to 76. The new results were not reproduced. Wiki notes and their statuses were not changed. Decisions for each paper, their rationale, limitations and the original review version are stored in the [selection register](/downloads/docs/research/evidence/new-work-selection-2026-11-02/all-decisions.json).
