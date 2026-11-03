# Rechecking the literature review against original PDFs

> This register records an earlier PDF audit. In the subsequent expansion of November 1, 2026, the full Qiu GraphRAG PDF was obtained and checked, so its previous “unavailable” status below is historical. The current discussion and new papers are in the [review](/chapters/foundations/). Detailed receipts and independent rechecks are in the [wiki manifest](/downloads/aligned-wiki/raw/manifest.json).

Date: November 1, 2026. Document checked: [LITERATURE_REVIEW_RU.md](/chapters/foundations/).

The audit compares claims in the review with the original papers. It does not reproduce training, inference, or the original annotations, and therefore does not establish the truth of the published experimental results themselves.

## Substantive corrections

| Paper | Clarification |
|---|---|
| VideoRAG, Jeong et al. | ROUGE-L 24.95 and 17.22 refer to systems using different corpora: HowTo100M and Wikipedia. This is not a controlled modality ablation. VideoRAG-V receives video frames, while VT adds text. |
| EgoLife | Table 5 and Table 7 describe different response models. The 45.5 result is not presented as a captions-only change relative to the entire main table. |
| EGAgent | The final VQA agent generates the answer. It cannot be credited with a separate independent verification of all claims. |
| LEDGER | The 0.99/1.41 m errors are tied to a specific configuration and the coverage of returned answers, not universal VQ3D success. |
| OSNOM | Temporal metrics are not interpreted as a guarantee of continuous object absence from the frame. |
| STORM-PSR | The baseline is named and the negative results on MECCANO are retained. Latency is measured only for true positives. |
| InternVideo2 | The first stage is clarified: distillation of unmasked token features with masked input. |
| ProactEgoMem / IndEgo | References to the sections, figures, and tables containing the results were corrected. |
| ConstructAI | The diagram comes from the original paper. Ambiguities about the checkpoint and training recipe are not replaced with guesses. Alert delay is separated from rectification delay. |

## Where PDF verification was not possible

The full original PDFs for **EgoConQS, EgoSafe, and Qiu et al. construction GraphRAG** were not obtained through the open sources checked. Their headline figures were removed from the review. Brief descriptions of their tasks remain, explicitly marked as based on available descriptions rather than confirmed against PDFs. A conclusion that “absolutely everything has been checked and is correct” would therefore be inaccurate.

## Coverage

The audit checked 20 original PDFs on retrieval, 15 on multiple sources and object states, 12 on procedures/streaming/grounding/construction, and 4 on foundational encoders and MultiVENT-Raw. DTGL and TGML are counted separately. Each group has a paper-by-paper register of critical claims. The three unavailable papers are listed above and are not counted as PDF-verified.

## Detailed registers

- [Foundation models, MultiVENT-Raw, and additional sources](/notes/root/).
- [Retrieval, video RAG, and long-term memory](/notes/retrieval/).
- [Multiple sources, identities, and object states](/notes/multisource/).
- [Procedures, proactive detection, grounded QA, and construction](/notes/proactive/).

The registers identify the claims checked, original PDFs, pages, tables, comparison conditions, and limitations. Previous reports were not passed to the new topic auditors as evidence. The text before corrections is preserved in `pdf-audit/review-before-audit.md`.

## Figures

**21 new figures** were added, bringing the review to **27 original figures** of architectures and protocols. Benchmarks use a task or evaluation diagram, not an invented model architecture. Each figure identifies the paper, figure number, PDF page, and an explanation (in Russian in the original review). The new images were extracted from PDFs and inspected visually. The original main review remains a single Markdown file, with images stored in `assets/`.

## Limits of verification

Publication status, current code availability, and licensing terms cannot always be established from a PDF. They are treated separately from verification of scientific results. Recommendations for Aligned’s architecture and calculated planning scenarios are marked as synthesis, not experimental findings from the papers.
