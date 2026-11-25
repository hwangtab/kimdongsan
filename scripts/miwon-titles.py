#!/usr/bin/env python3
"""Render Miwon display headings to transparent PNGs.

Miwon's license allows website use but forbids webfont embedding, so the
headlines are baked into images. The TTF stays in media-src/ (gitignored)
and is never served or committed.

    uv run --with pillow python scripts/miwon-titles.py

Output: public/images/type/*.png and data/miwon-titles.json
"""
import json
import pathlib

from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
FONT = ROOT / "media-src" / "fonts" / "Miwon.ttf"
OUT = ROOT / "public" / "images" / "type"
DATA = ROOT / "data" / "miwon-titles.json"

SCALE = 3
COLORS = {
    "ink": (23, 21, 18, 255),
    "paper": (245, 241, 232, 255),
}

TITLES = [
    ("featured", 56, "ink", ["문을 여는 노래들"], ["Songs that open the door"]),
    ("method", 56, "ink", ["듣는 일이 먼저다"], ["Listening comes first"]),
    ("members", 56, "ink", ["네 사람"], ["Four people"]),
    ("discography", 56, "ink", ["디스코그래피"], ["Discography"]),
    ("live-title", 64, "ink", ["다음 무대"], ["Next stage"]),
    ("press-title", 64, "ink", ["기사와 자료"], ["Words and assets"]),
    ("press-bio", 48, "ink", ["복사해서 쓰는 소개"], ["Copy-ready introductions"]),
    ("contact-title", 56, "ink", ["공연과 인터뷰"], ["Shows and interviews"]),
    ("tech", 56, "ink", ["무대 구성"], ["Stage setup"]),
    ("date", 116, "paper", ["12.04"], ["12.04"]),
    ("date-ink", 116, "ink", ["12.04"], ["12.04"]),
]

OUT.mkdir(parents=True, exist_ok=True)


def render(lines: list[str], size: int, color: str, slug: str, locale: str) -> dict:
    font = ImageFont.truetype(str(FONT), size * SCALE)
    pad = size * SCALE // 2
    line_height = int(size * SCALE * 1.02)

    probe = ImageDraw.Draw(Image.new("RGBA", (10, 10)))
    boxes = [probe.textbbox((0, 0), line, font=font) for line in lines]
    min_x = min(box[0] for box in boxes)
    max_x = max(box[2] for box in boxes)
    min_y = min(box[1] for box in boxes)
    max_y = max(box[3] for box in boxes)

    width = (max_x - min_x) + pad * 2
    height = (max_y - min_y) + line_height * (len(lines) - 1) + pad * 2

    img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    for i, line in enumerate(lines):
        draw.text(
            (pad - min_x, pad - min_y + i * line_height),
            line,
            font=font,
            fill=COLORS[color],
        )

    bbox = img.getbbox()
    if bbox:
        margin = size * SCALE // 8
        box = (
            max(0, bbox[0] - margin),
            max(0, bbox[1] - margin),
            min(img.width, bbox[2] + margin),
            min(img.height, bbox[3] + margin),
        )
        img = img.crop(box)

    path = OUT / f"{slug}-{locale}.png"
    img.save(path, optimize=True)

    return {"w": round(img.width / SCALE, 1), "h": round(img.height / SCALE, 1)}


manifest: dict[str, dict[str, dict]] = {}
for slug, size, color, ko, en in TITLES:
    manifest[slug] = {
        "ko": render(ko, size, color, slug, "ko"),
        "en": render(en, size, color, slug, "en"),
    }

DATA.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
print(f"wrote {len(TITLES) * 2} images to {OUT}")
