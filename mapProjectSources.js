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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var ScanProject_1 = require("./ScanProject");
var getFileSummary_1 = require("./getFileSummary");
var fs_1 = require("fs");
var context = [];
var basePath = (0, path_1.join)(__dirname, "./code-refact-vue-example");
var scanProject = new ScanProject_1.default(basePath);
scanProject.nestedSourceMap = scanProject.scanDirectory(basePath);
var sourceMapArray = Object.entries(scanProject.sourceMap);
var summarizeProject = function () { return __awaiter(void 0, void 0, void 0, function () {
    var index, _a, fullPath, source, res;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                index = 0;
                _b.label = 1;
            case 1:
                if (!(index < sourceMapArray.length)) return [3 /*break*/, 4];
                _a = sourceMapArray[index], fullPath = _a[0], source = _a[1];
                console.log("---------------------------------------------------");
                console.log(fullPath);
                return [4 /*yield*/, (0, getFileSummary_1.getFileSummary)(fullPath, source, context)];
            case 2:
                res = _b.sent();
                scanProject.sourceMap[fullPath].summary = res.response;
                context = __spreadArray([], res.context, true);
                try {
                }
                catch (error) {
                    console.error("error in fetching summary of ".concat(fullPath));
                }
                console.log("---------------------------------------------------");
                console.log("");
                _b.label = 3;
            case 3:
                index++;
                return [3 /*break*/, 1];
            case 4:
                (0, fs_1.writeFile)("output-summary.txt", JSON.stringify(scanProject.sourceMap), function (err) {
                    if (err)
                        throw err;
                    console.log("The file has been saved!");
                });
                return [2 /*return*/];
        }
    });
}); };
summarizeProject();
