"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIgnored = isIgnored;
function isIgnored(filePath, gitignorePatterns) {
    var isIgnored = false;
    for (var _i = 0, gitignorePatterns_1 = gitignorePatterns; _i < gitignorePatterns_1.length; _i++) {
        var pattern = gitignorePatterns_1[_i];
        var trimmedPattern = pattern.trim();
        // Skip empty lines and comments
        if (trimmedPattern === "" || trimmedPattern.startsWith("#")) {
            continue;
        }
        var isNegation = false;
        var modifiedPattern = trimmedPattern;
        // Handle negations
        if (trimmedPattern.startsWith("!")) {
            isNegation = true;
            modifiedPattern = trimmedPattern.slice(1).trim();
        }
        // // Convert pattern to regex
        // let regexPattern = modifiedPattern
        //   .replace(/\*\*/g, ".*") // Replace ** with .* to match any number of directories
        //   .replace(/\*/g, "[^/]*") // Replace * with [^/]* to match anything except a slash
        //   .replace(/\?/g, ".") // Replace ? with . to match any single character
        //   .replace(/\/$/, "(?:/.*)?") // Handle trailing '/' for directories, allowing any of their contents
        //   .replace(/^\//, "^") // Match the beginning of the path if pattern starts with '/'
        //   .replace(/^\./, "\\.") // Escape starting '.'
        //   .replace(/\./g, "\\."); // Escape other '.'
        // const regex = new RegExp(regexPattern);
        // // Convert file path to POSIX-style for cross-platform compatibility
        // const posixPath = filePath.split(sep).join("/");
        // // Test if the filePath matches the regex
        // if (regex.test(posixPath)) {
        //   isIgnored = !isNegation;
        // }
        return filePath.includes(pattern.replace('*', '').replace('!', ''));
    }
    return false;
}
