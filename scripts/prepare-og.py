#!/usr/bin/env python3
"""Build the 1200x630 social card from the album cover.

    uv run --with pillow python scripts/prepare-og.py

Draws with the same DOS fonts the site uses. DosGothic has no punctuation,
so missing glyphs fall back to MiraeroNormal character by character — the
same rule the CSS stack applies in the browser.
"""
import pathlib

from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
# Use the shipped subsets rather than the source TTFs: they carry the same
# half-width punctuation the site renders, so the card matches the pages.
FONTS = ROOT / "public" / "fonts"
GOTHIC = FONTS / "DosGothic-subset.woff2"
SYMBOLS = FONTS / "DosSymbols-subset.woff2"

W, H = 1200, 630
VOID = (7, 10, 24)
PANEL = (14, 19, 48)
INK = (232, 230, 220)
MUTED = (140, 147, 181)
LINE = (43, 50, 104)
SIGNAL = (91, 233, 240)
KITSCH = (255, 79, 163)
TICKET = (255, 210, 63)

bg = Image.new("RGB", (W, H), VOID)
cover = (
    Image.open(ROOT / "public/images/album/cover-1000.jpg")
    .convert("RGB")
    .resize((630, 630))
)
bg.paste(cover, (0, 0))

draw = ImageDraw.Draw(bg)

_gothic_cmap = set(TTFont(GOTHIC).getBestCmap())
_symbol_cmap = set(TTFont(SYMBOLS).getBestCmap())


def font(size: int):
    return ImageFont.truetype(str(GOTHIC), size)


def symbol_font(size: int):
    return ImageFont.truetype(str(SYMBOLS), size)


def text(x: int, y: int, value: str, size: int, fill) -> None:
    """Draw a string, swapping in the symbol face for glyphs DosGothic lacks."""
    for ch in value:
        if ord(ch) in _gothic_cmap:
            face = font(size)
        elif ord(ch) in _symbol_cmap:
            face = symbol_font(size)
        else:
            face = font(size)
        draw.text((x, y), ch, font=face, fill=fill)
        x += round(face.getlength(ch))


text(690, 116, "정규 1집 · 2026.11.17 · AFTERNOON", 16, MUTED)
text(688, 156, "김동산과", 56, INK)
text(688, 216, "블루이웃", 56, INK)
text(690, 296, "KIM DONGSAN & BLUEEEWOOT", 16, KITSCH)
text(690, 340, "사람을 만나고, 이야기를 듣고,", 22, INK)
text(690, 372, "그 자리에서 노래를 만든다.", 22, INK)

draw.line((690, 432, 1160, 432), fill=LINE, width=1)
text(690, 448, "8 TRACKS · 45:05", 16, MUTED)
text(690, 484, "12.04 쇼케이스 · 청년문화공간 ju", 16, TICKET)

# window chrome: title bar on the text panel
draw.rectangle((690, 528, 1160, 560), outline=LINE)
text(700, 534, "BLUEEWUT.EXE", 16, SIGNAL)
text(1030, 534, "2026", 16, MUTED)

draw.rectangle((680, 90, 682, 470), fill=SIGNAL)

target = ROOT / "public/images/og.jpg"
bg.save(target, quality=92)
print(f"wrote {target}")
