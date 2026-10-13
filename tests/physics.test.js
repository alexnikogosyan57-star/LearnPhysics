import test from 'node:test';
import assert from 'node:assert/strict';
import {distance,advance,point} from '../src/physics.js';
test('SI constant speed reference cases',()=>{assert.equal(distance(2,5),10);assert.equal(distance(4,5),20);assert.equal(distance(2,10),20)});
test('time clamps at completion and zero',()=>{assert.equal(advance(4.9,.2,5),5);assert.equal(advance(0,-1,5),0)});
test('graph coordinates use same distance model',()=>{assert.deepEqual(point(2,5,10,60),{x:252,y:170-10/60*140})});
