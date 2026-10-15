import {test,expect} from '@playwright/test';
test('entry shows the learning path; staying retains the lesson and confirming exit starts it over',async({page})=>{
 await page.goto('/');await expect(page.locator('.academy-path')).toBeVisible();await expect(page.locator('.topic-mentor .button')).toContainText('Շարունակել');
 await page.locator('.topic-mentor [data-module="charges"]').click();await page.locator('#investigation-next').click();await page.locator('[data-activity-choice="0"]').click();await page.locator('#investigation-next').click();await page.locator('#science-record').click();
 await page.locator('.lesson-top [data-page="path"]').click();await expect(page.locator('#lesson-exit-dialog')).toBeVisible();await expect(page.locator('#stay-in-lesson')).toBeFocused();await page.keyboard.press('Escape');await expect(page.locator('#lesson-exit-dialog')).toHaveCount(0);await expect(page.locator('.science-stage')).toBeVisible();
 await page.locator('.lesson-top [data-page="path"]').click();await page.locator('#leave-lesson').click();await expect(page.locator('.academy-path')).toBeVisible();await page.locator('.topic-mentor [data-module="charges"]').click();await expect(page.locator('.lesson-track')).toHaveAttribute('aria-valuenow','0');
 const data=await page.evaluate(()=>JSON.parse(localStorage.getItem('physics-journal-v1')));expect(data.lessonAttemptArchives[0].record.runs.length).toBe(1);expect(data.investigations.charges.runs).toEqual([]);
});
test('native external exit can be cancelled, then confirmed; returning opens a fresh attempt with mastery intact',async({page})=>{
 await page.goto('/#lesson/charges');await page.locator('#investigation-next').click();
 await page.evaluate(()=>{const data=JSON.parse(localStorage.getItem('physics-journal-v1'));data.notes.push({id:'kept',lessonId:'charges',conclusion:'Իմ բացահայտումը'});localStorage.setItem('physics-journal-v1',JSON.stringify(data));});
 page.once('dialog',async d=>{expect(d.type()).toBe('beforeunload');await d.dismiss();});await page.goto('about:blank').catch(()=>{});await expect(page.locator('[data-activity-choice="0"]')).toBeVisible();
 page.once('dialog',d=>d.accept());await page.goto('about:blank');await page.goto('/');await expect(page.locator('.academy-path')).toBeVisible();await page.locator('.topic-mentor [data-module="charges"]').click();await expect(page.locator('.lesson-track')).toHaveAttribute('aria-valuenow','0');
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('physics-journal-v1')).notes.some(n=>n.id==='kept'))).toBe(true);
});
test('browser hash navigation asks before abandoning a lesson',async({page})=>{
 await page.goto('/#lesson/charges');await page.locator('#investigation-next').click();await page.evaluate(()=>{location.hash='notebook';});await expect(page.locator('#lesson-exit-dialog')).toBeVisible();await page.locator('#stay-in-lesson').click();await expect(page).toHaveURL(/#lesson\/charges$/);await expect(page.locator('[data-activity-choice="0"]')).toBeVisible();
});
