---
year: 2026
venue: "ACL"
affiliations: ["Reality Labs Research at Meta", "University of Wisconsin-Madison"]
research_groups: [meta-reality-labs, wisconsin-waiv]
reviewed: false
tags: [video-memory, video-retrieval, video-qa, egocentric-video]
---

# Agentic Very Long Video Understanding

EGAgent combines temporal entity graphs, visual retrieval, and transcript search to answer questions about days of egocentric experience.

**Authors:** Aniket Rege, Arka Sadhu, Yuliang Li, Kejie Li, Ramya Korlakai Vinayak, Yuning Chai, Yong Jae Lee, Hyo Jin Kim.
**Paper:** [PDF](../raw/2026-rege-egagent.pdf) · [arXiv v3](https://arxiv.org/abs/2601.18157v3) · [ACL publication](https://aclanthology.org/2026.acl-long.2161/)
**Website:** [Official project](https://facebookresearch.github.io/egagent/)
**Code:** [GitHub repository](https://github.com/facebookresearch/egagent)

![EGAgent: Figure 2 from the paper](../assets/2026-rege-egagent.png)

*Figure 2 from the original paper ([PDF page 4](../raw/2026-rege-egagent.pdf#page=4)).*

## Problem and contribution

Independent clip retrieval struggles with questions such as who repeatedly accompanied someone or what happened before a particular interaction. EGAgent makes entities and time-bounded relationships directly searchable, supporting reasoning across multiple days rather than only retrieving similar-looking moments (§§1–3).

## Approach

Sampled frames supply scene descriptions, predicted locations, and visual embeddings. Audio supplies timestamped transcripts. An LLM extracts people, objects, places, and relations such as `uses` or `talks-to`. Each relationship stores its start/end time and supporting text in a SQLite table. This is a symbolic entity graph, not a metric 3D reconstruction (§3.2, Figure 3).

A planning agent decomposes the question into subqueries. It selects visual search, transcript search, or graph SQL search. Graph queries progressively relax constraints when exact matches fail. An analyzer filters retrieved evidence into working memory, and a final multimodal agent answers from it (§3.3, Figure 2).

The system uses pretrained models and prompting. Graph construction supports incremental updates, but evaluation uses prepared databases. Frame retrieval can recover visual evidence that the text graph omitted.

## Evidence and limits

With Gemini 2.5 Pro, EGAgent reaches 57.5% on the 500-question EgoLifeQA evaluation. A more isolated GPT-4.1 comparison raises accuracy from 48.6% without the entity graph to 50.7% with it (Table 1). These are QA results, not measurements of workmanship.

The default GPT-4.1 configuration takes 169 seconds and 571K tokens per question. Replacing LLM transcript search with BM25 reduces these to 125 seconds and 172K tokens, while accuracy falls to 43.9% (Table 4). These measurements concern answering, not initial graph construction. EgoLife transcripts include manual speaker diarization, and upstream entity or relation errors propagate into reasoning (§6).

## Research connections

- **Builds on:** [[2025-yang-egolife|EgoLife / EgoLifeQA]] — uses its week-long recordings, captions, and manually diarized transcripts (§4.1–4.2).
- **Compares with:** [[2025-yang-egolife|EgoButler]] and [[2026-tian-ego-r1|Ego-R1]] — evaluates existing retrieval agents on EgoLifeQA (Table 1).

## Relevance to Aligned

Our interpretation: the temporal SQL representation is a concrete candidate for querying worker–tool–location interactions. Its latency and dependence on clean identities make it a reference architecture to simplify and validate before deployment.

## Human notes
