import {prepareRegressionNavigation} from './navigation-helper.js';
import {test,expect} from '@playwright/test';
test.beforeEach(({page})=>prepareRegressionNavigation(page));
for(const [width,height] of [[1920,1080],[1440,900],[1366,768],[1024,768],[768,950],[390,844]])test(`desktop design and working navigation ${width}x${height}`,async({page})=>{
 await page.setViewportSize({width,height});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');
 await expect(page.locator('.brand')).toBeVisible();expect(await page.evaluate(()=>getComputedStyle(document.body).backgroundColor)).toBe('rgb(255, 255, 255)');
 if(width<=900){await page.locator('#nav-toggle').click();await expect(page.locator('#nav-toggle')).toHaveAttribute('aria-expanded','true');}
 await page.locator('nav [data-page="path"]').click();await page.locator('[data-choose-topics]').first().click();await expect(page.locator('.topic-options')).toBeVisible();expect(await page.locator('.topic-options').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length)).toBe(width>=1400?3:width>600?2:1);
 await page.locator('[data-topic="electricity"]').click();await expect(page.locator('.unit-paths')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 const node=page.locator('.unit-lesson [data-module="charges"]');expect((await node.boundingBox()).width).toBeGreaterThanOrEqual(width>600?80:68);await expect(node.locator('svg')).toBeVisible();
 if(width>=1400)await expect(page.locator('.learning-context')).toBeVisible();else await expect(page.locator('.learning-context')).toBeHidden();
 if(width>=1024){const second=await page.locator('[data-locked="atom"]').boundingBox();expect(second.y+second.height).toBeLessThan(height);}
 await page.screenshot({path:`/workspace/redesign-path-${width}.png`,fullPage:false});
 await node.click();await page.locator('#investigation-next').click();await expect(page.locator('.robot-dialogue')).toContainText('լիցքեր');await expect(page.locator('.learning-context')).toHaveCount(0);await page.locator('[data-activity-choice="0"]').click();await expect(page.locator('#investigation-next')).toBeEnabled();await page.locator('#investigation-next').click();await expect(page.locator('.science-stage')).toBeVisible();await page.locator('#science-record').click();await page.locator('[data-charge-preset="positive"]').click();await page.locator('#science-record').click();await page.reload();await expect(page.locator('#investigation-next')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(errors).toEqual([]);
});
