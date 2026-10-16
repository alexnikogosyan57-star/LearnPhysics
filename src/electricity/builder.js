import {wireEnds,normalizeCircuit,isFreeEnd} from './connectivity.js';
import {portX,terminalPoint,wireRoute,nearestTerminal} from './geometry.js';
import {circuitGuidance,circuitHintLevel,advanceCircuitHint} from './feedback.js';
import {componentDefs,componentArt} from './art.js';
import {solveCircuit} from './models.js';
const names={battery:'Մարտկոց',lamp:'Լամպ',switch:'Անջատիչ',resistor:'Դիմադրիչ',ammeter:'Ամպերաչափ',voltmeter:'Վոլտաչափ'};
export function initialCircuit(){return {components:[{id:'battery',type:'battery',x:100,y:170,voltage:9},{id:'switch',type:'switch',x:280,y:80,closed:false},{id:'lamp',type:'lamp',x:465,y:170,resistance:20}],wires:[],junctions:[]};}
export function circuitView(model) {
 normalizeCircuit(model);const result=solveCircuit(model.components,model.wires,model.junctions);
 const point=t=>terminalPoint(model,t);
 const wirePaths=model.wires.map((w,i)=>{const [a,b]=wireEnds(w),p=point(a),q=point(b);return p&&q?`<g><path d="${wireRoute(p,q)}" fill="none" stroke="white" stroke-width="10" pointer-events="none"/><path data-wire="${i}" data-wire-id="${w.id}" d="${wireRoute(p,q)}" fill="none" stroke="${model.selectedWire===w.id?'#d98b24':'#3286b2'}" stroke-width="4" stroke-linejoin="round" tabindex="0" role="button" aria-label="Լար ${i+1}․ ընտրիր՝ միացումը փոխելու համար"/>${[p,q].map((p,n)=>isFreeEnd(n?b:a)?`<circle cx="${p.x}" cy="${p.y}" r="7" fill="white" stroke="#c46b39" stroke-width="3"/>`:'').join('')}</g>`:'';}).join('');
 const selectedWire=model.wires.find(w=>w.id===model.selectedWire);
 const handles=selectedWire?['start','end'].map(end=>{const p=point(selectedWire[end]);return p?`<circle data-wire-end="${end}" cx="${p.x}" cy="${p.y}" r="13" fill="#fff5dd" stroke="#bc7623" stroke-width="3" tabindex="0" role="button" aria-label="Լարի ${end==='start'?'սկիզբը':'վերջը'}․ քաշիր կամ Delete-ով անջատիր"/>`:'';}).join(''):'';
 const junctions=model.junctions.map(j=>`<g><circle cx="${j.x}" cy="${j.y}" r="24" data-terminal="j:${j.id}" fill="transparent" tabindex="0" role="button" aria-label="Հաղորդիչ հանգույց"/><circle cx="${j.x}" cy="${j.y}" r="6" fill="#255d7e" stroke="white" stroke-width="2" pointer-events="none"/></g>`).join('');
 const components=model.components.map(c=>{
  const power=['open','closed'].includes(result.status)?result.powers[c.id]||0:0,brightness=Math.min(1,power/4.05);

  const value=result.meters?.[c.id],display=value==null?'—':Math.abs(value)>(c.range??(c.type==='ammeter'?1:20))?'Սահմանից դուրս':value.toLocaleString('hy-AM',{maximumSignificantDigits:5});
  const picture=componentArt({...c,display},'bench',brightness);
  return `<g transform="translate(${c.x} ${c.y})" data-component="${c.id}" data-power="${power}" data-selected="${model.selected===c.id}" tabindex="0" role="button" aria-label="${names[c.type]}․ տեղափոխիր սլաքներով"><g data-art="${c.id}" transform="rotate(${c.rotation||0})">${picture}</g><text y="64" text-anchor="middle" font-size="20" fill="#52625a">${names[c.type]}</text></g>${['a','b'].map(port=>{const p=point(c.id+':'+port);return `<circle cx="${p.x}" cy="${p.y}" r="24" fill="transparent" stroke="none" tabindex="0" role="button" data-terminal="${c.id}:${port}" aria-label="${names[c.type]}․ ${port==='a'?'առաջին':'երկրորդ'} ելք"/><circle cx="${p.x}" cy="${p.y}" r="9" fill="white" stroke="#347A47" stroke-width="3" pointer-events="none" aria-hidden="true"/><text x="${p.x}" y="${p.y+25}" text-anchor="middle" font-size="12" fill="#466574" pointer-events="none">${c.type==='battery'||['ammeter','voltmeter'].includes(c.type)?port==='a'?'+':'−':port==='a'?'ա':'բ'}</text>`;}).join('')}`;
 }).join('');
 const message={invalid:'Կապերի տվյալները սխալ են․ ելքը կամ տարրի համարը գոյություն չունի։ Վերականգնիր կապը կամ սկսիր սկզբից։',closed:'Շղթան փակ է։ Աղբյուրից հոսանք է անցնում։',open:'Շղթան բաց է։ Ստուգիր երկու ելքերի կապերն ու անջատիչը։','meter-short':'Ամպերաչափը աղբյուրին զուգահեռ է՝ իդեալական կարճ միացում։ Տեղադրիր այն բեռի հետ հաջորդաբար։ Չափում չենք հորինում։',short:'Աղբյուրի ելքերը ուղղակի միացված են․ կարճ միացում է։ Չափում չի հաշվարկվում։',unsupported:'Այս կապակցման համար չափում չենք ցուցադրում։ Ստուգիր բեռի կապերը։','no-source':'Աղբյուրը բացակայում է․ սկսիր փորձը սկզբից։'}[result.status];
 return `<section class="circuit-workbench"><p class="experiment-instruction">Միացման համար ընտրիր երկու ելք։ Տարրերը կարող ես քաշել կամ տեղափոխել սլաքներով։</p><svg id="circuit-canvas" viewBox="0 0 560 320" aria-label="Վիրտուալ շղթայի հավաքիչ">${componentDefs('bench')}${wirePaths}${components}${junctions}${handles}</svg><div class="circuit-guidance"><strong>Ռոբոտի հուշումը</strong><p id="circuit-diagnostic" role="status" aria-live="polite" aria-atomic="true">${circuitGuidance(model,result)}</p><button class="text-button" id="circuit-hint" ${circuitHintLevel(model)>=4?'disabled':''}>${circuitHintLevel(model)>=4?'Բացատրությունը բացված է':circuitHintLevel(model)?'Հաջորդ հուշումը':'Մի փոքր հուշում'}</button></div><p id="circuit-status" role="status">${message}${["open","closed"].includes(result.status)?` Հոսանքի ուժը՝ ${Number(result.current.toFixed(3)).toLocaleString("hy-AM")} Ա։`:""}</p><div class="circuit-tools"><button class="button secondary" id="circuit-switch"${model.components.some(c=>c.type==='switch')?'':' disabled'}>${model.components.find(c=>c.type==='switch')?.closed?'Բացել':'Փակել'} անջատիչը</button><button class="text-button" id="wire-undo" ${!model.wires.length?'disabled':''}>Հետարկել վերջին լարը</button><button class="text-button" id="circuit-reset">Սկսել սկզբից</button></div><button class="button secondary" id="measure-electric" ${!["open","closed"].includes(result.status)?"disabled":""}>Գրանցել չափումը</button><p class="model-note">${model.components.find(c=>c.type==='battery')?.voltage??'—'} Վ իդեալական աղբյուր․ ${model.components.filter(c=>['lamp','resistor'].includes(c.type)).map(c=>`${names[c.type]}՝ ${c.resistance} Օմ`).join('․ ')}։ Իդեալական ամպերաչափը՝ զրոյական, վոլտաչափը՝ անվերջ դիմադրությամբ։ Մարտկոցի և չափիչների բևեռները նշված են + և −։ Լամպի կոնտակտները բևեռայնություն չունեն։ Լարերի խաչումը միացում չէ․ հաղորդիչ հանգույցը նշվում է կետով։ Սա վիրտուալ փորձ է։</p></section>`;
}
export function bindCircuit(root,model,onChange) {
 const svg=root.querySelector('#circuit-canvas');if(!svg)return;
 const reply=root.querySelector('.circuit-guidance'),voice=root.querySelector('.robot-dialogue');if(reply&&voice)voice.append(reply);if(reply)root.querySelector('#circuit-diagnostic').textContent=circuitGuidance(model,solveCircuit(model.components,model.wires,model.junctions));
 normalizeCircuit(model);let selected=null,drag=null,wireDrag=null,endDrag=null,reconnect=null;
 const position=e=>{const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse());};
 const connect=el=>{
  if(reconnect){
   const {wire,end}=reconnect,target=el.dataset.terminal;
   if(target===wire[end==='start'?'end':'start']){root.querySelector('#circuit-status').textContent='Ընտրիր լարի մյուս ծայրից տարբեր ելք։';return;}
   wire[end]=target;reconnect=null;onChange();return;
  }
  if(!selected){selected=el.dataset.terminal;el.classList.add('terminal-pending');root.querySelector('#circuit-status').textContent='Հիմա ընտրիր լարի մյուս ելքը։';return;}
  const other=el.dataset.terminal;
  if(selected!==other&&!model.wires.some(w=>{const [a,b]=wireEnds(w);return (a===selected&&b===other)||(b===selected&&a===other);}))model.wires.push({id:crypto.randomUUID(),start:selected,end:other});
  selected=null;onChange();
 };
 root.querySelectorAll('[data-terminal]').forEach(el=>{
  el.onclick=()=>connect(el);
  el.onpointerdown=e=>{wireDrag={terminal:el.dataset.terminal,x:e.clientX,y:e.clientY};el.setPointerCapture(e.pointerId);};
  el.onkeydown=e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();connect(el);}};
 });
 function preview(e) {
  const origin=wireDrag?.terminal || selected;if(!origin)return;
  const anchor=terminalPoint(model,origin);if(!anchor)return;
  let path=svg.querySelector('#wire-preview');if(!path){path=document.createElementNS('http://www.w3.org/2000/svg','path');path.id='wire-preview';path.setAttribute('fill','none');path.setAttribute('stroke','#F5A447');path.setAttribute('stroke-width','4');path.setAttribute('pointer-events','none');svg.append(path);}
  const p=position(e);path.setAttribute('d',`M${anchor.x} ${anchor.y} L${p.x} ${p.y}`);
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
  el.onpointerdown=e=>{e.preventDefault();const c=model.components.find(c=>c.id===el.dataset.component),p=position(e);model.selected=c.id;root.querySelectorAll('[data-component]').forEach(g=>g.dataset.selected=String(g===el));drag={c,dx:p.x-c.x,dy:p.y-c.y};el.setPointerCapture(e.pointerId);};
  el.onpointermove=e=>{if(!drag||drag.c.id!==el.dataset.component)return;const p=position(e);drag.c.x=Math.max(95,Math.min(465,p.x-drag.dx));drag.c.y=Math.max(55,Math.min(240,p.y-drag.dy));el.setAttribute('transform',`translate(${drag.c.x} ${drag.c.y})`);
    for(const port of ['a','b']){const terminal=root.querySelector(`[data-terminal="${drag.c.id}:${port}"]`);terminal.setAttribute('cx',portX(drag.c,port));terminal.setAttribute('cy',drag.c.y);terminal.nextElementSibling.setAttribute('cx',portX(drag.c,port));terminal.nextElementSibling.setAttribute('cy',drag.c.y);terminal.nextElementSibling.nextElementSibling.setAttribute('x',portX(drag.c,port));terminal.nextElementSibling.nextElementSibling.setAttribute('y',drag.c.y+25);}
    model.wires.forEach((w,i)=>{const [a,b]=wireEnds(w),p=terminalPoint(model,a),q=terminalPoint(model,b);if(p&&q){const path=root.querySelector(`[data-wire="${i}"]`);path?.setAttribute('d',wireRoute(p,q));path?.previousElementSibling.setAttribute('d',wireRoute(p,q));}});};
  el.onpointerup=()=>{if(drag){const c=drag.c;c.x=Math.round(c.x/10)*10;c.y=Math.round(c.y/10)*10;drag=null;onChange(c.id);}};
  el.onpointercancel=()=>{drag=null;onChange();};
  el.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();model.selected=el.dataset.component;onChange(el.dataset.component);return;}const directions={ArrowLeft:[-10,0],ArrowRight:[10,0],ArrowUp:[0,-10],ArrowDown:[0,10]};if(!directions[e.key])return;e.preventDefault();const c=model.components.find(c=>c.id===el.dataset.component);c.x=Math.max(95,Math.min(465,c.x+directions[e.key][0]));c.y=Math.max(55,Math.min(240,c.y+directions[e.key][1]));onChange(c.id);};
 });
 const switchButton=root.querySelector('#circuit-switch');if(switchButton)switchButton.onclick=()=>{const c=model.components.find(c=>c.type==='switch');const previous=c?.closed;if(c)c.closed=!c.closed;onChange();if(c&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.querySelector('#circuit-canvas [data-switch-lever]')?.animate([{transform:`rotate(${previous?0:-28}deg)`,transformOrigin:'-28px 0px'},{transform:`rotate(${c.closed?0:-28}deg)`,transformOrigin:'-28px 0px'}],{duration:160,easing:'ease-out'});};
 root.querySelector('#wire-undo').onclick=()=>{model.wires.pop();onChange();};
 root.querySelector('#circuit-reset').onclick=()=>{Object.assign(model,initialCircuit());delete model.selected;delete model.selectedWire;onChange();};
 function paintElectrical(){const r=solveCircuit(model.components,model.wires,model.junctions);for(const c of model.components){const g=root.querySelector(`[data-component="${c.id}"]`),power=r.powers[c.id]||0;g.dataset.power=power;const value=r.meters[c.id];root.querySelector(`[data-art="${c.id}"]`).innerHTML=componentArt({...c,display:value==null?'—':Math.abs(value)>(c.range??(c.type==='ammeter'?1:20))?'Սահմանից դուրս':value.toLocaleString('hy-AM',{maximumSignificantDigits:5})},'bench',Math.min(1,power/4.05));}const diagnostic=root.querySelector('#circuit-diagnostic'),text=circuitGuidance(model,r);if(diagnostic.textContent!==text)diagnostic.textContent=text;const status=root.querySelector('#circuit-status'),statusText=r.status==='closed'?`Շղթան փակ է։ Հոսանքի ուժը՝ ${r.current.toLocaleString('hy-AM',{maximumSignificantDigits:5})} Ա։`:'Շղթան բաց է կամ միացումը անվավեր է։ Լամպի հոսանք չենք հորինում։';if(status.textContent!==statusText)status.textContent=statusText;root.querySelector('#measure-electric').disabled=!['open','closed'].includes(r.status);}
 root.querySelectorAll('[data-wire-id]').forEach(el=>{const choose=()=>{model.selectedWire=el.dataset.wireId;onChange();};el.onclick=choose;el.onkeydown=e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();choose();}};});
 root.querySelectorAll('[data-wire-end]').forEach(el=>{
  const wire=model.wires.find(w=>w.id===model.selectedWire),end=el.dataset.wireEnd;
  el.onpointerdown=e=>{e.preventDefault();e.stopPropagation();endDrag={wire,end};el.setPointerCapture(e.pointerId);};
  el.onpointermove=e=>{if(!endDrag)return;const p=position(e);wire[end]={x:Math.max(8,Math.min(552,p.x)),y:Math.max(8,Math.min(312,p.y))};el.setAttribute('cx',wire[end].x);el.setAttribute('cy',wire[end].y);const a=terminalPoint(model,wire.start),b=terminalPoint(model,wire.end),path=root.querySelector(`[data-wire-id="${wire.id}"]`);path.setAttribute('d',wireRoute(a,b));path.previousElementSibling.setAttribute('d',wireRoute(a,b));paintElectrical();};
  el.onpointerup=e=>{if(!endDrag)return;const target=nearestTerminal(model,position(e),wire[end==='start'?'end':'start']);if(target)wire[end]=target;endDrag=null;onChange();};el.onpointercancel=()=>{endDrag=null;onChange();};
  el.onkeydown=e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();reconnect={wire,end};root.querySelector('#circuit-status').textContent='Հիմա ընտրիր նպատակային ելքը՝ սեղմելով այն կամ ստեղնաշարով Enter։';return;}if(['Delete','Backspace'].includes(e.key)){e.preventDefault();const p=terminalPoint(model,wire[end]);wire[end]={x:Math.max(8,p.x-25),y:Math.min(310,p.y+45)};onChange();}};
 });
 root.querySelector('#circuit-hint')?.addEventListener('click',()=>{advanceCircuitHint(model);onChange();});
}
