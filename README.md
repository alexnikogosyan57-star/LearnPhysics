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

The browser tests use the environment's `/usr/bin/chromium`. Six browser tests cover the complete lesson with one observation at a time, pause/resume/reset, all three requested motion cases, live graph synchronization and selected comparisons, progressive hints, assessment, notebook editing/deletion, legacy data preservation, reload persistence, muted audio controls, reduced motion, missing assets, console errors, and layouts at 390, 768 and 1440 pixels. Physics tests cover the three requested SI reference cases and graph coordinates.

## Architecture

- `src/content.js`: navigation, lesson questions, feedback and provisional future topic roadmap.
- `src/physics.js`: constant-speed calculations, elapsed-time limits, graph coordinates.
- `src/storage.js`: versioned local persistence boundary.
- `src/scene.js`: original scalable corridor/robot illustration.
- `src/main.js`: application views and interaction lifecycle.
- `src/style.css`: visual system, responsive layouts and reduced-motion support.

Only the first motion module is available. Future topics are explicitly labeled as in preparation. Assessment scores count first attempts; corrections use hints. Animation uses requestAnimationFrame and real elapsed time, with all numeric and visual outputs derived from the same model. Adjusting a slider resets the current run to preserve a constant-speed experiment. Previous completed runs remain available for comparison.

## Assets and limitations

Noto Sans Armenian is bundled locally via Fontsource (SIL Open Font License, included in the package). Lucide icons use the ISC license. Corridor artwork and the moving delivery robot are original SVG. The companion is a transparent WebP generated from the supplied mascot reference. It uses restrained whole-image entrance animation, not articulated limbs or a 3D rig. Only the icons used by the interface are bundled. No external runtime asset URLs are needed.

Authentic licensed mechanical recordings are not supplied; the sound settings explicitly explain this and the app stays silent. Volume preferences are retained for a future recorded-audio layer. There is no synthesized placeholder sound.

Onboarding has no supported user-facing preview tool; the server is running for an available product preview surface, but publication and a fresh-task restore must be performed separately in environment settings.

## Redesign and publication

The centered app uses a compact header and a mobile navigation menu. The home page has one lesson action. The laboratory keeps the scene and controls in focus; the live graph and run table expand on demand. Graph axes adapt to the duration and distance of the current and selected comparison runs. Observation questions appear one at a time. Existing `physics-journal-v1` data remains compatible.

Build the GitHub Pages and offline versions:

```sh
npm run export:standalone
```

This writes the relative-path site and `dist/physics-app.html`, including the mascot and Armenian fonts as embedded assets. The single HTML file needs no separate asset files. Browser policy in this cloud environment blocks `file://` navigation, so the standalone artifact is tested over local HTTP with no external asset requests. Downloaded-file opening on a user's device depends on their browser policy.

Publish the contents of `dist/` plus `.nojekyll` to the `gh-pages` branch. In the repository's Settings → Pages, choose Deploy from a branch → gh-pages → / (root). GitHub Pages activation is separate from pushing the branch. The expected site address is `https://alexnikogosyan57-star.github.io/LearnPhysics/`; public deployment is not confirmed by a local build.
