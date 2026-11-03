---
year: 2026
venue: "CIRP Annals 75, 19–23"
affiliations: ["Automation Technology Division, Fraunhofer IPK", "Department of Industrial Automation Technology, Technical University of Berlin"]
research_groups: [fraunhofer-ipk-automation, tu-berlin-iat]
reviewed: false
tags: [method, procedure-understanding, egocentric-video]
---

# AI-based worker guidance in assembly and disassembly operations using multimodal ego/exo-centric data capture and structured task knowledge

IndEgo Assistant turns narrated expert demonstrations into human-validated procedure graphs and video representations for recognizing steps and recommending what comes next.

**Authors:** Vivek Chavan, Jörg Krüger.
**Paper:** [PDF](../raw/2026-chavan-indego-assistant.pdf) · [Publisher](https://doi.org/10.1016/j.cirp.2026.04.066)
**Website:** [Project](https://indego-assistant.github.io/)
**Code:** [Later reference implementation](https://github.com/IndEgo-Assistant/indego-procedure-assistant), including a gaze extension. Original experimental code is not included.
**Citations:** 1 ([OpenAlex](https://openalex.org/W7161635631), checked 2026-11-03).

![IndEgo Assistant: Figure 2 from the paper](../assets/2026-chavan-indego-assistant.png)

*Figure 2 from the original paper ([PDF page 2](../raw/2026-chavan-indego-assistant.pdf#page=2)).*

## Problem and contribution

Industrial procedures contain dependencies and permitted alternative orders that a flat action transcript misses. This work assembles existing models into a pipeline that extracts that structure from a small number of demonstrations. Expert review is an explicit step before the extracted knowledge supports worker guidance (§§1–2).

## Approach

Expert video and narration → timestamped transcript and step clips → validated precedence graph plus visual features → recognized execution history → next-step instruction (Figs. 2–4).

WhisperX aligns narration with time. Llama 3.1-8B extracts action labels, boundaries and dependency relations. The expert corrects the resulting directed graph, including parallel branches that cannot be recovered from chronology alone. Narration is the primary evidence for procedural intent (§2.2).

V-JEPA 2 supplies frozen video embeddings. With one demonstration, pretrained embeddings are used directly without fine-tuning. With multiple demonstrations, lightweight prediction heads are trained on these representations. Recognized actions update an execution history. A language-model reasoning component maps that history onto the graph and recommends a step whose prerequisites are satisfied (§§2.3–2.4).

The capture setup supports ego and exo views, narration and optional gaze. The proposed guidance loop consumes observations sequentially, but the experiments process recordings offline. The reusable outputs are the graph, instructions, labeled clips and recognition model.

## Evidence and limits

Evaluation uses one workstation-disassembly scenario, with one or four approximately 20-minute expert recordings and a separate guidance execution. Action accuracy rises from 0.66 to 0.80, and next-step accuracy from 0.76 to 0.84 (§4, Table 1).

Producing the task model takes about one hour per expert recording on an A6000. Deployment latency and the user interface are outside the evaluation. Real-time mistake detection and transfer to other products remain future work (§§4–5). Correctly naming a step does not verify its physical quality.

## Research connections

- **Builds on:** V-JEPA 2 — uses its video representations for recognition (§2.3, reference 6).
- **Builds on:** [[2025-chavan-indego]] — uses its industrial recordings for the case study (§3.1).

## Relevance to Aligned

Our interpretation: a concrete pattern for expert-reviewed procedure onboarding. A construction pilot could retain the graph and evidence clips, while separately validating defects, unseen execution paths and end-to-end response time.

## Human notes
