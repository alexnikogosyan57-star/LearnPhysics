import control from './assets/audio/control.ogg';
import complete from './assets/audio/complete.ogg';

function read(key, fallback) {
  try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
}
let volume = Math.max(0, Math.min(100, Number(read('physics-volume', '40')) || 0));
let preferred = read('physics-sound-enabled', 'false') === 'true';
// A stored preference never starts audio before a gesture on this page.
let activated = false;
const sounds = { control: new Audio(control), complete: new Audio(complete) };
for (const sound of Object.values(sounds)) sound.preload = 'none';
let lastPlayed = 0;
function persist() {
  try {
    localStorage.setItem('physics-volume', String(volume));
    localStorage.setItem('physics-sound-enabled', String(preferred));
  } catch { /* The interface remains usable without storage. */ }
}
export function audioState() { return { volume, enabled: preferred && activated && volume > 0 }; }
export function setVolume(value) {
  volume = Math.max(0, Math.min(100, Number(value) || 0));
  Object.values(sounds).forEach(sound => { sound.volume = volume / 100; });
  if (!volume) Object.values(sounds).forEach(sound => sound.pause());
  persist();
}
export function enableSound() {
  activated = preferred = true;
  if (!volume) volume = 40;
  persist();
  playSound('control');
}
export function muteSound() {
  preferred = false;
  setVolume(0);
}
export function playSound(event = 'control') {
  if (!audioState().enabled || document.hidden) return;
  const now = performance.now();
  if (now - lastPlayed < 120) return;
  lastPlayed = now;
  // Avoid overlapping effects; failures never interrupt learning.
  Object.values(sounds).forEach(sound => sound.pause());
  const sound = sounds[event] || sounds.control;
  sound.volume = volume / 100 * (event === 'complete' ? .55 : .7);
  sound.currentTime = 0;
  sound.play().catch(() => {
    preferred = false;
    window.dispatchEvent(new Event('physics-audio-error'));
  });
}
document.addEventListener('visibilitychange', () => {
  if (document.hidden) Object.values(sounds).forEach(sound => sound.pause());
});
