import {consoleLog} from "../converter/logger.js";
import {readFile} from "../converter/fileio/fileReader.js";
import {convertToLatex} from "../converter/converter.js";
import fs from "fs";

function executeTest(suite) {
    const inputPath = `src/test/testcases/${suite}/${suite}.md`;
    const expectedPath = `src/test/testcases/${suite}/${suite}.tex`;

    const input = readFile(inputPath);
    const expected = readFile(expectedPath);

    let output;
    if (input) output = convertToLatex(input);

    consoleLog(output === expected);
}

function executeTests() {
    const path = "src/test/testcases"
    let suites = getDirNames(path);

    for (const suite of suites) {
        executeTest(suite);
    }
}

function getDirNames(path) {
    return fs.readdirSync(path, {withFileTypes: true})
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name);
}

executeTests();