# PDF audit: foundations and additional sources

Original PDFs freshly read,2026-11-01. MultiVENT tables6–7 rendered and visually checked. No previous audit relied on.

| ID | Paper / claim | PDF location | Verdict | Evidence |
|---|---|---|---|---|
| F01 | Frozen in Time: Independent text/video encoders, common space | docs/research/pdf-audit/sources/frozen.pdf, p3, §3.1 | PASS | Independent dual pathways, linear common-space projections and dot product explicitly described. |
| F02 | Frozen in Time: Spatial and temporal attention | docs/research/pdf-audit/sources/frozen.pdf, p3, §3.1 | PASS | Temporal self-attention followed by spatial attention per block. |
| F03 | Frozen in Time: Positive matched pairs and negative mismatches | docs/research/pdf-audit/sources/frozen.pdf, p3, §3.2 + p4 equations2–3 | PASS | Symmetric contrastive cross entropy over batch pairs. |
| F04 | Frozen in Time: Joint image/video training, WebVid >2M | docs/research/pdf-audit/sources/frozen.pdf, p4, §3.2, §4.1 | PASS | Alternating batches; WebVid-2M actually contains2.5M video-text pairs. |
| F05 | Frozen in Time: Strong historical retrieval results | docs/research/pdf-audit/sources/frozen.pdf, p8, Tables4–6; discussion §4.6 p7 | PASS | Benchmark comparisons support limited historical performance claim, no universal/current best claim retained. |
| F06 | CLIP4Clip: CLIP transfer and temporal aggregation alternatives | docs/research/pdf-audit/sources/clip4clip.pdf, p4, §3.1–3.3 + p5 | PASS | CLIP pretrained backbones, mean-pool, sequential LSTM/transformer and tight interaction alternatives. |
| F07 | CLIP4Clip: Five datasets MSR-VTT MSVD LSMDC ActivityNet DiDeMo | docs/research/pdf-audit/sources/clip4clip.pdf, p6, §4.1; tables pp6–8 | PASS | p5 overview says MSVC but p6 dataset definition and Table2 identify MSVD. Review uses correct MSVD. |
| M01 | MultiVENT-Raw: 18.0 vs47.2 Full nDCG@10 | docs/research/pdf-audit/sources/multivent-raw.pdf, p6, Table1 | PASS | OmniEmbed versus OmniEmbed-mv first-stage retrieval, Full columns, exactly matches. |
| M02 | MultiVENT-Raw: 19.7→26.2 information F1 | docs/research/pdf-audit/sources/multivent-raw.pdf, p7, Table2 | PASS | TRACE-lite fixed, retriever OmniEmbed to OmniEmbed-mv+RankVideo; Full information F1. |
| M03 | MultiVENT-Raw: 6.9 best citation F1 final Full block | docs/research/pdf-audit/sources/multivent-raw.pdf, p7, Table2 | PASS | MARQUIS-bullet final retrieval block Full Citation F1=6.9; not Core score8.3. |
| M04 | MultiVENT-Raw: top10 MiRAGE reference Qwen3.5-27B | docs/research/pdf-audit/sources/multivent-raw.pdf, p7, Table2 caption | PASS | All protocol qualifiers exactly in caption. Table visually inspected. |
| M05 | MultiVENT-Raw: Event retrieval and multi-video report tasks | docs/research/pdf-audit/sources/multivent-raw.pdf, p5, §4.1; p6 §4.2 | PASS | Ranked event videos, cited reports. Figure2 p3 shows query/evidence/claims, not model architecture. |
| Q01 | Construction GraphRAG Qiu: 94% semantic accuracy /93% faithfulness | None, pNone, abstract only | UNVERIFIED_REMOVED | No original PDF found on publisher/institutional route. Publisher PDF403. Removed both numerical claims from review. |
| Q02 | Construction GraphRAG Qiu: Dual ontology, video/regulation graph, agents | None, pNone, abstract only | UNVERIFIED_QUALIFIED | Narrative now explicitly attributes architecture to abstract, no PDF-verified claim. No invented architecture figure. |

## Own scenario calculations

50/100*6*60 =18,000/36,000 camera-hours. Non-overlap30s chunks=2,160,000/4,320,000.1fps=64,800,000/129,600,000 frames.4Mbit/s÷8 gives32.4/64.8 decimal TB.768 dimensions*2 bytes*chunks=3.31776/6.63552 decimal GB.300/600 daily camera-hours÷24=12.5/25 realtime camera equivalents. All are explicit assumed scenarios, not literature empirical results.

Repository status, venue publication status and access licenses are not provable from PDF alone. They remain separately labelled earlier static/web checks. No code benchmarking performed.

## InternVideo2 original ECCV PDF

21-page original obtained from ECVA after initial transfer timed out. Read pp1,3–6 and method figure2. I01: clarified stage1 as unmasked-feature reconstruction/distillation under input masking (p4–5). I02:6B/>60 tasks statements match abstract and intro, evaluation §5. I03:stage3 QFormer/LLM supported §3.3 p6. Repo separation remains labelled static-code evidence, not PDF evidence.
