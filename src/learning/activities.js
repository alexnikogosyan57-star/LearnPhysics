import {playSound} from '../audio.js';
export const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function activityMarkup(activity,draft={},disabled=false){
 const esc=escapeHTML;
 if(activity.type==='choice'){
  const sorted = activity.options.map((v,i)=>({v,i})).sort((a,b)=>{
   const reverse=[...activity.question].reduce((n,c)=>n+c.charCodeAt(0),0)%2;
   return (!!reverse!==!!activity.reverseChoices)?b.i-a.i:a.i-b.i;
  });
  return `<div class="activity-choices" role="radiogroup" aria-label="Պատասխանի տարբերակներ">${sorted.map(({v,i},k)=>{
   const isSelected = draft.choice === i;
   const isCorrect = disabled && i === activity.correct;
   const isWrong = disabled && isSelected && i !== activity.correct;
   const isNeutral = disabled && !isSelected && i !== activity.correct;
   const classes = [
    'answer',
    isSelected ? 'selected' : '',
    isCorrect ? 'is-correct' : '',
    isWrong ? 'is-incorrect' : '',
    isNeutral ? 'is-neutral' : '',
   ].filter(Boolean).join(' ');

   let indicator = `<span class="answer-indicator radio-dot" aria-hidden="true"></span>`;
   if(isCorrect) indicator = `<span class="answer-indicator icon-check" aria-hidden="true"><svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg></span><span class="sr-only"> (Ճիշտ պատասխան)</span>`;
   else if(isWrong) indicator = `<span class="answer-indicator icon-cross" aria-hidden="true"><svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg></span><span class="sr-only"> (Քո սխալ պատասխանը)</span>`;

   return `<button type="button" role="radio" class="${classes}" data-activity-choice="${i}" data-shortcut="${k+1}" aria-checked="${isSelected}" aria-pressed="${isSelected}" ${disabled?'disabled aria-disabled="true"':''}><span class="answer-badge" aria-hidden="true">${k+1}</span><span class="answer-text">${esc(v)}</span>${indicator}</button>`;
  }).join('')}</div>`;
 }
 if(activity.type==='text')return `<label class="field-label" for="activity-text">Իմ պատասխանը</label><input id="activity-text" type="text" value="${esc(draft.text||'')}" ${disabled?'disabled':''} autocomplete="off">`;
 if(activity.type==='number')return `<label class="field-label" for="activity-number">Իմ պատասխանը${activity.unit?' ('+esc(activity.unit)+')':''}</label><input id="activity-number" inputmode="decimal" type="text" value="${esc(draft.number||'')}" ${disabled?'disabled':''} autocomplete="off">`;
 if(activity.type==='matching'){const options=activity.pairs.map(p=>p[1]).reverse();return `<div class="matching-activity">${activity.pairs.map(([label],i)=>`<label><span>${esc(label)}</span><select data-activity-match="${i}" ${disabled?'disabled':''}><option value="">Ընտրիր համապատասխան կապը</option>${options.map(v=>`<option ${draft.matches?.[i]===v?'selected':''}>${esc(v)}</option>`).join('')}</select></label>`).join('')}</div>`;}
 throw Error('Unsupported activity '+activity.type);
}
export function isAnswered(activity,draft){return activity.type==='text'?!!draft.text?.trim():activity.type==='choice'?Number.isInteger(draft.choice):activity.type==='number'?!!draft.number?.trim():activity.pairs.every((_,i)=>!!draft.matches?.[i]);}
export function scoreActivity(activity,draft,weight){
 if(activity.type==='text'){const normalize=v=>String(v).normalize('NFKC').trim().toLocaleLowerCase('hy').replace(/\s+/g,' ');return activity.acceptedAnswers.some(v=>normalize(v)===normalize(draft.text||''))?weight:0;}
 if(activity.type==='choice')return draft.choice===activity.correct?weight:0;
 if(activity.type==='number'){const n=Number(String(draft.number??'').trim().replace(',','.'));return String(draft.number??'').trim()&&Number.isFinite(n)&&Math.abs(n-activity.answer)<=(activity.tolerance??Math.max(1e-6,Math.abs(activity.answer)*.005))?weight:0;}
 return activity.pairs.reduce((sum,p,i)=>sum+(draft.matches?.[i]===p[1]?weight/activity.pairs.length:0),0);
}
export function bindActivity(root,draft,onChange){
 root.querySelectorAll('[data-activity-choice]').forEach(b=>b.onclick=()=>{draft.choice=Number(b.dataset.activityChoice);playSound('tap');onChange(true);});
 root.querySelector('#activity-text')?.addEventListener('input',e=>{draft.text=e.target.value;onChange(false);});
 root.querySelector('#activity-number')?.addEventListener('input',e=>{draft.number=e.target.value;onChange(false);});
 root.querySelectorAll('[data-activity-match]').forEach(select=>select.onchange=()=>{draft.matches ||= {};draft.matches[select.dataset.activityMatch]=select.value;onChange(false);});
 root.addEventListener('keydown',e=>{
  if(['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)) return;
  const numKey = parseInt(e.key, 10);
  if(numKey >= 1 && numKey <= 9) {
   const btn = root.querySelector(`[data-shortcut="${numKey}"]`);
   if(btn && !btn.disabled) {
    btn.click();
    btn.focus();
   }
  }
 });
}
