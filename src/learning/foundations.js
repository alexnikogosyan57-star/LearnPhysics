import {assessmentBody,bindAssessment,assessmentReaction,reviewSummary} from './assessment-flow.js';
import {foundations} from './foundations-content';
import {topics} from './topics';
import {canOpen,recordResult,nextLesson,starsMarkup} from './progression';
import {guidedContent} from '../dialogue';
import {initialCircuit,circuitView,bindCircuit} from '../electricity/builder';
import {solveCircuit} from '../electricity/models';
import {playSound} from '../audio';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const stepNames=['Իրավիճակ','Կանխատեսում','Առաջին փորձ','Դիտարկում','Բացատրություն','Երկրորդ փորձ','Համեմատում','Ստուգման չափանիշներ','Գիտելիքի ստուգում','Արդյունք'];
function startingCircuit(id) {
 const c=initialCircuit();
 if(['open-closed','conductors','circuit-parts','switch-types'].includes(id)) c.wires=[['battery:a','switch:a'],['switch:b','lamp:a'],['lamp:b','battery:b']];
 if(id==='conductors')Object.assign(c.components.find(x=>x.id==='switch'),{sample:true,closed:true});
 return c;
}
export function createFoundations(getData,save,render) {
 let id='circuits',selection=null,feedback='',hint=0,reaction='thinking',affirmed=false;
 const lesson=()=>foundations.find(l=>l.id===id);
 function state(){const d=getData();d.electricLessons ||= {};let s=d.electricLessons[id];
 if(!s)s=d.electricLessons[id]={stage:0,experiments:[],circuit:startingCircuit(id)};
 if(s.schema!==2){s.legacyStage=s.stage;s.stage=Math.min(s.stage,4);s.schema=2;s.circuit ||= startingCircuit(id);s.experiments ||= [];}
 if(id==='conductors')s.material ||= 'copper';
 s.quiz ||= [];s.baseline ||= 0;s.unlockedStage=Math.max(s.unlockedStage||0,s.stage);return s;}
 const choices=list=>list.map((text,i)=>`<button class="answer ${selection===i?'selected':''}" data-foundation-answer="${i}" aria-pressed="${selection===i}" ${affirmed?'disabled':''}>${esc(text)}</button>`).join('');
 const next=(label='Շարունակել',disabled=false)=>`<button class="button" id="foundation-next" ${disabled?'disabled':''}>${label}</button>`;
 function experiment(s){const battery=s.circuit.components.find(c=>c.type==='battery');const extra=id==='switch-types'?`<label class="field-label" for="switch-kind">Կոնտակտի տեսակ</label><select id="switch-kind" ${!s.circuit.components.some(c=>c.type==='switch')?'disabled':''}><option value="no" ${s.switchKind!=='nc'?'selected':''}>Նորմալ բաց</option><option value="nc" ${s.switchKind==='nc'?'selected':''}>Նորմալ փակ</option></select>`:id==='conductors'?`<label class="field-label" for="sample-material">Փորձարկվող նյութ</label><select id="sample-material" ${!s.circuit.components.some(c=>c.id==='switch')?'disabled':''}><option value="copper" ${(s.material||'copper')==='copper'?'selected':''}>Պղինձ · հաղորդիչ</option><option value="plastic" ${s.material==='plastic'?'selected':''}>Պլաստիկ · մեկուսիչ</option><option value="wood" ${s.material==='wood'?'selected':''}>Չոր փայտ · մեկուսիչ</option></select>`:id==='circuit-parts'?`<label class="slider-field">Աղբյուրի լարում <strong id="source-voltage-value">${battery?.voltage??'—'} Վ</strong><input type="range" id="source-voltage" ${!battery?'disabled':''} min="3" max="9" step="3" value="${battery?.voltage??'—'}"></label>`:'';
 let view=circuitView(s.circuit).replace('9 Վ իդեալական աղբյուր',`${s.circuit.components.find(c=>c.type==='battery')?.voltage||9} Վ իդեալական աղբյուր`);if(id==='conductors')view=view.replace(/<button class="button secondary" id="circuit-switch">.*?<\/button>/,'').replaceAll('Անջատիչ','Նմուշ');
 const enough=s.experiments.length>s.baseline && (s.stage!==5||s.experiments.length>s.secondBaseline);
 if(id==='switch-types')view=view.replace(/(id="circuit-switch">).*?(<\/button>)/,`$1${s.actuated?'Ազատել կոնտակտը':'Գործարկել կոնտակտը'}$2`);
 view=view.replace('class="button secondary" id="measure-electric"',`class="${enough?'text-button':'button'}" id="measure-electric"`);
 return extra+view+(enough?next(s.stage===5?'Համեմատել արդյունքները':'Քննարկել դիտարկումը'):'')+`<details class="measurement-journal"><summary>Իմ չափումները · ${s.experiments.length}</summary>${s.experiments.slice(-6).map((x,i)=>`<p>${i+1}. ${esc(x.reading)}</p>`).join('')}</details>`;
 }
 function view(){const s=state(),l=lesson();let body='';
 if(s.stage===0)body=`<h2>${l.context}</h2><p>Միասին կանխատեսենք, փորձենք ու հիմնավորենք պատասխանը։</p>${next('Սկսել բացահայտումը')}`;
 if(s.stage===1)body=`<h2>${l.prediction}</h2><p>Կանխատեսումը գնահատական չի ստանում․ այն հետո ստուգելու ենք։</p>${choices(l.choices)}${next('Ստուգել փորձով',selection===null)}`;
 if([2,5].includes(s.stage))body=`<h2>${s.stage===2?'Եկ ստուգենք քո գաղափարը։':'Փոխենք միայն մեկ պայման։'}</h2><p>${s.stage===2?l.task:l.second}</p>${experiment(s)}`;
 if([3,6].includes(s.stage))body=`<h2>${s.stage===3?l.observe:l.compare}</h2><p>${s.stage===3?'Հենվիր չափումիդ վրա։':'Համեմատիր վերջին երկու չափումները։'}</p>${s.stage===6?`<div class="evidence">${s.experiments.slice(-2).map(x=>`<p>${esc(x.reading)}</p>`).join('')}</div>`:''}${choices(s.stage===3?l.observations:l.comparisons)}<p class="feedback" role="status">${esc(feedback)}</p>${affirmed?next('Շարունակել'):`<button class="button" id="foundation-check" ${selection===null?'disabled':''}>Ստուգել գաղափարը</button>`}${feedback&&!affirmed?'<button class="text-button" id="foundation-hint">Հուշում</button>':''}`;
 if(s.stage===4)body=`<h2>Փորձն օգնում է հասկանալ կապը։</h2><p>${l.explanation.split('։ ')[0]}։</p><div class="evidence"><strong>${l.concept}</strong><p>Քո չափումը՝ ${esc(s.experiments.at(-1)?.reading||'Չափում դեռ չկա')}</p></div><details><summary>Ինչո՞ւ է այդպես</summary><p>${l.explanation}</p></details>${next('Ստուգել մեկ այլ պայման')}`;
 if(s.stage===7)body=`<h2>Պատրա՞ստ ես ինքնուրույն կիրառել բացահայտումը։</h2><p>Կանխատեսումն ու փորձերը չեն նվազեցնում գնահատականդ։ Հիմա կպատասխանես երեք հարցի՝ ընդհանուր 10 միավորով։ Հուշումները հասանելի են ուսումնասիրման քայլերում։</p><div class="rubric"><span>0–4 միավոր · 0 աստղ</span><span>5–6 · 1 աստղ</span><span>7–8 · 2 աստղ</span><span>9–10 · 3 աստղ</span></div><p>Առնվազն երկու աստղը բացում է հաջորդ դասը։ Կրկնելիս պահում ենք քո լավագույն արդյունքը։</p>${next('Սկսել գիտելիքի ստուգումը')}`;
 if(s.stage===8)body=assessmentBody(s,l.assessment.map(q=>({...q,question:q.text,type:'choice'})));
 if(s.stage===9){const a=s.lastResult,record=getData().learning.lessons[id],following=nextLesson(getData(),id,topics);const topic=topics.find(t=>t.lessons.some(x=>x.id===id)),final=topic.lessons.at(-1).id===id;
 body=`<h2>${a?.stars>=2?'Դու կարող ես շարունակել։':'Մեկ անգամ ևս փորձենք՝ արդեն քո փորձի հիման վրա։'}</h2><p>${a?.earned??0} / 10 միավոր։ Լավագույն արդյունքդ՝ ${record?.bestStars||0} աստղ։</p>${starsMarkup(a?.stars||0)}<div class="learning-summary"><h3>Քո բացահայտումը</h3><p>${l.concept}։ Կանխատեսեցիր, չափեցիր և համեմատեցիր։</p>${l.assessment.map((q,i)=>`<p class="assessment-review">${s.quiz[i]?.correct?'✓':'↺'} ${q.why}</p>`).join('')}</div>${a?.stars>=2&&following?`<button class="button" data-module="${following.id}">Անցնել հաջորդ դասին →</button>`:a?.stars>=2&&final?'<p>Թեման ավարտված է։</p><button class="button" data-choose-topics>Ընտրել հաջորդ թեման</button>':a?.stars>=2?'<p>Հաջորդ դասը նախապատրաստվում է։ Քո արդյունքն արդեն պահպանված է։</p><button class="button" data-choose-topics>Ընտրել հաջորդ թեման</button>':'<button class="button" id="foundation-retry">Կրկնել դասը</button>'}${a?.stars>=2?'<button class="text-button" id="foundation-retry">Կրկնել դասը</button>':''}<button class="text-button" data-page="path">Վերադառնալ ուսումնական ուղի</button><details><summary>Իմ եզրակացությունը</summary><textarea id="foundation-reflection" aria-label="Իմ եզրակացությունը">${esc(s.reflection||'')}</textarea><p>Գրառումն ինքնաշխատ պահվում է հետազոտողի տետրում։</p></details>`;
 }
 if(s.stage===9)body+=reviewSummary(s);
 return `<div class="lesson-top"><button class="text-button" data-page="path">← Ուսումնական ուղի</button><span>${s.stage+1} / 10</span><select ${s.stage===8?'disabled':''} id="foundation-stage" aria-label="Վերանայել դասի քայլը">${stepNames.slice(0,s.unlockedStage+1).map((x,i)=>`<option value="${i}" ${i===s.stage?'selected':''}>${x}</option>`).join('')}</select></div><div class="lesson-context"><h1>${l.title}</h1></div><div class="lesson-track" role="progressbar" aria-label="Դասի ընթացքը" aria-valuemin="0" aria-valuemax="10" aria-valuenow="${s.stage===9?10:s.stage}"><span style="width:${s.stage===9?100:s.stage*10}%"></span></div><section class="lesson-content">${guidedContent(`<div class="story">${body}</div>`,`${id}:${s.stage}:${s.quiz.length}:${s.event||0}`, '',s.stage===9?'success-complete':s.stage===8?assessmentReaction(s):s.stage===0?'idle':reaction)}</section>`;
 }
 function resetInteraction(){selection=null;feedback='';hint=0;affirmed=false;reaction='thinking';}
 function bind(root){const s=state(),l=lesson();const repaint=(focus)=>{save();render();if(focus)document.querySelector(`[data-component="${focus}"]`)?.focus();};
 if(s.stage===8)return bindAssessment(root,s,l.assessment.map(q=>({...q,question:q.text,type:'choice'})),save,render,(results,review)=>{s.quiz=results;s.review=review;const points=results.reduce((a,r)=>a+r.points,0);s.lastResult=recordResult(getData(),id,points,10,{quiz:results,review},topics);s.completed=Date.now();s.stage=9;s.noteId=crypto.randomUUID();getData().notes.push({id:s.noteId,created:s.completed,lessonId:id,lessonTitle:l.title,explanation:l.explanation,conclusion:`${points}/10 · ${s.lastResult.stars} աստղ`});});
 root.querySelector('#foundation-stage').onchange=e=>{const requested=Number(e.target.value);if(requested>s.unlockedStage)return;s.stage=requested;if(s.stage===8&&s.quiz.length===3)s.stage=9;resetInteraction();repaint();};
 root.querySelectorAll('[data-foundation-answer]').forEach(b=>b.onclick=()=>{selection=Number(b.dataset.foundationAnswer);feedback='';reaction='thinking';render();});
 root.querySelector('#foundation-next')?.addEventListener('click',()=>{if(s.stage===1)s.prediction=selection;if(s.stage===4)s.secondBaseline=s.experiments.length;s.stage++;resetInteraction();repaint();window.scrollTo(0,0);});
 root.querySelector('#foundation-check')?.addEventListener('click',()=>{const expected=s.stage===3?l.observed:l.compared;affirmed=selection===expected;s.event=(s.event||0)+1;reaction=affirmed?'eureka':'confused';feedback=affirmed?`Ճիշտ է։ ${l.explanation.split('։ ')[0]}։`:'Մտածենք ճանապարհի մասին։ Մնացած պայմանները պահիր նույնը և ստուգիր՝ ինչն է փոխվել։';if(affirmed){s.observation=selection;playSound('complete');}else{s.misconceptions ||= [];s.misconceptions.push({stage:s.stage,answer:selection,created:Date.now()});}repaint();});
 root.querySelector('#foundation-hint')?.addEventListener('click',()=>{hint=Math.min(4,hint+1);feedback=[l.task,`Վերջին չափումդ՝ ${s.experiments.at(-1)?.reading}։ Համեմատիր բաց և փակ ճանապարհները։`,l.explanation,`Պատասխանը՝ ${(s.stage===3?l.observations:l.comparisons)[s.stage===3?l.observed:l.compared]}։ ${l.explanation}`][hint-1];reaction='eureka';s.event=(s.event||0)+1;render();});
 root.querySelector('#foundation-retry')?.addEventListener('click',()=>{s.stage=0;s.unlockedStage=0;s.baseline=s.experiments.length;s.quiz=[];delete s.assessmentFlow;s.circuit=startingCircuit(id);s.material='copper';s.reflection='';delete s.completed;resetInteraction();repaint();});
 root.querySelector('#foundation-reflection')?.addEventListener('input',e=>{s.reflection=e.target.value;const note=getData().notes.find(n=>n.id===s.noteId);if(note)note.conclusion=s.reflection;save();});
 function bindWorkbench(){
 bindCircuit(root,s.circuit,repaint);
 root.querySelector('#circuit-reset').onclick=()=>{s.circuit=startingCircuit(id);s.material=id==='conductors'?'copper':null;s.switchKind='no';s.actuated=false;repaint();};
 }
 if([2,5].includes(s.stage)){
 bindWorkbench();
 const updateSwitch=()=>{const contact=s.circuit.components.find(c=>c.type==='switch');if(!contact)return;contact.closed=s.switchKind==='nc'?!s.actuated:!!s.actuated;repaint();};
 root.querySelector('#switch-kind')?.addEventListener('change',e=>{s.switchKind=e.target.value;s.actuated=false;updateSwitch();});
 if(id==='switch-types')root.querySelector('#circuit-switch').onclick=()=>{s.actuated=!s.actuated;updateSwitch();};
 root.querySelector('#sample-material')?.addEventListener('change',e=>{s.material=e.target.value;const sample=s.circuit.components.find(c=>c.id==='switch');if(sample)sample.closed=s.material==='copper';repaint();});
 root.querySelector('#source-voltage')?.addEventListener('input',e=>{
 const source=s.circuit.components.find(c=>c.type==='battery');if(!source)return;source.voltage=Number(e.target.value);
 root.querySelector('#source-voltage-value').textContent=e.target.value+' Վ';
 const holder=document.createElement('div');holder.innerHTML=circuitView(s.circuit);
 for(const selector of ['#circuit-canvas','#circuit-status'])root.querySelector(selector).replaceWith(holder.querySelector(selector));
 root.querySelector('.model-note').textContent=`${e.target.value} Վ իդեալական աղբյուր․ լամպը՝ 20 Օմ բեռ։`;
 bindWorkbench();save();
 });
 root.querySelector('#measure-electric').onclick=()=>{const r=solveCircuit(s.circuit.components,s.circuit.wires,s.circuit.junctions);if(!['open','closed'].includes(r.status))return;
 const reading=`${s.material?{copper:'Պղինձ',plastic:'Պլաստիկ',wood:'Չոր փայտ'}[s.material]+' · ':''}${r.status==='open'?'Բաց':'Փակ'} շղթա · ${s.circuit.components.find(c=>c.type==='battery')?.voltage} Վ · ${Number(r.current.toFixed(3))} Ա`;
 s.experiments.push({reading,created:Date.now(),circuit:structuredClone(s.circuit),material:s.material||null,current:r.current});playSound('complete');repaint();};
 }
 return ()=>{};
 }
 return {view,bind,key:()=>id+':'+state().stage,open(moduleId){if(!canOpen(getData(),moduleId,topics))return false;id=moduleId;getData().currentLesson=id;save();resetInteraction();return true;}};
}
