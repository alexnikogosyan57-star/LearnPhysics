# Robot-led assessment and first-unit checkpoint

The user-approved in-app checkpoint is a separate `charge-checkpoint` lesson at the end of «Լիցք, ատոմ և հոսանք». Existing E07 (`sources`), all 47 original electrical lessons, IDs, URLs and saved grade records remain intact. The path now contains 48 electrical activities. This adds the first-unit checkpoint; it does not claim additional seven-unit final exams have been authored.

## Student experience

25 one-point tasks cover charge interaction, atomic structure, electrification/charge conservation, conductors, electric fields and current. Visual interpretation, everyday applications, error detection, numerical problems and three actual adjustable models are included. Distance/force uses the same Coulomb model as the charge laboratory. The circuit task uses the existing electrical solver with a 3 V ideal source, 30 Ω load, switch and conducting/insulating specimen. Atomic net charge is the difference between proton and electron counts.

A choice or input never submits itself. «Ստուգել» fixes the first answer and displays feedback. «Շարունակել» is a separate action. Feedback is delivered beside the original robot, with restrained correct/incorrect states and short scientific explanations. Answers and explanations are not presented before an attempt. On the final page, students can inspect their original responses and the reasoning.

The reusable serializable state machine handles answering, submission, feedback, next question, review and completion. Incorrect indices enter a unique queue. Each has at most two review attempts, with unsuccessful items moved behind other pending items. Corrected items leave the queue. Review selections are cleared; checkpoint review uses equivalent conceptual mini-exercises rather than simply preselecting the original solution. Existing lesson review reverses choice order where applicable. An unresolved item ends in a further-practice recommendation, never an endless loop.

The shared assessment flow is integrated into the investigation, foundation, legacy numeric and original motion lesson engines. It supports choice, numeric, matching and text activities. Numeric activities specify units and may override the default 0.5% relative/1e-6 absolute tolerance. Text activities use explicit normalized accepted answers, not speculative automatic interpretation. Simulation answers in the checkpoint validate actual model state; physical readings and grading share model inputs. Existing circuit-building learning workspaces retain their real connectivity solver.

## Official score and persistence

New results use 0–49%=0 stars, 50–69%=1, 70–89%=2 and 90–100%=3. For the 25 one-point checkpoint this means 0–12, 13–17, 18–22 and 23–25 correct answers. Existing stored grades are never recalculated. The former 40% one-star boundary is replaced for new attempts following the latest explicit user instruction; the two-star 70% boundary remains unchanged.

Only original responses determine the official score. Review corrections are reported separately and cannot unlock a lesson or inflate the grade. A full reassessment creates a new permanent attempt; best-ever stars remain monotonic. The checkpoint also records per-concept performance, links relevant lessons and offers targeted practice separate from grading. Each completed checkpoint saves a notebook entry.

New students need two stars in all six first-unit lessons to access the checkpoint, and two official checkpoint stars to unlock `sources`, the next unit. Version-3 progression migration explicitly retains previously unlocked historical access and active legacy lessons rather than relocking a student's existing progress. The migration is additive and idempotent; it preserves stored attempts and notebook entries.

Data stays under `physics-journal-v1`. The active checkpoint is `checkpoints.charge-checkpoint`; permanent results are `learning.lessons.charge-checkpoint`. Refresh preserves draft, submitted feedback and review queue. Full reassessments archive the previous checkpoint. The existing user-approved exit policy still applies: confirmed departure starts a fresh active lesson on return, retaining permanent results and notebooks.

The existing local licensed sound assets now have a direct activation/mute button and separate volume settings. Muting retains the chosen volume. Playback still requires a user gesture on each page load. No robot-video soundtrack is enabled.

## Scope limits

There is no server, authentication, cloud sync, external analytics, new audio recording, new PDF test, or new simulation engine. Browser storage still has its existing quota/availability limitations. No claim of a complete curriculum alignment or WCAG audit is made. Verification outcomes are recorded in `VALIDATION.md` after actual checks complete.
