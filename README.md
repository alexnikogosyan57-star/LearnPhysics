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

The browser tests use the environment's `/usr/bin/chromium`. They cover the full lesson, pause/resume/reset, speed changes, comparisons, progressive hints, assessment, notebook editing/deletion, reload persistence, muted audio controls, console errors, and layouts at 390, 768 and 1440 pixels. Physics tests cover the three requested SI reference cases and graph coordinates.

## Architecture

- `src/content.js`: navigation, lesson questions, feedback and provisional future topic roadmap.
- `src/physics.js`: constant-speed calculations, elapsed-time limits, graph coordinates.
- `src/storage.js`: versioned local persistence boundary.
- `src/scene.js`: original scalable corridor/robot illustration.
- `src/main.js`: application views and interaction lifecycle.
- `src/style.css`: visual system, responsive layouts and reduced-motion support.

Only the first motion module is available. Future topics are explicitly labeled as in preparation. Assessment scores count first attempts; corrections use hints. Animation uses requestAnimationFrame and real elapsed time, with all numeric and visual outputs derived from the same model. Adjusting a slider resets the current run to preserve a constant-speed experiment. Previous completed runs remain available for comparison.

## Assets and limitations

Noto Sans Armenian is bundled locally via Fontsource (SIL Open Font License, included in the package). Lucide icons use the ISC license. Corridor artwork is original SVG. No external runtime asset URLs are needed.

Authentic licensed mechanical recordings are not supplied; the sound settings explicitly explain this and the app stays silent. Volume preferences are retained for a future recorded-audio layer. There is no synthesized placeholder sound.

Onboarding has no supported user-facing preview tool; the server is running for an available product preview surface, but publication and a fresh-task restore must be performed separately in environment settings.
