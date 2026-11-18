const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
for(const [f,w,h] of [['banner',2560,1440],['avatar',800,800]]){const p=await b.newPage({viewport:{width:w,height:h}});
await p.goto('file://'+__dirname+'/'+f+'.html');await p.screenshot({path:__dirname+'/'+f+'.png'});}
await b.close();})();
