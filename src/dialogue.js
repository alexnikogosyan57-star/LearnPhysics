import {renderMascot} from './mascot';

// A single, anchored speaker row. Questions/explanations belong to this voice;
// response controls stay below it, never in a competing side panel.
export function dialogue(prompt, state='thinking', eventKey=state) {
  return `<div class="guide-turn">${renderMascot(state,'',eventKey)}<div class="robot-dialogue" aria-label="Ռոբոտի խոսքը"><span class="robot-speaker">Քո գիտական ընկերը</span>${prompt}</div></div>`;
}
export function guidedContent(content,eventKey,caption,state='thinking') {
  const template=document.createElement('template');
  template.innerHTML=content;
  const story=template.content.firstElementChild;
  const prompt=document.createElement('div');
  for(const selector of [':scope > .eyebrow',':scope > h2',':scope > p:not(.feedback)']) {
    const node=story.querySelector(selector);
    if(node) prompt.append(node);
  }
  // Feedback is also a reply from the robot, above answer/action controls.
  const response=story.querySelector(':scope > .feedback:not(:empty)');
  if(response) {response.classList.add('robot-response');prompt.append(response);}
  return `<section class="guide-lesson question-layout">${dialogue(prompt.innerHTML,state,eventKey)}<div class="student-work story">${story.innerHTML}</div></section>`;
}
