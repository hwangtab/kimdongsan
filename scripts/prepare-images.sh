#!/usr/bin/env bash
# Build web images from the source files in media-src/.
# Requires: ffmpeg (with libwebp). Run from the project root.
#   ./scripts/prepare-images.sh
set -euo pipefail
cd "$(dirname "$0")/.."

mkdir -p public/images/album public/images/live public/images/band

# Square album cover from the showcase poster (photo block at 160,1260,4170x3090).
ffmpeg -v error -i media-src/poster-source.jpeg \
  -vf "crop=3090:3090:700:1260,scale=2000:2000" -q:v 2 -y public/images/album/cover-2000.jpg
ffmpeg -v error -i media-src/poster-source.jpeg \
  -vf "crop=3090:3090:700:1260,scale=1000:1000" -q:v 2 -y public/images/album/cover-1000.jpg

# Full showcase poster for the live page.
ffmpeg -v error -i media-src/poster-source.jpeg -vf "scale=1800:-1" -q:v 3 -y public/images/live/poster-1800.jpg

# Live photo and band photo.
ffmpeg -v error -i media-src/kdb-live.webp -vf "scale=1400:-1" -q:v 3 -y public/images/live/live-1400.jpg
ffmpeg -v error -i media-src/band.webp -vf "scale=800:800" -q:v 3 -y public/images/band/band-800.jpg

# Four member panels cropped from the yellow studio poster (1200x1500).
# Panel x positions: 48, 330, 612, 894; photo band starts at y=615.
for i in 0 1 2 3; do
  ffmpeg -v error -i media-src/kdb-poster.webp \
    -vf "crop=247:170:$((48 + i * 282)):615,crop=170:170,scale=240:240,hue=s=0,eq=contrast=1.08" \
    -q:v 3 -y "public/images/band/member-$((i + 1)).jpg"
done

echo "images ready"
