import {solveCircuit} from '../electricity/models.js';
import {electrostatic} from '../science/models.js';
import {checkpointQuestions,conceptNames} from './checkpoint-content.js';
export function checkpointStars(earned,possible=25){
 if(!Number.isFinite(earned)||!Number.isFinite(possible)||possible<=0||earned<0||earned>possible)throw new RangeError('Invalid checkpoint score');
 return earned/possible>=.9?3:earned/possible>=.7?2:earned/possible>=.5?1:0;
}
export function simulationReading(kind,value){
 if(kind==='distance')return {force:electrostatic({q1:1,q2:1,x1:0,x2:value,y1:0,y2:0}).force*1e9,ratio:1/value**2}; // q1=q2=1 nC; force in nN
 if(kind==='atom')return {charge:10-value};
 if(kind==='circuit'){
  const circuit={components:[{id:'source',type:'battery',voltage:3},{id:'lamp',type:'resistor',resistance:30},{id:'contact',type:'switch',closed:!!value.closed&&value.material==='copper'}],wires:[['source:a','contact:a'],['contact:b','lamp:a'],['lamp:b','source:b']]};
  return {current:solveCircuit(circuit.components,circuit.wires).current};
 } // ideal 3 V source, 30 ohm lamp
 throw new Error('Unknown experiment');
}
export function correctResponse(q,response){
 if(response===undefined||response===null)return false;
 if(q.type==='simulation'){
  if(!response.measured)return false;
  const v=response.value;
  if(q.simulation==='distance')return Number.isFinite(v)&&Math.abs(simulationReading('distance',v).ratio-.25)<1e-8;
  if(q.simulation==='atom')return Number.isInteger(v)&&simulationReading('atom',v).charge===-2;
  return simulationReading('circuit',v).current>0;
 }
 if(q.type==='number'){if(String(response).trim()==='')return false;const n=Number(String(response).replace(',','.'));return Number.isFinite(n)&&n===q.answer;}
 return response===q.answer;
}
export function gradeCheckpoint(responses){
 const results=checkpointQuestions.map(q=>({id:q.id,topic:q.topic,answered:responses[q.id]!==undefined,correct:correctResponse(q,responses[q.id])}));
 const earned=results.filter(r=>r.correct).length;
 const concepts=Object.entries(conceptNames).map(([id,title])=>{const rows=results.filter(r=>r.topic===id);return {id,title,earned:rows.filter(r=>r.correct).length,possible:rows.length};});
 return {earned,possible:25,percent:earned*4,stars:checkpointStars(earned),results,concepts,weak:concepts.filter(c=>c.earned<c.possible).map(c=>c.id)};
}
