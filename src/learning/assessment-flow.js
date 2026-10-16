import {assessmentState,questionIndex,submitAssessment,continueAssessment} from './assessment-machine.js';
import {activityMarkup,isAnswered,scoreActivity,bindActivity,escapeHTML as esc} from './activities.js';
export function ensureAssessment(owner){
 if(!owner.assessmentFlow){
  const machine=assessmentState();
  for(const [index,q] of (owner.quiz||[]).entries()){
   const correct=q.correct??q.points===q.weight;
   machine.original.push({index,response:typeof q.answer==='number'?{choice:q.answer}:structuredClone(q.answer||{}),correct});
   if(!correct)machine.queue.push(index);
  }
  const last=machine.original.at(-1);
  machine.index=last?machine.original.length-1:0;
  if(last){machine.phase='FEEDBACK';machine.feedback={index:machine.index,correct:last.correct,reviewing:false};}
  owner.assessmentFlow={machine,draft:last?structuredClone(last.response):{},pendingDraft:structuredClone(owner.draft||{})};
 }
 return owner.assessmentFlow;
}
export function assessmentReaction(owner){const m=ensureAssessment(owner).machine;return m.feedback?m.feedback.correct?'success-answer':'confused':'thinking';}
export function assessmentBody(owner,items){const f=ensureAssessment(owner),m=f.machine,i=questionIndex(m),q=items[i],submitted=m.phase==='FEEDBACK',review=m.phase==='MISTAKE_REVIEW'||m.feedback?.reviewing;
 if(!q)return '';
 return `<h2>${q.question}</h2><p>${review?'Սխալների կրկնություն':`Առաջադրանք ${i+1} / ${items.length}`} · ${review?'Կրկնությունը չի փոխում պաշտոնական գնահատականը։':`${q.weight||1} միավոր։ Գնահատվում է առաջին հաստատված պատասխանը։`}</p>${activityMarkup(review?{...q,reverseChoices:true}:q,f.draft,submitted)}${submitted?`<div class="assessment-feedback ${m.feedback.correct?'correct':'incorrect'}" role="status"><span class="robot-speaker">Ռոբոտը բացատրում է</span><strong>${m.feedback.correct?'Ճիշտ է։':'Այս պատասխանը ճիշտ չէ։'}</strong>${feedbackExplanation(q,f.draft)}${review&&!m.feedback.correct?'<p>Մեկ պայմանը մեկ անգամ փոխելով՝ կրկնիր դասի փորձը։ Սկզբում գրիր հայտնի մեծությունները և դրանց միավորները։ Կրկնության փորձերը սահմանափակ են՝ կարող ես շարունակել սովորելը։</p>':''}<button class="button lesson-primary" id="assessment-continue">Շարունակել</button></div>`:`<button class="button lesson-primary" id="assessment-check" ${isAnswered(q,f.draft)?'':'disabled'}>Ստուգել</button>`}`;
}
export function bindAssessment(root,owner,items,save,render,onComplete){const f=ensureAssessment(owner),m=f.machine,q=items[questionIndex(m)],repaint=()=>{save();render();};
 if(m.phase!=='FEEDBACK')bindActivity(root,f.draft,refresh=>{save();if(refresh)render();else root.querySelector('#assessment-check').disabled=!isAnswered(q,f.draft);});
 root.querySelector('#assessment-check')?.addEventListener('click',()=>{if(!isAnswered(q,f.draft))return;submitAssessment(m,f.draft,scoreActivity(q,f.draft,1)===1);repaint();});
 root.querySelector('#assessment-continue')?.addEventListener('click',()=>{if(!continueAssessment(m,items.length))return;f.draft=f.pendingDraft||{};delete f.pendingDraft;if(m.phase==='COMPLETED'){
 const results=m.original.map(r=>{const item=items[r.index],weight=item.weight||1;return {answer:r.response,correct:r.correct,weight,points:scoreActivity(item,r.response,weight)};});
 f.review={corrected:m.corrected.length,unresolved:m.unresolved.map(i=>({question:items[i].question,why:items[i].why}))};
 onComplete(results,f.review);
 }repaint();});return ()=>{};
}
export function reviewSummary(owner){const m=owner.assessmentFlow?.machine;if(!m)return '';return `<div class="evidence"><p>Կրկնության ընթացքում ուղղված սխալներ՝ ${m.corrected.length}։ Սկզբնական գնահատականը չի փոխվել։</p>${m.unresolved.length?`<p>Դեռ կրկնելու կարիք ունեն ${m.unresolved.length} առաջադրանք։ Վերադարձիր դասի փորձին և փորձիր կրկին հանձնել։</p>${(owner.assessmentFlow.review?.unresolved||[]).map(q=>`<details><summary>${esc(q.question)}</summary><p>${esc(q.why)}</p></details>`).join('')}`:'<p>Կրկնության փուլում չլուծված առաջադրանք չի մնացել։</p>'}</div>`;}

function feedbackExplanation(q,draft){
 let evidence='';
 if(q.type==='choice')evidence=`Ընտրել ես՝ «${q.options[draft.choice]}»։ Գիտականորեն ճիշտ կապը՝ «${q.options[q.correct]}»։`;
 if(q.type==='number')evidence=`Քո պատասխանը՝ ${draft.number} ${q.unit||''}։ Ստուգման արժեքը՝ ${q.answer} ${q.unit||''}։`;
 if(q.type==='matching')evidence=q.pairs.map(([a,b],i)=>`${a} → ${draft.matches?.[i]===b?b:`${draft.matches?.[i]}․ ճիշտ կապը՝ ${b}`}`).join('։ ');
 if(q.type==='text')evidence=`Քո պատասխանը՝ ${draft.text}։ Կիրառելի ձևակերպում՝ ${q.acceptedAnswers[0]}։`;
 return `<p>${esc(evidence)}</p><p>${esc(q.why)}</p>`;
}
