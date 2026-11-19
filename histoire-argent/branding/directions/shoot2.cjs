const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
for(const [f,w,h] of [['noms',1920,1080],['enq-hook',1080,1920],['enq-krach',1080,1920],['enq-thumb',1280,720]]){const p=await b.newPage({viewport:{width:w,height:h}});
await p.goto('file://'+__dirname+'/'+f+'.html',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:__dirname+'/'+f+'.png'});}
await b.close();})();
