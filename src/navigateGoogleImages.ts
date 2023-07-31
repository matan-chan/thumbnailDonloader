import { addThumbnailToSong, downloadThumbnail } from "./IO";
import fs from "fs";

let webPage: any;
let webBrowser: any;

export async function downloadThumbnails(page: any, browser: any, listSongsTitles: string[]) {
  webPage = page;
  webBrowser = browser;
  for (let i = 0; i < listSongsTitles.length; i++) {
    await handleThumbnail(listSongsTitles[i]);
  }
}

async function handleThumbnail(songTitle: string) {
  await selectThumbnail(songTitle);
  const videoThumbnailUrl = await getThumbnailUrl();
  if (!videoThumbnailUrl) {
    await logFailedToDownloadThumbnail(songTitle);
    return;
  }
  const fileName = songTitle.replace(".mp3", "");
  const thumnail = await downloadThumbnail(videoThumbnailUrl, fileName);
  addThumbnailToSong(songTitle, thumnail);
  deleteThumbnail(`${fileName}.jpg`);
}

async function selectThumbnail(songTitle: string) {
  await searchSongTitleInGoogleImages(songTitle);
  await detectF1Pressed(); //f1 is the key that trigger the download of thaumbnail after image is selected
}

async function getThumbnailUrl(): Promise<string> {
  const thumbnailContainer: any = await webPage.$('img[jsname="kn3ccd"]');
  if (!thumbnailContainer) return "";
  //@ts-ignore
  const videoThumbnailUrl: string = await webPage.evaluate((container) => container.src, thumbnailContainer);
  return videoThumbnailUrl;
}

async function searchSongTitleInGoogleImages(songTitle: string) {
  songTitle = formatSongTitleForSearching(songTitle);
  const searchUrl = `https://www.google.com/search?q=${songTitle}&tbm=isch`;
  await webPage.goto(searchUrl);
}

function formatSongTitleForSearching(songTitle: string): string {
  songTitle = songTitle.replace(".mp3", "");
  songTitle = songTitle.replace(" ", "+");
  songTitle = songTitle.replace("&", "%26");
  return songTitle;
}

async function detectF1Pressed() {
  while (await browserHaveSingleTab()) {
    await delay(300);
  }
  await closeSecondTab();
}

async function closeSecondTab() {
  const secondTab = (await webBrowser.pages())[1];
  secondTab.close();
}

async function browserHaveSingleTab(): Promise<boolean> {
  const numOfPages = (await webBrowser.pages()).length;
  return numOfPages == 1;
}

function logFailedToDownloadThumbnail(songTitle: string) {
  console.log("\u001b[" + 41 + "m" + `faild to download ${songTitle} thumbnail` + "\u001b[0m");
}

function delay(ms: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

async function deleteThumbnail(fileName: string) {
  await delay(3000);
  fs.unlinkSync(fileName);
}
