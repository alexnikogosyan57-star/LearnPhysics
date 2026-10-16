import {test,expect} from '@playwright/test';
import {checkpointQuestions as questions,prerequisites,reviewTasks} from '../../src/learning/checkpoint-content.js';
import {prepareRegressionNavigation} from './navigation-helper.js';
test.beforeEach(({page})=>prepareRegressionNavigation(page));
async function seed(page,extra={}){await page.goto('/#home');await page.evaluate(({prerequisites,extra})=>{localStorage.setItem('physics-journal-v1',JSON.stringify({notes:[{id:'old-note',created:Date.now(),conclusion:'Պահպանված գրառում'}],runs:[],learning:{version:3,selectedTopic:'electricity',legacyAccess:[],unlocked:[...prerequisites,'charge-checkpoint'],lessons:Object.fromEntries(prerequisites.map(id=>[id,{bestStars:2,attempts:[{earned:7,possible:10,stars:2}]}]))},...extra}));},{prerequisites,extra});await page.reload();await page.goto('/#lesson/charge-checkpoint');}
async function answer(page,q,correct=true){
 if(q.type==='choice')await page.locator(`[data-checkpoint-answer="${correct?q.answer:(q.answer+1)%q.options.length}"]`).click();
 if(q.type==='number')await page.locator('#checkpoint-number').fill(String(correct?q.answer:99));
 if(q.type==='simulation'){
  if(q.simulation==='distance'||q.simulation==='atom')await page.locator('#checkpoint-slider').fill(String(q.simulation==='distance'?(correct?2:1.5):(correct?12:11)));
  else{await page.locator('#checkpoint-material').selectOption(correct?'copper':'plastic');await page.locator('#checkpoint-switch').click();}
 }
 await page.locator('#checkpoint-check').click();
 await expect(page.locator('.assessment-feedback')).toHaveClass(new RegExp(correct?'\\bcorrect$':'\\bincorrect$'));
}
test('25 tasks: explicit feedback, refresh, review does not inflate score, persistent result, retake and unlock',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await seed(page);
 await expect(page.locator('h1')).toContainText('ամփոփիչ');await expect(page.locator('details')).toHaveCount(0);await page.locator('#checkpoint-start').click();
 for(let i=0;i<25;i++){
  await answer(page,questions[i],i!==0);
  if(i===0){await expect(page.locator('.robot-dialogue h2')).toContainText(questions[0].prompt);await page.reload();await expect(page.locator('.assessment-feedback')).toContainText(questions[0].why);}
  await page.locator('#checkpoint-continue').click();
 }
 await expect(page.locator('.robot-dialogue')).toContainText('Սխալների կրկնություն');await expect(page.locator('.answer.selected')).toHaveCount(0);
 const review=reviewTasks.charges;await page.locator(`[data-checkpoint-answer="${review.answer}"]`).click();await page.locator('#checkpoint-check').click();await page.locator('#checkpoint-continue').click();
 await expect(page.locator('.robot-dialogue')).toContainText('24 / 25');await expect(page.locator('.robot-dialogue')).toContainText('96%');
 await expect(page.locator('[data-module="sources"]')).toBeVisible();
 let saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('physics-journal-v1')));
 expect(saved.learning.lessons['charge-checkpoint'].attempts).toHaveLength(1);expect(saved.learning.lessons['charge-checkpoint'].bestStars).toBe(3);expect(saved.checkpoints['charge-checkpoint'].machine.corrected).toEqual([0]);expect(saved.notes[0].id).toBe('old-note');
 await page.locator('[data-checkpoint-practice="charges"]').click();await page.locator('[data-practice-answer="0"]').click();await page.locator('#practice-check').click();await expect(page.locator('.checkpoint-practice')).toContainText('Ճիշտ է');
 await page.reload();await expect(page.locator('.robot-dialogue')).toContainText('24 / 25');
 await page.locator('#checkpoint-retry').click();await expect(page.locator('.robot-dialogue h2')).toContainText(questions[0].prompt);await expect(page.locator('.answer.selected')).toHaveCount(0);
 saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('physics-journal-v1')));expect(saved.learning.lessons['charge-checkpoint'].bestStars).toBe(3);expect(saved.checkpointArchives).toHaveLength(1);expect(errors).toEqual([]);
});
test('failed official score stays locked after bounded wrong review and progress is not duplicated on refresh',async({page})=>{
 test.setTimeout(180000);await page.emulateMedia({reducedMotion:'reduce'});
 await seed(page);await page.locator('#checkpoint-start').click();
 for(const q of questions){await answer(page,q,false);await page.locator('#checkpoint-continue').click();}
 for(let count=0;count<50;count++){
  const topic=await page.evaluate(()=>{const s=JSON.parse(localStorage.getItem('physics-journal-v1')).checkpoints['charge-checkpoint'];return s.machine.queue[0];});
  const r=reviewTasks[questions[topic].topic];await page.locator(`[data-checkpoint-answer="${(r.answer+1)%r.options.length}"]`).click();await page.locator('#checkpoint-check').click();await page.locator('#checkpoint-continue').click();
 }
 await expect(page.locator('.robot-dialogue')).toContainText('0 / 25');await expect(page.locator('[data-module="sources"]')).toHaveCount(0);
 await page.reload();const d=await page.evaluate(()=>JSON.parse(localStorage.getItem('physics-journal-v1')));expect(d.learning.lessons['charge-checkpoint'].attempts).toHaveLength(1);expect(d.checkpoints['charge-checkpoint'].machine.unresolved).toHaveLength(25);expect(d.learning.unlocked).not.toContain('sources');
});
for(const width of [390,768,1440])test(`checkpoint real models and layout ${width}`,async({page})=>{
 await page.setViewportSize({width,height:950});await seed(page);await page.locator('#checkpoint-start').click();for(const q of questions.slice(0,3)){await answer(page,q);if(q.id==='q03')await expect(page.locator('.checkpoint-lab')).toContainText('0.250');await page.locator('#checkpoint-continue').click();}expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('shared foundation and science assessments hold both correct and wrong answers until Continue',async({page})=>{
 await seed(page,{electricLessons:{conductors:{schema:2,stage:8,experiments:[],quiz:[],circuit:{components:[],wires:[]}}},investigations:{charges:{version:1,stage:9,unlockedStage:9,quiz:[],quizIndex:0,runs:[],draft:{},experiment:{parameters:{q1:1,q2:1}}}}});
 await page.goto('/#lesson/charges');await page.locator('[data-activity-choice]').first().click();await page.locator('#assessment-check').click();await expect(page.locator('.assessment-feedback')).toBeVisible();await expect(page.locator('#assessment-continue')).toBeVisible();await page.reload();await expect(page.locator('.assessment-feedback')).toBeVisible();
 await page.goto('/#lesson/conductors');await page.locator('[data-activity-choice]').first().click();await page.locator('#assessment-check').click();await expect(page.locator('.assessment-feedback')).toBeVisible();await expect(page.locator('#assessment-continue')).toBeVisible();
});
