"use strict";
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
var fs_1 = require("fs");
var path_1 = require("path");
// import { isIgnored } from "./gitIgnoreParseUtil";
var ScanProject = /** @class */ (function () {
    function ScanProject(basePath) {
        this.basePath = basePath;
        this.sourceMap = {};
        this.nestedSourceMap = {};
    }
    ScanProject.prototype.scanDirectory = function (directoryPath, parentPatterns, nestedSourceMap) {
        var _this = this;
        if (parentPatterns === void 0) { parentPatterns = []; }
        if (nestedSourceMap === void 0) { nestedSourceMap = {}; }
        var entries = (0, fs_1.readdirSync)(directoryPath, { withFileTypes: true });
        // Load .gitignore if present in the current directory
        var currentPatterns = __spreadArray([], parentPatterns, true);
        // const gitignorePath = join(directoryPath.toString(), ".gitignore");
        // if (entries.findIndex(({ name }) => name === ".gitignore") !== -1) {
        //   const gitIgnoreContent = readFileSync(gitignorePath, "utf-8");
        //   const newPatterns = gitIgnoreContent
        //     .split("\n")
        //     .map((line) => line.trim())
        //     .filter((line) => line && !line.startsWith("#")); // Skip empty lines and comments
        //   currentPatterns = [...parentPatterns, ...newPatterns];
        // }
        entries.forEach(function (entry) {
            var fullPath = (0, path_1.join)(directoryPath.toString(), entry.name);
            var relativePath = (0, path_1.relative)(_this.basePath, fullPath);
            var isOnIgnorePath = relativePath.includes("node_modules"); // isIgnored(relativePath, currentPatterns);
            if (isOnIgnorePath) {
                return; // Skip ignored files or directories
            }
            if (entry.isDirectory()) {
                // Recursively scan subdirectories
                nestedSourceMap[entry.name] = {};
                _this.scanDirectory(fullPath, currentPatterns, nestedSourceMap[entry.name]);
            }
            else if (entry.isFile()) {
                // Analyze file content if needed
                try {
                    var fileContent = (0, fs_1.readFileSync)(fullPath, "utf-8");
                    _this.sourceMap[fullPath] = {};
                    _this.sourceMap[fullPath].sourceContent = fileContent;
                    _this.sourceMap[fullPath].summary = "";
                    nestedSourceMap[entry.name] = {};
                    nestedSourceMap[entry.name].sourceContent = fileContent;
                }
                catch (error) {
                    console.error("error in getting functions");
                }
            }
        });
        return nestedSourceMap;
    };
    return ScanProject;
}());
exports.default = ScanProject;
