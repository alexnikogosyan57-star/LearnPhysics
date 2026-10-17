import {assessmentBody,bindAssessment,assessmentReaction,reviewSummary} from '../learning/assessment-flow.js';
import {createCheckpoint} from '../learning/checkpoint.js';
import {checkpointId} from '../learning/checkpoint-content.js';
import {createInvestigationEngine} from '../learning/investigation-engine';
import {investigations} from '../science/content';
import {createFoundations} from '../learning/foundations';
import {foundations} from '../learning/foundations-content';
import {topics} from '../learning/topics';
import {canOpen,recordResult,nextLesson,starsMarkup} from '../learning/progression';
import {electricLessons} from './content';
import {guidedContent} from '../dialogue';
import {experimentView,bindExperiment,defaults} from './experiments';
import {playSound} from '../audio';
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function createLegacyJourney(getData,save,render) {
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
  if(s.stage===4){
   const predText = (s.prediction !== null && s.prediction !== undefined) ? l.choices[s.prediction] : 'Գրանցված չէ';
   const readingText = s.experiments.at(-1)?.reading || 'Չափում դեռ չկա';
   body=`<h2>Եկ կապենք փորձն ու բացատրությունը։</h2><p>${l.explanation.split("։ ").slice(0,2).join("։ ")}</p><div class="prediction-comparison"><p><strong>Քո կանխատեսումն էր՝</strong> «${escape(predText)}»։</p><p><strong>Փորձով չափեցինք՝</strong> «${escape(readingText)}»։</p></div><details><summary>Ավելի մանրամասն</summary><p>${l.explanation}</p></details><div class="evidence"><strong>${l.formula}</strong><p>Քո վերջին չափումը՝ ${escape(readingText)}</p></div>${next('Փորձել նոր իրավիճակում')}`;
  }
  if(s.stage===5)body=assessmentBody(s,[{type:'number',question:l.challenge,answer:l.answer,unit:l.unit,weight:1,why:`${l.formula}։ ${l.hint}`}]);
  if(s.stage===6){
   const record = getData().learning?.lessons?.[id];
   const a = s.lastResult || (record ? { stars: record.bestStars, earned: record.bestScore, possible: 1 } : { stars: 0, earned: 0, possible: 1 });
   const stars = a?.stars ?? record?.bestStars ?? 0;
   const earned = a?.earned ?? record?.bestScore ?? 0;
   const following = nextLesson(getData(),id,topics);
   const topic = topics.find(t=>t.lessons.some(x=>x.id===id)), final = topic?.lessons?.at(-1)?.id===id;
   const actionButtons = (stars >= 2) ? (
    (following ? `<button class="button lesson-primary" data-module="${following.id}">Հաջորդ դասը →</button>` :
     final ? `<p>Թեման ավարտված է։</p><button class="button lesson-primary" data-choose-topics>Ընտրել հաջորդ թեման</button>` :
     `<p>Հաջորդ դասը նախապատրաստվում է։</p><button class="button lesson-primary" data-choose-topics>Ընտրել հաջորդ թեման</button>`) +
    `<button class="text-button" id="legacy-retry">Կրկնել դասը</button>` +
    `<button class="text-button" data-page="path">Վերադառնալ ուսումնական ուղի</button>`
   ) : (
    `<button class="button lesson-primary" id="legacy-retry">Կրկին փորձել</button>` +
    `<button class="text-button" data-page="path">Վերադառնալ ուսումնական ուղի</button>`
   );
   body=`<h2>${stars>=2?'Դու փորձով բացահայտեցիր մի նոր կապ։':'Այս կապը ևս մեկ փորձով ամրապնդենք։'}</h2><p>Կիրառման առաջին պատասխանը՝ ${earned} / 1 միավոր։ Լավագույն արդյունքը՝ ${record?.bestStars||stars} աստղ։</p>${starsMarkup(stars)}<div class="evidence"><strong>${l.formula}</strong><p>${l.explanation}</p></div>${actionButtons}<details><summary>Իմ եզրակացությունը</summary><label class="field-label" for="electric-reflection">Ի՞նչն էր քեզ համար նոր։</label><textarea id="electric-reflection">${escape(s.reflection||'')}</textarea><button class="text-button" id="electric-save-reflection">Պահպանել եզրակացությունը</button><p id="electric-note-status" role="status"></p></details>`;
  }
  if(s.stage===6)body+=reviewSummary(s);
  const stepNames=["Իրավիճակ","Կանխատեսում","Փորձ","Դիտարկում","Բացատրություն","Կիրառում","Եզրակացություն"];
  s.unlockedStage=Math.max(s.unlockedStage||0,s.stage);
  const animation=s.stage===6?'success-complete':s.stage===5?assessmentReaction(s):s.stage===0?'idle':stateAnimation;
  return `<div class="lesson-top"><button class="text-button" data-page="path">← Ուսումնական ուղի</button><span>${Math.min(s.stage+1,6)} / 6</span><select ${s.stage===5?'disabled':''} id="electric-stage" aria-label="Վերանայել հետազոտության քայլը">${stepNames.slice(0,s.unlockedStage+1).map((name,i)=>`<option value="${i}" ${s.stage===i?"selected":""}>${name}</option>`).join("")}</select></div><div class="lesson-context"><h1>${l.title}</h1></div><div class="lesson-track" role="progressbar" aria-label="Ավարտված քայլեր" aria-valuemin="0" aria-valuemax="6" aria-valuenow="${s.stage}"><span style="width:${s.stage/6*100}%"></span></div><section class="lesson-content">${guidedContent(`<div class="story">${body}</div>`,`${id}:${s.stage}:${s.attempts.length}:${hint}`, '',animation)}</section>`;
 }
 function bind(root) {
  const s=state(),l=lesson();
  root.querySelector('#legacy-retry')?.addEventListener('click',()=>{s.stage=0;delete s.assessmentFlow;s.attempts=[];s.completed=null;s.numeric='';selected=null;feedback='';persist();render();});
  const rerender=()=>{persist();render();};
  root.querySelector("#electric-stage").onchange=e=>{s.stage=Number(e.target.value);selected=null;feedback="";hint=0;stateAnimation="thinking";persist();render();};
  root.querySelectorAll('[data-electric-answer]').forEach(button=>button.onclick=()=>{selected=Number(button.dataset.electricAnswer);feedback='';stateAnimation='thinking';render();});
  root.querySelector('#electric-next')?.addEventListener('click',()=>{if(s.stage===1)s.prediction=selected;s.stage++;selected=null;feedback='';hint=0;stateAnimation='thinking';playSound('control');rerender();window.scrollTo(0,0);});
  root.querySelector('#electric-submit-observation')?.addEventListener('click',()=>{
   const correct=selected===l.observed;s.attempts.push({stage:3,answer:selected,correct,time:Date.now()});
   s.observation=selected;feedback=correct?'Ճիշտ է։ Հիմա տեսնենք՝ ինչու։':'Եկ նորից ստուգենք․ ի՞նչ փոխվեց, երբ փոխեցիր միայն մեկ պայման։';stateAnimation=correct?'eureka':'confused';if(correct)playSound('complete');rerender();
  });
  root.querySelector('#electric-hint')?.addEventListener('click',()=>{hint=Math.min(3,hint+1);feedback=hint===1?'Փոքր հուշում․ առանձնացրու այն մեծությունը, որը փոխվել է։':hint===2?(s.stage===3?`Համեմատիր երկու փորձ․ ${l.observe}`:l.hint):s.stage===3?l.explanation.split('։ ')[0]:`Միասին կիրառենք՝ ${l.formula}։ ${l.hint}`;stateAnimation='eureka';render();});
  if(s.stage===5)return bindAssessment(root,s,[{type:'number',question:l.challenge,answer:l.answer,unit:l.unit,weight:1,why:`${l.formula}։ ${l.hint}`}],save,render,(results,review)=>{s.stage=6;s.completed=Date.now();s.lastResult=recordResult(getData(),id,results[0].points,1,{application:results[0].correct,review},topics);s.noteId=crypto.randomUUID();getData().notes.push({id:s.noteId,created:s.completed,lessonId:id,lessonTitle:l.title,explanation:l.formula,conclusion:`${results[0].points}/1 · ${s.lastResult.stars} աստղ`});});
  root.querySelector('#electric-reflection')?.addEventListener('input',e=>{s.reflection=e.target.value;persist();});
  root.querySelector('#electric-save-reflection')?.addEventListener('click',()=>{const note=getData().notes.find(x=>x.id===s.noteId);if(note)note.conclusion=s.reflection||note.conclusion;persist();root.querySelector('#electric-note-status').textContent='Եզրակացությունը պահպանված է։';playSound('complete');});
  if(s.stage===2)return bindExperiment(root,l,s,focus=>{rerender();if(focus){const target=document.querySelector(`[data-component="${focus}"]`)||(focus.startsWith("#")?document.querySelector(focus):null);target?.focus();}},(reading,repaint=true)=>{if(reading){s.experiments.push({reading,parameters:{...s.parameters},created:Date.now()});playSound('complete');}persist();if(repaint)render();});
  return ()=>{};
 }
 return {key(){return id+":"+state().stage;},open(moduleId){if(!electricLessons.some(x=>x.id===moduleId))return;id=moduleId;getData().currentLesson=id;persist();selected=null;feedback='';hint=0;stateAnimation='thinking';},view,bind};
}

export function createJourney(getData,save,render) {
 const checkpoint=createCheckpoint(getData,save,render);
 const basic=createFoundations(getData,save,render),legacy=createLegacyJourney(getData,save,render),science=createInvestigationEngine(getData,save,render);let active=basic;
 return {open(id){if(!canOpen(getData(),id,topics))return false;active=id===checkpointId?checkpoint:foundations.some(l=>l.id===id)?basic:investigations.some(l=>l.id===id)?science:legacy;active.open(id);return true;},view:()=>active.view(),bind:root=>active.bind(root),key:()=>active.key()};
}
