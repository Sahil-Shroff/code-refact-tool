import { PathLike, readdirSync, readFileSync } from "fs";
import { join, relative } from "path";
import { findFunctions } from "./abstractSyntaxTree";
// import { isIgnored } from "./gitIgnoreParseUtil";

export default class ScanProject {
  basePath: string;


  sourceMap: {};

  nestedSourceMap: {};

  constructor(basePath: string) {
    this.basePath = basePath;
    this.sourceMap = {};
    this.nestedSourceMap = {};
  }

  scanDirectory(
    directoryPath: PathLike,
    parentPatterns: string[] = [],
    nestedSourceMap = {}
  ) {
    const entries = readdirSync(directoryPath, { withFileTypes: true });

    // Load .gitignore if present in the current directory
    let currentPatterns = [...parentPatterns];
    // const gitignorePath = join(directoryPath.toString(), ".gitignore");
    // if (entries.findIndex(({ name }) => name === ".gitignore") !== -1) {
    //   const gitIgnoreContent = readFileSync(gitignorePath, "utf-8");
    //   const newPatterns = gitIgnoreContent
    //     .split("\n")
    //     .map((line) => line.trim())
    //     .filter((line) => line && !line.startsWith("#")); // Skip empty lines and comments

    //   currentPatterns = [...parentPatterns, ...newPatterns];
    // }

    entries.forEach((entry) => {
      const fullPath = join(directoryPath.toString(), entry.name);
      const relativePath = relative(this.basePath, fullPath);
      const isOnIgnorePath = relativePath.includes("node_modules"); // isIgnored(relativePath, currentPatterns);

      if (isOnIgnorePath) {
        return; // Skip ignored files or directories
      }

      if (entry.isDirectory()) {
        // Recursively scan subdirectories
        nestedSourceMap[entry.name] = {};
        this.scanDirectory(fullPath, currentPatterns, nestedSourceMap[entry.name]);
      } else if (entry.isFile()) {
        // Analyze file content if needed
        try {
          const fileContent = readFileSync(fullPath, "utf-8");
          this.sourceMap[fullPath] = {}
          this.sourceMap[fullPath].sourceContent = fileContent;
          this.sourceMap[fullPath].summary = "";
          nestedSourceMap[entry.name] = {}
          nestedSourceMap[entry.name].sourceContent = fileContent;
        } catch (error) {
          console.error("error in getting functions");
        }
      }
    });

    return nestedSourceMap;
  }
}
