---
year: 2025
venue: "Findings of ACL"
affiliations: ["KAIST", "DeepAuto.ai"]
research_groups: [kaist-mlai]
reviewed: false
tags: [video-retrieval, video-qa, efficient-processing]
---

# VideoRAG: Retrieval-Augmented Generation over Video Corpus

VideoRAG retrieves instructional videos from a corpus and supplies selected visual evidence to an answer generator.

**Authors:** Soyeong Jeong, Kangsan Kim, Jinheon Baek, Sung Ju Hwang.
**Paper:** [PDF](../raw/2025-jeong-videorag.pdf) · [Publisher record](https://aclanthology.org/2025.findings-acl.1096/)
**Website:** Not found in checked sources beyond the publisher record and repository.
**Code:** [Official repository](https://github.com/starsuzi/VideoRAG)
**Source version:** Findings of ACL 2025 proceedings, pp. 21278–21298, including appendices; distinct from Luo's Video-RAG and Ren's VideoRAG.

![VideoRAG retrieval and response generation pipeline](../assets/2025-jeong-videorag.png)

*Figure 2. VideoRAG retrieval and response generation pipeline. Source: [original paper, PDF p. 3](../raw/2025-jeong-videorag.pdf#page=3).*

## Problem and contribution

Video QA commonly assumes the right recording is supplied. This work instead treats videos as external knowledge: retrieve useful instructional demonstrations, then answer a general how-to question. Its contribution combines corpus retrieval, visual answer conditioning and learned frame selection (§§1–2).

## Approach

Offline frame representations and optional transcripts form a searchable corpus. InternVideo2 produces text and video embeddings; their similarities rank videos. A generator such as LLaVA-Video receives selected frames from the retrieved recording. VideoRAG-V uses visual context, while VideoRAG-VT adds subtitles or Whisper-generated transcripts (§§2.2, 2.4).

Frame selection first reduces redundancy with k-means++ and then scores candidate subsets with small trained MLPs over CLIP features. Retrieval uses a question-independent four-frame representation; generation selects up to 32 frames conditioned on the question. The reported generation setting retrieves one video. Selection networks are trained from automatically collected retrieval/generation outcomes, so the complete proposal is not training-free (Appendix A).

The stored corpus and offline selection distinguish this from streaming personal memory; the goal is useful instruction, not reconstructing a particular worker's history.

## Evidence and limits

On WikiHowQA with HowTo100M and LLaVA-Video-7B, VideoRAG-V obtains ROUGE-L 24.95 versus 17.22 for BM25 Text RAG (Table 1). BM25 searches Wikipedia, so this comparison changes knowledge source as well as modality. ROUGE-L measures answer-text overlap, not event-localization accuracy. Ensemble retrieval reaches R@1 0.103 versus 0.088 for text and 0.054 for vision (Table 2).

The repository contains retrieval and generation code but marks frame selection and textual extraction as pending; complete reproducibility is not established. No model execution was performed.

## Research connections

- **Cites:** [[2025-luo-video-rag]] — contrasts supplied-video augmentation with corpus-level retrieval (§1).

## Relevance to Aligned

Our interpretation: a clear retrieve-video-then-read baseline. Worker-specific time, object identity, evidence citations and exhaustive archive retrieval need additional evaluation.

## Human notes
