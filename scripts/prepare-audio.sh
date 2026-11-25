#!/usr/bin/env bash
# Build 60-second preview clips from the album masters in media-src/.
# Requires: ffmpeg. Source files are named 01.*.mp3 … 08.*.mp3.
# Output: public/audio/preview/01.m4a … 08.m4a (AAC 96kbps mono).
set -euo pipefail
cd "$(dirname "$0")/.."

# start offset (seconds) chosen from an energy scan; adjust after listening.
STARTS=(110 41 286 253 107 260 172 253)

for i in $(seq 1 8); do
  n=$(printf "%02d" "$i")
  start=${STARTS[$((i - 1))]}
  src=$(ls media-src/${n}.*.mp3 | head -1)
  ffmpeg -v error -ss "$start" -t 60 -i "$src" \
    -af "afade=t=in:st=0:d=0.25,afade=t=out:st=59.3:d=0.7" \
    -ac 1 -c:a aac -b:a 96k -movflags +faststart \
    -y "public/audio/preview/${n}.m4a"
  echo "built ${n}.m4a from ${src} at ${start}s"
done
