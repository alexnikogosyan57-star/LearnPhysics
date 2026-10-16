import test from 'node:test';import assert from 'node:assert/strict';
import {checkpointQuestions as questions,checkpointId,prerequisites} from '../src/learning/checkpoint-content.js';
import {checkpointStars,gradeCheckpoint,correctResponse,simulationReading} from '../src/learning/checkpoint-model.js';
import {assessmentState,submitAssessment,continueAssessment} from '../src/learning/assessment-machine.js';
import {initializeProgress,recordResult,canOpen} from '../src/learning/progression.js';
import {topics} from '../src/learning/topics.js';
import {resetLessonAttempt} from '../src/learning/session.js';
test('25 diverse unique tasks, exact star boundaries, physical model and blank answers',()=>{
 assert.equal(questions.length,25);assert.equal(new Set(questions.map(q=>q.id)).size,25);
 assert.deepEqual(new Set(questions.map(q=>q.type)),new Set(['choice','number','simulation']));
 for(const [n,s] of [[0,0],[49,0],[50,1],[69,1],[70,2],[89,2],[90,3],[100,3]])assert.equal(checkpointStars(n,100),s);
 assert.throws(()=>checkpointStars(NaN));assert.throws(()=>checkpointStars(26));
 assert.equal(gradeCheckpoint({}).earned,0);
 assert.equal(simulationReading('distance',2).ratio,.25);assert.equal(simulationReading('atom',12).charge,-2);
 assert.equal(simulationReading('circuit',{closed:true,material:'plastic'}).current,0);
 assert.equal(simulationReading('circuit',{closed:true,material:'copper'}).current,.1);
 assert.equal(correctResponse(questions[2],{value:2,measured:false}),false);
 assert.equal(correctResponse(questions[3],''),false);
 const answers=Object.fromEntries(questions.map(q=>[q.id,q.type==='simulation'?{value:q.simulation==='distance'?2:q.simulation==='atom'?12:{material:'copper',closed:true},measured:true}:q.answer]));
 assert.equal(gradeCheckpoint(answers).earned,25);assert.deepEqual(gradeCheckpoint(answers).weak,[]);
 answers.q01=2;assert.deepEqual(gradeCheckpoint(answers).weak,['charges']);
});
test('feedback never auto advances, originals immutable, review resets and bounded repetition',()=>{
 let s=assessmentState();assert.equal(submitAssessment(s,1,false),true);assert.equal(s.index,0);assert.equal(s.phase,'FEEDBACK');assert.equal(submitAssessment(s,0,true),false);
 continueAssessment(s,2);submitAssessment(s,0,true);continueAssessment(s,2);assert.equal(s.phase,'MISTAKE_REVIEW');assert.deepEqual(s.queue,[0]);
 submitAssessment(s,0,true);continueAssessment(s,2);assert.equal(s.phase,'COMPLETED');assert.deepEqual(s.corrected,[0]);assert.equal(s.original[0].correct,false);
 s=assessmentState();submitAssessment(s,0,false);continueAssessment(s,1);
 for(let i=0;i<2;i++){s=JSON.parse(JSON.stringify(s));submitAssessment(s,0,false);continueAssessment(s,1);}
 assert.equal(s.phase,'COMPLETED');assert.deepEqual(s.unresolved,[0]);assert.equal(s.original.length,1);
});
test('separate checkpoint gates next unit, preserves old IDs, best scores and historical access',()=>{
 const d={notes:[{id:'old',conclusion:'keep'}]};initializeProgress(d,topics);
 for(const id of prerequisites)recordResult(d,id,10,10,{},topics);
 assert.equal(canOpen(d,checkpointId,topics),true);assert.equal(canOpen(d,'sources',topics),false);
 recordResult(d,checkpointId,17,25,{},topics);assert.equal(canOpen(d,'sources',topics),false);
 recordResult(d,checkpointId,18,25,{},topics);assert.equal(canOpen(d,'sources',topics),true);
 recordResult(d,checkpointId,0,25,{},topics);assert.equal(d.learning.lessons[checkpointId].bestStars,2);
 assert.equal(canOpen(d,'sources',topics),true);assert.equal(topics[0].lessons.find(l=>l.id==='sources').code,'E07');
 d.checkpoints={[checkpointId]:{started:true}};resetLessonAttempt(d,checkpointId);assert.equal(d.checkpoints[checkpointId],undefined);assert.equal(d.learning.lessons[checkpointId].attempts.length,3);assert.equal(d.notes[0].conclusion,'keep');
 const old={learning:{version:2,lessons:{sources:{bestStars:3,attempts:[{earned:1,possible:1,stars:3}]}},unlocked:['sources']}};const before=JSON.stringify(old.learning.lessons);initializeProgress(old,topics);assert.equal(canOpen(old,'sources',topics),true);assert.equal(JSON.stringify(old.learning.lessons),before);initializeProgress(old,topics);assert.equal(canOpen(old,'sources',topics),true);
});
