#!/usr/bin/env python3
"""Subset DungGeunMo (public domain) to the characters used on the site.

    uv run --with fonttools --with brotli python scripts/subset-pixel-font.py
"""
import pathlib
import subprocess
import tempfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
SOURCE = ROOT / "media-src" / "fonts" / "DungGeunMo.woff"
TARGET = ROOT / "public" / "fonts" / "DungGeunMo-subset.woff2"

if not SOURCE.exists():
    raise SystemExit(f"missing source font: {SOURCE}")

chars: set[str] = set()
for pattern in ["data/**/*.ts", "messages/*.ts", "app/**/*.tsx", "components/**/*.tsx", "lib/**/*.ts"]:
    for path in ROOT.glob(pattern):
        chars.update(path.read_text())

chars.update(
    " 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    "!@#$%^&*()[]{}<>.,:;'\"-_=+/?\\|~`·—–“”‘’→←↑↓×₩"
)
text = "".join(sorted(chars))

with tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False) as tmp:
    tmp.write(text)
    text_file = tmp.name

subprocess.run(
    [
        "pyftsubset",
        str(SOURCE),
        f"--text-file={text_file}",
        "--flavor=woff2",
        f"--output-file={TARGET}",
        "--layout-features=*",
        "--no-hinting",
    ],
    check=True,
)

print(f"wrote {TARGET} ({TARGET.stat().st_size / 1024:.0f} KB, {len(text)} chars)")
