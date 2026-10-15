export function circuitFeedback(model,result){
 if(!['open','closed'].includes(result.status))return result.status==='short'||result.status==='meter-short'?'Աղբյուրի երկու ելքերի միջև բեռ կա՞, թե ուղիղ միացում է ստացվել։ Փորձիր գտնել այդ ճանապարհը։':'Կապերի մեջ անհամապատասխանություն կա։ Ստուգիր ընտրված ելքերն ու տարրերը։';
 const lamp=model.components.find(c=>c.type==='lamp');
 if(lamp&&(result.powers[lamp.id]||0)>1e-12)return 'Հիմա լամպով հոսանք է անցնում։ Կարո՞ղ ես երկու կոնտակտներով հետևել ամբողջ ճանապարհին։';
 const ends=model.wires.flatMap(w=>Array.isArray(w)?w:[w.start,w.end]);
 if(lamp&&['a','b'].some(p=>!ends.includes(lamp.id+':'+p)))return 'Տեսնո՞ւմ ես լամպի չմիացված կոնտակտը։ Որտե՞ղ պետք է հասնի հաղորդալարը։';
 if(model.components.some(c=>c.type==='switch'&&!c.closed))return 'Ի՞նչ է փոխվում, երբ անջատիչը բաց է։ Փնտրիր բացված կոնտակտների արանքը։';
 return 'Հետևիր ճանապարհին մի ելքից մյուսը։ Որտե՞ղ է կապը ընդհատվում։';
}

// Layout coordinates do not change electrical evidence or restart a hint sequence.
export function circuitEvidenceKey(model) {
 return JSON.stringify({components:model.components.map(({id,type,voltage,resistance,closed,range})=>({id,type,voltage,resistance,closed,range})),wires:model.wires.map(w=>(Array.isArray(w)?w:[w.start,w.end]).map(e=>typeof e==='string'?e:'free')),junctions:(model.junctions||[]).map(j=>j.id)});
}
export function circuitHintLevel(model) {
 return model.guidance?.key===circuitEvidenceKey(model)?Math.max(0,Math.min(4,model.guidance.level||0)):0;
}
export function advanceCircuitHint(model) {
 model.guidance={key:circuitEvidenceKey(model),level:Math.min(4,circuitHintLevel(model)+1)};
}
export function circuitHints(model,result) {
 const wires=model.wires.map(w=>Array.isArray(w)?w:[w.start,w.end]);
 const lamp=model.components.find(c=>c.type==='lamp');
 if(result.status==='no-source')return ['Որտեղի՞ց պետք է շղթան էներգիա ստանա։','Միայն լարերն ու բեռը բավարար չեն․ անհրաժեշտ է լարման աղբյուր։','Ավելացրու մարտկոց և գտիր նրա երկու տարբեր ելքերը։','Մարտկոցի երկու ելքերը բեռի երկու կոնտակտներին միացնելով կարող ես փակ ճանապարհ ստանալ։'];
 if(['short','meter-short'].includes(result.status))return ['Փնտրիր աղբյուրի ելքերը միացնող ամենակարճ ճանապարհը։','Այդ ճանապարհին հոսանքը սահմանափակող դիմադրություն կա՞։','Աղբյուրի ելքերը լարով կամ իդեալական ամպերաչափով անմիջապես միացնելը կարճ միացում է։','Հեռացրու ուղիղ կապը և ճանապարհի մեջ ներառիր լամպ կամ դիմադրիչ։ Ամպերաչափը միացվում է բեռի հետ հաջորդաբար։'];
 if(!['open','closed'].includes(result.status))return ['Ստուգիր՝ բոլոր կապերը գոյություն ունեցող կոնտակտների՞ն են հասնում։','Տարրը հեռացնելուց հետո նրա նախկին կոնտակտը չի կարող կապի մաս մնալ։','Վերանայիր տարրերի և լարերի կարգավորումները․ անվավեր կապի դեպքում հոսանք չենք հաշվարկում։','Հեռացրու անվավեր կապը և ընտրիր գոյություն ունեցող երկու կոնտակտ։ Եթե պետք է, վերականգնիր սկզբնական փորձը։'];
 if(wires.some(ends=>ends.some(e=>typeof e!=='string')))return ['Ուշադիր նայիր լարերի ծայրերին․ բոլո՞րն են կոնտակտի վրա։','Կոնտակտի մոտ գտնվող ազատ ծայրը դեռ էլեկտրական կապ չէ։','Ընտրիր այդ լարը, ապա ազատ ծայրի համար ընտրիր նպատակային կոնտակտը։','«Վերամիացնել» գործողությունը ծայրը կապում է ընտրված կոնտակտին։ Հետո նորից ստուգիր լամպով անցնող ամբողջ ճանապարհը։'];
 if(lamp&&(result.powers[lamp.id]||0)>1e-12)return ['Լամպը վառվում է․ ի՞նչ կփոխվի, եթե ճանապարհը ընդհատես։','Համեմատիր բաց և փակ անջատիչով չափումները՝ մարտկոցը չփոխելով։','Փակ ճանապարհով լամպի հոսանքը որոշվում է նրա լարման և դիմադրության հարաբերությամբ։','Այս մոդելում I = U/R, իսկ P = U × I։ Բաց ճանապարհով I = 0, հետևաբար լամպի հզորությունն էլ զրո է։'];
 if(lamp&&['a','b'].some(p=>!wires.some(ends=>ends.includes(`${lamp.id}:${p}`))))return ['Լամպի երկու կոնտակտներն էլ կապ ունե՞ն։','Միայն մեկ կոնտակտով լամպով փակ ճանապարհ չի ստացվում։','Հետևիր մարտկոցի մի ելքից լամպի միջով դեպի մյուս ելքը գնացող ճանապարհին։','Լամպի յուրաքանչյուր կոնտակտ պետք է այդ փակ ճանապարհի մաս լինի։ Երկրորդ կոնտակտը նույնպես միացրու համապատասխան ելքին։'];
 if(model.components.some(c=>c.type==='switch'&&!c.closed))return ['Որտե՞ղ ես տեսնում կոնտակտների միջև բացվածք։','Բաց անջատիչը իր երկու կոնտակտները չի միացնում։','Փակիր անջատիչը և համեմատիր հոսանքի նոր ցուցումը նախորդի հետ։','Եթե մնացած կապերը փակ ճանապարհ են կազմում, անջատիչը փակելիս հոսանք կանցնի։ Եթե ոչ՝ փնտրիր մյուս ընդհատումը։'];
 return ['Հետևիր աղբյուրի մի ելքից մյուսը գնացող ճանապարհին։','Լարերի խաչումը կապ չէ, եթե այնտեղ հանգույց չկա։','Լամպը կարող է չվառվել նաև այն դեպքում, երբ նրա երկու կոնտակտները նույն հանգույցին են միացված։','Ստուգիր լամպի երկու կոնտակտների լարման տարբերությունը։ Զրոյական լարման դեպքում այս մոդելում նրա հոսանքն ու հզորությունը զրո են։'];
}
export function circuitGuidance(model,result) {
 const level=circuitHintLevel(model);
 return level?circuitHints(model,result)[level-1]:circuitFeedback(model,result);
}
