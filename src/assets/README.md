# Robot mascot assets

`greeting.mp4` is the exact user-supplied Google Flow video, copied without re-encoding or altering its aspect ratio. SHA-256: `e620aaaad82694f91e6e993270a4483311549a6c8e6475d7fd1942dd9973b48d`.

The original source filename is `Robot_waving_hello_animation_1080p_20261013214120.mp4`. It is a 6-second, 1080 × 1920, 24 fps H.264 video with an AAC audio track and an opaque warm beige background. It has no alpha channel. The browser always plays it muted; its audio is not part of the application's sound system.

`greeting-poster.webp` and `greeting-idle.webp` are proportional, 432 × 768 exports of the first and final video frames. They preserve the same robot. CSS uses `object-fit: contain`, a 9:16 media area, and feathers only the background margins against a matching warm section backdrop. This is visual compositing, not asset transparency.

`src/mascot.js` registers the supplied greeting and thinking videos, each with real first/final frames, plus static idle. Unprovided states resolve to idle. It plays the greeting once per page visit (fresh reloads greet again), handles rejected autoplay with an accessible text action, retains the final resting frame, respects reduced motion, and releases listeners and playback on navigation.

`mascot.webp` is a retained legacy illustration from the previous redesign and is no longer imported or included in the application build. There are no invented success, encouragement or curious video assets.

## Thinking clip

`thinking.mp4` is copied byte-for-byte from the user upload `Robot_thinking_about_physics_que…_20261013231206.mp4`. SHA-256: `840def05e8dfa6c572f329e96bc1eb2f2edf71456a8abe348c6d302deeba3362`. It is 8 seconds, 1080 × 1920, 24 fps, H.264/AAC, approximately 2.4 MB. The visible checkerboard is encoded in the pixels; it is not alpha transparency. No background removal or robot redesign is claimed. `thinking-poster.webp` and `thinking-idle.webp` are proportional first/final frame exports.

Thinking playback loops continuously while its section is visible. The live video element and current playback time are preserved across question/answer/hint renders. Session playback limits apply only to the greeting; they do not stop the thinking loop. The poster is hidden while the video plays, so transparent areas show the page rather than a second robot. On mobile, question companions use a 64-pixel-wide media area beside their short cue. Hidden introductory companions do not fetch/play media. Both clips stay muted and honor reduced motion.

## Background removal

The original `thinking.mp4` is preserved. The application uses `thinking-transparent.webm` (VP9, real alpha, 432 × 768, 24 fps, 8 seconds) plus `thinking-transparent-poster.png` and `thinking-transparent-idle.png`. A deterministic video-processing pass removes bright neutral checkerboard components while protecting the warm shell, dark face/joints and small eye highlights, then softens only the silhouette edge. No generative robot replacement is used. All 192 frames are processed; PNG posters are exported directly from that output. The original opaque thinking posters are retained as source history but no longer bundled.

The browser checks decoded video alpha before revealing it. Decoders without transparency support show the transparent PNG instead. Video and resting-poster corner alpha are independently verified in Chromium. The original greeting clip retains its beige studio background; the requested checkerboard removal targets the thinking clip.

## Active loop edit

The final WebM now uses source frames 58–138 (2.42–5.75 s), trimming the standing introduction and the inactive tail. A cosine-timed forward/backward loop produces 192 frames at 24 fps, with eased reversals and near-matching first/final frames. Adjacent-frame interpolation preserves premultiplied alpha. Prepared posters are exported from the edited loop so loading does not start with the discarded standing pose. Run the background-removal script first, then `scripts/smooth-thinking-loop.py`; the original upload remains unmodified. The intermediate base WebM is ignored.

## Transparent greeting

The deployed greeting uses `greeting-transparent.webm`, a 432 × 768 real-alpha export of original source seconds 0.5–6.0. It preserves the same robot and wave. First/final transparent PNGs and `greeting-transparent-animated.webp` (132 frames, one playback) are generated from that stream. The latter is a real fallback for browsers/media paths that cannot display alpha video. The old original MP4 and opaque posters stay in source history but are no longer bundled. The prepared model, tools and weights are not part of the website runtime.

## Four guidance and encouragement clips (October 14)

Original supplied MP4s are preserved as point-left.mp4, point-right.mp4,
success-answer.mp4 and success-complete.mp4. `prepare-guidance-animations.py`
selects meaningful intervals: 0.75–3.00s, 1.00–3.50s, 1.05–3.175s and
0.75–3.50s respectively. The second pointing clip's introductory wave is removed.
Standing introductions and returns to rest are excluded from encouragement clips.

U2Net semantic matting removes white studio and baked checkerboard backgrounds.
The actual supplied robot RGB pixels are preserved; a narrowly bounded forehead
mask repair preserves the pale head plate. Outputs are 432×768 alpha VP9 WebM,
matching initial/final transparent PNGs, and genuine 216×384 animated WebP
fallbacks for browsers unable to decode alpha WebM. Every prepared clip is audio
free (`-an`); videos remain muted at runtime. Non-looping gestures end on their
matching final pose without cutting to an unrelated image. Reduced motion uses
transparent stills. See audio/README.md for separate licensed optional effects.

## Quiet presence clips

User-supplied idle-primary.mp4 (white studio) and idle-secondary.mp4 (baked
checkerboard) remain untouched. The same semantic matting script selects
0.75–3.50s, discarding the leading static hold. `smooth-idle-loops.py` uses those
actual adjacent frames with cosine timing to produce six-second loops with eased
turnarounds and no pause at the loop boundary. It verifies the boundary change
is below the median adjacent-frame change. Both WebM and infinite animated WebP
fallbacks retain real alpha and have no audio.

Primary quiet presence follows the home greeting and short guidance/success
clips after a 0.7-second hold. The secondary quiet presence accompanies progress.
Reduced-motion and unavailable-media modes intentionally keep transparent stills.
