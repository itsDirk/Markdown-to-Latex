import {readFile} from "./fileReader.js";
import {writeFile} from "./fileWriter.js";
import {convertToLatex} from "./converter.js";

const inputPath = "./input/codetext.md";
const outputPath = "./output/codetext.tex";

let content = readFile(inputPath);
content = convertToLatex(content);
writeFile(outputPath, content);
console.log(`Done!`);