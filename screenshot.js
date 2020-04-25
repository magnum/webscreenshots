const puppeteer = require('puppeteer');
const slugify = require("underscore.string/slugify");

(async () => {
  const args = process.argv;

  // 1. Launch the browser
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1400,
      height: 1000,
      isLandscape: true
    }
  });

  // 2. Open a new page
  const page = await browser.newPage();

  // 3. Navigate to URL
  const pageUrl = args[2];
  await page.goto(
    pageUrl,
    { waitUntil: 'networkidle2' }
  );

  // 4. Take screenshot
  const filename = slugify(pageUrl.split("://")[1]) + ".png"
  console.log(filename);
  await page.screenshot({
    path: filename,
    fullPage: true
  });

  await browser.close();
})();