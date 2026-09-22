# Media Guide — banner photos & videos

Every page opens with a full-width banner. This guide says what to put in it.
Nothing here needs a code change: drop the files in the right place and reload.

---

## 1. The home page photographs (a four-photo slideshow)

The hero cross-fades **four photographs**, one every 5.2 seconds (pause button and dots included).
The photos are the client's real event pictures in `src/assets/images/events/`, and the four
used by the hero are listed in **`src/data/eventPhotos.ts` → `heroSlides`**.

**To change a hero photo**
1. Save the new picture in `src/assets/images/events/` (WebP, about 80% quality).
2. Add an entry to `eventPhotos.ts` — its `event`, `date` and `location` show as the small caption
   on the hero, so use only what is actually visible or known about the photo.
3. Put it in `heroSlides`. Change `SLIDE_MS` in `components/home/HeroSection.tsx` to alter the timing.

**What makes a good hero photo**

| | |
|---|---|
| Size | **2400 px wide or larger** (the current six are only 1024 px wide and look soft full-width) |
| Subject | Near the middle of the frame; set `focal` (a CSS `object-position`, e.g. `'47% 34%'`) so the crop keeps her in shot |
| Format | Landscape works best; portrait photos are cropped to a landscape band |
| People | Only use pictures the client has the right to publish |

> Ask for the **original files** from the photographer or the client's camera roll. Photos saved
> from social media are usually about 1080 px wide.

Captions and alt text in `eventPhotos.ts` only state what is legible on the event banners in the
frames. Please check that each `alt` correctly says who appears in the photo.

---

## 2. Section videos

Each banner can play a silent looping video behind the headline.

**Files go in `public/media/videos/`, named after the section:**

| File | Page | Good footage |
|---|---|---|
| `trade.mp4` | Trade & Investment | Gulf skyline time-lapse · container port & cranes · cargo ship at dawn · gold / markets |
| `media.mp4` | Media & Press | Camera flashes · press conference · TV studio · microphones · conference stage |
| `women.mp4` | Leadership | Women at a workshop · artisans / tailoring · classroom · community gathering (**best: real footage from the Women Cell's own events**) |
| `about.mp4` | About | City skyline (Mumbai / Dubai) · handshake · film set / clapperboard |
| `insights.mp4` | Insights | Slow city time-lapse · writing / desk · abstract data or map |
| `contact.mp4` | Contact | Office exterior · aerial city · globe / connections |

Also used: `about.mp4` runs behind the "Prosperity Beyond Borders" band at the foot of the home page.

**What makes a good banner loop**

- 1920 × 1080, **8–20 seconds**, no audio, **no text on screen**
- Slow, calm camera movement (heavy motion looks busy behind a headline and makes big files)
- Darker, moodier footage works best — the emerald overlay tints everything
- Avoid people looking straight to camera on the **left** of frame (the headline lives there)
- **Licensing:** check the licence of every clip (Pexels, Pixabay, Coverr and similar sites each have their own terms). Real footage from the client's own events is always the strongest and needs no licence.

### Making the files web-ready

Raw stock clips are far too heavy for a web page. This does the conversion for you:

1. Install **ffmpeg** (https://ffmpeg.org/download.html).
2. Put the raw clips in a `media-source/` folder in the project root, named after the section
   (`trade.mp4`, `women.mov`, …).
3. Run `npm run optimize-videos`.

For each clip it writes three files into `public/media/videos/`:

- `<name>.mp4` — 1080p H.264 (works everywhere)
- `<name>.webm` — 1080p VP9 (smaller, used by modern browsers)
- `<name>-mobile.mp4` — 720p (served to phones)

Clips longer than 20 s are trimmed to 20 s.

---

## 3. How the banners behave

- **Video present** → plays silently, looping. A round pause/play button appears (bottom right).
- **Video missing or fails to load** → the section's photograph is shown, drifting slowly. No error, no blank box.
- **Visitor prefers reduced motion** → video never loads; a still photograph is shown.
- **Visitor has Data Saver / a slow connection** → video is skipped, photograph shown.
- **Banner scrolled off-screen** → video pauses, so nothing decodes in the background.
- **Phones** → the `-mobile.mp4` cut is used when it exists.

---

## 4. Changing the fallback photographs

Section banners now use the real event photographs from `src/data/eventPhotos.ts` (see section 1).
The older stock images in `src/assets/images/focus/` are still used in a few places (blog posts,
the Women Leadership flagship program) and are **880 px wide** — fine as small cards, but **too small for full-width banners**. Replace them with
**1920 px-wide** versions for a sharp result. Export them as WebP (quality about 80) with the
**same file names** so nothing else needs to change.

Which photo goes with which banner, its focal point, and its video paths are all in one file:
**`src/data/sectionMedia.ts`**. To make a banner photo-only, delete its `video:` line.

---

## 5. Deployment checklist

- The host must serve `/media/videos/*.mp4` and `*.webm` as real files (Netlify, Vercel,
  Cloudflare Pages, and most hosts do). If your SPA "rewrite to index.html" rule is set up
  correctly, real files are served first. If a video ever shows the photo instead, open
  `/media/videos/trade.mp4` in the browser — you should get a video, not the website.
- Serve the videos with caching enabled (`Cache-Control: public, max-age=31536000`) — they never change.
