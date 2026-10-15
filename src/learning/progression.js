import {starRating} from '../ui/components.js';
// Stable IDs and best-ever results are independent of the displayed lesson order.
export const starsFor = (earned, possible) => {
 if (!(possible > 0) || earned < 0 || earned > possible) throw new RangeError('Invalid assessment points');
 const ratio=earned/possible;return ratio>=.9?3:ratio>=.7?2:ratio>=.4?1:0;
};
export function initializeProgress(data, topics) {
 data.learning ||= {version:1,selectedTopic:null,lessons:{},unlocked:[]};
 const p=data.learning;p.lessons ||= {};p.unlocked ||= [];
 for(const t of topics)if(t.lessons[0]?.playable&&!p.unlocked.includes(t.lessons[0].id))p.unlocked.push(t.lessons[0].id);
 // Older activities are retained without inventing assessment scores.
 for(const [id,record] of Object.entries(data.electricLessons||{})) {
  if((record.stage>0||record.completed||data.currentLesson===id)&&!p.unlocked.includes(id))p.unlocked.push(id);
 }
 if(data.assessment && !p.lessons.motion)recordResult(data,'motion',data.assessment.score,3,{legacy:true},topics);
 // Content expansion may make the immediate successor of an already-mastered
 // lesson playable. Grant only successors justified by retained real results.
 for(const t of topics)for(let i=0;i<t.lessons.length-1;i++)if(p.lessons[t.lessons[i].id]?.bestStars>=2&&t.lessons[i+1].playable&&!p.unlocked.includes(t.lessons[i+1].id))p.unlocked.push(t.lessons[i+1].id);
 p.version=2;
 return p;
}
export function canOpen(data,id,topics) {
 return topics.some(t=>t.lessons.some(l=>l.id===id&&l.playable)) && !!data.learning?.unlocked.includes(id);
}
export function recordResult(data,id,earned,possible,activities,topics) {
 const p=data.learning;const stars=starsFor(earned,possible),topic=topics.find(t=>t.lessons.some(l=>l.id===id));
 if(!topic)throw new Error('Unknown lesson');
 const record=p.lessons[id] ||= {bestStars:0,attempts:[]};
 const attempt={id:crypto.randomUUID(),created:Date.now(),earned,possible,stars,activities};
 record.attempts.push(attempt);record.bestStars=Math.max(record.bestStars,stars);record.completedActivities=activities;
 const next=topic.lessons[topic.lessons.findIndex(l=>l.id===id)+1];
 if(record.bestStars>=2&&next?.playable&&!p.unlocked.includes(next.id))p.unlocked.push(next.id);
 return attempt;
}
export function nextLesson(data,id,topics) {
 const topic=topics.find(t=>t.lessons.some(l=>l.id===id));if(!topic)return null;
 const next=topic.lessons[topic.lessons.findIndex(l=>l.id===id)+1];
 return next&&canOpen(data,next.id,topics)?next:null;
}
export const starsMarkup=starRating;
