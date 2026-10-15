import test from 'node:test';import assert from 'node:assert/strict';
import {solveCircuit} from '../src/electricity/models.js';import {initialCircuit,circuitView} from '../src/electricity/builder.js';import {terminalPoint,wireRoute} from '../src/electricity/geometry.js';import {normalizeCircuit,joinWires,wireEnds} from '../src/electricity/connectivity.js';
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} != ${b}`);
const source={id:'b',type:'battery',voltage:9,x:100,y:170},lamp={id:'l',type:'lamp',resistance:20,x:465,y:170};
const closed=[['b:a','l:a'],['l:b','b:b']];
test('1–5,17: power requires BOTH lamp terminals and a complete return; switch is an electrical break',()=>{
 const full=solveCircuit([source,lamp],closed);assert.equal(full.status,'closed');near(full.branchCurrents.l,.45);near(full.powers.l,4.05);near(full.voltageDrops.l,9);
 for(const wires of [[],closed.slice(0,1),closed.slice(1),[['b:a','l:a'],['l:a','b:b']]]){const r=solveCircuit([source,lamp],wires);assert.equal(r.powers.l||0,0);const html=circuitView({components:[source,lamp],wires});assert.match(html,/data-component="l" data-power="0"/);}
 const sw={id:'s',type:'switch',closed:false};const wires=[['b:a','s:a'],['s:b','l:a'],['l:b','b:b']];near(solveCircuit([source,lamp,sw],wires).powers.l,0);sw.closed=true;near(solveCircuit([source,lamp,sw],wires).powers.l,4.05);
 const reversed=solveCircuit([source,lamp],[['b:a','l:b'],['l:a','b:b']]);near(reversed.branchCurrents.l,-.45);near(reversed.powers.l,4.05);
});
test('6–11: series, parallel, changed voltage/resistance and real branch/node instruments',()=>{
 const b={...source,voltage:12},r1={id:'r1',type:'resistor',resistance:6},r2={id:'r2',type:'resistor',resistance:3};
 const series=[['b:a','r1:a'],['r1:b','r2:a'],['r2:b','b:b']];near(solveCircuit([b,r1,r2],series).current,12/9);
 const parallel=[['b:a','r1:a'],['r1:b','b:b'],['b:a','r2:a'],['r2:b','b:b']];let r=solveCircuit([b,r1,r2],parallel);near(r.current,6);near(r.branchCurrents.r1,2);near(r.branchCurrents.r2,4);near(12/r.current,2);
 near(solveCircuit([{...b,voltage:6},r1,r2],parallel).current,3);near(solveCircuit([b,{...r1,resistance:12},r2],parallel).powers.r1,12);
 const a={id:'a',type:'ammeter'},v={id:'v',type:'voltmeter'};r=solveCircuit([b,r1,r2,a,v],[['b:a','a:a'],['a:b','r1:a'],...parallel.slice(1),['r1:a','v:a'],['r1:b','v:b']]);near(r.meters.a,2);near(r.meters.v,12);near(r.powers.r1,r.meters.a*r.meters.v);
});
test('12: geometry moves and rotates BOTH contacts without changing electrical identity or power',()=>{
 const m={components:[structuredClone(source),structuredClone(lamp)],wires:structuredClone(closed)};normalizeCircuit(m);const before=m.wires.map(w=>w.id);m.components[1].x=400;m.components[1].rotation=180;near(terminalPoint(m,'l:a').x,460);near(terminalPoint(m,'l:b').x,340);near(solveCircuit(m.components,m.wires).powers.l,4.05);assert.deepEqual(m.wires.map(w=>w.id),before);const d=wireRoute(terminalPoint(m,'b:a'),terminalPoint(m,'l:a'));assert.ok(d.startsWith('M40 170'));assert.ok(d.endsWith('H460'));
});
test('13: free endpoint is visibly detached, nonconductive, persisted, and can be reconnected',()=>{
 const m={components:[source,lamp],wires:structuredClone(closed)};normalizeCircuit(m);m.wires[1].end={x:190,y:270};let r=solveCircuit(m.components,m.wires);near(r.powers.l,0);assert.match(circuitView(m),/cx="190" cy="270" r="7"/);const restored=JSON.parse(JSON.stringify(m));near(solveCircuit(restored.components,restored.wires).powers.l,0);restored.wires[1].end='b:b';near(solveCircuit(restored.components,restored.wires).powers.l,4.05);
});
test('14–15: visual crossing never merges nets; explicit junction does merge and can reveal a short',()=>{
 const m={components:[source,lamp],wires:structuredClone(closed)};normalizeCircuit(m);near(solveCircuit(m.components,m.wires).powers.l,4.05);const ids=m.wires.map(w=>w.id);assert.equal(joinWires(m,ids[0],ids[1],{x:280,y:270}),true);assert.equal(m.junctions.length,1);assert.equal(m.wires.length,4);assert.equal(solveCircuit(m.components,m.wires,m.junctions).status,'short');assert.match(circuitView(m),/data-component="l" data-power="0"/);
});
test('16: source shorts, invalid terminal IDs, duplicate component IDs and unsupported sources never fabricate power',()=>{
 for(const wires of [[['b:a','b:b']],[['b:a','missing:a']]]){const r=solveCircuit([source,lamp],wires);assert.ok(['short','invalid'].includes(r.status));assert.deepEqual(r.powers,{});}
 assert.equal(solveCircuit([source,{...source}],[]).status,'invalid');assert.equal(solveCircuit([source,{...source,id:'b2'}],[]).status,'unsupported');assert.equal(solveCircuit([source,lamp],[null]).status,'invalid');
});
test('small nonzero currents remain a closed conducting circuit; floating nodes have no invented potential',()=>{
 const r=solveCircuit([source,{...lamp,resistance:1e10}],closed);assert.equal(r.status,'closed');near(r.current,9e-10);const floating=solveCircuit([source,{...lamp,id:'free'}],[]);assert.equal(floating.nodeVoltages['free:a'],null);near(floating.powers.free,0);
});
test('overflow in finite inputs is reported as unsupported, never NaN or Infinity measurements',()=>{
 const r=solveCircuit([{...source,voltage:1e308},{...lamp,resistance:.01}],closed);assert.equal(r.status,'unsupported');assert.deepEqual(r.powers,{});assert.equal(JSON.stringify(r).includes('Infinity'),false);
});
test('fixed meter illustration routes terminate at the exact nodes used by MNA for every placement',async()=>{
 const {meterTopology}=await import('../src/science/experiments.js');const {meterWireRoute}=await import('../src/electricity/geometry.js');
 for(const ammeter of ['missing','series','parallel'])for(const voltmeter of ['missing','series','parallel']){
 const params={voltage:12,resistance:6,ammeter,voltmeter},t=meterTopology(params),positions={source:{x:90,y:190},load:{x:430,y:90},amp:ammeter==='parallel'?{x:90,y:290}:{x:240,y:90},volt:voltmeter==='series'?{x:430,y:290}:{x:430,y:225}},model={components:t.components.map(c=>({...c,...positions[c.id]}))};
 for(const [a,b] of t.wires){const p=terminalPoint(model,a),q=terminalPoint(model,b),d=meterWireRoute(params,a,b,model);assert.ok(d.startsWith(`M${p.x} ${p.y}`));assert.ok(d.endsWith(`H${q.x}`)||d.endsWith(`V${q.y}`));}
 }
});
