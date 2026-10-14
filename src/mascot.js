import greetingVideo from "./assets/greeting.mp4";
import greetingPoster from "./assets/greeting-poster.webp";
import idlePoster from "./assets/greeting-idle.webp";
import thinkingVideo from "./assets/thinking-transparent.webm";
import thinkingPoster from "./assets/thinking-transparent-poster.png";
import thinkingIdle from "./assets/thinking-transparent-idle.png";

// Register additional clips only when real, corresponding assets are supplied.
export const mascotAnimations = Object.freeze({
  idle: { poster: idlePoster },
  greeting: { src: greetingVideo, poster: greetingPoster, idle: idlePoster },
  thinking: {
    src: thinkingVideo,
    poster: thinkingPoster,
    idle: thinkingIdle,
    alpha: true,
  },
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

const startedEvents = new Set();
function hasPlayed(state, eventKey) {
  if (state === "greeting") return hasGreeted();
  const key = `physics-mascot:${state}:${eventKey}`;
  try {
    return startedEvents.has(key) || sessionStorage.getItem(key) === "played";
  } catch {
    return startedEvents.has(key);
  }
}
function rememberPlayback(state, eventKey) {
  if (state === "greeting") {
    rememberGreeting();
    return;
  }
  const key = `physics-mascot:${state}:${eventKey}`;
  startedEvents.add(key);
  try {
    sessionStorage.setItem(key, "played");
  } catch {
    /* Memory fallback. */
  }
}
export function renderMascot(
  requestedState,
  caption,
  eventKey = requestedState,
) {
  const state = mascotAnimations[requestedState] ? requestedState : "idle";
  const clip = mascotAnimations[state];
  const poster =
    clip.src && hasPlayed(state, eventKey) ? clip.idle : clip.poster;
  const action =
    state === "greeting" ? "Դիտել ռոբոտի ողջույնը" : "Դիտել մտածող ռոբոտին";
  return `<div class="companion video-companion" data-mascot-state="${state}" data-transparent="${!!clip.alpha}" data-mascot-event="${eventKey}"><div class="mascot-media"><img class="mascot-poster" src="${poster}" alt="Քո հետազոտական ընկերը՝ ռոբոտը" width="1080" height="1920">${clip.src ? `<video class="mascot-video" muted playsinline preload="none" poster="${poster}" width="1080" height="1920" aria-hidden="true" tabindex="-1" disablepictureinpicture disableremoteplayback></video>` : ""}</div><p class="companion-caption">${caption}</p><button class="text-button mascot-play" type="button" hidden>${action}</button><p class="mascot-status" role="status"></p></div>`;
}

export function mountMascots(root) {
  const cleanups = [...root.querySelectorAll("[data-mascot-state]")].map(
    mountMascot,
  );
  return () => cleanups.forEach((cleanup) => cleanup());
}
function mountMascot(element) {
  const video = element.querySelector("video");
  if (!video || element.getClientRects().length === 0) return () => {};
  const poster = element.querySelector(".mascot-poster");
  const state = element.dataset.mascotState;
  const eventKey = element.dataset.mascotEvent;
  const clip = mascotAnimations[state];
  const alreadyPlayed = () => hasPlayed(state, eventKey);
  const unavailable =
    state === "greeting"
      ? "Ողջույնի տեսանյութն այս պահին հասանելի չէ։"
      : "Ռոբոտի տեսանյութն այս պահին հասանելի չէ։";
  const trigger = element.querySelector(".mascot-play");
  const status = element.querySelector(".mascot-status");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const events = new AbortController();
  let disposed = false,
    pending = false,
    unsupportedAlpha = false;
  const listen = (node, name, handler) =>
    node.addEventListener(name, handler, { signal: events.signal });
  const alive = () => !disposed && element.isConnected;
  const rest = new Image();
  rest.src = clip.idle;
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
    poster.src = clip.idle;
    try {
      await poster.decode();
    } catch {
      return;
    }
    if (alive()) element.dataset.phase = "idle";
  }
  async function playAnimation() {
    if (!alive() || pending || motion.matches) return;
    pending = true;
    trigger.hidden = true;
    status.textContent = "";
    if (!video.getAttribute("src")) video.src = clip.src;
    try {
      await video.play();
      if (!alive() || motion.matches || unsupportedAlpha) {
        video.pause();
        return;
      }
      rememberPlayback(state, eventKey);
      element.dataset.phase = "playing";
    } catch (error) {
      if (!alive()) return;
      element.dataset.phase = "poster";
      if (error.name === "NotAllowedError") {
        trigger.hidden = false;
        status.textContent = "Անիմացիան կարող ես դիտել կոճակով։";
      } else if (error.name !== "AbortError") {
        fallback(unavailable);
      }
    } finally {
      pending = false;
    }
  }
  if (clip.alpha)
    listen(video, "loadeddata", () => {
      // A decoder without alpha support would show a black rectangle. Keep the PNG instead.
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext("2d");
      try {
        ctx.drawImage(video, 0, 0, 1, 1, 0, 0, 1, 1);
        if (ctx.getImageData(0, 0, 1, 1).data[3] !== 0) {
          unsupportedAlpha = true;
          fallback("Այս բրաուզերում ցուցադրվում է ռոբոտի անշարժ տարբերակը։");
        }
      } catch {
        /* Regular media failure still uses the poster. */
      }
    });
  listen(video, "ended", finish);
  listen(video, "error", () => fallback(unavailable));
  listen(trigger, "click", playAnimation);
  listen(motion, "change", () => {
    if (motion.matches) {
      fallback();
      poster.src = alreadyPlayed() ? clip.idle : clip.poster;
    } else if (!alreadyPlayed()) playAnimation();
  });
  if (alreadyPlayed()) {
    poster.src = clip.idle;
    element.dataset.phase = "idle";
  } else if (motion.matches) fallback();
  else playAnimation();
  return () => {
    disposed = true;
    events.abort();
    video.pause();
  };
}
