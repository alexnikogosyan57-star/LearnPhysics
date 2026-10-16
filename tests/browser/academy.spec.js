import {foundations} from '../../src/learning/foundations-content.js';
import {prepareRegressionNavigation} from './navigation-helper.js';
import {test,expect} from '@playwright/test';
test.beforeEach(({page})=>prepareRegressionNavigation(page));
async function pick(page,n){await page.locator(`[data-foundation-answer="${n}"]`).click();}
async function next(page){await page.locator('#foundation-next').click();}
async function learn(page,id,answers){
 await page.goto(`/#lesson/${id}`);await next(page);await pick(page,0);await next(page);
 if(['circuits','first-circuit'].includes(id)){
 for(const [a,b] of [['battery:a','switch:a'],['switch:b','lamp:a'],['lamp:b','battery:b']]){await page.locator(`[data-terminal="${a}"]`).click();await page.locator(`[data-terminal="${b}"]`).click();}
 }
 if(id!=='conductors')await page.locator('#circuit-switch').click();
 await page.locator('#measure-electric').click();await next(page);await pick(page,0);await page.locator('#foundation-check').click();await next(page);await next(page);
 if(id==='conductors')await page.locator('#sample-material').selectOption('plastic');else await page.locator('#circuit-switch').click();
 await page.locator('#measure-electric').click();await next(page);await pick(page,0);await page.locator('#foundation-check').click();await next(page);await next(page);
 for(const answer of answers){await page.locator(`[data-activity-choice="${answer}"]`).click();await page.locator('#assessment-check').click();await page.locator('#assessment-continue').click();}
 await finishReview(page,id);
 await expect(page.locator('.learning-summary')).toBeVisible();
}
async function finishReview(page,id){const l=foundations.find(l=>l.id===id);while(await page.locator('#assessment-check').count()){const prompt=await page.locator('.robot-dialogue h2').innerText();const q=l.assessment.find(q=>q.text===prompt);await page.locator(`[data-activity-choice="${q.correct}"]`).click();await page.locator('#assessment-check').click();await page.locator('#assessment-continue').click();}}
test('A–G: retained circuit access, best mastery, reload and locked URL',async({page})=>{
 await page.addInitScript(()=>{if(!localStorage.getItem('physics-journal-v1'))localStorage.setItem('physics-journal-v1',JSON.stringify({currentLesson:'circuits',runs:[],notes:[],learning:{version:1,selectedTopic:null,lessons:{},unlocked:['circuits']}}));});
 await page.goto('/');await page.locator('[data-page="path"]').first().click();await page.locator('[data-choose-topics]').first().click();await page.locator('[data-topic="electricity"]').click();
 await expect(page.locator('.unit-lesson [data-module="circuits"]')).toBeVisible();await expect(page.locator('[data-locked="open-closed"]')).toBeVisible();
 await learn(page,'circuits',[0,1,1]);await expect(page.locator('.earned-stars')).toHaveAttribute('aria-label','1 աստղ՝ 3-ից');await expect(page.locator('#foundation-retry')).toBeVisible();
 await page.goto('/#lesson/open-closed');await expect(page.locator('.unit-paths')).toBeVisible();
 await page.goto('/#lesson/circuits');if(await page.locator('#foundation-retry').count())await page.locator('#foundation-retry').click();
 await learn(page,'circuits',[0,0,0]);await expect(page.locator('.earned-stars')).toHaveAttribute('aria-label','2 աստղ՝ 3-ից');await page.locator('[data-module="open-closed"]').click();await expect(page.locator('.lesson-context')).toContainText('Բաց և փակ');
 await learn(page,'open-closed',[0,0,0]);await expect(page.locator('[data-module="circuit-parts"]')).toBeVisible();
 // Restart an accessible completed lesson without deleting its best score.
 await page.goto('/#lesson/circuits');if(await page.locator('#foundation-retry').count())await page.locator('#foundation-retry').click();
 await learn(page,'circuits',[1,0,1]);await expect(page.locator('.earned-stars')).toHaveAttribute('aria-label','0 աստղ՝ 3-ից');
 await page.reload();const d=await page.evaluate(()=>JSON.parse(localStorage.getItem('physics-journal-v1')));expect(d.learning.lessons.circuits.bestStars).toBe(2);expect(d.learning.unlocked).toContain('circuit-parts');expect(d.learning.unlocked).not.toContain('switch-types');
 await page.goto('/#lesson/switch-types');await expect(page.locator('.unit-paths')).toBeVisible();
});
test('retained circuit investigations, mobile layout, notebook, topic independence and final-topic action',async({page})=>{
 await page.addInitScript(()=>{if(!localStorage.getItem('physics-journal-v1'))localStorage.setItem('physics-journal-v1',JSON.stringify({runs:[],notes:[],learning:{version:1,selectedTopic:'electricity',lessons:{},unlocked:['circuits','open-closed','conductors','circuit-parts','first-circuit']}}));});
 await page.setViewportSize({width:390,height:844});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const [id,answers] of [['circuits',[0,1,0]],['open-closed',[0,0,0]],['conductors',[0,0,0]],['circuit-parts',[0,0,0]],['first-circuit',[0,0,0]]]){
 await learn(page,id,answers);await expect(page.locator('.earned-stars')).toHaveAttribute('aria-label','3 աստղ՝ 3-ից');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
 await page.locator('.lesson-top [data-page="path"]').click();await page.locator('[data-choose-topics]').click();await page.locator('[data-topic="robotics"]').click();await page.locator('.unit-lesson [data-module="sensors"]').click();
 // Existing final-topic investigation uses its actual first application score.
 await page.locator('#electric-next').click();await page.locator('[data-electric-answer="0"]').click();await page.locator('#electric-next').click();await page.locator('#measure-electric').click();await page.locator('#electric-next').click();await page.locator('[data-electric-answer="0"]').click();await page.locator('#electric-submit-observation').click();await page.locator('#electric-next').click();await page.locator('#electric-next').click();await page.locator('#activity-number').fill('1');await page.locator('#assessment-check').click();await page.locator('#assessment-continue').click();
 await expect(page.locator('[data-choose-topics]')).toHaveText('Ընտրել հաջորդ թեման');await page.locator('[data-choose-topics]').click();await page.locator('[data-topic="mechanics"]').click();await expect(page.locator('.unit-lesson [data-module="motion"]')).toBeVisible();
 const d=await page.evaluate(()=>JSON.parse(localStorage.getItem('physics-journal-v1')));expect(d.notes.length).toBe(6);expect(d.learning.lessons.circuits.bestStars).toBe(3);expect(errors).toEqual([]);
});
test('thinking decoder remains attached and never pauses while choosing predictions',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('physics-journal-v1',JSON.stringify({runs:[],notes:[],currentLesson:'circuits',electricLessons:{circuits:{stage:0}}})));
 await page.goto('/#lesson/circuits');await next(page);const v=page.locator('[data-mascot-state="thinking"] video');await expect(v).toBeVisible();
 await page.evaluate(()=>{window.liveVideo=document.querySelector('[data-mascot-state="thinking"] video');window.pauses=0;liveVideo.addEventListener('pause',()=>pauses++);});await page.waitForTimeout(500);const time=await v.evaluate(v=>v.currentTime);
 await pick(page,0);await pick(page,1);await page.waitForTimeout(300);expect(await page.evaluate(()=>document.querySelector('[data-mascot-state="thinking"] video')===liveVideo)).toBe(true);expect(await page.evaluate(()=>pauses)).toBe(0);expect(await v.evaluate(v=>v.currentTime)).toBeGreaterThan(time);
});
test('lesson-specific reset restores materials and voltage; keyboard skip link preserves the lesson',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('physics-journal-v1',JSON.stringify({runs:[],notes:[],learning:{version:1,selectedTopic:'electricity',lessons:{},unlocked:['circuits','conductors','circuit-parts']},electricLessons:{conductors:{stage:2,experiments:[]},'circuit-parts':{stage:2,experiments:[]}}})));
 await page.goto('/#lesson/conductors');await expect(page.locator('[data-component="switch"] text')).toHaveText('Նմուշ');await page.locator('#sample-material').selectOption('plastic');await expect(page.locator('#circuit-status')).toContainText('0 Ա');await page.locator('#circuit-reset').click();await expect(page.locator('#sample-material')).toHaveValue('copper');await expect(page.locator('#circuit-status')).toContainText('0.45 Ա');
 await page.goto('/#lesson/circuit-parts');await page.locator('#circuit-switch').click();await expect(page.locator('#circuit-status')).toContainText('0.45 Ա');await page.locator('#source-voltage').focus();await page.keyboard.press('Home');await expect(page.locator('#source-voltage')).toHaveValue('3');await expect(page.locator('#circuit-status')).toContainText('0.15 Ա');await expect(page.locator('#source-voltage')).toBeFocused();await page.locator('#circuit-reset').click();await expect(page.locator('#source-voltage')).toHaveValue('9');
 await page.keyboard.press('Control+Home');await page.locator('.skip-link').focus();await page.keyboard.press('Enter');await expect(page.locator('#main-content')).toBeFocused();await expect(page.locator('#source-voltage')).toBeVisible();
});
test('a weaker motion replay shows current stars and retry while preserving the best unlock',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('physics-journal-v1',JSON.stringify({stage:5,unlockedStage:5,runs:[],notes:[],answers:{},assessment:{score:0,created:123},learning:{version:1,selectedTopic:'mechanics',unlocked:['motion','pendulum'],lessons:{motion:{bestStars:3,attempts:[{earned:3,possible:3,stars:3}]}}}})));
 await page.goto('/#lesson/motion');await expect(page.locator('.earned-stars')).toHaveAttribute('aria-label','0 աստղ՝ 3-ից');await expect(page.locator('#retry-quiz')).toHaveClass(/lesson-primary/);await expect(page.locator('[data-module="pendulum"]')).toHaveCount(0);await page.locator('[data-page="path"]').first().click();await expect(page.locator('.unit-lesson [data-module="pendulum"]')).toBeVisible();
});
test('new switch-type and wiring lessons complete, save and show real next actions',async({page})=>{
 await page.addInitScript(()=>{if(!localStorage.getItem('physics-journal-v1'))localStorage.setItem('physics-journal-v1',JSON.stringify({runs:[],notes:[],learning:{version:2,selectedTopic:'electricity',lessons:{},unlocked:['switch-types','wiring']}}));});
 // The wiring investigation starts with disconnected terminals.
 for(const [id,answers] of [['switch-types',[0,0,0]],['wiring',[0,0,0]]]){
 await page.goto(`/#lesson/${id}`);await next(page);await pick(page,0);await next(page);
 if(id==='wiring')for(const [a,b] of [['battery:a','switch:a'],['switch:b','lamp:a'],['lamp:b','battery:b']]){await page.locator(`[data-terminal="${a}"]`).click();await page.locator(`[data-terminal="${b}"]`).click();}
 await page.locator('#circuit-switch').click();await page.locator('#measure-electric').click();await next(page);await pick(page,0);await page.locator('#foundation-check').click();await next(page);await next(page);
 if(id==='switch-types'){await page.locator('#switch-kind').selectOption('nc');await expect(page.locator('#circuit-status')).toContainText('0.45');await page.locator('#circuit-switch').click();await expect(page.locator('#circuit-status')).toContainText('0 Ա');}
 else await page.locator('#circuit-switch').click();
 await page.locator('#measure-electric').click();await next(page);await pick(page,0);await page.locator('#foundation-check').click();await next(page);await next(page);
 for(const answer of answers){await page.locator(`[data-activity-choice="${answer}"]`).click();await page.locator('#assessment-check').click();await page.locator('#assessment-continue').click();}
 await finishReview(page,id);await expect(page.locator('.earned-stars')).toHaveAttribute('aria-label','3 աստղ՝ 3-ից');
 }
});
