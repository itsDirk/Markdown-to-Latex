import {readFile} from "./fileio/fileReader.js";
import {writeFile} from "./fileio/fileWriter.js";
import {convertToLatex} from "./converter/converter.js";
import {consoleLog} from "./logging/logger.js";

const fileName = "highlight";
const inputPath = `./input/${fileName}.md`;
const outputPath = `./output/${fileName}.tex`;

let content = readFile(inputPath);
if (content) content = convertToLatex(content);
if (content) writeFile(outputPath, content);
if (content) consoleLog(`Wrote output to ${fileName}.tex!`);