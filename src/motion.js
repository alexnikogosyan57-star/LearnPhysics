/** Short, event-driven transitions. Never drive physics with a UI animation. */
let previous;
const preference = matchMedia("(prefers-reduced-motion: reduce)");
const active = new Set();
export function animate(element, frames, options = {}) {
  if (!element || preference.matches || typeof element.animate !== "function")
    return;
  const animation = element.animate(frames, {
    duration: 240,
    easing: "cubic-bezier(.2,.7,.2,1)",
    ...options,
  });
  active.add(animation);
  animation.finished.catch(() => {}).finally(() => active.delete(animation));
  return animation;
}
preference.addEventListener("change", () => {
  if (preference.matches) for (const animation of active) animation.cancel();
});
export function animateRender(root, state) {
  // A new DOM render should not replay the whole page after every answer click.
  for (const animation of active) animation.cancel();
  const viewChanged = !previous || previous.view !== state.view;
  if (viewChanged) {
    // Animate teaching content, keeping the robot fully opaque and anchored.
    const target = root.querySelector('[data-mascot-state]')
      ? root.querySelector('.student-work') || root.querySelector('.robot-dialogue') || root.querySelector('.welcome-dialogue')
      : root.querySelector('.lesson-content') || root.querySelector('.hero') || root;
    animate(
      target,
      [
        { opacity: 0.3, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 300 },
    );
  } else {
    if (previous.selection !== state.selection) {
      const selected = root.querySelector(".answer.selected");
      animate(selected, [
        { backgroundColor: "#f8f7ee" },
        { backgroundColor: "#dfe8d3" },
        { backgroundColor: "#e8eddd" },
      ]);
      animate(
        selected?.querySelector(".lucide"),
        [
          { opacity: 0, transform: "scale(.85)" },
          { opacity: 1, transform: "scale(1)" },
        ],
        { duration: 180 },
      );
    }
    if (previous.feedback !== state.feedback || previous.hint !== state.hint) {
      animate(root.querySelector(".feedback:not(:empty)"), [
        { opacity: 0, transform: "translateY(4px)" },
        { opacity: 1, transform: "translateY(0)" },
      ]);
    }
  }
  if (previous && state.runs > previous.runs) {
    animate(
      root.querySelector(".readouts"),
      [{ backgroundColor: "#e3ead8" }, { backgroundColor: "#eff0e6" }],
      { duration: 600 },
    );
    animate(
      root.querySelector("#sim-status"),
      [{ opacity: 0.4 }, { opacity: 1 }],
      { duration: 350 },
    );
  }
  previous = { ...state };
}
export function animateDisclosure(details) {
  if (!details.open) return;
  animate(
    [...details.children].find((node) => node.tagName !== "SUMMARY"),
    [
      { opacity: 0.3, transform: "translateY(-4px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    { duration: 220 },
  );
}
export function animateSaved(element) {
  animate(element, [
    { opacity: 0, transform: "translateY(4px)" },
    { opacity: 1, transform: "translateY(0)" },
  ]);
}
