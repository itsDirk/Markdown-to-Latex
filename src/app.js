import {readFile} from "./converter/fileio/fileReader.js";
import {writeFile} from "./converter/fileio/fileWriter.js";
import {convertToLatex} from "./converter/converter.js";

const inputPath = "./input/horizontalline.md";
const outputPath = "./output/horizontalline.tex";

let content = readFile(inputPath);
content = convertToLatex(content);
writeFile(outputPath, content);
console.log(`Done!\nWrote output to ${outputPath}`);