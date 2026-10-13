export function distance(speed,time){return speed*time}
export function advance(time,delta,duration){return Math.min(duration,Math.max(0,time+delta))}
export function point(speed,time,duration,maxDistance){return {x:52+time/duration*400,y:170-distance(speed,time)/maxDistance*140}}
