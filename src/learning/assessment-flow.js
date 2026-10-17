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
  owner.assessmentFlow={machine,draft:last?structuredClone(last.response):{},pendingDraft:structuredClone(owner.draft||{}),hintLevel:0};
 }
 return owner.assessmentFlow;
}

export function assessmentReaction(owner){const m=ensureAssessment(owner).machine;return m.feedback?m.feedback.correct?'success-answer':'confused':'thinking';}

function getHint(q, level) {
 if(Array.isArray(q.hints) && q.hints[level - 1]) return q.hints[level - 1];
 if(level === 1) return 'Հուշում 1․ Ուշադրություն դարձրու հիմնական մեծություններին և դրանց ֆիզիկական իմաստին։';
 if(level === 2) return `Հուշում 2․ Մտածիր, թե ինչպես են այս մեծությունները փոխկապակցված փորձում։ ${q.formula ? 'Հիշիր կապը՝ ' + q.formula : ''}`;
 return 'Հուշում 3․ Համեմատիր տարբերակները և բացառիր նրանք, որոնք հակասում են գրանցված չափումներին։';
}

export function assessmentBody(owner,items){
 const f=ensureAssessment(owner),m=f.machine,i=questionIndex(m),baseQ=items[i],submitted=m.phase==='FEEDBACK',review=m.phase==='MISTAKE_REVIEW'||m.feedback?.reviewing;
 if(!baseQ)return '';
 const q = (review && baseQ.reviewVariant) ? { ...baseQ.reviewVariant, weight: baseQ.weight } : (review ? { ...baseQ, reverseChoices: true } : baseQ);
 const hintMarkup = (!submitted && f.hintLevel > 0) ? `<div class="assessment-hint-box" role="status"><strong>${esc(getHint(q, f.hintLevel))}</strong></div>` : '';
 const reviewBadge = review ? `<div class="review-badge"><span class="robot-speaker">Ռոբոտի օգնականը</span><strong>Սխալների կրկնություն և ամրապնդում</strong><p>Այս հարցում ավելի վաղ սխալվել էիր։ Եկ նորից փորձենք՝ արդեն քննարկված բացատրության հիման վրա։ Կրկնությունը չի ազդի քո պաշտոնական առաջին գնահատականի վրա։</p></div>` : '';

 const dockMarkup = submitted ? `
  <div class="lesson-feedback-dock assessment-feedback ${m.feedback.correct ? 'correct' : 'incorrect'}" role="status" aria-live="polite">
   <div class="feedback-dock-inner">
    <div class="feedback-dock-info">
     <div class="feedback-status-row">
      <span class="feedback-badge ${m.feedback.correct ? 'correct' : 'incorrect'}" aria-hidden="true">${m.feedback.correct ? '✓' : '✕'}</span>
      <strong class="feedback-heading ${m.feedback.correct ? 'correct' : 'incorrect'}">${m.feedback.correct ? 'Ճիշտ է' : 'Դեռ ճիշտ չէ'}</strong>
     </div>
     <div class="feedback-explanation">
      ${feedbackExplanation(q, f.draft, m.feedback.correct)}
     </div>
    </div>
    <div class="feedback-dock-actions">
     <button class="button lesson-primary ${m.feedback.correct ? '' : 'danger'}" id="assessment-continue">Շարունակել</button>
    </div>
   </div>
  </div>` : `
  <div class="lesson-feedback-dock idle" role="region" aria-label="Դասի գործողություններ">
   <div class="feedback-dock-inner">
    <div class="feedback-dock-info">
     <button type="button" class="text-button hint-toggle-btn" id="assessment-hint">
      ${(f.hintLevel || 0) >= 3 ? 'Բոլոր հուշումները բացված են' : (f.hintLevel || 0) ? 'Հաջորդ հուշումը' : 'Հուշում'}
     </button>
    </div>
    <div class="feedback-dock-actions">
     <button class="button lesson-primary" id="assessment-check" ${isAnswered(q, f.draft) ? '' : 'disabled'}>Ստուգել</button>
    </div>
   </div>
  </div>`;

 return `${reviewBadge}<h2>${q.question}</h2><p class="task-counter">${review ? 'Սխալների կրկնություն' : `Առաջադրանք ${i + 1} / ${items.length}`} · ${review ? 'Կրկնությունը չի փոխում պաշտոնական գնահատականը։' : `${q.weight || 1} միավոր։ Գնահատվում է առաջին հաստատված պատասխանը։`}</p>${activityMarkup(q, f.draft, submitted)}${hintMarkup}${dockMarkup}`;
}

export function bindAssessment(root,owner,items,save,render,onComplete){
 const f=ensureAssessment(owner),m=f.machine,i=questionIndex(m),baseQ=items[i],review=m.phase==='MISTAKE_REVIEW'||m.feedback?.reviewing;
 const q = (review && baseQ?.reviewVariant) ? { ...baseQ.reviewVariant, weight: baseQ.weight } : baseQ;
 const repaint=()=>{save();render();};
 if(m.phase!=='FEEDBACK')bindActivity(root,f.draft,refresh=>{save();if(refresh)render();else {const btn=root.querySelector('#assessment-check');if(btn)btn.disabled=!isAnswered(q,f.draft);}});
 root.querySelector('#assessment-hint')?.addEventListener('click',()=>{
  f.hintLevel = Math.min(3, (f.hintLevel || 0) + 1);
  repaint();
 });
 root.querySelector('#assessment-check')?.addEventListener('click',()=>{
  if(!isAnswered(q,f.draft) || m.phase === 'FEEDBACK') return;
  const btn = root.querySelector('#assessment-check');
  if(btn) btn.disabled = true;
  submitAssessment(m,f.draft,scoreActivity(q,f.draft,1)===1);
  repaint();
  requestAnimationFrame(()=>{
   root.querySelector('#assessment-continue')?.focus();
  });
 });
 root.querySelector('#assessment-continue')?.addEventListener('click',()=>{
  f.hintLevel = 0;
  if(!continueAssessment(m,items.length))return;
  f.draft=f.pendingDraft||{};delete f.pendingDraft;
  if(m.phase==='COMPLETED'){
   const results=m.original.map(r=>{const item=items[r.index],weight=item.weight||1;return {answer:r.response,correct:r.correct,weight,points:scoreActivity(item,r.response,weight)};});
   f.review={corrected:m.corrected.length,unresolved:m.unresolved.map(idx=>({question:items[idx].question,why:items[idx].why}))};
   onComplete(results,f.review);
  }
  repaint();
 });
 return ()=>{};
}

export function reviewSummary(owner){
 const m=owner.assessmentFlow?.machine;
 if(!m)return '';
 return `<div class="evidence"><p>Կրկնության ընթացքում ուղղված սխալներ՝ ${m.corrected.length}։ Սկզբնական գնահատականը չի փոխվել։</p>${m.unresolved.length?`<p>Դեռ կրկնելու կարիք ունեն ${m.unresolved.length} առաջադրանք։ Վերադարձիր դասի փորձին և փորձիր կրկին հանձնել։</p>${(owner.assessmentFlow.review?.unresolved||[]).map(q=>`<details><summary>${esc(q.question)}</summary><p>${esc(q.why)}</p></details>`).join('')}`:'<p>Կրկնության փուլում չլուծված առաջադրանք չի մնացել։</p>'}</div>`;
}

function feedbackExplanation(q,draft,isCorrect){
 if(isCorrect){
  return `<p class="feedback-scientific">${esc(q.why)}</p>`;
 }
 const misconception = (draft.choice !== undefined && q.misconceptions?.[draft.choice]) ? q.misconceptions[draft.choice] : '';
 return `<p class="feedback-scientific">${misconception ? `<strong>Ինչու այս տարբերակը չի աշխատում․</strong> ${esc(misconception)} ` : ''}<strong>Գիտական բացատրություն․</strong> ${esc(q.why)}</p>`;
}
