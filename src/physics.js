export function distance(speed, time) {
  return speed * time;
}
export function advance(time, delta, duration) {
  return Math.min(duration, Math.max(0, time + delta));
}
export function point(speed, time, duration, maxDistance) {
  return {
    x: 52 + (time / duration) * 400,
    y: 170 - (distance(speed, time) / maxDistance) * 140,
  };
}

// Decorative wheel rotation follows traveled distance (nominal radius 0.15 m).
export function wheelAngle(traveledDistance) {
  return ((traveledDistance / 0.15) * 180) / Math.PI;
}
