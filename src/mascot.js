import celebrationVideo from "./assets/celebration-transparent.webm";
import celebrationPoster from "./assets/celebration-transparent-poster.png";
import celebrationIdle from "./assets/celebration-transparent-idle.png";
import celebrationFallback from "./assets/celebration-transparent-animated.webp";
import confusedVideo from "./assets/confused-transparent.webm";
import confusedPoster from "./assets/confused-transparent-poster.png";
import confusedIdle from "./assets/confused-transparent-idle.png";
import confusedFallback from "./assets/confused-transparent-animated.webp";
import eurekaVideo from "./assets/eureka-transparent.webm";
import eurekaPoster from "./assets/eureka-transparent-poster.png";
import eurekaIdle from "./assets/eureka-transparent-idle.png";
import eurekaFallback from "./assets/eureka-transparent-animated.webp";
import idle_primaryVideo from "./assets/idle-primary-transparent.webm";
import idle_primaryPoster from "./assets/idle-primary-transparent-poster.png";
import idle_primaryIdle from "./assets/idle-primary-transparent-idle.png";
import idle_primaryFallback from "./assets/idle-primary-transparent-animated.webp";
import idle_secondaryVideo from "./assets/idle-secondary-transparent.webm";
import idle_secondaryPoster from "./assets/idle-secondary-transparent-poster.png";
import idle_secondaryIdle from "./assets/idle-secondary-transparent-idle.png";
import idle_secondaryFallback from "./assets/idle-secondary-transparent-animated.webp";
import point_leftVideo from "./assets/point-left-transparent.webm";
import point_leftPoster from "./assets/point-left-transparent-poster.png";
import point_leftIdle from "./assets/point-left-transparent-idle.png";
import point_leftFallback from "./assets/point-left-transparent-animated.webp";
import point_rightVideo from "./assets/point-right-transparent.webm";
import point_rightPoster from "./assets/point-right-transparent-poster.png";
import point_rightIdle from "./assets/point-right-transparent-idle.png";
import point_rightFallback from "./assets/point-right-transparent-animated.webp";
import success_answerVideo from "./assets/success-answer-transparent.webm";
import success_answerPoster from "./assets/success-answer-transparent-poster.png";
import success_answerIdle from "./assets/success-answer-transparent-idle.png";
import success_answerFallback from "./assets/success-answer-transparent-animated.webp";
import success_completeVideo from "./assets/success-complete-transparent.webm";
import success_completePoster from "./assets/success-complete-transparent-poster.png";
import success_completeIdle from "./assets/success-complete-transparent-idle.png";
import success_completeFallback from "./assets/success-complete-transparent-animated.webp";
import greetingVideo from "./assets/greeting-transparent.webm";
import greetingPoster from "./assets/greeting-transparent-poster.png";
import idlePoster from "./assets/greeting-transparent-idle.png";
import greetingImageFallback from "./assets/greeting-transparent-animated.webp";
import thinkingVideo from "./assets/thinking-transparent.webm";
import thinkingPoster from "./assets/thinking-transparent-poster.png";
import thinkingIdle from "./assets/thinking-transparent-idle.png";

// Register additional clips only when real, corresponding assets are supplied.
export const mascotAnimations = Object.freeze({
  celebration: {src:celebrationVideo, poster:celebrationPoster, idle:celebrationIdle, alpha:true, imageFallback:celebrationFallback, next:"idle", duration:3},
  confused: {src:confusedVideo, poster:confusedPoster, idle:confusedIdle, alpha:true, imageFallback:confusedFallback, next:"thinking", duration:2.5},
  eureka: {src:eurekaVideo, poster:eurekaPoster, idle:eurekaIdle, alpha:true, imageFallback:eurekaFallback, next:"thinking", duration:2},
  "point-left": { src: point_leftVideo, poster: point_leftPoster, idle: point_leftIdle, alpha: true, imageFallback: point_leftFallback, next: "idle", duration: 2.25 },
  "point-right": { src: point_rightVideo, poster: point_rightPoster, idle: point_rightIdle, alpha: true, imageFallback: point_rightFallback, next: "idle", duration: 2.5 },
  "success-answer": { src: success_answerVideo, poster: success_answerPoster, idle: success_answerIdle, alpha: true, imageFallback: success_answerFallback, next: "idle", duration: 2.125 },
  "success-complete": { src: success_completeVideo, poster: success_completePoster, idle: success_completeIdle, alpha: true, imageFallback: success_completeFallback, next: "idle-secondary", duration: 2.75 },
  idle: { src: idle_primaryVideo, poster: idle_primaryPoster, idle: idle_primaryIdle, alpha: true, loop: true, imageFallback: idle_primaryFallback },
  "idle-secondary": { src: idle_secondaryVideo, poster: idle_secondaryPoster, idle: idle_secondaryIdle, alpha: true, loop: true, imageFallback: idle_secondaryFallback },
  greeting: {
    src: greetingVideo,
    poster: greetingPoster,
    idle: idlePoster,
    alpha: true,
    imageFallback: greetingImageFallback,
    next: "idle",
    duration: 5.5,
  },
  thinking: {
    src: thinkingVideo,
    poster: thinkingPoster,
    idle: thinkingIdle,
    alpha: true,
    loop: true,
  },
});
let greetingStarted = false;
export function greetingHasStarted() { return greetingStarted; }
function hasGreeted() {
  return greetingStarted;
}
function rememberGreeting() {
  greetingStarted = true;
}

const startedEvents = new Set();
function hasPlayed(state, eventKey) {
  if (state === "greeting") return hasGreeted();
  if (mascotAnimations[state]?.loop) return false;
  const key = `physics-mascot:${state}:${eventKey}`;
  try {
    return startedEvents.has(key) || sessionStorage.getItem(key) === "played";
  } catch {
    return startedEvents.has(key);
  }
}
function rememberPlayback(state, eventKey) {
  if (mascotAnimations[state]?.loop) return;
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
    state === "greeting" ? "Դիտել ռոբոտի ողջույնը" : state === "thinking" ? "Դիտել մտածող ռոբոտին" : "Դիտել ռոբոտի շարժումը";
  return `<div class="companion video-companion" data-mascot-state="${state}" data-transparent="${!!clip.alpha}" data-mascot-event="${eventKey}"><div class="mascot-media" role="img" aria-label="Քո հետազոտական ընկերը՝ ռոբոտը"><img class="mascot-poster" src="${poster}" alt="Քո հետազոտական ընկերը՝ ռոբոտը" width="1080" height="1920">${clip.src ? `<video class="mascot-video" muted playsinline preload="none" width="1080" height="1920" aria-hidden="true" tabindex="-1" disablepictureinpicture disableremoteplayback></video>` : ""}</div><p class="companion-caption">${caption}</p><button class="text-button mascot-play" type="button" hidden>${action}</button><p class="mascot-status" role="status"></p></div>`;
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
    unsupportedAlpha = false,
    imageFallbackStarted = false;
  let followupCleanup = () => {}, handoffTimer, handedOff = false;
  const listen = (node, name, handler) =>
    node.addEventListener(name, handler, { signal: events.signal });
  const alive = () => !disposed && element.isConnected;
  const rest = new Image();
  rest.src = clip.idle;
  video.muted = true;
  video.defaultMuted = true;
  video.loop = !!clip.loop;

  function handoff() {
    if (!alive() || motion.matches || handedOff || !clip.next) return;
    handedOff = true;
    video.pause();
    events.abort();
    const holder = document.createElement("div");
    holder.innerHTML = renderMascot(clip.next, element.querySelector(".companion-caption").textContent, eventKey + ":presence");
    const next = holder.firstElementChild;
    element.innerHTML = next.innerHTML;
    element.dataset.mascotState = clip.next;
    element.dataset.mascotEvent = next.dataset.mascotEvent;
    delete element.dataset.phase;
    // One visible media layer; a brief fade softens changes of pose.
    const media = element.querySelector(".mascot-media");
    if (!motion.matches) media.animate([{opacity:0},{opacity:1}], {duration:280,easing:"ease-out"});
    followupCleanup = mountMascot(element);
  }
  function fallback(message = "") {
    if (!alive()) return;
    video.pause();
    if (message && clip.imageFallback && !motion.matches) {
      if (imageFallbackStarted) return;
      imageFallbackStarted = true;
      element.dataset.phase = "image-playing";
      trigger.hidden = true;
      status.textContent = "";
      poster.onload = () => {
        if (alive() && !motion.matches) {
          rememberPlayback(state, eventKey);
          if (clip.next) handoffTimer = setTimeout(handoff, (clip.duration + .7) * 1000);
        }
      };
      poster.onerror = () => {
        if (alive()) {
          poster.onerror = null;
          poster.src = clip.poster;
          element.dataset.phase = "poster";
          status.textContent = unavailable;
        }
      };
      poster.src = clip.imageFallback;
      return;
    }
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
    if (alive()) {
      element.dataset.phase = "idle";
      if (clip.next) handoffTimer = setTimeout(handoff, 700);
    }
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
      if (imageFallbackStarted) return;
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
  if (!clip.loop) listen(video, "ended", finish);
  listen(video, "error", () => fallback(unavailable));
  listen(trigger, "click", playAnimation);
  listen(motion, "change", () => {
    if (motion.matches) {
      fallback();
      poster.src = alreadyPlayed() ? clip.idle : clip.poster;
    } else if (!alreadyPlayed()) playAnimation();
  });
  if (alreadyPlayed() && clip.next && !motion.matches) {
    handoff();
  } else if (alreadyPlayed()) {
    poster.src = clip.idle;
    element.dataset.phase = "idle";
  } else if (motion.matches) fallback();
  else playAnimation();
  return () => {
    disposed = true;
    clearTimeout(handoffTimer);
    followupCleanup();
    events.abort();
    poster.onload = poster.onerror = null;
    video.pause();
  };
}
