// Keep keyboard position through the app's DOM morph without remounting the mascot.
const identityAttributes = ['id','data-checkpoint-answer','data-checkpoint-practice','data-practice-answer','data-terminal','data-wire-end','data-wire-id','data-component','data-activity-choice','data-activity-match','data-foundation-answer','data-page','data-module','data-topic','data-science-param','data-edit','data-delete','data-predict','data-observe','data-quiz','data-stage','data-remove-wire','data-remove-junction','data-add-component'];
function signature(root) {
  return ['h1','.lesson-track','.robot-dialogue h2'].map(selector => {
    const el=root.querySelector(selector);
    return el?.getAttribute('aria-valuenow') || el?.textContent || '';
  }).join('|');
}
export function captureFocus(root) {
  const el=document.activeElement;
  if (!root?.contains(el) || el===root || el===document.body) return null;
  const identity=identityAttributes.filter(a=>el.hasAttribute(a)).map(a=>[a,el.getAttribute(a)]);
  return {identity,tag:el.tagName,text:el.textContent,view:signature(root),start:el.selectionStart,end:el.selectionEnd};
}
export function restoreFocus(root,snapshot) {
  if(!snapshot)return;
  let target;
  const sameView=signature(root)===snapshot.view;
  if(sameView) {
    target=[...root.querySelectorAll('button,input,select,textarea,a,summary,[tabindex]')].find(el=>
      el.tagName===snapshot.tag && (snapshot.identity.length
        ? snapshot.identity.every(([a,value])=>el.getAttribute(a)===value)
        : el.textContent===snapshot.text));
    if(target && (target.disabled || !target.getClientRects().length))target=null;
  }
  if(sameView && !target)target=root.querySelector('.assessment-feedback') || root.querySelector('.robot-response:not(:empty)') || (snapshot.identity.some(([a,v])=>a==='id'&&v==='circuit-hint')?root.querySelector('#circuit-diagnostic'):null);
  target ||= root.querySelector('.robot-dialogue h2') || root.querySelector('.learning-summary h2') || root.querySelector('h1') || root.querySelector('#main-content');
  if(!target)return;
  if(!target.matches('button,input,select,textarea,a,summary,[tabindex]'))target.tabIndex=-1;
  target.focus({preventScroll:true});
  if(target.matches('input,textarea') && snapshot.start!=null && sameView) {
    try{target.setSelectionRange(snapshot.start,snapshot.end);}catch{/* Number inputs have no text selection. */}
  }
}
