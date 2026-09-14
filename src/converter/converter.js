import {config} from "./config.js";
import {replaceComments} from "./components/comments.js";
import {replaceLists} from "./components/lists.js";
import {removeCodeBlocks, restoreCodeBlocks} from "./components/codeblocks.js";
import {replaceSections} from "./components/sections.js";
import {replaceTextStyling} from "./components/styling.js";
import {replaceLinks} from "./components/links.js";
import {replaceImages} from "./components/images.js";
import {replaceHorizontalLines} from "./components/lines.js";
import {replaceTables} from "./components/tables.js";
import {removeMathBlocks, restoreMathBlocks} from "./components/mathblocks.js";

export function convertToLatex(content) {
    if (!content) {
        return initializeDocument("");
    }

    content = preClean(content);

    let codeLines, codeBlocks;
    ({content, codeLines, codeBlocks} = removeCodeBlocks(content));
    let mathLines, mathBlocks;
    ({content, mathLines, mathBlocks} = removeMathBlocks(content));

    content = replaceImages(content);
    content = replaceLinks(content);
    content = replaceHorizontalLines(content);
    content = replaceLists(content);
    content = replaceTextStyling(content);
    content = replaceSections(content);
    content = replaceTables(content);
    content = replaceComments(content);

    content = postClean(content);
    content = restoreMathBlocks(content, mathLines, mathBlocks);
    content = restoreCodeBlocks(content, codeLines, codeBlocks);
    content = initializeDocument(content);
    return content;
}

function findRequiredPackages(content) {
    if (new RegExp(/\\href{.*?}{.*?}/).test(content)) {
        config.packages.push("\\usepackage[colorlinks=true, urlcolor=blue, linkcolor=blue]{hyperref}");
    }
    if (new RegExp(/\$.*?\$/).test(content)) {
        config.packages.push("\\usepackage{amsmath}");
    }
    if (new RegExp(/\\includegraphics/).test(content)) {
        config.packages.push("\\usepackage{graphicx}");
    }
    if (new RegExp(/\\hyperref/).test(content)) {
        config.packages.push("\\usepackage{hyperref}");
    }
}

function initializeDocument(content) {
    findRequiredPackages(content);

    let output = `\\documentclass[a4paper]{article}\n`;
    for (const index in config.packages) {
        output += config.packages[index] + "\n";
    }
    output += `\\begin{document}\n${content}\n\\end{document}`;

    return output;
}

function preClean(content) {
    content = content.replaceAll("​", "");
    content = content.replaceAll("\\[", "[");
    content = content.replaceAll("\\]", "]");
    content = content.replaceAll("\\%", "%");
    content = content.replaceAll("%", "\\%");
    content = content.replaceAll("<br>", "\\\\");
    content = content.replaceAll(/<a name=".*?"><\/a>/g, "");
    return content
}

function postClean(content) {
    content = content.replaceAll("\\|", "|");
    return content;
}
