import {consoleLog, consoleWarn} from "../converter/logger.js";
import {readFile} from "../converter/fileio/fileReader.js";
import {convertToLatex} from "../converter/converter.js";
import fs from "fs";

function assertTest(testCode, output, expected) {
    testCode = testCode.replaceAll("=", " ").trim();
    if (output === expected) {
        consoleLog(`${testCode}: PASSED`);
        return true;
    } else {
        consoleWarn(`${testCode}: FAILED`);
        // consoleWarn(`Expected:\n${expected}\nRecieved:\n${output}`);
        return false;
    }
}

function executeSuite(suite) {
    const inputPath = `src/test/suites/${suite}/${suite}.md`;
    const expectedPath = `src/test/suites/${suite}/${suite}.tex`;

    const input = readFile(inputPath);
    const expected = readFile(expectedPath);

    const output = convertToLatex(input);

    let testsOutput = output.split(/(=TEST=\d+(?:\.\d+)*=)/);
    let testsExpected = expected.split(/(=TEST=\d+(?:\.\d+)*=)/);

    let totalTests = Math.floor(testsExpected.length/2);
    let totalPassed = 0;

    consoleLog(`===== ${suite.toUpperCase()} =====`);

    for (let i = 1; i < testsExpected.length; i+=2){
        if (assertTest(testsOutput[i], testsOutput[i+1], testsExpected[i+1])) totalPassed++;
    }

    consoleLog(`Suite ${suite}: ${totalPassed}/${totalTests} (${Math.round(totalPassed/totalTests*100)}%) tests passed`);
    return totalPassed === totalTests;
}

function executeTests() {
    const path = "src/test/suites"
    let suites = getDirNames(path);

    let passedTests = 0;
    for (const suite of suites) {
        if (executeSuite(suite)) passedTests += 1;
    }

    consoleLog(`${passedTests}/${suites.length} test suites passed`);
}

function getDirNames(path) {
    return fs.readdirSync(path, {withFileTypes: true})
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name);
}

executeTests();
