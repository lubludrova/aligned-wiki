#!/usr/bin/env python3
"""Import publication metadata from existing wiki headers without changing the wiki.

Run from any directory. The site registry defines the inventory, never filenames.
Explicit local-source fallbacks cover review papers without individual wiki notes.
Only metadata-header links are imported, never links from related-work sections.
"""

import csv
import json
import re
from pathlib import Path
from urllib.parse import urlparse

SITE = Path(__file__).resolve().parents[1]
ROOT = SITE.parent
WIKI = ROOT / 'aligned-wiki/wiki'
OUTPUT = SITE / 'content/paper-metadata.json'

# These explicit, provenance-bearing exceptions are checked against local sources.
FALLBACKS = {'2021-luo-clip4clip': {'year': 2021,
                        'venue': 'arXiv preprint (reviewed version)',
                        'authors': 'Huaishao Luo, Lei Ji, Ming Zhong, Yang Chen, Wen Lei, Nan '
                                   'Duan, Tianrui Li',
                        'affiliations': ['Southwest Jiaotong University',
                                         'Microsoft Research Asia',
                                         'Microsoft STCA'],
                        'links': [{'label': 'Official code',
                                   'url': 'https://github.com/ArrowLuo/CLIP4Clip'}],
                        'sourceNote': 'docs/research/pdf-audit/sources/clip4clip.pdf',
                        'sourceVersion': 'arXiv:2104.08860v2, 8 May 2021. Authors, affiliations '
                                         'and code are listed on p. 1.',
                        'metadataStatus': 'fallback',
                        'publicationNote': 'The year follows the 2021 preprint explicitly reviewed '
                                           'in the foundations chapter. No later publication '
                                           'identity is inferred.'},
 '2021-bain-frozen-in-time': {'year': 2021,
                              'venue': 'ICCV',
                              'authors': 'Max Bain, Arsha Nagrani, Gül Varol, Andrew Zisserman',
                              'affiliations': ['Visual Geometry Group, University of Oxford',
                                               'LIGM, École des Ponts, Univ Gustave Eiffel, CNRS'],
                              'links': [{'label': 'Official code',
                                         'url': 'https://github.com/m-bain/frozen-in-time'},
                                        {'label': 'Project',
                                         'url': 'https://www.robots.ox.ac.uk/~vgg/research/frozen-in-time/',
                                         'note': 'Linked by the official repository. Direct fetch '
                                                 'timed out during the metadata check.'}],
                              'sourceNote': 'docs/research/pdf-audit/sources/frozen.pdf',
                              'sourceVersion': 'ICCV 2021 proceedings PDF, p. 1. The official '
                                               'repository independently confirms authors and '
                                               'venue and links the project page.',
                              'metadataStatus': 'fallback'},
 '2024-wang-internvideo2': {'year': 2024,
                            'venue': 'ECCV',
                            'authors': 'Yi Wang, Kunchang Li, Xinhao Li, Jiashuo Yu, Yinan He, Guo '
                                       'Chen, Baoqi Pei, Rongkun Zheng, Zun Wang, Yansong Shi, '
                                       'Tianxiang Jiang, Songze Li, Jilan Xu, Hongjie Zhang, Yifei '
                                       'Huang, Yu Qiao, Yali Wang, Limin Wang',
                            'affiliations': ['OpenGVLab, Shanghai AI Laboratory',
                                             'Nanjing University',
                                             'Shenzhen Institutes of Advanced Technology, CAS'],
                            'links': [{'label': 'Official implementation',
                                       'url': 'https://github.com/OpenGVLab/InternVideo/tree/main/InternVideo2'}],
                            'sourceNote': 'docs/research/pdf-audit/sources/internvideo2-eccv.pdf',
                            'sourceVersion': 'ECCV 2024 proceedings, paper 11491, p. 1. Authors, '
                                             'affiliations and implementation URL are taken from '
                                             'this version.',
                            'metadataStatus': 'fallback'},
 '2024-wu-longvideobench': {'year': 2024,
                            'venue': 'NeurIPS Datasets and Benchmarks',
                            'authors': 'Haoning Wu, Dongxu Li, Bei Chen, Junnan Li',
                            'affiliations': [],
                            'links': [{'label': 'Project',
                                       'url': 'https://longvideobench.github.io/index.html',
                                       'note': 'The official page identifies NeurIPS 2024 Datasets '
                                               '& Benchmarks.'},
                                      {'label': 'Code and data tools',
                                       'url': 'https://github.com/longvideobench/LongVideoBench'}],
                            'sourceNote': 'docs/research/evidence/pdf-audit-longvideobench.pdf',
                            'sourceVersion': 'Reviewed arXiv:2407.15754v1, 22 July 2024. Authors '
                                             'are on p. 1 and the repository is in the dataset '
                                             'documentation. Publication venue was checked '
                                             'separately on the official project page.',
                            'metadataStatus': 'fallback',
                            'publicationNote': 'Affiliations are not listed in the checked '
                                               'title-page metadata and are left unspecified.'},
 '2025-fu-video-mme': {'year': 2025,
                       'venue': 'CVPR',
                       'authors': 'Chaoyou Fu, Yuhan Dai, Yongdong Luo, Lei Li, Shuhuai Ren, '
                                  'Renrui Zhang, Zihan Wang, Chenyu Zhou, Yunhang Shen, Mengdan '
                                  'Zhang, Peixian Chen, Yanwei Li, Shaohui Lin, Sirui Zhao, Ke Li, '
                                  'Tong Xu, Xiawu Zheng, Enhong Chen, Caifeng Shan, Ran He, Xing '
                                  'Sun',
                       'affiliations': ['State Key Laboratory for Novel Software Technology, '
                                        'Nanjing University',
                                        'School of Intelligence Science and Technology, Nanjing '
                                        'University',
                                        'State Key Laboratory of Cognitive Intelligence',
                                        'XMU',
                                        'HKU',
                                        'PKU',
                                        'CUHK',
                                        'ECNU',
                                        'CASIA'],
                       'links': [{'label': 'Project', 'url': 'https://video-mme.github.io/'},
                                 {'label': 'Official code',
                                  'url': 'https://github.com/MME-Benchmarks/Video-MME'}],
                       'sourceNote': 'docs/research/evidence/pdf-audit-videomme.pdf',
                       'sourceVersion': 'CVPR 2025 proceedings PDF, p. 1. Institutional '
                                        'abbreviations are preserved as printed. Code link is also '
                                        'recorded in content/chapters/archive.md.',
                       'metadataStatus': 'fallback'},
 '2024-zhang-llovi': {'year': 2024,
                      'venue': 'EMNLP',
                      'authors': 'Ce Zhang, Taixi Lu, Md Mohaiminul Islam, Ziyang Wang, Shoubin '
                                 'Yu, Mohit Bansal, Gedas Bertasius',
                      'affiliations': ['Department of Computer Science, UNC Chapel Hill'],
                      'links': [{'label': 'Official code', 'url': 'https://github.com/CeeZh/LLoVi'},
                                {'label': 'Publisher record',
                                 'url': 'https://aclanthology.org/2024.emnlp-main.1209/'}],
                      'sourceNote': 'docs/research/evidence/pdf-audit-llovi-v1.pdf',
                      'sourceVersion': 'The review evaluates arXiv:2312.17235v1, 28 December 2023. '
                                       'Authors and affiliation are on p. 1. The ACL Anthology '
                                       'publisher record separately confirms EMNLP 2024 and the '
                                       'author list.',
                      'metadataStatus': 'fallback',
                      'publicationNote': 'Publication year 2024 is distinct from the inspected '
                                         'preprint year 2023. Results from the later final paper '
                                         'are not substituted into the review.'},
 '2024-song-moviechat': {'year': 2024,
                         'venue': 'CVPR',
                         'authors': 'Enxin Song, Wenhao Chai, Guanhong Wang, Yucheng Zhang, '
                                    'Haoyang Zhou, Feiyang Wu, Haozhe Chi, Xun Guo, Tian Ye, '
                                    'Yanting Zhang, Yan Lu, Jenq-Neng Hwang, Gaoang Wang',
                         'affiliations': ['Zhejiang University',
                                          'University of Washington',
                                          'Microsoft Research Asia',
                                          'Hong Kong University of Science and Technology (GZ)',
                                          'Donghua University',
                                          'Shanghai Artificial Intelligence Laboratory'],
                         'links': [{'label': 'Project',
                                    'url': 'https://rese1f.github.io/MovieChat/'},
                                   {'label': 'Official code',
                                    'url': 'https://github.com/wenhaochai/MovieChat'}],
                         'sourceNote': 'docs/research/evidence/pdf-audit-moviechat.pdf',
                         'sourceVersion': 'CVPR 2024 proceedings PDF, p. 1. Project URL is printed '
                                          'in the abstract. Code URL is recorded in '
                                          'content/chapters/archive.md.',
                         'metadataStatus': 'fallback'},
 '2024-wang-videoagent': {'year': 2024,
                          'venue': 'ECCV',
                          'authors': 'Xiaohan Wang, Yuhui Zhang, Orr Zohar, Serena Yeung-Levy',
                          'affiliations': ['Stanford University'],
                          'links': [{'label': 'Official code',
                                     'url': 'https://github.com/wxh1996/VideoAgent'},
                                    {'label': 'Original project page',
                                     'url': 'https://wxh1996.github.io/VideoAgent-Website/',
                                     'note': 'Listed in the PDF and official repository, but '
                                             'returned HTTP 404 during the metadata check on 3 '
                                             'November 2026.'}],
                          'sourceNote': 'docs/research/evidence/videoagent-wang.pdf',
                          'sourceVersion': 'ECCV 2024 proceedings, paper 10325, p. 1. Official '
                                           'repository confirms the matching title, four authors '
                                           'and venue.',
                          'metadataStatus': 'fallback',
                          'publicationNote': "This is Wang et al.'s active video-reading agent, "
                                             "not Fan et al.'s VideoAgent with reusable memory."},
 '2026-kriz-multivent-raw': {'year': 2026,
                             'venue': 'arXiv preprint',
                             'authors': 'Reno Kriz, David Etter, Alexander Martin, Cameron '
                                        'Carpenter, Debashish Chakraborty, Hannah Recknor, '
                                        'Reihaneh Iranmanesh, Matthew Maciejewski, Kenton Murray, '
                                        'Eugene Yang, Benjamin Van Durme, Aaron Steven White, '
                                        'Andrew Yates, William Walden',
                             'affiliations': ['Human Language Technology Center of Excellence',
                                              'Johns Hopkins University',
                                              'Georgetown University',
                                              'University of Rochester',
                                              'George Mason University'],
                             'links': [{'label': 'Code and data',
                                        'url': 'https://github.com/hltcoe/multivent-raw',
                                        'note': 'The reviewed repository primarily provides access '
                                                'to data and derived resources, not a ready-made '
                                                'RAG pipeline.'}],
                             'sourceNote': 'docs/research/pdf-audit/sources/multivent-raw.pdf',
                             'sourceVersion': 'arXiv:2609.28437v1, 23 September 2026, p. 1. Author '
                                              'order was checked using the title-page layout.',
                             'metadataStatus': 'fallback'},
 '2024-seminara-dtgl': {'year': 2024,
                        'venue': 'NeurIPS',
                        'authors': 'Luigi Seminara, Giovanni Maria Farinella, Antonino Furnari',
                        'affiliations': ['Department of Mathematics and Computer Science, '
                                         'University of Catania'],
                        'links': [{'label': 'Project',
                                   'url': 'https://fpv-iplab.github.io/Differentiable-Task-Graph-Learning/'},
                                  {'label': 'Official code',
                                   'url': 'https://github.com/fpv-iplab/Differentiable-Task-Graph-Learning'}],
                        'sourceNote': 'docs/research/pdf-audit/2024-dtgl.pdf',
                        'sourceVersion': 'Official NeurIPS 2024 proceedings PDF, p. 1, with venue '
                                         'footer and code URL. Full title: Differentiable Task '
                                         'Graph Learning: Procedural Activity Representation and '
                                         'Online Mistake Detection from Egocentric Videos.',
                        'metadataStatus': 'fallback',
                        'publicationNote': 'Historical predecessor of TGML. The later TPAMI 2026 '
                                           'TGML publication and its results remain a separate '
                                           'registry record.'},
 '2009-golparvar-fard-d4ar': {'year': 2009,
                              'venue': 'Journal of Information Technology in Construction (ITcon)',
                              'authors': 'Mani Golparvar-Fard, Feniosky Peña-Mora, Silvio Savarese',
                              'affiliations': ['Construction Management and Information Technology '
                                               'Group, Department of Civil & Environmental '
                                               'Engineering, University of Illinois, '
                                               'Urbana-Champaign',
                                               'Department of Electrical and Computing '
                                               'Engineering, University of Michigan, Ann Arbor'],
                              'links': [{'label': 'Publisher record',
                                         'url': 'https://www.itcon.org/paper/2009/13'}],
                              'sourceNote': 'docs/research/pdf-audit/2009-d4ar.pdf',
                              'sourceVersion': 'Published June 2009, ITcon 14, pp. 129–153. '
                                               'Authors and affiliations are taken from the first '
                                               'page. No project or code repository was '
                                               'established in the checked sources.',
                              'metadataStatus': 'fallback'},
 '2025-guo-egoconqs': {'year': 2025,
                       'venue': 'Automation in Construction',
                       'authors': 'Jingjing Guo, Lu Deng, Pengkun Liu, Tao Sun',
                       'affiliations': [],
                       'links': [{'label': 'Publisher record',
                                  'url': 'https://doi.org/10.1016/j.autcon.2024.105933'}],
                       'sourceNote': 'aligned-wiki/raw/manifest.json',
                       'sourceVersion': 'candidate_review_2026_10_31.candidate_reviews[45].identity '
                                        'records the four authors and Automation in Construction '
                                        '170, 105933, February 2025, online 18 December 2024.',
                       'metadataStatus': 'fallback',
                       'publicationNote': 'Bibliographic metadata only. The frozen review did not '
                                          'obtain the original full PDF. No verified project/code '
                                          'or affiliations are asserted.'},
 '2025-liu-egosafe': {'year': 2025,
                      'venue': 'Automation in Construction',
                      'authors': 'Ziming Liu, Jiuyi Xu, Christine Wun Ki Suen, Meida Chen, Zhengbo '
                                 'Zou, Yangming Shi',
                      'affiliations': [],
                      'links': [{'label': 'Publisher record',
                                 'url': 'https://doi.org/10.1016/j.autcon.2025.106048'},
                                {'label': 'Dataset and preprocessing',
                                 'url': 'https://github.com/jiuyixu25/EgoVision',
                                 'note': 'Author-linked repository with dataset documentation, '
                                         'camera calibration, preprocessing and augmentation. Not '
                                         "established as a complete implementation of the paper's "
                                         'detector.'}],
                      'sourceNote': 'literature-review/content/en/notes/proactive.md',
                      'sourceVersion': 'Local audit entry H establishes DOI and incomplete PDF '
                                       'access. Bibliographic author details were separately '
                                       'checked against publisher-deposited Crossref metadata on 3 '
                                       'November 2026: Automation in Construction 172, 106048, '
                                       'April 2025.',
                      'metadataStatus': 'fallback',
                      'publicationNote': 'This is the construction hazardous-object paper by Liu '
                                         'et al., not the distinct 2026 EgoSafe or EgoSafetyBench. '
                                         'The full-PDF limitation in the frozen review remains '
                                         'unchanged.',
                      'evidenceUrls': ['https://api.crossref.org/works/10.1016/j.autcon.2025.106048',
                                       'https://shiyangming.com/research/']},
 '2023-mangalam-egoschema': {'year': 2023,
                             'venue': 'NeurIPS Datasets and Benchmarks',
                             'authors': 'Karttikeya Mangalam, Raiymbek Akshulakov, Jitendra Malik',
                             'affiliations': ['UC Berkeley'],
                             'links': [{'label': 'Project', 'url': 'https://egoschema.github.io/'},
                                       {'label': 'Code and data',
                                        'url': 'https://github.com/egoschema/EgoSchema'},
                                       {'label': 'Publisher record',
                                        'url': 'https://proceedings.neurips.cc/paper_files/paper/2023/hash/90ce332aff156b910b002ce4e6880dec-Abstract-Datasets_and_Benchmarks.html'}],
                             'sourceNote': 'docs/research/evidence/pdf-audit-egoschema.pdf',
                             'sourceVersion': 'Reviewed arXiv:2308.09126v1, 17 August 2023. The '
                                              'official NeurIPS 2023 proceedings record confirms '
                                              'the publication. Raiymbek Akshulakov follows the '
                                              'official project and publisher metadata spelling, '
                                              'rather than the title-page variant Akshkulakov.',
                             'metadataStatus': 'fallback'}}

LINK = re.compile(r'\[([^\]]+)\]\((https?://[^\s)]+)\)')
BARE_URL = re.compile(r'https?://[^\s<>()]+')
PUBLICATION_HOSTS = (
    'doi.org', 'aclanthology.org', 'ieeexplore.ieee.org',
    'openaccess.thecvf.com', 'proceedings.mlr.press', 'proceedings.neurips.cc',
    'proceedings.nips.cc', 'link.springer.com', 'ojs.aaai.org',
    'eccv.ecva.net', 'cvpr.thecvf.com', 'sciencedirect.com',
)


def plain(text):
    text = re.sub(r'\[([^\]]+)\]\([^)]*\)', r'\1', text)
    return re.sub(r'[*`]', '', text).strip()


def scalar(text):
    text = text.strip()
    if text.startswith('"'):
        return json.loads(text)
    if text.startswith("'") and text.endswith("'"):
        return text[1:-1].replace("''", "'")
    return text


def field(header, name):
    match = re.search(r'^\*\*' + re.escape(name) + r':\*\*\s*(.*)$', header, re.M)
    return match[1].strip() if match else ''


def header_links(text, kind):
    found = [(m[1], m[2]) for m in LINK.finditer(text)]
    remainder = re.sub(r'\[[^\]]+\]\([^)]*\)', '', text)
    found.extend((kind, m[0].rstrip('.,;')) for m in BARE_URL.finditer(remainder))
    residual = BARE_URL.sub('', remainder).strip(' ·.,—-')
    note = plain(text) if residual and residual != 'and' else ''
    if kind == 'Code' and note == 'Not released in checked repository. Official dataset resources':
        note = ('Model code was not released in the checked repository. '
                'The repository provides official dataset resources.')
    for label, url in found:
        parsed = urlparse(url)
        # Original-publication links already live in papers.json. Do not repeat
        # arXiv variants or PDFs beside the project's/code's useful extra links.
        if parsed.hostname == 'arxiv.org' or parsed.path.lower().endswith('.pdf'):
            continue
        if kind == 'Source version' and not any(
            (parsed.hostname or '').endswith(host) for host in PUBLICATION_HOSTS
        ):
            continue
        record = {'label': plain(label), 'url': url}
        if note and kind != 'Source version':
            record['note'] = note
        yield record


def from_wiki(path):
    text = path.read_text()
    front = text.split('---', 2)[1]
    header = text.split('\n## ', 1)[0]
    year = int(re.search(r'^year:\s*(\d+)\s*$', front, re.M)[1])
    venue = scalar(re.search(r'^venue:\s*(.*)$', front, re.M)[1])
    affiliations = re.search(
        r'^affiliations:(.*?)(?=\n[a-z_]+:|\Z)', front, re.M | re.S
    )[1].strip()
    if affiliations.startswith('['):
        affiliations = [scalar(x) for x in next(csv.reader(
            [affiliations[1:-1]], skipinitialspace=True
        ))]
    else:
        affiliations = [scalar(x) for x in re.findall(r'^\s*-\s+(.*)$', affiliations, re.M)]
    authors = plain(field(header, 'Authors'))
    assert authors, f'Missing authors: {path.name}'
    result = {
        'year': year, 'venue': venue, 'authors': authors,
        'affiliations': affiliations, 'links': [],
        'sourceNote': str(path.relative_to(ROOT)), 'metadataStatus': 'wiki',
    }
    version = plain(field(header, 'Source version'))
    if version:
        result['sourceVersion'] = version
    seen = set()
    for kind in ('Paper', 'Website', 'Code', 'Source version'):
        for link in header_links(field(header, kind), kind):
            if link['url'] not in seen:
                result['links'].append(link)
                seen.add(link['url'])
    for doi in re.findall(r'\bDOI\s+(10\.\d{4,9}/[^\s)]+)', version, re.I):
        url = 'https://doi.org/' + doi.rstrip('.,;')
        if url not in seen:
            result['links'].append({'label': 'DOI', 'url': url})
            seen.add(url)
    return result


def main():
    papers = json.loads((SITE / 'content/en/papers.json').read_text())
    metadata = {}
    missing = []
    conflicts = []
    for paper in papers:
        slug = paper['slug']
        path = WIKI / f'{slug}.md'
        if path.exists():
            record = from_wiki(path)
        elif slug in FALLBACKS:
            record = dict(FALLBACKS[slug])
        else:
            missing.append(slug)
            record = {
                'year': paper['year'], 'venue': 'Not verified in the local wiki',
                'authors': '', 'affiliations': [], 'links': [], 'sourceNote': '',
                'metadataStatus': 'unavailable',
                'publicationNote': 'No individual wiki note. Year follows the reviewed site registry.',
            }
        if record['year'] != paper['year']:
            conflicts.append({'slug': slug, 'reviewYear': paper['year'], 'metadataYear': record['year']})
            note = (
                f"Publication metadata gives {record['year']}. The frozen review registry "
                f"uses {paper['year']} for its inspected source."
            )
            record['publicationNote'] = (record.get('publicationNote', '') + ' ' + note).strip()
        assert isinstance(record['year'], int)
        assert isinstance(record['affiliations'], list)
        assert all(isinstance(x, str) for x in record['affiliations'])
        assert all(x['url'].startswith(('https://', 'http://')) for x in record['links'])
        metadata[slug] = record
    assert len(metadata) == len(papers), 'Duplicate publication slugs'
    OUTPUT.write_text(json.dumps(metadata, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({
        'total': len(metadata),
        'wiki': sum(x['metadataStatus'] == 'wiki' for x in metadata.values()),
        'fallback': sum(x['metadataStatus'] == 'fallback' for x in metadata.values()),
        'unavailable': missing, 'yearDifferences': conflicts,
        'links': sum(len(x['links']) for x in metadata.values()),
    }, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
