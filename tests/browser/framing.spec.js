import {prepareRegressionNavigation} from './navigation-helper.js';
import {test,expect} from '@playwright/test';
// Reload confirmations are accepted here; leave/stay behavior has dedicated session tests.
test.beforeEach(({page})=>prepareRegressionNavigation(page));
test('thinking, wrong-answer and eureka share the same pixel floor and anchored slot',async({page})=>{
 for(const width of [390,1440]) {
  await page.setViewportSize({width,height:950});await page.goto('/#home');
  await page.evaluate(()=>localStorage.setItem('physics-journal-v1',JSON.stringify({stage:3,unlockedStage:5,runs:[],notes:[],answers:{}})));
  await page.evaluate(()=>sessionStorage.clear());await page.reload();await page.goto('/#lesson/motion');
  async function frame(state) {
   const mascot=page.locator(`[data-mascot-state="${state}"]`);await expect(mascot).toHaveAttribute('data-phase','playing');
   await page.waitForTimeout(350);const box=await mascot.locator('.mascot-media').boundingBox();
   const floor=await mascot.locator('video').evaluate(v=>{const c=document.createElement('canvas');c.width=v.videoWidth;c.height=v.videoHeight;const ctx=c.getContext('2d');ctx.drawImage(v,0,0);const data=ctx.getImageData(0,0,c.width,c.height).data;let floor=0;for(let y=500;y<c.height;y++)for(let x=0;x<c.width;x++)if(data[(y*c.width+x)*4+3]>180)floor=y;return floor;});
   box.y += await page.evaluate(()=>scrollY);
   return {box,floor};
  }
  const thinking=await frame('thinking');await page.locator('[data-observe="0:1"]').click();await page.locator('#submit-observation').click();const wrong=await frame('confused');await page.locator('[data-hint="0"]').click();const eureka=await frame('eureka');
  for(const other of [wrong,eureka]){expect(other.box).toEqual(thinking.box);expect(Math.abs(other.floor-thinking.floor)).toBeLessThanOrEqual(5);}
 }
});
