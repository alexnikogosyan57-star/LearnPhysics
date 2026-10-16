import test from 'node:test';import assert from 'node:assert/strict';
import {ensureAssessment} from '../src/learning/assessment-flow.js';
import {scoreActivity,isAnswered} from '../src/learning/activities.js';
import {continueAssessment} from '../src/learning/assessment-machine.js';
test('in-flight legacy assessment migration retains submitted answers and last feedback even at final question',()=>{
 for(const quiz of [[{answer:1,correct:false,weight:3}],[{answer:{choice:0},points:3,weight:3},{answer:{number:'2'},points:3,weight:3},{answer:{matches:{0:'A',1:'wrong'}},points:2,weight:4}]]){
 const owner={quiz:structuredClone(quiz)},f=ensureAssessment(owner);
 assert.equal(f.machine.phase,'FEEDBACK');assert.equal(f.machine.index,quiz.length-1);assert.equal(f.machine.original.length,quiz.length);
 assert.equal(f.machine.original[0].correct,quiz[0].correct??true);assert.deepEqual(owner.quiz,quiz);
 const restored=JSON.parse(JSON.stringify(owner));assert.deepEqual(ensureAssessment(restored),f);
 continueAssessment(f.machine,3);assert.equal(f.machine.phase,quiz.length===3?'MISTAKE_REVIEW':'ANSWERING');
 }
});
test('explicit numeric tolerances, units outside numeric input, and normalized accepted Armenian text',()=>{
 const q={type:'number',answer:10,tolerance:.1,unit:'Վ'};assert.equal(scoreActivity(q,{number:'10,05'},1),1);assert.equal(scoreActivity(q,{number:'10.2'},1),0);assert.equal(scoreActivity(q,{number:'10 Վ'},1),0);
 const text={type:'text',acceptedAnswers:['Փակ շղթա']};assert.equal(isAnswered(text,{text:' '}),false);assert.equal(scoreActivity(text,{text:'  փակ   շղթա  '},1),1);assert.equal(scoreActivity(text,{text:'բաց շղթա'},1),0);
});
