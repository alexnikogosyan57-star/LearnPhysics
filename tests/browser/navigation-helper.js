// Regression flows that move to another lesson deliberately choose Leave.
// Cancellation and native leave/stay semantics are tested in lesson-session.spec.js.
export function prepareRegressionNavigation(page){
 if(page.__confirmedNavigation)return;
 page.__confirmedNavigation=true;
 page.on('dialog',dialog=>dialog.type()==='beforeunload'?dialog.accept():dialog.dismiss());
 const navigate=page.goto.bind(page);
 page.goto=async(url,options)=>{
  const current=new URL(page.url()),target=new URL(url,current.origin==='null'?'http://127.0.0.1:5173':current.origin);
  if(current.hash!==target.hash && await page.locator('.lesson-content').count()){
   await page.locator('.lesson-top [data-page="path"]').click();
   if(await page.locator('#lesson-exit-dialog').count())await page.locator('#leave-lesson').click();
  }
  return navigate(url,options);
 };
}
