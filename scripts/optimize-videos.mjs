/**
 * Turns raw stock footage into web-ready banner loops.
 *
 *   1. Put your raw clips in  media-source/  named after the section:
 *        about.mp4  trade.mp4  media.mp4  women.mp4  insights.mp4  contact.mp4
 *      (.mp4 / .mov / .mkv / .webm all work)
 *   2. npm run optimize-videos
 *   3. Web-ready files appear in  public/media/videos/  and the banners pick
 *      them up on the next reload. Nothing else to change.
 *
 * Needs ffmpeg on the PATH:  https://ffmpeg.org/download.html
 *
 * For each clip it writes:
 *   <name>.mp4         1080p H.264, no audio, fast-start   (all browsers)
 *   <name>.webm        1080p VP9, no audio                 (smaller, modern browsers)
 *   <name>-mobile.mp4  720p H.264                          (phones)
 *
 * Loops are trimmed to MAX_SECONDS: a banner loop should be short. A long
 * clip is a big download for no visual benefit.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { basename, extname, join } from 'node:path';

const SRC = 'media-source';
const OUT = 'public/media/videos';
const MAX_SECONDS = 20;
const SECTIONS = ['about', 'trade', 'media', 'women', 'insights', 'contact'];

const ffmpegOk = spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' }).status === 0;
if (!ffmpegOk) {
  console.error('ffmpeg was not found. Install it from https://ffmpeg.org/download.html and try again.');
  process.exit(1);
}
if (!existsSync(SRC)) {
  mkdirSync(SRC, { recursive: true });
  console.log(`Created ${SRC}/ -- put your raw clips in it (named ${SECTIONS.join(', ')}) and run this again.`);
  process.exit(0);
}
mkdirSync(OUT, { recursive: true });

const files = readdirSync(SRC).filter((f) => /\.(mp4|mov|mkv|webm)$/i.test(f));
if (!files.length) {
  console.log(`No clips found in ${SRC}/.`);
  process.exit(0);
}

const run = (args) => {
  const r = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });
  return r.status === 0;
};
const mb = (p) => (statSync(p).size / 1024 / 1024).toFixed(1) + ' MB';

// Scale down only (never up), keep aspect, force even dimensions for H.264.
const scale = (h) => `scale=-2:'min(${h},ih)'`;

for (const file of files) {
  const name = basename(file, extname(file)).toLowerCase();
  if (!SECTIONS.includes(name)) {
    console.log(`Skipping ${file}: name it after a section (${SECTIONS.join(', ')}).`);
    continue;
  }
  const input = join(SRC, file);
  const common = ['-i', input, '-t', String(MAX_SECONDS), '-an'];
  console.log(`\n${file}`);

  const mp4 = join(OUT, `${name}.mp4`);
  const webm = join(OUT, `${name}.webm`);
  const mobile = join(OUT, `${name}-mobile.mp4`);

  const ok =
    run([...common, '-vf', scale(1080), '-c:v', 'libx264', '-preset', 'slow', '-crf', '27',
         '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mp4]) &&
    run([...common, '-vf', scale(1080), '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '34',
         '-row-mt', '1', webm]) &&
    run([...common, '-vf', scale(720), '-c:v', 'libx264', '-preset', 'slow', '-crf', '29',
         '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mobile]);

  if (!ok) {
    console.error(`  FAILED: ${file}`);
    continue;
  }
  console.log(`  ${basename(mp4)}  ${mb(mp4)}   ${basename(webm)}  ${mb(webm)}   ${basename(mobile)}  ${mb(mobile)}`);
  if (statSync(mp4).size > 8 * 1024 * 1024) {
    console.log('  Note: over 8 MB. Consider a shorter or calmer clip -- heavy motion inflates file size.');
  }
}
console.log('\nDone. Reload the site to see the new banners.');
