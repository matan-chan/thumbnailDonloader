import { outputDir, sourceDir } from "./data";
var request = require("request");
import NodeID3 from "node-id3";
import fs from "fs";

export function readSongsTitles(): string[] {
  const listFilesNames: string[] = fs.readdirSync(sourceDir.slice(0, -1));
  return listFilesNames;
}

export async function downloadThumbnail(url: string, filename: string): Promise<Buffer> {
  //@ts-ignore
  await request(url).pipe(fs.createWriteStream(`${filename}.jpg`));
  await waitUntillDownloadIsOver(filename);
  const thumbnail: Buffer = fs.readFileSync(`${filename}.jpg`);

  return thumbnail!;
}

async function waitUntillDownloadIsOver(filename: string) {
  while (!fs.existsSync(`${filename}.jpg`)) await delay(200);
}
export function addThumbnailToSong(fileName: string, thumbnail: Buffer) {
  fs.renameSync(`${sourceDir}\\${fileName}`, "temp.mp3");

  const tags = {
    image: {
      mime: "image/png",
      type: {
        id: 3,
        name: "front cover",
      },
      description: "Album Art",
      imageBuffer: thumbnail,
    },
  };

  NodeID3.update(tags, "temp.mp3");
  fs.renameSync("temp.mp3", `${outputDir}\\${fileName}`);
  logSuccessDownload(fileName);
}

function logSuccessDownload(songTitle: string) {
  console.log("\u001b[" + 42 + "m" + `${songTitle} download Completed` + "\u001b[0m");
}

export function ensureDirs() {
  if (!fs.existsSync(sourceDir)) {
    fs.mkdirSync(sourceDir);
  }
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
}

export function delay(ms: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}
