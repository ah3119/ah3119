const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
for(const f of ['a-gazette','b-terminal','c-illustre']){const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+__dirname+'/'+f+'.html',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:__dirname+'/'+f+'.png'});}
await b.close();})();
