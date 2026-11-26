#!/usr/bin/env python3
"""Subset the DOS-font family (MIT, leedheo) to the characters used on the site.

Three files go to public/fonts/:

    DosGothic-subset.woff2     interface + headings (16px grid)
    DosMyeongjo-subset.woff2   long-form reading (same 1024 upem, same grid)
    DosSymbols-subset.woff2    MiraeroNormal punctuation/marks only

DosGothic has no punctuation at all (no · — 《》 →), so the symbol face is
listed after it in the stack and picks up exactly those characters. Latin
letters are deliberately excluded from the symbol subset: MiraeroNormal's
Latin is a different height and would break the line.

Source TTFs live in media-src/fonts/ (gitignored) but the subsets are MIT
and committed, so they ship with the repo.

    uv run --with fonttools --with brotli python scripts/subset-dos-font.py
"""
import pathlib
import subprocess
import tempfile

from fontTools.ttLib import TTFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "media-src" / "fonts"
OUT = ROOT / "public" / "fonts"

SOURCES = {
    "gothic": (SRC / "DOSGothic.ttf", OUT / "DosGothic-subset.woff2"),
    "myeongjo": (SRC / "DOSMyungjo.ttf", OUT / "DosMyeongjo-subset.woff2"),
    "symbols": (SRC / "MiraeroNormal.ttf", OUT / "DosSymbols-subset.woff2"),
}

# Marks the UI uses for chrome: box drawing, blocks, arrows, notes.
DECORATIVE = "─│┌┐└┘├┤┬┴┼═║╔╗╚╝█▀▄░▒■□●○◆※☎♥♪★☆▶◀"

for _, (source, _) in SOURCES.items():
    if not source.exists():
        raise SystemExit(f"missing source font: {source}")

OUT.mkdir(parents=True, exist_ok=True)


def collect_site_chars() -> set[str]:
    chars: set[str] = set()
    for pattern in [
        "data/**/*.ts",
        "data/*.json",
        "messages/*.ts",
        "app/**/*.tsx",
        "components/**/*.tsx",
        "lib/**/*.ts",
    ]:
        for path in ROOT.glob(pattern):
            chars.update(path.read_text())
    chars.update(DECORATIVE)
    chars.update(
        " 0123456789abcdefghijklmnopqrstuvwxyz"
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        "!@#$%^&*()[]{}<>.,:;'\"-_=+/?\\|~`"
    )
    return {c for c in chars if ord(c) > 32}


def subset(source: pathlib.Path, target: pathlib.Path, text: str) -> tuple[int, int]:
    with tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False) as tmp:
        tmp.write(text)
        text_file = tmp.name

    subprocess.run(
        [
            "pyftsubset",
            str(source),
            f"--text-file={text_file}",
            "--flavor=woff2",
            f"--output-file={target}",
            "--layout-features=*",
            "--no-hinting",
            "--no-subset-tables+=FFTM",
        ],
        check=True,
        stderr=subprocess.DEVNULL,
    )
    return len(text), target.stat().st_size


# Western punctuation is drawn full-width in MiraeroNormal because a DOS
# terminal gave it a full character cell. In running text that reads as a gap,
# so the marks below are narrowed to half a cell and re-centred.
HALF_WIDTH = "‘’“”…×–—→↓↗©"


def narrow(path: pathlib.Path, chars: str) -> None:
    font = TTFont(path)
    cmap = font.getBestCmap()
    upem = font["head"].unitsPerEm
    half = upem // 2
    hmtx = font["hmtx"]
    glyf = font["glyf"]

    for ch in chars:
        name = cmap.get(ord(ch))
        if name is None:
            continue
        advance, _ = hmtx[name]
        if advance <= half:
            continue
        glyph = glyf[name]
        shift = (half - advance) // 2
        glyph.coordinates.translate((shift, 0))
        glyph.recalcBounds(glyf)
        hmtx[name] = (half, max(0, glyph.xMin))

    font.flavor = "woff2"
    font.save(path)


site_chars = collect_site_chars()
gothic_cmap = set(TTFont(SOURCES["gothic"][0]).getBestCmap())

# Symbols: everything the site writes that DosGothic cannot draw.
missing = "".join(sorted(c for c in site_chars if ord(c) not in gothic_cmap))
symbol_cmap = set(TTFont(SOURCES["symbols"][0]).getBestCmap())
symbols = "".join(
    c
    for c in dict.fromkeys(missing + DECORATIVE)
    if ord(c) in symbol_cmap and not c.isascii()
)

plans = {
    "gothic": "".join(sorted(site_chars)),
    "myeongjo": "".join(sorted(site_chars)),
    "symbols": "".join(sorted(set(symbols))),
}

for name, (source, target) in SOURCES.items():
    count, size = subset(source, target, plans[name])
    print(f"{target.name}: {size / 1024:.0f} KB, {count} chars")

narrow(SOURCES["symbols"][1], HALF_WIDTH)
print(f"{SOURCES['symbols'][1].name}: narrowed {len(HALF_WIDTH)} marks to half a cell")

unresolved = [c for c in missing if ord(c) not in symbol_cmap]
if unresolved:
    print("no glyph anywhere:", "".join(unresolved))
