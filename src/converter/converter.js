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
import {replaceQuotes} from "./components/quotes.js";

export function convertToLatex(content) {
    if (!content) {
        return initializeDocument("");
    }

    content = preRemove(content);

    let codeLines, codeBlocks;
    ({content, codeLines, codeBlocks} = removeCodeBlocks(content));
    let mathLines, mathBlocks;
    ({content, mathLines, mathBlocks} = removeMathBlocks(content));

    content = postRemove(content);

    content = replaceImages(content);
    content = replaceLinks(content);
    content = replaceHorizontalLines(content);
    content = replaceLists(content);
    content = replaceTextStyling(content);
    content = replaceSections(content);
    content = replaceTables(content);
    content = replaceQuotes(content);

    findRequiredPackages(content);

    content = preRestore(content);
    content = restoreMathBlocks(content, mathLines, mathBlocks);
    content = escapeMath(content);

    content = replaceComments(content);
    content = restoreCodeBlocks(content, codeLines, codeBlocks);

    content = initializeDocument(content);
    return content;
}

function findRequiredPackages(content) {
    if (new RegExp(/\\href{.*?}{.*?}/).test(content)) {
        config.packages.push("\\usepackage[colorlinks=true, urlcolor=blue, linkcolor=blue]{hyperref}");
    }
    if (new RegExp(/=MATH=LINE=(\d+)=/).test(content) || /=MATH=BLOCK=(\d+)=/.test(content)) {
        config.packages.push("\\usepackage{amsmath}");
    }
    if (new RegExp(/\\includegraphics/).test(content)) {
        config.packages.push("\\usepackage{graphicx}");
    }
    if (new RegExp(/\\hyperref/).test(content)) {
        config.packages.push("\\usepackage{hyperref}");
    }
    if (new RegExp(/\\begin{subfigure}/).test(content)) {
        config.packages.push("\\usepackage{subcaption}");
    }
    // Note that this package does NOT come with the standard TeX studio distribution
    if (new RegExp(/\\hl/).test(content)) {
        config.packages.push("\\usepackage{soul}");
        config.packages.push("\\usepackage{color}");
    } else if (new RegExp(/\\st/).test(content)) {
        config.packages.push("\\usepackage{soul}");
    }
    if (new RegExp(/\\begin{tabular}\[H]/).test(content) || /\\begin{figure}\[H]/) {
        config.packages.push("\\usepackage{float}");
    }
}

function initializeDocument(content) {
    let output = `\\documentclass[a4paper]{article}\n`;
    for (const index in config.packages) {
        output += config.packages[index] + "\n";
    }
    output += `\\begin{document}\n${content}\n\\end{document}`;
    return output;
}

function preRemove(content) {
    content = content.replaceAll("​", "");
    return content;
}
function postRemove(content) {
    // Characters that are to be escaped globally before conversion, but not in math nor code blocks
    content = content.replaceAll(/<a name=".*?"><\/a>/g, "");
    // Un-escape all escapable characters to prevent double escaping them
    content = content.replaceAll(/\\(?=[!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{}~])/g, "");
    content = content.replaceAll(/\\(?!\|) ?/g, "\\textbackslash ");
    content = content.replaceAll("<br>", "\\\\");
    content = content.replaceAll(/(?=[%{}&^])/g, "\\");
    return content;
}

function preRestore(content) {
    // Characters that are to be escaped globally after conversion, but not in math nor code blocks
    content = content.replaceAll(/(?=[_$])/g, "\\");
    content = content.replaceAll("\\|", "|");
    content = content.replaceAll(/\\?< ?/g, "\\textless ");
    content = content.replaceAll(/\\?> ?/g, "\\textgreater ");
    return content;
}

function escapeMath(content) {
    // Characters that are to be escaped globally and in math blocks, but not in code blocks
    content = content.replaceAll(/(?=[#])/g, "\\");
    return content;
}
