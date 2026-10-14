import {test} from 'node:test';import assert from 'node:assert/strict';import {stepPendulum,pendulumPeriod,gravity} from '../src/labs/pendulum.js';
test('small angle reference, amplitude correction and numerical energy conservation',()=>{
 assert.ok(Math.abs(pendulumPeriod(1,.001)-2*Math.PI/Math.sqrt(gravity))<1e-6);
 assert.ok(pendulumPeriod(1,Math.PI/3)>pendulumPeriod(1,.1));
 let p={theta:.4,omega:0};const energy=s=>.5*s.omega*s.omega+gravity*(1-Math.cos(s.theta));const initial=energy(p);
 for(let i=0;i<2400;i++)p=stepPendulum(p,1,1/120);
 assert.ok(Math.abs(energy(p)-initial)<1e-6);
});
