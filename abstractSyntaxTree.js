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
exports.findImports = exports.findFunctions = void 0;
var parser_1 = require("@babel/parser");
var traverse_1 = require("@babel/traverse");
var findImports = function (code) {
    var ast = (0, parser_1.parse)(code, { sourceType: "module" });
    var imports = [];
    (0, traverse_1.default)(ast, {
        ImportDeclaration: function (path) {
            imports.push(path.node.source.value);
        },
    });
    return __spreadArray([], imports, true);
};
exports.findImports = findImports;
var findFunctions = function (code) {
    console.log(code);
    var ast = (0, parser_1.parse)(code, { sourceType: "module" });
    var refernces = [];
    (0, traverse_1.default)(ast, {
        ImportDeclaration: function (path) {
            refernces.push(path.scope.references);
        },
    });
    return __spreadArray([], refernces, true);
};
exports.findFunctions = findFunctions;
