import {readFile} from "./converter/fileio/fileReader.js";
import {writeFile} from "./converter/fileio/fileWriter.js";
import {convertToLatex} from "./converter/converter.js";

const fileName = "highlight";
const inputPath = `./input/${fileName}.md`;
const outputPath = `./output/${fileName}.tex`;

let content = readFile(inputPath);
if (content) content = convertToLatex(content);
if (content) writeFile(outputPath, content);
if (content) console.log(`Wrote output to ${fileName}.tex!`);