#!/usr/bin/env bash
# Turns the "Streha nastaja" clips from assets/raw/ into WebP frame sequences for the site.
# Needs ffmpeg. Usage: bash scripts/extract-roof-frames.sh
set -euo pipefail

RAW=assets/raw
OUT=public/roof-build
FPS=${FPS:-15}

clips=("$RAW"/roof-build-a-membrane.mp4 "$RAW"/roof-build-b-battens-tiles.mp4 "$RAW"/roof-build-c-finish.mp4)
[ -f "$RAW/roof-build-d-rain.mp4" ] && clips+=("$RAW/roof-build-d-rain.mp4")

list=$(mktemp)
for c in "${clips[@]}"; do echo "file '$PWD/$c'" >>"$list"; done
ffmpeg -y -loglevel error -f concat -safe 0 -i "$list" -c:v libx264 -crf 16 -an /tmp/roof-build-joined.mp4

rm -rf "$OUT" && mkdir -p "$OUT/desktop" "$OUT/mobile"
ffmpeg -y -loglevel error -i /tmp/roof-build-joined.mp4 -vf "fps=$FPS,scale=1600:-2" -c:v libwebp -quality 72 "$OUT/desktop/%04d.webp"
ffmpeg -y -loglevel error -i /tmp/roof-build-joined.mp4 -vf "fps=$FPS,scale=900:-2" -c:v libwebp -quality 70 "$OUT/mobile/%04d.webp"

n=$(ls "$OUT/desktop" | wc -l)
echo "Frames: $n  →  set frameCount: $n in src/content/roof-build.ts"
