import {readFile} from "./fileReader.js";
import {writeFile} from "./fileWriter.js";
import {convertToLatex} from "./converter.js";

const inputPath = "./input/subsection.md";
const outputPath = "./output/header.tex";

let content = readFile(inputPath);
content = convertToLatex(content);
writeFile(outputPath, content);
console.log(`Done!`);