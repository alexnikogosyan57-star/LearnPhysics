# Desktop interface and circuit consistency redesign

## Scope

Presentation and circuit correctness only: no lesson was added, no score or unlock threshold was changed, and no new navigation destination or backend was introduced. Existing robot media, local fonts/audio, notebook records, old wire-pair arrays and lesson IDs remain supported.

The supplied electronics sheet was visible in the conversation and used as an art-direction reference. It is not displayed as a single simulation image. Individual SVG layers are code-generated and receive real model values. The earlier text referred to a faulty-circuit screenshot and other UI screenshots that were not attached to those messages; the exact original faulty scene therefore cannot be claimed as reproduced.

## Diagnosis and correction

The existing modified nodal solver already produced zero lamp current for missing leads, a missing return and an open switch. We did not find evidence that it illuminated a topologically disconnected lamp in those supported cases. The visual inconsistency was reproducible in the source: a generic horizontal lead drawing ended at the sides of the bulb and battery while their depicted physical contacts were elsewhere. The bulb's filament, base and two external sockets did not form a legible connected visual assembly. This is corrected with dedicated lead geometry to the lamp shell/center contact and battery snap contacts, retaining explicit independent terminal identities.

Additional issues found and corrected:

- Unknown endpoints were silently ignored, and duplicate component identities were not rejected. These now return an invalid configuration, with no invented power/readings.
- An arbitrarily small nonzero source current was classified as an open circuit by a fixed numeric threshold. Closed/open status now follows the conducting graph, independently of the displayed magnitude.
- Load power was separately reconstructed in the renderer. The solver now returns `powers` and `voltageDrops`; lamp rendering consumes calculated power only for valid solutions.
- Unrepresentable overflow could reach readings despite finite input values. Unsupported nonfinite solutions are rejected.
- Fixed meter scenes had separate hand-drawn routing. They now render the exact wire identities from the same `meterTopology` used by MNA, with dedicated legible routes and explicit shared-terminal dots.
- Native resistor illustrations used default resistance bands alongside a different live numeric label. Artwork now receives the actual resistance; unsupported color-band encodings use numeric labels.

## Circuit architecture and behavior

- `src/electricity/connectivity.js`: legacy pair compatibility, stable wire identities, explicit junctions, free endpoints and junction merging.
- `src/electricity/geometry.js`: local terminal coordinates, rotation-aware transforms, exact endpoints and snap targets; visual crossings alone never create connectivity.
- `src/electricity/models.js`: existing educational MNA subset retained; explicit nodes, signed branch currents, meter potential differences, load voltage/power and invalid-state guards.
- `src/electricity/builder.js`: selection, connected drag, wire-end drag/disconnection/reconnection, per-wire removal, explicit junction creation/removal, component values, AA/block battery presentation, switch operation and persistent model state. Wire endpoint edits are saved by the existing lesson boundary. The existing last-wire undo remains; this is not a general action history.
- `src/electricity/feedback.js`: focused diagnostic replies moved into the existing robot dialogue, based on actual lamp power and graph state.
- `src/electricity/art.js`, `lab-art.js`: reusable block/AA batteries, on/off lamp, resistor, switch, digital instruments, LED, diode, capacitor, breadboard, beakers, electrodes, salt bridge and electrolyte layers.
- `src/science/experiments.js`, `rendering.js`, `src/electricity/experiments.js`: existing lesson integrations share the assets and actual settings. Cell voltmeter and external load are separate paths, with electron direction external and ionic transport explicitly qualitative.

Logical terminals remain at local x = ±60, y = 0. Dragging, rotation, rendered sockets, preview routing and graph wires derive from these identities. Wire crossings are drawn without a junction dot. An explicit join splits both wires into four graph edges attached to a visible junction; shorting opposite source nets is correctly rejected. A dragged free endpoint stays visible and nonconductive after reload.

## Interface architecture

- `src/ui/academy.css`: coherent white-background tokens, accessible dark text on bright tactile controls, 232px desktop navigation, 780px learning region and optional 250px context region. The context region collapses before the navigation rail; lessons never show unrelated statistics.
- `src/ui/components.js`: original concept symbols, lesson nodes, unit goals and SVG star rating. Existing progression mathematics remains in `src/learning/progression.js`.
- `src/learning/views.js`: illustrated topic catalog, compact robot/topic header, six-offset path rhythm, 80px desktop nodes, explicit lock/current/completed/retry states, true earned stars, compact unit goals and lightweight context.
- `src/main.js`: existing page routes with the new shell, shared local Armenian bold font, completion presentation and experiment actions placed near their controls.
- `index.html`: white theme surface.

All six requested viewports are covered by browser tests: 1920×1080, 1440×900, 1366×768, 1024×768, 768px and 390px. Initial topic nodes remain visible beneath the introduction on desktop. Existing smaller-width, keyboard, reduced-motion, robot continuity and saved-data tests are retained. Real screenshots were reviewed for the home, topics, path, question, seeded completion fixture, connected workbench, meters, cell and breadboard. The seeded completion screenshot is a visual fixture; actual completion/scoring is exercised separately by browser investigations.

## Verification

- `npm test`: 25 tests passed, including circuit regressions spanning both lamp terminals, return, switch, reversed incandescent connections, series/parallel loads, value changes, branch/current and voltage instruments, drag/rotation geometry, persistent free endpoints, explicit junctions, shorts, invalid identities and overflow. Meter illustration endpoints are checked against the actual MNA topology for every supported placement.
- Full browser regression: 95 tests passed in one command (7.4 minutes). After final source-label and mobile hit-target refinements, six focused browser tests passed, including an additional real-touch endpoint disconnection/reload case. The registry now has 96 cases; all 96 were not run together in one final command. The final Node suite was rerun: 25 passed, zero failed.
- Build: `npm run build` passed. The repository defines no separate lint/typecheck script; no such check is claimed.
- Production `index.html` and the self-contained `physics-app.html` were each served over local HTTP and exercised through a closed circuit (9 V, 20 Ω, 4.05 W), open switch, keyboard wire-end disconnection, measurement and reload. Open and detached lamp power remained zero. All six required viewport sizes had white page backgrounds and no horizontal document overflow. Neither artifact produced console/page errors, failed asset requests, or external runtime asset requests. `npm run export:standalone` and `git diff --check` succeeded.

## Limits

This is a one-source, ideal DC resistive editor, not SPICE. Lamp resistance is fixed; brightness is qualitative and derived from dissipated power, not measured lumens. Meters are ideal; their selected ranges are display limits. Multiple ideal sources, nonlinear devices in the general editor and indeterminate ideal-meter loops are rejected. Dedicated LED/diode/RC/transistor investigations keep their explicit existing simplified models.

The breadboard activity tests selected five-hole groups and the center separation. Its colored rails are orientation marks, not a working arbitrary-placement rail/circuit simulator. The Zn/Cu scene assumes standard conditions and neglects internal resistance, concentration change and depletion. Ion arrows show qualitative transport, not a chemical kinetics simulation. All unimplemented physics topics remain visibly planned. Public GitHub Pages availability cannot be inferred from a successful Git push or local HTTP testing.
