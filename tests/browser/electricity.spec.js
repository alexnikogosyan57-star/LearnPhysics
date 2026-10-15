import {test,expect} from '@playwright/test';
async function open(page,id,stage=2){
 await page.goto('/');await page.evaluate(({id,stage})=>{const data=JSON.parse(localStorage.getItem('physics-journal-v1')||'{}');data.electricLessons ||= {};data.electricLessons[id]={stage,experiments:[],attempts:[]};data.learning.unlocked.push(id);localStorage.setItem('physics-journal-v1',JSON.stringify(data));},{id,stage});
 await page.reload();await page.goto(`/#lesson/${id}`);
}
test('circuit terminals, real switch/current, dragging, keyboard, undo and reset',async({page})=>{
 await open(page,'circuits');const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const pairs=[['battery:a','switch:a'],['switch:b','lamp:a'],['lamp:b','battery:b']];
 for(const [a,b] of pairs){await page.locator(`[data-terminal="${a}"]`).click();await page.locator(`[data-terminal="${b}"]`).click();}
 await expect(page.locator('#circuit-status')).toContainText('բաց');await page.locator('#circuit-switch').click();await expect(page.locator('#circuit-status')).toContainText('0.45');
 const component=page.locator('[data-component="lamp"]');await component.focus();await page.keyboard.press('ArrowLeft');await expect(component).toHaveAttribute('transform','translate(455 170)');
 const box=await component.boundingBox();await page.mouse.move(box.x+box.width/2,box.y+20);await page.mouse.down();await page.mouse.move(box.x+box.width/2-50,box.y+45,{steps:6});await page.mouse.up();
 expect(await component.getAttribute('transform')).not.toBe('translate(455 170)');
 await page.locator('#wire-undo').click();await expect(page.locator('#circuit-status')).toContainText('բաց');
 await page.locator('#circuit-reset').click();await expect(page.locator('[data-wire]')).toHaveCount(0);
 await page.locator('[data-terminal="battery:a"]').click();await page.locator('[data-terminal="battery:b"]').click();await expect(page.locator('#circuit-status')).toContainText('կարճ');expect(errors).toEqual([]);
});
test('Ohm guided lesson completes, deliberately submits, saves notebook and reloads',async({page})=>{
 await open(page,'ohm',0);await page.locator('#electric-next').click();await page.locator('[data-electric-answer="0"]').click();await page.locator('#electric-next').click();
 await page.locator('[data-electric-param="voltage"]').fill('12');await page.locator('[data-electric-param="resistance"]').fill('6');await expect(page.locator('#electric-reading')).toContainText('2 Ա');
 await page.locator('#measure-electric').click();await page.locator('#electric-next').click();await page.locator('[data-electric-answer="0"]').click();await expect(page.locator('.feedback')).toBeEmpty();await page.locator('#electric-submit-observation').click();await expect(page.locator('.feedback')).toContainText('Եկ նորից');await page.locator('[data-electric-answer="1"]').click();await page.locator('#electric-submit-observation').click();await page.locator('#electric-next').click();await page.locator('#electric-next').click();
 await page.locator('#electric-numeric').fill('1');await page.locator('#electric-check').click();await expect(page.locator('.feedback')).toContainText('Փորձենք');await page.locator('#electric-hint').click();await expect(page.locator('.feedback')).toContainText('հուշում');
 await page.locator('#electric-numeric').fill('2');await page.locator('#electric-check').click();await page.locator('details:has(#electric-reflection) summary').click();await expect(page.locator('#electric-reflection')).toBeVisible();await page.locator('#electric-reflection').fill('Լարումը բաժանում եմ դիմադրության վրա։');await page.locator('#electric-save-reflection').click();
 await page.reload();await page.locator('[data-page="notebook"]').first().click();await expect(page.locator('.note')).toContainText('Լարում, հոսանքի ուժ և դիմադրություն');await expect(page.locator('.note')).toContainText('Լարումը բաժանում');
});
test('galvanic, parallel, RC, LED project and sensors use real settings',async({page})=>{
 await open(page,'galvanic');await expect(page.locator('#electric-reading')).toContainText('1.1');await page.locator('#bridge-toggle').click();await expect(page.locator('.electric-experiment')).toContainText('երկու ճանապարհ');
 await open(page,'series');await page.locator('#network-type').selectOption('parallel');await expect(page.locator('.electric-experiment')).toContainText('R = 5');await expect(page.locator('#electric-reading')).toContainText('1.2');
 await open(page,'components');await page.locator('#component-kind').selectOption('3');await page.locator('#rc-start').click();await page.waitForTimeout(400);await page.locator('#rc-pause').click();const value=await page.locator('#electric-reading').textContent();await page.waitForTimeout(200);expect(await page.locator('#electric-reading').textContent()).toBe(value);await expect(page.locator('#electric-graph svg')).toHaveCount(1);
 await open(page,'project');for(const key of ['source','led','resistor','wires'])await page.locator(`[data-project-part="${key}"]`).check();await page.locator('#project-switch').click();await expect(page.locator('#electric-reading')).toContainText('0.01');await page.locator('#polarity-toggle').click();await expect(page.locator('#electric-reading')).toContainText('0 Ա');await page.locator('#polarity-toggle').click();await page.locator('[data-electric-param="resistance"]').fill('0');await expect(page.locator('#electric-reading')).toContainText('Չափում չի ցուցադրվում');
 await open(page,'sensors');await page.locator('#sensor-reading').fill('20');await expect(page.locator('#sensor-rule')).toContainText('միացված');
});
test('pendulum direct manipulation, physics time, pause/reset and mobile framing',async({page})=>{
 await page.setViewportSize({width:390,height:844});await open(page,'pendulum');const bob=page.locator('#pendulum-bob');await bob.focus();await page.keyboard.press('ArrowRight');await expect(page.locator('#pendulum-angle')).toHaveValue('25');await page.locator('#pendulum-run').click();await page.waitForTimeout(350);await page.locator('#pendulum-run').click();const x=await bob.getAttribute('cx');await page.waitForTimeout(200);expect(await bob.getAttribute('cx')).toBe(x);await page.locator('#pendulum-reset').click();await expect(page.locator('#pendulum-reading')).toContainText('Ժամանակ՝ 0');await page.locator('#measure-electric').click();await expect(page.locator('#electric-next')).toBeEnabled();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('wire drag snaps to terminal; RC discharge and all lab widths remain usable',async({page})=>{
 await open(page,'circuits');
 await page.locator('#circuit-canvas').scrollIntoViewIfNeeded();
 const a=await page.locator('[data-terminal="battery:a"]').boundingBox(),b=await page.locator('[data-terminal="switch:a"]').boundingBox();
 await page.mouse.move(a.x+a.width/2,a.y+a.height/2);await page.mouse.down();await page.mouse.move(b.x+b.width/2,b.y+b.height/2,{steps:10});await page.mouse.up();await expect(page.locator('[data-wire]')).toHaveCount(1);
 await open(page,'components');await page.locator('#component-kind').selectOption('3');await page.locator('#rc-mode').click();await expect(page.locator('#electric-reading')).toContainText('5 Վ');await page.locator('#rc-start').click();await page.waitForTimeout(350);await page.locator('#rc-pause').click();expect(await page.locator('#electric-reading').textContent()).not.toContain('5 Վ');
 for(const width of [390,768,1440]){await page.setViewportSize({width,height:950});for(const id of ['circuits','ohm','galvanic','series','project','power','sensors','pendulum']){await open(page,id);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await expect(page.locator('.robot-dialogue')).toBeVisible();}}
});
