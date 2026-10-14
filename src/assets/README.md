# Robot mascot assets

`greeting.mp4` is the exact user-supplied Google Flow video, copied without re-encoding or altering its aspect ratio. SHA-256: `e620aaaad82694f91e6e993270a4483311549a6c8e6475d7fd1942dd9973b48d`.

The original source filename is `Robot_waving_hello_animation_1080p_20261013214120.mp4`. It is a 6-second, 1080 × 1920, 24 fps H.264 video with an AAC audio track and an opaque warm beige background. It has no alpha channel. The browser always plays it muted; its audio is not part of the application's sound system.

`greeting-poster.webp` and `greeting-idle.webp` are proportional, 432 × 768 exports of the first and final video frames. They preserve the same robot. CSS uses `object-fit: contain`, a 9:16 media area, and feathers only the background margins against a matching warm section backdrop. This is visual compositing, not asset transparency.

`src/mascot.js` registers the supplied greeting and thinking videos, each with real first/final frames, plus static idle. Unprovided states resolve to idle. It plays the greeting once per tab session, handles rejected autoplay with an accessible text action, retains the final resting frame, respects reduced motion, and releases listeners and playback on navigation.

`mascot.webp` is a retained legacy illustration from the previous redesign and is no longer imported or included in the application build. There are no invented success, encouragement or curious video assets.

## Thinking clip

`thinking.mp4` is copied byte-for-byte from the user upload `Robot_thinking_about_physics_que…_20261013231206.mp4`. SHA-256: `840def05e8dfa6c572f329e96bc1eb2f2edf71456a8abe348c6d302deeba3362`. It is 8 seconds, 1080 × 1920, 24 fps, H.264/AAC, approximately 2.4 MB. The visible checkerboard is encoded in the pixels; it is not alpha transparency. No background removal or robot redesign is claimed. `thinking-poster.webp` and `thinking-idle.webp` are proportional first/final frame exports.

Thinking playback loops continuously while its section is visible. The live video element and current playback time are preserved across question/answer/hint renders. Session playback limits apply only to the greeting; they do not stop the thinking loop. The poster is hidden while the video plays, so transparent areas show the page rather than a second robot. On mobile, question companions use a 64-pixel-wide media area beside their short cue. Hidden introductory companions do not fetch/play media. Both clips stay muted and honor reduced motion.

## Background removal

The original `thinking.mp4` is preserved. The application uses `thinking-transparent.webm` (VP9, real alpha, 432 × 768, 24 fps, 8 seconds) plus `thinking-transparent-poster.png` and `thinking-transparent-idle.png`. A deterministic video-processing pass removes bright neutral checkerboard components while protecting the warm shell, dark face/joints and small eye highlights, then softens only the silhouette edge. No generative robot replacement is used. All 192 frames are processed; PNG posters are exported directly from that output. The original opaque thinking posters are retained as source history but no longer bundled.

The browser checks decoded video alpha before revealing it. Decoders without transparency support show the transparent PNG instead. Video and resting-poster corner alpha are independently verified in Chromium. The original greeting clip retains its beige studio background; the requested checkerboard removal targets the thinking clip.
