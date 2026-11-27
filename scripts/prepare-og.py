#!/usr/bin/env python3
"""Build 1200x630 social cards for every route.

    uv run --with pillow --with fonttools --with brotli python scripts/prepare-og.py

Writes to public/images/og/:

    home.jpg  album.jpg  about.jpg  live.jpg  press.jpg  gallery.jpg  contact.jpg

Each card pairs the route's own picture with the same DOS typography the page
uses, so a shared link looks like the page it opens. DosGothic has no
punctuation, so missing glyphs fall back to MiraeroNormal character by
character — the same rule the CSS stack applies in the browser.

Static files rather than next/og at request time: the output is deterministic,
costs nothing per request, and avoids shipping a second font subset just for
Satori (which cannot read woff2 anyway).
"""
import pathlib

from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
# Use the shipped subsets rather than the source TTFs: they carry the same
# half-width punctuation the site renders, so the cards match the pages.
FONTS = ROOT / "public" / "fonts"
GOTHIC = FONTS / "DosGothic-subset.woff2"
SYMBOLS = FONTS / "DosSymbols-subset.woff2"
OUT = ROOT / "public" / "images" / "og"

W, H = 1200, 630
VOID = (7, 10, 24)
MUTED = (140, 147, 181)
INK = (232, 230, 220)
LINE = (43, 50, 104)
SIGNAL = (91, 233, 240)
KITSCH = (255, 79, 163)
TICKET = (255, 210, 63)

_gothic_cmap = set(TTFont(GOTHIC).getBestCmap())
_symbol_cmap = set(TTFont(SYMBOLS).getBestCmap())

# Cards are fixed strings rather than page copy: every character here has to
# exist in the subset, and asking for a glyph the subset lacks would silently
# fall back to a system face and break the pixel grid.
CARDS = [
    {
        "name": "home",
        "photo": "album/cover-1000.jpg",
        "eyebrow": "정규 1집 · 2026.11.17 · AFTERNOON",
        "title": ["김동산과", "블루이웃"],
        "latin": "KIM DONGSAN & BLUEEEWOOT",
        "body": ["사람을 만나고, 이야기를 듣고,", "그 자리에서 노래를 만든다."],
        "meta": "8 TRACKS · 45:05",
        "accent": "12.04 쇼케이스 · 청년문화공간 ju",
        "window": ("BLUEEWUT.EXE", "2026"),
    },
    {
        "name": "album",
        "photo": "album/cover-1000.jpg",
        "eyebrow": "1ST ALBUM · 2026.11.17 · AFTERNOON",
        "title": ["앨범"],
        "latin": "KIM DONGSAN & BLUEEEWOOT",
        "body": ["포크와 블루스, 재즈가", "한 앨범 안에서 번갈아 나온다."],
        "meta": "8 TRACKS · 45:05",
        "accent": "전곡 가사 · 크레딧 · 미리듣기",
        "window": ("TRACKLIST.TXT", "08"),
    },
    {
        "name": "about",
        "photo": "album/cover-1000.jpg",
        "eyebrow": "ABOUT · SINCE 2010",
        "title": ["출장작곡가", "김동산"],
        "latin": "KIM DONGSAN · SONGWRITER",
        "body": ["노래가 필요한 사람을 찾아가,", "그 자리에서 곡을 만든다."],
        "meta": "2006 → 2026",
        "accent": "방식 · 연표 · 디스코그래피",
        "window": ("WHO.TXT", "EPK"),
    },
    {
        "name": "live",
        "photo": "live/live-1400.jpg",
        "eyebrow": "LIVE · 2026.12.04 (금)",
        "title": ["다음 무대"],
        "latin": "ALBUM RELEASE SHOWCASE",
        "body": ["청년문화공간 ju 다리소극장", "20:00 · 200석 전석 자유석"],
        "meta": "예매 중",
        "accent": "게스트 혼 섹션 · 코러스",
        "window": ("SHOW.EXE", "1"),
    },
    {
        "name": "press",
        "photo": "album/cover-1000.jpg",
        "eyebrow": "PRESS KIT · 2026.11.17",
        "title": ["기사와 자료"],
        "latin": "BIO · QUOTES · COVERAGE",
        "body": ["길이에 맞게 골라 쓰는 소개와", "출처가 붙은 인용, 내려받을 자료."],
        "meta": "10 ARTICLES",
        "accent": "인쇄용 원시트 포함",
        "window": ("PRESS.TXT", "EPK"),
    },
    {
        "name": "gallery",
        "photo": "archive/suwon-2018-1.webp",
        "eyebrow": "PHOTO ARCHIVE · 2018",
        "title": ["기록"],
        "latin": "BEFORE THE FIRST ALBUM",
        "body": ["롱플레이어와 수원의 공연장에서", "찍은 사진들."],
        "meta": "6 FILES",
        "accent": "출처 표기 · 사용 허락",
        "window": ("IMAGE.IMG", "2018"),
    },
    {
        "name": "contact",
        "photo": "archive/long-player-2018.webp",
        "eyebrow": "CONTACT · BOOKING",
        "title": ["공연과 인터뷰"],
        "latin": "STUDIO NOL",
        "body": ["공연, 인터뷰, 음반 문의를 받습니다.", "롱플레이어 위치와 영업 시간."],
        "meta": "hello@studionol.co.kr",
        "accent": "010-4255-7893",
        "window": ("MAIL.EXE", "KR"),
    },
]


def font(size: int):
    return ImageFont.truetype(str(GOTHIC), size)


def symbol_font(size: int):
    return ImageFont.truetype(str(SYMBOLS), size)


def make_text(draw: ImageDraw.ImageDraw):
    def text(x: int, y: int, value: str, size: int, fill) -> int:
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
        return x

    return text


def cover_crop(path: pathlib.Path, size: int) -> Image.Image:
    """Fill the square slot without cropping anything important.

    A portrait poster cropped square loses its title; a live photo cropped
    square loses the band's feet. So the image is fitted inside the slot and
    the leftover space is filled with a blurred, darkened copy of itself —
    the usual music-player treatment, which keeps the card's left half whole.
    """
    image = Image.open(path).convert("RGB")
    fitted = image.copy()
    fitted.thumbnail((size, size), Image.LANCZOS)

    backdrop = image.resize((size, size), Image.LANCZOS)
    backdrop = backdrop.filter(ImageFilter.GaussianBlur(28))
    backdrop = Image.eval(backdrop, lambda v: int(v * 0.55))

    canvas = backdrop
    canvas.paste(
        fitted,
        ((size - fitted.width) // 2, (size - fitted.height) // 2),
    )
    return canvas


def render(card: dict) -> pathlib.Path:
    bg = Image.new("RGB", (W, H), VOID)
    bg.paste(cover_crop(ROOT / "public" / "images" / card["photo"], 630), (0, 0))
    draw = ImageDraw.Draw(bg)
    text = make_text(draw)

    text(690, 116, card["eyebrow"], 16, MUTED)

    y = 156
    for line in card["title"]:
        text(688, y, line, 56, INK)
        y += 60

    text(690, y + 24, card["latin"], 16, KITSCH)

    y += 76
    for line in card["body"]:
        text(690, y, line, 22, INK)
        y += 32

    draw.line((690, 432, 1160, 432), fill=LINE, width=1)
    text(690, 448, card["meta"], 16, MUTED)
    text(690, 484, card["accent"], 16, TICKET)

    # window chrome: title bar on the text panel
    left, right = card["window"]
    draw.rectangle((690, 528, 1160, 560), outline=LINE)
    text(700, 534, left, 16, SIGNAL)
    text(1160 - round(font(16).getlength(right)) - 10, 534, right, 16, MUTED)

    draw.rectangle((680, 90, 682, 470), fill=SIGNAL)

    target = OUT / f"{card['name']}.jpg"
    bg.save(target, quality=92)
    return target


OUT.mkdir(parents=True, exist_ok=True)
for card in CARDS:
    print(f"wrote {render(card).relative_to(ROOT)}")
