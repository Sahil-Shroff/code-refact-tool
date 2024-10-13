import { sep } from "path";

function isIgnored(filePath: string, gitignorePatterns: string[]): boolean {
  let isIgnored = false;

  for (const pattern of gitignorePatterns) {
    const trimmedPattern = pattern.trim();

    // Skip empty lines and comments
    if (trimmedPattern === "" || trimmedPattern.startsWith("#")) {
      continue;
    }

    let isNegation = false;
    let modifiedPattern = trimmedPattern;

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

export { isIgnored };
