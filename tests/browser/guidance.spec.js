import {prepareRegressionNavigation} from './navigation-helper.js';
import {test, expect} from '@playwright/test';
// Reload confirmations are accepted here; leave/stay behavior has dedicated session tests.
test.beforeEach(({page})=>prepareRegressionNavigation(page));
async function stage(page, number, extra={}) {
  await page.goto('/#home');
  await page.evaluate(({number,extra}) => localStorage.setItem('physics-journal-v1', JSON.stringify({stage:number, unlockedStage:5, runs:[], notes:[], answers:{}, prediction:null, ...extra})), {number,extra});
  await page.reload();
  await page.goto('/#lesson/motion');
}
async function transparent(page, state, next = "idle") {
  const wrapper = page.locator(`[data-mascot-state="${state}"]`);
  await expect(wrapper).toHaveAttribute('data-phase','playing');
  await expect(wrapper.locator('img')).not.toBeVisible();
  const alpha = await wrapper.locator('video').evaluate(v => {
    const c=document.createElement('canvas');c.width=v.videoWidth;c.height=v.videoHeight;
    const ctx=c.getContext('2d');ctx.drawImage(v,0,0);
    return {corner:ctx.getImageData(0,0,1,1).data[3], muted:v.muted, duration:v.duration};
  });
  expect(alpha.corner).toBe(0);expect(alpha.muted).toBe(true);expect(alpha.duration).toBeLessThanOrEqual(3);
  await expect(page.locator(`[data-mascot-state="${next}"]`)).toHaveAttribute('data-phase','playing',{timeout:7000});
}
test('both guidance clips and both success clips have real alpha and separate roles',async({page})=>{
  await stage(page,0);await transparent(page,'point-left');
  await page.evaluate(()=>{const d=JSON.parse(localStorage.getItem('physics-journal-v1'));d.stage=2;d.unlockedStage=Math.max(2,d.unlockedStage||0);localStorage.setItem('physics-journal-v1',JSON.stringify(d));});await page.reload();await page.goto('/#lesson/motion');await transparent(page,'point-right');
  await page.locator('.brand').click();await page.locator('#stay-in-lesson').click();
  await page.locator('#stage-select').selectOption('5');
  await page.locator('[data-activity-choice="1"]').click();
  await page.locator('#assessment-check').click();
  await transparent(page,'success-answer');
  await page.locator('#assessment-continue').click();
  await page.locator('[data-activity-choice="0"]').click();await page.locator('#assessment-check').click();
  await transparent(page,'success-answer');
  await stage(page,5,{assessment:{score:3,created:Date.now()}});await transparent(page,'celebration');
  await page.locator('[data-page="progress"]').click();await transparent(page,'success-complete','idle-secondary');
});
test('sound is enabled by default, plays local effects, volume and mute persist',async({page})=>{
  await page.addInitScript(()=>{
    window.audioPlays=[];
    const play=HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play=function(){
      if(this.tagName==='AUDIO') window.audioPlays.push({src:this.src,volume:this.volume});
      return play.call(this);
    };
  });
  await page.goto('/#home');await page.evaluate(()=>{const d=JSON.parse(localStorage.getItem('physics-journal-v1'));d.stage=2;d.unlockedStage=Math.max(2,d.unlockedStage||0);localStorage.setItem('physics-journal-v1',JSON.stringify(d));});await page.reload();await page.goto('/#lesson/motion');
  await page.locator('#run').click();
  await expect.poll(()=>page.evaluate(()=>window.audioPlays.length)).toBeGreaterThanOrEqual(1);
  await expect(page.locator('#audio-settings svg')).toBeVisible();
  await page.locator('#audio-settings').click();
  await page.locator('#volume').fill('70');await page.locator('#close-audio').click();
  await page.waitForTimeout(150);await page.locator('#run').click();
  expect(await page.evaluate(()=>window.audioPlays.at(-1).volume)).toBeCloseTo(.49);
  await page.locator('#audio-settings').click();await page.locator('#mute').click();
  await page.locator('#close-audio').click();
  const countBeforeMute = await page.evaluate(()=>window.audioPlays.length);
  await page.locator('#run').click();
  expect(await page.evaluate(()=>window.audioPlays.length)).toBe(countBeforeMute);
  await page.reload();await page.locator('#audio-settings').click();await expect(page.locator('#volume')).toHaveValue('70');
});
test('guidance stays within mobile, tablet and desktop and honors reduced motion',async({page})=>{
  for(const width of [390,768,1440]) {
    await page.setViewportSize({width,height:950});await stage(page,2);
    await expect(page.locator('#run')).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
  await page.emulateMedia({reducedMotion:'reduce'});await stage(page,0);
  await expect(page.locator('[data-mascot-state="point-left"]')).toHaveAttribute('data-phase','poster');
  await expect(page.locator('.mascot-poster')).toBeVisible();
});

test('both quiet poses genuinely loop without a permanent still after greeting',async({page})=>{
  await page.goto('/#home');
  await expect(page.locator('[data-mascot-state="idle"]')).toHaveAttribute('data-phase','playing',{timeout:10000});
  await page.locator('.mascot-video').evaluate(v=>{window.loopWraps=0;let last=v.currentTime;v.addEventListener('timeupdate',()=>{if(v.currentTime<last)window.loopWraps++;last=v.currentTime;});});
  await page.waitForTimeout(6400);
  expect(await page.evaluate(()=>window.loopWraps)).toBeGreaterThan(0);
  await expect(page.locator('.mascot-poster')).not.toBeVisible();
  await page.locator('[data-page="progress"]').click();
  await expect(page.locator('[data-mascot-state="idle-secondary"]')).toHaveAttribute('data-phase','playing');
  const state=await page.locator('.mascot-video').evaluate(v=>{const c=document.createElement('canvas');c.width=c.height=1;const x=c.getContext('2d');x.drawImage(v,0,0,1,1,0,0,1,1);return {loop:v.loop,alpha:x.getImageData(0,0,1,1).data[3]};});
  expect(state).toEqual({loop:true,alpha:0});
});

test('wrong answers scratch the head; new hints reveal eureka, then thinking continues', async({page})=>{
  await stage(page,3);
  await page.locator('[data-observe="0:1"]').click();
  await page.locator("#submit-observation").click();
  await transparent(page,'confused','thinking');
  await page.locator('[data-hint="0"]').click();
  await transparent(page,'eureka','thinking');
  await expect(page.locator('.feedback')).toContainText('Վերադառնանք');
  await page.setViewportSize({width:390,height:844});
  await page.locator('[data-observe="0:0"]').click();
  await page.locator("#submit-observation").click();
  const rect=await page.locator('#next-observation').boundingBox();
  expect(rect.y+rect.height).toBeLessThanOrEqual(844);
  await page.locator('#next-observation').click();
  await expect(page.locator('.lesson-track')).toHaveAttribute('aria-valuenow','3');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
