import test from 'node:test';import assert from 'node:assert/strict';
import {resetLessonAttempt} from '../src/learning/session.js';import {chargeEvidence} from '../src/science/charge-lab.js';
test('leaving an investigation clears only the active attempt and keeps results, notes and an archive',()=>{
 const data={notes:[{id:'saved'}],learning:{lessons:{charges:{bestStars:3}},unlocked:['charges','atom']},investigations:{charges:{stage:5,runs:[{reading:'չափում'}]}},lessonSession:{id:'charges'}};
 resetLessonAttempt(data,'charges');assert.equal(data.investigations.charges,undefined);assert.equal(data.lessonSession,undefined);assert.equal(data.learning.lessons.charges.bestStars,3);assert.deepEqual(data.learning.unlocked,['charges','atom']);assert.equal(data.notes[0].id,'saved');assert.equal(data.lessonAttemptArchives[0].record.stage,5);assert.equal(data.investigationMigrations.charges,true);
});
test('fresh motion and circuit attempts retain permanent mastery and measured history',()=>{
 const data={stage:4,runs:[{distance:10}],answers:{0:1},assessment:{score:3},learning:{lessons:{motion:{bestStars:3}}},electricLessons:{circuits:{stage:2,experiments:[{reading:'9 Վ'}]}}};resetLessonAttempt(data,'motion');assert.equal(data.stage,0);assert.equal(data.assessment,null);assert.deepEqual(data.runs,[]);assert.equal(data.learning.lessons.motion.bestStars,3);resetLessonAttempt(data,'circuits');assert.equal(data.electricLessons.circuits,undefined);assert.equal(data.lessonAttemptArchives[1].record.experiments.length,1);
});
test('charge comparison derives inverse-square ratios from the same SI model and flags changed charges',()=>{
 const reference={q1:2,q2:2,x1:-.7,x2:.7,y1:0,y2:0};const evidence=chargeEvidence({...reference,x1:-1.4,x2:1.4},reference);assert.equal(evidence.distanceRatio,2);assert.ok(Math.abs(evidence.forceRatio-.25)<1e-12);assert.equal(evidence.sameCharges,true);assert.equal(chargeEvidence({...reference,q2:-2},reference).sameCharges,false);assert.equal(chargeEvidence({...reference,q1:0},{...reference,q1:0}).forceRatio,null);
});
