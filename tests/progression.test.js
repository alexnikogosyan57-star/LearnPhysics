import test from 'node:test';import assert from 'node:assert/strict';
import {initializeProgress,canOpen,recordResult,starsFor,nextLesson} from '../src/learning/progression.js';
const topics=[{id:'electric',lessons:[{id:'one',playable:true},{id:'two',playable:true},{id:'three',playable:true},{id:'four',playable:true}]},{id:'mechanic',lessons:[{id:'motion',playable:true}]}];
test('A–I: assessment thresholds, sequential unlocks, best score, reload, topic independence and final navigation',()=>{
 const d={};initializeProgress(d,topics);assert.equal(canOpen(d,'one',topics),true);assert.equal(canOpen(d,'two',topics),false);assert.equal(canOpen(d,'three',topics),false);
 assert.equal(recordResult(d,'one',6,10,{},topics).stars,1);assert.equal(canOpen(d,'two',topics),false);
 assert.equal(recordResult(d,'one',7,10,{},topics).stars,2);assert.equal(nextLesson(d,'one',topics).id,'two');assert.equal(canOpen(d,'three',topics),false);
 recordResult(d,'two',10,10,{},topics);assert.equal(canOpen(d,'three',topics),true);assert.equal(canOpen(d,'four',topics),false);
 recordResult(d,'one',0,10,{},topics);assert.equal(d.learning.lessons.one.bestStars,2);assert.equal(canOpen(d,'two',topics),true);
 const loaded=JSON.parse(JSON.stringify(d));initializeProgress(loaded,topics);assert.equal(canOpen(loaded,'three',topics),true);assert.equal(canOpen(loaded,'motion',topics),true);
 recordResult(loaded,'motion',10,10,{},topics);assert.equal(nextLesson(loaded,'motion',topics),null);assert.equal(loaded.learning.lessons.one.attempts.length,3);
 for(const [n,s] of [[0,0],[3,0],[4,1],[6,1],[7,2],[8,2],[9,3],[10,3]])assert.equal(starsFor(n,10),s);
 assert.throws(()=>starsFor(0,0));assert.throws(()=>starsFor(12,10));
});
