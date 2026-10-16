# Detailed interaction motion — 2026-10-16

Extended motion to text/icon/navigation buttons, keyboard activations, field focus, checkbox/select changes, all disclosure contents, mobile menu items, sound activation and running-experiment controls. Range tracks fill from their actual min/max/value; their displayed labels respond to real input. Reset synchronizes the track without changing physics. Text-button effects remain within their bounds without clipping arrow icons. All effects follow reduced motion, including live changes; mascot transforms and simulation calculations are untouched.

Build and standalone export passed, and all 35 individual model/progression tests passed. Eighteen selected motion, keyboard, responsive navigation and circuit cases passed. After final range-label refinements, ten affected motion/navigation/checkpoint cases passed, including the complete 25-task assessment. No full-suite claim is made.

Final production index and standalone HTML were independently exercised over HTTP: speed 4 on the 1–6 slider produced an actual 60% track fill and animated value label, running/paused indicators followed the real experiment state, and distance/time remained consistent within the existing independently rounded one-decimal display precision. Disclosure, volume controls, live reduced-motion cancellation and 390/768/1440 px layouts passed with no observed page errors or transformed mascot/ancestor. The first production assertion was too strict for the existing display rounding and was corrected to its mathematical rounding bound. `git diff --check` passed.

---

# Remove Study navigation item — 2026-10-16

Removed the screenshot's «Ուսում» item from the shared navigation registry, so it is absent from both desktop and mobile menus. The remaining entries are topics, progress and notebook. Build/standalone export and all six navigation/layout browser cases (1920, 1440, 1366, 1024, 768 and 390 px) passed. A direct registry check confirmed the removed entry is absent. `git diff --check` passed. No grading, lesson or student-storage changes were made.

---

# Expanded motion design — 2026-10-16

Added staggered page/section entrances on navigation and scroll, fresh question transitions, animated selections and feedback, progress-fill movement, measurement highlights, tactile press ripples, topic/nav hover responses, a subtle current-lesson ring, slow brand motion and dialog entrances. The mascot and its ancestors are never faded, transformed or scaled by these effects. Simulation calculations, controls, scores and stored data are unchanged. All added effects respect reduced motion, including live preference changes.

Build and standalone export passed. `npm test` passed all ten test files; explicit `node --test --test-isolation=none tests/*.test.js` confirmed all **35 individual checks passed**. Seventeen selected browser cases passed for motion, slow mascot-frame swaps, keyboard access and six device sizes. All six checkpoint cases passed, including full review, immutable scores and reload. After refining topic-screen transition detection, the affected nine desktop/motion cases passed again. This is selected coverage across runs, not a new full-suite claim.

Both final production artifacts were served over HTTP and independently checked for actual topic-entry and press animations, no animated mascot/ancestor, cancellation of effects under reduced motion, 390/768/1440 px layouts and no page errors. `git diff --check` passed. The initial sandbox prevented local server startup; the same browser checks passed once local server/Chromium execution was permitted.

---

# Simplified circuit experiment controls — 2026-10-16

Removed the add-component palette and the entire component/wire inspector from the shared experiment renderer. Selecting or dragging a component or wire does not restore those panels. Existing stored components, wires, junctions, results and notes are retained. Direct terminal connections, component movement, endpoint dragging, switch, last-wire undo, reset and measurement remain. Keyboard endpoint reconnection now works directly: Enter on the endpoint, then activate the target terminal. Lesson instructions and hints no longer refer to removed settings.

**35 Node tests passed; build and standalone export passed.** The first selected 12-case browser run had 11 passes and one timeout: its pointer click targeted a terminal covered by the deliberately selected endpoint handle. That scenario now uses the actual supported keyboard terminal interaction. The final nine circuit/accessibility cases passed, including that corrected scenario, real electrical power, mouse/touch endpoint disconnection and reconnection, refresh persistence, and 390/768/1440 px layouts. The earlier passing cases also covered complete foundation lessons, meter readings and recovery of stored circuits missing components.

Both final production artifacts were independently served over HTTP. Removed panels remained absent after selection, measurement and refresh; actual lamp power was 4.05 W, then zero after disconnection, then restored after direct keyboard reconnection. Measurement and notebook retention, reset and all three widths passed with no observed page errors. The production screenshot was inspected. `git diff --check` passed. The unrelated full browser suite was not rerun for this interface removal.

---

# Checkpoint and answer-feedback verification — 2026-10-16

**35 Node tests passed.** All 117 registered Chromium scenarios have passing coverage across the broad run and final targeted run; this is not a claim of a single uninterrupted 117-pass run. The first broad run had 114 passes and three failures: a faulty RC substring assertion matched the final digit of a valid 3.2925 V reading, a guidance test incorrectly expected a success pose for a hint, and the new assessment initially used an idle rather than thinking pose. Those were corrected. The next broad run had 116 passes and one timeout in the deliberately worst-case 75-question/feedback review scenario under concurrent browser load. That case now has an explicit 180-second allowance and reduced motion for queue/scoring verification; normal-motion behavior remains covered separately. The final affected 15-case run passed, including that entire bounded review scenario, all checkpoint scenarios, sound controls and thinking/robot regressions.

New checks cover all 25 checkpoint tasks, incorrect and correct feedback that waits for Continue, reload during submitted feedback, no answer preselection during review, two-attempt bounds, exact star boundaries, actual simulation state, immutable original scoring, concept results and practice, notebook retention, monotonic best grades, historical access, additive/idempotent progression migration, retained in-flight legacy assessment responses and full reassessment. Every existing investigation is completed through the shared assessment flow; original circuit foundations and motion/notebook behavior remain covered. Text accepted-answer normalization and explicit numerical tolerance are independently tested.

`npm run export:standalone` passed. Final `index.html` and self-contained `physics-app.html` were independently served over HTTP and exercised for incorrect/correct feedback, refresh retention, the real quarter-force result at 2 m, sound activation/mute retaining volume, and 390/768/1440 px layouts. Both had zero observed page/console errors, HTTP failures and external runtime requests. Desktop/mobile screenshots were visually inspected; that inspection found a missing audio-settings icon, which was corrected and checked in the final targeted browser and production checks. `git diff --check` passed. No lint/typecheck scripts exist.

See [implementation, grading, migration and limitations](docs/assessment-and-checkpoint.md). Existing stored grades are not recalculated; new attempts use the explicitly requested 50/70/90% thresholds. The E07 sources lesson retains its ID, code and URL. The new checkpoint is a separate activity. This does not claim that additional unit-final exams have been authored or that a full accessibility audit was performed. Public Pages HTTP verification was blocked by the environment proxy with CONNECT 403; branch publication is verified separately using Git.

---

# Latest guided-learning upgrade — 2026-10-15

**30 Node checks passed.** All 111 registered browser cases have passing coverage across the broad run and targeted corrections; this is **not** a claim of one uninterrupted 111-pass run. The broad run produced 104 passes and seven failures: six desktop scenarios still expected the topic grid before choosing “all topics”, and a guidance scenario had not answered the new exit dialog. Updated scenarios deliberately choose Leave or Stay as appropriate, without bypassing production confirmation. The next 26-case run had 25 passes and exposed one actual regression: progress feedback was reading the cleared active motion attempt. Progress now reads the archived completed result when the active attempt is fresh. The final affected 18-case run passed, including guidance, original motion/notebook behavior, native/internal exit, and the full new charge investigation. The corrected six desktop cases passed in the 26-case run.

## New behavior actually checked

- A new visit opens the selected learning path with a working next-lesson action. Internal leave/stay, Escape focus return and hash navigation are exercised. Chromium's real native before-unload prompt is both dismissed and accepted. Leaving and returning starts a new attempt while retaining permanent results and notes. Confirmed ordinary refresh preserves the current attempt.
- The entire first charge lesson is completed with both attraction and repulsion measurements, guided observation, progressive hints, a fixed-charge distance comparison, matching, written reasoning and the three weighted assessment questions. Three stars and an associated notebook entry are saved. Reopening after exit starts at the introduction while retaining those results.
- Distance ×2 produces force ×0.25 from the independent SI model. Changed charges are explicitly identified as a second changed condition and do not satisfy the fixed-charge variation step. Zero reference force has no invented ratio. Presets, distance controls, pinning, direct keyboard movement, reset, units and graph axes are tested. Responsive checks cover 1440, 768 and 390 px; the desktop route suite also covers 1920, 1366 and 1024 px.
- Cold and delayed-video loads are sampled frame by frame at desktop/mobile sizes. Once the robot is first visible, each sampled frame has exactly one drawable, fully opaque robot layer through stage changes, wrong-answer reaction and return to thinking. First presented frames replace held transparent frames atomically. Reduced motion, revisited reactions, alpha, video/image fallback, greeting, floor registration, loop continuity and sound controls retain passing coverage.

`npm run export:standalone` succeeded. Both final production artifacts were served over HTTP and independently exercised for path entry, actual charge presets and quarter-force comparison, leave/stay, fresh reentry and 1440/768/390 px layouts. No page errors or external runtime requests were observed. Desktop and mobile screenshots were inspected for Armenian text and the new experiment layout. `git diff --check` passed. No repository lint/typecheck script exists.

See [implementation, interaction policy and limitations](docs/guided-charge-redesign.md). Native close prompts remain browser-controlled and require user activation; mobile/forced application closure cannot always show them. This is not a complete WCAG audit, a manual screen-reader test, or a redesign of every physics simulation. GitHub publication and public Pages HTTP availability remain separate checks.

---

# Previous blueprint priority verification — 2026-10-15

**27 Node tests passed.** The broad Chromium run executed all 101 registered browser cases: **100 passed and one was interrupted** when an application edit triggered a Vite page reload during the cell-assembly case. Its snapshot returned to the introduction because the fixture initializes storage on every load. After freezing application edits, **14 focused cases passed**, including that complete cell investigation, the five new accessibility cases, all four circuit-integrity cases, the full original motion/notebook flow, retained best mastery, reset/skip-link behavior and robot decoder continuity. This is coverage across a broad run and final focused reruns, not a claim that all 101 passed in one uninterrupted run.

New verification exercises a complete first charge investigation with Tab, Enter, arrow keys and keyboard text input only; selected-answer and stage-transition focus; repeated SVG component movement without refocusing; keyboard wire-end disconnection/reconnection and resulting real lamp power; four requested circuit hints, local reload persistence and restart on changed electrical evidence. Basic text contrast (at least 4.5:1), selected-answer focus contrast (at least 3:1), focus visibility and no document overflow were checked at 1440, 768 and 390 pixels.

`npm run export:standalone` succeeded. Both final production artifacts (`index.html` and `physics-app.html`, approximately 29.3 MB) were independently served over HTTP and exercised: connected lamp → disconnected free end → reconnected lamp, actual power 4.05 W → 0 W → 4.05 W, saved hints after reload, and the same three viewport widths. No page errors, failed runtime requests or external runtime asset requests were observed. Desktop/mobile circuit screenshots were inspected. `git diff --check` passed. There is no repository lint/typecheck script.

See [the blueprint comparison, implementation and remaining gaps](docs/blueprint-gap-review.md). This is not a complete WCAG audit or a manual screen-reader test. Other lessons have not all been individually completed exclusively with the keyboard. Scoring, progression policy and existing saved results remain unchanged; no new lesson or external analytics service was added. Public GitHub Pages HTTP reachability remains unverified from this network; Git branch publication is a separate operation.

---

# Previous desktop and circuit verification

Previous redesign: **25 Node tests passed; 95 browser tests passed in one full run, followed by six focused final checks**, including a new real-touch wire-end case. The registry now contains 96 browser cases; this is not a claim of a single 96-case run. Both production and standalone artifacts were independently exercised over HTTP, at the six requested sizes, with connected/open/disconnected lamp behavior and reload persistence. No external asset requests or runtime errors were observed.

See [the current diagnosis, changed-file map, complete verification and remaining model limits](docs/desktop-and-circuit-redesign.md). No new lesson was added in this redesign. There is no separate repository lint/typecheck script.

The report below records the preceding curriculum expansion, and its historical test counts are retained for context.

# Verification of the electricity learning expansion

The application was exercised in Chromium using `/usr/bin/chromium`, with real browser state, pointer/keyboard controls and local persistence. Tests do not assert textbook alignment.

- `npm test`: 16 independent Node tests passed. These include the three uniform-motion reference cases, Ohm/series/parallel references, MNA branch ammeters and node voltmeters, polarity, floating probes, source/ammeter shorts, LED/RC, Daniell reactions and 1.10 V model, force/friction references, pendulum energy and scoring. A registry/progression test checks every E01–E46 lesson against an actual engine and advances through all 47 electrical lessons, unlocking only the immediate successor at two stars.
- Full browser regression: 85 tests passed in one command (8.0 minutes). After the final visual refinements (force direction arrowheads, collapsed model assumptions, concise path wording) and disabled controls for removed circuit elements, 9 focused browser tests passed (37.1 seconds), including a new removed/re-added contact case and the final E46 next-topic action. The current registry contains 86 browser tests; this is not a claim that all 86 ran together in one command. The final Node suite was rerun: 16 passed, zero failed.
- The expansion browser cases complete every one of the 43 shared-engine investigations, recording two distinct experimental settings, answering the guided activities and all three weighted final questions, and checking three stars, notebook association and absence of page errors. The seven circuit foundation lessons are exercised separately with actual wiring and measurement.
- Additional browser checks exercise 0/1/2/3-star behavior, weaker retries preserving best mastery, locked URLs, reload, old completed-result and notebook migration, robot element/decoder continuity, sound controls, reduced motion, wire drag/snapping, keyboard movement, real touch charge dragging and a subsequent tap, circuit value editing/rotation/wire removal, removed/restored sources, pause/resume/reset and graph synchronization. Synthetic mobile gestures are separated by the browser's gesture-settling interval rather than assuming a tap during its preceding double-tap window emits a click.
- Production `index.html` and the 29.2 MB self-contained `physics-app.html` were served over local HTTP. A charge investigation was opened, its actual charge slider changed, a measurement recorded, and the page reloaded. The saved measurement remained. At 320, 390, 768 and 1440 pixels there was no horizontal document overflow. Neither artifact emitted console/page errors, failed asset requests, or external runtime asset requests. Desktop path and mobile experiment screenshots were visually inspected for Armenian rendering and mascot background integration.
- `npm run export:standalone` succeeded. It includes local fonts, robot media and opt-in CC0 control sounds. Uploaded videos remain muted and have no music in prepared derivatives. Authentic robot-wheel recordings are not supplied or fabricated.

## Scope and model limits

All E01–E46 entries and retained E14ա are implemented (47 electrical investigations). Forty use the new shared engine; seven use the circuit foundation engine. Three additional shared-engine investigations cover acceleration, Newton's second law and an incline with friction. The original motion, pendulum and sensor lessons retain their existing assessments. Other broad physics topics are explicitly planned, not empty functional lessons. Unexposed model functions tested in Node are foundations for future modules, not complete lessons.

The circuit editor is restricted to one ideal DC source, positive ohmic loads, wires/switches and ideal meters. MNA meter readings follow the actual electrical branch/nodes. Unsupported nonlinear editor components, multiple sources and indeterminate ideal-meter loops are rejected. Dedicated diode/LED/RC/transistor experiments use their separately stated simplified models. Transistors are ideal controlled switches; lamps use fixed resistance and qualitative power-linked brightness; RC uses analytic first-order charge/discharge. Daniell assumes standard Zn/Cu conditions and neglects internal resistance and chemical depletion. Ion/atom illustrations are explicitly schematic.

No textbook section, author, edition, grade, printed page or physical PDF page index was verified. The PDF request was rejected by the environment's network proxy (HTTP 403 at CONNECT), and no local PDF was available. See [the per-lesson source map](docs/electricity-curriculum-map.md): core material is original prerequisite foundation material; E39–E46 is supplementary electronics. No source alignment is invented.

GitHub branch publication and public Pages availability are separate checks. Public HTTP access is rejected by the environment's proxy; Git HTTPS publication is available. Local functional verification does not establish whether GitHub Pages is enabled or publicly reachable. Standalone behavior was verified over HTTP; opening a downloaded file is subject to the user's browser policy. Authentication and cloud synchronization are not implemented.
