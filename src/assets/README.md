# Robot mascot assets

`greeting.mp4` is the exact user-supplied Google Flow video, copied without re-encoding or altering its aspect ratio. SHA-256: `e620aaaad82694f91e6e993270a4483311549a6c8e6475d7fd1942dd9973b48d`.

The original source filename is `Robot_waving_hello_animation_1080p_20261013214120.mp4`. It is a 6-second, 1080 × 1920, 24 fps H.264 video with an AAC audio track and an opaque warm beige background. It has no alpha channel. The browser always plays it muted; its audio is not part of the application's sound system.

`greeting-poster.webp` and `greeting-idle.webp` are proportional, 432 × 768 exports of the first and final video frames. They preserve the same robot. CSS uses `object-fit: contain`, a 9:16 media area, and feathers only the background margins against a matching warm section backdrop. This is visual compositing, not asset transparency.

`src/mascot.js` registers only the real greeting and static idle assets. Unprovided states resolve to idle. It plays the greeting once per tab session, handles rejected autoplay with an accessible text action, retains the final resting frame, respects reduced motion, and releases listeners and playback on navigation.

`mascot.webp` is a retained legacy illustration from the previous redesign and is no longer imported or included in the application build. There are no invented thinking, success, encouragement or curious video assets.
