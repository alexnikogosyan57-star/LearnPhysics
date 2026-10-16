/** Short, event-driven transitions. Never drive physics with a UI animation. */
let previous;
const preference = matchMedia("(prefers-reduced-motion: reduce)");
const active = new Set();
export function animate(element, frames, options = {}) {
  if (!element || preference.matches || typeof element.animate !== "function")
    return;
  const animation = element.animate(frames, {
    duration: 240,
    easing: "cubic-bezier(.2,.7,.2,1)",
    ...options,
  });
  active.add(animation);
  animation.finished.catch(() => {}).finally(() => active.delete(animation));
  return animation;
}
preference.addEventListener("change", () => {
  if (preference.matches) for (const animation of active) animation.cancel();
});
let revealObserver;
function reveal(element,delay=0){
 animate(element,[{opacity:.35,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:380,delay});
}
function revealSections(root){
 revealObserver?.disconnect();
 if(preference.matches)return;
 const elements=[...root.querySelectorAll('.topic-option,.path-unit,.mastery-row,.note,.progress-stats > div,.home-next,.welcome-dialogue,.path-robot-dialogue')];
 if(!('IntersectionObserver' in window)){elements.forEach((el,i)=>reveal(el,Math.min(i,3)*55));return;}
 revealObserver=new IntersectionObserver(entries=>{
  let order=0;
  for(const entry of entries)if(entry.isIntersecting){
   revealObserver.unobserve(entry.target);
   if(entry.target.isConnected)reveal(entry.target,order++*55);
  }
 },{threshold:.08});
 elements.forEach(el=>revealObserver.observe(el));
}
preference.addEventListener('change',()=>{if(preference.matches)revealObserver?.disconnect();});
export function animateRender(root,state){
 for(const animation of active)animation.cancel();
 syncControlMotion(root);
 const prompt=root.querySelector('.robot-dialogue h2')?.textContent||'';
 const composition=(root.querySelector('h1')?.textContent||'')+':'+!!root.querySelector('.topic-options');
 const selection=[...root.querySelectorAll('.answer.selected')].map(el=>el.textContent).join('|');
 const response=root.querySelector('.assessment-feedback')||root.querySelector('.feedback:not(:empty)');
 const feedback=response?.textContent||state.feedback;
 const journal=root.querySelector('.measurement-journal')?.textContent||'';
 const progress=root.querySelector('.lesson-track > span');
 const width=progress?.style.width;
 const viewChanged=!previous||previous.view!==state.view||previous.prompt!==prompt||previous.composition!==composition;
 if(viewChanged){
  const target=root.querySelector('[data-mascot-state]')
   ?root.querySelector('.student-work')||root.querySelector('.robot-dialogue')||root.querySelector('.welcome-dialogue')
   :root.querySelector('.lesson-content')||root.querySelector('.page-heading');
  reveal(target);
  // The guide's media and its ancestors never fade, scale or move.
  const question=root.querySelector('.robot-dialogue h2');
  if(question)animate(question,[{opacity:.4,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:280});
  revealSections(root);
 }
 if(previous&&(previous.selection!==state.selection||previous.selectedText!==selection)){
  for(const selected of root.querySelectorAll('.answer.selected'))animate(selected,[{backgroundColor:'#f8f7ee',borderColor:'#9acb74'},{backgroundColor:'#dfe8d3',borderColor:'#58a65c'},{backgroundColor:'#e8eddd',borderColor:'#58a65c'}],{duration:280});
 }
 if(feedback&&(!previous||previous.response!==feedback)){
  animate(response,[{opacity:.35,transform:'translateY(9px)'},{opacity:1,transform:'translateY(0)'}],{duration:320});
  if(response?.classList.contains('correct'))animate(response,[{boxShadow:'inset 0 0 0 2px #88b879'},{boxShadow:'inset 0 0 0 0px transparent'}],{duration:650});
 }
 if(previous&&progress&&previous.progress!==width){
  const from=parseFloat(previous.progress),to=parseFloat(width);
  if(Number.isFinite(from)&&to>0)animate(progress,[{transform:`scaleX(${Math.min(1,from/to)})`},{transform:'scaleX(1)'}],{duration:420});
 }
 if(previous&&(state.runs>previous.runs||(journal&&journal!==previous.journal))){
  animate(root.querySelector('.readouts,.science-readouts,#circuit-status'),[{backgroundColor:'#dcebcf'},{backgroundColor:'#f2f5ed'}],{duration:650});
  const latest=root.querySelector('.measurement-journal p:last-child');reveal(latest);
 }
 previous={...state,prompt,composition,selectedText:selection,response:feedback,journal,progress:width};
}
// Event delegation survives the app's DOM updates and adds no state or sound.
document.addEventListener('pointerdown',event=>{
 if(preference.matches||event.button!==0)return;
 const button=event.target.closest('button.button,button.answer,button.lesson-node,button.icon-button,button.text-button,button.nav-item');
 if(!button||button.disabled||button.getAttribute('aria-disabled')==='true')return;
 const rect=button.getBoundingClientRect(),ripple=document.createElement('span');
 ripple.className='interaction-ripple';ripple.setAttribute('aria-hidden','true');
 const size=Math.max(rect.width,rect.height)*2;
 Object.assign(ripple.style,{width:`${size}px`,height:`${size}px`,left:`${event.clientX-rect.left-size/2}px`,top:`${event.clientY-rect.top-size/2}px`});
 button.append(ripple);
 const effect=animate(ripple,[{opacity:.2,transform:'scale(0)'},{opacity:0,transform:'scale(1)'}],{duration:480});
 if(effect)effect.finished.catch(()=>{}).finally(()=>ripple.remove());else ripple.remove();
});
document.addEventListener('toggle',event=>{
 const details=event.target;
 if(!(details instanceof HTMLDetailsElement)||!details.open||preference.matches)return;
 const rows=[...details.querySelectorAll('.unit-lesson')].slice(0,7);
 if(rows.length)rows.forEach((node,i)=>reveal(node,i*35));
 else animateDisclosure(details);
},true);
export function animateDisclosure(details) {
  if (!details.open) return;
  animate(
    [...details.children].find((node) => node.tagName !== "SUMMARY"),
    [
      { opacity: 0.3, transform: "translateY(-4px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    { duration: 220 },
  );
}
export function animateSaved(element) {
  animate(element, [
    { opacity: 0, transform: "translateY(4px)" },
    { opacity: 1, transform: "translateY(0)" },
  ]);
}

// Fine-grained control motion follows real DOM state, never simulated readings.
function syncControlMotion(root=document){
 for(const input of root.querySelectorAll('input[type="range"]')){
  const min=input.min===''?0:Number(input.min),max=input.max===''?100:Number(input.max),value=Number(input.value);
  input.style.setProperty('--range-fill',`${max>min?Math.max(0,Math.min(100,(value-min)/(max-min)*100)):0}%`);
 }
 for(const button of root.querySelectorAll('#run,#science-run,#pendulum-run,#rc-start')){
  button.dataset.motionRunning=String(!!button.querySelector('.lucide-pause')||button.textContent.includes('Դադար'));
 }
}
const controlPulses=new WeakMap();
document.addEventListener('input',event=>{
 const input=event.target;
 if(!input.matches('input[type="range"]'))return;
 syncControlMotion(input.closest('main,dialog')||document);
 requestAnimationFrame(()=>{
  const live=input.id?document.getElementById(input.id):input;
  if(!live?.isConnected)return;
  const host=live.closest('label')||(live.id?document.querySelector(`label[for="${CSS.escape(live.id)}"]`):null)||live.parentElement;
  const label=host?.querySelector('strong,output,[data-parameter-label]'),now=performance.now();
  if(label&&now-(controlPulses.get(label)||0)>140){
   controlPulses.set(label,now);
   animate(label,[{color:'#285b20',transform:'scale(1.04)'},{color:'inherit',transform:'scale(1)'}],{duration:200});
  }
 });
},true);
document.addEventListener('focusin',event=>{
 const input=event.target;
 if(!input.matches('input:not([type="range"]):not([type="checkbox"]),textarea,select'))return;
 animate(input,[{boxShadow:'0 0 0 0 rgba(88,99,77,0)'},{boxShadow:'0 0 0 5px rgba(88,99,77,.12)'},{boxShadow:'0 0 0 2px rgba(88,99,77,.05)'}],{duration:400});
});
document.addEventListener('keydown',event=>{
 if(event.repeat||!['Enter',' '].includes(event.key))return;
 const button=event.target.closest('button');
 if(!button||button.disabled)return;
 animate(button.querySelector('svg'),[{opacity:.55},{opacity:1}],{duration:180});
});
document.addEventListener('click',()=>requestAnimationFrame(()=>syncControlMotion()));
document.addEventListener('change',event=>{
 const control=event.target;
 if(!control.matches('select,input[type="checkbox"],input[type="radio"]'))return;
 animate(control.closest('label')||control,[{backgroundColor:'#edf5e4'},{backgroundColor:'transparent'}],{duration:360});
});
