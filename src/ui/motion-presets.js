// Original motion recipes, implemented with the browser API rather than a runtime dependency.
// References and deliberate limits are documented in docs/motion-design-research.md.
export const motionTiming={press:150,question:300,feedback:380,achievement:480,stagger:45};
export const motionEase={standard:'cubic-bezier(.2,0,0,1)',arrive:'cubic-bezier(.05,.7,.1,1)',leave:'cubic-bezier(.3,0,.8,.15)'};
export function settleFrames(from=.75){
 return Array.from({length:19},(_,i)=>{
  const t=i/18,response=i===18?1:1-Math.exp(-7*t)*Math.cos(8*t);
  return {transform:`scale(${from+(1-from)*response})`,opacity:Math.min(1,.45+response*.55),offset:t};
 });
}
