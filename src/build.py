#!/usr/bin/env python3
"""Render the Markdown pages in src/content/ through src/layout.html.

Usage (from the site repo root, i.e. the folder that contains index.html):

    python3 src/build.py            # build all pages
    python3 src/build.py --serve    # build, then preview at http://localhost:4000/

Dependencies: pip3 install markdown  (see src/requirements.txt)

Each page is a Markdown file with a small front-matter header:

    ---
    output: Others/index.html     # required: where the generated HTML goes
    page_title: Social Media      # optional: <h2 class="page-title"> at the top
    ---

Everything else in the file is ordinary Markdown; raw HTML is passed through,
which is how the target="_blank" links are kept.
"""

import argparse
import datetime
import re
import sys
from pathlib import Path

try:
    import markdown
except ImportError:
    sys.exit("Missing dependency: pip3 install markdown  (see src/requirements.txt)")

SRC = Path(__file__).resolve().parent
SITE = SRC.parent
CONTENT = SRC / "content"

FRONT_MATTER = re.compile(r"\A---[ \t]*\n(.*?)\n---[ \t]*\n?", re.S)


def parse_front_matter(text):
    """Split a leading `---` block into a dict; return (meta, body)."""
    match = FRONT_MATTER.match(text)
    if not match:
        return {}, text
    meta = {}
    for line in match.group(1).splitlines():
        line = line.strip()
        if not line or line.startswith("#") or ":" not in line:
            continue
        key, _, value = line.partition(":")
        meta[key.strip()] = value.strip().strip("'\"")
    return meta, text[match.end():]


def slugify(value, separator="-"):
    """Heading ids that keep the original capitalisation (e.g. "About-me")."""
    value = re.sub(r"[^\w\s\-]", "", value, flags=re.UNICODE)
    return re.sub(r"\s+", separator, value.strip())


def render(page):
    meta, body = parse_front_matter(page.read_text(encoding="utf-8"))

    output = meta.get("output")
    if not output:
        sys.exit(f"{page.relative_to(SITE)}: missing 'output' in front matter")

    converter = markdown.Markdown(
        extensions=["extra", "toc"],
        extension_configs={"toc": {"slugify": slugify}},
    )
    content = converter.convert(body)

    page_title = meta.get("page_title", "").strip()
    page_title_html = f'<h2 class="page-title">{page_title}</h2>' if page_title else ""

    layout = (SRC / "layout.html").read_text(encoding="utf-8")
    html = (
        layout.replace("{{page_title}}", page_title_html)
        .replace("{{content}}", content)
        .replace("{{year}}", str(datetime.date.today().year))
    )

    target = SITE / output
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(html, encoding="utf-8")
    return target


def main():
    parser = argparse.ArgumentParser(description=__doc__.split("\n", 1)[0])
    parser.add_argument("--serve", action="store_true", help="serve the built site on http://localhost:4000/")
    parser.add_argument("--port", type=int, default=4000, help="port for --serve (default: 4000)")
    args = parser.parse_args()

    pages = sorted(CONTENT.glob("*.md"))
    if not pages:
        sys.exit(f"No Markdown pages found in {CONTENT}")

    for page in pages:
        target = render(page)
        print(f"built {target.relative_to(SITE)}")

    if args.serve:
        import functools
        import http.server

        handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(SITE))
        with http.server.ThreadingHTTPServer(("127.0.0.1", args.port), handler) as server:
            print(f"serving {SITE} at http://localhost:{args.port}/  (Ctrl+C to stop)")
            try:
                server.serve_forever()
            except KeyboardInterrupt:
                pass


if __name__ == "__main__":
    main()
