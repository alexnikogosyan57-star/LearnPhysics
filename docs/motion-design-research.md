# Expressive, original learning motion

Research and implementation: 2026-10-16. The goal is a friendlier, more coherent learning experience with different gestures for different events, while retaining the Armenian robot, white surface and existing educational structure. No Duolingo interface, mascot or artwork was copied.

## Sources actually consulted

Direct requests to the Duolingo design website, a candidate Duolingo blog page, Google search, web.dev and MDN were blocked by the environment's CONNECT proxy with HTTP 403. Their current contents were **not** read, and the implementation does not claim a successful general web search or a verified Duolingo-specific animation specification.

Public GitHub access worked. Two official repositories were shallow-cloned into temporary research directories and read without installing dependencies or executing their code:

- [Motion README](https://github.com/motiondivision/motion/tree/2d27b041114f5f1cffc1f6d3ad522929ce0cc41f) and its [staggered view example](https://github.com/motiondivision/motion/blob/2d27b041114f5f1cffc1f6d3ad522929ce0cc41f/dev/html/public/examples/stagger.html): ordered entrances, spring-driven settling, native browser animation and interruptible transitions. The library's performance claims were not adopted as measurements of this app.
- [Google Material Web's easing and cancellation utilities](https://github.com/material-components/material-web/blob/5a95667bb70ca5be8785b762fb0303737c3b4ac1/internal/motion/animation.ts), motion token entry point and README: distinct arrival/exit easing, consistent motion roles and cancellation of superseded work. Its README states that the component library is in maintenance mode; it was used as a reference, not added as a dependency. The upstream file explicitly describes one emphasized curve as approximate; no claim of exact reproduction is made.

## Applied decisions

| Learning event | Original treatment | Meaning |
| --- | --- | --- |
| New question | Short directional content transition and a 25 ms choice stagger | Read the prompt, then act |
| Correct answer | A drawn check and a small damped settling gesture | Acknowledge the student's actual answer |
| Incorrect answer | A drawn return arrow with a gentle rotation | Review the reasoning without shaking or shaming the learner |
| Earned assessment stars | Sequential settling, only on actually earned stars | Reflect demonstrated achievement, without invented rewards |
| Learning path | A one-time line drawing when the visible unit opens | Establish the route without implying that locked lessons are complete |
| Pointer release | Small settling on the control's icon | Tactile feedback without moving the click target |
| Sound controls | Sidebar footer on desktop, header on mobile | Keep feedback and Armenian explanations unobstructed |

`src/ui/motion-presets.js` separates timings/easing and the app's own sampled damped settling curve from rendering. Chosen durations are this app's decisions, not purported upstream duration recommendations. Implementation uses the existing Web Animations API helper and SVG, with no new runtime library, media downloads or sound assets.

## Guardrails

The robot and its ancestors do not fade, scale or move with UI transitions. Physics objects, graphs, numeric values and stored grades are not driven by decorative animation. Selected-answer dots indicate selection, not correctness. Animated feedback marks are decorative (`aria-hidden`) and accompany explicit Armenian feedback. Reduced motion retains static meaningful marks while stopping effects, including live preference changes. Active transitions remain cancellable and do not block input. There are no confetti bursts, fake stars, streaks or typing delays.

Actual verification outcomes are recorded at the top of `VALIDATION.md` after completion.
