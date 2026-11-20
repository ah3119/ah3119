const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + __dirname + '/assets.html'); await p.waitForTimeout(1500);
  await p.evaluate(() => document.fonts.ready);
  for (const [id, f] of [['avatar','avatar.png'],['banner','banner.png'],['thumb-template','thumb-template.png']])
    await p.locator('#'+id).screenshot({ path: __dirname + '/' + f });
  await b.close(); console.log('rendered');
})();
