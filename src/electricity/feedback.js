export function circuitFeedback(model,result){
 if(!['open','closed'].includes(result.status))return result.status==='short'||result.status==='meter-short'?'Աղբյուրի երկու ելքերի միջև բեռ կա՞, թե ուղիղ միացում է ստացվել։ Փորձիր գտնել այդ ճանապարհը։':'Կապերի մեջ անհամապատասխանություն կա։ Ստուգիր ընտրված ելքերն ու տարրերը։';
 const lamp=model.components.find(c=>c.type==='lamp');
 if(lamp&&(result.powers[lamp.id]||0)>1e-12)return 'Հիմա լամպով հոսանք է անցնում։ Կարո՞ղ ես երկու կոնտակտներով հետևել ամբողջ ճանապարհին։';
 const ends=model.wires.flatMap(w=>Array.isArray(w)?w:[w.start,w.end]);
 if(lamp&&['a','b'].some(p=>!ends.includes(lamp.id+':'+p)))return 'Տեսնո՞ւմ ես լամպի չմիացված կոնտակտը։ Որտե՞ղ պետք է հասնի հաղորդալարը։';
 if(model.components.some(c=>c.type==='switch'&&!c.closed))return 'Ի՞նչ է փոխվում, երբ անջատիչը բաց է։ Փնտրիր բացված կոնտակտների արանքը։';
 return 'Հետևիր ճանապարհին մի ելքից մյուսը։ Որտե՞ղ է կապը ընդհատվում։';
}
