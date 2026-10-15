import {chargeTools,chargeEvidenceMarkup} from './charge-lab.js';
import {legacyInitial,legacyMarkup,bindLegacy} from './legacy-adapter.js';
import {experimentDefinitions,defaultParameters,evaluate,format,readingText} from './experiments.js';
import {sceneMarkup,paintScene,graphMarkup} from './rendering.js';
import * as M from './models.js';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function initialExperiment(kind,initial={}){return {parameters:kind.startsWith('legacy-')?legacyInitial(kind,initial):{...defaultParameters(kind),...initial},time:0,robot:{x:1,y:2,angle:0,distance:0},trail:[]};}
export function experimentMarkup(kind,state){
 if(kind.startsWith('legacy-'))return legacyMarkup(kind,state);
 const def=experimentDefinitions[kind],p=state.parameters,r=evaluate(kind,p,state.time,state.robot);
 const toggles=kind==='cell'?[['zinc','Ցինկի էլեկտրոդ'],['copper','Պղնձի էլեկտրոդ'],['solution','Էլեկտրոլիտներ'],['bridge','Աղային կամուրջ'],['wire','Արտաքին բեռի լար'],['meter','Վոլտաչափ']]:kind==='current'?[['closed','Փակ անջատիչ']]:kind==='robot'?[['avoid','Արգելքը տեսնելիս շրջվել']]:[];
 return `<section class="science-lab" data-science-kind="${kind}"><div class="science-visual">${sceneMarkup(kind,p,r)}${kind==='charges'?'<p class="charge-model-caption">Գնդիկները պահվում են տեղում։ Սլաքները ցույց են տալիս ուժի ուղղությունը, իսկ նրանց երկարությունը պայմանական է։</p>':''}</div><div class="science-readouts" aria-label="Կենդանի չափումներ">${r.readings.map((x,i)=>`<div><span>${x.label}</span><strong data-reading="${i}">${format(x.value)} <small>${x.unit}</small></strong></div>`).join('')}</div><p class="science-status" role="status"></p>${kind==='charges'?chargeTools(p,state):''}<div class="science-parameters">${def.params.map(x=>`<label for="science-${x.key}">${x.label}<strong data-parameter-label="${x.key}">${format(p[x.key])} ${x.unit}</strong><input id="science-${x.key}" data-science-param="${x.key}" type="range" min="${x.min}" max="${x.max}" step="${x.step}" value="${p[x.key]}"></label>`).join('')}</div>${kind==='symbols'?`<label class="field-label">Ընտրիր տարրը<select id="science-symbol">${[['battery','Մարտկոց'],['lamp','Լամպ'],['switch','Անջատիչ'],['resistor','Դիմադրիչ']].map(([id,name])=>`<option value="${id}" ${(p.part||'battery')===id?'selected':''}>${name}</option>`).join('')}</select></label>`:''}${kind==='meters'?`<div class="meter-placement"><label>Ամպերաչափի միացում<select data-meter-placement="ammeter"><option value="missing">Տեղադրիր սարքը</option><option value="series" ${p.ammeter==='series'?'selected':''}>Հաջորդական տեղում</option><option value="parallel" ${p.ammeter==='parallel'?'selected':''}>Զուգահեռ տեղում</option></select></label><label>Վոլտաչափի միացում<select data-meter-placement="voltmeter"><option value="missing">Տեղադրիր սարքը</option><option value="parallel" ${p.voltmeter==='parallel'?'selected':''}>Բեռին զուգահեռ</option><option value="series" ${p.voltmeter==='series'?'selected':''}>Շղթայի մեջ հաջորդաբար</option></select></label></div>`:''}${kind==='cell'?'<details class="cell-reactions"><summary>Կիսառեակցիաներն ու տեղափոխության ուղղությունները</summary><p>Անոդ՝ Zn → Zn²⁺ + 2e⁻։ Կաթոդ՝ Cu²⁺ + 2e⁻ → Cu։</p><p>Արտաքին էլեկտրոններ՝ Zn → Cu, պայմանական հոսանքը՝ հակառակ։ Կամրջի անիոնները՝ անոդային, կատիոնները՝ կաթոդային լուծույթ։ Ուղղությունները որակական են։</p></details>':''}${toggles.length?`<details class="science-parts"><summary>${kind==='cell'?'Տարրի մասերն ու կապերը':'Կառավարման պայմանը'}</summary>${toggles.map(([key,label])=>`<label><input type="checkbox" data-science-toggle="${key}" ${p[key]!==false&&key!=='avoid'||p[key]===true?'checked':''}>${label}</label>`).join('')}</details>`:''}<div class="science-controls">${!def.static?'<button class="button secondary" id="science-run">Սկսել փորձը</button><span id="science-time">0 վ</span>':''}<button class="text-button" id="science-reset">Սկսել սկզբից</button><button class="button" id="science-record">${['atom','transfer','symbols'].includes(kind)?'Գրանցել դիտարկումը':'Գրանցել չափումը'}</button></div><details class="science-graph-details"><summary>${kind==='charges'?'Ուժը՝ հեռավորությունից կախված':'Բացել գրաֆիկը'}</summary><div class="science-graph-wrap">${graphMarkup(r.graph,def.static?r.graph.maxT:state.time)}</div></details></section>`;
}
export function bindScience(root,kind,state,onPersist,onRecord,rerender){
 if(kind.startsWith('legacy-'))return bindLegacy(root,kind,state,onPersist,onRecord,rerender);
 const def=experimentDefinitions[kind],p=state.parameters;let running=false,raf,last=0,disposed=false;
 const result=()=>evaluate(kind,p,state.time,state.robot);
 const stop=()=>{running=false;cancelAnimationFrame(raf);};
 function redraw(){const r=result();const holder=document.createElement('div');holder.innerHTML=sceneMarkup(kind,p,r);const old=root.querySelector('.science-stage');if(old)old.innerHTML=holder.firstElementChild.innerHTML;else root.querySelector('.science-visual').append(holder.firstElementChild);root.querySelector('.science-graph-wrap').innerHTML=graphMarkup(r.graph,def.static?r.graph.maxT:state.time);bindDirect();paint();}
 function paint(){if(disposed)return;const r=result();paintScene(root,kind,p,r,state.time,state.trail);
 r.readings.forEach((x,i)=>{const target=root.querySelector(`[data-reading="${i}"]`);if(target)target.innerHTML=`${format(x.value)} <small>${x.unit}</small>`;});
 const cursor=root.querySelector('[data-graph-cursor]'),progress=def.static?kind==='charges'?r.distance/r.graph.maxT:kind==='electricity'||kind==='meters'?p.voltage/r.graph.maxT:1:state.time/r.graph.maxT;
 cursor?.setAttribute('d',`M${52+clamp(progress,0,1)*360} 42V215`);root.querySelector('[data-graph-clip]')?.setAttribute('width',kind==='charges'?360:clamp(progress,0,1)*360);
 const run=root.querySelector('#science-run');if(run)run.textContent=running?'Դադարեցնել':state.time?'Շարունակել':'Սկսել փորձը';const time=root.querySelector('#science-time');if(time)time.textContent=format(state.time)+' վ';
 if(kind==='charges'){
  const distance=M.electrostatic(p).distance;
  root.querySelector('#charge-distance').value=distance;
  root.querySelector('#charge-distance-label').textContent=format(distance)+' մ';
  root.querySelector('#charge-evidence').innerHTML=chargeEvidenceMarkup(p,state.reference);
  root.querySelector('#charge-double').disabled=distance>1.4+1e-8;
  root.querySelector('#charge-half').disabled=distance<.8-1e-8;
  root.querySelectorAll('[data-charge-preset]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.chargePreset==='opposite'?p.q1*p.q2<0:el.dataset.chargePreset==='positive'?p.q1>0&&p.q2>0:p.q1<0&&p.q2<0)));
 }
 root.querySelector('#science-record').disabled=(!def.static&&state.time<.1)||r.unsafe||state.requireSustained&&(!r.sustained||p.meter===false)||kind==='meters'&&(p.ammeter!=='series'||p.voltmeter!=='parallel')||kind==='cell'&&!r.valid;
 root.querySelector('.science-status').textContent=r.unsafe?'Ամպերաչափը աղբյուրին զուգահեռ միացնելիս իդեալական կարճ միացում է ստացվում։ Տեղադրիր այն հաջորդաբար։':kind==='meters'&&p.voltmeter==='series'?'Իդեալական վոլտաչափը հաջորդաբար տեղադրելիս ճանապարհը բաց է․ հոսանքը զրո է։':kind==='cell'&&!r.valid?'Ստուգիր երկու էլեկտրոդները, համապատասխան էլեկտրոլիտներն ու իոնային կապը։ ԷԼՇ չենք ցուցադրում։':kind==='refraction'&&r.tir?'Լրիվ ներքին անդրադարձում․ բեկված ճառագայթ չկա։':kind==='lens'&&r.infinite?'Առարկան կիզակետում է․ վերջավոր պատկերի հեռավորություն չկա։':kind==='robot'&&r.collision?'Ռոբոտը հասավ արգելքին։ Փոխիր պայմանը և սկսիր նոր փորձ։':'';
 }
 function resetClock(){stop();state.time=0;state.robot={x:1,y:2,angle:0,distance:0};state.trail=[];}
 function change(key,value){p[key]=value;resetClock();const param=def.params.find(x=>x.key===key);if(param){root.querySelector(`[data-science-param="${key}"]`).value=value;root.querySelector(`[data-parameter-label="${key}"]`).textContent=format(value)+' '+param.unit;}redraw();onPersist();}
 function tick(now){if(!running||disposed)return;if(document.hidden){stop();paint();onPersist();return;}
 const dt=Math.min(.05,(now-last)/1000)*(def.rate||1);last=now;const end=kind==='fall'?M.falling(p).duration:def.duration;
 state.time=Math.min(end,state.time+dt);if(kind==='robot'){let remaining=dt;while(remaining>1e-9){const step=Math.min(.01,remaining);state.robot=M.safeRobotStep(state.robot,p,step);remaining-=step;}if(state.trail.length<1200)state.trail.push({x:state.robot.x,y:state.robot.y});if(state.robot.collision)stop();}
 if(state.time>=end)stop();paint();if(running)raf=requestAnimationFrame(tick);else onPersist();
 }
 root.querySelector('#science-run')?.addEventListener('click',()=>{if(running)stop();else {const end=kind==='fall'?M.falling(p).duration:def.duration;if(state.time>=end)resetClock();running=true;last=performance.now();raf=requestAnimationFrame(tick);}paint();onPersist();});
 root.querySelector('#science-reset').onclick=()=>{if(kind==='charges')delete state.reference;const initial=state.initial||{};Object.keys(p).forEach(key=>delete p[key]);Object.assign(p,defaultParameters(kind),initial);resetClock();def.params.forEach(x=>{root.querySelector(`[data-science-param="${x.key}"]`).value=p[x.key];root.querySelector(`[data-parameter-label="${x.key}"]`).textContent=format(p[x.key])+' '+x.unit;});root.querySelectorAll('[data-science-toggle]').forEach(el=>el.checked=el.dataset.scienceToggle==='avoid'?p.avoid===true:p[el.dataset.scienceToggle]!==false);if(root.querySelector('#science-symbol'))root.querySelector('#science-symbol').value=p.part||'battery';root.querySelectorAll('[data-meter-placement]').forEach(el=>el.value=p[el.dataset.meterPlacement]||'missing');redraw();onPersist();};
 root.querySelector('#science-symbol')?.addEventListener('change',e=>change('part',e.target.value));
 root.querySelectorAll('[data-science-param]').forEach(input=>input.oninput=()=>change(input.dataset.scienceParam,Number(input.value)));
 root.querySelectorAll('[data-science-toggle]').forEach(input=>input.onchange=()=>change(input.dataset.scienceToggle,input.checked));
 root.querySelectorAll('[data-meter-placement]').forEach(input=>input.onchange=()=>change(input.dataset.meterPlacement,input.value));
 if(kind==='charges'){
  const setDistance=value=>{p.x1=-value/2;p.x2=value/2;p.y1=p.y2=0;resetClock();redraw();onPersist();};
  root.querySelector('#charge-distance').oninput=e=>setDistance(Number(e.target.value));
  root.querySelector('#charge-double').onclick=()=>setDistance(Math.min(2.8,M.electrostatic(p).distance*2));
  root.querySelector('#charge-half').onclick=()=>setDistance(Math.max(.4,M.electrostatic(p).distance/2));
  root.querySelector('#charge-reference').onclick=()=>{state.reference={...p};paint();onPersist();};
  root.querySelectorAll('[data-charge-preset]').forEach(el=>el.onclick=()=>{const preset=el.dataset.chargePreset;p.q1=preset==='negative'?-Math.abs(p.q1||2):Math.abs(p.q1||2);p.q2=preset==='positive'?Math.abs(p.q2||2):-Math.abs(p.q2||2);for(const key of ['q1','q2']){root.querySelector(`[data-science-param="${key}"]`).value=p[key];root.querySelector(`[data-parameter-label="${key}"]`).textContent=format(p[key])+' նԿլ';}resetClock();redraw();onPersist();});
 }
 root.querySelector('#science-record').onclick=()=>{stop();if(kind==='charges'&&!state.reference)state.reference={...p};paint();onRecord({parameters:{...p},time:state.time,robot:{...state.robot},reading:readingText(result()),created:Date.now()});};
 function bindDirect(){
 const svg=root.querySelector('.science-stage');if(!svg)return;
 const local=e=>{const point=svg.createSVGPoint();point.x=e.clientX;point.y=e.clientY;return point.matrixTransform(svg.getScreenCTM().inverse());};
 const direct=(id,point)=>{
  if(id==='charge1'||id==='charge2'){const n=id==='charge1'?1:2,other=n===1?2:1,x=clamp((point.x-320)/150,-1.5,1.5),y=clamp((180-point.y)/150,-.8,.8);if(Math.hypot(x-(p['x'+other]??(other===1?-.7:.7)),y-(p['y'+other]??0))<.2)return;p['x'+n]=x;p['y'+n]=y;resetClock();redraw();onPersist();return;}
  if(id==='probe'){const x=(point.x-320)/155,y=(180-point.y)/155;if(Math.hypot(x,y)<.2)return;p.x=clamp(x,-1.5,1.5);p.y=clamp(y,-.9,.9);resetClock();redraw();onPersist();return;}
  const mappings={push:[kind==='acceleration'?'a':'force',kind==='acceleration'?(point.x-70)/150:(point.x-70)/15],incline:['angle',(300-point.y)/4],depth:['depth',(point.y-100)/36],temperature:['temperature',(270-point.y)/2],source:['incoming',Math.atan2(320-point.x,215-point.y)*180/Math.PI],mirror:['tilt',(point.y-215)/3],object:['object',(320-point.x)/175],compass:['x',(point.x-220)/150],transfer:['electrons',(p.electrons||0)+1]};
  if(id==='compass')p.y=clamp((185-point.y)/150,-.9,.9);
  const [key,value]=mappings[id]||[];const defn=def.params.find(x=>x.key===key);if(defn)change(key,clamp(Math.round(value/defn.step)*defn.step,defn.min,defn.max));
 };
 // Capture on the stable SVG container: replacing the drawing never loses a drag.
 svg.onpointerdown=e=>{const target=e.target.closest('[data-direct]');if(!target)return;e.preventDefault();svg.dataset.drag=target.dataset.direct;svg.setPointerCapture(e.pointerId);};
 svg.onpointermove=e=>{if(!svg.dataset.drag||svg.dataset.drag==='transfer')return;const id=svg.dataset.drag;direct(id,local(e));const next=root.querySelector('.science-stage');next.dataset.drag=id;};
 svg.onpointerup=e=>{const id=svg.dataset.drag;if(id==='transfer')direct(id,local(e));delete svg.dataset.drag;if(svg.hasPointerCapture(e.pointerId))svg.releasePointerCapture(e.pointerId);};svg.onpointercancel=()=>delete svg.dataset.drag;
 root.querySelectorAll('[data-direct]').forEach(el=>el.onkeydown=e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Enter'].includes(e.key))return;e.preventDefault();const key=el.dataset.direct;const map={push:kind==='acceleration'?'a':'force',incline:'angle',depth:'depth',temperature:'temperature',source:'incoming',mirror:'tilt',object:'object',compass:'x'};if(map[key]){const param=def.params.find(p=>p.key===map[key]);change(param.key,clamp(p[param.key]+(['ArrowLeft','ArrowDown'].includes(e.key)?-1:1)*param.step,param.min,param.max));root.querySelector(`[data-direct="${key}"]`)?.focus();return;}if(key==='transfer'){change('electrons',clamp((p.electrons||0)+(e.key==='ArrowLeft'?-1:1),-6,6));return;}const point={x:Number(el.getAttribute('cx'))+(e.key==='ArrowLeft'?-15:e.key==='ArrowRight'?15:0),y:Number(el.getAttribute('cy'))+(e.key==='ArrowUp'?-15:e.key==='ArrowDown'?15:0)};direct(key,point);root.querySelector(`[data-direct="${key}"]`)?.focus();});
 root.querySelectorAll('[data-meter-slot]').forEach(el=>{el.onclick=()=>{const which=el.dataset.meterSlot==='series'?'ammeter':'voltmeter';const select=root.querySelector(`[data-meter-placement="${which}"]`);select.value=el.dataset.meterSlot;change(which,el.dataset.meterSlot);};el.onkeydown=e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();el.onclick();}};});
 }
 bindDirect();paint();return ()=>{disposed=true;stop();onPersist();};
}
