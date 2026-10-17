import {test} from 'node:test';import assert from 'node:assert/strict';
import {ohm,network,led,cell,power,capacitor,solveCircuit} from '../src/electricity/models.js';
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} != ${b}`);
test('reference Ohm, series and parallel circuits',()=>{
 near(ohm(12,6),2);
 near(ohm(9,9),1);
 near(ohm(9,18),.5);
 near(network(10,4,6).resistance,10);
 near(network(6,6,3,true).resistance,2);
 near(network(6,6,3,true).current,3);
 const b={id:'b',type:'battery',voltage:9}, r9={id:'r',type:'resistor',resistance:9}, r18={id:'r',type:'resistor',resistance:18};
 const wires=[['b:a','r:a'],['r:b','b:b']];
 const sol9=solveCircuit([b,r9],wires);
 near(sol9.current,1);
 near(sol9.voltageDrops.r,9);
 near(sol9.powers.r,9);
 const sol18=solveCircuit([b,r18],wires);
 near(sol18.current,.5);
 near(sol18.voltageDrops.r,9);
 near(sol18.powers.r,4.5);
});
test('nodal connectivity, open switch, parallel loads, dangling load, source short',()=>{
 const c=[{id:'b',type:'battery',voltage:9},{id:'s',type:'switch',closed:false},{id:'l',type:'lamp',resistance:20}];const wires=[['b:a','s:a'],['s:b','l:a'],['l:b','b:b']];
 assert.equal(solveCircuit(c,wires).status,'open');c[1].closed=true;near(solveCircuit(c,wires).current,.45);
 c.push({id:'r',type:'resistor',resistance:30});wires.push(['b:a','r:a'],['r:b','b:b']);near(solveCircuit(c,wires).current,.75);
 c.push({id:'d',type:'lamp',resistance:20});assert.equal(solveCircuit(c,wires).lamps.d,0);
 wires.push(['b:a','b:b']);assert.equal(solveCircuit(c,wires).status,'short');
});
test('LED limits, RC time constant, DC energy and documented Daniell potential',()=>{
 near(led(5,300).current,.01);assert.equal(led(5,0).unsafe,true);assert.equal(led(5,50).lit,false);assert.equal(led(5,300,false).current,0);
 near(capacitor(5,1000,1000,1).tau,1);near(capacitor(5,1000,1000,1).voltage,5*(1-Math.exp(-1)));
 near(capacitor(5,1000,1000,1,true).voltage,5*Math.exp(-1));
 near(power(6,12,10).joules,30);near(cell().potential,.34-(-.76));assert.equal(cell(false,true).sustained,false);
});
