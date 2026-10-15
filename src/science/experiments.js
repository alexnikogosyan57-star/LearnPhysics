import {solveCircuit} from '../electricity/models.js';
import * as M from './models.js';
const range=(key,label,unit,min,max,step,value)=>({key,label,unit,min,max,step,value});
export const experimentDefinitions={
 symbols:{static:true,params:[]},
 charges:{static:true,params:[range('q1','Առաջին լիցք','նԿլ',-5,5,1,2),range('q2','Երկրորդ լիցք','նԿլ',-5,5,1,-2)]},
 atom:{static:true,params:[range('protons','Մոդելի պրոտոնների թիվ','',1,6,1,3),range('neutrons','Մոդելի նեյտրոնների թիվ','',0,8,1,4),range('electrons','Էլեկտրոնների թիվ','',0,8,1,3)]},
 transfer:{static:true,params:[range('electrons','Ա-ից Բ փոխանցված էլեկտրոններ','',-6,6,1,0)]},
 field:{static:true,params:[range('charge','Աղբյուրի լիցք','նԿլ',-5,5,1,2),range('test','Փորձնական լիցք','նԿլ',-2,2,1,1)]},
 current:{duration:5,params:[range('voltage','Աղբյուրի լարում','Վ',1,12,1,6),range('resistance','Դիմադրություն','Օմ',2,40,1,10)]},
 cell:{static:true,params:[range('resistance','Արտաքին բեռ','Օմ',50,500,50,100)]},

 electricity:{duration:5,static:true,params:[range('voltage','Լարում','Վ',1,12,1,6),range('resistance','Դիմադրություն','Օմ',2,40,1,10)]},
 meters:{duration:5,static:true,params:[range('voltage','Աղբյուրի լարում','Վ',1,12,1,12),range('resistance','Բեռի դիմադրություն','Օմ',2,40,1,6)]},
 parallel:{static:true,params:[range('voltage','Աղբյուրի լարում','Վ',1,12,1,6),range('r1','Առաջին դիմադրություն','Օմ',2,20,1,6),range('r2','Երկրորդ դիմադրություն','Օմ',2,20,1,3)]},
 acceleration:{duration:5,params:[range('v0','Սկզբնական արագություն','մ/վ',0,4,.5,1),range('a','Արագացում','մ/վ²',0,2,.25,1)]},
 fall:{duration:3,params:[range('height','Բարձրություն','մ',1,12,.5,5),range('mass','Զանգված','կգ',1,5,.5,2)]},
 force:{duration:4,params:[range('force','Կիրառված ուժ','Ն',-20,20,1,10),range('mass','Զանգված','կգ',1,8,.5,2)]},
 friction:{duration:4,params:[range('force','Հրող ուժ','Ն',0,30,1,8),range('mass','Զանգված','կգ',1,5,.5,2),range('mu','Կինետիկ շփման գործակից','',0,.6,.05,.3)]},
 incline:{duration:4,params:[range('angle','Թեքության անկյուն','°',0,55,1,20),range('mass','Զանգված','կգ',1,5,.5,2),range('mu','Կինետիկ շփման գործակից','',0,.6,.05,.3)]},
 pressure:{static:true,params:[range('mass','Բեռի զանգված','կգ',1,20,1,10),range('area','Հենման մակերես','մ²',.01,.1,.01,.02)]},
 hydrostatic:{static:true,params:[range('depth','Խորություն','մ',0,5,.25,2),range('density','Հեղուկի խտություն','կգ/մ³',800,1200,100,1000)]},
 buoyancy:{static:true,params:[range('density','Մարմնի խտություն','կգ/մ³',200,1400,100,600),range('volume','Մարմնի ծավալ','մ³',.001,.005,.001,.002)]},
 heat:{duration:120,rate:8,params:[range('mass','Առաջին ջրի զանգված','կգ',.5,3,.5,1),range('temperature','Առաջին ջրի ջերմաստիճան','°C',30,90,5,80)]},
 waves:{duration:8,params:[range('frequency','Հաճախություն','Հց',.5,3,.25,1),range('amplitude','Ամպլիտուդ','մ',.05,.3,.05,.2)]},
 reflection:{static:true,params:[range('incoming','Աղբյուրի ուղղություն','°',-65,65,5,30),range('tilt','Հայելու պտույտ','°',-30,30,5,0)]},
 refraction:{static:true,params:[range('angle','Անկման անկյուն','°',0,75,5,40),range('n1','Առաջին միջավայրի բեկման ցուցիչ','',1,1.6,.1,1),range('n2','Երկրորդ միջավայրի բեկման ցուցիչ','',1,1.6,.1,1.5)]},
 lens:{static:true,params:[range('focal','Կիզակետային հեռավորություն','մ',.1,.5,.05,.3),range('object','Առարկայի հեռավորություն','մ',.1,1.5,.1,.8)]},
 magnet:{static:true,params:[range('x','Կողմնացույցի x դիրք','մ',.3,2,.1,1),range('y','Կողմնացույցի y դիրք','մ',-.9,.9,.1,.5),range('moment','Մագնիսական մոմենտ','Ա·մ²',1,5,1,2)]},
 induction:{duration:5,params:[range('position','Սկզբնական դիրք','մ',-2,1,.25,-1),range('velocity','Արագություն','մ/վ',-.5,.5,.1,.3),range('turns','Գալարների թիվ','',50,200,50,100)]},
 robot:{duration:12,params:[range('left','Ձախ անիվի գծային արագություն','մ/վ',-.6,.6,.1,.4),range('right','Աջ անիվի գծային արագություն','մ/վ',-.6,.6,.1,.4)]}
};
export const format=n=>typeof n==='string'?n:n===null||!Number.isFinite(n)?'—':n!==0&&Math.abs(n)<.001?n.toExponential(2):n.toLocaleString('hy-AM',{maximumSignificantDigits:5});
export const defaultParameters=kind=>Object.fromEntries(experimentDefinitions[kind].params.map(p=>[p.key,p.value]));
export function evaluate(kind,p,t=0,robot={x:1,y:2,angle:0,distance:0}) {
 let r,readings=[],graph={x:'t (վ)',y:'',maxT:experimentDefinitions[kind].duration||5,values:[]};
 const R=(label,value,unit)=>({label,value,unit});
 switch(kind){
 case 'symbols':r={part:p.part||'battery'};readings=[{label:'Ուսումնասիրվող տարր',value:{battery:'Մարտկոց',lamp:'Լամպ',switch:'Անջատիչ',resistor:'Դիմադրիչ'}[r.part],unit:''}];break;
 case 'charges':r=M.electrostatic(p);readings=[R('Փոխազդեցության ուժ',r.force*1e9,'նՆ'),R('Հեռավորություն',r.distance,'մ')];graph={x:'r (մ)',y:'F (նՆ)',maxT:3.5,values:Array.from({length:67},(_,i)=>{const distance=.2+i*.05;return [distance,M.electrostatic({...p,x1:-distance/2,x2:distance/2,y1:0,y2:0}).force*1e9];})};break;
 case 'atom':r=M.atom(p);readings=[R('Ատոմի լիցք',r.charge,'e'),R('Արտաքին պահոցի լիցք',r.reservoir,'e'),R('Միջուկի լիցք',p.protons,'e')];break;
 case 'transfer':r=M.transfer(p);readings=[R('Ա մարմնի լիցք',r.a,'e'),R('Բ մարմնի լիցք',r.b,'e'),R('Ընդհանուր լիցք',r.total,'e')];break;
 case 'field':r=M.electricField(p);readings=[R('Դաշտի լարվածություն',r.magnitude,'Ն/Կլ'),R('Ուժի շառավղային բաղադրիչ',r.force,'Ն')];break;
 case 'current':{const current=p.closed===false?0:p.voltage/p.resistance;r={current,voltage:p.voltage,drift:current/(8.5e28*M.ELEMENTARY_CHARGE*1e-6),charge:current*t};readings=[R('Հոսանքի ուժ',r.current,'Ա'),R('Անցած լիցք',r.charge,'Կլ'),R('Դրեյֆի արագության մոդուլ',r.drift*1e6,'մկմ/վ')];graph.y='q (Կլ)';graph.values=Array.from({length:41},(_,i)=>[i/8,current*i/8]);break;}
 case 'cell':r=M.daniell(p);readings=[R('Բաց շղթայի ստանդարտ ԷԼՇ',r.voltage,'Վ'),R('Բեռի հոսանքի ուժ',r.current,'Ա')];break;

 case 'electricity':case 'meters':{
 const solved=kind==='meters'?meterCircuit(p):null;
 const unsafe=solved?.status==='meter-short',open=kind==='meters'&&solved.status==='open',current=kind==='meters'?solved.meters?.amp??null:p.voltage/p.resistance;
 r={current,voltage:kind==='meters'?solved.meters?.volt??null:p.voltage,resistance:p.resistance,unsafe,open};readings=[R('Հոսանքի ուժ',current,'Ա'),R('Լարում',r.voltage,'Վ'),R('Դիմադրություն',p.resistance,'Օմ')];
 graph={x:'U (Վ)',y:'I (Ա)',maxT:12,values:unsafe?[]:Array.from({length:25},(_,i)=>[i/2,unsafe?0:open?0:i/2/p.resistance])};break;}
 case 'parallel':{const resistance=1/(1/p.r1+1/p.r2);r={resistance,current:p.voltage/resistance,i1:p.voltage/p.r1,i2:p.voltage/p.r2};readings=[R('Ընդհանուր դիմադրություն',resistance,'Օմ'),R('Աղբյուրի հոսանքի ուժ',r.current,'Ա'),R('Ճյուղերի հոսանք',r.i1,'Ա'),R('Երկրորդ ճյուղ',r.i2,'Ա')];break;}
 case 'acceleration':r=M.kinematics(t,p);readings=[R('Տեղափոխություն',r.x,'մ'),R('Արագություն',r.v,'մ/վ'),R('Արագացում',p.a,'մ/վ²')];graph.y='v (մ/վ)';graph.values=Array.from({length:41},(_,i)=>[i/8,M.kinematics(i/8,p).v]);break;
 case 'force':case 'friction':r=M.forceMotion({...p,mu:kind==='force'?0:p.mu},t);readings=[R('Համազոր ուժ',r.net,'Ն'),R('Արագացում',r.a,'մ/վ²'),R('Շփման ուժ',r.friction,'Ն'),R('Տեղափոխություն',r.x,'մ')];graph.y='v (մ/վ)';graph.values=Array.from({length:41},(_,i)=>[i/10,r.a*i/10]);break;
 case 'incline':r=M.incline(p,t);readings=[R('Արագացում',r.a,'մ/վ²'),R('Հակազդեցության ուժ',r.normal,'Ն'),R('Շփման ուժ',r.friction,'Ն'),R('Տեղափոխություն',r.x,'մ')];graph.y='s (մ)';graph.values=Array.from({length:41},(_,i)=>[i/10,M.incline(p,i/10).x]);break;
 case 'fall':r=M.falling(p,t);readings=[R('Բարձրություն',r.y,'մ'),R('Կինետիկ էներգիա',r.kinetic,'Ջ'),R('Պոտենցիալ էներգիա',r.potential,'Ջ')];graph.y='E (Ջ)';graph.maxT=r.duration;graph.values=Array.from({length:41},(_,i)=>[i/40*r.duration,M.falling(p,i/40*r.duration).potential]);graph.second=graph.values.map(([t])=>[t,M.falling(p,t).kinetic]);break;
 case 'pressure':r={pressure:M.pressure(p)};readings=[R('Ճնշում',r.pressure,'Պա'),R('Հենման ուժ',p.mass*M.G,'Ն'),R('Մակերես',p.area,'մ²')];break;
 case 'hydrostatic':r={pressure:M.hydrostatic(p)};readings=[R('Հեղուկի ավելցուկային ճնշում',r.pressure,'Պա'),R('Խորություն',p.depth,'մ')];break;
 case 'buoyancy':r=M.buoyancy(p);readings=[R('Արքիմեդյան ուժ',r.force,'Ն'),R('Ծանրության ուժ',r.weight,'Ն'),R('Ընկղմված ծավալի բաժին',r.fraction*100,'%')];break;
 case 'heat':r=M.thermal(p,t);readings=[R('Առաջին ջրի ջերմաստիճան',r.hot,'°C'),R('Երկրորդ ջրի ջերմաստիճան',r.cold,'°C'),R('Հավասարակշռության ջերմաստիճան',r.equilibrium,'°C')];graph.y='T (°C)';graph.values=Array.from({length:61},(_,i)=>[i*2,M.thermal(p,i*2).hot]);graph.second=graph.values.map(([t])=>[t,M.thermal(p,t).cold]);break;
 case 'waves':r=M.wave(p,0,t);readings=[R('Ալիքի երկարություն',r.wavelength,'մ'),R('Պարբերություն',r.period,'վ'),R('Տարածման արագություն',2,'մ/վ')];graph.y='y (մ)';graph.values=Array.from({length:121},(_,i)=>[i/15,M.wave(p,1,i/15).y]);break;
 case 'reflection':r=M.reflection(p);readings=[R('Անկման անկյուն',r.incidence,'°'),R('Անդրադարձման անկյուն',r.reflection,'°')];break;
 case 'refraction':r=M.refraction(p);readings=[R('Անկման անկյուն',p.angle,'°'),R('Բեկման անկյուն',r.angle,'°')];break;
 case 'lens':r=M.lens(p);readings=[R('Պատկերի հեռավորություն',r.image,'մ'),R('Գծային խոշորացում',r.magnification,'')];break;
 case 'magnet':r=M.dipole(p);readings=[R('Դաշտի մագնիսական ինդուկցիա',r.magnitude*1e6,'մկՏլ'),R('Ուղղություն',r.angle*180/Math.PI,'°')];break;
 case 'induction':r=M.induction(p,t);readings=[R('Ինդուկցված ԷԼՇ',r.emf,'Վ'),R('Հոսք մեկ գալարով',r.flux,'Վբ')];graph.y='ԷԼՇ (Վ)';graph.values=Array.from({length:61},(_,i)=>[i/12,M.induction(p,i/12).emf]);break;
 case 'robot':r={...robot,sensor:M.robotSensor(robot)};readings=[R('Անցած ճանապարհ',robot.distance,'մ'),R('Սենսորի հեռավորություն',r.sensor,'մ'),R('Դիրք x',robot.x,'մ')];graph.y='s (մ)';break;
 default:throw Error('Unknown experiment '+kind);
 }
 return {...r,readings,graph};
}
export function readingText(result){return result.readings.map(x=>`${x.label}՝ ${format(x.value)} ${x.unit}`).join(' · ');}

export function meterTopology(p) {
 const components=[{id:'source',type:'battery',voltage:p.voltage},{id:'load',type:'resistor',resistance:p.resistance},{id:'amp',type:'ammeter'},{id:'volt',type:'voltmeter'}],wires=[];
 const aa=p.reverseA?'b':'a',ab=p.reverseA?'a':'b',va=p.reverseV?'b':'a',vb=p.reverseV?'a':'b';
 if(p.ammeter==='series')wires.push(['source:a','amp:'+aa],['amp:'+ab,'load:a']);
 else if(p.ammeter==='parallel')wires.push(['source:a','load:a'],['source:a','amp:'+aa],['source:b','amp:'+ab]);
 if(p.voltmeter==='series')wires.push(['load:b','volt:'+va],['volt:'+vb,'source:b']);
 else {wires.push(['load:b','source:b']);if(p.voltmeter==='parallel')wires.push(['load:a','volt:'+va],['load:b','volt:'+vb]);}
 return {components,wires};
}

export function meterCircuit(p){const t=meterTopology(p);return solveCircuit(t.components,t.wires);}
