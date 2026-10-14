export const gravity=9.81;
export function stepPendulum(state,length,dt) {
 const f=([theta,omega])=>[omega,-gravity/length*Math.sin(theta)];
 const y=[state.theta,state.omega],k1=f(y),k2=f(y.map((v,i)=>v+k1[i]*dt/2)),k3=f(y.map((v,i)=>v+k2[i]*dt/2)),k4=f(y.map((v,i)=>v+k3[i]*dt));
 return {theta:y[0]+dt*(k1[0]+2*k2[0]+2*k3[0]+k4[0])/6,omega:y[1]+dt*(k1[1]+2*k2[1]+2*k3[1]+k4[1])/6};
}
export function pendulumPeriod(length,angle) {
 // Complete elliptic integral K(sin(theta0/2)), Simpson quadrature.
 const k=Math.sin(Math.abs(angle)/2),n=400,h=Math.PI/2/n;
 let sum=0;for(let i=0;i<=n;i++){const x=i*h,f=1/Math.sqrt(1-k*k*Math.sin(x)**2);sum+=f*(i===0||i===n?1:i%2?4:2);}
 return 4*Math.sqrt(length/gravity)*sum*h/3;
}
const fmt=n=>Number(n.toFixed(2)).toLocaleString('hy-AM');
export function pendulumView(state) {
 state.pendulum ||= {length:1,angle:20,theta:20*Math.PI/180,omega:0,time:0};const p=state.pendulum;
 return `<section class="pendulum-lab"><svg id="pendulum-scene" viewBox="0 0 600 360" aria-label="Ինտերակտիվ ճոճանակ"><defs><radialGradient id="bob-depth"><stop stop-color="#FFCD77"/><stop offset="1" stop-color="#D98B30"/></radialGradient></defs><path d="M300 50V325" stroke="#bfcdb8" stroke-dasharray="5 7"/><rect x="248" y="32" width="104" height="17" rx="6" fill="#718675"/><line id="pendulum-string" x1="300" y1="50" stroke="#52625a" stroke-width="4"/><circle id="pendulum-bob" r="23" fill="url(#bob-depth)" stroke="#b77530" stroke-width="2" tabindex="0" role="button" aria-label="Քաշիր բեռը կամ փոխիր անկյունը սլաքներով"/></svg><p>Քաշիր բեռը՝ սկզբնական անկյունն ընտրելու համար։ Սլաքները ևս փոխում են այն։</p><p id="pendulum-reading" class="electric-reading"></p><div class="experiment-sliders"><label class="experiment-slider">Երկարություն <strong id="pendulum-length-value">${fmt(p.length)} մ</strong><input id="pendulum-length" type="range" min=".5" max="3" step=".1" value="${p.length}"></label><label class="experiment-slider">Սկզբնական անկյուն <strong id="pendulum-angle-value">${p.angle}°</strong><input id="pendulum-angle" type="range" min="-60" max="60" step="1" value="${p.angle}"></label></div><div class="circuit-tools"><button class="button secondary" id="pendulum-run">Սկսել</button><button class="text-button" id="pendulum-reset">Սկսել սկզբից</button><button class="text-button" id="measure-electric">Գրանցել համեմատության համար</button></div><p class="model-note">Իդեալական ճոճանակ՝ առանց շփման, g = 9.81 մ/վ²։ Լուծվում է θ″ = −(g/L) sin θ։ Փոքր անկյունների համար T ≈ 2π√(L/g), մեծ անկյունների դեպքում այս մոտարկումը բավարար չէ։</p><details><summary>Համեմատել պարբերությունները</summary><ol>${(state.experiments||[]).map(x=>`<li>${x.reading}</li>`).join('')}</ol></details></section>`;
}
export function bindPendulum(root,state,record) {
 const p=state.pendulum;let raf,running=false,last=0,dragging=false;const svg=root.querySelector('#pendulum-scene'),bob=root.querySelector('#pendulum-bob');
 function paint(){const radius=p.length*75,x=300+Math.sin(p.theta)*radius,y=50+Math.cos(p.theta)*radius;bob.setAttribute('cx',x);bob.setAttribute('cy',y);root.querySelector('#pendulum-string').setAttribute('x2',x);root.querySelector('#pendulum-string').setAttribute('y2',y);root.querySelector('#pendulum-reading').textContent=`Ժամանակ՝ ${fmt(p.time)} վ · Անկյուն՝ ${fmt(p.theta*180/Math.PI)}° · Պարբերություն՝ ${fmt(pendulumPeriod(p.length,p.angle*Math.PI/180))} վ`;root.querySelector('#pendulum-run').textContent=running?'Դադարեցնել':p.time?'Շարունակել':'Սկսել';}
 function reset(){running=false;cancelAnimationFrame(raf);p.theta=p.angle*Math.PI/180;p.omega=0;p.time=0;paint();record(null,false);}
 function tick(now){if(!running||document.hidden){running=false;paint();return;}let remaining=Math.min(.1,(now-last)/1000);last=now;while(remaining>1e-8){const dt=Math.min(1/120,remaining);Object.assign(p,stepPendulum(p,p.length,dt));p.time+=dt;remaining-=dt;}paint();raf=requestAnimationFrame(tick);}
 root.querySelector('#pendulum-run').onclick=()=>{running=!running;if(running){last=performance.now();raf=requestAnimationFrame(tick);}else cancelAnimationFrame(raf);paint();};
 root.querySelector('#pendulum-reset').onclick=reset;
 root.querySelector('#pendulum-length').oninput=e=>{p.length=Number(e.target.value);root.querySelector('#pendulum-length-value').textContent=fmt(p.length)+' մ';reset();};
 root.querySelector('#pendulum-angle').oninput=e=>{p.angle=Number(e.target.value);root.querySelector('#pendulum-angle-value').textContent=p.angle+'°';reset();};
 const setAngle=angle=>{p.angle=Math.max(-60,Math.min(60,Math.round(angle)));root.querySelector('#pendulum-angle').value=p.angle;root.querySelector('#pendulum-angle-value').textContent=p.angle+'°';reset();};
 bob.onpointerdown=e=>{e.preventDefault();dragging=true;bob.setPointerCapture(e.pointerId);reset();};
 bob.onpointermove=e=>{if(!dragging)return;const point=svg.createSVGPoint();point.x=e.clientX;point.y=e.clientY;const local=point.matrixTransform(svg.getScreenCTM().inverse());setAngle(Math.atan2(local.x-300,local.y-50)*180/Math.PI);};
 bob.onpointerup=bob.onpointercancel=()=>{dragging=false;};bob.onkeydown=e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();setAngle(p.angle+(e.key==='ArrowLeft'?-5:5));}};
 root.querySelector('#measure-electric').onclick=()=>record(`L = ${fmt(p.length)} մ · θ₀ = ${p.angle}° · T = ${fmt(pendulumPeriod(p.length,p.angle*Math.PI/180))} վ`);
 paint();return ()=>{running=false;cancelAnimationFrame(raf);};
}
