// Adapt the existing, tested apparatus without copying its model or controls.
import {electricLessons} from '../electricity/content.js';
import {experimentView,bindExperiment,defaults,result} from '../electricity/experiments.js';
const source=kind=>electricLessons.find(l=>l.id===kind.slice(7));
export function legacyInitial(kind,initial){return {...defaults(source(kind)),...initial};}
export function legacyMarkup(kind,state){
 const lesson=source(kind);let html=experimentView(lesson,{parameters:state.parameters,experiments:[]}).replace('class="button secondary" id="measure-electric"','class="button" id="science-record"');
 if(state.probeFocus)html+=`<label class="field-label">Չափման տեղը<select id="legacy-probe"><option value="source" ${(state.parameters.probe||'source')==='source'?'selected':''}>Աղբյուրի ելք</option><option value="first" ${state.parameters.probe==='first'?'selected':''}>Առաջին բեռ</option><option value="second" ${state.parameters.probe==='second'?'selected':''}>Երկրորդ բեռ</option></select></label><p id="legacy-probe-reading" role="status"></p>`;
 return html+'<button class="text-button" id="legacy-experiment-reset">Փորձը սկսել սկզբից</button>';
}
export function bindLegacy(root,kind,state,persist,record,rerender){
 const lesson=source(kind),p=state.parameters,button=root.querySelector('#science-record');button.id='measure-electric';
 const probeReading=()=>{const r=result(lesson.id,p),voltage=state.probeFocus==='voltage',value=p.probe==='first'?voltage?r.v1:r.i1:p.probe==='second'?voltage?r.v2:r.i2:voltage?p.voltage:r.current;return `${voltage?'U':'I'} = ${Number(value.toFixed(3))} ${voltage?'Վ':'Ա'}`;};
 const updateProbe=()=>{if(state.probeFocus)root.querySelector('#legacy-probe-reading').textContent=probeReading();};
 const dispose=bindExperiment(root,lesson,{parameters:p,experiments:[]},()=>{persist();rerender();},reading=>{
 if(!reading){persist();updateProbe();return;}
 const r=result(lesson.id,p);if(r.unsafe)return;
 const settings=lesson.settings.map(([key,label,unit])=>`${label}՝ ${p[key]} ${unit}`).join(' · ');
 const detail=lesson.id==='series'?`I₁ = ${Number(r.i1.toFixed(3))} Ա · I₂ = ${Number(r.i2.toFixed(3))} Ա · U₁ = ${Number(r.v1.toFixed(3))} Վ · U₂ = ${Number(r.v2.toFixed(3))} Վ · R = ${Number(r.resistance.toFixed(3))} Օմ`:lesson.id==='power'?`P = ${r.watts} Վտ · I = ${r.current} Ա`:'';
 record({parameters:{...p},time:p.elapsed||p.time||0,reading:settings+'։ '+(state.probeFocus?probeReading():reading)+'։ '+detail,created:Date.now()});
 });
 button.id='science-record';
 root.querySelector('#legacy-probe')?.addEventListener('change',e=>{p.probe=e.target.value;updateProbe();persist();});
 root.querySelectorAll('[data-electric-param]').forEach(el=>{const handler=el.oninput;el.oninput=e=>{handler(e);updateProbe();};});
 root.querySelector('#legacy-experiment-reset').onclick=()=>{Object.keys(p).forEach(key=>delete p[key]);Object.assign(p,legacyInitial(kind,state.initial||{}));state.time=0;persist();rerender();};
 if(lesson.id==='components'&&state.fixedComponent!==undefined){root.querySelector('#component-kind').closest('label').hidden=true;}
 if(lesson.id==='components')root.querySelectorAll('[data-electric-param]').forEach(el=>{el.closest('label').hidden=[4,5].includes(p.component||0)||el.dataset.electricParam==='capacitance'&&(p.component||0)!==3;});
 if(root.querySelector('#rc-time'))root.querySelector('#rc-time').textContent=Number((p.elapsed||0).toFixed(3))+' վ';
 updateProbe();return dispose;
}
