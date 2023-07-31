import { initializeBrowser, initializePage } from "./initialize";
import { downloadThumbnails } from "./navigateGoogleImages";
import { ensureDirs, readSongsTitles } from "./IO";

async function main() {
  ensureDirs();
  const listOfSongsTitles = readSongsTitles();
  const browser = await initializeBrowser();
  const page = await initializePage(browser);

  await downloadThumbnails(page, browser, listOfSongsTitles);
  await browser.close();
}
main();
