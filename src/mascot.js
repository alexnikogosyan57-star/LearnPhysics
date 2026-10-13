import greetingVideo from "./assets/greeting.mp4";
import greetingPoster from "./assets/greeting-poster.webp";
import idlePoster from "./assets/greeting-idle.webp";

// Register additional clips only when real, corresponding assets are supplied.
export const mascotAnimations = Object.freeze({
  idle: { poster: idlePoster },
  greeting: { src: greetingVideo, poster: greetingPoster, idle: idlePoster },
});
const sessionKey = "physics-mascot-greeting-v1";
let greetingStarted = false;
function hasGreeted() {
  try {
    return greetingStarted || sessionStorage.getItem(sessionKey) === "played";
  } catch {
    return greetingStarted;
  }
}
function rememberGreeting() {
  greetingStarted = true;
  try {
    sessionStorage.setItem(sessionKey, "played");
  } catch {
    /* Memory fallback. */
  }
}

export function renderMascot(requestedState, caption) {
  const state = mascotAnimations[requestedState] ? requestedState : "idle";
  const clip = mascotAnimations[state];
  const poster =
    state === "greeting" && hasGreeted() ? idlePoster : clip.poster;
  return `<div class="companion video-companion" data-mascot-state="${state}"><div class="mascot-media"><img class="mascot-poster" src="${poster}" alt="Քո հետազոտական ընկերը՝ ռոբոտը" width="1080" height="1920">${state === "greeting" ? `<video class="mascot-video" muted playsinline preload="none" poster="${poster}" width="1080" height="1920" aria-hidden="true" tabindex="-1" disablepictureinpicture disableremoteplayback></video>` : ""}</div><p class="companion-caption">${caption}</p><button class="text-button mascot-play" type="button" hidden>Դիտել ռոբոտի ողջույնը</button><p class="mascot-status" role="status"></p></div>`;
}

export function mountMascots(root) {
  const cleanups = [...root.querySelectorAll("[data-mascot-state]")].map(
    mountMascot,
  );
  return () => cleanups.forEach((cleanup) => cleanup());
}
function mountMascot(element) {
  const video = element.querySelector("video");
  if (!video) return () => {};
  const poster = element.querySelector(".mascot-poster");
  const trigger = element.querySelector(".mascot-play");
  const status = element.querySelector(".mascot-status");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const events = new AbortController();
  let disposed = false,
    pending = false;
  const listen = (node, name, handler) =>
    node.addEventListener(name, handler, { signal: events.signal });
  const alive = () => !disposed && element.isConnected;
  const rest = new Image();
  rest.src = idlePoster;
  video.muted = true;
  video.defaultMuted = true;
  video.loop = false;

  function fallback(message = "") {
    if (!alive()) return;
    video.pause();
    element.dataset.phase = "poster";
    trigger.hidden = true;
    status.textContent = message;
  }
  async function finish() {
    if (!alive()) return;
    // Keep the decoded final video frame visible until the idle image is ready.
    poster.src = idlePoster;
    try {
      await poster.decode();
    } catch {
      return;
    }
    if (alive()) element.dataset.phase = "idle";
  }
  async function playGreeting() {
    if (!alive() || pending || motion.matches) return;
    pending = true;
    trigger.hidden = true;
    status.textContent = "";
    if (!video.getAttribute("src")) video.src = greetingVideo;
    try {
      await video.play();
      if (!alive()) return;
      rememberGreeting();
      element.dataset.phase = "playing";
    } catch (error) {
      if (!alive()) return;
      element.dataset.phase = "poster";
      if (error.name === "NotAllowedError") {
        trigger.hidden = false;
        status.textContent = "Ողջույնը կարող ես դիտել կոճակով։";
      } else if (error.name !== "AbortError") {
        fallback("Ողջույնի տեսանյութն այս պահին հասանելի չէ։");
      }
    } finally {
      pending = false;
    }
  }
  listen(video, "ended", finish);
  listen(video, "error", () =>
    fallback("Ողջույնի տեսանյութն այս պահին հասանելի չէ։"),
  );
  listen(trigger, "click", playGreeting);
  listen(motion, "change", () => {
    if (motion.matches) {
      fallback();
      poster.src = hasGreeted() ? idlePoster : greetingPoster;
    } else if (!hasGreeted()) playGreeting();
  });
  if (hasGreeted()) {
    poster.src = idlePoster;
    element.dataset.phase = "idle";
  } else if (motion.matches) fallback();
  else playGreeting();
  return () => {
    disposed = true;
    events.abort();
    video.pause();
  };
}
