const playable=(id,title)=>({id,title,playable:true});
const planned=(id,title)=>({id,title,playable:false});
export const topics=[
 {id:'electricity',title:'Էլեկտրականություն և էլեկտրոնիկա',description:'Փոքր լույսից՝ քո առաջին աշխատող շղթան։',color:'green',art:'circuit',lessons:[
 playable('circuits','Ի՞նչ է էլեկտրական շղթան'),playable('open-closed','Բաց և փակ շղթաներ'),playable('conductors','Հաղորդիչներ և մեկուսիչներ'),playable('circuit-parts','Մարտկոց, լամպ և անջատիչ'),playable('first-circuit','Հավաքիր քո առաջին շղթան'),
 planned('current','Էլեկտրական հոսանքի ուժ'),planned('voltage','Էլեկտրական լարում'),planned('resistance','Էլեկտրական դիմադրություն'),playable('ohm','Օհմի օրենքը'),planned('meters','Ամպերաչափ և վոլտաչափ'),
 playable('series','Հաջորդական և զուգահեռ միացումներ'),planned('parallel','Զուգահեռ միացում'),planned('distribution','Հոսանքի և լարման բաշխումը'),planned('compare-circuits','Շղթաների համեմատություն'),planned('verify-circuit','Կառուցիր և ստուգիր շղթան'),
 planned('electric-work','Էլեկտրական աշխատանք'),playable('power','Էլեկտրական հզորություն'),planned('conversions','Էներգիայի փոխակերպումները'),
 playable('galvanic','Ի՞նչ է գալվանական տարրը'),planned('electrodes','Էլեկտրոդներ և էլեկտրոլիտ'),planned('redox','Օքսիդացում և վերականգնում'),planned('ion-flow','Էլեկտրոնների և իոնների շարժումը'),planned('cell-investigation','Հետազոտիր գալվանական տարրը'),
 playable('components','Ռեզիստոր և լուսադիոդ'),planned('diode','Դիոդի աշխատանքի սկզբունքը'),planned('capacitor','Կոնդենսատորի հիմունքները'),planned('transistor','Տրանզիստորի ներածություն'),playable('project','Իմ առաջին էլեկտրոնային նախագիծը')]},
 {id:'mechanics',title:'Մեխանիկա և շարժում',description:'Ճանապարհ, ժամանակ և շարժման օրինաչափություններ։',color:'blue',art:'motion',lessons:[playable('motion','Շարժում և արագություն'),playable('pendulum','Ճոճանակի գաղտնիքները'),planned('acceleration','Արագացող շարժում')]},
 {id:'forces',title:'Ուժեր և շարժման օրենքներ',description:'Պարզենք՝ ինչու են մարմինները սկսում շարժվել։',color:'orange',art:'force',lessons:[planned('forces-intro','Ուժ և շարժում'),planned('friction','Շփման ուժ')]},
 {id:'energy',title:'Աշխատանք և էներգիա',description:'Հետազոտենք էներգիայի փոխակերպումները։',color:'yellow',art:'energy',lessons:[planned('energy-intro','Աշխատանք և էներգիա')]},
 {id:'heat',title:'Ջերմային երևույթներ',description:'Ինչպե՞ս են մարմինները տաքանում ու սառչում։',color:'orange',art:'heat',lessons:[planned('heat-intro','Ջերմություն և ջերմաստիճան')]},
 {id:'waves',title:'Ալիքներ և ձայն',description:'Տեսնենք ձայնի տատանումներն ու ալիքները։',color:'blue',art:'waves',lessons:[planned('waves-intro','Ձայնի ալիքներ')]},
 {id:'light',title:'Լույս և օպտիկա',description:'Հետևենք ճառագայթների ճանապարհին։',color:'yellow',art:'light',lessons:[planned('light-intro','Լույս և անդրադարձում')]},
 {id:'magnetism',title:'Մագնիսականություն',description:'Բացահայտենք մագնիսների անտեսանելի ազդեցությունը։',color:'green',art:'magnet',lessons:[planned('magnet-intro','Մագնիսական դաշտ')]},
 {id:'electromagnetism',title:'Էլեկտրամագնիսական երևույթներ',description:'Կապենք շարժումը, մագնիսն ու էլեկտրականությունը։',color:'blue',art:'coil',lessons:[planned('induction','Էլեկտրամագնիսական ինդուկցիա')]},
 {id:'robotics',title:'Ռոբոտաշինության ֆիզիկա',description:'Սենսորի չափումից՝ խելացի արձագանք։',color:'green',art:'robot',lessons:[playable('sensors','Սենսորներ և ռոբոտաշինություն')]}
];
export function topicIllustration(type) {
 const drawings={
 circuit:'<path d="M37 56V23H139V76H37V56"/><rect x="23" y="39" width="28" height="34" rx="5" fill="#5b8866"/><path d="M32 45h10m-5-5v10" stroke="white"/><path d="M107 28c-21 0-22 23-9 32v10h18V60c13-9 12-32-9-32Z" fill="#ffe8a1"/><path d="M99 75h16"/>',
 motion:'<path d="M12 76H155m-130-7h20m9 0h20m9 0h20"/><rect x="56" y="27" width="61" height="39" rx="13" fill="#d5e8ec"/><circle cx="69" cy="69" r="9" fill="#557789"/><circle cx="108" cy="69" r="9" fill="#557789"/><path d="M17 39h27m-21 12h21"/>',
 force:'<rect x="65" y="36" width="42" height="38" rx="4" fill="#edcaa5"/><path d="M12 55h45m-10-9 10 9-10 9M113 55h37m-9-9 9 9-9 9M22 81h123"/>',
 energy:'<path d="M24 77H144M45 75V50m0-10V14m-8 11 8-11 8 11"/><rect x="84" y="26" width="38" height="35" rx="6" fill="#efdc9d"/><path d="M103 62v14m-8-10 8 10 8-10"/>',
 heat:'<path d="M66 55V22a10 10 0 0 1 20 0v33a19 19 0 1 1-20 0Z" fill="#f4d9c9"/><path d="M76 32v34" stroke="#c87953" stroke-width="7"/><circle cx="76" cy="70" r="9" fill="#c87953"/><path d="M103 24h13m-13 13h9m-9 13h13"/>',
 waves:'<path d="M10 50Q25 3 40 50T70 50T100 50T130 50T160 50" stroke="#6694a8" stroke-width="5"/><path d="M17 80h126" opacity=".3"/>',
 light:'<path d="M21 18 81 66l60-48" stroke="#d2a346" stroke-width="5"/><path d="M50 77h65" stroke="#648898" stroke-width="7"/><path d="M83 77V15" stroke-dasharray="4 5"/>',
 magnet:'<path d="M48 22v34a30 30 0 0 0 60 0V22" stroke="#88a8ac" stroke-width="22"/><path d="M48 20v18" stroke="#d68a69" stroke-width="22"/><path d="M108 20v18" stroke="#6b97b4" stroke-width="22"/>',
 coil:'<path d="M16 53H36m91 0h25"/><path d="M36 53q0-55 15-35t0 56q0 20 15-1t0-55q0-20 15 0t0 55q0 20 15 0t0-55q0-20 15 0t0 55q0 20 15-20" stroke="#bc9369" stroke-width="5"/>',
 robot:'<rect x="50" y="20" width="65" height="47" rx="15" fill="#ece7d7"/><rect x="59" y="31" width="47" height="24" rx="9" fill="#53625f"/><circle cx="72" cy="42" r="4" fill="#edc778"/><circle cx="93" cy="42" r="4" fill="#edc778"/><path d="M83 20v-9m-21 64v13m41-13v13"/>'};
 return `<svg viewBox="0 0 170 100" aria-hidden="true" fill="none" stroke="#587174" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${drawings[type]||drawings.circuit}</svg>`;
}
