#!/usr/bin/env python3
"""Render Ownglyph JAEGEONSA brand lines to PNG.

The font is free to use on websites and as BI/CI, but modification and
redistribution are prohibited. The WOFF2 stays in media-src/ (gitignored);
only these rendered images are committed.

    uv run --with fonttools --with brotli --with pillow python scripts/brand-titles.py
"""
import json
import pathlib
import tempfile

from PIL import Image, ImageDraw, ImageFont
from fontTools.ttLib import TTFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
SOURCE = ROOT / "media-src" / "fonts" / "Ownglyph_JAEGEONSA-Rg.woff2"
OUT = ROOT / "public" / "images" / "type"
DATA = ROOT / "data" / "brand-titles.json"

SCALE = 3
INK = (23, 21, 18, 255)

# (slug, size ko, size en, lines ko, lines en)
TITLES = [
    ("brand-hero", 104, 104, ["김동산과", "블루이웃"], ["Kim Dongsan", "& Blueeewoot"]),
    ("brand-small", 20, 20, ["김동산과 블루이웃"], ["Kim Dongsan & Blueeewoot"]),
    ("about-brand", 84, 64, ["출장작곡가", "김동산"], ["Kim Dongsan", "song-commissioning", "songwriter"]),
    ("album-brand", 66, 52, ["김동산과 블루이웃"], ["Kim Dongsan & Blueeewoot"]),
]

if not SOURCE.exists():
    raise SystemExit(f"missing source font: {SOURCE}")

OUT.mkdir(parents=True, exist_ok=True)

with tempfile.NamedTemporaryFile(suffix=".ttf", delete=False) as tmp:
    ttf_path = pathlib.Path(tmp.name)
    font = TTFont(SOURCE)
    font.flavor = None
    font.save(ttf_path)


def render(lines: list[str], size: int, slug: str, locale: str) -> dict:
    face = ImageFont.truetype(str(ttf_path), size * SCALE)
    pad = size * SCALE
    line_height = int(size * SCALE * 1.04)

    probe = ImageDraw.Draw(Image.new("RGBA", (10, 10)))
    boxes = [probe.textbbox((0, 0), line, font=face) for line in lines]
    min_x = min(b[0] for b in boxes)
    max_x = max(b[2] for b in boxes)
    min_y = min(b[1] for b in boxes)
    max_y = max(b[3] for b in boxes)

    width = (max_x - min_x) + pad * 2
    height = (max_y - min_y) + line_height * (len(lines) - 1) + pad * 2

    img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    for i, line in enumerate(lines):
        draw.text(
            (pad - min_x, pad - min_y + i * line_height),
            line,
            font=face,
            fill=INK,
        )

    bbox = img.getbbox()
    if bbox:
        margin = size * SCALE // 6
        img = img.crop(
            (
                max(0, bbox[0] - margin),
                max(0, bbox[1] - margin),
                min(img.width, bbox[2] + margin),
                min(img.height, bbox[3] + margin),
            )
        )

    img.save(OUT / f"{slug}-{locale}.png", optimize=True)
    return {"w": round(img.width / SCALE, 1), "h": round(img.height / SCALE, 1)}


manifest: dict[str, dict[str, dict]] = {}
for slug, size_ko, size_en, ko, en in TITLES:
    manifest[slug] = {
        "ko": render(ko, size_ko, slug, "ko"),
        "en": render(en, size_en, slug, "en"),
    }

DATA.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
print(f"wrote {len(TITLES) * 2} brand images to {OUT}")
