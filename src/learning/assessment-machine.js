// Serializable, bounded review. Original responses are immutable after submission.
export function assessmentState(){return {phase:'ANSWERING',index:0,original:[],queue:[],reviewCounts:{},corrected:[],unresolved:[],feedback:null};}
export function submitAssessment(s,response,correct,limit=2){
 if(!['ANSWERING','MISTAKE_REVIEW'].includes(s.phase))return false;
 const reviewing=s.phase==='MISTAKE_REVIEW',index=reviewing?s.queue[0]:s.index;
 s.phase='SUBMITTED';
 if(!reviewing){s.original.push({index,response:structuredClone(response),correct});if(!correct&&!s.queue.includes(index))s.queue.push(index);}
 else {
  s.queue.shift();s.reviewCounts[index]=(s.reviewCounts[index]||0)+1;
  if(correct){if(!s.corrected.includes(index))s.corrected.push(index);}
  else if(s.reviewCounts[index]<limit)s.queue.push(index);
  else if(!s.unresolved.includes(index))s.unresolved.push(index);
 }
 s.feedback={index,correct,reviewing};s.phase='FEEDBACK';return true;
}
export function continueAssessment(s,total){
 if(s.phase!=='FEEDBACK')return false;
 const reviewing=s.feedback.reviewing;s.phase='NEXT_QUESTION';
 if(!reviewing)s.index++;
 s.feedback=null;
 s.phase=s.index<total?'ANSWERING':s.queue.length?'MISTAKE_REVIEW':'COMPLETED';return true;
}
export const questionIndex=s=>s.phase==='FEEDBACK'?s.feedback.index:s.phase==='MISTAKE_REVIEW'?s.queue[0]:s.index;
