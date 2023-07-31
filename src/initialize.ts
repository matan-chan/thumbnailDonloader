const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const puppeteer = require("puppeteer-extra");
puppeteer.use(StealthPlugin());

const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36";

export async function initializeBrowser() {
  const browser = puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-gpu", "--enable-webgl", "--window-size=1920,1080"],
  });
  return browser;
}

export async function initializePage(browser: any) {
  const [page] = await browser.pages();
  await page.setUserAgent(ua);
  return page;
}
