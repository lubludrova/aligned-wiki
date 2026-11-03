<a id="chapter-8"></a>

In construction, a retrieved action must be linked to a specific element, design, and requirement. Observed installation, correct execution, and accepted work may require different evidence. For Aligned, this chapter examines which parts of that chain have already been studied directly on construction data, and which are still being transferred from kitchens, workshops, or general Video QA.

The following sections consider progress recognition, checking against requirements, and the lifecycle of a violation. These are different tasks within the same application context. Product offerings are discussed separately in [Chapter 9](/chapters/business/#chapter-9).

### Data and evaluation protocols

These studies have no shared, verified benchmark for ranking the readiness of the entire system. It is therefore useful to distinguish recognition tests, answer evaluation, field observations, and illustrative examples first.

| Dataset or protocol | What is actually measured | What has not been established |
|---|---|---|
| **D4AR: three projects** | Preliminary evaluation of aligning photographs, 3D, and BIM | A modern benchmark for video memory or the quality of concealed work |
| **AI + BIM: phase images and a site with three cameras** | Phase recognition, coverage across views, and cycle time | Independent transfer across sites, accuracy of each BIM ID, and installation quality |
| **Ref-Construct / MeViS in ConstructAI** | Segmentation measured by J&F | Violation recall and correct issue closure |
| **ConstructAI before/after** | Author-reported completion rate, rectification delay, and detect-to-alert time | A causal system effect under comparable exposure and case mix |
| **Construction GraphRAG: 100 scenarios, 12 specialists** | Answers about observations, requirements, and combined compliance checks | Streaming violation recall and false-alarm rate on an independent construction site |
| **From Sensing to Scheduling** | An illustration linking observed quantities, evidence, and acceptance | A field comparison of methods or a measured improvement in management |
| **EgoConQS / construction EgoSafe** | According to the available abstracts, operation retrieval and hazardous-object detection | The full protocol and results have not been verified without the original PDFs |

Sources are provided in the individual discussions. Independent reuse of these specialized construction protocols has not been established in this review. ConstructAI uses MeViS as an external segmentation test, but that does not make it a construction monitoring test.

### Foundations and key methods

#### D4AR, 2009: connecting as-built and as-planned

Golparvar-Fard, Peña-Mora, and Savarese: D4AR uses ordinary site photographs to reconstruct camera poses and a sparse 3D scene, then aligns it with BIM and the schedule. It is a precursor to an important idea: a progress fact should refer to a specific construction element in space and time. The paper describes preliminary results on three projects, not a modern long-video QA benchmark. [ITcon article](https://www.itcon.org/paper/2009/13), [reviewed PDF, pp. 1, 10–14](https://www.itcon.org/papers/2009_13.content.06965.pdf). For Aligned, a geometric layer is useful when drawings or BIM are available. However, a change in external geometry does not confirm concealed fasteners or recover responsibility for a specific action. **As-built comparison** therefore complements action/event memory. This is our connection between research directions, not a claim that D4AR already solved helmet QA.

#### AI + BIM: a stable element identifier and the cost of observability

**Hsieh, Chen, Chen, and Wu, Automation in Construction 2026**, demonstrate a concrete path from multiple cameras to a shared history of construction components. YOLOv8 identifies one of six phases, such as tying reinforcement or assembling formwork. Measured distances to columns and parameter calibration align physical cameras with virtual cameras in BIM. A ray through the bounding-box center selects the first intersected model element, after which its state is compared with the schedule (§3.2). [Paper note](/notes/2026-hsieh-ai-bim-progress/), [PDF](https://doi.org/10.1016/j.autcon.2026.106783).

![AI + BIM: cameras, phase recognition, and construction component updates](/media/assets/expansion-crosscut/ai-bim-progress-fig2.png)

*Original Fig. 2, PDF p. 5. The left side connects cameras and the detector to BIM, while the right side shows the manual process used for comparison. Camera calibration retains human involvement.*

Three heuristics are available when views conflict: maximum confidence, the earliest phase, or voting with the earlier phase selected in a tie. This is a useful fusion formulation, but the correctness of the selected policy is not separately evaluated quantitatively. Physical-element identity is particularly important: a stored BIM ID links observations to a specific column rather than an unstable textual description such as “the column next to the worker.” A moving helmet camera would require different localization methods and a separate evaluation of incorrect assignments.

The detector is trained on **580 images** with an 8:1:1 split. Table 5 reports **precision 80.8%, recall 72.7%, mAP@0.5 75.2%** on 253 test objects. These measure phase recognition, not defect recall or BIM ID assignment accuracy. A split across independent construction sites has not been established. Some demonstrations use edited photographs of an existing building (§4.2), although there is also a separate real reinforced-concrete site with three cameras (§4.4). Table 7 shows view coverage of eleven columns, not a system confusion matrix.

In Table 8, a complete three-camera cycle takes **less than a minute**, while a manual walkthrough of approximately 40 m takes **less than ten minutes**. However, the operating configuration updates data **once an hour**. The speed of a single pass cannot be presented as continuously fresh observations. Shared component IDs, separate evaluation of camera coverage and recognition, and comparison with the plan are useful for Aligned. A visible construction phase still does not establish correct installation quality or acceptance: these remain separate checks in the next work.

#### From Sensing to Scheduling: visible installation and accepted work

**Isaac and Lucko, ISARC 2026.** This methodological paper helps define statuses rather than select another VLM. It adds two attributes to a work package: **evidence type** and **observability window**. Geometry may establish the presence of an element, whereas a test, inspection record, or signature confirms other conditions. The proposed completion circuit separates execute, test/verify, and accept (§4). [Paper note](/notes/2026-isaac-sensing-scheduling/), [PDF](https://www.iaarc.org/publications/fulltext/ISARC2026_1105.pdf).

![Example of classifying construction work by visual observability](/media/assets/expansion-crosscut/sensing-observability-fig2.png)

*Original Fig. 2, PDF p. 4 / proceedings p. 827. This is a heuristic classification of the observability of MasterFormat divisions, not measured recognition accuracy or a regulatory list of permissible acceptance procedures.*

From measured quantities of completed work, the authors calculate quantity shortfall, delay, forecast completion, and required productivity. However, §6 explicitly calls the example illustrative. There is no field comparison of methods, probabilistic model of measurement error, or evidence of improved management. For Aligned, we transfer a specific distinction: **“a correction was observed” and “the issue is closed on all required grounds” must be separate statuses**. Concealed work may require an earlier clip or a separate document. The currently downloaded PDF has the subtitle *Deviation-Based Framework*, matching the proceedings page.

#### GraphRAG for construction compliance: requirements separate from observations

**Qiu et al., Advanced Engineering Informatics 74, 104642, 2026.** *A GraphRAG-driven multi-agent framework for worker-centric construction process compliance supervision via egocentric video* is one of the closest scientific analogues to Aligned. This discussion is based on the reviewed full publisher PDF. [Paper note](/notes/2026-qiu-graphrag-compliance/), [original PDF](https://www.sciencedirect.com/science/article/abs/pii/S1474034626003344).

The method constructs two aligned graphs: observed site entities and actions, and the conditions and constraints in regulatory documents. Qwen2.5-VL converts video into descriptions, and an interface allows a person to correct them before further analysis. A planner routes the question to the observation graph, the requirements graph, or both. Specialized agents retrieve evidence, reasoning compares it, and reflection checks its sufficiency and refines the queries. This is more useful than the notion of “putting regulations and captions into one vector store,” because a regulatory requirement and an observed fact retain different roles (§3, §4.2).

![Construction GraphRAG: two ontologies and multi-agent retrieval](/media/assets/expansion-existing/2026-qiu-graphrag-compliance.png)

*Original Fig. 2, PDF p. 4. Left: alignment of the site and requirements graphs. Right: planning, retrieval, and reflection.*

The evaluation involves **12 specialists and 100 scenarios**: 30 questions about observations, 30 about requirements, and 40 combined compliance checks. It uses selected construction episodes from Ego4D, not an independently collected multiweek stream from a US construction site (§4.1, §4.4). The authors report **0.94 LLM semantic accuracy**, compared with 0.85 for ordinary GraphRAG. This assesses answer content against a reference using an LLM, **not violation recall, the proportion of correctly processed frames, or the false-alarm rate**. Context recall of 0.90 and faithfulness of 0.93 likewise concern retrieved evidence and answers, with definitions in §4.4.1. Removing reflection lowers context recall by 0.12 in the reported ablation (§5.1, Figs. 20, 22).

The work's strength is a concrete decomposition of compliance checking and an example in which comparison with a regulation requires recovering the duration of an observed operation. Its limitations include the small sample, insufficient disclosure of LLM-judge details, and unavailable supplementary prompts. Manual correction of descriptions is explicitly supported, but its contribution to the final metrics is insufficiently specified. Some differences between single-agent ablations in the text of §5.1 also disagree with Fig. 22, although the decrease in context recall without reflection cited here is supported by both. The claimed acceleration of management review does not replace reproducible measurements of ingest and query latency. For Aligned, dual-graph retrieval should be tested against simpler document retrieval with the same input captions, budget, and access to frames. Adding multiple agents does not by itself establish the correctness of the original visual observation.

#### ConstructAI, AAAI 2026: an issue lifecycle with substantial caveats

**Zhang et al.** describe deployed monitoring at construction and power-grid sites in China. Helmet cameras, CCTV, and drones connect to an edge–cloud pipeline. An issue is assigned to a responsible person, and corrective action is checked using new footage. [Official AAAI PDF](https://ojs.aaai.org/index.php/AAAI/article/download/41452/45413).

![ConstructAI: original model diagram](/media/assets/pdf-audit-constructai.png)

*The figure is the original ConstructAI architecture, Fig. 1, PDF p. 4 / proceedings p. 40170. LLaMA3/LoRA and SAM2/adapter are connected through `[SEG]`, and the output contains a mask and a violation description. The text on p. 3 calls the backbone LLaVA-like, so the exact checkpoint remains unclear. [Local PDF](https://ojs.aaai.org/index.php/AAAI/article/download/41452/45413).*

Table 2 (PDF p. 7): Ref-Construct validation **J&F 46.6 zero-shot / 55.6 fine-tuned**, MeViS zero-shot 10.4. This is segmentation, not violation recall. Table 3 (p. 8) separates a completion rate of **2.3% → 75.8%**, rectification delay of **~340 → ~15 minutes**, and detect-to-alert time of **<10 seconds**. The introductory time comparison mixes these stages.

This is a before/after observation without a described randomized control. A rise in detected violations from 929 → 1200 without a denominator does not establish improved recall. The 28,000 video-hours and 9,000 reports are author-reported. The visual input to DeepSeek-R1/Qwen2-72B during pseudo-annotation is unclear. The two-stage training on p. 3 and end-to-end description on p. 5 do not provide an unambiguous reproduction recipe.

Our conclusion: the **detect → assign → rectify → verify → archive** workflow is useful. A causal effect on safety, transferability to the US, and chat over weeks of video have not been demonstrated. The complete list of checks and uncertainties is in the [PDF audit register](/notes/proactive/).

### Works with limited access to the primary source

#### EgoConQS, 2025: finding a key construction operation for review

Guo et al.: according to the title and publisher abstract, the work concerns retrieving key construction activities for quality supervision. However, **the original full PDF was not obtained in this review**: neither the publisher nor the author's ResearchGate page provided an accessible PDF. We therefore do not treat the architecture, metric aggregation, or numerical results as verified, and do not use them as quantitative evidence. [Publisher](https://doi.org/10.1016/j.autcon.2024.105933), [author page](https://www.researchgate.net/publication/388162083_Egocentric-video-based_construction_quality_supervision_EgoConQS_Application_of_automatic_key_activity_queries).

Its thematic connection to Aligned is operation retrieval for subsequent review. Our distinction holds independently of the particular method: detecting an operation does not amount to automatically verifying its quality.

#### EgoSafe, 2025: a narrow detector of observable hazardous objects

Liu et al.: the published paper is titled *Egocentric camera-based method for detecting static hazardous objects on construction sites*. EgoSafe is the name of the associated author preprint. **The full original PDF was not obtained**: the SSRN download returned HTTP 403, and the publisher page offers article access. The specific backbone, dataset size, split, classification results, and localization caveats therefore remain unverified against the PDF and are not reported here. [Publisher](https://doi.org/10.1016/j.autcon.2025.106048), [preprint page](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4936193).

For Aligned, this is a candidate for separate reading on observable static hazardous objects. Until the full text is available, it cannot support claims about the quality of streaming site monitoring.

### Comparing the approaches

D4AR and AI + BIM link observations to spatial elements and a plan. Construction GraphRAG compares observations with requirements, while ConstructAI adds assignment and verification of corrective action. From Sensing to Scheduling clarifies why a visible result may be insufficient for acceptance. These works describe different parts of the process, so their metrics cannot be combined into a single expected accuracy for Aligned.

The geometric approach takes photographs, cameras, and BIM as input. Requirements checking takes extracted observations and documents. The issue lifecycle takes a detected violation and subsequent evidence. An error in an early stage persists even after adding more complex reasoning, so both the original observation conditions and separate verification of each transition matter.
