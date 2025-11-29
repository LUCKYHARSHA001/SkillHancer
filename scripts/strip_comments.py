#!/usr/bin/env python3
"""
Strip comments from HTML, CSS and JS files in a directory tree.

CAUTION: This is a destructive operation. It attempts to remove:
- HTML comments: <!-- ... -->
- CSS comments: /* ... */
- JS comments: /* ... */ and // ... (ignoring // inside strings)

Use only because you requested no backup.
"""
import sys
from pathlib import Path
import re


def strip_html(content: str) -> str:
    # Remove HTML comments (including multiline)
    return re.sub(r"<!--.*?-->", "", content, flags=re.S)


def strip_css(content: str) -> str:
    # Remove CSS comments
    return re.sub(r"/\*.*?\*/", "", content, flags=re.S)


def strip_js(content: str) -> str:
    # Remove block comments first
    content = re.sub(r"/\*.*?\*/", "", content, flags=re.S)

    # Remove line comments (//) while ignoring occurrences inside strings/backticks
    out_lines = []
    for line in content.splitlines():
        i = 0
        n = len(line)
        in_sq = in_dq = in_bt = False
        escaped = False
        result_chars = []
        while i < n:
            ch = line[i]
            if ch == '\\' and not escaped:
                escaped = True
                result_chars.append(ch)
                i += 1
                continue
            if ch == "'" and not escaped and not in_dq and not in_bt:
                in_sq = not in_sq
                result_chars.append(ch)
                i += 1
                escaped = False
                continue
            if ch == '"' and not escaped and not in_sq and not in_bt:
                in_dq = not in_dq
                result_chars.append(ch)
                i += 1
                escaped = False
                continue
            if ch == '`' and not escaped and not in_sq and not in_dq:
                in_bt = not in_bt
                result_chars.append(ch)
                i += 1
                escaped = False
                continue

            # detect // when not in any string
            if ch == '/' and i + 1 < n and line[i+1] == '/' and not in_sq and not in_dq and not in_bt:
                # avoid removing protocol markers like http:// or https:// by checking previous characters
                prev = ''.join(result_chars).rstrip()
                if not prev.endswith('http:') and not prev.endswith('https:'):
                    # strip rest of line
                    break
            result_chars.append(ch)
            escaped = False
            i += 1
        out_lines.append(''.join(result_chars))
    return '\n'.join(out_lines)


def process_file(path: Path) -> bool:
    try:
        text = path.read_text(encoding='utf-8')
    except Exception:
        return False
    orig = text
    suffix = path.suffix.lower()
    if suffix == '.html' or suffix == '.htm':
        text = strip_html(text)
    elif suffix == '.css':
        text = strip_css(text)
    elif suffix == '.js':
        text = strip_js(text)
    else:
        return False

    if text != orig:
        path.write_text(text, encoding='utf-8')
        return True
    return False


def main(root: Path):
    exts = {'.html', '.htm', '.css', '.js'}
    files = list(root.rglob('*'))
    changed = 0
    touched = 0
    for f in files:
        if f.is_file() and f.suffix.lower() in exts:
            touched += 1
            ok = process_file(f)
            if ok:
                changed += 1
                print(f"Stripped comments: {f}")
    print(f"Processed {touched} files; modified {changed} files.")


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: strip_comments.py <root-path>')
        sys.exit(2)
    root = Path(sys.argv[1])
    if not root.exists():
        print('Path does not exist:', root)
        sys.exit(2)
    main(root)
