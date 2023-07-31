"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = exports.ensureDirs = exports.addThumbnailToSong = exports.downloadThumbnail = exports.readSongsTitles = void 0;
var data_1 = require("./data");
var request = require("request");
var node_id3_1 = __importDefault(require("node-id3"));
var fs_1 = __importDefault(require("fs"));
function readSongsTitles() {
    var listFilesNames = fs_1.default.readdirSync(data_1.sourceDir.slice(0, -1));
    return listFilesNames;
}
exports.readSongsTitles = readSongsTitles;
function downloadThumbnail(url, filename) {
    return __awaiter(this, void 0, void 0, function () {
        var thumbnail;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                //@ts-ignore
                return [4 /*yield*/, request(url).pipe(fs_1.default.createWriteStream("".concat(filename, ".jpg")))];
                case 1:
                    //@ts-ignore
                    _a.sent();
                    return [4 /*yield*/, waitUntillDownloadIsOver(filename)];
                case 2:
                    _a.sent();
                    thumbnail = fs_1.default.readFileSync("".concat(filename, ".jpg"));
                    return [2 /*return*/, thumbnail];
            }
        });
    });
}
exports.downloadThumbnail = downloadThumbnail;
function waitUntillDownloadIsOver(filename) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!fs_1.default.existsSync("".concat(filename, ".jpg"))) return [3 /*break*/, 2];
                    return [4 /*yield*/, delay(200)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    });
}
function addThumbnailToSong(fileName, thumbnail) {
    fs_1.default.renameSync("".concat(data_1.sourceDir, "\\").concat(fileName), "temp.mp3");
    var tags = {
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
    node_id3_1.default.update(tags, "temp.mp3");
    fs_1.default.renameSync("temp.mp3", "".concat(data_1.outputDir, "\\").concat(fileName));
    logSuccessDownload(fileName);
}
exports.addThumbnailToSong = addThumbnailToSong;
function logSuccessDownload(songTitle) {
    console.log("\u001b[" + 42 + "m" + "".concat(songTitle, " download Completed") + "\u001b[0m");
}
function ensureDirs() {
    if (!fs_1.default.existsSync(data_1.sourceDir)) {
        fs_1.default.mkdirSync(data_1.sourceDir);
    }
    if (!fs_1.default.existsSync(data_1.outputDir)) {
        fs_1.default.mkdirSync(data_1.outputDir);
    }
}
exports.ensureDirs = ensureDirs;
function delay(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
exports.delay = delay;
