// Stored terminal identities are electrical; free endpoints and coordinates are visual only.
export const wireEnds=w=>Array.isArray(w)?w:[w?.start,w?.end];
export const isFreeEnd=e=>e&&typeof e==='object'&&Number.isFinite(e.x)&&Number.isFinite(e.y);
export function normalizeCircuit(model){model.junctions ||= [];model.wires=model.wires.map((w,i)=>Array.isArray(w)?{id:`legacy-${i}-${w.join('-')}`,start:w[0],end:w[1]}:w);return model;}
export function joinWires(model,firstId,secondId,point){
 normalizeCircuit(model);const first=model.wires.find(w=>w.id===firstId),second=model.wires.find(w=>w.id===secondId);
 if(!first||!second||first===second||[...wireEnds(first),...wireEnds(second)].some(e=>typeof e!=='string'))return false;
 const id=crypto.randomUUID(),node='j:'+id;model.junctions.push({id,x:point.x,y:point.y});
 model.wires=model.wires.filter(w=>w!==first&&w!==second);
 for(const w of [first,second])model.wires.push({id:w.id,start:w.start,end:node},{id:crypto.randomUUID(),start:node,end:w.end});return true;
}
