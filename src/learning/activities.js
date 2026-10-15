export const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function activityMarkup(activity,draft={},disabled=false){
 const esc=escapeHTML;
 if(activity.type==='choice')return `<div class="activity-choices">${activity.options.map((v,i)=>({v,i})).sort((a,b)=>{const reverse=[...activity.question].reduce((n,c)=>n+c.charCodeAt(0),0)%2;return reverse?b.i-a.i:a.i-b.i;}).map(({v,i})=>`<button type="button" class="answer ${draft.choice===i?'selected':''}" data-activity-choice="${i}" aria-pressed="${draft.choice===i}" ${disabled?'disabled':''}>${esc(v)}</button>`).join('')}</div>`;
 if(activity.type==='number')return `<label class="field-label" for="activity-number">Իմ պատասխանը${activity.unit?' ('+esc(activity.unit)+')':''}</label><input id="activity-number" inputmode="decimal" type="text" value="${esc(draft.number||'')}" ${disabled?'disabled':''} autocomplete="off">`;
 if(activity.type==='matching'){const options=activity.pairs.map(p=>p[1]).reverse();return `<div class="matching-activity">${activity.pairs.map(([label],i)=>`<label><span>${esc(label)}</span><select data-activity-match="${i}" ${disabled?'disabled':''}><option value="">Ընտրիր համապատասխան կապը</option>${options.map(v=>`<option ${draft.matches?.[i]===v?'selected':''}>${esc(v)}</option>`).join('')}</select></label>`).join('')}</div>`;}
 throw Error('Unsupported activity '+activity.type);
}
export function isAnswered(activity,draft){return activity.type==='choice'?Number.isInteger(draft.choice):activity.type==='number'?!!draft.number?.trim():activity.pairs.every((_,i)=>!!draft.matches?.[i]);}
export function scoreActivity(activity,draft,weight){
 if(activity.type==='choice')return draft.choice===activity.correct?weight:0;
 if(activity.type==='number'){const n=Number(String(draft.number??'').trim().replace(',','.'));return String(draft.number??'').trim()&&Number.isFinite(n)&&Math.abs(n-activity.answer)<=Math.max(1e-6,Math.abs(activity.answer)*.005)?weight:0;}
 return activity.pairs.reduce((sum,p,i)=>sum+(draft.matches?.[i]===p[1]?weight/activity.pairs.length:0),0);
}
export function bindActivity(root,draft,onChange){
 root.querySelectorAll('[data-activity-choice]').forEach(b=>b.onclick=()=>{draft.choice=Number(b.dataset.activityChoice);onChange(true);});
 root.querySelector('#activity-number')?.addEventListener('input',e=>{draft.number=e.target.value;onChange(false);});
 root.querySelectorAll('[data-activity-match]').forEach(select=>select.onchange=()=>{draft.matches ||= {};draft.matches[select.dataset.activityMatch]=select.value;onChange(false);});
}
