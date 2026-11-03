<a id="chapter-10"></a>



Не каждое подозрительное событие можно заранее описать графом известной процедуры. Первая ветвь этой главы рассматривает обнаружение аномалий по описанию категории и диагностическим вопросам. Вторая — поиск моментов для экспертного review, сравнительную оценку исполнения и корректирующие примеры. Для Aligned это смежные компоненты: anomaly score не устанавливает нарушение конкретного требования, а относительный skill score не подтверждает отсутствие дефекта или квалификацию работника.

### Бенчмарки и протоколы оценки

| Тест | Что оценивает | Почему не заменяет процедурный контроль |
|---|---|---|
| **UCF-Crime** | Frame-level anomaly scores, AUC и постановки категоризации аномальных видео | Высокий AUC не задаёт приемлемую частоту тревог на длительной нормальной работе |
| **XD-Violence** | Обнаружение аномалий: AP у OVVAD/Anomize, AUC в протоколе VERA. В OVVAD/Anomize выделяются новые категории | Улучшение части категорий не означает универсального превосходства или распознавания ремонта |
| **EPIC-Skills 2018** | Парное ранжирование видео хирургических и бытовых задач | Относительная оценка, не поиск дефекта. Pair split не устанавливает перенос на новых работников. Метод переиспользован как baseline в EgoExoLearn. [PDF, §§4–5](https://dimadamen.github.io/Skill/whos_better_whos_best.pdf) |
| **Ego-Exo4D demonstration proficiency в SkillSpotter** | Локализация экспертных timestamps и good/tip labels, class-agnostic/class-specific mAP и grading на matched detections | Не абсолютное качество и не online error detection. Опубликованный метод использует offline контекст и pose. [PDF, §3.1](https://static.siplab.org/papers/eccv2026-skillspotter.pdf#page=4) |
| **ExpertAF на Ego-Exo4D** | Комментарий, retrieval экспертной демонстрации и генерация позы по learner clip | Offline оценка выходов не проверяет успешное исправление человеком после совета. [PDF, §§3–4](https://openaccess.thecvf.com/content/CVPR2025/papers/Ashutosh_ExpertAF_Expert_Actionable_Feedback_from_Video_CVPR_2025_paper.pdf) |
| **ProSkill** | Относительное качество предварительно выделенных шагов, rank correlation и pairwise accuracy | ELO/percentile внутри действия не является абсолютной квалификацией. Независимое переиспользование здесь не установлено. [PDF, §§3–5](https://arxiv.org/pdf/2601.20661v1) |

UCF-Crime и XD-Violence повторно используются OVVAD, Anomize и VERA в разных протоколах. Категории, доступная супервизия и правила обработки времени различаются. Источники: [OVVAD, эксперименты](https://openaccess.thecvf.com/content/CVPR2024/papers/Wu_Open-Vocabulary_Video_Anomaly_Detection_CVPR_2024_paper.pdf), [Anomize, Tables 1–2](https://openaccess.thecvf.com/content/CVPR2025/papers/Li_Anomize_Better_Open_Vocabulary_Video_Anomaly_Detection_CVPR_2025_paper.pdf), [VERA, §4.1, Tables 3, 5–6](https://openaccess.thecvf.com/content/CVPR2025/papers/Ye_VERA_Explainable_Video_Anomaly_Detection_via_Verbalized_Learning_of_Vision-Language_CVPR_2025_paper.pdf).

<a id="paper-2026-mazzamuto-proskill"></a>

#### ProSkill: сравнительная разметка отдельных шагов

**Mazzamuto et al., WACV 2026.** ProSkill содержит 1 135 заранее выделенных клипов, 71 действие и около 14 часов из пяти процедурных datasets. Swiss tournament выбирает информативные пары одного действия, люди сравнивают исполнение, ELO-рейтинг затем переводится в percentile score. Модели обучаются регрессии или парному ранжированию готовых клипов. Это benchmark воспринимаемого качества, а не универсальная шкала квалификации: одинаковый percentile разных действий не устанавливает одинаковую компетентность. В примере Figure 5 низкую оценку получает исполнение, прерванное ребёнком, что показывает влияние контекста. Для Aligned полезен сбор экспертных сравнений, но нужны отдельные критерии дефектов и worker-disjoint проверка. Разделение исходных видео в статье не устанавливает разделения работников. [PDF, §§3–5, Figure 5](https://arxiv.org/pdf/2601.20661v1#page=7).

### Открытый словарь аномалий

#### OVVAD и Anomize: категории аномалий

**OVVAD, CVPR 2024** объединяет CLIP, временной адаптер, семантические описания и синтетические примеры новых аномалий. Его два выхода — frame anomaly score и название категории видео. **Anomize, CVPR 2025** развивает такую постановку через static/dynamic streams, concept library и групповые описания похожих классов. На XD-Violence AP новых категорий растёт с 76.03 до 84.24, но общий UCF-Crime AUC снижается с 86.40 до 84.49. Это конкретный выигрыш на части задач, а не универсальное превосходство. Категории названы заранее, category accuracy считается на аномальных видео, а долгие нормальные периоды и ложные тревоги в час не являются основным протоколом. [OVVAD wiki](/notes/2024-wu-ovvad/), [OVVAD PDF, §3, с. 3–5](https://openaccess.thecvf.com/content/CVPR2024/papers/Wu_Open-Vocabulary_Video_Anomaly_Detection_CVPR_2024_paper.pdf#page=3), [Anomize wiki](/notes/2025-li-anomize/), [Anomize PDF, Tables 1–2, с. 6](https://openaccess.thecvf.com/content/CVPR2025/papers/Li_Anomize_Better_Open_Vocabulary_Video_Anomaly_Detection_CVPR_2025_paper.pdf#page=6).

![OVVAD: detection, categorization и синтез новых аномалий](/media/assets/expansion-problems/ovvad.png)

*OVVAD, оригинальная Figure 2, PDF с. 4.*

![Anomize: словарь концептов, grouped label descriptions, static и dynamic streams](/media/assets/expansion-problems/anomize.png)

*Anomize, оригинальная Figure 3, PDF с. 4.*

#### VERA: обучаемые диагностические вопросы

**VERA, CVPR 2025** интереснее всего идеей обучать короткие диагностические вопросы, сохраняя веса VLM замороженными. Learner отвечает по текущим вопросам, optimizer изменяет вопросы, используя слабые video-level метки. Это обучение с supervision и дополнительными вызовами модели. Абляция на UCF-Crime даёт AUC 78.81 без вопросов и 86.55 с выученными вопросами. Однако опубликованный inference извлекает похожие сегменты **из прошлого и будущего**, сглаживает scores и учитывает положение относительно всего видео. Поэтому перенос в proactive stream требует переработки и повторной оценки. Хорошее объяснение также не доказывает, что его детали достоверны или что человек исправил нарушение. [Wiki](/notes/2025-ye-vera/), [PDF, §3.3, с. 5–6, Tables 5–6, с. 7](https://openaccess.thecvf.com/content/CVPR2025/papers/Ye_VERA_Explainable_Video_Anomaly_Detection_via_Verbalized_Learning_of_Vision-Language_CVPR_2025_paper.pdf#page=5).

![VERA: verbal optimization диагностических вопросов с learner и optimizer](/media/assets/expansion-problems/vera.png)

*Оригинальная Figure 2, PDF с. 4. Изображено обучение вопросов. Ретроспективная обработка видео относится к отдельной inference-схеме Figure 3.*

### Относительная оценка исполнения и моменты для review

<a id="paper-2018-doughty-skill-ranking"></a>

#### Who’s Better: раннее ранжирование исполнения по парам

**Doughty et al., CVPR 2018.** Две Siamese-ветки Temporal Segment Networks учатся оценивать видео одного действия по человеческим предпочтениям. Ranking loss разделяет упорядоченные пары, similarity loss удерживает близкие оценки для исполнений, признанных похожими. При inference достаточно одного видео, итоговый score позволяет сортировать демонстрации. EPIC-Skills объединяет хирургические и бытовые задачи. Это относительная оценка, без локализации ошибки или абсолютной сертификации результата. Test-пары могут включать видео, встречавшееся в другой train-паре, поэтому перенос на новых работников не установлен. EgoExoLearn позднее сравнивает этот baseline с attention-based ranking. Для Aligned полезна постановка сравнения, но проверять её нужно на независимых людях и конкретных критериях работы. [PDF, §§3–5](https://dimadamen.github.io/Skill/whos_better_whos_best.pdf), [EgoExoLearn, Table 5](https://arxiv.org/pdf/2403.16182v3#page=8).

<a id="paper-2026-braun-skillspotter"></a>

#### SkillSpotter: найти момент для оценки и отдельно оценить исполнение

**Braun и Holz, ECCV 2026.** Оценка готового клипа предполагает, что нужный момент уже выбран. SkillSpotter решает предшествующую задачу: по записи демонстрации вернуть timestamps, метку **good execution / tip for improvement** и confidence. Такая постановка полезна Aligned для подготовки очереди человеческого review. Но метка tip ещё не называет физический дефект, а успешный поиск моментов не даёт общей квалификации работника. Основной тест использует expert annotations задачи demonstration proficiency из Ego-Exo4D. [PDF, §3.1](https://static.siplab.org/papers/eccv2026-skillspotter.pdf#page=4).

Предварительно извлечённые Omnivore-признаки поступают в temporal pyramid ActionFormer. Отдельный encoder обрабатывает 3D body pose, обучаемые gates дозируют её вклад. В режиме нескольких видов bidirectional cross-view attention объединяет ego- и exo-признаки. Обучаемые радиусы подавления сокращают дубли предсказаний, сохраняя возможность нескольких типов feedback в близкие моменты. Это supervised detector по экспертным timestamps и бинарным оценкам. Он не генерирует объяснение нарушения (§3.2).

![Оригинальная схема SkillSpotter](/media/assets/new-work-selection-2026-11-02/2026-braun-skillspotter.png)

*Оригинальная Figure 2, PDF p. 5. SkillSpotter: временные признаки, pose fusion и обмен между ракурсами перед локализацией feedback. Режим с двумя видами использует полный временной контекст. [Источник](https://static.siplab.org/papers/eccv2026-skillspotter.pdf#page=5).*

Оценка специально разделена. Class-agnostic mAP проверяет нахождение момента, class-specific mAP одновременно требует правильной метки, balanced accuracy считается только на сопоставленных предсказаниях. Последняя поэтому зависит от покрытия matching и не характеризует все события записи. Для ego-only режима **class-specific mAP = 21.82**, balanced accuracy — **60.40**. Эти значения нельзя читать как «60% всех ошибок обнаружены». На Cooking и Music detection mAP составляет лишь 3.08 и 1.57, что показывает слабость текущих признаков на мелких взаимодействиях. [§3.1, Table 1, Table 4](https://static.siplab.org/papers/eccv2026-skillspotter.pdf#page=9).

Доступные входы также существенны. При обучении используется истинная body pose, при оценке — предсказанная. Для ego-позы нужна траектория Aria-камеры, поэтому этот вариант не сводится к обычному RGB с каски. Cross-view attention получает полный временной контекст. Опубликованная схема является offline-анализатором демонстрации, а не проверенным своевременным детектором. Скорость 19.70 FPS на H200 исключает декодирование, Omnivore extraction и pose estimation. [§3.3, Appendix A/G](https://static.siplab.org/papers/eccv2026-skillspotter.pdf#page=20).

Для Aligned переносим раздельную проверку «нашли ли нужный момент?» и «верно ли оценили найденное?». Переход от этого результата к предупреждению или закрытию issue потребует собственной разметки наблюдаемых нарушений, причинного режима и проверки ручных взаимодействий с деталями.

<a id="paper-2025-ashutosh-expertaf"></a>

#### ExpertAF: объяснение вместе с примером исправления

**Ashutosh et al., CVPR 2025.** ExpertAF обучается по экспертным комментариям Ego-Exo4D и связывает три выхода: корректирующий текст, найденную экспертную демонстрацию и сгенерированную последовательность поз. Видео кодируется InternVideo2, позы превращаются в токены, Llama 3-8B обучается предсказывать ответы. При обычном inference комментарий строится без парного экспертного примера, хотя он доступен во время обучения. Сильная конфигурация использует ego/exo-видео и 3D pose. Для Aligned полезна связь совета с конкретным примером, но эксперименты по спортивным клипам и человеческие оценки ответов не показывают улучшения последующего исполнения человеком. Генерируется поза, а не RGB-видео исправления, и непрерывный помощник здесь не проверен. [PDF, §§3–4](https://openaccess.thecvf.com/content/CVPR2025/papers/Ashutosh_ExpertAF_Expert_Actionable_Feedback_from_Video_CVPR_2025_paper.pdf#page=3).

### Сопоставление подходов

Сравнительное ранжирование, локализация feedback и генерация корректирующего примера также имеют разные выходы. Who’s Better и ProSkill оценивают подготовленные исполнения, SkillSpotter сначала ищет моменты в записи, ExpertAF добавляет пояснение и пример. Их показатели нельзя объединять с anomaly AUC или считать доказательством исправления после совета.

OVVAD и Anomize связывают визуальные признаки со словарём категорий. VERA оптимизирует вопросы к замороженной VLM. Это разные способы задать проверку, а не последовательные версии одной системы. Сравнивать их следует при одинаковом доступе к прошлому и будущему, отдельно от качества объяснений и подтверждения исправления.
