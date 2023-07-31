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
exports.downloadThumbnails = void 0;
var IO_1 = require("./IO");
var fs_1 = __importDefault(require("fs"));
var webPage;
var webBrowser;
function downloadThumbnails(page, browser, listSongsTitles) {
    return __awaiter(this, void 0, void 0, function () {
        var i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    webPage = page;
                    webBrowser = browser;
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < listSongsTitles.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, handleThumbnail(listSongsTitles[i])];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.downloadThumbnails = downloadThumbnails;
function handleThumbnail(songTitle) {
    return __awaiter(this, void 0, void 0, function () {
        var videoThumbnailUrl, fileName, thumnail;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, selectThumbnail(songTitle)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getThumbnailUrl()];
                case 2:
                    videoThumbnailUrl = _a.sent();
                    if (!!videoThumbnailUrl) return [3 /*break*/, 4];
                    return [4 /*yield*/, logFailedToDownloadThumbnail(songTitle)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
                case 4:
                    fileName = songTitle.replace(".mp3", "");
                    return [4 /*yield*/, (0, IO_1.downloadThumbnail)(videoThumbnailUrl, fileName)];
                case 5:
                    thumnail = _a.sent();
                    (0, IO_1.addThumbnailToSong)(songTitle, thumnail);
                    deleteThumbnail("".concat(fileName, ".jpg"));
                    return [2 /*return*/];
            }
        });
    });
}
function selectThumbnail(songTitle) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, searchSongTitleInGoogleImages(songTitle)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, detectF1Pressed()];
                case 2:
                    _a.sent(); //f1 is the key that trigger the download of thaumbnail after image is selected
                    return [2 /*return*/];
            }
        });
    });
}
function getThumbnailUrl() {
    return __awaiter(this, void 0, void 0, function () {
        var thumbnailContainer, videoThumbnailUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, webPage.$('img[jsname="kn3ccd"]')];
                case 1:
                    thumbnailContainer = _a.sent();
                    if (!thumbnailContainer)
                        return [2 /*return*/, ""];
                    return [4 /*yield*/, webPage.evaluate(function (container) { return container.src; }, thumbnailContainer)];
                case 2:
                    videoThumbnailUrl = _a.sent();
                    return [2 /*return*/, videoThumbnailUrl];
            }
        });
    });
}
function searchSongTitleInGoogleImages(songTitle) {
    return __awaiter(this, void 0, void 0, function () {
        var searchUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    songTitle = formatSongTitleForSearching(songTitle);
                    searchUrl = "https://www.google.com/search?q=".concat(songTitle, "&tbm=isch");
                    return [4 /*yield*/, webPage.goto(searchUrl)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function formatSongTitleForSearching(songTitle) {
    songTitle = songTitle.replace(".mp3", "");
    songTitle = songTitle.replace(" ", "+");
    songTitle = songTitle.replace("&", "%26");
    return songTitle;
}
function detectF1Pressed() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, browserHaveSingleTab()];
                case 1:
                    if (!_a.sent()) return [3 /*break*/, 3];
                    return [4 /*yield*/, delay(300)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 0];
                case 3: return [4 /*yield*/, closeSecondTab()];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function closeSecondTab() {
    return __awaiter(this, void 0, void 0, function () {
        var secondTab;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, webBrowser.pages()];
                case 1:
                    secondTab = (_a.sent())[1];
                    secondTab.close();
                    return [2 /*return*/];
            }
        });
    });
}
function browserHaveSingleTab() {
    return __awaiter(this, void 0, void 0, function () {
        var numOfPages;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, webBrowser.pages()];
                case 1:
                    numOfPages = (_a.sent()).length;
                    return [2 /*return*/, numOfPages == 1];
            }
        });
    });
}
function logFailedToDownloadThumbnail(songTitle) {
    console.log("\u001b[" + 41 + "m" + "faild to download ".concat(songTitle, " thumbnail") + "\u001b[0m");
}
function delay(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
function deleteThumbnail(fileName) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, delay(3000)];
                case 1:
                    _a.sent();
                    fs_1.default.unlinkSync(fileName);
                    return [2 /*return*/];
            }
        });
    });
}
