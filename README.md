# Ֆիզիկան շուրջդ է

An Armenian, robot-led physics learning app built with vanilla JavaScript and Vite. Student data stays in the browser, without accounts or backend services.

## Run and verify

Node.js 24 / npm 11 are used in the cloud workspace.

```sh
cd /workspace/LearnPhysics
npm ci --cache /tmp/physics-npm-cache --no-audit --no-fund
npm run dev -- --port 5173
```

```sh
npm test
npx playwright test
npm run export:standalone
```

Playwright uses `/usr/bin/chromium`. Start Vite before browser tests. Tests cover motion references, circuit connectivity and short circuits, LEDs, RC, galvanic cells, pendulum energy conservation, real mastery thresholds, sequential unlocking, retry/best-score persistence, guarded lesson URLs, all five foundation lessons, notebook persistence, sound, mascot alpha/continuity, keyboard and touch interaction, and responsive layouts. Read the current test output for actual results; no fixed count is implied here.

## Learning product

Navigation: home, topics, progress, research notebook. Simulations are embedded in lessons. Ten illustrated topic categories lead to centered vertical paths. Broad topics are independently selectable; within each topic, lessons require at least two stars on the immediate predecessor. The first playable lesson in each topic is available. Planned lessons are explicitly identified and cannot be opened. Previously started investigations remain accessible during migration.

The first five Electricity lessons are complete investigations: context, ungraded prediction, first experiment, guided observation with progressive hints, explanation tied to evidence, second experiment, comparison, published assessment rubric, three weighted questions, and a dedicated result/next-step screen. Scores out of ten map to 0–3 stars at 40%, 70% and 90%. Replays retain the best score and previous notebook entries. A lower-scoring current attempt offers retry; previously unlocked lessons remain accessible through the path.

Motion retains its complete original investigation and three-question assessment. Other existing investigations (Ohm, galvanic cell, connections, electronics, power, sensors and pendulum) remain available when unlocked or previously started. These are shorter introductions with one application question; their published rubric awards 3 stars for a correct first application answer and 0 otherwise. They have not been expanded to the foundation lessons' depth. Later electricity roadmap entries remain planned, rather than pretending all 28 lessons are complete.

## Architecture and data

- `src/learning/topics.js`: stable topic/lesson IDs, roadmap and original topic illustrations.
- `src/learning/progression.js`: assessment thresholds, attempt history, best mastery, unlock checks and legacy migration.
- `src/learning/foundations-content.js`: Armenian teaching content and weighted assessments for the first five electricity lessons.
- `src/learning/foundations.js`: reusable investigation stages and embedded experiments.
- `src/learning/views.js`: topic selection, vertical paths and mastery progress.
- `src/electricity/models.js`: independent electrical calculations and nodal circuit solver.
- `src/electricity/builder.js`, `art.js`: connected, draggable components and original SVG artwork.
- `src/electricity/journey.js`, `experiments.js`: existing investigation engine and simulation renderers.
- `src/physics.js`, `scene.js`, `labs/pendulum.js`: uniform motion and nonlinear pendulum models/renderers.
- `src/mascot.js`: registered original media, reduced-motion handling and persistent playback controllers.
- `src/storage.js`: `physics-journal-v1` persistence boundary. Existing notes, experiments and previous results are retained. New learning records have their own schema version.

Hash lesson routes (`#lesson/circuits`, etc.) pass through the same access guard as lesson buttons. This is a local educational progression rule, not a security boundary against editing one's own browser storage. Best results and attempts use stable IDs. No cloud synchronization is implemented.

## Models and assets

The wire builder uses actual connectivity, an ideal DC source and constant-resistance loads. Open circuits have zero steady current; source shorts produce an explicit warning rather than an invented measurement. Lamp brightness follows computed power. Copper samples are ideal conductors and plastic/dry wood are ideal insulators in the foundation model; real material behavior depends on conditions. Real incandescent resistance changes with temperature; this simplified model does not.

Noto Sans Armenian is local (SIL OFL), Lucide icons are ISC. Corridor and electrical illustrations are original SVG. Uploaded robot originals remain unchanged. Prepared clips have real alpha, no audio, constant proportional framing and matching PNG/WebP alternatives. Celebration now uses only the walking segment at 1.75–2.75 seconds: jumping and falling confetti are excluded. The active video element and playback controller stay attached during answer updates, avoiding pause/restart stutter. Reduced motion and media/autoplay fallbacks remain supported. Universal smooth playback on every device is not guaranteed.

Local Kenney CC0 recorded control/interaction effects are opt-in, with volume/mute persistence. Robot videos contain no music. Authentic robot-wheel mechanical recordings were not supplied and are not fabricated. See `src/assets/README.md` for media provenance.

## Publication and standalone artifact

`npm run export:standalone` produces relative-path `dist/` assets and a self-contained `dist/physics-app.html` with local fonts, robot media and sound embedded. It makes no external runtime asset requests. The cloud browser blocks file URLs, so standalone behavior is verified over HTTP; opening a downloaded file depends on the user's browser policy.

Publish `dist/` and `.nojekyll` to `gh-pages`. GitHub Pages should use that branch's root. Expected address: `https://alexnikogosyan57-star.github.io/LearnPhysics/`. Pushing generated files and confirming public Pages availability are separate checks; local success does not verify deployment. The cloud onboarding UI does not expose a supported live preview link.
