import {readFile} from "./fileReader.js";
import {writeFile} from "./fileWriter.js";

const inputPath = "./input/plaintext.md";
const outputPath = "./output/plaintext.tex";

const content = readFile(inputPath);
console.log(content);
writeFile(outputPath, content);
