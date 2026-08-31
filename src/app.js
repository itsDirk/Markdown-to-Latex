import {readFile} from "./fileReader.js";
import {writeFile} from "./fileWriter.js";
import {convertToLatex} from "./converter.js";

const inputPath = "./input/subsubsection.md";
const outputPath = "./output/subsubsection.tex";

let content = readFile(inputPath);
content = convertToLatex(content);
writeFile(outputPath, content);
console.log(`Done!`);