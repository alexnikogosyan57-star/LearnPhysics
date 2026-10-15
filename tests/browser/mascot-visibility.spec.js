import {test,expect} from '@playwright/test';
function installWatcher(){
  window.robotSamples=[];window.watchRobot=true;window.robotShown=false;
  const sample=()=>{
   if(!window.watchRobot)return;
   const host=document.querySelector('.lesson-content [data-mascot-state]');
   if(host){
    const media=host.querySelector('.mascot-media');
    let opacity=1;for(let p=media;p;p=p.parentElement)opacity*=Number(getComputedStyle(p).opacity);
    const visible=[...media.children].filter(el=>getComputedStyle(el).visibility!=='hidden'&&Number(getComputedStyle(el).opacity)===1);
    const drawable=visible.some(el=>el.tagName==='CANVAS'||el.tagName==='IMG'&&el.complete&&el.naturalWidth>0||el.tagName==='VIDEO'&&el.readyState>=2);
    if(drawable)window.robotShown=true;
    if(window.robotShown)robotSamples.push({opacity,drawable,layers:visible.length});
   }
   requestAnimationFrame(sample);
  };requestAnimationFrame(sample);
}
for(const width of [1440,390])test(`slow first frame and repeated lesson stages keep one opaque robot at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:950});
 await page.route('**/thinking-transparent*.webm*',async route=>{await new Promise(r=>setTimeout(r,650));await route.continue();});
 await page.addInitScript(installWatcher);
 await page.goto('/#lesson/charges');await expect(page.locator('[data-mascot-state="idle"]')).toHaveAttribute('data-phase','playing');
 await page.locator('#investigation-next').click();
 const robot=page.locator('.lesson-content [data-mascot-state]');
 await expect(robot).toHaveAttribute('data-holding','true');
 const hold=robot.locator('.mascot-hold');await expect(hold).toBeVisible();
 expect(await hold.evaluate(c=>{const d=c.getContext('2d').getImageData(0,0,c.width,c.height).data;let count=0;for(let i=3;i<d.length;i+=4)if(d[i]>180)count++;return count;})).toBeGreaterThan(10000);
 await expect(robot).toHaveAttribute('data-phase','playing');await expect(hold).toHaveCount(0);
 expect(await robot.locator('video').evaluate(v=>getComputedStyle(v).transitionDuration)).toBe('0s');
 await page.locator('[data-activity-choice="0"]').click();await page.locator('#investigation-next').click();await page.locator('#science-record').click();await page.locator('[data-charge-preset="positive"]').click();await page.locator('#science-record').click();await page.locator('#investigation-next').click();
 await page.locator('[data-activity-choice="1"]').click();await page.locator('#investigation-check').click();
 await expect(robot).toHaveAttribute('data-mascot-state','confused');await expect(robot).toHaveAttribute('data-phase','playing');
 await expect(robot).toHaveAttribute('data-mascot-state','thinking',{timeout:7000});await expect(robot).toHaveAttribute('data-phase','playing');
 const samples=await page.evaluate(()=>{window.watchRobot=false;return window.robotSamples;});
 expect(samples.length).toBeGreaterThan(30);expect(samples.filter(s=>!s.drawable||s.opacity<.99||s.layers!==1)).toEqual([]);
});
test('revisited reaction under reduced motion releases the held frame when its image loads',async({page})=>{
 await page.goto('/#lesson/charges');await expect(page.locator('[data-mascot-state="idle"]')).toHaveAttribute('data-phase','playing');
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.evaluate(async()=>{
  const mascot=await import('/src/mascot.js');
  sessionStorage.setItem('physics-mascot:confused:replayed-reduced','played');
  const holder=document.createElement('div');holder.innerHTML=mascot.renderMascot('confused','','replayed-reduced');
  mascot.updateMascotLayout(document.querySelector('.lesson-content [data-mascot-state]'),holder.firstElementChild);
  mascot.mountMascots(document.querySelector('#app'));
 });
 const robot=page.locator('[data-mascot-state="confused"]');await expect(robot).toHaveAttribute('data-phase','idle');
 await expect(robot.locator('.mascot-hold')).toHaveCount(0);await expect(robot.locator('.mascot-poster')).toBeVisible();
 expect(await robot.locator('video').getAttribute('src')).toBeNull();
});
