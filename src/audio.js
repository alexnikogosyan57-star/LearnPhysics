const audioUrl = (file) => new URL(`./assets/audio/${file}`, import.meta.url).href;
const createAudio = (file) => (typeof Audio !== 'undefined' ? new Audio(audioUrl(file)) : { play: () => Promise.resolve(), pause: () => {}, volume: 1, currentTime: 0, preload: 'none' });

function read(key, fallback) {
  try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
}
const legacyVolume=Math.max(0,Math.min(100,Number(read('physics-volume','50'))||50));
let preference;
try{const value=JSON.parse(read('physics-audio-v1','null'));if(value?.version===1&&typeof value.muted==='boolean'&&Number.isFinite(value.volume)&&value.volume>=0&&value.volume<=100)preference=value;}catch{/* Use existing preferences. */}
let volume=preference?.volume??legacyVolume;
if (volume <= 0) volume = 50;

// Sound is enabled by default when entering the site.
let preferred = true;
let activated = true;
let lastAudibleVolume=volume>0?volume:Math.max(1,Math.min(100,preference?.lastAudibleVolume||50));
const sounds = {
  control: createAudio('control.ogg'),
  complete: createAudio('complete.ogg'),
  duoCorrect: createAudio('duolingo-correct.mp3'),
  duoWrong: createAudio('duolingo-wrong.mp3'),
  duoComplete: createAudio('duolingo-complete.mp3'),
  duoStreak: createAudio('duolingo-streak.mp3'),
  duoTap: createAudio('duolingo-tap.mp3'),
  duoHint: createAudio('duolingo-hint.mp3')
};
sounds.correct = sounds.duoCorrect;
sounds.incorrect = sounds.duoWrong;
sounds.wrong = sounds.duoWrong;
sounds.streak = sounds.duoStreak;
sounds.milestone = sounds.duoStreak;
sounds.tap = sounds.duoTap;
sounds.hint = sounds.duoHint;
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
  if(volume>0){lastAudibleVolume=volume;preferred=true;activated=true;}else{preferred=false;}
  Object.values(sounds).forEach(sound => { sound.volume = volume / 100; });
  if (!volume) Object.values(sounds).forEach(sound => sound.pause());
  persist();
}
export function enableSound() {
  activated = preferred = true;
  if (!volume) volume = lastAudibleVolume || 50;
  lastAudibleVolume=volume;
  persist();
  playSound('control');
}
export function muteSound() {
  preferred = false;
  activated = false;
  Object.values(sounds).forEach(sound=>sound.pause());
  persist();
}
function eventScale(event) {
  if (event === 'complete' || event === 'duoComplete') return 0.55;
  if (event === 'correct' || event === 'duoCorrect') return 0.65;
  if (event === 'incorrect' || event === 'wrong' || event === 'duoWrong') return 0.55;
  if (event === 'streak' || event === 'milestone' || event === 'duoStreak') return 0.6;
  if (event === 'hint' || event === 'duoHint') return 0.5;
  if (event === 'tap' || event === 'duoTap') return 0.5;
  return 0.7;
}
export function playSound(event = 'control') {
  if (!audioState().enabled || (typeof document !== 'undefined' && document.hidden)) return;
  const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
  if (now - lastPlayed < 120) return;
  lastPlayed = now;
  // Avoid overlapping effects; failures never interrupt learning.
  Object.values(sounds).forEach(sound => sound.pause());
  const sound = sounds[event] || sounds.control;
  sound.volume = (volume / 100) * eventScale(event);
  sound.currentTime = 0;
  sound.play().catch((err) => {
    if (typeof window !== 'undefined' && err?.name !== 'NotAllowedError') {
      window.dispatchEvent(new Event('physics-audio-error'));
    }
  });
}
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) Object.values(sounds).forEach(sound => sound.pause());
  });
}
