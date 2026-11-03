---
year: 2026
venue: "ICLR"
affiliations: ["ByteDance Seed", "Zhejiang University", "Shanghai Jiao Tong University"]
research_groups: [bytedance-seed]
reviewed: false
tags: [dataset, benchmark, method, video-memory, video-retrieval, video-qa, egocentric-video, multi-person]
---

# Seeing, Listening, Remembering, and Reasoning: A Multimodal Agent with Long-Term Memory

M3-Agent links audio-visual events and inferred knowledge to persistent person identities, then learns iterative memory retrieval for long-video question answering.

**Authors:** Lin Long, Yichen He, Wentao Ye, Yiyuan Pan, Yuan Lin, Hang Li, Junbo Zhao, Wei Li.
**Paper:** [PDF](../raw/2026-long-m3-agent.pdf)
**Website:** [Project website](https://m3-agent.github.io/)
**Code:** [GitHub repository](https://github.com/bytedance-seed/m3-agent)
**Source version:** arXiv:2508.09736v4, submitted 9 October 2025, with 10 October on the cover. First released August 2025. [ByteDance's publication record](https://seed.bytedance.com/en/public_papers/seeing-listening-remembering-and-reasoning-a-multimodal-agent-with-long-term-memory) identifies ICLR 2026.
**Citations:** 2 ([OpenAlex](https://openalex.org/W6910636478), checked 2026-11-03).

![M3-Agent: Figure 1 from the paper](../assets/2026-long-m3-agent.png)

*Figure 1 from the original paper ([PDF page 2](../raw/2026-long-m3-agent.pdf#page=2)).*

## Problem and contribution

Video captions lose identity consistency across changing faces, voices, and contexts. M3-Agent combines identity-grounded episodic observations with semantic memory, including inferred relationships and entity attributes. M3-Bench tests this through 100 scripted first-person videos and 920 web videos with human-authored, open-ended questions (§§3–4).

## Approach

A memory writer processes 30-second audio-video clips. Face and speaker tools assign persistent IDs, and a multimodal model generates event descriptions, knowledge statements, and face–voice equivalences. An external graph stores text, face images, audio, embeddings, timestamps, and weighted identity links. Repeated associations strengthen their weights and resolve conflicting mappings by voting. Memory accumulates without a specified bounded-retention policy (§§4.1–4.2, Appendix C).

At query time, a separate language model alternates reasoning with similarity search over nodes or clips, receiving up to two relevant clips per retrieval and at most five rounds. It returns an answer rather than robot actions (§4.3).

Training separates the components. Qwen2.5-Omni-7B learns memory writing from Gemini/GPT-4o synthetic demonstrations and automatically derived identity correspondences. Qwen3-32B learns retrieval with DAPO, rewarded by GPT-4o judgment of final-answer correctness. This is RL for a QA controller, not robot-policy fine-tuning (§4.4).

The proposed writer updates incrementally, but experiments process recorded videos. [?] Appendix C does not fully specify whether identity clustering excludes future observations. Global identity mining in Appendix D is training-label construction. Ingestion includes perception, transcription, and memory generation, while queries reuse that graph. No end-to-end latency or long-term storage bound is demonstrated.

## Evidence and limits

Accuracy is 30.7% on M3-Bench-robot, 48.9% on M3-Bench-web, and 61.8% on VideoMME-Long. Removing semantic memory lowers these to 13.6%, 29.7%, and 48.7% (Tables 5–6). GPT-4o judging agrees with human majority on 96 of 100 sampled answers (§3.3).

Despite its name, M3-Bench-robot uses camera-wearing actors simulating robots, not physical robots (§3.1, Appendix A). Fine spatial detail remains a weakness. Model-generated semantic claims can outlast their evidence, and final-round prompts permit guessing when memory is insufficient (§5.5, Table 22).

## Research connections

- **Builds on:** Qwen2.5-Omni, Qwen3, and DAPO — supply the memory writer, reasoning controller, and RL algorithm (§4.4).
- **Compares with:** Socratic Models, MovieChat, MA-LMM, and Flash-VStream — evaluates caption retrieval and feature-memory alternatives (§5.1, Table 5).

## Relevance to Aligned

Our interpretation: persistent identity links could connect workers' spoken instructions with observed actions. Skill claims would still require grounded execution evidence and calibrated uncertainty, beyond semantic summaries.

## Human notes
