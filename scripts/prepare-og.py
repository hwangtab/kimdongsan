#!/usr/bin/env python3
"""Build the 1200x630 social card from the album cover.

Requires Pillow. Run with an isolated environment:

    uv run --with pillow python scripts/prepare-og.py

Uses the macOS Korean system font. On other machines, point FONT at a
Korean-capable TTF/TTC.
"""
import pathlib

from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
FONT = "/System/Library/Fonts/AppleSDGothicNeo.ttc"

W, H = 1200, 630
PAPER = (245, 241, 232)
INK = (23, 21, 18)
MUTED = (110, 103, 92)
LINE = (215, 207, 190)

bg = Image.new("RGB", (W, H), PAPER)
cover = (
    Image.open(ROOT / "public/images/album/cover-1000.jpg")
    .convert("RGB")
    .resize((630, 630))
)
bg.paste(cover, (0, 0))

draw = ImageDraw.Draw(bg)


def font(size: int, index: int = 0) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT, size, index=index)


draw.text((690, 118), "정규 1집", font=font(22), fill=MUTED)
draw.text((686, 172), "김동산과", font=font(66, 4), fill=INK)
draw.text((686, 250), "블루이웃", font=font(66, 4), fill=INK)
draw.text((690, 356), "Kim Dongsan & Blueeewoot", font=font(25), fill=MUTED)
draw.text((690, 418), "2026.11.17   ·   8 TRACKS   ·   45:05", font=font(20), fill=INK)
draw.line((690, 470, 1160, 470), fill=LINE, width=1)
draw.text((690, 492), "AFTERNOON", font=font(16), fill=MUTED)

target = ROOT / "public/images/og.jpg"
bg.save(target, quality=90)
print(f"wrote {target}")
