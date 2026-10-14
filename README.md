# Ֆիզիկան շուրջդ է

Armenian-language physics investigation app. Node.js 24 and npm 11 are available in the cloud environment.

## Development

```sh
cd /workspace/LearnPhysics
npm ci --cache /tmp/physics-npm-cache --no-audit --no-fund
npm run dev -- --port 5173
```

The development server binds to all interfaces. No credentials or backend services are required. Data is stored per browser origin in localStorage; it is not synchronized between devices.

## Validation

```sh
npm test
npm run build
npx playwright test
```

The browser tests use the environment's `/usr/bin/chromium`. Eighteen browser tests cover the complete lesson with one observation at a time, pause/resume/reset, all three requested motion cases, live graph synchronization and selected comparisons, progressive hints, assessment, notebook editing/deletion, legacy data preservation, reload persistence, muted audio controls, reduced motion, missing assets, console errors, and layouts at 390, 768 and 1440 pixels. Physics tests cover the three requested SI reference cases and graph coordinates.

## Architecture

- `src/content.js`: navigation, lesson questions, feedback and provisional future topic roadmap.
- `src/physics.js`: constant-speed calculations, elapsed-time limits, graph coordinates.
- `src/storage.js`: versioned local persistence boundary.
- `src/scene.js`: original scalable corridor/robot illustration.
- `src/main.js`: application views and interaction lifecycle.
- `src/style.css`: visual system, responsive layouts and reduced-motion support.

Only the first motion module is available. Future topics are explicitly labeled as in preparation. Assessment scores count first attempts; corrections use hints. Animation uses requestAnimationFrame and real elapsed time, with all numeric and visual outputs derived from the same model. Adjusting a slider resets the current run to preserve a constant-speed experiment. Previous completed runs remain available for comparison.

## Assets and limitations

Noto Sans Armenian is bundled locally via Fontsource (SIL Open Font License, included in the package). Lucide icons use the ISC license. Corridor artwork and the moving delivery robot are original SVG. The companion uses transparent derivatives of the user-provided videos. The original uploads remain intact; their baked backgrounds are removed in prepared alpha assets. Greeting playback is muted and plays on each fresh page entry, with reduced-motion and media fallbacks. No missing emotional-state videos are fabricated. Only the icons used by the interface are bundled. No external runtime asset URLs are needed.

Authentic licensed mechanical recordings are not supplied; the sound settings explicitly explain this and the app stays silent. Volume preferences are retained for a future recorded-audio layer. There is no synthesized placeholder sound.

Onboarding has no supported user-facing preview tool; the server is running for an available product preview surface, but publication and a fresh-task restore must be performed separately in environment settings.

## Redesign and publication

The centered app uses a compact header and a mobile navigation menu. The home page has one lesson action. The laboratory keeps the scene and controls in focus; the live graph and run table expand on demand. Graph axes adapt to the duration and distance of the current and selected comparison runs. Observation questions appear one at a time. Existing `physics-journal-v1` data remains compatible.

Build the GitHub Pages and offline versions:

```sh
npm run export:standalone
```

This writes the relative-path site and `dist/physics-app.html`, including the transparent greeting/thinking clips, greeting animated-image fallback, poster frames and Armenian fonts as embedded assets. The single HTML file needs no separate asset files. Browser policy in this cloud environment blocks `file://` navigation, so the standalone artifact is tested over local HTTP with no external asset requests. Downloaded-file opening on a user's device depends on their browser policy.

Publish the contents of `dist/` plus `.nojekyll` to the `gh-pages` branch. In the repository's Settings → Pages, choose Deploy from a branch → gh-pages → / (root). GitHub Pages activation is separate from pushing the branch. The expected site address is `https://alexnikogosyan57-star.github.io/LearnPhysics/`; public deployment is not confirmed by a local build.

## Animated companion

`src/mascot.js` is a reusable asset registry, renderer and playback controller. Real application navigation mounts and disposes it. Greeting playback is remembered only in page memory: opening or reloading the page greets again, while returning from a section during that visit does not replay it. Reduced motion displays a still without requesting the video. An autoplay rejection exposes a keyboard-accessible text action, while media failure keeps the still visible. An ended clip transitions only after the final still has decoded. The fixed 9:16 media footprint prevents layout shifts. Later neutral footage supplies continuous presence after short gestures (see below).

The original MP4 is approximately 2 MB and remains byte-for-byte unchanged. No video player controls, looping, audible playback, picture-in-picture or other unprovided emotional animations are introduced. Five additional browser tests verify desktop/mobile decoding, one-time playback, ending and layout stability, same-session revisits/reload, reduced motion, blocked autoplay and network failure.

### Thinking state

The provided thinking clip appears in prediction, guided observation, assessment and explicit hint sections. The registry uses the real thinking source rather than reusing the greeting. Thinking playback stays muted and loops continuously while a thinking section is visible. The live video element is preserved across answer/hint renders, so selections do not restart it. The poster is hidden during playback, preventing a second robot underneath transparent video. A small companion remains separate from simulations and measurements. The source has a baked checkerboard, not a transparent background. Four thinking tests verify playback beyond a full loop, hidden posters, live decoder preservation through answers/hints, mobile sizing, reduced-motion pause/resume and media failure.

### Transparent thinking animation and interface motion

The thinking video is now a VP9 WebM with a real alpha channel, derived frame by frame from the original MP4. Transparent PNG frames are used only before loading or as reduced-motion/error fallbacks, preventing checkerboard backgrounds. Its 8-second timing and 24 fps motion remain unchanged; the prepared web asset is 432 × 768 for the small UI footprint. The original upload remains intact. If the browser decodes the video without alpha support, the controller retains the transparent still rather than displaying a black rectangle. `scripts/remove-thinking-background.py` documents the one-time derivation using ffmpeg, NumPy and SciPy; these tools are not needed to run the website or normal builds.

`src/motion.js` uses short Web Animations API transitions for view entry, answer selection, feedback, expanded analysis, menu opening, saved notes and experiment completion. Re-rendering an answer does not replay the whole screen. Reduced motion disables transitions and cancels active animations. Wheel spokes rotate from the same traveled distance as the robot and freeze on pause; their incidental rotation is disabled for reduced motion. Three browser checks cover real video/poster alpha, event-driven transitions, wheel pause/reset and reduced motion.

### Smoother active thinking loop

The displayed thinking animation discards the inactive opening and return-to-rest tail, using the original active footage from 2.42–5.75 seconds. `scripts/smooth-thinking-loop.py` resamples that section forward and backward with cosine timing, easing direction changes at both ends. It interpolates only adjacent frames in premultiplied alpha space to preserve clean edges; it does not crossfade distant poses or introduce a second robot layer. The result remains 8 seconds at 24 fps with real alpha and continuous playback. First/final fallback images match the active loop.

To reproduce the prepared assets, run `python3 scripts/remove-thinking-background.py` followed by `python3 scripts/smooth-thinking-loop.py`. The intermediate `thinking-transparent-base.webm` is ignored; the original MP4 remains unchanged. The generator checks that the last-to-first frame difference is below the median adjacent-frame difference. This is a continuity check, not a substitute for visual review.

### Clean greeting on every page entry

The greeting is a real-alpha 432 × 768 WebM, derived from the original footage with its inactive first 0.5 seconds trimmed. It plays for 5.5 seconds without audio and holds the final transparent pose. The home section has no beige backdrop wash. A once-playing transparent animated WebP of the same 132 frames is used when video/alpha decoding fails, so compatible browsers can still show the greeting. Reduced motion keeps a transparent still. The static poster and native video poster do not sit underneath moving frames.

`scripts/prepare-greeting-animation.py` is one-time asset tooling using rembg's checksum-verified official U2Net model, OpenCV and ffmpeg. For reproduction, install `rembg[cpu]==2.0.85` and OpenCV into a tooling environment and run the script. No model or Python dependency is needed in the deployed app. The source robot pixels are retained; segmentation changes only alpha, with small-gap protection for the ivory forehead plate. Browser checks verify page-entry/reload playback, no replay on ordinary in-page navigation, transparent corners, body opacity and a genuinely moving image fallback.

### Guidance, success and optional sound

The two supplied pointing clips have distinct placements: point-left points
from the right of the introductory prediction action; point-right sits left of
the experiment start/pause controls. Supplied success-answer plays after correct
assessment responses, while success-complete appears on the finished lesson.
Thinking remains continuous in questions/hints and accompanies the explanation.
Home keeps the existing wave followed by idle. Gestures do not cover controls,
readings or graph axes; reduced motion uses the matching transparent PNG.

`src/audio.js` provides two local, unmodified Kenney CC0 tactile effects. Explicit
activation is required on each page load, even when a preference was saved.
Start/pause and stage changes use a short control effect; experiment completion,
correct assessment answers and lesson journal saves use a subdued completion
effect. Sliders and ordinary navigation are silent. Volume/mute persist; hidden
tabs and mute stop playback. No video soundtrack, music, synthesized oscillator
or external media request. Exact source revision and licensing accompany assets.

The two later neutral videos now provide real quiet presence: primary after the
home greeting and short instruction/success gestures, secondary in progress.
They breathe/blink/tilt from the supplied footage, with six-second eased loops,
not an infinite static final picture. A 0.7-second final-pose hold followed by a
short fade eases the handoff without stacking an image under the moving video.
Generate them with `prepare-guidance-animations.py idle-primary idle-secondary`,
then `smooth-idle-loops.py` using the same one-time Python tooling. Their actual
animated WebP alternatives loop too. Accessibility stills remain intentional.

### Simple practice and two new reactions

The lesson now has a compact title, six-step progress bar driven by actual stage
completion, tactile answer states, and one consistent action dock (fixed within
reach on mobile). It retains the original palette and scientific investigation,
with no XP, streak counters or imitation of another product's branding.

The supplied eureka clip uses 1.75–3.75 seconds: introductory thinking is removed,
while its actual golden bulb/rays are preserved by the matte. It accompanies the
first correct application answer and explicitly revealed hints. The supplied
head-scratching clip uses 0.75–3.25 seconds after incorrect observation/application
answers. Both are truly transparent, music-free, finish on their own pose briefly,
then return to continuously thinking. Feedback remains supportive and explains
reasoning. The other two success clips still mark later correct answers and the
completed investigation.

## Guided product redesign and verified electricity introductions

Home is now a single welcome, current lesson and primary action. Detailed stats
and notes live in their dedicated sections. `dialogue.js` is the common robot
speaker component: the question and response belong to the robot, with student
controls below. All choice-based observations now require deliberate submission.

The first motion investigation is retained. Nine new short investigations use
`electricity/journey.js`: pendulum, circuit fundamentals, Ohm's law, Daniell cell,
series/parallel resistors, component explorer, LED project, DC power/energy and
sensor control. Each has context, prediction, actual interaction, observation,
evidence/formula, numerical transfer and saved reflection. These are introductory
investigations, not claims to have completed every lesson in a full curriculum.
The remaining mechanics/optics/magnetism/wave topics are explicitly planned with
scientific questions and intended experiments, not empty functional buttons.

`electricity/models.js` is independent of rendering. The circuit builder uses
components, two terminals per component and wire edges. Union-find collapses
ideal wires/closed switches; nodal analysis solves positive resistive loads with
an ideal 9 V source. Floating loads carry no current; open paths, source shorts
and unsupported/singular cases have explicit states. Lamp color depends on
computed dissipated power. Clicking two terminals, dragging between terminals,
keyboard activation and dragging components all affect this graph. The builder
supports resistive DC circuits; semiconductor/time-dependent models remain in
separate clearly specified experiments. No general SPICE capability is claimed.

The Daniell exhibit uses ZnSO4/CuSO4, inert salt bridge, Zn oxidation/Cu reduction,
standard reduction potentials -0.76/+0.34 V at 298 K and unit ion activities. The
1.10 V value is standard open-circuit EMF. The external wire illustration includes
an ideal resistive load; arrows show direction qualitatively, never literal drift
speed. Ion balancing is distinguished from external electron conduction. The
source reference is available in the optional model notes.

The pendulum uses fixed-small-step RK4 for the nonlinear equation. Its displayed
period uses elliptic-integral quadrature; the small-angle formula is labeled as
an approximation. Dragging and keyboard alternatives choose the release angle.
No friction is assumed. Pause/resume/reset use the same evolving physical state.

LED/diode, RC, ideal switching transistor, grouped breadboard and sensor examples
are restricted introductory models. LED protection is virtual, red LED Vf=2 V,
20 mA nominal limit. The project does not encourage real mains or source shorts.

### Consistent mascot framing

`normalize-mascot-framing.py` must run LAST after original matting/loop scripts.
It finds body anchors independently of raised hands/antennas/light bulbs and uses
ONE constant uniform scale + translation per clip. The common body-height
reference is 500 px, feet baseline 720 px and body center 216 px on a 432x768 alpha
canvas. No proportions, colors or recorded gestures are changed. PNG and genuine
animated WebP fallbacks use the same framing. `mascot-framing.json` records the
transforms. Dialogue has a fixed speaker slot aligned to its top, so changing
message length, thinking/Eureka/encouragement states or decoder format cannot
move or resize the media rectangle. The uploaded dance is trimmed to 1.5–4.5s,
background/audio removed, shown once at meaningful lesson completion, then idle.
