import {solveCircuit} from './models';
const names={battery:'Մարտկոց',lamp:'Լամպ',switch:'Անջատիչ',resistor:'Դիմադրիչ'};
export function initialCircuit(){return {components:[{id:'battery',type:'battery',x:100,y:170,voltage:9},{id:'switch',type:'switch',x:280,y:80,closed:false},{id:'lamp',type:'lamp',x:465,y:170,resistance:20}],wires:[]};}
function wireRoute(p,q) {
 if(Math.abs(p.y-q.y)<8 && Math.abs(p.x-q.x)>100) {
  const y=Math.min(290,Math.max(p.y,q.y)+95);
  return `M${p.x} ${p.y} V${y} H${q.x} V${q.y}`;
 }
 return `M${p.x} ${p.y} L${p.x} ${q.y} L${q.x} ${q.y}`;
}
export function circuitView(model) {
 const result=solveCircuit(model.components,model.wires);
 const point=terminal=>{const [id,p]=terminal.split(':');const c=model.components.find(c=>c.id===id);return c?{x:c.x+(p==='a'?-60:60),y:c.y}:null;};
 const wirePaths=model.wires.map(([a,b],i)=>{const p=point(a),q=point(b);return p&&q?`<path data-wire="${i}" d="${wireRoute(p,q)}" fill="none" stroke="#4B9FE1" stroke-width="5" stroke-linejoin="round"/>`:'';}).join('');
 const components=model.components.map(c=>{
  const current=result.lamps[c.id]||0,brightness=Math.min(1,current*current*(c.resistance||20)/4.05);
  const lit=brightness>1e-6;const lampColor=`rgb(${Math.round(237+18*brightness)} ${Math.round(240-12*brightness)} ${Math.round(236-81*brightness)})`;
  const picture=c.type==='battery'?`<rect x="-25" y="-44" width="50" height="88" rx="10" fill="#586B59"/><rect x="-25" y="-44" width="50" height="23" rx="9" fill="#F5A447"/><text x="0" y="12" text-anchor="middle" fill="white" font-size="17">9 Վ</text>`:c.type==='lamp'?`<circle r="32" fill="${lit?lampColor:'#EDF0EC'}" stroke="#7D8B7A" stroke-width="3"/><path d="M-15 5l8-15 7 15 7-15 8 15" stroke="#68747D" stroke-width="3" fill="none"/>`:c.type==='switch'?`<rect x="-40" y="-22" width="80" height="44" rx="8" fill="#EBF2E7"/><path d="M-35 0L35 ${c.closed?0:-24}" stroke="#347A47" stroke-width="5"/>`:`<path d="M-35 0l8-15 10 30 10-30 10 30 10-15" stroke="#9779D4" stroke-width="5" fill="none"/>`;
  return `<g transform="translate(${c.x} ${c.y})" data-component="${c.id}" tabindex="0" role="button" aria-label="${names[c.type]}․ տեղափոխիր սլաքներով"><path d="M-60 0H-25M25 0H60" stroke="#7d9cb0" stroke-width="4"/>${picture}<text y="64" text-anchor="middle" font-size="20" fill="#52625a">${names[c.type]}</text></g>${['a','b'].map(port=>{const p=point(c.id+':'+port);return `<circle cx="${p.x}" cy="${p.y}" r="36" fill="transparent" stroke="none" tabindex="0" role="button" data-terminal="${c.id}:${port}" aria-label="${names[c.type]}․ ${port==='a'?'առաջին':'երկրորդ'} ելք"/><circle cx="${p.x}" cy="${p.y}" r="9" fill="white" stroke="#347A47" stroke-width="3" pointer-events="none" aria-hidden="true"/>`;}).join('')}`;
 }).join('');
 const message={closed:'Շղթան փակ է։ Լամպով հոսանք է անցնում։',open:'Շղթան բաց է։ Ստուգիր երկու ելքերի կապերն ու անջատիչը։',short:'Աղբյուրի ելքերը ուղղակի միացված են․ կարճ միացում է։ Չափում չի հաշվարկվում։',unsupported:'Այս կապակցման համար չափում չենք ցուցադրում։ Ստուգիր բեռի կապերը։','no-source':'Ավելացրու աղբյուր։'}[result.status];
 return `<section class="circuit-workbench"><p class="experiment-instruction">Միացման համար ընտրիր երկու ելք։ Տարրերը կարող ես քաշել կամ տեղափոխել սլաքներով։</p><svg id="circuit-canvas" viewBox="0 0 560 320" aria-label="Վիրտուալ շղթայի հավաքիչ">${wirePaths}${components}</svg><p id="circuit-status" role="status">${message}${["open","closed"].includes(result.status)?` Հոսանքի ուժը՝ ${Number(result.current.toFixed(3)).toLocaleString("hy-AM")} Ա։`:""}</p><div class="circuit-tools"><button class="button secondary" id="circuit-switch">${model.components.find(c=>c.type==='switch')?.closed?'Բացել':'Փակել'} անջատիչը</button><button class="text-button" id="wire-undo" ${!model.wires.length?'disabled':''}>Հետարկել վերջին լարը</button><button class="text-button" id="circuit-reset">Սկսել սկզբից</button></div><button class="button secondary" id="measure-electric" ${result.status!=="closed"?"disabled":""}>Գրանցել չափումը</button><details><summary>Ավելացնել տարր</summary><div class="component-palette">${['lamp','resistor'].map(type=>`<button class="button secondary" data-add-component="${type}" draggable="true">${names[type]}</button>`).join('')}</div><p>Կարող ես քաշել տարրը փորձի դաշտ կամ ավելացնել կոճակով։</p></details><p class="model-note">9 Վ իդեալական աղբյուր․ լամպերը՝ 20 Օմ օհմական բեռներ։ Սա վիրտուալ փորձ է։</p></section>`;
}
export function bindCircuit(root,model,onChange) {
 const svg=root.querySelector('#circuit-canvas');if(!svg)return;
 let selected=null,drag=null,wireDrag=null;
 const position=e=>{const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse());};
 const connect=el=>{
  if(!selected){selected=el.dataset.terminal;el.setAttribute('fill','#FFF2CC');el.setAttribute('stroke-width','5');root.querySelector('#circuit-status').textContent='Հիմա ընտրիր լարի մյուս ելքը։';return;}
  const other=el.dataset.terminal;
  if(selected!==other&&!model.wires.some(([a,b])=>(a===selected&&b===other)||(b===selected&&a===other)))model.wires.push([selected,other]);
  selected=null;onChange();
 };
 root.querySelectorAll('[data-terminal]').forEach(el=>{
  el.onclick=()=>connect(el);
  el.onpointerdown=e=>{wireDrag={terminal:el.dataset.terminal,x:e.clientX,y:e.clientY};el.setPointerCapture(e.pointerId);};
  el.onkeydown=e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();connect(el);}};
 });
 function preview(e) {
  const origin=wireDrag?.terminal || selected;if(!origin)return;
  const [id,port]=origin.split(':');const c=model.components.find(x=>x.id===id);if(!c)return;
  let path=svg.querySelector('#wire-preview');if(!path){path=document.createElementNS('http://www.w3.org/2000/svg','path');path.id='wire-preview';path.setAttribute('fill','none');path.setAttribute('stroke','#F5A447');path.setAttribute('stroke-width','4');path.setAttribute('pointer-events','none');svg.append(path);}
  const p=position(e),x=c.x+(port==='a'?-60:60);path.setAttribute('d',`M${x} ${c.y} L${p.x} ${p.y}`);
 }
 svg.addEventListener('pointermove',preview);
 svg.addEventListener('pointerup',e=>{
  if(!wireDrag)return;const origin=wireDrag;wireDrag=null;
  if(Math.hypot(e.clientX-origin.x,e.clientY-origin.y)<5)return;
  const p=position(e);let target=null,distance=Infinity;
  root.querySelectorAll('[data-terminal]').forEach(el=>{const d=Math.hypot(Number(el.getAttribute('cx'))-p.x,Number(el.getAttribute('cy'))-p.y);if(d<distance&&el.dataset.terminal!==origin.terminal){distance=d;target=el;}});
  if(target&&distance<=35){selected=origin.terminal;connect(target);}else svg.querySelector('#wire-preview')?.remove();
 });
 svg.addEventListener('pointercancel',()=>{wireDrag=null;svg.querySelector('#wire-preview')?.remove();});
 root.querySelectorAll('[data-component]').forEach(el=>{
  el.onpointerdown=e=>{e.preventDefault();const c=model.components.find(c=>c.id===el.dataset.component),p=position(e);drag={c,dx:p.x-c.x,dy:p.y-c.y};el.setPointerCapture(e.pointerId);};
  el.onpointermove=e=>{if(!drag||drag.c.id!==el.dataset.component)return;const p=position(e);drag.c.x=Math.max(95,Math.min(465,p.x-drag.dx));drag.c.y=Math.max(55,Math.min(240,p.y-drag.dy));el.setAttribute('transform',`translate(${drag.c.x} ${drag.c.y})`);
    for(const port of ['a','b']){const terminal=root.querySelector(`[data-terminal="${drag.c.id}:${port}"]`);terminal.setAttribute('cx',drag.c.x+(port==='a'?-60:60));terminal.setAttribute('cy',drag.c.y);terminal.nextElementSibling.setAttribute('cx',drag.c.x+(port==='a'?-60:60));terminal.nextElementSibling.setAttribute('cy',drag.c.y);}
    model.wires.forEach(([a,b],i)=>{const point=t=>{const [id,port]=t.split(':');const c=model.components.find(x=>x.id===id);return {x:c.x+(port==='a'?-60:60),y:c.y};};const p=point(a),q=point(b);root.querySelector(`[data-wire="${i}"]`)?.setAttribute('d',wireRoute(p,q));});};
  el.onpointerup=()=>{if(drag){const c=drag.c;c.x=Math.round(c.x/10)*10;c.y=Math.round(c.y/10)*10;drag=null;onChange(c.id);}};
  el.onpointercancel=()=>{drag=null;onChange();};
  el.onkeydown=e=>{const directions={ArrowLeft:[-10,0],ArrowRight:[10,0],ArrowUp:[0,-10],ArrowDown:[0,10]};if(!directions[e.key])return;e.preventDefault();const c=model.components.find(c=>c.id===el.dataset.component);c.x=Math.max(95,Math.min(465,c.x+directions[e.key][0]));c.y=Math.max(55,Math.min(240,c.y+directions[e.key][1]));onChange(c.id);};
 });
 root.querySelector('#circuit-switch').onclick=()=>{const c=model.components.find(c=>c.type==='switch');if(c)c.closed=!c.closed;onChange();};
 root.querySelector('#wire-undo').onclick=()=>{model.wires.pop();onChange();};
 root.querySelector('#circuit-reset').onclick=()=>{Object.assign(model,initialCircuit());onChange();};
 const add=(type,p={x:280,y:210})=>{if(model.components.length>=8){root.querySelector('#circuit-status').textContent='Այս փորձի դաշտում առավելագույնը 8 տարր է։';return;}model.components.push({id:crypto.randomUUID(),type,x:Math.max(95,Math.min(465,p.x)),y:Math.max(55,Math.min(240,p.y)),resistance:20});onChange();};
 root.querySelectorAll('[data-add-component]').forEach(el=>{el.onclick=()=>add(el.dataset.addComponent);el.ondragstart=e=>e.dataTransfer.setData('text/plain',el.dataset.addComponent);});
 svg.ondragover=e=>e.preventDefault();svg.ondrop=e=>{e.preventDefault();const type=e.dataTransfer.getData('text/plain');if(['lamp','resistor'].includes(type))add(type,position(e));};
}
