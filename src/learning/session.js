// Starting over clears an active attempt, never the student's demonstrated mastery.
export function resetLessonAttempt(data,id){
 const science=data.investigations?.[id],electric=data.electricLessons?.[id];
 const record=id==='motion'?{stage:data.stage,runs:data.runs,prediction:data.prediction,answers:data.answers,assessment:data.assessment,conclusion:data.conclusion,motionFlow:data.motionFlow}:science||electric||data.checkpoints?.[id];
 if(record){
  data.lessonAttemptArchives ||= [];
  data.lessonAttemptArchives.push({lessonId:id,closed:Date.now(),record:structuredClone(record)});
 }
 if(id==='motion'){delete data.motionFlow;}
 if(id==='motion')Object.assign(data,{stage:0,unlockedStage:0,runs:[],prediction:null,answers:{},assessment:null,conclusion:'',verification:'',reflection:''});
 else {
  if(data.checkpoints)delete data.checkpoints[id];
  if(data.investigations)delete data.investigations[id];
  if(data.electricLessons)delete data.electricLessons[id];
  // An archived legacy attempt must not be imported back as the new attempt.
  data.investigationMigrations ||= {};data.investigationMigrations[id]=true;
 }
 delete data.lessonSession;
}
export function lessonCompleted(data,id){
 return id==='motion'?!!data.assessment:!!(data.checkpoints?.[id]?.completed||data.investigations?.[id]?.completed||data.electricLessons?.[id]?.completed);
}
export function requestExitDialog(onLeave){
 const previous=document.activeElement,dialog=document.createElement('dialog');
 dialog.id='lesson-exit-dialog';dialog.setAttribute('aria-labelledby','lesson-exit-title');dialog.setAttribute('aria-describedby','lesson-exit-description');
 dialog.innerHTML='<h2 id="lesson-exit-title">Դո՞ւրս գալ դասից։</h2><p id="lesson-exit-description">Նորից բացելիս այս դասը կսկսվի սկզբից։ Նախկին աստղերն ու տետրի գրառումները կմնան։</p><div class="exit-actions"><button class="button" id="stay-in-lesson" autofocus>Մնալ դասում</button><button class="button secondary" id="leave-lesson">Դուրս գալ դասից</button></div>';
 const close=()=>{dialog.close();dialog.remove();};
 dialog.querySelector('#stay-in-lesson').onclick=()=>{close();if(previous?.isConnected)previous.focus();};
 dialog.querySelector('#leave-lesson').onclick=()=>{close();onLeave();};
 dialog.oncancel=e=>{e.preventDefault();dialog.querySelector('#stay-in-lesson').click();};
 document.body.append(dialog);dialog.showModal();
}
