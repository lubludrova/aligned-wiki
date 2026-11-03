#!/usr/bin/env python3
"""Import the review and its linked local sources. Run manually before building."""

import argparse
import hashlib
import json
import re
import shutil
from pathlib import Path
from urllib.parse import unquote, urlsplit, urlunsplit


SITE = Path(__file__).resolve().parents[1]
PROJECT = SITE.parent
SOURCE = PROJECT / "docs/research/LITERATURE_REVIEW_RU.md"
CONTENT = SITE / "content"
PUBLIC = SITE / "public"
LINK = re.compile(r"(!?\[[^\]\n]*\]\()([^\s)]+)(\))")
WIKILINK = re.compile(r"\[\[([^\]|]+)(?:\|([^\]]+))?\]\]")
SECTION = re.compile(r'<a id="(chapter-\d+|appendix-reading|appendix-evidence)"></a>')
BLOCKED_NOTES = {"agents.md", "claude.md", "readme.md", "prompts.md", "index.md", "logs.md", "templates.md"}
LAYOUT = [
    ("foundations", "foundations"), ("archive", "archive"),
    ("observations", "observations"), ("evidence", "evidence"),
    ("states", "evidence"), ("procedures", "procedures"),
    ("streaming", "procedures"), ("construction", "practice"),
    ("business", "practice"), ("adjacent", "synthesis"),
    ("synthesis", "synthesis"), ("reading", "synthesis"),
    ("methodology", "synthesis"),
]


def digest(data):
    return hashlib.sha256(data).hexdigest()


def write_json(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n")


def heading_slug(text):
    text = re.sub(r"<[^>]+>", "", text).lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    return re.sub(r"\s", "-", text)


def description(body):
    plain = re.sub(r"<a[^>]*></a>", "", body).strip()
    paragraph = plain.split("\n\n", 1)[0]
    paragraph = LINK.sub(lambda m: m[1][:-1] + m[3][1:], paragraph)
    paragraph = re.sub(r"[*`\[\]]", "", paragraph).replace("\n", " ")
    if len(paragraph) > 220:
        paragraph = paragraph[:217].rsplit(" ", 1)[0] + "…"
    return paragraph


def build_papers(chapters, bodies, source_map, manifest):
    """Resolve publications, not method names or headings, into a cited-work index."""
    catalog = {}
    by_path = {}
    by_url = {}
    short_titles = {}
    for title, name in re.findall(r"\[([^\]]+)\]\(wiki/([^/)]+)\.md\)", (PROJECT / "aligned-wiki/index.md").read_text()):
        short_titles[name] = title

    def url_key(url):
        parsed = urlsplit(url)
        if parsed.netloc in {"arxiv.org", "www.arxiv.org"}:
            match = re.search(r"/(?:abs|pdf)/(\d+\.\d+)", parsed.path)
            if match:
                return "arxiv:" + match[1]
        path = parsed.path.rstrip("/")
        if parsed.netloc == "aclanthology.org":
            path = path.removesuffix(".pdf")
        if parsed.netloc == "openaccess.thecvf.com":
            path = path.replace("/papers/", "/").replace("/html/", "/")
            path = re.sub(r"\.(pdf|html)$", "", path)
        return parsed.netloc.lower() + path + ("?" + parsed.query if parsed.query else "")

    for item in manifest["papers"]:
        slug = Path(item["file"]).stem
        if not item.get("source_url"):
            continue
        catalog[slug] = {"slug": slug, "title": item["title"], "year": item["year"], "url": item["source_url"]}
        by_path[(PROJECT / "aligned-wiki/raw" / item["file"]).resolve()] = slug
    for item in source_map["sources"]:
        slug = item["slug"]
        catalog[slug] = {"slug": slug, "title": item["title"], "year": item["year"], "url": item["url"]}
        by_path[(SOURCE.parent / item["target"]).resolve()] = slug
    extras = [
        {"slug": "2025-guo-egoconqs", "title": "Egocentric-video-based construction quality supervision (EgoConQS): Application of automatic key activity queries", "year": 2025, "url": "https://doi.org/10.1016/j.autcon.2024.105933"},
        {"slug": "2025-liu-egosafe", "title": "Egocentric camera-based method for detecting static hazardous objects on construction sites", "year": 2025, "url": "https://doi.org/10.1016/j.autcon.2025.106048"},
        {"slug": "2024-seminara-dtgl", "title": "Differentiable Task Graph Learning", "year": 2024, "url": "https://fpv-iplab.github.io/Differentiable-Task-Graph-Learning/"},
    ]
    for item in extras:
        catalog[item["slug"]] = item
    for slug, item in catalog.items():
        by_url[url_key(item["url"])] = slug
        note = PROJECT / "aligned-wiki/wiki" / (slug + ".md")
        if note.exists():
            by_path[note.resolve()] = slug
            header = note.read_text().split("\n## ", 1)[0]
            for url in re.findall(r"https?://[^\s)<>]+", header):
                by_url[url_key(url.rstrip(".,"))] = slug
    extra_aliases = {
        "https://longvideobench.github.io/index.html": "2024-wu-longvideobench",
        "https://aclanthology.org/2024.emnlp-main.1209/": "2024-zhang-llovi",
        "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4936193": "2025-liu-egosafe",
        "https://www.itcon.org/paper/2009/13": "2009-golparvar-fard-d4ar",
        "https://openaccess.thecvf.com/content/CVPR2025/supplemental/Huang_Modeling_Multiple_Normal_CVPR_2025_supplemental.pdf": "2025-huang-amnar",
    }
    for url, slug in extra_aliases.items():
        by_url[url_key(url)] = slug
    short_titles.update({
        "2024-zhang-llovi": "LLoVi", "2024-song-moviechat": "MovieChat",
        "2024-wang-videoagent": "VideoAgent (Wang et al.)", "2024-fan-videoagent": "VideoAgent (Fan et al.)",
        "2026-ren-videorag": "VideoRAG (Ren et al.)", "2025-jeong-videorag": "VideoRAG (Jeong et al.)",
        "2025-luo-video-rag": "Video-RAG (Luo et al.)", "2025-guo-egoconqs": "EgoConQS",
        "2025-liu-egosafe": "EgoSafe", "2024-seminara-dtgl": "DTGL",
        "2009-golparvar-fard-d4ar": "D4AR",
    })
    aliases = {
        "2025-yang-egolife": ["EgoLifeQA", "EgoButler", "EgoRAG"],
        "2026-kim-ma-egoqa": ["EgoMAS"], "2020-lei-tvr": ["XML"],
        "2025-haneji-egooops": ["StepFormer++"], "2026-li-egoerrorvqa": ["Ego-ADR"],
        "2026-sasaki-egoindassembly": ["Progressive Procedure Grounding"],
        "2026-zhang-streamarena": ["StreamMind"],
        "2025-bhattacharyya-livemamba": ["Qualcomm Interactive Cooking"],
        "2018-doughty-skill-ranking": ["Who’s Better"],
        "2024-goletto-amego": ["AMB"],
    }
    for slug, item in catalog.items():
        item["shortTitle"] = short_titles.get(slug, item["title"].split(":", 1)[0])
        names = re.split(r"\s*/\s*", item["shortTitle"])
        names += [re.sub(r"\s*\([^)]*\)", "", name) for name in names]
        aliases.setdefault(slug, []).extend(name for name in names if len(name) > 2)
    aliases["2025-jeong-videorag"] = ["VideoRAG, Jeong", "WikiHowQA"]
    aliases["2026-ren-videorag"] = ["VideoRAG, Ren", "LongerVideos"]
    if "2026-ren-videorag" in catalog:
        catalog["2026-ren-videorag"]["year"] = 2025

    records = {}
    unknown_urls = set()

    def add(slug, chapter, heading, level, url=None, named=False):
        item = catalog[slug]
        record = records.setdefault(slug, {
            "slug": slug, "title": item["title"], "shortTitle": item["shortTitle"], "year": item["year"],
            "sourceUrls": [item["url"]], "chapters": [], "headingTitles": [], "locations": [],
            "citationLocations": [], "namedLocations": [],
        })
        if chapter not in record["chapters"]:
            record["chapters"].append(chapter)
        if url and url not in record["sourceUrls"] and any(domain in url for domain in ("arxiv.org", "aclanthology.org", "thecvf.com", "ecva.net", "doi.org", "ssrn.com", "ieeexplore.ieee.org", "aaai.org", "itcon.org")):
            record["sourceUrls"].append(url.split("#")[0])
        location = {"chapter": chapter, "headingTitle": heading}
        if heading and location not in record["citationLocations"]:
            record["citationLocations"].append(location)
        narrative = level >= 4 or (level == 3 and chapter in {"foundations", "reading"})
        if heading.startswith(("Базовые datasets", "Бенчмарки и протоколы", "Данные и протоколы")):
            narrative = False
        if narrative and location not in record["locations"]:
            record["locations"].append(location)
        if named and narrative and location not in record["namedLocations"]:
            record["namedLocations"].append(location)

    for chapter in chapters:
        if chapter["slug"] == "methodology":
            continue
        heading, level = "", 0
        for line in bodies[chapter["slug"]].splitlines():
            found = re.match(r"^(#{3,6}) (.+)$", line)
            if found:
                level, heading = len(found[1]), found[2]
                for slug, names in aliases.items():
                    if any(re.search(r"(?<!\w)" + re.escape(name) + r"(?!\w)", heading, re.I) for name in names):
                        add(slug, chapter["slug"], heading, level, named=True)
            for match in LINK.finditer(line):
                target = match[2]
                parts = urlsplit(target)
                if parts.scheme:
                    slug = by_url.get(url_key(target))
                else:
                    slug = by_path.get((SOURCE.parent / unquote(parts.path)).resolve()) if parts.path else None
                if slug:
                    add(slug, chapter["slug"], heading, level, target if parts.scheme else None)
                elif parts.scheme and any(domain in target for domain in ("arxiv.org/abs/", "arxiv.org/pdf/", "aclanthology.org", "thecvf.com", "ecva.net/papers", "doi.org", "ssrn.com", "ieeexplore.ieee.org", "aaai.org/index", "itcon.org/paper")):
                    unknown_urls.add(target)

    # This benchmark is discussed by name with its archived primary PDF in the audit.
    add("2023-mangalam-egoschema", "archive", "Бенчмарки чтения выбранного видео", 4)
    for record in records.values():
        preferred = record.pop("namedLocations")
        if preferred:
            record["locations"] = preferred
        record["headingTitles"] = list(dict.fromkeys(location["headingTitle"] for location in record["locations"]))
        record["coverage"] = "discussion" if record["locations"] else "bibliography"
        record["sourceUrls"] = list(dict.fromkeys(record["sourceUrls"]))
        if record["slug"] in {"2025-guo-egoconqs", "2025-liu-egosafe"}:
            record["sourceStatus"] = "full-text-unavailable"
        if record["slug"] == "2024-seminara-dtgl":
            record["coverage"] = "historical-reference"
        if record["slug"] == "2026-ren-videorag":
            record["sourceYear"] = 2025
            record["publicationYear"] = 2026
    write_json(CONTENT / "papers.json", list(records.values()))
    write_json(CONTENT / "papers-report.json", {
        "count": len(records), "scope": "Chapters 1–11 and Appendix A. Appendix B is excluded.",
        "unresolved_publication_urls": sorted(unknown_urls),
        "bibliography_only": [record["slug"] for record in records.values() if record["coverage"] == "bibliography"],
        "historical_only": [record["slug"] for record in records.values() if record["coverage"] == "historical-reference"],
        "source_sha256": digest((CONTENT / "review.original.md").read_bytes()),
    })


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, default=SOURCE, help="Review snapshot. Links remain relative to docs/research.")
    args = parser.parse_args()
    for folder in (CONTENT / "chapters", CONTENT / "notes", PUBLIC / "media", PUBLIC / "downloads"):
        folder.mkdir(parents=True, exist_ok=True)
    source_bytes = args.source.read_bytes()
    original = source_bytes.decode("utf-8")
    (CONTENT / "review.original.md").write_bytes(source_bytes)
    mapping_path = PROJECT / "tmp/site-source-map.json"
    if not mapping_path.exists():
        mapping_path = CONTENT / "source-map.json"
    source_map = json.loads(mapping_path.read_text())
    write_json(CONTENT / "source-map.json", source_map)
    pdf_urls = {}
    manifest = json.loads((PROJECT / "aligned-wiki/raw/manifest.json").read_text())
    for item in manifest["papers"]:
        if item.get("source_url"):
            pdf_urls[(PROJECT / "aligned-wiki/raw" / item["file"]).resolve()] = item["source_url"]
    for item in source_map["sources"]:
        pdf_urls[(SOURCE.parent / item["target"]).resolve()] = item["url"]

    boundaries = list(SECTION.finditer(original))
    assert len(boundaries) == len(LAYOUT) == 13
    anchors = {}
    chapters = []
    bodies = {}
    for index, boundary in enumerate(boundaries):
        slug, group = LAYOUT[index]
        end = boundaries[index + 1].start() if index + 1 < len(boundaries) else len(original)
        section = original[boundary.start():end]
        heading = re.search(r"^## (.+)$", section, re.M)
        assert heading
        title = heading[1]
        body = section[:heading.start()] + section[heading.end():]
        body = body.strip() + "\n"
        number = str(index + 1) if index < 11 else ("A" if index == 11 else "B")
        chapters.append({"id": boundary[1], "slug": slug, "number": number, "title": title,
                         "description": description(body), "group": group})
        bodies[slug] = body
        for anchor in re.findall(r'<a id="([^"]+)"', section):
            anchors[anchor] = slug
        for text in re.findall(r"^#{2,6} (.+)$", section, re.M):
            anchors.setdefault(heading_slug(text), slug)

    notes = {}
    note_queue = []
    copied_images = {}
    copied_downloads = {}
    unresolved = []
    removed_navigation = []
    mapped_pdfs = {}
    dropped_pdf_fragments = []

    def register_note(path):
        if path not in notes:
            slug = path.stem.lower()
            if any(item["slug"] == slug for item in notes.values()):
                slug += "-" + digest(str(path.relative_to(PROJECT)).encode())[:8]
            text = path.read_text()
            heading = re.search(r"^# (.+)$", text, re.M)
            notes[path] = {"slug": slug, "title": heading[1] if heading else path.stem}
            note_queue.append(path)
        return notes[path]["slug"]

    def copy_file(path, kind):
        relative = path.relative_to(PROJECT)
        if kind == "media" and "assets" in relative.parts:
            offset = relative.parts.index("assets")
            relative = Path(*relative.parts[offset:])
        destination = PUBLIC / kind / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(path, destination)
        record = {"source": str(path.relative_to(PROJECT)), "target": str(destination.relative_to(SITE)),
                  "sha256": digest(path.read_bytes()), "bytes": path.stat().st_size}
        (copied_images if kind == "media" else copied_downloads)[str(path)] = record
        return "/" + kind + "/" + relative.as_posix()

    def resolve_target(target, source, image=False):
        parts = urlsplit(target.strip("<>"))
        if parts.scheme or parts.netloc:
            return target
        if not parts.path:
            if source == SOURCE and parts.fragment in anchors:
                return f"/chapters/{anchors[parts.fragment]}/#{parts.fragment}"
            return target
        path = (source.parent / unquote(parts.path)).resolve()
        if not path.is_relative_to(PROJECT):
            unresolved.append({"source": str(source.relative_to(PROJECT)), "target": target, "reason": "outside project"})
            return target
        if path == SOURCE:
            slug = anchors.get(parts.fragment, "foundations")
            return f"/chapters/{slug}/" + ("#" + parts.fragment if parts.fragment else "")
        if not path.exists():
            unresolved.append({"source": str(source.relative_to(PROJECT)), "target": target, "reason": "missing file"})
            return target
        suffix = path.suffix.lower()
        if suffix == ".pdf":
            url = pdf_urls.get(path)
            if not url:
                unresolved.append({"source": str(source.relative_to(PROJECT)), "target": target, "reason": "missing external PDF mapping"})
                return target
            parsed = urlsplit(url)
            is_pdf = parsed.path.lower().endswith(".pdf") or (parsed.netloc == "arxiv.org" and parsed.path.startswith("/pdf/"))
            fragment = parts.fragment if is_pdf and parts.fragment else parsed.fragment
            if parts.fragment and not is_pdf:
                dropped_pdf_fragments.append({"source": str(source.relative_to(PROJECT)), "target": target, "external": url})
            result = urlunsplit((parsed.scheme, parsed.netloc, parsed.path, parsed.query, fragment))
            mapped_pdfs[str(path.relative_to(PROJECT))] = url
            return result
        if suffix == ".md":
            if path.name.lower() in BLOCKED_NOTES:
                removed_navigation.append({"source": str(source.relative_to(PROJECT)), "target": target})
                return None
            url = f"/notes/{register_note(path)}/"
        elif image or suffix in {".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"}:
            url = copy_file(path, "media")
        else:
            url = copy_file(path, "downloads")
        return url + ("?" + parts.query if parts.query else "") + ("#" + parts.fragment if parts.fragment else "")

    def transform(body, source):
        def replace_link(match):
            target = resolve_target(match[2], source, match[1].startswith("!"))
            if target is None:
                return match[1].removeprefix("![").removeprefix("[")[:-2]
            return match[1] + target + match[3]
        body = LINK.sub(replace_link, body)

        def replace_wikilink(match):
            name, separator, fragment = match[1].partition("#")
            label = match[2] or name
            path = source.parent / (name + ("" if name.endswith(".md") else ".md"))
            target = resolve_target(path.name + (separator + fragment if separator else ""), source)
            return f"[{label}]({target})" if target else label
        return WIKILINK.sub(replace_wikilink, body)

    chapter_report = []
    strip_targets = lambda text: LINK.sub(lambda match: match[1] + match[3], text)
    for chapter in chapters:
        slug = chapter["slug"]
        body = bodies[slug]
        output = transform(body, SOURCE)
        assert strip_targets(output) == strip_targets(body), f"Content changed in {slug}"
        (CONTENT / "chapters" / f"{slug}.md").write_text(output)
        chapter_report.append({"slug": slug, "source_sha256": digest(body.encode()),
                               "output_sha256": digest(output.encode()), "text_preserved": True})
    (CONTENT / "introduction.md").write_text(transform(original[:boundaries[0].start()].strip() + "\n", SOURCE))

    for path in note_queue:
        output = transform(path.read_text(), path)
        (CONTENT / "notes" / (notes[path]["slug"] + ".md")).write_text(output)

    write_json(CONTENT / "chapters.json", chapters)
    write_json(CONTENT / "notes.json", sorted(notes.values(), key=lambda note: note["slug"]))
    report = {
        "source": str(SOURCE.relative_to(PROJECT)), "snapshot_path": str(args.source.resolve()),
        "source_sha256": digest(source_bytes),
        "chapters": chapter_report, "chapter_count": len(chapters), "notes_count": len(notes),
        "original_image_count": len(re.findall(r"!\[", original)),
        "original_local_pdf_count": len({match[2].split("#")[0] for match in LINK.finditer(original)
                                         if not urlsplit(match[2]).scheme and urlsplit(match[2]).path.endswith(".pdf")}),
        "original_table_count": len(re.findall(r"^\|[ -:|]+\|$", original, re.M)),
        "imported_table_count": sum(len(re.findall(r"^\|[ -:|]+\|$", (CONTENT / "chapters" / (c["slug"] + ".md")).read_text(), re.M)) for c in chapters),
        "images": list(copied_images.values()), "image_count": len(copied_images),
        "downloads": list(copied_downloads.values()), "mapped_pdf_count": len(mapped_pdfs),
        "mapped_pdfs": mapped_pdfs, "copied_pdf_count": 0,
        "original_explicit_anchor_count": len(re.findall(r'<a id="', original)),
        "imported_explicit_anchor_count": sum(len(re.findall(r'<a id="', (CONTENT / "chapters" / (c["slug"] + ".md")).read_text())) for c in chapters),
        "unresolved_links": unresolved, "removed_service_navigation": removed_navigation,
        "dropped_non_pdf_fragments": dropped_pdf_fragments,
        "note_sources": {note["slug"]: str(path.relative_to(PROJECT)) for path, note in notes.items()},
        "note_hashes": {note["slug"]: {"source_sha256": digest(path.read_bytes()),
                                      "output_sha256": digest((CONTENT / "notes" / (note["slug"] + ".md")).read_bytes())}
                        for path, note in notes.items()},
    }
    write_json(CONTENT / "import-report.json", report)
    build_papers(chapters, bodies, source_map, manifest)
    print(json.dumps({key: report[key] for key in ("chapter_count", "notes_count", "image_count", "mapped_pdf_count", "copied_pdf_count")}))
    print(f"Unresolved links: {len(unresolved)}")


if __name__ == "__main__":
    main()
