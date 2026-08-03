# Media pipeline (hero video + gallery)

The site's video assets are prepared with [`ffmpeg-static`](https://www.npmjs.com/package/ffmpeg-static)
(a dev dependency that ships a platform `ffmpeg` binary; nothing runs at request
time). Source clips from phones/drones are often HEVC (`hvc1`) in a QuickTime
`.MOV` container, which Chrome, Edge and Firefox will **not** play in a `<video>`
tag. Everything below transcodes to web-safe H.264 MP4.

Resolve the ffmpeg binary path with:

```bash
FF=$(node -e "console.log(require('ffmpeg-static'))")
```

## Hero video

Source: `public/videos/topfuncharters-hero.MOV` (9:16 vertical). The hero
(`src/components/hero/VideoHero.tsx`) crops the central band with
`object-cover object-center` and applies the coastal color grade in CSS.

```bash
# Desktop source (720x1280 H.264)
"$FF" -y -i public/videos/topfuncharters-hero.MOV \
  -vf "scale=720:-2" -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -crf 28 -preset slow -an -movflags +faststart \
  public/videos/topfuncharters-hero.mp4

# Lighter mobile source (540x960)
"$FF" -y -i public/videos/topfuncharters-hero.MOV \
  -vf "scale=540:-2" -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -crf 29 -preset slow -an -movflags +faststart \
  public/videos/topfuncharters-hero-720.mp4

# Poster (full vertical frame; CSS crops it to match the video)
"$FF" -y -ss 00:00:01.2 -i public/videos/topfuncharters-hero.MOV \
  -frames:v 1 -q:v 3 public/images/topfun-hero-poster.jpg
```

## Gallery videos

Each gallery clip is transcoded to `public/videos/gallery/gallery-video-NN.mp4`
with a poster frame at `public/images/video-thumbs/gallery-video-NN.jpg`:

```bash
"$FF" -y -i SOURCE \
  -vf "scale='min(1280,iw)':-2" -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -crf 28 -preset veryfast -movflags +faststart -c:a aac -b:a 96k \
  public/videos/gallery/gallery-video-NN.mp4

"$FF" -y -ss 00:00:00.6 -i public/videos/gallery/gallery-video-NN.mp4 \
  -frames:v 1 -q:v 4 public/images/video-thumbs/gallery-video-NN.jpg
```

## Regenerate the gallery manifest

After adding photos to `public/images` or videos (+ posters) to the gallery
folders, rebuild the auto-generated manifest that the gallery renders from:

```bash
node scripts/generate-gallery.mjs
```

This rescans the directories, probes real image/video dimensions (for zero-CLS
`next/image`), and rewrites `src/data/gallery-generated.ts`. Curated shots in
`src/data/gallery.ts` and site logos/posters are skipped automatically.
