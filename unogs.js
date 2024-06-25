import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();

  await page.goto(
    'https://unogs.com/search/?country_andorunique=or&start_year=1900&end_year=2024&end_rating=10&genrelist=&audio=Korean&subtitle=Korean&audiosubtitle_andor=and&countrylist=348',
    { waitUntil: 'networkidle2' }
  );

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  await page.waitForFunction(
    'typeof komodel !== "undefined" && komodel.total() > 0',
    { timeout: 10000 }
  );

  const audio = await page.evaluate(() => komodel.audio());
  const total = await page.evaluate(() => komodel.total());
  console.log(total);
  console.log(audio);

  const getOffset = async () => await page.evaluate(() => komodel.offset());

  while (true) {
    const offset = await getOffset();
    console.log(offset);
    if (offset >= total) break;

    await page.evaluate(() => komodel.addTitles());
    await sleep(5000);
  }

  await browser.close();
  console.log('first test');
})();
