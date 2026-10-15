import {test,expect} from '@playwright/test';
async function tabTo(page,selector){
 for(let i=0;i<100;i++){
  if(await page.locator(selector).evaluateAll(els=>els.includes(document.activeElement)))return;
  await page.keyboard.press('Tab');
 }
 throw Error('Tab did not reach '+selector);
}
async function activate(page,selector){await tabTo(page,selector);await page.keyboard.press('Enter');}
const next=p=>activate(p,'#investigation-next');
async function match(p){
 await tabTo(p,'[data-activity-match="0"]');await p.keyboard.press('Home');await p.keyboard.press('ArrowDown');await p.keyboard.press('ArrowDown');await p.keyboard.press('Tab');await p.keyboard.press('Home');await p.keyboard.press('ArrowDown');await p.keyboard.press('Tab');
}
test('a new student completes an entire investigation using only keyboard and retains progress',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/#lesson/charges');
 await page.keyboard.press('Tab');await expect(page.locator('.skip-link')).toBeFocused();
 await next(page);await expect(page.locator('.robot-dialogue h2')).toBeFocused();
 await activate(page,'[data-activity-choice="0"]');await expect(page.locator('[data-activity-choice="0"]')).toBeFocused();await next(page);
 await tabTo(page,'[data-science-param="q1"]');await page.keyboard.press('ArrowRight');await activate(page,'#science-record');await next(page);
 await activate(page,'[data-activity-choice="0"]');await activate(page,'#investigation-check');await next(page);await next(page);
 await tabTo(page,'[data-science-param="q1"]');await page.keyboard.press('ArrowRight');await activate(page,'#science-record');await next(page);
 await match(page);await activate(page,'#investigation-check');await next(page);
 await tabTo(page,'#investigation-reasoning');await page.keyboard.insertText('Փոխեցի լիցքը և համեմատեցի ուժի երկու չափումները։');await next(page);await next(page);
 await activate(page,'[data-activity-choice="0"]');await activate(page,'#investigation-assess');await next(page);
 await tabTo(page,'#activity-number');await page.keyboard.insertText('4');await activate(page,'#investigation-assess');await next(page);
 await match(page);await activate(page,'#investigation-assess');await next(page);
 await expect(page.locator('.earned-stars')).toHaveAttribute('aria-label','3 աստղ՝ 3-ից');await page.reload();
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('physics-journal-v1')));expect(saved.learning.lessons.charges.bestStars).toBe(3);expect(saved.learning.unlocked).toContain('atom');expect(saved.notes[0].lessonId).toBe('charges');expect(errors).toEqual([]);
});
const circuit={components:[{id:'battery',type:'battery',x:100,y:170,voltage:9},{id:'switch',type:'switch',x:280,y:80,closed:true},{id:'lamp',type:'lamp',x:465,y:170,resistance:20}],wires:[['battery:a','switch:a'],['switch:b','lamp:a'],['lamp:b','battery:b']]};
async function openCircuit(page){await page.addInitScript(circuit=>{if(!localStorage.getItem('physics-journal-v1'))localStorage.setItem('physics-journal-v1',JSON.stringify({runs:[],notes:[],electricLessons:{circuits:{stage:2,schema:2,experiments:[],circuit}},learning:{version:2,lessons:{},unlocked:['circuits']}}));},circuit);await page.goto('/#lesson/circuits');}
test('keyboard repeated movement, free wire disconnection/reconnection and progressive hints',async({page})=>{
 await openCircuit(page);await tabTo(page,'[data-component="battery"]');await page.keyboard.press('ArrowRight');await page.keyboard.press('ArrowRight');await expect(page.locator('[data-component="battery"]')).toBeFocused();await expect(page.locator('[data-component="battery"]')).toHaveAttribute('transform','translate(120 170)');
 await activate(page,'[data-wire="2"]');await tabTo(page,'[data-wire-end="end"]');await page.keyboard.press('Delete');await expect(page.locator('[data-wire-end="end"]')).toBeFocused();await expect(page.locator('[data-component="lamp"]')).toHaveAttribute('data-power','0');await expect(page.locator('#wire-end-connect')).toBeDisabled();
 await activate(page,'#circuit-hint');await expect(page.locator('#circuit-diagnostic')).toContainText('ծայրերին');await activate(page,'#circuit-hint');await expect(page.locator('#circuit-diagnostic')).toContainText('ազատ ծայրը');await page.reload();await expect(page.locator('#circuit-diagnostic')).toContainText('ազատ ծայրը');
 await tabTo(page,'#wire-end-target');await page.keyboard.press('Home');await page.keyboard.press('ArrowDown');await page.keyboard.press('ArrowDown');await activate(page,'#wire-end-connect');expect(Number(await page.locator('[data-component="lamp"]').getAttribute('data-power'))).toBeCloseTo(4.05);
 await expect(page.locator('#circuit-hint')).toHaveText('Մի փոքր հուշում');await expect(page.locator('#wire-end-connect')).toBeFocused();
 for(let i=0;i<4;i++)await activate(page,'#circuit-hint');await expect(page.locator('#circuit-hint')).toBeDisabled();await expect(page.locator('#circuit-diagnostic')).toContainText('P = U');await expect(page.locator('#circuit-diagnostic')).toBeFocused();
});

function contrast(a,b){
 const lum=rgb=>rgb.map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
 return (Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
}
for(const width of [1440,768,390])test(`readable controls, visible focus and no overflow at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.goto('/#lesson/charges');await next(page);await activate(page,'[data-activity-choice="0"]');
 for(const selector of ['.robot-dialogue h2','.robot-dialogue p','.answer.selected','#investigation-next','.nav-item.active']){
  const el=page.locator(selector).first();if(!await el.isVisible())continue;
  const colors=await el.evaluate(el=>{const color=s=>s.match(/[\d.]+/g).map(Number);let bg;for(let p=el;p;p=p.parentElement){const c=color(getComputedStyle(p).backgroundColor);if(c.length===3||c[3]===1){bg=c.slice(0,3);break;}}return {fg:color(getComputedStyle(el).color).slice(0,3),bg:bg||[255,255,255]};});
  expect(contrast(colors.fg,colors.bg),selector).toBeGreaterThanOrEqual(4.5);
 }
 await expect(page.locator('[data-activity-choice="0"]')).toBeFocused();const focus=await page.locator('[data-activity-choice="0"]').evaluate(el=>{const s=getComputedStyle(el);return {width:parseFloat(s.outlineWidth),color:s.outlineColor.match(/[\d.]+/g).slice(0,3).map(Number)};});expect(focus.width).toBeGreaterThanOrEqual(2);expect(contrast(focus.color,[255,255,255])).toBeGreaterThanOrEqual(3);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
