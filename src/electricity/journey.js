import {electricLessons} from './content';
import {guidedContent} from '../dialogue';
import {experimentView,bindExperiment,defaults} from './experiments';
import {playSound} from '../audio';
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function createJourney(getData,save,render) {
 let id='circuits',selected=null,feedback='',hint=0,stateAnimation='thinking';
 const lesson=()=>electricLessons.find(x=>x.id===id);
 const state=()=>{const data=getData();data.electricLessons ||= {};return data.electricLessons[id] ||= {stage:0,parameters:defaults(lesson()),experiments:[],attempts:[],prediction:null};};
 const persist=()=>save();
 function view() {
  const l=lesson(),s=state();let body='';
  const next=(label='Շարունակել',disabled=false)=>`<button class="button" id="electric-next" ${disabled?'disabled':''}>${label}</button>`;
  const choices=(list)=>list.map((text,i)=>`<button class="answer ${selected===i?'selected':''}" data-electric-answer="${i}" aria-pressed="${selected===i}">${text}</button>`).join('');
  if(s.stage===0)body=`<h2>${l.title}</h2><p>${l.context}</p>${next('Անել կանխատեսում')}`;
  if(s.stage===1)body=`<h2>${l.prediction}</h2><p>Ընտրիր քո կանխատեսումը։ Պատասխանը միասին փորձով կստուգենք։</p>${choices(l.choices)}${next('Գրանցել կանխատեսումն ու փորձել',selected===null)}`;
  if(s.stage===2)body=`<h2>Հիմա քո հերթն է փորձելու։</h2><p>${id==='circuits'?'Միացրու մարտկոցի, անջատիչի ու լամպի ելքերը փակ ճանապարհով։ Փակիր անջատիչը, հետո բացիր այն։':'Փոխիր մեկ պայման և գրանցիր չափումը։ Հետո փոխիր այն ու համեմատիր արդյունքները։'}</p>${experimentView(l,s)}${next('Քննարկել դիտարկումը',!s.experiments.length)}`;
  if(s.stage===3)body=`<h2>${l.observe}</h2><p>Հենվիր քո փորձի վրա։</p>${choices(l.observations)}<p class="feedback" role="status">${feedback}</p>${feedback.startsWith('Ճիշտ')?next('Բացահայտել կապը'):`<button class="button" id="electric-submit-observation" ${selected===null?'disabled':''}>Ստուգել դիտարկումը</button>${feedback?'<button class="text-button" id="electric-hint">Հուշում</button>':''}`}`;
  if(s.stage===4)body=`<h2>Եկ կապենք փորձն ու բացատրությունը։</h2><p>${l.explanation.split("։ ").slice(0,2).join("։ ")}</p><details><summary>Ավելի մանրամասն</summary><p>${l.explanation}</p></details><div class="evidence"><strong>${l.formula}</strong><p>Քո վերջին չափումը՝ ${escape(s.experiments.at(-1)?.reading)}</p></div>${next('Փորձել նոր իրավիճակում')}`;
  if(s.stage===5)body=`<h2>${l.challenge}</h2><p>Մուտքագրիր քո հաշվարկած թիվը՝ ${l.unit||'նշված ձևով'}։</p><label class="field-label" for="electric-numeric">Իմ պատասխանը${l.unit?` (${l.unit})`:''}</label><input id="electric-numeric" type="text" inputmode="decimal" value="${escape(s.numeric||'')}" autocomplete="off"><p class="feedback" role="status">${feedback}</p><button id="electric-check" class="button">Ստուգել պատասխանը</button>${feedback?'<button class="text-button" id="electric-hint">Հաջորդ հուշումը</button>':''}`;
  if(s.stage===6)body=`<h2>Դու փորձով բացահայտեցիր մի նոր կապ։</h2><p>${l.formula}։ Կանխատեսում արեցիր, փորձ կատարեցիր և կիրառեցիր արդյունքը։ Գրառումդ արդեն քո տետրում է։</p><label class="field-label" for="electric-reflection">Ի՞նչն էր քեզ համար նոր։</label><textarea id="electric-reflection">${escape(s.reflection||'')}</textarea><button class="button" id="electric-save-reflection">Պահպանել եզրակացությունը</button><button class="text-button" data-page="path">Ընտրել հաջորդ թեման</button><p id="electric-note-status" role="status"></p>`;
  const stepNames=["Իրավիճակ","Կանխատեսում","Փորձ","Դիտարկում","Բացատրություն","Կիրառում","Եզրակացություն"];
  s.unlockedStage=Math.max(s.unlockedStage||0,s.stage);
  const animation=s.stage===6?'celebration':s.stage===0?'idle':stateAnimation;
  return `<div class="lesson-top"><button class="text-button" data-page="path">← Ուսումնական ուղի</button><span>${Math.min(s.stage+1,6)} / 6</span><select id="electric-stage" aria-label="Վերանայել հետազոտության քայլը">${stepNames.slice(0,s.unlockedStage+1).map((name,i)=>`<option value="${i}" ${s.stage===i?"selected":""}>${name}</option>`).join("")}</select></div><div class="lesson-context"><h1>${l.title}</h1></div><div class="lesson-track" role="progressbar" aria-label="Ավարտված քայլեր" aria-valuemin="0" aria-valuemax="6" aria-valuenow="${s.stage}"><span style="width:${s.stage/6*100}%"></span></div><section class="lesson-content">${guidedContent(`<div class="story">${body}</div>`,`${id}:${s.stage}:${s.attempts.length}:${hint}`, '',animation)}</section>`;
 }
 function bind(root) {
  const s=state(),l=lesson();
  const rerender=()=>{persist();render();};
  root.querySelector("#electric-stage").onchange=e=>{s.stage=Number(e.target.value);selected=null;feedback="";hint=0;stateAnimation="thinking";persist();render();};
  root.querySelectorAll('[data-electric-answer]').forEach(button=>button.onclick=()=>{selected=Number(button.dataset.electricAnswer);feedback='';stateAnimation='thinking';render();});
  root.querySelector('#electric-next')?.addEventListener('click',()=>{if(s.stage===1)s.prediction=selected;s.stage++;selected=null;feedback='';hint=0;stateAnimation='thinking';playSound('control');rerender();window.scrollTo(0,0);});
  root.querySelector('#electric-submit-observation')?.addEventListener('click',()=>{
   const correct=selected===l.observed;s.attempts.push({stage:3,answer:selected,correct,time:Date.now()});
   s.observation=selected;feedback=correct?'Ճիշտ է։ Հիմա տեսնենք՝ ինչու։':'Եկ նորից ստուգենք․ ի՞նչ փոխվեց, երբ փոխեցիր միայն մեկ պայման։';stateAnimation=correct?'eureka':'confused';if(correct)playSound('complete');rerender();
  });
  root.querySelector('#electric-hint')?.addEventListener('click',()=>{hint=Math.min(3,hint+1);feedback=hint===1?'Փոքր հուշում․ առանձնացրու այն մեծությունը, որը փոխվել է։':hint===2?(s.stage===3?`Համեմատիր երկու փորձ․ ${l.observe}`:l.hint):s.stage===3?l.explanation.split('։ ')[0]:`Միասին կիրառենք՝ ${l.formula}։ ${l.hint}`;stateAnimation='eureka';render();});
  root.querySelector('#electric-numeric')?.addEventListener('input',e=>{s.numeric=e.target.value;persist();});
  root.querySelector('#electric-check')?.addEventListener('click',()=>{
   const text=(s.numeric||'').trim().replace(',','.');const value=text===''?NaN:Number(text);const correct=Number.isFinite(value)&&Math.abs(value-l.answer)<=Math.max(1e-5,Math.abs(l.answer)*.005);
   s.attempts.push({stage:5,answer:text,correct,time:Date.now()});
   if(correct){s.stage=6;s.completed=Date.now();playSound('complete');const data=getData();
    if(!s.noteId){s.noteId=crypto.randomUUID();data.notes.push({id:s.noteId,created:Date.now(),lessonId:id,lessonTitle:l.title,experiments:s.experiments.map(x=>({...x,parameters:{...x.parameters}})),prediction:l.choices[s.prediction]||'',settings:s.experiments.map(x=>x.reading).join('; '),observation:l.observations[s.observation]||'',explanation:l.formula,conclusion:'Կիրառման խնդիրը լուծել եմ ինքնուրույն։'});}
    feedback='';
   }else{feedback='Փորձենք նորից։ Ստուգիր մեծությունների կապն ու միավորները։';stateAnimation='confused';}
   rerender();
  });
  root.querySelector('#electric-reflection')?.addEventListener('input',e=>{s.reflection=e.target.value;persist();});
  root.querySelector('#electric-save-reflection')?.addEventListener('click',()=>{const note=getData().notes.find(x=>x.id===s.noteId);if(note)note.conclusion=s.reflection||note.conclusion;persist();root.querySelector('#electric-note-status').textContent='Եզրակացությունը պահպանված է։';playSound('complete');});
  if(s.stage===2)return bindExperiment(root,l,s,focus=>{rerender();if(focus){const target=document.querySelector(`[data-component="${focus}"]`)||(focus.startsWith("#")?document.querySelector(focus):null);target?.focus();}},(reading,repaint=true)=>{if(reading){s.experiments.push({reading,parameters:{...s.parameters},created:Date.now()});playSound('complete');}persist();if(repaint)render();});
  return ()=>{};
 }
 return {key(){return id+":"+state().stage;},open(moduleId){if(!electricLessons.some(x=>x.id===moduleId))return;id=moduleId;getData().currentLesson=id;persist();selected=null;feedback='';hint=0;stateAnimation='thinking';},view,bind};
}
