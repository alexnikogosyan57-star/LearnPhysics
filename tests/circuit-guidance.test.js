import test from 'node:test';
import assert from 'node:assert/strict';
import {initialCircuit} from '../src/electricity/builder.js';
import {solveCircuit} from '../src/electricity/models.js';
import {advanceCircuitHint,circuitHintLevel,circuitGuidance,circuitHints} from '../src/electricity/feedback.js';
const solve=m=>solveCircuit(m.components,m.wires,m.junctions);
test('four requested hints persist, never alter the circuit, and restart only on changed electrical evidence',()=>{
 const m=initialCircuit(),graph=JSON.stringify([m.components,m.wires]);
 const messages=[];for(let i=1;i<=4;i++){advanceCircuitHint(m);assert.equal(circuitHintLevel(m),i);messages.push(circuitGuidance(m,solve(m)));}
 assert.equal(new Set(messages).size,4);advanceCircuitHint(m);assert.equal(circuitHintLevel(m),4);
 assert.equal(JSON.stringify([m.components,m.wires]),graph);
 const restored=JSON.parse(JSON.stringify(m));assert.equal(circuitHintLevel(restored),4);
 restored.components[0].x+=10;assert.equal(circuitHintLevel(restored),4);
 restored.components[0].voltage=3;assert.equal(circuitHintLevel(restored),0);
 advanceCircuitHint(restored);assert.equal(circuitHintLevel(restored),1);
});
test('hints distinguish no source, short, free end, missing contact, open switch and powered load',()=>{
 const m=initialCircuit();assert.match(circuitHints({...m,components:m.components.slice(1)}, {status:'no-source'})[0],/էներգիա/);
 m.wires=[['battery:a','battery:b']];assert.match(circuitHints(m,solve(m))[2],/կարճ միացում/);
 m.wires=[{id:'wire',start:'battery:a',end:{x:30,y:20}}];assert.match(circuitHints(m,solve(m))[1],/ազատ ծայրը/);
 m.wires=[];assert.match(circuitHints(m,solve(m))[0],/երկու կոնտակտներն/);
 m.wires=[['battery:a','switch:a'],['switch:b','lamp:a'],['lamp:b','battery:b']];assert.match(circuitHints(m,solve(m))[0],/բացվածք/);
 m.components[1].closed=true;assert.match(circuitHints(m,solve(m))[0],/վառվում է/);
 assert.doesNotMatch(circuitHints(m,solve(m))[0],/I =|P =/);assert.match(circuitHints(m,solve(m))[3],/P = U/);
});
