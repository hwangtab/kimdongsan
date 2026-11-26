#!/usr/bin/env python3
"""Build app/favicon.ico from the same 32x32 pixel design as app/icon.svg.

Browsers prefer the .ico at 16 and 32px, so the site tab needs its own copy
rather than falling back to the SVG.

    uv run --with pillow python scripts/prepare-favicon.py
"""
import pathlib

from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
TARGET = ROOT / "app" / "favicon.ico"

VOID = (7, 10, 24, 255)
LINE = (43, 50, 104, 255)
INK = (232, 230, 220, 255)
SIGNAL = (91, 233, 240, 255)
KITSCH = (255, 79, 163, 255)
TICKET = (255, 210, 63, 255)

# 32x32 design, same rectangles as app/icon.svg
RECTS = [
    ((0, 0, 32, 2), LINE),
    ((4, 6, 14, 6), SIGNAL),
    ((4, 10, 10, 2), INK),
    ((4, 14, 14, 2), INK),
    ((4, 18, 10, 2), INK),
    ((4, 22, 14, 2), INK),
    ((18, 18, 8, 6), TICKET),
    ((20, 20, 4, 2), VOID),
    ((20, 6, 2, 10), KITSCH),
    ((24, 6, 2, 10), KITSCH),
]

# At 16px the 32-grid collapses into mush, so this size gets its own design:
# a prompt block and three text lines, nothing else.
RECTS_16 = [
    ((1, 1, 14, 1), LINE),
    ((2, 3, 7, 3), SIGNAL),
    ((2, 7, 8, 1), INK),
    ((2, 9, 12, 1), INK),
    ((2, 11, 6, 1), INK),
    ((2, 13, 12, 1), INK),
    ((12, 7, 2, 7), TICKET),
]

master = Image.new("RGBA", (32, 32), VOID)
pixels = master.load()
for (x, y, w, h), colour in RECTS:
    for dy in range(h):
        for dx in range(w):
            pixels[x + dx, y + dy] = colour

# Nearest-neighbour at 48 (1.5x of 32) would blur the grid, so redraw at 48
# from the same rectangle list scaled by 1.5 and snapped to whole pixels.
def render(size: int, rects=None) -> Image.Image:
    rects = rects if rects is not None else RECTS
    scale = size / 32
    img = Image.new("RGBA", (size, size), VOID)
    px = img.load()
    for (x, y, w, h), colour in rects:
        if rects is RECTS_16:
            # already authored on a 16px grid
            x0, y0, x1, y1 = x, y, x + w, y + h
        else:
            x0 = round(x * scale)
            y0 = round(y * scale)
            x1 = round((x + w) * scale)
            y1 = round((y + h) * scale)
        x1 = max(x1, x0 + 1)
        y1 = max(y1, y0 + 1)
        for yy in range(y0, min(y1, size)):
            for xx in range(x0, min(x1, size)):
                px[xx, yy] = colour
    return img


def write_ico(path: pathlib.Path, frames: list[tuple[int, Image.Image]]) -> None:
    """Write a multi-size ICO whose entries are PNG payloads.

    Pillow's own ICO writer resizes the first frame to every size, which turns
    the hand-tuned 16px grid back into a blurred 32px one. PNG entries inside
    an ICO are supported by every browser that matters.
    """
    import io
    import struct

    payloads = []
    for size, frame in frames:
        buf = io.BytesIO()
        frame.save(buf, format="PNG", optimize=True)
        payloads.append((size, buf.getvalue()))

    header = struct.pack("<HHH", 0, 1, len(payloads))
    offset = len(header) + 16 * len(payloads)
    entries = b""
    for size, data in payloads:
        entries += struct.pack(
            "<BBBBHHII",
            size if size < 256 else 0,
            size if size < 256 else 0,
            0,  # no palette
            0,  # reserved
            1,  # colour planes
            32,  # bits per pixel
            len(data),
            offset,
        )
        offset += len(data)

    path.write_bytes(header + entries + b"".join(d for _, d in payloads))


sizes = [48, 32, 16]
frames = [(size, render(size, RECTS_16 if size == 16 else RECTS)) for size in sizes]
write_ico(TARGET, frames)
print(f"wrote {TARGET} ({', '.join(f'{size}x{size}' for size in sizes)})")
