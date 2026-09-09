import {readFile} from "./fileio/fileReader.js";
import {writeFile} from "./fileio/fileWriter.js";
import {convertToLatex} from "./converter.js";

const inputPath = "./input/comment.md";
const outputPath = "./output/comment.tex";

let content = readFile(inputPath);
content = convertToLatex(content);
writeFile(outputPath, content);
console.log(`Done!\nWrote output to ${outputPath}`);