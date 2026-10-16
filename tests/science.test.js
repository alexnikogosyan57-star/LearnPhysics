import test from 'node:test';import assert from 'node:assert/strict';
import * as M from '../src/science/models.js';import {meterCircuit,evaluate} from '../src/science/experiments.js';import {solveCircuit} from '../src/electricity/models.js';import {scoreActivity} from '../src/learning/activities.js';
const near=(a,b,tol=1e-9)=>assert.ok(Math.abs(a-b)<=tol,`${a} != ${b}`);
test('Coulomb signs, inverse square, conserved transfer and atom charge, field independent of probe',()=>{
 const p={q1:2,q2:-3,x1:0,x2:1,y1:0,y2:0},r=M.electrostatic(p);assert.equal(r.attract,true);near(M.electrostatic({...p,x2:2}).force,r.force/4);near(r.fx,-r.force);assert.equal(M.electrostatic({...p,q2:3}).attract,false);assert.throws(()=>M.electrostatic({...p,x2:0}));
 const a=M.atom({protons:4,electrons:3,neutrons:4});near(a.charge,1);near(a.charge+a.reservoir,0);near(M.transfer({electrons:3}).a+M.transfer({electrons:3}).b,0);
 const f=M.electricField({charge:2,test:1,x:1,y:0}),g=M.electricField({charge:2,test:-1,x:1,y:0});near(f.magnitude,g.magnitude);near(f.force,-g.force);
});
test('modified nodal analysis: actual ammeter branch, voltmeter nodes, polarity, floating probes, short and source limits',()=>{
 const p={voltage:12,resistance:6,ammeter:'series',voltmeter:'parallel'},r=meterCircuit(p);near(r.meters.amp,2);near(r.meters.volt,12);near(r.nodeVoltages['load:a']-r.nodeVoltages['load:b'],r.meters.volt);
 near(meterCircuit({...p,reverseA:true}).meters.amp,-2);near(meterCircuit({...p,reverseV:true}).meters.volt,-12);assert.equal(meterCircuit({...p,ammeter:'parallel'}).status,'meter-short');near(meterCircuit({...p,voltmeter:'series'}).current,0);
 assert.equal(meterCircuit({...p,voltmeter:'missing'}).meters.volt,null);
 const c=[{id:'b',type:'battery',voltage:12},{id:'a',type:'ammeter'},{id:'r',type:'resistor',resistance:6},{id:'r2',type:'resistor',resistance:3},{id:'v',type:'voltmeter'}];const w=[['b:a','a:a'],['a:b','r:a'],['r:b','b:b'],['b:a','r2:a'],['r2:b','b:b'],['r:a','v:a'],['r:b','v:b']];const s=solveCircuit(c,w);near(s.current,6);near(s.meters.a,2);near(s.meters.v,12);c.push({id:'b2',type:'battery',voltage:3});assert.equal(solveCircuit(c,w).status,'unsupported');
});
test('Daniell cell valid parts, correct reactions, voltage and changed load current',()=>{
 const r=M.daniell({resistance:100});near(r.voltage,1.1);near(r.current,.011);near(M.daniell({resistance:200}).current,.0055);assert.equal(M.daniell({bridge:false}).voltage,null);near(M.daniell({wire:false}).current,0);assert.equal(r.oxidation,'Zn → Zn²⁺ + 2e⁻');assert.equal(r.reduction,'Cu²⁺ + 2e⁻ → Cu');
});
test('force reference, static versus kinetic friction, incline and energy conservation',()=>{
 near(M.kinematics(4,{v0:3}).x,12);near(M.forceMotion({force:10,mass:2}).a,5);near(M.forceMotion({force:2,mass:2,mu:.3}).a,0);assert.ok(M.forceMotion({force:10,mass:2,mu:.3}).a>0);near(M.incline({angle:30,mass:2,mu:0}).a,M.G/2);near(M.incline({angle:5,mass:2,mu:.3}).a,0);
 for(const t of [0,.1,.5,1,3]){const r=M.falling({height:5,mass:2},t);near(r.potential+r.kinetic,r.total,1e-8);assert.ok(r.y>=0);}
});
test('thermal conservation, pressure/buoyancy, waves, reflection and Snell law',()=>{
 const p={mass:2,temperature:80};near(M.thermal(p,1000).equilibrium,60);near(M.thermal(p,0).energy,M.thermal(p,300).energy,1e-6);near(M.pressure({mass:10,area:.02}),4905);near(M.hydrostatic({depth:2}),19620);near(M.buoyancy({density:600}).force,M.buoyancy({density:600}).weight);near(M.wave({frequency:2,amplitude:.2},0).wavelength,1);
 for(const incoming of [-60,-20,0,30,60])for(const tilt of [-20,0,20]){const r=M.reflection({incoming,tilt});near(Math.hypot(r.reflected.x,r.reflected.y),1);near(Math.acos(Math.abs(r.reflected.x*r.n.x+r.reflected.y*r.n.y))*180/Math.PI,r.incidence,1e-6);}
 near(M.refraction({angle:30,n1:1,n2:1}).angle,30);assert.equal(M.refraction({angle:60,n1:1.5,n2:1}).tir,true);near(M.lens({focal:.3,object:.6}).image,.6);assert.equal(M.lens({focal:.3,object:.3}).infinite,true);
});
test('Faraday derivative, dipole symmetry, exact robot arcs and obstacle stopping',()=>{
 const p={position:.5,velocity:.2,turns:100},dt=1e-5;near(M.induction(p,0).emf,-100*(M.induction(p,dt).flux-M.induction(p,-dt).flux)/(2*dt),1e-8);
 near(M.dipole({x:1,y:.5}).magnitude,M.dipole({x:1,y:-.5}).magnitude);
 const init={x:1,y:2,angle:0,distance:0};const r=M.robotStep(init,{left:.4,right:.4},5);near(r.x,3);near(r.y,2);near(r.angle,0);near(M.robotStep(init,{left:-.2,right:.2},1).x,1);
 let state=init;for(let i=0;i<1500;i++)state=M.safeRobotStep(state,{left:.6,right:.6},.01);assert.ok(state.x<=3.81);assert.equal(state.collision,true);
});
test('activity scores: numerical comma, wrong units/text rejected, partial matching earns real points',()=>{
 near(scoreActivity({type:'number',answer:2},{number:'2,0'},3),3);near(scoreActivity({type:'number',answer:2},{number:'2 A'},3),0);near(scoreActivity({type:'number',answer:0},{number:''},3),0);
 near(scoreActivity({type:'matching',pairs:[['a','x'],['b','y']]},{matches:{0:'x',1:'x'}},4),2);near(evaluate('current',{voltage:6,resistance:10,closed:false},2).charge,0);
});

test('all E01–E46 are backed by actual investigations; ordered mastery unlocks exactly the next lesson',async()=>{
 const {topics}=await import('../src/learning/topics.js');const {investigations}=await import('../src/science/content.js');const {foundations}=await import('../src/learning/foundations-content.js');const {initializeProgress,recordResult,canOpen}=await import('../src/learning/progression.js');
 const lessons=topics.find(t=>t.id==='electricity').lessons;
 assert.equal(lessons.length,48);assert.equal(new Set(lessons.map(l=>l.id)).size,48);
 for(let n=1;n<=46;n++){const code=`E${String(n).padStart(2,'0')}`,l=lessons.find(l=>l.code===code);assert.ok(l,code);assert.equal(l.playable,true);assert.ok([...investigations,...foundations].some(x=>x.id===l.id));assert.equal(l.source,null);assert.equal(l.classification,n>=39?'supplementary-electronics':'prerequisite-foundation');}
 const d={};initializeProgress(d,topics);
 for(let i=0;i<lessons.length;i++){const l=lessons[i];assert.ok(canOpen(d,l.id,topics),l.id);if(i+1<lessons.length)assert.equal(canOpen(d,lessons[i+1].id,topics),false);recordResult(d,l.id,7,10,{},topics);if(i+1<lessons.length)assert.ok(canOpen(d,lessons[i+1].id,topics));}
});
