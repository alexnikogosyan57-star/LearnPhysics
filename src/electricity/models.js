// Ideal DC models: voltages in V, resistance in ohms, current in A.
export const ohm = (voltage,resistance) => resistance > 0 ? voltage/resistance : null;
export function network(voltage,r1,r2,parallel=false) {
  const resistance=parallel ? 1/(1/r1+1/r2) : r1+r2;
  const current=ohm(voltage,resistance);
  return {resistance,current,i1:parallel?voltage/r1:current,i2:parallel?voltage/r2:current,v1:parallel?voltage:current*r1,v2:parallel?voltage:current*r2};
}
export function led(voltage,resistance,forward=true) {
  // Piecewise introductory red LED model, Vf=2 V, nominal max current 20 mA.
  if(resistance<=0)return {current:0,lit:false,unsafe:true};
  const current=forward?Math.max(0,(voltage-2)/resistance):0;
  return {current,lit:current>0 && current<=.02,unsafe:current>.02};
}
export function cell(saltBridge=true,wire=true) {
  // Zn2+/Zn -0.76 V; Cu2+/Cu +0.34 V vs SHE, 298 K, unit activity.
  return {potential:1.10,sustained:saltBridge&&wire,anode:'Zn',cathode:'Cu'};
}
export function power(voltage,resistance,time) {
  const current=ohm(voltage,resistance),watts=voltage*current;
  return {current,watts,joules:watts*time};
}
export function capacitor(voltage,resistance,microfarads,time,discharging=false) {
  const tau=resistance*microfarads/1e6;
  return {tau,voltage:voltage*(discharging?Math.exp(-time/tau):1-Math.exp(-time/tau))};
}
export function acceleration(a,time,v0=0) {return {speed:v0+a*time,distance:v0*time+.5*a*time*time};}

function solve(a,b) {
  const n=b.length;
  for(let k=0;k<n;k++) {
    let pivot=k;for(let i=k+1;i<n;i++)if(Math.abs(a[i][k])>Math.abs(a[pivot][k]))pivot=i;
    if(Math.abs(a[pivot][k])<1e-10)return null;
    [a[k],a[pivot]]=[a[pivot],a[k]];[b[k],b[pivot]]=[b[pivot],b[k]];
    const p=a[k][k];for(let j=k;j<n;j++)a[k][j]/=p;b[k]/=p;
    for(let i=0;i<n;i++)if(i!==k){const f=a[i][k];for(let j=k;j<n;j++)a[i][j]-=f*a[k][j];b[i]-=f*b[k];}
  }
  return b;
}
export function solveCircuit(components,wires) {
 const empty=status=>({status,current:0,lamps:{},branchCurrents:{},nodeVoltages:{},meters:{}});
 const sources=components.filter(c=>c.type==='battery');if(!sources.length)return empty('no-source');
 if(sources.length!==1||components.some(c=>!['battery','switch','lamp','resistor','ammeter','voltmeter'].includes(c.type)))return empty('unsupported');
 const battery=sources[0],voltage=battery.voltage??9;if(!Number.isFinite(voltage))return empty('unsupported');
 const parents=new Map();for(const c of components)for(const port of ['a','b'])parents.set(`${c.id}:${port}`,`${c.id}:${port}`);
 const root=x=>{const p=parents.get(x);if(p===undefined)return null;if(p!==x)parents.set(x,root(p));return parents.get(x);};
 const union=(a,b)=>{const x=root(a),y=root(b);if(x&&y&&x!==y)parents.set(x,y);};
 for(const [a,b] of wires)union(a,b);
 for(const c of components)if(c.type==='switch'&&c.closed)union(c.id+':a',c.id+':b');
 const hi=root(battery.id+':a'),lo=root(battery.id+':b');if(hi===lo)return empty('short');
 const loads=components.filter(c=>['lamp','resistor'].includes(c.type)).map(c=>({id:c.id,a:root(c.id+':a'),b:root(c.id+':b'),r:c.resistance??20}));
 if(loads.some(c=>!Number.isFinite(c.r)||c.r<=0))return empty('unsupported');
 const amps=components.filter(c=>c.type==='ammeter').map(c=>({id:c.id,a:root(c.id+':a'),b:root(c.id+':b')}));
 // An ideal ammeter has zero resistance; a path of ideal ammeters across a
 // nonzero source is an invalid short, rather than an invented current.
 const ampReach=new Set([hi]);let changed=true;while(changed){changed=false;for(const c of amps)if(ampReach.has(c.a)||ampReach.has(c.b))for(const n of [c.a,c.b])if(!ampReach.has(n)){ampReach.add(n);changed=true;}}
 if(ampReach.has(lo)&&voltage!==0)return empty('meter-short');
 const reached=new Set([hi,lo]);changed=true;while(changed){changed=false;for(const c of [...loads,...amps])if(reached.has(c.a)||reached.has(c.b))for(const x of [c.a,c.b])if(!reached.has(x)){reached.add(x);changed=true;}}
 const activeAmps=amps.filter(c=>reached.has(c.a)&&reached.has(c.b)),unknown=[...reached].filter(x=>x!==hi&&x!==lo),index=new Map(unknown.map((x,i)=>[x,i]));
 const size=unknown.length+activeAmps.length,matrix=Array.from({length:size},()=>Array(size).fill(0)),rhs=Array(size).fill(0),potentials=new Map([[hi,voltage],[lo,0]]);
 for(const c of loads)for(const [a,b] of [[c.a,c.b],[c.b,c.a]])if(index.has(a)){
  const i=index.get(a),g=1/c.r;matrix[i][i]+=g;
  if(index.has(b))matrix[i][index.get(b)]-=g;else if(potentials.has(b))rhs[i]+=g*potentials.get(b);
 }
 activeAmps.forEach((c,j)=>{const k=unknown.length+j;for(const [node,sign] of [[c.a,1],[c.b,-1]]){if(index.has(node)){matrix[index.get(node)][k]+=sign;matrix[k][index.get(node)]+=sign;}else if(potentials.has(node))rhs[k]-=sign*potentials.get(node);}});
 const solution=solve(matrix,rhs);if(!solution)return empty('unsupported');unknown.forEach((n,i)=>potentials.set(n,solution[i]));
 const lamps={},branchCurrents={},meters={};let current=0;
 for(const c of loads){const i=potentials.has(c.a)&&potentials.has(c.b)?(potentials.get(c.a)-potentials.get(c.b))/c.r:0;lamps[c.id]=Math.abs(i);branchCurrents[c.id]=i;if(c.a===hi)current+=i;if(c.b===hi)current-=i;}
 activeAmps.forEach((c,j)=>{const i=solution[unknown.length+j];meters[c.id]=i;if(c.a===hi)current+=i;if(c.b===hi)current-=i;});
 for(const c of components)if(c.type==='voltmeter'){const a=potentials.get(root(c.id+':a')),b=potentials.get(root(c.id+':b'));meters[c.id]=a===undefined||b===undefined?null:a-b;}
 const nodeVoltages={};for(const key of parents.keys())nodeVoltages[key]=potentials.get(root(key))??null;
 return {status:Math.abs(current)>1e-8?'closed':'open',current:Math.max(0,current),lamps,branchCurrents,nodeVoltages,meters};
}
