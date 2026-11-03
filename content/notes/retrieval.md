# PDF-аудит раздела 4: retrieval и долговременная видеопамять

Дата: 2026-11-01. Проверяемый текст: `docs/research/LITERATURE_REVIEW_RU.md`, раздел 4, рабочая правка только `docs/research/parts/retrieval.md`.

Использованы только сами проверяемые утверждения обзора и оригинальные PDF. Предыдущие аудиты, wiki summaries и evidence markdown не использовались как доказательства. Локальные PDF в `aligned-wiki/raw` прочитаны без изменений. Недостающие первичные PDF загружены в `docs/research/evidence/pdf-audit-*.pdf`. Все страницы ниже — физические страницы PDF, начиная с 1, включая appendix. Номера printed pages могут отличаться.

Вердикт «подтверждено» означает совпадение с опубликованным утверждением/таблицей в конкретном PDF. Это не независимая репликация результата и не доказательство истинности всех авторских интерпретаций. Метрики из разных papers не объединены в общий leaderboard. Rows про применимость к Aligned маркируют инженерный вывод или ограничение постановки. Если source paper содержит внутреннюю неясность, она сохранена явно.

## Существенные уточнения в рабочем тексте

- Jeong: 24.95 против 17.22 сравнивает также разные источники знаний, HowTo100M против Wikipedia. V использует только кадры в generation, VT добавляет transcripts.
- EgoLife: Table 7 называет EgoGPT общей response model, а main comparison §5/Table 5 — GPT-4o. Caption-quality ablation теперь интерпретируется внутри Table 7.
- EGAgent: финальный VQA-agent генерирует ответ, отдельный claim verifier не описан.
- WorldMM: 100-query latency не даёт полного отдельного construction accounting. Более сильное утверждение о точном warm-cache протоколе PDF не устанавливает.
- MovieChat: 24 GB / >10K frames уточнено условиями visual-only, 224 × 224, без frame sampling.
- Ren: URL и числа закреплены за v1. Ego-R1: RAG-only 39.7 привязано к Appendix Table 4. EM²Mem: 30-second anchor прямо отделён от semantic event boundary.
- MERIT/EM²Mem reproduction принадлежит авторам соответствующих papers. CARVE pass rate дополнен судьёй, числом test queries и generation runs.

## Реестр оригинальных источников

SHA-256 фиксирует именно прочитанные байты. Для доступных arXiv manuscripts версия определена по штампу PDF. Conference labels без footer не считаются независимо подтверждёнными этой процедурой.

| ID | Работа | PDF | Версия | Страниц | SHA-256 |
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

Источник всех строк этого блока: `docs/research/evidence/pdf-audit-llovi-v1.pdf`, arXiv:2312.17235v1, 28.12.2023.

| ID | Страница / таблица / раздел | Утверждение обзора | Что находится в оригинале и условия | Вердикт / действие |
|---|---|---|---|---|
| R01.01 | p. 2, Figure 2, pp. 3–4, §3 | Короткие captions → временно упорядоченный текст → LLM reasoning. | Предобученный frame/clip captioner обрабатывает короткие фрагменты, затем LLM получает последовательность описаний. Captioner и LLM модульны. | Подтверждено. |
| R01.02 | p. 4, §3.2, p. 15, Table 12 | Промежуточная суммаризация перед ответом. | Multi-round prompt сначала генерирует summary с учётом вопроса, затем отвечает по ней. Это prompt-стадия, а не обученный temporal memory module. | Подтверждено. |
| R01.03 | p. 1, Abstract, p. 2, main findings | 50.3% на полном EgoSchema и +18.1 п.п. к прежнему лучшему методу. | Авторы прямо называют full test set, zero-shot и absolute gain. 50.3 − 18.1 = 32.2. Не следует смешивать с 500-question subset и 51.8 в Table 1. | Подтверждено для v1 2023, не современный leaderboard. |
| R01.04 | p. 14, Appendix B.1 | Для такой схемы не нужна новая end-to-end long-video модель. | Сама интеграция training-free, но для EgoSchema авторы переобучают LaViLa без пересекающихся EgoSchema videos. Утверждение не означает отсутствия обучения во всей истории компонентов. | Подтверждено в узкой формулировке обзора. Ограничение записано здесь. |

## R02. VideoTree

Источник всех строк этого блока: `docs/research/evidence/pdf-audit-videotree.pdf`, CVPR 2025 proceedings.

| ID | Страница / таблица / раздел | Утверждение обзора | Что находится в оригинале и условия | Вердикт / действие |
|---|---|---|---|---|
| R02.01 | pp. 2–4, §3, Figures 1–2 | Кластеризация признаков, captions представителей, оценка релевантности, углубление. | Adaptive breadth expansion повторяет visual clustering / cluster captioning / relevance scoring. Relevance-guided depth expansion детализирует релевантные ветви. Перед ответом выбранные captions упорядочиваются по времени. | Подтверждено. |
| R02.02 | pp. 3–4, §3.1–3.2 | Дерево зависит от вопроса. | Начальная конструкция явно получает video and query, relevance scoring обусловлен question. Это query-adaptive representation. | Подтверждено. |
| R02.03 | pp. 3–5, §3–4 | Это long-video QA, а не подтверждённый многокамерный постоянно обновляемый архив. | Входом метода служит заданное видео и вопрос. QA-эксперименты не дают измерений corpus retrieval по площадкам, камерам и неделям. | Корректное ограничение области результата, не отдельный отрицательный эксперимент. |

## R03. MovieChat

Источник всех строк этого блока: `docs/research/evidence/pdf-audit-moviechat.pdf`, CVPR 2024 proceedings.

| ID | Страница / таблица / раздел | Утверждение обзора | Что находится в оригинале и условия | Вердикт / действие |
|---|---|---|---|---|
| R03.01 | pp. 3–4, Figure 2, §3.2–3.5, Algorithm 1 | Сжатие visual tokens в short-term и long-term memory. | Frame-wise visual encoder, FIFO short-term buffer, консолидация похожих соседних представлений в long-term memory, projection к LLM. Global mode читает long-term, breakpoint добавляет short-term и текущий кадр. | Подтверждено. |
| R03.02 | p. 1, Figure 1 caption | Более 10 тысяч кадров на 24 GB GPU. | Figure 1 прямо задаёт visual-only inference, 224 × 224, without frame sampling и >10K frames on 24GB. Это ресурсный тест обработки, не сохранность каждой детали. | Подтверждено с условиями. Условия 224 × 224 и visual-only добавлены в обзор. |
| R03.03 | pp. 3–4, §3 | Применимость как локального читателя, не доказательство поиска по 36 тысячам камера-часов. | Архитектура принимает одно видео, объединяет токены и отвечает. Эксперимента указанного строительного масштаба нет. | Инженерная интерпретация отдельно от опубликованного результата. |

## R04. VideoAgent Wang

Источник всех строк этого блока: `docs/research/evidence/videoagent-wang.pdf`, ECCV 2024 proceedings, paper 10325.

| ID | Страница / таблица / раздел | Утверждение обзора | Что находится в оригинале и условия | Вердикт / действие |
|---|---|---|---|---|
| R04.01 | pp. 4–7, §3, Figures 1–2 | LLM итеративно выбирает полезные кадры через инструменты. | LLM читает captions первоначальных кадров, оценивает достаточность, формирует descriptions для CLIP retrieval, получает новые visual observations и повторяет цикл. | Подтверждено. Это отдельная работа от Fan. |
| R04.02 | p. 8, Tables 1–2, §4.2 | 54.1% full EgoSchema и 60.2% subset из 500. | В таблицах разделены Subset/Fullset. Текст main results непосредственно повторяет 54.1 / 60.2 и размер subset. | Подтверждено. |
| R04.03 | p. 8, Table 1, pp. 10–11, efficiency/ablations | 8.4 кадра в среднем. | Avg. frames = 8.4 относится к selected frames для visual understanding. Метод использует CLIP retrieval на видео, поэтому цифра не является числом всех декодированных или embedded кадров. | Подтверждено с существующей оговоркой. |
| R04.04 | p. 11, Tables 4–5 | 8.4 нельзя приписывать полной стоимости pipeline. | Таблицы изучают число observation frames, initial frames и iterations. Они не измеряют полную indexing/decoding цену на камеру-час. | Граница интерпретации подтверждена постановкой метрики. |

## R05. VideoAgent Fan

Источник всех строк этого блока: `aligned-wiki/raw/2024-fan-videoagent.pdf`, ECCV 2024 manuscript, metadata creation 17.07.2024.

| ID | Страница / таблица / раздел | Утверждение обзора | Что находится в оригинале и условия | Вердикт / действие |
|---|---|---|---|---|
| R05.01 | p. 4, §2.2, p. 7, Algorithm 1 | Двухсекундные сегменты, LaViLa, ViCLIP, text encoder. | LaViLa получает 4 кадра 2-second segment. ViCLIP получает 10 uniformly sampled frames. Captions кодируются text-embedding-3-large, продолжение на p. 5. | Подтверждено. |
| R05.02 | pp. 5–6, §2.3 | Объекты детектируются, трекаются, повторные появления объединяются по visual similarity. | RT-DETR + ByteTrack создают tracking IDs. Re-ID использует комбинацию CLIP и DINOv2 similarity. Это оценочная ассоциация по признакам, не гарантированная физическая идентичность. | Подтверждено. |
| R05.03 | p. 6, §2.3 | Object memory хранит ID, появления в SQL и визуальные признаки. | Feature table содержит CLIP feature / object ID. SQL fields: object ID, category, indices of video segments. Время кодируется через индексы сегментов, не отдельной непрерывной trajectory. | Подтверждено. Обзор допустимо описывает интервалы появления обобщённо. |
| R05.04 | pp. 6–8, §2.4, Algorithms 1–2 | Четыре инструмента и итеративный GPT-4. | Caption retrieval, segment localization, short-clip visual QA через Video-LLaVA, object-memory SQL querying. История пополняется после каждого вызова до остановки/лимита. | Подтверждено. |
| R05.05 | p. 9, Table 1 | 60.2% на полном EgoSchema. | Table 1 отдельно указывает full test и subset results, full VideoAgent = 60.2. | Подтверждено. Не путать с 60.2 Wang на subset. |
| R05.06 | pp. 12–13, Table 5 и §3.5 | Основное NExT-QA сравнение 600 вопросов, абляции 150. | Авторы отбирают 600 total для evaluation cost, затем по 50 каждого типа для 150-question ablation subset. | Подтверждено. |
| R05.07 | p. 13, Table 6 | Object memory ablation 71.3 → 62.7. | All tools = 71.3, без object memory querying = 62.7. Это 150-question NExT-QA subset, не full EgoSchema. | Подтверждено. |
| R05.08 | p. 10, Table 2, §3.2 | Ground-truth narrations улучшают segment localization относительно captions. | Таблица разделяет LaViLa / Ego4D narration features и их ViCLIP ensembles. Улучшение относится к NLQ localization, а не абляции всей object memory. | Подтверждено с локальной областью вывода. |
| R05.09 | p. 4, Figure 2 | Имеющийся crop действительно показывает temporal/object memory и четыре tools. | Оригинальная Figure 2 визуально сопоставлена с PNG. Левая часть — construction, правая — iterative tool-use. | Подтверждено визуально, подпись в обзоре расширена. |

## R06. AMEGO

Источник всех строк этого блока: `aligned-wiki/raw/2024-goletto-amego.pdf`, arXiv:2409.10917v1, 17.09.2024.

| ID | Страница / таблица / раздел | Утверждение обзора | Что находится в оригинале и условия | Вердикт / действие |
|---|---|---|---|---|
| R06.01 | pp. 5–6, §3.1, Figure 2 | Контакт руки с объектом запускает tracklet, tracker поддерживает его, DINOv2 объединяет и связывает. | Инициализация требует нескольких spatially overlapping HOI detections во временном окне. SOT продолжает track. Усреднённые DINOv2 features используются для online clustering и instance assignment. | Подтверждено после уточнения: запуск не по одному кадру контакта. |
| R06.02 | p. 7, §3.2 | Location memory группирует работу на месте. | Малый optical flow и наличие руки служат proxy активности в зоне. Сегменты сопоставляются по усреднённым visual features. Метод не выдаёт метрические координаты комнаты. | Подтверждено. |
| R06.03 | pp. 7–10, §3.3–4, pp. 23–24, Appendix §9 | Visual queries, последовательность, concurrency, temporal grounding. | Object/location crop сопоставляется с memory ID. Ответы строятся по order, overlaps, first/last locations и temporal IoU с вариантами. Это semantic-free визуальные MCQ, не свободный LLM-диалог. | Подтверждено. |
| R06.04 | pp. 8, 10, §4 | 20.5K вопросов по 100 видео EPIC-KITCHENS. | Benchmark construction прямо указывает 100 videos, 20.5K queries и пять вариантов на вопрос. | Подтверждено. |
| R06.05 | p. 13, Table 3 | AMEGO-L 36.3, сильнейший baseline 23.6, random 20.0. | Столбец Total: AMEGO-L 36.3, S-QA(BLIP-2) 23.6, Random 20.0. Разница 12.7 п.п. | Подтверждено. |
| R06.06 | Appendix §8.1, pp. 19, 21 | Benchmark облегчает часть неоднозначности экземпляров одного класса. | При построении object ground truth связываются парные действия, затем фильтруются случаи повторного появления разных экземпляров одного типа внутри одного видео. Это ограничение не позволяет выводить надёжную re-ID одинаковых инструментов. | Подтверждено как ограничение benchmark, не утверждение о полном исключении всех одинаковых объектов. |

## R07. Video-RAG Luo

Источник всех строк этого блока: `docs/research/evidence/video-rag-luo.pdf`, arXiv:2411.13093v4, 23.11.2025, NeurIPS 2025 footer.

| ID | Страница / таблица / раздел | Утверждение обзора | Что находится в оригинале и условия | Вердикт / действие |
|---|---|---|---|---|
| R07.01 | pp. 3–6, §3, Figure 2 | Training-free LVLM extension с ASR/OCR/object auxiliary text. | Запрос помогает получить retrieval queries, внешние инструменты извлекают и фильтруют text из аудио, надписей и объектов. LVLM получает selected frames плюс auxiliary text. | Подтверждено. Это не Ren/Jeong video-corpus system. |
| R07.02 | p. 7, Table 1 | LongVA-7B 128 frames: 52.6 без subtitles, 56.0 с subtitles, 62.0 с Video-RAG. | Overall columns w/o S / w/ S / Ours = 52.6 / 56.0 / 62.0. Gain column = +6.0 против w/ S. | Подтверждено для v4 camera-ready. |
| R07.03 | p. 7, Table 1 | LLaVA-Video-72B 77.4 против 75.9 с subtitles. | 64 frames, Overall w/ S = 75.9, Ours = 77.4, Gain +1.5. 70.3 — вариант без subtitles. | Подтверждено. |
| R07.04 | p. 7, Table 1 caption | Нельзя считать +9.4 над subtitle baseline. | 62.0 − 52.6 = 9.4 относительно no-subtitle, 62.0 − 56.0 = 6.0 относительно subtitle. Эти две базы имеют разный доступ к аудиотексту. | Подтверждено арифметически и заголовками таблицы. |

## R08. VideoRAG Jeong

Источник всех строк этого блока: `docs/research/evidence/videorag-jeong.pdf`, Findings ACL 2025, pp. 21278–21298.

| ID | Страница / таблица / раздел | Утверждение обзора | Что находится в оригинале и условия | Вердикт / действие |
|---|---|---|---|---|
| R08.01 | pp. 3–4, §2, Figure 2 | Поиск по видеокорпусу с visual/text representations и выбор информативных кадров. | Video retrieval комбинирует visual/text features, generation использует retrieved videos. Adaptive frame selection вводится для retrieval/generation. | Подтверждено. |
| R08.02 | p. 5, §3.1 | Генератор всегда получает кадры и subtitles. | VIDEORAG-V использует только frames как generation context. VIDEORAG-VT использует frames + transcripts. Subtitles/ASR могут участвовать в retrieval независимо от generation variant. | Уточнено в обзоре, V и VT разведены. |
| R08.03 | p. 6, Table 1 | LLaVA-Video-7B, WikiHowQA/HowTo100M: VideoRAG-V ROUGE-L 24.95, BM25 17.22. | Оба числа находятся в соответствующем model block / dataset column. VideoRAG-VT = 24.93, не 24.95. | Числа подтверждены. |
| R08.04 | p. 5, §3.1, baseline definitions | Это чистое преимущество видеомодальности при одинаковом корпусе. | Нет. TEXTRAG BM25 retrieves Wikipedia documents, VideoRAG retrieves HowTo100M videos. Меняются modality и knowledge source. | Существенная оговорка добавлена в обзор. |
| R08.05 | p. 5, Evaluation Metrics | ROUGE-L — совпадение ответа с эталонным инструктивным текстом. | Longest common subsequence generated answer vs ground truth. Метрика не содержит timestamp correctness или проверку строительного дефекта. | Подтверждено. |

## R09. VideoRAG Ren

Источник всех строк этого блока: `docs/research/evidence/videorag-ren.pdf`, arXiv:2502.01549v1, 03.02.2025.

| ID | Страница / таблица / раздел | Утверждение обзора | Что находится в оригинале и условия | Вердикт / действие |
|---|---|---|---|---|
| R09.01 | pp. 3–6, Figure 1, §3.1–3.2 | Два канала: текстовый межвидеограф и визуальный поиск сегментов. | VLM captions и ASR дают text chunks / entities / relations, графы объединяются. Отдельный multimodal encoder индексирует clips. Query reformulation и visual-content query направляют поиск. | Подтверждено. |
| R09.02 | pp. 5–6, §3.2, p. 8 implementation | После первичного retrieval материал уточняется перед ответом. | LLM-based candidate filtering и query-specific second-round video captioning передают более детальные сведения генератору. 30-second clips, 5 initial frames и 15 recaptioning frames описаны в implementation. | Подтверждено. |
| R09.03 | p. 7, Table 1 | LongerVideos: 164 видео, 22 коллекции, 602 вопроса, около 134.6 h. | All row = 22 / 164 / 602 / 27.4 mean queries / ~134.6 h. Lecture, documentary и entertainment отдельно перечислены. | Подтверждено для v1. Ссылка закреплена на v1. |
| R09.04 | p. 8, Table 2 | Overall Winner 53.26% против NaiveRAG, 57.14% против LightRAG. | All column, Overall Winner row у двух соответствующих пар. Это не Comprehensiveness и не среднее по трём жанрам без весов. | Подтверждено. |
| R09.05 | pp. 7–8, evaluation protocol | Это win rate предпочтений ответов, не correctness/recall. | GPT-4o-mini ранжирует ответы, порядок меняется для борьбы с position bias, evaluation повторяется пять раз. Вопросы LongerVideos генерируются NotebookLM из transcripts. | Подтверждено. Судья добавлен в основной текст. |
| R09.06 | p. 3, Figure 1 | Новая исходная архитектурная схема. | Визуально проверены (a) video collection, (b) multimodal indexing/merged graph, (c) hybrid retrieval, filtering, recaptioning and generation. | Crop добавлен и осмотрен. Эта v1 схема не приписывается KDD 2026 final. |

## R10. EgoLife

Источник всех строк этого блока: `aligned-wiki/raw/2025-yang-egolife.pdf`, arXiv:2503.03803v3, 09.02.2026.

| ID | Страница / таблица / раздел | Утверждение обзора | Что находится в оригинале и условия | Вердикт / действие |
|---|---|---|---|---|
| R10.01 | pp. 1, 3–4, §3.1, Tables 1–2 | Шесть участников, семь дней, около 300 h, retained 266 h. | Dataset overview описывает общую неделю в EgoHouse. Tables 1–2 содержат retained 266 h, шесть длинных streams. Примерно 300 h относится к собранному материалу, не к retained evaluation corpus. | Подтверждено. |
| R10.02 | pp. 3, 6–7, Table 2, Figure 6, §5 | 3,000 QA в наборе, но основная оценка 500 Jake QA. | Figure 6: 500 per participant, 3K total. Implementation Details p. 7 прямо говорит quick evaluation on Jake’s 500 QA in this version. | Подтверждено. Denominator нельзя расширять до 3,000. |
| R10.03 | p. 6, §4.1–4.2 | EgoGPT делает audiovisual captions каждые 30 s, память имеет timestamps и summaries. | EgoGPT читает video/audio, memory bank содержит clip information и hourly/daily summaries. Figure 7 показывает conceptual hierarchical pipeline. | Подтверждено. |
| R10.04 | p. 7, §5 | Основной эксперимент: top-3 clips через text similarity, final GPT-4o. | Implementation paragraph говорит text-based similarity, top 3 30-second clips, universal final GPT-4o, re-querying GPT-4o-mini. Формула §4.2 и комментарий λ=0 описаны не вполне согласованно, поэтому обзор следует явному prose §5, не выводит детали из λ. | Подтверждено с отмеченной внутренней неясностью источника. |
| R10.05 | p. 7, Table 5 | Персонализация на Day 1: 36.0 против 33.1, Gemini-captioner 36.9. | Average column: EgoIT-99K+D1 36.0, EgoIT-99K 33.1, Gemini-1.5-Pro 36.9. Captioner swaps в EgoButler описаны в §5. | Подтверждено. |
| R10.06 | p. 8, Table 7 | Human audiovisual captions дают 45.5 и доказывают caption bottleneck. | Visual-Audio Caption = 45.5, personalized EgoGPT captions = 36.0. Caption Table 7 задаёт EgoGPT(EgoIT-99K+D1) как общую response model, в отличие от GPT-4o в §5/Table 5. | Числа подтверждены. Межтабличное впечатление fixed answer model исправлено. |
| R10.07 | p. 7, Figure 7 | Новая схема EgoButler/EgoGPT/EgoRAG. | Панель a — captioning, b — память, keyword extraction, retrieval evidence, ответ. Рисунок визуально проверен. Conceptual hierarchy не выдаётся за точную реализацию main evaluation. | Crop добавлен и осмотрен. |
| R10.08 | pp. 3–5, §3, pp. 6–8, §4–5 | Дом, китайская речь, координированная активность не доказывают перенос на 100 строительных камер. | Это single-household collection с шестью participants и постановкой общего мероприятия. Оценка Jake не является cross-camera deployment test. | Корректная граница внешней валидности, число 100 относится к Aligned-сценарию. |

## R11. Ego-R1

Источник всех строк этого блока: `aligned-wiki/raw/2026-tian-ego-r1.pdf`, arXiv:2506.13654v1, 16.06.2025.

| ID | Страница / таблица / раздел | Утверждение обзора | Что находится в оригинале и условия | Вердикт / действие |
|---|---|---|---|---|
| R11.01 | pp. 1, 4–6, Figure 1, §3–4 | Chain-of-Tool-Thought с H-RAG, Video-LLM, кадровым VLM. | Три основных tool interfaces принимают keyword/time windows либо timestamp и question. CoTT чередует thought, tool и returned observation. | Подтверждено. |
| R11.02 | pp. 6–9, §4.2–6.3 | Qwen2.5-3B controller, 25K traces, SFT затем GRPO. | 25K generated CoTT traces для SFT, 4.4K QA corpus для RL, Qwen-2.5-3B-Instruct base. Training описано отдельно от внешних perceptual tools. | Подтверждено. 3B не размер всей системы. |
| R11.03 | p. 8, §6.1 | Ego-R1 Bench содержит 300 QA. | 300 вопросов равномерно по шести perspectives, human-labeled и human-verified generated QA. Это отдельный benchmark от EgoLifeQA. | Подтверждено. |
| R11.04 | p. 9, Table 3 | 34.3 SFT → 46.0 SFT+RL. | Один base controller, строки SFT only и SFT+RL, task accuracy. Format accuracy обеих обученных строк 100.0, не смешана с task accuracy. | Подтверждено. |
| R11.05 | p. 19, Table 4, Appendix C.1 | RAG-only 39.7 против full 46.0. | Правая часть Table 4. Левая показывает дополнительную зависимость от video tool: LLaVA-Video 43.7, Gemini-1.5-Pro 46.0. | Подтверждено. Добавлена точная ссылка на appendix table. |
| R11.06 | pp. 8, 17–18, §6.1, Appendix B | Контроллер не включает весь размер/стоимость системы. | Дополнительная summary model упомянута в §6.1. Gemini video tool, VLM и memory construction описаны отдельно. | Подтверждено. |
| R11.07 | pp. 5–6, Figure 2, p. 8 Table 2 caption, p. 9 results | Связанный с EgoLife training/evaluation и удаление overlap без denominator. | Data generation основан на EgoLife views A1–A6. Table 2 explicitly excludes QA used for training, но оставшийся clean EgoLifeQA count не указан рядом с результатом 36.0. В тексте есть несогласованный объём 500+ h training data, поэтому точную идентичность всех исходных файлов здесь не утверждаем. | Ограничение подтверждено. Перенос на независимые households/стройки не установлен. |
| R11.08 | p. 1, Figure 1 | Новая схема tool use. | Верх — три tools, низ — шаги retrieval и visual inspection. Original figure crop осмотрен. | Подтверждено визуально. TPAMI 2026 статус не удостоверяется v1 PDF. |

## R12. EGAgent

Источник всех строк этого блока: `aligned-wiki/raw/2026-rege-egagent.pdf`, arXiv:2601.18157v3, 03.07.2026.

| ID | Страница / таблица / раздел | Утверждение обзора | Что находится в оригинале и условия | Вердикт / действие |
|---|---|---|---|---|
| R12.01 | pp. 4–7, Figure 2, §3.2–3.3 | Temporal entity scene graph в SQLite. | Nodes/edges содержат entities, relations и start/end time. SQL querying поддерживает time, keywords, source/target entities, relationship type. Это symbolic relational representation. | Подтверждено. Не 3D map. |
| R12.02 | pp. 4, 6–7, Figure 2, Algorithm 1 | Planner разбивает query, retriever читает frames/transcripts/graph, analyzer сжимает evidence. | Planning agent строит subtasks, три search tools извлекают данные, Analyzer оставляет relevant context в memory M. | Подтверждено. |
| R12.03 | p. 7, VQA Agent description | В конце ответ проверяется мультимодальной моделью. | VQA Agent conditions on Q and compact evidence M to generate final A. Отдельная claim/citation verification стадия не определена. | Исправлено: финальная модель генерирует ответ, не независимо проверяет его. |
| R12.04 | p. 8, Table 1 | Gemini 2.5 Pro 57.5, GPT-4.1 без графа 48.6 и с графом 50.7. | Average column соответствующих строк. 48.6→50.7 сравнивает F+T с EG+F+T при одном backbone. 57.5 — другая модель, не чистая graph ablation. | Подтверждено. |
| R12.05 | p. 10, Table 4 | GPT-4.1 LLM transcript search: 169 s, 571K tokens, 50.7. | Строка T Search LLM, Runtime sec / Tokens. Это question-time pipeline. | Подтверждено. |
| R12.06 | p. 10, Table 4 | BM25: 125 s, 172K tokens, 43.9. | Строка BM25, тот же EG+F+T architecture, меняется transcript search. Разница accuracy 6.8 п.п. | Подтверждено. |
| R12.07 | p. 7, §4.2, p. 10 Limitations | Ручная diarization в EgoLife. | Авторы используют manually diarized transcripts including speaker identities. Limitations ожидает ухудшение при automatic diarization errors. | Подтверждено. |
| R12.08 | p. 4, Figure 2 | Новая схема EGAgent. | Три панели визуально проверены: pipeline, cross-modal composition, SQL graph querying. | Crop добавлен и осмотрен. |

## R13. WorldMM

Источник всех строк этого блока: `aligned-wiki/raw/2026-yeo-worldmm.pdf`, arXiv:2512.02425v2, 27.03.2026.

| ID | Страница / таблица / раздел | Утверждение обзора | Что находится в оригинале и условия | Вердикт / действие |
|---|---|---|---|---|
| R13.01 | pp. 3–5, Figure 2, §3 | Episodic, semantic, visual memories с multiscale graphs и iterative selection. | Episodic graphs хранят фактические события на разных масштабах, semantic memory консолидирует устойчивые знания, visual memory хранит frame features/timestamps. Retrieval-agent выбирает memory/query, response-agent читает history. | Подтверждено. |
| R13.02 | p. 8, Table 4 и §4.7 | WorldMM-8B 56.4 → 52.0 при episodic embedding retrieval. | Embedding Retrieval row = 52.0, full WorldMM = 56.4. §4.7 явно задаёт WorldMM-8B, в отличие от GPT solver в других абляциях. | Подтверждено. |
| R13.03 | p. 8, §4.6 и Figure 6 | Latency измерена на 100 вопросах. | 100 randomly sampled queries from EgoLifeQA. Авторы называют latency end-to-end, но не приводят отдельный полный construction cost в этом анализе. | Подтверждено число. Категорическое утверждение о заранее подготовленных memories смягчено до границы измерения. |
| R13.04 | pp. 3–5, memory construction и inference разделены | Из Figure 6 нельзя получить стоимость нового архива. | Архитектура отделяет memory construction от inference, figure сравнивает query latency. Полный video-ingestion budget из него не выводится. | Корректный вывод с явной границей доступных данных. |
| R13.05 | p. 3, Figure 2 | Новая схема WorldMM. | Все три construction tracks, adaptive retrieval и response generation визуально проверены. | Crop добавлен и осмотрен. |

## R14. MERIT

Источник всех строк этого блока: `aligned-wiki/raw/2026-choi-merit.pdf`, arXiv:2608.07663v2, 16.09.2026.

| ID | Страница / таблица / раздел | Утверждение обзора | Что находится в оригинале и условия | Вердикт / действие |
|---|---|---|---|---|
| R14.01 | pp. 6–8, Figure 2, §3 | 30-second episode с event/object/summary/dialogue keys и temporal neighbor filtering. | Четыре key channels индексируются, query выбирает anchors, вокруг них читаются captions соседей. Dialogue key исключён для LVBench (§4.2), где speech не используется. | Подтверждено. |
| R14.02 | p. 19, Appendix A | Retrieval loop текстовый, frames только final QA. | Appendix explicitly says iterative retrieval relies solely on textual context, visual frames exclusively final QA. Query generation/evidence sufficiency и neighbor filtering используют тот же backbone. | Подтверждено. |
| R14.03 | pp. 8–10, Tables 1–2 | GPT-5: EgoLifeQA 71.2, LVBench 71.8, Video-MME Long 77.7. | Table 1 Avg 71.2, Table 2 71.8/77.7. §4.1 задаёт 500 EgoLifeQA и long Video-MME only. | Подтверждено, это reported results авторов, не наши запуски. |
| R14.04 | pp. 11–13, Table 5 | Hit rate 0.56 vs WorldMM 0.53. | Hit = annotated target timestamp falls within returned interval. Baseline с * воспроизведён авторами MERIT при общих captions/captioner, QA 63.2 у WorldMM reproduction не равно original 65.6. | Подтверждено, авторство reproduction явно добавлено. |
| R14.05 | p. 13, retrieval analysis | Неравный temporal budget: 30 s против до 1 h. | MERIT/EgoRAG retrieve fixed 30-second units. WorldMM windows include 1 h. При ограничении WorldMM до 30 s авторы получают 0.31 hit rate. Это не matched evidence-duration experiment. | Подтверждено. |
| R14.06 | pp. 12–13, Table 6 | Construction saving исключает dense captioning. | Captioning common initial step expressly excluded. Table 6 считает calls/input/output memory construction после общих captions. | Подтверждено. Нельзя переносить коэффициент на всю обработку камер. |
| R14.07 | p. 6, Figure 2 | Имеющаяся схема MERIT действительно из оригинала. | Stage 1 multi-key extraction и Stage 2 retrieval/neighbor filtering визуально сопоставлены с PNG. | Подтверждено визуально. |

## R15. EM²Mem

Источник всех строк этого блока: `aligned-wiki/raw/2026-chen-em2mem.pdf`, arXiv:2609.00551v1, 01.09.2026.

| ID | Страница / таблица / раздел | Утверждение обзора | Что находится в оригинале и условия | Вердикт / действие |
|---|---|---|---|---|
| R15.01 | pp. 3–4, Figure 2, §3.2–3.4 | Event anchor связывает captions, transcripts, frames, fields, context и provenance. | µ_i=(e_i,R_i,C_i), e_i temporal address. Episodic/semantic graph links и provenance поддерживают возврат к событию. | Подтверждено. |
| R15.02 | p. 15, Appendix B, p. 19 Appendix C.7 | 30 s anchor, context 3 min/10 min/1 h. | Implementation explicitly uses these context scales. C.7 поясняет fixed anchor is temporal indexing address, not learned semantic boundary. | Подтверждено. Временная, не семантическая природа границы добавлена в обзор. |
| R15.03 | pp. 4, 15–16, §3.4 и Appendix B | Semantic retrieval → graph expansion → ranked candidates → compact selector. | Coarse candidate search, one-hop graph expansion, event scoring, GPT-5 selector выбирает 5 anchors с максимум 3 keyframes на каждый для answer model. | Подтверждено. |
| R15.04 | p. 5, Table 1 | EgoLifeQA 66.0 против reproduced WorldMM 64.0. | WorldMM†=64.0 при same evaluation setting, original WorldMM=65.6. Не следует выдавать 2.0 п.п. как разницу к original row. | Подтверждено. Reproduction выполнен авторами EM²Mem. |
| R15.05 | pp. 17–18, Appendix C.4, Table 12 | При budget 300 s coverage gain +5.4, 95% CI [+2.6,+8.3]. | Контроль: 4-channel RRF vs Aligned-30s, все 500 вопросов, те же 6,057 records, models/prompts/budgets. C@300 31.2→36.7, gain +5.4 в таблице из неокруглённых значений, точность вывода +5.4 сохраняется. | Подтверждено. Округлённые 36.7−31.2=5.5 не повод заменять опубликованный gain. |
| R15.06 | p. 18, Table 12 и prose | QA 60.0→63.0, 95% CI [−0.8,+6.8]. | Авторы прямо называют difference not statistically significant, p=0.1505. Coverage p=0.0003, это отдельная метрика. | Подтверждено. Не заявляется доказанный QA gain в этом контроле. |
| R15.07 | p. 5, Table 2 | 459.00→98.21 s, 4.67× per-query latency. | Avg latency/query строки совпадают, ratio округлён до 4.67. | Подтверждено. |
| R15.08 | p. 5, Table 2 и efficiency prose | 37.39× throughput включает 8 workers и разные evaluation pipelines. | Wall-clock 229,502→6,138 s. EM²Mem использует 8 independent-query workers, WorldMM ограничен incremental HippoRAG graph construction during inference. | Подтверждено. Не эквивалент 37.4× individual latency. |
| R15.09 | p. 16, Tables 9–10 | Build tokens 89.23M vs 60.55M, total for 500 queries 104.50M vs 102.58M. | Table 9 даёт upfront tokens, Table 10 добавляет inference 15.27M / 42.03M. Общий EM²Mem больше на 1.92M. | Подтверждено. Число queries и token vs money distinction сохраняются. |
| R15.10 | p. 3, Figure 2 | Новая оригинальная схема. | Панели schema, graph construction, retrieval визуально проверены, labels сохранились несмотря на нестандартный PDF text encoding. | Crop добавлен и осмотрен. |

## R16. CFD

Источник всех строк этого блока: `aligned-wiki/raw/2026-cai-cfd.pdf`, arXiv:2609.11899v1, 10.09.2026.

| ID | Страница / таблица / раздел | Утверждение обзора | Что находится в оригинале и условия | Вердикт / действие |
|---|---|---|---|---|
| R16.01 | pp. 3–6, §2, Figure 2 | Offline event storyline и clip captions, story-first answering, visual-need router. | Event memory зависит от TransNetV2 boundaries, clip memory генерируется independently uniformly. Недостаточность текста вызывает localization / clip enrichment, router решает, получать ли pixels. | Подтверждено. |
| R16.02 | pp. 5–6, §2.3, Algorithm 1 | Ограниченная FIFO visual working memory. | Извлечённые кадры обновляют fixed-capacity FIFO memory, не постоянный полный архив всех visual details. | Подтверждено. |
| R16.03 | p. 9, Table 9 | Always frames 6.63→5.76 frames/query, 67.2→67.5 accuracy. | Average cells (accuracy / online frames): Always 67.2/6.63, Router 67.5/5.76. (6.63−5.76)/6.63 ≈13.12%. | Подтверждено. 13.1% — controlled router increment, не общее сокращение baseline frames. |
| R16.04 | pp. 9, 19–20, Appendix E | Online frames не включают offline captioning. | Таблицы отделяют offline cost от online serving и retrieved visual frames. Router сам добавляет LLM call, frame saving не гарантирует latency saving. | Подтверждено. |
| R16.05 | p. 20, Appendix E | 229.3 s/video offline и 68.2 s/query online, 8 workers, 2 H200. | Текст отличает end-to-end от model-serving. Один H200 для 8B captioner, один для 32B reasoner, fixed eight-worker setup. | Подтверждено. |
| R16.06 | p. 10, Limitations | Shot boundaries плохо подходят continuous egocentric video. | TransNetV2 рассчитан на edited video, hard cuts rare in wearable streams. Авторы предлагают заменить segmentation и подчёркивают это как future work. | Подтверждено. |
| R16.07 | p. 10, Limitations | Edge/cloud схема не доказывает physical wearable deployment. | Separation simulated, captioner targets server-class GPU/desktop, не phone/glasses. Network/energy effects требуют будущего изучения. | Подтверждено. Добавлено в подпись схемы. |
| R16.08 | p. 5, Figure 2 | Новая оригинальная схема CFD. | Event/clip memories и story-first/localization/router/final multimodal loop визуально осмотрены. | Crop добавлен и осмотрен. |

## R17. CARVE

Источник всех строк этого блока: `docs/research/evidence/carve.pdf`, arXiv:2606.13141v2, 02.10.2026.

| ID | Страница / таблица / раздел | Утверждение обзора | Что находится в оригинале и условия | Вердикт / действие |
|---|---|---|---|---|
| R17.01 | pp. 4–5, §4 | V-RAGBench: query→one unique evidence chunk→open answer, within-source-video retrieval. | Source video задан. Segmentation/deduplication подавляет повторные события. Post-hoc filters удаляют shortcuts и проверяют evidence uniqueness через competing chunks. | Подтверждено как design/filtering intent, не абсолютная гарантия каждого QA. |
| R17.02 | p. 5, §4 | 2,100 total, 1,800 train, 300 test. | Три категории subsampled to 700 each. Финальные split counts явно указаны. | Подтверждено. |
| R17.03 | pp. 5–7, §5, Algorithm 1 | Четыре modality/granularity representations и tagged candidates. | Parallel retrieval по text/visual × frame/clip, reranking сохраняет winning configuration на chunk, generator получает выбранное представление каждого chunk. | Подтверждено. |
| R17.04 | p. 8, Table 2 | Recall@5 0.603 vs strongest baseline 0.510, nDCG@5 0.433. | CARVE row, VideoRAG-A R@5=0.510. Сильнейший nDCG baseline — GQR 0.340, это другой baseline. | Подтверждено, в обзоре сравнение 0.510 правильно привязано только к Recall. |
| R17.05 | pp. 7–8, §6, Table 2 | Qwen3-VL-8B pass rate 0.352. | Открытые ответы judged by Qwen3.6-35B-A3B. Table 2 усредняет generation по трём runs. Retrieval deterministic, не усреднённая QA accuracy. | Подтверждено. Судья, 300 test и три runs добавлены. |
| R17.06 | p. 8, Table 3 | Лучший single visual/clip R@5 0.507, full four 0.603. | Таблица modality/granularity ablation. Для pass rate лучший single — visual/frame 0.323, поэтому «лучший» относится именно к retrieval Recall. | Подтверждено с указанной метрикой. |
| R17.07 | p. 5, Event Extraction and Deduplication | Реальные повторяющиеся события специально исключаются. | Авторы прямо объясняют, что естественные recurring-event queries исключены ради уникального evidence. Это важное ограничение переноса на повторные монтажи. | Подтверждено. |
| R17.08 | p. 10, Reproducibility statement | Публичный код пока не подтверждён. | PDF обещает benchmark/source/eval scripts upon acceptance. Обещание не подтверждает фактическую release на дату аудита. | Формулировка обзора привязана непосредственно к PDF, live GitHub не проверялся. |
| R17.09 | p. 1, arXiv stamp | Версия v2 от 2 октября 2026. | В PDF стоит arXiv:2606.13141v2, 2 Oct 2026. | Подтверждено. |

## R18. LongVideoBench

Источник всех строк этого блока: `docs/research/evidence/pdf-audit-longvideobench.pdf`, arXiv:2407.15754v1, 22.07.2024.

| ID | Страница / таблица / раздел | Утверждение обзора | Что находится в оригинале и условия | Вердикт / действие |
|---|---|---|---|---|
| R18.01 | pp. 1–4, §1–3, Tables 1–2 | 6,678 MCQ, 17 categories, referring reasoning. | Abstract и Table 2 подтверждают counts. Задача сначала локализует referred context, затем рассуждает о связанных деталях/событиях. | Подтверждено. |
| R18.02 | p. 2, dataset setup | Одно исходное видео дано, это не corpus retrieval по неделям. | 3,763 videos, вопрос относится к одному видео с interleaved subtitles. Duration groups включают также 8–15 s и 15–60 s, не все videos являются hour-long. | Подтверждено с дополнительной оговоркой: benchmark имеет смешанные длительности. |
| R18.03 | p. 1, arXiv stamp | Проверенный PDF — v1 22 июля 2024. | Независимый PDF проверяет dataset/task claims. Статус NeurIPS из этой v1 без proceedings footer не удостоверяется. | Версия зафиксирована, venue metadata вне числовой верификации. |

## R19. Video-MME

Источник всех строк этого блока: `docs/research/evidence/pdf-audit-videomme.pdf`, CVPR 2025 proceedings.

| ID | Страница / таблица / раздел | Утверждение обзора | Что находится в оригинале и условия | Вердикт / действие |
|---|---|---|---|---|
| R19.01 | pp. 2–4, Table 1, §3 | 900 videos, 2,700 questions, около 254 h. | 900 total, три QA/video. Table 1 average 1017.9 s ×900 /3600 =254.475 h. Поэтому «около 254» корректно как округление, не точное целое. | Подтверждено числами original table и арифметикой. |
| R19.02 | p. 4, §3, p. 5 evaluation | Short/medium/long и с subtitles/без. | 300 videos каждого duration split. Short <2 min, medium 4–15, long 30–60. 744 видео имеют исходные subtitles, все 900 audio. Evaluation сравнивает доступ к subtitles. | Подтверждено. Subtitles условие не означает, что все 900 имеют исходный файл subtitles. |
| R19.03 | pp. 3–5, QA annotation/evaluation | MCQ accuracy не измеряет issue-level evidence verification. | Каждый вопрос имеет четыре варианта, scoring выбора ответа. В протоколе нет строительных issue/correction tracks и citation validation. | Корректное ограничение области benchmark. |

## R20. EgoSchema

Источник всех строк этого блока: `docs/research/evidence/pdf-audit-egoschema.pdf`, arXiv:2308.09126v1, 17.08.2023.

| ID | Страница / таблица / раздел | Утверждение обзора | Что находится в оригинале и условия | Вердикт / действие |
|---|---|---|---|---|
| R20.01 | pp. 1–2, Abstract, p. 5 §3.1.1 | Примерно трёхминутные egocentric clips с MCQ. | Each question chooses among five options based on three-minute clip. Видео извлечены из Ego4D, clip selection и captions заданы до evaluation. | Подтверждено. |
| R20.02 | pp. 1–2, task definition | Нужный ролик дан заранее, нет archive retrieval/citation requirement. | Вход — question + clip, output — правильный option. Temporal certificate оценивает длительность необходимого понимания, а не то, способен ли метод выбрать запись среди камер. | Подтверждено границей постановки. |

## Рисунки и визуальная проверка

Новые PNG — прямые crops оригинальных PDF без перерисовки, перевода меток и добавления результатов. Рендер выполнен PyMuPDF с масштабом 4 px/pt. Каждый финальный PNG открыт и осмотрен отдельно. Нет обрезанных панелей, отсутствующих стрелок или нечитаемых исходных labels при открытии в полном размере. Проверены также два ранее существовавших crop. Все схемы имеют русское объяснение панелей в рабочем разделе.

| PNG в `docs/research/assets/` | Original PDF | Page / figure | Crop rectangle в pt, x0 y0 x1 y1 | Проверка |
|---|---|---|---|---|
| `pdf-audit-videorag-ren-figure1.png` | R09 | p. 3, Figure 1 | 105, 73, 506, 211 | Осмотрен, три панели целиком |
| `pdf-audit-egolife-egobutler-figure7.png` | R10 | p. 7, Figure 7 | 56, 17, 556, 284 | Осмотрен, captioning и QA stages |
| `pdf-audit-ego-r1-figure1.png` | R11 | p. 1, Figure 1 | 105, 239, 507, 462 | Осмотрен, toolkit и trace |
| `pdf-audit-egagent-figure2.png` | R12 | p. 4, Figure 2 | 70, 65, 539, 295 | Осмотрен, панели ①②③ |
| `pdf-audit-worldmm-figure2.png` | R13 | p. 3, Figure 2 | 56, 67, 556, 215 | Осмотрен, три memories и inference |
| `pdf-audit-em2mem-figure2.png` | R15 | p. 3, Figure 2 | 68, 68, 528, 302 | Осмотрен, schema / graph / retrieval |
| `pdf-audit-cfd-figure2.png` | R16 | p. 5, Figure 2 | 132, 68, 472, 258 | Осмотрен, включая feedback arrows |
| `2024-fan-videoagent-figure2.png` | R05 | p. 4, Figure 2 | Предыдущий crop, сохранён | Осмотрен и сопоставлен с оригиналом |
| `2026-choi-merit-figure2.png` | R14 | p. 6, Figure 2 | Предыдущий crop, сохранён | Осмотрен и сопоставлен с оригиналом |

## Границы и оставшиеся вопросы

1. Утверждения о содержимом GitHub (`_op.py`, `create_db_entity_graph.py`, `langgraph_agent.py`, `build_multimodal_event_record.py`, README, названия app directories) относятся к прежнему отдельному статическому просмотру. В этом аудите они не проверены и не использованы для подтверждения литературы. В основном тексте они помечены отдельно, а не удалены или выданы за PDF evidence. Доступность кода CFD на дату аудита по PDF не устанавливается. Для CARVE проверено только обещание release upon acceptance.
2. Названия конференций/журналов EGAgent, WorldMM, MERIT, EM²Mem, CFD и TPAMI для Ego-R1 не удостоверяются автоматически содержимым preprint. Реестр фиксирует прочитанную версию. Где в PDF есть proceedings footer (Jeong, Luo, скачанные CVPR papers), он указан. Архитектуры и метрики подтверждены именно для перечисленных PDF, не для предполагаемых более поздних final versions.
3. EgoLife v3 датирован 2026, хотя работа известна как CVPR 2025. Это не даёт права переносить без проверки v3-детали в первоначальную опубликованную версию. Числа обзора относятся к явно связанной v3.
4. EgoLife §4.2 equation и §5 comment о λ не вполне согласованы. В рабочем тексте сохранено словесное описание реализации §5. Ego-R1 имеет неясность между 500+ h data-generation description и стандартным 266 h EgoLife corpus, точное соответствие training/test source files по статье не установлено.
5. Ни одна из подтверждённых QA-таблиц не измеряет полный Aligned-сценарий: 100 камер, camera/site identity, непрерывные обновления, повторные внешне похожие операции, issue→fix verification и claim-level citation correctness одновременно. Такие выводы в обзоре остаются проектными требованиями, а не приписываются papers.
6. Ничего не запускалось для воспроизведения training, inference, retrieval accuracy или latency. Проверены опубликованные методы, таблицы, протоколы и иллюстрации. Отсутствие доверительного интервала у большинства маленьких абляций не заменено нашей оценкой статистической значимости.
