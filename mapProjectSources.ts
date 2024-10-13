import { join } from "path";
import ScanProject from "./ScanProject";
import { getFileSummary } from "./getFileSummary";
import { writeFile } from "fs";

let context = [];

const basePath = join(__dirname, "./code-refact-vue-example");

const scanProject = new ScanProject(basePath);
scanProject.nestedSourceMap = scanProject.scanDirectory(basePath);

const sourceMapArray = Object.entries(scanProject.sourceMap);

const summarizeProject = async () => {
  for (let index = 0; index < sourceMapArray.length; index++) {
    const [fullPath, source] = sourceMapArray[index];
    console.log("---------------------------------------------------");
    console.log(fullPath);

    const res = await getFileSummary(fullPath, source, context);
    scanProject.sourceMap[fullPath].summary = res.response;
    
    context = [...res.context];
    try {
    } catch (error) {
      console.error(`error in fetching summary of ${fullPath}`);
    }

    console.log("---------------------------------------------------");
    console.log("");
  }

  writeFile(
    "output-summary.txt",
    JSON.stringify(scanProject.sourceMap),
    (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    }
  );

//   console.log(scanProject.sourceMap);
};

summarizeProject();
