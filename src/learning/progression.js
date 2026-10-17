import {checkpointId,prerequisites} from './checkpoint-content.js';
import {checkpointStars} from './checkpoint-model.js';
import {starRating} from '../ui/components.js';

// Stable IDs and best-ever results are independent of the displayed lesson order.
export const starsFor = (earned, possible) => {
 if (!Number.isFinite(earned) || !Number.isFinite(possible) || !(possible > 0) || earned < 0 || earned > possible) throw new RangeError('Invalid assessment points');
 if (possible === 3) return earned === 3 ? 3 : earned === 2 ? 2 : earned === 1 ? 1 : 0;
 const ratio = earned / possible;
 return ratio >= .9 ? 3 : ratio >= .7 ? 2 : ratio >= .5 ? 1 : 0;
};

export function initializeProgress(data, topics) {
 data.learning ||= {version:1,selectedTopic:null,lessons:{},unlocked:[]};
 const p=data.learning;p.lessons ||= {};p.unlocked ||= [];
 if((p.version||1)<3)p.legacyAccess=[...p.unlocked];
 p.legacyAccess ||= [];

 for(const t of topics){
  const first = t.lessons.find(l=>l.playable);
  if(first && !p.unlocked.includes(first.id)) p.unlocked.push(first.id);
 }

 // Older activities are retained without inventing assessment scores.
 for(const [id,record] of Object.entries(data.electricLessons||{})) {
  if((record.stage>0||record.completed||data.currentLesson===id)&&!p.unlocked.includes(id)){p.unlocked.push(id);p.legacyAccess.push(id);}
 }

 if(data.assessment && !p.lessons.motion)recordResult(data,'motion',data.assessment.score,3,{legacy:true},topics);

 // Synchronize unlocks based on verified mastery
 for(const t of topics) {
  const playable = t.lessons.filter(l=>l.playable);
  for(let i=0; i<playable.length-1; i++) {
   const current = playable[i], next = playable[i+1];
   if((p.lessons[current.id]?.bestStars || 0) >= 2 && gateSatisfied(data, next.id) && !p.unlocked.includes(next.id)) {
    p.unlocked.push(next.id);
   }
  }
 }

 p.version=3;
 return p;
}

export function gateSatisfied(data,id){
 if(data.learning?.legacyAccess?.includes(id))return true;
 if(id===checkpointId)return prerequisites.every(k=>(data.learning?.lessons[k]?.bestStars||0)>=2);
 if(id==='sources')return (data.learning?.lessons[checkpointId]?.bestStars||0)>=2;
 return true;
}

export function canOpen(data,id,topics) {
 const topic = topics.find(t=>t.lessons.some(l=>l.id===id&&l.playable));
 if(!topic) return false;
 if(!gateSatisfied(data,id)) return false;
 if(data.learning?.legacyAccess?.includes(id)) return true;

 const playable = topic.lessons.filter(l=>l.playable);
 const index = playable.findIndex(l=>l.id===id);
 if(index === 0) return true;
 if(index < 0) return false;

 const predecessor = playable[index - 1];
 const predRecord = data.learning?.lessons?.[predecessor.id];
 const passed = (predRecord?.bestStars || 0) >= 2;
 if(passed && data.learning && !data.learning.unlocked.includes(id)) {
  data.learning.unlocked.push(id);
 }
 return passed;
}

export function recordResult(data,id,earned,possible,activities,topics) {
 const p=data.learning;
 const stars = id===checkpointId ? checkpointStars(earned,possible) : starsFor(earned,possible);
 const topic = topics.find(t=>t.lessons.some(l=>l.id===id));
 if(!topic)throw new Error('Unknown lesson: ' + id);

 const record = p.lessons[id] ||= {
  lessonId: id,
  bestScore: 0,
  bestStars: 0,
  completedAt: null,
  lastAttemptAt: 0,
  attemptCount: 0,
  reviewStatus: 'completed',
  attempts: []
 };

 const attempt = {id:crypto.randomUUID(), created:Date.now(), earned, possible, stars, activities};
 record.attempts.push(attempt);
 record.attemptCount = record.attempts.length;
 record.lastAttemptAt = attempt.created;
 record.bestScore = Math.max(record.bestScore || 0, earned);
 record.bestStars = Math.max(record.bestStars || 0, stars);
 if(record.bestStars >= 2 && !record.completedAt) {
  record.completedAt = attempt.created;
 }
 record.completedActivities = activities;

 const playable = topic.lessons.filter(l=>l.playable);
 const idx = playable.findIndex(l=>l.id===id);
 if(idx >= 0 && idx < playable.length - 1) {
  const next = playable[idx + 1];
  if(record.bestStars >= 2 && gateSatisfied(data, next.id) && !p.unlocked.includes(next.id)) {
   p.unlocked.push(next.id);
  }
 }
 return attempt;
}

export function nextLesson(data,id,topics) {
 const topic=topics.find(t=>t.lessons.some(l=>l.id===id));
 if(!topic)return null;
 const playable = topic.lessons.filter(l=>l.playable);
 const idx = playable.findIndex(l=>l.id===id);
 if(idx < 0 || idx >= playable.length - 1) return null;
 const next = playable[idx + 1];
 return next && canOpen(data,next.id,topics) ? next : null;
}

export const starsMarkup=starRating;
