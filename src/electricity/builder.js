import {componentDefs,componentArt} from './art';
import {solveCircuit} from './models';
const names={battery:'Մարտկոց',lamp:'Լամպ',switch:'Անջատիչ',resistor:'Դիմադրիչ',ammeter:'Ամպերաչափ',voltmeter:'Վոլտաչափ'};
export function initialCircuit(){return {components:[{id:'battery',type:'battery',x:100,y:170,voltage:9},{id:'switch',type:'switch',x:280,y:80,closed:false},{id:'lamp',type:'lamp',x:465,y:170,resistance:20}],wires:[]};}
const portX=(c,port)=>c.x+(port==='a'?-60:60)*(c.rotation===180?-1:1);
function wireRoute(p,q) {
 if(Math.abs(p.y-q.y)<8 && Math.abs(p.x-q.x)>100) {
  const y=Math.min(290,Math.max(p.y,q.y)+95);
  return `M${p.x} ${p.y} V${y} H${q.x} V${q.y}`;
 }
 return `M${p.x} ${p.y} L${p.x} ${q.y} L${q.x} ${q.y}`;
}
export function circuitView(model) {
 const result=solveCircuit(model.components,model.wires);
 const point=terminal=>{const [id,p]=terminal.split(':');const c=model.components.find(c=>c.id===id);return c?{x:portX(c,p),y:c.y}:null;};
 const wirePaths=model.wires.map(([a,b],i)=>{const p=point(a),q=point(b);return p&&q?`<path data-wire="${i}" d="${wireRoute(p,q)}" fill="none" stroke="#4B9FE1" stroke-width="5" stroke-linejoin="round"/>`:'';}).join('');
 const components=model.components.map(c=>{
  const current=result.lamps[c.id]||0,brightness=Math.min(1,current*current*(c.resistance||20)/4.05);

  const value=result.meters?.[c.id],display=value==null?'—':Math.abs(value)>(c.range??(c.type==='ammeter'?1:20))?'Սահմանից դուրս':Number(value.toFixed(3)).toLocaleString('hy-AM');
  const picture=componentArt({...c,display},'bench',brightness);
  return `<g transform="translate(${c.x} ${c.y})" data-component="${c.id}" tabindex="0" role="button" aria-label="${names[c.type]}․ տեղափոխիր սլաքներով"><g transform="rotate(${c.rotation||0})">${picture}</g><text y="64" text-anchor="middle" font-size="20" fill="#52625a">${names[c.type]}</text></g>${['a','b'].map(port=>{const p=point(c.id+':'+port);return `<circle cx="${p.x}" cy="${p.y}" r="36" fill="transparent" stroke="none" tabindex="0" role="button" data-terminal="${c.id}:${port}" aria-label="${names[c.type]}․ ${port==='a'?'առաջին':'երկրորդ'} ելք"/><circle cx="${p.x}" cy="${p.y}" r="9" fill="white" stroke="#347A47" stroke-width="3" pointer-events="none" aria-hidden="true"/>`;}).join('')}`;
 }).join('');
 const message={closed:'Շղթան փակ է։ Աղբյուրից հոսանք է անցնում։',open:'Շղթան բաց է։ Ստուգիր երկու ելքերի կապերն ու անջատիչը։','meter-short':'Ամպերաչափը աղբյուրին զուգահեռ է՝ իդեալական կարճ միացում։ Տեղադրիր այն բեռի հետ հաջորդաբար։ Չափում չենք հորինում։',short:'Աղբյուրի ելքերը ուղղակի միացված են․ կարճ միացում է։ Չափում չի հաշվարկվում։',unsupported:'Այս կապակցման համար չափում չենք ցուցադրում։ Ստուգիր բեռի կապերը։','no-source':'Ավելացրու աղբյուր։'}[result.status];
 return `<section class="circuit-workbench"><p class="experiment-instruction">Միացման համար ընտրիր երկու ելք։ Տարրերը կարող ես քաշել կամ տեղափոխել սլաքներով։</p><svg id="circuit-canvas" viewBox="0 0 560 320" aria-label="Վիրտուալ շղթայի հավաքիչ">${componentDefs('bench')}${wirePaths}${components}</svg><p id="circuit-status" role="status">${message}${["open","closed"].includes(result.status)?` Հոսանքի ուժը՝ ${Number(result.current.toFixed(3)).toLocaleString("hy-AM")} Ա։`:""}</p><div class="circuit-tools"><button class="button secondary" id="circuit-switch"${model.components.some(c=>c.type==='switch')?'':' disabled'}>${model.components.find(c=>c.type==='switch')?.closed?'Բացել':'Փակել'} անջատիչը</button><button class="text-button" id="wire-undo" ${!model.wires.length?'disabled':''}>Հետարկել վերջին լարը</button><button class="text-button" id="circuit-reset">Սկսել սկզբից</button></div><button class="button secondary" id="measure-electric" ${!["open","closed"].includes(result.status)?"disabled":""}>Գրանցել չափումը</button><details><summary>Ավելացնել տարր</summary><div class="component-palette">${['battery','switch','lamp','resistor','ammeter','voltmeter'].map(type=>`<button class="button secondary" data-add-component="${type}" draggable="true">${names[type]}</button>`).join('')}</div><p>Կարող ես քաշել տարրը փորձի դաշտ կամ ավելացնել կոճակով։</p></details><details class="component-inspector" ${model.selected?'open':''}><summary>Տարրի և լարերի կարգավորումներ</summary><label class="field-label">Ընտրված տարրը<select id="component-select"><option value="">Ընտրիր տարրը</option>${model.components.map(c=>`<option value="${c.id}" ${model.selected===c.id?'selected':''}>${names[c.type]}</option>`).join('')}</select></label>${(()=>{const c=model.components.find(c=>c.id===model.selected);return c?`<div class="circuit-tools"><button class="text-button" id="component-rotate" ${['ammeter','voltmeter'].includes(c.type)?'disabled':''}>Պտտել 180°</button><button class="text-button" id="component-remove">Հեռացնել տարրը</button></div>${['battery','lamp','resistor','ammeter','voltmeter'].includes(c.type)?`<label class="field-label">${c.type==='battery'?'Լարում (Վ)':c.type==='lamp'||c.type==='resistor'?'Դիմադրություն (Օմ)':'Չափման վերին սահման'}<input id="component-value" type="number" min="0.01" max="10000" step="any" value="${c.type==='battery'?c.voltage:c.type==='resistor'||c.type==='lamp'?c.resistance:c.range??(c.type==='ammeter'?1:20)}"></label>`:''}`:'';})()}${model.wires.map(([a,b],i)=>`<button class="text-button" data-remove-wire="${i}">Հեռացնել լար ${i+1}</button>`).join('')}${model.components.filter(c=>['ammeter','voltmeter'].includes(c.type)).map(c=>`<p>${names[c.type]}՝ ${result.meters?.[c.id]==null?'Միացրու երկու ելքերը':Math.abs(result.meters[c.id])>(c.range??(c.type==='ammeter'?1:20))?'Ընտրիր ավելի մեծ չափման սահման':Number(result.meters[c.id].toFixed(3))+' '+(c.type==='ammeter'?'Ա':'Վ')}</p>`).join('')}</details><p class="model-note">${model.components.find(c=>c.type==='battery')?.voltage??9} Վ իդեալական աղբյուր․ բեռների դիմադրությունը նշված է կարգավորումներում։ Իդեալական ամպերաչափը՝ զրոյական, վոլտաչափը՝ անվերջ դիմադրությամբ։ Սարքերի «ա» ելքը դրականն է, «բ»-ը՝ բացասականը։ Սա վիրտուալ փորձ է։</p></section>`;
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
  const p=position(e),x=portX(c,port);path.setAttribute('d',`M${x} ${c.y} L${p.x} ${p.y}`);
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
  el.onpointerdown=e=>{e.preventDefault();const c=model.components.find(c=>c.id===el.dataset.component),p=position(e);model.selected=c.id;drag={c,dx:p.x-c.x,dy:p.y-c.y};el.setPointerCapture(e.pointerId);};
  el.onpointermove=e=>{if(!drag||drag.c.id!==el.dataset.component)return;const p=position(e);drag.c.x=Math.max(95,Math.min(465,p.x-drag.dx));drag.c.y=Math.max(55,Math.min(240,p.y-drag.dy));el.setAttribute('transform',`translate(${drag.c.x} ${drag.c.y})`);
    for(const port of ['a','b']){const terminal=root.querySelector(`[data-terminal="${drag.c.id}:${port}"]`);terminal.setAttribute('cx',portX(drag.c,port));terminal.setAttribute('cy',drag.c.y);terminal.nextElementSibling.setAttribute('cx',portX(drag.c,port));terminal.nextElementSibling.setAttribute('cy',drag.c.y);}
    model.wires.forEach(([a,b],i)=>{const point=t=>{const [id,port]=t.split(':');const c=model.components.find(x=>x.id===id);return {x:portX(c,port),y:c.y};};const p=point(a),q=point(b);root.querySelector(`[data-wire="${i}"]`)?.setAttribute('d',wireRoute(p,q));});};
  el.onpointerup=()=>{if(drag){const c=drag.c;c.x=Math.round(c.x/10)*10;c.y=Math.round(c.y/10)*10;drag=null;onChange(c.id);}};
  el.onpointercancel=()=>{drag=null;onChange();};
  el.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();model.selected=el.dataset.component;onChange(el.dataset.component);return;}const directions={ArrowLeft:[-10,0],ArrowRight:[10,0],ArrowUp:[0,-10],ArrowDown:[0,10]};if(!directions[e.key])return;e.preventDefault();const c=model.components.find(c=>c.id===el.dataset.component);c.x=Math.max(95,Math.min(465,c.x+directions[e.key][0]));c.y=Math.max(55,Math.min(240,c.y+directions[e.key][1]));onChange(c.id);};
 });
 const switchButton=root.querySelector('#circuit-switch');if(switchButton)switchButton.onclick=()=>{const c=model.components.find(c=>c.type==='switch');if(c)c.closed=!c.closed;onChange();};
 root.querySelector('#wire-undo').onclick=()=>{model.wires.pop();onChange();};
 root.querySelector('#circuit-reset').onclick=()=>{Object.assign(model,initialCircuit());delete model.selected;onChange();};
 const add=(type,p={x:280,y:210})=>{if(type==='battery'&&model.components.some(c=>c.type==='battery')){root.querySelector('#circuit-status').textContent='Այս մոդելը աջակցում է մեկ իդեալական աղբյուրի։';return;}if(model.components.length>=8){root.querySelector('#circuit-status').textContent='Այս փորձի դաշտում առավելագույնը 8 տարր է։';return;}model.components.push({id:crypto.randomUUID(),type,x:Math.max(95,Math.min(465,p.x)),y:Math.max(55,Math.min(240,p.y)),resistance:20,voltage:9,range:type==='ammeter'?1:20});onChange();};
 root.querySelectorAll('[data-add-component]').forEach(el=>{el.onclick=()=>add(el.dataset.addComponent);el.ondragstart=e=>e.dataTransfer.setData('text/plain',el.dataset.addComponent);});
 root.querySelector('#component-select').onchange=e=>{model.selected=e.target.value;onChange();};
 const c=model.components.find(c=>c.id===model.selected);
 root.querySelector('#component-rotate')?.addEventListener('click',()=>{c.rotation=c.rotation===180?0:180;onChange();});
 root.querySelector('#component-remove')?.addEventListener('click',()=>{model.components=model.components.filter(x=>x.id!==c.id);model.wires=model.wires.filter(pair=>pair.every(t=>!t.startsWith(c.id+':')));model.selected=null;onChange();});
 root.querySelector('#component-value')?.addEventListener('change',e=>{const value=Number(e.target.value);if(!(value>0)||!Number.isFinite(value)){root.querySelector('#circuit-status').textContent='Ընտրիր դրական, վերջավոր արժեք։';e.target.value=c.type==='battery'?c.voltage:c.resistance||c.range;return;}c[c.type==='battery'?'voltage':['ammeter','voltmeter'].includes(c.type)?'range':'resistance']=value;onChange();});
 root.querySelectorAll('[data-remove-wire]').forEach(b=>b.onclick=()=>{model.wires.splice(Number(b.dataset.removeWire),1);onChange();});
 svg.ondragover=e=>e.preventDefault();svg.ondrop=e=>{e.preventDefault();const type=e.dataTransfer.getData('text/plain');if(['battery','switch','lamp','resistor','ammeter','voltmeter'].includes(type))add(type,position(e));};
}
