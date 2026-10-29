import {consoleError, consoleLog, consoleWarn} from "../converter/logger.js";
import {readFile} from "../converter/fileio/fileReader.js";
import {convertToLatex} from "../converter/converter.js";
import fs from "fs";

let failedTests = [];

function assertTest(testCode, output, expected) {
    testCode = testCode.replaceAll("=", " ").trim();
    if (output === expected) {
        consoleLog(`${testCode}: PASSED`);
        return true;
    } else {
        consoleWarn(`${testCode}: FAILED`);
        // consoleWarn(`Expected:\n${expected}\nRecieved:\n${output}`);
        failedTests.push(testCode);
        return false;
    }
}

function executeSuite(suite) {
    const inputPath = `src/test/suites/${suite}/${suite}.md`;
    const expectedPath = `src/test/suites/${suite}/${suite}.tex`;

    const input = readFile(inputPath);
    const expected = readFile(expectedPath);

    if (!input) {
        consoleError(`File "${inputPath}" and "${expectedPath}" cannot not be empty`);
        return;
    }
    if (!expected) {
        consoleError(`File "${expectedPath}" and "${expectedPath}" cannot not be empty`);
        return;
    }

    const output = convertToLatex(input);

    let testsOutput = output.split(/(=TEST=\d+(?:\.\d+)*=)/);
    let testsExpected = expected.split(/(=TEST=\d+(?:\.\d+)*=)/);

    let totalTests = Math.floor(testsExpected.length / 2);
    let totalPassed = 0;

    if (totalTests === 0) {
        consoleError(`No tests found in suite "${suite}"`);
        return;
    }

    consoleLog(`===== ${suite.toUpperCase()} =====`);

    for (let i = 1; i < testsExpected.length; i += 2) {
        if (assertTest(testsOutput[i], testsOutput[i + 1], testsExpected[i + 1])) totalPassed++;
    }

    let lvl = totalPassed === totalTests ? 'info' : 'warn';
    consoleLog(`Finished testing suite "${suite}": ${totalPassed}/${totalTests} (${Math.round(totalPassed / totalTests * 100)}%) tests passed`, lvl);
    return totalPassed === totalTests;
}

function executeTests() {
    const path = "src/test/suites"
    let suites = getDirNames(path);

    let passedTests = 0;
    for (const suite of suites) {
        if (executeSuite(suite)) passedTests += 1;
    }

    consoleLog(`===== RESULT =====`);
    let lvl = passedTests === suites.length ? 'info' : 'warn';
    consoleLog(`Finished executing all test suites: ${passedTests}/${suites.length} test suites passed`, lvl);

    if (passedTests !== suites.length) {
        consoleWarn("Failed tests:");
        for (let i = 0; i < failedTests.length; i++) {
            consoleWarn(`(${i + 1}/${failedTests.length}): ${failedTests[i]}`);
        }
    }
}

function getDirNames(path) {
    return fs.readdirSync(path, {withFileTypes: true})
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name);
}

executeTests();
