import control from './assets/audio/control.ogg';
import complete from './assets/audio/complete.ogg';

function read(key, fallback) {
  try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
}
const legacyVolume=Math.max(0,Math.min(100,Number(read('physics-volume','40'))||0));
let preference;
try{const value=JSON.parse(read('physics-audio-v1','null'));if(value?.version===1&&typeof value.muted==='boolean'&&Number.isFinite(value.volume)&&value.volume>=0&&value.volume<=100)preference=value;}catch{/* Use existing preferences. */}
let volume=preference?.volume??legacyVolume;
let preferred=preference?!preference.muted:read('physics-sound-enabled','false')==='true';
let lastAudibleVolume=volume>0?volume:Math.max(1,Math.min(100,preference?.lastAudibleVolume||40));
// A saved preference never plays sound before explicit activation on this page.
let activated=false;
const sounds = { control: new Audio(control), complete: new Audio(complete) };
for (const sound of Object.values(sounds)) sound.preload = 'none';
let lastPlayed = 0;
function persist() {
  try {
    localStorage.setItem('physics-audio-v1',JSON.stringify({version:1,muted:!preferred,volume,lastAudibleVolume}));
    localStorage.setItem('physics-volume', String(volume));
    localStorage.setItem('physics-sound-enabled', String(preferred));
  } catch { /* The interface remains usable without storage. */ }
}
export function audioState() { return { volume, enabled: preferred && activated && volume > 0 }; }
export function toggleSound(){if(audioState().enabled)muteSound();else enableSound();}
export function setVolume(value) {
  volume = Math.max(0, Math.min(100, Number(value) || 0));
  if(volume>0)lastAudibleVolume=volume;else preferred=false;
  Object.values(sounds).forEach(sound => { sound.volume = volume / 100; });
  if (!volume) Object.values(sounds).forEach(sound => sound.pause());
  persist();
}
export function enableSound() {
  activated = preferred = true;
  if (!volume) volume = lastAudibleVolume;
  lastAudibleVolume=volume;
  persist();
  playSound('control');
}
export function muteSound() {
  preferred = false;
  Object.values(sounds).forEach(sound=>sound.pause());
  persist();
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
    persist();
    window.dispatchEvent(new Event('physics-audio-error'));
  });
}
document.addEventListener('visibilitychange', () => {
  if (document.hidden) Object.values(sounds).forEach(sound => sound.pause());
});
