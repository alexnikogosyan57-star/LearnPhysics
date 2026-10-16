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

Playwright uses `/usr/bin/chromium`. The browser-test configuration starts Vite automatically and reuses an existing server when available. Tests cover motion references, circuit connectivity and short circuits, LEDs, RC, galvanic cells, pendulum energy conservation, real mastery thresholds, sequential unlocking, retry/best-score persistence, guarded lesson URLs, all seven circuit foundation lessons, notebook persistence, sound, mascot alpha/continuity, keyboard and touch interaction, and responsive layouts. Read the current test output for actual results; no fixed count is implied here.

## Desktop interface and electrical workspace

The page surface is pure white. Desktop uses a stable navigation rail, a readable primary learning region and a lightweight topic-only context column. The context column collapses first; tablet/mobile use an accessible compact menu. Topics have original illustrated tiles, winding tactile lesson nodes, explicit states and real earned SVG stars. Experiments retain their models and place their main action beside the controls. Robot dialogue remains the teaching voice.

The electrical workspace now supports stable wire records with exact terminal geometry, free wire-end disconnection/reconnection and explicit junction creation. It transparently reads old saved wire-pair arrays. Lamp power, instruments and visual contacts follow the same electrical graph. Block and AA battery appearances, bulb contacts, digital meters, LED/diode/capacitor, beakers/electrodes and breadboard artwork share the reference-driven SVG library. See [redesign diagnosis, file map, verification and model limits](docs/desktop-and-circuit-redesign.md).

## Guided entry and charge investigation

The default entry opens the selected learning path with a clear next action. Leaving an unfinished lesson asks for confirmation; confirmed exit and a later return start a fresh attempt while retaining permanent mastery, notebook entries and archived measurements. Browser-controlled tab/external-navigation confirmation respects native restrictions; ordinary confirmed refresh preserves the current attempt.

The first charge investigation now requires both attraction and repulsion measurements before observation. It then isolates distance at fixed charges. Its responsive workspace includes real sign presets, distance controls, a pinned numerical comparison and a Coulomb-derived force-versus-distance graph. Robot pose changes retain the preceding transparent frame until the next media is ready, with no fade of the mascot. See the [implementation and limits](docs/guided-charge-redesign.md).

## Blueprint priority improvements

Lesson rerenders retain keyboard focus; new stages focus the robot's question without interrupting mascot playback. Selected wire endpoints can be disconnected with Delete and reconnected through labelled terminal selectors, with no dragging required. The circuit robot offers four explicitly requested, state-aware hint levels. Hint state persists locally and resets when electrical evidence changes, while ordinary layout movement preserves it. Scoring and saved mastery are unchanged. See the [blueprint comparison and remaining gaps](docs/blueprint-gap-review.md).

## Learning product

Navigation: home, topics, progress, research notebook. Simulations are embedded in lessons. Ten illustrated topic categories lead to centered vertical paths. Broad topics are independently selectable; within each topic, lessons require at least two stars on the immediate predecessor. The first playable lesson in each topic is available. Planned lessons are explicitly identified and cannot be opened. Previously started investigations remain accessible during migration.

The Electricity & Electronics path implements all requested E01–E46 entries in seven units, plus the retained E14ա circuit-parts investigation: 47 original lessons plus the separate 25-task first-unit checkpoint. Forty electrical investigations use the shared scientific learning engine; seven circuit foundations use the existing upgraded circuit investigation engine. Each has context, an ungraded prediction, experiments, guided observation, progressive hints, evidence-based explanation, a second experiment, application, a published rubric, three weighted assessment questions and saved results. The shared engine additionally supports numerical answers, matching, and ungraded written reasoning. Each changed-condition experiment requires a genuinely changed setting. Scores out of ten map to 0–3 stars at 50%, 70% and 90% for new attempts; previously stored grades are retained. Replays retain the best score and previous notebook entries.

The supplied textbook PDF could not be retrieved (the network proxy rejected the request). No title, author, grade, section or page alignment has been verified. The per-lesson [curriculum map](docs/electricity-curriculum-map.md) explicitly marks this: core lessons are independent prerequisite foundations, E39–E46 are supplementary electronics, and no lesson is labelled textbook-confirmed. These are original Armenian learning materials, not a claim of official Grade 9 curriculum alignment.

The shared investigation engine also adds acceleration, Newton's second law, and an incline with friction. Original uniform-motion, pendulum and sensor investigations remain available with their existing depth. Other physics roadmap topics are visibly planned. Additional independent model functions are tested foundations for future lessons, not completed learning modules.

## Architecture and data

- `src/learning/topics.js`: stable topic/lesson IDs, roadmap and original topic illustrations.
- `src/learning/progression.js`: assessment thresholds, attempt history, best mastery, unlock checks and legacy migration.
- `src/learning/foundations-content.js`: Armenian teaching content and weighted assessments for seven circuit foundation lessons.
- `src/learning/foundations.js`: reusable investigation stages and embedded experiments.
- `src/learning/views.js`: topic selection, vertical paths and mastery progress.
- `src/science/content.js`, `electricity-expansion-content.js`: 43 investigations (40 electrical, three mechanics), separately authored content and assessments.
- `src/learning/investigation-engine.js`, `activities.js`: reusable stages, numerical/choice/matching activities and weighted assessment.
- `src/science/models.js`, `experiments.js`: independent SI calculations and experiment configuration.
- `src/science/rendering.js`, `lifecycle.js`, `legacy-adapter.js`: shared rendering, pointer/keyboard input, simulation clock and reuse of existing RC/LED/circuit models.
- `src/electricity/models.js`: independent electrical calculations and modified nodal circuit solver.
- `src/electricity/builder.js`, `art.js`: connected, draggable components and original SVG artwork.
- `src/electricity/journey.js`, `experiments.js`: existing investigation engine and simulation renderers.
- `src/physics.js`, `scene.js`, `labs/pendulum.js`: uniform motion and nonlinear pendulum models/renderers.
- `src/mascot.js`: registered original media, reduced-motion handling and persistent playback controllers.
- `src/storage.js`: `physics-journal-v1` persistence boundary. Existing notes, experiments and previous results are retained. New learning records have their own schema version.

Hash lesson routes (`#lesson/circuits`, etc.) pass through the same access guard as lesson buttons. This is a local educational progression rule, not a security boundary against editing one's own browser storage. Best results and attempts use stable IDs. No cloud synchronization is implemented.

## Models and assets

The wire builder uses actual connectivity, one ideal DC source, constant-resistance loads, zero-burden ammeters and infinite-resistance voltmeters. Ammeters display their actual signed branch current; voltmeters use the actual voltage difference of their terminals. Floating probes display no invented reading. Multiple sources and unsupported nonlinear editor components are explicitly rejected. The editor supports element values, rotation, removal, per-wire removal, drag and terminal snapping. Open circuits have zero steady current; source shorts produce an explicit warning rather than an invented measurement. Lamp brightness follows computed power and is qualitative, not a calibrated lumen model. Copper samples are ideal conductors and plastic/dry wood are ideal insulators in the foundation model; real material behavior depends on conditions. Real incandescent resistance changes with temperature; this simplified model does not. The Daniell apparatus assumes Zn/Zn²⁺ and Cu²⁺/Cu at standard conditions (1.10 V) and a simple external resistive load; ion animations show qualitative transport, not molecular kinetics. Atom clouds are schematic, without classical electron orbits. Transistors are ideal controlled switches, diodes have a stated fixed-drop model, and RC charging/discharging uses the analytic first-order solution. These virtual circuits do not model physical component damage.

Noto Sans Armenian is local (SIL OFL), Lucide icons are ISC. Corridor and electrical illustrations are original SVG. Uploaded robot originals remain unchanged. Prepared clips have real alpha, no audio, constant proportional framing and matching PNG/WebP alternatives. Celebration now uses only the walking segment at 1.75–2.75 seconds: jumping and falling confetti are excluded. The active video element and playback controller stay attached during answer updates, avoiding pause/restart stutter. Reduced motion and media/autoplay fallbacks remain supported. Universal smooth playback on every device is not guaranteed.

Local Kenney CC0 recorded control/interaction effects are opt-in, with volume/mute persistence. Robot videos contain no music. Authentic robot-wheel mechanical recordings were not supplied and are not fabricated. See `src/assets/README.md` for media provenance.

## Publication and standalone artifact

`npm run export:standalone` produces relative-path `dist/` assets and a self-contained `dist/physics-app.html` with local fonts, robot media and sound embedded. It makes no external runtime asset requests. The cloud browser blocks file URLs, so standalone behavior is verified over HTTP; opening a downloaded file depends on the user's browser policy.

Publish `dist/` and `.nojekyll` to `gh-pages`. GitHub Pages should use that branch's root. Expected address: `https://alexnikogosyan57-star.github.io/LearnPhysics/`. Pushing generated files and confirming public Pages availability are separate checks; local success does not verify deployment. The cloud onboarding UI does not expose a supported live preview link.

## Checkpoint and deliberate answer feedback

The first electrical unit ends with a separate in-app 25-task checkpoint (`charge-checkpoint`), preserving the original E07 sources lesson. All assessment engines now separate checking from continuing and use bounded mistake review. Official scores count original responses only; corrections and remaining practice needs are separate. Two official stars unlock the next activity, with historical access preserved. See [the assessment implementation and persistence policy](docs/assessment-and-checkpoint.md).

## Simplified experiment controls

The circuit experiments no longer display the add-component palette or the component/wire configuration panels. Connect terminals, move components and drag wire endpoints directly in the experiment. Keyboard users can disconnect an endpoint with Delete, press Enter on it, then activate the target terminal to reconnect. The switch, last-wire undo, reset and measurement actions remain available. Existing circuit data and electrical calculations are retained.

## Motion design

Pages, topic lists and learning stages enter with short staggered transitions. Choices, feedback, measurements and progress respond to actual student events; navigation, controls and the current lesson have restrained motion. The robot media and physical simulation stay independent of UI effects. Reduced motion disables the added effects and cancels ongoing transitions.

Motion also covers focus, disclosure contents, mobile menus, real slider fills and value changes, checkbox/select choices, sound activation and running-experiment controls. UI indicators derive from actual control state; no independent animated physics values are introduced.
