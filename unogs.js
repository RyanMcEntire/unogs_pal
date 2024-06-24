import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();

const page = await browser.newPage();

await browser.close();

