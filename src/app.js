import {readFile} from "./fileReader.js";
import {writeFile} from "./fileWriter.js";
import {convertToLatex} from "./converter.js";

const inputPath = "./input/report/REPORT.md";
const outputPath = "./output/report/REPORT.tex";

let content = readFile(inputPath);
content = convertToLatex(content);
writeFile(outputPath, content);
console.log(`Done!\nWrote output to ${outputPath}`);