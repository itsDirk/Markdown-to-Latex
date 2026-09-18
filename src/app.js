import {readFile} from "./converter/fileio/fileReader.js";
import {writeFile} from "./converter/fileio/fileWriter.js";
import {convertToLatex} from "./converter/converter.js";

const inputPath = "./input/quote.md";
const outputPath = "./output/quote.tex";

let content = readFile(inputPath);
if (content) content = convertToLatex(content);
if (content) writeFile(outputPath, content);
console.log(`Done!`);
if (content) console.log(`Wrote output to ${outputPath}!`);