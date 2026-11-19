const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
for(const f of ['FR-Enregistrement_Francais','FR-Enregistrement_Anglais','FR-Enregistrement_Arabe']){const p=await b.newPage();
await p.goto('file://'+__dirname+'/'+f+'.html',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
await p.pdf({path:__dirname+'/'+f+'.pdf',format:'A4',printBackground:true});}
await b.close();})();
