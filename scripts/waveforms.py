#!/usr/bin/env python3
"""Generate waveform peaks for the album page.

Reads public/audio/preview/*.m4a, writes data/waveforms.json.
Each track becomes 96 values from 0 to 100. Uses only the standard library
plus ffmpeg for decoding.

    python3 scripts/waveforms.py
"""
import array
import json
import math
import pathlib
import subprocess

ROOT = pathlib.Path(__file__).resolve().parent.parent
BARS = 96

out: dict[str, list[int]] = {}

for i in range(1, 9):
    path = ROOT / "public" / "audio" / "preview" / f"{i:02d}.m4a"
    raw = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", str(path), "-ac", "1", "-ar", "8000",
         "-f", "s16le", "-"],
        capture_output=True,
        check=True,
    ).stdout
    samples = array.array("h")
    samples.frombytes(raw)
    total = len(samples)

    peaks: list[float] = []
    for b in range(BARS):
        start = total * b // BARS
        end = total * (b + 1) // BARS
        if end <= start:
            peaks.append(0.0)
            continue
        rms = math.sqrt(sum(x * x for x in samples[start:end]) / (end - start))
        peaks.append(rms)

    peak = max(peaks) or 1.0
    out[str(i)] = [round(min(100.0, (p / peak) ** 0.62 * 100)) for p in peaks]

target = ROOT / "data" / "waveforms.json"
target.write_text(json.dumps(out, separators=(",", ":")))
print(f"wrote {target} ({BARS} bars x {len(out)} tracks)")
