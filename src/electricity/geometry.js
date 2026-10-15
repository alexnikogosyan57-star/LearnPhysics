import {isFreeEnd} from './connectivity.js';
export const portX=(c,port)=>c.x+(port==='a'?-60:60)*(c.rotation===180?-1:1);
export function terminalPoint(model,key){
 if(isFreeEnd(key))return {...key,dir:0};if(typeof key!=='string')return null;
 if(key.startsWith('j:')){const j=model.junctions?.find(j=>'j:'+j.id===key);return j?{x:j.x,y:j.y,dir:0}:null;}
 const [id,p]=key.split(':'),c=model.components.find(c=>c.id===id);return c&&['a','b'].includes(p)?{x:portX(c,p),y:c.y,dir:(p==='a'?-1:1)*(c.rotation===180?-1:1)}:null;
}
export function wireRoute(p,q){
 const x=p.x+(p.dir||0)*18,tx=q.x+(q.dir||0)*18;
 const lane=Math.abs(p.y-q.y)<8?Math.min(286,Math.max(p.y,q.y)+95):(p.y+q.y)/2;
 return `M${p.x} ${p.y} H${x} V${lane} H${tx} V${q.y} H${q.x}`;
}
export function nearestTerminal(model,p,exclude){let key=null,min=26;for(const c of model.components)for(const port of ['a','b']){const k=c.id+':'+port,q=terminalPoint(model,k),d=Math.hypot(p.x-q.x,p.y-q.y);if(k!==exclude&&d<min){min=d;key=k;}}for(const j of model.junctions||[]){const k='j:'+j.id,d=Math.hypot(p.x-j.x,p.y-j.y);if(k!==exclude&&d<min){min=d;key=k;}}return key;}
// Fixed introductory apparatus uses the same terminal graph with uncluttered routes.
export function meterWireRoute(params,a,b,model){
 const p=terminalPoint(model,a),q=terminalPoint(model,b);if(params.reverseA||params.reverseV)return wireRoute(p,q);
 const start=`M${p.x} ${p.y}`;
 if(a==='source:a'&&b==='amp:a')return params.ammeter==='series'?`${start} H12 V${q.y} H${q.x}`:`${start} V${q.y}`;
 if(a==='amp:b'&&b==='load:a')return `${start} H${q.x}`;
 if(a==='source:a'&&b==='load:a')return `${start} H12 V${q.y} H${q.x}`;
 if(a==='source:b'&&b==='amp:b')return `${start} V${q.y}`;
 if(a==='load:b'&&b==='source:b')return `${start} H550 V335 H${q.x} V${q.y}`;
 if(a==='load:b'&&b==='volt:a')return `${start} H550 V200 H${q.x} V${q.y}`;
 if(a==='volt:b'&&b==='source:b')return `${start} H550 V350 H${q.x} V${q.y}`;
 return `${start} V${q.y} H${q.x}`;
}
